import { Spin } from 'antd';
import React from 'react';
function BaseLoading() {
  return (
    <div className="loading-spinning">
      <Spin size="large" spinning={true} />
    </div>
  );
}

export default BaseLoading;
