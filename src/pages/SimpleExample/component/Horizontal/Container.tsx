import update from 'immutability-helper';
import { FC, useRef } from 'react';
import { useCallback, useState } from 'react';
import Card from './Card';

export interface Item {
  id: string;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const Container: FC = () => {
  const [ cards, setCards ] = useState(Array(6)
      .fill('')
      .map((_item, index) => ({ id: `${index}`, text: `card ${index}` })));

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) => update(prevCards, {
        $splice: [
          [ dragIndex, 1 ],
          [ hoverIndex, 0, prevCards[dragIndex] as Item ],
        ],
      }));
  }, []);

  const lastHoverCard = useRef<{
    dragIndex: number;
    hoverIndex: number;
  }>();

  return (
    <div className="flex">
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            lastHoverCard={lastHoverCard}
          />
        );
      })}
    </div>
  );
};

export default Container;
