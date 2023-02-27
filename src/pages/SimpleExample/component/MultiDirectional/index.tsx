import Card from './Card';

const MultiDirectional = () => {
  const cards = Array(50)
    .fill('')
    .map((_item, index) => ({ name: `card ${index}` }));
  return (
    <div className="bg-white rounded-lg min-h-16 flex flex-wrap pl-4 pt-4 pr-4">
      {cards.map((item) => {
        return <Card key={item.name} title={item.name} />;
      })}
    </div>
  );
};

export default MultiDirectional;
