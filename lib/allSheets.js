var btoa = require('btoa');
if (typeof window === 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function (params) {
  var config = this.config,
    params = params ? params : {};

  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest(),
      searchParam = '/sheets';

    var url = config.address + searchParam;

    xhr.open('GET', url, true);

    xhr.setRequestHeader("Accept", "application/vnd.sheetdb.3+json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-User-Agent", "SheetDB-Node/" + config.version);

    if (config.auth_login && config.auth_password) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(config.auth_login + ":" + config.auth_password));
    }

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        let res = JSON.parse(xhr.response)
        resolve(res.sheets);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send();
  });
}
