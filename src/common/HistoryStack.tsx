import Link from "next/link";

export default function HistoryStack({ pathName }: { pathName: string }) {
  return (
    <Link
      href={`${pathName}`}
      passHref
      replace
      style={{
        padding: "0.025rem 1rem",
        textUnderlineOffset: "0.1rem",
        borderRadius: "1rem",
        cursor: "pointer",
        zIndex: 2,

        transition: "background-color 0.2s, color 0.2s",
      }}
    >
      #{pathName.split("/")[2]}
    </Link>
  );
}
