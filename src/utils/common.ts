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
    console.debug('interfaceNm: ', interfaceNm);
    console.debug('action: ', action);

    if (window[interfaceNm]) {
      window.addEventListener(action, (e: any) => {
        resolve(e.detail.data);
      });

      if (window[interfaceNm][action]) {
        // FIXME: 인자값 undefined로 함수 호출 시 'Method not found' 에러 발생.
        // FIXME: 빈 문자열로 호출하면 Native jsInterface 함수에서 무조건 인자값 string으로 받아주어야 한다.
        window[interfaceNm][action](data);
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};
