window.addEventListener('DOMContentLoaded', () => {
    const comet = document.getElementById('comet');
    if (!comet) return;

    // --- Physics Variables ---
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cometX = mouseX, cometY = mouseY;
    let velX = 0, velY = 0;
    
    const maxVelocity = 4;      // Fixed speed (slower than mouse)
    const orbitRadius = 60;     // Distance of the orbit
    const orbitSpeed = 0.05;    // How fast it rotates
    let angle = 0;              // Current orbital angle
    
    let isDragging = false;
    let isActive = false;

    // 1. SYNCED START (6s Loader)
    setTimeout(() => {
        isActive = true;
        comet.style.display = 'block';
        setTimeout(() => { comet.style.opacity = '1'; }, 50);
        animate();
    }, 6000);

    // 2. MOUSE TRACKING
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 3. DRAG LOGIC
    comet.addEventListener('mousedown', (e) => {
        if (!isActive) return;
        isDragging = true;
        comet.style.cursor = 'grabbing';
        e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        comet.style.cursor = 'grab';
    });

    // 4. PHYSICS ENGINE
    function animate() {
        if (!isActive) return;

        if (isDragging) {
            cometX = mouseX;
            cometY = mouseY;
            velX = 0; velY = 0; // Reset velocity while dragging
        } else {
            // Calculate distance to mouse
            const dx = mouseX - cometX;
            const dy = mouseY - cometY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // STATE A: ORBITING (When very close to the mouse)
            if (distance < orbitRadius + 5) {
                angle += orbitSpeed;
                // Target position on the circle around the mouse
                const targetX = mouseX + Math.cos(angle) * orbitRadius;
                const targetY = mouseY + Math.sin(angle) * orbitRadius;
                
                // Smooth transition into the orbit
                cometX += (targetX - cometX) * 0.1;
                cometY += (targetY - cometY) * 0.1;
            } 
            // STATE B: CHASING (Constant Velocity)
            else {
                // Calculate direction (unit vector)
                const dirX = dx / distance;
                const dirY = dy / distance;

                // Apply fixed velocity
                cometX += dirX * maxVelocity;
                cometY += dirY * maxVelocity;
                
                // Update angle so when it reaches the mouse, it starts orbiting from where it arrived
                angle = Math.atan2(cometY - mouseY, cometX - mouseX);
            }
        }

        // Apply position
        comet.style.left = `${cometX}px`;
        comet.style.top = `${cometY}px`;

        createTrail(cometX, cometY);
        requestAnimationFrame(animate);
    }

    // 5. TRAIL GENERATOR (Same as before)
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'comet-trail';
        trail.style.cssText = `
            position: fixed; left: ${x}px; top: ${y}px;
            width: 15px; height: 10px; border-radius: 50%;
            pointer-events: none; z-index: -3;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: opacity 0.5s, transform 0.5s;
        `;
        document.body.appendChild(trail);
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => trail.remove(), 500);
        }, 30);
    }
});