import type { FC, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { SizeEnum } from '../../interface';
import type { DragCardItem } from '../DragCard/type';
import type { CardList, CardListItem, DragCardContainerProps } from '../DragCardContainer/type';
import styles from './index.less';
import { getItemWithWidth } from './utils';

type DragCardListProps = Pick<DragCardContainerProps, 'getBackgroundColor'> & {
    cards: CardList;
    item: CardListItem;
    index: number;
    moveRowCard: (dragCard: DragCardItem, hoverCard: Pick<DragCardItem, 'rowKey'>, arrIndex: number) => void;
};

const DragCardList: FC<PropsWithChildren<DragCardListProps>> = (props) => {
    const { children, cards, item: dragItem, index, moveRowCard, getBackgroundColor } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'card',
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

            if (dragIndex - dragCard.columnIndex === hoverIndex) {
                return;
            }
            // 如果是同一行，则可以交给 DragCard 处理
            if (dragCard.rowKey === dragItem.key) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = hoverBoundingRect.height;
            // 偏移量
            const clientOffset = monitor.getClientOffset();
            // 纵向
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            const hoverMiddleX = hoverBoundingRect.width;
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            const _handle = (arrIndex: number) => {
                console.log('DragCardList  ==============================');
                // console.log('被拖拽的盒子：', dragCard, '被放入的行为：', dragItem);
                moveRowCard({ ...dragCard }, { rowKey: dragItem.key }, arrIndex);
                dragCard.index = index;
            };

            const hoverRow = cards.find((card) => card.key === dragItem.key);

            const getArrayIndex = (num: number) => {
                // 如果该行已沾满，若被拖拽的盒子在下面，则直接放上面，否则放下面
                if (hoverRow?.children[0].size === SizeEnum.BIG) {
                    _handle(num);
                }
                // 计算盒子的宽度
                const itemWidth = hoverMiddleX / (dragCard.size === SizeEnum.MIDDLE ? 2 : 3);
                const replaceIndex = getItemWithWidth(hoverClientX, itemWidth, hoverRow?.children.length);
                // 当前盒子拖动到被hover的盒子宽度的一半时就放在前面，否则就放在该盒子后面
                _handle(replaceIndex);
            };

            if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY * 0.25) {
                // console.log('在上面，想下来', ' to bottom ');
                getArrayIndex(1);
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY * 0.75) {
                // console.log('在下面，想上来', ' to top ');
                getArrayIndex(0);
                return;
            }
        },
    });

    drop(ref);

    return (
        <div ref={ref} className={styles.cardList} style={{ backgroundColor: getBackgroundColor?.(isOver) }}>
            {children}
        </div>
    );
};

export default DragCardList;
