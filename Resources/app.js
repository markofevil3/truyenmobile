function RevMob(appIds) {
    var moduleNames = {
        "iPhone OS": "com.revmob.titanium",
        android: "com.revmob.ti.android"
    };
    var revmobModule = require(moduleNames["iPhone OS"]);
    revmobModule.startSession(appIds["iPhone OS"]);
    return revmobModule;
}

function log(para) {
    Ti.API.info(JSON.stringify(para));
}

function showRequestResult() {}

function isHash(obj) {
    return obj.constructor == Object;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.isTablet = function() {
    var osname = Ti.Platform.osname;
    return osname.search(/iphone/i) > -1 ? false : true;
};

Alloy.Globals.SERVER = "http://113.190.1.107:3000";

Alloy.Globals.MAX_DISPLAY_ROW = 30;

Alloy.Globals.NEW_TIME_MILLISECONDS = 2592e5;

Alloy.Globals.RATIO = 1;

Alloy.Globals.CURRENT_TAB = null;

Alloy.Globals.TAB_GROUP = null;

Alloy.Globals.currentLoadingView = null;

Alloy.Globals.FBPOST_LINK = "https://www.facebook.com/fulltruyen?ref=hl";

Alloy.Globals.facebook = require("facebook");

Alloy.Globals.facebook.appid = "517068261714145";

Alloy.Globals.facebook.permissions = [ "read_stream" ];

Alloy.Globals.facebook.forceDialogAuth = false;

Alloy.Globals.DEFAULT_PASSWORD = "truyenAlloy";

Alloy.Globals.DEFAULT_PUSH_CHANNEL = "news";

Alloy.Globals.listener = null;

Alloy.Globals.FB_USERNAME = null;

Alloy.Globals.homeWindowStack = [];

Alloy.Globals.readingChapters = {};

Alloy.Globals.readingFontSize = Alloy.Globals.isTablet() ? 26 : 16;

Alloy.Globals.advPublisher = 0;

Alloy.Globals.admobPublisher = {
    android: "a1524cf9df9881d",
    iphone: "a15242fc9991b03",
    ipad: "a15242fe704686c"
};

var revmob = new RevMob({
    "iPhone OS": "52443a8f95b82813ab000035",
    android: "copy your RevMob Android App ID here"
});

Alloy.Globals.setAdmobPublisher = function(publisher, admobPublishers) {
    Alloy.Globals.advPublisher = publisher;
    Alloy.Globals.admobPublisher = admobPublishers;
};

Alloy.Globals.saveUserData = function() {
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userData.txt");
    f.write(JSON.stringify(Alloy.Globals.readingChapters));
};

var Admob = require("ti.admob");

var GA = require("analytics.google");

var tracker = GA.getTracker("UA-44461245-1");

Alloy.Globals.track = function(cate, action, label) {
    tracker.trackEvent({
        category: cate,
        action: action,
        label: label,
        value: 1
    });
};

Alloy.Globals.listener = function(e, callback) {
    if (e.success) {
        void 0 == Ti.Network.remoteDeviceUUID && Alloy.Globals.loginUser(Titanium.Platform.id);
        Alloy.Globals.FB_USERNAME = e.data.username;
        callback(e);
    } else e.error ? log(e.error) : e.cancelled;
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

Alloy.Globals.registerUser = function(username) {
    Cloud.Users.create({
        username: username,
        password: Alloy.Globals.DEFAULT_PASSWORD,
        password_confirmation: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        if (e.success) {
            log("Alloy.Globals.registerUser: Created");
            Alloy.Globals.loginUser(username, function() {
                Alloy.Globals.subscribePush(Alloy.Globals.DEFAULT_PUSH_CHANNEL);
            });
        } else {
            log("Alloy.Globals.registerUser:");
            log(e.message);
        }
    });
};

Alloy.Globals.loginUser = function(username, callback) {
    Cloud.Users.login({
        login: Titanium.Platform.id,
        password: Alloy.Globals.DEFAULT_PASSWORD
    }, function(e) {
        log("login:" + username);
        if (e.success) {
            e.users[0];
            log("Alloy.Globals.loginUser: successfully");
            Alloy.Globals.getDeviceToken(callback);
        } else {
            log("Error :");
            log(e.message);
            401 == e.code && Alloy.Globals.registerUser(Titanium.Platform.id);
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
        },
        callback: function(e) {
            log("Alloy.Globals.getDeviceToken:" + JSON.stringify(e.data));
            log("new message from push");
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

Alloy.Globals.fbPost = function(itemTitle, imageLink) {
    var data = {
        link: Alloy.Globals.FBPOST_LINK,
        name: itemTitle + " - Full Truyện App",
        message: 'Đang đọc truyện "' + itemTitle + '" trên điện thoại bằng Full Truyện',
        caption: "Phần mềm đọc truyện miễn phí trên mobile và tablet",
        picture: imageLink,
        description: "Hãy tải phần mềm để có thể đọc truyện mọi lúc mọi nơi, update liên tục, thông báo mỗi khi có chapter mới và rất nhiều tính năng khác. FREEEEEEE!!!!!"
    };
    Alloy.Globals.facebook.reauthorize([ "publish_stream" ], "me", function(e) {
        if (e.success) Alloy.Globals.facebook.requestWithGraphPath("me/feed", data, "POST", showRequestResult); else if (e.error) {
            log("Alloy.Globals.facebook.reauthorize:");
            log(e.error);
        }
    });
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
            if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
                alert("Không có internet!");
                return;
            }
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
        "iPhone OS" == Alloy.Globals.getOSType() && tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW, {
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
        void 0 != Ti.Network.remoteDeviceUUID ? Alloy.Globals.subscribePush(itemId) : Alloy.Globals.loginUser(Titanium.Platform.id, function() {
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

Alloy.Globals.getAdvPublisherId = function() {
    return Alloy.Globals.admobPublisher[Titanium.Platform.osname];
};

Alloy.Globals.getAdvHeight = function() {
    switch (Titanium.Platform.osname) {
      case "android":
        return 75;

      case "iphone":
        return 50;

      case "ipad":
        return 0 == Alloy.Globals.advPublisher ? 66 : 90;
    }
};

Alloy.Globals.adv = function(type, callback) {
    if (0 == Alloy.Globals.advPublisher) {
        var advImage = Ti.UI.iOS.createAdView({
            width: "auto",
            height: "auto"
        });
        advImage.addEventListener("error", function(e) {
            2 != e.code;
        });
        callback(advImage);
    } else {
        var advImage = Admob.createView({
            width: Ti.Platform.displayCaps.platformWidth,
            height: Alloy.Globals.getAdvHeight(),
            publisherId: Alloy.Globals.getAdvPublisherId(),
            testing: false,
            dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
            gender: "male",
            keywords: ""
        });
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
        Ti.Geolocation.distanceFilter = 0;
        Ti.Geolocation.purpose = "To show you local ads, of course!";
        Ti.Geolocation.getCurrentPosition(function(e) {
            var advImage;
            advImage = !e.success || e.error ? Admob.createView({
                width: Ti.Platform.displayCaps.platformWidth,
                height: Alloy.Globals.getAdvHeight(),
                publisherId: Alloy.Globals.getAdvPublisherId(),
                testing: false,
                dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
                gender: "male",
                keywords: ""
            }) : Admob.createView({
                width: Ti.Platform.displayCaps.platformWidth,
                height: Alloy.Globals.getAdvHeight(),
                publisherId: Alloy.Globals.getAdvPublisherId(),
                testing: false,
                dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
                gender: "male",
                keywords: "",
                location: e.coords
            });
            callback(advImage);
        });
    }
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

Alloy.Globals.getNewestChapter = function(chapters) {
    var newest = 0;
    for (var i = 0; chapters.length > i; i++) parseFloat(chapters[i].chapter) > newest && (newest = parseFloat(chapters[i].chapter));
    return newest;
};

Alloy.Globals.checkAudioExist = function(audioName) {
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/audioData/" + audioName);
    return file.exists();
};

Alloy.Globals.convertTime = function(timer) {
    if (0 >= timer) return "00:00:00";
    var timeString = "";
    if (timer > 3600) {
        timeString += Math.floor(timer / 3600) + ":";
        timer -= parseInt(3600 * Math.floor(timer / 3600));
    } else timeString += "00:";
    if (timer >= 60) {
        timeString += Math.floor(timer / 60) + ":";
        timer -= parseInt(60 * Math.floor(timer / 60));
    } else timeString += "00:";
    timeString += 10 > timer ? "0" + timer : timer;
    return timeString;
};

var NappAppearance = require("dk.napp.appearance");

NappAppearance.setGlobalStyling({
    activityIndicator: {
        color: "#CD1625"
    }
});

Alloy.createController("index");