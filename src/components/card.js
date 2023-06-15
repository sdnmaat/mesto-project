import { closePopup, openPopup, loadingInfo } from "./modal.js";
import { getInitialCards, addNewCard, deleteCardFromServer, getUserInfo, dislikeCard, likeCard } from "./api.js";
import { cardContainer, placeNameInput, linkInput, popupNewPlace, popupPicture, fullImg, textImg } from "./constants.js";

export function createCard (name, link, id, likes) {
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const cardImg = cardElement.querySelector('.card__img');
const likeAmount = cardElement.querySelector('.card__likes-counter')
likeAmount.textContent = likes;
cardImg.src = link;
cardImg.alt = name;
cardElement.querySelector('.card__text').textContent = name;
cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
    likingCards(evt, id, likeAmount);
    }); 
cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
  deleteCard (evt, id);
  });
cardElement.querySelector('.card__img').addEventListener('click', function(evt) {
    fullImg.src = link;
    fullImg.alt = name;
    textImg.textContent = name;
    openPopup(popupPicture);
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

  Promise.all([getUserInfo(), getInitialCards()])
  .then(([info, cardsArray]) => {
    cardsArray.forEach(function(element){
      renderCard(createCard(element.name, element.link, element._id, element.likes.length),cardContainer);
      deleteTrashIcon(element.owner._id, info._id);
      });
  })
  .catch((err) => {
    console.log(err);
  });


export function submitFormPlace (evt) {
  loadingInfo(evt);
    evt.preventDefault();
    addNewCard(placeNameInput.value,linkInput.value)
    .then ((res) => {
      renderCard(createCard(res.name, res.link, res.id),cardContainer);
      closePopup(popupNewPlace);
      evt.target.reset()
    })
    }
    
function deleteTrashIcon (elementId, userId) {
    if (elementId != userId) {
    const card = document.querySelector('.card');
    const buttonDelete = document.querySelector('.card__delete-button');
    card.removeChild(buttonDelete);
  }
}

function likingCards (evt, cardId, likeAmount) {
  if (evt.target.classList.contains('card__heart_active')) {
    dislikeCard(cardId)
    .then((likes) => {
      evt.target.classList.toggle('card__heart_active');
      likeAmount.textContent = likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    likeCard(cardId)
    .then((likes) => {
      evt.target.classList.toggle('card__heart_active');
      likeAmount.textContent = likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}