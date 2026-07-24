import {makeAutoObservable} from "mobx";
import {ApiRequest} from "../api/apiRequest";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  *update_username(data:string) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/change_username",
        "POST",
        {new_name:data},
      );

      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  }

  *update_bio(data:string) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/change_bio",
        "POST",
        {new_bio:data},
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new User();