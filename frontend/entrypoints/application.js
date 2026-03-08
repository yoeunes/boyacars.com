// Styles
import './application.css';

// Stimulus
import { Application } from '@hotwired/stimulus';

// Controllers
import AccordionController from '../controllers/accordion_controller';
import SlidebarController from '../controllers/slidebar_controller';
import SwiperController from '../controllers/swiper_controller';
import PreloaderController from '../controllers/preloader_controller';
import VehicleFilterController from '../controllers/vehicle_filter_controller';

// Initialize Stimulus
const application = Application.start();
application.register('accordion', AccordionController);
application.register('slidebar', SlidebarController);
application.register('swiper', SwiperController);
application.register('preloader', PreloaderController);
application.register('vehicle-filter', VehicleFilterController);

console.log('Boyacars application loaded');
