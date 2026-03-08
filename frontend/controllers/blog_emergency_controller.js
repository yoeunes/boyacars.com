import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['icon'];

  connect() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startPulse();
          } else {
            this.stopPulse();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.stopPulse();
  }

  startPulse() {
    this.iconTargets.forEach((icon) => {
      icon.classList.add('animate-pulse-ring');
    });
  }

  stopPulse() {
    this.iconTargets.forEach((icon) => {
      icon.classList.remove('animate-pulse-ring');
    });
  }
}
