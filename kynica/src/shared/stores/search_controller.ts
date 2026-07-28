import { flow, makeAutoObservable } from "mobx";
import { searchApi } from "../api/search.api.ts";
import { RootStore } from "./rootStore.ts";

export class Search {
  rootStore: RootStore;
  result = [];
  searchPlaylist = [];
  searchLoading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  search_by_category = flow(function* (
    this: Search,
    value: string,
    category: string,
  ) {
    this.searchLoading = true;
    this.result = [];

    try {
      let url: string;
      let body: Object;

      switch (category) {
        case "name":
          url = "/search_name";
          body = { value };
          break;
        case "artist":
          url = "/search_artist";
          body = { value };
          break;
        default:
          url = "/search_name";
          body = { value };
      }
      const res = yield searchApi.search_by_category(url, body);

      this.searchPlaylist = res;
      this.result = res.map((item) => item.id);
    } catch (error) {
      console.error(error);
    } finally {
      this.searchLoading = false;
    }
  });
}
