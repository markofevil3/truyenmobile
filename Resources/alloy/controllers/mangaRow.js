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
                Alloy.Globals.track("Manga", "Reading", item.mangaId);
                var mangaReadingController = Alloy.createController("mangaReading", json.data);
                Alloy.Globals.closeLoading(args.window);
                Alloy.Globals.readChapter++;
                mangaReadingController.openMainWindow();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mangaRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.chapterTitle = Ti.UI.createLabel({
        id: "chapterTitle"
    });
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