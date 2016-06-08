var _CQ = {
  "CQ WCM modes": {
    "Disabled": {
      "title": "Disabled",
      "url": "",
      "url_path": "",
      "param": "wcmmode=disabled",
      "icon": "icons/adobe.png"
    },
    "Preview": {
      "title": "Preview",
      "url": "",
      "url_path": "",
      "param": "wcmmode=preview",
      "icon": "icons/preview.png"
    },
    "Edit": {
      "title": "Edit",
      "url": "",
      "url_path": "",
      "param": "wcmmode=edit",
      "icon": "icons/edit.png"
    }
  },
  "Debug": {
    "Layout": {
      "title": "Layout",
      "url": "",
      "url_path": "",
      "param": "debug=layout",
      "icon": "icons/debug.png"
    },
    "Client Libs": {
      "title": "Client Libs",
      "url": "",
      "url_path": "",
      "param": "debugClientLibs=true",
      "icon": "icons/debug.png"
    }
  },
  "CQ pages": {
    "Groovy Console": {
      "title": "Groovy Console",
      "url": "",
      "url_path": "/etc/groovyconsole.html",
      "param": "",
      "icon": "icons/cq.png"
    },
    "Package manager": {
      "title": "Package manager",
      "url": "",
      "url_path": "/crx/packmgr/index.jsp",
      "param": "",
      "icon": "icons/cq.png"
    },
    "Login to WCM": {
      "title": "Login to WCM",
      "url": "",
      "url_path": "/login.html",
      "param": "",
      "icon": "icons/cq.png"
    },
    "WCM": {
      "title": "WCM",
      "url": "",
      "url_path": "/siteadmin",
      "param": "",
      "icon": "icons/cq.png"
    },
    "CRX": {
      "title": "CRX",
      "url": "",
      "url_path": "/crx/explorer",
      "param": "",
      "icon": "icons/cq.png"
    },
    "CRXDE": {
      "title": "CRXDE",
      "url": "",
      "url_path": "/crx/de/index.jsp",
      "param": "",
      "icon": "icons/crxde.png"
    },
    "Felix console": {
      "title": "Felix console",
      "url": "",
      "url_path": "/system/console/configMgr",
      "param": "",
      "icon": "icons/adobe.png"
    },
    "Logs": {
      "title": "Logs",
      "url": "",
      "url_path": "/bin/crxde/logs",
      "param": "",
      "icon": "icons/adobe.png"
    },
    "JVM Status": {
      "title": "JVM Status",
      "url": "",
      "url_path": "/system/console/jmx/java.lang%3Atype%3DRuntime",
      "param": "",
      "icon": "icons/adobe.png"
    },
    "Sling logs": {
      "title": "Sling logs",
      "url": "",
      "url_path": "/system/console/status-slinglogs",
      "param": "",
      "icon": "icons/adobe.png"
    },
    "Translator": {
      "title": "Translator",
      "url": "",
      "url_path": "/libs/cq/i18n/translator.html",
      "param": "",
      "icon": "icons/cq.png"
    },
    "Replication": {
      "title": "Replication",
      "url": "",
      "url_path": "/etc/replication.html",
      "param": "",
      "icon": "icons/cq.png"
    },
    "Clean clientlibs": {
      "title": "Clean clientlibs",
      "url": "",
      "url_path": "/libs/granite/ui/content/dumplibs.rebuild.html",
      "param": "",
      "icon": "icons/siteadmin.png"
    },
    "Tags": {
      "title": "Tags",
      "url": "",
      "url_path": "/tagging",
      "param": "",
      "icon": "icons/cq.png"
    },
    "Query Debug": {
      "title": "Query Debug",
      "url": "",
      "url_path": "/libs/cq/search/content/querydebug.html",
      "param": "",
      "icon": "icons/siteadmin.png"
    }
  },
  "Touch UI": {
    "WCM": {
      "title": "WCM",
      "url": "",
      "url_path": "/sites.html/content",
      "param": "",
      "icon": "icons/siteadmin.png"
    },
    "DAM": {
      "title": "DAM",
      "url": "",
      "url_path": "/assets.html/content/dam",
      "param": "",
      "icon": "icons/siteadmin.png"
    }
  }
};

var _CQ_CHROME_UTILS_BUILD_VER = '1.0.2';

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
