document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple animation for the profile picture on load
    const profilePictureWrapper = document.querySelector('.profile-image-wrapper');
    profilePictureWrapper.style.transform = 'scale(0.8)';
    profilePictureWrapper.style.opacity = '0';
    setTimeout(() => {
        profilePictureWrapper.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        profilePictureWrapper.style.transform = 'scale(1)';
        profilePictureWrapper.style.opacity = '1';
    }, 200);

    // Add a subtle "liquid" background effect to the body for a more dynamic feel
    // This is a simple example; more complex effects would require a canvas or WebGL
    const backgroundGradient = document.querySelector('.background-gradient');
    let mouseX = 0;
    let mouseY = 0;

    document.body.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Calculate a slight parallax/shift for the background
        const xOffset = (mouseX / window.innerWidth - 0.5) * 20; // -10 to 10px
        const yOffset = (mouseY / window.innerHeight - 0.5) * 20; // -10 to 10px

        backgroundGradient.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });

    // Add subtle hover animation to buttons (already handled in CSS, but can add JS if more complex needed)
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Can add more complex JS animations here if CSS isn't enough
            // For now, CSS handles the primary hover effects
        });
        button.addEventListener('mouseleave', () => {
            // Reset any JS-driven animations
        });
    });
});
