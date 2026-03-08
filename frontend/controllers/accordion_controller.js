import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['item'];

  toggle(event) {
    const clickedButton = event.currentTarget;
    const clickedItem = clickedButton.closest('[data-accordion-target="item"]');
    const content = clickedItem.querySelector('.accordion__content');
    const icon = clickedButton.querySelector('i');
    const isOpen = content.classList.contains('max-h-96');

    // Close all other items
    this.itemTargets.forEach((item) => {
      const itemContent = item.querySelector('.accordion__content');
      const itemIcon = item.querySelector('button i');
      
      if (itemContent && itemIcon && item !== clickedItem) {
        itemContent.classList.add('max-h-0');
        itemContent.classList.remove('max-h-96');
        itemIcon.classList.remove('rotate-180');
      }
    });

    // Toggle clicked item
    if (isOpen) {
      content.classList.add('max-h-0');
      content.classList.remove('max-h-96');
      icon.classList.remove('rotate-180');
    } else {
      content.classList.remove('max-h-0');
      content.classList.add('max-h-96');
      icon.classList.add('rotate-180');
    }
  }
}
