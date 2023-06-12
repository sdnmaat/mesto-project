import './index.css';
import {openPopup, closePopup, popupEdit, submitProfileForm, closeEsc, closeOverlay, nameProfileInput, profileInfo, profileName, jobProfileInput} from './components/modal.js'
import { submitFormPlace, popupNewPlace, popupPicture } from './components/card.js';
import { enableValidation } from './components/validate.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');


popupEdit.addEventListener('click', function(evt) {
  closeOverlay(popupEdit, evt);
});
popupNewPlace.addEventListener('click', function(evt) {
  closeOverlay(popupNewPlace, evt);
});
popupPicture.addEventListener('click', function(evt) {
  closeOverlay(popupPicture, evt);
});

popupEdit.addEventListener('keydown', function(evt) {
  closeEsc(popupEdit, evt);
})
popupNewPlace.addEventListener('keydown', function(evt) {
  closeEsc(popupNewPlace, evt);
});
popupPicture.addEventListener('keydown', function(evt) {
  closeEsc(popupPicture, evt);
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
popupAddNewPostButton.addEventListener('click', function (evt) {openPopup(popupNewPlace);});
  
const popupAddNewPostCloseButton = document.querySelector('#popup-close-button-new-place');
popupAddNewPostCloseButton.addEventListener('click', function (evt) {closePopup(popupNewPlace);});
  
const formPlace = document.querySelector('[name="new-place"]');
formPlace.addEventListener('submit', submitFormPlace);
  
const popupPictureCloseButton = document.querySelector('#popup-close-button-picture');
popupPictureCloseButton.addEventListener('click', function(evt){closePopup(popupPicture);});

enableValidation();