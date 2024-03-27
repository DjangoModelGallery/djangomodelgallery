export function getFooter() {
  const currentYear = new Date().getFullYear();
  return `

        <div class="max-w-4xl mx-auto px-4 flex flex-wrap justify-between items-center">
          <div class="flex items-center">
            <em class="text-2xl mr-2">&copy;</em>
            <p class="text-sm">All rights reserved Django Model Gallery ${currentYear}</p>
          </div>
          <nav>
            <ul class="flex space-x-4">
              <li><a href="#" class="hover:text-gray-300">깃헙</a></li>
              <li><a href="#" class="hover:text-gray-300">기여자들</a></li>
              <li><a href="#" class="hover:text-gray-300">문의하기</a></li>
            </ul>
          </nav>
        </div>

    `;
}

const footerElement = document.createElement("footer");
footerElement.classList.add(
  "custom-footer",
  "bg-gray-900",
  "text-white",
  "py-2",
  "fixed",
  "bottom-0",
  "w-full",
  "z-50",
  "transition-opacity",
  "duration-300",
);
footerElement.innerHTML = getFooter();
document.body.appendChild(footerElement);

function handleScroll() {
  const scrollPosition = window.innerHeight + window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  if (documentHeight <= window.innerHeight) {
    footerElement.classList.add("opacity-100");
  } else {
    footerElement.classList.remove("opacity-100");
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
