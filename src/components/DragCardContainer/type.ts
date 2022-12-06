import type { ReactNode } from 'react';
import type { CardParams, SizeEnum } from '../DragCard/type';

export type CardItem = { id: string | number; title: string; size: SizeEnum };

export type CardListItem = {
    /** 只做内部标识 */
    key: string;
    children: CardItem[];
};

export type CardList = CardListItem[];

export type DragCardContainerProps = {
    cardList: CardItem[][];
    onChange?: (list: CardItem[][], type: string) => void;
    getBackgroundColor?: (isActive: boolean) => string;
    children: (key: string, boxs: CardItem[], index: number, cardProps: any) => ReactNode;
};

export type DragCardContainerInstance = {
    /** 设置卡片大小 */
    setCardSize: (card: CardParams, size: SizeEnum) => void;
};
