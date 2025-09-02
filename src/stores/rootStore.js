import { makeAutoObservable } from 'mobx'

export class RootStore {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  inc() {
    this.count += 1
  }

  dec() {
    this.count -= 1
  }
}

export const rootStore = new RootStore()

