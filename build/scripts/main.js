'use strict'
// Load Particle.js
particlesJS.load('particles-js', 'scripts/particles.json', function () {
  console.log('callback - particles.js config loaded')
})
// Add intl-tel-input
window.intlTelInputGlobals.loadUtils('scripts/utils.js')
var input = document.querySelector('#phone')
window.intlTelInput(input, {
  initialCountry: 'ng',
  separateDialCode: true,
  hiddenInput: 'full_phone',
  utilsScript: 'scripts/utils.js'
})
