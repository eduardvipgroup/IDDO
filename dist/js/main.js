const scroll = new SmoothScroll('a[href*="#"]');


const menuBtn = document.getElementsByClassName('header__click')[0],
    menuNav = document.getElementsByClassName('header__nav-list')[0];

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    menuNav.style.display = (menuNav.style.display === 'none') ? 'flex' : 'none';
    menuNav.style.transition = 'all .9s';
}

const videoItem = {
    src: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
    width: 800,
    height: 450,
    frameborder: 0,
    allow: 'autoplay',
    autoplay: 1,
    allowfullscreen: true

};

const screenImg = document.querySelector('.screen__img'),
    iframeOpen = document.getElementsByClassName('screen')[0];
const elem = iframeOpen.querySelector('.container');

screenImg.addEventListener('click', openVideo);

function openVideo() {
    console.log(iframeOpen);
    iframeOpen.replaceChild((createVideo(videoItem)), elem)
}

function createVideo() {
    let screenVideo = document.createElement('div'),
        iframe = document.createElement('iframe');

    screenVideo.appendChild(iframe);
    screenVideo.className = 'screen__video';
    iframe.src = videoItem.src;
    iframe.width = videoItem.width;
    iframe.height = videoItem.height;
    iframe.frameborder = videoItem.frameborder;
    iframe.allowfullscreen = videoItem.allowfullscreen;
    return screenVideo;

}
/*****************************************************/
function sendRequest(method, fileName, format, form) {
    const xhr = new XMLHttpRequest();
    let data = null;
    //подставляем значения из аргументов
    xhr.open(method, fileName, false);
    xhr.onreadystatechange = function () {

        if (this.readyState !== 4) return;

        if (this.status !== 200) {
            //выведет в консоль ошибку, если что-то не так
            console.log(this.status + ': ' + this.statusText);
        } else {
            // Это выполнится только если запрос будет удачным
            data = this.responseText;
            if (format === 'json') {
                data = JSON.parse(data);
            }
            // возвращаем результат
        }
    }

    if (format === 'email') {
        let formData = new FormData(form);
        xhr.send(formData);
    } else {
        xhr.send();
    }
    return data;
}
//чтобы теперь, к примеру, получить массив all из предыдущей задачи будем вызывать так:

const all = sendRequest('GET', './items.json', 'json');
const item = sendRequest('GET', './itemsTeam.json', 'json');

const website = all.filter(function (item) {
    if (item.category === 'web') return item;
});
const branding = all.filter(function (item) {
    if (item.category === 'branding') return item;
});

const btnBtn = document.querySelectorAll('.works__btn-btn'),
    boxWorks = document.getElementsByClassName('works__box')[0];

for (let i = 0; i < btnBtn.length; i++) {
    btnBtn[i].addEventListener('click', functionBtn);
}
const btnClick = document.getElementById('works-plus');

let counter = 3;
let func; //переменную мы объявляли внутри функции functionBtn, потому другим функциям ее не было видно - из-за этого невозможно было удалить слушателя

function functionBtn() {
    boxWorks.innerHTML = '';
    counter = 3;//Возвращаем счетчик в начальное положение при клике по кнопкам категорий
    if (btnClick.classList.contains('opened')) btnClick.classList.remove('opened'); //Возвращаем кнопку плюса в начальное положение при клике по кнопкам категорий
    let array; // переменная, которую мы будем переопределять в кейс, чтобы потом использовать в цикле для сокращения длинны кода
    switch (this.id) {
        case 'btnAll':
            array = all;
            break;
        case 'btnWeb':
            array = website;
            break;
        case 'btnBrand':
            array = branding;
            break;
    }
    // в цикле будем использовать эту переменную
    for (let i = 0; i < 3; i++) {
        boxWorks.appendChild(printCard(array[i].img, array[i].title, array[i].text));
    }
    btnClick.removeEventListener('click', func);
    func = addWorksItem.bind(null, array);
    btnClick.addEventListener('click', func);
}

functionBtn.call(document.querySelector('#btnAll')); //call позволяет передать контекст
// (и, собственно, назначить this в ручную)
// вызвал нашу функцию и передал как this элемент, который мне нужен, а именно, кнопку с id btnAll

function printCard(src, title, text) {
    let itemWork = document.createElement('div'),
        imgWork = document.createElement('div'),
        img = document.createElement('img'),
        descriptionWork = document.createElement('div'),
        nameWork = document.createElement('p'),
        textWork = document.createElement('p');

    itemWork.appendChild(imgWork);
    itemWork.appendChild(descriptionWork);
    imgWork.appendChild(img);
    descriptionWork.appendChild(nameWork);
    descriptionWork.appendChild(textWork);

    itemWork.className = 'works__item';
    imgWork.className = 'works__img';
    descriptionWork.className = 'works__description';
    nameWork.className = 'works__name';
    textWork.className = 'works__text';

    img.src = src;
    nameWork.innerText = title;
    textWork.innerText = text;

    return itemWork;
}

