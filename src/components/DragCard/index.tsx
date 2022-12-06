import type { FC } from 'react';
import React, { cloneElement, useState } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './index.less';
import { SizeEnum } from './type';
import type { DragCardProps, DragCardItem } from './type';

const style = {
    small: { width: 'calc(100% / 3 - 8px)', marginRight: '24px' },
    middle: { width: 'calc(100% / 2 - 12px)', marginRight: '24px' },
    large: { width: '100%' },
};

const CARD = 'card';

const DragCard: FC<DragCardProps & DragCardItem> = (props) => {
    const { id, index, size = SizeEnum.MIDDLE, rowKey, columnIndex, moveCard, children } = props;

    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop({
        accept: CARD,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragCard = item as DragCardItem;
            const dragIndex = dragCard.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // 如果不是同一行，则可以交给 DragCardList 处理
            if (dragCard.rowKey !== rowKey) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // 偏移量
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            const _handle = (replaceIndex: 0 | 1 = 0) => {
                moveCard({ ...dragCard }, { id, rowKey, columnIndex, index, size }, replaceIndex);
                dragCard.index = index;
            };
            if (dragIndex < hoverIndex && hoverClientX > hoverBoundingRect.width * 0.25) {
                // console.log('在前面，想到后面去', 'to back');
                _handle(1);
                return;
            }
            if (dragIndex > hoverIndex && hoverClientX < hoverBoundingRect.width * 0.75) {
                // console.log('在后面，想到前面去', 'to before');
                _handle(0);
                return;
            }
        },
    });

    const [canDrag, setCanDrag] = useState(true);

    const [{ isDragging }, drag] = useDrag({
        type: CARD,
        item: (): DragCardItem => {
            return { index, id, rowKey, columnIndex, size };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => canDrag,
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    const child = children as React.ReactElement;
    const childProps = { ...child?.props, setCanDrag, isOver };
    const cloneChildren = cloneElement(child, childProps);

    return (
        <div ref={ref} className={styles.card} style={{ ...style[size], opacity }}>
            {cloneChildren}
        </div>
    );
};

export default DragCard;
