import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['sun', 'cloud', 'wind', 'snow', 'flower', 'leaf'];

  connect() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAnimations();
          } else {
            this.stopAnimations();
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
    this.stopAnimations();
  }

  startAnimations() {
    this.sunTargets.forEach((el) => el.classList.add('animate-pulse-slow'));
    this.cloudTargets.forEach((el) => el.classList.add('animate-float'));
    this.windTargets.forEach((el) => el.classList.add('animate-sway'));
    this.snowTargets.forEach((el) => el.classList.add('animate-float'));
    this.flowerTargets.forEach((el) => el.classList.add('animate-wave'));
    this.leafTargets.forEach((el) => el.classList.add('animate-sway'));
  }

  stopAnimations() {
    this.sunTargets.forEach((el) => el.classList.remove('animate-pulse-slow'));
    this.cloudTargets.forEach((el) => el.classList.remove('animate-float'));
    this.windTargets.forEach((el) => el.classList.remove('animate-sway'));
    this.snowTargets.forEach((el) => el.classList.remove('animate-float'));
    this.flowerTargets.forEach((el) => el.classList.remove('animate-wave'));
    this.leafTargets.forEach((el) => el.classList.remove('animate-sway'));
  }
}
