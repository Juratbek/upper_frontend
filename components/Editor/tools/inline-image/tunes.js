export default class Tunes {
    /**
     * @param {{cssClasses: object, settings: object, onTuneToggled: Function}}
     *  cssClasses - Css class names
     *  settings - Available Image tunes
     *  onTuneToggled - Tune toggling callback
     */
    constructor({
      api, cssClasses, settings, onTuneToggled,
    }) {
      this.api = api,
      this.cssClasses = cssClasses;
      this.onTuneToggled = onTuneToggled;
      this.settings = settings;
    }
  
    render(data) {
      return this.settings.map((tune) => ({
        icon: tune.icon,
        label: tune.label,
        name: tune.name,
        toggle: true,
        isActive: data[tune.name],
        onActivate: () => {
          this.tuneClicked(tune.name)
        }
      }))
    }
  
    /**
     * Clicks to one of the tunes
     *
     * @param {string} tuneName Clicked tune name
     * @returns {void}
     */
    tuneClicked(tuneName) {
      this.onTuneToggled(tuneName);
    }
  }