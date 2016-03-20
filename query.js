// CODE TAKEN FROM TXTWIKI.JS
//https://github.com/joaomsa/txtwiki.js

// "use strict";

function callback(data){
	console.log('my data is ',data);
	var content = document.getElementById("content");

	var pageid = data["query"]["pageids"][0];
	if (pageid == "-1"){
		content.innerHTML = "Page not found";
		return;
	}
	var wikitext = data["query"]["pages"][pageid]["revisions"][0]["*"];

	var parsed = txtwiki.parseWikitext(wikitext);

	parsed = parsed.replace(/>/g, "&gt;");
	parsed = parsed.replace(/</g, "&lt;");
	parsed = parsed.replace(/\n/g, "<br>");

	// take out references:
	if (parsed.indexOf("==See also==")>1){
		parsed = parsed.slice(0,parsed.indexOf("==See also=="));
	}
	if (parsed.indexOf("==References==")>1){
		parsed = parsed.slice(0,parsed.indexOf("==References=="));
	}
	if (parsed.indexOf("==Bibliography==")>1){
		parsed = parsed.slice(0,parsed.indexOf("==Bibliography=="));
	}
	if (parsed.indexOf("==Notes==")>1){
		parsed = parsed.slice(0,parsed.indexOf("==Notes=="));
	}
	// console.log('data loged from query.js',parsed);
	parsed = parsed.slice(parsed.length-4000, parsed.length);
	alchemyObject.textURI = encodeURI(parsed);
	alchemyObject.makeAjaxRequest();
}
