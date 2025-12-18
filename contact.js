const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Get values from inputs
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Show alert with message
    alert(`Thank you, ${name}! \n\nYour message has been sent successfully.\n\nWe will contact you at ${email}.`);

    // Clear the form
    contactForm.reset();
});