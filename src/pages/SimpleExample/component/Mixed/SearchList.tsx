import React, { useState } from 'react';
import SearchCard from './SearchCard';

const SearchList = (props: {setIsDragTagEnd: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {setIsDragTagEnd} = props;
  const [ cards ] = useState(Array(15)
  .fill('')
  .map((_item, index) => ({ id: `${index}`, label: `left ${index}` })));
  return (
    <div className="flex flex-wrap w-1/4 mr-8 ml-8">
      {cards.map((card) => (
        <SearchCard id={card.id} key={card.id} label={card.label} setIsDragTagEnd={setIsDragTagEnd}></SearchCard>
      ))}
    </div>
  );
};

export default SearchList;
