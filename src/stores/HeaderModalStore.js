import { makeAutoObservable } from "mobx";

class HeaderModalStore {
  
    isOpen = false;
    activeTabTop = 'Services';
    activeTabMenu = 'ANIMATIONS';

  constructor() {
    makeAutoObservable(this);
  }

  changeModalOpen(){
    this.isOpen = !this.isOpen;
  }

  setActiveTabTop(tab){
    this.activeTabTop = tab;
  }

  setActiveTabMenu(tab){
    this.activeTabMenu = tab;
  }

}

export default new HeaderModalStore();