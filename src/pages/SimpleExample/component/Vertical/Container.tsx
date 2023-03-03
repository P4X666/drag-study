import update from 'immutability-helper';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import Card from './Card';
import { CARDS } from './constant';

export interface Item {
  id: string;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const Container: FC = () => {
  const [ cards, setCards ] = useState(CARDS);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) => update(prevCards, {
        $splice: [
          [ dragIndex, 1 ],
          [ hoverIndex, 0, prevCards[dragIndex] as Item ],
        ],
      }));
  }, []);

  return (
    <div className="w-96">
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        );
      })}
    </div>
  );
};

export default Container;
