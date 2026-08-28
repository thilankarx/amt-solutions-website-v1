import json
import os
import re
import urllib.parse
from datetime import datetime

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRODUCTS_JSON_PATH = os.path.join(BASE_DIR, 'assets', 'data', 'products.json')
TEMPLATE_PATH = os.path.join(BASE_DIR, 'shop', 'template.html')
SHOP_INDEX_PATH = os.path.join(BASE_DIR, 'shop', 'index.html')
SITEMAP_PATH = os.path.join(BASE_DIR, 'sitemap.xml')

def escape_html(s):
    if not s:
        return ""
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&#039;")

def generate_product_card(p):
    whatsapp_text = f"Hi AMT Solutions, I would like to inquire about the {p.get('brand', 'Hikvision')} {p.get('model')} ({p.get('name')}) for a property in Kandy / Sri Lanka."
    whatsapp_url = f"https://wa.me/94773411861?text={urllib.parse.quote(whatsapp_text)}"
    
    highlights = p.get('highlights', [])[:3]
    highlights_html = "".join([f"<li>{escape_html(h)}</li>" for h in highlights])
    
    badge = p.get('badge') or p.get('subCategoryName')
    
    price_html = f"LKR {escape_html(p['price'])}" if p.get('price') else "Contact for Price"
    stock_color = "var(--green)" if p.get('stock') else "var(--muted)"
    stock_html = escape_html(p.get('stock', 'Check Availability'))
    
    product_url = f"/shop/{p['id']}/"
    
    # We change the onclick handler to a standard href link, but we'll add a class to let JS intercept it
    return f"""
        <article class="shop-card" data-product-id="{p['id']}" id="product-{p['id']}">
          <a href="{product_url}" class="shop-card-link-wrapper shop-card-media" data-modal-trigger="{p['id']}">
            <span class="shop-badge">{escape_html(badge)}</span>
            <img src="{p['image']}" alt="{escape_html(p['brand'])} {escape_html(p['model'])} {escape_html(badge)}" 
                 class="shop-card-img" width="400" height="400" loading="lazy" decoding="async" 
                 onerror="this.onerror=null;this.src='/assets/img/products/product-placeholder.jpg';">
            <span class="shop-card-view-btn">View Specifications</span>
          </a>
          <div class="shop-card-body">
            <div class="shop-card-category">{escape_html(p['brand'])} · {escape_html(p.get('subCategoryName'))}</div>
            <a href="{product_url}" class="shop-card-link-wrapper" data-modal-trigger="{p['id']}"><h3 class="shop-card-model">{escape_html(p['model'])}</h3></a>
            <h4 class="shop-card-name">{escape_html(p['name'])}</h4>
            
            <ul class="shop-card-highlights">
              {highlights_html}
            </ul>

            <div class="shop-card-pricing" style="margin-bottom: 1rem;">
              <strong>{price_html}</strong>
              <span class="shop-stock-status" style="margin-left: 10px; font-size: 0.8em; color: {stock_color};">{stock_html}</span>
            </div>

            <div class="shop-card-actions">
              <a href="{whatsapp_url}" target="_blank" rel="noopener noreferrer" class="button button-small shop-btn-whatsapp" aria-label="Enquire via WhatsApp about {escape_html(p['model'])}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.155-.544-1.874-.775-3.078-2.695-3.171-2.82-.094-.124-.761-1.013-.761-1.931 0-.919.481-1.371.652-1.558.172-.187.375-.234.5-.234.125 0 .25.002.359.007.114.005.267-.043.418.321.156.375.534 1.302.581 1.396.047.094.078.203.016.328-.063.125-.094.203-.188.312-.094.109-.197.244-.282.328-.094.093-.192.195-.082.383.11.187.487.804 1.045 1.3 0.718.639 1.323.837 1.51.93.187.094.297.078.406-.047.11-.125.469-.546.594-.734.125-.187.25-.156.422-.093.172.062 1.09.514 1.278.608.188.094.313.141.359.219.047.078.047.452-.097.857z"/>
                </svg>
                WhatsApp Inquiry
              </a>
              <a href="{product_url}" class="button button-small button-secondary shop-btn-details" data-modal-trigger="{p['id']}">
                Specs &amp; Quote
              </a>
            </div>
          </div>
        </article>
    """

