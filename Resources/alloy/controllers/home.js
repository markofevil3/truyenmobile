function Controller() {
    function selectMenu(e) {
        if ("funnyList" == e.rowData.dataName) alert("Coming Soon!"); else {
            var selectedMenuController = Alloy.createController(e.rowData.dataName);
            selectedMenuController.openMainWindow();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.homeWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "homeWindow",
        title: "Home"
    });
    $.__views.advertise = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 50,
            backgroundColor: "#fff",
            selectedBackgroundColor: "transparent",
            name: "Advertise"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 66,
            backgroundColor: "#fff",
            selectedBackgroundColor: "transparent",
            name: "Advertise"
        });
        _.extend(o, {
            id: "advertise"
        });
        return o;
    }());
    var __alloyId0 = [];
    __alloyId0.push($.__views.advertise);
    $.__views.MangaList = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 120,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 240,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {
            id: "MangaList",
            dataName: "mangaList"
        });
        return o;
    }());
    __alloyId0.push($.__views.MangaList);
    selectMenu ? $.__views.MangaList.addEventListener("click", selectMenu) : __defers["$.__views.MangaList!click!selectMenu"] = true;
    $.__views.__alloyId1 = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundImage: "/common/bookShelf.png",
        id: "__alloyId1"
    });
    $.__views.MangaList.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {
            text: "Manga",
            id: "__alloyId2"
        });
        return o;
    }());
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 181,
            height: 55
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 362,
            height: 110
        });
        _.extend(o, {
            image: "/common/bg_blue.png",
            id: "__alloyId3"
        });
        return o;
    }());
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.StoryList = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 120,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 240,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {
            id: "StoryList",
            dataName: "storyList"
        });
        return o;
    }());
    __alloyId0.push($.__views.StoryList);
    selectMenu ? $.__views.StoryList.addEventListener("click", selectMenu) : __defers["$.__views.StoryList!click!selectMenu"] = true;
    $.__views.__alloyId4 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {
            text: "Truyen Chu",
            id: "__alloyId4"
        });
        return o;
    }());
    $.__views.StoryList.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 181,
            height: 55
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 362,
            height: 110
        });
        _.extend(o, {
            image: "/common/bg_pink.png",
            id: "__alloyId5"
        });
        return o;
    }());
    $.__views.StoryList.add($.__views.__alloyId5);
    $.__views.FunnyList = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            height: 120,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 240,
            backgroundColor: "transparent",
            backgroundImage: "/common/bookshelfBackground.png"
        });
        _.extend(o, {
            id: "FunnyList",
            dataName: "funnyList"
        });
        return o;
    }());
    __alloyId0.push($.__views.FunnyList);
    selectMenu ? $.__views.FunnyList.addEventListener("click", selectMenu) : __defers["$.__views.FunnyList!click!selectMenu"] = true;
    $.__views.__alloyId6 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2
        });
        _.extend(o, {
            text: "Truyen Cuoi",
            id: "__alloyId6"
        });
        return o;
    }());
    $.__views.FunnyList.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 181,
            height: 55
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 362,
            height: 110
        });
        _.extend(o, {
            image: "/common/bg_green.png",
            id: "__alloyId7"
        });
        return o;
    }());
    $.__views.FunnyList.add($.__views.__alloyId7);
    $.__views.homeTableView = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId0,
        id: "homeTableView"
    });
    $.__views.homeWindow.add($.__views.homeTableView);
    $.__views.homeTab = Ti.UI.createTab({
        window: $.__views.homeWindow,
        id: "homeTab",
        icon: "/common/home.png"
    });
    $.__views.homeTab && $.addTopLevelView($.__views.homeTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
        $.advertise.add(advImage);
    });
    $.homeTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = $.homeTab;
    });
    log(Titanium.Filesystem.getTempDirectory());
    __defers["$.__views.MangaList!click!selectMenu"] && $.__views.MangaList.addEventListener("click", selectMenu);
    __defers["$.__views.StoryList!click!selectMenu"] && $.__views.StoryList.addEventListener("click", selectMenu);
    __defers["$.__views.FunnyList!click!selectMenu"] && $.__views.FunnyList.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;