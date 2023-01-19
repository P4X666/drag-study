import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchList from './SearchList';
import Slider from './Slider';

const Mixed = () => {
  return (
      <DndProvider backend={HTML5Backend}>
        <div
          className="text-center flex mt-4"
        >
          <SearchList></SearchList>
          <Slider></Slider>
        </div>
      </DndProvider>
  );
};

export default Mixed;
