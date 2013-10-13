function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            Alloy.Globals.getAjax("/getStoryContent", {
                id: item.dataId,
                type: item.dataType,
                chapter: item.dataChapterId
            }, function(response) {
                var json = JSON.parse(response);
                json.data.storyId = item.dataId;
                var storyReadingController = Alloy.createController("storyReading", json.data);
                setTimeout(function() {
                    Alloy.Globals.closeLoading(args.window);
                    storyReadingController.openMainWindow();
                }, 300);
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 60,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 120,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {
            id: "row"
        });
        return o;
    }());
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.chapterTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            left: 17,
            height: "auto",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            },
            font: {
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            height: "auto",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            left: 34,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            },
            font: {
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {
            id: "chapterTitle"
        });
        return o;
    }());
    $.__views.row.add($.__views.chapterTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var row = $.row;
    row.dataId = args.data.storyId;
    row.dataType = 1;
    row.dataChapterId = args.data._id;
    var readingChapter = Alloy.Globals.readingChapters[args.data.storyId];
    null != readingChapter && void 0 != readingChapter && readingChapter.toString() == args.data._id.toString() && ($.chapterTitle.color = "green");
    $.chapterTitle.text = args.data.title;
    selectItem(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;