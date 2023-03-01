import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchList from './SearchList';
import Slider from './Slider';

const Mixed = () => {
  /** 监听左侧的标签落下的时机，当标签落下时再触发新增等操作 */
  const [ isDragTagEnd, setIsDragTagEnd ] = useState(false);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex mt-4">
        <SearchList setIsDragTagEnd={setIsDragTagEnd}></SearchList>
        <Slider
          isDragTagEnd={isDragTagEnd}
          setIsDragTagEnd={setIsDragTagEnd}
        ></Slider>
      </div>
    </DndProvider>
  );
};

export default Mixed;
