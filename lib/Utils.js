Object.prototype.append = function append(object2, overwrite=false) {
    let keys = Object.keys(object2), key;
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        if (this[key] && !overwrite) {
            this[key] = [this[key], object2[key]];
        } else {
            this[key] = object2[key];
        }
    }
    return this;
};
