/**
 * URL의 쿼리 파라미터를 관리하는 클래스입니다.
 * @class
 */
export default class FilterManager {
  /**
   * FilterManager 클래스의 새 인스턴스를 생성합니다.
   * @constructor
   */
  constructor() {
    this.filters = new Map();
    this.currentFilters = new URLSearchParams(window.location.search);
  }

  /**
   * 새 필터를 추가합니다.
   * @method
   * @param {string} buttonId - 필터를 활성화하는 버튼의 ID입니다.
   * @param {string} param - 필터의 파라미터 이름입니다.
   * @param {string} value - 필터의 파라미터 값입니다.
   */
  addFilter(buttonId, param, value) {
    this.filters.set(buttonId, { param, value });

    document.getElementById(buttonId).addEventListener("click", () => {
      if (this.currentFilters.get(param) === value) {
        this.currentFilters.delete(param);
      } else {
        // 동일한 param에 대해 다른 버튼을 클릭할 경우, 이전 값을 제거합니다.
        this.filters.forEach((filter, key) => {
          if (filter.param === param) {
            this.currentFilters.delete(param);
          }
        });
        this.currentFilters.set(param, value);
      }

      this.updateURL();
    });
  }

  /**
   * 모든 필터를 제거합니다.
   * @method
   */
  clearFilters() {
    this.currentFilters = new URLSearchParams();
    this.updateURL();
  }

  /**
   * URL의 쿼리 문자열을 현재 필터에 맞게 업데이트합니다.
   * @method
   */
  updateURL() {
    const url = new URL(window.location);
    url.search = this.currentFilters.toString();
    window.history.pushState({}, "", url.toString());
  }
}
