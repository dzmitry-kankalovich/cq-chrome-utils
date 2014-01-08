var Controller = {

    _access_tab: function (callback) {
        chrome.tabs.getSelected(null, callback);
    },

    navigate: function (url, url_path, param, isOpenInNewTab) {
        Controller._access_tab(function (tab) {
            var tab_url = document.createElement('a');
            tab_url.setAttribute('href', tab.url);

            var new_url = '';

            if (url) {
                new_url += (url.indexOf('http') == -1 && url.indexOf('https') == -1 ? 'http://' : "");
                new_url += url;
            } else {
                new_url = (tab_url.protocol && tab_url.protocol != '' ? tab_url.protocol : "http:");
                new_url += '//' + tab_url.hostname;
                if (tab_url.port && tab_url.port != '') {
                    new_url += ':' + tab_url.port;
                }
            }

            if (Controller.checkNextStep(url, url_path, param, Controller.STEPS.PATH)) {
                if (url_path) {
                    var urlHasSlash = new_url.charAt(new_url.length - 1) == '/';
                    var partHasSlash = url_path.charAt(0) == '/';

                    if (!urlHasSlash && !partHasSlash) {
                        new_url += '/' + url_path;
                    } else if ((!urlHasSlash && partHasSlash) || (urlHasSlash && !partHasSlash)) {
                        new_url += url_path;
                    } else {
                        new_url = Controller._removeLastSlash(new_url);
                        new_url += url_path;
                    }
                } else {
                    new_url += tab_url.pathname + tab_url.hash;
                }
            }

            if (param && Controller.checkNextStep(url, url_path, param, Controller.STEPS.PARAM)) {
                new_url = Controller._removeLastSlash(new_url);
                new_url = Controller._appendParam(new_url, param);
            }

            console.log(new_url);
            if (!isOpenInNewTab) {
                chrome.tabs.update(tab.id, {url: new_url});
            } else {
                chrome.tabs.create({'url': new_url}, function (tab) {
                    // Tab opened.
                });
            }
        });
    },

    STEPS: { URL: 'url', PATH: 'path', PARAM: 'param'},

    checkNextStep: function(url, path, param, step) {
        switch (step) {
            case this.STEPS.URL :
            {
                return true;
            }
            case this.STEPS.PATH :
            {
                return !(url && !path);
            }
            case this.STEPS.PARAM :
            {
                return !(url && path && !param);
            }
            default :
            {
                console.log('wrong step: ' + step);
                return false;
            }
        }
    },

    _appendParam: function (url, param, clearPattern) {
        var curr_url = url;
        if (clearPattern) {
            curr_url = curr_url.replace(clearPattern, '');
        }

        console.log(curr_url);
        if (-1 == curr_url.indexOf('?')) {
            curr_url = curr_url + '?' + param;
        } else if ('?' == curr_url.charAt(curr_url.length - 1)) {
            curr_url = curr_url + param;
        } else if ('&' == curr_url.charAt(curr_url.length - 1)) {
            curr_url = curr_url + param;
        } else {
            curr_url = curr_url + '&' + param;
        }

        return curr_url;
    },

    _removeLastSlash: function (url) {
        if (url.charAt(url.length - 1) == '/') {
            return url.substr(0, url.length - 1);
        }
        return url;
    }
};

var Utils = {
    eachClick: function (elems, callback) {
        for (var i = 0; i < elems.length; ++i) {
            var elem = elems[i];
            elem.addEventListener("click", function (e) {
                callback.call(this, this, e);
            }, false);
        }
    }
};

var contentLoader = function () {

    var options_link = document.getElementsByName('options-link')[0];
    options_link.addEventListener('click', function () {
        var url = chrome.extension.getURL("options.html");
        chrome.tabs.create({'url': url}, function (tab) {
            // Tab opened.
        });
    });

    var ul = document.getElementsByTagName('ul')[0];
    //tempSolution
    ul.innerHTML = '';
    for (var category_key in _CQ) {
        //Creating header for category
        var header_li_elem = document.createElement('li');
        var header_h4_elem = document.createElement('h4');
        header_li_elem.className = 'cq-header-style';
        header_h4_elem.innerHTML = category_key;
        ul.appendChild(header_li_elem.appendChild(header_h4_elem));

        for (var entry_key in _CQ[category_key]) {
            var entry = _CQ[category_key][entry_key];
            var entry_li_elem = document.createElement('li');
            var icon_div_elem = document.createElement('div');
            var entry_text = document.createTextNode(entry['title']);

            entry_li_elem.className += 'cq-action-style';
            entry_li_elem.setAttribute('name', 'cq-action');
            entry_li_elem.setAttribute('data-action', entry_key);
            entry_li_elem.setAttribute('data-category', category_key);

            icon_div_elem.className += 'icon';
            if (entry['icon']) {
                icon_div_elem.style.backgroundImage = 'url(' + entry['icon'] + ')';
            }

            entry_li_elem.appendChild(icon_div_elem);
            entry_li_elem.appendChild(entry_text);
            ul.appendChild(entry_li_elem);
        }
    }

    var elems = document.getElementsByName("cq-action");
    Utils.eachClick(elems, function (elem, e) {
        var category = elem.getAttribute('data-category');
        var action = elem.getAttribute('data-action');
        var entry = _CQ[category][action];

        var url = entry['url'];
        var url_path = entry['url_path'];
        var param = entry['param'];

        Controller.navigate(url, url_path, param, e.ctrlKey);
    });
};

document.addEventListener('DOMContentLoaded', contentLoader);