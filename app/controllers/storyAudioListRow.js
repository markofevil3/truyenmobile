var args = arguments[0] || {};

$.row.dataId = args.data._id;
$.row.dataType = args.data.type;
$.storyAudioTitle.text = args.data.title;
$.storyAudioAuthor.text = 'Tác giả: ' + args.data.author;
selectItem($.row);

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.openLoading(args.window);
		setTimeout(function() {
			var audioPlayerController = Alloy.createController('audioPlayer', {data: null});
			audioPlayerController.openMainWindow();
			Alloy.Globals.closeLoading(args.window);
		}, 300);
	});
};