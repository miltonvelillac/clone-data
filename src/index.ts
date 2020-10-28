
export function cloneMap<K, V>(currentMap: Map<K, V>): Map<K, V> {
  const newMap = new Map();
  currentMap.forEach((val, keyMap, mapVal) => {
    const newVal = clone(val);
    newMap.set(keyMap, newVal);
  });
  return newMap;
}

export function cloneSet<T>(currentSet: Set<T>): Set<T> {
  const newSet = new Set<T>();
  currentSet.forEach((value: T) => {
    const newValue = clone(value);
    newSet.add(newValue);
  });
  return newSet;
}

export function cloneArray<T>(currentArray: T[]): T[] {
  return currentArray.map((arrayValue: any) => clone(arrayValue));
}

export function isPrimitive(data: any): boolean {
  return data !== Object(data) || data instanceof Date;
}

export function clone<T>(obj: T): any {

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

  const cloneObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitive(value)) {
      cloneObj[key] = value;
    } else if (value instanceof Map) {
      cloneObj[key] = cloneMap(value);
    } else if (value instanceof Set) {
      cloneObj[key] = cloneSet(value);
    } else if (Array.isArray(value)) {
      cloneObj[key] = cloneArray(value);
    } else if (value instanceof Object) {
      const newClone = clone(value);
      cloneObj[key] = { ...newClone };
    } else {
      throw new Error(`It is not possible to clone this data: ${value}`)
    }

  }
  return cloneObj;
}
