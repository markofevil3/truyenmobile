if (Alloy.Globals.isTablet()) {
	var MAX_DISPLAY_ROW = 20;
} else {
	var MAX_DISPLAY_ROW = 15;
}

var search = $.searchButton;
var table = $.bookShellTable;
var listStory;
var listDownloaded = [];
var downloadProgressBar = $.downloadProgress;

exports.updateDownloadProgress = function(value) {
	if (!downloadProgressBar.visible) {
		downloadProgressBar.show();
	}
	downloadProgressBar.value = value;
};

exports.hideDownloadProgress = function() {
	downloadProgressBar.hide();
};

exports.finishDownload = function(fileName) {
	downloadProgressBar.hide();
};

exports.openMainWindow = function() {
	Alloy.Globals.CURRENT_TAB.open($.storyAudioListWindow);
	//#### back button
	$.storyAudioListWindow.leftNavButton = Alloy.Globals.backButton($.storyAudioListWindow);
	Alloy.Globals.homeWindowStack.push($.storyAudioListWindow);
	$.storyAudioListWindow.addEventListener("close", function() {
		Alloy.Globals.homeWindowStack.pop();
		Ti.App.fireEvent('app:reload');
	});
	//#### advertise view
	// Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		// $.advView.add(advImage);
		// $.advView.height = Alloy.Globals.getAdvHeight();
	// });
	
	// ### update progress
	if (!Alloy.Globals.isDownloadingAudio) {
		downloadProgressBar.hide();
	}
	Alloy.Globals.getAjax('/storyAudioList', {
		'v': Titanium.App.version.toString()
	},
	function(response) {
		if (response == undefined || JSON.parse(response).error) {
			alert("Không có kết nối Internet!");
			return;
		}
		listStory = JSON.parse(response).data;
		var tbl_data = setRowData(listStory.slice(0, MAX_DISPLAY_ROW));
		table.data = tbl_data;
		dynamicLoad(table);
		$.loading.setOpacity(0.0);
		// $.storyAudioListWindow.setTitleControl(createTabBar());
	});
	//#### search bar
	search.addEventListener('return', function(e) {
		var results = [];
		var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), 'i');
		for (var i in listStory) {
			var removedUTF = Alloy.Globals.removeUTF8(listStory[i].title);
			if (regexValue.test(removedUTF)) {
				results.push(listStory[i]);
			}
		}
		tbl_data = setRowData(results);
		table.setData([]);
		table.setData(tbl_data);
		search.showCancel = false;
		search.blur();
	});
	search.addEventListener('focus', function(e) {
		search.showCancel = true;
	});
	search.addEventListener('cancel', function(e) {
		search.showCancel = false;
		search.blur();
		table.setData([]);
		table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
	});
	//#### sort button
	var optionsDialogOpts = {
		options:['A -> Z', 'Hot!', 'Mới Nhất', 'Z -> A', 'Đã Tải'],
		selectedIndex: 0,
		title:'SORT BY'
	};
	var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
	dialog.addEventListener('click',function(e) {
		switch (e.index) {
			case 0:
				listStory.sort(Alloy.Globals.dynamicSort('title', 1));
				table.setData([]);
				table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
				break;
			case 1:
				listStory.sort(Alloy.Globals.dynamicSortNumber('numView', -1));
				table.setData([]);
				table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
				break;
			case 2:
				listStory.sort(Alloy.Globals.dynamicSort('datePost', -1));
				table.setData([]);
				table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
				break;
			case 3:
				listStory.sort(Alloy.Globals.dynamicSort('title', -1));
				table.setData([]);
				table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
				break;
			case 4:
				listDownloaded = [];
				for (var i = 0; i < listStory.length; i++) {
					if (Alloy.Globals.checkAudioExist(listStory[i].fileName)) {
						listDownloaded.push(listStory[i]);
					}
				}
				table.setData([]);
				table.setData(setRowData(listDownloaded));
				break;
		}
	});
	$.sortButton.addEventListener('singletap', function(e) {
		dialog.show();
	});
};

function setRowData(data) {
	var dataSet = [];
	for (var i = 0; i < data.length; i++) {
		var row = Alloy.createController('storyAudioListRow', {data: data[i], window: $.storyAudioListWindow}).getView();
		dataSet.push(row);
	}
	return dataSet;
};

function dynamicLoad(tableView) {
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	});
	var loadingView = Titanium.UI.createView();
	loadingView.add(loadingIcon);
	var loadingRow = Ti.UI.createTableViewRow({
		height: 40 * Alloy.Globals.RATIO,
	});
	loadingRow.add(loadingView);
	var lastRowIndex = tableView.data[0].rowCount;
	var updating = false;
	
	function beginUpdate() {
		updating = true;
		tableView.appendRow(loadingRow);
		loadingIcon.show();
		setTimeout(endUpdate, 500);
	};
	function endUpdate() {
		updating = false;
		loadingIcon.hide();
		tableView.deleteRow(lastRowIndex - 1, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		var nextRowIndex = lastRowIndex - 1 + MAX_DISPLAY_ROW;
		if (nextRowIndex > listStory.length) {
			nextRowIndex = listStory.length;
		}
		var nextRowIndexs = listStory.slice(lastRowIndex - 1, nextRowIndex);
		var nextRows = setRowData(nextRowIndexs);
		for (var i = 0; i < nextRows.length; i++) {
			tableView.appendRow(nextRows[i], { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		}
		lastRowIndex += MAX_DISPLAY_ROW;
    // if (Alloy.Globals.getOSType() == "iPhone OS") {
      // tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
    // }
  };
	var lastDistance = 0;
	tableView.addEventListener('scroll',function(e) {
		lastRowIndex = tableView.data[0].rowCount;
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
		if (distance < lastDistance) {
			var nearEnd = theEnd * 1;
			if (!updating && (total >= nearEnd) && (search.value == null || search.value == '') && lastRowIndex < listStory.length && lastRowIndex >= MAX_DISPLAY_ROW) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
};