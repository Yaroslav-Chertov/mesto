const obj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

const showInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, obj);
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, buttonElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function disabledButton(buttonElement, obj) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
};

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(obj.submitButtonSelector);
        formElement.addEventListener('submit', (evt) => {
            disabledButton(buttonElement, obj);
        });
        setEventListeners(formElement, buttonElement, obj);
    });
};

enableValidation(obj);