function addWorksItem(array) {
    //len - нужна будет для проверки на наличие в массиве элементов, чтобы не получать undefined
    let len = array.length;

    for (let i = counter; i < counter + 3; i++) {
        if (i < len) {
            boxWorks.appendChild(printCard(array[i].img, array[i].title, array[i].text));
        }
        if (counter < len - 3) {
            counter += 3;
        } else {
            //иначе - удаляем слушателя, чтобы при следующем клике ничто не выводилось(если слушателя не удалить - то последние 1 - 3 элементов массива будут выводиться повторно)
            btnClick.removeEventListener('click', func);
            //кнопка превращается в минус только, если массив закончился
            btnClick.classList.add('opened');
        }
    }
}

const boxTeam = document.getElementsByClassName('team__box')[0],
    btnTeam = document.getElementById('team-plus');

btnTeam.addEventListener('click', printTeam);

let teamCounter = 0;
printTeam();

function printTeam() {
    for (let i = teamCounter; i < teamCounter + 3; i++) {
        if (i < item.length) {
            boxTeam.appendChild(getCard(item[i].img, item[i].href, item[i].name, item[i].post, item[i].description));
        }
    }
    if (teamCounter < item.length - 3) {
        teamCounter += 3;
    } else {
        btnTeam.removeEventListener('click', printTeam);

        btnTeam.classList.add('opened');
        btnTeam.onclick = function() {
            btnTeam.classList.toggle('opened');
            console.log(item.length);

            for (let i = item.length - 1, min = i - 3; i > min; i--) {
                document.querySelectorAll('.team__item')[i].remove();
            }
            btnTeam.onclick = null;
            btnTeam.addEventListener('click', printTeam);
        };
    }
}

function getCard(src, href, name, post, description) {
    let itemTeam = document.createElement('div'),
        blockTeam = document.createElement('div'),
        photoTeam = document.createElement('div'),
        img = document.createElement('img'),
        contactsTeam = document.createElement('div'),
        teamContactsUl = document.createElement('ul'),
        teamContactsLi = document.createElement('li'),
        nameTeam = document.createElement('div'),
        postTeam = document.createElement('div'),
        descriptionTeam = document.createElement('div');

    const classes = ['fab fa-twitter', 'fab fa-facebook-f', 'fab fa-instagram'];
    for (let i = 0; i <= 2; i++) {
        let teamContactsA = document.createElement('a'),
            teamContactsDiv = document.createElement('div'),
            teamContactsI = document.createElement('i');

        teamContactsLi.appendChild(teamContactsA);
        teamContactsA.appendChild(teamContactsDiv);
        teamContactsDiv.appendChild(teamContactsI);
        teamContactsA.href = href[i];
        teamContactsA.target = '_blank';
        teamContactsI.className = classes[i];
    }
// добавляем созданные элементы в родителей
    boxTeam.appendChild(itemTeam);
    itemTeam.appendChild(blockTeam);
    itemTeam.appendChild(nameTeam);
    itemTeam.appendChild(postTeam);
    itemTeam.appendChild(descriptionTeam);

    blockTeam.appendChild(photoTeam);
    blockTeam.appendChild(contactsTeam);

    photoTeam.appendChild(img);
    contactsTeam.appendChild(teamContactsUl);
    teamContactsUl.appendChild(teamContactsLi);

    itemTeam.className = 'team__item';
    blockTeam.className = 'team__item_block';
    photoTeam.className = 'team__photo';
    contactsTeam.className = 'team__contacts';
    teamContactsUl.className = 'team__contacts_ul';
    teamContactsLi.className = 'team__contacts_li';
    nameTeam.className = 'team__name';
    postTeam.className = 'team__post';
    descriptionTeam.className = 'team__description';

    img.src = src;
    nameTeam.innerText = name;
    postTeam.innerText = post;
    descriptionTeam.innerText = description;

    return itemTeam;
}

const btnPlus = document.getElementsByClassName('skills__detail_plus');

for (let i = 0; i < btnPlus.length; i++) {
    btnPlus[i].addEventListener('click', toggleSkills);
}

