import { CardItem, CardList } from './type';

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

/** 调整列表的子项，如果一行中的盒子宽度相加大于1，则将最后一个（如果有）另起新行 */
export const changeCardList = (list: CardList) => {
    let nextKey = -1;
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const [, rowKey] = item.key.split(SEPARATOR);
        const numRowKey = +rowKey;
        if (nextKey < numRowKey) {
            nextKey = numRowKey;
        }
    }
    nextKey++;
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
