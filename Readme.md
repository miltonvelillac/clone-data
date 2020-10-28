# TYPESCRIPT-CLONE-DATA is a typescript is a set of functions that allow clone in deep complex objects, maps, sets or arrays
* For a complex object use clone function
- const myClonedObject = CloneDataInDeep.clone(myObject)
* For a complex or simple array use cloneArray function
- const myClonedArray = CloneDataInDeep.cloneArray(myArray)
* For a complex or simple map use cloneMap function
- const myClonedMap = CloneDataInDeep.cloneMap(myMap)
* For a complex or simple set use cloneSet function
- const myClonedSet = CloneDataInDeep.cloneSet(mySet)

* or if you prefer for any of the cases you can use the clone function

# EXAMPLES:
* clone function
function testClone() {
    const objectTest = {
        id: '123',
        age: 33, date: new Date(),
        allow: true,
        injured: false,
        arrData: {name: 'my name', arr: [{id: '123', name: 'my name'}]},
        mapData: new Map().set(1, {id: '123}),
        setData: new Set().add(99).add({data: 'more data'})
    };
    const clonedObject = CloneDataInDeep.clone(objectTest);
}

* cloneArray function
function testClone() {
    const arrayTest: any[] = [1, 2, 'hello', { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] }];
    const clonedArray: any[] = CloneDataInDeep.cloneArray(arrayTest);
}

* cloneMap function
function testClone() {
    const mapTest = new Map()
            .set('firstKey', 1)
            .set('secondKey', { id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .set('thirdKey', new Map().set('name', 'My name'))
            .set('fourth', new Set().add({ id: '1234' }));
    const clonedMap = CloneDataInDeep.cloneMap(mapTest);
}

* myClonedSet function
function testClone() {
    const setTest = new Set()
            .add(99)
            .add({ id: 'myId', myMap: new Map().set(1, 44), mySet: new Set().add(99), arr: [4, { data: 99 }] })
            .add(new Map().set('name', 'My name'))
            .add(new Set().add({ id: '1234' }))
            .add([4, { data: 99 }]);
    const clonedSet = CloneDataInDeep.cloneSet(setTest);
}
