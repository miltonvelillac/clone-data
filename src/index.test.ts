import { cloneArray, cloneMap, cloneSet, isPrimitive } from "./index";

describe('#cloneArray', () => {
    test('clone a simple array', () => {
        // Arrange:
        const arrayTest = [1, 2, 'hello'];

        // Act:
        const newArray = cloneArray(arrayTest);

        // Assert:
        expect(newArray).toEqual(arrayTest);
        expect(newArray).not.toBe(arrayTest);
    });

    test('clone a complex array with internal object', () => {
        // Arrange:
        const arrayTest: any[] = [1, 2, 'hello', {id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, {data: 99}]}];

        // Act:
        const newArray: any[] = cloneArray(arrayTest);

        // Assert:
        expect(newArray).toEqual(arrayTest);
        expect(newArray[3]).toEqual(arrayTest[3]);
        expect(newArray[3].myMap).toEqual(arrayTest[3].myMap);
        expect(newArray[3].mySet).toEqual(arrayTest[3].mySet);
        expect(newArray[3].arr).toEqual(arrayTest[3].arr);
        expect(newArray[3].arr[1]).toEqual(arrayTest[3].arr[1]);

        expect(newArray).not.toBe(arrayTest);
        expect(newArray[3]).not.toBe(arrayTest[3]);
        expect(newArray[3].myMap).not.toBe(arrayTest[3].myMap);
        expect(newArray[3].mySet).not.toBe(arrayTest[3].mySet);
        expect(newArray[3].arr).not.toBe(arrayTest[3].arr);
        expect(newArray[3].arr[1]).not.toBe(arrayTest[3].arr[1]);
    });
});

describe('#cloneMap', () => {
    test('clone a simple map', () => {
        // Arrange:
        const mapTest = new Map().set('firstKey', 1).set('secondKey', true).set(99, new Date());

        // Act:
        const newMap = cloneMap(mapTest);

        // Assert:
        expect(newMap).toEqual(mapTest);
        expect(newMap).not.toBe(mapTest);
    });
});

describe('#cloneSet', () => {
    test('clone a simple set', () => {
        // Arrange:
        const setTest = new Set().add(99);

        // Act:
        const newSet = cloneSet(setTest);

        // Assert:
        expect(newSet).toEqual(setTest);
        expect(newSet).not.toBe(setTest);
    });
});


describe('#isPrimitive', () => {
    test('isPrimitive boolean', () => {
        // Arrange:
        const primitiveDataTrue = true;
        const primitiveDataFalse = true;

        // Act:
        const isPrimitiveResponseTrue: boolean = isPrimitive(primitiveDataTrue);
        const isPrimitiveResponseFalse: boolean = isPrimitive(primitiveDataFalse);

        // Assert:
        expect(isPrimitiveResponseTrue).toBeTruthy();
        expect(isPrimitiveResponseFalse).toBeTruthy();
    });
    test('isPrimitive string', () => {
        // Arrange:
        const primitiveData = 'My string';
        const primitiveDataEmpty = '';

        // Act:
        const isPrimitiveResponse: boolean = isPrimitive(primitiveData);
        const isPrimitiveResponseEmpty: boolean = isPrimitive(primitiveDataEmpty);

        // Assert:
        expect(isPrimitiveResponse).toBeTruthy();
        expect(isPrimitiveResponseEmpty).toBeTruthy();
    });
    test('isPrimitive Date', () => {
        // Arrange:
        const primitiveData = new Date();

        // Act:
        const isPrimitiveResponse: boolean = isPrimitive(primitiveData);

        // Assert:
        expect(isPrimitiveResponse).toBeTruthy();
    });

    test('isPrimitive Number', () => {
        // Arrange:
        const primitiveData = 0;
        const primitiveDataNegative = -1;
        const primitiveDataPositive = 1;

        // Act:
        const isPrimitiveResponse: boolean = isPrimitive(primitiveData);
        const isPrimitiveResponseNegative: boolean = isPrimitive(primitiveDataNegative);
        const isPrimitiveResponsePositive: boolean = isPrimitive(primitiveDataPositive);

        // Assert:
        expect(isPrimitiveResponse).toBeTruthy();
        expect(isPrimitiveResponseNegative).toBeTruthy();
        expect(isPrimitiveResponsePositive).toBeTruthy();
    });

    test('isPrimitive undefined and null', () => {
        // Arrange:
        const primitiveDataNull = null;
        const primitiveDataUndefined = undefined;

        // Act:
        const isPrimitiveResponseNull: boolean = isPrimitive(primitiveDataNull);
        const isPrimitiveResponseUndefined: boolean = isPrimitive(primitiveDataUndefined);

        // Assert:
        expect(isPrimitiveResponseNull).toBeTruthy();
        expect(isPrimitiveResponseUndefined).toBeTruthy();
    });

    test('isPrimitive Object should be false', () => {
        // Arrange:
        const object = { id: 'dsfjsltjew', name: 'Son Goku' };
        const objectEmpty = {};

        // Act:
        const isPrimitiveResponseObject: boolean = isPrimitive(object);
        const isPrimitiveResponseObjectEmpty: boolean = isPrimitive(objectEmpty);

        // Assert:
        expect(isPrimitiveResponseObject).toBeFalsy();
        expect(isPrimitiveResponseObjectEmpty).toBeFalsy();
    });

    test('isPrimitive Map should be false', () => {
        // Arrange:
        const map = new Map().set(1, 8);
        const mapEmpty = new Map();

        // Act:
        const isPrimitiveResponseMap: boolean = isPrimitive(map);
        const isPrimitiveResponseMapEmtpy: boolean = isPrimitive(mapEmpty);

        // Assert:
        expect(isPrimitiveResponseMap).toBeFalsy();
        expect(isPrimitiveResponseMapEmtpy).toBeFalsy();
    });

    test('isPrimitive Array should be false', () => {
        // Arrange:
        const array = [1, 2, 54];
        const arrayEmpty: any = [];

        // Act:
        const isPrimitiveResponseArray: boolean = isPrimitive(array);
        const isPrimitiveResponseArrayEmtpy: boolean = isPrimitive(arrayEmpty);

        // Assert:
        expect(isPrimitiveResponseArray).toBeFalsy();
        expect(isPrimitiveResponseArrayEmtpy).toBeFalsy();
    });

    test('isPrimitive Array should be false', () => {
        // Arrange:
        const set = new Set().add(1).add(4);
        const setEmpty: any = new Set();

        // Act:
        const isPrimitiveResponseSet: boolean = isPrimitive(set);
        const isPrimitiveResponseSetEmtpy: boolean = isPrimitive(setEmpty);

        // Assert:
        expect(isPrimitiveResponseSet).toBeFalsy();
        expect(isPrimitiveResponseSetEmtpy).toBeFalsy();
    });
});
