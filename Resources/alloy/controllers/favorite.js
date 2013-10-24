function Controller() {
    function setRowData(data, type) {
        var dataSet = [];
        for (var i = 0; data.length > i; i++) {
            data[i].bookType = type;
            var row = Alloy.createController("favoriteRow", {
                data: data[i],
                window: $.favoriteWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function deleteFavorite(itemId) {
        Alloy.Globals.getAjax("/removeFavorite", {
            userId: Alloy.Globals.facebook.getUid(),
            itemId: itemId
        }, function(response) {
            log(response);
        });
    }
    function getFavorites() {
        Alloy.Globals.getAjax("/getFavorites", {
            userId: Alloy.Globals.facebook.getUid()
        }, function(response) {
            var jsonData = JSON.parse(response);
            Alloy.Globals.setAdmobPublisher(jsonData.advPublisher, jsonData.admobPublisher);
            var adview = $.advView;
            for (var d in adview.children) adview.remove(adview.children[d]);
            Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
                $.advView.add(advImage);
                $.advView.height = Alloy.Globals.getAdvHeight();
            });
            listFavorites = jsonData.data;
            if (false == listFavorites) return;
            mangaRows = setRowData(listFavorites["manga"], 0);
            storyRows = setRowData(listFavorites["story"], 1);
            tableView.data = mangaRows.concat(storyRows);
            "iPhone OS" == Alloy.Globals.getOSType() && $.filterTabbar.addEventListener("click", function(e) {
                switch (e.index) {
                  case 0:
                    var mangaRows = setRowData(listFavorites["manga"], 0);
                    var storyRows = setRowData(listFavorites["story"], 1);
                    tableView.data = mangaRows.concat(storyRows);
                    break;

                  case 1:
                    tableView.data = setRowData(listFavorites["manga"], 0);
                    break;

                  case 2:
                    tableView.data = setRowData(listFavorites["story"], 1);
                }
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "favorite";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.favoriteWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "favoriteWindow",
        title: "Favorites"
    });
    $.__views.wrapper = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.favoriteWindow.add($.__views.wrapper);
    $.__views.filterTabbar = Ti.UI.iOS.createTabbedBar({
        labels: [ "Tất Cả", "Truyện Tranh", "Truyện Chữ" ],
        index: 0,
        color: "#fff",
        top: 0,
        id: "filterTabbar"
    });
    $.__views.wrapper.add($.__views.filterTabbar);
    $.__views.advView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 50,
            top: 15
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 90,
            top: 15
        });
        _.extend(o, {
            id: "advView"
        });
        return o;
    }());
    $.__views.wrapper.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        editable: true,
        allowsSelectionDuringEditing: true,
        backgroundColor: "transparent",
        backgroundRepeat: true,
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "bookShellTable"
    });
    $.__views.wrapper.add($.__views.bookShellTable);
    $.__views.favoriteTab = Ti.UI.createTab({
        window: $.__views.favoriteWindow,
        id: "favoriteTab",
        icon: "/common/favorite.png"
    });
    $.__views.favoriteTab && $.addTopLevelView($.__views.favoriteTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var listFavorites;
    var mangaRows;
    var storyRows;
    var tableView = $.bookShellTable;
    if ("iPhone OS" == Alloy.Globals.getOSType()) if (parseFloat(Ti.Platform.version) >= 7) $.filterTabbar.tintColor = "#CCCCCC"; else {
        $.filterTabbar.backgroundColor = "#c69656";
        $.filterTabbar.style = Titanium.UI.iPhone.SystemButtonStyle.BAR;
    }
    tableView.addEventListener("delete", function(e) {
        deleteFavorite(e.rowData.dataId);
        void 0 != Ti.Network.remoteDeviceUUID ? Alloy.Globals.unsubscribePush(e.rowData.dataId) : Alloy.Globals.loginUser(Alloy.Globals.FB_USERNAME, function() {
            Alloy.Globals.unsubscribePush(e.rowData.dataId);
        });
    });
    $.favoriteTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = $.favoriteTab;
        0 == Alloy.Globals.facebook.loggedIn ? Alloy.Globals.facebookLogin(function() {
            getFavorites();
        }) : getFavorites();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;