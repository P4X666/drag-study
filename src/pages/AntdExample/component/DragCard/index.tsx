import type { FC } from 'react';
import React, { cloneElement } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './index.less';
import type { DragCardProps, DragCardItem } from './type';

const CARD = 'card';

const DragCard: FC<DragCardProps & DragCardItem> = (props) => {
  const { id, index, moveCard, children } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [ { isOver }, drop ] = useDrop({
    accept: CARD,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragCard = item as DragCardItem;
      const dragIndex = dragCard.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // 偏移量
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      const _handle = () => {
        moveCard(dragCard.id, id);
        dragCard.index = index;
      };
      if (
        dragIndex < hoverIndex
        && hoverClientY > hoverBoundingRect.height * 0.25
      ) {
        console.log('to bottom');
        _handle();
        return;
      }
      if (
        dragIndex > hoverIndex
        && hoverClientY < hoverBoundingRect.height * 0.75
      ) {
        console.log('to top');
        _handle();
        return;
      }
    },
  });

  const [ { isDragging }, drag, preview ] = useDrag({
    type: CARD,
    item: (): { id: number; index: number } => {
      return { index, id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(ref));

  const child = children as React.ReactElement;
  const childProps = { ...child?.props, isOver, drag };
  const cloneChildren = cloneElement(child, childProps);

  return (
    <div ref={ref} className={styles.card} style={{ opacity }}>
      {cloneChildren}
    </div>
  );
};

export default DragCard;
