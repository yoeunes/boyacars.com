import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['slidebar'];

  connect() {
    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  disconnect() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  toggle(event) {
    event.stopPropagation();
    const slidebar = document.querySelector('.mobile-slidebar');
    if (slidebar) {
      slidebar.classList.toggle('show-mobile-slidebar');
    }
  }

  handleClickOutside(event) {
    const slidebar = document.querySelector('.mobile-slidebar');
    const toggleButton = document.querySelector('.js-toggle-mobile-slidebar');

    if (slidebar && !slidebar.contains(event.target) && !toggleButton?.contains(event.target)) {
      slidebar.classList.remove('show-mobile-slidebar');
    }
  }
}
