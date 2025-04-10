document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // 50pxスクロールしたらクラスを追加
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .service-card, .team-member'); // ホバー対象要素

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });

        // Add hover effect for links
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('link-hover');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('link-hover');
            });
        });
    }


    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 80; // ヘッダーの高さを考慮
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // --- ここに実際のフォーム送信処理を実装します ---
            // 例: Fetch API を使ってサーバーにデータを送信
            // const formData = new FormData(contactForm);
            // fetch('/your-server-endpoint', { // 送信先URLを指定
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json()) // or response.text()
            // .then(data => {
            //     console.log('Success:', data);
            //     // 送信成功時の処理
            //     contactForm.style.display = 'none'; // フォームを非表示
            //     successMessage.style.display = 'block'; // 成功メッセージを表示
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     alert('送信中にエラーが発生しました。');
            // });

            // --- ダミーの成功表示（サーバー送信なし） ---
            console.log('Form submitted (dummy)');
            contactForm.reset(); // フォームをリセット（必要に応じて）
            // 成功アニメーションのために親要素などを調整する必要があるかもしれません
             contactForm.style.display = 'none'; // フォームを非表示
             successMessage.style.display = 'block'; // 成功メッセージを表示

            // Checkmark アニメーションを再起動（必要なら）
            const checkIcon = successMessage.querySelector('.check-icon');
            if (checkIcon) {
                 // アニメーションをリセットするために要素を一度複製して置き換えるなどのテクニックが必要になる場合があります
                 // const newCheckIcon = checkIcon.cloneNode(true);
                 // checkIcon.parentNode.replaceChild(newCheckIcon, checkIcon);
            }
        });
    }

    // --- Mobile Navigation Toggle (Example) ---
    const logo = document.querySelector('.logo'); // Example: logo click toggles nav
    const navLinksContainer = document.querySelector('.nav-links');
    if (logo && navLinksContainer && window.innerWidth <= 768) { // Only add toggle on mobile
         logo.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link navigation if logo is a link
            navLinksContainer.classList.toggle('active');
        });
        // Close nav when a link is clicked (optional)
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 navLinksContainer.classList.remove('active');
            });
        });
    }


    // --- Animate elements on scroll (Intersection Observer Example) ---
    const animatedElements = document.querySelectorAll('.service-card, .flow-step, .team-member');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateY(0)'; // Reset transform
                // entry.target.classList.add('animate-in'); // Add a class for CSS animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1 // 10% visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        // Set initial state for animation
        el.style.opacity = '0';
        // Apply initial transform based on element type if needed
        if (el.classList.contains('service-card') || el.classList.contains('team-member')) {
             el.style.transform = 'translateY(50px) rotateY(10deg)';
        } else if (el.classList.contains('flow-step')) {
             el.style.transform = 'translateY(50px)'; // Flow step simple translate
        }
         el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Add transition
        observer.observe(el);
    });


});