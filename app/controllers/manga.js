var args = arguments[0] || {};
var MAX_DISPLAY_ROW = 15;
var table = $.bookShellTable;
var search = $.searchButton;

exports.openMainWindow = function() {
	Alloy.Globals.CURRENT_TAB.open($.mangaWindow);
	Alloy.Globals.homeWindowStack.push($.mangaWindow);
	$.mangaWindow.addEventListener("close", function() {
		Alloy.Globals.homeWindowStack.pop();
	});
	//#### back button
	$.mangaWindow.leftNavButton = Alloy.Globals.backButton($.mangaWindow);
	//#### advertise view
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advView.add(advImage);
		$.advView.height = Alloy.Globals.getAdvHeight();
	});
	//#### favorite and favorited button
	var favoriteButton = Titanium.UI.createButton({
		text: 'favorite', 
		color: '#fff',
		height: 40,
		width: 40,
		itemId: args.data._id,
		backgroundColor: 'transparent',
		backgroundImage: '/common/favorites_dark.png',
	});
	var favoritedButton = Titanium.UI.createButton({
		text: 'favorite', 
		color: '#fff',
		height: 40,
		width: 40,
		backgroundColor: 'transparent',
		backgroundImage: '/common/favorites_color.png',
	});
	favoriteButton.addEventListener('click', function() {
		if (Alloy.Globals.facebook.loggedIn == 0) {
			Alloy.Globals.facebookLogin(function(e) {
				Alloy.Globals.addFavorite(favoriteButton.itemId, 0, e.data, args.data.title, args.data.cover, function() {
					Alloy.Globals.track("Favorite", "Add", args.data.title);
					$.mangaWindow.rightNavButton = favoritedButton;
				});
			});
		} else {
			Alloy.Globals.facebook.requestWithGraphPath('/' + Alloy.Globals.facebook.getUid(), {}, 'GET', function(user) {
				Alloy.Globals.addFavorite(favoriteButton.itemId, 0, JSON.parse(user.result), args.data.title, args.data.cover, function() {
					Alloy.Globals.track("Favorite", "Add", args.data.title);
					$.mangaWindow.rightNavButton = favoritedButton;
				});
			});
		}
	});
	var listChapters = args.data.chapters;
	listChapters.sort(Alloy.Globals.dynamicSortNumber('chapter', 1));
		// listChapters.sort(Alloy.Globals.naturalSort('chapter', 1));

	getNextPrevChapter(listChapters);
	if (args.favorite) {
		$.mangaWindow.rightNavButton = favoritedButton;
	} else {
		$.mangaWindow.rightNavButton = favoriteButton; 
	}
	$.mangaWindow.title = args.data.title;
	$.bookCover.image = args.data.cover;
	Alloy.Globals.loadImage($.bookCover, args.data.cover);
	$.bookTitle.text = args.data.title;
	$.bookAuthor.text = 'Tác Giả: ' + args.data.author;
	$.newestChapter.text = 'Chapter Mới: ' + Alloy.Globals.getNewestChapter(listChapters);
	$.numViewText.text = args.data.numView;
	if (Alloy.Globals.getOSType() == "iPhone OS") {
		var tbl_data = setRowData(listChapters, MAX_DISPLAY_ROW);
		table.data = tbl_data;
		dynamicLoad(table, listChapters);
	} else {
		var tbl_data = setRowData(listChapters, MAX_DISPLAY_ROW);
		table.data = tbl_data;
	}

	//#### search bar
	search.addEventListener('return', function(e) {
		var results = [];
		var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), 'i');
		for (var i in listChapters) {
			if (regexValue.test(listChapters[i].chapter)) {
				results.push(listChapters[i]);
			}
		}
		tbl_data = setRowData(results, results.length);
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
		table.setData(setRowData(listChapters, MAX_DISPLAY_ROW));
	});
	//#### sort button
	var optionsDialogOpts = {
		options:['A -> Z', 'Z -> A'],
		selectedIndex: 0,
		title:'SORT BY'
	};
	var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
	dialog.addEventListener('click',function(e) {
		switch (e.index) {
			case 0:
				listChapters.sort(Alloy.Globals.dynamicSortNumber('chapter', 1));
				break;
			case 1:
				listChapters.sort(Alloy.Globals.dynamicSortNumber('chapter', -1));
				break;
		}
		table.setData([]);
		table.setData(setRowData(listChapters, MAX_DISPLAY_ROW));
	});
	$.sortButton.addEventListener('singletap', function(e) {
		dialog.show();
	});
};

function setRowData(data, maxRow) {
	var dataSet = [];
	for (var i = 0; i < maxRow; i++) {
		if (data[i]) {
			data[i].mangaId = args.data._id;
			var row = Alloy.createController('mangaRow', {data: data[i], window: $.mangaWindow}).getView();
			dataSet.push(row);
		}
	}
	return dataSet;
};

function getNextPrevChapter(data) {
	for (var i = 0; i < data.length; i++) {
		if (data[i - 1]) {
			data[i].next = data[i - 1]._id;
		}
		if (data[i + 1]) {
			data[i].prev = data[i + 1]._id;
		}
	}
}

function dynamicLoad(tableView, data) {
  var style;
  if (Ti.Platform.name === 'iPhone OS'){
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
  }
  else {
    style = Ti.UI.ActivityIndicatorStyle.DARK;
  }
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style: style
	});
	var loadingView = Titanium.UI.createView();
	loadingView.add(loadingIcon);
	var loadingRow = Ti.UI.createTableViewRow({
		height: 40,
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
		for (var i = lastRowIndex - 1; i < nextRowIndex; i++) {
			data[i].mangaId = args.data._id;
			// var row = Alloy.createController('mangaRow', {data: data[i]}).getView();
			var row = Alloy.createController('mangaRow', {data: data[i], window: $.mangaWindow}).getView();
			// selectItem(row);
			tableView.appendRow(row, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		}
		lastRowIndex += MAX_DISPLAY_ROW;
    if (Alloy.Globals.getOSType() == "iPhone OS") {
      tableView.scrollToIndex(lastRowIndex - MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
    } else {
    	tableView.scrollToIndex(lastRowIndex - MAX_DISPLAY_ROW);
    }
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
			if (!updating && (total >= nearEnd) && lastRowIndex < data.length && tableView.data[0].rows[0].chapterId == data[0]._id 
			&& (tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id)
			&& tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length -1]._id && lastRowIndex >= MAX_DISPLAY_ROW) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
};
