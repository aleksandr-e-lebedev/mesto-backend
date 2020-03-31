# Mesto backend

Версия: v3.0.2

## Описание

Данный проект реализован в рамках учебной программы [Яндекс.Практикум](https://praktikum.yandex.ru) по профессии веб-разработчик для приобретения следующих навыков:
1. работа с базами данных;
2. обеспечение безопасности сервера;
3. тестирование сервера;
4. разворачивание бэкенда на удалённой машине.

Цель проекта — создать сервер с API и аутентификацией для проекта [Mesto](https://github.com/aleksandr-e-lebedev/mesto#readme).

## Демо

Front-end: [https://mesto-app.gq](https://mesto-app.gq)

API: [https://api.mesto-app.gq](https://api.mesto-app.gq)

IP-адрес сервера: 84.201.134.102

## Используемые технологии

1. JavaScript,
2. Node.js,
3. Express,
4. MongoDB,
5. Git.

## Функциональные возможности

### Предисловие

Обозначения в запросах:

1. `PORT` - это `3000` порт для режима `development` или номер порта, указанный в конфигурационном файле `.env`, для режима `production`;

2. `:userId` - это идентификатор пользователя, значение поля `_id` в объекте пользователя, например, `e20537ed11237f86bbb20ccb`;

3. `:cardId` - это идентификатор карточки, значение поля `_id` в объекте карточки, например, `5d1f0611d321eb4bdcd707dd`.

Во всех запросах, где необходимо передавать в теле запроса JSON-объект, в заголовках запроса указывайте `'Content-Type': 'application/json'`.

### I. Аутентификация и авторизация

#### 1. Регистрация пользователя

Сделайте запрос вида:

`POST http://localhost:PORT/signup`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "email": "user-one-email@example.com",
  "password": "user-one-password"
}
```

Требования к полям передаваемого JSON-объекта:

* **name**: строка; от 2 до 30 символов; обязательное поле;
* **about**: строка; от 2 до 30 символов; обязательное поле;
* **avatar**: строка, содержащая URL аватара пользователя; обязательное поле;
* **email**: строка, содержащая email пользователя; обязательное поле;
* **password**: строка; не менее 8 символов; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданным пользователем следующего вида:

```
{
  "_id": "e20537ed11237f86bbb20ccb",
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "email": "user-one-email@example.com"
}
```

Также в заголовках ответа среди прочего Вы получите httpOnly cookie сроком на 7 дней, содержащие токен доступа к ресурсам сервера, созданный по стандарту [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519), сроком на 7 дней.

Примечание:

* пароль пользователя хранится в базе данных в зашифрованном виде.

#### 2. Авторизация

Сделайте запрос вида:

`POST http://localhost:PORT/signin`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "email": "user-one-email@example.com",
  "password": "user-one-password"
}
```

Требования к полям передаваемого JSON-объекта:

* **email**: строка, содержащая email пользователя; обязательное поле;
* **password**: строка; не менее 8 символов; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с ранее созданным пользователем следующего вида:

```
{
  "_id": "e20537ed11237f86bbb20ccb",
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "email": "user-one-email@example.com",
}
```

Также в заголовках ответа среди прочего Вы получите httpOnly cookie сроком на 7 дней, содержащие токен доступа к ресурсам сервера, созданный по стандарту [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519), сроком на 7 дней.

### II. Ответы сервера на успешные запросы после авторизации

#### 1. Загрузка информации обо всех пользователях

Сделайте запрос вида:

`GET http://localhost:PORT/users`

Если запрос прошёл успешно, в ответе Вы получите JSON-массив со всеми пользователями следующего вида:

```
[
  {
    "_id": "e20537ed11237f86bbb20ccb",
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "email": "user-one-email@example.com"
  },
  {
    "_id": "b20537ed11237f86bbb20cce",
    "name": "User two name",
    "about": "About user two",
    "avatar": "https://example.com/user-two-avatar.jpg",
    "email": "user-two-email@example.com"
  }
]
```

В случае если ни одного пользователя ещё не существует, в ответ Вы получите пустой массив, т.е. `[]`.

#### 2. Загрузка информации о конкретном пользователе

Сделайте запрос вида:

`GET http://localhost:PORT/users/:userId`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с конкретным пользователем, идентификатор которого указан после `/users`, следующего вида:

```
{
  "_id": "e20537ed11237f86bbb20ccb",
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "email": "user-one-email@example.com"
}
```

#### 3. Обновление профиля пользователя

Сделайте запрос вида:

`PATCH http://localhost:PORT/users/me`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "User one new name",
  "about": "New information about user one"
}
```

Требования к полям передаваемого JSON-объекта:

* **name**: строка; от 2 до 30 символов; обязательное поле;
* **about**: строка; от 2 до 30 символов; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённой информацией пользователя следующего вида:

```
{
  "_id": "e20537ed11237f86bbb20ccb",
  "name": "User one new name",
  "about": "New information about user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "email": "user-one-email@example.com"
}
```

Примечание:

* если Вам необходимо обновить только поле **name** или же только поле **about**, в передаваемом JSON-объекте Вы можете изменить лишь необходимое поле, оставив другое неизменённым.

#### 4. Обновление аватара пользователя

Сделайте запрос вида:

`PATCH http://localhost:PORT/users/me/avatar`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "avatar": "https://example.com/user-one-new-avatar.jpg"
}
```

Требование к полю передаваемого JSON-объекта:

* **avatar**: строка, содержащая URL аватара пользователя; обязательное поле.


Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённой ссылкой на аватар пользователя следующего вида:

```
{
  "_id": "e20537ed11237f86bbb20ccb",
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-new-avatar.jpg",
  "email": "user-one-email@example.com"
}
```

#### 5. Загрузка всех карточек всех пользователей

Сделайте запрос вида:

`GET http://localhost:PORT/cards`

