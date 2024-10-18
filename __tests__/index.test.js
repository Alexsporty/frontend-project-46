import { genDiff } from '../phasad.js';

describe('diff function tests', () => {
  test('Вложенные структуры', () => {
    const tree1 = {
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

    const tree2 = {
      common: {
        follow: false,
        setting1: 'Value 1',
        setting3: null,
        setting4: 'blah blah',
        setting5: {
          key5: 'value5',
        },
        setting6: {
          key: 'value',
          ops: 'vops',
          doge: {
            wow: 'so much',
          },
        },
      },
      group1: {
        foo: 'bar',
        baz: 'bars',
        nest: 'str',
      },
      group3: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    };

    const result = `{
      common: {
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
    }
}`;
    expect(genDiff(tree1, tree2)).toEqual(result);
  });

  test('Изменение объектов', () => {
    const tree1 = {
      group1: {
        key: 'value',
      },
    };
    const tree2 = {
      group1: {
        key: 'value',
        newKey: 'newValue',
      },
    };
    const result = `{
      group1: {
          key: value
        + newKey: newValue
      }
}`;
    expect(genDiff(tree1, tree2)).toEqual(result);
  });

  test('Удаление ключей', () => {
    const tree1 = {
      key1: 'value1',
      key2: 'value2',
    };
    const tree2 = {
      key1: 'value1',
    };
    const result = `{
      key1: value1
    - key2: value2
}`;
    expect(genDiff(tree1, tree2)).toEqual(result);
  });

  test('Добавление ключей', () => {
    const tree1 = {
      key1: 'value1',
    };
    const tree2 = {
      key1: 'value1',
      key2: 'value2',
    };
    const result = `{
      key1: value1
    + key2: value2
}`;
    expect(genDiff(tree1, tree2)).toEqual(result);
  });

  test('Изменение значений', () => {
    const tree1 = {
      key1: 'value1',
    };
    const tree2 = {
      key1: 'value2',
    };
    const result = `{
    - key1: value1
    + key1: value2
}`;
    expect(genDiff(tree1, tree2)).toEqual(result);
  });
});
