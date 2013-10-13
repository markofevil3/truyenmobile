function Controller() {
    function selectMenu(e) {
        var selectedMenuController = Alloy.createController(e.rowData.id);
        selectedMenuController.openMainWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setting";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settingWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "settingWindow",
        title: "Setting"
    });
    $.__views.account = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 50,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 66,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {
            id: "account",
            title: "Tài Khoản"
        });
        return o;
    }());
    var __alloyId17 = [];
    __alloyId17.push($.__views.account);
    selectMenu ? $.__views.account.addEventListener("click", selectMenu) : __defers["$.__views.account!click!selectMenu"] = true;
    $.__views.support = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 50,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 66,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {
            id: "support",
            title: "Yêu Cầu Truyện"
        });
        return o;
    }());
    __alloyId17.push($.__views.support);
    selectMenu ? $.__views.support.addEventListener("click", selectMenu) : __defers["$.__views.support!click!selectMenu"] = true;
    $.__views.aboutUs = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 50,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 66,
            hasChild: true,
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {
            id: "aboutUs",
            title: "Giới Thiệu"
        });
        return o;
    }());
    __alloyId17.push($.__views.aboutUs);
    selectMenu ? $.__views.aboutUs.addEventListener("click", selectMenu) : __defers["$.__views.aboutUs!click!selectMenu"] = true;
    $.__views.adv = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 50
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 90
        });
        _.extend(o, {
            id: "adv"
        });
        return o;
    }());
    __alloyId17.push($.__views.adv);
    $.__views.settingTableView = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        scrollable: false,
        backgroundColor: "transparent",
        top: 0,
        data: __alloyId17,
        id: "settingTableView"
    });
    $.__views.settingWindow.add($.__views.settingTableView);
    $.__views.facebookLikeBox = Ti.UI.createWebView({
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: 0,
        textAlign: "center",
        backgroundColor: "transparent",
        id: "facebookLikeBox"
    });
    $.__views.settingWindow.add($.__views.facebookLikeBox);
    $.__views.settingTab = Ti.UI.createTab({
        window: $.__views.settingWindow,
        id: "settingTab",
        icon: "/common/setting.png"
    });
    $.__views.settingTab && $.addTopLevelView($.__views.settingTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
        $.adv.add(advImage);
    });
    $.settingTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = $.settingTab;
    });
    $.facebookLikeBox.url = Alloy.Globals.SERVER + "/facebook?type=" + Alloy.Globals.getDeviceType();
    __defers["$.__views.account!click!selectMenu"] && $.__views.account.addEventListener("click", selectMenu);
    __defers["$.__views.support!click!selectMenu"] && $.__views.support.addEventListener("click", selectMenu);
    __defers["$.__views.aboutUs!click!selectMenu"] && $.__views.aboutUs.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;