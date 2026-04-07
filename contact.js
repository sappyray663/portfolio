const contactForm = document.querySelector('.contact-form');

// --- PASTE YOUR URL HERE ---
const spideyHook = "https://discord.com/api/webhooks/1491119851798925374/Iv-X05RH6bRrkbwa9bjMvFXY8QxixCcp0MXM-iZxHsKPE9U740xw8DOrvuPqMFpcCaMp";

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Your original value grabbing logic
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // --- ANTI-SPAM (5 minute cooldown) ---
    const lastSent = localStorage.getItem('lastMessageTime');
    const now = Date.now();
    const cooldown = 5 * 60 * 1000; 

    if (lastSent && (now - lastSent < cooldown)) { 
        const minutesLeft = Math.ceil((cooldown - (now - lastSent)) / 60000);
        alert(`Spidey-sense says slow down! Try again in about ${minutesLeft} minute(s).`);
        return;
    }

    // --- THE DELIVERY ---
    fetch(spideyHook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `🕸️ **New Portfolio Message!**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
        })
    })
    .then(() => {
        // Record the time to lock the spam filter
        localStorage.setItem('lastMessageTime', Date.now());

        // --- YOUR ORIGINAL ALERTS & RESET ---
        alert(`Thank you, ${name}! \n\nYour message has been sent successfully.\n\nWe will contact you at ${email}.`);
        contactForm.reset();
    })
    .catch(err => {
        alert("Ops! Spidey-hook missed the ledge. Please try again later.");
        console.error("Webhook Error:", err);
    });
});