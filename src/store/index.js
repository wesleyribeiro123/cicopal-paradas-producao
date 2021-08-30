import { createStore } from 'vuex'
import shared from './modules/shared'
import forms from './modules/forms'

const modules = {
  shared,
  forms
}

export default createStore({
  strict: false,
  modules: modules
})
