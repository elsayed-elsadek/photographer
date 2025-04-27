// Initialize AOS with better settings for performance and responsiveness
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
      duration: 800,
      offset: 100,
      delay: 100,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: window.innerWidth < 768
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Initialize language
  initLanguage();
});

// Translations
const translations = {
    en: {
        home: "Home",
        about: "About Me",
        blog: "Blog",
        contact: "Contact",
        title: "Life of Nature",
        description: "\"Capture the magic of every season; breathe the sea breeze, touch the golden sands, taste the sun-kissed fruits, and surrender to the endless beauty of Sharm El-Sheikh.\"",
        achievements: "Achievements",
        years_exp: "Years Of Experience",
        projects: "Projects",
        clients: "Clients",
        publications: "Publications",
        vibes_title: "Sharm El-Sheikh Vibes",
        vibe1: "Ocean Breeze",
        vibe2: "Golden Sands",
        vibe3: "Sunset Magic",
        vibe4: "Tropical Dreams",
        blog_title: "Blog",
        blog1_title: "Brothers",
        blog1_desc: "let's make memories",
        blog2_title: "Egyptian traditional dress",
        blog2_desc: "Loose, colorful, traditional, embroidered, comfortable.",
        blog3_title: "With flowers",
        blog3_desc: "The rose whispers secrets of love with every soft, fragrant petal.",
        see_all: "See All →",
        testimonial_title: "What they say <br> about me",
        testimonial_desc: "Over 500 clients have been captured <br/> through the lens of a world-class photographer.",
        testimonial_quote_title: "What they say",
        testimonial_quote: "\"Studying at WOC is fun, the curriculum is complete, the instructors are competent, and the assignments given are also relevant to the current scope of work.\"",
        footer_link1: "Awards & Rewards",
        footer_link2: "Learnings",
        footer_link3: "Talk to me",
        contact_me: "Contact Me",
        call_me: "Call me"
    },
    ru: {
        home: "Главная",
        about: "Обо мне",
        blog: "Блог",
        contact: "Контакты",
        title: "Жизнь Природы",
        description: "\"Почувствуйте магию каждого сезона; вдохните морской бриз, прикоснитесь к золотым пескам, попробуйте фрукты, согретые солнцем, и покоритесь бескрайней красоте Шарм-эль-Шейха.\"",
        achievements: "Достижения",
        years_exp: "Опыт работы",
        projects: "Проекты",
        clients: "Клиенты",
        publications: "Публикации",
        vibes_title: "Атмосфера Шарм-эль-Шейха",
        vibe1: "Морской бриз",
        vibe2: "Золотые пески",
        vibe3: "Магия заката",
        vibe4: "Тропические мечты",
        blog_title: "Блог",
        blog1_title: "Братья",
        blog1_desc: "Давайте создавать воспоминания",
        blog2_title: "Египетская традиционная одежда",
        blog2_desc: "Свободная, яркая, традиционная, вышитая, удобная.",
        blog3_title: "С цветами",
        blog3_desc: "Роза шепчет секреты любви каждым мягким, ароматным лепестком.",
        see_all: "Посмотреть все →",
        testimonial_title: "Что говорят <br> обо мне",
        testimonial_desc: "Более 3000 пользователей получили помощь от <br> World Online Course.",
        testimonial_quote_title: "Что говорят",
        testimonial_quote: "\"Учеба в WOC — это весело, программа обучения полная, преподаватели компетентны, а задания актуальны для текущей профессиональной деятельности.\"",
        footer_link1: "Награды и премии",
        footer_link2: "Обучение",
        footer_link3: "Связаться со мной",
        contact_me: "Связаться со мной",
        call_me: "Позвоните мне"
    }
  };
  

// Initialize language
function initLanguage() {
  // Set default language
  let currentLang = localStorage.getItem('language') || 'en';
  
  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === currentLang) {
          btn.classList.add('active');
      } else {
          btn.classList.remove('active');
      }
  });
  
  // Apply translations
  applyTranslations(currentLang);
  
  // Add event listeners for language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const lang = this.dataset.lang;
          localStorage.setItem('language', lang);
          applyTranslations(lang);
          
          // Update active button
          document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
      });
  });
}

// Apply translations to the page
function applyTranslations(lang) {
  // Update html lang attribute
  document.documentElement.lang = lang;
  
  // Apply font family for Russian
  if (lang === 'ru') {
      document.body.classList.add('ru-lang');
  } else {
      document.body.classList.remove('ru-lang');
  }
  
  // Update all translatable elements
  const translation = translations[lang];
  document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.dataset.key;
      if (translation[key]) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              element.value = translation[key];
          } else {
              element.innerHTML = translation[key];
          }
      }
  });
}

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
      preloader.style.display = 'none';
  }, 500);
});

// Full screen image functionality
const blogImages = document.querySelectorAll('.blog-img');
const fullScreenImage = document.getElementById('fullScreenImage');
const fullScreenImg = document.getElementById('fullScreenImg');
const closeButton = document.getElementById('closeButton');

blogImages.forEach(img => {
  img.addEventListener('click', () => {
      fullScreenImage.style.display = 'flex';
      fullScreenImg.src = img.src;
      document.body.style.overflow = 'hidden';
  });
});

closeButton.addEventListener('click', () => {
  fullScreenImage.style.display = 'none';
  document.body.style.overflow = 'auto';
});

fullScreenImage.addEventListener('click', (e) => {
  if (e.target === fullScreenImage) {
      fullScreenImage.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
});

// Show all images in the blog when clicking "See All"
const seeAllButton = document.getElementById('seeAllButton');
const hiddenImagesContainer = document.querySelector('.hideenImgs');

seeAllButton.addEventListener('click', () => {
  hiddenImagesContainer.classList.toggle('d-none');
  const key = seeAllButton.dataset.key;
  if (translations[currentLang]) {
      seeAllButton.textContent = hiddenImagesContainer.classList.contains('d-none') ? 
          translations[currentLang][key].replace('←', '→') : 
          translations[currentLang][key].replace('→', '←');
  }
  
  AOS.refresh();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          window.scrollTo({
              top: target.offsetTop - 70,
              behavior: 'smooth'
          });
      }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
  } else {
      navbar.classList.remove('navbar-scrolled');
  }
});

// Keep track of current language
let currentLang = localStorage.getItem('language') || 'en';