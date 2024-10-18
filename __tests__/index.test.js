import { genDiff, parser } from '../phasad.js';
import formatValue from '../src/formatters/stylish.js';
import compareTrees from '../src/compareTrees.js';

describe('parser', () => {
  test('parses JSON file', () => {
    const json = parser('file1.json', 'json');
    const result = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: {
          key: 'value',
        },
      },
      group2: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    };
    expect(json).toEqual(result);
  });
  test('parses YAML file', () => {
    const json = parser('file1.yaml', 'yml');
    const result = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          doge: {
            wow: '',
          },
          key: 'value',
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: {
          key: 'value',
        },
      },
      group2: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    };
    expect(json).toEqual(result);
  });
});

describe('formatValue', () => {
  test('formats a flat object correctly', () => {
    const result = formatValue({ key: 'value' }, 0);
    expect(result).toBe('{\n    key: value\n}');
  });

  test('formats a nested object correctly', () => {
    const result = formatValue({ key: { nestedKey: 'value' } }, 0);
    expect(result).toBe('{\n    key: {\n        nestedKey: value\n    }\n}');
  });
});

describe('compareTrees', () => {
  test('compares two identical objects', () => {
    const obj1 = { key: 'value' };
    const obj2 = { key: 'value' };
    const result = '      key: value';
    expect(compareTrees(obj1, obj2)).toEqual(result);
  });

  test('compares two different objects', () => {
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };
    const result = '    - key: value1\n    + key: value2';
    expect(compareTrees(obj1, obj2)).toBe(result);
  });
});

test('compares nested objects', () => {
  const obj1 = { key: { nestedKey: 'value1' } };
  const obj2 = { key: { nestedKey: 'value2' } };
  const result = '      key: {\n        - nestedKey: value1\n        + nestedKey: value2\n      }';
  expect(compareTrees(obj1, obj2)).toBe(result);
});

describe('genDiff', () => {
  test('generates diff for two JSON files', () => {
    const json = `      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
          setting6: {
              doge: {
                - wow: 
                + wow: so much
              }
              key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
            key: value
        }
        + nest: str
      }
    - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
    + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }`;
    expect(genDiff('file1.json', 'file2.json', 'json')).toBe(json);
  });
});
