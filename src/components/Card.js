export default class Card {
    constructor(data, templateSelector, userId, handleCardClick, handleCardDel, likeMyCard, unlikeMyCard) {
        this._templateSelector = templateSelector;
        this._link = data.link;
        this._name = data.name;
        this._id = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleCardDel = handleCardDel;
        this._likeMyCard = likeMyCard;
        this._unlikeMyCard = unlikeMyCard;
        this._isOwner = data.owner._id === userId;
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
        this._card = this._getTemplate();
        this._cardDel = this._card.querySelector('.element__delete-button');
        this._cardLike = this._card.querySelector('.element__like-button');
        this._cardImage = this._card.querySelector('.element__image');
        this._cardTitle = this._card.querySelector('.element__title');
        this._quantityLikes = this._card.querySelector('.element__like-quantity');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._quantityLikes.textContent = this._likes.length;

        if (!this._isOwner) this._cardDel.remove();
        if (this._addlikeCard()) {
            this._cardLike.classList.add('element__like-button_liked');
        } else {
            this._cardLike.classList.remove('element__like-button_liked');
        };

        this._setEventListeners();

        return this._card;
    };

    _deleteCard() {
        this._handleCardDel(this._id, this._card);
    };

    toggleLikeCard(data) {
        this._quantityLikes.textContent = data.likes.length;
        this._cardLike.classList.toggle('element__like-button_liked');
    };

    _addlikeCard() {
        return this._likes.find((userLike) => userLike._id === this._userId);
    };

    _setLikes(evt) {
        if (evt.target.classList.contains('element__like-button_liked')) {
            this._unlikeMyCard(this._id, this);
        } else {
            this._likeMyCard(this._id, this);
        };
    };

    _setEventListeners() {
        this._cardDel.addEventListener('click', () => {
            this._deleteCard();
        });
        this._cardLike.addEventListener('click', (evt) => {
            this._setLikes(evt);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ link: this._link, name: this._name });
        });
    };
}