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
			json.data.storyId = item.dataId;
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
var readingChapter = Alloy.Globals.readingChapters[args.data.storyId];
if (readingChapter != null && readingChapter != undefined) {
	if (readingChapter.toString() == args.data._id.toString()) {
		$.chapterTitle.color = 'green';
	}
}
$.chapterTitle.text = args.data.title;
// if (args.data.title) {
	// $.chapterTitle.text += ': ' + args.data.title;
// }
selectItem(row);
