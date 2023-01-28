import { Collapse } from 'antd';
import Mixed from './component/Mixed';
import styles from './index.less';

const { Panel } = Collapse;

const SimpleExample = () => {
  return (
    <div className={styles.index}>
      <p className="text-xl font-bold">拖拽的简单展示</p>
      <Collapse accordion bordered={false}>
        <Panel header="纵向拖拽" key="1">
          <p>纵向拖拽</p>
        </Panel>
        <Panel header="横向拖拽" key="2">
          <p>横向拖拽</p>
        </Panel>
        <Panel header="多方向拖拽" key="3">
          <p>多方向拖拽</p>
        </Panel>
        <Panel header="多场景混合拖拽" key="4">
          <p>场景描述：</p>
          <p>1. 左边的内容可以拖到右边，左边禁止排序</p>
          <p>2. 右边的内容禁止拖出，若拖出，松手后将内容恢复原位</p>
          <p>3. 右边的内容可上下左右排序</p>
          <p></p>
          <p></p>
          <Mixed />
        </Panel>
      </Collapse>
    </div>
  );
};

export default SimpleExample;
