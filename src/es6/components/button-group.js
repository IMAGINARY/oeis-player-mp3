import ImComponent from './component';

export default class ButtonGroup extends ImComponent {
  constructor(props) {
    super(props);
    this.active = null;
    this.buttons = {};
  }

  render() {
    const { variableName, values, defaultActive, defaultEnabled } = this.props;

    this.element = $('<div>')
      .addClass('btn-group')
      .addClass(variableName !== undefined ? `btn-group-${variableName}` : null);

    Object.entries(values).forEach((entry) => {
      const text = entry[0];
      const value = entry[1];
      const newButton = $('<button>')
        .attr('type', 'button')
        .addClass('btn btn-secondary')
        .html(text)
        .attr('disabled', defaultEnabled ? null : true)
        .addClass(defaultActive === value ? 'active' : '')
        .on('click', (ev) => {
          if (this.active !== newButton) {
            $(this.active).removeClass('active');
            this.active = newButton;
            $(this.active).addClass('active');
            $(this).trigger('selection', value);
          }
          ev.preventDefault();
        });
      this.buttons[value] = newButton;
      if (value === defaultActive) {
        this.active = newButton;
      }
      this.element.append(newButton);
    });

    return this.element;
  }

  enableAll() {
    Object.values(this.buttons).forEach((eachButton) => {
      eachButton.removeAttr('disabled');
    });
  }

  enable(value) {
    if (this.buttons[value] !== undefined) {
      this.buttons[value].removeAttr('disabled');
    }
  }
}
