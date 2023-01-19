import { Collapse } from 'antd';
import styles from './index.less';

const { Panel } = Collapse;

const SimpleExample = () => {
  return (
    <div className={styles.index}>
      <p className="text-lg">拖拽的简单展示</p>
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
          <p>多场景混合拖拽</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SimpleExample;
