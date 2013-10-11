var args = arguments[0] || {};

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		Alloy.Globals.getAjax('/getStoryContent', {
			'id': item.dataId,
			'type': item.dataType,
			'chapter': item.dataChapterId
		},
		function(response) {
			var json = JSON.parse(response);
			var storyReadingController = Alloy.createController('storyReading', json.data);
			setTimeout(function() {
				Alloy.Globals.closeLoading(args.window);
				storyReadingController.openMainWindow();
			}, 300);
		});
	});
};

var row = $.row;
row.dataId = args.data.storyId;
//## type: Truyen dai
row.dataType = 1;
row.dataChapterId = args.data._id;
$.chapterTitle.text = args.data.title;
// if (args.data.title) {
	// $.chapterTitle.text += ': ' + args.data.title;
// }
selectItem(row);
