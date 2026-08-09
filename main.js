document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.episode-card');

  // Auto-scroll and manual navigation logic for horizontal carousels
  const seasonWrappers = document.querySelectorAll('.season-wrapper');
  
  seasonWrappers.forEach(wrapper => {
    const row = wrapper.querySelector('.season-row');
    const prevBtn = wrapper.querySelector('.prev-btn');
    const nextBtn = wrapper.querySelector('.next-btn');
    
    // 1. Clone cards for true infinite loop
    const originalCards = Array.from(row.querySelectorAll('.episode-card'));
    const numCards = originalCards.length;
    
    if (numCards === 0) return;

    // We clone 2 times before and 2 times after to create a massive runway
    const prependFragment = document.createDocumentFragment();
    const appendFragment = document.createDocumentFragment();
    
    for(let i=0; i<2; i++) {
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            prependFragment.appendChild(clone);
        });
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            appendFragment.appendChild(clone);
        });
    }
    
    row.prepend(prependFragment);
    row.appendChild(appendFragment);
    
    const allCards = row.querySelectorAll('.episode-card');
    let autoScrollTimer;
    let isResetting = false;

    // 2. Center Highlight Logic
    const updateHighlight = () => {
      const rowCenter = row.getBoundingClientRect().left + row.offsetWidth / 2;
      let closestCard = null;
      let minDistance = Infinity;

      allCards.forEach(card => {
        const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const distance = Math.abs(rowCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      allCards.forEach(card => {
        if (card === closestCard) {
          card.classList.add('center-highlight');
        } else {
          card.classList.remove('center-highlight');
        }
      });
    };

    // 3. Infinite Scroll Boundary Enforcement
    const enforceBounds = () => {
        if (isResetting || numCards === 0) return;
        
        // setWidth is exactly the distance from the start of one set to the start of the next
        const firstOriginal = allCards[numCards * 2];
        const secondOriginal = allCards[numCards * 2 + 1];
        
        // Handle case where there is only 1 card (numCards = 1)
        const gap = parseInt(window.getComputedStyle(row).gap || 32);
        const setWidth = numCards > 1 ? (secondOriginal.offsetLeft - firstOriginal.offsetLeft) * numCards : (firstOriginal.offsetWidth + gap);
        
        if (row.scrollLeft < setWidth) {
           isResetting = true;
           row.style.scrollBehavior = 'auto';
           row.scrollLeft += setWidth;
           requestAnimationFrame(() => {
               row.style.scrollBehavior = 'smooth';
               isResetting = false;
           });
        } else if (row.scrollLeft > row.scrollWidth - setWidth - row.clientWidth) {
           isResetting = true;
           row.style.scrollBehavior = 'auto';
           row.scrollLeft -= setWidth;
           requestAnimationFrame(() => {
               row.style.scrollBehavior = 'smooth';
               isResetting = false;
           });
        }
    };

    row.addEventListener('scroll', () => {
        if(!isResetting) updateHighlight();
        enforceBounds();
    });
    window.addEventListener('resize', updateHighlight);

    // 4. Navigation
    const scrollNext = () => {
      const cardWidth = originalCards[0].offsetWidth + parseInt(window.getComputedStyle(row).gap || 32);
      row.scrollBy({ left: cardWidth, behavior: 'smooth' });
    };

    const scrollPrev = () => {
      const cardWidth = originalCards[0].offsetWidth + parseInt(window.getComputedStyle(row).gap || 32);
      row.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    };
    
    const startAutoScroll = () => {
      autoScrollTimer = setInterval(scrollNext, 4000);
    };
    const stopAutoScroll = () => clearInterval(autoScrollTimer);

    if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
    if (nextBtn) nextBtn.addEventListener('click', scrollNext);

    wrapper.addEventListener('mouseenter', stopAutoScroll);
    wrapper.addEventListener('mouseleave', startAutoScroll);
    row.addEventListener('touchstart', stopAutoScroll, {passive: true});
    row.addEventListener('touchend', startAutoScroll, {passive: true});
    
    // Initial setup: scroll to the middle original set
    setTimeout(() => {
       const middleSetStart = allCards[numCards * 2];
       row.style.scrollBehavior = 'auto';
       row.scrollLeft = middleSetStart.offsetLeft - (row.offsetWidth / 2) + (middleSetStart.offsetWidth / 2);
       row.style.scrollBehavior = 'smooth';
       updateHighlight();
       startAutoScroll();
    }, 100);
  });

  // Intersection Observer for initial reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.episode-card').forEach(card => revealObserver.observe(card));
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
