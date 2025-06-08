$(function(){
    $(".ac_header").on("click", function(){
        $(this).next("dd").slideToggle();
        $(this).find("div img").toggleClass("active")
   });
});