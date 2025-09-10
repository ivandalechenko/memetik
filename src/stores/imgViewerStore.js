import { makeAutoObservable } from "mobx";

class imgViewerStore {

  isOpen = false;
  img = '';
  imgRect = null;
  imgNaturalW = null;
  imgNaturalH = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeModal() {
    this.isOpen = !this.isOpen;
  }

  setImg(img) {
    this.img = img;
  }

  setImgRect(rect) {
    this.imgRect = rect;
  }
  setImgNatural(w, h) {
    this.imgNaturalW = w;
    this.imgNaturalH = h;
  }

}

export default new imgViewerStore();