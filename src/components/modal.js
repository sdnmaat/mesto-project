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

export function loadingInfo (evt) {
  const submitButton = evt.target.querySelector('.popup__button')
  submitButton.textContent = 'Сохранение...';
}

export function submitProfileForm (evt) {
  loadingInfo(evt);
  evt.preventDefault();
  profileInfo.textContent = jobProfileInput.value;
  profileName.textContent = nameProfileInput.value;
  changeProfile(profileName.textContent, profileInfo.textContent)
  .catch((err) => {
    console.log(err);
  });
  closePopup(popupEdit);
};

export function submitChangeAvatar (evt) {
  loadingInfo(evt);
  evt.preventDefault();
  changeAvatarServer(avatarLinkInput.value);
  avatarUser.src = avatarLinkInput.value;
  closePopup(popupAvatarChange);
  evt.target.reset()
}