$(document).ready(function(){
  $('button').on('click',function(){
      // storing the api to seach for in object and storing value of button in appropriate object
      ajaxObject.apiToSearch = $('#sourceInput option:selected').val();

      // once I transition, $('.cd-dropdown span span').text()
      // also change the cases in switch statement in apiObjects


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
    console.log('click');
    $('#searchButton').toggleClass('cd-dropdown-hide');
  });
});
