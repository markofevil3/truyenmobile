function Controller() {
    function eventClickBtn(e) {
        switch (e.source.dataType) {
          case "download":
            eventDownload();
            break;

          case "cancel":
            eventCancelDownload();
            break;

          case "remove":
            eventRemoveAudio();
        }
    }
    function eventDownload() {
        if (Alloy.Globals.checkAudioExist(args.data.fileName)) ; else {
            log("!!! not download");
            if (Alloy.Globals.isDownloadingAudio) alert("Đang tải truyện khác!"); else {
                var canDownload = Alloy.Globals.downloadAudio(args.data.fileName, args.data.link, null);
                canDownload && setButtonLayout("cancel");
            }
        }
    }
    function eventCancelDownload() {
        setButtonLayout("download");
        Alloy.Globals.cancelDownloadAudio();
    }
    function eventRemoveAudio() {
        var confirmBox = Titanium.UI.createAlertDialog({
            title: "Xoá " + args.data.title + "?",
            buttonNames: [ "Xoá", "Huỷ" ],
            cancel: 1
        });
        confirmBox.show();
        confirmBox.addEventListener("click", function(e) {
            if (0 == e.index) {
                Alloy.Globals.removeAudioFile(args.data.fileName);
                setButtonLayout("download");
            }
        });
    }
    function eventPlay() {
        Alloy.Globals.openLoading(args.window);
        setTimeout(function() {
            var audioPlayerController = Alloy.createController("audioPlayer", {
                data: args.data
            });
            audioPlayerController.openMainWindow();
            Alloy.Globals.closeLoading(args.window);
        }, 300);
    }
    function setButtonLayout(type) {
        downloadBtn.dataType = type;
        switch (type) {
          case "download":
            downloadBtn.title = "Tải";
            downloadBtn.backgroundImage = "/common/btn-download.png";
            break;

          case "cancel":
            downloadBtn.title = "Huỷ";
            downloadBtn.backgroundImage = "/common/btn.png";
            break;

          case "remove":
            downloadBtn.title = "Xoá";
            downloadBtn.backgroundImage = "/common/btn-delete.png";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyAudioListRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 80,
            backgroundColor: "transparent",
            backgroundImage: "/common/dark-background.png",
            touchEnabled: false,
            backgroundSelectedColor: "transparent"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 180,
            backgroundColor: "transparent",
            backgroundImage: "/common/dark-background.png",
            touchEnabled: false,
            backgroundSelectedColor: "transparent"
        });
        _.extend(o, {
            id: "row"
        });
        return o;
    }());
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.bookCoverView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: "17%",
        height: "90%",
        left: "1%",
        id: "bookCoverView"
    });
    $.__views.row.add($.__views.bookCoverView);
    $.__views.bookCover = Ti.UI.createImageView({
        width: "92%",
        height: "93%",
        top: "4%",
        left: "3%",
        id: "bookCover"
    });
    $.__views.bookCoverView.add($.__views.bookCover);
    $.__views.detailView = Ti.UI.createView({
        width: "70%",
        height: "100%",
        left: "20%",
        layout: "vertical",
        backgroundColor: "transparent",
        id: "detailView"
    });
    $.__views.row.add($.__views.detailView);
    $.__views.storyAudioTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            id: "storyAudioTitle"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioTitle);
    $.__views.storyAudioAuthor = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 12,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 24,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyAudioAuthor"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioAuthor);
    $.__views.storyAudioType = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 12,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 24,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyAudioType"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioType);
    $.__views.buttonView = Ti.UI.createView({
        width: "15%",
        height: "100%",
        right: 0,
        backgroundColor: "transparent",
        id: "buttonView"
    });
    $.__views.row.add($.__views.buttonView);
    $.__views.downloadButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "Download",
            width: "100%",
            height: 25,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 10
            },
            color: "#000",
            top: 10
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "Download",
            width: "100%",
            height: 50,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 18
            },
            color: "#000",
            top: 10
        });
        _.extend(o, {
            id: "downloadButton"
        });
        return o;
    }());
    $.__views.buttonView.add($.__views.downloadButton);
    eventClickBtn ? $.__views.downloadButton.addEventListener("click", eventClickBtn) : __defers["$.__views.downloadButton!click!eventClickBtn"] = true;
    $.__views.playButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "Nghe",
            width: "100%",
            height: 25,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn-playAudio.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 10
            },
            color: "#000",
            bottom: 10
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "Nghe",
            width: "100%",
            height: 50,
            backgroundColor: "transparent",
            backgroundImage: "/common/btn-playAudio.png",
            backgroundSelectedImage: "/common/btn-pressed.png",
            font: {
                fontWeight: "bold",
                fontSize: 18
            },
            color: "#000",
            bottom: 10
        });
        _.extend(o, {
            id: "playButton"
        });
        return o;
    }());
    $.__views.buttonView.add($.__views.playButton);
    eventPlay ? $.__views.playButton.addEventListener("click", eventPlay) : __defers["$.__views.playButton!click!eventPlay"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var downloadBtn = $.downloadButton;
    $.playButton;
    $.row.dataId = args.data._id;
    $.row.dataFileName = args.data.fileName;
    $.row.dataLink = args.data.link;
    $.storyAudioTitle.text = args.data.title;
    $.storyAudioAuthor.text = "Tác giả: " + args.data.author;
    $.bookCover.image = args.data.cover && null != args.data.cover ? args.data.cover : Alloy.Globals.SERVER + "/images/audioDefaultCover.jpg";
    Alloy.Globals.isDownloadingAudio && Alloy.Globals.downloadingAudioName == args.data.fileName ? setButtonLayout("cancel") : Alloy.Globals.checkAudioExist(args.data.fileName) ? setButtonLayout("remove") : setButtonLayout("download");
    Ti.App.addEventListener("audioDownloaded", function(e) {
        if (e.fileName == args.data.fileName) {
            log(e);
            setButtonLayout("remove");
        }
    });
    __defers["$.__views.downloadButton!click!eventClickBtn"] && $.__views.downloadButton.addEventListener("click", eventClickBtn);
    __defers["$.__views.playButton!click!eventPlay"] && $.__views.playButton.addEventListener("click", eventPlay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;