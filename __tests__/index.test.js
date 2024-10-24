import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { genDiff, parser } from '../index.js';
import formatStylish from '../src/formatters/formatStylish.js';
import compareTrees from '../src/compareTrees.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


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

describe('formatStylish', () => {
  it('should format added property correctly', () => {
    const diff = [
      { key: 'property1', type: 'added', val: 'value1' },
    ];

    const expected = '    + property1: value1';
    expect(formatStylish(diff)).toBe(expected);
  });

  it('should format removed property correctly', () => {
    const diff = [
      { key: 'property1', type: 'removed', val: 'value1' },
    ];

    const expected = '    - property1: value1';
    expect(formatStylish(diff)).toBe(expected);
  });

  it('should format updated property correctly', () => {
    const diff = [
      {
        key: 'property1', type: 'updated', val1: 'oldValue', val2: 'newValue',
      },
    ];

    const expected = '    - property1: oldValue\n    + property1: newValue';
    expect(formatStylish(diff)).toBe(expected);
  });

  it('should format nested properties correctly', () => {
    const diff = [
      {
        key: 'parent',
        type: 'nested',
        children: [
          { key: 'child1', type: 'added', val: 'value1' },
          { key: 'child2', type: 'removed', val: 'value2' },
        ],
      },
    ];

    const expected = '    parent: {\n        + child1: value1\n        - child2: value2\n    }';
    expect(formatStylish(diff)).toBe(expected);
  });

  it('should format complex objects correctly', () => {
    const diff = [
      {
        key: 'parent',
        type: 'added',
        val: {
          child1: 'value1',
          child2: {
            subchild1: 'subvalue1',
            subchild2: 'subvalue2',
          },
        },
      },
    ];

    const expected = '    + parent: {\n        child1: value1\n        child2: {\n            subchild1: subvalue1\n            subchild2: subvalue2\n        }\n    }';
    expect(formatStylish(diff)).toBe(expected);
  });

  it('should handle unchanged properties', () => {
    const diff = [
      { key: 'property1', type: 'same', val: 'value1' },
    ];

    const expected = '      property1: value1';
    expect(formatStylish(diff)).toBe(expected);
  });
});

describe('compareTrees', () => {
  const tree1 = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
    },
    group1: {
      foo: 'bar',
    },
  };

  const tree2 = {
    common: {
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
    },
    group1: {
      foo: 'bar',
    },
  };

  test('should detect added, removed, and updated fields', () => {
    const diff = compareTrees(tree1, tree2);

    expect(diff).toEqual([
      {
        key: 'common',
        type: 'nested',
        children: [
          { key: 'setting1', type: 'same', val: 'Value 1' },
          { key: 'setting2', type: 'removed', val: 200 },
          {
            key: 'setting3', type: 'updated', val1: true, val2: null,
          },
          { key: 'setting4', type: 'added', val: 'blah blah' },
        ],
      },
      {
        key: 'group1',
        type: 'nested',
        children: [
          { key: 'foo', type: 'same', val: 'bar' },
        ],
      },
    ]);
  });

  test('should handle empty objects', () => {
    expect(compareTrees({}, {})).toEqual([]);
  });
});

describe('genDiff', () => {
  test('generates diff for two JSON files', () => {
    const json = `    common: {
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
