const servicesSection = document.querySelector(".services");
const supportBubble = document.getElementById("supportBubble");
const closeBubble = document.getElementById("closeBubble");

if (servicesSection && supportBubble) {

    let bubbleClosed = false;

    const servicesObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting && !bubbleClosed) {
                    supportBubble.classList.add("show");
                } else {
                    supportBubble.classList.remove("show");
                }

            });

        },
        {
            threshold: 0.25
        }
    );

    servicesObserver.observe(servicesSection);


    if (closeBubble) {

        closeBubble.addEventListener("click", () => {

            supportBubble.classList.remove("show");

            bubbleClosed = true;

        });

    }

}