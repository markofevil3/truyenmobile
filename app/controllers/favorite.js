var listFavorites;
var mangaRows;
var storyRows;
var tableView = $.bookShellTable;

function setRowData(data, type) {
	var dataSet = [];
	for (var i = 0; i < data.length; i++) {
		data[i].bookType = type;
		var row = Alloy.createController('favoriteRow', {data: data[i], window: $.favoriteWindow}).getView();
		dataSet.push(row);
	}
	return dataSet;
};

function getFavorites() {
	Alloy.Globals.getAjax('/getFavorites', {
		'userId': Alloy.Globals.facebook.getUid()
	},
	function(response) {
		listFavorites = JSON.parse(response).data;
		mangaRows = setRowData(listFavorites['manga'], 0);
		storyRows = setRowData(listFavorites['story'], 1);
		tableView.data = mangaRows.concat(storyRows);
		$.filterTabbar.addEventListener('click', function(e) {
			switch (e.index) {
				case 0:
					var mangaRows = setRowData(listFavorites['manga'], 0);
					var storyRows = setRowData(listFavorites['story'], 1);
					tableView.data = mangaRows.concat(storyRows);
					break;
				case 1:
					tableView.data = setRowData(listFavorites['manga'], 0);
					break;
				case 2:
					tableView.data = setRowData(listFavorites['story'], 1);
					break;
			}
		});
	});
};

//## CHECK LOGIN TO GET FAVORITE LIST
$.favoriteTab.addEventListener('focus', function(f) {
	Alloy.Globals.CURRENT_TAB = $.favoriteTab;
	if (Alloy.Globals.facebook.loggedIn == 0) {
		Alloy.Globals.facebookLogin(function(e) {
			getFavorites();
		});
	} else {
		getFavorites();
	}
});

//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advView.add(advImage);
});
