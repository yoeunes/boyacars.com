import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    // Hide preloader when page is fully loaded
    window.addEventListener('load', () => {
      this.hide();
    });

    // Fallback: hide after 2 seconds if load event doesn't fire
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
