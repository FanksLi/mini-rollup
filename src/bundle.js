const fs = require('fs');
const path = require('path');
const Module = require('./module');
const MagicString = require('magic-string');

class Bundle {
    constructor({ entry }) {
        this.entryPath = entry;
        this.modules = [];
    }

    /**
     * 读取模块
     * @param {*} importee 被调用着
     * @param {*} importer 调用者
     */
    fetchModule(importee, importer) {
        let router;

        if(!importer) {
            // 主模块
            router = importee;
        } else {

            if(path.isAbsolute(importee)) {
                router = importee;
            } else {
                
                 // 相对路径
                 router = path.resolve(
                    path.dirname(importer),
                    importee.replace(/\.js$/, '') + '.js'
                )
            }
        }

        if(router) {
            const code = fs.readFileSync(router, 'utf-8').toString();
            const module = new Module({
                code,
                path: router,
                bundle: this,
            });

            return module;
        }
    }

    build(outputFileName) {
        const module = this.fetchModule(this.entryPath);

       this.statements = module.expandAllStatement();

        const {code} = this.generate();
        fs.writeFileSync(outputFileName, code, 'utf-8');
    }

    generate() {
        const magicString = new MagicString.Bundle();

        this.statements.forEach(statement => {
            const source = statement._source.clone();

            if(statement.type === 'ExportNamedDeclaration') {
                source.remove(statement.start, statement.declaration.start);
            }

            magicString.addSource({
                content: source,
                separtor: '\n',
            });

        })

        return {code: magicString.toString()}
    }
}

module.exports = Bundle;