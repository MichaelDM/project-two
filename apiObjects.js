// object used to store all info about the Alchemy API: http://www.alchemyapi.com/api/sentiment/textc.html
var alchemyObject = {
  apikey : '&apikey='+sentAnalysisKey,
  textPrefix : 'text=',
  textURI : "null",
  outputMode : '&outputMode=json',
  showSourceText : '&showSourceText=0',
  //all info specific to Sentiment-Analysis Call
  sentimentAnalysis : {
    endpoint : 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?',
    baseQuery : "Null"
  },
  //all info about the Keyword-Level Sentiment Analysis Call - NOT USED AT THIS POINT
  // keywordSentimentAnalysis : {
  //   endpoint : 'http://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?'
  // },
  makeAjaxRequest : function(){
    var alchemyQueryString = alchemyObject.textPrefix+alchemyObject.textURI+alchemyObject.sentimentAnalysis.baseQuery;
    console.log('alchemyQueryString is',alchemyQueryString);
    ajaxObject.ajaxCall(alchemyObject.sentimentAnalysis.endpoint,alchemyQueryString,DEMO.ms_Ocean.setOceanValue);
  }
};
// sets base query in sentiment Analysis Call
(function (){ return alchemyObject.sentimentAnalysis.baseQuery = alchemyObject.apikey + alchemyObject.outputMode+ alchemyObject.showSourceText;}());


controllerHackObject = {
  elWindX : document.querySelector('ul li:nth-child(3) .slider'),
  WindXPos : 'null',
  WindYPos : 'null',

  getWindXPos : function(){
    controllerHackObject.WindXPos = controllerHackObject.elWindX.getBoundingClientRect();
    console.log(controllerHackObject.WindXPos.top, controllerHackObject.WindXPos.right, controllerHackObject.WindXPos.bottom, controllerHackObject.WindXPos.left);
  },
  getWindYPos : function(){
    controllerHackObject.WindYPos = controllerHackObject.elWindX.getBoundingClientRect();
    console.log(controllerHackObject.WindYPos.top, controllerHackObject.WindYPos.right, controllerHackObject.WindYPos.bottom, controllerHackObject.WindYPos.left);
  },

  windXClick : function(score){
    //defining click positions in x and y
    var x = score+controllerHackObject.WindXPos.left;
    var y = (controllerHackObject.WindXPos.top + controllerHackObject.WindXPos.bottom)/2;

    // simulating click
    simulate(document.querySelector('ul li:nth-child(3) .slider-fg'), "mousedown", { pointerX: x , pointerY: y });
    simulate(document.querySelector('ul li:nth-child(3) .slider-fg'), "mouseup", { pointerX: x , pointerY: y });
  },
  windYClick : function(score){
    //defining click positions in x and y
    var x = score+controllerHackObject.WindYPos.left;
    var y = (controllerHackObject.WindYPos.top + controllerHackObject.WindYPos.bottom)/2;

    // simulating click
    simulate(document.querySelector('ul li:nth-child(4) .slider-fg'), "mousedown", { pointerX: x , pointerY: y });
    simulate(document.querySelector('ul li:nth-child(4) .slider-fg'), "mouseup", { pointerX: x , pointerY: y });
  }

};


