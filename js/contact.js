document.addEventListener("DOMContentLoaded", () => {

    /**************************************
     SERVICE FROM SERVICES PAGE
    **************************************/

    const serviceSelect = document.getElementById("service");
    const messageField = document.getElementById("message");
    const serviceLabel = document.getElementById("serviceLabel");
    const specificService = document.getElementById("specificService");

    const params = new URLSearchParams(window.location.search);

    const selectedService = params.get("service");
    const selectedIssue = params.get("issue");


    if (serviceSelect && selectedService) {
        serviceSelect.value = selectedService;
    }

    if (specificService && selectedIssue) {
    specificService.value = selectedIssue;
   }


    if (messageField && selectedIssue) {
        messageField.value =
            `Hi, I'm interested in ${selectedIssue} and would like to schedule a service.`;
    }

    function updateServiceLabel() {

    if (!serviceSelect || !serviceLabel) return;

    const selectedOption =
        serviceSelect.options[serviceSelect.selectedIndex];

    serviceLabel.value =
        selectedOption && serviceSelect.value
            ? selectedOption.text
            : "";
}


updateServiceLabel();


if (serviceSelect) {

    serviceSelect.addEventListener(
        "change",
        updateServiceLabel
    );

}




    /**************************************
     FORM
    **************************************/

    const form = document.getElementById("serviceRequestForm");
    const submitButton = document.getElementById("requestAppointmentBtn");
    const formStatus = document.getElementById("formStatus");


    /**************************************
     BOOKING MODAL
    **************************************/

    const bookingModal = document.getElementById("bookingModal");
    const closeBookingModal = document.getElementById("closeBookingModal");
    const bookingModalOverlay = document.getElementById("bookingModalOverlay");


    function openBookingModal() {

        if (!bookingModal) return;

        bookingModal.classList.add("show");
        bookingModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");
    }


function closeModal() {

    if (!bookingModal) return;

    bookingModal.classList.remove("show");

    bookingModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

    // Clear the service request form
    if (form) {
        form.reset();
    }

    // Reset status message
    if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
    }

    // Reset button
    if (submitButton) {

        submitButton.disabled = false;

        submitButton.innerHTML =
            `<i data-lucide="calendar-check"></i>
             <span>Request Appointment</span>`;
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}


/**************************************
 CLOSE MODAL EVENTS
**************************************/

if (closeBookingModal) {
    closeBookingModal.addEventListener("click", closeModal);
}

if (bookingModalOverlay) {
    bookingModalOverlay.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});


    /**************************************
     SEND FORM TO FORMSPREE
    **************************************/

    if (form) {

        form.addEventListener("submit", async (event) => {

            event.preventDefault();


            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }


            if (submitButton) {
                submitButton.disabled = true;

                submitButton.innerHTML =
                    `<span>Sending...</span>`;
            }


            const formData = new FormData(form);


            try {

                const response = await fetch(
                    form.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (!response.ok) {
                    throw new Error("Form submission failed.");
                }


                /**************************************
                 SUCCESS
                **************************************/

                if (formStatus) {

                    formStatus.textContent =
                        "Request received. Now choose your appointment time.";

                    formStatus.classList.add("success");
                }


                if (submitButton) {

                    submitButton.innerHTML =
                        `<i data-lucide="check-circle"></i>
                         <span>Request Sent</span>`;
                }


                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }


                setTimeout(() => {
                    openBookingModal();
                }, 400);

            }

            catch (error) {

                /**************************************
                 ERROR
                **************************************/

                if (formStatus) {

                    formStatus.textContent =
                        "We couldn't send your request. Please try again.";

                    formStatus.classList.add("error");
                }


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        `<i data-lucide="calendar-check"></i>
                         <span>Request Appointment</span>`;
                }


                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }

            }

        });

    }

});