////////////////////
// translate page //
////////////////////

var v1;
var v;
var b;
var b1;
var b2;
var d;
var sourcelang = "";


//docs.microsoft.com   
if (window.location.hostname == 'docs.microsoft.com') {

  var isVBtopic = document.head.innerHTML.includes("dotnet-visualbasic");
  if (!isVBtopic) {
    sourcelang = "C#";
    v1 = document.getElementsByClassName('primary-holder column is-two-thirds-tablet is-three-quarters-desktop');
    v = v1[0].getElementsByClassName('columns is-gapless-mobile has-large-gaps ');
  };
} else {
  if (window.location.hostname == 'stackoverflow.com') {
    if ((document.body.innerHTML.includes('C#')) || (document.body.innerHTML.includes('.net'))) {
      sourcelang = "C#";
      v1 = document.getElementsByClassName('question-page unified-theme');
    v = v1[0].getElementsByClassName('container');
    };
  };
};

if (sourcelang != "") {

  b = document.createElement("button");
  b.innerText = "Translate " + sourcelang + " To RemObjects Mercury";
  v1[0].insertBefore(b, v[0]);

  b.addEventListener("click", function() {changeCode('Mercury')});

  b1 = document.createElement("button");
  b1.innerText = "Translate " + sourcelang + " To RemObjects Oxygene";
  v1[0].insertBefore(b1, b);

  b1.addEventListener("click", function() {changeCode('Oxygene')});

  b2 = document.createElement("button");
  b2.innerText = "Translate " + sourcelang + " To RemObjects Swift";
  v1[0].insertBefore(b2, b1);
 
  if (sourcelang == "swift") {
    b2.style.display = "none";
  };

  d = document.createElement("div");
  d.innerText = "-";
  v1[0].insertBefore(d, v[0]);

  b2.addEventListener("click", function() {changeCode('Swift')});
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeCode(lang) {
  var elements;
  elements = document.getElementsByTagName('code');

  for (var i = 0; i < elements.length; i++)  { 
    if (window.location.hostname == 'docs.microsoft.com') {
      if ((elements[i].className == "lang-csharp") || (elements[i].className == "csharp lang-csharp")){
        getTranslation(elements[i],lang);
        elements[i].className = "lang-" + lang;
      }
    } else {
      if (window.location.hostname == 'stackoverflow.com') {
        getTranslation(elements[i],lang);
        elements[i].className = "lang-" + lang;
      };
    };
  };

  v[0].innerHTML = v[0].innerHTML.replace(/Visual C#/g, 'RemObjects ' + lang);
  v[0].innerHTML = v[0].innerHTML.replace(/C#/g, lang);

  b.style.display = "none";
  b1.style.display = "none";
  b2.style.display = "none";

  var dv = document.createElement("div");
  dv.innerText = "Page is translated from C# to RemObjects " + lang + ". Refresh the page to get the original back.";
  v1[0].insertBefore(dv, d);

}; 

function getTranslation(element,lang) {
  var csharp = element.innerHTML;
  var xhttp = new XMLHttpRequest();

  var q = "https://staging.remobjects.com/elements/oxidizer.asmx/Oxidize?code=" + encodeURIComponent(element.innerText) + "&sourceLanguage=hydrogene&targetLanguage=" + lang;
  xhttp.open("GET", q, false);
  xhttp.send();

  if (xhttp.status == 200) {
    var code = (new DOMParser).parseFromString(xhttp.responseText,"text/xml").documentElement.innerHTML;
    code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    if (!code.includes("//can't convert")) {
      element.innerText = "\n//Auto translated code using RemObjects Oxidizer. \n//Report translation errors on https://talk.remobjects.com/c/elements/oxidizer \n\n" + code;
    }
  } else {
   element.innerText = "translator error:\n\n" + element.innerText;
  }
};
