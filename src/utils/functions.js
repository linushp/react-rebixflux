var keysFunc = Object.keys;

var undefinedOnly = false;
function objectAssign(obj) {

    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!undefinedOnly || obj[key] === undefined) {
                obj[key] = source[key]
            }
        }
    }
    return obj;
}

function isType(x, type) {
    return Object.prototype.toString.call(x) === '[object ' + type + ']';
}

export const extend = Object.assign || objectAssign;

export const isArray = Array.isArray || function (x) {
        return isType(x, 'Array');
    };

export const forEach = function (obj, it) {
    if (isArray(obj)) {
        Array.prototype.forEach.call(obj, it);
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                it(value, key);
            }
        }
    }
};


export function isFunction(x) {
    return isType(x, 'Function');
}
export function isString(x) {
    return isType(x, 'String');
}