import './index.css';
import {openPopup, closePopup, submitProfileForm, submitChangeAvatar} from './components/modal.js'
import { submitFormPlace } from './components/card.js';
import { popupNewPlace, popupPicture, formAvatarChange, avatarChange, popupAvatarChange, buttonCloseAvaPopup, popupEdit, nameProfileInput, profileInfo, profileName, jobProfileInput, popupProfileOpenButton, popups, popupPictureCloseButton, formPlace, popupAddNewPostCloseButton, popupAddNewPostButton, buttonSave, formProfileElement, avatarUser, popupProfileCloseButton } from './components/constants';
import { enableValidation } from './components/validate.js';
import { getUserInfo } from './components/api.js';

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
    })
});

avatarChange.addEventListener('click', function(evt) {
  openPopup(popupAvatarChange);
});

buttonCloseAvaPopup.addEventListener('click', function(evt) {
  closePopup(popupAvatarChange);
})

formAvatarChange.addEventListener('submit', submitChangeAvatar)

popupProfileOpenButton.addEventListener('click', function(evt) {
  openPopup(popupEdit);
  nameProfileInput.value = profileName.innerText;
  jobProfileInput.value = profileInfo.innerText;
});

popupProfileCloseButton.addEventListener('click', function(evt) {closePopup(popupEdit);});

formProfileElement.addEventListener('submit', submitProfileForm);

popupAddNewPostButton.addEventListener('click', function (evt) {
  openPopup(popupNewPlace);
  buttonSave.disabled = true;
  buttonSave.classList.add('.popup__button_inactive');
});
  
popupAddNewPostCloseButton.addEventListener('click', function (evt) {closePopup(popupNewPlace);});

formPlace.addEventListener('submit', submitFormPlace);

popupPictureCloseButton.addEventListener('click', function(evt){closePopup(popupPicture);});

enableValidation({
  formSelector: '.popup__info',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
});

getUserInfo()
.then ((data) => {
  profileName.textContent = data.name;
  profileInfo.textContent = data.about;
  avatarUser.src = data.avatar;
})
.catch((err) => {
  console.log(err);
});