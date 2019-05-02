export default class MP3Player {

  constructor() {
    this._isPlaying = false;
    this.$audioElement = null;
  }

  load({ song, remoteStore, localStore }) {
    let triedRemote = false;

    if (this.$audioElement !== null) {
      this.$audioElement.remove();
    }

    this.$audioElement = $('<audio></audio>')
      .attr('autoplay', true)
      .attr('loop', false)
      .attr('preload', true)
      .append(this.$source)
      .appendTo('body')
      .on('playing', this.handleStarted.bind(this))
      .on('pause', this.handleStopped.bind(this))
      .on('ended', this.handleStopped.bind(this))
      .on('error', () => {
        console.log("Error loading");
        if (!triedRemote) {
          console.log("Load from local cache failed. Trying remote store.");
          this.$audioElement.attr('src', `${remoteStore}/${song.id}.mp3`);
        }
      })
      .attr('src', `${localStore}/${song.id}.mp3`)
      .hide();

    return new Promise((accept, reject) => {
      this.$audioElement
        .on('canplaythrough', () => {
          accept();
        });
    });
  }

  isPlaying() {
    return this._isPlaying;
  }

  play() {
    this.$audioElement[0].play();
  }

  stop() {
    this.$audioElement[0].pause();
    this.$audioElement[0].currentTime = 0;
  }

  handleStopped() {
    this._isPlaying = false;
    $(this).trigger('play:stop');
  }

  handleStarted() {
    this._isPlaying = true;
    $(this).trigger('play:start');
  }

  waitReady() {
    return new Promise((accept, reject) => {
      accept();
    });
  }
}
