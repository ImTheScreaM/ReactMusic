import {makeAutoObservable, runInAction} from "mobx";

class MusicPlayer {
    audio = new Audio();
    isPlaying = false;
    isLoop = false;
    musicId = null;
    trackData = null;
    currentTime = 0;
    duration = 0;
    volume = 1;
    isMuted = false;
    previousVolume = 1;
    playlist = null;
    isOpen = false;

    constructor() {
        makeAutoObservable(this)
        this.audio.loop = false;
        this.audio.volume = this.volume;

        this.audio.addEventListener("timeupdate", () => {
            runInAction(() => {
                this.currentTime = this.audio.currentTime;
            })
        })

        this.audio.addEventListener("loadedmetadata", () => {
            runInAction(() => {
                this.duration = this.audio.duration
            })
        })

        this.audio.addEventListener("ended",() => {
            runInAction(() => {
                if( this.isLoop) {
                    this.currentTime = 0;
                    this.audio.play()
                } else {
                    this.nextTrack()
                }
            })
        })
    }

    toggleOpen() {
      return this.isOpen = !this.isOpen;
    }

    play(musicId,trackData,playlist) {
        runInAction(() => {
            console.log("play",musicId,trackData,playlist)

            this.trackData = trackData;
            this.musicId = musicId;
            this.audio.src = `/music/${musicId}.mp3`;
            this.audio.play();

            this.isPlaying = true;

            if (playlist) {
                this.playlist = playlist;
            }
        })
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
        if (!this.playlist || !this.playlist.length) return console.warn('No playlist');

        const currentIndex = this.playlist.findIndex(track =>
            track.id === this.musicId || track.musicId === this.musicId
        );

        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + 1) % this.playlist.length;
        const nextTrack = this.playlist[nextIndex];
        const nextId = nextTrack.id || nextTrack.musicId;

        this.play(nextId, nextTrack, this.playlist);

    }

    prevTrack() {
        const currentIndex = this.playlist.findIndex((track) =>
            track.id === this.musicId || track.musicId === this.musicId
        )

        if (currentIndex === -1) return;

        const prevIndex = (currentIndex - 1 + this.playlist.length) % this.playlist.length;

        if (this.currentTime > 4) {
            console.log("prevTrack",currentIndex,this.playlist[currentIndex],this.playlist)
            return this.play(this.playlist[currentIndex].id,this.playlist[currentIndex],this.playlist);
        }

        const prevTrack = this.playlist[prevIndex]
        const prevId = prevTrack.id || prevTrack.musicId;

        return this.play(prevId,prevTrack,this.playlist);
    }

    formatTimer(time) {
        if (isNaN(time)) return "0:00";

        const mins = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${mins}:${seconds.toString().padStart(2,'0')}`
    }

    loopMusic() {
        this.isLoop = !this.isLoop;
        this.audio.loop = this.isLoop;
    }

}

export default new MusicPlayer()
