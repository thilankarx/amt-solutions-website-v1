# AMT Solutions — Kandy CCTV SEO Audit & Implementation Report
*Updated: 2026-08-15*

---

## 1. Executive Summary & Page Architecture

AMT Solutions (`https://amtsolutions.lk`) has been enhanced to target high-intent commercial queries around **"CCTV Kandy"**, **"CCTV installation Kandy"**, and Central Province security systems while maintaining clean technical SEO, structured data validity, and accurate business operating hours.

---

## 2. Core Target Page Architecture

### Primary Landing Page: `/cctv-installation-kandy/`
- **Title Tag**: `CCTV Installation Kandy | CCTV Camera Solutions | AMT Solutions`
- **Meta Description**: `Professional CCTV installation in Kandy for homes, offices and businesses. Get CCTV camera system planning, installation and support from AMT Solutions.`
- **Heading Hierarchy**: Single `<h1>CCTV Installation in Kandy</h1>` followed by semantic `<h2>` and `<h3>` sections.
- **Content Sections**:
  1. Opening overview & value proposition
  2. Residential CCTV solutions (villas, homes, apartments)
  3. Commercial & enterprise CCTV solutions (retail, offices, warehouses, hospitality)
  4. Local site considerations (Kandy terrain, hill country rainfall, lighting, monkey-proofing)
  5. 7-Step installation process (site survey through handover and support)
  6. Camera types & equipment options (IP cameras, HD analog, PTZ, night vision)
  7. Remote smartphone monitoring setup
  8. Existing CCTV system upgrades
  9. IP vs HD analog comparison
  10. Local service areas (Kandy, Dangolla, Peradeniya, Katugastota, Kundasale, Ampitiya, Pilimathalawa, Digana, Akurana, Central Province)
  11. Local project evidence (`id="recent-projects"` — Dangolla project case study)
  12. 10 Comprehensive FAQs (cost, camera count, remote viewing, night vision, storage, commercial systems, upgrades, internet requirements, power backup, quotation requirements)
  13. Complementary service cross-links (Networking, Access Control, Sri Lanka-wide CCTV)
  14. High-conversion CTA section
- **Structured Data**:
  - `LocalBusiness` / `SecuritySystemInstaller` with verified address, `openingHoursSpecification` (Mon–Sat: 8:00 AM – 6:30 PM, Sun: 8:00 AM – 12:30 PM), `areaServed`, `telephone`, `email`.
  - `Service` schema referencing `@id: "https://amtsolutions.lk/#organization"`.
  - `FAQPage` schema with 10 question-answer pairs matching on-page text.
  - `BreadcrumbList` schema.

---

### Local Project Case Study: `/projects/cctv-installation-dangolla/`
- **Title Tag**: `CCTV Installation in Dangolla, Kandy | AMT Solutions Project`
- **Focus**: Real-world residential CCTV project in Dangolla, Kandy utilizing EZVIZ smart cameras and monkey-protective iron cages.
- **Status**: Live, indexed, linked from `/cctv-installation-kandy/#recent-projects` and `/projects/`.

---

### Contact & Consultation Page: `/contact/`
- **Title Tag**: `Contact AMT Solutions | CCTV & Security Systems Kandy & Sri Lanka`
- **Meta Description**: `Contact AMT Solutions (Pvt) Ltd for CCTV installation, security systems, and smart technology in Kandy and across Sri Lanka. Call +94 77 341 1861 or WhatsApp.`
- **Components**:
  - Direct call (`tel:+94773411861`)
  - Direct WhatsApp (`https://wa.me/94773411861`)
  - Email (`mailto:info@amtsolutions.lk`)
  - Dedicated Business Hours Card (Mon–Sat 8:00 AM – 6:30 PM, Sun 8:00 AM – 12:30 PM, Online Enquiries 24/7)
  - Office address & Kandy / Central Province service coverage
  - Guidance on what details to provide for site quotes

---

## 3. Sitewide Consistency & Technical SEO

1. **Operating Hours Policy**:
   - Mon – Sat: 8:00 AM – 6:30 PM
   - Sunday: 8:00 AM – 12:30 PM
   - Online Enquiries: Available 24/7
   - Consistent across all HTML footers, contact cards, and JSON-LD schema blocks.
2. **Internal Linking**:
   - Sitewide footer links to `/cctv-installation-kandy/`.
   - `/services/cctv-security-systems/` deep-links directly to `/cctv-installation-kandy/#recent-projects`.
   - Homepage links to `/cctv-installation-kandy/`.
3. **Draft Segregation**:
   - `/projects/cctv-installation-ampitiya/` remains unlinked and flagged with `noindex,nofollow`.
4. **Sitemap & Robots**:
   - `sitemap.xml` contains all 13 canonical URLs.
   - `robots.txt` points to `https://amtsolutions.lk/sitemap.xml`.
5. **Security & Performance**:
   - `.htaccess` includes `X-Content-Type-Options`, `X-Frame-Options SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, and caching rules.
