import { makeObservable, observable, computed, action, makeAutoObservable } from "mobx"


class User {
  user_data = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  getUser() {
    return;
  }

  updateInformation() {
    return;
  }

  addMusic() {
    return;
  }

  deleteMusic() {
    return;
  }

}