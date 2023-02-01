import $ from "jquery";

let $body = $('body');

let $language = $('.language'),
    $button = $language.find('.language__selector'),
    $close = $language.find('.language__mobile-close'),
    open_cls = 'language-is-open';

$button.on(clickEvent, () => {
    if (isMobile())
        $body.addClass(open_cls)
})

$close.on(clickEvent, () => {
    if (isMobile())
        $body.removeClass(open_cls)
})


let $item = $language.find('.language__item'),
    active_cls = 'language__item_selected';

$item.each((i, item) => {
    $(item).on(clickEvent, () => {
        $item.removeClass(active_cls)
        $(item).addClass(active_cls)
    })
})


let $items_container = $language.find('.language__items');

setScrollingClass($items_container)

$items_container.on('scroll', function() {
    setScrollingClass($(this))
})

function setScrollingClass(_this) {
    if (_this.scrollTop() + _this.innerHeight() >= _this[0].scrollHeight) {
        $items_container.removeClass('language__items_scrolling')
    } else {
        $items_container.addClass('language__items_scrolling')
    }
}