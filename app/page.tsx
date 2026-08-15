import ContactForm from "./components/ContactForm";
import DownloadCvButton from "./components/DownloadCvButton";
import JourneySection from "./components/JourneySection";
import YouTubeSection from "./components/YouTubeSection";
import {
  getProjects,
  getSkills,
  getHighlights,
  getTestimonials,
  getCertificates,
  Project,
  Skill,
  Highlight,
  Testimonial,
  Certificate,
} from "./lib/content";

const fallbackProjects: Project[] = [
  { id: "f1", title: "AuctionPilot — Real-Time Auction Platform", tags: ["REACT + SIGNALR", "LIVE IN PRODUCTION"], thumb: "portfolio-three-thumb1.jpg", githubUrl: null, liveUrl: null, isFeatured: true, orderIndex: 0 },
  { id: "f2", title: "Enterprise Web & Mobile Platform", tags: ["LARAVEL + REACT NATIVE", "TEAM PROJECT"], thumb: "portfolio-three-thumb2.jpg", githubUrl: null, liveUrl: null, isFeatured: true, orderIndex: 1 },
  { id: "f3", title: "Healspire — Patient & Appointment System", tags: ["JAVA + SPRING BOOT", "REST API"], thumb: "portfolio-three-thumb3.jpg", githubUrl: null, liveUrl: null, isFeatured: true, orderIndex: 2 },
  { id: "f4", title: "FuelPass — Smart Fuel Management", tags: ["NODE + MONGODB", "PLAYWRIGHT TESTED"], thumb: "portfolio-three-thumb4.jpg", githubUrl: null, liveUrl: null, isFeatured: true, orderIndex: 3 },
];

const fallbackSkills: Skill[] = [
  "Java", "TypeScript", "C#", "React.js", "Node.js", "ASP.NET Core",
  "Spring Boot", "PostgreSQL / MySQL", "MongoDB", "SignalR", "Playwright", "Azure / Vercel",
].map((name, i) => ({ id: `s${i}`, category: "Core", name, orderIndex: i }));

const fallbackHighlights: Highlight[] = [
  { id: "h1", number: "01", title: "Full-Stack Web Development", tags: ["React.js", "Node.js", "ASP.NET Core"], thumb: "service-three-thumb1.png", orderIndex: 0 },
  { id: "h2", number: "02", title: "Real-Time Systems Engineering", tags: ["SignalR", "Concurrency", "WebSockets"], thumb: "service-three-thumb2.png", orderIndex: 1 },
  { id: "h3", number: "03", title: "REST API & Database Design", tags: ["PostgreSQL", "MySQL", "MongoDB"], thumb: "service-three-thumb3.png", orderIndex: 2 },
  { id: "h4", number: "04", title: "Cloud Deployment & DevOps", tags: ["Azure", "Vercel", "CI/CD"], thumb: "service-three-thumb4.png", orderIndex: 3 },
];

const fallbackTestimonials: Testimonial[] = [
  { id: "t1", name: "Mohamed Rilwan", role: "Senior Manager, Information System Audit — Deloitte", quote: "A dependable engineer who reasons carefully about correctness, not just features — the kind of judgment you want on a live system.", thumb: "testimonial-three-thumb1.jpg", orderIndex: 0 },
  { id: "t2", name: "Ms. Pavitha Subashini", role: "Senior Lecturer, Dept. of Software Engineering — NSBM Green University", quote: "Consistently curious and thorough — takes on unfamiliar tools and frameworks independently and comes back with a working understanding.", thumb: "testimonial-three-thumb2.jpg", orderIndex: 1 },
];

const fallbackCertificates: Certificate[] = [
  { id: "c1", title: "AWS Certified Developer", thumb: "cert1.jpg", orderIndex: 0, skills: ["AWS", "Serverless", "CI/CD"] },
  { id: "c2", title: "Professional TypeScript", thumb: "cert2.jpg", orderIndex: 1, skills: ["TypeScript", "TSConfig", "Tooling"] },
  { id: "c3", title: "Playwright Testing", thumb: "cert3.jpg", orderIndex: 2, skills: ["E2E", "Playwright", "Automation"] },
  { id: "c4", title: "Azure Fundamentals", thumb: "cert4.jpg", orderIndex: 3, skills: ["Azure", "Cloud", "Deployment"] },
  { id: "c5", title: "Database Design", thumb: "cert5.jpg", orderIndex: 4, skills: ["Postgres", "Modeling", "SQL"] },
];

