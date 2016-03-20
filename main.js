$(document).ready(function(){
  $('button').on('click',function(){
      // storing the api to seach for in object and storing value of button in appropriate object
      ajaxObject.apiToSearch = $('.cd-dropdown span span').text();

      // making API call according to selected API value
      var endpoint = allApiObject.selectApiToCall(ajaxObject.apiToSearch);
      console.log('click');

  });


  // toggle arrow menu
  $('.menu-icon-wrapper').on('click', function(){
    event.preventDefault();
    $('.menu-icon-wrapper span').toggleClass('menu-icon-wrapper-close');
      $('.side-menu').toggleClass('side-menu-close');
  });

  //hiding search when choosing a source
  $('.cd-dropdown').on('click',function(){
    $('#searchButton').toggleClass('cd-dropdown-hide');
  });
});
