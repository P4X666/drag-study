import React from 'react';

export type DragCardItem = {
    rowKey: string;
    columnIndex: number;
    id: string | number;
    index: number;
};

export type CardParams = Omit<DragCardItem, 'index'>;

export type DragCardProps = {
    moveCard: (dragCard: DragCardItem, hoverCard: DragCardItem, index?: 0 | 1) => void;
    setCardSize: (card: CardParams) => void;
    children: typeof React.Children;
};
