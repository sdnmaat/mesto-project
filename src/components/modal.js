import { changeProfile, changeAvatarServer } from "./api";
import { jobProfileInput, profileInfo, popupAvatarChange, profileName, nameProfileInput, avatarLinkInput, popupEdit, avatarUser } from "./constants";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
  const popupOpened = document.querySelector('.popup_opened');
  closePopup(popupOpened);
  }
};

export function loadingInfo (evt, isLoading) {
  const submitButton = evt.target.querySelector('.popup__button')
  if (isLoading) {
  submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

export function submitProfileForm (evt) {
  loadingInfo(evt, true);
  evt.preventDefault();
  changeProfile(profileName.textContent, profileInfo.textContent)
  .then (() => {
    profileInfo.textContent = jobProfileInput.value;
    profileName.textContent = nameProfileInput.value;
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loadingInfo(evt, false)
  })
};

export function submitChangeAvatar (evt) {
  evt.preventDefault();
  loadingInfo(evt, true);
  changeAvatarServer(avatarLinkInput.value)
  .then(() => {
    avatarUser.src = avatarLinkInput.value;
    closePopup(popupAvatarChange);
    evt.target.reset()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    loadingInfo(evt, false)
  })
}