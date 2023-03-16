import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    aboutButton,
    profileForm,
    nameInput,
    jobInput,
    placeAddButton,
    placeForm,
    validationObj
}
    from '../utils/constants.js';

const profileFormValidator = new FormValidator(validationObj, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationObj, placeForm);
placeFormValidator.enableValidation();

const popupPreview = new PopupWithImage('.popup_type_view-photo');
const aboutEditProfile = new PopupWithForm('.popup_type_profile', saveProfilePopup);
const popupAddCard = new PopupWithForm('.popup_type_add-card', saveNewElementPopup);

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
    userProfile.setUserInfo(data.name, data.about);
};

function saveNewElementPopup(newCard) {
    cardList.addItem(createCard(newCard));
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
});

popupPreview.setEventListeners();
aboutEditProfile.setEventListeners();
popupAddCard.setEventListeners();