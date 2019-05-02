import ImComponent from './component';

export default class PlayButton extends ImComponent {
  constructor(props) {
    super(props);
    this.playing = false;
  }

  render() {
    const { enabled } = this.props;
    this.element = $('<button>')
      .addClass('control-button-l control-play')
      .attr('disabled', !enabled)
      .addClass('disabled', !enabled)
      .on('click', (ev) => {
        $(this).trigger('click', ev);
      });

    this.loader = $('<div>').addClass('control-button-loader spinner-border').append(
      $('<span>').addClass('sr-only').text('Loading...')
    ).appendTo(this.element);

    return this.element;
  }

  enable() {
    this.loader.remove();
    this.element.removeAttr('disabled');
    this.element.removeClass('disabled');
  }

  setPlaying(playing) {
    this.playing = playing;
    if (this.playing) {
      this.element.addClass('playing');
    } else {
      this.element.removeClass('playing');
    }
  }
}
