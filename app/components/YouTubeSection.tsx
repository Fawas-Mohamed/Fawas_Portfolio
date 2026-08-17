"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./YouTubeSection.module.css";
import { getYouTubeVideos, type YouTubeVideo } from "../lib/content";

const youtubeChannelUrl = "https://www.youtube.com/@DevSystemLogs";

const STORAGE_KEY = "youtube-latest-videos";

function loadCachedVideos() {
  try {
    if (typeof window === "undefined") {
      return [] as YouTubeVideo[];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [] as YouTubeVideo[];
    const parsed = JSON.parse(raw) as YouTubeVideo[];
    return Array.isArray(parsed) ? parsed : ([] as YouTubeVideo[]);
  } catch {
    return [] as YouTubeVideo[];
  }
}

export default function YouTubeSection() {
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cachedVideos = loadCachedVideos();

    if (cachedVideos.length) {
      setYoutubeVideos(cachedVideos);
      setLoading(false);
    }

    async function loadVideos() {
      try {
        const videos = await getYouTubeVideos();
        if (cancelled) return;

        const nextVideos = videos.slice(0, 5);
        setYoutubeVideos(nextVideos);
        setError(null);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextVideos));
      } catch {
        if (cancelled) return;

        if (!cachedVideos.length) {
          setError("Content temporarily unavailable.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  const { featuredVideo, compactVideos } = useMemo(() => {
    const [featured, ...compact] = youtubeVideos;
    return {
      featuredVideo: featured,
      compactVideos: compact,
    };
  }, [youtubeVideos]);

  const showSkeleton = loading && youtubeVideos.length === 0;

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
                  {showSkeleton ? (
                    <div className={styles.featuredSkeleton} aria-hidden="true">
                      <div className={styles.skeletonThumb}></div>
                      <div className={styles.skeletonMeta}>
                        <div className={styles.skeletonLineLg}></div>
                        <div className={styles.skeletonLineSm}></div>
                      </div>
                    </div>
                  ) : featuredVideo ? (
                    <>
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
                    </>
                  ) : error ? (
                    <div className={styles.errorState}>{error}</div>
                  ) : (
                    <div className={styles.emptyState}>No videos available yet.</div>
                  )}
                </div>
              </div>

              <div className={styles.grid}>
                {showSkeleton
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <article
                        key={`youtube-skeleton-${index}`}
                        className={styles.card}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay={350 + index * 100}
                      >
                        <div className={styles.cardSkeleton} aria-hidden="true">
                          <div className={styles.skeletonThumbSmall}></div>
                          <div className={styles.cardMeta}>
                            <div className={styles.skeletonLineXs}></div>
                            <div className={styles.skeletonLineMd}></div>
                            <div className={styles.skeletonLineSm}></div>
                          </div>
                        </div>
                      </article>
                    ))
                  : compactVideos.map((video, index) => (
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

              {error && youtubeVideos.length > 0 ? <div className={styles.errorState}>{error}</div> : null}

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
