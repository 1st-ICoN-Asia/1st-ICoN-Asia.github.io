/*
 *
 * City University of Hong Kong
 * ----------------------------
 * News list — fetch, render & paginate
 *
 */

(function () {
  'use strict';

  var PAGE_SIZE = 5;

  var listEl = document.getElementById('news-list');
  var paginationEl = document.getElementById('news-pagination');

  if (!listEl) return; // only run on the news list page

  var baseUrl = (document.querySelector('base') || {}).href || '/';
  var allItems = [];
  var currentPage = 1;

  /* ----- card markup (component-list-3) ----- */
  function buildCard(item) {
    return (
      '<div class="card h-100" data-aos="fade-up">' +
        '<a href="' + baseUrl + item.url + '" role="link">' +
          '<div class="row g-0">' +
            '<div class="col-12 col-md-5 col-lg-4">' +
              '<div class="card-img-top">' +
                '<img class="img-fluid" loading="lazy" src="' + baseUrl + item.image + '" alt="">' +
              '</div>' +
            '</div>' +
            '<div class="col-12 col-md-7 col-lg-8">' +
              '<div class="card-body pt-0">' +
                '<h3 class="card-title">' + escapeHtml(item.title) + '</h3>' +
                '<p class="card-text">' + escapeHtml(item.summary) + '</p>' +
                '<p class="card-date">' + escapeHtml(item.date) + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
  }

  /* ----- render one page ----- */
  function renderPage(page) {
    currentPage = page;
    var start = (page - 1) * PAGE_SIZE;
    var items = allItems.slice(start, start + PAGE_SIZE);

    listEl.innerHTML = items.map(buildCard).join('');
    renderPagination(page);

    if (window.AOS) { AOS.refresh(); }
  }

  /* ----- component-list-pagination ----- */
  function renderPagination(page) {
    if (!paginationEl) return;

    var totalPages = Math.ceil(allItems.length / PAGE_SIZE);

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    /* Build the set of page numbers to show (always first, last, and a
       window of WING pages on either side of current). Gaps become -1. */
    var WING = 2;
    var pages = [];
    var prev = 0;
    for (var i = 1; i <= totalPages; i++) {
      var inWindow = (i === 1 || i === totalPages ||
                      (i >= page - WING && i <= page + WING));
      if (inWindow) {
        if (prev && i - prev > 1) { pages.push(-1); } // ellipsis gap
        pages.push(i);
        prev = i;
      }
    }

    var html = '<div class="component-content"><nav>';

    /* First */
    if (page === 1) {
      html += '<span class="pagination-first inactive">First</span>';
    } else {
      html += '<a class="pagination-first" href="javascript:void(0)" data-page="1">First</a>';
    }

    /* Previous */
    if (page === 1) {
      html += '<span class="pagination-previous inactive">Previous</span>';
    } else {
      html += '<a class="pagination-previous" href="javascript:void(0)" data-page="' + (page - 1) + '">Previous</a>';
    }

    /* numbered pages + ellipsis */
    for (var j = 0; j < pages.length; j++) {
      if (pages[j] === -1) {
        html += '<span class="sxa-paginationnumber" aria-hidden="true">&hellip;</span>';
      } else if (pages[j] === page) {
        html += '<span class="active sxa-paginationnumber">' + pages[j] + '</span>';
      } else {
        html += '<a class="sxa-paginationnumber" href="javascript:void(0)" data-page="' + pages[j] + '">' + pages[j] + '</a>';
      }
    }

    /* Next */
    if (page === totalPages) {
      html += '<span class="pagination-next inactive">Next</span>';
    } else {
      html += '<a class="pagination-next" href="javascript:void(0)" data-page="' + (page + 1) + '">Next</a>';
    }

    /* Last */
    if (page === totalPages) {
      html += '<span class="pagination-last inactive">Last</span>';
    } else {
      html += '<a class="pagination-last" href="javascript:void(0)" data-page="' + totalPages + '">Last</a>';
    }

    html += '</nav></div>';
    paginationEl.innerHTML = html;

    /* bind click handlers */
    var links = paginationEl.querySelectorAll('a[data-page]');
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function (e) {
        e.preventDefault();
        var targetPage = parseInt(this.getAttribute('data-page'), 10);
        if (targetPage < 1 || targetPage > totalPages) return;
        renderPage(targetPage);

        /* Scroll to the page <h1> title, offset by sticky menu height */
        var contentEl = listEl.closest('.cityu-content');
        var titleEl = contentEl ? contentEl.querySelector('h1') : null;
        var scrollTarget = titleEl || listEl;
        var menuEl = document.querySelector('.cityu-menu');
        var menuOffset = (menuEl && window.innerWidth >= 1200) ? menuEl.offsetHeight : 0;
        var top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - menuOffset - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    }
  }

  /* ----- utility: basic HTML escaping ----- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ----- fetch & initialise ----- */
  /* Derive the JSON URL from the page's own directory so it works
     regardless of what <base href> is set to in production. */
  var pageDir = window.location.pathname.replace(/\/[^/]*$/, '/');
  fetch(pageDir + 'news-list.json')
    .then(function (response) {
      if (!response.ok) { throw new Error('Network response was not ok'); }
      return response.json();
    })
    .then(function (data) {
      allItems = data;
      renderPage(1);
    })
    .catch(function () {
      listEl.innerHTML = '<p class="text-muted">Unable to load news at this time. Please try again later.</p>';
    });

})();
