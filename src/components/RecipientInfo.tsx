import React from 'react';

declare const html2canvas: any;

interface RecipientInfoProps {
  name: string;
  phone: string;

  address: string;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
}

const RecipientInfo: React.FC<RecipientInfoProps> = ({ name, phone, address, setName, setPhone, setAddress }) => {

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        alert('剪贴板为空');
        return;
      }

      let remainingText = text;
      let parsedName = '';
      let parsedPhone = '';
      let parsedAddress = '';

      // 1. Extract phone number
      const phoneRegex = /1[3-9]\d{9}/;
      const phoneMatch = remainingText.match(phoneRegex);
      if (phoneMatch) {
        parsedPhone = phoneMatch[0];
        remainingText = remainingText.replace(parsedPhone, '').trim();
      }

      // 2. Clean up common labels and delimiters from the rest of the text
      const cleanedText = remainingText
        .replace(/收货人|姓名|寄件人|手机号|电话|收件地址|寄件地址|地址/g, '')
        .replace(/[:：,，]/g, ' ')
        .trim();
      
      // 3. Split into parts and try to identify name and address
      const parts = cleanedText.split(/\s+/).filter(Boolean);

      if (parts.length > 0) {
        // Attempt to find name by length and absence of address keywords.
        // Chinese names are usually 2-4 characters.
        const nameIndex = parts.findIndex(
          (p) => p.length >= 2 && p.length <= 4 && !/[省市区县路道街号村镇]/.test(p)
        );

        if (nameIndex !== -1) {
          parsedName = parts.splice(nameIndex, 1)[0];
          parsedAddress = parts.join('');
        } else if (parts.length > 1) {
          // Fallback: assume first part is name, rest is address.
          parsedName = parts[0];
          parsedAddress = parts.slice(1).join('');
        } else {
          // If only one part remains, it's ambiguous. We'll guess it's the address
          // if it's long or contains address keywords. Otherwise, it might be the name.
          if (parts[0].length > 4 || /[省市区县路道街号村镇]/.test(parts[0])) {
             parsedAddress = parts[0];
          } else {
             parsedName = parts[0];
          }
        }
      }
      
      // Update state only with the values we found
      if (parsedName) setName(parsedName);
      if (parsedPhone) setPhone(parsedPhone);
      if (parsedAddress) setAddress(parsedAddress);
      
      if(!parsedName && !parsedPhone && !parsedAddress) {
        alert('无法识别剪贴板中的地址信息');
      }

    } catch (err) {
      console.error('无法读取剪贴板: ', err);
      // The browser might show a permission prompt, so a generic error is good.
      alert('读取剪贴板失败。请确保已授予浏览器读取剪贴板的权限。');
    }
  };

  const handleSaveAsImage = async () => {
    if (typeof html2canvas === 'undefined') {
      alert('图片截取功能库加载失败，请刷新页面后重试。');
      return;
    }

    try {
      const appElement = document.getElementById('root');
      if (!appElement) {
        alert('找不到应用根元素。');
        return;
      }

      const canvas = await html2canvas(appElement, {
        scale: 2, // 提高截图清晰度
        useCORS: true,
        onclone: (clonedDoc: any) => {
          // 替换 input 元素为 div，解决截图时文字偏移问题
          const inputs = clonedDoc.querySelectorAll('input');
          inputs.forEach((input: any) => {
            const div = clonedDoc.createElement('div');
            // 复制类名以保持样式（如 w-full, text-sm 等）
            div.className = input.className;
            // 确保 div 在 flex 容器中垂直居中，模拟 input 的显示
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            // 移除可能影响布局的 input 默认边框/背景
            div.style.border = 'none';
            div.style.background = 'transparent';
            
            if (input.value) {
              div.innerText = input.value;
            } else {
              div.innerText = input.placeholder || '';
              // 手动设置 placeholder 颜色 (Tailwind placeholder-gray-500 ≈ #6b7280)
              div.style.color = '#6b7280';
            }

            if (input.parentNode) {
              input.parentNode.replaceChild(div, input);
            }
          });

          // 替换 textarea 元素为 div
          const textareas = clonedDoc.querySelectorAll('textarea');
          textareas.forEach((textarea: any) => {
            const div = clonedDoc.createElement('div');
            div.className = textarea.className;
            div.style.whiteSpace = 'pre-wrap';
            div.style.border = 'none';
            div.style.background = 'transparent';
            // textarea 可能是 block，且 align-start
            div.style.display = 'block';

            if (textarea.value) {
              div.innerText = textarea.value;
            } else {
              div.innerText = textarea.placeholder || '';
              div.style.color = '#6b7280';
            }

            if (textarea.parentNode) {
              textarea.parentNode.replaceChild(div, textarea);
            }
          });
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      
      const link = document.createElement('a');
      link.href = image;
      link.download = '退货退款详情.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('保存为图片时出错:', error);
      alert('保存图片失败，请稍后重试。');
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 mb-2 space-y-2">
      <div>
        <div className="bg-gray-100 p-2 rounded-lg flex justify-between items-start">
          <div className="space-y-0.5 w-full mr-2 text-sm">
            <div className="flex items-center space-x-2">
              <label className="text-gray-600 flex-shrink-0">收货人:</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入收货人姓名"
                className="bg-transparent w-full text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
               <label className="text-gray-600 flex-shrink-0">电  话:</label>
               <input 
                 type="tel" 
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 placeholder="请输入手机号码"
                 className="bg-transparent w-full text-gray-800 placeholder-gray-500 focus:outline-none"
               />
            </div>
            <div className="flex items-start space-x-2">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="请输入省、市、区、街道等详细地址"
                className="bg-transparent w-full text-gray-800 placeholder-gray-500 focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>
          <button onClick={handlePaste} className="text-orange-500 text-xs flex-shrink-0 pt-1">复制</button>
        </div>
      </div>
      
      <div className="flex justify-between items-center py-1.5">
        <div>
          <h4 className="font-bold text-sm flex items-center">
            官方推荐寄件服务
            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">首重免费寄</span>
          </h4>
          <p className="text-gray-500 text-xs mt-0.5">免填地址 丢损必赔</p>
        </div>
        <button 
          onClick={handleSaveAsImage}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-1.5 px-5 rounded-full shadow-md text-sm">
          我要寄件
        </button>
      </div>

      <hr className="border-gray-200" />

      <div className="flex justify-between items-center py-1.5">
        <div>
          <h4 className="font-bold text-sm">我已寄出</h4>
          <p className="text-gray-500 text-xs mt-0.5">点击填写物流单号</p>
        </div>
        <button className="border border-gray-400 text-gray-800 py-1 px-5 rounded-full text-sm">
          填写单号
        </button>
      </div>
    </div>
  );
};

export default RecipientInfo;