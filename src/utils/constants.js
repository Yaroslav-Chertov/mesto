export const aboutButton = document.querySelector('.profile__edit-button');
export const aboutPopup = document.querySelector('.popup_type_profile');
export const profileForm = document.querySelector('[name="info"]');
export const nameInput = aboutPopup.querySelector('[name="name"]');
export const jobInput = aboutPopup.querySelector('[name="about"]');
export const placeAddButton = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_type_add-card');
export const placeForm = document.querySelector('[name="photo"]');
export const placeInput = popupAddPlace.querySelector('[name="name"]');
export const imageInput = popupAddPlace.querySelector('[name="link"]');
export const imagePopup = document.querySelector('.popup_type_view-photo');

export const validationObj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};