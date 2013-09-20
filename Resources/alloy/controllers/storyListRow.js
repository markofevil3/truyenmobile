function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            0 == item.dataType ? Alloy.Globals.getAjax("/getStoryContent", {
                id: item.dataId,
                type: item.dataType,
                chapter: item.dataChapterId
            }, function(response) {
                var json = JSON.parse(response);
                var storyReadingController = Alloy.createController("storyReading", json.data);
                Alloy.Globals.closeLoading(args.window);
                storyReadingController.openMainWindow();
            }) : Alloy.Globals.getAjax("/getStory", {
                id: item.dataId,
                userId: Alloy.Globals.facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response);
                var storyController = Alloy.createController("story", json);
                Alloy.Globals.closeLoading(args.window);
                storyController.openMainWindow();
            });
        });
    }
    function getTypeText(type) {
        return 0 == type ? "Truyện ngắn" : "Truyện dài";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyListRow";
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
    $.__views.storyTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 19,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 38,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyTitle"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyTitle);
    $.__views.storyAuthor = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 17,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 34,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyAuthor"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAuthor);
    $.__views.storyType = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 15,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontStyle: "italic",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyType"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args.data._id;
    $.row.dataType = args.data.type;
    $.bookCover.image = Alloy.Globals.SERVER + "/images/story/sample/cover.jpg";
    $.storyTitle.text = args.data.title;
    $.storyAuthor.text = "Tác giả: " + args.data.author;
    $.storyType.text = "Thể loại: " + getTypeText(args.data.type);
    $.bookCoverView.backgroundImage = 0 == args.data.type ? "/common/book5.png" : "/common/book5.png";
    selectItem($.row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;