def generate_product_page_content(p):
    whatsapp_text = f"Hi AMT Solutions, I am interested in getting a quotation and site installation details for the {p.get('brand', 'Hikvision')} {p.get('model')} ({p.get('name')})."
    whatsapp_url = f"https://wa.me/94773411861?text={urllib.parse.quote(whatsapp_text)}"
    
    badge = p.get('badge') or p.get('subCategoryName')
    
    specs_html = ''
    if p.get('specs') and len(p['specs']) > 0:
        specs_rows = "".join([f"<tr><th>{escape_html(k)}</th><td>{escape_html(v)}</td></tr>" for k, v in p['specs'].items()])
        specs_html = f"""
        <div class="modal-specs-section" style="margin-top: 2rem;">
          <h3>Technical Specifications</h3>
          <table class="modal-specs-table">
            <tbody>
              {specs_rows}
            </tbody>
          </table>
        </div>
        """
        
    highlights_html = "".join([f"<li>{escape_html(h)}</li>" for h in p.get('highlights', [])])
    
    price_html = f"LKR {escape_html(p['price'])}" if p.get('price') else "Contact for Price"
    stock_color = "var(--green)" if p.get('stock') else "var(--muted)"
    stock_html = escape_html(p.get('stock', 'Check Availability'))
    
    return f"""
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li><a href="/shop/">Shop</a></li>
      <li aria-current="page">{escape_html(p['model'])}</li>
    </ol>
  </div>
</nav>

<section class="section" style="padding-top: 2rem; padding-bottom: 4rem;">
  <div class="container">
    <div class="product-page-layout">
      <div class="modal-product-layout" style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
        <div class="modal-product-media" style="position: relative;">
          <img src="{p['image']}" alt="{escape_html(p['brand'])} {escape_html(p['model'])} {escape_html(badge)}" 
               class="modal-product-img" onerror="this.onerror=null;this.src='/assets/img/products/product-placeholder.jpg';" style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--line);">
          <div class="modal-product-badge">{escape_html(badge)}</div>
          <div class="modal-brand-tag" style="margin-top: 1rem; font-weight: 600; color: var(--primary);">{escape_html(p['brand'])} Official Security Technology</div>
        </div>
        <div class="modal-product-info">
          <span class="modal-category">{escape_html(p.get('categoryName', ''))} · {escape_html(p.get('subCategoryName', ''))}</span>
          <h1 class="modal-title" style="font-size: 2.2rem; margin-top: 0.5rem;">{escape_html(p['model'])}</h1>
          <p class="modal-subtitle" style="font-size: 1.1rem; color: var(--muted); margin-bottom: 1.5rem;">{escape_html(p['name'])}</p>
          
          <div class="modal-pricing" style="margin-top: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--line);">
            <span style="font-size: 1.8rem; font-weight: 800;">{price_html}</span>
            <span style="margin-left: 1rem; color: {stock_color}; font-weight: 600;">{stock_html}</span>
          </div>
          
          <div class="modal-description" style="line-height: 1.6; margin-bottom: 1.5rem;">
            <p>{escape_html(p['description'])}</p>
          </div>

          <div class="modal-highlights" style="margin-bottom: 2rem;">
            <h4>Key Features &amp; Highlights</h4>
            <ul class="check-list" style="margin-top: 0.8rem;">
              {highlights_html}
            </ul>
          </div>

          <div class="modal-inquiry-box" style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid var(--line);">
            <div class="modal-inquiry-header" style="margin-bottom: 1.2rem;">
              <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.5rem;">Need Pricing or On-Site Installation in Sri Lanka?</strong>
              <p style="margin: 0; color: var(--muted); font-size: 0.95rem;">AMT Solutions provides official supply, cabling, setup, and warranty support in Kandy, Central Province, and island-wide.</p>
            </div>
            <div class="button-row" style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="{whatsapp_url}" target="_blank" rel="noopener noreferrer" class="button shop-btn-whatsapp" style="flex: 1; justify-content: center;">
                WhatsApp for Instant Quote
              </a>
              <a href="tel:+94773411861" class="button button-secondary" style="flex: 1; justify-content: center;">
                Call +94 77 341 1861
              </a>
            </div>
          </div>
        </div>
      </div>
      {specs_html}
    </div>
  </div>
</section>
<style>
@media (min-width: 768px) {{
  .modal-product-layout {{
    grid-template-columns: 1fr 1fr !important;
  }}
}}
</style>
    """

