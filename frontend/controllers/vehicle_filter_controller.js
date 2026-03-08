import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['vehicle', 'count', 'fuelFilter', 'transmissionFilter', 'priceFilter'];

  connect() {
    this.updateCount();
  }

  filter() {
    const fuel = this.fuelFilterTarget.value;
    const transmission = this.transmissionFilterTarget.value;
    const maxPrice = parseInt(this.priceFilterTarget.value) || Infinity;

    let visibleCount = 0;

    this.vehicleTargets.forEach((vehicle) => {
      const vehicleFuel = vehicle.dataset.fuel?.toLowerCase() || '';
      const vehicleTransmission = vehicle.dataset.transmission?.toLowerCase() || '';
      const vehiclePrice = parseInt(vehicle.dataset.price) || 0;

      const matchesFuel = !fuel || vehicleFuel === fuel.toLowerCase();
      const matchesTransmission = !transmission || vehicleTransmission === transmission.toLowerCase();
      const matchesPrice = vehiclePrice <= maxPrice;

      if (matchesFuel && matchesTransmission && matchesPrice) {
        vehicle.classList.remove('hidden');
        vehicle.classList.add('animate-fade-in');
        visibleCount++;
      } else {
        vehicle.classList.add('hidden');
        vehicle.classList.remove('animate-fade-in');
      }
    });

    this.updateCount(visibleCount);
  }

  reset() {
    this.fuelFilterTarget.value = '';
    this.transmissionFilterTarget.value = '';
    this.priceFilterTarget.value = '';
    this.filter();
  }

  updateCount(count = null) {
    if (count === null) {
      count = this.vehicleTargets.filter(v => !v.classList.contains('hidden')).length;
    }
    const text = count === 1 ? 'véhicule trouvé' : 'véhicules trouvés';
    this.countTarget.textContent = `${count} ${text}`;
  }
}
