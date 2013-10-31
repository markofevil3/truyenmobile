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
    function eventPlay() {
        if (player.isPlaying()) {
            playButton.backgroundImage = "/common/btn-play.png";
            playButton.backgroundSelectedImage = "/common/btn-play-active.png";
            player.pause();
        } else {
            playButton.backgroundImage = "/common/btn-pause.png";
            playButton.backgroundSelectedImage = "/common/btn-pause-pressed.png";
            player.play();
        }
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
        backgroundImage: "/common/playerBg.jpg",
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
            backgroundColor: "transparent",
            backgroundImage: "/common/btn.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            color: "#000"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "close",
            width: 100,
            height: 50,
            right: 5,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            color: "#000"
        });
        _.extend(o, {
            id: "closeButton"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    $.__views.audioDes = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        left: 0,
        id: "audioDes"
    });
    $.__views.audioPlayerWindow.add($.__views.audioDes);
    $.__views.audioTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Chalkboard SE"
        },
        left: 10,
        text: "asda",
        id: "audioTitle"
    });
    $.__views.audioDes.add($.__views.audioTitle);
    $.__views.audioAuthor = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 15,
            fontStyle: "italic",
            fontFamily: "AmericanTypewriter"
        },
        text: "Tac gia:",
        id: "audioAuthor"
    });
    $.__views.audioDes.add($.__views.audioAuthor);
    $.__views.audioSpeaker = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 15,
            fontStyle: "italic",
            fontFamily: "AmericanTypewriter"
        },
        text: "Nguoi doc: sadsada",
        id: "audioSpeaker"
    });
    $.__views.audioDes.add($.__views.audioSpeaker);
    $.__views.coverLink = Ti.UI.createImageView({
        width: "35%",
        height: "auto",
        top: 5,
        id: "coverLink",
        image: "http://idoc.vn/images/books/5203a511db193a327f8bb47e/chuot-tui-lao-ba.png"
    });
    $.__views.audioDes.add($.__views.coverLink);
    $.__views.playerView = Ti.UI.createView({
        width: "100%",
        height: "auto",
        top: 20,
        layout: "vertical",
        id: "playerView"
    });
    $.__views.audioPlayerWindow.add($.__views.playerView);
    $.__views.progressWrapper = Ti.UI.createView({
        layout: "horizontal",
        height: 40,
        id: "progressWrapper"
    });
    $.__views.playerView.add($.__views.progressWrapper);
    $.__views.currentTimeLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 13
        },
        left: 3,
        id: "currentTimeLabel",
        text: "00:00:00"
    });
    $.__views.progressWrapper.add($.__views.currentTimeLabel);
    $.__views.audioProgress = Ti.UI.createSlider({
        width: "60%",
        left: 5,
        min: 0,
        value: 0,
        thumbImage: "/common/slider_thumb.png",
        leftTrackImage: "/common/slider_min.png",
        rightTrackImage: "/common/slider_max.png",
        id: "audioProgress"
    });
    $.__views.progressWrapper.add($.__views.audioProgress);
    $.__views.maxTimeLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 13
        },
        left: 5,
        id: "maxTimeLabel"
    });
    $.__views.progressWrapper.add($.__views.maxTimeLabel);
    $.__views.buttons = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "buttons"
    });
    $.__views.playerView.add($.__views.buttons);
    $.__views.playButton = Ti.UI.createButton({
        title: "",
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        backgroundImage: "/common/btn-play.png",
        backgroundSelectedImage: "/common/btn-play-active.png",
        id: "playButton"
    });
    $.__views.buttons.add($.__views.playButton);
    eventPlay ? $.__views.playButton.addEventListener("click", eventPlay) : __defers["$.__views.playButton!click!eventPlay"] = true;
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
    var currentTimeLabel = $.currentTimeLabel;
    var maxTimeLabel = $.maxTimeLabel;
    var playButton = $.playButton;
    var player;
    exports.openMainWindow = function() {
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
        log("##111: " + Alloy.Globals.checkAudioExist("Vesang.mp3"));
        player = Ti.Media.createSound({
            url: "Vesang.mp3"
        });
        progressBar.max = player.duration;
        maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.duration));
        updateTime = setInterval(function() {
            if (player.isPlaying()) {
                currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.time / 1e3));
                progressBar.value = player.time / 1e3;
            }
        }, 500);
        progressBar.addEventListener("stop", function(e) {
            currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(e.value));
            progressBar.value = e.value;
            player.setTime(1e3 * e.value);
        });
        $.audioPlayerWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    __defers["$.__views.playButton!click!eventPlay"] && $.__views.playButton.addEventListener("click", eventPlay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;