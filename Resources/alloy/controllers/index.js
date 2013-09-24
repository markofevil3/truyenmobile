function Controller() {
    function openStoreLink(data) {
        "iPhone OS" == Alloy.Globals.getOSType() ? Ti.Platform.openURL(data.iosLink) : Ti.Platform.openURL(data.androidLink);
    }
    function startApp() {
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
    $.__views.__alloyId8 = Alloy.createController("home", {
        id: "__alloyId8"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId8.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId9 = Alloy.createController("favorite", {
        id: "__alloyId9"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId9.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId10 = Alloy.createController("setting", {
        id: "__alloyId10"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId10.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Titanium.App.addEventListener("pause", function() {
        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory);
        var list = f.getDirectoryListing();
        for (var i = 0; list.length > i; i++) Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory + list[i]).deleteFile();
    });
    log("########## " + Titanium.App.version);
    Alloy.Globals.getAjax("/appVersion", {
        "null": null
    }, function(response) {
        var data = JSON.parse(response);
        if (data.error || data.version == Titanium.App.version) startApp(); else {
            log(data);
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
                1 == e.index ? openStoreLink(response) : startApp();
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;