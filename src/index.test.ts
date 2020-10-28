import { clone, cloneArray, cloneMap, cloneSet, isPrimitive } from "./index";

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
        const arrayTest: any[] = [1, 2, 'hello', { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] }];

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

    test('without clone a complex array with internal object', () => {
        // Arrange:
        const arrayTest: any[] = [1, 2, 'hello', { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] }];

        // Act:
        const newArray: any[] = arrayTest;

        // Assert:
        expect(newArray).toEqual(arrayTest);
        expect(newArray[3]).toEqual(arrayTest[3]);
        expect(newArray[3].myMap).toEqual(arrayTest[3].myMap);
        expect(newArray[3].mySet).toEqual(arrayTest[3].mySet);
        expect(newArray[3].arr).toEqual(arrayTest[3].arr);
        expect(newArray[3].arr[1]).toEqual(arrayTest[3].arr[1]);

        expect(newArray).toBe(arrayTest);
        expect(newArray[3]).toBe(arrayTest[3]);
        expect(newArray[3].myMap).toBe(arrayTest[3].myMap);
        expect(newArray[3].mySet).toBe(arrayTest[3].mySet);
        expect(newArray[3].arr).toBe(arrayTest[3].arr);
        expect(newArray[3].arr[1]).toBe(arrayTest[3].arr[1]);
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

    test('clone a complex map', () => {
        // Arrange:
        const secondKey = 99;
        const thirdKey = new Date().getTime;
        const fourth = 'Set';
        const mapTest = new Map()
            .set('firstKey', 1)
            .set(secondKey, { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .set(thirdKey, new Map().set('name', 'Goku'))
            .set(fourth, new Set().add({ id: '1234' }));

        // Act:
        const newMap = cloneMap(mapTest);

        // Assert:
        expect(newMap).toEqual(mapTest);

        expect(newMap).not.toBe(mapTest);
        expect(newMap.get(secondKey)).not.toBe(mapTest.get(secondKey));
        expect(newMap.get(secondKey).myMap).not.toBe(mapTest.get(secondKey).myMap);
        expect(newMap.get(secondKey).mySet).not.toBe(mapTest.get(secondKey).mySet);
        expect(newMap.get(secondKey).mySet).not.toBe(mapTest.get(secondKey).arr);
        expect(newMap.get(secondKey).mySet).not.toBe(mapTest.get(secondKey).arr[1]);
        expect(newMap.get(thirdKey)).not.toBe(mapTest.get(thirdKey));
        expect(newMap.get(fourth)).not.toBe(mapTest.get(fourth));
    });

    test('without clone a complex map', () => {
        // Arrange:
        const secondKey = 99;
        const thirdKey = new Date().getTime;
        const fourth = 'Set';
        const mapTest = new Map()
            .set('firstKey', 1)
            .set(secondKey, { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .set(thirdKey, new Map().set('name', 'Goku'))
            .set(fourth, new Set().add({ id: '1234' }));

        // Act:
        const newMap = mapTest;

        // Assert:
        expect(newMap).toEqual(mapTest);

        expect(newMap).toBe(mapTest);
        expect(newMap.get(secondKey)).toBe(mapTest.get(secondKey));
        expect(newMap.get(secondKey).myMap).toBe(mapTest.get(secondKey).myMap);
        expect(newMap.get(secondKey).mySet).toBe(mapTest.get(secondKey).mySet);
        expect(newMap.get(thirdKey)).toBe(mapTest.get(thirdKey));
        expect(newMap.get(fourth)).toBe(mapTest.get(fourth));
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

    test('clone a complex set', () => {
        // Arrange:
        const setTest = new Set()
            .add(99)
            .add({ id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .add(new Map().set('name', 'Goku'))
            .add(new Set().add({ id: '1234' }))
            .add([4, { data: 99 }]);

        // Act:
        const newSet = cloneSet(setTest);

        const objFirsSet: any = Array.from(setTest)[1];
        const objFirsSetResult: any = Array.from(newSet)[1];

        // Assert:
        expect(newSet).toEqual(setTest);

        expect(newSet).not.toBe(setTest);
        expect(Array.from(newSet)[1]).not.toBe(Array.from(setTest)[1]);
        expect(objFirsSetResult.myMap).not.toBe(objFirsSet.myMap);
        expect(objFirsSetResult.mySet).not.toBe(objFirsSet.mySet);
        expect(objFirsSetResult.arr).not.toBe(objFirsSet.arr);
        expect(Array.from(newSet)[2]).not.toBe(Array.from(setTest)[2]);
        expect(Array.from(newSet)[3]).not.toBe(Array.from(setTest)[3]);
        expect(Array.from(newSet)[4]).not.toBe(Array.from(setTest)[4]);
    });

    test('whitout clone a complex set', () => {
        // Arrange:
        const setTest = new Set()
            .add(99)
            .add({ id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .add(new Map().set('name', 'Goku'))
            .add(new Set().add({ id: '1234' }))
            .add([4, { data: 99 }]);

        // Act:
        const newSet = setTest;

        const objFirsSet: any = Array.from(setTest)[1];
        const objFirsSetResult: any = Array.from(newSet)[1];

        // Assert:
        expect(newSet).toEqual(setTest);

        expect(newSet).toBe(setTest);
        expect(Array.from(newSet)[1]).toBe(Array.from(setTest)[1]);
        expect(objFirsSetResult.myMap).toBe(objFirsSet.myMap);
        expect(objFirsSetResult.mySet).toBe(objFirsSet.mySet);
        expect(objFirsSetResult.arr).toBe(objFirsSet.arr);
        expect(Array.from(newSet)[2]).toBe(Array.from(setTest)[2]);
        expect(Array.from(newSet)[3]).toBe(Array.from(setTest)[3]);
        expect(Array.from(newSet)[4]).toBe(Array.from(setTest)[4]);
    });
});

describe('#clone Function', () => {
    test('clone a simple data', () => {
        // Arrange:
        const dataString = 'hello';
        const dataTime = new Date();
        const dataBoolean = true;
        const dataNumber = 1000;

        // Act:
        const newDataString = clone(dataString);
        const newDataTime = clone(dataTime);
        const newDataBoolean = clone(dataBoolean);
        const newDataNumber = clone(dataNumber);

        // Assert:
        expect(newDataString).toEqual(dataString);
        expect(newDataTime).toEqual(dataTime);
        expect(newDataBoolean).toEqual(dataBoolean);
        expect(newDataNumber).toEqual(dataNumber);
    });

    test('clone a simple data null or undefined', () => {
        // Arrange:
        const dataNull = null;
        const dataUndefined = undefined;

        // Act:
        const newDataNull = clone(dataNull);
        const newDataUndefined = clone(dataUndefined);

        // Assert:
        expect(newDataNull).toEqual(dataNull);
        expect(newDataUndefined).toEqual(dataUndefined);
    });

    test('clone a simple object', () => {
        // Arrange:
        const object = { id: '123', name: 'Son Goku', age: 33, date: new Date(), allow: true, injured: false };

        // Act:
        const newObject = clone(object);

        // Assert:
        expect(newObject).toEqual(object);
        expect(newObject).not.toBe(object);
    });

    test('clone a complex object', () => {
        // Arrange:

        // Map
        const secondKey = 99;
        const thirdKey = new Date().getTime;
        const fourthKey = 'Set';
        const mapTest = new Map()
            .set('firstKey', 1)
            .set(secondKey, { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .set(thirdKey, new Map().set('name', 'Goku'))
            .set(fourthKey, new Set().add({ id: '1234' }));

        // Array
        const arrTest = [1, 2, 'hello', { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] }];

        // Set
        const setTest = new Set()
            .add(99)
            .add({ id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .add(new Map().set('name', 'Goku'))
            .add(new Set().add({ id: '1234' }))
            .add([4, { data: 99 }]);

        // Object
        const object: any = {
            id: '123',
            arrTest,
            mapTest,
            setTest
        };

        // Act:
        const newObject = clone(object);

        const objFirsSet: any = Array.from(object.setTest)[1];
        const objFirsSetResult: any = Array.from(newObject.setTest)[1];

        // Assert:
        expect(newObject).toEqual(object);

        expect(newObject).not.toBe(object);

        expect(newObject.arrTest).not.toBe(object.arrTest);
        expect(newObject.arrTest[3]).not.toBe(object.arrTest[3]);
        expect(newObject.arrTest[3].myMap).not.toBe(object.arrTest[3].myMap);
        expect(newObject.arrTest[3].mySet).not.toBe(object.arrTest[3].mySet);
        expect(newObject.arrTest[3].arr).not.toBe(object.arrTest[3].arr);
        expect(newObject.arrTest[3].arr[1]).not.toBe(object.arrTest[3].arr[1]);

        expect(newObject.mapTest).not.toBe(object.mapTest);
        expect(newObject.mapTest.get(secondKey)).not.toBe(object.mapTest.get(secondKey));
        expect(newObject.mapTest.get(secondKey).myMap).not.toBe(object.mapTest.get(secondKey).myMap);
        expect(newObject.mapTest.get(secondKey).mySet).not.toBe(object.mapTest.get(secondKey).mySet);
        expect(newObject.mapTest.get(secondKey).arr).not.toBe(object.mapTest.get(secondKey).arr);
        expect(newObject.mapTest.get(secondKey).arr[1]).not.toBe(object.mapTest.get(secondKey).arr[1]);
        expect(newObject.mapTest.get(thirdKey)).not.toBe(object.mapTest.get(thirdKey));
        expect(newObject.mapTest.get(fourthKey)).not.toBe(object.mapTest.get(fourthKey));


        expect(newObject.setTest).not.toBe(object.setTest);
        expect(objFirsSetResult).not.toBe(objFirsSet);
        expect(objFirsSetResult.myMap).not.toBe(objFirsSet.myMap);
        expect(objFirsSetResult.mySet).not.toBe(objFirsSet.mySet);
        expect(objFirsSetResult.arr).not.toBe(objFirsSet.arr);
        expect(Array.from(newObject.setTest)[2]).not.toBe(Array.from(object.setTest)[2]);
        expect(Array.from(newObject.setTest)[3]).not.toBe(Array.from(object.setTest)[3]);
        expect(Array.from(newObject.setTest)[4]).not.toBe(Array.from(object.setTest)[4]);
    });
});

describe('#isPrimitive', () => {
    test('isPrimitive boolean', () => {
        // Arrange:
        const primitiveDataTrue = true;
        const primitiveDataFalse = false;

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
