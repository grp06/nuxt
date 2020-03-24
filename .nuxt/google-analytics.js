import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async (ctx, inject) => {
  const options = {"dev":true,"debug":{"sendHitTask":false},"id":"UA-52019876-6","autoTracking":{"screenview":true}}

  if (typeof options.asyncID === 'function') {
    options.id = await options.asyncID(ctx)
  }

  Vue.use(VueAnalytics, {...{ router: ctx.app.router }, ...options})

  ctx.$ga = Vue.$ga
  inject('ga', Vue.$ga)
}
