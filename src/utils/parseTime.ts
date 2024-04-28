/**
 * DateString을 파싱하여 YYYY-MM-DD 형태의 문자열로 반환하는 함수입니다.
 *
 * @param {string} dateString - 날짜를 나타내는 문자열
 * @returns {string} YYYY-MM-DD 형태의 문자열
 */
export function parseDateString(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
