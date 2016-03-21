$(document).ready(function(){

  // code for modal taken from w3 schools
  // Get the modal
  var modal = document.getElementById('myModal');
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };



  //initiall chopiness and exposure of the sea
  DEMO.ms_Ocean.choppiness = 0;
  DEMO.ms_Ocean.exposure = 0.25;

  $('#searchButton').on('click',function(){

    //adding interaction to click so user knows he has clicked

    $(this).addClass('searchButton-clicked');
    setTimeout(function () {
      $('button').removeClass('searchButton-clicked');
    }, 160);

    // clearing neutral sentiment if that has been added to page
    $('.neutral-result').text('');

    // checking that neither input sources are empty, if not, close side menu
    if($('#keyword').val().length<1 || $('.cd-dropdown span span').text().length<1){
      $('.empty-source-error').text('Poseidon search needs keyword(s) and input source');
    } else{
      $('.menu-icon-wrapper span').toggleClass('menu-icon-wrapper-close');
      $('.side-menu').toggleClass('side-menu-close');
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
