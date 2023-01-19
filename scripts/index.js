const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup-edit');
const aboutCloseButton = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');

const placeAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup-add');
const placeCloseButton = popupAddPlace.querySelector('.popup__close-button');
const placeForm = document.querySelector('[name="photo"]');
const placeTitle = document.querySelector('.place__title');
const placeImage = document.querySelector('.place__image');
const placeInput = popupAddPlace.querySelector('[name="name"]');
const imageInput = popupAddPlace.querySelector('[name="link"]');

const imagePopup = document.querySelector('.popup-place');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupPic = imagePopup.querySelector('.place__picture');
const imagePopupTitle = imagePopup.querySelector('.place__caption');

const cardsContainer = document.querySelector('.elements__list');
const cardsTemplate = document
    .querySelector('.item-template')
    .content
    .querySelector('.elements__card');

//universal popup opening function
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//universal popup closing function
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function deleteCard(evt) {
    evt.target.closest('.elements__card').remove();
}

function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.elements__title');
    cardName.textContent = name;
    const cardImage = card.querySelector('.elements__image');
    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = card.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function (evt) {
        likeButton.classList.toggle('elements__like-button_liked');
    });

    const deleteButton = card.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function (evt) {
        card.remove();
    });

    //photo popup
    cardImage.addEventListener('click', function (evt) {
        openPopup(imagePopup);
        imagePopupPic.src = link;
        imagePopupPic.alt = name;
        imagePopupTitle.textContent = name;
    });

    return card;
}

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
    openPopup(aboutPopup);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
})

aboutCloseButton.addEventListener('click', (evt) => {
    closePopup(aboutPopup);
})

aboutPopup.addEventListener('click', (evt) => {
    console.log(evt.target, evt.currentTarget);
    if (evt.target === evt.currentTarget) {
        closePopup(aboutPopup);
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
placeAddButton.addEventListener('click', (evt) => {
    openPopup(popupAddPlace);
    placeInput.value = placeTitle.textContent;
})

placeCloseButton.addEventListener('click', (evt) => {
    closePopup(popupAddPlace);
})

popupAddPlace.addEventListener('click', (evt) => {
    console.log(evt.target, evt.currentTarget);
    if (evt.target === evt.currentTarget) {
        closePopup(popupAddPlace);
    }
})

imageCloseButton.addEventListener('click', (evt) => {
    closePopup(imagePopup);
})