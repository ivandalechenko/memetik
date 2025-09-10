import { makeAutoObservable } from 'mobx';
class Store {
    // currentSlide = 'VR'
    currentSlide = 'nigga'
    currentSlideBlur = 0
    currentSlideScale = 0
    currentSlideProgress = 0
    currentSlideBlinkProgress = 0
    constructor() { makeAutoObservable(this); }
    setSlide(sld) {
        // console.log('setslide');

        if (this.currentSlide === sld) return
        this.currentSlide = sld;
    }
    setSlideBlur(blr) {
        this.currentSlideBlur = blr;
    }
    setSlideScale(scl) {
        this.currentSlideScale = scl;
    }
    setSlideProgress(prgr) {
        this.currentSlideProgress = prgr;
    }
    setBlinkProgress(bprgr) {
        console.log(bprgr);

        this.currentSlideBlinkProgress = bprgr;
    }
}
export default new Store();