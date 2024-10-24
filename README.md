<p align="center">
<img  src="https://safethrow.vercel.app/_next/image?url=%2Fimg%2Fsafethrow.png&w=128&q=75" alt="Текст с описанием картинки"><space>
<p>

<p align="center">
<a href="https://www.hyperledger.org/"><img src="https://img.shields.io/badge/HYPERLEDGER-252525?style=for-the-badge&link=https://www.hyperledger.org/" alt="HYPERLEDGER" /></a>
<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/NextJS-FFF?style=for-the-badge&link=https://nextjs.org/" alt="NextJS" /></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailWind-252525?style=for-the-badge&link=https://tailwindcss.com/" alt="TailWind" /></a>
<p>

## SAFETHROW
Safethrow — это инновационный облачный сервис для безопасного хранения документов и обмена файлами. Разработан студентом таганрогской ИТА ЮФУ в 2024 году.

> *Уникальной чертой сервиса является **отсутствие базы данных**. Её заменяют несколько «каналов» блокчейна. Так же, как и в традиционной системе хранения данных пользователя, информация складируется, но не в виде таблицы, а в виде массива.*

## Особенности
- Реальная разработка велась в усеченные сроки — ровно месяц
- Дизайн создан в минималистичном стиле, чтобы пользователя не отвлекал навязчивый интерфейс
- UI подстроен под Android и IOS устройства

## Стек технологий
### Языки
- TypeScript
- JavaScript
- CSS
- HTML
### Бэкенд:
- [NextJS](https://nextjs.org/) — фреймворк на React
- [Hyperledger](https://www.hyperledger.org/) — база структуры блокчейна
### Фронтенд:
- [TailwindCSS](https://tailwindcss.com/) — постпроцессор CSS
- [Shadcn](https://ui.shadcn.com/) — компоненты для пользовательского интерфейса
- [RadixUI](https://www.radix-ui.com/icons) — иконки
- [Lucide-react](https://lucide.dev/icons/) — иконки
### Другое
- Node.js
- SH
- Nginx

## Реализация и решения

Для обеспечения стабильности работы сервиса была введена система разделения серверов на **клиентский** и **информационный**.  
- **Клиентский** работает на платформе Vercel, которая предоставляет услуги бесплатного хостинга.
- **Информационный** устрен немного сложнее: сервис [Timeweb](https://timeweb.cloud/) предоставляет виртуальные машины, и на одной из таких запущены ветви блокчейна. **Клиентский** сервер делает запрос на **информационный**, и последний выполняет поиск внутри массивов данных в блокчейне.  
ㅤ  
ㅤㅤ

<p align="center">
<img  src="https://safethrow.vercel.app/_next/image?url=%2Fimg%2Fsafethrow.png&w=128&q=75" alt="Текст с описанием картинки"><space>
<p>