function Controller() {
    function closeWindow() {
        clearInterval(updateTime);
        player.isPlaying() && player.stop();
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(.5);
        $.audioPlayerWindow.close({
            transform: smallDown,
            duration: 100
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "audioPlayer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.audioPlayerWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        layout: "vertical",
        id: "audioPlayerWindow"
    });
    $.__views.audioPlayerWindow && $.addTopLevelView($.__views.audioPlayerWindow);
    $.__views.topBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 40,
            backgroundColor: "transparent",
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
    $.__views.audioPlayerWindow.add($.__views.topBar);
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
    $.__views.playerView = Ti.UI.createView({
        width: "100%",
        height: "auto",
        backgroundColor: "red",
        layout: "vertical",
        id: "playerView"
    });
    $.__views.audioPlayerWindow.add($.__views.playerView);
    $.__views.audioTitle = Ti.UI.createLabel({
        text: "asda",
        id: "audioTitle"
    });
    $.__views.playerView.add($.__views.audioTitle);
    $.__views.audioProgress = Ti.UI.createProgressBar({
        width: 200,
        min: 0,
        value: 0,
        height: 70,
        color: "#fff",
        message: "Downloading 0 of 10",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "audioProgress"
    });
    $.__views.playerView.add($.__views.audioProgress);
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
    $.__views.audioPlayerWindow.add($.__views.advView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var updateTime;
    var progressBar = $.audioProgress;
    var player;
    exports.openMainWindow = function() {
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
        log("##111: " + Alloy.Globals.checkAudioExist("Vesang.mp3"));
        progressBar.show();
        player = Ti.Media.createSound({
            url: "Vesang.mp3"
        });
        player.play();
        progressBar.max = player.duration;
        updateTime = setInterval(function() {
            player.isPlaying() && (progressBar.value = player.time / 1e3);
        }, 500);
        $.audioPlayerWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;