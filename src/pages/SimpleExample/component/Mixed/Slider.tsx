import React, { useState, useRef, useEffect } from 'react';
import SortableCard from './SortableCard';
import { useDrop } from 'react-dnd';
import { DRAGTYPE } from './constant';
import { CardItemType } from './type';

type SliderProps = {
  isDragTagEnd: boolean;
  setIsDragTagEnd: React.Dispatch<React.SetStateAction<boolean>>;
};

const Slider = (props: SliderProps) => {
  const { isDragTagEnd, setIsDragTagEnd } = props;
  const [ cards, setcardList ] = useState<CardItemType[]>([]);
  const findCard = (id: string) => {
    const card = cards.find((c) => `${c.id}` === id);
    return card
      ? {
          card,
          index: cards.indexOf(card),
        }
      : null;
  };

  const moveCard = (id: string, atIndex: number) => {
    setcardList((prevState) => {
      const cardFound = findCard(id);
      if (!cardFound) {
        return prevState;
      }
      const { card, index } = cardFound;
      const newCards = prevState.map((item) => ({ ...item }));
      newCards.splice(index, 1);
      newCards.splice(atIndex, 0, card);
      return newCards;
    });
  };

  const addCard = (atIndex: number, card: CardItemType) => {
    setcardList((prevState) => {
      console.log(card, 'cardcardcard');
      if (prevState.find((item) => item.id === card.id)) {
        return prevState;
      }
      const newCards = prevState.map((item) => ({ ...item }));
      newCards.splice(atIndex, 0, card);
      return newCards;
    });
  };

  const [ { isOverSlider }, drop ] = useDrop({
    accept: DRAGTYPE,
    collect: (monitor) => {
      return {
        isOverSlider: monitor.isOver(),
      };
    },
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      const dropItem = item as CardItemType;
      /** 如果没有落点没有在任何一个盒子附近，则最外层兜底 */
      if (!didDrop) {
        /** 如果来自左侧，则直接新增到最后 */
        if (dropItem.cardFromSearch) {
          addCard(cards.length, {
            ...dropItem,
            cardFromSearch: false,
            isDragging: true,
          });
          return;
        }
        /** 如果在内部拖拽时，没有放到任何一个盒子上面，则将其放到最后 */
        moveCard(dropItem.id, cards.length);
      }
    },
  });

  useEffect(() => {
    /** 只要拖拽的不在上面时，状态为false */
    if (!isOverSlider) {
      setIsDragTagEnd(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isOverSlider ]);

  const lastHoverCard = useRef<CardItemType>();

  // const prevIsover = useRef(false);

  // useEffect(() => {
  //   if (prevIsover.current === true && isOverSlider === false) {
  //     const cardResult = cards.filter(card => {
  //       return !card.isDragging;
  //     });

  //     setcardList(cardResult);
  //   }

  //   prevIsover.current = isOverSlider;
  // }, [ isOverSlider, cards ]);

  return (
    <div ref={drop} className="w-1/2 border border-solid rounded-lg p-4 flex flex-wrap">
      {cards.map((card, index) => {
        return (
          <SortableCard
            key={card.id}
            id={card.id}
            index={index}
            label={card.label}
            moveCard={moveCard}
            addCard={addCard}
            lastHoverCard={lastHoverCard}
            isDragTagEnd={isDragTagEnd}
          />
        );
      })}
    </div>
  );
};

export default Slider;
