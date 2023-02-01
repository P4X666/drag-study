export type CardItemType = {
  index?: number;
  /** 保证渲染时的唯一id */
  id: string;
  label: string;
  isDragging?: boolean;
  /** 业务id 在拖拽时是可重复的 */
  originId?: string;

  cardFromSearch?: boolean;
};
