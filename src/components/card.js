import { closePopup, openPopup } from "./modal.js";

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

export const popupPicture = document.querySelector('#popup-picture');
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

const placeNameInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="place-link"]');
export const popupNewPlace = document.querySelector('#popup-new-place');
export function submitFormPlace (evt) {
    evt.preventDefault();
    renderCard(createCard(placeNameInput.value,linkInput.value),cardContainer);
    closePopup(popupNewPlace);
    placeNameInput.value='';
    linkInput.value='';
    }