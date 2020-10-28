
function cloneMap<K, V>(currentMap: Map<K, V>): Map<K, V> {
  const newMap = new Map();
  currentMap.forEach((val, keyMap, mapVal) => {
    const newVal = clone(val);
    newMap.set(keyMap, newVal);
  });
  return newMap;
}

function cloneArray<T>(currentArray: T[]): T[] {
  return currentArray.map((arrayValue: any) => clone(arrayValue));
}

function isPrimitive(data: any): boolean {
  return data !== Object(data) || data instanceof Date;
}

function clone(obj: any): any {

  if (isPrimitive(obj)) {
    return obj;
  }

  if (obj instanceof Map) {
    return cloneMap(obj);
  }

  if (Array.isArray(obj)) {
    return cloneArray(obj);
  }

  const cloneObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitive(value)) {
      cloneObj[key] = value;
    } else if (value instanceof Map) {
      cloneObj[key] = cloneMap(value);
    } else if (Array.isArray(value)) {
      cloneObj[key] = cloneArray(value);
    } else {
      const newClone = clone(value);
      cloneObj[key] = { ...newClone };
    }

  }
  return cloneObj;
}


const map = new Map().set('first', 'valueFirst').set('second', 'valueSecond');

const object1 = {
  a: "somestring",
  b: 42,
  c: { name: "my name", data: { oth: 'other value' } },
  d: ['first', 2],
  e: ['first', { obj: { name: 'my name again' } }, [4, { obj: 'my obj', myDate: new Date('2020/07/10'), map }]]
};

const cloneObjt = clone(object1);
const y = object1;
object1.a = 'new Data';
object1.b = 99;
object1.c = { name: "NEW NAME", data: {oth: 'NEW OTHER VALUE'} };
object1.d = ['NEW FIRST', 2222];
object1.e = ['SECOND', {obj: {name: 'MY NEW NAME AGAIN'}}, [444, {obj: 'MY NEW OBJ', myDate: new Date('2019/08/11'), map: new Map().set('first', 'NEW VALUEEEEEE')}]];

console.log('CLONE RESULT', cloneObjt);
console.log('object1', object1);
console.log('y', y);
