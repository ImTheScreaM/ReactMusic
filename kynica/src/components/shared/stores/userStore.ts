type user = {
  name:string,
  email:string,
  bio?:{
    information:[],
    music_love:[]
  }
}

class User {
  user:user[] = [];
  
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