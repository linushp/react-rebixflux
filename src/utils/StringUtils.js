export function toFirstCharUpper(str) {
    return str.replace(/(^|\s+)\w/g, function (s) {
        return s.toUpperCase();
    });
}


export function startWith(str, prefix) {
    str = "" + str;
    return str.indexOf(prefix) === 0;
}