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
exports.CloneDataInDeep = void 0;
var CloneDataInDeep = /** @class */ (function () {
    function CloneDataInDeep() {
    }
    CloneDataInDeep.cloneMap = function (currentMap) {
        var _this = this;
        if (!(currentMap instanceof Map)) {
            throw new Error("This is not a MAP: " + currentMap);
        }
        var newMap = new Map();
        currentMap.forEach(function (val, keyMap, mapVal) {
            var newVal = _this.clone(val);
            newMap.set(keyMap, newVal);
        });
        return newMap;
    };
    CloneDataInDeep.cloneSet = function (currentSet) {
        var _this = this;
        if (!(currentSet instanceof Set)) {
            throw new Error("This is not a SET: " + currentSet);
        }
        var newSet = new Set();
        currentSet.forEach(function (value) {
            var newValue = _this.clone(value);
            newSet.add(newValue);
        });
        return newSet;
    };
    CloneDataInDeep.cloneArray = function (currentArray) {
        var _this = this;
        if (!Array.isArray(currentArray)) {
            throw new Error("This is not an array: " + currentArray);
        }
        return currentArray.map(function (arrayValue) { return _this.clone(arrayValue); });
    };
    CloneDataInDeep.isPrimitive = function (data) {
        return data !== Object(data) || data instanceof Date;
    };
    CloneDataInDeep.clone = function (obj) {
        if (this.isPrimitive(obj)) {
            return obj;
        }
        if (obj instanceof Map) {
            return this.cloneMap(obj);
        }
        if (obj instanceof Set) {
            return this.cloneSet(obj);
        }
        if (Array.isArray(obj)) {
            return this.cloneArray(obj);
        }
        var cloneObj = {};
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (this.isPrimitive(value)) {
                cloneObj[key] = value;
            }
            else if (value instanceof Map) {
                cloneObj[key] = this.cloneMap(value);
            }
            else if (value instanceof Set) {
                cloneObj[key] = this.cloneSet(value);
            }
            else if (Array.isArray(value)) {
                cloneObj[key] = this.cloneArray(value);
            }
            else if (value instanceof Object) {
                var newClone = this.clone(value);
                cloneObj[key] = __assign({}, newClone);
            }
            else {
                throw new Error("It is not possible to clone this data: " + value);
            }
        }
        return cloneObj;
    };
    return CloneDataInDeep;
}());
exports.CloneDataInDeep = CloneDataInDeep;
