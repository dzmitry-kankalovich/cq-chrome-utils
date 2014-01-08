var _CQ = {
    "CQ WCM modes": {
        "disabled": {
            "title": "Disabled",
            "param": "wcmmode=disabled",
            "icon": "icons/adobe.png"
        },
        "preview": {
            "title": "Preview",
            "param": "wcmmode=preview",
            "icon": "icons/preview.png"
        },
        "edit": {
            "title": "Edit",
            "param": "wcmmode=edit",
            "icon": "icons/edit.png"
        }
    },
    "Debug": {
        "layout": {
            "title": "Layout",
            "param": "debug=layout",
            "icon": "icons/debug.png"
        },
        "clientlibs": {
            "title": "Client Libs",
            "param": "debugClientLibs=true",
            "icon": "icons/debug.png"
        }
    },

    "CQ pages": {
        "Groovy Console": {
            "title": "Groovy Console",
            "url_path": "/etc/groovyconsole.html",
            "icon": "icons/cq.png"
        },
        "packmngr": {
            "title": "Package manager",
            "url_path": "/crx/packmgr/index.jsp",
            "icon": "icons/cq.png"
        },
        "loginWCM": {
            "title": "Login to WCM",
            "url_path": "/login.html",
            "icon": "icons/cq.png"
        },
        "WCM": {
            "title": "WCM",
            "url_path": "/siteadmin",
            "icon": "icons/cq.png"
        },
        "CRX": {
            "title": "CRX",
            "url_path": "/crx/explorer",
            "icon": "icons/cq.png"
        },
        "CRXDE": {
            "title": "CRXDE",
            "url_path": "/crxde",
            "icon": "icons/crxde.png"
        },
        "console": {
            "title": "Felix console",
            "url_path": "/system/console",
            "icon": "icons/felix.png"
        },
        "logs": {
            "title": "Logs",
            "url_path": "/bin/crxde/logs",
            "icon": "icons/felix.png"
        },
        "jvm": {
            "title": "JVM Status",
            "url_path": "/system/console/jmx/java.lang%3Atype%3DRuntime",
            "icon": "icons/felix.png"
        }
    },

    "CQ Instances": {
        "local_author": {
            "title": "local author",
            "url": "http://localhost:4502"
        },
        "local_publish": {
            "title": "local publish",
            "url": "http://localhost:4503"
        }
    }
};

var _CQ_CHROME_UTILS_BUILD_VER = '1.0.1';

var _SETTINGS_NAME = '_CQ' + '_' + _CQ_CHROME_UTILS_BUILD_VER;

if(localStorage['_CQ_CHROME_UTILS_BUILD_VER'] != _CQ_CHROME_UTILS_BUILD_VER) {
    localStorage.removeItem(_SETTINGS_NAME);
    localStorage.setItem('_CQ_CHROME_UTILS_BUILD_VER',_CQ_CHROME_UTILS_BUILD_VER);
}

_DEFAULT_CQ = _CQ;

if (localStorage[_SETTINGS_NAME] && localStorage[_SETTINGS_NAME] != '{}') {
    _CQ = JSON.parse(localStorage.getItem(_SETTINGS_NAME));
} else {
    localStorage.setItem(_SETTINGS_NAME, JSON.stringify(_CQ));
}

//TODO add merge step: old user settings with new one

function _SAVE_TO_LOCAL_STORAGE(newCQ) {
    localStorage.setItem(_SETTINGS_NAME, JSON.stringify(newCQ));
}