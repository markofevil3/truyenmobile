var args = arguments[0] || {};

$.row.dataId = args.data._id;
$.row.dataType = args.data.bookType;
var coverLink;
if (args.data.bookType == 0) {
	coverLink = Alloy.Globals.SERVER + args.data.folder + '/cover.jpg';
} else {
	coverLink = Alloy.Globals.SERVER + '/images/story/sample/cover.jpg';
}
$.bookCover.image = coverLink;
$.bookTitle.text = args.data.title;
$.newestChapter.text = 'Newest: ' + args.data.chapters[args.data.chapters.length - 1].chapter;
$.bookType.text = 'Thể loại: ' + getTypeText(args.data.bookType);
$.bookCoverView.backgroundImage = (args.data.bookType == 0) ? '/common/book5.png' : '/common/book5.png';
selectItem($.row, args.data.bookType);

function selectItem(item, type) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		if (type == 0) {
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
		} else {
			Alloy.Globals.getAjax('/getStory', {
				'id': item.dataId,
				'userId': Alloy.Globals.facebook.getUid()
			},
			function(response) {
				var json = JSON.parse(response);
				var storyController = Alloy.createController('story', json);
				Alloy.Globals.closeLoading(args.window);
				storyController.openMainWindow();
			});
		}
	});
};

function getTypeText(type) {
	switch(type) {
		case 0:
			return 'Truyện Tranh';
			break;
		case 1:
			return 'Truyện Chữ';
			break;
	}
};