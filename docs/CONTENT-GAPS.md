# AMT Solutions — Content Gaps & Pending Items
*Updated: 2026-08-09*

---

## Items Confirmed by Business Owner

| Item | Value | Status |
|------|-------|--------|
| Phone / WhatsApp | +94 77 341 1861 | ✅ Confirmed — implemented |
| Email | info@amtsolutions.lk | ✅ Confirmed — implemented |
| Founding year | 2014 | ✅ Confirmed — implemented |
| Service area | Sri Lanka | ✅ Confirmed — implemented |
| Facebook | https://www.facebook.com/AMT.SolutionsGroup | ✅ Confirmed — implemented |

---

## Items Pending (from Google Business Profile)

| Item | How to obtain | Where to use |
|------|--------------|--------------|
| Full business address | GBP listing (https://share.google/eDY7que73AeGAyP3V) | Contact page, `LocalBusiness` schema |
| Business hours (open/close per day) | GBP listing | Contact page, `openingHoursSpecification` in schema |

Once address and hours are confirmed:
1. Add to `/contact/index.html` as a visible address block
2. Upgrade the `Organization` schema on `/contact/` and `/` to `LocalBusiness` with:
   - `address` → `PostalAddress`
   - `openingHoursSpecification` → array of `OpeningHoursSpecification`

---

## Items Pending (Business Owner to Confirm)

| Item | Notes |
|------|-------|
| Brand partnerships | Hikvision, ZKTeco, etc. — confirm which brands are officially authorised/preferred. Do NOT list as "authorised dealer" unless confirmed. |
| Real project photos | Owner will upload. Place in `/assets/img/projects/`. Update `/projects/index.html` to replace placeholder cards. |
| OG social image | Needs a 1200×630px image at `/assets/img/og-image.jpg`. All pages reference this URL. Use the AMT logo on a brand-coloured background. |

---

## FAQPage Schema Opportunity

All 6 service pages now contain explicit Q&A sections. These can be wrapped in `FAQPage` JSON-LD for Google FAQ rich results eligibility.

**When to add:** After the site is live and indexed. FAQPage can increase SERP real estate.

**How to implement:** For each service page, add a second JSON-LD block:

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

---

## LocalBusiness Schema (Pending Address)

Once address and hours are confirmed, add to homepage and contact page:

```json
{
  "@type": "LocalBusiness",
  "@id": "https://amtsolutions.lk/#organization",
  "name": "AMT Solutions (Pvt) Ltd",
  "url": "https://amtsolutions.lk",
  "telephone": "+94773411861",
  "email": "info@amtsolutions.lk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[TO BE CONFIRMED]",
    "addressLocality": "[City]",
    "addressCountry": "LK"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "[TO BE CONFIRMED]",
      "closes": "[TO BE CONFIRMED]"
    }
  ]
}
```

---

## Content Gaps — Service Pages

All service pages now have substantive content. However, the following would further strengthen them if confirmed:

| Page | Gap | Notes |
|------|-----|-------|
| All services | No specific brand/product mentions | Add once brand partnerships confirmed |
| CCTV | No example project | Add once real project photos available |
| All services | No pricing indication | Not required; "contact for quote" is appropriate |
| Projects page | No real projects | Replace placeholder cards when photos provided |
