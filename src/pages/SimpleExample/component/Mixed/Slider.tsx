import { useState, useRef } from 'react';
import SortableCard from './SortableCard';
import { useDrop } from 'react-dnd';
import { DRAGTYPE } from './contant';
import { CardItemType } from './type';

const Slider = () => {
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
      console.log(card.label, '移动新位置啦');
      console.log(
index, atIndex, prevState[atIndex].label, '被挤到后面啦'
);
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

  const deleteCard = (atIndex: number) => {
    cards.splice(atIndex, 1);
  };

  //   const cardAlreadyExists = useCallback((id: string) => {
  //       if (cards.find(card => card.id === id)) {
  //         return true;
  //       }

  //       return false;
  //     },
  //     [ cards ]);

  // eslint-disable-next-line no-unused-vars
  const [ { isOverSlider }, drop ] = useDrop({
    accept: DRAGTYPE,
    collect: (monitor) => {
      return {
        isOverSlider: monitor.isOver(),
      };
    },
    drop(item) {
      const dropItem = item as CardItemType;
      const selectdCard = findCard(dropItem.id);
      if (!selectdCard) {
        addCard(cards.length, {
          ...dropItem,
          cardFromSearch: false,
          isDragging: false,
        });
        return;
      }
      const { card, index } = selectdCard;
      cards.splice(index, 1, { ...card, isDragging: false });
    },
  });

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
    <div ref={drop} className="w-1/2 border border-solid rounded-lg p-4">
      {cards.map((card, index) => {
        return (
          <SortableCard
            key={card.id}
            id={card.id}
            index={index}
            label={card.label}
            moveCard={moveCard}
            addCard={addCard}
            // cardAlreadyExists={cardAlreadyExists}
            findCard={findCard}
            deleteCard={deleteCard}
            lastHoverCard={lastHoverCard}
          ></SortableCard>
        );
      })}
    </div>
  );
};

export default Slider;
