import { useEffect, useState } from 'react';
import { handleJavascriptInterface } from 'utils/common';

const Index = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [osType, setOsType] = useState('');
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    window.addEventListener('showAlertMessage', handleEventFromNative);

    if (window.jsInterface) {
      window.jsInterface['reactFunc'] = reactFunc;
    }

    if (window.android) {
      window.android['showAlertMessage']();
    }
  }, []);

  const handleEventFromNative = async (e: any) => {
    setValue(e.detail.data);
  };

  const handleShowToastMessage = () => {
    handleJavascriptInterface('showToastMessage', '나는 K상남자~!');
  };

  const handleGoToTestPage = async () => {
    await handleJavascriptInterface('test');
  };

  const handleShowToastMessageIncludingData = async (action: string) => {
    const value = await handleJavascriptInterface(action, '나는 K마초남~!');

    setCustomText(value);
  };

  const handleFinish = () => {
    handleJavascriptInterface('finish');
  };

  const reactFunc = (data: any) => {
    console.log(data);
  };

  const handleGetOsType = () => {
    const { userAgent } = navigator;

    if (/android/i.test(userAgent)) {
      setOsType('Android');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setOsType('IOS');
    } else {
      setOsType('Unknown');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Javascript Interface Test</h1>
      <input placeholder={'Text From Native'} value={value} />
      <input placeholder={'Text For OS'} value={osType} />
      <input placeholder={'Custom Text From Native'} value={customText} />
      <button onClick={handleShowToastMessage}>showToastMessage</button>
      <button onClick={handleGetOsType}>showOsType</button>
      <button
        onClick={() =>
          handleShowToastMessageIncludingData('showToastMessageIncludingData')
        }
      >
        showToastMessageIncludingData
      </button>
      <button
        onClick={() => {
          window.location.href = '/html/test.html';
        }}
      >
        Go To Test Html
      </button>
      <button onClick={handleGoToTestPage}>Go To Test Page!</button>
      <button onClick={handleFinish}>Finish Activity!</button>
    </div>
  );
};

export default Index;
