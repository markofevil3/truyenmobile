function log(para) {
    Ti.API.debug(JSON.stringify(para));
}

function showRequestResult(e) {
    log(e);
}

function isHash(obj) {
    return obj.constructor == Object;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.SERVER = "http://54.251.14.29:3000";

Alloy.Globals.MAX_DISPLAY_ROW = 30;

Alloy.Globals.NEW_TIME_MILLISECONDS = 2592e5;

Alloy.Globals.RATIO = 1;

Alloy.Globals.CURRENT_TAB = null;

Alloy.Globals.TAB_GROUP = null;

Alloy.Globals.currentLoadingView = null;

Alloy.Globals.FBPOST_LINK = "https://www.facebook.com/pages/Truy%E1%BB%87n-tranh-Truy%E1%BB%87n-ng%E1%BA%AFn-Truy%E1%BB%87n-c%C6%B0%E1%BB%9Di/518980604798172";

Alloy.Globals.facebook = require("facebook");

Alloy.Globals.facebook.appid = "517068261714145";

Alloy.Globals.facebook.permissions = [ "read_stream" ];

Alloy.Globals.facebook.forceDialogAuth = false;

Alloy.Globals.DEFAULT_PASSWORD = "truyenAlloy";

Alloy.Globals.DEFAULT_PUSH_CHANNEL = "news";

Alloy.Globals.listener = null;

Alloy.Globals.FB_USERNAME = null;

Alloy.Globals.listener = function(e, callback) {
    if (e.success) {
        void 0 == Ti.Network.remoteDeviceUUID && Alloy.Globals.loginUser(e.data.username);
        Alloy.Globals.FB_USERNAME = e.data.username;
        callback(e);
    } else if (e.error) {
        log("Alloy.Globals.listener:");
        log(e.error);
    } else e.cancelled;
    Alloy.Globals.facebook.removeEventListener("click", Alloy.Globals.listener);
};

Alloy.Globals.facebookLogin = function(callback) {
    Alloy.Globals.facebook.authorize();
    Alloy.Globals.facebook.addEventListener("login", function(e) {
        Alloy.Globals.listener(e, callback);
    });
};

Alloy.Globals.facebookGetUsername = function(callback) {
    0 != Alloy.Globals.facebook.loggedIn && Alloy.Globals.facebook.requestWithGraphPath("/" + Alloy.Globals.facebook.getUid(), {}, "GET", function(user) {
        callback(JSON.parse(user.result).username);
    });
};

var Cloud = require("ti.cloud");

var deviceToken;

Alloy.Globals.facebookGetUsername(function(fbUsername) {
    Alloy.Globals.loginUser(fbUsername);
});

Alloy.Globals.registerUser = function(username) {
    Cloud.Users.create({
        username: username,
        password: Alloy.Globals.DEFAULT_PASSWORD,
        password_confirmation: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        if (e.success) {
            log("Alloy.Globals.registerUser: Created");
            Alloy.Globals.loginUser(username);
        } else {
            log("Alloy.Globals.registerUser:");
            log(e.message);
        }
    });
};

Alloy.Globals.loginUser = function(username, callback) {
    Cloud.Users.login({
        login: username,
        password: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        log("login:" + username);
        if (e.success) {
            e.users[0];
            log("Alloy.Globals.loginUser: successfully");
            Alloy.Globals.getDeviceToken(callback);
        } else {
            log("Error :");
            alert(e.message);
            401 == e.code && Alloy.Globals.registerUser(username);
        }
    });
};

Alloy.Globals.getDeviceToken = function(callback) {
    Titanium.Network.registerForPushNotifications({
        types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
        success: function(e) {
            log(e.deviceToken);
            callback && callback();
        },
        error: function(e) {
            log("ErrorDeviceToken: ");
            log(e.message);
            alert(e.message);
        },
        callback: function(e) {
            log("Alloy.Globals.getDeviceToken:" + JSON.stringify(e.data));
            alert("new message from push");
        }
    });
};

Alloy.Globals.subscribePush = function(channel) {
    Cloud.PushNotifications.subscribe({
        channel: channel,
        device_token: Ti.Network.remoteDeviceUUID
    }, function(e) {
        e.success ? log("Success :" + (e.error && e.message || JSON.stringify(e))) : log("ErrorSubscribe:" + (e.error && e.message || JSON.stringify(e)));
    });
};

Alloy.Globals.unsubscribePush = function(channel) {
    log(Ti.Network.remoteDeviceUUID);
    Cloud.PushNotifications.unsubscribe({
        channel: channel,
        device_token: Ti.Network.remoteDeviceUUID
    }, function(e) {
        e.success ? log("Success :" + (e.error && e.message || JSON.stringify(e))) : log("ErrorUnSubscribe:" + (e.error && e.message || JSON.stringify(e)));
    });
};

var loadingIcon = Titanium.UI.createActivityIndicator({
    style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
});

var loadingView = Titanium.UI.createView({
    backgroundColor: "rgba(0,0,0,0.5)",
    backgroundImage: "NONE",
    width: Titanium.UI.FILL,
    height: Titanium.UI.FILL,
    id: "loadingView",
    top: 0,
    zIndex: 9999
});

loadingView.add(loadingIcon);

Alloy.Globals.fbPost = function() {};

Alloy.Globals.openLoading = function(window) {
    loadingIcon.show();
    Alloy.Globals.currentLoadingView = loadingView;
    window.add(loadingView);
};

Alloy.Globals.closeLoading = function(window) {
    window.remove(Alloy.Globals.currentLoadingView);
    Alloy.Globals.currentLoadingView = null;
};

Alloy.Globals.isNew = function(checkDate) {
    var today = new Date();
    return today.getTime() - checkDate.getTime() <= Alloy.Globals.NEW_TIME_MILLISECONDS ? true : false;
};

Alloy.Globals.isTablet = function() {
    var osname = Ti.Platform.osname;
    return osname.search(/iphone/i) > -1 ? false : true;
};

Alloy.Globals.getDeviceType = function() {
    var isTablet = Alloy.Globals.isTablet();
    return isTablet ? 1 : 0;
};

Alloy.Globals.getOSType = function() {
    return "iPhone OS";
};

Alloy.Globals.backButton = function(window) {
    var backbutton = Titanium.UI.createButton({
        backgroundImage: "/common/back.png",
        width: 50,
        height: 30
    });
    backbutton.addEventListener("click", function() {
        window.close({
            animated: true
        });
    });
    return backbutton;
};

Alloy.Globals.getAjax = function(url, query, callback) {
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            callback && callback(this.responseText);
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            callback(JSON.stringify({
                error: true
            }));
        },
        timeout: 1e4
    });
    var fullUrl = Alloy.Globals.SERVER + url;
    if (query) if (isHash(query)) {
        var isFirstParameter = true;
        for (var key in query) {
            fullUrl += isFirstParameter ? "?" : "&";
            isFirstParameter = false;
            fullUrl += encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
        }
    } else query.length > 0 && (fullUrl += "?" + query);
    fullUrl += "&timestamp=" + Date.now();
    xhr.open("GET", fullUrl);
    xhr.send();
};

