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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.storyReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        id: "storyReadingWindow"
    });
    $.__views.storyReadingWindow && $.addTopLevelView($.__views.storyReadingWindow);
    $.__views.topBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 40,
            backgroundColor: "#fff",
            top: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 70,
            backgroundColor: "#fff",
            top: 0
        });
        _.extend(o, {
            id: "topBar"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.topBar);
    $.__views.textSmallButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 30,
            height: 30,
            right: 115,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 13
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 50,
            height: 50,
            right: 175,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textSmallButton",
            dataType: "0"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textSmallButton);
    changeTextSize ? $.__views.textSmallButton.addEventListener("click", changeTextSize) : __defers["$.__views.textSmallButton!click!changeTextSize"] = true;
    $.__views.textBigButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 30,
            height: 30,
            right: 75,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 19
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 50,
            height: 50,
            right: 115,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 38
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textBigButton",
            dataType: "1"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textBigButton);
    changeTextSize ? $.__views.textBigButton.addEventListener("click", changeTextSize) : __defers["$.__views.textBigButton!click!changeTextSize"] = true;
    $.__views.closeButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "close",
            width: 60,
            height: 30,
            right: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            selectedColor: "#333",
            color: "#CCCCCC"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "close",
            width: 100,
            height: 50,
            right: 5,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            selectedColor: "#fff",
            color: "#cb0a00"
        });
        _.extend(o, {
            id: "closeButton"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    $.__views.contentView = Ti.UI.createScrollView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            width: "100%",
            backgroundColor: "#fff",
            top: 40
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            width: "100%",
            backgroundColor: "#fff",
            top: 70
        });
        _.extend(o, {
            id: "contentView"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.contentView);
    $.__views.contentWrapper = Ti.UI.createView({
        width: "96%",
        height: "100%",
        id: "contentWrapper"
    });
    $.__views.contentView.add($.__views.contentWrapper);
    $.__views.contentLabel = Ti.UI.createTextArea(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: "100%",
            top: 5,
            font: {
                fontSize: 18
            },
            editable: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: "100%",
            top: 5,
            font: {
                fontSize: 36
            },
            editable: false
        });
        _.extend(o, {
            id: "contentLabel"
        });
        return o;
    }());
    $.__views.contentWrapper.add($.__views.contentLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    exports.openMainWindow = function() {
        $.contentLabel.value = args.content;
        $.storyReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.textSmallButton!click!changeTextSize"] && $.__views.textSmallButton.addEventListener("click", changeTextSize);
    __defers["$.__views.textBigButton!click!changeTextSize"] && $.__views.textBigButton.addEventListener("click", changeTextSize);
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;