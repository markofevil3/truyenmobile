function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            Alloy.Globals.getAjax("/mangaReading", {
                id: item.mangaId,
                chapter: item.chapterId
            }, function(response) {
                var json = JSON.parse(response);
                json.data.next = json.nextPrevChapters.next;
                json.data.prev = json.nextPrevChapters.prev;
                json.data.mangaId = item.mangaId;
                var mangaReadingController = Alloy.createController("mangaReading", json.data);
                Alloy.Globals.closeLoading(args.window);
                mangaReadingController.openMainWindow();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 40,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 80,
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
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontWeight: "bold",
                fontSize: 17,
                fontFamily: "Chalkboard SE"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontWeight: "bold",
                fontSize: 34,
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
    row.chapterId = args.data._id;
    row.mangaId = args.data.mangaId;
    row.next = args.data.next;
    row.prev = args.data.prev;
    $.chapterTitle.text = "Chapter " + args.data.chapter;
    selectItem(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;