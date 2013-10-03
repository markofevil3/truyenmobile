function Controller() {
    function closeWindow() {
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(0);
        $.storyReadingWindow.close({
            transform: smallDown,
            duration: 300
        });
    }
    function changeTextSize(e) {
        var ratio = Alloy.Globals.isTablet() ? 1.8 : 1;
        $.contentLabel.font = "0" == e.source.dataType ? {
            fontSize: 18 * ratio
        } : {
            fontSize: 22 * ratio
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyReading";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.storyReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        id: "storyReadingWindow"
    });
    $.__views.storyReadingWindow && $.addTopLevelView($.__views.storyReadingWindow);
    $.__views.topBar = Ti.UI.createView({
        id: "topBar"
    });
    $.__views.storyReadingWindow.add($.__views.topBar);
    $.__views.textSmallButton = Ti.UI.createButton({
        id: "textSmallButton",
        dataType: "0"
    });
    $.__views.topBar.add($.__views.textSmallButton);
    changeTextSize ? $.__views.textSmallButton.addEventListener("click", changeTextSize) : __defers["$.__views.textSmallButton!click!changeTextSize"] = true;
    $.__views.textBigButton = Ti.UI.createButton({
        id: "textBigButton",
        dataType: "1"
    });
    $.__views.topBar.add($.__views.textBigButton);
    changeTextSize ? $.__views.textBigButton.addEventListener("click", changeTextSize) : __defers["$.__views.textBigButton!click!changeTextSize"] = true;
    $.__views.closeButton = Ti.UI.createButton({
        id: "closeButton"
    });
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    $.__views.contentView = Ti.UI.createScrollView({
        id: "contentView"
    });
    $.__views.storyReadingWindow.add($.__views.contentView);
    $.__views.contentWrapper = Ti.UI.createView({
        width: "96%",
        height: "100%",
        id: "contentWrapper"
    });
    $.__views.contentView.add($.__views.contentWrapper);
    $.__views.contentLabel = Ti.UI.createTextArea({
        id: "contentLabel"
    });
    $.__views.contentWrapper.add($.__views.contentLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    exports.openMainWindow = function() {
        $.contentLabel.value = args.content;
        "iPhone OS" == Alloy.Globals.getOSType() ? $.storyReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        }) : $.storyReadingWindow.open();
    };
    __defers["$.__views.textSmallButton!click!changeTextSize"] && $.__views.textSmallButton.addEventListener("click", changeTextSize);
    __defers["$.__views.textBigButton!click!changeTextSize"] && $.__views.textBigButton.addEventListener("click", changeTextSize);
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;