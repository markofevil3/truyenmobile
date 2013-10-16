var args = arguments[0] || {};

var row = $.row;
row.chapterId = args.data._id;
row.mangaId = args.data.mangaId;
row.next = args.data.next;
row.prev = args.data.prev;
$.chapterTitle.text = 'Chapter ' +  args.data.chapter;
var readingChapter = Alloy.Globals.readingChapters[args.data.mangaId];
if (readingChapter != null && readingChapter != undefined) {
	if (readingChapter.toString() == args.data.chapter.toString()) {
		$.chapterTitle.color = 'green';
	}
}
selectItem(row);

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		Alloy.Globals.getAjax('/mangaReading', {
			'id': item.mangaId,
			'chapter': item.chapterId
		},
		function(response) {
			var json = JSON.parse(response);
			json.data.next = json.nextPrevChapters.next;
			json.data.prev = json.nextPrevChapters.prev;
			json.data.mangaId = item.mangaId;
			Alloy.Globals.track("Manga", "Reading", item.mangaId);
			var mangaReadingController = Alloy.createController('mangaReading', json.data);
			setTimeout(function() {
				Alloy.Globals.closeLoading(args.window);
				mangaReadingController.openMainWindow();
			}, 300);
		});
	});
};
