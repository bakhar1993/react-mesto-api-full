import { ESC_KEYCODE } from './constans.js';


//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener('mousedown', closeOvarlay);
}

//закрытие попапа кликом
function closeOvarlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
}

//закрытие попапа ESC
function closePopupEsc(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener('mousedown', closeOvarlay);
}

// //удаление карточки
// function deleteCards(evt){
//   evt.target.closest('.photo-grid__item').remove();
// }

// //лайк
// function clickLike(evt) {
//   evt.target.classList.toggle('photo-grid__like_active');
// }

export { openPopup, closePopup }