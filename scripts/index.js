const aboutButton = document.querySelector('.button-open-form');
const aboutPopup = document.querySelector('.popup-edit');
const aboutCloseButton = document.querySelector('.popup-edit__close-button');
const formElement = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const input = document.querySelector('.form__input');
const nameInput = aboutPopup.querySelector('.profile-name');
const jobInput = aboutPopup.querySelector('.profile-caption');
const aboutSaveButton = aboutPopup.querySelector('.popup__save-button');


aboutButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    aboutPopup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

aboutCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    aboutPopup.classList.remove('popup_opened');
})

aboutPopup.addEventListener('click', (evt) => {
    console.log(evt.target, evt.currentTarget);
    if (evt.target === evt.currentTarget) {
        aboutPopup.classList.remove('popup_opened');
    }
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(aboutPopup);
}

aboutPopup.addEventListener('submit', handleFormSubmit); 