function Controller() {
    function closeWindow() {
        clearInterval(updateTime);
        player.playing && player.stop();
        if (new Date().getTime() - openTime >= openPopupAdTime) {
            revmob.showFullscreen();
            Alloy.Globals.readingCount = 0;
        }
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(.5);
        $.audioPlayerWindow.close({
            transform: smallDown,
            duration: 100
        });
    }
    function eventPlay() {
        if (player.playing) {
            playButton.backgroundImage = "/common/btn-play.png";
            playButton.backgroundSelectedImage = "/common/btn-play-active.png";
            player.pause();
        } else {
            playButton.backgroundImage = "/common/btn-pause.png";
            playButton.backgroundSelectedImage = "/common/btn-pause-pressed.png";
            isRemotePlay ? player.start() : player.play();
        }
    }
    function eventMute() {
        if (player && null != player) if (0 == player.volume) {
            player.volume = 1;
            volumeProgress.value = 1;
        } else {
            player.volume = 0;
            volumeProgress.value = 0;
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
            height: 30,
            backgroundColor: "transparent",
            top: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 60,
            backgroundColor: "#transparent",
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
    $.__views.audioTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 18,
                fontFamily: "Chalkboard SE"
            },
            left: 10
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 34,
                fontFamily: "Chalkboard SE"
            },
            left: 10
        });
        _.extend(o, {
            text: "asda",
            id: "audioTitle"
        });
        return o;
    }());
    $.__views.audioDes.add($.__views.audioTitle);
    $.__views.audioAuthor = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 10,
            font: {
                fontSize: 15,
                fontStyle: "italic",
                fontFamily: "AmericanTypewriter"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 10,
            font: {
                fontSize: 28,
                fontStyle: "italic",
                fontFamily: "AmericanTypewriter"
            }
        });
        _.extend(o, {
            text: "Tac gia:",
            id: "audioAuthor"
        });
        return o;
    }());
    $.__views.audioDes.add($.__views.audioAuthor);
    $.__views.audioSpeaker = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 10,
            font: {
                fontSize: 15,
                fontStyle: "italic",
                fontFamily: "AmericanTypewriter"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 10,
            font: {
                fontSize: 28,
                fontStyle: "italic",
                fontFamily: "AmericanTypewriter"
            }
        });
        _.extend(o, {
            text: "Nguoi doc: sadsada",
            id: "audioSpeaker"
        });
        return o;
    }());
    $.__views.audioDes.add($.__views.audioSpeaker);
    $.__views.coverLink = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "35%",
            height: "auto",
            top: 5
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "35%",
            height: "auto",
            top: 10
        });
        _.extend(o, {
            id: "coverLink",
            image: "http://idoc.vn/images/books/5203a511db193a327f8bb47e/chuot-tui-lao-ba.png"
        });
        return o;
    }());
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
    $.__views.currentTimeLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 13
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 26
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 35
        });
        _.extend(o, {
            id: "currentTimeLabel",
            text: "00:00:00"
        });
        return o;
    }());
    $.__views.progressWrapper.add($.__views.currentTimeLabel);
    $.__views.audioProgress = Ti.UI.createSlider({
        width: "60%",
        left: 5,
        min: 0,
        value: 0,
        height: "auto",
        id: "audioProgress"
    });
    $.__views.progressWrapper.add($.__views.audioProgress);
    $.__views.maxTimeLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 13
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 26
            }
        });
        _.extend(o, {
            left: 5,
            id: "maxTimeLabel"
        });
        return o;
    }());
    $.__views.progressWrapper.add($.__views.maxTimeLabel);
    $.__views.buttons = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "buttons"
    });
    $.__views.playerView.add($.__views.buttons);
    $.__views.playButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "",
            width: 30,
            height: 30,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn-play.png",
            backgroundSelectedImage: "/common/btn-play-active.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "",
            width: 60,
            height: 60,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn-play.png",
            backgroundSelectedImage: "/common/btn-play-active.png"
        });
        _.extend(o, {
            id: "playButton"
        });
        return o;
    }());
    $.__views.buttons.add($.__views.playButton);
    eventPlay ? $.__views.playButton.addEventListener("click", eventPlay) : __defers["$.__views.playButton!click!eventPlay"] = true;
    $.__views.volumeView = Ti.UI.createView({
        layout: "horizontal",
        top: 25,
        id: "volumeView"
    });
    $.__views.playerView.add($.__views.volumeView);
    $.__views.muteButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "",
            width: 25,
            height: 25,
            backgroundColor: "transparent",
            backgroundImage: "/common/sound.png",
            left: "30%"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "",
            width: 50,
            height: 50,
            backgroundColor: "transparent",
            backgroundImage: "/common/sound.png",
            left: "30%"
        });
        _.extend(o, {
            id: "muteButton"
        });
        return o;
    }());
    $.__views.volumeView.add($.__views.muteButton);
    eventMute ? $.__views.muteButton.addEventListener("click", eventMute) : __defers["$.__views.muteButton!click!eventMute"] = true;
    $.__views.volumeProgress = Ti.UI.createSlider({
        width: "30%",
        min: 0,
        max: 1,
        value: .5,
        left: 3,
        id: "volumeProgress"
    });
    $.__views.volumeView.add($.__views.volumeProgress);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var updateTime;
    var progressBar = $.audioProgress;
    var currentTimeLabel = $.currentTimeLabel;
    var maxTimeLabel = $.maxTimeLabel;
    var playButton = $.playButton;
    var volumeProgress = $.volumeProgress;
    var player;
    var isRemotePlay;
    var openTime;
    var openPopupAdTime = 15e4;
    exports.openMainWindow = function() {
        openTime = new Date().getTime();
        $.audioTitle.text = args.data.title;
        $.audioAuthor.text = "Tác giả: " + args.data.author;
        $.audioSpeaker.text = "Người đọc: " + args.data.reader;
        $.coverLink.image = args.data.cover && null != args.data.cover ? args.data.cover : Alloy.Globals.SERVER + "/images/audioDefaultCover.jpg";
        if (Alloy.Globals.checkAudioExist(args.data.fileName)) {
            isRemotePlay = false;
            var file = Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder, args.data.fileName);
            player = Ti.Media.createSound({
                url: file.nativePath
            });
            Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
            progressBar.max = player.duration;
            maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.duration));
            updateTime = setInterval(function() {
                if (player.playing) {
                    currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.time / 1e3));
                    progressBar.value = player.time / 1e3;
                }
            }, 500);
            progressBar.addEventListener("stop", function(e) {
                currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(e.value));
                progressBar.value = e.value;
                player.setTime(1e3 * e.value);
            });
            volumeProgress.addEventListener("stop", function(e) {
                player.volume = e.value;
            });
        } else {
            isRemotePlay = true;
            player = Ti.Media.createAudioPlayer({
                url: args.data.link,
                allowBackground: true
            });
            progressBar.max = player.duration;
            maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(args.data.length));
            player.addEventListener("progress", function(e) {
                currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(e.progress / 1e3));
                progressBar.value = e.progress;
            });
        }
        $.audioPlayerWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    __defers["$.__views.playButton!click!eventPlay"] && $.__views.playButton.addEventListener("click", eventPlay);
    __defers["$.__views.muteButton!click!eventMute"] && $.__views.muteButton.addEventListener("click", eventMute);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;