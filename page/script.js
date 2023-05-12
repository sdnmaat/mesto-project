const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit-profile')
const popupPicture = document.querySelector('#popup-picture');

editButton.addEventListener('click', function openPopup (evt) {
  popupEdit.classList.add('popup_opened');
});

const closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', function (event) {
    popupEdit.classList.remove('popup_opened');
});

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput= document.querySelector('[name="profile-name"]');
const profileName = document.querySelector('.profile__name');
nameInput.value = profileName.innerText;

const jobInput = document.querySelector('[name="profile-info"]');
const profileInfo = document.querySelector('.profile__info');
jobInput.value = profileInfo.innerText;

function formSubmitHandler (evt) {
  profileInfo.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  evt.preventDefault(); 
}

formElement.addEventListener('submit', formSubmitHandler);

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
const cardContainer = document.querySelector('.cards');
    initialCards.forEach(function(element){
      const cardTemplate = document.querySelector('#card-template').content;
      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      cardElement.querySelector('.card__img').src = element.link;
      cardElement.querySelector('.card__img').alt = element.name;
      cardElement.querySelector('.card__text').textContent = element.name;
      cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__heart_active');
      }); 
      cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
        const cardElementDel = evt.target.closest('.card');
        cardElementDel.remove();
      });
      cardElement.querySelector('.card__img').addEventListener('click', function(evt) {
      const fullImg = document.querySelector('.popup__picture');
      fullImg.src = element.link;
      fullImg.alt = element.name;
      const textImg = document.querySelector('.popup__text-picture');
      textImg.textContent = element.name;
      popupPicture.classList.add('popup_opened');
      })
      cardContainer.prepend(cardElement);
    });

const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('#popup-new-place');
addButton.addEventListener('click', function openPopup (evt) {
  popupNewPlace.classList.add('popup_opened');
});

const closeButtonNewPlace = document.querySelector('#popup-close-button-new-place');
closeButtonNewPlace.addEventListener('click', function (event) {
    popupNewPlace.classList.remove('popup_opened');
});

const formPlace = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="place-link"]');

function formSubmitPlace (evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = linkInput.value;
  cardElement.querySelector('.card__img').alt = placeNameInput.value;
  cardElement.querySelector('.card__text').textContent= placeNameInput.value;
  cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_active');
  }); 
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    const cardElementDel = evt.target.closest('.card');
    cardElementDel.remove();
  });
  cardElement.querySelector('.card__img').addEventListener('click', function(evt) {
    const fullImg = document.querySelector('.popup__picture');
    fullImg.src = linkInput.value;
    fullImg.alt = placeNameInput.value;
    const textImg = document.querySelector('.popup__text-picture');
    textImg.textContent = placeNameInput.value;
    popupPicture.classList.add('popup_opened');
  })
  cardContainer.prepend(cardElement);
}

formPlace.addEventListener('submit', formSubmitPlace);

const closeButtonPictture = document.querySelector('#popup-close-button-picture');
closeButtonPictture.addEventListener('click', function(evt) {
  popupPicture.classList.remove('popup_opened');
});