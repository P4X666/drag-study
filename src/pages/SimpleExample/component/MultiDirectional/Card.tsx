// import type { XYCoord } from 'dnd-core';
import React, { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constant';
import classnames from 'classnames';

export interface CardProps {
  id: string;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  lastHoverCard: React.MutableRefObject<
    | {
        dragIndex: number;
        hoverIndex: number;
      }
    | undefined
  >;
}

type DragItem = Pick<CardProps, 'id' | 'index'> & { type: string };

const Card: FC<CardProps> = ({ id, text, index, moveCard, lastHoverCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [ { isOver }, drop ] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    drop(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // 不和本身进行替换
      if (dragIndex === hoverIndex) {
        return;
      }
      // 为了性能，这里很好的避免昂贵的索引搜索
      item.index = hoverIndex;
      /**
       * 是否为向后拖拽 保证都是放到盒子的前面
       * 如果不做处理，则向前拖拽，盒子会到hover的盒子前面；向后拖拽，则盒子会到hover的盒子后面
       *  */
      const toback = dragIndex < hoverIndex;
      lastHoverCard.current = {
        dragIndex,
        hoverIndex: toback ? hoverIndex - 1 : hoverIndex,
      };
    },
  });

  const [ { isDragging }, drag, dragPreview ] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      console.log('开始拖拽', index);
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item) => {
      console.log('结束拖拽', item);
      if (lastHoverCard.current) {
        const { dragIndex, hoverIndex } = lastHoverCard.current;
        moveCard(dragIndex, hoverIndex);
        // reset
        lastHoverCard.current = undefined;
      }
    },
  });
  drag(drop(ref));

  return (
    <div ref={ref} className="flex mr-2">
      {isDragging ? (
        <div ref={dragPreview} />
      ) : (
        <div
          className={classnames([
            'bg-white cursor-move mb-2 py-2 px-4',
            ...(isOver
              ? [
                  'border-solid border-red-500 border-0 border-l',
                ]
              : ''),
          ])}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Card;
