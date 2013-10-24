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
        Alloy.Globals.readingFontSize = e.value;
        Ti.App.fireEvent("changeFont", {
            message: Alloy.Globals.readingFontSize
        });
    }
    function SaveReadingChapter() {
        Alloy.Globals.readingChapters[args.storyId] = args.title;
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
            width: 20,
            height: 20,
            left: 15,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 16
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 30,
            height: 30,
            left: 30,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textSmallButton",
            dataType: "0"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textSmallButton);
    $.__views.textBigButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 30,
            height: 30,
            left: 205,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 30
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 50,
            height: 50,
            left: 325,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 38
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textBigButton",
            dataType: "1"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textBigButton);
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
    $.__views.slider = Ti.UI.createSlider(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            min: 16,
            max: 30,
            width: 150,
            height: 20,
            left: 40
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            min: 26,
            max: 38,
            width: 250,
            height: 20,
            left: 70
        });
        _.extend(o, {
            id: "slider"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.slider);
    changeTextSize ? $.__views.slider.addEventListener("change", changeTextSize) : __defers["$.__views.slider!change!changeTextSize"] = true;
    $.__views.webview = Ti.UI.createWebView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 40
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 70
        });
        _.extend(o, {
            id: "webview"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.webview);
    $.__views.advView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 50,
            bottom: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 90,
            bottom: 0
        });
        _.extend(o, {
            id: "advView"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.advView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var webview = $.webview;
    exports.openMainWindow = function() {
        Alloy.Globals.adv(3, function(advImage) {
            $.advView.add(advImage);
            $.advView.height = Alloy.Globals.getAdvHeight();
        });
        webview.url = "storyReading.html";
        webview.addEventListener("load", function() {
            Ti.App.fireEvent("setContent", {
                message: args.content
            });
            $.slider.setValue(Alloy.Globals.readingFontSize);
        });
        webview.bottom = Alloy.Globals.getAdvHeight();
        "iPhone OS" == Alloy.Globals.getOSType() ? $.storyReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        }) : $.storyReadingWindow.open();
        SaveReadingChapter();
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    __defers["$.__views.slider!change!changeTextSize"] && $.__views.slider.addEventListener("change", changeTextSize);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;