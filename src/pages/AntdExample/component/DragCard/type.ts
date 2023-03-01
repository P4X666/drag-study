import type { ReactNode } from 'react';

export type DragCardItem = {
    id: number;
    index: number;
};

export type CardData = Pick<DragCardItem, 'id' | 'index'>;

export type DragCardProps = {
    moveCard: (fromCardId: number, toCardId: number) => void;
    children: ReactNode;
};
