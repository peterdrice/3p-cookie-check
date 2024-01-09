function checkCookie(returnMethod) {
  var testcookie = "testcookie=" + 1;
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(testcookie) == 0) {
      switch(returnMethod) {
        case 'dataLayer':
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({'cookieCheck': true});
          break;
        case 'utag':
          window.utag_data = window.utag_data || {};
          window.utag_data.cookieCheck = true;
          break;
        default:
          console.log("Third-party cookies are enabled");
      }
      return;
    }
  }
  switch(returnMethod) {
    case 'dataLayer':
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({'cookieCheck': false});
      break;
    case 'utag':
      window.utag_data = window.utag_data || {};
      window.utag_data.cookieCheck = false;
      break;
    default:
      console.log("Third-party cookies are not enabled");
  }
}
window.parent.postMessage({ 'cookieCheck': cookieCheckResult }, '*');
