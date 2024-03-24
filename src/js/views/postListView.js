export function createPostView(post) {
  const postSection = document.createElement("section");
  postSection.innerHTML = `
        <h2><a href="#" data-id="${post.id}">${post.title}</a></h2>
        <p>작성일: ${post.date}</p>
        <p>카테고리: ${post.category}</p>
        <p>태그: ${post.tags.join(", ")}</p>
        <p>기여자: <a href="${
          post.contributor.social.github
        }" target="_blank">${post.contributor.name}</a></p>
        <p>트위터: <a href="${
          post.contributor.social.twitter
        }" target="_blank">@${post.contributor.name}</a></p>
    `;
  return postSection;
}
