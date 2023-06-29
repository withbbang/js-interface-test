import { useEffect, useState } from 'react';

const App = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [osType, setOsType] = useState('');

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

    console.log('log');
    console.error('error');
  }, []);

  const handleEventFromNative = async (e: any) => {
    setValue(e.detail.data);
  };

  const handleShowToastMessage = () => {
    // Web -> Native
    if (window.android) {
      window.android.showToastMessage('나는 K상남자~!');
    }
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

  const handleShowToastMessageIncludingData = () => {
    if (window.android) {
      let data;
      window.addEventListener('showToastMessageIncludingData', (e: any) => {
        data = e.detail.data;
      });

      window.android['showToastMessageIncludingData']('나는 K마초남~!');

      console.log(data);

      return data;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Javascript Interface Test</h1>
      <input placeholder={'Text From Native'} value={value} />
      <input placeholder={'Text For OS'} value={osType} />
      <button onClick={handleShowToastMessage}>showToastMessage</button>
      <button onClick={handleGetOsType}>showOsType</button>
      <button onClick={handleShowToastMessageIncludingData}>
        showToastMessageIncludingData
      </button>
    </div>
  );
};

export default App;
