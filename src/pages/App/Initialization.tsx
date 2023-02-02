import { FC, PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Initialization:FC<PropsWithChildren> = (props) => {

  const { pathname } = useLocation();
  // 默认进来的页面
  useEffect(() => {
    if (pathname !== '/login') {
      // 发送用户权限，菜单权限的请求
      // 判断权限
    }
  }, [ pathname ]);

  return <>{props.children}</>;
};

export default Initialization;
