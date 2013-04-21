function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            Alloy.Globals.getAjax("/manga", {
                id: item.dataId,
                userId: Alloy.Globals.facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response);
                var mangaController = Alloy.createController("manga", json);
                Alloy.Globals.closeLoading(args.window);
                mangaController.openMainWindow();
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
    $.__views.bookInfoView1 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 90,
            left: 12.5,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 220,
            left: 25,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {
            id: "bookInfoView1"
        });
        return o;
    }());
    $.__views.row.add($.__views.bookInfoView1);
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId11"
    });
    $.__views.bookInfoView1.add($.__views.__alloyId11);
    $.__views.bookName1 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {
            id: "bookName1"
        });
        return o;
    }());
    $.__views.__alloyId11.add($.__views.bookName1);
    $.__views.__alloyId12 = Ti.UI.createView({
        width: "65%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId12"
    });
    $.__views.bookInfoView1.add($.__views.__alloyId12);
    $.__views.coverLink1 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "80%",
            height: 77,
            top: 0,
            left: 9,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "80%",
            height: 154,
            top: 0,
            left: 18,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {
            id: "coverLink1"
        });
        return o;
    }());
    $.__views.__alloyId12.add($.__views.coverLink1);
    $.__views.bookInfoView2 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 90,
            left: 12.5,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 220,
            left: 25,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {
            id: "bookInfoView2"
        });
        return o;
    }());
    $.__views.row.add($.__views.bookInfoView2);
    $.__views.__alloyId13 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId13"
    });
    $.__views.bookInfoView2.add($.__views.__alloyId13);
    $.__views.bookName2 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {
            id: "bookName2"
        });
        return o;
    }());
    $.__views.__alloyId13.add($.__views.bookName2);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: "65%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId14"
    });
    $.__views.bookInfoView2.add($.__views.__alloyId14);
    $.__views.coverLink2 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "80%",
            height: 77,
            top: 0,
            left: 9,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "80%",
            height: 154,
            top: 0,
            left: 18,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {
            id: "coverLink2"
        });
        return o;
    }());
    $.__views.__alloyId14.add($.__views.coverLink2);
    $.__views.bookInfoView3 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 90,
            left: 12.5,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 220,
            left: 25,
            layout: "vertical",
            selectedBackgroundColor: "blue"
        });
        _.extend(o, {
            id: "bookInfoView3"
        });
        return o;
    }());
    $.__views.row.add($.__views.bookInfoView3);
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId15"
    });
    $.__views.bookInfoView3.add($.__views.__alloyId15);
    $.__views.bookName3 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 13,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: "center",
            horizontalWrap: true
        });
        _.extend(o, {
            id: "bookName3"
        });
        return o;
    }());
    $.__views.__alloyId15.add($.__views.bookName3);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "65%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId16"
    });
    $.__views.bookInfoView3.add($.__views.__alloyId16);
    $.__views.coverLink3 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "80%",
            height: 77,
            top: 0,
            left: 9,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "80%",
            height: 154,
            top: 0,
            left: 18,
            defaultImage: "/common/default_image.jpg"
        });
        _.extend(o, {
            id: "coverLink3"
        });
        return o;
    }());
    $.__views.__alloyId16.add($.__views.coverLink3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    for (var i = 0; 3 > i; i++) {
        var bookInfoView = $["bookInfoView" + (i + 1)];
        if (args.data[i]) {
            $["bookName" + (i + 1)].text = args.data[i].title;
            $["coverLink" + (i + 1)].image = Alloy.Globals.SERVER + args.data[i].folder + "/cover.jpg";
            bookInfoView.dataId = args.data[i]._id;
            selectItem(bookInfoView);
        } else bookInfoView.setVisible(false);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;