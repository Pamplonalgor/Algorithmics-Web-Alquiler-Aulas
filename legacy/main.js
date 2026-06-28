// main.js - Lógica para la web de AulaPremium

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    // 1. Menú Hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // 2. Efecto de scroll en el Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Gestión del formulario de reserva y cálculo de precio
    const bookingForm = document.getElementById('booking-form');
    const totalPriceDisplay = document.getElementById('total-price');

    if (bookingForm) {
        const calculatePrice = () => {
            const aulaSelect = document.getElementById('booking-aula');
            const shiftSelect = document.getElementById('booking-shift');
            
            const selectedAula = aulaSelect.options[aulaSelect.selectedIndex];
            const aulaName = selectedAula.getAttribute('data-name');
            const aulaSize = parseInt(selectedAula.value);
            const shiftType = shiftSelect.value;
            const shiftName = shiftSelect.options[shiftSelect.selectedIndex].text.split(' (')[0];

            let price = 0;

            if (aulaSize === 25) {
                price = shiftType === 'completo' ? 80 : 50;
            } else if (aulaSize === 30) {
                price = shiftType === 'completo' ? 110 : 70;
            }

            totalPriceDisplay.innerText = `${aulaName} + Turno ${shiftName} = ${price}€`;
        };

        // Escuchar cambios en los selectores
        bookingForm.addEventListener('change', calculatePrice);
        
        // Ejecutar cálculo inicial
        calculatePrice();

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const errorBox = document.getElementById('error-box');
            const dateInput = document.getElementById('booking-date');
            const successContainer = document.getElementById('success-container');
            
            // Ocultar error previo
            errorBox.style.display = 'none';
            errorBox.innerText = '';

            // 1. Validar fecha
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0,0,0,0); // Solo comparar fecha, no hora

            if (!dateInput.value) {
                errorBox.innerText = 'Por favor, selecciona una fecha.';
                errorBox.style.display = 'block';
                return;
            }

            if (selectedDate < today) {
                errorBox.innerText = 'La fecha no puede ser anterior a hoy.';
                errorBox.style.display = 'block';
                return;
            }

            // 2. Proceso de éxito y envío de email
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const name = document.getElementById('booking-name').value;
            const email = document.getElementById('booking-email').value;
            const aulaSelect = document.getElementById('booking-aula');
            const aulaName = aulaSelect.options[aulaSelect.selectedIndex].getAttribute('data-name');
            const date = dateInput.value;
            const shiftSelect = document.getElementById('booking-shift');
            const shiftName = shiftSelect.options[shiftSelect.selectedIndex].text;
            const totalPrice = document.getElementById('total-price').innerText;

            submitBtn.innerText = 'Procesando...';
            submitBtn.disabled = true;

            // Construir el cuerpo del email
            const subject = encodeURIComponent(`Reserva de Aula: ${aulaName}`);
            const body = encodeURIComponent(
                `Nueva solicitud de reserva:\n\n` +
                `Nombre: ${name}\n` +
                `Email: ${email}\n` +
                `Aula: ${aulaName}\n` +
                `Fecha: ${date}\n` +
                `Turno: ${shiftName}\n` +
                `Presupuesto: ${totalPrice}\n\n` +
                `Por favor, confirma la disponibilidad.`
            );

            const mailtoLink = `mailto:pamplona@algoacademy.es?subject=${subject}&body=${body}`;

            setTimeout(() => {
                // Abrir el cliente de correo
                window.location.href = mailtoLink;

                // Transición suave a éxito en la web
                bookingForm.classList.add('fade-out');
                
                setTimeout(() => {
                    bookingForm.classList.add('hidden');
                    successContainer.classList.add('show');
                }, 500);
            }, 1000);
        });
    }

    // 4. Animación de aparición para las tarjetas al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.aula-card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
