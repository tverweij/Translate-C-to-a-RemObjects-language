var isVBtopic = document.head.innerHTML.includes("dotnet-visualbasic");
if (!isVBtopic) {
  var b = document.createElement("button");
  b.innerText = "Translate C# To RemObjects Mercury";
  var v = document.getElementsByClassName('mainContainer')
  document.body.insertBefore(b, v[0]);

  b.addEventListener("click", function() {changeCode('Mercury')});

  var b1 = document.createElement("button");
  b1.innerText = "Translate C# To RemObjects Oxygene";
  document.body.insertBefore(b1, b);

  b1.addEventListener("click", function() {changeCode('Oxygene')});

  var b2 = document.createElement("button");
  b2.innerText = "Translate C# To RemObjects Swift";
  document.body.insertBefore(b2, b1);

  b2.addEventListener("click", function() {changeCode('Swift')});
};

function changeCode(lang) {
  var elements = document.getElementsByTagName('code');

  for (var i = 0; i < elements.length; i++)  { 
    if ((elements[i].className == "lang-csharp") || (elements[i].className == "csharp lang-csharp")){
      getTranslation(elements[i],lang);
      elements[i].className = "lang-" + lang;
    }
  }

  v[0].innerHTML = v[0].innerHTML.replace(/Visual C#/g, 'RemObjects ' + lang);
  v[0].innerHTML = v[0].innerHTML.replace(/C#/g, lang);

  b.style.display = "none";
  b1.style.display = "none";
  b2.style.display = "none";

  var d = document.createElement("center");
  d.innerText = "Page is translated from C# to RemObjects " + lang + ". Refresh the page to get the original back.";
  document.body.insertBefore(d, v[0]);

}; 

function getTranslation(element,lang) {
  var csharp = element.innerHTML;
  var xhttp = new XMLHttpRequest();

  var q = encodeURI("https://staging.remobjects.com/elements/oxidizer.asmx/Oxidize?code=" + element.innerText + "&sourceLanguage=hydrogene&targetLanguage=" + lang );
  xhttp.open("GET", q, false);
  xhttp.send();

  if (xhttp.status == 200) {
    element.innerText = "//Auto translated code using RemObjects Oxidizer. \n//Report translation errors on https://talk.remobjects.com/c/elements/oxidizer \n\n" + (new DOMParser).parseFromString(xhttp.responseText,"text/xml").documentElement.innerHTML;
  } else {
   element.innerText = "translator error:\n\n" + xhttp.responseText + "\n\n\Link was: " + q;
  }
};


