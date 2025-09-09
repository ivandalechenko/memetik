import { makeAutoObservable } from "mobx";

class modalStore {
  
    isOpen = false;
    img = '';
    imgRect = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeModal(){
    this.isOpen = !this.isOpen;
  }

  setImg(img){
    this.img = img;
  }

  setImgRect(rect) {
    this.imgRect = rect;
  }

}

export default new modalStore();