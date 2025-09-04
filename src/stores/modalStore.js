import { makeAutoObservable } from "mobx";

class modalStore {
  
    isOpen = false;
    img = '';

  constructor() {
    makeAutoObservable(this);
  }

  changeModal(){
    this.isOpen = !this.isOpen;
  }

  setImg(img){
    this.img = img;
  }

}

export default new modalStore();