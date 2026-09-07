import type { Metadata } from "next";

export const eventLocales = ["pt", "es", "en"] as const;

export type EventLocale = (typeof eventLocales)[number];
export type EventSlug =
  | "threerace-uruguay"
  | "gravel-experience-uruguay"
  | "threerace-short-uruguay";

type LocalizedCopy = {
  title: string;
  socialTitle: string;
  description: string;
  imageAlt: string;
  place: string;
};

type EventConfig = {
  image: string;
  startDate: string;
  endDate?: string;
  registrationUrl?: string;
  price?: string;
  validFrom?: string;
  addressLocality: string;
  copy: Record<EventLocale, LocalizedCopy>;
};

const siteUrl = "https://www.threerace.com";

const languageTags: Record<EventLocale, string> = {
  pt: "pt-BR",
  es: "es-UY",
  en: "en",
};

const openGraphLocales: Record<EventLocale, string> = {
  pt: "pt_BR",
  es: "es_UY",
  en: "en_US",
};

const events: Record<EventSlug, EventConfig> = {
  "threerace-uruguay": {
    image: "/event-threerace-uruguay.jpeg",
    startDate: "2026-10-30T07:00:00-03:00",
    endDate: "2026-11-01T15:00:00-03:00",
    addressLocality: "La Paloma",
    registrationUrl: "https://event.windfit.app/threerace-uruguay-2026",
    price: "220",
    validFrom: "2026-05-20",
    copy: {
      pt: {
        title: "Ultramaratona de MTB no Uruguai 2026",
        socialTitle: "Threerace Bike Ultramarathon Uruguay 2026",
        description:
          "Prova de mountain bike por etapas em La Paloma e Rocha, Uruguai, de 30 de outubro a 1º de novembro de 2026.",
        imageAlt: "Ciclistas na Threerace Bike Ultramarathon Uruguay",
        place: "La Paloma e Rocha",
      },
      es: {
        title: "Carrera de MTB por Etapas en Uruguay 2026",
        socialTitle: "Threerace Bike Ultramarathon Uruguay 2026",
        description:
          "Carrera de mountain bike por etapas en La Paloma y Rocha, Uruguay, del 30 de octubre al 1 de noviembre de 2026.",
        imageAlt: "Ciclistas en Threerace Bike Ultramarathon Uruguay",
        place: "La Paloma y Rocha",
      },
      en: {
        title: "MTB Stage Race in Uruguay 2026",
        socialTitle: "Threerace Bike Ultramarathon Uruguay 2026",
        description:
          "Mountain bike stage race in La Paloma and Rocha, Uruguay, from October 30 to November 1, 2026.",
        imageAlt: "Riders at Threerace Bike Ultramarathon Uruguay",
        place: "La Paloma and Rocha",
      },
    },
  },
  "gravel-experience-uruguay": {
    image: "/gravel-experience-hero-v2.png",
    startDate: "2026-10-31T07:00:00-03:00",
    endDate: "2026-11-01T15:00:00-03:00",
    addressLocality: "La Paloma",
    registrationUrl:
      "https://event.windfit.app/threerace-gravel-experience-uruguay-2026",
    price: "149",
    validFrom: "2026-06-25",
    copy: {
      pt: {
        title: "Prova de Gravel por Etapas no Uruguai 2026",
        socialTitle: "Gravel Experience Uruguay 2026",
        description:
          "Prova de gravel com duas etapas em La Paloma e Rocha, Uruguai, nos dias 31 de outubro e 1º de novembro de 2026.",
        imageAlt: "Ciclista na Gravel Experience Uruguay",
        place: "La Paloma e Rocha",
      },
      es: {
        title: "Carrera de Gravel por Etapas en Uruguay 2026",
        socialTitle: "Gravel Experience Uruguay 2026",
        description:
          "Carrera de gravel de dos etapas en La Paloma y Rocha, Uruguay, el 31 de octubre y 1 de noviembre de 2026.",
        imageAlt: "Ciclista en Gravel Experience Uruguay",
        place: "La Paloma y Rocha",
      },
      en: {
        title: "Gravel Stage Race in Uruguay 2026",
        socialTitle: "Gravel Experience Uruguay 2026",
        description:
          "Two-stage gravel race in La Paloma and Rocha, Uruguay, on October 31 and November 1, 2026.",
        imageAlt: "Rider at Gravel Experience Uruguay",
        place: "La Paloma and Rocha",
      },
    },
  },
  "threerace-short-uruguay": {
    image: "/event-threerace-uruguay.jpeg",
    startDate: "2026-11-01T08:30:00-03:00",
    addressLocality: "La Pedrera",
    copy: {
      pt: {
        title: "Threerace Short Uruguay 2026",
        socialTitle: "Threerace Short Uruguay 2026",
        description:
          "Prova de mountain bike de 61 km e 630 m de elevação acumulada, com largada às 8h30 em La Pedrera, Uruguai, em 1º de novembro de 2026.",
        imageAlt: "Ciclistas na Threerace Short Uruguay",
        place: "La Pedrera, Rocha",
      },
      es: {
        title: "Threerace Short Uruguay 2026",
        socialTitle: "Threerace Short Uruguay 2026",
        description:
          "Carrera de mountain bike de 61 km y 630 m de desnivel positivo, con salida a las 8:30 en La Pedrera, Uruguay, el 1 de noviembre de 2026.",
        imageAlt: "Ciclistas en Threerace Short Uruguay",
        place: "La Pedrera, Rocha",
      },
      en: {
        title: "Threerace Short Uruguay 2026",
        socialTitle: "Threerace Short Uruguay 2026",
        description:
          "One-day 61 km mountain bike race with 630 m of elevation gain, starting at 8:30 a.m. in La Pedrera, Uruguay, on November 1, 2026.",
        imageAlt: "Riders at Threerace Short Uruguay",
        place: "La Pedrera, Rocha",
      },
    },
  },
};

