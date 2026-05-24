const activityData = {
    juveniles: {
        title: 'Juveniles',
        cards: [
            { icon: 'fas fa-guitar', title: 'Cantos y worship', text: 'Encuentros con música, oración y testimonios.' },
            { icon: 'fas fa-user-friends', title: 'Grupo juvenil', text: 'Actividades de integración y servicio comunitario.' },
            { icon: 'fas fa-lightbulb', title: 'Talleres', text: 'Charlas de liderazgo y valores cristianos.' }
        ]
    },
    campamento: {
        title: 'Campamento',
        cards: [
            { icon: 'fas fa-campground', title: 'Campamento anual', text: 'Aventura, fe y convivencia entre hermanos.' },
            { icon: 'fas fa-fire', title: 'Fogata', text: 'Noche de testimonios y momentos de reflexión.' },
            { icon: 'fas fa-hiking', title: 'Senderismo', text: 'Actividades al aire libre para jóvenes y familias.' }
        ]
    },
    clases: {
        title: 'Clases dominicales',
        cards: [
            { icon: 'fas fa-book-open', title: 'Escuela bíblica', text: 'Lecciones para niños y adolescentes.' },
            { icon: 'fas fa-pencil-alt', title: 'Manualidades', text: 'Actividades creativas para aprender jugando.' },
            { icon: 'fas fa-chalkboard-teacher', title: 'Aprendizaje', text: 'Clases con apoyo para el crecimiento espiritual.' }
        ]
    },
    adultos: {
        title: 'Actividades de adultos',
        cards: [
            { icon: 'fas fa-users', title: 'Reuniones', text: 'Encuentros de ministerio y grupos pequeños.' },
            { icon: 'fas fa-pray', title: 'Cultos', text: 'Servicios generales para toda la familia.' }
        ],
        details: {
            reunion: {
                title: 'Reunión',
                cards: [
                    { icon: 'fas fa-female', title: 'Ministerio de la Mujer', text: 'Apoyo, oración y crecimiento para mujeres.' },
                    { icon: 'fas fa-book', title: 'Estudio Bíblico', text: 'Sesiones profundas para estudiar la Palabra.' }
                ]
            },
            culto: {
                title: 'Culto general',
                cards: [
                    { icon: 'fas fa-sun', title: 'Culto Día', text: 'Servicio matutino con alabanza y enseñanza.' },
                    { icon: 'fas fa-moon', title: 'Culto Noche', text: 'Culto vespertino de oración y música.' }
                ]
            }
        }
    }
};

const sections = document.querySelectorAll('.nav-btn');
const activityButtons = document.querySelectorAll('.activity-btn');
const subButtonsAdultos = document.querySelector('#subButtonsAdultos');
const subButtons = document.querySelectorAll('.sub-btn');
const activityGallery = document.querySelector('#activityGallery');
const detailGallery = document.querySelector('#detailGallery');
const whatsappModal = document.querySelector('#whatsappModal');
const closeModal = document.querySelector('.close-modal');
const heroCarouselCards = document.querySelectorAll('.carousel-card');
let currentSlide = 0;

function setActiveSection(sectionId) {
    sections.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-section') === sectionId);
    });
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
    }
}

sections.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if (section) {
            scrollToSection(section);
        }
    });
});

const heroButtons = document.querySelectorAll('.hero-btn');
heroButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if (section) scrollToSection(section);
    });
});

function renderCards(cards, container) {
    container.innerHTML = cards.map(card => `
        <article class="activity-card">
            <div class="photo"><i class="${card.icon}"></i></div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
        </article>
    `).join('');
}

function showActivity(activity) {
    const data = activityData[activity];
    if (!data) return;
    activityButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-activity') === activity));
    renderCards(data.cards, activityGallery);
    detailGallery.classList.add('hidden');

    if (activity === 'adultos') {
        subButtonsAdultos.classList.remove('hidden');
        subButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-detail') === 'reunion'));
        showActivityDetail('reunion');
    } else {
        subButtonsAdultos.classList.add('hidden');
    }
}

function showActivityDetail(detail) {
    const activeDetail = activityData.adultos.details[detail];
    if (!activeDetail) return;
    subButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-detail') === detail));
    renderCards(activeDetail.cards, detailGallery);
    detailGallery.classList.remove('hidden');
}

activityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const activity = btn.getAttribute('data-activity');
        showActivity(activity);
    });
});

subButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const detail = btn.getAttribute('data-detail');
        showActivityDetail(detail);
    });
});

function openWhatsAppModal() {
    whatsappModal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
    whatsappModal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === whatsappModal) {
        whatsappModal.style.display = 'none';
    }
});

const btnAgendaVisita = document.querySelector('#btnAgendaVisita');
btnAgendaVisita?.addEventListener('click', openWhatsAppModal);

function updateCarousel() {
    heroCarouselCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentSlide);
    });
    currentSlide = (currentSlide + 1) % heroCarouselCards.length;
}

if (heroCarouselCards.length > 0) {
    updateCarousel();
    setInterval(updateCarousel, 4000);
}

showActivity('juveniles');
