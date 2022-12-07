import styles from './index.less';

const SimpleExample = () => {

  return <div className={styles.index}>
    <h2>拖拽的简单展示</h2>
    <h3>纵向拖拽</h3>
    <h3>横向拖拽</h3>
    <h3>多方向拖拽</h3>
  </div>;
};

export default SimpleExample;
