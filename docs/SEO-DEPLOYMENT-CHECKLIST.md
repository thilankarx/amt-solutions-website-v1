# AMT Solutions — SEO Deployment Checklist
*Updated: 2026-08-09*

---

## Pre-Launch Checks (Before Going Live)

### Content & Files

- [ ] Add the OG image file at `/assets/img/og-image.jpg` (1200×630px, AMT branded)
- [ ] Replace placeholder project cards in `/projects/index.html` with real photos
- [ ] Confirm business address and hours → update `/contact/index.html` and schema
- [ ] Confirm brand partnerships → add to About and relevant service pages
- [ ] Review all 11 indexable pages for accuracy of content

### Technical

- [ ] Test all internal links resolve correctly (no 404s)
- [ ] Test breadcrumbs display correctly on all pages
- [ ] Test mobile responsive layout on all pages
- [ ] Validate all JSON-LD at https://validator.schema.org/
- [ ] Test with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Check that 404.html returns HTTP 404 status (not 200)
- [ ] Verify `.htaccess` HTTPS redirect works on live server
- [ ] Verify www → apex redirect works on live server

---

## AeonFree Hosting

- [ ] Upload all files to AeonFree hosting account
- [ ] Confirm `.htaccess` is supported and active (test HTTPS redirect)
- [ ] Confirm `ErrorDocument 404 /404.html` is working
- [ ] Confirm MIME types are correct for SVG, WebP, AVIF

---

## Cloudflare DNS / CDN

- [ ] Add A record pointing `amtsolutions.lk` to AeonFree IP
- [ ] Add CNAME for `www` → redirect to apex
- [ ] Enable Cloudflare SSL/TLS (Full or Flexible depending on AeonFree setup)
- [ ] Enable "Always Use HTTPS" in Cloudflare SSL settings
- [ ] Enable Brotli compression (Cloudflare Speed → Optimization)
- [ ] Set caching rules or use Page Rules for static assets (CSS, JS, images)
- [ ] Consider enabling Cloudflare Rocket Loader for JS deferral (test first)

---

## Google Search Console (GSC)

- [ ] Add property `https://amtsolutions.lk/` (URL prefix method)
- [ ] Verify via HTML file upload or DNS TXT record
- [ ] Submit sitemap: `https://amtsolutions.lk/sitemap.xml`
- [ ] Confirm all 11 URLs are indexable (URL Inspection)
- [ ] Confirm 404.html is excluded from coverage
- [ ] Check Core Web Vitals report after initial crawl
- [ ] Monitor Manual Actions and Security Issues tabs

---

## Bing Webmaster Tools

- [ ] Create account at https://www.bing.com/webmasters/
- [ ] Add site and verify
- [ ] Submit sitemap
- [ ] Use IndexNow to ping all 11 URLs immediately after launch

---

## IndexNow (Fast Indexing)

AMT Solutions site uses static HTML. Ping IndexNow after every content update:

```
https://api.indexnow.org/indexnow?url=https://amtsolutions.lk/&key=[YOUR_KEY]
```

Generate a key at: https://www.indexnow.org/

Place the key file at: `https://amtsolutions.lk/[key].txt`

Ping all URLs after launch:
- `https://amtsolutions.lk/`
- `https://amtsolutions.lk/about/`
- `https://amtsolutions.lk/services/`
- `https://amtsolutions.lk/projects/`
- `https://amtsolutions.lk/contact/`
- `https://amtsolutions.lk/services/cctv-security-systems/`
- `https://amtsolutions.lk/services/access-control-systems/`
- `https://amtsolutions.lk/services/fire-alarm-systems/`
- `https://amtsolutions.lk/services/home-automation/`
- `https://amtsolutions.lk/services/networking-solutions/`
- `https://amtsolutions.lk/services/pabx-communication-systems/`

---

## Google Business Profile (GBP)

GBP listing: https://share.google/eDY7que73AeGAyP3V

- [ ] Confirm website URL in GBP matches canonical: `https://amtsolutions.lk/`
- [ ] Confirm phone number matches site: `+94 77 341 1861`
- [ ] Confirm business description is accurate and consistent with website
- [ ] Add all 6 services as GBP service categories
- [ ] Add project photos to GBP when available
- [ ] Respond to any existing reviews
- [ ] Enable GBP messaging if not already enabled

---

## Post-Launch Monitoring

### Week 1–2
- [ ] Check GSC Coverage report — all 11 pages should be "Valid"
- [ ] Check GSC Enhancements → Breadcrumbs — verify rich results detected
- [ ] Check for crawl errors

### Month 1
- [ ] Review GSC Search Performance for initial keyword impressions
- [ ] Check Core Web Vitals (LCP, INP, CLS) in GSC and PageSpeed Insights
- [ ] Review GBP profile views and search queries

### Ongoing
- [ ] Add real project photos to projects page as they become available
- [ ] Add LocalBusiness schema once address confirmed
- [ ] Consider adding FAQPage schema to service pages for FAQ rich results
- [ ] Monitor for new keyword opportunities in GSC Search Performance

---

## Performance Benchmarks (Target)

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| Mobile score | > 85 | PageSpeed Insights |
| Desktop score | > 95 | PageSpeed Insights |

---

## Structured Data Validation URLs

| Tool | URL |
|------|-----|
| Schema.org Validator | https://validator.schema.org/ |
| Google Rich Results Test | https://search.google.com/test/rich-results |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters/ |

---

## Kandy CCTV Local SEO Expansion (2026-08-10)

### New Pages Added

| URL | Type | Status |
|-----|------|--------|
| `/cctv-installation-kandy/` | Local CCTV landing page | ✅ Live — add to sitemap |
| `/projects/cctv-installation-dangolla/` | Verified project page | ✅ Live — add to sitemap |
| `/projects/cctv-installation-ampitiya/` | Draft project page | ⏳ noindex — DO NOT add to sitemap |

### Post-Launch Actions

- [ ] Submit updated sitemap.xml in Google Search Console
- [ ] Inspect `/cctv-installation-kandy/` in URL Inspection tool
- [ ] Request indexing for `/cctv-installation-kandy/`
- [ ] Inspect `/projects/cctv-installation-dangolla/` in URL Inspection tool
- [ ] Request indexing for `/projects/cctv-installation-dangolla/`
- [ ] Ping IndexNow for both new URLs
- [ ] Monitor indexing status within 1 week

### Search Console Query Monitoring

Track these query groups in GSC Search Performance:

| Query Group | Expected Page |
|-------------|---------------|
| "cctv kandy" | `/cctv-installation-kandy/` |
| "cctv installation kandy" | `/cctv-installation-kandy/` |
| "cctv camera kandy" | `/cctv-installation-kandy/` |
| "security camera kandy" | `/cctv-installation-kandy/` |
| "cctv near me" (Kandy users) | `/cctv-installation-kandy/` |
| "cctv installer kandy" | `/cctv-installation-kandy/` |
| "home cctv kandy" | `/cctv-installation-kandy/` |
| "commercial cctv kandy" | `/cctv-installation-kandy/` |

### Pending Items

- [ ] Add real project photos to Dangolla page
- [ ] Confirm and publish Ampitiya project (change to index,follow, add to sitemap)
- [ ] Confirm additional service areas for Kandy landing page
- [ ] Add hero image to Kandy landing page
- [ ] Create OG social image specific to Kandy CCTV page (1200×630px)

