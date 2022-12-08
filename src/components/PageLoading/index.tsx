import { Spin } from 'antd';
import React from 'react';
import styles from './index.less';

function PageLoading(props: {tip?: React.ReactNode}) {
  return (
    <div className={ styles.pageLoading}>
      <Spin size="large" tip={props.tip || ''} />
    </div>
  );
}
export default PageLoading;
