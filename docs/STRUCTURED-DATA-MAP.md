# AMT Solutions — Structured Data Map
*Updated: 2026-08-15*

---

## Schema.org Implementation Overview

AMT Solutions uses JSON-LD blocks embedded in `<head>` for all structured data. No Microdata or RDFa is used. All canonical entity references point to `https://amtsolutions.lk/#organization`.

---

## Page-by-Page Schema Map

### `/` — Homepage

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SecuritySystemInstaller"],
      "@id": "https://amtsolutions.lk/#organization",
      "name": "AMT Solutions (Pvt) Ltd",
      "url": "https://amtsolutions.lk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amtsolutions.lk/assets/img/logo.png",
        "width": 300,
        "height": 100
      },
      "image": "https://amtsolutions.lk/assets/img/og-image.jpg",
      "description": "AMT Solutions (Pvt) Ltd designs and installs CCTV surveillance systems, security cameras, access control, fire alarms, networking infrastructure, home automation, and PABX communication systems for residential and commercial clients across Kandy and Sri Lanka.",
      "foundingDate": "2014",
      "email": "info@amtsolutions.lk",
      "telephone": "+94773411861",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 306/B/1, Kandakaduwa, Gannoruwa",
        "addressLocality": "Peradeniya",
        "addressRegion": "Kandy, Central Province",
        "addressCountry": "LK"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "12:30"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Kandy" },
        { "@type": "AdministrativeArea", "name": "Central Province" },
        { "@type": "Country", "name": "Sri Lanka" }
      ],
      "sameAs": ["https://www.facebook.com/AMT.SolutionsGroup"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Security & Smart Technology Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV & Surveillance Systems" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV Installation in Kandy", "url": "https://amtsolutions.lk/cctv-installation-kandy/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Access Control Systems" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fire Alarm Systems" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Automation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Networking & Structured Cabling" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PABX & Communication Systems" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://amtsolutions.lk/#website",
      "url": "https://amtsolutions.lk",
      "name": "AMT Solutions",
      "description": "CCTV, Security & Smart Technology Sri Lanka",
      "publisher": { "@id": "https://amtsolutions.lk/#organization" }
    }
  ]
}
```

---

### `/cctv-installation-kandy/` — Primary Local SEO Landing Page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SecuritySystemInstaller"],
      "@id": "https://amtsolutions.lk/#organization",
      "name": "AMT Solutions (Pvt) Ltd",
      "url": "https://amtsolutions.lk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amtsolutions.lk/assets/img/logo.png"
      },
      "image": "https://amtsolutions.lk/assets/img/og-image.jpg",
      "telephone": "+94773411861",
      "email": "info@amtsolutions.lk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 306/B/1, Kandakaduwa, Gannoruwa",
        "addressLocality": "Peradeniya",
        "addressRegion": "Kandy, Central Province",
        "addressCountry": "LK"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "12:30"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Kandy" },
        { "@type": "AdministrativeArea", "name": "Central Province" },
        { "@type": "Country", "name": "Sri Lanka" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://amtsolutions.lk/cctv-installation-kandy/#service",
      "name": "CCTV Installation in Kandy",
      "description": "Professional CCTV camera installation in Kandy and Central Province by AMT Solutions. Site assessments, IP & HD analog security camera systems, NVR/DVR recording, remote phone viewing, and system upgrades for homes, offices, retail shops, and commercial buildings.",
      "serviceType": "CCTV Installation",
      "provider": { "@id": "https://amtsolutions.lk/#organization" },
      "areaServed": [
        { "@type": "City", "name": "Kandy" },
        { "@type": "AdministrativeArea", "name": "Central Province" }
      ],
      "url": "https://amtsolutions.lk/cctv-installation-kandy/"
    },
    {
      "@type": "FAQPage",
      "@id": "https://amtsolutions.lk/cctv-installation-kandy/#faq",
      "mainEntity": [
        /* 10 complete Q&As matching page content */
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://amtsolutions.lk/" },
        { "@type": "ListItem", "position": 2, "name": "CCTV Installation in Kandy", "item": "https://amtsolutions.lk/cctv-installation-kandy/" }
      ]
    }
  ]
}
```

---

### `/contact/` — Contact Page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SecuritySystemInstaller"],
      "@id": "https://amtsolutions.lk/#organization",
      "address": { ... },
      "openingHoursSpecification": [ ... ]
    },
    {
      "@type": "ContactPage",
      "@id": "https://amtsolutions.lk/contact/#webpage",
      "url": "https://amtsolutions.lk/contact/",
      "name": "Contact AMT Solutions",
      "mainEntity": { "@id": "https://amtsolutions.lk/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://amtsolutions.lk/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://amtsolutions.lk/contact/" }
      ]
    }
  ]
}
```

---

### Service Pages (all 6)

All service pages reference `@id: "https://amtsolutions.lk/#organization"` with `LocalBusiness` / `SecuritySystemInstaller` provider and full `BreadcrumbList`.

---

## Validation & Verification

1. **Schema.org Validator**: https://validator.schema.org/
2. **Google Rich Results Test**: https://search.google.com/test/rich-results
