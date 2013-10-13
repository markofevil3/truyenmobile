function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "aboutUs";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.aboutUsWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "aboutUsWindow",
        title: "Giới Thiệu"
    });
    $.__views.aboutUsWindow && $.addTopLevelView($.__views.aboutUsWindow);
    $.__views.wrapperView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "wrapperView"
    });
    $.__views.aboutUsWindow.add($.__views.wrapperView);
    $.__views.appNameLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            top: "10%",
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
                fontSize: 38,
                fontWeight: "bold",
                fontFamily: "Chalkboard SE"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            top: "10%",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            id: "appNameLabel",
            text: "Full Truyện"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.appNameLabel);
    $.__views.versionLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 15,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 28,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
        });
        _.extend(o, {
            id: "versionLabel"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.versionLabel);
    $.__views.emailLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 17,
                fontStyle: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#008AE6",
            shadowColor: "blue",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 32,
                fontStyle: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#008AE6",
            shadowColor: "blue",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            id: "emailLabel",
            text: "Support: fulltruyen@gmail.com"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.emailLabel);
    $.__views.websiteLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 17,
                fontStyle: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#008AE6",
            shadowColor: "blue",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 32,
                fontStyle: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#008AE6",
            shadowColor: "blue",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            id: "websiteLabel",
            text: "Website: fulltruyen.com"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.websiteLabel);
    $.__views.tips = Ti.UI.createView({
        width: "100%",
        backgroundColor: "transparent",
        layout: "vertical",
        top: 20,
        id: "tips"
    });
    $.__views.wrapperView.add($.__views.tips);
    $.__views.__alloyId0 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 13,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 22,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {
            text: "- Chapter màu xanh là chapter đã đọc gần nhất.",
            id: "__alloyId0"
        });
        return o;
    }());
    $.__views.tips.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 13,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 22,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {
            text: "- Thêm truyện vào mục Favorite để biết chapter đang đọc và nhận thông báo khi có chapter mới.",
            id: "__alloyId1"
        });
        return o;
    }());
    $.__views.tips.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 13,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 22,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {
            text: "- Để xoá truyện trong mục Favorite, bạn có thể vuốt tay sang phải hoặc trái tại vị trí truyện.",
            id: "__alloyId2"
        });
        return o;
    }());
    $.__views.tips.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 13,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 22,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color: "#000"
        });
        _.extend(o, {
            text: "- Nếu phát hiện truyện hoặc chapter bị lỗi,thiếu, bạn có thể report trong mục Yêu Cầu Truyện.",
            id: "__alloyId3"
        });
        return o;
    }());
    $.__views.tips.add($.__views.__alloyId3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        $.versionLabel.text = "Version " + Titanium.App.version;
        $.aboutUsWindow.leftNavButton = Alloy.Globals.backButton($.aboutUsWindow);
        Alloy.Globals.CURRENT_TAB.open($.aboutUsWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;