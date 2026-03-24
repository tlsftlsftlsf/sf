
import React from 'react';

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const MyServices: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-3 mb-2">
      <h3 className="font-bold text-base mb-2">我的服务</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <p>7天无理由退换</p>
          <div className="flex items-center text-right text-xs text-gray-500">
            <div className="flex flex-col items-end">
              <span>9月25日前可享</span>
              <span>光盘软件拆封后不支持</span>
            </div>
            <ChevronRightIcon />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>运费险</p>
          <div className="flex items-center text-right text-xs text-gray-500">
             <div className="flex flex-col items-end">
              <span>卖家退款成功后，系统</span>
              <span>将自动发起理赔</span>
            </div>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
