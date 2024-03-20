export function getContributorProfile({
  id,
  title,
  date,
  category,
  modelCount,
  tags,
  contributor,
}) {
  const { name, social } = contributor;
  const { github, twitter } = social;

  const tagsHtml = tags
    ? `<ul class="list-disc list-inside">${tags
        .map((tag) => `<li>${tag}</li>`)
        .join("")}</ul>`
    : "<p>없음</p>";

  return `
    <article class="bg-white shadow-lg rounded-lg p-6 m-4">
      <header class="flex flex-col items-center mb-4">
        <h1 class="text-xl font-semibold mb-2">${name}</h1>
        <div class="flex space-x-3">
          <a
            href="${github ?? "#"}"
            class="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="${twitter ?? "#"}"
            class="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </header>
      <div>
        <h2 class="text-lg font-semibold">${title}</h2>
        <p class="text-gray-700">${category}</p>
        <time datetime="${date}" class="block text-sm text-gray-500">
          ${date}
        </time>
        <div class="mt-2">
          <span class="text-gray-700 font-medium">Tags:</span>
          ${tagsHtml}
        </div>
      </div>
    </article>
  `;
}
