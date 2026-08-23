/**
 * AMT Solutions — Interactive Product Catalog & Inquiry Engine
 * Multi-Category Support (CCTV, POS, Fire Alarm, Access Control, Networking, etc.)
 */

(() => {
  let catalog = { departments: [], products: [] };
  let currentDept = 'all';
  let currentSub = 'all';
  let currentFilter = 'all';
  let searchQuery = '';

  const elements = {
    deptNav: document.getElementById('shop-departments'),
    subFilters: document.getElementById('shop-subfilters'),
    searchInput: document.getElementById('shop-search'),
    searchClear: document.getElementById('shop-search-clear'),
    productGrid: document.getElementById('shop-product-grid'),
    productCount: document.getElementById('shop-product-count'),
    emptyState: document.getElementById('shop-empty-state'),
    modal: document.getElementById('product-modal'),
    modalBackdrop: document.getElementById('product-modal-backdrop'),
    modalClose: document.getElementById('product-modal-close'),
    modalBody: document.getElementById('product-modal-body')
  };

  // 1. Fetch & Initialize Catalog Data
  async function initCatalog() {
    try {
      const response = await fetch('/assets/data/products.json');
      if (!response.ok) throw new Error('Failed to load products');
      catalog = await response.json();
      
      renderDepartments();
      handleUrlParams();
      applyFilters();
      setupEventListeners();
    } catch (err) {
      console.error('Error initializing shop catalog:', err);
      if (elements.productGrid) {
        elements.productGrid.innerHTML = `
          <div class="shop-error">
            <p>Unable to load product catalog. Please try refreshing or contact us directly.</p>
            <a class="button" href="https://wa.me/94773411861" target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
          </div>
        `;
      }
    }
  }

  // 2. Render Top-Level Department Tabs
  function renderDepartments() {
    if (!elements.deptNav) return;

    elements.deptNav.innerHTML = catalog.departments.map(dept => {
      const count = dept.id === 'all' 
        ? catalog.products.length 
        : catalog.products.filter(p => p.category === dept.id).length;
      
      const isActive = dept.id === currentDept;
      return `
        <button type="button" class="shop-dept-tab ${isActive ? 'is-active' : ''}" data-dept="${dept.id}" aria-selected="${isActive}">
          <span class="shop-dept-icon">${dept.icon || '📦'}</span>
          <span class="shop-dept-name">${dept.name}</span>
          <span class="shop-dept-badge">${count}</span>
        </button>
      `;
    }).join('');
  }

  // 3. Render Subcategory & Feature Filter Pills
  function renderSubFilters() {
    if (!elements.subFilters) return;

    const deptObj = catalog.departments.find(d => d.id === currentDept);
    
    // If viewing all, or a department without subcategories, provide general filter pills
    let subOptions = [];
    if (deptObj && deptObj.subCategories && deptObj.subCategories.length > 0) {
      subOptions = [
        { id: 'all', name: `All ${deptObj.name}` },
        ...deptObj.subCategories.filter(s => !s.id.startsWith('all-'))
      ];
    } else {
      subOptions = [
        { id: 'all', name: 'All Products' },
        { id: 'bullet-cameras', name: 'Bullet IP Cameras' },
        { id: 'dome-cameras', name: 'Vandal Domes' },
        { id: 'turret-cameras', name: 'Turret Cameras' },
        { id: 'ptz-cameras', name: 'PTZ & Solar' },
        { id: 'nvr-recorders', name: 'NVR Recorders' }
      ];
    }

    elements.subFilters.innerHTML = subOptions.map(sub => {
      const isActive = sub.id === currentSub;
      return `
        <button type="button" class="shop-filter-pill ${isActive ? 'is-active' : ''}" data-sub="${sub.id}">
          ${sub.name}
        </button>
      `;
    }).join('');
  }

  // 4. Filter & Render Products
  function applyFilters() {
    renderSubFilters();

    const q = searchQuery.toLowerCase().trim();
    
    const filtered = catalog.products.filter(p => {
      // Department match
      if (currentDept !== 'all' && p.category !== currentDept) {
        return false;
      }
      // Subcategory match
      if (currentSub !== 'all' && p.subCategory !== currentSub) {
        return false;
      }
      // Search query match
      if (q) {
        const text = [
          p.model,
          p.name,
          p.brand,
          p.badge,
          p.categoryName,
          p.subCategoryName,
          p.resolution || '',
          p.channels || '',
          ...(p.highlights || []),
          p.description
        ].join(' ').toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    renderProductGrid(filtered);
    updateCountDisplay(filtered.length);
  }

  function renderProductGrid(products) {
    if (!elements.productGrid) return;

    if (products.length === 0) {
      elements.productGrid.style.display = 'none';
      if (elements.emptyState) {
        elements.emptyState.style.display = 'block';
        const emptyQuery = elements.emptyState.querySelector('[data-empty-query]');
        if (emptyQuery) emptyQuery.textContent = searchQuery ? `for "${searchQuery}"` : '';
      }
      return;
    }

    elements.productGrid.style.display = 'grid';
    if (elements.emptyState) elements.emptyState.style.display = 'none';

    elements.productGrid.innerHTML = products.map(p => {
      const whatsappText = encodeURIComponent(
        `Hi AMT Solutions, I would like to inquire about the ${p.brand || 'Hikvision'} ${p.model} (${p.name}) for a property in Kandy / Sri Lanka.`
      );
      const whatsappUrl = `https://wa.me/94773411861?text=${whatsappText}`;

      const highlightsList = (p.highlights || []).slice(0, 3).map(h => `<li>${escapeHtml(h)}</li>`).join('');

      return `
        <article class="shop-card" data-product-id="${p.id}" id="product-${p.id}">
          <div class="shop-card-media" onclick="window.shopApp.openProductModal('${p.id}')">
            <span class="shop-badge">${escapeHtml(p.badge || p.subCategoryName)}</span>
            <img src="${p.image}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.model)} ${escapeHtml(p.badge || 'Product')}" 
                 class="shop-card-img" width="400" height="400" loading="lazy" decoding="async" 
                 onerror="this.onerror=null;this.src='/assets/img/products/product-placeholder.jpg';">
            <span class="shop-card-view-btn">View Specifications</span>
          </div>
          <div class="shop-card-body">
            <div class="shop-card-category">${escapeHtml(p.brand)} · ${escapeHtml(p.subCategoryName)}</div>
            <h3 class="shop-card-model" onclick="window.shopApp.openProductModal('${p.id}')">${escapeHtml(p.model)}</h3>
            <h4 class="shop-card-name">${escapeHtml(p.name)}</h4>
            
            <ul class="shop-card-highlights">
              ${highlightsList}
            </ul>

            <div class="shop-card-pricing" style="margin-bottom: 1rem;">
              <strong>${p.price ? 'LKR ' + escapeHtml(p.price) : 'Contact for Price'}</strong>
              <span class="shop-stock-status" style="margin-left: 10px; font-size: 0.8em; color: ${p.stock ? 'var(--green)' : 'var(--muted)'};">${escapeHtml(p.stock || 'Check Availability')}</span>
            </div>

            <div class="shop-card-actions">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="button button-small shop-btn-whatsapp" aria-label="Enquire via WhatsApp about ${escapeHtml(p.model)}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.155-.544-1.874-.775-3.078-2.695-3.171-2.82-.094-.124-.761-1.013-.761-1.931 0-.919.481-1.371.652-1.558.172-.187.375-.234.5-.234.125 0 .25.002.359.007.114.005.267-.043.418.321.156.375.534 1.302.581 1.396.047.094.078.203.016.328-.063.125-.094.203-.188.312-.094.109-.197.244-.282.328-.094.093-.192.195-.082.383.11.187.487.804 1.045 1.3 0.718.639 1.323.837 1.51.93.187.094.297.078.406-.047.11-.125.469-.546.594-.734.125-.187.25-.156.422-.093.172.062 1.09.514 1.278.608.188.094.313.141.359.219.047.078.047.452-.097.857z"/>
                </svg>
                WhatsApp Inquiry
              </a>
              <button type="button" class="button button-small button-secondary shop-btn-details" onclick="window.shopApp.openProductModal('${p.id}')">
                Specs &amp; Quote
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateCountDisplay(count) {
    if (elements.productCount) {
      const deptObj = catalog.departments.find(d => d.id === currentDept);
      const deptLabel = deptObj && deptObj.id !== 'all' ? deptObj.name : 'Products';
      elements.productCount.textContent = `Showing ${count} ${deptLabel}`;
    }
  }

  // 5. Product Detail Modal Engine
  function openProductModal(productId) {
    const product = catalog.products.find(p => p.id === productId);
    if (!product || !elements.modal || !elements.modalBody) return;

    const whatsappText = encodeURIComponent(
      `Hi AMT Solutions, I am interested in getting a quotation and site installation details for the ${product.brand || 'Hikvision'} ${product.model} (${product.name}).`
    );
    const whatsappUrl = `https://wa.me/94773411861?text=${whatsappText}`;

    // Generate specifications table
    let specsHtml = '';
    if (product.specs && Object.keys(product.specs).length > 0) {
      specsHtml = `
        <div class="modal-specs-section">
          <h3>Technical Specifications</h3>
          <table class="modal-specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <th>${escapeHtml(key)}</th>
                  <td>${escapeHtml(val)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    const highlightsHtml = (product.highlights || []).map(h => `<li>${escapeHtml(h)}</li>`).join('');

    elements.modalBody.innerHTML = `
      <div class="modal-product-layout">
        <div class="modal-product-media">
          <img src="${product.image}" alt="${escapeHtml(product.brand)} ${escapeHtml(product.model)} ${escapeHtml(product.badge || 'Product')}" 
               class="modal-product-img" onerror="this.onerror=null;this.src='/assets/img/products/product-placeholder.jpg';">
          <div class="modal-product-badge">${escapeHtml(product.badge || product.subCategoryName)}</div>
          <div class="modal-brand-tag">${escapeHtml(product.brand)} Official Security Technology</div>
        </div>
        <div class="modal-product-info">
          <span class="modal-category">${escapeHtml(product.categoryName)} · ${escapeHtml(product.subCategoryName)}</span>
          <h2 class="modal-title">${escapeHtml(product.model)}</h2>
          <p class="modal-subtitle">${escapeHtml(product.name)}</p>
          
          <div class="modal-pricing" style="margin-top: 1rem; margin-bottom: 1rem;">
            <span style="font-size: 1.5rem; font-weight: 800;">${product.price ? 'LKR ' + escapeHtml(product.price) : 'Contact for Price'}</span>
            <span style="margin-left: 1rem; color: ${product.stock ? 'var(--green)' : 'var(--muted)'};">${escapeHtml(product.stock || 'Check Availability')}</span>
          </div>
          
          <div class="modal-description">
            <p>${escapeHtml(product.description)}</p>
          </div>

          <div class="modal-highlights">
            <h4>Key Features &amp; Highlights</h4>
            <ul class="check-list">
              ${highlightsHtml}
            </ul>
          </div>

          <div class="modal-inquiry-box">
            <div class="modal-inquiry-header">
              <strong>Need Pricing or On-Site Installation in Sri Lanka?</strong>
              <p>AMT Solutions provides official supply, cabling, setup, and warranty support in Kandy, Central Province, and island-wide.</p>
            </div>
            <div class="button-row">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="button shop-btn-whatsapp" style="flex:1;">
                WhatsApp for Instant Quote
              </a>
              <a href="tel:+94773411861" class="button button-secondary" style="flex:1;">
                Call +94 77 341 1861
              </a>
            </div>
          </div>
        </div>
      </div>
      ${specsHtml}
    `;

    elements.modal.classList.add('is-open');
    if (elements.modalBackdrop) elements.modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Update URL query parameter without page reload
    const url = new URL(window.location);
    url.searchParams.set('model', product.model);
    window.history.replaceState({}, '', url);
  }

  function closeProductModal() {
    if (!elements.modal) return;
    elements.modal.classList.remove('is-open');
    if (elements.modalBackdrop) elements.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';

    const url = new URL(window.location);
    url.searchParams.delete('model');
    window.history.replaceState({}, '', url);
  }

  // 6. Event Listeners Setup
  function setupEventListeners() {
    // Department navigation click
    if (elements.deptNav) {
      elements.deptNav.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-dept]');
        if (!btn) return;
        currentDept = btn.getAttribute('data-dept');
        currentSub = 'all';
        renderDepartments();
        applyFilters();

        const url = new URL(window.location);
        if (currentDept === 'all') url.searchParams.delete('cat');
        else url.searchParams.set('cat', currentDept);
        url.searchParams.delete('sub');
        window.history.replaceState({}, '', url);
      });
    }

    // Subcategory filter pill click
    if (elements.subFilters) {
      elements.subFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-sub]');
        if (!btn) return;
        currentSub = btn.getAttribute('data-sub');
        applyFilters();

        const url = new URL(window.location);
        if (currentSub === 'all') url.searchParams.delete('sub');
        else url.searchParams.set('sub', currentSub);
        window.history.replaceState({}, '', url);
      });
    }

    // Search input
    if (elements.searchInput) {
      let debounceTimer;
      elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value;
        if (elements.searchClear) {
          elements.searchClear.style.display = searchQuery ? 'block' : 'none';
        }
        debounceTimer = setTimeout(() => {
          applyFilters();
        }, 200);
      });
    }

    // Clear search
    if (elements.searchClear) {
      elements.searchClear.addEventListener('click', () => {
        if (elements.searchInput) {
          elements.searchInput.value = '';
          searchQuery = '';
          elements.searchClear.style.display = 'none';
          applyFilters();
        }
      });
    }

    // Modal close
    if (elements.modalClose) {
      elements.modalClose.addEventListener('click', closeProductModal);
    }
    if (elements.modalBackdrop) {
      elements.modalBackdrop.addEventListener('click', closeProductModal);
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modal && elements.modal.classList.contains('is-open')) {
        closeProductModal();
      }
    });
  }

  // 7. URL Query Parameters Handler
  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const sub = params.get('sub');
    const model = params.get('model');

    if (cat && catalog.departments.some(d => d.id === cat)) {
      currentDept = cat;
      renderDepartments();
    }
    if (sub) {
      currentSub = sub;
    }
    if (model) {
      const match = catalog.products.find(p => p.model.toLowerCase() === model.toLowerCase() || p.id === model.toLowerCase());
      if (match) {
        setTimeout(() => openProductModal(match.id), 100);
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose global controller
  window.shopApp = {
    openProductModal,
    closeProductModal,
    setDepartment: (dept) => {
      currentDept = dept;
      currentSub = 'all';
      renderDepartments();
      applyFilters();
    }
  };

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalog);
  } else {
    initCatalog();
  }
})();
