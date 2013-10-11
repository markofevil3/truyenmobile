if (Alloy.Globals.isTablet()) {
	var MAX_DISPLAY_ROW = 10;
} else {
	var MAX_DISPLAY_ROW = 5;
}

var search = $.searchButton;
var table = $.bookShellTable;
var listStory;

exports.openMainWindow = function() {
	Alloy.Globals.CURRENT_TAB.open($.storyListWindow);
	//#### back button
	$.storyListWindow.leftNavButton = Alloy.Globals.backButton($.storyListWindow);
	//#### advertise view
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advView.add(advImage);
	});
	Alloy.Globals.getAjax('/storyList', {
		'null': null
	},
	function(response) {
		if (response == undefined) {
			alert("Không có kết nối Internet!");
			return;
		}
		listStory = JSON.parse(response).data;
		var tbl_data = setRowData(listStory.slice(0, MAX_DISPLAY_ROW));
		table.data = tbl_data;
		dynamicLoad(table);
		$.loading.setOpacity(0.0);
		$.storyListWindow.setTitleControl(createTabBar());
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
		options:['A -> Z', 'Most View', 'Newest', 'Z -> A'],
		selectedIndex: 0,
		title:'SORT BY'
	};
	var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
	dialog.addEventListener('click',function(e) {
		switch (e.index) {
			case 0:
				listStory.sort(Alloy.Globals.dynamicSort('title', 1));
				break;
			case 1:
				listStory.sort(Alloy.Globals.dynamicSortNumber('numView', -1));
				break;
			case 2:
				listStory.sort(Alloy.Globals.dynamicSort('datePost', -1));
				break;
			case 3:
				listStory.sort(Alloy.Globals.dynamicSort('title', -1));
				break;
		}
		table.setData([]);
		table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
	});
	$.sortButton.addEventListener('singletap', function(e) {
		dialog.show();
	});
};

function setRowData(data) {
	var dataSet = [];
	for (var i = 0; i < data.length; i++) {
		var row = Alloy.createController('storyListRow', {data: data[i], window: $.storyListWindow}).getView();
		dataSet.push(row);
	}
	return dataSet;
};

function createTabBar() {
	//### filter
	var tabBar = Titanium.UI.iOS.createTabbedBar({
		labels:['Tất cả', 'Tr.ngắn', 'Tr.dài'],
		index:0,
		color: '#fff',
		font: { fontWeight: 'bold' }
	});
	if (Alloy.Globals.getOSType() == "iPhone OS") {
		if (parseFloat(Ti.Platform.version) >= 7) {
			tabBar.tintColor = '#CCCCCC';
		} else {
			tabBar.backgroundColor = '#c69656';
			tabBar.style = Titanium.UI.iPhone.SystemButtonStyle.BAR;
		}
	}
	var cloneListStory = listStory.slice(0);
	tabBar.addEventListener('click', function(e) {
		switch (e.index) {
			case 0:
				listStory = cloneListStory.slice(0);
				break;
			case 1:
				listStory = [];
				for (var i = 0; i < cloneListStory.length; i++) {
					if (cloneListStory[i].type == 0) {
						listStory.push(cloneListStory[i]);
					}
				}
				break;
			case 2:
				listStory = [];
				for (var i = 0; i < cloneListStory.length; i++) {
					if (cloneListStory[i].type == 1) {
						listStory.push(cloneListStory[i]);
					}
				}
				break;
		}
		table.setData([]);
		table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
	});
	return tabBar;
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