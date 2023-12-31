const path = require('path')

/**
 * Test if a figure uses an image-service
 *
 * @param  {Object} figure
 * @return {Boolean}
 */
module.exports = function(figure) {
  const { src='' } = figure
  return path.parse(src) === 'info.json'
}
