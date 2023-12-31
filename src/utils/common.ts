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
        // FIXME: data === undefined일 경우, undefined가 전달돼서 Method not found 에러가 발생한다.
        // FIXME: 따라서 전달되는 인자값과 Native jsInterface에서 받는 인자값의 타입은 무조건 동일해야한다.
        data !== undefined
          ? window[interfaceNm][action](data)
          : window[interfaceNm][action]();
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};
