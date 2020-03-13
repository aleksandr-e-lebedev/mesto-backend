# Mesto backend

Версия: v2.0.0

## Описание

Данный проект реализован в рамках учебной программы [Яндекс.Практикум](https://praktikum.yandex.ru) по профессии веб-разработчик для приобретения следующих навыков:
1. работа с базами данных;
2. обеспечение безопасности сервера;
3. тестирование сервера;
4. разворачивание бэкенда на удалённой машине.

Цель проекта — создать сервер с API и аутентификацией для проекта [Mesto](https://github.com/aleksandr-e-lebedev/mesto#readme).

## Используемые технологии

1. JavaScript,
2. Node.js,
3. Express,
4. MongoDB,
5. Git.

## Функциональные возможности

### I. Ответы сервера на успешные запросы

#### 1. Загрузка информации обо всех пользователях

Сделайте запрос вида:

`GET http://localhost:PORT/users`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект со всеми пользователями следующего вида:

```
{
  {
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "_id": "e20537ed11237f86bbb20ccb"    
  },
  {
    "name": "User two name",
    "about": "About user two",
    "avatar": "https://example.com/user-two-avatar.jpg",
    "_id": "b20537ed11237f86bbb20cce"    
  }
}
```

В случае если ни одного пользователя ещё не существует, в ответ Вы получите пустой объект, т.е. `{}`.

#### 2. Загрузка информации о конкретном пользователе

Сделайте запрос вида:

`GET http://localhost:PORT/users/userId`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с конкретным пользователем, идентификатор которого указан после `/users`, следующего вида:

```
{
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "_id": "e20537ed11237f86bbb20ccb"    
}
```

#### 3. Создание нового пользователя

Сделайте запрос вида:

`POST http://localhost:PORT/users`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg"  
}
```

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданным пользователем следующего вида:

```
{
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "_id": "e20537ed11237f86bbb20ccb"    
}
```

#### 4. Обновление профиля пользователя

Сделайте запрос вида:

`PATCH http://localhost:PORT/users/me`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "User one new name",
  "about": "New information about user one"  
}
```

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённой информацией пользователя следующего вида:

```
{
  "name": "User one new name",
  "about": "New information about user one",
  "avatar": "https://example.com/user-one-avatar.jpg",
  "_id": "e20537ed11237f86bbb20ccb"    
}
```

#### 5. Обновление аватара пользователя

Сделайте запрос вида:

`PATCH http://localhost:PORT/users/me/avatar`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "avatar": "https://example.com/user-one-new-avatar.jpg"
}
```

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённой ссылкой на аватар пользователя следующего вида:

```
{
  "name": "User one name",
  "about": "About user one",
  "avatar": "https://example.com/user-one-new-avatar.jpg",
  "_id": "e20537ed11237f86bbb20ccb"    
}
```

#### 6. Загрузка всех карточек всех пользователей

Сделайте запрос вида:

`GET http://localhost:PORT/cards`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект со всеми созданными карточками всех пользователей следующего вида:

```
[
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Card one name",
    "link": "https://example.com/card-one.jpg",
    "owner": {
      "name": "User one name",
      "about": "About user one",
      "avatar": "https://example.com/user-one-avatar.jpg",
      "_id": "e20537ed11237f86bbb20ccb"
    },
    "createdAt": "2020-03-12T08:10:57.741Z"
  },
  {
    "likes": [],
    "_id": "5d1f064ed321eb4bdcd707de",
    "name": "Card two name",
    "link": "https://example.com/card-two.jpg",
    "owner": {
      "name": "User two name",
      "about": "About user two",
      "avatar": "https://example.com/user-two-avatar.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607"
    },
    "createdAt": "2020-03-12T08:11:58.324Z"
  }
]
```

В случае если ни одной карточки ещё не существует, в ответ Вы получите пустой объект, т.е. `{}`.

#### 7. Создание новой карточки

Сделайте запрос вида:

`POST http://localhost:PORT/cards`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg"
}
```

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданной карточкой следующего вида:

```
{
  "likes": [],
  "_id": "5d1f0611d321eb4bdcd707dd",
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg",
  "owner": {
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "_id": "e20537ed11237f86bbb20ccb"
  },
  "createdAt": "2020-03-12T08:10:57.741Z"
}
```

#### 8. Удаление карточки

Сделайте запрос вида:

`DELETE http://localhost:PORT/cards/cardId`

