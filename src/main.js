const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();


  let isValid = true;
  const fields = form.querySelectorAll("input, textarea, select");

  fields.forEach(field => {
    field.classList.remove("error");

    // For radio buttons, check if any in the group is checked
    if (field.type === "radio") {
      const radios = form.querySelectorAll(`input[name="${field.name}"]`);
      const checked = Array.from(radios).some(radio => radio.checked);
      if (!checked) {
        radios.forEach(radio => radio.classList.add("error"));
        isValid = false;
      }
    } else if (field.type === "checkbox") {
      if (!field.checked && field.required) {
        field.classList.add("error");
        isValid = false;
      }
    } else {
      if (field.required && !field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      }
    }
  });

  if (isValid) {
    showToast();
  }
});

function showToast() {
  const toast = document.getElementById("success-toast-message");
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
