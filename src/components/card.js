import { openPopup } from "./modal.js";
import { deleteCardFromServer, dislikeCard, likeCard } from "./api.js";
import { popupPicture, fullImg, textImg } from "./constants.js";
import { handleLikeCard } from "../index.js";

export function createCard (card) {
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const cardImg = cardElement.querySelector('.card__img');
const likeAmount = cardElement.querySelector('.card__likes-counter')
likeAmount.textContent = card.likes.length;
cardImg.src = card.link;
cardImg.alt = card.name;
cardElement.querySelector('.card__text').textContent = card.name;
cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
  handleLikeCard(checkStatusLike(evt), card._id, evt, likeAmount);
    }); 
cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
  deleteCard (evt, card._id);
  });
cardElement.querySelector('.card__img').addEventListener('click', function(evt) {
    openIllustration(card);
    });
  return cardElement;
  }

function deleteCard (evt, id) {
  deleteCardFromServer(id)
  .then(()=>{
  const cardElementDel = evt.target.closest('.card');
  cardElementDel.remove();
})
.catch((err) => {
  console.log(err);
})
};

export function renderCard(card, container) {
    container.prepend(card);
  } 
    
export function deleteTrashIcon (elementId, userId) {
    if (elementId != userId) {
    const card = document.querySelector('.card');
    const buttonDelete = document.querySelector('.card__delete-button');
    card.removeChild(buttonDelete);
  }
}

export function checkStatusLike (evt) {
  if (evt.target.classList.contains('card__heart_active')) {
    return true
  } else {return false}
};

export function changeLike(evt, likes, counter) {
  evt.target.classList.toggle('card__heart_active');
  counter.textContent = likes.length;
}

function openIllustration (card) {
  fullImg.src = card.link;
  fullImg.alt = card.name;
  textImg.textContent = card.name;
  openPopup(popupPicture);
}