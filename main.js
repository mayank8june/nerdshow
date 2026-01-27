document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.episode-card');

  // Stacking cards effect logic
  const handleScroll = () => {
    const triggerValue = window.innerWidth < 768 ? 150 : 300;
    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];

      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        // If the next card's top is less than the trigger from the screen top
        // and the current card is sticky, we start stacking it
        if (nextRect.top < triggerValue) {
          card.classList.add('is-stacked');
        } else {
          card.classList.remove('is-stacked');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Intersection Observer for initial reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => revealObserver.observe(card));
  document.querySelectorAll('.testimonial-item').forEach(el => revealObserver.observe(el));
  // Menu Toggle logic
  const menuToggle = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
});
