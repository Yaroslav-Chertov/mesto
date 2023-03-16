import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSumbit) {
        super(popupSelector);
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._submit = this._popup.querySelector('.form__save-button');
        this._form = this._popup.querySelector('.form');
        this._handleFormSumbit = handleFormSumbit;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSumbit(this._getInputValues());
            this.close();
        });

    };

    close() {
        super.close();
        this._form.reset();
    };
}