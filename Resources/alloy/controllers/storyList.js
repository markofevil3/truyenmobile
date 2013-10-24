function Controller() {
    function setRowData(data) {
        var dataSet = [];
        for (var i = 0; data.length > i; i++) {
            var row = Alloy.createController("storyListRow", {
                data: data[i],
                window: $.storyListWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function createTabBar() {
        var tabBar = Titanium.UI.iOS.createTabbedBar({
            labels: [ "Tất cả", "Tr.ngắn", "Tr.dài" ],
            index: 0,
            color: "#fff",
            font: {
                fontWeight: "bold"
            }
        });
        if ("iPhone OS" == Alloy.Globals.getOSType()) if (parseFloat(Ti.Platform.version) >= 7) tabBar.tintColor = "#CCCCCC"; else {
            tabBar.backgroundColor = "#c69656";
            tabBar.style = Titanium.UI.iPhone.SystemButtonStyle.BAR;
        }
        var cloneListStory = listStory.slice(0);
        tabBar.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listStory = cloneListStory.slice(0);
                break;

              case 1:
                listStory = [];
                for (var i = 0; cloneListStory.length > i; i++) 0 == cloneListStory[i].type && listStory.push(cloneListStory[i]);
                break;

              case 2:
                listStory = [];
                for (var i = 0; cloneListStory.length > i; i++) 1 == cloneListStory[i].type && listStory.push(cloneListStory[i]);
            }
            table.setData([]);
            table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
        });
        return tabBar;
    }
    function dynamicLoad(tableView) {
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
            nextRowIndex > listStory.length && (nextRowIndex = listStory.length);
            var nextRowIndexs = listStory.slice(lastRowIndex - 1, nextRowIndex);
            var nextRows = setRowData(nextRowIndexs);
            for (var i = 0; nextRows.length > i; i++) tableView.appendRow(nextRows[i], {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            lastRowIndex += MAX_DISPLAY_ROW;
        }
        var loadingIcon = Titanium.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
        });
        var loadingView = Titanium.UI.createView();
        loadingView.add(loadingIcon);
        var loadingRow = Ti.UI.createTableViewRow({
            height: 40 * Alloy.Globals.RATIO
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
                !updating && total >= nearEnd && (null == search.value || "" == search.value) && listStory.length > lastRowIndex && lastRowIndex >= MAX_DISPLAY_ROW && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.storyListWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        layout: "vertical",
        id: "storyListWindow",
        title: "Story"
    });
    $.__views.storyListWindow && $.addTopLevelView($.__views.storyListWindow);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading",
        __parentSymbol: $.__views.storyListWindow
    });
    $.__views.loading.setParent($.__views.storyListWindow);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.storyListWindow.add($.__views.searchView);
    $.__views.searchButton = Ti.UI.createSearchBar({
        barColor: "#c79351",
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
            height: 50
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 66
        });
        _.extend(o, {
            id: "advView"
        });
        return o;
    }());
    $.__views.storyListWindow.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
        });
        _.extend(o, {
            id: "bookShellTable"
        });
        return o;
    }());
    $.__views.storyListWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Alloy.Globals.isTablet()) var MAX_DISPLAY_ROW = 10; else var MAX_DISPLAY_ROW = 5;
    var search = $.searchButton;
    var table = $.bookShellTable;
    var listStory;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.storyListWindow);
        $.storyListWindow.leftNavButton = Alloy.Globals.backButton($.storyListWindow);
        Alloy.Globals.homeWindowStack.push($.storyListWindow);
        $.storyListWindow.addEventListener("close", function() {
            Alloy.Globals.homeWindowStack.pop();
            Ti.App.fireEvent("app:reload");
        });
        Alloy.Globals.getAjax("/storyList", null, function(response) {
            if (void 0 == response || JSON.parse(response).error) {
                alert("Không có kết nối Internet!");
                return;
            }
            var jsonData = JSON.parse(response);
            Alloy.Globals.setAdmobPublisher(jsonData.advPublisher, jsonData.admobPublisher);
            Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
                $.advView.add(advImage);
                $.advView.height = Alloy.Globals.getAdvHeight();
            });
            listStory = jsonData.data;
            var tbl_data = setRowData(listStory.slice(0, MAX_DISPLAY_ROW));
            table.data = tbl_data;
            dynamicLoad(table);
            $.loading.setOpacity(0);
            $.storyListWindow.setTitleControl(createTabBar());
        });
        search.addEventListener("return", function(e) {
            var results = [];
            var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listStory) {
                var removedUTF = Alloy.Globals.removeUTF8(listStory[i].title);
                regexValue.test(removedUTF) && results.push(listStory[i]);
            }
            tbl_data = setRowData(results);
            table.setData([]);
            table.setData(tbl_data);
            search.showCancel = false;
            search.blur();
        });
        search.addEventListener("focus", function() {
            search.showCancel = true;
        });
        search.addEventListener("cancel", function() {
            search.showCancel = false;
            search.blur();
            table.setData([]);
            table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
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
                listStory.sort(Alloy.Globals.dynamicSort("title", 1));
                break;

              case 1:
                listStory.sort(Alloy.Globals.dynamicSortNumber("numView", -1));
                break;

              case 2:
                listStory.sort(Alloy.Globals.dynamicSort("datePost", -1));
                break;

              case 3:
                listStory.sort(Alloy.Globals.dynamicSort("title", -1));
            }
            table.setData([]);
            table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
        });
        $.sortButton.addEventListener("singletap", function() {
            dialog.show();
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;