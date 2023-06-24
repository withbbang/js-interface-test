import React, { useEffect, useState } from 'react';

const App = (): JSX.Element => {
  const [toastMessageFromNative, setToastMessageFromNative] =
    useState<string>('');

  const handleEventFromNative = async (e: any) => {
    setToastMessageFromNative(e.data);
  };

  useEffect(() => {
    window.addEventListener('calledFunctionByNative', handleEventFromNative);

    if (window.callFunctionByWeb) {
      window.callFunctionByWeb.showToastMessage('나는 K상남자~!');
    }
  }, []);

  return <>Sex!</>;
};

export default App;
