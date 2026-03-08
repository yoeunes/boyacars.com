import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['item'];

  connect() {
    this.itemTargets.forEach((item, index) => {
      item.dataset.index = index;
    });
  }

  toggle(event) {
    const item = event.currentTarget;
    const index = parseInt(item.dataset.index);

    this.itemTargets.forEach((el, i) => {
      if (i === index) {
        el.classList.toggle('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
}
