function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            Alloy.Globals.getAjax("/manga", {
                id: item.dataId,
                userId: Alloy.Globals.facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response);
                Alloy.Globals.track("Manga", "List Chapter", json.data.title);
                var mangaController = Alloy.createController("manga", json);
                setTimeout(function() {
                    Alloy.Globals.closeLoading(args.window);
                    mangaController.openMainWindow();
                }, 300);
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mangaListRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 120,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png",
            selectedBackgroundColor: "transparent",
            layout: "horizontal"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 240,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png",
            selectedBackgroundColor: "transparent",
            layout: "horizontal"
        });
        _.extend(o, {
            id: "row"
        });
        return o;
    }());
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.bookInfoView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        layout: "horizontal",
        selectedBackgroundColor: "blue",
        id: "bookInfoView"
    });
    $.__views.row.add($.__views.bookInfoView);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: "25%",
        height: "80%",
        left: "5%",
        top: "8%",
        id: "__alloyId14"
    });
    $.__views.bookInfoView.add($.__views.__alloyId14);
    $.__views.coverLink = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "82%",
            height: "94.5%",
            top: 0,
            left: 9,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "82%",
            height: "94.5%",
            top: 0,
            left: 18,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {
            id: "coverLink"
        });
        return o;
    }());
    $.__views.__alloyId14.add($.__views.coverLink);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId15"
    });
    $.__views.bookInfoView.add($.__views.__alloyId15);
    $.__views.bookName = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 18,
                fontFamily: "Chalkboard SE"
            },
            top: "5%",
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            },
            width: "90%"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 40,
                fontFamily: "Chalkboard SE"
            },
            left: 10,
            top: "5%",
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            },
            width: "90%"
        });
        _.extend(o, {
            id: "bookName"
        });
        return o;
    }());
    $.__views.__alloyId15.add($.__views.bookName);
    $.__views.icon = Ti.UI.createView({
        layout: "horizontal",
        width: "90%",
        top: 5,
        left: 10,
        id: "icon"
    });
    $.__views.__alloyId15.add($.__views.icon);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var bookInfoView = $.bookInfoView;
    $.bookName.text = args.data.title;
    "iPhone OS" == Alloy.Globals.getOSType() && ($.coverLink.image = args.data.cover);
    var newIconImage = Ti.UI.createImageView({
        height: 32,
        width: 32,
        image: "/common/new-tag.png"
    });
    var updateIconImage = Ti.UI.createImageView({
        height: 32,
        width: 32,
        image: "/common/new-tag.png"
    });
    var hotIconImage = Ti.UI.createImageView({
        height: 32,
        width: 32,
        image: "/common/hot_icon.png"
    });
    args.data.datePost && Alloy.Globals.isNew(new Date(args.data.datePost)) && $.icon.add(newIconImage);
    args.data.updatedAt && Alloy.Globals.isNew(new Date(args.data.updatedAt)) && $.icon.add(updateIconImage);
    args.data.top && args.data.top > 0 && $.icon.add(hotIconImage);
    bookInfoView.dataId = args.data._id;
    selectItem(bookInfoView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;