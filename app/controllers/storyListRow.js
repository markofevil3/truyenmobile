var args = arguments[0] || {};

$.row.dataId = args.data._id;
$.row.dataType = args.data.type;
$.bookCover.image = Alloy.Globals.SERVER + '/images/story/sample/cover.jpg';
$.storyTitle.text = args.data.title;
$.storyAuthor.text = 'Tác giả: ' + args.data.author;
$.storyType.text = 'Thể loại: ' + getTypeText(args.data.type);
$.bookCoverView.backgroundImage = (args.data.type == 0) ? '/common/book5.png' : '/common/book5.png';
selectItem($.row);

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		if (item.dataType == 0) {
			Alloy.Globals.getAjax('/getStoryContent', {
				'id': item.dataId,
				'type': item.dataType,
				'chapter': item.dataChapterId
			},
			function(response) {
				var json = JSON.parse(response);
				var storyReadingController = Alloy.createController('storyReading', json.data);
				Alloy.Globals.closeLoading(args.window);
				storyReadingController.openMainWindow();
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
	if (type == 0) {
		return 'Truyện ngắn';
	} else {
		return 'Truyện dài';
	}
};