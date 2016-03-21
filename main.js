$(document).ready(function(){

  //initiall chopiness and exposure of the sea
  DEMO.ms_Ocean.choppiness = 0;
  DEMO.ms_Ocean.exposure = 0.25;
  // DEMO.ms_Ocean.windX = 0;
  // DEMO.ms_Ocean.windY = 0;

  $('button').on('click',function(){

    // clearing neutral sentiment if that has been added to page
    $('.neutral-result').text('');

    // checking that neither input sources are empty
    if($('#keyword').val().length<1 || $('.cd-dropdown span span').text().length<1){
      $('.empty-source-error').text('Poseidon search needs keyword(s) and input source');
    }
    // if error message, take it away when user takes action
    $('#keyword').on('click focus', function(){
      $('.empty-source-error').text('');
    });
    $('.cd-dropdown').on('click focus', function(){
      $('.empty-source-error').text('');
    });

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
