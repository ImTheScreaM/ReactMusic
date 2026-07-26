import { flow, makeAutoObservable } from "mobx";
import { ApiRequest } from "../api/apiRequest";
import { userApi } from "../api/user.api.ts";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  update_username = flow(function*(data: string) {
    try {
      yield userApi.update_username(data);
    } catch (error) {
      console.log(error);
    }
  });

  update_bio = flow(function* (data: string) {
    try {
      yield userApi.update_bio(data);
    } catch (error) {
      console.log(error);
    }
  });

  update_avatar = flow(function*(avatar: string) {
    try {
      yield userApi.update_avatar(avatar);
    } catch (error) {
      console.log(error);
    }
  });
}

export default new User();
