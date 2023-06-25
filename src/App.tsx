import React, { useEffect, useState } from 'react';

const App = (): JSX.Element => {
  const [toastMessageFromNative, setToastMessageFromNative] =
    useState<string>('');

  const handleEventFromNative = async (e: any) => {
    alert(e.data);
  };

  useEffect(() => {
    // Native -> Web
    window.addEventListener('calledFunctionByNative', handleEventFromNative);
  }, []);

  const handleCallNativeFunction = () => {
    // Web -> Native
    if (window.calledFunctionByWeb) {
      window.calledFunctionByWeb.showToastMessage('나는 K상남자~!');
    }
  };

  return (
    <div>
      <h1>Javascript Interface Test</h1>
      <button onClick={handleCallNativeFunction}>Call Native Function</button>
    </div>
  );
};

export default App;
