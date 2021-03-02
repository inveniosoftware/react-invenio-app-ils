export function IEFallback() {
  window.onload = function () {
    const style = document.createElement('style');
    style.innerHTML = `
      #app {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 35em;
        height: 19em;
        margin-top: -11em;
        margin-left: -18em;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #ffffff;
      }
      body {
        background: #f3f3f3;
      }
      h2 {
        margin-top: 1em !important;
      }
      img {
        width: 70px;
        height: 70px;
      }
      a {
        padding: 0em 1em 0em 1em;
        text-decoration: none;
      }
    `;
    document.head.appendChild(style);

    let app = document.getElementById('app');
    let h1 = document.createElement('h2');
    let p = document.createElement('p');
    let imagesDiv = document.createElement('div');
    imagesDiv.style.cssText += 'display: inline-flex; padding: 0.5em';
    h1.innerHTML = 'Unsupported browser';
    p.innerHTML =
      "You're using a web browser we don't support.<br>" +
      'We recommend using one of the following browsers:';

    let imgChrome = document.createElement('img');
    let aChrome = document.createElement('a');
    let pChrome = document.createElement('p');
    imgChrome.src = '/images/chrome-logo.svg';
    aChrome.href = 'https://www.google.com/chrome/';
    pChrome.innerHTML = 'Google Chrome';
    aChrome.appendChild(imgChrome);
    aChrome.appendChild(pChrome);

    let imgFirefox = document.createElement('img');
    let aFirefox = document.createElement('a');
    let pFirefox = document.createElement('p');
    imgFirefox.src = '/images/firefox-logo.png';
    aFirefox.href = 'https://www.mozilla.org/firefox/new/';
    pFirefox.innerHTML = 'Mozilla Firefox';
    aFirefox.appendChild(imgFirefox);
    aFirefox.appendChild(pFirefox);

    let imgOpera = document.createElement('img');
    let aOpera = document.createElement('a');
    let pOpera = document.createElement('p');
    imgOpera.src = '/images/opera-logo.svg';
    aOpera.href = 'https://www.opera.com/download';
    pOpera.innerHTML = 'Opera';
    aOpera.appendChild(imgOpera);
    aOpera.appendChild(pOpera);

    app.appendChild(h1);
    app.appendChild(p);
    imagesDiv.appendChild(aChrome);
    imagesDiv.appendChild(aFirefox);
    imagesDiv.appendChild(aOpera);
    app.appendChild(imagesDiv);
  };
}
