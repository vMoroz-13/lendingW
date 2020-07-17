window.addEventListener('DOMContentLoaded', () => {

    // Timer
    function countTimer(deadline) {
        const
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60 / 60));
            return {
                hours,
                minutes,
                seconds,
                timeRemaining
            };
        }
        function appDateClock() {
            const timer = getTimeRemaining();

            function appNull(time) {
                if (time > 0 && time < 10) {
                    return '0' + time;
                } else {
                    return time;
                }
            }

            timerHours.textContent = appNull(timer.hours);
            timerMinutes.textContent = appNull(timer.minutes);
            timerSeconds.textContent = appNull(timer.seconds);

            if (timer.timeRemaining > 0) {
                const idInterval = setInterval(appDateClock, 1000);
                clearInterval(idInterval);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        setInterval(appDateClock, 1000);
    }
    countTimer('10, july, 2020');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li');
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', event => {
            const target = event.target;
            for (let i = 0; i < menuItems.length; i++) {
                target.classList.contains('ul>li');
            }
            target.classList.contains('close-btn');
            handlerMenu();
        });
    };
    toggleMenu();


    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');
        const popUpAnimation = () => {
            if (window.innerWidth <= 768) {
                popup.style.display = `block`;//выполнять
            } else {
                popup.style.display = `block`;
                popupContent.style.opacity = '0';
                let count = 0;
                const toggleOpacity = setInterval(() => {
                    if (count < 1) {
                        popupContent.style.opacity = count += 0.1;
                    } else {
                        clearInterval(toggleOpacity);
                    }
                }, 70);
            }
        };

        popupBtn.forEach(elem  => {
            elem.addEventListener('click', popUpAnimation);
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }

        });
    };
    togglePopUp();
    // Tab
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const  togleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        togleTabContent(i);
                    }
                });
            }

        });
    };
    tabs();

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');
        slide.forEach(() => {
            portfolioDots.insertAdjacentHTML('afterbegin', `<li class="dot"></li>`);
        });
        const dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');
        let currentSlide = 0,
            interval;
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches('.dot, .portfolio-btn')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);
    };
    slider();
    //Замена фото
    const showPhoto = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        const chengePhoto = e => {
            [e.target.src, e.target.dataset.img] = [e.target.dataset.img, e.target.src];
        };

        commandPhoto.forEach(event => {
            event.addEventListener('mouseover', chengePhoto);
            event.addEventListener('mouseout', chengePhoto);
        });

    };
    showPhoto();
    //Запрет на ввод букв
    document.oninput = () => {
        const calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day');
        calcSquare.value = calcSquare.value.replace(/[^\+\d]/g, '');
        calcCount.value = calcCount.value.replace(/[^\+\d]/g, '');
        calcDay.value = calcDay.value.replace(/[^\+\d]/g, '');
    };
    //Калькулятор

    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const cquareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && cquareValue) {
                total = price * typeValue * cquareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;
            if (target === calcType || target === calcSquare ||
           target === calcCount || target === calcDay) {
                countSum();
            }
        });
    };
    calc(100);
    //send-ajax-form
    const sendform = () => {
        const errorMessage = 'Что то пошло не так....',
            loadMesage = 'Идет загрузка... ',
            successMessage = 'Спасибо мы скоро с Вами свяжемся',
            statusMassege = document.createElement('div');
        statusMassege.style.cssText = 'font-size: 2rem;';
        //Переменные первой формы-->
        const form = document.getElementById('form1'),
            formName = document.getElementById('form1-name'),
            formEmail = document.getElementById('form1-email'),
            form1Phone = document.getElementById('form1-phone');
        //Переменные второй формы-->
        const  form2 = document.getElementById('form2'),
            formName2 = document.getElementById('form2-name'),
            formEmail2 = document.getElementById('form2-email'),
            form1Phone2 = document.getElementById('form2-phone'),
            formMessage2 = document.getElementById('form2-message');
        //Переменные третьей формы-->
        const form3 = document.getElementById('form3'),
            formName3 = document.getElementById('form3-name'),
            formEmail3 = document.getElementById('form3-email'),
            formPhone3 = document.getElementById('form3-phone');

        form.addEventListener('submit', event => {
            event.preventDefault();
            formName.value = '';
            formEmail.value = '';
            form1Phone.value = '';
            form.appendChild(statusMassege);
            statusMassege.textContent = loadMesage;
            const formData = new FormData(form);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }

            postData(body, () => {
                statusMassege.textContent = successMessage;
            }, error => {
                statusMassege.textContent = errorMessage;
                console.error(error);
            });
        });

        form2.addEventListener('submit', event => {
            event.preventDefault();
            formName2.value = '';
            formEmail2.value = '';
            form1Phone2.value = '';
            formMessage2.value = '';
            form2.appendChild(statusMassege);
            statusMassege.textContent = loadMesage;
            const formData = new FormData(form2);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }

            postData(body, () => {
                statusMassege.textContent = successMessage;
            }, error => {
                statusMassege.textContent = errorMessage;
                console.error(error);
            });
        });

        form3.addEventListener('submit', event => {
            event.preventDefault();
            formName3.value = '';
            formEmail3.value = '';
            formPhone3.value = '';
            form3.appendChild(statusMassege);
            statusMassege.textContent = loadMesage;
            const formData = new FormData(form3);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }

            postData(body, () => {
                statusMassege.textContent = successMessage;
            }, error => {
                statusMassege.textContent = errorMessage;
                console.error(error);
            });
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');//multipart/form-data
            request.send(JSON.stringify(body));
        };
    };
    sendform();

    //Маска телефона
    // maskPhone('.form-phone');
    //Запретить ввод любых символов
    //в поле "Ваше имя" и "Ваше сообщение", кроме Кириллицы и пробелов!

    function checkNameForm() {
        const form2Message = document.getElementById('form2-message');
        const form2Name = document.getElementById('form2-name');
        const form3Name = document.getElementById('form3-name');
        const form1Name = document.getElementById('form1-name');
        const showLog = function() {
            this.value = this.value.replace(/[0-9a-z ]/gi, '');
        };
        form2Message.addEventListener('input', showLog);
        form2Name.addEventListener('input', showLog);
        form3Name.addEventListener('input', showLog);
        form1Name.addEventListener('input', showLog);
    }
    checkNameForm();
    function checkPhonForm() {
        const form3Phone = document.getElementById('form3-phone');
        const form2Phone = document.getElementById('form2-phone');
        const form1Phone = document.getElementById('form1-phone');

        const showPhone = function() {
            this.value = this.value.replace(/[^+0-9]/g, '');
        };
        form3Phone.addEventListener('input', showPhone);
        form1Phone.addEventListener('input', showPhone);
        form2Phone.addEventListener('input', showPhone);
    }
    checkPhonForm();


});



