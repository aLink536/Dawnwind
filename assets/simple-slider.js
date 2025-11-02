class SimpleSlider extends HTMLElement {
  connectedCallback() {
    const track = this.querySelector('div.overflow-x-auto');
    const buttons = this.querySelectorAll('.slider-nav');
    if (!track || buttons.length !== 2) return;

    const [prevBtn, nextBtn] = buttons;

    const updateButtonState = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const hasOverflow = maxScroll > 0;
      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= maxScroll - 1;

      // Hide both buttons if no overflow
      if (!hasOverflow) {
        prevBtn.style.opacity = '0';
        nextBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
        nextBtn.style.pointerEvents = 'none';
        return;
      } else {
        prevBtn.style.opacity = '';
        nextBtn.style.opacity = '';
        prevBtn.style.pointerEvents = '';
        nextBtn.style.pointerEvents = '';
      }

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

    // Update on resize
    const resizeObserver = new ResizeObserver(updateButtonState);
    resizeObserver.observe(track);
  }
}

customElements.define('simple-slider', SimpleSlider);
