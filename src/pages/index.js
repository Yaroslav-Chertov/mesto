import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
    aboutButton,
    profileForm,
    placeAddButton,
    placeForm,
    validationObj,
    avatarForm,
    buttonEditAvatar
}
    from '../utils/constants.js';

const profileFormValidator = new FormValidator(validationObj, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationObj, placeForm);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationObj, avatarForm);
avatarFormValidator.enableValidation();

const popupPreview = new PopupWithImage('.popup_type_view-photo');
const popupDeleteCard = new PopupWithConfirm('.popup_type_del-card');
const popupAvatar = new PopupWithForm('.popup_type_update-avatar', saveAvatar);
const aboutEditProfile = new PopupWithForm('.popup_type_profile', saveProfilePopup);

let userId;

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-61',
    '6a1833eb-800a-4ae7-9f24-46696a199881'
);

Promise.all([api.getCurrentUser(), api.getCards()])
    .then(([user, elements]) => {
        userInfo.setUserInfo(user);
        userId = user._id;
        cardsList.renderItems(elements);
    })
    .catch((err) => {
        console.log(err);
    });

const userInfo = new UserInfo({
    name: '.profile__name',
    about: '.profile__caption',
    avatar: '.profile__avatar'
});

const cardsList = new Section(
    {
        renderer: (item) => {
            const cardElement = createCard(item);
            cardsList.addItem(cardElement);
        },
    },
    '.elements__list'
);

const popupAddCard = new PopupWithForm('.popup_type_add-card', (data) => {
    popupAddCard.renderLoading(true);
    api
        .createNewCard(data)
        .then((newCard) => {
            cardsList.addItem(createCard(newCard));
            popupAddCard.close();
        })
        .catch((err) => console.log(err))
        .finally(() => popupAddCard.renderLoading(false));
});

function openImagePopup(cardData) {
    popupPreview.open(cardData);
};

function deleteCardApi(id, card) {
    popupDeleteCard.open();
    popupDeleteCard.changeSubmitHandler(() => {
        popupDeleteCard.renderLoading(true);
        api
            .deleteCard(id)
            .then(() => {
                card.remove();
                popupDeleteCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupDeleteCard.renderLoading(false);
            });
    });
};

function likeMyCard(id, card) {
    api
        .likeCard(id)
        .then((res) => {
            card.toggleLikeCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

function unlikeMyCard(id, card) {
    api
        .unlikeCard(id)
        .then((res) => {
            card.toggleLikeCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

function createCard(cardData) {
    const cardElement = new Card(
        cardData,
        '.item-template',
        userId,
        openImagePopup,
        deleteCardApi,
        likeMyCard,
        unlikeMyCard
    );
    return cardElement.generateCard();
};

function saveProfilePopup(data) {
    aboutEditProfile.renderLoading(true);
    api
        .createNewUser(data)
        .then((item) => {
            userInfo.setUserInfo(item);
            aboutEditProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            aboutEditProfile.renderLoading(false);
        });
};

function saveAvatar(data) {
    popupAvatar.renderLoading(true);
    api
        .createNewAvatar(data)
        .then((item) => {
            userInfo.setUserInfo(item);
            popupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupAvatar.renderLoading(false);
        });
};

placeAddButton.addEventListener('click', () => {
    popupAddCard.open();
    placeFormValidator.resetValidation();
});

aboutButton.addEventListener('click', () => {
    aboutEditProfile.setInputValues(userInfo.getUserInfo());
    aboutEditProfile.open();
    profileFormValidator.resetValidation();
});

buttonEditAvatar.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    popupAvatar.open();
});

popupAvatar.setEventListeners();
aboutEditProfile.setEventListeners();
popupPreview.setEventListeners();
popupDeleteCard.setEventListeners();
popupAddCard.setEventListeners();