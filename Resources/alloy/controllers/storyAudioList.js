function Controller() {
    function setRowData(data) {
        var dataSet = [];
        for (var i = 0; data.length > i; i++) {
            var row = Alloy.createController("storyAudioListRow", {
                data: data[i],
                window: $.storyAudioListWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
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
    this.__controllerPath = "storyAudioList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.storyAudioListWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "storyAudioListWindow",
        title: "Radio Truyện"
    });
    $.__views.storyAudioListWindow && $.addTopLevelView($.__views.storyAudioListWindow);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading",
        __parentSymbol: $.__views.storyAudioListWindow
    });
    $.__views.loading.setParent($.__views.storyAudioListWindow);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.storyAudioListWindow.add($.__views.searchView);
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
    $.__views.downloadProgressView = Ti.UI.createView({
        width: "100%",
        height: 20,
        top: 40,
        id: "downloadProgressView"
    });
    $.__views.storyAudioListWindow.add($.__views.downloadProgressView);
    $.__views.downloadProgress = Ti.UI.createProgressBar({
        width: "50%",
        height: 20,
        min: 0,
        max: 1,
        value: 0,
        style: Titanium.UI.iPhone.ProgressBarStyle.DEFAULT,
        id: "downloadProgress"
    });
    $.__views.downloadProgressView.add($.__views.downloadProgress);
    $.__views.bookShellTable = Ti.UI.createTableView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
            top: 60
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "transparent",
            separatorColor: "transparent",
            style: Ti.UI.iPhone.TableViewStyle.PLAIN,
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
            top: 60
        });
        _.extend(o, {
            id: "bookShellTable"
        });
        return o;
    }());
    $.__views.storyAudioListWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Alloy.Globals.isTablet()) var MAX_DISPLAY_ROW = 20; else var MAX_DISPLAY_ROW = 15;
    var search = $.searchButton;
    var table = $.bookShellTable;
    var listStory;
    var listDownloaded = [];
    var downloadProgressBar = $.downloadProgress;
    exports.updateDownloadProgress = function(value) {
        downloadProgressBar.visible || downloadProgressBar.show();
        downloadProgressBar.value = value;
    };
    exports.hideDownloadProgress = function() {
        downloadProgressBar.hide();
    };
    exports.finishDownload = function() {
        downloadProgressBar.hide();
    };
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.storyAudioListWindow);
        $.storyAudioListWindow.leftNavButton = Alloy.Globals.backButton($.storyAudioListWindow);
        Alloy.Globals.homeWindowStack.push($.storyAudioListWindow);
        $.storyAudioListWindow.addEventListener("close", function() {
            Alloy.Globals.homeWindowStack.pop();
            Ti.App.fireEvent("app:reload");
        });
        Alloy.Globals.isDownloadingAudio || downloadProgressBar.hide();
        Alloy.Globals.getAjax("/storyAudioList", {
            v: Titanium.App.version.toString()
        }, function(response) {
            if (void 0 == response || JSON.parse(response).error) {
                alert("Không có kết nối Internet!");
                return;
            }
            listStory = JSON.parse(response).data;
            var tbl_data = setRowData(listStory.slice(0, MAX_DISPLAY_ROW));
            table.data = tbl_data;
            dynamicLoad(table);
            $.loading.setOpacity(0);
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
            options: [ "A -> Z", "Hot!", "Mới Nhất", "Z -> A", "Đã Tải" ],
            selectedIndex: 0,
            title: "SORT BY"
        };
        var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
        dialog.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listStory.sort(Alloy.Globals.dynamicSort("title", 1));
                table.setData([]);
                table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
                break;

              case 1:
                listStory.sort(Alloy.Globals.dynamicSortNumber("numView", -1));
                table.setData([]);
                table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
                break;

              case 2:
                listStory.sort(Alloy.Globals.dynamicSort("datePost", -1));
                table.setData([]);
                table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
                break;

              case 3:
                listStory.sort(Alloy.Globals.dynamicSort("title", -1));
                table.setData([]);
                table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
                break;

              case 4:
                listDownloaded = [];
                for (var i = 0; listStory.length > i; i++) Alloy.Globals.checkAudioExist(listStory[i].fileName) && listDownloaded.push(listStory[i]);
                table.setData([]);
                table.setData(setRowData(listDownloaded));
            }
        });
        $.sortButton.addEventListener("singletap", function() {
            dialog.show();
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;