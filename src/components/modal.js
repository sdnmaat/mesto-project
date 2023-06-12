

export function openPopup(popup) {
  popup.classList.add('popup_opened');
} 
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

export function closeEsc(popup, evt) {
    if (evt.key === 'Escape') {
    closePopup(popup);
    }
};

export function closeOverlay(popup, evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(popup)
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

