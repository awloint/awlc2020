// Load Particle.js
// @ts-ignore
particlesJS.load("particles-js", "scripts/particles.json", () => {
  console.log("callback - particles.js config loaded");
});
// Add intl-tel-input
// @ts-ignore
window.intlTelInputGlobals.loadUtils("scripts/utils.js");
var input = document.querySelector("#phone");
//@ts-ignore
window.intlTelInput(input, {
  initialCountry: "ng",
  separateDialCode: true,
  hiddenInput: "full_phone",
  utilsScript: "scripts/utils.js"
});
