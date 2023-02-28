import type { XYCoord } from 'dnd-core';
import { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constant';

export interface CardProps {
  id: string;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

type DragItem = Pick<CardProps, 'id' | 'index'> & { type: string };

const Card: FC<CardProps> = ({ id, text, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ , drop ] = useDrop<
    DragItem,
    void
  >({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 不和本身进行替换
      if (dragIndex === hoverIndex) {
        return;
      }

      // 确定盒子的位置
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // 纵向的一半
      const hoverMiddleY
        = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 鼠标位置
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // 向下拖拽 但是鼠标的位置低于下面盒子高度的一半
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖拽 但是鼠标的位置低于下面盒子高度的一半
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      // 为了性能，这里很好的避免昂贵的索引搜索
      item.index = hoverIndex;
    },
  });

  const [ { isDragging }, drag, dragPreview ] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      console.log('开始拖拽', index);
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      console.log('结束拖拽');
    },
  });

  // const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref}>
      {isDragging ? (
        <div ref={dragPreview} className="border border-solid border-gray-300" />
      ) : (
        <div className="bg-white cursor-move mb-2 py-2 px-4 border border-dashed border-gray-300">
          {text}
        </div>
      )}
    </div>
  );
};

export default Card;