export default async function Home() {
  const [fetchedProjects, fetchedSkills, fetchedHighlights, fetchedTestimonials, fetchedCertificates] = await Promise.all([
    getProjects(),
    getSkills(),
    getHighlights(),
    getTestimonials(),
    getCertificates(),
  ]);

  const projects = fetchedProjects.length ? fetchedProjects : fallbackProjects;
  const skills = fetchedSkills.length ? fetchedSkills : fallbackSkills;
  const highlights = fetchedHighlights.length ? fetchedHighlights : fallbackHighlights;
  const testimonials = fetchedTestimonials.length ? fetchedTestimonials : fallbackTestimonials;
  const certificates = fetchedCertificates.length ? fetchedCertificates : fallbackCertificates;

  return (
    <>
      {/* ==================== Preloader Start ==================== */}
      <div className="preloader">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
        </svg>
        <div className="preloader-heading">
          <div className="load-text">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
        </div>
      </div>
      {/* ==================== Preloader End ==================== */}

      <div className="overlay"></div>
      <div className="side-overlay"></div>

      {/* ==================== Magic Cursor ==================== */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>

      <div id="toast-container"></div>

      {/* ==================== Scroll to Top ==================== */}
      <div className="back-to-top-wrapper">
        <button id="back_to_top" type="button" className="back-to-top-btn">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L6 1L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ==================== Offcanvas Mobile Menu ==================== */}
      <div className="tw-offcanvas-2-area p-relative">
        <div className="tw-offcanvas-2-bg is-left left-box"></div>
        <div className="tw-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
        <div className="tw-offcanvas-2-wrapper">
          <div className="tw-offcanvas-2-left left-box">
            <div className="tw-offcanvas-2-left-wrap d-flex justify-content-between align-items-center">
              <div className="twoffcanvas__logo">
                <a className="logo-1" href="#home">
                  <img src="/assets/images/logo/lolol.png" alt="Mohamed Fawas" />
                </a>
              </div>
              <div className="tw-offcanvas-2-close d-md-none text-end">
                <button className="tw-offcanvas-2-close-btn tw-offcanvas-2-close-btn">
                  <span className="text">
                    <span className="text-white">close</span>
                  </span>
                  <span className="d-inline-block">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32.621" height="1.00918" transform="matrix(0.704882 0.709325 -0.704882 0.709325 1.0061 0)" fill="currentcolor" />
                        <rect width="32.621" height="1.00918" transform="matrix(0.704882 -0.709325 0.704882 0.709325 0 23.2842)" fill="currentcolor" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="tw-main-menu-mobile menu-hover-active counter-row">
              <nav></nav>
            </div>
          </div>
          <div className="tw-offcanvas-2-right right-box d-none d-md-block p-relative">
            <div className="tw-offcanvas-2-close text-end">
              <button className="tw-offcanvas-2-close-btn">
                <span className="text">
                  <span>close</span>
                </span>
                <span className="d-inline-block">
                  <span>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.80859 9.80762L28.1934 28.1924" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.80859 28.1924L28.1934 9.80761" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            <div className="tw-offcanvas-2-right-inner d-flex flex-column justify-content-between h-100">
              <div className="twoffcanvas__contact-info">
                <div className="twoffcanvas__contact-title">
                  <h5 className="text-white">Contact me</h5>
                </div>
                <ul>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-map-pin-line"></i>
                    </span>
                    <a className="text-white" href="https://www.google.com/maps/place/Homagama" target="_blank" rel="noreferrer">
                      Homagama, Sri Lanka
                    </a>
                  </li>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-envelope"></i>
                    </span>
                    <a className="text-white" href="mailto:mohammedfawasfareed@gmail.com">
                      mohammedfawasfareed@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-phone-call"></i>
                    </span>
                    <a className="text-white" href="tel:+94753837488">
                      +94 75 383 7488
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-social" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <ul className="tw-gap-2">
                  <li>
                    <a href="https://github.com/Fawas-Mohamed" target="_blank" rel="noreferrer">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        GitHub <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-github-logo"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/mohamedfawas8/" target="_blank" rel="noreferrer">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        LINKEDIN <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-linkedin-logo"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@DevSystemLogs" target="_blank" rel="noreferrer">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        YOUTUBE <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-youtube-logo"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Header ==================== */}
      <header className="header header-two header-three tw-transition-all tw-z-99 position-relative">
        <div className="container tw-container-1800-px">
          <nav className="d-flex align-items-center justify-content-between position-relative">
            <div className="header-three-logo tw-rounded-md">
              <a href="#home" className="link">
                <img src="/assets/images/logo/logol.png" alt="Mohamed Fawas" className="max-w-200-px" />
              </a>
            </div>

            <div className="header-three-social d-none d-lg-block">
              <ul className="d-flex tw-gap-205">
                <li>
                  <a className="tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center text-heading tw-text-xl tw-rounded-md" href="https://github.com/Fawas-Mohamed" target="_blank" rel="noreferrer">
                    <i className="ph-bold ph-github-logo"></i>
                  </a>
                </li>
                <li>
                  <a className="tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center text-heading tw-text-xl tw-rounded-md" href="https://www.linkedin.com/in/mohamedfawas8/" target="_blank" rel="noreferrer">
                    <i className="ph-bold ph-linkedin-logo"></i>
                  </a>
                </li>
                <li>
                  <a className="tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center text-heading tw-text-xl tw-rounded-md" href="https://www.youtube.com/@DevSystemLogs" target="_blank" rel="noreferrer">
                    <i className="ph-bold ph-youtube-logo"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Nav content kept for the mobile offcanvas menu, which main.js clones from this block */}
            <div className="header-menu d-none">
              <div className="main-menu">
                <nav className="tw-main-menu-content">
                  <ul>
                    <li>
                      <a href="#home">Home</a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#skills">Skills</a>
                    </li>
                    <li>
                      <a href="#projects">Projects</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="header-right d-flex align-items-center tw-gap-705">
              <div className="header-three-menu">
                <button className="tw-offcanvas-open-btn tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center tw-transition-3 tw-rounded-md">
                  <span>
                    <img className="tw-transition-3" src="/assets/images/icons/header-three-toggle.svg" alt="toggle" />
                  </span>
                </button>
              </div>
              <div className="header-three-button d-none d-md-block">
                <DownloadCvButton className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-md" />
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* ==================== Hero / Banner ==================== */}
          <section className="banner-three-area" id="home">
            <div className="container tw-container-1800-px">
              <div className="row">
                <div className="col-xl-12">
                  <div className="banner-three-wrapper position-relative z-1">
                    <div className="banner-three-man position-absolute start-50 translate-middle-x">
                      <img src="/assets/images/shapes/banner-three-man.png" alt="Mohamed Fawas" />
                    </div>
                    <h1 className="banner-three-title text-black tw-mb-30">developer</h1>
                    <div className="banner-three-wrap d-flex justify-content-between align-items-end position-relative z-1">
                      <div className="banner-three-left tw-rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <h2 className="banner-three-left-title tw-text-3xl tw-mb-6">
                          Hello! I&apos;m Fawas <br />
                          a full-stack developer &amp; systems builder.
                        </h2>
                        <div className="banner-three-list">
                          <ul>
                            <li className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4">
                              <span>
                                <img src="/assets/images/icons/banner-three-pluse.svg" alt="pluse" />
                              </span>
                              Full-Stack Web Development
                            </li>
                            <li className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4">
                              <span>
                                <img src="/assets/images/icons/banner-three-pluse.svg" alt="pluse" />
                              </span>
                              Real-Time Systems (SignalR)
                            </li>
                            <li className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4">
                              <span>
                                <img src="/assets/images/icons/banner-three-pluse.svg" alt="pluse" />
                              </span>
                              REST API &amp; Database Design
                            </li>
                            <li className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4">
                              <span>
                                <img src="/assets/images/icons/banner-three-pluse.svg" alt="pluse" />
                              </span>
                              Cloud Deployment (Azure, Vercel)
                            </li>
                            <li className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4">
                              <span>
                                <img src="/assets/images/icons/banner-three-pluse.svg" alt="pluse" />
                              </span>
                              Automated Testing
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="banner-three-center text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <h3 className="banner-three-center-title tw-text-120">
                          Real-time systems and full-stack products, designed and shipped to production.
                        </h3>
                        <div className="banner-three-button">
                          <a
                            className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-lg"
                            href="#projects"
                          >
                            view projects
                            <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
                          </a>
                        </div>
                      </div>
                      <div className="banner-three-right tw-rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        <div className="banner-three-counter-item tw-rounded-md tw-mb-4 position-relative">
                          <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                            <span className="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="4"></span>+
                          </h4>
                          <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">Production-Grade Projects Shipped</p>
                        </div>
                        <div className="banner-three-counter-item tw-rounded-md tw-mb-4 ms-auto bg-black">
                          <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-white tw-mb-2 lh-1">
                            <span className="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="3"></span>+
                          </h4>
                          <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-white">Cloud Platforms Deployed To</p>
                        </div>
                        <div className="banner-three-counter-item tw-rounded-md tw-mb-4">
                          <div className="d-flex align-items-center tw-mb-2">
                            <div className="tw-w-9 tw-h-9 rounded-circle overflow-hidden tw-duration-300 hover-scale-2 tw-hover-z-9 position-relative z-1 border border-2 border-white">
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-600 text-heading fw-bold tw-text-sm">JV</div>
                            </div>
                            <div className="tw-w-9 tw-h-9 rounded-circle overflow-hidden tw-duration-300 hover-scale-2 tw-hover-z-9 position-relative z-2 tw--ms-16-px z-1 border border-2 border-white">
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-two-600 text-white fw-bold tw-text-sm">JS</div>
                            </div>
                            <div className="tw-w-9 tw-h-9 rounded-circle overflow-hidden tw-duration-300 hover-scale-2 tw-hover-z-9 position-relative z-3 tw--ms-16-px z-1 border border-2 border-white">
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-600 text-heading fw-bold tw-text-sm">C#</div>
                            </div>
                            <div className="tw-w-9 tw-h-9 rounded-circle overflow-hidden tw-duration-300 hover-scale-2 tw-hover-z-9 position-relative z-3 tw--ms-16-px z-1 border border-2 border-white">
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-two-600 text-white fw-bold tw-text-sm">SQL</div>
                            </div>
                          </div>
                          <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                            <span className="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="9"></span>+
                          </h4>
                          <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">Certifications &amp; Courses Completed</p>
                        </div>
                      </div>
                      <div className="banner-three-line-shape position-absolute start-50 translate-middle-x z-n1">
                        <img src="/assets/images/shapes/banner-three-shape.png" alt="shape" />
                        <div className="banner-three-carcel-shape">
                          <div>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== About ==================== */}
          <section className="about-three-area py-120 position-relative z-1" id="about">
            <div className="container tw-container-1800-px">
              <div className="about-three-top position-relative z-1">
                <div className="row justify-content-center tw-mb-21">
                  <div className="col-xl-9">
                    <div className="text-center">
                      <h2 className="about-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">
                        I design and ship real, production-grade software — from a live real-time bidding platform to
                        tested backend services — and I care as much about correctness under load as I do about clean code.
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="about-three-thumb w-100 tw-clip-anim tw-rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                      <img className="tw-anim-img w-100 tw-rounded-lg" data-animate="true" src="/assets/images/thumbs/fawas_image.png" alt="Mohamed Fawas" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="about-three-right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                      <div>
                        <p className="tw-text-xl tw-mb-10">
                          I&apos;m a third-year Software Engineering undergraduate (CGPA 3.69/4) who builds real systems, not
                          just class assignments. I independently designed, built, and deployed AuctionPilot — a live
                          real-time auction platform running across Azure and Vercel — and I&apos;ve contributed to a
                          production, multi-developer codebase during a professional internship.
                        </p>
                        <p className="tw-text-xl tw-mb-10">
                          I&apos;m comfortable picking up unfamiliar systems through documentation and experimentation —
                          that&apos;s how I learned SignalR well enough to synchronize live bids across concurrent users. I
                          reason carefully about race conditions, data correctness, and API design, and I write automated
                          tests so regressions get caught before users see them.
                        </p>
                        <p className="tw-text-xl tw-mb-10">
                          Outside of code, I explain technical ideas for a living too — as a technical content creator and
                          as an executive member of NSBM&apos;s Association of Software Engineering — because a system only
                          matters if the people around it understand it.
                        </p>
                      </div>
                      <div className="about-three-counter d-inline-block">
                        <div className="tw-hover-btn-wrapper d-inline-block">
                          <a
                            className="tw-btn-circle tw-hover-btn-item tw-hover-btn tw-w-160-px tw-h-160-px lh-1 d-inline-flex justify-content-center align-items-center rounded-circle position-relative overflow-hidden border border-1 border-neutral-200"
                            href="#projects"
                          >
                            <span className="d-flex flex-column justify-content-center">
                              <span className="tw-btn-circle-icon text-heading tw-text-8 tw-transition-3 font-heading fw-medium">3.69</span>
                              <span className="text-heading fw-bold text-center tw-transition-3 tw-text-2xl fw-medium">CGPA out of 4.0</span>
                            </span>
                            <i className="tw-btn-circle-dot bg-main-two-600"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="about-three-wrap-shape d-flex justify-content-between">
                  <div className="banner-three-counter-item tw-rounded-md position-relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <h2 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      <span className="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="5"></span>+
                    </h2>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">Languages &amp; Frameworks Used in Production</p>
                  </div>
                  <div className="banner-three-counter-item tw-rounded-md position-relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                    <h2 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      <span className="purecounter font-heading" data-purecounter-duration="2" data-purecounter-end="3"></span>
                    </h2>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">Live/Deployed Systems Built Independently</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img className="about-three-shape position-absolute start-0 w-100" src="/assets/images/shapes/about-three-shape.png" alt="shape" />
            </div>
          </section>

          {/* ==================== Journey ==================== */}
          <JourneySection />

          {/* ==================== Marquee ==================== */}
          <div className="marquee tw-pt-17 bg-black">
            <div className="marquee_left d-flex align-items-center justify-content-between tw-gap-16 overflow-hidden">
              {["Skills", "Skills", "Skills", "Skills", "Skills"].map((label, i) => (
                <div key={i}>
                  <h2 className={`marquee-two-title marquee-three-title text-uppercase ${i % 2 === 0 ? "text-white" : "text-stroke"}`}>
                    {label} <span className="text-white">-</span>
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== Skills / Services ==================== */}
          <section className="service-three-area bg-black pt-120 tw-pb-15" id="skills">
            <div className="container tw-container-1800-px">
              <div className="row">
                <div className="col-12">
                  <div className="service-three-wrapper">
                    {highlights.map((s, i) => (
                      <div
                        key={s.id}
                        className={`service-three-single ${i % 2 === 1 ? "ms-auto" : ""}`}
                        data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                        data-aos-duration="2000"
                        data-aos-delay={200 + i * 100}
                      >
                        <div className="service-three-item d-flex justify-content-between align-items-center">
                          <div className="service-three-content d-flex tw-gap-14">
                            <div>
                              <span className="service-three-number text-white tw-text-xl d-inline-flex align-items-center tw-gap-3 lh-1 tw-mt-5 tw-transition-3">
                                {s.number}
                                <img className="tw-transition-3" src="/assets/images/icons/service-three-arrow.svg" alt="arrow" />
                              </span>
                            </div>
                            <div>
                              <div>
                                <h2 className="service-three-title tw-text-15 text-white tw-mb-4">
                                  <a href="#projects">{s.title}</a>
                                </h2>
                              </div>
                              <div className="portfolio-list portfolio-two-list">
                                <ul className="d-flex tw-gap-205 flex-wrap">
                                  {s.tags.map((tag) => (
                                    <li key={tag}>
                                      <a
                                        className="text-uppercase text-white tw-text-sm fw-medium position-relative z-1 hover-bg-main-two-600 hover-border-main-two-600 hover-text-heading tw-transition-3"
                                        href="#skills"
                                      >
                                        {tag}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="service-three-thumb">
                            <a href="#projects">
                              <img src={`/assets/images/thumbs/${s.thumb}`} alt="thumb" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== Projects ==================== */}
          <section className="portfolio-three-area py-120 position-relative z-1" id="projects">
            <div className="portfolio-three-shape position-absolute top-0 z-n1">
              <h3 className="portfolio-three-shape-title">works</h3>
            </div>
            <div className="container tw-container-1800-px">
              <div className="row">
                <div className="col-xl-12">
                  <div className="portfolio-three-wrapper d-flex justify-content-between flex-wrap align-items-start position-relative z-1">
                    {projects.map((p) => {
                      const primaryLink = p.liveUrl || p.githubUrl || "#contact";
                      const isExternal = primaryLink.startsWith("http");
                      return (
                      <div key={p.id} className="portfolio-three-item tw-rounded-lg tw-mb-705 portfolio-wrapper">
                        <div className="portfolio-three-wrap d-flex justify-content-between flex-wrap row-gap-2">
                          <div className="tw-mb-6">
                            <div>
                              <h2 className="tw-text-605 fw-medium tw-mb-4">
                                <a className="hover-text-main-two-600" href={primaryLink} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
                                  {p.title}
                                </a>
                              </h2>
                            </div>
                            <div className="portfolio-three-list portfolio-list">
                              <ul className="d-flex tw-gap-205 flex-wrap">
                                {p.tags.map((tag) => (
                                  <li key={tag}>
                                    <a
                                      className="text-uppercase text-heading fw-medium position-relative z-1 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white tw-transition-3"
                                      href={primaryLink}
                                      target={isExternal ? "_blank" : undefined}
                                      rel={isExternal ? "noreferrer" : undefined}
                                    >
                                      {tag}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="portfolio-three-button">
                              <a
                                className="portfolio-three-btn tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center text-heading rounded-circle hover-bg-main-two-600 hover-text-white"
                                href={primaryLink}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noreferrer" : undefined}
                              >
                                <i className="ph ph-arrow-up-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="portfolio-thumb not-hide-cursor fw-bold mb-0 tw-rounded-lg" data-cursor="View">
                          <a className="d-block cursor-hide tw-rounded-lg" href={primaryLink} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
                            <img className="w-100 tw-rounded-lg" src={`/assets/images/thumbs/${p.thumb}`} alt="thumb" />
                          </a>
                        </div>
                      </div>
                      );
                    })}
                    <div className="about-three-counter portfolio-three-counter d-inline-block position-absolute bottom-0 start-0">
                      <div className="tw-hover-btn-wrapper d-inline-block">
                        <a
                          className="tw-btn-circle tw-hover-btn-item tw-hover-btn tw-w-160-px tw-h-160-px lh-1 d-inline-flex justify-content-center align-items-center rounded-circle position-relative overflow-hidden"
                          href="https://github.com/Fawas-Mohamed"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="d-flex flex-column justify-content-center">
                            <span className="text-heading fw-bold tw-transition-3 tw-text-2xl fw-semibold">
                              See More <br />
                              on GitHub <i className="ph ph-arrow-up-right"></i>
                            </span>
                          </span>
                          <i className="tw-btn-circle-dot bg-main-two-600"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== YouTube / Content Creation ==================== */}
          <YouTubeSection />

          {/* ==================== Testimonials (references) ==================== */}
          <section className="testimonial-three-area pt-120 tw-pb-22" id="references">
            <div className="container tw-container-1800-px">
              <div className="row justify-content-center tw-mb-21">
                <div className="col-xl-10">
                  <div className="text-center">
                    <h2 className="testimonial-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">
                      What people I&apos;ve worked with and studied under have said about the work.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="testimonial-three-slider position-relative z-1">
                    <div className="testimonial-three-active swiper-container">
                      <div className="swiper-wrapper">
                        {testimonials.map((t, i) => (
                          <div
                            key={t.id}
                            className="testimonial-three-wrapper d-flex align-items-center tw-gap-9 tw-rounded-lg tw-mb-705 swiper-slide"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={200 + i * 100}
                          >
                            <div className="testimonial-three-thumb position-relative z-1">
                              <img className="w-100 h-100 tw-rounded-lg" src={`/assets/images/thumbs/${t.thumb}`} alt={t.name} />
                            </div>
                            <div className="testimonial-three-content w-100">
                              <div className="d-flex align-items-center justify-content-between tw-mb-16">
                                <div>
                                  <span>
                                    <img src="/assets/images/icons/testimonial-three-icon.svg" alt="icon" />
                                  </span>
                                </div>
                              </div>
                              <div className="tw-mb-15">
                                <p className="testimonial-three-paragraph text-heading tw-text-2xl fw-semibold">{t.quote}</p>
                              </div>
                              <div>
                                <h2 className="tw-text-2xl fw-medium">{t.name}</h2>
                                <p className="tw-text-lg">{t.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== Certificates ==================== */}
          <style>{`
            /* Card sizing and layout */
            .testimonial-three-wrapper { display: inline-block; width: 260px; vertical-align: top; }
            .cert-card { width: 100%; box-sizing: border-box; }

            /* Thumbnail: fixed height and cover to keep uniform crops */
            .cert-thumb { width: 100%; height: 160px; overflow: hidden; border-radius: 8px; }
            .cert-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .25s ease; }
            .testimonial-three-wrapper:hover .cert-thumb img { transform: scale(1.03); }

            /* View button overlay */
            .portfolio-three-button { opacity: 0; transform: translateY(6px); transition: all .2s ease; }
            .testimonial-three-wrapper:hover .portfolio-three-button { opacity: 1; transform: translateY(0); }

            /* Info area below image */
            .cert-info { padding: 12px 10px; }
            .cert-info .testimonial-three-paragraph { font-size: 16px; margin: 0 0 6px; }
            .cert-info b { font-size: 14px; }

            /* Responsive adjustments */
            @media (max-width: 768px) {
              .testimonial-three-wrapper { width: 48%; }
              .cert-thumb { height: 140px; }
            }
            @media (max-width: 480px) {
              .testimonial-three-wrapper { width: 100%; }
            }
          `}</style>
          <section className="certificate-area py-60 position-relative z-1" id="certificates">
            <div className="container tw-container-1800-px">
              <div className="row justify-content-center tw-mb-21">
                <div className="col-xl-10 text-center">
                  <h2 className="testimonial-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">Certifications</h2>
                  <p className="tw-text-lg">Selected professional certificates and completed courses.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="testimonial-three-slider position-relative z-1">
                    <div className="testimonial-three-active swiper-container">
                      <div className="swiper-wrapper">
                        {certificates.map((c, i) => (
                          <div
                            key={c.id}
                            className="testimonial-three-wrapper tw-rounded-lg tw-mb-705 swiper-slide"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={200 + i * 100}
                          >
                            <div className="cert-card tw-rounded-lg position-relative">
                              <div className="cert-thumb position-relative">
                                <a className="d-block cursor-hide tw-rounded-lg" href={`/assets/images/certificates/${c.thumb}`} target="_blank" rel="noreferrer">
                                  <img className="w-100 h-100 tw-rounded-lg" src={`/assets/images/certificates/${c.thumb}`} alt={c.title} />
                                </a>
                                <div className="portfolio-three-button" style={{ position: "absolute", top: 12, right: 12 }}>
                                  <a
                                    className="portfolio-three-btn tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center text-heading rounded-circle hover-bg-main-two-600 hover-text-white"
                                    href={`/assets/images/certificates/${c.thumb}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ph ph-arrow-up-right"></i>
                                  </a>
                                </div>
                              </div>

                              <div className="cert-info text-center tw-pt-4 tw-pb-4">
                                <p className="testimonial-three-paragraph text-heading tw-text-2xl fw-semibold mb-2">{c.title}</p>
                                <div className="tw-text-lg">
                                  <b>{(c.skills || []).slice(0, 3).join(" • ")}</b>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== Core Technologies ==================== */}
          <section className="brand-three-area brand-two-area pb-120">
            <div className="container tw-container-1800-px">
              <div className="row">
                <div className="col-xl-12">
                  <div className="text-center tw-mb-15">
                    <h2 className="brand-three-title tw-text-xl tw-char-animation">Core Technologies I Build With</h2>
                  </div>
                </div>
              </div>
              <div className="row gx-2 justify-content-center">
                {skills.map((skill, i) => (
                  <div className="col-xl-2 col-lg-4 col-md-4 col-6" key={skill.id}>
                    <div
                      className="brand-item brand-three-item position-relative z-1 tw-mb-4 text-center"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={200 + (i % 6) * 100}
                    >
                      <span className="brand-active-media tw-text-xl fw-semibold text-heading">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ==================== Footer / Contact ==================== */}
          <section className="footer-three-area pt-120 tw-pb-10 position-relative z-1" id="contact">
            <div className="container tw-container-1800-px">
              <div className="row justify-content-between pb-120">
                <div className="col-xl-5 col-lg-6">
                  <div className="footer-three-top-left tw-me-25" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="tw-mb-9">
                      <h2 className="tw-text-15 text-white tw-char-animation">Let&apos;s build something real</h2>
                    </div>
                    <div className="d-inline-flex align-items-center tw-gap-6 tw-mb-10 flex-wrap">
                      <a className="tw-text-2xl fw-medium text-main-600 hover-underline hover-text-white" href="mailto:mohammedfawasfareed@gmail.com">
                        mohammedfawasfareed@gmail.com
                      </a>
                      <span className="tw-text-2xl fw-medium text-main-600">//</span>
                      <a className="tw-text-2xl fw-medium text-main-600 hover-underline hover-text-white" href="tel:+94753837488">
                        +94 75 383 7488
                      </a>
                    </div>
                    <div className="footer-three-top-info tw-p-705 tw-rounded-lg d-flex tw-gap-6">
                      <div className="footer-three-top-thumb tw-w-160-px">
                        <img className="tw-rounded-lg w-100" src="/assets/images/thumbs/fawas_image.png" alt="thumb" />
                      </div>
                      <div className="footer-three-top-content d-flex justify-content-between flex-column">
                        <div>
                          <h3 className="tw-text-xl text-white tw-mb-2">Mohamed Fawas</h3>
                          <p className="text-white">Full-Stack Developer &amp; Systems Builder</p>
                        </div>
                        <div className="footer-three-social">
                          <ul className="d-flex align-items-center tw-gap-1">
                            <li>
                              <a
                                className="tw-w-11 tw-h-101 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-xl text-heading hover-bg-main-600 hover-text-heading"
                                href="https://github.com/Fawas-Mohamed"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ph ph-github-logo"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="tw-w-11 tw-h-101 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-xl text-heading hover-bg-main-600 hover-text-heading"
                                href="https://www.linkedin.com/in/mohamedfawas8/"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ph ph-linkedin-logo"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="tw-w-11 tw-h-101 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-xl text-heading hover-bg-main-600 hover-text-heading"
                                href="https://www.youtube.com/@DevSystemLogs"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ph ph-youtube-logo"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-three-border tw-px-18 tw-mb-10">
              <div className="container-fluid gx-0">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="footer-three-middile d-flex align-items-center justify-content-between">
                      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <h4 className="tw-text-2xl text-white tw-mb-2">Quick Links</h4>
                        <ul className="d-flex tw-gap-2 flex-wrap">
                          <li>
                            <a className="tw-text-lg text-white" href="#home">
                              Home,
                            </a>
                          </li>
                          <li>
                            <a className="tw-text-lg text-white" href="#about">
                              About,
                            </a>
                          </li>
                          <li>
                            <a className="tw-text-lg text-white" href="#projects">
                              Projects,
                            </a>
                          </li>
                          <li>
                            <a className="tw-text-lg text-white" href="#skills">
                              Skills,
                            </a>
                          </li>
                          <li>
                            <a className="tw-text-lg text-white" href="#contact">
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        <a
                          className="footer-three-back-to-top tw-w-170 tw-h-170 lh-1 d-inline-flex justify-content-center align-items-center bg-main-two-600 text-white tw-text-3xl rounded-circle"
                          href="#home"
                        >
                          <i className="ph ph-arrow-up"></i>
                        </a>
                      </div>
                      <div className="text-lg-end" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                        <h4 className="tw-text-2xl text-white tw-mb-2">Mohamed Fawas</h4>
                        <p className="tw-text-lg text-white">© 2026 Mohamed Fawas. All rights reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container tw-container-1800-px">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="footer-three-bottom text-center">
                      <h5 className="footer-three-bottom-title text-white text-center">Fawas</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img className="position-absolute top-0 start-0 z-n1" src="/assets/images/shapes/footer-three-bg-shape.png" alt="shape" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
