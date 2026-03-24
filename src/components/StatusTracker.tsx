
import React from 'react';

const StatusTracker: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-3 mb-2">
      <div className="flow-root">
        <ul className="-mb-8">
          {/* Step 1 */}
          <li>
            <div className="relative pb-4">
              <span className="absolute top-1 left-4 -ml-px h-full w-0.5 bg-orange-500" aria-hidden="true"></span>
              <div className="relative flex items-start space-x-3">
                <div className="w-8 flex justify-center">
                  <div className="h-4 w-4 bg-white rounded-full border-2 border-orange-500 flex items-center justify-center"></div>
                </div>
                <div className="min-w-0 flex-1 pt-0">
                  <p className="text-sm text-gray-500">商家处理</p>
                </div>
              </div>
            </div>
          </li>

          {/* Step 2 (Active) */}
          <li>
            <div className="relative pb-4">
              <span className="absolute top-1 left-4 -ml-px h-full w-0.5 bg-gray-300" aria-hidden="true"></span>
              <div className="relative flex items-start space-x-3">
                <div className="w-8 flex justify-center">
                  <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 pt-0">
                  <div className="flex items-baseline">
                    <h3 className="font-bold text-base text-orange-500">寄回商品</h3>
                    <p className="text-gray-500 text-xs ml-2">还剩6天8时03分</p>
                  </div>
                  <div className="mt-1 p-2 bg-orange-50 rounded-md text-gray-600 text-xs space-y-0.5">
                    <p><span className="font-bold text-orange-500">因您是优质会员，已享受闪电退货，</span>请退货给商家</p>
                    <p>未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物</p>
                    <p>交易的钱款还在天喵中间账户，确保您资金安全</p>
                    <p>请填写真实退货物流信息，逾期未填写，退货申请将关闭</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          
          {/* Step 3 */}
          <li>
            <div className="relative">
              <div className="relative flex items-start space-x-3">
                <div className="w-8 flex justify-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full flex items-center justify-center"></div>
                </div>
                <div className="min-w-0 flex-1 pt-0">
                   <p className="text-sm text-gray-500">商家退款</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-end mt-2">
        <a href="#" className="text-gray-500 text-xs flex items-center">
          全部流程
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default StatusTracker;