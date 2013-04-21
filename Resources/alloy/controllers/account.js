function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.accountWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "accountWindow",
        title: "Tài Khoản"
    });
    $.__views.accountWindow && $.addTopLevelView($.__views.accountWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        $.accountWindow.leftNavButton = Alloy.Globals.backButton($.accountWindow);
        var facebookButton = Alloy.Globals.facebook.createLoginButton({
            style: Ti.Facebook.BUTTON_STYLE_NORMAL
        });
        $.accountWindow.add(facebookButton);
        Alloy.Globals.CURRENT_TAB.open($.accountWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;