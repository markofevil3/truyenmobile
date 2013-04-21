var args = arguments[0] || {};
for (var i = 0; i < 3; i++) {
	var bookInfoView = $['bookInfoView' + (i + 1)];
	if (args.data[i]) {
		$['bookName' + (i + 1)].text = args.data[i].title;
		$['coverLink' + (i + 1)].image = Alloy.Globals.SERVER + args.data[i].folder + '/cover.jpg';
		bookInfoView.dataId = args.data[i]._id;
		selectItem(bookInfoView);
	} else {
		bookInfoView.setVisible(false);
	}
}

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		Alloy.Globals.getAjax('/manga', {
			'id': item.dataId,
			'userId': Alloy.Globals.facebook.getUid()
		},
		function(response) {
			var json = JSON.parse(response);
			var mangaController = Alloy.createController('manga', json);
			Alloy.Globals.closeLoading(args.window);
			mangaController.openMainWindow();
		});
	});
};
