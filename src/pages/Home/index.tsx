import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.index}>
      <h3>拖拽的简单展示</h3>
      <Button type="primary" onClick={() => navigate('/antd')}>
        与 antd 结合
      </Button>
    </div>
  );
};

export default Home;
