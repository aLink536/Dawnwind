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


// ---------------------------------------------------------------------------
// Extended slider for product galleries (with thumbnails)
// ---------------------------------------------------------------------------

class ProductSlider extends SimpleSlider {
  connectedCallback() {
    super.connectedCallback(); // run base slider logic

    const track = this.querySelector('div.overflow-x-auto');
    const thumbs = this.querySelectorAll('[data-thumb]');
    if (!track || thumbs.length === 0) return;

    const updateActiveThumb = () => {
      const slideWidth = track.clientWidth;
      const activeIndex = Math.round(track.scrollLeft / slideWidth);

      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('ring-2', i === activeIndex);
        thumb.classList.toggle('ring-(--color-accent)', i === activeIndex);
        thumb.classList.toggle('ring-offset-2', i === activeIndex);
      });
    };

    // Click on thumbnail → scroll main slider
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        const slideWidth = track.clientWidth;
        track.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
        updateActiveThumb();
      });
    });

    // Update on scroll
    track.addEventListener('scroll', () => requestAnimationFrame(updateActiveThumb));

    // Initialize highlight
    updateActiveThumb();
  }
}

customElements.define('product-slider', ProductSlider);
