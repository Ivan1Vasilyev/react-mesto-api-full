# Проект: Место

_Учебный проект, написан в рамках обучения на курсе веб-разработки Яндекс-Практикума._

### Описание

- Регистрация пользователя происходит после отправки пользователем email-адреса и пароля. Если пользователь заполнил необязательные поля с даннными о себе и ссылкой на аватар, они отобразятся на главной странице после авторизации, в противном случае отобразятся дефолтные данные с Жак-Ивом Кусто.

- После регистрации пользователь попадает на страницу авторизации, где должен ввести email и пароль. Пользователь получит сообщение об ошибке в попапе, если почта или пароль не верны. Если данные верны, пользователь попадёт на главную страницу.

- На главной странице отображаются:

  - шапка сайта с логотипом, почтой пользователя и кнопкой выхода;
  - аватар пользователя, его данные - имя и род деятельности (или иное описание), кнопки:
    - клик по аватару откроет попап с формой, которая ожидает URL-ссылку на новый аватар;
    - клик на кнопку рядом с данными пользователя откроет попап с формой для редактирования этих данных;
    - клик на кнопку добавления карточки откроет попап с формой добавления новой карточки, которая ожидает URL-ссылку на картинку и название к ней;
  - все карточки, ранее добавленные всеми пользователями этого сайта, каждая карточка содержит в себе:
    - картинку,
    - название,
    - иконку лайка,
    - количество лайков,
    - иконку удаления карточки, если пользователь является хозяином карточки;
  - клик по картинке карточки откроет во всплывшем окне эту картинку в увеличенном виде, описание будет расположено снизу картинки;
  - клик по иконке лайка (незакрашенное сердечко) увеличит счётчик лайков на 1, а сердечко станет закрашенным, повторный клик уменьшит счётчик лайков на 1, а сердечко вновь станет незакрашенным;
  - клик по иконке удаления карточки откроет попап с подтверждением удаления: для подтверждения надо нажать кнопку "Да" - попап закроется, а карточка удалится; для отмены надо просто закрыть попап любым из способов: клик по оверлею, по иконке закрытия (крестик), клавиша Escape;
  - клик по кнопке "Выход" октроет попап с подтверждением выхода, логика аналогична подтверждению удаления карточки; после выхода пользователь теряет доступ к главной странице и попадает на страницу авторизации;
  - реализована ux-обработка при обращении к серверу: пользователь видит меняющийся текст кнопки.

- Валидация форм:
  - пользователь может отправить данные, только если все обязательные поля формы заполнены верно, необязательные поля должны быть либо заполнены валидными данными, либо пропущены;
  - пользователь видит под полем ввода текст ошибки, который обновляется с каждым изменением в поле ввода;
  - во всех формах кнопка отправки данных изначально заблокирована.

**Технологии front-end**

- Адаптивность и отзывчивость страницы реализована средствами Flex-box, Grid-layout и запросами @media.
- Карточки и данные пользователя загружаются на главную страницу только после авторизации пользователя.
- Проект сделан на JavaScript-библиотеке React.
- Для реализации был сделан выбор в пользу функциональных компонентов.
- Навигация пользователя между основной страницей, страницей авторизации и регистрации реализована с помощью библиотеки "react-router-dom" версии 5.2.1.
- Обработка и валидация форм выполнена с помощью библиотек Formik и Yup.

**Бэкенд**

- Бэкенд собран на NodeJS.
- Данные хранятся на сервере в базе данных Express.
- Для взаимодействия с сервером используется библиотека Mongoose.
- Роутинг:

  - неавторизованным пользователям закрыт доступ к данным и действиям, предназначенным только авторизованному пользователю;
  - авторизация пользователя осществляется отправкой браузеру файла cookie, срок действия которого истекает через 7 дней.
  - выход из профиля обновляет файл cookie на новый с нулевым сроком действия и отправляет пользователя на страницу авторизации.

- Валидация:

  - входящие данные валидируются как в модели сервера, так и перед серверной обработкой с помощью библиотеки celebrate и Joi;
  - валидируется не только пользовательский ввод, но и такие форматы как URL и email.
  - если в роуте есть такие данные, как, например, id, то такие данные тоже валидируются.

- Безопасность:

  - пароль хранится в базе данных в зашифрованном виде. Работу с паролями осуществляет библиотека bcryptjs;
  - проект защищён от XSS-атаки через входящие данные библиотекой escape-html;
  - файлы cookie недоступны через javascript установкой флага httpOnly: true, и от CSRF-запроса флагом samesite: true;
  - секретный ключ для генерации токена сгенерирован модулем crypto и хранится в переменных окружения;
  - заголовки безопасности автоматически выставляет модуль helmet;
  - мидлвер express-rate-limit ограничивает количество обращений на сервер от одного ip до 300 за 15 минут;

- [Ссылка на проект](https://moovies.nomoredomains.work)
