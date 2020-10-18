import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4bda8709 = () => interopDefault(import('../pages/chat.vue' /* webpackChunkName: "pages/chat" */))
const _6bdf5202 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _5950395c = () => interopDefault(import('../pages/how-to-use-chat.vue' /* webpackChunkName: "pages/how-to-use-chat" */))
const _306f9140 = () => interopDefault(import('../pages/how-to-use-todo.vue' /* webpackChunkName: "pages/how-to-use-todo" */))
const _58ebb8b9 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _6b0bbb88 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _5b905ff0 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _6eb55f58 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _ae1b9612 = () => interopDefault(import('../pages/todo.vue' /* webpackChunkName: "pages/todo" */))
const _878ead3a = () => interopDefault(import('../pages/top-description.vue' /* webpackChunkName: "pages/top-description" */))
const _bd37cf1e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chat",
    component: _4bda8709,
    name: "chat"
  }, {
    path: "/contact",
    component: _6bdf5202,
    name: "contact"
  }, {
    path: "/how-to-use-chat",
    component: _5950395c,
    name: "how-to-use-chat"
  }, {
    path: "/how-to-use-todo",
    component: _306f9140,
    name: "how-to-use-todo"
  }, {
    path: "/inspire",
    component: _58ebb8b9,
    name: "inspire"
  }, {
    path: "/login",
    component: _6b0bbb88,
    name: "login"
  }, {
    path: "/profile",
    component: _5b905ff0,
    name: "profile"
  }, {
    path: "/register",
    component: _6eb55f58,
    name: "register"
  }, {
    path: "/todo",
    component: _ae1b9612,
    name: "todo"
  }, {
    path: "/top-description",
    component: _878ead3a,
    name: "top-description"
  }, {
    path: "/",
    component: _bd37cf1e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
