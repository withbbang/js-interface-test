/**
 * 화면 접근 OS 반환 함수
 * @returns {string}
 */
export const handleGetOsType = (): string => {
  const { userAgent } = navigator;

  if (/android/i.test(userAgent)) {
    return 'AND';
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'IOS';
  } else {
    return 'BACK';
  }
};

/**
 * Android용 Javascript Interface
 * @param {string} action 액션 이름
 * @param {any | undefined} data 콜백 데이터
 * @param {string | undefined} bridge 브릿지 이름
 * @returns {Promise<any>}
 */
export const handleJavascriptInterface = (
  action: string,
  data?: any,
  bridge?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const interfaceNm = (bridge || 'android') as keyof Window;

    if (window[interfaceNm]) {
      window.addEventListener(action, (e: any) => {
        resolve(e.detail.data);
      });

      if (window[interfaceNm][action]) {
        window[interfaceNm][action](data || '');
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};
