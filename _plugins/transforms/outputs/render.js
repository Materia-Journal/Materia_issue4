const { html } = require('~lib/common-tags')
const fs = require('fs-extra')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const path = require('path')

/**
 * Iterate over output files `epub.js`, html.js`, `pdf.js`, and `print.js`;
 * initialize with `eleventyConfig` and render each with the `data-outputs-include`
 * attribute
 */
module.exports = function (eleventyConfig, dir, params, page) {
  const fileNames = ['epub', 'html', 'pdf', 'print']

  const filePaths = fileNames.flatMap((output) => {
    const filePath = path.join(dir, output)
    return (!fs.existsSync(`${filePath}.js`))
      ? []
      : filePath
  })

  const content = filePaths.flatMap((filePath, index) => {
    const init = require(filePath)
    const renderFn = init(eleventyConfig, { page })
    const component = renderFn(params)
    const fragment = JSDOM.fragment(component)
    return [...fragment.children].map((child) => {
      const fileName = path.parse(filePaths[index]).name
      const outputs = fileName === 'print' ? 'epub,pdf' : fileName
      child.setAttribute('data-outputs-include', outputs)
      return child.outerHTML
    })
  })
  return html`${content}`
}
