// toggle arrow menu
$('.menu-icon-wrapper').on('click', function(){
  event.preventDefault();
  $('.menu-icon-wrapper span').toggleClass('menu-icon-wrapper-close');
  if ($('.side-menu-close').length>=1){
    $('.side-menu').toggleClass('side-menu-close');
  } else {
      setTimeout(function(){$('.side-menu').toggleClass('side-menu-close');}, 400);
  }
});
