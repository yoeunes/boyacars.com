import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['car', 'step'];

  connect() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateTimeline();
          }
        });
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this.element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  animateTimeline() {
    if (this.hasCarTarget) {
      this.carTarget.classList.add('animate-pulse-slow');
    }

    this.stepTargets.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('opacity-100', 'translate-x-0');
        step.classList.remove('opacity-0', '-translate-x-4');
      }, index * 200);
    });
  }
}
