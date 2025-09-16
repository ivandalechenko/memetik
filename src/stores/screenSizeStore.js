import { makeAutoObservable } from 'mobx'

export class ScreenSizeStore {
    maxScreenHeight = window.innerHeight

    constructor() {
        makeAutoObservable(this)
    }

    update() {
        if (window.innerHeight > this.maxScreenHeight) {
            this.maxScreenHeight = window.innerHeight
        }
    }

}



const screenSizeStore = new ScreenSizeStore();
export default screenSizeStore;


