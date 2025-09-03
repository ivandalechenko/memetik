import { makeAutoObservable } from 'mobx';
class Store {
    currentSlide = 'vr'
    constructor() { makeAutoObservable(this); }
    setSlide(sld) { this.currentSlide = sld; }
}
export default new Store();