Alloy.Globals.dynamicSort = function(property, type) {
    return function(a, b) {
        return a[property] < b[property] ? -1 * type : a[property] > b[property] ? 1 * type : 0;
    };
};

Alloy.Globals.dynamicSortNumber = function(property, type) {
    return function(a, b) {
        return parseFloat(a[property]) < parseFloat(b[property]) ? -1 * type : parseFloat(a[property]) > parseFloat(b[property]) ? 1 * type : 0;
    };
};

Alloy.Globals.dynamicLoad = function(tableView, data) {
    function beginUpdate() {
        updating = true;
        tableView.appendRow(loadingRow);
        loadingIcon.show();
        setTimeout(endUpdate, 500);
    }
    function endUpdate() {
        updating = false;
        loadingIcon.hide();
        tableView.deleteRow(lastRowIndex - 1, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
        });
        var nextRowIndex = lastRowIndex - 1 + Alloy.Globals.MAX_DISPLAY_ROW;
        nextRowIndex > data.length && (nextRowIndex = data.length);
        for (var i = lastRowIndex - 1; nextRowIndex > i; i++) {
            var row = Ti.UI.createTableViewRow({
                backgroundImage: "/common/bookshelfBackground.png",
                height: 40,
                chapterId: data[i]._id,
                id: tableView.id
            });
            var labelChapter = Ti.UI.createLabel({
                text: "Chapter " + data[i].chapter,
                color: "#fff",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                font: {
                    fontWeight: "bold",
                    fontSize: 17,
                    fontFamily: "Chalkboard SE"
                }
            });
            var labelTitle = Ti.UI.createLabel({
                text: data[i].title,
                left: 105 * Alloy.Globals.RATIO
            });
            row.add(labelChapter);
            row.add(labelTitle);
            selectItem(row);
            tableView.appendRow(row, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
        }
        lastRowIndex += Alloy.Globals.MAX_DISPLAY_ROW;
        tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW, {
            animated: true,
            position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
        });
    }
    var loadingIcon = Titanium.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    var loadingView = Titanium.UI.createView();
    loadingView.add(loadingIcon);
    var loadingRow = Ti.UI.createTableViewRow({
        height: 40
    });
    loadingRow.add(loadingView);
    var lastRowIndex = tableView.data[0].rowCount;
    var updating = false;
    var lastDistance = 0;
    tableView.addEventListener("scroll", function(e) {
        lastRowIndex = tableView.data[0].rowCount;
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
        if (lastDistance > distance) {
            var nearEnd = 1 * theEnd;
            !updating && total >= nearEnd && data.length > lastRowIndex && tableView.data[0].rows[0].chapterId == data[0]._id && tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id && tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length - 1]._id && lastRowIndex >= Alloy.Globals.MAX_DISPLAY_ROW && beginUpdate();
        }
        lastDistance = distance;
    });
};

