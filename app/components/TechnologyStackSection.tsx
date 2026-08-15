import styles from "./TechnologyStackSection.module.css";

type TechnologyTrack = {
  title: string;
  description: string;
  items: string[];
  visualLabel: string;
};

const technologyTracks: TechnologyTrack[] = [
  {
    title: "Frontend Development",
    description: "Interfaces that stay sharp under pressure, with motion and structure tuned for clarity.",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    visualLabel: "Interface Systems",
  },
  {
    title: "Backend Engineering",
    description: "API layers and service boundaries designed for predictable behavior and clean growth.",
    items: ["Node.js", "Express", "ASP.NET Core", "Laravel", "REST API"],
    visualLabel: "Service Architecture",
  },
  {
    title: "Database Systems",
    description: "Data models built for durability, query performance, and practical real-world workflows.",
    items: ["PostgreSQL", "MongoDB", "SQL Server", "MySQL", "Firebase"],
    visualLabel: "Persistence Layer",
  },
  {
    title: "Cloud & DevOps",
    description: "Shipping pipelines, hosting, and deployment habits that keep releases calm and repeatable.",
    items: ["Azure", "Docker", "GitHub Actions", "Vercel"],
    visualLabel: "Delivery Stack",
  },
];

export default function TechnologyStackSection() {
  return (
    <section className={styles.section} id="skills" aria-labelledby="core-technologies-title">
      <div className="container tw-container-1800-px">
        <div className={styles.header}>
          <p className={styles.kicker}>Core Technologies I Build With</p>
          <h2 className={styles.title} id="core-technologies-title">
            A production stack shaped around speed, stability, and systems thinking.
          </h2>
          <p className={styles.description}>
            Each discipline gets its own horizontal card so the section reads like an operating system for how I design,
            build, and ship products.
          </p>
        </div>

        <div className={styles.grid}>
          {technologyTracks.map((track, index) => (
            <article
              key={track.title}
              className={`${styles.card} ${index % 2 === 1 ? styles.cardReverse : ""} ${
                index % 2 === 0 ? styles.accentPrimary : styles.accentSecondary
              }`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-duration="1200"
              data-aos-delay={200 + index * 100}
            >
              <div className={styles.copy}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <p className={styles.tag}>Category {index + 1}</p>
                <h3 className={styles.cardTitle}>{track.title}</h3>
                <p className={styles.cardDescription}>{track.description}</p>

                <ul className={styles.techList}>
                  {track.items.map((item) => (
                    <li key={item} className={styles.techItem}>
                      <span className={styles.techDot} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.visual} aria-hidden="true">
                <div className={styles.visualFrame}>
                  <span className={styles.visualGlow} />
                  <span className={styles.visualOrbit} />
                  <span className={styles.visualPanelOne} />
                  <span className={styles.visualPanelTwo} />
                  <span className={styles.visualPanelThree} />
                  <span className={styles.visualNodeOne} />
                  <span className={styles.visualNodeTwo} />
                  <span className={styles.visualNodeThree} />
                  <span className={styles.visualBadge}>{track.visualLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}