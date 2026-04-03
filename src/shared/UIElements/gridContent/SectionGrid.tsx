function SectionGrid({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto min-h-screen max-w-300 p-4 lg:p-10">
      <h2 className="section-title-size mb-2 sm:mb-4 md:mb-6 lg:mb-10">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default SectionGrid;
