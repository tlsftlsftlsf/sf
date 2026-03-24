import React, { useMemo, useState } from 'react';

declare const html2canvas: any;

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.75" />
    <circle cx="12" cy="12" r="1.75" />
    <circle cx="19" cy="12" r="1.75" />
  </svg>
);

const ChevronRightIcon = ({ className = 'h-5 w-5 text-gray-400' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L4.793 10.707a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const steps = [
  { label: '商家审核', done: true, active: false },
  { label: '寄回商品', done: true, active: true },
  { label: '商家退款', done: false, active: false },
  { label: '退款完成', done: false, active: false },
];

const addressKeywords = /[省市区县路道街号村镇乡楼栋单元室广场工业园开发区]/;

const App: React.FC = () => {
  const [name, setName] = useState('奕辰云仓（香百年分销）');
  const [phone, setPhone] = useState('15869042073');
  const [address, setAddress] = useState('广东省深圳市龙华区观澜街道黄背坑路张一村硅楼18-A5');
  const [showInstructions, setShowInstructions] = useState(false);

  const deadlineText = '6天23小时59分';

  const displayAddress = useMemo(() => {
    if (!address) {
      return '请输入省、市、区、街道等详细地址';
    }
    if (address.length <= 22) {
      return address;
    }
    return `${address.slice(0, 22)}\n${address.slice(22)}`;
  }, [address]);

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

      const phoneRegex = /1[3-9]\d{9}/;
      const phoneMatch = remainingText.match(phoneRegex);
      if (phoneMatch) {
        parsedPhone = phoneMatch[0];
        remainingText = remainingText.replace(parsedPhone, ' ').trim();
      }

      const cleanedText = remainingText
        .replace(/收货人|姓名|寄件人|联系人|手机号|电话|收件地址|寄件地址|详细地址|地址/g, ' ')
        .replace(/[:：,，；;｜|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const parts = cleanedText.split(/\s+/).filter(Boolean);
      if (parts.length > 0) {
        const nameIndex = parts.findIndex((part) => part.length >= 2 && part.length <= 12 && !addressKeywords.test(part));

        if (nameIndex !== -1) {
          parsedName = parts.splice(nameIndex, 1)[0];
          parsedAddress = parts.join('');
        } else if (parts.length > 1) {
          parsedName = parts[0];
          parsedAddress = parts.slice(1).join('');
        } else if (addressKeywords.test(parts[0]) || parts[0].length > 12) {
          parsedAddress = parts[0];
        } else {
          parsedName = parts[0];
        }
      }

      if (parsedName) setName(parsedName);
      if (parsedPhone) setPhone(parsedPhone);
      if (parsedAddress) setAddress(parsedAddress);

      if (!parsedName && !parsedPhone && !parsedAddress) {
        alert('无法识别剪贴板中的地址信息');
      }
    } catch (error) {
      console.error('无法读取剪贴板: ', error);
      alert('读取剪贴板失败，请确保已授予浏览器读取剪贴板的权限。');
    }
  };

  const handleCopy = async () => {
    const textToCopy = `收货人: ${name}\n电话: ${phone}\n地址: ${address}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('收货信息已复制到剪贴板');
    } catch (error) {
      console.error('复制到剪贴板失败: ', error);
      alert('复制失败，您的浏览器可能不支持或未授予权限。');
    }
  };

  const handleCancel = () => {
    setName('');
    setPhone('');
    setAddress('');
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
        scale: 2,
        useCORS: true,
        backgroundColor: '#f5f5f7',
        onclone: (clonedDoc: Document) => {
          const inputs = clonedDoc.querySelectorAll('input');
          inputs.forEach((input) => {
            const div = clonedDoc.createElement('div');
            div.className = input.className;
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.border = 'none';
            div.style.background = 'transparent';
            div.style.boxShadow = 'none';
            div.textContent = (input as HTMLInputElement).value || input.getAttribute('placeholder') || '';
            if (!(input as HTMLInputElement).value) {
              div.style.color = '#9ca3af';
            }
            input.parentNode?.replaceChild(div, input);
          });

          const textareas = clonedDoc.querySelectorAll('textarea');
          textareas.forEach((textarea) => {
            const div = clonedDoc.createElement('div');
            div.className = textarea.className;
            div.style.whiteSpace = 'pre-wrap';
            div.style.display = 'block';
            div.style.border = 'none';
            div.style.background = 'transparent';
            div.style.boxShadow = 'none';
            div.textContent = (textarea as HTMLTextAreaElement).value || textarea.getAttribute('placeholder') || '';
            if (!(textarea as HTMLTextAreaElement).value) {
              div.style.color = '#9ca3af';
            }
            textarea.parentNode?.replaceChild(div, textarea);
          });
        },
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = '退货详情.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('保存为图片时出错:', error);
      alert('保存图片失败，请稍后重试。');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1f2430] font-sans">
      <div className="mx-auto max-w-md bg-[#f5f5f7] pb-32">
        <header className="sticky top-0 z-20 bg-[#f5f5f7]/95 backdrop-blur-sm px-5 pt-3 pb-4">
          <div className="relative flex items-center justify-between">
            <button className="rounded-full p-2 -ml-2" aria-label="返回">
              <BackIcon />
            </button>
            <h1 className="absolute left-1/2 -translate-x-1/2 text-[22px] font-semibold tracking-[0.02em] text-black">
              退货详情
            </h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="rounded-full p-2" aria-label="更多操作">
                  <MoreIcon />
                </button>
                <span className="absolute -right-0.5 -top-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ff4d73] px-1 text-xs font-semibold text-white">
                  1
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="px-5 pb-8">
          <section className="mb-7 pt-1">
            <div className="flex items-start justify-between px-2">
              {steps.map((step, index) => (
                <div key={step.label} className="relative flex flex-1 flex-col items-center">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-[12px] h-[2px] w-full ${index < 1 ? 'bg-[#232632]' : 'bg-[#d8dae2] border-t border-dashed border-[#d8dae2] h-0'}`}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${step.active ? 'bg-[#232632]' : step.done ? 'bg-[#232632]' : 'bg-[#cfd2da]'}`}
                  >
                    {step.active ? <CheckIcon /> : <div className="h-2.5 w-2.5 rounded-full bg-white/95" />}
                  </div>
                  <span className={`mt-4 text-[15px] font-medium ${step.active || step.done ? 'text-[#202431]' : 'text-[#bcc0ca]'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 px-1">
            <h2 className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-[#171b26]">请寄回商品</h2>
            <p className="mt-5 text-[19px] leading-8 text-[#232632]">
              商家已同意退货，请您在 <span className="font-semibold text-[#ff4d58]">{deadlineText}</span> 内寄回商品
            </p>
          </section>

          <section className="mb-5 overflow-hidden rounded-[28px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-4">
              <div className="w-[108px] flex-shrink-0 text-[16px] font-semibold leading-7 text-[#1d2430]">
                商家地址信息
              </div>
              <div className="min-w-0 flex-1 text-right text-[#202431]">
                <div className="flex items-start justify-end gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入收货人姓名"
                    className="min-w-0 flex-1 bg-transparent text-right text-[18px] font-semibold leading-8 text-[#202431] placeholder:text-[#b8bec8] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入手机号"
                    className="w-[132px] bg-transparent text-right text-[18px] font-semibold leading-8 text-[#202431] placeholder:text-[#b8bec8] focus:outline-none"
                  />
                </div>
                <div className="mt-4 flex items-end justify-end gap-3">
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    placeholder="请输入省、市、区、街道等详细地址"
                    className="min-h-[88px] flex-1 resize-none bg-transparent text-right text-[18px] font-semibold leading-8 text-[#202431] placeholder:text-[#b8bec8] focus:outline-none"
                  />
                  <button
                    onClick={handlePaste}
                    className="mb-1 flex-shrink-0 text-[17px] font-medium text-[#1976d2]"
                  >
                    复制
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions((value) => !value)}
              className="mt-5 flex w-full items-start gap-4 text-left"
            >
              <div className="w-[108px] flex-shrink-0 text-[16px] font-semibold leading-7 text-[#1d2430]">
                商家退货说明
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right text-[16px] leading-8 text-[#9197a4]">
                <p className={`${showInstructions ? '' : 'line-clamp-2'} max-w-[240px]`}>
                  退回商品需保持原包装完整，未使用过，未拆封，未损坏，不影响二次销售，请勿使用到付或平邮。
                </p>
                <span className={`mt-1 transition-transform ${showInstructions ? 'rotate-90' : ''}`}>
                  <ChevronRightIcon className="h-5 w-5 text-[#aeb4bf]" />
                </span>
              </div>
            </button>

            <div className="my-6 h-px bg-[#ebeef3]" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-semibold text-[#1b2230]">上门取件/驿站</h3>
                  <span className="rounded-full bg-[#fff1f2] px-3 py-1 text-[12px] font-medium leading-none text-[#ff6d7f]">
                    运费险(免1公斤)
                  </span>
                </div>
                <p className="mt-3 text-[16px] leading-7 text-[#8d94a1]">免填地址·极速退款</p>
              </div>
              <button
                onClick={handleSaveAsImage}
                className="rounded-full bg-[#ff2f63] px-8 py-4 text-[18px] font-semibold text-white shadow-[0_8px_24px_rgba(255,47,99,0.28)]"
              >
                我要寄件
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-semibold text-[#1b2230]">自行寄回</h3>
                <p className="mt-3 max-w-[245px] text-[16px] leading-7 text-[#8d94a1]">
                  运费需您垫付，售后成功后运费险预计赔5.1元
                </p>
              </div>
              <button className="rounded-full border border-[#b9bec8] bg-white px-8 py-4 text-[18px] font-semibold text-[#2b3140]">
                填写单号
              </button>
            </div>
          </section>

          <section className="mb-5 rounded-[28px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-[#171b26]">服务保障</h3>
            <div className="mt-8 space-y-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] font-medium text-[#1f2430]">运费险</span>
                <div className="flex items-center gap-2 text-[18px] text-[#9aa1ad]">
                  <span>退换货自动理赔</span>
                  <ChevronRightIcon className="h-5 w-5 text-[#b2b8c3]" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[18px] font-medium text-[#1f2430]">7天无理由退货</span>
                <span className="text-[18px] text-[#9aa1ad]">您已享受服务</span>
              </div>
            </div>
          </section>

          <section className="mb-6 rounded-[28px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <button className="flex w-full items-center justify-between text-left">
              <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-[#171b26]">协商记录</h3>
              <ChevronRightIcon className="h-7 w-7 text-[#9ba2ae]" />
            </button>
          </section>

          <section className="rounded-[28px] bg-white px-5 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 rounded-[22px] bg-[#f7f8fa] px-4 py-3 text-[14px] leading-6 text-[#6f7784]">
                <p>当前展示地址：</p>
                <p className="mt-1 whitespace-pre-line text-[15px] text-[#2b3140]">{displayAddress}</p>
              </div>
              <button
                onClick={handleCopy}
                className="rounded-full border border-[#b9bec8] bg-white px-6 py-4 text-[18px] font-semibold text-[#2b3140]"
              >
                平台介入
              </button>
            </div>
          </section>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#e7e9ee] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-end gap-4 px-5 py-4">
          <button
            onClick={handleCancel}
            className="rounded-full border border-[#b9bec8] bg-white px-8 py-4 text-[18px] font-semibold text-[#2b3140]"
          >
            取消退货
          </button>
          <button
            onClick={handleCopy}
            className="rounded-full border border-[#b9bec8] bg-white px-8 py-4 text-[18px] font-semibold text-[#2b3140]"
          >
            修改退货
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
