import './index.css';
import {openPopup, closePopup, popupEdit, submitProfileForm, nameProfileInput, profileInfo, profileName, jobProfileInput} from './components/modal.js'
import { submitFormPlace, popupNewPlace, popupPicture } from './components/card.js';
import { enableValidation } from './components/validate.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
    })
});

popupProfileOpenButton.addEventListener('click', function(evt) {
  openPopup(popupEdit);
  nameProfileInput.value = profileName.innerText;
  jobProfileInput.value = profileInfo.innerText;
});

  
const popupProfileCloseButton = document.querySelector('#profile-close-button');
popupProfileCloseButton.addEventListener('click', function(evt) {closePopup(popupEdit);});
  
const formProfileElement = document.querySelector('[name="edit-profile"]');
formProfileElement.addEventListener('submit', submitProfileForm);

const popupAddNewPostButton = document.querySelector('.profile__add-button');
const buttonSave = document.querySelector('.popup__button');
popupAddNewPostButton.addEventListener('click', function (evt) {
  openPopup(popupNewPlace);
  buttonSave.disabled = true;
  buttonSave.classList.add('.popup__button_inactive');
});
  
const popupAddNewPostCloseButton = document.querySelector('#popup-close-button-new-place');
popupAddNewPostCloseButton.addEventListener('click', function (evt) {closePopup(popupNewPlace);});
  
const formPlace = document.querySelector('[name="new-place"]');
formPlace.addEventListener('submit', submitFormPlace);
  
const popupPictureCloseButton = document.querySelector('#popup-close-button-picture');
popupPictureCloseButton.addEventListener('click', function(evt){closePopup(popupPicture);});


enableValidation({
  formSelector: '.popup__info',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
});