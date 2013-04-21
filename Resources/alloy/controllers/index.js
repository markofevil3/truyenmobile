function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;