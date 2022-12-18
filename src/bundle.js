const fs = require('fs');
const path = require('path');
const Module = require('./module');
const MagicString = require('magic-string');

class Bundle {
    constructor({ entry }) {
        this.entryPath = entry.replace(/\.js$/, '') + '.js';
        this.modules = [];
    }

    /**
     * 读取模块
     * @param {*} importee 被调用着
     * @param {*} importer 调用者
     */
    fetchModule(importee, importer) {
        let router;

        if(importer) {
            // 主模块
            router = importer;
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
}

module.exports = Bundle;