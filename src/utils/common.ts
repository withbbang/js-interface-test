/**
 * Android용 Javascript Interface
 * @param {string} action 액션이름
 * @param {any} data 콜백 데이터
 * @returns {Promise<any>}
 */
export const handleJavascriptInterface = (
  action: string,
  data: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (window.android) {
      window.addEventListener(action, (e: any) => {
        resolve(e.detail.data);
      });

      if (window.android[action]) {
        window.android[action](data);
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};
