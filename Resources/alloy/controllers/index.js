function Controller() {
    function appPause() {
        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory);
        var list = f.getDirectoryListing();
        for (var i = 0; list.length > i; i++) Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory + list[i]).deleteFile();
        Alloy.Globals.saveUserData();
        Ti.App.Properties.setDouble("pausedTime", new Date().getTime());
    }
    function appResume() {
        var pausedTime = Ti.App.Properties.getDouble("pausedTime");
        if (new Date().getTime() - pausedTime > 108e5) {
            tabGroup.setActiveTab(0);
            for (var i = 0; Alloy.Globals.homeWindowStack.length > i; i++) Alloy.Globals.homeWindowStack[i].close();
        }
    }
    function startApp() {
        Ti.App.addEventListener("pause", appPause);
        Ti.App.addEventListener("resumed", appResume);
        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userData.txt");
        var content = f.read();
        void 0 != content && null != content && "" != content && (Alloy.Globals.readingChapters = JSON.parse(content.text));
        if ("iPhone OS" == Alloy.Globals.getOSType()) {
            var overrideTabs = require("IosCustomTabBar");
            overrideTabs($.tabGroup, {
                backgroundImage: "/common/top.png"
            }, {
                backgroundImage: "/common/top-active.png",
                backgroundColor: "transparent",
                color: "#000",
                style: 0
            }, {
                backgroundImage: "/common/top.png",
                backgroundColor: "transparent",
                color: "#888",
                style: 0
            });
        }
        Alloy.Globals.TAB_GROUP = $.tapGroup;
        $.tabGroup.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        id: "tabGroup"
    });
    $.__views.__alloyId13 = Alloy.createController("home", {
        id: "__alloyId13"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId13.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId14 = Alloy.createController("favorite", {
        id: "__alloyId14"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId14.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId15 = Alloy.createController("setting", {
        id: "__alloyId15"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId15.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tabGroup = $.tabGroup;
    startApp();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;