def update_sitemap(products):
    if not os.path.exists(SITEMAP_PATH):
        return
    with open(SITEMAP_PATH, 'r', encoding='utf-8') as f:
        sitemap = f.read()
    
    # Simple check to avoid duplicates if re-run
    for p in products:
        url = f"https://amtsolutions.lk/shop/{p['id']}/"
        if url not in sitemap:
            # We want to insert it before </urlset>
            url_entry = f"""
  <url>
    <loc>{url}</loc>
    <lastmod>{datetime.now().strftime('%Y-%m-%d')}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>"""
            sitemap = sitemap.replace('</urlset>', f"{url_entry}\n</urlset>")
    
    with open(SITEMAP_PATH, 'w', encoding='utf-8') as f:
        f.write(sitemap)

def main():
    print("Building shop static pages...")
    with open(PRODUCTS_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    products = data.get('products', [])
    
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    # 1. Generate main /shop/index.html
    grid_html = "".join([generate_product_card(p) for p in products])
    
    # Replace grid placeholder
    # In template.html it might be inside <div id="shop-product-grid" class="shop-grid">
    # Let's replace the content between <div id="shop-product-grid" class="shop-grid"> and </div>
    shop_index = re.sub(r'(<div id="shop-product-grid" class="shop-grid">).*?(</div>)', f'\\1\n{grid_html}\n\\2', template, flags=re.DOTALL)
    
    # Replace count placeholder
    shop_index = shop_index.replace('<span id="shop-product-count">Loading products...</span>', f'<span id="shop-product-count">Showing {len(products)} Products</span>')
    
    with open(SHOP_INDEX_PATH, 'w', encoding='utf-8') as f:
        f.write(shop_index)
        
    print(f"Generated {SHOP_INDEX_PATH} with {len(products)} products.")

    # 2. Generate individual product pages
    for p in products:
        product_dir = os.path.join(BASE_DIR, 'shop', p['id'])
        os.makedirs(product_dir, exist_ok=True)
        
        product_html = template
        
        # Replace title and meta tags
        title = f"{escape_html(p['name'])} - Shop | AMT Solutions"
        desc = escape_html(p['description'])
        url = f"https://amtsolutions.lk/shop/{p['id']}/"
        img = f"https://amtsolutions.lk{p['image']}"
        
        product_html = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', product_html)
        product_html = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{desc}">', product_html)
        product_html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{url}">', product_html)
        product_html = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{title}">', product_html)
        product_html = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{desc}">', product_html)
        product_html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{url}">', product_html)
        product_html = re.sub(r'<meta property="og:image" content=".*?">', f'<meta property="og:image" content="{img}">', product_html)
        product_html = re.sub(r'<meta name="twitter:title" content=".*?">', f'<meta name="twitter:title" content="{title}">', product_html)
        product_html = re.sub(r'<meta name="twitter:description" content=".*?">', f'<meta name="twitter:description" content="{desc}">', product_html)
        
        # Replace main content
        main_content = generate_product_page_content(p)
        
        # Find the <main id="main"> tag and replace everything inside it up to </main>
        product_html = re.sub(r'<main id="main">.*?</main>', f'<main id="main">\n{main_content}\n  </main>', product_html, flags=re.DOTALL)
        
        # Also clean up the product modal section since it's not needed on the individual product page
        product_html = re.sub(r'<!-- Product Detail Modal Dialog -->.*?</div>\s*</div>', '', product_html, flags=re.DOTALL)
        
        product_index_path = os.path.join(product_dir, 'index.html')
        with open(product_index_path, 'w', encoding='utf-8') as f:
            f.write(product_html)
            
    print(f"Generated {len(products)} individual product pages.")
    
    # 3. Update Sitemap
    update_sitemap(products)
    print("Updated sitemap.xml")
    
if __name__ == '__main__':
    main()
