// object used to store all info about the Alchemy API: http://www.alchemyapi.com/api/sentiment/textc.html
var alchemyObject = {
  apikey : '&apikey='+sentAnalysisKey,
  textPrefix : 'text=',
  textURI : "null",
  outputMode : 'outputMode=json',
  showSourceText : '&showSourceText=0',
  //all info specific to Sentiment-Analysis Call
  sentimentAnalysis : {
    endpoint : 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?',
    baseQuery : "Null"
  },
  //all info about the Keyword-Level Sentiment Analysis Call
  keywordSentimentAnalysis : {
    endpoint : 'http://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?'
  },
  makeAjaxRequest : function(){
    var alchemyQueryString = alchemyObject.textPrefix+alchemyObject.textURI+alchemyObject.sentimentAnalysis.baseQuery;
    console.log('alchemyQueryString is',alchemyQueryString);
    ajaxObject.ajaxCall(alchemyObject.sentimentAnalysis.endpoint,alchemyQueryString, function(resp){
    });
  }
};
// sets base query in sentiment Analysis Call
(function (){ return alchemyObject.sentimentAnalysis.baseQuery = alchemyObject.apikey + alchemyObject.showSourceText;}());


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
    // making sure stringArticles not more than 4500 (exceed limit for alchemyAPI)
    if (stringArticles.length>4500){
      stringArticles = stringArticles.slice(0, 4000);
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
        // making ajax calls
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
