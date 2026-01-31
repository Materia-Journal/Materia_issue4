const { html } = require('~lib/common-tags')

/**
 * Google Analytics 4
 * @param {Object} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  const { googleId } = eleventyConfig.globalData.config.analytics || {}

  return function () {
    if (!googleId) return ''

    return html`
      <!-- Google tag (GA4) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${googleId}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        gtag('js', new Date());
        gtag('config', '${googleId}', {
          send_page_view: true
        });

        document.addEventListener('DOMContentLoaded', function () {
          var links = document.querySelectorAll(
            "a[href$='pdf'],a[href$='rtf'],a[href$='doc'],a[href$='xls'],a[href$='csv'],a[href$='json'],a[href$='zip'],a[href$='ppt'],a[href*='epub'],a[href*='mobi']"
          );

          for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (e) {
              var href = this.getAttribute('href');
              gtag('event', 'file_download', {
                file_name: href,
                link_url: href
              });
            });
          }
        }, { once: true });
      </script>
    `
  }
}
