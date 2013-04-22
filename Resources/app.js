function log(para) {
    Ti.API.debug(JSON.stringify(para));
}

function showRequestResult(e) {
    var s = "";
    if (e.success) {
        s = "SUCCESS";
        e.result && (s += "; " + e.result);
        e.data && (s += "; " + e.data);
        e.result || e.data || (s = '"success", but no data from FB.  I am guessing you cancelled the dialog.');
    } else if (e.cancelled) s = "CANCELLED"; else {
        s = "FAIL";
        e.error && (s += "; " + e.error);
    }
    alert(s);
}

function isHash(obj) {
    return obj.constructor == Object;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.SERVER = "http://truyen.zapto.org";

Alloy.Globals.MAX_DISPLAY_ROW = 30;

Alloy.Globals.NEW_TIME_MILLISECONDS = 2592e5;

Alloy.Globals.RATIO = 1;

Alloy.Globals.CURRENT_TAB = null;

Alloy.Globals.TAB_GROUP = null;

Alloy.Globals.currentLoadingView = null;

Alloy.Globals.FBPOST_LINK = "https://www.facebook.com/bui.p.quan?ref=tn_tnmn";

Alloy.Globals.facebook = require("facebook");

Alloy.Globals.facebook.appid = "514307815249030";

Alloy.Globals.facebook.permissions = [ "publish_stream", "read_stream" ];

Alloy.Globals.facebook.forceDialogAuth = true;

Alloy.Globals.DEFAULT_PASSWORD = "truyenAlloy";

Alloy.Globals.DEFAULT_PUSH_CHANNEL = "news";

Alloy.Globals.listener = null;

Alloy.Globals.listener = function(e, callback) {
    if (e.success) {
        Alloy.Globals.loginUser(e.data.username);
        callback(e);
    } else e.error ? alert(e.error) : e.cancelled && alert("Cancelled 12312");
    Alloy.Globals.facebook.removeEventListener("click", Alloy.Globals.listener);
};

Alloy.Globals.facebookLogin = function(callback) {
    Alloy.Globals.facebook.authorize();
    Alloy.Globals.facebook.addEventListener("login", function(e) {
        Alloy.Globals.listener(e, callback);
    });
};

Alloy.Globals.facebookGetUsername = function(callback) {
    0 != Alloy.Globals.facebook.loggedIn && Alloy.Globals.facebook.requestWithGraphPath("me", {}, "GET", function(e) {
        if (e.success) {
            callback(JSON.parse(e.result).username);
            return;
        }
        e.error ? alert(e.error) : alert("Unknown response");
        callback("error");
    });
};

var Cloud = require("ti.cloud");

var deviceToken;

Alloy.Globals.facebookGetUsername(function(fbUsername) {
    "error" != fbUsername && Alloy.Globals.loginUser(fbUsername);
});

Alloy.Globals.registerUser = function(username) {
    log("regiser:" + username);
    Cloud.Users.create({
        username: username,
        password: Alloy.Globals.DEFAULT_PASSWORD,
        password_confirmation: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        if (e.success) {
            alert("User Created");
            Alloy.Globals.loginUser(username);
        } else alert("Error :" + e.message);
    });
};

Alloy.Globals.loginUser = function(username) {
    Cloud.Users.login({
        login: username,
        password: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        log("login:" + username);
        if (e.success) {
            e.users[0];
            log("Loggin successfully");
            Alloy.Globals.getDeviceToken();
        } else {
            log("Error :");
            log(e.message);
            401 == e.code && Alloy.Globals.registerUser(username);
        }
    });
};

Alloy.Globals.getDeviceToken = function() {
    Titanium.Network.registerForPushNotifications({
        types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
        success: function(e) {
            deviceToken = e.deviceToken;
            alert("deviceToken = " + deviceToken);
        },
        error: function(e) {
            alert("ErrorDeviceToken: " + e.message);
        },
        callback: function(e) {
            alert("push notification received" + JSON.stringify(e.data));
        }
    });
};

Alloy.Globals.subscribePush = function(channel) {
    Cloud.PushNotifications.subscribe({
        channel: channel,
        device_token: Ti.Network.remoteDeviceUUID
    }, function(e) {
        e.success ? alert("Success :" + (e.error && e.message || JSON.stringify(e))) : alert("ErrorSubscribe:" + (e.error && e.message || JSON.stringify(e)));
    });
};

Alloy.Globals.unsubscribePush = function(channel) {
    log(Ti.Network.remoteDeviceUUID);
    Cloud.PushNotifications.unsubscribe({
        channel: channel,
        device_token: Ti.Network.remoteDeviceUUID
    }, function(e) {
        e.success ? alert("Success :" + (e.error && e.message || JSON.stringify(e))) : alert("ErrorUnSubscribe:" + (e.error && e.message || JSON.stringify(e)));
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

Alloy.Globals.fbPost = function(itemTitle, imageLink) {
    var data = {
        link: Alloy.Globals.FBPOST_LINK,
        name: "TruyệnAlloy",
        message: "Đang đọc truyện " + itemTitle + " trên điện thoại bằng ",
        caption: "Phần mềm đọc truyện hay nhất trên mobile và tablet",
        picture: imageLink,
        description: "Hãy tải phần mềm để có thể đọc truyện mọi lúc mọi nơi, update liên tục, thông báo mỗi khi có chapter mới và rất nhiều tính năng khác. FREEEEEEE!!!!!",
        test: [ {
            foo: "Encoding test",
            bar: "Durp durp"
        }, "test" ]
    };
    Alloy.Globals.facebook.dialog("feed", data, showRequestResult);
};

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
    var osname = Ti.Platform.osname, height = (Ti.Platform.version, Ti.Platform.displayCaps.platformHeight), width = Ti.Platform.displayCaps.platformWidth;
    var isTablet = "ipad" === osname || "android" === osname && (width > 899 || height > 899);
    return isTablet;
};

Alloy.Globals.getDeviceType = function() {
    var isTablet = Alloy.Globals.isTablet();
    return isTablet ? 1 : 0;
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
        itemType: itemType,
        deviceToken: Ti.Network.remoteDeviceUUID
    }, function(response) {
        var data = JSON.parse(response).data;
        Alloy.Globals.fbPost(title, imageLink);
        if ("success" == data) {
            Alloy.Globals.subscribePush(itemId);
            callback();
        }
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
    callback(advImage);
};

Alloy.createController("index");