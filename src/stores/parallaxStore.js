import { makeAutoObservable } from 'mobx';
class Store {
    // отображаемые (сглаженные) значения
    currentSlideBlur = 0;
    currentSlideScale = 0;
    currentSlideProgress = 0;
    currentSlideBlinkProgress = 0;

    // целевые значения
    _tBlur = 0;
    _tScale = 0;
    _tProgress = 0;
    _tBlink = 0;

    // скорости (можешь менять)
    _kBlur = 10;
    _kScale = 3;
    _kProgress = 3;
    _kBlink = 3;

    _raf = null;
    _prev = 0;

    constructor() {
        makeAutoObservable(this, { _loop: false, start: false, stop: false }, { autoBind: true });
    }

    // вызывать один раз при инициализации
    start() {
        if (this._raf) return;
        this._prev = performance.now();
        this._raf = requestAnimationFrame(this._loop);
    }
    stop() {
        if (!this._raf) return;
        cancelAnimationFrame(this._raf);
        this._raf = null;
    }

    // публичные сеттеры: пишут только в "цели"
    setSlideBlur(v) { this._tBlur = v; }
    setSlideScale(v) { this._tScale = v; }
    setSlideProgress(v) {
        this._tProgress = v;
    }
    setBlinkProgress(v) { this._tBlink = v; }

    // при необходимости мгновенно установить без сглаживания
    setImmediate({ blur, scale, progress, blink } = {}) {
        if (blur !== undefined) this.currentSlideBlur = this._tBlur = blur;
        if (scale !== undefined) this.currentSlideScale = this._tScale = scale;
        if (progress !== undefined) this.currentSlideProgress = this._tProgress = progress;
        if (blink !== undefined) this.currentSlideBlinkProgress = this._tBlink = blink;
    }

    _loop = (time) => {
        const dt = Math.max(0, (time - this._prev) / 1000);
        this._prev = time;

        const damp = (cur, target, k) => {
            const a = Math.min(1, dt * k);
            return cur + (target - cur) * a;
        };

        this.currentSlideBlur = damp(this.currentSlideBlur, this._tBlur, this._kBlur);
        this.currentSlideScale = damp(this.currentSlideScale, this._tScale, this._kScale);
        this.currentSlideProgress = damp(this.currentSlideProgress, this._tProgress, this._kProgress);
        this.currentSlideBlinkProgress = damp(this.currentSlideBlinkProgress, this._tBlink, this._kBlink);

        this._raf = requestAnimationFrame(this._loop);
    };



    currentSlide = 'nigga'
    blockTO = 0;
    blocked = false;
    setSlide(sld) {
        // console.log('setslide');
        if (this.blocked) return
        if (this.currentSlide === sld) return
        this.currentSlide = sld;
    }

    scrollBlock(dur) {
        clearTimeout(this.blockTO)
        this.blocked = true;
        this.currentSlide = '';
        this.blockTO = setTimeout(() => {
            this.blocked = false;
        }, dur);
    }

    unblock() {
        clearTimeout(this.blockTO)
        this.blocked = false;
    }
}
export default new Store();