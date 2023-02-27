const Card = (props: { title: string }) => {
  const { title } = props;
  return (
    <div className="flex justify-center items-center rounded-lg h-20 w-24 mr-2 shadow-lg">
      {title}
    </div>
  );
};

export default Card;
