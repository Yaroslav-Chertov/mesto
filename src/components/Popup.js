export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
        this._escapeClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escapeClose);
    };


    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escapeClose);

    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    };

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            this.close()
        });
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            };
        });
    };
}