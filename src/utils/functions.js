export const extend = Object.assign;

export const isArray = Array.isArray;

export const forEach = function(obj,it){
    if(isArray(obj)){
        return Array.prototype.forEach.call;
    }

    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            var value = obj[key];
            it(value,key);
        }
    }
};
