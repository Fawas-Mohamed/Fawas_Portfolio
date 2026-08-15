"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function DownloadCvButton({ className }: { className?: string }) {
  function handleClick() {
    // Fire-and-forget: don't block the download if the API is briefly unreachable
    fetch(`${API_URL}/api/resume/track`, { method: "POST" }).catch(() => {});
  }

  return (
    <a
      className={className}
      href="/Mohamed_Fawas_Resume.pdf"
      download
      onClick={handleClick}
    >
      download cv
      <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
    </a>
  );
}
