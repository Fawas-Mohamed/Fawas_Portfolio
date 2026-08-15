import styles from "./YouTubeSection.module.css";

const youtubeChannelUrl = "https://www.youtube.com/@DevSystemLogs";

const youtubeVideos = [
  {
    id: "featured",
    title: "Building with clarity",
    category: "Engineering",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    url: youtubeChannelUrl,
  },
  {
    id: "video-02",
    title: "ASP.NET Core API",
    category: "Tutorial",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    url: youtubeChannelUrl,
  },
  {
    id: "video-03",
    title: "Azure Deployment",
    category: "Cloud",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    url: youtubeChannelUrl,
  },
  {
    id: "video-04",
    title: "Full-Stack Development",
    category: "Engineering",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    url: youtubeChannelUrl,
  },
];

export default function YouTubeSection() {
  const [featuredVideo, ...compactVideos] = youtubeVideos;

  return (
    <section className={styles.section} id="youtube" aria-labelledby="youtube-title">
      <div className="container tw-container-1800-px">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className={styles.shell} data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <div className={styles.pretitle} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                YOUTUBE / CONTENT CREATOR
              </div>

              <div className={styles.heroRow}>
                <div className={styles.copyBlock} data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                  <h2 id="youtube-title" className={styles.title}>
                    <span className={styles.build}>BUILD.</span>
                    <span className={styles.learn}>LEARN.</span>
                    <span className={styles.share}>SHARE.</span>
                  </h2>

                  <p className={styles.description}>
                    Sharing what I learn while building real software.
                  </p>
                </div>

                <div className={styles.featured} data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                  <a href={featuredVideo.url} target="_blank" rel="noreferrer" className={styles.featuredLink} aria-label={featuredVideo.title}>
                    <div
                      className={styles.featuredThumb}
                      style={{ backgroundImage: `url(${featuredVideo.thumbnail})` }}
                    >
                      <span className={styles.playBadge} aria-hidden="true">
                        <i className="ph ph-play-fill"></i>
                      </span>
                    </div>
                  </a>

                  <div className={styles.featuredMeta}>
                    <h3 className={styles.featuredTitle}>{featuredVideo.title}</h3>
                    <p className={styles.featuredCategory}>{featuredVideo.category}</p>
                  </div>
                </div>
              </div>

              <div className={styles.grid}>
                {compactVideos.map((video, index) => (
                  <article
                    key={video.id}
                    className={styles.card}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={350 + index * 100}
                  >
                    <a href={video.url} target="_blank" rel="noreferrer" className={styles.cardLink} aria-label={video.title}>
                      <div
                        className={styles.cardThumb}
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      >
                        <span className={styles.cardPlay} aria-hidden="true">
                          <i className="ph ph-play-fill"></i>
                        </span>
                      </div>
                    </a>

                    <div className={styles.cardMeta}>
                      <span className={styles.cardLabel}>VIDEO 0{index + 2}</span>
                      <h4 className={styles.cardTitle}>{video.title}</h4>
                      <p className={styles.cardCategory}>{video.category}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.cta} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="450">
                <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                  VIEW ALL VIDEOS <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
