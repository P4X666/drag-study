const LEFT_SEPARATORS = '{{';
const RIGHT_SEPARATORS = '}}';

type BracketStackType = {
  value: string;
  startIndex: number;
  endIndex: number;
};

type StackType = {
  value: string;
  index: number;
};

export class BracketStack {
  /** 保存外部传入的字符串变量 */
  private str: string = '';

  private stack: StackType[] = [];

  /** 所有匹配到的括号 */
  bracketStack: StackType[] = [];

  variableBracket: string[] = [];

  constructor(str: string) {
    this.init(str);
    this.matchInBracket(str);
  }

  /** 每4个则进行一次清理，防止污染 */
  private pushStack(item: StackType) {
    this.stack.push(item);
    if (this.stack.length === 4) {
      for (let i = 0; i < this.stack.length; i++) {
        this.bracketStack.push(this.stack[i]);
      }
      this.stack.length = 0;
    }
  }

  init(str: string) {
    this.str = str;
    this.stack = [];
    this.bracketStack = [];
    this.variableBracket = [];
  }

  /** 找出所有匹配到的 {{和}} */
  matchInBracket(str: string) {
    let rightSymbolsCount = 0;
    for (let i = 0; i < str.length; i++) {
      const element = str[i];
      if (LEFT_SEPARATORS[0] === element) {
        /** 初始直接填充 */
        if (this.stack.length === 0) {
          this.pushStack({
            value: element,
            index: i,
          });
        } else {
          const top = this.stack[this.stack.length - 1];
          /** 如果是相邻的两个{{ 则匹配成功 */
          if (i - top.index > 1) {
            this.stack.length = 0;
          }
          this.pushStack({
            value: element,
            index: i,
          });
        }
      }
      if (RIGHT_SEPARATORS[0] === element) {
        const top = this.stack[this.stack.length - 1];
        if (!top) continue;
        if (rightSymbolsCount === 0) {
          rightSymbolsCount++;
          this.pushStack({
            value: element,
            index: i,
          });
        } else if (rightSymbolsCount === 1) {
          /** 如果是相邻的两个}} 则匹配成功 */
          if (i - top.index > 1) {
            this.stack.pop();
            rightSymbolsCount = 1;
          } else {
            rightSymbolsCount = 0;
          }
          this.pushStack({
            value: element,
            index: i,
          });
        }
      }
    }
  }

  /** 获取被操作符包裹的变量 */
  getVariableArr(callback = (_bracketStack: BracketStackType) => { }) {
    this.variableBracket = [];
    for (let i = 1; i < this.bracketStack.length; i += 4) {
      const element = this.bracketStack[i];
      const endElement = this.bracketStack[i + 1];
      const variable = this.str.slice(element.index + 1, endElement.index);
      callback({
        value: variable,
        startIndex: element.index - 1,
        endIndex: endElement.index + 1,
      });
      this.variableBracket.push(variable);
    }
    return this.variableBracket;
  }
}
