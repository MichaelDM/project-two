// anything to do with AJAX calls
var ajaxObject = {
  apiToSearch : null,
  // generic function to make AJAX calls
  ajaxCall : function(endpoint,queryString,functionToCall,typeData ){
    // console.log('my url to my ajax call is: ',endpoint+queryString);
    // console.log('my dataType is:', typeData);
    $.ajax({
      url: endpoint+queryString,
      dataType: typeData,
      success: function(response){
        console.log('response from my ajax call is',response);
        console.log('my ajax url is', endpoint+queryString);
        functionToCall(response);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      }
    });
  }
};
