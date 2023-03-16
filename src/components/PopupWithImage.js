import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePicPopup = this._popup.querySelector('.place__picture');
        this._namePicPopup = this._popup.querySelector('.place__caption');
    };

    open(name, link) {
        super.open();
        this._imagePicPopup.src = link;
        this._imagePicPopup.alt = name;
        this._namePicPopup.textContent = name;
    };
}