function toggleSkills() {
    let parent = this.parentElement.parentElement;
    let elem = parent.querySelector('.skills__detail_view');
    this.classList.toggle('opened');
    elem.classList.toggle('visible');
    if (this.className === 'skills__detail_plus opened') {
        this.previousElementSibling.style.color = '#ca3c3c';
        this.previousElementSibling.previousElementSibling.style.color = '#ca3c3c';
    } else {
        this.previousElementSibling.style.color = '#898989';
        this.previousElementSibling.previousElementSibling.style.color = '#898989';
    }
}
/**********************слайдер Siema*************************************/

const mySiema = new Siema({
    //вешаем функцию на изменение, описал ее внизу
    startIndex: 2,
    onChange: markCurrentSlide,
    selector: '.citation__slider',
    duration: 550,
    loop: true,
});
//Массив, который будет внутри объекта - в него соберем все точки для удобного доступа к ним
Siema.prototype.dotsCollection = [];

Siema.prototype.addPagination = function() {
    //контейнер для точек
    const containerSiema = document.getElementsByClassName('citation')[0];
    const btnContainer = document.createElement('div');
    containerSiema.appendChild(btnContainer);
    //класс для него
    btnContainer.className = 'siema__paginations';
    //отрисовываем в блоке слайдера
/*
    this.selector.appendChild(btnContainer);
*/

    for (let i = 0; i < this.innerElements.length; i++) {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => this.goTo(i));
        // класс для стилизации точек
        btn.className = 'siema__pag-dot';
        btnContainer.appendChild(btn);
        // засовываем все сгенерированные кнопки в контейнер(мы его выше объявили)
        this.dotsCollection.push(btn);
    }
    //обращаемся к первой точке(или не первой, если указан параметр startIndex при инициализации сьемы) и задаем ей класс, который покрасит ее в другой цвет
    this.dotsCollection[this.currentSlide ? this.currentSlide : 0].classList.add('siema__pag-dot_current');
}
// функция маркирования текущего слайда при смене слайдов
function markCurrentSlide() {
    //через цикл удаляем у всех элементов класс, отвечающий за покраску...
    for (let i = 0, len = this.dotsCollection.length; i < len; i++){
        if (this.dotsCollection[i].classList.contains('siema__pag-dot_current')){
            this.dotsCollection[i].classList.remove('siema__pag-dot_current');
        }
    }
    //... и добавляем этот класс только текущему слайду
    this.dotsCollection[this.currentSlide].classList.add('siema__pag-dot_current');
}
document.addEventListener('keydown', (e) => {
    // if it's left arrow key
    if (e.keyCode === 37) {
        mySiema.prev()
    }
    // if it's right arrow key
    else if (e.keyCode === 39) {
        mySiema.next()
    }
});
setInterval(() => mySiema.next(), 5000);
mySiema.addPagination();

/**********************регистрация e-mail*************************************/

const emailBtn = document.getElementsByClassName('e-mail__btn')[0];
emailBtn.addEventListener('click', getFormSubscribe);

function getFormSubscribe() {

    document.body.style.cssText = 'width: 100%;\
                             height: 100%;\
                             background-color: #222;\
                             opacity: 0.8;\
                             ';
    const popEmail = document.getElementsByClassName('pop')[0];
    popEmail.style.display = 'flex';
    const form = document.getElementById('e-mailForm');
    sendForm(form);

    document.body.onclick = function(event) {

        if (!event.target.classList.contains('pop')) return;
        popEmail.style.display = 'none';
        document.body.style.opacity = '1';
    };
}

function sendForm(form) {

    form.onsubmit = function (e) {
        e.preventDefault();
        const response = sendRequest('POST', 'mail.php', 'email', form);
        form.reset();
        popUp(response);
    }
}

function popUp(text) {
    const pop = document.createElement('div'),
        msg = document.createElement('p');

    pop.style.cssText = 'position: fixed; \
                        bottom: -40px; \
                        right: 20px; \
                        width: 250px; \
                        height: 100px; \
                        display: flex; \
                        justify-content: center; \
                        align-items: center; \
                        background-color: rgba(255,255,255,0.3); \
                        opacity: 0; \
                        transition: all 0.5s; \
                        ';
    msg.style.cssText = 'color: #f7f7f7';
    document.body.appendChild(pop);
    pop.appendChild(msg);
    msg.innerText = text;

    setTimeout(function () {
        pop.style.bottom = '20px';
        pop.style.opacity = '1';
    }, 100)

    setTimeout(function () {
        pop.style.bottom = '-40px';
        pop.style.opacity = '0';
        setTimeout(function () {
            pop.removeChild(msg);
            document.body.removeChild(pop);
        }, 500);
    }, 5000)
}
sendForm(document.getElementById('contactForm'));
