$(function () {
    $('.hamburger').on('click ', function () {
        $("nav, span").stop().toggleClass("active");
    });
    $('.question-l').on('inview', function () {

        $('.question-l').stop().removeClass('hidden');
    });
    $('.question-r').on('inview', function () {

        $('.question-r').stop().removeClass('hidden');
    });
    $('.growing').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).stop().addClass('growing-in');
        }
    });

});