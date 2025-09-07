import { makeAutoObservable } from "mobx";

class CasesActiveTab {

  activeTab = 'Projects'
  activeProject = 'MemeFi'
  activeWork = 'Artwork'

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;
  }

  setActiveProject(projectName) {
    this.activeProject = projectName;
  }

  setActiveArtWork(workName) {
    this.activeWork = workName;
  }
}

export default new CasesActiveTab();