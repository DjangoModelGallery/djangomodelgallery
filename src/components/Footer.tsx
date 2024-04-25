import { FOOTER_TITLE } from "../../constants/navigation";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <aside>
        <p className="text-8xl mb-1">🍊</p>
        <p className="whitespace-pre-wrap">{FOOTER_TITLE}</p>
      </aside>
      <nav>
        <h6 className="footer-title">Sponsor</h6>
        <div className="grid grid-flow-col gap-4">
          <a>제주대 아이콘이나 링크나 배너</a>
        </div>
      </nav>
    </footer>
  );
}
