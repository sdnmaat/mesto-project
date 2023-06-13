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

export const jobProfileInput = document.querySelector('[name="profile-info"]');
export const profileInfo = document.querySelector('.profile__info');
export const profileName = document.querySelector('.profile__name');
export const nameProfileInput= document.querySelector('[name="profile-name"]');
export const popupEdit = document.querySelector('#popup-edit-profile');
export function submitProfileForm (evt) {
  evt.preventDefault(); 
  profileInfo.textContent = jobProfileInput.value;
  profileName.textContent = nameProfileInput.value;
  closePopup(popupEdit);
};

