if (Alloy.Globals.isTablet()) {
	var MAX_DISPLAY_ROW = 15;
} else {
	var MAX_DISPLAY_ROW = 10;
}

var search = $.searchButton;

function setHotManga(mangas) {
	mangas.sort(Alloy.Globals.dynamicSort('numView', -1));
	for (var i = 0; i < 5; i++) {
		mangas[i].top = i + 1;
	}
	mangas.sort(Alloy.Globals.dynamicSort('datePost', -1));
}

exports.openMainWindow = function() {
	if (Alloy.Globals.getOSType() == "iPhone OS") {
		Titanium.UI.iPhone.appBadge = null;
	}

	Alloy.Globals.CURRENT_TAB.open($.mangaListWindow);
	Alloy.Globals.homeWindowStack.push($.mangaListWindow);
	$.mangaListWindow.addEventListener("close", function() {
		Alloy.Globals.homeWindowStack.pop();
		Ti.App.fireEvent('app:reload');
	});
	//#### back button
	$.mangaListWindow.leftNavButton = Alloy.Globals.backButton($.mangaListWindow);
	
	//### Add data to table
	var table = $.bookShellTable;
	var listManga;
	$.loading.setOpacity(1.0);
	Alloy.Globals.getAjax('/mangaList', {
		'null': null
	},
	function(response) {
		if (response == undefined) {
			alert("Không có kết nối Internet!");
		}
		listManga = JSON.parse(response).data;
		setHotManga(listManga);
		var tbl_data = setRowData(listManga.slice(0, MAX_DISPLAY_ROW));
		table.data = tbl_data;
		$.loading.setOpacity(0.0);
		dynamicLoad(table, listManga);
	});
	//#### search bar
	search.addEventListener('return', function(e) {
		var results = [];
		var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), 'i');
		for (var i in listManga) {
			var removedUTF = Alloy.Globals.removeUTF8(listManga[i].title);
			if (regexValue.test(removedUTF)) {
				results.push(listManga[i]);
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
		table.setData(setRowData(listManga.slice(0, MAX_DISPLAY_ROW)));
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
				listManga.sort(Alloy.Globals.dynamicSort('title', 1));
				break;
			case 1:
				listManga.sort(Alloy.Globals.dynamicSortNumber('numView', -1));
				break;
			case 2:
				listManga.sort(Alloy.Globals.dynamicSort('datePost', -1));
				break;
			case 3:
				listManga.sort(Alloy.Globals.dynamicSort('title', -1));
				break;
		}
		table.setData([]);
		table.setData(setRowData(listManga.slice(0, MAX_DISPLAY_ROW)));
	});
	$.sortButton.addEventListener('singletap', function(e) {
		dialog.show();
	});
	//#### advertise view
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advView.add(advImage);
		$.advView.height = Alloy.Globals.getAdvHeight();
	});
};

function setRowData(data) {
	var dataSet = [];
	// var dataLength = Math.round(data.length / 3);
	// if (dataLength == 0) {
		// dataLength = 1;
	// }
	for (var i = 0; i < data.length; i++) {
		// var rowData = [];
		// for (var j = 0; j < 3; j++) {
			// var index = (i * 3) + j;
			// if (data[index]) {
				// rowData.push(data[index]);
			// }
		// }
		var row = Alloy.createController('mangaListRow', {data: data[i], window: $.mangaListWindow}).getView();
		dataSet.push(row);
	}
	return dataSet;
};

function dynamicLoad(tableView, data) {
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	});
	var loadingView = Titanium.UI.createView({
		backgroundColor: 'transparent',
		backgroundImage: 'NONE'
	});
	loadingView.add(loadingIcon);
	var loadingRow = Ti.UI.createTableViewRow({
		height: 60,
		backgroundColor: 'transparent',
		backgroundImage: 'NONE'
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
		if (nextRowIndex > data.length) {
			nextRowIndex = data.length;
		}
		var nextRowIndexs = data.slice(lastRowIndex - 1, nextRowIndex);
		var nextRows = setRowData(nextRowIndexs);
		for (var i = 0; i < nextRows.length; i ++) {
			tableView.appendRow(nextRows[i], { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		}
		lastRowIndex += MAX_DISPLAY_ROW;
		// tableView.scrollToIndex(lastRowIndex - MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
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
			if (!updating && (total >= nearEnd) && lastRowIndex < data.length && lastRowIndex >= MAX_DISPLAY_ROW && (search.value == null || search.value == '')) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
};