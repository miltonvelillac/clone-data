"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.clone = exports.isPrimitive = exports.cloneArray = exports.cloneMap = void 0;
function cloneMap(currentMap) {
    var newMap = new Map();
    currentMap.forEach(function (val, keyMap, mapVal) {
        var newVal = clone(val);
        newMap.set(keyMap, newVal);
    });
    return newMap;
}
exports.cloneMap = cloneMap;
function cloneArray(currentArray) {
    return currentArray.map(function (arrayValue) { return clone(arrayValue); });
}
exports.cloneArray = cloneArray;
function isPrimitive(data) {
    return data !== Object(data) || data instanceof Date;
}
exports.isPrimitive = isPrimitive;
function clone(obj) {
    if (isPrimitive(obj)) {
        return obj;
    }
    if (obj instanceof Map) {
        return cloneMap(obj);
    }
    if (Array.isArray(obj)) {
        return cloneArray(obj);
    }
    var cloneObj = {};
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (isPrimitive(value)) {
            cloneObj[key] = value;
        }
        else if (value instanceof Map) {
            cloneObj[key] = cloneMap(value);
        }
        else if (Array.isArray(value)) {
            cloneObj[key] = cloneArray(value);
        }
        else {
            var newClone = clone(value);
            cloneObj[key] = __assign({}, newClone);
        }
    }
    return cloneObj;
}
exports.clone = clone;
// const map = new Map().set('first', 'valueFirst').set('second', 'valueSecond');
// const object1 = {
//   a: "somestring",
//   b: 42,
//   c: { name: "my name", data: { oth: 'other value' } },
//   d: ['first', 2],
//   e: ['first', { obj: { name: 'my name again' } }, [4, { obj: 'my obj', myDate: new Date('2020/07/10'), map }]]
// };
// const cloneObjt = clone(object1);
// const y = object1;
// object1.a = 'new Data';
// object1.b = 99;
// object1.c = { name: "NEW NAME", data: {oth: 'NEW OTHER VALUE'} };
// object1.d = ['NEW FIRST', 2222];
// object1.e = ['SECOND', {obj: {name: 'MY NEW NAME AGAIN'}}, [444, {obj: 'MY NEW OBJ', myDate: new Date('2019/08/11'), map: new Map().set('first', 'NEW VALUEEEEEE')}]];
// console.log('CLONE RESULT', cloneObjt);
// console.log('object1', object1);
// console.log('y', y);
