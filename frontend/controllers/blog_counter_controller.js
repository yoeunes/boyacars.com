import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    target: Number,
    duration: { type: Number, default: 2000 },
    suffix: { type: String, default: '' },
    prefix: { type: String, default: '' },
  };

  connect() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animate();
            this.animated = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.element);
    this.animated = false;
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  animate() {
    const start = 0;
    const end = this.targetValue;
    const duration = this.durationValue;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(start + (end - start) * easedProgress);

      this.element.textContent = `${this.prefixValue}${current.toLocaleString('fr-FR')}${this.suffixValue}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
