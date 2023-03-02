import { Form, Input, Space } from 'antd';
import { MinusCircleOutlined, HolderOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragCardItem } from '../DragCard/type';

const CARD = 'card';

type FormListItemProps = {
  id: number;
  index: number;
  name: number;
  moveCard: (fromCardId: number, toCardId: number) => void;
  remove: (index: number | number[]) => void;
} & Record<string, any>;

const FormListItem = (props: FormListItemProps) => {
  const { id, index, name, moveCard, remove, restField } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [ { isOver }, drop ] = useDrop({
    accept: CARD,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    drop(item, monitor) {
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
        moveCard(dragCard.id, name);
        dragCard.index = index;
      };
      if (dragIndex < hoverIndex && hoverClientY > 2) {
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

  const [ {isDragging}, drag, preview ] = useDrag({
    type: CARD,
    item: (): DragCardItem => {
      return { index, id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  preview(drop(ref));
  return (
    <div ref={ref} style={{opacity: isDragging ? 0 : 1}}>
        {isOver && <div className="border border-solid border-gray-300 w-96" />}
        <Space
          style={{
            display: 'flex',
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Form.Item
            {...restField}
            //name采用数组方式，第一个元素name可理解为行号，first为字段名
            //行号+字段名联合才能定位列表行字段
            name={[ name, 'first' ]}
            rules={[
              {
                required: true,
                message: 'Missing first name',
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[ name, 'last' ]}
            rules={[
              {
                required: true,
                message: 'Missing last name',
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <div ref={drag} style={{ cursor: 'pointer' }}>
            <HolderOutlined />
          </div>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
    </div>
  );
};

export default FormListItem;
