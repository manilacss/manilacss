import $ from '../../node_modules/jquery'

window.$ = window.jQuery = $

require('./behaviors/*.js', {mode: 'expand'})
