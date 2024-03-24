import FilterManager from "./FilterManager.js";

/**
 * FilterManager 클래스를 확장하여 렌더링 콜백과 활성 필터 하이라이팅 기능을 추가하는 클래스입니다.
 * @class
 * @extends FilterManager
 */
export default class MainFilterManager extends FilterManager {
  /**
   * MainFilterManager 클래스의 새 인스턴스를 생성합니다.
   * @constructor
   * @param {Function} renderCallback - 콘텐츠를 렌더링하는 콜백 함수입니다.
   */
  constructor(renderCallback) {
    super();
    this.renderCallback = renderCallback;

    window.addEventListener("popstate", () => {
      this.renderCallback();
    });
  }

  /**
   * 현재 활성화된 필터에 대응하는 버튼을 하이라이트합니다.
   * @method
   */
  highlightActiveFilters() {
    this.filters.forEach((value, key) => {
      const button = document.getElementById(key);
      if (button) {
        if (this.currentFilters.get(value.param) === value.value) {
          button.classList.add("bg-blue-500", "text-white");
          button.classList.remove("bg-gray-200", "hover:bg-gray-300");
        } else {
          button.classList.add("bg-gray-200", "hover:bg-gray-300");
          button.classList.remove("bg-blue-500", "text-white");
        }
      }
    });
  }

  /**
   * URL의 쿼리 문자열을 현재 필터에 맞게 업데이트하고, 콘텐츠를 렌더링하고, 활성 필터를 하이라이트합니다.
   * @method
   */
  updateURL() {
    super.updateURL();
    this.renderCallback();
    this.highlightActiveFilters();
  }
}
