
/**
 * Added method to Object prototype. object1.append(object2) will put all key-value pairs from object2 in object1.
 * @param  {Object}  object2           The object to take key-value pairs from.
 * @param  {Boolean} [overwrite=false] Whether or not dublicate keys should overwrite each other or put values in an array.
 * @return {Object}                    Returns itself.
 */
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
