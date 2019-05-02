import ImComponent from './component';

export default class SongInfo extends ImComponent {
  render() {
    const { song } = this.props;
    this.element = $('<div>')
      .addClass('song_info');

    this.element.append(
      SongInfo.FIELDS.map(field => (song[field] !== undefined
        ? $('<div>')
          .addClass('song_info-field')
          .addClass(`song_info-field-${field}`)
          .html(song[field])
        : null
      ))
    );

    return this.element;
  }
}

SongInfo.FIELDS = ['id', 'title', 'terms', 'description'];
