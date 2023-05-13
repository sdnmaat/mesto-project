const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit-profile');
const popupPicture = document.querySelector('#popup-picture');

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
} 

popupProfileOpenButton.addEventListener('click', function(evt) {openPopup(popupEdit);});

const popupProfileCloseButton = document.querySelector('#profile-close-button');
popupProfileCloseButton.addEventListener('click', function(evt) {closePopup(popupEdit);});

const formProfileElement = document.querySelector('[name="edit-profile"]');
const nameProfileInput= document.querySelector('[name="profile-name"]');
const profileName = document.querySelector('.profile__name');
nameProfileInput.value = profileName.innerText;

const jobProfileInput = document.querySelector('[name="profile-info"]');
const profileInfo = document.querySelector('.profile__info');
jobProfileInput.value = profileInfo.innerText;

function submitProfileForm (evt) {
  evt.preventDefault(); 
  profileInfo.textContent = jobProfileInput.value;
  profileName.textContent = nameProfileInput.value;
  closePopup(popupEdit);
};

formProfileElement.addEventListener('submit', submitProfileForm);

function createCard (name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardImg.src = link;
  cardImg.alt = name;
  cardElement.querySelector('.card__text').textContent = name;
  cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__heart_active');
  }); 
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
  const cardElementDel = evt.target.closest('.card');
  cardElementDel.remove();
  });
  cardElement.querySelector('.card__img').addEventListener('click', function(evt) {
  const fullImg = document.querySelector('.popup__picture');
  fullImg.src = link;
  fullImg.alt = name;
  const textImg = document.querySelector('.popup__text-picture');
  textImg.textContent = name;
  openPopup(popupPicture);
  });
  return cardElement;
}

function renderCard(card, container) {
  container.prepend(card);
} 

const cardContainer = document.querySelector('.cards');
initialCards.forEach(function(element){
  renderCard(createCard(element.name, element.link),cardContainer);
  });

const popupAddNewPostButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('#popup-new-place');
popupAddNewPostButton.addEventListener('click', function (evt) {openPopup(popupNewPlace);});

const popupAddNewPostCloseButton = document.querySelector('#popup-close-button-new-place');
popupAddNewPostCloseButton.addEventListener('click', function (evt) {closePopup(popupNewPlace);});

const formPlace = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="place-link"]');

function formSubmitPlace (evt) {
  evt.preventDefault();
  renderCard(createCard(placeNameInput.value,linkInput.value),cardContainer);
  closePopup(popupNewPlace);
  placeNameInput.value='';
  linkInput.value='';
}

formPlace.addEventListener('submit', formSubmitPlace);

const popupPictureCloseButton = document.querySelector('#popup-close-button-picture');
popupPictureCloseButton.addEventListener('click', function(evt){closePopup(popupPicture);});