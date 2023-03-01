import update from 'immutability-helper';
import { FC, useRef } from 'react';
import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import { ItemTypes } from './constant';

export interface Item {
  id: string;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const Container: FC = () => {
  const [ cards, setCards ] = useState(Array(50)
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

  const [ , drop ] = useDrop({
    accept: ItemTypes.CARD,
    // collect: (monitor) => {
    //     return {
    //         isOverSlider: monitor.isOver(),
    //     };
    // },
    drop(item, monitor) {
        const didDrop = monitor.didDrop();
        const dropItem = item as {index: number};
        if (!didDrop) {
            /** 如果在内部拖拽时，没有放到任何一个盒子上面，则将其放到最后 */
            moveCard(dropItem.index, cards.length);
        }
    },
});

  const lastHoverCard = useRef<{
    dragIndex: number;
    hoverIndex: number;
  }>();

  return (
    <div className="flex flex-wrap" ref={drop}>
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
