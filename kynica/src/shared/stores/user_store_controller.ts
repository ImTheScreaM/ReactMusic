import { flow, makeAutoObservable } from "mobx";
import { userApi } from "../api/user.api.ts";
import { RootStore } from "./rootStore.ts";

export class User {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  update_username = flow(function* (newName: string) {
    try {
      yield userApi.update_username(newName);
    } catch (error) {
      console.log(error);
    }
  });

  update_bio = flow(function* (newBio: string) {
    try {
      yield userApi.update_bio(newBio);
    } catch (error) {
      console.log(error);
    }
  });

  update_avatar = flow(function* (avatar: string) {
    try {
      console.log(avatar);
      yield userApi.update_avatar(avatar);
    } catch (error) {
      console.log(error);
    }
  });
}
