function Controller() {
    function setRowData(data) {
        var dataSet = [];
        var dataLength = Math.round(data.length / 3);
        0 == dataLength && (dataLength = 1);
        for (var i = 0; dataLength > i; i++) {
            var rowData = [];
            for (var j = 0; 3 > j; j++) {
                var index = 3 * i + j;
                data[index] && rowData.push(data[index]);
            }
            var row = Alloy.createController("mangaListRow", {
                data: rowData,
                window: $.mangaListWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function dynamicLoad(tableView, data) {
        function beginUpdate() {
            updating = true;
            tableView.appendRow(loadingRow);
            loadingIcon.show();
            setTimeout(endUpdate, 500);
        }
        function endUpdate() {
            updating = false;
            loadingIcon.hide();
            tableView.deleteRow(lastRowIndex - 1, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            var nextRowIndex = lastRowIndex - 1 + MAX_DISPLAY_ROW;
            nextRowIndex > Math.round(data.length / 3) && (nextRowIndex = Math.round(data.length / 3));
            var nextRowIndexs = data.slice(3 * (lastRowIndex - 1), 3 * nextRowIndex);
            var nextRows = setRowData(nextRowIndexs);
            for (var i = 0; nextRows.length > i; i++) tableView.appendRow(nextRows[i], {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            lastRowIndex += MAX_DISPLAY_ROW;
        }
        var loadingIcon = Titanium.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
        });
        var loadingView = Titanium.UI.createView({
            backgroundColor: "transparent",
            backgroundImage: "NONE"
        });
        loadingView.add(loadingIcon);
        var loadingRow = Ti.UI.createTableViewRow({
            height: 60,
            backgroundColor: "transparent",
            backgroundImage: "NONE"
        });
        loadingRow.add(loadingView);
        var lastRowIndex = tableView.data[0].rowCount;
        var updating = false;
        var lastDistance = 0;
        tableView.addEventListener("scroll", function(e) {
            lastRowIndex = tableView.data[0].rowCount;
            var offset = e.contentOffset.y;
            var height = e.size.height;
            var total = offset + height;
            var theEnd = e.contentSize.height;
            var distance = theEnd - total;
            if (lastDistance > distance) {
                var nearEnd = 1 * theEnd;
                !updating && total >= nearEnd && Math.round(data.length / 3) > lastRowIndex && lastRowIndex >= MAX_DISPLAY_ROW && (null == search.value || "" == search.value) && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.mangaListWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "mangaListWindow",
        title: "Manga"
    });
    $.__views.mangaListWindow && $.addTopLevelView($.__views.mangaListWindow);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading",
        __parentSymbol: $.__views.mangaListWindow
    });
    $.__views.loading.setParent($.__views.mangaListWindow);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.mangaListWindow.add($.__views.searchView);
    $.__views.searchButton = Ti.UI.createSearchBar({
        barColor: "transparent",
        backgroundImage: "/common/setting_bg.png",
        hintText: "search",
        width: "70%",
        left: 16,
        id: "searchButton"
    });
    $.__views.searchView.add($.__views.searchButton);
    $.__views.sortButton = Ti.UI.createButton({
        color: "#fff",
        opacity: .7,
        height: 30,
        width: 30,
        right: "8%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#9b652e",
        backgroundImage: "/common/sort-button2.png",
        id: "sortButton"
    });
    $.__views.searchView.add($.__views.sortButton);
    $.__views.advView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 50,
            top: 40
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 66,
            top: 40
        });
        _.extend(o, {
            id: "advView"
        });
        return o;
    }());
    $.__views.mangaListWindow.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
            top: 90
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
            top: 106
        });
        _.extend(o, {
            id: "bookShellTable"
        });
        return o;
    }());
    $.__views.mangaListWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Alloy.Globals.isTablet) var MAX_DISPLAY_ROW = 5; else var MAX_DISPLAY_ROW = 3;
    var search = $.searchButton;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.mangaListWindow);
        $.mangaListWindow.leftNavButton = Alloy.Globals.backButton($.mangaListWindow);
        var table = $.bookShellTable;
        var listManga;
        $.loading.setOpacity(1);
        Alloy.Globals.getAjax("/mangaList", {
            "null": null
        }, function(response) {
            listManga = JSON.parse(response).data;
            var tbl_data = setRowData(listManga.slice(0, 3 * MAX_DISPLAY_ROW));
            table.data = tbl_data;
            $.loading.setOpacity(0);
            dynamicLoad(table, listManga);
        });
        search.addEventListener("change", function(e) {
            var results = [];
            var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listManga) {
                var removedUTF = Alloy.Globals.removeUTF8(listManga[i].title);
                regexValue.test(removedUTF) && results.push(listManga[i]);
            }
            tbl_data = setRowData(results);
            table.setData([]);
            table.setData(tbl_data);
        });
        search.addEventListener("focus", function() {
            search.showCancel = true;
        });
        search.addEventListener("return", function() {
            search.showCancel = false;
            search.blur();
        });
        search.addEventListener("cancel", function() {
            search.showCancel = false;
            search.blur();
        });
        var optionsDialogOpts = {
            options: [ "A -> Z", "Most View", "Newest", "Z -> A" ],
            selectedIndex: 0,
            title: "SORT BY"
        };
        var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
        dialog.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listManga.sort(Alloy.Globals.dynamicSort("title", 1));
                break;

              case 1:
                listManga.sort(Alloy.Globals.dynamicSort("numView", -1));
                break;

              case 2:
                listManga.sort(Alloy.Globals.dynamicSort("datePost", -1));
                break;

              case 3:
                listManga.sort(Alloy.Globals.dynamicSort("title", -1));
            }
            table.setData([]);
            table.setData(setRowData(listManga.slice(0, 3 * MAX_DISPLAY_ROW)));
        });
        $.sortButton.addEventListener("singletap", function() {
            dialog.show();
        });
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;