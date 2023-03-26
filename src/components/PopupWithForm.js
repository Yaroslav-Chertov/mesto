import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitFn) {
        super(popupSelector);
        this._formSubmit = formSubmitFn;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._submit = this._form.querySelector('.form__save-button');
        this._buttonSubmitText = this._submit.textContent;
    };

    renderLoading(isLoading) {
        if (isLoading) {
            this._submit.textContent = 'Сохранение...';
        } else {
            this._submit.textContent = this._buttonSubmitText;
        };
    };

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    };

    _getInputValues() {
        this._inputValues = {};

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };
}