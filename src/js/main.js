import { initializeTheme } from "./util/initializeTheme.js";
import { filterOptions } from "./constants/filterList.js";
import MainFilterManager from "./service/MainFilterManager.js";
import { fetchPosts } from "./util/fetchPost.js";
import { applySavedTheme, toggleTheme } from "./util/toggleTheme.js";
import { createPostDetailView } from "./views/postDetailView.js";
import { createPostView } from "./views/postListView.js";

async function renderPostDetail(fileName) {
  try {
    const postDetailView = await createPostDetailView(fileName);
    if (postDetailView) {
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = "";
      mainElement.appendChild(postDetailView);
    } else {
      console.error(
        `Failed to render post detail for post fileName: ${fileName}`,
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderMainContent() {
  const main = document.querySelector("main");

  try {
    const posts = await fetchPosts();
    const postSections = posts.map((post) => {
      const postSection = createPostView(post);
      postSection.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && event.target.dataset.id) {
          const postId = event.target.dataset.id;
          renderPostDetail(posts[parseInt(postId) - 1].fileName);
        }
      });
      return postSection;
    });

    main.innerHTML = "";

    postSections.forEach((section) => main.appendChild(section));
  } catch (error) {
    console.error(
      "데이터를 가져오는데 실패했습니다. 에러명을 확인해주세요.",
      error,
    );
    main.innerHTML =
      "<p>데이터를 가져오는데 실패했습니다. console에 찍힌 에러명을 확인해주세요.</p>";
  }
}

applySavedTheme();

document
  .querySelector(".theme-toggle-button")
  .addEventListener("click", toggleTheme);

initializeTheme();
renderMainContent();

document.addEventListener("DOMContentLoaded", () => {
  const mainFilterManager = new MainFilterManager(renderMainContent);

  // 이전 검색 내용 유지를 위한 코드
  const searchParams = new URLSearchParams(window.location.search);
  const searchType = searchParams.get("type");
  const searchInput = searchParams.get("query")

  const filterContainer = document.getElementById("filter");

  // select, option 생성
  const filterSelect = document.createElement("select");
  filterSelect.id = "searchType"
  filterOptions.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.text;
    if(searchType && searchType == option.value){
      opt.selected = true;
    }
    filterSelect.appendChild(opt);
  });
  filterContainer.appendChild(filterSelect);

  // input 생성
  const inputBox = document.createElement("input");
  inputBox.id = "searchInput";
  filterContainer.appendChild(inputBox);
  inputBox.value = searchInput;
  inputBox.focus();

  // 엔터 키 또는 검색 버튼을 눌렀을 때 이벤트 처리
  inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
      handleSearch(); // 검색 처리 함수 호출
    }
  });

  // clear 버튼 
  const clearBtn = document.createElement("button");
  clearBtn.setAttribute("id", "clearFilters");
  clearBtn.classList.add("dark:text-white");
  clearBtn.innerText = "Clear Filters";
  filterContainer.appendChild(clearBtn);
  document.getElementById("clearFilters").addEventListener("click", () => {
    mainFilterManager.clearFilters();
  });

  renderMainContent();
});

// 검색 처리 함수
async function handleSearch() {
  const searchType = document.querySelector("#searchType").value;
  const searchInput = document.querySelector("#searchInput").value;

  const type = encodeURIComponent(searchType);
  const query = encodeURIComponent(searchInput); // URL 인코딩
  
  // 현재 URL에 쿼리 파라미터 추가
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("type", type);
  currentUrl.searchParams.set("query", query);

  // 새로운 URL로 리다이렉트
  window.location.href = currentUrl.toString();
}