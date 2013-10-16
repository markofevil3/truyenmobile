function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            setTimeout(function() {
                var audioPlayerController = Alloy.createController("audioPlayer", {
                    data: null
                });
                audioPlayerController.openMainWindow();
                Alloy.Globals.closeLoading(args.window);
            }, 300);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyAudioListRow";
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
    $.__views.detailView = Ti.UI.createView({
        width: "75%",
        height: "100%",
        left: "24%",
        layout: "vertical",
        id: "detailView"
    });
    $.__views.row.add($.__views.detailView);
    $.__views.storyAudioTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 17,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: 35,
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        _.extend(o, {
            id: "storyAudioTitle"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioTitle);
    $.__views.storyAudioAuthor = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 16,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 32,
                fontStyle: "italic",
                fontFamily: "Chalkboard SE"
            },
            left: 0,
            color: "#fff"
        });
        _.extend(o, {
            id: "storyAudioAuthor"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioAuthor);
    $.__views.storyAudioType = Ti.UI.createLabel(function() {
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
            id: "storyAudioType"
        });
        return o;
    }());
    $.__views.detailView.add($.__views.storyAudioType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args.data._id;
    $.row.dataType = args.data.type;
    $.storyAudioTitle.text = args.data.title;
    $.storyAudioAuthor.text = "Tác giả: " + args.data.author;
    selectItem($.row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;