import ImComponent from './component';

export default class Loader extends ImComponent {
  render() {
    this.element = $('<div>')
      .addClass('loader text-center')
      .append(
        $('<div>')
          .addClass('spinner-border')
          .append(
            $('<span>')
              .addClass('sr-only')
              .text('Loading...')
          )
      );

    return this.element;
  }
}
