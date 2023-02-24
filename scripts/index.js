import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';

const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');

const placeAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_add-card');
const placeForm = document.querySelector('[name="photo"]');
const placeInput = popupAddPlace.querySelector('[name="name"]');
const imageInput = popupAddPlace.querySelector('[name="link"]');

const imagePopup = document.querySelector('.popup_type_view-photo');
const imagePopupPic = imagePopup.querySelector('.place__picture');
const imagePopupTitle = imagePopup.querySelector('.place__caption');

const cardsContainer = document.querySelector('.elements__list');

const buttonCloseList = document.querySelectorAll('.popup__close-button');

const validationObj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

const profileFormValidator = new FormValidator(validationObj, profileForm)
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationObj, placeForm)
placeFormValidator.enableValidation();

//functions
function openPopup(popup) {
    popup.classList.add('popup_opened');
    addEventListener('keydown', closePopupEsc);
};

function openImagePopup(link, name) {
    imagePopupPic.src = link;
    imagePopupPic.alt = name;
    imagePopupTitle.textContent = name;

    openPopup(imagePopup);
};

function closePopup(popup) {
    removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
};

function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
};

function createCard(cardData) {
    const cardElement = new Card(
        cardData,
        '.item-template',
        openImagePopup
    );
    return cardElement.generateCard();
};

function renderCards() {
    initialCards.forEach((item) => {
        const cardElement = createCard(item);
        cardsContainer.prepend(cardElement);
    });
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(aboutPopup);
};

function addCard(evt) {
    evt.preventDefault();
    const newCardName = placeInput.value;
    const newCardLink = imageInput.value;
    const newCardAdd = createCard({
        name: newCardName,
        link: newCardLink
    })
    cardsContainer.prepend(newCardAdd);

    closePopup(popupAddPlace);
    placeForm.reset();
};

//listeners 
aboutButton.addEventListener('click', (evt) => {
    openPopup(aboutPopup);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    profileFormValidator.resetInput();
});

buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    });
    btn.addEventListener('click', () => closePopup(popup));
});

placeAddButton.addEventListener('click', (evt) => {
    placeFormValidator.resetInput();
    placeForm.reset();
    openPopup(popupAddPlace);
});

aboutPopup.addEventListener('submit', handleFormSubmit);
placeForm.addEventListener('submit', addCard);

renderCards(initialCards);