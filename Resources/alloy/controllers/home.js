function Controller() {
    function selectMenu(e) {
        if ("funnyList" == e.rowData.dataName) alert("Coming Soon!"); else {
            var selectedMenuController = Alloy.createController(e.rowData.dataName);
            selectedMenuController.openMainWindow();
        }
    }
    function appStart() {
        Alloy.Globals.getAjax("/appVersion", {
            "null": null
        }, function(response) {
            if (void 0 == response) {
                alert("Không có kết nối Internet!");
                return;
            }
            var data = JSON.parse(response);
            Alloy.Globals.setAdmobPublisher(data.advPublisher, data.admobPublisher);
            Alloy.Globals.FBPOST_LINK = data.facebookPostLink;
            if (data.error || data.version == Titanium.App.version.toString()) {
                "iPhone OS" == Alloy.Globals.getOSType() ? void 0 != data.iosLink && (Alloy.Globals.FBPOST_LINK = data.iosLink) : void 0 != data.androidLink && (Alloy.Globals.FBPOST_LINK = data.androidLink);
                startHome();
            } else {
                var dialog;
                if (data.force) {
                    dialog = Ti.UI.createAlertDialog({
                        message: "Có phiên bản mới!!!",
                        buttonNames: [ "Nâng Cấp" ],
                        title: "Nâng Cấp"
                    });
                    dialog.show();
                    dialog.addEventListener("click", function() {
                        openStoreLink(data);
                    });
                } else {
                    dialog = Ti.UI.createAlertDialog({
                        cancel: 0,
                        buttonNames: [ "Bỏ Qua", "Nâng Cấp" ],
                        message: "Có phiên bản mới!!!",
                        title: "Nâng Cấp"
                    });
                    dialog.show();
                }
                dialog.addEventListener("click", function(e) {
                    1 == e.index ? openStoreLink(data) : startHome();
                });
            }
        });
    }
    function openStoreLink(data) {
        "iPhone OS" == Alloy.Globals.getOSType() ? Ti.Platform.openURL(data.iosLink) : Ti.Platform.openURL(data.androidLink);
    }
    function startHome() {
        var adview = $.advertise;
        for (var d in adview.children) adview.remove(adview.children[d]);
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advertise.add(advImage);
            $.advertise.height = Alloy.Globals.getAdvHeight();
        });
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
    var __alloyId4 = [];
    __alloyId4.push($.__views.advertise);
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
    __alloyId4.push($.__views.MangaList);
    selectMenu ? $.__views.MangaList.addEventListener("click", selectMenu) : __defers["$.__views.MangaList!click!selectMenu"] = true;
    $.__views.__alloyId5 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            text: "Truyện Tranh",
            id: "__alloyId5"
        });
        return o;
    }());
    $.__views.MangaList.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createImageView(function() {
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
            id: "__alloyId6"
        });
        return o;
    }());
    $.__views.MangaList.add($.__views.__alloyId6);
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
    __alloyId4.push($.__views.StoryList);
    selectMenu ? $.__views.StoryList.addEventListener("click", selectMenu) : __defers["$.__views.StoryList!click!selectMenu"] = true;
    $.__views.__alloyId7 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            text: "Truyện Chữ",
            id: "__alloyId7"
        });
        return o;
    }());
    $.__views.StoryList.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createImageView(function() {
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
            id: "__alloyId8"
        });
        return o;
    }());
    $.__views.StoryList.add($.__views.__alloyId8);
    $.__views.StoryAudioList = Ti.UI.createTableViewRow(function() {
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
            id: "StoryAudioList",
            dataName: "storyAudioList"
        });
        return o;
    }());
    __alloyId4.push($.__views.StoryAudioList);
    selectMenu ? $.__views.StoryAudioList.addEventListener("click", selectMenu) : __defers["$.__views.StoryAudioList!click!selectMenu"] = true;
    $.__views.__alloyId9 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            text: "Truyện Audio",
            id: "__alloyId9"
        });
        return o;
    }());
    $.__views.StoryAudioList.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createImageView(function() {
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
            id: "__alloyId10"
        });
        return o;
    }());
    $.__views.StoryAudioList.add($.__views.__alloyId10);
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
    __alloyId4.push($.__views.FunnyList);
    selectMenu ? $.__views.FunnyList.addEventListener("click", selectMenu) : __defers["$.__views.FunnyList!click!selectMenu"] = true;
    $.__views.__alloyId11 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            text: "Truyện Cười",
            id: "__alloyId11"
        });
        return o;
    }());
    $.__views.FunnyList.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createImageView(function() {
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
            id: "__alloyId12"
        });
        return o;
    }());
    $.__views.FunnyList.add($.__views.__alloyId12);
    $.__views.homeTableView = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId4,
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
    var homeTab = $.homeTab;
    appStart();
    homeTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = homeTab;
    });
    Ti.App.addEventListener("app:reload", function() {
        Alloy.Globals.CURRENT_TAB = homeTab;
        appStart();
    });
    __defers["$.__views.MangaList!click!selectMenu"] && $.__views.MangaList.addEventListener("click", selectMenu);
    __defers["$.__views.StoryList!click!selectMenu"] && $.__views.StoryList.addEventListener("click", selectMenu);
    __defers["$.__views.StoryAudioList!click!selectMenu"] && $.__views.StoryAudioList.addEventListener("click", selectMenu);
    __defers["$.__views.FunnyList!click!selectMenu"] && $.__views.FunnyList.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;