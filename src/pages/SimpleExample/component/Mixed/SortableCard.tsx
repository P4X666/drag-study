import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DRAGTYPE } from './contant';
import { CardItemType } from './type';

type SortableCardProps = {
  index: number;
  id: string;
  label: string;
  moveCard: (id: string, atIndex: number) => void;
  addCard: (atIndex: number, card: CardItemType) => void;
  findCard: (id: string) => {
    card: CardItemType;
    index: number;
  } | null;
  deleteCard: (atIndex: number) => void;
};

type SortableCardType = Pick<SortableCardProps, 'id' | 'index' | 'label'> & {
  originalIndex: number;
  cardFromSearch: boolean;
  isStillBeingDragged: boolean;
};

const SortableCard = (props: SortableCardProps) => {
  const { id, label, moveCard, addCard, findCard, index } = props;
  const originalIndex = findCard(id)!.index;
  const ref = useRef<HTMLDivElement>(null);
  const [ { isDragging }, drag ] = useDrag({
    type: DRAGTYPE,
    item: () => {
      console.log('begin --------------- 开始拖拽');
      return {
        id,
        originalIndex,
        cardFromSearch: false,
        index,
        label,
      } as SortableCardType;
    },
    collect: (monitor) => {
      const isItemBeingDragged
        = monitor.getItem() && monitor.getItem().id === id;
      const isStillBeingDragged = !!(
        monitor.getItem() && monitor.getItem().isStillBeingDragged
      );

      return {
        isDragging: isStillBeingDragged
          ? isItemBeingDragged
          : monitor.isDragging(),
      };
    },
    end: (item, monitor) => {
      console.log('结束----------------------------拖拽');

      const itemDropped = monitor.didDrop();
      /** 当盒子被拖出到外部时，松手后，恢复原位 */
      if (item && !itemDropped) {
        moveCard(item.id, item.originalIndex);
      }
    },
  });

  const [ { isOver }, drop ] = useDrop({
    accept: DRAGTYPE,
    /** 禁止移出 */
    canDrop: () => false,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const cardBeingDragged = { ...(item as SortableCardType) };
      /** 设置 index 防止闪动 */
      if (cardBeingDragged.index === index) {
        return;
      }
      // const dragIndex = cardBeingDragged.index;
      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // const clientOffset = monitor.getClientOffset()!;
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // /** 排除未过半的拖动 防止闪动 */
      // if (dragIndex < index && hoverClientY < hoverBoundingRect.height * 0.5) {
      //   return;
      // }
      // if (dragIndex > index && hoverClientY > hoverBoundingRect.height * 0.5) {
      //   return;
      // }
      /** 如果是从外部传入，则新增，否则移动位置 */
      if (cardBeingDragged.cardFromSearch) {
        const { index: overIndex } = findCard(id)!;
        cardBeingDragged.originalIndex = overIndex;
        cardBeingDragged.cardFromSearch = false;
        cardBeingDragged.isStillBeingDragged = true;

        cardBeingDragged.index = index;
        requestAnimationFrame(() => {
          addCard(overIndex, {
            ...cardBeingDragged,
            isDragging: true,
          });
        });
      } else {
        if (cardBeingDragged.id !== id) {
          const { index: overIndex } = findCard(id)!;
          cardBeingDragged.index = index;
          moveCard(cardBeingDragged.id, overIndex);
        }
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="mb-4 mr-2 px-3 py-1 bg-slate-200 cursor-move"
      style={{
        opacity: isDragging ? 0.2 : 1,
        borderLeft: isOver ? '1px solid red' : 'none',
      }}
    >
      {label}
    </div>
  );
};

export default SortableCard;
