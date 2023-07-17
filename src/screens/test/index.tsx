import React from 'react';
import { handleJavascriptInterface } from 'utils/common';

const Test = (): JSX.Element => {
  const handleGoBack = () => {
    handleJavascriptInterface('goBack');
  };

  return (
    <div>
      <h1>Hello, This Page is Test Page!</h1>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default Test;
