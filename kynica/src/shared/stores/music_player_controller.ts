import {makeAutoObservable} from "mobx";
import userMusic from "./music_controller.ts"


class MusicPlayer {
    audio = new Audio();
    isPlaying = false;
    isLoop = false;
    musicId = null;
    trackData = null;
    currentTime = 0;
    duration = 0;
    volume = 0.15;
    isMuted = false;
    previousVolume = 1;


    constructor() {
        makeAutoObservable(this)
        this.audio.loop = false;
        this.audio.volume = this.volume;
        this.audio.addEventListener("timeupdate", () => {
            this.currentTime = this.audio.currentTime;
        })

        this.audio.addEventListener("loadedmetadata", () => {
            this.duration = this.audio.duration
        })

    }

    play(musicId,trackData) {
        this.trackData = trackData;
        this.musicId = musicId;
        this.audio.src = `/music/${musicId}.mp3`;
        this.audio.play();
        this.isPlaying = true;

    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    resume() {
        this.audio.play()
        this.isPlaying = true;
    }

    seek(time) {
        if (this.audio.duration) {
            this.audio.currentTime = time;
            this.currentTime = time
        }
    }

    setVolume(volume) {
        const newVolume = Math.max(0,Math.min(1,volume));
        this.volume = newVolume;
        this.audio.volume = newVolume;

        if(newVolume > 0 && this.isMuted) {
            this.isMuted = false;
        }
    }

    getVolumePercent() {
        return this.volume * 100;
    }

    toggleMuted() {
        if (this.isMuted) {
            this.setVolume(this.previousVolume);
            this.isMuted = false;
        } else {
           this.previousVolume = this.volume;
           this.setVolume(0);
           this.isMuted = true;
        }
    }

    getProgressPercent() {
        if (this.duration === 0) return 0;
        return (this.currentTime / this.duration) * 100;
    }

    nextTrack() {
        const playlist = userMusic.userMusic;
        if(!playlist) return;



    }

    formatTimer(time) {
        if (isNaN(time)) return "0:00";

        const mins = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${mins}:${seconds.toString().padStart(2,'0')}`
    }



    loopMusic() {
        console.log(this.isLoop);
        this.isLoop = !this.isLoop;
        this.audio.loop = this.isLoop;
    }

}

export default new MusicPlayer()