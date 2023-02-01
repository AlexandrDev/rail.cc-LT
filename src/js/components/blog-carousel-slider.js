import Swiper from 'swiper';

const swiper = new Swiper('.blog-carousel-slider', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    breakpoints: {
        992: {
            slidesPerView: 4
        }
    }
})