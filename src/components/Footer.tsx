
import React from 'react';

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

interface FooterProps {
  name: string;
  phone: string;
  address: string;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
}

const Footer: React.FC<FooterProps> = ({ name, phone, address, setName, setPhone, setAddress }) => {
  const handleCopy = async () => {
    const textToCopy = `收货人: ${name}\n电话: ${phone}\n地址: ${address}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('收货信息已复制到剪贴板');
    } catch (err) {
      console.error('复制到剪贴板失败: ', err);
      alert('复制失败，您的浏览器可能不支持或未授予权限。');
    }
  };

  const handleCancel = () => {
    setName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto p-3 flex justify-between items-center">
        <a 
          href="https://github.com/zgytlkj/sf-express-return-picture" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="View source on GitHub"
        >
          <GithubIcon />
        </a>
        <div className="flex items-center space-x-3">
            <button 
              onClick={handleCopy}
              className="border border-gray-400 text-gray-800 text-sm py-1.5 px-5 rounded-full hover:bg-gray-100 transition-colors">
            平台介入
            </button>
            <button 
              onClick={handleCancel}
              className="border border-gray-400 text-gray-800 text-sm py-1.5 px-5 rounded-full hover:bg-gray-100 transition-colors">
            撤销申请
            </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;