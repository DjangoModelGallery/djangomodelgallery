/**
 * URL의 쿼리 파라미터를 기반으로 게시물 목록을 가져옵니다.
 * 검색 쿼리, 정렬 방식, 정렬 방향, 카테고리 필터링을 지원합니다.
 *
 * @async
 * @function
 * @param {string} [search] - 검색 쿼리. 제목이나 태그가 이 쿼리를 포함하는 게시물만 반환합니다.
 * @param {string} [sortBy=date] - 정렬 방식. 이 속성에 따라 게시물을 정렬합니다.
 * @param {string} [sortDirection=asc] - 정렬 방향. 'asc' 또는 'desc'를 지정할 수 있습니다.
 * @param {string} [category] - 카테고리 필터. 이 카테고리의 게시물만 반환합니다.
 * @returns {Promise<Array>} 게시물 목록을 포함하는 프로미스. 각 게시물은 title, tags, category 등의 속성을 가진 객체입니다.
 * @throws {Error} 데이터를 가져오는 데 실패하면 오류를 발생시킵니다.
 *
 * @example
 * fetchPosts().then(posts => console.log(posts)).catch(error => console.error(error));
 */
export async function fetchPosts() {
  // URL에서 쿼리 파라미터 읽기
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search") || "";
  const sortBy = params.get("sortBy") || "date";
  const sortDirection = params.get("sortDirection") || "asc";
  const filterCategory = params.get("category") || "";

  const response = await fetch(
    `${window.location.origin}/src/postsList/postsList.json`,
  );
  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }
  let posts = await response.json();

  // 검색 쿼리에 따라 필터링
  if (searchQuery) {
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }

  // 카테고리에 따라 필터링
  if (filterCategory) {
    posts = posts.filter((post) => post.category === filterCategory);
  }

  // 정렬
  posts.sort((a, b) => {
    let comparison = 0;
    if (a[sortBy] < b[sortBy]) {
      comparison = -1;
    } else if (a[sortBy] > b[sortBy]) {
      comparison = 1;
    }
    return sortDirection === "asc" ? comparison : comparison * -1;
  });

  return posts;
}
