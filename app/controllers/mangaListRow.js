var args = arguments[0] || {};
for (var i = 0; i < 3; i++) {
	var bookInfoView = $['bookInfoView' + (i + 1)];
	if (args.data[i]) {
		$['bookName' + (i + 1)].text = args.data[i].title;
		var coverName = args.data[i]._id + '.jpg';
		var coverFile = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, coverName);
		if (coverFile.exists()) {
			$['coverLink' + (i + 1)].image = coverFile.nativePath;
		} else {
			Alloy.Globals.loadImage($['coverLink' + (i + 1)], Alloy.Globals.SERVER + args.data[i].folder + '/cover.jpg', coverName);
		}
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
