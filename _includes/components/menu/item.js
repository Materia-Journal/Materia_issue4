/**
 * Renders a menu item
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 * @property      {Object}  data Page data
 * @property      {String}  title Page title
 * @property      {String}  url Page url
 */

module.exports = function(eleventyConfig) {
  const icon = eleventyConfig.getFilter('icon')
  const pageTitle = eleventyConfig.getFilter('pageTitle')

  return function(params) {
    const { currentURL, page } = params
    const { data, url } = page
    const { label, layout, peer_review: peerReview, title } = data

    const titleText = pageTitle({ label, title })
    const peerReviewIcon = peerReview ? icon({ type: 'microscope', description: 'Peer Reviewed' }) : ''
    
    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    const isPage = !!layout
    return isPage
      ? `<a href="${url}" class="${currentURL === url ? 'active' : ''}">${titleText}${peerReviewIcon}</a>`
      : titleText
  }
}