Alloy.Globals.addFavorite = function(itemId, itemType, user, title, imageLink, callback) {
    Alloy.Globals.getAjax("/addFavorite", {
        userId: user.id,
        username: user.username,
        fullName: user.name,
        itemId: itemId,
        itemType: itemType
    }, function(response) {
        log("DeviceTOKEN:" + Ti.Network.remoteDeviceUUID);
        void 0 != Ti.Network.remoteDeviceUUID ? Alloy.Globals.subscribePush(itemId) : Alloy.Globals.loginUser(user.username, function() {
            Alloy.Globals.subscribePush(itemId);
        });
        var data = JSON.parse(response).data;
        Alloy.Globals.fbPost(title, imageLink);
        "success" == data && callback();
    });
};

Alloy.Globals.removeUTF8 = function(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
};

Alloy.Globals.adv = function(type, callback) {
    var advImage = Ti.UI.iOS.createAdView({
        width: "auto",
        height: 50
    });
    advImage.addEventListener("load", function() {});
    advImage.addEventListener("error", function(e) {
        2 != e.code;
    });
    callback(advImage);
};

Alloy.Globals.loadImage = function(imageView, url) {
    var xhr = Titanium.Network.createHTTPClient({
        onload: function() {
            imageView.image = this.responseData;
        },
        onerror: function() {
            Ti.API.info("error loading " + url);
            imageView.image = "/common/default_image.jpg";
        },
        timeout: 1e4
    });
    xhr.open("GET", url);
    xhr.send();
};

Alloy.Globals.getFileExtFromUrl = function(urlString) {
    var detectKey = urlString.lastIndexOf(".");
    return urlString.substr(detectKey + 1, urlString.length);
};

Alloy.createController("index");