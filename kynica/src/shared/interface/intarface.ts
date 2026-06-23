export interface IMusic {
    name:string,
    artist:string,
    genre:string,
    time:number,
    urlAvatar:string
    musicId:number,
    description:string,
    id:number,
    isLiked:boolean,
}


export interface IProfile {
    bio:string,
}

export interface IUser {
    name:string,
    email:string,
    loveMusic:IMusic[],
    profile:IProfile,
}

export interface IFormLogin {
    email:string,
    name:string,
}

export interface IFormRegister {
    email:string,
    name:string,
    password:string,
}