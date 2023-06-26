import { useEffect, useRef, useState } from 'react';

const App = (): JSX.Element => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handleEventFromNative = async (data: any) => {
      setValue(data.detail);
    };

    // Native -> Web
    window.addEventListener('showAlert', handleEventFromNative);

    if (window.android) {
      window.android.showAlertMessage();
    }

    return () => {
      window.removeEventListener('showAlert', handleEventFromNative);
    };
  }, []);

  const handleShowToastMessage = () => {
    // Web -> Native
    if (window.android) {
      window.android.showToastMessage('나는 K상남자~!');
    }
  };

  const handleShowAlertMessage = () => {
    if (window.android) {
      window.android.showAlertMessage();
    }
  };

  const reactFunc = (data: any) => {
    alert('data in reactFunc: ' + data);
    console.log(data);
  };

  return (
    <div>
      <h1>Javascript Interface Test</h1>
      <input value={value} />
      <button onClick={handleShowToastMessage}>showToastMessage</button>
      {/* <button onClick={handleShowAlertMessage}>showAlertMessage</button> */}
    </div>
  );
};

export default App;
