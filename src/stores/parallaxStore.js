import { makeAutoObservable } from 'mobx';
class Store {
    currentSlide = 'vr'
    currentSlideBlur = 0
    currentSlideProgress = 0
    constructor() { makeAutoObservable(this); }
    setSlide(sld) { this.currentSlide = sld; }
    setSlideBlur(blr) { this.currentSlideBlur = blr; }
    setSlideProgress(prgr) { this.currentSlideProgress = prgr; }
}
export default new Store();