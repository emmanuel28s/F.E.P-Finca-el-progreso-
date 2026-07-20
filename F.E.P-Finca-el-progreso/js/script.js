const header = document.querySelector("header");
const ctaButtons = document.querySelectorAll(".cta a, .contacto-cta a");
const contactForm = document.querySelector(".formulario form");
const mapIframe = document.querySelector(".mapa-contenedor iframe");

function toggleHeaderScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
}

function animateButtonPress(button) {
    button.classList.add("clicked");
    setTimeout(() => button.classList.remove("clicked"), 180);
}

function bindCtaButtons() {
    if (!ctaButtons.length) return;
    ctaButtons.forEach(button => {
        button.addEventListener("click", event => {
            animateButtonPress(button);
            console.log(`Botón CTA presionado: ${button.textContent.trim()}`);
            if (button.closest(".contacto-cta")) {
                event.preventDefault();
                window.location.href = button.href;
            }
        });
    });
}

function showFormMessage(message, isError = false) {
    if (!contactForm) return;
    let messageBox = contactForm.querySelector(".form-message");
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.className = "form-message";
        contactForm.prepend(messageBox);
    }
    messageBox.textContent = message;
    messageBox.style.color = isError ? "#b71c1c" : "#1b5e20";
}

function validateContactForm(values) {
    const errors = [];
    if (!values.name) errors.push("Por favor escribe tu nombre.");
    if (!values.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
        errors.push("Ingresa un correo válido.");
    }
    if (!values.message) errors.push("El mensaje no puede quedar vacío.");
    return errors;
}

function bindContactForm() {
    if (!contactForm) return;
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const values = {
            name: formData.get("name")?.toString().trim(),
            email: formData.get("email")?.toString().trim(),
            phone: formData.get("phone")?.toString().trim(),
            message: formData.get("message")?.toString().trim(),
        };
        const errors = validateContactForm(values);
        if (errors.length) {
            showFormMessage(errors.join(" "), true);
            return;
        }
        showFormMessage("Mensaje enviado. Te contactaremos lo antes posible.");
        contactForm.reset();
    });
}

function setupMapFrame() {
    if (!mapIframe) return;
    mapIframe.addEventListener("load", () => {
        console.log("Mapa cargado correctamente.");
    });
}

function initSiteScripts() {
    window.addEventListener("scroll", toggleHeaderScroll);
    toggleHeaderScroll();
    bindCtaButtons();
    bindContactForm();
    setupMapFrame();
}

document.addEventListener("DOMContentLoaded", initSiteScripts);
