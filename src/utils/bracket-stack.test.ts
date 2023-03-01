import { BracketStack } from './bracket-stack';

describe('两个大括号的匹配', () => {
  it('空字符串', () => {
    const bracket = new BracketStack('');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('没有括号的字符串', () => {
    const bracket = new BracketStack('asfdgsdfgsdfgdsgsdtrhxcghdfhty');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('只有左括号', () => {
    const bracket = new BracketStack('{{');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ ]);
  });
  it('只有右括号', () => {
    const bracket = new BracketStack('}}');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ ]);
  });
  it('只有单个括号', () => {
    const leftbracket = new BracketStack('{');
    const leftStrArr = leftbracket.getVariableArr();
    expect(leftStrArr).toEqual([]);
    const bracket = new BracketStack('}');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ ]);
  });
  it('匹配到一个', () => {
    const bracket = new BracketStack('{{666}}');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '666' ]);
  });
  it('匹配到一个内嵌一个', () => {
    const bracket = new BracketStack('{{6{{6}}6}}');
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '6' ]);
  });
});
