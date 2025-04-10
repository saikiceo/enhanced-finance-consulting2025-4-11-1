// Custom cursor effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let followerTimeout; // Timeout ID for follower delay

document.addEventListener('mousemove', (e) => {
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
        // Update cursor position immediately
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`; // Ensure scale is reset

        // Clear any existing timeout for the follower
        clearTimeout(followerTimeout);

        // Set a new timeout for the follower with a slight delay
        followerTimeout = setTimeout(() => {
            cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`; // Ensure scale is reset
        }, 80); // Slightly reduced delay
    });
});

// Hover effect using CSS :has() is generally preferred if browser support allows.
// The CSS approach (:has(a:hover...) ...) is added in styles.css.
// This JS part can be kept as a fallback or removed if CSS :has() is sufficient.
/*
const clickables = document.querySelectorAll('a, button, .service-card, .flow-step, .team-member');

clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '10px'; // Example: shrink cursor
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'rgba(249, 87, 56, 0.7)'; // Use accent2 color
        cursorFollower.style.width = '60px'; // Example: expand follower
        cursorFollower.style.height = '60px';
        cursorFollower.style.backgroundColor = 'rgba(249, 87, 56, 0.1)'; // Lighter accent2
        cursorFollower.style.borderColor = 'rgba(249, 87, 56, 0.4)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px'; // Restore original size
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(27, 153, 139, 0.5)'; // Restore original color
        cursorFollower.style.width = '40px'; // Restore original size
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'transparent'; // Restore original background
        cursorFollower.style.borderColor = 'rgba(27, 153, 139, 0.5)'; // Restore original border
    });
});
*/


// Scroll animation for header
const header = document.querySelector('header');
let lastScrollY = window.scrollY; // Track last scroll position

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    // Optional: Hide header on scroll down, show on scroll up
    // if (window.scrollY > lastScrollY && window.scrollY > 100) {
    //     header.style.top = '-100px'; // Adjust based on header height
    // } else {
    //     header.style.top = '0';
    // }
    lastScrollY = window.scrollY;
});


// Flow steps animation (Reveal on Scroll)
const flowSteps = document.querySelectorAll('.flow-step'); // *** MODIFIED: Selector updated to .flow-step

// Function to check if element is in viewport (more lenient)
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    // Check if element top is above the bottom of the viewport
    // and element bottom is below the top of the viewport (partial visibility)
    return (
        rect.top <= windowHeight &&
        rect.bottom >= 0
        // Optionally check horizontal visibility too
        // && rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        // && rect.right >= 0
    );
}

// Intersection Observer for better performance
const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add class with a delay based on index
            setTimeout(() => {
                entry.target.classList.add('flow-step-active'); // *** MODIFIED: Class name updated
            }, index * 150); // Adjust delay as needed
            // Optional: Stop observing once the element is visible
            // observer.unobserve(entry.target);
        } else {
             // Optional: Remove class if element scrolls out of view
             entry.target.classList.remove('flow-step-active');
        }
    });
};

const flowStepObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe each flow step element
flowSteps.forEach(step => {
    flowStepObserver.observe(step);
});


// Form submission animation (Visual Only - Does Not Send Data)
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('.submit-button'); // Target button specifically
const successCheckmark = contactForm.querySelector('.success-checkmark');
const formElementsToHide = contactForm.querySelectorAll('.form-group, .submit-button'); // Select groups and button

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    // 1. Fade out form elements
    formElementsToHide.forEach(element => {
        element.style.transition = 'opacity 0.5s ease-out'; // Add transition for smooth fade
        element.style.opacity = '0';
        element.style.pointerEvents = 'none'; // Disable interaction
    });

    // 2. Show success checkmark after fade out
    setTimeout(() => {
        successCheckmark.style.display = 'block'; // Use block or grid depending on CSS centering
        successCheckmark.style.opacity = '1'; // Ensure it's visible if opacity was 0

        // 3. Hide checkmark and show form again after a delay
        setTimeout(() => {
            successCheckmark.style.display = 'none';
            successCheckmark.style.opacity = '0'; // Hide it smoothly if needed

            // Reset form fields
            contactForm.reset();

            // Fade in form elements
            formElementsToHide.forEach(element => {
                element.style.opacity = '1';
                element.style.pointerEvents = 'auto'; // Re-enable interaction
            });

        }, 2500); // Duration checkmark is shown (e.g., 2.5 seconds)

    }, 500); // Delay after form elements start fading out (match fade duration)
});