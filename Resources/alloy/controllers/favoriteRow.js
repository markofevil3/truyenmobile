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
                Alloy.Globals.closeLoading(args.window);
                mangaController.openMainWindow();
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
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
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
    $.__views.bookTitle = Ti.UI.createLabel({
        id: "bookTitle"
    });
    $.__views.detailView.add($.__views.bookTitle);
    $.__views.newestChapter = Ti.UI.createLabel({
        id: "newestChapter"
    });
    $.__views.detailView.add($.__views.newestChapter);
    $.__views.bookType = Ti.UI.createLabel({
        id: "bookType"
    });
    $.__views.detailView.add($.__views.bookType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args.data._id;
    $.row.dataType = args.data.bookType;
    $.bookCover.image = args.data.cover;
    $.bookTitle.text = args.data.title;
    $.newestChapter.text = "Newest: " + args.data.chapters[args.data.chapters.length - 1].chapter;
    $.bookType.text = "Thể loại: " + getTypeText(args.data.bookType);
    $.bookCoverView.backgroundImage = 0 == args.data.bookType ? "/common/book5.png" : "/common/book5.png";
    selectItem($.row, args.data.bookType);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;