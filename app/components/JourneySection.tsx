"use client";

import journey from "../../lib/journey";

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section">
      <div className="journey-container">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="journey-heading">
          {/* Ghost background text */}
          <div className="journey-bg-text" aria-hidden="true">
            JOURNEY
          </div>

          {/* Small heading */}
          <div className="journey-kicker">
            <span className="kicker-line" />
            <span>MY JOURNEY</span>
            <span className="kicker-line" />
          </div>

          {/* Main heading */}
          <h2 className="journey-title">MY JOURNEY</h2>

          <p className="journey-description">
            A compact path showing growth and focus.
          </p>

          {/* Decorative separator */}
          <div className="journey-divider">
            <span />
            <b />
            <span />
          </div>
        </div>

        {/* =========================================================
            TIMELINE
        ========================================================= */}
        <div className="journey-timeline">
          {/* SVG ROAD */}
          <svg
            className="journey-road"
            viewBox="0 0 1672 420"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="roadGlow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="goldGlow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="4" result="goldBlur" />
                <feMerge>
                  <feMergeNode in="goldBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer road glow */}
         

            {/* Main road */}
            <path
  className="road-main"
  d="
    M 103 145

    C 160 145, 209 315, 266 315
    C 323 315, 372 145, 429 145
    C 486 145, 535 315, 592 315
    C 649 315, 698 145, 755 145
    C 812 145, 861 315, 918 315
    C 975 315, 1024 145, 1081 145
    C 1138 145, 1187 315, 1244 315
    C 1301 315, 1350 145, 1407 145
    C 1464 145, 1513 315, 1570 315

    C 1610 315, 1620 235, 1650 205
  "
  fill="none"
  strokeWidth="42"
  strokeLinecap="round"
  strokeLinejoin="round"
/>

            {/* Gold dashed center line */}
            <path
  className="road-dash"
  d="
    M 103 145

    C 160 145, 209 315, 266 315
    C 323 315, 372 145, 429 145
    C 486 145, 535 315, 592 315
    C 649 315, 698 145, 755 145
    C 812 145, 861 315, 918 315
    C 975 315, 1024 145, 1081 145
    C 1138 145, 1187 315, 1244 315
    C 1301 315, 1350 145, 1407 145
    C 1464 145, 1513 315, 1570 315

    C 1610 315, 1620 235, 1650 205
  "
  fill="none"
  strokeLinecap="round"
/>

            {/* Arrow at the end */}
            <polygon
  className="road-arrow"
  points="1648,200 1630,210 1655,220"
  transform="rotate(-5 1644 217)"