export function isEventLocale(value: string): value is EventLocale {
  return eventLocales.includes(value as EventLocale);
}

export function localizedEventPath(slug: EventSlug, locale: EventLocale) {
  return `/${locale}/${slug}`;
}

export function eventAlternates(slug: EventSlug) {
  return {
    "pt-BR": localizedEventPath(slug, "pt"),
    "es-UY": localizedEventPath(slug, "es"),
    en: localizedEventPath(slug, "en"),
    "x-default": `/${slug}`,
  };
}

export function buildLocalizedEventMetadata(
  slug: EventSlug,
  locale: EventLocale,
): Metadata {
  const event = events[slug];
  const copy = event.copy[locale];
  const path = localizedEventPath(slug, locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: eventAlternates(slug),
    },
    openGraph: {
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: eventLocales
        .filter((item) => item !== locale)
        .map((item) => openGraphLocales[item]),
      url: path,
      siteName: "Threerace Sports",
      title: copy.socialTitle,
      description: copy.description,
      images: [
        {
          url: event.image,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.socialTitle,
      description: copy.description,
      images: [event.image],
    },
  };
}

export function buildLocalizedEventJsonLd(
  slug: EventSlug,
  locale: EventLocale,
) {
  const event = events[slug];
  const copy = event.copy[locale];
  const url = `${siteUrl}${localizedEventPath(slug, locale)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${url}/#event`,
    name: copy.socialTitle,
    description: copy.description,
    inLanguage: languageTags[locale],
    url,
    image: [`${siteUrl}${event.image}`],
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: copy.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.addressLocality,
        addressRegion: "Rocha",
        addressCountry: "UY",
      },
    },
    organizer: [
      {
        "@type": "SportsOrganization",
        name: "Threerace Sports",
        url: siteUrl,
      },
      {
        "@type": "Organization",
        name: "Azimut Extremo",
        url: "https://www.azimutextremo.com/",
      },
    ],
  };

  if (event.registrationUrl && event.price && event.validFrom) {
    return {
      ...jsonLd,
      offers: {
        "@type": "Offer",
        url: event.registrationUrl,
        price: event.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: event.validFrom,
      },
    };
  }

  return jsonLd;
}
