type PageIntroProps = {
  label: string;
  title: string;
  description: string;
};

export default function PageIntro({ label, title, description }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="page-intro-card">
          <p className="section-label">{label}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
      </div>
    </section>
  );
}
