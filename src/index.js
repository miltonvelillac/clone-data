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
exports.clone = exports.isPrimitive = exports.cloneArray = exports.cloneSet = exports.cloneMap = void 0;
function cloneMap(currentMap) {
    var newMap = new Map();
    currentMap.forEach(function (val, keyMap, mapVal) {
        var newVal = clone(val);
        newMap.set(keyMap, newVal);
    });
    return newMap;
}
exports.cloneMap = cloneMap;
function cloneSet(currentSet) {
    var newSet = new Set();
    currentSet.forEach(function (value) {
        var newValue = clone(value);
        newSet.add(newValue);
    });
    return newSet;
}
exports.cloneSet = cloneSet;
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
    if (obj instanceof Set) {
        return cloneSet(obj);
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
        else if (value instanceof Set) {
            cloneObj[key] = cloneSet(value);
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