В ответ Вы получите JSON-объект:

```
{
  "message": "Пост удалён"
}
```

#### 9. Постановка или снятие лайка карточки

Чтобы лайкнуть карточку, сделайте запрос вида:

`PUT http://localhost:PORT/cards/cardId/likes`

Чтобы убрать лайк, сделайте запрос вида:

`DELETE http://localhost:PORT/cards/cardId/likes`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с обновлённым массивом лайков карточки, идентификатор которой указан после `/cards`, следующего вида:

```
{
  "likes": [
    {
      "name": "User one name",
      "about": "About user one",
      "avatar": "https://example.com/user-one-avatar.jpg",
      "_id": "e20537ed11237f86bbb20ccb"    
    },
    {
      "name": "User two name",
      "about": "About user two",
      "avatar": "https://example.com/user-two-avatar.jpg",
      "_id": "b20537ed11237f86bbb20cce"    
    }
  ],
  "_id": "5d1f0611d321eb4bdcd707dd",
  "name": "Card one name",
  "link": "https://example.com/card-one.jpg",
  "owner": {
    "name": "User one name",
    "about": "About user one",
    "avatar": "https://example.com/user-one-avatar.jpg",
    "_id": "e20537ed11237f86bbb20ccb"
  },
  "createdAt": "2020-03-12T08:10:57.741Z"
}
```

#### 10. Важно

Обозначения в запросах:

1. `PORT` - это `3000` порт для режима `development` или номер порта, указанный в конфигурационном файле `.env`, для режима `production`;

2. `:userId` - это идентификатор пользователя, значение поля `_id` в объекте пользователя, например, `e20537ed11237f86bbb20ccb`;

3. `:cardId` - это идентификатор карточки, значение поля `_id` в объекте карточки, например, `5d1f0611d321eb4bdcd707dd`.

Во всех запросах, где необходимо передавать в теле запроса JSON-объект, в заголовках запроса указывайте `'Content-Type': 'application/json'`.

### II. Валидация данных в запросах

Все данные, переданные в теле запроса, проходят процесс валидации перед тем, как будут сохранены в базе данных MongoDB.

В случае если при обращении к серверу в запросе переданы невалидные данные, Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект с сообщением об ошибке, характеризующим вид допущенной ошибки, следующего формата:

```
{
  "message": "Error message"
}
```

### III. Обработка ошибок

Помимо данных, которые не прошли валидацию на сервере, ошибку могут вызвать следующие случаи:

1. обращение к несуществующему адресу;
2. внутренняя ошибка сервера.

В обоих случаях Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект с сообщением об ошибке, характеризующим вид ошибки.

Так, например, для первого случая при запросе

`GET http://localhost:PORT/users/nonexistent-id`

где `nonexistent-id` - это несуществующий идентификатор пользователя, Вы получите ответ со статусом `404` и JSON-объект:

```
{
  "message": "Нет пользователя с таким id"
}
```

или же при запросе

`METHOD http://localhost:PORT/nonexistent-address`

где `METHOD` - это любой тип `HTTP-запроса`, например, `GET`, `POST`, `PUT` и т.д., а `nonexistent-address` - это несуществующий адрес на сервере, Вы получите ответ со статусом `404` и JSON-объект:

```
{
  "message": "Запрашиваемый ресурс не найден"
}
```

Во втором случае Вы получите ответ со статусом `500` и JSON-объект:

```
{
  "message": "Что-то пошло не так"
}
```

### IV. Логгирование

В приложении реализовано логгирование:

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

Примечание:

* Для работы приложения в режиме `production` необходимо в корневой директории проекта создать конфигурационный файл `.env`, указав в нём переменные окружения (имена переменных см. в файле `config.dev.json`) в соответствии со следующим синтаксисом: на каждой новой строке - `NAME=VALUE`, где `NAME` - это имя переменной, а `VALUE` - её значение.

В приложении реализовано временное решение авторизации, поэтому после запуска:

1. создайте пользователя;

2. в конфигурационных файлах `.env` и `config.dev.json` укажите в переменной окружения с именем `TOKEN` идентификатор созданного пользователя;

3. если Вы находитесь в режиме `production`, перезапустите приложение с обновленным конфигурационным файлом `.env`.
