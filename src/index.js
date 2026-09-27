// Import only the highlight.js core and register a curated set of languages.
// Importing 'highlight.js' directly pulls in all ~190 languages (~900 kB
// minified), most of which are never used.
import hljs from 'highlight.js/lib/core'

import bash from 'highlight.js/lib/languages/bash'
import cmake from 'highlight.js/lib/languages/cmake'
import cpp from 'highlight.js/lib/languages/cpp'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import plaintext from 'highlight.js/lib/languages/plaintext'
import python from 'highlight.js/lib/languages/python'
import shell from 'highlight.js/lib/languages/shell'
import xml from 'highlight.js/lib/languages/xml'

const defaultLanguages = {
  bash,
  cmake,
  cpp,
  javascript,
  json,
  markdown,
  plaintext,
  python,
  shell,
  xml,
}

function registerLanguages(languages) {
  for (const [name, language] of Object.entries(languages)) {
    if (!hljs.getLanguage(name)) {
      hljs.registerLanguage(name, language)
    }
  }
}

/**
 * Install the v-highlightjs directive.
 *
 * @param {Object} app - The Vue application.
 * @param {Object} [options]
 * @param {Object} [options.languages] - Extra languages to register, as a map of
 *   name -> highlight.js language definition, e.g.
 *   `{ rust: (await import('highlight.js/lib/languages/rust')).default }`.
 * @param {boolean} [options.defaultLanguages=true] - Register the default set
 *   of languages (bash, cmake, cpp, javascript, json, markdown, plaintext,
 *   python, shell, xml). Set to false to register only `options.languages`.
 */
function installVue3Highlightjs(app, options = {}) {
  if (options.defaultLanguages !== false) {
    registerLanguages(defaultLanguages)
  }
  if (options.languages) {
    registerLanguages(options.languages)
  }

  app.directive('highlightjs', (el, binding) => {
    const codeNodes = el.querySelectorAll('code')

    for (let i = 0; i < codeNodes.length; i++) {
      const codeNode = codeNodes[i]

      if (typeof binding.value === 'string') {
        codeNode.textContent = binding.value
        // The content has been replaced, so clear highlight.js's marker to
        // allow the new content to be highlighted.
        delete codeNode.dataset.highlighted
      }

      if (!codeNode.dataset.highlighted) {
        hljs.highlightElement(codeNode)
      }
    }
  })
}

export { installVue3Highlightjs, hljs }
