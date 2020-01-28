// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
// }

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

document.addEventListener("DOMContentLoaded", (e:any) => {

    // Add the current year to the footer credit
  let date: Date = new Date();
  const year = date.getFullYear();
  let yearContent: any = document.querySelector("#year");
  yearContent.innerHTML = year;

  // Change the typed value of the first letter to uppercase for input fields and lowercase for email fields
  document.querySelector("#firstName")!.onchange = (e:any) => {
    let val:any = document.querySelector("#firstName")!.value;
    const regexp: RegExp = /\b[a-z]/g;

    val = val.charAt(0).toUpperCase() + val.substr(1);
  };

  document.querySelector("#lastName")!.onchange = (e:any) => {
    let val:any = document.querySelector("#lastName")!.value;
    const regexp: RegExp = /\b[a-z]/g;

    val = val.charAt(0).toUpperCase() + val.substr(1);
  };

  document.querySelector("#email")!.onchange = (e:any) => {
    let val:any = document.querySelector("#email")!.value;
    const regexp: RegExp = /\b[a-z]/g;

    val = val.toLowerCase();
  };

  const form = document.querySelector("form");
  // On Form Submit
  form!.addEventListener("submit", e => {
    let forms = document.getElementsByClassName("needs-validation");
    // Check to see if form has validation errors
    let validation = Array.prototype.filter.call(forms, form => {
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });

    // Get the referrer value from the URL
    const referrer = window.location.href.slice(
      window.location.href.indexOf("?") + 1
    );

    // If form doesn't have validation errors
    if (form!.checkValidity() === true) {
      e.preventDefault();

      // change the button color and add the loading class
      document.querySelector("button")!.classList.remove("btn-danger");
      document.querySelector("button")!.classList.add("btn-primary");
      document.querySelector("button")!.innerHTML =
        'Loading <span class="spinner"></span><i class="fa fa-spinner fa-spin"></i></span>';

        //@ts-ignore
      const formdata = new FormData(form);

      formdata.append("referrer", referrer);

      // initiate a fetch call
    //   fetch("scripts/paynow.php", {
    //     method: "post",
    //     body: formdata
    //   })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       // console.log(data)
    //       if (data === "user_exists") {
    //         swal(
    //           "Already Registered",
    //           "You have already registered for the conference.",
    //           "warning"
    //         );
    //         setTimeout(() => {
    //           window.location = "https://awlo.org/awlc/inviteafriend";
    //         }, 3000);
    //       } else {
    //         window.location.href = data;
    //       }
    //     })
    //     .catch(error => {
    //       console.log("The Request Failed", error);
    //     });
    }
  });
});
