/////////////////////////////////////
//set access-control-allow-origin *//
/////////////////////////////////////
const cors = {};
cors.onHeadersReceived = d => {
  const {initiator, originUrl, responseHeaders, method, requestId, tabId} = d;

    const o = responseHeaders.find(({name}) => name.toLowerCase() === 'access-control-allow-origin');

    if (o) {
      o.value = "*";
    }
    else {
      responseHeaders.push({
        'name': 'Access-Control-Allow-Origin',
        'value': "*"
      });
    }

  return {responseHeaders};
};

const extra = ['blocking', 'responseHeaders'];
if (/Firefox/.test(navigator.userAgent) === false) {
  extra.push('extraHeaders');
}

chrome.webRequest.onHeadersReceived.addListener(cors.onHeadersReceived, 
{urls: ['https://staging.remobjects.com/*']}, extra);
