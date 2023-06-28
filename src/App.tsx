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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Javascript Interface Test</h1>
      <input placeholder={'Text From Native'} value={value} />
      <input placeholder={'Text For OS'} value={osType} />
      <button onClick={handleShowToastMessage}>showToastMessage</button>
      <button onClick={handleGetOsType}>showOsType</button>
    </div>
  );
};

export default App;
