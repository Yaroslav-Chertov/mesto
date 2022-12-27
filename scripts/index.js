const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup');
const aboutCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');

aboutButton.addEventListener('click', (evt) => {
    aboutPopup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

aboutCloseButton.addEventListener('click', (evt) => {
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