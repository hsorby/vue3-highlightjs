import hljs from 'highlight.js'

function installVue3Highlightjs(app, options = {}) {
  app.directive('highlightjs', (el, binding) => {
    const codeNodes = el.querySelectorAll('code')

    for (let i = 0; i < codeNodes.length; i++) {
      const codeNode = codeNodes[i]

      if (typeof binding.value === 'string') {
        codeNode.textContent = binding.value
      }

      hljs.highlightElement(codeNode)
    }
  })
}

export { installVue3Highlightjs }
