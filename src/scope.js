
class Scope{
    constructor({parent, params=[]}={}) {
        this._parent = parent;
        this._names = [...params];
    }
    add(name) {
        this._names.push(name);
    }
    contains(name) {
        return !!this.findDefiningScope(name);
    }
    findDefiningScope(name){
        if(this._names.includes(name)) {
            return this;
        }

        if(this._parent) {
            return this._parent.findDefiningScope(name);
        }

        return false;
    }
};

module.exports = Scope;