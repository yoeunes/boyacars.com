import { Controller } from '@hotwired/stimulus';
import Swiper from 'swiper';
import { Autoplay, Thumbs, Parallax } from 'swiper/modules';

export default class extends Controller {
  static values = {
    slidesPerView: { type: Number, default: 1 },
    spaceBetween: { type: Number, default: 0 },
    autoHeight: { type: Boolean, default: true },
    autoplayDelay: { type: Number, default: 5000 },
    speed: { type: Number, default: 400 },
    parallax: { type: Boolean, default: false },
  };

  static targets = ['thumbs'];

  connect() {
    this.createThumbsSlider();
    this.createMainSlider();
  }

  createMainSlider() {
    const modules = [Autoplay];

    const options = {
      modules,
      lazy: true,
      loop: true,
      slidesPerView: this.slidesPerViewValue || 'auto',
      spaceBetween: this.spaceBetweenValue || 0,
      autoHeight: this.autoHeightValue,
      centeredSlides: true,
      centerInsufficientSlides: true,
      autoplay: {
        delay: this.autoplayDelayValue,
        disableOnInteraction: false,
      },
      speed: this.speedValue,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: this.slidesPerViewValue || 'auto',
        },
      },
    };

    if (this.thumbs) {
      modules.push(Thumbs);
      options.thumbs = {
        swiper: this.thumbs,
      };
    }

    if (this.parallaxValue) {
      modules.push(Parallax);
      options.parallax = true;
    }

    options.modules = modules;
    this.swiper = new Swiper(this.element, options);
  }

  createThumbsSlider() {
    if (!this.hasThumbsTarget) {
      return;
    }

    const options = {
      slidesPerView: 'auto',
      spaceBetween: 10,
      watchSlidesProgress: true,
      centerInsufficientSlides: true,
    };

    this.thumbs = new Swiper(this.thumbsTarget, options);
  }

  disconnect() {
    if (this.swiper) {
      this.swiper.destroy();
    }
    if (this.thumbs) {
      this.thumbs.destroy();
    }
  }
}
