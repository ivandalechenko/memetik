import { makeAutoObservable } from 'mobx';
class Store {
    currentSlide = 'vr'
    currentSlideBlur = 0
    constructor() { makeAutoObservable(this); }
    setSlide(sld) { this.currentSlide = sld; }
    setSlideBlur(blr) { this.currentSlideBlur = blr; }
}
export default new Store();