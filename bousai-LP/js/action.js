$(function (){
    $(window).on("load", function () {
        // Slickスライダーの初期化
        $('.slider').slick({
            arrows: true, // デフォルトの矢印を非表示に
            infinite: false // スライドを無限ループしない設定
        });
    
    });
})