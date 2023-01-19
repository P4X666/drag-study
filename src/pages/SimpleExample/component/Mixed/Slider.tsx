import { useState, useEffect, useRef } from 'react';
import SortableCard from './SortableCard';
import { useDrop } from 'react-dnd';
import { DRAGTYPE } from './contant';
import { CardItemType } from './type';

const ITEMS = Array(15).fill('').map((_value, index) => {
  return {
    id: index + 'item',
    label: `item: ${index}`
  };
});

const Slider = () => {
  const [ cards, setcardList ] = useState<CardItemType[]>(ITEMS);

  const findCard = (id:string) => {
      const card = cards.find(c => `${c.id}` === id);
      return card
        ? {
            card,
            index: cards.indexOf(card)
          }
        : null;
    };

  const moveCard = (id: string, atIndex: number) => {
      const cardFound = findCard(id);

      if (cardFound) {
        const { card, index } = cardFound;
        cards.splice(index, 1);
        cards.splice(atIndex, 0, card);

        setcardList([ ...cards ]);
      }
    };

  const addCard = (atIndex:number, card:CardItemType) => {
      setcardList((prevState) => {
        const newCards = prevState.map(item => ({...item}));
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

  const [ { isOverSlider }, drop ] = useDrop({
    accept: DRAGTYPE,
    collect: (monitor) => {
      return {
        isOverSlider: monitor.isOver()
      };
    },
    drop(item) {
      const dropItem = item as CardItemType;
      const selectdCard = findCard(dropItem.id);
      if (!selectdCard) return;
      const { card, index } = selectdCard;
      cards.splice(index, 1, { ...card, isDragging: false });
    }
  });

  const prevIsover = useRef(false);

  useEffect(() => {
    if (prevIsover.current === true && isOverSlider === false) {
      const cardResult = cards.filter(card => {
        return !card.isDragging;
      });

      setcardList(cardResult);
    }

    prevIsover.current = isOverSlider;
  }, [ isOverSlider, cards ]);

  return (

    <div
      ref={drop}
      className="flex flex-wrap w-1/2 border border-solid rounded-lg p-4"
    >
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
          ></SortableCard>
        );
      })}

    </div>
  );
};

export default Slider;
