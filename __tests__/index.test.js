import genDiff from '../src/index.js';

describe('genDiff', () => {
  test('should return empty object when both objects are empty', () => {
    const obj1 = {};
    const obj2 = {};
    const expected = '{\n\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should detect added key in second object', () => {
    const obj1 = {};
    const obj2 = { key: 'value' };
    const expected = '{\n + key : value\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should detect added key in first object', () => {
    const obj1 = { key: 'value' };
    const obj2 = {};
    const expected = '{\n - key : value\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should detect unchanged key', () => {
    const obj1 = { key: 'value' };
    const obj2 = { key: 'value' };
    const expected = '{\n   key : value\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should detect changed value for the same key', () => {
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };
    const expected = '{\n - key : value1\n + key : value2\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should handle multiple keys with different changes', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 3, d: 4 };
    const expected = '{\n   a : 1\n - b : 2\n + b : 3\n - c : 3\n + d : 4\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });

  test('should sort keys alphabetically', () => {
    const obj1 = {
      a: 1, b: 2, c: 3, d: 4,
    };
    const obj2 = {
      b: 2, c: 3, a: 1, d: 4,
    };
    const expected = '{\n   a : 1\n   b : 2\n   c : 3\n   d : 4\n}';
    expect(genDiff(obj1, obj2)).toEqual(expected);
  });
});
