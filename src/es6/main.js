import '@babel/polyfill';
import qs from 'query-string';
import axios from 'axios';
import PlayerUI from './components/playerUI';
import Loader from './components/loader';
import MP3Player from "./mp3-player";

const SONG_JSON = './data.json';

function init() {
  const args = qs.parse(window.location.search);
  const lang = args.lang || 'en';
  let playerUI = null;
  const loader = new Loader();

  if (args.song !== undefined) {
    $('#main').append(
      $('<div>').addClass('container').append(
        $('<div>').addClass('row').append(
          $('<div>').addClass('col').append(
            loader.render()
          )
        )
      )
    );

    return axios.get(`${SONG_JSON}?v=${Date.now()}`)
      .then(response => response.data)
      .then((database) => {
        const remoteStore = database.mp3_store_remote_url;
        const localStore = database.mp3_store_local_path;
        const song = database.sequences.find(item => item.id === args.song);
        if (song === undefined) {
          throw new Error(`Song ${args.song} not found in database`);
        }
        return {
          song,
          remoteStore,
          localStore
        };
      })
      .then(({song, remoteStore, localStore }) => {
        const mp3Player = new MP3Player()
        playerUI = new PlayerUI({ song, lang});
        $('#main')
          .empty()
          .append(playerUI.render());

        $(playerUI.playButton).on('click', () => {
          if (mp3Player.isPlaying()) {
            mp3Player.stop();
          } else {
            mp3Player.play();
          }
        });

        $(mp3Player).on('play:start', () => {
          playerUI.playButton.setPlaying(true);
        });

        $(mp3Player).on('play:stop', () => {
          playerUI.playButton.setPlaying(false);
        });

        return mp3Player.load({
          song,
          remoteStore,
          localStore
        });
      })
      .then(() => {
        playerUI.playButton.enable();
      });
  }
  throw new Error('No song indicated as argument');
}

$(() => {
  init();
});
