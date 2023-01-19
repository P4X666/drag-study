import { useDrag } from 'react-dnd';
import { DRAGTYPE } from './contant';

type CardProps={label:string; id:string;}

const Card = (props: CardProps) => {
    const {label, id} = props;
  const [ { isDragging }, drag ] = useDrag({
    type: DRAGTYPE,
    item: () => ({
      cardFromSearch: true,
      label,
      id,
      originalIndex: '???',
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="kbd kbd-lg mb-4 cursor-move"
      style={{
        opacity: isDragging ? '0.5' : '1',
      }}
    >
      {label}
    </div>
  );
};

export default Card;
