import type { ReactChildren } from 'react';
import { SizeEnum } from '../../interface';

export type DragCardItem = {
    rowKey: string;
    columnIndex: number;
    id: string | number;
    index: number;
    size: SizeEnum;
};

export type CardParams = Omit<DragCardItem, 'index'>;

export type DragCardProps = {
    /** 默认 middle */
    size?: SizeEnum;
    moveCard: (dragCard: DragCardItem, hoverCard: DragCardItem, index?: 0 | 1) => void;
    setCardSize: (card: CardParams, size: SizeEnum) => void;
    children: ReactChildren;
};
export { SizeEnum };
