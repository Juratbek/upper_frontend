export function renderSettings(settings, onClick, context) {
  const wrapper = document.createElement("div");

  settings.forEach((tune) => {
    const button = document.createElement("div");

    button.classList.add(context.api.styles.settingsButton);
    button.classList.add(tune.className);
    button.onclick = () => {
      onClick(tune);
      button.classList.toggle(context.api.styles.settingsButtonActive);
    };
    button.innerHTML = tune.icon;
    wrapper.appendChild(button);
  });

  return wrapper;
}
