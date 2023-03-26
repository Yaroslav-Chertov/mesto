import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePicPopup = this._popup.querySelector('.place__picture');
        this._namePicPopup = this._popup.querySelector('.place__caption');
    };

    open(data) {
        super.open();
        this._imagePicPopup.src = data.link;
        this._imagePicPopup.alt = data.name;
        this._namePicPopup.textContent = data.name;
    };
}