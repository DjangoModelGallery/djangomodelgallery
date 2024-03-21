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
    ? `<ul class="list-none flex gap-x-4">${tags
        .map(
          (tag) =>
            `<li class="bg-emerald-900 rounded-xl px-2 py-0.5 text-white">${tag}</li>`
        )
        .join("")}</ul>`
    : "<p>없음</p>";

  return `
    <article class="shadow-lg rounded-lg py-6 px-2 bg-emerald-500 ">
 
    <div class="max-w-4xl flex f-full mx-auto justify-between">
      <div>
        <h2 class="text-5xl font-semibold leading-tight">${title}</h2>
        <p class="text-gray-600 font-semibold underline pt-3">${category}</p>
        <time datetime="${date}" class="block text-sm text-gray-500">
          ${date}
        </time>
        <div class="mt-2">
          ${tagsHtml}
        </div>
      </div>

      <header class="flex items-end justify-end">
      <h1 class="text-xl font-semibold pr-4"> 기여자 :<br /><span class="text-4xl">${name}</span></h1>
      <div class="flex flex-col gap-y-4">
        <a
          href="${github ?? "#"}"
          class="text-blue-500 hover:text-blue-700 bg-white p-0.5 rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
        <img src="./src/img/profile/github-logo.svg" class="w-10 h-10 rounded-full" alt="github-logo" />
        </a>
        <a
          href="${twitter ?? "#"}"
          class="text-blue-500 hover:text-blue-700 bg-black p-0.5 rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
        <img src="./src/img/profile/x-logo.svg" class="w-10 h-10 rounded-full" alt="x-logo" />
        </a>
      </div>
    </header>
    </div>
    </article>
  `;
}
