$(window).scroll(function() {
        let scroll = $(window).scrollTop();//スクロール値を定義
    //header-imgの背景
	$('header').css({
			transform: 'scale('+(100 + scroll/10)/100+')',//スクロール値を代入してscale1から拡大.scroll/10の値を小さくすると拡大値が大きくなる
			top: -(scroll/50)  + "%",//スクロール値を代入してtopの位置をマイナスにずらす
        });
    });
$(function (){
    $('.slide-text').on('inview', function(){
        $(this).addClass('slide-text-in');
    });
});
$(function (){
    $('.slide').on('inview', function(){
        $(this).addClass('slide-in');
    });
});
$(function (){
    $('.content3').on('inview', function(event, isInView){
        if(isInView){
            $(".bg-img").fadeIn(300);
        }else{
            $(".bg-img").fadeOut(300);
        }
    })
})