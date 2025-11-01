 class SimpleSlider extends HTMLElement {
    connectedCallback() {
      const track = this.querySelector('div.overflow-x-auto');
      const buttons = this.querySelectorAll('.slider-nav');
      if (!track || buttons.length !== 2) return;

      const [prevBtn, nextBtn] = buttons;

      const updateButtonState = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const atStart = track.scrollLeft <= 0;
        const atEnd = track.scrollLeft >= maxScroll - 1;

        // Prev button
        prevBtn.classList.toggle('opacity-50', atStart);
        prevBtn.classList.toggle('pointer-events-none', atStart);
        prevBtn.classList.toggle('opacity-100', !atStart);

        // Next button
        nextBtn.classList.toggle('opacity-50', atEnd);
        nextBtn.classList.toggle('pointer-events-none', atEnd);
        nextBtn.classList.toggle('opacity-100', !atEnd);
      };

      // Initial state
      updateButtonState();

      // Update on scroll
      track.addEventListener('scroll', () => requestAnimationFrame(updateButtonState));

      // Hook up nav buttons
      const scrollAmount = track.clientWidth; // can later adapt to slide width if you want single-card scroll
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Keyboard support
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        if (e.key === 'ArrowLeft') track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  }

  customElements.define('simple-slider', SimpleSlider);