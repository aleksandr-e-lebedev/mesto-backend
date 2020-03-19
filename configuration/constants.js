const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const USER_NOT_FOUND = 'Нет пользователя с таким id';
const CARD_NOT_FOUND = 'Нет карточки с таким id';
const POST_REMOVED = 'Пост удалён';
const NOT_ENOUGH_RIGHTS = 'Недостаточно прав';
const SERVER_ERROR = 'Что-то пошло не так';
const INVALID_REQUEST = 'Запрос сформирован неправильно';
const INVALID_INPUT_DATA = 'Предоставлены некорректные данные';

const USER_NAME_REQUIRED = 'Пожалуйста, укажите своё имя';
const USER_NAME_MIN_LENGTH = 'Имя должно содержать не менее 2 символов';
const USER_NAME_MAX_LENGTH = 'Имя должно содержать не более 30 символов';
const USER_ABOUT_REQUIRED = 'Пожалуйста, укажите информацию о себе';
const USER_ABOUT_MIN_LENGTH = 'Информация о себе должна содержать не менее 2 символов';
const USER_ABOUT_MAX_LENGTH = 'Информация о себе должна содержать не более 30 символов';
const USER_AVATAR_REQUIRED = 'Пожалуйста, предоставьте своё фото';
const USER_AVATAR_IS_URL = 'Некорректный формат ссылки на фото для пользователя';
const USER_EMAIL_REQUIRED = 'Пожалуйста, укажите Вашу электронную почту';
const USER_EMAIL_IS_EMAIL = 'Пожалуйста, предоставьте действительный адрес электронной почты';
const USER_PASSWORD_REQUIRED = 'Пожалуйста, введите пароль';
const USER_PASSWORD_MIN_LENGTH = 'Пароль должен содержать не менее 8 символов';

const CARD_NAME_REQUIRED = 'У карточки должно быть название';
const CARD_NAME_MIN_LENGTH = 'Название карточки должно содержать не менее 2 символов';
const CARD_NAME_MAX_LENGTH = 'Название карточки должно содержать не более 30 символов';
const CARD_LINK_REQUIRED = 'У карточки должна быть ссылка на картинку';
const CARD_LINK_IS_URL = 'Некорректный формат ссылки на фото для карточки';
const CARD_OWNER_REQUIRED = 'У карточки должен быть владелец';

module.exports = {
  NOT_FOUND,
  USER_NOT_FOUND,
  CARD_NOT_FOUND,
  POST_REMOVED,
  NOT_ENOUGH_RIGHTS,
  SERVER_ERROR,
  INVALID_REQUEST,
  INVALID_INPUT_DATA,

  USER_NAME_REQUIRED,
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_ABOUT_REQUIRED,
  USER_ABOUT_MIN_LENGTH,
  USER_ABOUT_MAX_LENGTH,
  USER_AVATAR_REQUIRED,
  USER_AVATAR_IS_URL,
  USER_EMAIL_REQUIRED,
  USER_EMAIL_IS_EMAIL,
  USER_PASSWORD_REQUIRED,
  USER_PASSWORD_MIN_LENGTH,

  CARD_NAME_REQUIRED,
  CARD_NAME_MIN_LENGTH,
  CARD_NAME_MAX_LENGTH,
  CARD_LINK_REQUIRED,
  CARD_LINK_IS_URL,
  CARD_OWNER_REQUIRED,
};
