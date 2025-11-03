class ReadMore extends HTMLElement {
  connectedCallback() {
    this.content = this.querySelector('.read-more__content');
    this.button = this.querySelector('.read-more__toggle');

    if (!this.button || !this.content) return;

    // Initial check
    this.checkOverflow();

    // Toggle click
    this.button.addEventListener('click', () => {
      this.content.classList.toggle('line-clamp-2');
      this.button.textContent = this.content.classList.contains('line-clamp-2')
        ? 'Read more...'
        : 'Read less';
    });

    // Re-check on window resize
    this.resizeHandler = this.checkOverflow.bind(this);
    window.addEventListener('resize', this.resizeHandler);
  }

  disconnectedCallback() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  checkOverflow() {
    if (this.content.scrollHeight <= this.content.clientHeight) {
      this.button.style.display = 'none';
    } else {
      this.button.style.display = '';
    }
  }
}

if (!customElements.get('read-more')) {
  customElements.define('read-more', ReadMore);
}