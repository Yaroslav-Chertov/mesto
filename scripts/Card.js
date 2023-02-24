export default class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    };

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    };

    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    };

    _likeCard() {
        this._likeButton.classList.toggle('element__like-button_liked');
    };

    _deleteCard() {
        this._element.remove();
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._openImagePopup(this._link, this._name)
        });
    };
}