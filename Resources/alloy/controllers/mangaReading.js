function Controller() {
    function checkEndChapter(e) {
        pageCount.text = e.currentPage + 1 + "/" + listImages.length;
        e.currentPage + 1 == listImages.length && showFuncBar();
    }
    function SetChangeChapterButtons(next, prev) {
        if (null != next) {
            $.nextButton.visible = true;
            $.nextButton.chapterId = next;
        }
        if (null != prev) {
            $.prevButton.visible = true;
            $.prevButton.chapterId = prev;
        }
    }
    function changeChapter(e) {
        Alloy.Globals.getAjax("/mangaReading", {
            id: args.mangaId,
            chapter: e.source.chapterId
        }, function(response) {
            var json = JSON.parse(response);
            json.data.next = json.nextPrevChapters.next;
            json.data.prev = json.nextPrevChapters.prev;
            json.data.mangaId = args.mangaId;
            closeWindowNoAnimation();
            var mangaReadingController = Alloy.createController("mangaReading", json.data);
            mangaReadingController.openMainWindow();
        });
    }
    function hideFuncBar() {
        $.funcBar.hide();
        $.funcBar.opacity = 0;
    }
    function showFuncBar() {
        if ($.funcBar.visible) $.funcBar.animate({
            opacity: 0,
            duration: 500
        }, function() {
            $.funcBar.hide();
        }); else {
            $.funcBar.show();
            $.funcBar.animate({
                opacity: 1,
                duration: 500
            }, function() {});
        }
    }
    function closeWindowNoAnimation() {
        $.mangaReadingWindow.close();
    }
    function closeWindow() {
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(0);
        $.mangaReadingWindow.close({
            transform: smallDown,
            duration: 300
        });
    }
    function addImageView() {
        for (var i = 0; listImages.length > i; i++) {
            var image = Ti.UI.createImageView({
                width: "100%",
                height: "auto"
            });
            Alloy.Globals.loadImage(image, "http://truyentranhtuan.com" + listImages[i], args.mangaId + args.chapter + i + "");
            var scrollView = Ti.UI.createScrollView({
                contentWidth: "100%",
                contentHeight: "100%",
                backgroundColor: "#000",
                showVerticalScrollIndicator: true,
                showHorizontalScrollIndicator: true,
                height: "100%",
                width: "100%",
                index: i,
                maxZoomScale: 3,
                minZoomScale: 1
            });
            scrollView.add(image);
            images.push(scrollView);
        }
    }
    function changePage() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mangaReading";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mangaReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "mangaReadingWindow"
    });
    $.__views.mangaReadingWindow && $.addTopLevelView($.__views.mangaReadingWindow);
    $.__views.funcBar = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 9999,
        id: "funcBar"
    });
    $.__views.mangaReadingWindow.add($.__views.funcBar);
    $.__views.topBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#000",
            height: 40,
            top: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#000",
            height: 70,
            top: 0
        });
        _.extend(o, {
            id: "topBar"
        });
        return o;
    }());
    $.__views.funcBar.add($.__views.topBar);
    $.__views.closeButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "close",
            width: 60,
            height: 25,
            right: 10,
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#fff",
            color: "#c80500"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "close",
            width: 100,
            height: 40,
            right: 10,
            font: {
                fontWeight: "bold",
                fontSize: 24
            },
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#fff",
            color: "#c80500"
        });
        _.extend(o, {
            id: "closeButton"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    $.__views.chapterTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#CCCCCC",
            font: {
                fontWeight: "bold",
                fontSize: 17
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#CCCCCC",
            font: {
                fontWeight: "bold",
                fontSize: 34
            }
        });
        _.extend(o, {
            id: "chapterTitle"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.chapterTitle);
    $.__views.pageCount = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#CCCCCC",
            left: 10,
            font: {
                fontSize: 17
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#CCCCCC",
            left: 10,
            font: {
                fontSize: 34
            }
        });
        _.extend(o, {
            id: "pageCount"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.pageCount);
    $.__views.buttonBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 50,
            height: Titanium.UI.SIZE
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 80,
            height: Titanium.UI.SIZE
        });
        _.extend(o, {
            id: "buttonBar"
        });
        return o;
    }());
    $.__views.funcBar.add($.__views.buttonBar);
    $.__views.prevButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 120,
            height: 30,
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#0e2774",
            backgroundColor: "#4f76ff",
            backgroundImage: "NONE",
            selectedColor: "#333",
            selectedBackgroundColor: "#83b7ff",
            color: "#CCCCCC"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 220,
            height: 50,
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#0e2774",
            backgroundColor: "#4f76ff",
            backgroundImage: "NONE",
            selectedColor: "#333",
            selectedBackgroundColor: "#83b7ff",
            color: "#CCCCCC"
        });
        _.extend(o, {
            left: 10,
            visible: false,
            backgroundColor: "#05803d",
            borderColor: "#04622f",
            id: "prevButton",
            title: "Chapter Trước"
        });
        return o;
    }());
    $.__views.buttonBar.add($.__views.prevButton);
    changeChapter ? $.__views.prevButton.addEventListener("click", changeChapter) : __defers["$.__views.prevButton!click!changeChapter"] = true;
    $.__views.nextButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 120,
            height: 30,
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#0e2774",
            backgroundColor: "#4f76ff",
            backgroundImage: "NONE",
            selectedColor: "#333",
            selectedBackgroundColor: "#83b7ff",
            color: "#CCCCCC"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 220,
            height: 50,
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#0e2774",
            backgroundColor: "#4f76ff",
            backgroundImage: "NONE",
            selectedColor: "#333",
            selectedBackgroundColor: "#83b7ff",
            color: "#CCCCCC"
        });
        _.extend(o, {
            right: 10,
            visible: false,
            id: "nextButton",
            title: "Chapter Sau"
        });
        return o;
    }());
    $.__views.buttonBar.add($.__views.nextButton);
    changeChapter ? $.__views.nextButton.addEventListener("click", changeChapter) : __defers["$.__views.nextButton!click!changeChapter"] = true;
    $.__views.advView2 = Ti.UI.createView(function() {
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
            height: 66,
            bottom: 0
        });
        _.extend(o, {
            id: "advView2"
        });
        return o;
    }());
    $.__views.funcBar.add($.__views.advView2);
    var __alloyId13 = [];
    $.__views.imageHolderView = Ti.UI.createScrollableView({
        width: "100%",
        height: "100%",
        views: __alloyId13,
        id: "imageHolderView"
    });
    $.__views.mangaReadingWindow.add($.__views.imageHolderView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var images = [];
    var listImages;
    var pageCount = $.pageCount;
    exports.openMainWindow = function() {
        listImages = args.pages;
        $.mangaReadingWindow.title = "Chapter " + args.chapter;
        $.chapterTitle.text = "Chapter " + args.chapter;
        pageCount.text = "1/" + listImages.length;
        Alloy.Globals.adv(3, function(advImage) {
            $.advView2.add(advImage);
        });
        SetChangeChapterButtons(args.next, args.prev);
        hideFuncBar();
        $.imageHolderView.showPagingControl = false;
        $.imageHolderView.currentPage = 0;
        addImageView();
        $.imageHolderView.views = images;
        changePage();
        $.mangaReadingWindow.addEventListener("singletap", showFuncBar);
        $.mangaReadingWindow.addEventListener("scrollend", checkEndChapter);
        $.mangaReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    __defers["$.__views.prevButton!click!changeChapter"] && $.__views.prevButton.addEventListener("click", changeChapter);
    __defers["$.__views.nextButton!click!changeChapter"] && $.__views.nextButton.addEventListener("click", changeChapter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;