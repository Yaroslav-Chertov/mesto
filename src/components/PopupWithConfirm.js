import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.form');
        this._submit = this._formElement.querySelector('.form__save-button');
        this._buttonSubmitText = this._submit.textContent;
    };

    renderLoading(isLoading) {
        if (isLoading) {
            this._submit.textContent = 'Сохранение...';
        } else {
            this._submit.textContent = this._buttonSubmitText;
        };
    };

    changeSubmitHandler(item) {
        this._deleteCard = item;
    };

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCard();
        });
    };
}