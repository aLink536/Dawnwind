class OffCanvas extends HTMLElement {
  constructor() {
    super();
    this._initialized = false;
    this._boundEscHandler = this._onKeydown.bind(this);
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    // Cache elements
    this.backdrop = this.querySelector("[data-offcanvas-backdrop]");
    this.panel = this.querySelector("[data-offcanvas-panel]");

    if (!this.panel) {
      console.warn("<off-canvas> is missing an element with [data-offcanvas-panel]", this);
    }

    this._bindToggles();
    this._bindCloseButtons();
    this._bindBackdrop();

    document.addEventListener("keydown", this._boundEscHandler);
  }

  disconnectedCallback() {
    // If the element is ever removed from DOM, stop listening to ESC
    document.removeEventListener("keydown", this._boundEscHandler);
  }

  // ---------------------------
  // Bind open/close toggles
  // ---------------------------
  _bindToggles() {
    if (!this.id) return;

    const selector = `[data-offcanvas-toggle="${this.id}"]`;
    const toggles = document.querySelectorAll(selector);

    toggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  }

  _bindCloseButtons() {
    this.querySelectorAll("[data-offcanvas-close]").forEach((btn) => {
      btn.addEventListener("click", () => this.close());
    });
  }

  _bindBackdrop() {
    if (!this.backdrop) return;
    this.backdrop.addEventListener("click", () => this.close());
  }

  _onKeydown(e) {
    if (e.key === "Escape" && this.classList.contains("offcanvas--open")) {
      this.close();
    }
  }

  // ---------------------------
  // Public API
  // ---------------------------
  open() {
    if (this.classList.contains("offcanvas--open")) return;
    this.classList.add("offcanvas--open");
    document.body.style.overflow = "hidden";
  }

  close() {
    if (!this.classList.contains("offcanvas--open")) return;
    this.classList.remove("offcanvas--open");
    document.body.style.overflow = "";
  }

  toggle() {
    this.classList.contains("offcanvas--open") ? this.close() : this.open();
  }
}

customElements.define("off-canvas", OffCanvas);
