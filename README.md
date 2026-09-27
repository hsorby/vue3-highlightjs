# vue3-highlightjs

[Vue.js 3.x](https://vuejs.org/) syntax highlighting made easy, using [highlight.js](https://highlightjs.org/).

## Install

```bash
npm install --save @hsorby/vue3-highlightjs
```

## Usage

```javascript
import { createApp } from 'vue'
import { installVue3Highlightjs } from '@hsorby/vue3-highlightjs'
import 'highlight.js/styles/solarized-light.css'

const app = createApp({})

app.use(installVue3Highlightjs)
```

In a single-file component:

```html
<pre v-highlightjs="sourcecode"><code class="javascript"></code></pre>

<pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>
```

## Languages

To keep bundles small, only the highlight.js core and the following languages are
registered by default:

`bash`, `cmake`, `cpp`, `javascript`, `json`, `markdown`, `plaintext`, `python`, `shell`, `xml`

(plus their aliases, e.g. `c++`, `py`, `html`, `console`).

Register extra languages with the `languages` option:

```javascript
import rust from 'highlight.js/lib/languages/rust'
import yaml from 'highlight.js/lib/languages/yaml'

app.use(installVue3Highlightjs, { languages: { rust, yaml } })
```

Set `defaultLanguages: false` to register only the languages you pass in.

The underlying highlight.js instance is also exported as `hljs` if you need to
register languages or configure highlight.js directly:

```javascript
import { hljs } from '@hsorby/vue3-highlightjs'
```

## Upgrading from 1.x

Version 1.x bundled every highlight.js language (~900 kB minified). Version 2
registers only the default set above; code blocks in other languages fall back
to auto-detection among the registered languages. Add any other languages you
need with the `languages` option.