Если запрос прошёл успешно, в ответе Вы получите JSON-массив со всеми созданными карточками всех пользователей следующего вида:

```
[
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Card one name",
    "link": "https://example.com/card-one.jpg",
    "owner": {
      "_id": "e20537ed11237f86bbb20ccb",
      "name": "User one name",
      "about": "About user one",
      "avatar": "https://example.com/user-one-avatar.jpg",
      "email": "user-one-email@example.com"
    },
    "createdAt": "2020-03-12T08:10:57.741Z"
  },
  {
    "likes": [],
    "_id": "5d1f064ed321eb4bdcd707de",
    "name": "Card two name",
    "link": "https://example.com/card-two.jpg",
    "owner": {
      "_id": "ef5f7423f7f5e22bef4ad607",
      "name": "User two name",
      "about": "About user two",
      "avatar": "https://example.com/user-two-avatar.jpg",
      "email": "user-two-email@example.com"
    },
    "createdAt": "2020-03-12T08:11:58.324Z"
  }
]
```

В случае если ни одной карточки ещё не существует, в ответ Вы получите пустой массив, т.е. `[]`.

#### 6. Создание новой карточки

Сделайте запрос вида:

`POST http://localhost:PORT/cards`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg"
}
```

Требования к полям передаваемого JSON-объекта:

* **name**: строка; от 2 до 30 символов; обязательное поле;
* **link**: строка, содержащая URL карточки; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданной карточкой следующего вида:

```
{
  "likes": [],
  "_id": "5d1f0611d321eb4bdcd707dd",
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg",
  "owner": {
    "_id": "e20537ed11237f86bbb20ccb",
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "email": "user-one-email@example.com"
  },
  "createdAt": "2020-03-12T08:10:57.741Z"
}
```

#### 7. Удаление карточки

Сделайте запрос вида:

`DELETE http://localhost:PORT/cards/:cardId`

В ответ Вы получите JSON-объект:

```
{
  "message": "Пост удалён"
}
```

Примечание:

* удалить можно только свою карточку.

#### 8. Постановка или снятие лайка карточки

Чтобы лайкнуть карточку, сделайте запрос вида:

`PUT http://localhost:PORT/cards/:cardId/likes`

Чтобы убрать лайк, сделайте запрос вида:

