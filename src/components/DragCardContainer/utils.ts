import type { CardItem, CardList } from './type';
import type { SizeEnum } from '../DragCard/type';

/** 分隔符 */
export const SEPARATOR = 'row';

export const copyCardArr = (cardList: CardList) => {
    return cardList.map((item) => {
        const children = item.children.map((ele) => ({ ...ele }));
        return { ...item, children };
    });
};

export const getChildrenLenth = (cardList: CardList, rowIndex: number, len: number = 0) => {
    let length = len;
    if (rowIndex - 1 >= 0) {
        length += cardList[rowIndex - 1].children.length;
        length = getChildrenLenth(cardList, rowIndex - 1, length);
    }
    return length;
};

const SIZE_WIDHT = {
    small: 3,
    middle: 5,
    large: 10,
} as const;

const getBoxWidth = (size: SizeEnum) => {
    return SIZE_WIDHT[size];
};

/**
 * 1.只有同类型的盒子才能在同一行
 * 2. 该行盒子的总宽度不能溢出
 *  */
export const isOverflow = (rowList: CardItem[]) => {
    const firstItem = rowList[0];
    if (!firstItem) {
        return;
    }
    const type: Record<string, string> = { [firstItem.size]: firstItem.size };
    let width = 0;
    for (let i = 0; i < rowList.length; i++) {
        const item = rowList[i];
        width += getBoxWidth(item.size);
        // 只有同类型的盒子才能在同一行
        if (!type[item.size]) {
            return true;
        }
    }
    // 该行盒子的总宽度不能溢出
    return width > 10;
};

/** 获取需要换行的子项集合 */
const getBreakNewLineItems = (rowList: CardItem[], breakNewLineItems: CardItem[] = []) => {
    breakNewLineItems.push(rowList.pop()!);
    const flag = isOverflow(rowList);
    if (flag) {
        getBreakNewLineItems(rowList, breakNewLineItems);
    }
    return breakNewLineItems;
};

/**
 * @desc 设置溢出的 list
 * @param list
 * @param changeIndex 发生改变的数组子项的index
 * @param nextKey 设置下一个的key
 * @param add 设置列表子项是朝前换行还是朝后换行
 */
const setOverflowList = (list: CardList, changeIndex: number, nextKey: number, add: 0 | 1 = 1) => {
    const overflowRow = list[changeIndex].children;
    const breakNewLineItems: CardItem[] = getBreakNewLineItems(overflowRow);
    list.splice(changeIndex + add, 0, {
        key: SEPARATOR + nextKey,
        children: breakNewLineItems,
    });
    /** 如果依旧溢出，则递归 */
    const flag = isOverflow(breakNewLineItems);
    if (flag) {
        setOverflowList(list, changeIndex + 1, nextKey + 1, 0);
    }
};

/** 调整列表的子项，如果一行中的盒子宽度相加大于1，则将最后一个（如果有）另起新行 */
export const changeCardList = (list: CardList) => {
    // 常理来说，只会有一行变化
    let changeIndex = -1;
    let nextKey = -1;
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const flag = isOverflow(item.children);
        if (flag) {
            changeIndex = i;
        }
        const [, rowKey] = item.key.split(SEPARATOR);
        const numRowKey = +rowKey;
        if (nextKey < numRowKey) {
            nextKey = numRowKey;
        }
    }
    nextKey++;
    // 删除溢出行的最后一个，并将其放置到新行
    if (changeIndex > -1) {
        setOverflowList(list, changeIndex, nextKey);
    }
};

export const transformList2Cards = (cardList: CardItem[][]) => {
    return cardList.map((item, index) => {
        return {
            key: SEPARATOR + index,
            children: item,
        };
    });
};

export const getCardList = (list: CardList) => {
    const cardList = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.children.length !== 0) {
            cardList.push(item.children);
        }
    }
    return cardList;
};
