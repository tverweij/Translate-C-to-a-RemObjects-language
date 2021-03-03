var isVBtopic = document.head.innerHTML.includes("dotnet-visualbasic");
if (!isVBtopic) {
  var v1 = document.getElementsByClassName('primary-holder column is-two-thirds-tablet is-three-quarters-desktop');
  var v = v1[0].getElementsByClassName('columns is-gapless-mobile has-large-gaps ');

  var b = document.createElement("button");
  b.innerText = "Translate C# To RemObjects Mercury";
  v1[0].insertBefore(b, v[0]);

  b.addEventListener("click", function() {changeCode('Mercury')});

  var b1 = document.createElement("button");
  b1.innerText = "Translate C# To RemObjects Oxygene";
  v1[0].insertBefore(b1, b);

  b1.addEventListener("click", function() {changeCode('Oxygene')});

  var b2 = document.createElement("button");
  b2.innerText = "Translate C# To RemObjects Swift";
  v1[0].insertBefore(b2, b1);

  var d = document.createElement("div");
  d.innerText = "-";
  v1[0].insertBefore(d, v[0]);

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
    element.innerText = "//Auto translated code using RemObjects Oxidizer. \n//Report translation errors on https://talk.remobjects.com/c/elements/oxidizer \n\n" + (new DOMParser).parseFromString(xhttp.responseText,"text/xml").documentElement.innerHTML;
  } else {
   element.innerText = "translator error:\n\n" + xhttp.responseText + "\n\n\Link was: " + q;
  }
};


