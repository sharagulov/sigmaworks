<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration | Safethrow</title>

    <style>
        <?php include './css/reg-style.css'; ?>
        <?php include './css/total-style.css'; ?>
    </style>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="reg-container">
        <div class="noise"></div>
        <div class="reg-flex">
            <div class="reg-blank-flex-reserve" id="reg-blank-flex-reserve">
                <div class="reg-blank" id="reg-blank">
                    <div class="reg-blank-inner-blocks-flex">
                        <div class="reg-blank-logo"><img draggable="false" style="width: 25px; height: 25px;" src="/img/Add Male User Group.png" alt=""></div>
                        <div class="reg-blank-name"><span style="font-size: 23px; color: white; font-weight: 600; line-height: 25px;">Регистрация в системе Safethrow</span></div>
                        <div class="reg-blank-desc" id="reg-blank-desc1"><span>Safethrow предоставляет приватное и надежное файловое хранилище, поддерживающее фукцию шифрования документов и создания электронных подписей, а также генерации сертификатов и ключей.</span></div>
                        <div style="margin-top: 112px; position: absolute; opacity: 0; width: 270px;" class="reg-blank-desc" id="reg-blank-desc2"><span>Наша рабочая политика основана на Вашей безопасности. Любая информация, доверенная нам на хранение, шифруется еще до отправки и принадлежит только Вам. В среде деловых компаний это особенно важный фактор.</span></div>
                        <form class="reg-input-flex-1" action="" novalidate>

                            <div class="reg-login-box reg-boxes reg-box1">
                                <input class="reg-input-area reg-box" id="reg-login" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel1" for="reg-login">Логин</label>
                                <img draggable="false" class="reg-input-help" src="/img/help-icon.png" alt="">
                                <div class="reg-hint1 reg-hint">
                                    <span>Это название Вашего аккаунта в системе Safethrow. С его помощью осуществляется вход после регистрации.<br><br>Рекомендуемая длина до 20 символов.</span>
                                </div>
                                <!-- <div class="error-dot"></div> -->
                                <!-- sobaka s yshami -->
                                
                            </div>
                            <div class="reg-pass-box reg-boxes reg-box2" style="position: absolute; width: 100%; opacity: 0;">
                                <input class="reg-input-area reg-box" id="reg-pass" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel2" for="reg-pass">Пароль</label>
                                <img draggable="false" class="reg-input-help" src="/img/help-icon.png" alt="">
                                <div class="reg-hint1 reg-hint">
                                    <span>Пароль для защиты аккаунта. Он будет храниться на сервере в виде необратимого набора сгенерированных символов, мы гарантируем его приватность.<br><br>Рекомендуется использование заглавных и строчных латинских букв, а также цифр и специальных символов.</span>
                                </div>
                            </div>
                            <div class="reg-mail-box reg-boxes reg-box1" id="reg-boxes">
                                <input class="reg-input-area reg-box" id="reg-mail" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel3" for="reg-mail">Почта</label>
                                <img draggable="false" class="reg-input-help" src="/img/help-icon.png" alt="">
                                <div class="reg-hint1 reg-hint">
                                    <span>Адрес почты Вашей компании, на который вы предпочитаете получить письмо для верификации аккаунта. Также на него будут отправляться уведомления и рассылки.</span>
                                </div>
                            </div>
                            <div class="reg-repass-box reg-boxes reg-box2"  style="position: absolute; width: 100%; top: 70px; opacity: 0;">
                                <input class="reg-input-area reg-box" id="reg-repass" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel4" for="reg-repass">Повтор пароля</label>
                            </div>
                            <div class="reg-name-box reg-boxes reg-box1">
                                <input class="reg-input-area reg-box" id="reg-name" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel5" for="reg-name">Название организации</label>
                                <img draggable="false" class="reg-input-help" src="/img/help-icon.png" alt="">
                                <div class="reg-hint1 reg-hint">
                                    <span>Второе имя Вашего аккаунта, видимое другими пользователями. Оно будет отображаться в личном кабинете.<br><br> Рекомендуемая длина до 20 символов.</span>
                                </div>
                            </div>
                            <div class="reg-ogrn-box reg-boxes reg-box2" style="position: absolute; width: 100%; top: 130px; opacity: 0;">
                                <input class="reg-input-area reg-box" id="reg-ogrn" type="text" autocomplete="off" required>
                                <label class="reg-labels" id="inputLabel6" for="reg-ogrn">ОГРН</label>
                                <img draggable="false" class="reg-input-help" src="/img/help-icon.png" alt="">
                                <div class="reg-hint1 reg-hint">
                                    <span>Точные данные по идентификации юридического лица.</span>
                                </div>
                            </div>
                            <div style="opacity: 0;" class="reg-checkbox-flex" id="reg-checkbox-flex">
                                <input style="position: relative; top: -6px;" id="reg-blank-agree" type="checkbox"></input>
                                <label for="reg-blank-agree">Я принимаю условия пользовательского соглашения</label>
                            </div>
                            <div class="reg-blank-buttons-flex" id="reg-blank-buttons-flex">
                                <button style="opacity: .5;" onclick="prevAction(), check()" type="button" class="reg-blank-button-prev" id="reg-blank-button-prev">Назад</button>
                                <button style="position: absolute; width: 46.25%; left: 0; opacity: 0; z-index: -1;" onclick="prevAction(), check()" type="button" class="reg-blank-button-prev2" id="reg-blank-button-prev2">Назад</button>
                                <button style="opacity: 1;" onclick="nextAction(), check()" type="button" class="reg-blank-button-next" id="reg-blank-button-next">Далее</button>
                                <button onclick="inputCheck()" style="position: absolute; width: 46.25%; right: 0; opacity: 0; z-index: -1;" type="button" class="reg-blank-button-submit" id="reg-blank-button-submit">Отправить</button>
                            </div>
                        </form>
                        <div id="reg-blank-already" class="reg-blank-already"><span>Уже есть аккаунт? <a style="text-decoration: none; color: #594f9b;" href="">Войти</a></span></div>
                    </div>
                </div>
            </div>
            <div class="reg-guide" id="reg-guide">
                <div class="reg-guide-inside-flex">
                    <div style="background-color: #6957f542; color: var(--centerMiddleGray);" class="dot" id="dot1">1</div>
                    <div class="dot" id="dot2">2</div>
                    <div class="dot" id="dot3">3</div>
                </div>
            </div>
        </div>
    </div>
    <script src="./js/registration.js"></script>
</body>
</html>