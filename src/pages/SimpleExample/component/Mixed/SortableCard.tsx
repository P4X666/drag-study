import { useDrag, useDrop } from 'react-dnd';
import React, { useRef, useEffect } from 'react';
import type { CardItemType } from './type';
import styles from './index.less';
import { DRAGTYPE } from './contant';

type ItemType = {
  id: string;
  label: string;
  cardFromSearch?: boolean;
  index: number;
};

type SortableCardProps = ItemType & {
    moveCard: (id: string, atIndex: number) => void;
    addCard: (atIndex: number, card: CardItemType) => void;
    deleteCard?: (id: string) => void;
    // 保存被拖拽的数据
    lastHoverCard: React.MutableRefObject<CardItemType | undefined>;
    /** 拖拽是否结束 */
    isDragTagEnd: boolean;
    disabled?: boolean;
};

type SortableCardType = ItemType & {
    cardFromSearch: boolean;
    isDragging: boolean;
};

const SortableCard = (props: SortableCardProps) => {
    const {
        id,
        label,
        moveCard,
        addCard,
        // deleteCard,
        index,
        // isTag,
        // setAtLeastOneDraging,
        lastHoverCard,
        isDragTagEnd,
    } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [ { isDragging }, drag ] = useDrag({
        type: DRAGTYPE,
        item: () => {
            // setAtLeastOneDraging(true);
            return {
                id,
                cardFromSearch: false,
                index,
                label,
            } as SortableCardType;
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
        end: (item, monitor) => {
            const itemDropped = monitor.didDrop();
            if (lastHoverCard.current && itemDropped) {
                moveCard(item.id, lastHoverCard.current.index!);
                lastHoverCard.current = undefined;
            }
        },
    });

    /** 当拖拽标签落下时，触发刷新 */
    useEffect(() => {
        if (lastHoverCard.current && isDragTagEnd) {
            addCard(lastHoverCard.current.index!, lastHoverCard.current);
            lastHoverCard.current = undefined;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isDragTagEnd ]);

    const [ { isOver }, drop ] = useDrop({
        accept: DRAGTYPE,
        /** 禁止移出 */
        // canDrop: () => false,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },
        drop(item) {
            if (!ref.current) {
                return;
            }
            const cardBeingDragged = { ...(item as SortableCardType) };
            /**
             * 设置 index 防止闪动
             * 光标出现在那里，那么该变量就出现在那里，当内容区里面没有光标的时候，变量放在最后
             *  */
            if (
                cardBeingDragged.index === index
                // 如果前一个hover到后一个头上时，禁止移动
                || cardBeingDragged.index + 1 === index
            ) {
                return;
            }
            if (cardBeingDragged.id === id) {
                return;
            }
            /** 是否为向后拖拽 保证都是放到盒子的前面 */
            const toback = cardBeingDragged.index < index;
            cardBeingDragged.index = toback ? index - 1 : index;
            /** 如果是从外部传入，则新增，否则移动位置 */
            if (cardBeingDragged.cardFromSearch) {
                cardBeingDragged.cardFromSearch = false;
                lastHoverCard.current = cardBeingDragged;
            } else {
                if (cardBeingDragged.id !== id) {
                    lastHoverCard.current = cardBeingDragged;
                }
            }
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={styles.dragTag}
            style={{
                opacity: isDragging ? 0.4 : 1,
                backgroundColor: 'transparent',
            }}
        >
            {/* 当有标签在其上时，显示该竖线 */}
            {isOver && <div className={styles.verticalLine} />}
            {label}
        </div>
    );
};

export default SortableCard;