// expanding on the existing DEMO.ms_Ocean object set in Index and defined in Three.js example
DEMO.ms_Ocean.setOceanValue = function(alchemyResponse){
  console.log('setting ocean values');
  // checking if alchemy returns an error
  if (alchemyResponse.docSentiment.status === 'ERROR'){
    console.log('alchemy returned an error');
    console.log(alchemyResponse.docSentiment);
    return;
  }
  //warning user if neutral result
  if (alchemyResponse.docSentiment.type === 'neutral'){
    console.log('got neutral result');
    return $('.neutral-result').text('result: neutral sentiment');
  }
  // set to initial conditions if neutral
  else if (alchemyResponse.docSentiment.type === 'neutral'){
    DEMO.ms_Ocean.choppiness = 0.1;
    DEMO.ms_Ocean.exposure = 0.25;
  } else {
    // console.log('going in else');
    var score = alchemyResponse.docSentiment.score;

    console.log('score is ',score);
    console.log('object at start is', DEMO.ms_Ocean);
    DEMO.ms_Ocean.choppiness = DEMO.ms_Ocean.valueConvert(1,-1,4,0.1,score);
    DEMO.ms_Ocean.exposure = DEMO.ms_Ocean.valueConvert(1,-1,0.5,0,score);

    // getting wind x and y controller box position
    controllerHackObject.getWindXPos();
    controllerHackObject.getWindYPos();
    // converting it to math scale - proper % of controller width
    var scaledXtoControl = DEMO.ms_Ocean.valueConvert(1,-1, controllerHackObject.WindXPos.width,0,score);
    console.log('scaledXtoControl IS', scaledXtoControl  );
    // clicking on controller
    controllerHackObject.windXClick(scaledXtoControl);
    controllerHackObject.windYClick(scaledXtoControl);
    console.log('object at finish is', DEMO.ms_Ocean);
  }
  return;
};
DEMO.ms_Ocean.valueConvert = function(OldMax, OldMin, NewMax, NewMin, OldValue){
  // console.log('returning value,',(((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
  return ((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
};


// object used to store all info about the Alchemy API: http://www.alchemyapi.com/api/sentiment/textc.html
var nyTimesObject = {
  apikey : '&api-key='+nyTimesArticleKey,
  endpoint : 'http://api.nytimes.com/svc/search/v2/articlesearch.json?',
  fl : '&fl=abstract,snippet',
  textToSearch : 'null',
  searchPrefix : 'q=',
  baseQuery : "null",
  constructStringForSentimentAnalysis : function(nyArticles){
    var stringArticles = "";
    // building string with abstract, and if abstract === null, using snippet instead
    for (var i=0; i<nyArticles.response.docs.length; i++){
      if (nyArticles.response.docs[i].abstract !== null){
        stringArticles += nyArticles.response.docs[i].abstract;
      } else {
        stringArticles += nyArticles.response.docs[i].snippet;
      }
    }
    // storing encoded URI of aggregate articles into alchemy object
    alchemyObject.textURI = encodeURI(stringArticles);
    // making ajax Call to Sentiment Analysis API
    alchemyObject.makeAjaxRequest();
  }
};
// sets base query in sentiment Analysis Call
(function (){ return nyTimesObject.baseQuery = nyTimesObject.fl + nyTimesObject.apikey;}());

// object used to store all info about the wikiMedia API:
var wikiObject = {
  endpoint: "http://en.wikipedia.org/w/api.php?" +
		"action=query&" +
		"prop=revisions&" +
		"rvprop=content&" +
		"rvexpandtemplates&" +
		"format=json&" +
		"callback=callback&" +
		"indexpageids&" +
		"redirects&" +
		"titles=",
  textToSearch : 'null',
};

var guardianObject = {
  endpoint: 'http://content.guardianapis.com/search?api-key='+guardianKey+'&q=',
  textToSearch : 'null',
  constructStringForSentimentAnalysis : function(guardianArticles){
    var stringArticles = "";
    // building string with abstract, and if abstract === null, using snippet instead
    for (var i=0; i<guardianArticles.response.results.length; i++){
        stringArticles += guardianArticles.response.results[i].webTitle;
    }
    // storing encoded URI of aggregate articles into alchemy object
    alchemyObject.textURI = encodeURI(stringArticles);
    // making ajax Call to Sentiment Analysis API
    alchemyObject.makeAjaxRequest();
  }
};

// anythin to do with the Die Zeit Api
var zeitObject = {
  textToSearch : 'null',
  endpoint: 'http://api.zeit.de/content?api_key='+zeitKey+'&limit=60&q=',
  constructStringForSentimentAnalysis : function(zeitArticles){
    console.log('zeit articles results is', zeitArticles);
    var stringArticles = "";
    // building string with abstract, and if abstract === null, using snippet instead
    for (var i=0; i<zeitArticles.matches.length; i++){
        stringArticles += zeitArticles.matches[i].snippet;
    }
    // making sure stringArticles not more than 3500 (exceed limit for alchemyAPI)
    if (stringArticles.length>3500){
      stringArticles = stringArticles.slice(0, 3500);
    }
    // storing encoded URI of aggregate articles into alchemy object
    alchemyObject.textURI = encodeURI(stringArticles);
    // making ajax Call to Sentiment Analysis API
    alchemyObject.makeAjaxRequest();
  }
};

// aything to do with the Yandex API (translation api)
var yandexObject = {
  textToTranslate : 'null',
  endpoint: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+yandexKey+'&lang=en-de&format=plain&text=',
  makeAjaxCalltoZeit : function(translatedData){
    zeitObject.textToSearch = translatedData.text[0];
    console.log('text to search is ', zeitObject.textToSearch);
    ajaxObject.ajaxCall(zeitObject.endpoint,zeitObject.textToSearch,zeitObject.constructStringForSentimentAnalysis,"" );
  }
};

// anything to do with API's in general
var allApiObject = {
  // function that selects which API's to store the submitted values
  selectApiToCall : function(apiToSearch){
    switch (apiToSearch) {
      case 'NY Times':
        // storing the keyword to search in nyTimes object
        nyTimesObject.textToSearch = encodeURIComponent($('#keyword').val());
        // building specific query
        var specificQuery = nyTimesObject.searchPrefix+nyTimesObject.textToSearch+nyTimesObject.baseQuery;
        // making ajax call
        ajaxObject.ajaxCall(nyTimesObject.endpoint,specificQuery,nyTimesObject.constructStringForSentimentAnalysis, "");
        break;
      case 'Wikipedia':
        // storing the keyword to search in wikipedia object
        wikiObject.textToSearch = encodeURIComponent($('#keyword').val());
        // making ajax calls. ps: callback is a function defined in query.js
        ajaxObject.ajaxCall(wikiObject.endpoint,wikiObject.textToSearch,callback, 'JSONP');
        break;
      case 'Guardian':
        // storing the keyword to search in guardian object
        guardianObject.textToSearch = encodeURIComponent($('#keyword').val());
        // making ajax call
        ajaxObject.ajaxCall(guardianObject.endpoint,guardianObject.textToSearch,guardianObject.constructStringForSentimentAnalysis, '');
        break;
      case 'Die Zeit':
        yandexObject.textToTranslate = encodeURIComponent($('#keyword').val());
        // making ajax call to yandex api to translate word in german
        ajaxObject.ajaxCall(yandexObject.endpoint, yandexObject.textToTranslate, yandexObject.makeAjaxCalltoZeit, "");
        break;
    }
  }
};
