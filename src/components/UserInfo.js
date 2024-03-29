export default class UserInfo {
    constructor(userSelectors) {
        this._name = document.querySelector(userSelectors.name);
        this._about = document.querySelector(userSelectors.about);
        this._avatar = document.querySelector(userSelectors.avatar);
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
        };
    };

    setUserInfo(user) {
        this._name.textContent = user.name;
        this._about.textContent = user.about;
        this._avatar.src = user.avatar;
    };
}