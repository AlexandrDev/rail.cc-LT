$(function($) {
    let isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
        click_event = isTouch ? 'touchend' : 'click';

    let $body = $('body');


    /*
     * Fix css visibility transition
     */
    $('.dropdown-menu, .mobile-menu').show();


    /*
     * Mobile menu
     */
    $.fn.mobileMenu = function () {
        let _this = this,
            cls_opened = 'menu-opened',
            cls_expanded = 'expanded',
            _parent = '.mobile-menu__item_parent',
            _back = '.mobile-menu__submenu-back',
            _content = '.mobile-menu__content';

        $('.hamburger').on(click_event, function() {
            if (_this.hasClass(cls_opened) ) {
                $(_parent).removeClass(cls_expanded)
            }

            _this.toggleClass(cls_opened)
        })

        $('.mobile-menu-overlay').on(click_event, function() {
            _this.removeClass(cls_opened)
        })

        let navExpand = [].slice.call(document.querySelectorAll(_parent));

        navExpand.forEach((item) => {
            item.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault()

                $(_content).stop().animate({scrollTop:0}, 200, 'swing')

                item.classList.add(cls_expanded)
            })

            item.querySelector(_back).addEventListener('click', () => item.classList.remove(cls_expanded));
        })
    }

    $body.mobileMenu()


    /*
     * Slider
     */
    $.fn.initSlider = function () {
        let $el = this.find('.swiper');

        let swiper = new Swiper($el[0], {
            slidesPerView: 'auto',
            navigation: {
                nextEl: this.find('.swiper-button-next')[0],
                prevEl: this.find('.swiper-button-prev')[0],
            },
            pagination: {
                el: this.find('.swiper-pagination')[0],
                clickable: true
            }
        })

        swiper.on('slideChange', function () {
            if (swiper.isEnd) {
                $el.addClass('swiper-is-end')
            } else {
                $el.removeClass('swiper-is-end')
            }
        })
    }

    $('.slider').each(function () {
        $(this).initSlider()
    })


    /*
     * Show more
     */
    $.fn.showMore = function() {
        let $content = this;

        if ($content.innerHeight() > 78) {
            let link_texts = ['More', 'Less'];

            $content.addClass('part-hidden');
            $content.append('<div class="show-more"><span class="link link_more">'+ link_texts[0] +'</span></div>');

            let $show_more_link = $content.find('.show-more .link');

            $show_more_link.on(click_event, function () {
                let link_text = $(this).text();

                $(this).text(link_text === link_texts[0] ? link_texts[1] : link_texts[0]);

                $('html, body').animate({
                    scrollTop: $content.offset().top - 200
                }, 400);

                $content.toggleClass('part-hidden');
            });
        }
    }

    if (window.innerWidth < 1200) {
        $('.js-showMore').each(function () {
            $(this).showMore();
        })
    }


    /*
     * Show more
     */
    $('.js-scrollToTop').on(click_event, function () {
        $('html, body').animate({
            scrollTop: $body.offset().top
        }, 600);
    })
})