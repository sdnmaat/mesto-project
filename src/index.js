import './index.css';
import {openPopup, closePopup, submitProfileForm, submitChangeAvatar, loadingInfo} from './components/modal.js'
import { renderCard, createCard, deleteTrashIcon, changeLike, renderNewCard } from './components/card.js';
import { popupNewPlace, popupPicture, fullImg, textImg, placeNameInput, linkInput, cardContainer, formAvatarChange, avatarChange, popupAvatarChange, buttonCloseAvaPopup, popupEdit, nameProfileInput, profileInfo, profileName, jobProfileInput, popupProfileOpenButton, popups, popupPictureCloseButton, formPlace, popupAddNewPostCloseButton, popupAddNewPostButton, buttonSave, formProfileElement, avatarUser, popupProfileCloseButton } from './components/constants';
import { enableValidation } from './components/validate.js';
import { getUserInfo, getInitialCards, addNewCard, dislikeCard, likeCard } from './components/api.js';
import { disablingButton } from './components/utils';

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
  disablingButton(popupEdit);
  nameProfileInput.value = profileName.innerText;
  jobProfileInput.value = profileInfo.innerText;
});

popupProfileCloseButton.addEventListener('click', function(evt) {closePopup(popupEdit);});

formProfileElement.addEventListener('submit', submitProfileForm);

popupAddNewPostButton.addEventListener('click', function (evt) {
  openPopup(popupNewPlace);
  disablingButton(popupNewPlace);
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

Promise.all([getUserInfo(), getInitialCards()])
  .then(([info, cardsArray]) => {
    profileName.textContent = info.name;
    profileInfo.textContent = info.about;
    avatarUser.src = info.avatar;
    cardsArray.forEach(function(element){
      renderCard(createCard(element),cardContainer);
      deleteTrashIcon(element.owner._id, info._id);
      });
  })
  .catch((err) => {
    console.log(err);
  });

  function submitFormPlace (evt) {
      evt.preventDefault();
      loadingInfo(evt, true);
      addNewCard(placeNameInput.value,linkInput.value)
      .then ((res) => {
        renderNewCard(createCard(res),cardContainer);
        closePopup(popupNewPlace);
        evt.target.reset()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loadingInfo(evt, false)
      })
      }

export function handleLikeCard(status, cardId, evt, counter) {
  if(!status) {
    likeCard(cardId)
    .then((likes) => {changeLike(evt, likes, counter)})
    .catch((err)=>{console.log(err)})
  } else {
    dislikeCard(cardId)
    .then((likes) => {changeLike(evt, likes, counter)})
    .catch((err) => {console.log(err)})
  }
}

export function openIllustration (card) {
  fullImg.src = card.link;
  fullImg.alt = card.name;
  textImg.textContent = card.name;
  openPopup(popupPicture);
}