/>
{/*<polygon
  className="road-arrow"
  points="1660,205 1640,196 1645,215"
  transform="rotate(-41 1660 205)"
/>*/}
          </svg>

          {/* =======================================================
              MILESTONES
          ======================================================= */}
          <div className="milestones-grid">
            {journey.map((item, index) => {
              const isTop = index % 2 === 0;

              return (
                <div
                  className={`milestone ${isTop ? "is-top" : "is-bottom"}`}
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={100 + index * 70}
                >
                  {/* TOP CONTENT */}
                  {isTop && (
                    <div className="milestone-content top-content">
                      <div className="milestone-icon">
                        <i className={`ph ${item.icon}`} />
                      </div>

                      <div className="milestone-title">{item.title}</div>

                      <div className="milestone-subtitle">{item.subtitle}</div>
                    </div>
                  )}

                  {/* NODE */}
                  <div className="milestone-node-wrap">
              

                    <div className="milestone-node">
                      <span>{item.index}</span>
                    </div>
                  </div>

                  {/* BOTTOM CONTENT */}
                  {!isTop && (
                    <div className="milestone-content bottom-content">
                      <div className="milestone-icon">
                        <i className={`ph ${item.icon}`} />
                      </div>

                      <div className="milestone-title">{item.title}</div>

                      <div className="milestone-subtitle">{item.subtitle}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

     <style jsx>{`
  /* =========================================================
     JOURNEY SECTION
  ========================================================= */

  .journey-section {
    position: relative;
    width: 100%;
    overflow: hidden;

    background:
      radial-gradient(
        ellipse at center 45%,
        rgba(255, 255, 255, 0.025) 0%,
        rgba(255, 255, 255, 0) 58%
      ),
      #050505;

    padding: 58px 0 90px;

    color: #fff;
  }


  .journey-container {
    width: min(100%, 1672px);

    margin: 0 auto;

    padding: 0 28px;

    box-sizing: border-box;
  }


  /* =========================================================
     HEADER
  ========================================================= */

  .journey-heading {
    position: relative;

    z-index: 5;

    min-height: 275px;

    text-align: center;
  }


  .journey-bg-text {
    position: absolute;

    z-index: -1;

    top: -30px;
    left: 50%;

    width: 100%;

    transform: translateX(-50%);

    white-space: nowrap;

    color: transparent;

    -webkit-text-stroke:
      1px rgba(255, 255, 255, 0.045);

    font-family:
      "Anton",
      Impact,
      Haettenschweiler,
      "Arial Narrow Bold",
      sans-serif;

    font-size:
      clamp(100px, 13vw, 210px);

    font-weight: 900;

    line-height: 1;

    letter-spacing: 3px;

    opacity: 0.8;

    pointer-events: none;
    user-select: none;
  }


  .journey-kicker {
    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;
    justify-content: center;

    gap: 17px;

    margin-bottom: 20px;

    color: rgba(255, 255, 255, 0.65);

    font-size: 13px;

    font-weight: 700;

    letter-spacing: 0.2em;

    line-height: 1;

    text-transform: uppercase;
  }


  .kicker-line {
    display: block;

    width: 42px;
    height: 1px;

    background:
      rgba(255, 255, 255, 0.4);
  }


  .journey-title {
    position: relative;

    z-index: 2;

    margin: 0;

    color: #fff;

    font-family:
      "Anton",
      Impact,
      Haettenschweiler,
      "Arial Narrow Bold",
      sans-serif;

    font-size:
      clamp(52px, 5.3vw, 92px);

    font-weight: 900;

    line-height: 0.95;

    letter-spacing: 0.01em;

    text-transform: uppercase;

    text-shadow:
      0 2px 0 rgba(255, 255, 255, 0.08),
      0 10px 35px rgba(0, 0, 0, 0.6);
  }


  .journey-description {
    position: relative;

    z-index: 2;

    margin: 17px 0 0;

    color:
      rgba(255, 255, 255, 0.58);

    font-size: 18px;

    line-height: 1.4;

    font-weight: 400;

    letter-spacing: -0.01em;
  }


  .journey-divider {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 14px;

    margin-top: 26px;
  }


  .journey-divider span {
    width: 38px;
    height: 1px;

    background:
      rgba(255, 255, 255, 0.35);
  }


  .journey-divider b {
    display: block;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: #fff;

    box-shadow:
      0 0 10px rgba(255, 255, 255, 0.4);
  }


  /* =========================================================
     TIMELINE
  ========================================================= */

  .journey-timeline {
    position: relative;

    height: 560px;

    margin-top: 0;
  }


  .journey-road {
    position: absolute;

    top: 50px;
    left: 0;

    width: 100%;
    height: 420px;

    overflow: visible;

    z-index: 1;

    pointer-events: none;
  }


  /* =========================================================
     ROAD — MONOCHROME GRAPHITE STYLE
  ========================================================= */

  .road-glow {
    opacity: 0.38;

    stroke: #242424;

    filter:
      blur(8px);

    transition:
      opacity 0.5s ease;
  }


  .road-main {
    opacity: 1;

    stroke: #fff;

    transition:
      opacity 0.5s ease;
  }


  /*
   * Very subtle center line.
   * No orange.
   * No green.
   */

  .road-dash {
    opacity: 0;

    stroke:
      #111;

    stroke-width: 2.2;

    stroke-dasharray: 8 11;

    stroke-dashoffset: 3000;

    filter:
      drop-shadow(
        0 0 4px rgba(255, 255, 255, 0.08)
      );

    transition:
      stroke-dashoffset 2.6s
      cubic-bezier(0.22, 1, 0.36, 1),

      opacity 0.6s ease;
  }


  /*
   * Activated by AOS if the timeline
   * receives the aos-animate class.
   */

  .journey-timeline.aos-animate
    .road-dash {
    opacity: 1;

    stroke-dashoffset: 0;
  }


  /*
   * Fallback animation.
   * Keeps the road elegant even if AOS
   * does not attach to the timeline itself.
   */

  .road-dash {
    animation:
      journeyRoadDraw 2.8s
      cubic-bezier(0.22, 1, 0.36, 1)
      0.25s forwards;
  }


  @keyframes journeyRoadDraw {
    from {
      opacity: 0;

      stroke-dashoffset: 3000;
    }

    to {
      opacity: 1;

      stroke-dashoffset: 0;
    }
  }


  /* =========================================================
     ROAD ARROW
  ========================================================= */

  .road-arrow {
    fill: #ffffff;

    opacity: 0;

    filter:
      drop-shadow(
        0 0 7px rgba(255, 255, 255, 0.28)
      );

    transform-origin:
      1660px 215px;

    animation:
      journeyArrowReveal
      0.6s ease
      2.45s forwards;
  }


  @keyframes journeyArrowReveal {
    from {
      opacity: 0;

      transform:
        scale(0.7)
        translateX(-8px);
    }

    to {
      opacity: 0.9;

      transform:
        scale(1)
        translateX(0);
    }
  }


  /* =========================================================
     10 COLUMN GRID
  ========================================================= */

  .milestones-grid {
    position: absolute;

    inset: 0;

    display: grid;

    grid-template-columns:
      repeat(10, minmax(0, 1fr));

    align-items: center;

    padding:
      0 22px;

    box-sizing: border-box;

    z-index: 3;
  }


  .milestone {
    position: relative;

    height: 100%;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    text-align: center;

    transition:
      opacity 0.35s ease,
      transform 0.35s ease;
  }


  /* =========================================================
     TOP / BOTTOM ALIGNMENT
  ========================================================= */

  .milestone.is-top {
    transform:
      translateY(-82px);
  }


  .milestone.is-bottom {
    transform:
      translateY(82px);
  }


  /*
   * Don't move the whole milestone on hover.
   * This keeps the road/node alignment stable.
   */

  .milestone:hover {
    z-index: 20;
  }


  /* =========================================================
     CONTENT
  ========================================================= */

  .milestone-content {
    position: absolute;

    left: 50%;

    width: 170px;

    display: flex;

    flex-direction: column;

    align-items: center;

    transform:
      translateX(-50%);

    box-sizing: border-box;
  }


  .top-content {
    bottom:
      calc(50% + 50px);
  }


  .bottom-content {
    top:
      calc(50% + 50px);
  }


  /* =========================================================
     ICON
  ========================================================= */

  .milestone-icon {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 100%;

    height: 30px;

    margin-bottom: 8px;

    color:
      rgba(255, 255, 255, 0.65);

    font-size: 27px;

    filter:
      drop-shadow(
        0 0 6px rgba(255, 255, 255, 0.08)
      );

    transition:
      color 0.3s ease,
      transform 0.3s ease,
      filter 0.3s ease;
  }


  .milestone:hover .milestone-icon {
    color: #ffffff;

    transform:
      translateY(-3px);

    filter:
      drop-shadow(
        0 0 9px rgba(255, 255, 255, 0.2)
      );
  }


  /* =========================================================
     TITLE
  ========================================================= */

  .milestone-title {
    width: 100%;

    color: #ffffff;

    font-family:
      "Anton",
      "Arial Narrow",
      "Roboto Condensed",
      Arial,
      sans-serif;

    font-size: 19px;

    font-weight: 800;

    line-height: 1.08;

    letter-spacing: -0.3px;

    text-transform: uppercase;
  }


  /* =========================================================
     SUBTITLE
  ========================================================= */

  .milestone-subtitle {
    width: 100%;

    margin-top: 7px;

    color:
      rgba(255, 255, 255, 0.52);

    font-size: 14px;

    line-height: 1.45;

    font-weight: 400;
  }


  /* =========================================================
     NODE WRAPPER
  ========================================================= */

  .milestone-node-wrap {
    position: absolute;

    top: 50%;
    left: 50%;

    width: 78px;
    height: 78px;

    display: flex;

    align-items: center;
    justify-content: center;

    transform:
      translate(-50%, -50%);
  }


  /* =========================================================
     NODE
  ========================================================= */

  .milestone-node {
    position: relative;

    z-index: 4;

    width: 70px;
    height: 70px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background:
      radial-gradient(
        circle at 50% 40%,
        #181818 0%,
        #090909 60%,
        #030303 100%
      );

    border:
      1px solid
      rgba(255, 255, 255, 0.65);

    box-shadow:
      0 0 0 1px
      rgba(255, 255, 255, 0.035),

      0 0 18px
      rgba(255, 255, 255, 0.045),

      inset 0 0 18px
      rgba(0, 0, 0, 0.85);

    transition:
      transform 0.35s
      cubic-bezier(0.22, 1, 0.36, 1),

      border-color 0.35s ease,

      box-shadow 0.35s ease,

      background 0.35s ease;
  }


  /* =========================================================
     NODE INNER RING
  ========================================================= */

  .milestone-node::before {
    content: "";

    position: absolute;

    inset: 5px;

    border-radius: 50%;

    border:
      1px solid
      rgba(255, 255, 255, 0.12);

    transition:
      border-color 0.35s ease;
  }


  /* =========================================================
     NODE OUTER DASHED RING
  ========================================================= */

  .milestone-node::after {
    content: "";

    position: absolute;

    inset: -7px;

    border-radius: 50%;

    border:
      1px dashed
      rgba(255, 255, 255, 0.28);

    transform:
      rotate(12deg);

    opacity: 0.8;

    transition:
      border-color 0.35s ease,
      transform 0.6s ease,
      opacity 0.35s ease;
  }


  /* =========================================================
     NODE NUMBER
  ========================================================= */

  .milestone-node span {
    position: relative;

    z-index: 5;

    color: #ffffff;

    font-family:
      "Arial Narrow",
      Arial,
      sans-serif;

    font-size: 23px;

    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.02em;

    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }


  /* =========================================================
     HOVER — KIAKI ORANGE ONLY HERE
  ========================================================= */

  .milestone:hover .milestone-node {
    transform:
      scale(1.08);

    border-color:
      #F2B759;

    background:
      radial-gradient(
        circle at 50% 40%,
        #191919 0%,
        #080808 62%,
        #020202 100%
      );

    box-shadow:
      0 0 0 1px
      rgba(242, 183, 89, 0.16),

      0 0 26px
      rgba(242, 183, 89, 0.16),

      inset 0 0 18px
      rgba(0, 0, 0, 0.85);
  }


  .milestone:hover .milestone-node span {
    color:
      #F2B759;

    transform:
      scale(1.05);
  }


  .milestone:hover .milestone-node::before {
    border-color:
      rgba(242, 183, 89, 0.24);
  }


  .milestone:hover .milestone-node::after {
    border-color:
      rgba(242, 183, 89, 0.65);

    transform:
      rotate(32deg);

    opacity: 1;
     }


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  .milestone[data-aos] {
    opacity: 0;

    transition:
      opacity 0.8s ease,
      transform 0.8s
      cubic-bezier(0.22, 1, 0.36, 1);
  }


  .milestone[data-aos].aos-animate {
    opacity: 1;
  }


  .milestone.is-top[data-aos].aos-animate {
    transform:
      translateY(-82px);
  }


  .milestone.is-bottom[data-aos].aos-animate {
    transform:
      translateY(82px);
  }


  /* =========================================================
     LARGE TABLET
  ========================================================= */

  @media (max-width: 1400px) {

    .journey-container {
      padding:
        0 18px;
    }


    .milestones-grid {
      padding:
        0 10px;
    }


    .milestone-content {
      width: 145px;
    }


    .milestone-title {
      font-size: 17px;
    }


    .milestone-subtitle {
      font-size: 13px;

      max-width: 145px;
    }
  }


  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1100px) {

    .journey-section {
      padding-top: 55px;
    }


    .journey-heading {
      min-height: 240px;
    }


    .journey-description {
      font-size: 17px;
    }


    .journey-timeline {
      height: 520px;
    }


    .journey-road {
      top: 60px;
    }


    .milestone.is-top {
      transform:
        translateY(-70px);
    }


    .milestone.is-bottom {
      transform:
        translateY(70px);
    }


    .milestone.is-top[data-aos].aos-animate {
      transform:
        translateY(-70px);
    }


    .milestone.is-bottom[data-aos].aos-animate {
      transform:
        translateY(70px);
    }


    .milestone-content {
      width: 120px;
    }


    .milestone-node-wrap {
      width: 70px;
      height: 70px;
    }


    .milestone-node {
      width: 62px;
      height: 62px;
    }


    .milestone-node span {
      font-size: 20px;
    }


    .milestone-title {
      font-size: 14px;
    }


    .milestone-subtitle {
      font-size: 11px;

      line-height: 1.35;
    }


    .milestone-icon {
      font-size: 22px;
    }


    .milestone.is-top
      .milestone-node-wrap::before {
      top: 62px;
    }


    .milestone.is-bottom
      .milestone-node-wrap::before {
      bottom: 62px;
    }


    .milestone.is-top
      .connector-dot {
      top: 88px;
    }


    .milestone.is-bottom
      .connector-dot {
      bottom: 88px;
    }
  }


  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {

    .journey-section {
      padding:
        70px 0 80px;
    }


    .journey-container {
      padding:
        0 18px;
    }


    .journey-heading {
      min-height: auto;

      padding-bottom: 55px;
    }


    .journey-bg-text {
      top: 12px;

      font-size: 72px;
    }


    .journey-kicker {
      gap: 10px;

      margin-bottom: 16px;

      font-size: 11px;
    }


    .kicker-line {
      width: 25px;
    }


    .journey-title {
      font-size: 48px;
    }


    .journey-description {
      margin-top: 14px;

      font-size: 14px;
    }


    .journey-divider {
      margin-top: 20px;
    }


    /* ---------------------------------------------------------
       MOBILE TIMELINE
    --------------------------------------------------------- */

    .journey-timeline {
      height: auto;

      margin-top: 0;
    }


    .journey-road {
      display: none;
    }


    .milestones-grid {
      position: relative;

      display: flex;

      flex-direction: column;

      gap: 18px;

      padding: 0;
    }


    .milestone,
    .milestone.is-top,
    .milestone.is-bottom {

      position: relative;

      min-height: 112px;

      height: auto;

      display: grid;

      grid-template-columns: 78px minmax(0, 1fr);

      align-items: center;

      text-align: left;

      transform: none !important;

      opacity: 0;
    }


    .milestone[data-aos].aos-animate {
      transform: none !important;

      opacity: 1;
    }


    .milestone-content {
      position: relative;

      left: auto;
      top: auto;
      bottom: auto;

      width: auto;

      display: flex;

      align-items: flex-start;

      grid-column: 2;

      grid-row: 1;

      transform: none;

      text-align: left;
    }


    .milestone-node-wrap {
      position: relative;

      left: auto;
      top: auto;

      width: 78px;
      height: 78px;

      grid-column: 1;

      grid-row: 1;

      transform: none;
    }


    .milestone-node {
      width: 62px;
      height: 62px;
    }


    .milestone-node span {
      font-size: 20px;
    }


    .milestone-title {
      width: 100%;

      font-size: 17px;

      line-height: 1.1;
    }


    .milestone-subtitle {
      width: 100%;

      max-width: none;

      font-size: 13px;

      line-height: 1.45;
    }


    .milestone-icon {
      height: 26px;

      margin-bottom: 5px;

      font-size: 24px;
    }


    .milestone-node-wrap::before,
    .connector-dot {
      display: none;
    }


    /* ---------------------------------------------------------
       MOBILE HOVER
    --------------------------------------------------------- */

    .milestone:hover .milestone-node {
      transform:
        scale(1.05);
    }
  }


  /* =========================================================
     VERY SMALL MOBILE
  ========================================================= */

  @media (max-width: 420px) {

    .journey-title {
      font-size: 42px;
    }


    .journey-bg-text {
      font-size: 62px;
    }


    .milestones-grid {
      gap: 14px;
    }


    .milestone,
    .milestone.is-top,
    .milestone.is-bottom {
      grid-template-columns:
        70px minmax(0, 1fr);

      min-height: 105px;
    }


    .milestone-node-wrap {
      width: 70px;
      height: 70px;
    }


    .milestone-node {
      width: 58px;
      height: 58px;
    }


    .milestone-node span {
      font-size: 18px;
    }


    .milestone-title {
      font-size: 16px;
    }


    .milestone-subtitle {
      font-size: 12px;
    }
  }


  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {

    .road-dash {
      opacity: 1 !important;

      stroke-dashoffset: 0 !important;

      animation: none !important;

      transition: none !important;
    }


    .road-arrow {
      opacity: 1 !important;

      animation: none !important;

      transform: none !important;
    }


    .milestone,
    .milestone[data-aos],
    .milestone[data-aos].aos-animate,
    .milestone.is-top[data-aos].aos-animate,
    .milestone.is-bottom[data-aos].aos-animate {
      transition: none !important;
    }


    .milestone-node,
    .milestone-icon,
    .milestone-node span,
    .milestone-node::before,
    .milestone-node::after,
  }
`}</style>
    </section>
  );
}