`DELETE http://localhost:PORT/cards/:cardId/likes`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённым массивом лайков карточки, идентификатор которой указан после `/cards`, следующего вида:

```
{
  "likes": [
    {
      "_id": "e20537ed11237f86bbb20ccb",
      "name": "User one name",
      "about": "About user one",
      "avatar": "https://example.com/user-one-avatar.jpg",
      "email": "user-one-email@example.com"
    },
    {
      "_id": "b20537ed11237f86bbb20cce",
      "name": "User two name",
      "about": "About user two",
      "avatar": "https://example.com/user-two-avatar.jpg",
      "email": "user-two-email@example.com"
    }
  ],
  "_id": "5d1f0611d321eb4bdcd707dd",
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg",
  "owner": {
    "_id": "e20537ed11237f86bbb20ccb",
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "email": "user-one-email@example.com"
  },
  "createdAt": "2020-03-12T08:10:57.741Z"
}
```

### III. Валидация данных в запросах

Все данные, переданные в теле запроса, проходят процесс валидации перед тем, как будут сохранены в базе данных MongoDB.

В случае если при обращении к серверу в запросе переданы невалидные данные, Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект, формат которого зависит от режима, в котором запущено приложение.

В режиме `production` JSON-объект содержит сообщение об ошибке, характеризующее вид допущенной ошибки:

```
{
  "message": "Error message"
}
```

В режиме `development` JSON-объект помимо сообщения об ошибке, характеризующего вид допущенной ошибки, также содержит дополнительные поля:

```
{
  "name": "Error name",
  "message": "Error message",
  "error": {
    "name": "Error name",
    "statusCode": Status code number,
    "isOperational": true
  },
  "stack": Stack trace
}
```

### IV. Обработка ошибок

Помимо данных, которые не прошли валидацию на сервере, ошибку могут вызвать следующие случаи:

1. регистрация пользователя с email, который уже был использован для регистрации другого пользователя;
2. попытка авторизации с неправильно указанными email или password;
3. обращение к ресурсам сервера при отсутствии в запросе заголовка cookie;
4. обращение к ресурсам сервера при отсутствии в запросе, в заголовке cookie, токена доступа;
5. обращение к ресурсам сервера с токеном доступа, срок действия которого истек;
6. обращение к ресурсам сервера с токеном доступа, подпись которого недействительна;
7. удаление карточки, созданной другим пользователем;
8. обращение к несуществующему адресу;
9. внутренняя ошибка сервера;
10. превышение лимита обращений к серверу с одного IP в установленный интервал времени.

Примечание:
* в пунктах 3-6 вышеуказанного списка имеются ввиду все доступные ресурсы, за исключением `/signup` и `/signin`.

Во всех вышеуказанных случаях Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект, формат которого зависит от режима, в котором запущено приложение.

В режиме `production` JSON-объект содержит сообщение об ошибке, характеризующее вид допущенной ошибки:

```
{
  "message": "Error message"
}
```

В режиме `development` JSON-объект помимо сообщения об ошибке, характеризующего вид допущенной ошибки, также содержит дополнительные поля:

```
{
  "name": "Error name",
  "message": "Error message",
  "error": {
    "name": "Error name",
    "statusCode": Status code number,
    "isOperational": true
  },
  "stack": Stack trace
}
```

Примечания:

* не во всех ошибках будет присутствовать поле stack;
* в некоторых ошибках в объекте error среди прочих полей будет также присутствовать поле message.

#### Примеры

**1. Регистрация пользователя с email, который уже был использован для регистрации другого пользователя**

Режим `production`:

Status: `409 Conflict`

```
{
  "message": "user-one-email@example.com - Поле с таким значением уже существует. Пожалуйста, используйте другое значение"
}
```

Режим `development`:

Status: `409 Conflict`

```
{
  "name": "ConflictError",
  "message": "user-one-email@example.com - Поле с таким значением уже существует. Пожалуйста, используйте другое значение",
  "error": {
    "name": "ConflictError",
    "statusCode": 409,
    "isOperational": true
  },
  "stack": "ConflictError: user-one-email@example.com - Поле с таким значением уже существует. Пожалуйста, используйте другое значение\n ..."
}
```

