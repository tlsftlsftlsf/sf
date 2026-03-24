import React from 'react';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none">
      <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.1031 21 18.5649 18.2543 19.6482 14.5M21 10V4M21 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" viewBox="0 0 1024 1024" fill="currentColor">
    <path d="M512 228.790857c13.897143 0 27.428571 4.534857 38.546286 12.909714l290.706285 219.209143a64 64 0 0 1 0 102.180572l-290.742857 219.209143a64 64 0 0 1-102.509714-51.090286v-81.481143l-12.178286 0.694857c-80.128 5.266286-138.24 26.916571-178.285714 59.684572l-6.180571 5.266285a159.158857 159.158857 0 0 0-34.669715 42.825143c-4.388571 8.155429-6.582857 14.006857-7.204571 16.457143-7.862857 31.378286-54.052571 25.673143-54.052572-6.656 0-108.361143 11.117714-184.685714 46.665143-251.392 44.032-82.651429 121.088-131.657143 235.337143-140.361143l10.569143-0.658286V292.790857a64 64 0 0 1 58.733714-63.780571L512 228.790857z m0 54.857143a9.142857 9.142857 0 0 0-9.142857 9.142857V402.285714a27.428571 27.428571 0 0 1-27.428572 27.428572c-173.750857 0-243.2 79.616-260.534857 241.042285l-0.402285 3.949715 0.438857-0.365715c54.308571-48.274286 134.948571-77.531429 245.869714-79.908571l14.628571-0.146286a27.428571 27.428571 0 0 1 27.428572 27.428572v109.494857a9.142857 9.142857 0 0 0 14.628571 7.314286L808.228571 519.314286a9.142857 9.142857 0 0 0 0-14.628572l-290.742857-219.172571a9.142857 9.142857 0 0 0-5.485714-1.828572z" />
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="19" cy="12" r="1.7" />
    <circle cx="5" cy="12" r="1.7" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-20">
      <div className="max-w-md mx-auto h-14 flex justify-between items-center px-4">
        <button className="p-2 -ml-2">
          <BackIcon />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">退货退款详情</h1>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button className="p-1"><RefreshIcon /></button>
          <button className="p-1"><ShareIcon /></button>
          <button className="p-1"><MoreIcon /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;