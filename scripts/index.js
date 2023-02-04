const aboutButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup_type_profile');
const aboutCloseButton = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('[name="info"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__caption');
const nameInput = aboutPopup.querySelector('[name="name"]');
const jobInput = aboutPopup.querySelector('[name="about"]');

const placeAddButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_add-card');
const placeCloseButton = popupAddPlace.querySelector('.popup__close-button');
const placeForm = document.querySelector('[name="photo"]');
const placeTitle = document.querySelector('.place__title');
const placeImage = document.querySelector('.place__image');
const placeInput = popupAddPlace.querySelector('[name="name"]');
const imageInput = popupAddPlace.querySelector('[name="link"]');

const imagePopup = document.querySelector('.popup_type_view-photo');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupPic = imagePopup.querySelector('.place__picture');
const imagePopupTitle = imagePopup.querySelector('.place__caption');

const cardsContainer = document.querySelector('.elements__list');
const cardsTemplate = document
    .querySelector('.item-template')
    .content
    .querySelector('.element');

const buttonCloseList = document.querySelectorAll('.popup__close-button');

//universal popup opening function
function openPopup(popup) {
    popup.classList.add('popup_opened');
    addEventListener('keydown', closePopupEsc);
}

//universal popup closing function
function closePopup(popup) {
    removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
}

function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.element__title');
    cardName.textContent = name;
    const cardImage = card.querySelector('.element__image');
    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = card.querySelector('.element__like-button');
    likeButton.addEventListener('click', function (evt) {
        likeButton.classList.toggle('element__like-button_liked');
    });

    const deleteButton = card.querySelector('.element__delete-button');
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
})

buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    });
    btn.addEventListener('click', () => closePopup(popup));
})