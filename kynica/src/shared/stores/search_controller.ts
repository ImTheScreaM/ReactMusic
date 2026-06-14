import ApiRequest from "../api/apiRequest"

import {makeAutoObservable, runInAction} from "mobx";

class Search {
  result = [];
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  *search_by_category(value,category) {
    this.isLoading = true;
    this.result = []
    console.log(value,category)
    try {
      let url;
      let body;

      switch (category) {
        case "name":
          url = "http://localhost:3003/search_name";
          body = {value};
          break;
        case "artist":
          url = "http://localhost:3003/search_artist";
          body = {value};
          break;
        default:
          url = "http://localhost:3003/search_name";
          body = {value};

      }
      console.log(url,body);
      const res = yield ApiRequest(url,"POST",body);

      runInAction(() => {
        this.result = res.search;
      })

    } catch (error) {
      console.error(error);
    }

  }
}

export default new Search();

