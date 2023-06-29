import { useEffect, useState } from 'react';
import { handleJavascriptInterface } from 'utils/common';

const App = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [osType, setOsType] = useState('');
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    // Native -> Web
    window.addEventListener('showAlertMessage', handleEventFromNative);

    // Native -> Web
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
    // Web -> Native
    handleJavascriptInterface('showToastMessage', '나는 K상남자~!');

    // if (window.android) {
    //   window.android.showToastMessage('나는 K상남자~!');
    // }
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

  const handleShowToastMessageIncludingData = async (action: string) => {
    const value = await handleJavascriptInterface(action, '나는 K마초남~!');

    setCustomText(value);
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
    </div>
  );
};

export default App;
