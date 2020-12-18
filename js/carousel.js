const arrowLeft = document.querySelector(".slick-prev");
const arrowRight = document.querySelector('.slick-next');
const slickTrack = document.querySelector('.slick-track');
const slickSlice = document.querySelectorAll('.slick-slide');
const slickDots = document.querySelectorAll('.slick-dots li');
const btn = document.querySelectorAll('.slick-dots button');

let eleIsClicked = 0;
let size = slickSlice[0].clientWidth;
let count = 1, time = 3000;
let stateTab = true;
let stateTranslateOfSlickTrack = true;
let v_interval = '';

let hidden, visibilityChange;
run_setInterval();
console.log(slickDots)
//tao ham run setInterval va run clearInterval
function run_setInterval() {
    v_interval = setInterval(() => {
        size = slickSlice[0].clientWidth;
        slickDots[count-1].classList.remove('slick-active');
        slickTrack.style.transition = 'transform .5s ease-in-out';
        slickTrack.style.transform = `translate3d(${-size*(++count)}px,0px,0px)`;
        // console.log(count)
        eleIsClicked = count -1;
        if(count === slickSlice.length -1 ) {
            slickDots[0].classList.add('slick-active')
        } else {
            slickDots[count -1].classList.add('slick-active');
        }
        // console.log('interval '+ count)
    }, time)
}
function run_clearInterval() {
    clearInterval(v_interval)
}

//dung translate khi user chuyen qua tab khac
if(typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if(typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange"
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}
function handleVisibilityChange() {
    stateTab = (document[hidden]) ? false : true;
    if (stateTab) {
        run_setInterval()
    } else {
        run_clearInterval()
    }
}

//them su kien click cho arrow
arrowLeft.addEventListener("click", function (e) {
    if(stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(true, false, e);
        run_setInterval();
    }
});
arrowRight.addEventListener("click", function (e) {
    if(stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(false, true, e);
        run_setInterval();
    }
});
function commonFuncBothArrows(arrowL, arrowR, e) {
    e.preventDefault();
    stateTranslateOfSlickTrack = false;
    if(arrowL){
        if(count <= 0 ){ return; }
    }else{
        if(arrowR){
            if(count >= slickSlice.length - 1){ return;}
        }
    }
    slickDots[count - 1].classList.remove('slick-active');
    slickTrack.style.transition = 'transform 0.5s ease-in-out';
    count = arrowL ? --count : ++count;
    slickTrack.style.transform = `translate3d(${-size*count}px, 0px, 0px)`;
    eleIsClicked = count -1;
    switch (count) {
        case 0:
            slickDots[slickDots.length - 1].classList.add('slick-active');
            break;
        case slickSlice.length-1:
            slickDots[0].classList.add('slick-active');
            break;
        default:
            slickDots[count - 1].classList.add('slick-active');
            break;
    }

}

//the su kien click cho button
btn.forEach(el => {
    el.addEventListener("click", function () {
        if (stateTranslateOfSlickTrack) {
            run_clearInterval();
            slickTrack.style.transition = "transform .5s ease-in-out";
            count = Number(el.textContent);
            slickDots[eleIsClicked].classList.remove("slick-active");
            slickDots[count -1 ].classList.add("slick-active");
            slickTrack.style.transform = `translate3d(${-size*count}px,0px,0px)`;
            eleIsClicked = count - 1;
            run_setInterval();
        }
    })
});

slickTrack.addEventListener('transitionend', ()=>{
    stateTranslateOfSlickTrack = true; // cho biết thằng carousel nó đã thực hiện xong việc translateX
    let nameClassSlickSlide = slickSlice[count].id;
    if(nameClassSlickSlide === 'lastClone' || nameClassSlickSlide === 'firstClone'){
        slickTrack.style.transition = `none`;
        count = (nameClassSlickSlide === 'lastClone')?slickSlice.length - 2:(nameClassSlickSlide === 'firstClone')?1:count; // slickSlice .length - 2 thì 2 này là 1 cái ảnh ở đầu có id='lastClone' và 1 ảnh ở cuối có id = 'firstClone'
        eleIsClicked = count - 1;
        slickTrack.style.transform = `translateX(-${size*count}px)`;
    }
});
//touch slide=======================================================
const carousel = document.querySelector('.carousel');
const carouselBox = document.querySelector('.carousel-items');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const htmlRoot = document.getElementsByTagName('html')[0];
// event.stopPropagation();
touch_slide(carousel, carouselBox, prevButton, nextButton);

function touch_slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = document.querySelectorAll('.carousel-item'),
        slideLength = slides.length,
        slideSize = document.querySelectorAll('.carousel-item')[0].offsetWidth,
        index = 0,
        allowShift = true,
        itemShow = 4;
    window.onresize = function() {
        if(htmlRoot.offsetWidth < 600) {
            itemShow = 2;
            carouselBox.style.width = '400%';
            console.log('width 400')

        } else {
            itemShow = 4;
            carouselBox.style.width = '200%';
            console.log('width 200')
        }
    };

    // Mouse and touch events
    items.onmousedown = dragStart;

    // Touch Events

    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchmove', dragAction);
    items.addEventListener('touchend', dragEnd);

    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1)
    });
    next.addEventListener('click', function () {
        shiftSlide(1)
    });

    // Transition end
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        // e.preventDefault();
        if (allowShift === false) return;
        posInitial = items.offsetLeft;

        if (e.type === 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
            // console.log(posX1)
        }
    }

    function dragAction(e) {
        e = e || window.event;
        if (allowShift === false) return;
        if(e.type === 'touchmove') {
            posX2 = e.touches[0].clientX - posX1;
            posX1 = e.touches[0].clientX
        } else {
            posX2 = e.clientX - posX1;
            posX1 = e.clientX;
            // console.log(posX2)
        }
        items.style.left = (items.offsetLeft + posX2) + 'px';
        // console.log(items)
    }
    function dragEnd() {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag')
        } else if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag')
        } else {
            items.style.left = posInitial + 'px';
        }

        document.onmousemove = null;
        document.onmouseup = null;
    }
    function shiftSlide(dir, action) {
        slideSize = document.querySelectorAll('.carousel-item')[0].offsetWidth;
        items.classList.add('shifting');
        console.log('hahhaha')
        if(!action) {
            posInitial = items.offsetLeft
        }
        if(dir === 1) {
            if (itemShow === 2) {
                if (index < 3) {
                    index +=1;
                    items.style.left = -(slideSize*itemShow*index -2) + 'px';
                } else {
                    index = 3;
                    items.style.left = -(slideSize*itemShow*index -2) + 'px';
                }
            } else if (itemShow === 4) {
                if (index < 1) {
                    index +=1;
                    items.style.left = -(slideSize*itemShow*index -2) + 'px';
                } else {
                    index = 1;
                    items.style.left = -(slideSize*itemShow*index -2) + 'px';
                }
            }
        } else if(dir === -1) {
            if (index > 0) {
                index -=1;
                items.style.left = -(slideSize*itemShow*index -2) + 'px';
            } else {
                index = 0;
                items.style.left = -(slideSize*itemShow*index -2) + 'px';
            }
        }
        allowShift = false
    }
    function checkIndex(event) {
        event.target.classList.remove('shifting');

        allowShift = true;
    }
}
if (typeof(Storage) !== "undefined") {
    var domain = 'freetuts.net';
    localStorage.setItem('domain', domain);
} else {
    document.write('Trình duyệt của bạn không hỗ trợ local storage');
}
