### Authentication

    - Идентификација на идентитет во системот, дали сме тие што се претставуваме.
    - пр. Покажување на личната карта на надлежен да не идентификува

### Authorization

    - Кои овластувања ги има одреден корисник откако бил автентициран, до кои ресурси може да пристапи во одреден систем и како може да манипулира со тие ресурси.
    - пр. Некој надзорник ни ја проверува личната карта за да види кој оддел во зградата имаме дозвола да го посетиме.

### JWT - json web token

    - Header - го чува криптографскиот алгоритам - HS, MD5, AES
    - Payload - чува податоци за корисникот и време на истекување на токенот
    - Signature - се прави со помош на енкодирање на header и payload со тајниот клуч со специфицираниот алгоритам. Верифицира дека токенот не бил изменет при пренос на податоците

    - JWT се креира од страна на серверот
    - JWT е осигуран со таен клуч од страна на серверот
    - JWT се враќа до клиентот ако успешно се најавил истиот, тој токен се чува во local storage, session storage или cookie.
    - Токенот се користи т.ш го поставуваме во 'Authentication' во header-от на секој повик кој бара автентикација
    - Серверот не чува сесија на логираниот корисник туку се базира на сигурноста на JWT да го автентицира и авторизира барањето
    - Токенот има време на валидност

### Hash

    - aleksandar -> 120930192hfiusbgfidubgi -> ksjanfjlks892y4723y -> uhaefisodlrbgudr837
    - Kriptografski algoritmi za hesiranje
    - MD5 -> ovoj e probien
    - AES -> najsiguren momentalno
    - HS
    - RSA

    - email: vangel.hristov@gmail.com
    - password: uhaefisodlrbgudr837

### NPM

    - npm install express mongoose node-input-validator bcryptjs express-jwt jsonwebtoken