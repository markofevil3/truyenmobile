function Controller() {
    function selectItem(item, type) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            0 == type ? Alloy.Globals.getAjax("/manga", {
                id: item.dataId,
                userId: Alloy.Globals.facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response);
                Alloy.Globals.track("Favorite", "Open Manga", json.data.title);
                var mangaController = Alloy.createController("manga", json);
                setTimeout(function() {
                    Alloy.Globals.closeLoading(args.window);
                    mangaController.openMainWindow();
                }, 300);
            }) : Alloy.Globals.getAjax("/getStory", {
                id: item.dataId,
                userId: Alloy.Globals.facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response);
                var storyController = Alloy.createController("story", json);
                setTimeout(function() {
                    Alloy.Globals.closeLoading(args.window);
                    storyController.openMainWindow();
                }, 300);
            });
        });
    }
    function getTypeText(type) {
        switch (type) {
          case 0:
            return "Truyện Tranh";

          case 1:
            return "Truyện Chữ";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "favoriteRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 100,
            backgroundColor: "transparent",
            backgroundImage: "/common/dark-background.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 200,
            backgroundColor: "transparent",
            backgroundImage: "/common/dark-background.png"
        });
        _.extend(o, {
            id: "row"
        });
        return o;
    }());
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.bookCoverView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: "19%",
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
        width: "75%",
        height: "100%",
        left: "24%",
        layout: "vertical",
        id: "detailView"
    });
    $.__views.row.add($.__views.detailView);
    $.__views.bookTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 17,
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
                fontSize: 34,
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
            id: "bookTitle"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.bookTitle);
    $.__views.newestChapter = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 16,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 30,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "newestChapter"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.newestChapter);
    $.__views.bookType = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 14,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 28,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "bookType"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.bookType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args.data._id;
    $.row.dataType = args.data.bookType;
    $.bookCover.image = null != args.data.cover ? args.data.cover : 0 == args.data.bookType ? Alloy.Globals.SERVER + "/images/mangaDefaultCover.jpg" : Alloy.Globals.SERVER + "/images/storyDefaultCover.jpg";
    $.bookTitle.text = args.data.title;
    var readingString = "";
    var readingChapter = Alloy.Globals.readingChapters[args.data._id];
    null != readingChapter && void 0 != readingChapter && (readingString = " - Reading: " + readingChapter);
    $.newestChapter.text = "Newest: " + Alloy.Globals.getNewestChapter(args.data.chapters) + readingString;
    $.bookType.text = "Thể loại: " + getTypeText(args.data.bookType);
    selectItem($.row, args.data.bookType);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;