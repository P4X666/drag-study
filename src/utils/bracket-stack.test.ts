import { BracketStack } from './bracket-stack';

describe('两个大括号的匹配', () => {
  it('空字符串', () => {
    const bracket = new BracketStack([ '' ]);
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('没有括号的字符串', () => {
    const bracket = new BracketStack(Array.from('asfdgsdfgsdfgdsgsdtrhxcghdfhty'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('只有左括号', () => {
    const bracket = new BracketStack(Array.from('{{'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('只有右括号', () => {
    const bracket = new BracketStack(Array.from('}}'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('只有单个括号', () => {
    const leftbracket = new BracketStack(Array.from('{'));
    const leftStrArr = leftbracket.getVariableArr();
    expect(leftStrArr).toEqual([]);
    const bracket = new BracketStack(Array.from('}'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([]);
  });
  it('匹配到一个', () => {
    const bracket = new BracketStack(Array.from('{{666}}'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '666' ]);
  });
  it('匹配到两个', () => {
    const bracket = new BracketStack(Array.from('{{666}}{{666}}'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '666', '666' ]);
  });
  it('匹配到一个内嵌一个', () => {
    const bracket = new BracketStack(Array.from('{{6{{6}}6}}'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '6' ]);
  });
  it('字符串中有emoji', () => {
    const bracket = new BracketStack(Array.from('😘{{66😜6}}😁{{666}}😂'));
    const strArr = bracket.getVariableArr();
    expect(strArr).toEqual([ '66😜6', '666' ]);
  });
});
