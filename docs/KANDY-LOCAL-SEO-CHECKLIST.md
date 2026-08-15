# AMT Solutions — Kandy Local SEO Checklist
*Updated: 2026-08-10*

---

## Google Business Profile (GBP)

GBP listing: https://share.google/eDY7que73AeGAyP3V

### Profile Verification & Setup

- [ ] Verify GBP ownership if not already verified
- [ ] Confirm business name: **AMT Solutions (Pvt) Ltd**
- [ ] Set primary category: **Security system installer** (or closest available)
- [ ] Add secondary categories:
  - CCTV installation service
  - Security camera supplier
  - Access control system supplier
  - Fire alarm supplier
  - Networking company
  - Home automation company
- [ ] Set official phone: **+94 77 341 1861**
- [ ] Set official website: **https://amtsolutions.lk**
- [ ] Set business description (consistent with website copy)

### Address & Service Area

- [ ] **BUSINESS ADDRESS REQUIRED**: Confirm if the Gannoruwa, Peradeniya address should be published
  - Found on directories: No. 306/B/1, Kandakaduwa, Gannoruwa, Peradeniya, Kandy
  - If this is a physical office: Use as storefront
  - If this is a home office: Consider service-area business (SAB) configuration instead
- [ ] **SERVICE AREA CONFIRMATION REQUIRED**: Define service radius or list of areas
- [ ] **BUSINESS HOURS REQUIRED**: Add accurate opening hours

### GBP Content

- [ ] Add CCTV installation as a listed service with description
- [ ] Add access control as a listed service
- [ ] Add fire alarm installation as a listed service
- [ ] Add networking/structured cabling as a listed service
- [ ] Upload AMT Solutions logo
- [ ] Upload brand cover image (1200×630px recommended)
- [ ] Upload real project photographs as they become available
- [ ] Write business description (150–750 characters)

### GBP Project Updates

Publish project updates to GBP as they are completed:

- [ ] Add Dangolla CCTV project photos when available
- [ ] Add future Kandy-area project photos
- [ ] Post regular project updates (monthly recommended)

### Reviews

- [ ] Respond to any existing reviews (positive and negative)
- [ ] Enable GBP messaging if not already enabled
- [ ] See Review Strategy section below

---

## Review Strategy (Compliant)

After completing a project, AMT Solutions may request a genuine review from the client. This must be done ethically and in compliance with Google's review policies.

### Recommended process

1. Complete the installation and handover
2. Follow up after 1–2 weeks to confirm the system is working well
3. If the client is satisfied, send a brief message:

> Thank you for choosing AMT Solutions for your CCTV installation. If you found the installation and support helpful, we would appreciate an honest Google review about your experience.
>
> You can leave a review here: [GBP review link]

### Rules

- ❌ Do NOT buy or generate fake reviews
- ❌ Do NOT offer rewards, discounts or incentives for positive reviews
- ❌ Do NOT ask clients to include specific keywords in reviews
- ❌ Do NOT create reviews from employee or personal accounts
- ❌ Do NOT send automated review requests
- ✅ DO request reviews only from genuine clients after completed work
- ✅ DO respond to all reviews (positive and negative) professionally
- ✅ DO wait until the client has had time to evaluate the system

---

## LocalBusiness Schema (Pending)

Once the business address and hours are confirmed, add to homepage and contact page:

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
    "addressLocality": "Kandy",
    "addressRegion": "Central Province",
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

## NAP Consistency

Ensure Name, Address, Phone are identical across all platforms:

| Platform | Name | Address | Phone | Status |
|----------|------|---------|-------|--------|
| Website | AMT Solutions (Pvt) Ltd | — | +94 77 341 1861 | ✅ |
| GBP | AMT Solutions (Pvt) Ltd | ⏳ Confirm | ⏳ Confirm | ⏳ |
| Facebook | AMT Solutions - Pvt ltd | — | 077 341 1861 | ⚠️ Check name consistency |
| Lanka YP | AMT Solutions (Pvt) Ltd | Gannoruwa, Peradeniya | Listed | ✅ |

> **Action**: Ensure the Facebook page name matches the official company name format.

---

## Post-Launch Monitoring

### Week 1
- [ ] Verify `/cctv-installation-kandy/` is indexed in Google Search Console
- [ ] Verify `/projects/cctv-installation-dangolla/` is indexed
- [ ] Check for crawl errors on new URLs

### Month 1
- [ ] Monitor GSC impressions for "CCTV Kandy" related queries
- [ ] Check GBP insights for views and searches
- [ ] Review local pack appearance for "CCTV installation Kandy"

### Ongoing
- [ ] Add project photos to GBP as they become available
- [ ] Publish project updates monthly
- [ ] Monitor and respond to reviews
- [ ] Track local keyword rankings quarterly
