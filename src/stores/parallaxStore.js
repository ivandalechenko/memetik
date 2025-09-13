import { makeAutoObservable } from 'mobx';
class Store {
    currentSlide = 'nigga'
    currentSlideBlur = 0
    currentSlideScale = 0
    currentSlideProgress = 0
    currentSlideBlinkProgress = 0
    blockTO = 0;
    blocked = false;
    constructor() { makeAutoObservable(this); }
    setSlide(sld) {
        // console.log('setslide');
        if (this.blocked) return
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

    scrollBlock(dur) {
        clearTimeout(this.blockTO)
        this.blocked = true;
        this.currentSlide = '';
        this.blockTO = setTimeout(() => {
            this.blocked = false;
        }, dur);
    }
}
export default new Store();