**2. Обращение к ресурсам сервера с токеном доступа, подпись которого недействительна**

Режим `production`:

Status: `401 Unauthorized`

```
{
  "message": "Недействительный токен. Пожалуйста, авторизуйтесь заново"
}
```

Режим `development`:

Status: `401 Unauthorized`

```
{
  "name": "UnauthorizedError",
  "message": "Недействительный токен. Пожалуйста, авторизуйтесь заново",
  "error": {
    "name": "UnauthorizedError",
    "statusCode": 401,
    "isOperational": true
  },
  "stack": "UnauthorizedError: Недействительный токен. Пожалуйста, авторизуйтесь заново\n ..."
}
```

**3. Обращение к несуществующему адресу**

**Запрос**

`GET http://localhost:PORT/users/:nonexistent-id`

где `:nonexistent-id` - это несуществующий идентификатор пользователя.

**Ответ**

Режим `production`:

Status: `404 Not Found`

```
{
  "message": "Нет пользователя с таким id"
}
```

Режим `development`:

Status: `404 Not Found`

```
{
  "name": "NotFoundError",
  "message": "Нет пользователя с таким id",
  "error": {
    "name": "NotFoundError",
    "statusCode": 404,
    "isOperational": true,
    "message": "Нет пользователя с таким id"
  }
}
```

**Запрос**

`METHOD http://localhost:PORT/nonexistent-address`

где `METHOD` - это любой тип `HTTP-запроса`, например, `GET`, `POST`, `PUT` и т.д., а `nonexistent-address` - это несуществующий адрес на сервере.

**Ответ**

Режим `production`:

Status: `404 Not Found`

```
{
  "message": "Запрашиваемый ресурс не найден: /nonexistent-address"
}
```

Режим `development`:

Status: `404 Not Found`

```
{
  "name": "NotFoundError",
  "message": "Запрашиваемый ресурс не найден: /nonexistent-address",
  "error": {
    "name": "NotFoundError",
    "statusCode": 404,
    "isOperational": true,
    "message": "Запрашиваемый ресурс не найден: /nonexistent-address"
  }
}
```

**4. Внутренняя ошибка сервера**

Режим `production`:

Status: `500 Internal Server Error`

```
{
  "message": "Что-то пошло не так"
}
```

Режим `development`:

Status: `500 Internal Server Error`

```
{
  "message": "x is not defined",
  "error": {
    "statusCode": 500,
    "message": "x is not defined"
  }
}
```

### V. Логирование

В приложении реализовано логирование:

1. запросов и ответов;
2. ошибок.

Запросы и ответы записываются в файл `request.log`, ошибки в асинхронном коде - в файл `error.log`, в синхронном - в файл `exceptions.log`.

## Как развернуть проект

Клонируйте репозиторий:

`git clone https://github.com/aleksandr-e-lebedev/mesto-backend.git`

Для установки необходимых пакетов выполните:

`npm install`

Убедитесь, что у Вас установлена база данных [MongoDB](https://www.mongodb.com/).

Для запуска сервера MongoDB выполните:

`mongod`

Запуск:

* Режим **development** (с hot reload): `npm run dev`;

* Режим **production**: `npm run start`.

Примечания:

1) для работы приложения в режиме `production` необходимо в корневой директории проекта создать конфигурационный файл `.env`, указав в нём переменные окружения (имена переменных см. в файле `config.dev.json`) в соответствии со следующим синтаксисом: на каждой новой строке - `NAME=VALUE`, где `NAME` - это имя переменной, а `VALUE` - её значение;

2) поскольку в приложении реализована авторизация, перед запуском приложения в режиме `production` в конфигурационном файле `.env` в переменной `JWT_SECRET` укажите секретный ключ, который будет использован для создания подписи выдаваемого приложением токена доступа, отличный от секретного ключа в режиме `development`;

3) Вы можете создать криптостойкий псевдослучайный `JWT_SECRET` для режима `production`, выполнив:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
