const dateInput = document.getElementById("appointment-date");
const datePlaceholder = document.querySelector(".date-placeholder");

dateInput.addEventListener("change", function () {
    if (dateInput.value) {
        datePlaceholder.style.display = "none";
    } else {
        datePlaceholder.style.display = "block";
    }
});


