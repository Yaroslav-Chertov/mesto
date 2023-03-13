import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../scripts/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('[name="info"]');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');
const placeAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_add-card');
const placeForm = document.querySelector('[name="photo"]');
const placeInput = popupAddPlace.querySelector('[name="name"]');
const imageInput = popupAddPlace.querySelector('[name="link"]');
const imagePopup = document.querySelector('.popup_type_view-photo');

const validationObj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

const profileFormValidator = new FormValidator(validationObj, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationObj, placeForm);
placeFormValidator.enableValidation();

const popupPreview = new PopupWithImage(imagePopup);
const aboutEditProfile = new PopupWithForm(aboutPopup, saveProfilePopup);
const popupAddCard = new PopupWithForm(popupAddPlace, saveNewElementPopup);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, '.elements__list');

cardList.renderItems();

const userProfile = new UserInfo({
    name: '.profile__name',
    job: '.profile__caption'
});

function openImagePopup(name, link) {
    popupPreview.open(link, name);
};

function createCard(cardData) {
    const cardElement = new Card(
        cardData,
        '.item-template',
        openImagePopup
    );
    return cardElement.generateCard();
};

function saveProfilePopup(data) {
    userProfile.setUserInfo(nameInput.value, jobInput.value);
    aboutEditProfile.close();
};

function saveNewElementPopup() {
    const cardElement = createCard({
        name: placeInput.value,
        link: imageInput.value,
    })
    cardList.addItem(cardElement);
    popupAddCard.close();
};

aboutButton.addEventListener('click', () => {
    aboutEditProfile.open();
    profileFormValidator.resetValidation();
    const userData = userProfile.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
});

placeAddButton.addEventListener('click', () => {
    popupAddCard.open();
    placeFormValidator.resetValidation();
    placeForm.reset();
});

popupPreview.setEventListeners();
aboutEditProfile.setEventListeners();
popupAddCard.setEventListeners();