
export class CloneDataInDeep {
  static cloneMap<K, V>(currentMap: Map<K, V>): Map<K, V> {
    const newMap = new Map();
    currentMap.forEach((val, keyMap, mapVal) => {
      const newVal = this.clone(val);
      newMap.set(keyMap, newVal);
    });
    return newMap;
  }

  static cloneSet<T>(currentSet: Set<T>): Set<T> {
    const newSet = new Set<T>();
    currentSet.forEach((value: T) => {
      const newValue = this.clone(value);
      newSet.add(newValue);
    });
    return newSet;
  }

  static cloneArray<T>(currentArray: T[]): T[] {
    return currentArray.map((arrayValue: any) => this.clone(arrayValue));
  }

  static isPrimitive(data: any): boolean {
    return data !== Object(data) || data instanceof Date;
  }

  static clone<T>(obj: T): any {

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

    const cloneObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (this.isPrimitive(value)) {
        cloneObj[key] = value;
      } else if (value instanceof Map) {
        cloneObj[key] = this.cloneMap(value);
      } else if (value instanceof Set) {
        cloneObj[key] = this.cloneSet(value);
      } else if (Array.isArray(value)) {
        cloneObj[key] = this.cloneArray(value);
      } else if (value instanceof Object) {
        const newClone = this.clone(value);
        cloneObj[key] = { ...newClone };
      } else {
        throw new Error(`It is not possible to clone this data: ${value}`)
      }

    }
    return cloneObj;
  }
}

