<p align="left">
  <img  src="https://i.ibb.co/9cHSWpG/white-Logo.png" alt="Logo" width="200px">
  <span>‎ ‎ ‎ ‎ ‎ </span>
  <img src="https://i.ibb.co/s3ZjKnq/logo-st.png" alt="Logo" width="200px">
</p>

# SAFETHROW

### О проекте

Мы создаем web-приложение (web-сервис), пишем сервер, на котором оно будет работать. Приложение будет предназначено для компаний, которым требуется внутренний приватный канал связи.

Пример его работы: директор запрашивает у секретаря паспортные данные всех сотрудников. Первый и последний — пользователи нашего веб-сервиса. Секретарь загружает все данные через интерфейс сайта на наш сервер. Все данные сразу же шифруются. Далее, эти данные секретарь отправляет директору, тоже в интерфейсе сайта, и директор, имея специальный ключ (сертификат), расшифровывает паспортные данные и получает их себе в пользование.

Будем применять хэширование, шифрование, подписание электронной подписью.

---

### Полезные ссылки

<a href="https://habr.com/ru/articles/649363/"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%A5%D1%8D%D1%88%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-red?style=for-the-badge&logo=javascript&logoColor=white&color=%23617aba"></a>
<span>ㅤ</span>
<a href="https://astral.ru/info/elektronnaya-podpis/obshchie-voprosy/kak-rabotaet-elektronnaya-podpis/"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%A8%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%2C%20%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8C-green?style=for-the-badge&logo=codecov&logoColor=white&color=%2396486a"></a>
<span>ㅤ</span>
<a href="https://wiki.merionet.ru/articles/principy-pki#:~:text=Public%20Key%20Infrastructure%20(PKI)%20%2D,%D0%B7%D0%B0%D0%BA%D1%80%D1%8B%D1%82%D0%BE%D0%B3%D0%BE%20%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9%20%D0%B4%D0%BB%D1%8F%20%D1%88%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%9F%D0%BE%D1%8F%D1%81%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%2C%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-green?style=for-the-badge&logo=wikipedia&logoColor=white&color=%23449481"></a>
<span>ㅤ</span>

<a href="https://miro.com/welcomeonboard/Y1hJV0tiR1lGVXRvdnVJTVpIOE1YTHVhMkxFdWVRNWdIUkVscWo1Y1ZoSG1LNXB6M1BmQ0I3bXVTSmcwMXZUU3wzNDU4NzY0NTgxMTE3Nzc3NzYzfDI=?share_link_id=486994893430"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%94%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%B0%D1%80%D1%82%D0%B0-yellow?style=for-the-badge&logo=miro&logoColor=white&color=%238c712d"></a>
<span>ㅤ</span>
<a href="https://www.figma.com/proto/cjn2Vz6t2f5AwI7wQ9zi7D/Blockchain?page-id=0%3A1&type=design&node-id=319-8&viewport=-2013%2C411%2C0.36&t=2UJgCu8CwgyA7N4z-1&scaling=scale-down-width&starting-point-node-id=319%3A8&mode=design"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0-%D0%A4%D0%B8%D0%B3%D0%BC%D0%B0-purple?style=for-the-badge&logo=figma&logoColor=white"></a>
<span>ㅤ</span>
<a href="https://www.figma.com/proto/nh8FZBz0YfU2EXr6MaH1kc/Logo?page-id=0%3A1&type=design&node-id=12-27&viewport=1085%2C-156%2C0.27&t=IqMwW5NXYk4WffPn-1&scaling=min-zoom&mode=design"><img alt="Static Badge" src="https://img.shields.io/badge/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%20%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%D0%B0-%D0%A4%D0%B8%D0%B3%D0%BC%D0%B0-purple?style=for-the-badge&logo=figma&logoColor=white"></a>

---

### Команды git

| Команда                                         | Описание                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| `init`                                          | инициализировать локальный репозиторий                                            |
| `commit -m "..."`                               | коммит                                                                            |
| `add .`                                         | добавить к коммиту всю локалку (индексировать)                                    |
| `add "example nomer 1.txt"` / `add example.txt` | индексировать конкретные файлы                                                    |
| `push origin имя_ветки`                         | загрузить на удаленный сервер                                                     |
| `pull/fetch origin имя_ветки`                   | выгрузить в локальный                                                             |
| `copy`                                          | копировать репозиторий                                                            |
| `status`                                        | проверить индексацию                                                              |
| `log`                                           | история изменений                                                                 |
| `branch`                                        | посмотреть ветки                                                                  |
| `branch имя_ветки`                              | создать ветку                                                                     |
| `checkout`                                      | выбрать ветку                                                                     |
| `rm имя_файла`                                  | удалить файл **локально и онлайн**, _добавь -r после rm чтобы обратиться к папке_ |
| `rm --cached имя_файла`                         | удалить файл **онлайн**                                                           |
| `branch -D имя_ветки`                           | удалить ветку **локально**                                                        |
| `push origin -d имя_ветки`                      | удалить ветку **онлайн**                                                          |
| `config --global core.autocrlf false`           | отключить LF -> CRLF                                                              |
