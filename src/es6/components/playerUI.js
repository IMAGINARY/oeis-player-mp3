import ImComponent from './component';
import SongInfo from './song-info';
import ButtonGroup from './button-group';
import PlayButton from './play-button';

export default class PlayerUI extends ImComponent {
  constructor(props) {
    super(props);
    this.songInfo = null;
    this.playButton = null;
    this.speedButtons = null;
    this.instrumentButtons = null;
  }

  render() {
    const { song, lang } = this.props;

    this.element = $('<div>')
      .addClass('container-fluid player');

    const infoRow = $('<div>').addClass('row').appendTo(this.element);
    const controlRow = $('<div>').addClass('row').appendTo(this.element);

    this.songInfo = new SongInfo({
      song: {
        id: song.id,
        title: song.title[lang],
        terms: song.terms.replace(/ /g, '&ensp;'),
        description: song.description[lang],
      },
    });

    infoRow.append(
      $('<div>').addClass('col').append(
        this.songInfo.render()
      )
    );

    const controlLeft = $('<div>').addClass('col-md-2').appendTo(controlRow);

    this.playButton = new PlayButton({
      enabled: false,
    });

    controlLeft.append(
      this.playButton.render()
    );

    return this.element;
  }
}

PlayerUI.SPEEDS = {
  'x0.25': 0.25,
  'x0.5': 0.5,
  x1: 1,
  x2: 2,
  x3: 3,
};

PlayerUI.INSTRUMENTS = {
  GP: 'acoustic_grand_piano',
  Ec: 'fx_7_echoes',
  SF: 'fx_8_scifi',
  GS: 'glockenspiel',
  Sq: 'lead_1_square',
  Sw: 'lead_2_sawtooth',
  BL: 'lead_8_bass__lead',
  MB: 'music_box',
  PO: 'percussive_organ',
};
