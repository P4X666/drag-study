import { Button } from 'antd';
import styles from './index.less';

const Home = () => {

  return <div className={styles.index}>
    <h3>拖拽的简单展示</h3>
    <h3>与 antd 结合</h3>
    <Button type="primary">Button</Button>
  </div>;
};

export default Home;
