const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup-edit');
const aboutCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');

const addButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup-add');
const closeAddPlaceButton = addPlacePopup.querySelector('.popup__close-button');
const placeForm = document.querySelector('[name="photo"]');
const placeTitle = document.querySelector('.place__title');
const placeImage = document.querySelector('.place__image');
const placeInput = addPlacePopup.querySelector('[name="name"]');
const imageInput = addPlacePopup.querySelector('[name="link"]');

const placePopup = document.querySelector('.popup-place');
const closePlaceButton = placePopup.querySelector('.popup__close-button');
const placePopupImage = placePopup.querySelector('.place__picture');
const placePopupTitle = placePopup.querySelector('.place__caption');

const cardsContainer = document.querySelector('.elements__list');
const cardsTemplate = document
    .querySelector('.item-template')
    .content
    .querySelector('.elements__card');

function deleteCard(evt) {
    evt.target.closest('.elements__card').remove();
}

function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.elements__title');
    cardName.textContent = name;
    const cardImage = card.querySelector('.elements__image');
    cardImage.src = link;

    const likeButton = card.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function (evt) {
        likeButton.classList.toggle('elements__like-button_liked');
    });

    const deleteButton = card.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function (evt) {
        deleteButton.classList.contains('.elements__card');
        card.remove();
    });

    //photo popup
    const viewPhoto = card.querySelector('.elements__image');
    viewPhoto.addEventListener('click', function (evt) {
        placePopup.classList.add('popup_opened');
        placePopupImage.src = link;
        placePopupTitle.textContent = name;
    });

    closePlaceButton.addEventListener('click', (evt) => {
        placePopup.classList.remove('popup_opened');
    })

    return card;
}

function addCard(evt) {
    evt.preventDefault();
    const newCardName = placeInput.value;
    const newCardLink = imageInput.value;
    const addedNewCard = createCard({
        name: newCardName,
        link: newCardLink
    })
    cardsContainer.prepend(addedNewCard);

    closePopup(addPlacePopup);
    placeForm.reset();
}

placeForm.addEventListener('submit', addCard);

function renderCards() {
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        cardsContainer.append(cardHtml);
    });
}

renderCards();

//profile popup
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

//new place popup
addButton.addEventListener('click', (evt) => {
    addPlacePopup.classList.add('popup_opened');
    placeInput.value = placeTitle.textContent;
    imageInput.value = placeImage.textContent;
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeAddPlaceButton.addEventListener('click', (evt) => {
    addPlacePopup.classList.remove('popup_opened');
})

addPlacePopup.addEventListener('click', (evt) => {
    console.log(evt.target, evt.currentTarget);
    if (evt.target === evt.currentTarget) {
        addPlacePopup.classList.remove('popup_opened');
    }
})