import $ from "jquery";

$('.destinations-cards').each(function () {
    let $container = $(this),
        $button = $(this).find('.destinations-cards__show-more .button'),
        shows_cls = 'shows';

    $button.click(function (e) {
        e.preventDefault()

        $container.toggleClass(shows_cls)
        $button.toggleClass('button_top')
    })
})