var args = arguments[0] || {};
var bookInfoView = $.bookInfoView;
$.bookName.text = args.data.title;
var coverName = args.data._id + '.jpg';
var coverFile = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, coverName);
if (coverFile.exists()) {
	$.coverLink.image = coverFile.nativePath;
} else {
	// Alloy.Globals.loadImage($.coverLink, Alloy.Globals.SERVER + args.data.folder + '/cover.jpg', coverName);
	Alloy.Globals.loadImage($.coverLink, Alloy.Globals.SERVER + "/images/adv/adv0.jpg", coverName);
}

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
			var mangaController = Alloy.createController('manga', json);
			Alloy.Globals.closeLoading(args.window);
			mangaController.openMainWindow();
		});
	});
};