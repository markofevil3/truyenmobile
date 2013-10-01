function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "aboutUs";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.aboutUsWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "aboutUsWindow",
        title: "Giới Thiệu"
    });
    $.__views.aboutUsWindow && $.addTopLevelView($.__views.aboutUsWindow);
    $.__views.wrapperView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "wrapperView"
    });
    $.__views.aboutUsWindow.add($.__views.wrapperView);
    $.__views.appNameLabel = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: "30%",
        id: "appNameLabel",
        text: "Truyện"
    });
    $.__views.wrapperView.add($.__views.appNameLabel);
    $.__views.versionLabel = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontStyle: "italic"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "versionLabel"
    });
    $.__views.wrapperView.add($.__views.versionLabel);
    $.__views.emailLabel = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontStyle: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#008AE6",
        id: "emailLabel",
        text: "Support: fulltruyen@gmail.com"
    });
    $.__views.wrapperView.add($.__views.emailLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        $.versionLabel.text = "Version " + Titanium.App.version;
        $.aboutUsWindow.leftNavButton = Alloy.Globals.backButton($.aboutUsWindow);
        Alloy.Globals.CURRENT_TAB.open($.aboutUsWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;