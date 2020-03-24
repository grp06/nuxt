import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_workbox_ce96b9c2 from 'nuxt_plugin_workbox_ce96b9c2' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_googleanalytics_66d984fa from 'nuxt_plugin_googleanalytics_66d984fa' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_webfontloader_4304b47a from 'nuxt_plugin_webfontloader_4304b47a' // Source: ./webfontloader.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Vuybe","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"theme_color":"#ee644d"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Helping you vuybe anywhere, anytime."},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Vuybe"},{"hid":"author","name":"author","content":"Renaud ROHLINGER"},{"hid":"theme-color","name":"theme-color","content":"#ee644d"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Vuybe"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"Vuybe"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Vuybe website"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffav.ico"},{"rel":"preload","href":"\u002Ffonts\u002FBold.otf","as":"font","type":"font\u002Fotf","crossorigin":"true"},{"rel":"preload","href":"\u002Ffonts\u002FDemiBold.otf","as":"font","type":"font\u002Fotf","crossorigin":"true"},{"rel":"preload","href":"\u002Ffonts\u002FRegular.otf","as":"font","type":"font\u002Fotf","crossorigin":"true"},{"rel":"preload","href":"\u002Ffonts\u002FRoundsNeue.css","as":"style"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.4f57577e.json"},{"rel":"shortcut icon","href":"\u002Fimg\u002Ficon-192x192.png"},{"rel":"apple-touch-icon","href":"\u002Fimg\u002Ficon-512x512.png","sizes":"512x512"}],"script":[{"async":true,"src":"https:\u002F\u002Fwww.googletagmanager.com\u002Fgtag\u002Fjs?id=UA-52019876-6"},{"src":"\u002Fjs\u002Fga.js"}],"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_ce96b9c2 === 'function') {
    await nuxt_plugin_workbox_ce96b9c2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_66d984fa === 'function') {
    await nuxt_plugin_googleanalytics_66d984fa(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_webfontloader_4304b47a === 'function') {
    await nuxt_plugin_webfontloader_4304b47a(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
