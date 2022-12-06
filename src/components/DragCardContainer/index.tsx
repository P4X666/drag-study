import React from 'react';
import { useCallback, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { CardParams, DragCardItem, SizeEnum } from '../DragCard/type';
import DragCardList from '../DragCardList';
import type { CardItem, CardList, DragCardContainerInstance, DragCardContainerProps } from './type';
import { changeCardList, copyCardArr, getCardList, getChildrenLenth, transformList2Cards } from './utils';

const DragCardContainer = forwardRef((props: DragCardContainerProps, ref) => {
    const { cardList, onChange, getBackgroundColor, children } = props;
    const [cards, setCards] = useState<CardList>(transformList2Cards(cardList));

    useEffect(() => {
        setCards(transformList2Cards(cardList));
    }, [cardList]);

    const _onChange = (list: CardList, type: string) => {
        if (!onChange) return;
        onChange(getCardList(list), type);
    };

    /** 设置卡片大小 */
    const setCardSize = useCallback((card: CardParams, size: SizeEnum) => {
        setCards((prevState) => {
            const copyCardList = copyCardArr(prevState);
            const row = copyCardList.find((item) => item.key === card.rowKey);
            const column = row?.children.find((item) => item.id === card.id);
            if (!column || column.size === size) {
                return copyCardList;
            }
            column.size = size;
            changeCardList(copyCardList);
            _onChange(copyCardList, 'cardSize');
            return copyCardList;
        });
    }, []);

    useImperativeHandle(ref, (): DragCardContainerInstance => {
        return {
            setCardSize,
        };
    });
    const moveCard = useCallback(
        (dragCard: DragCardItem, hoverCard: DragCardItem, replaceIndex = 0) =>
            requestAnimationFrame(() => {
                // const moveCard = useCallback((dragCard: DragCardItem, hoverCard: DragCardItem, replaceIndex = 0) => {
                setCards((prevState) => {
                    const copyCardList = copyCardArr(prevState);
                    const cardRow = copyCardList.find((item) => item.key === dragCard.rowKey);
                    let dragCardIndex = 0;
                    let hoverCardIndex = 0;
                    const row = cardRow?.children ?? [];
                    for (let i = 0; i < row.length; i++) {
                        const item = row[i];
                        if (item.id === dragCard.id) {
                            dragCardIndex = i;
                        }
                        if (item.id === hoverCard.id) {
                            hoverCardIndex = i;
                        }
                    }
                    if (dragCardIndex + hoverCardIndex === 0) {
                        return copyCardList;
                    }
                    const dragCardCopy = row[dragCardIndex];
                    row.splice(dragCardIndex, 1);
                    row.splice(hoverCardIndex + replaceIndex, 0, dragCardCopy);
                    changeCardList(copyCardList);
                    _onChange(copyCardList, 'moveCard');
                    return copyCardList;
                });
            }),
        []
    );

    const moveRowCard = useCallback(
        (dragCard: DragCardItem, hoverCard: Pick<DragCardItem, 'rowKey'>, arrIndex = 0) =>
            requestAnimationFrame(() => {
                setCards((prevState) => {
                    const copyCardList = copyCardArr(prevState);

                    const hoverRow = copyCardList.find((item) => item.key === hoverCard.rowKey);

                    let dragRow: CardItem[] = [];
                    let dragCardItemIndex = -1;

                    for (const item of copyCardList) {
                        if (item.key === dragCard.rowKey) {
                            dragRow = item.children;
                            dragCardItemIndex = dragRow.findIndex((ele) => ele.id === dragCard.id);
                            break;
                        }
                    }
                    // 放入行中
                    if (dragCardItemIndex !== -1) {
                        hoverRow?.children.splice(arrIndex, 0, dragRow[dragCardItemIndex]!);
                        dragRow.splice(dragCardItemIndex, 1);
                    }
                    changeCardList(copyCardList);
                    _onChange(copyCardList, 'moveCard');
                    return copyCardList;
                });
            }),
        []
    );

    return (
        <div>
            {cards.map((item, rowIndex) => {
                let index = 0;
                if (rowIndex > 0) {
                    index = getChildrenLenth(cards, rowIndex);
                }
                return item.children.length ? (
                    <DndProvider backend={HTML5Backend} key={item.key}>
                        <DragCardList
                            cards={cards}
                            item={item}
                            index={index}
                            moveRowCard={moveRowCard}
                            getBackgroundColor={getBackgroundColor}
                        >
                            {children(item.key, item.children, index, { moveCard })}
                        </DragCardList>
                    </DndProvider>
                ) : null;
            })}
        </div>
    );
});

export default DragCardContainer;
