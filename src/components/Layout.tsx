import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="min-h-screen mx-auto scrollbar-hide bg-black pb-12">
        {children}
      </section>
    </>
  );
}
