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

    // Web -> Native
    if (window.callFunctionByWeb) {
      window.callFunctionByWeb.showToastMessage('나는 K상남자~!');
    }
  }, []);

  return <h1>Javascript Interface Test</h1>;
};

export default App;
