import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.index}>
      <Button className="mb-8" block type="primary" onClick={() => navigate('/simple')}>
        拖拽的简单展示
      </Button>
      <Button block type="primary" onClick={() => navigate('/antd')}>
        与 antd 结合
      </Button>
    </div>
  );
};

export default Home;
