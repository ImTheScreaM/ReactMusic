import ApiRequest from "../modals/apiRequest";

class Music {
  
   *all_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/all_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *get_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/user_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *find_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/find_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *add_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/add_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }

  *remove_my_music() {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/remove_my_music",
        "GET",
      );
    } catch (error) {
      console.log(error);
    }
  }
}