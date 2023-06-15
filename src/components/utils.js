export const disablingButton = (popup) => {
    const button = popup.querySelector('.popup__button');
    button.disabled = true;
    button.classList.add('popup__button_inactive');
  }