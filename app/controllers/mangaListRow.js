var args = arguments[0] || {};
var bookInfoView = $.bookInfoView;
$.bookName.text = args.data.title;
if (Alloy.Globals.getOSType() == "iPhone OS") {
	$.coverLink.image = args.data.cover;
}
// Alloy.Globals.loadImage($.coverLink, args.data.cover);

var newIconImage = Ti.UI.createImageView({
	height: 32,
	width: 32,
	image: '/common/new-tag.png',
});
var updateIconImage = Ti.UI.createImageView({
	height: 32,
	width: 32,
	image: '/common/new-tag.png',
});
var hotIconImage = Ti.UI.createImageView({
	height: 32,
	width: 32,
	image: '/common/new-tag.png',
});

if (args.data.datePost && Alloy.Globals.isNew(new Date(args.data.datePost))) {
	// $.newIcon.visible = true;
	$.icon.add(newIconImage);
}

if (args.data.updatedAt && Alloy.Globals.isNew(new Date(args.data.updatedAt))) {
	// $.updateIcon.visible = true;
	$.icon.add(updateIconImage);
}

if (args.data.top && args.data.top > 0) {
	// $.hotIcon.visible = true;
	$.icon.add(hotIconImage);
}

bookInfoView.dataId = args.data._id;
selectItem(bookInfoView);

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		Alloy.Globals.getAjax('/manga', {
			'id': item.dataId,
			'userId': Alloy.Globals.facebook.getUid()
		},
		function(response) {
			var json = JSON.parse(response);
			Alloy.Globals.track("Manga", "List Chapter", json.data.title);
			var mangaController = Alloy.createController('manga', json);
			Alloy.Globals.closeLoading(args.window);
			mangaController.openMainWindow();
		});
	});
};