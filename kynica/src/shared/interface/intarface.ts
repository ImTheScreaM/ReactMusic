export interface ICartMusic {
  track: IMusic;
  playlist: IMusic[];
  showRemoveButton: boolean;
  isDropDownMenu: boolean;
  setOpenTrackId: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface IDropdownMusicOption {
  track: IMusic;
  showRemoveButton: boolean;
  isOpen?: boolean;
  setOpenTrackId: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface ILikeButton {
  track: IMusic;
}

export interface IPlaylistSubMenu {
  id: number;
  setOpenTrackId: (value: (prev: boolean) => boolean) => void;
  setOpenPlaylistDropList: (value: (prev: boolean) => boolean) => void;
}

export interface IDropdownMenuPaylist {
  playlistId: number;
  name: string;
}

export interface IMusic {
  name: string;
  artist: string;
  genre: string;
  time: number;
  urlAvatar: string;
  musicId: number;
  description: string;
  id: number;
  isLiked: boolean;
  userWhoAdd?: number;
  audioUrl?: string;
}

export interface IProfile {
  bio: string;
}

export interface IUser {
  name: string;
  id: number;
  email: string;
  loveMusic: IMusic[];
  profile: IProfile;
  urlAvatar: string;
}

export interface IRow {
  index: number;
  style: React.CSSProperties;
  tracks: IMusic[];
  openTrackId: number | null;
  setOpenTrackId: React.Dispatch<React.SetStateAction<number | null>>;
  showRemoveButton: boolean;
}

export interface IVirtualizationMusic {
  tracks:IMusic[];
  showRemoveButton?:boolean;
}

export interface IArtistData {
  name: string;
  urlAvatar: string;
}

export interface IFormLogin {
  email: string;
  name: string;
}

export interface IFormRegister {
  email: string;
  name: string;
  password: string;
}

export interface IUploadMusic {
  avatar: File;
  audio: File;
  name: string;
  genre: string;
  description?: string;
}
