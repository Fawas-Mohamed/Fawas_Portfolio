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
          <h2 className="journey-title">
            MY JOURNEY
          </h2>

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
                <feGaussianBlur
                  stdDeviation="4"
                  result="goldBlur"
                />
                <feMerge>
                  <feMergeNode in="goldBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer road glow */}
            <path
              className="road-glow"
              d="
                M 5 330
                C 90 330, 105 245, 150 205
                C 195 165, 235 165, 270 205
                C 300 240, 295 330, 350 330
                C 405 330, 400 245, 445 205
                C 490 165, 530 165, 565 205
                C 595 240, 590 330, 645 330
                C 700 330, 695 245, 740 205
                C 785 165, 825 165, 860 205
                C 890 240, 885 330, 940 330
                C 995 330, 990 245, 1035 205
                C 1080 165, 1120 165, 1155 205
                C 1185 240, 1180 330, 1235 330
                C 1290 330, 1285 245, 1330 205
                C 1375 165, 1415 165, 1450 205
                C 1480 240, 1475 330, 1530 330
                C 1580 330, 1605 275, 1660 205
              "
              fill="none"
              stroke="#0d332c"
              strokeWidth="58"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadGlow)"
            />

            {/* Main road */}
            <path
              className="road-main"
              d="
                M 5 330
                C 90 330, 105 245, 150 205
                C 195 165, 235 165, 270 205
                C 300 240, 295 330, 350 330
                C 405 330, 400 245, 445 205
                C 490 165, 530 165, 565 205
                C 595 240, 590 330, 645 330
                C 700 330, 695 245, 740 205
                C 785 165, 825 165, 860 205
                C 890 240, 885 330, 940 330
                C 995 330, 990 245, 1035 205
                C 1080 165, 1120 165, 1155 205
                C 1185 240, 1180 330, 1235 330
                C 1290 330, 1285 245, 1330 205
                C 1375 165, 1415 165, 1450 205
                C 1480 240, 1475 330, 1530 330
                C 1580 330, 1605 275, 1660 205
              "
              fill="none"
              stroke="#0b211d"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Gold dashed center line */}
            <path
              className="road-dash"
              d="
                M 5 330
                C 90 330, 105 245, 150 205
                C 195 165, 235 165, 270 205
                C 300 240, 295 330, 350 330
                C 405 330, 400 245, 445 205
                C 490 165, 530 165, 565 205
                C 595 240, 590 330, 645 330
                C 700 330, 695 245, 740 205
                C 785 165, 825 165, 860 205
                C 890 240, 885 330, 940 330
                C 995 330, 990 245, 1035 205
                C 1080 165, 1120 165, 1155 205
                C 1185 240, 1180 330, 1235 330
                C 1290 330, 1285 245, 1330 205
                C 1375 165, 1415 165, 1450 205
                C 1480 240, 1475 330, 1530 330
                C 1580 330, 1605 275, 1660 205
              "
              fill="none"
              stroke="#f2b759"
              strokeWidth="2.5"
              strokeDasharray="9 9"
              strokeLinecap="round"
              filter="url(#goldGlow)"
            />

            {/* Arrow at the end */}
            <polygon
              className="road-arrow"
              points="1658,204 1638,225 1664,230"
            />
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

                      <div className="milestone-title">
                        {item.title}
                      </div>

                      <div className="milestone-subtitle">
                        {item.subtitle}
                      </div>
                    </div>
                  )}

                  {/* NODE */}
                  <div className="milestone-node-wrap">
                    <span className="connector-dot" />

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

                      <div className="milestone-title">
                        {item.title}
                      </div>

                      <div className="milestone-subtitle">
                        {item.subtitle}
                      </div>
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
           SECTION
        ========================================================= */

        .journey-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at center 45%,
              rgba(16, 42, 37, 0.18) 0%,
              rgba(5, 5, 5, 0) 58%
            ),
            #050606;

          padding: 58px 0 90px;
          color: #fff;
        }

        .journey-container {
          width: min(100%, 1672px);
          margin: 0 auto;
          padding: 0 28px;
        }

        /* =========================================================
           HEADER
        ========================================================= */

        .journey-heading {
          position: relative;
          z-index: 5;
          text-align: center;
          min-height: 275px;
        }

        .journey-bg-text {
          position: absolute;
          z-index: -1;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);

          width: 100%;
          white-space: nowrap;

          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.045);

          font-family: Impact, Haettenschweiler,
            "Arial Narrow Bold", sans-serif;

          font-size: clamp(100px, 13vw, 210px);
          font-weight: 900;
          line-height: 1;

          letter-spacing: 3px;
          pointer-events: none;
          user-select: none;
        }

        .journey-kicker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;

          position: relative;
          z-index: 2;

          color: #f2b759;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 2px;
          line-height: 1;

          margin-bottom: 20px;
        }

        .kicker-line {
          display: block;
          width: 42px;
          height: 2px;
          background: #f2b759;
        }

        .journey-title {
          position: relative;
          z-index: 2;

          margin: 0;

          color: #fff;

          font-family: Impact, Haettenschweiler,
            "Arial Narrow Bold", sans-serif;

          font-size: clamp(52px, 5.3vw, 92px);
          font-weight: 900;
          line-height: 0.95;

          letter-spacing: 1px;
          text-transform: uppercase;

          text-shadow:
            0 2px 0 rgba(255, 255, 255, 0.1),
            0 10px 35px rgba(0, 0, 0, 0.5);
        }

        .journey-description {
          position: relative;
          z-index: 2;

          margin: 17px 0 0;

          color: rgba(255, 255, 255, 0.8);

          font-size: 20px;
          line-height: 1.4;
          font-weight: 400;
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
          height: 2px;
          background: #f2b759;
        }

        .journey-divider b {
          display: block;

          width: 8px;
          height: 8px;

          border-radius: 50%;
          background: #f2b759;

          box-shadow:
            0 0 12px rgba(242, 183, 89, 0.75);
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

          left: 0;
          top: 50px;

          width: 100%;
          height: 420px;

          overflow: visible;
          pointer-events: none;

          z-index: 1;
        }

        .road-glow {
          opacity: 0.5;
        }

        .road-main {
          opacity: 1;
        }

        .road-dash {
          opacity: 1;
        }

        .road-arrow {
          fill: #f2b759;
          filter: drop-shadow(
            0 0 10px rgba(242, 183, 89, 0.55)
          );
        }

        /* =========================================================
           10 COLUMN GRID
        ========================================================= */

        .milestones-grid {
          position: absolute;
          inset: 0;

          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));

          align-items: center;

          padding: 0 22px;

          z-index: 3;
        }

        .milestone {
          position: relative;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          height: 100%;

          text-align: center;
        }

        /* =========================================================
           TOP / BOTTOM POSITIONS
        ========================================================= */

        .milestone.is-top {
          transform: translateY(-85px);
        }

        .milestone.is-bottom {
          transform: translateY(85px);
        }

        /* =========================================================
           CONTENT
        ========================================================= */

        .milestone-content {
          position: absolute;
          left: 50%;

          display: flex;
          flex-direction: column;

          align-items: center;

          width: 165px;

          transform: translateX(-50%);
        }

        .top-content {
          bottom: calc(50% + 48px);
        }

        .bottom-content {
          top: calc(50% + 48px);
        }

        .milestone-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 31px;
          margin-bottom: 8px;

          color: #f2b759;

          font-size: 28px;

          filter:
            drop-shadow(
              0 0 7px rgba(242, 183, 89, 0.22)
            );
        }

        .milestone-title {
          color: #fff;

          font-family:
            "Arial Narrow",
            "Roboto Condensed",
            Arial,
            sans-serif;

          font-size: 20px;
          font-weight: 800;
          line-height: 1.08;

          letter-spacing: -0.4px;

          text-transform: uppercase;

          max-width: 165px;
        }

        .milestone-subtitle {
          margin-top: 7px;

          max-width: 170px;

          color: rgba(255, 255, 255, 0.78);

          font-size: 15px;
          line-height: 1.5;
          font-weight: 400;
        }

        /* =========================================================
           NODE
        ========================================================= */

        .milestone-node-wrap {
          position: absolute;
          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          display: flex;
          align-items: center;
          justify-content: center;

          width: 78px;
          height: 78px;
        }

        .milestone-node {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 70px;
          height: 70px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 40%,
              #10201d 0%,
              #07100f 62%,
              #030807 100%
            );

          border: 2px solid #f2b759;

          box-shadow:
            0 0 0 1px rgba(242, 183, 89, 0.1),
            0 0 20px rgba(242, 183, 89, 0.1),
            inset 0 0 18px rgba(0, 0, 0, 0.65);

          z-index: 4;
        }

        .milestone-node::before {
          content: "";

          position: absolute;
          inset: 5px;

          border-radius: 50%;

          border: 1px solid rgba(242, 183, 89, 0.22);
        }

        .milestone-node::after {
          content: "";

          position: absolute;
          inset: -7px;

          border-radius: 50%;

          border: 1px dashed
            rgba(242, 183, 89, 0.72);

          transform: rotate(12deg);

          opacity: 0.95;
        }

        .milestone-node span {
          position: relative;
          z-index: 5;

          color: #f2b759;

          font-family:
            "Arial Narrow",
            Arial,
            sans-serif;

          font-size: 25px;
          font-weight: 700;
          line-height: 1;
        }

        /* =========================================================
           CONNECTOR
        ========================================================= */

        .milestone-node-wrap::before {
          content: "";

          position: absolute;
          left: 50%;

          width: 2px;
          height: 33px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              #f2b759,
              rgba(242, 183, 89, 0.35)
            );

          z-index: 2;
        }

        .milestone.is-top
          .milestone-node-wrap::before {
          top: 69px;
        }

        .milestone.is-bottom
          .milestone-node-wrap::before {
          bottom: 69px;
        }

        .connector-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #f2b759;

          box-shadow:
            0 0 7px rgba(242, 183, 89, 0.65);

          z-index: 5;
        }

        .milestone.is-top .connector-dot {
          top: 98px;
        }

        .milestone.is-bottom .connector-dot {
          bottom: 98px;
        }

        /* =========================================================
           RESPONSIVE — LARGE TABLETS
        ========================================================= */

        @media (max-width: 1400px) {
          .journey-container {
            padding: 0 18px;
          }

          .milestones-grid {
            padding: 0 10px;
          }

          .milestone-title {
            font-size: 17px;
          }

          .milestone-subtitle {
            font-size: 13px;
            max-width: 145px;
          }

          .milestone-content {
            width: 145px;
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

          .milestone.is-top {
            transform: translateY(-72px);
          }

          .milestone.is-bottom {
            transform: translateY(72px);
          }

          .milestone-node {
            width: 62px;
            height: 62px;
          }

          .milestone-node-wrap {
            width: 70px;
            height: 70px;
          }

          .milestone-node span {
            font-size: 21px;
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

          .milestone-content {
            width: 120px;
          }

          .journey-road {
            top: 60px;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 767px) {
          .journey-section {
            padding: 70px 0 80px;
          }

          .journey-container {
            padding: 0 18px;
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
            font-size: 12px;
            gap: 10px;
            margin-bottom: 16px;
          }

          .kicker-line {
            width: 25px;
          }

          .journey-title {
            font-size: 48px;
          }

          .journey-description {
            font-size: 14px;
            margin-top: 14px;
          }

          .journey-divider {
            margin-top: 20px;
          }

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

            gap: 24px;

            padding: 0;
          }

          .milestone,
          .milestone.is-top,
          .milestone.is-bottom {
            transform: none;

            position: relative;

            min-height: 115px;

            display: grid;
            grid-template-columns: 78px 1fr;

            align-items: center;

            text-align: left;
          }

          .milestone-content {
            position: relative;

            left: auto;
            top: auto;
            bottom: auto;

            transform: none;

            width: auto;

            align-items: flex-start;

            grid-column: 2;
            grid-row: 1;
          }

          .milestone-node-wrap {
            position: relative;

            left: auto;
            top: auto;

            transform: none;

            width: 78px;
            height: 78px;

            grid-column: 1;
            grid-row: 1;
          }

          .milestone-title {
            font-size: 17px;
            max-width: 100%;
          }

          .milestone-subtitle {
            font-size: 13px;
            max-width: 100%;
          }

          .milestone-icon {
            font-size: 24px;
            margin-bottom: 5px;
          }

          .milestone-node {
            width: 62px;
            height: 62px;
          }

          .milestone-node span {
            font-size: 20px;
          }

          .milestone-node-wrap::before,
          .connector-dot {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}