import { makeAutoObservable } from "mobx";

class CasesActiveTab {
  
    activeTab = 'Projects'
    activeProject = 'MemeFi'

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(tabName){
    this.activeTab = tabName;
  }

  setActiveProject(projectName){
    this.activeProject = projectName;
  }
}

export default new CasesActiveTab();