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
			Alloy.Globals.closeLoading(args.window);
			storyReadingController.openMainWindow();
		});
	});
};

var row = $.row;
row.dataId = args.data.storyId;
//## type: Truyen dai
row.dataType = 1;
row.dataChapterId = args.data._id;
$.chapterTitle.text = 'Chapter ' +  args.data.chapter;
if (args.data.title) {
	$.chapterTitle.text += ': ' + args.data.title;
}
selectItem(row);
