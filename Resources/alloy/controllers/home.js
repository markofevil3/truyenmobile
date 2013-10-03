function Controller() {
    function selectMenu(e) {
        if ("funnyList" == e.rowData.dataName || "storyList" == e.rowData.dataName) alert("Coming Soon!"); else {
            var selectedMenuController = Alloy.createController(e.rowData.dataName);
            selectedMenuController.openMainWindow();
        }
    }
    function appStart() {
        Alloy.Globals.getAjax("/appVersion", {
            "null": null
        }, function(response) {
            void 0 == response && alert("Không có kết nối Internet!");
            var data = JSON.parse(response);
            if (data.error || data.version == Titanium.App.version) {
                "iPhone OS" == Alloy.Globals.getOSType() ? void 0 != data.iosLink && (Alloy.Globals.FBPOST_LINK = data.iosLink) : void 0 != data.androidLink && (Alloy.Globals.FBPOST_LINK = data.androidLink);
                startHome();
            } else {
                var dialog;
                if (data.force) {
                    dialog = Ti.UI.createAlertDialog({
                        message: "Có phiên bản mới!!!",
                        buttonNames: [ "Nâng Cấp" ],
                        title: "Nâng Cấp"
                    });
                    dialog.show();
                    dialog.addEventListener("click", function() {
                        openStoreLink(response);
                    });
                } else {
                    dialog = Ti.UI.createAlertDialog({
                        cancel: 0,
                        buttonNames: [ "Bỏ Qua", "Nâng Cấp" ],
                        message: "Có phiên bản mới!!!",
                        title: "Nâng Cấp"
                    });
                    dialog.show();
                }
                dialog.addEventListener("click", function(e) {
                    1 == e.index ? openStoreLink(response) : startHome();
                });
            }
        });
    }
    function openStoreLink(data) {
        "iPhone OS" == Alloy.Globals.getOSType() ? Ti.Platform.openURL(data.iosLink) : Ti.Platform.openURL(data.androidLink);
    }
    function startHome() {
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advertise.add(advImage);
            $.advertise.height = Alloy.Globals.getAdvHeight();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.homeWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "homeWindow",
        title: "Home"
    });
    $.__views.advertise = Ti.UI.createTableViewRow({
        id: "advertise"
    });
    var __alloyId0 = [];
    __alloyId0.push($.__views.advertise);
    $.__views.MangaList = Ti.UI.createTableViewRow({
        id: "MangaList",
        dataName: "mangaList"
    });
    __alloyId0.push($.__views.MangaList);
    selectMenu ? $.__views.MangaList.addEventListener("click", selectMenu) : __defers["$.__views.MangaList!click!selectMenu"] = true;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "Truyện Tranh",
        id: "__alloyId1"
    });
    $.__views.MangaList.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        image: "/common/bg_blue.png",
        id: "__alloyId2"
    });
    $.__views.MangaList.add($.__views.__alloyId2);
    $.__views.StoryList = Ti.UI.createTableViewRow({
        id: "StoryList",
        dataName: "storyList"
    });
    __alloyId0.push($.__views.StoryList);
    selectMenu ? $.__views.StoryList.addEventListener("click", selectMenu) : __defers["$.__views.StoryList!click!selectMenu"] = true;
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Truyện Chữ",
        id: "__alloyId3"
    });
    $.__views.StoryList.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        image: "/common/bg_pink.png",
        id: "__alloyId4"
    });
    $.__views.StoryList.add($.__views.__alloyId4);
    $.__views.FunnyList = Ti.UI.createTableViewRow({
        id: "FunnyList",
        dataName: "funnyList"
    });
    __alloyId0.push($.__views.FunnyList);
    selectMenu ? $.__views.FunnyList.addEventListener("click", selectMenu) : __defers["$.__views.FunnyList!click!selectMenu"] = true;
    $.__views.__alloyId5 = Ti.UI.createLabel({
        text: "Truyện Cười",
        id: "__alloyId5"
    });
    $.__views.FunnyList.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        image: "/common/bg_green.png",
        id: "__alloyId6"
    });
    $.__views.FunnyList.add($.__views.__alloyId6);
    $.__views.homeTableView = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId0,
        id: "homeTableView"
    });
    $.__views.homeWindow.add($.__views.homeTableView);
    $.__views.homeTab = Ti.UI.createTab({
        window: $.__views.homeWindow,
        id: "homeTab",
        icon: "/common/home.png"
    });
    $.__views.homeTab && $.addTopLevelView($.__views.homeTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var homeTab = $.homeTab;
    homeTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = homeTab;
        appStart();
    });
    Ti.App.addEventListener("app:reload", function() {
        Alloy.Globals.CURRENT_TAB = homeTab;
        appStart();
    });
    __defers["$.__views.MangaList!click!selectMenu"] && $.__views.MangaList.addEventListener("click", selectMenu);
    __defers["$.__views.StoryList!click!selectMenu"] && $.__views.StoryList.addEventListener("click", selectMenu);
    __defers["$.__views.FunnyList!click!selectMenu"] && $.__views.FunnyList.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;