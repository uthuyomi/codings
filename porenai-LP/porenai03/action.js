function adjustMarginTop() {
    // ヘッダーの高さを取得
    let headerHeight = $('header').outerHeight();
    // .container にその高さ分の margin-top を設定
    $('.container').css('margin-top', headerHeight + 'px');
}

// ドキュメントの読み込みが完了したとき
$(document).ready(function() {
    adjustMarginTop();
});

// ウィンドウがリサイズされたとき
$(window).resize(function() {
    adjustMarginTop();
});
$(function () {
    //スマホ版でのハンバーガーメニューの動作
    $('.sp-hum').on('click', function () {
        $(this).children('span').toggleClass('active');
        $('.nav').toggleClass('active');
    });
    //スマホ版の場合ヘッダーメニューをクリックすると同時にメニューを閉じる
    $('.nav li a').on('click', function (event) {
        $('.sp-hum span').toggleClass('active');
        $('.nav').toggleClass('active');
        //スムーススクロールの処理
        event.preventDefault(); //デフォルトのアンカー動作を無効化

        //ターゲット要素を取得
        const targetId = $(this).attr('href'); //aタグのhref属性を取得
        const targetElement = $(targetId) //対象の要素を取得
        //ヘッダーの高さ分上に着地させる
        const headH = $('header').innerHeight();

        const deviceW = window.innerWidth;

        let offsetTop;

        if (targetId === "#top") {
            offsetTop = 0;
        }else{
            offsetTop = targetElement.offset().top - headH;
        }
        //スクロール動作
        $('html, body').animate({
            scrollTop: offsetTop
        }, 1000);
    });
});