import { useEffect } from 'react';

const App = (): JSX.Element => {
  useEffect(() => {
    // Native -> Web
    window.addEventListener('calledFunctionByNative', handleEventFromNative);
  }, []);

  const handleEventFromNative = async (e: any) => {
    alert(e.data);
  };

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
