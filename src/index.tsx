import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.warn);
