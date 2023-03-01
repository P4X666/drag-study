import React, { useState } from 'react';
import SearchCard from './SearchCard';

const SearchList = (props: {setIsDragTagEnd: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {setIsDragTagEnd} = props;
  const [ cards ] = useState([
    { id: '111', label: 'Coucou' },
    { id: '222', label: 'Goodbye' },
    { id: '333', label: 'Gutentag' },
    { id: '444', label: 'Arrivedercci' },
  ]);

  return (
    <div className="flex flex-col w-1/4 mr-8 ml-8">
      {cards.map((card) => (
        <SearchCard id={card.id} key={card.id} label={card.label} setIsDragTagEnd={setIsDragTagEnd}></SearchCard>
      ))}
    </div>
  );
};

export default SearchList;
