export interface IMusic {
    name:string,
    artist:string,
    genre:string,
    time:number,
    urlAvatar:string
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

