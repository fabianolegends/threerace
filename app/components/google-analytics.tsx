"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GOOGLE_ANALYTICS_ID = "G-6DQQNX5CRQ";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady || !pathname) {
      return;
    }

    const gtag = (window as GtagWindow).gtag;

    if (!gtag) {
      return;
    }

    gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [isReady, pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
