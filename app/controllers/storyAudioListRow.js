var args = arguments[0] || {};
var downloadBtn = $.downloadButton;
var playBtn = $.playButton;
$.row.dataId = args.data._id;
$.row.dataFileName = args.data.fileName;
$.row.dataLink = args.data.link;
$.storyAudioTitle.text = args.data.title;
$.storyAudioAuthor.text = 'Tác giả: ' + args.data.author;
if (args.data.cover && args.data.cover != null) {
	$.bookCover.image = args.data.cover;
} else {
	$.bookCover.image = Alloy.Globals.SERVER + "/images/audioDefaultCover.jpg";
}

if (Alloy.Globals.isDownloadingAudio && Alloy.Globals.downloadingAudioName == args.data.fileName) {
	setButtonLayout("cancel");
} else if (Alloy.Globals.checkAudioExist(args.data.fileName)) {
	setButtonLayout("remove");
} else {
	setButtonLayout("download");
}

Ti.App.addEventListener('audioDownloaded', function(e) {
	if (e.fileName == args.data.fileName) {
		log(e);
		setButtonLayout("remove");
	}
});
// selectItem($.row);

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

function eventClickBtn(e) {
	switch(e.source.dataType) {
		case "download":
			eventDownload();
		break;
		case "cancel":
			eventCancelDownload();
		break;
		case "remove":
			eventRemoveAudio();
		break;
	}
}

function eventDownload() {
	if (Alloy.Globals.checkAudioExist(args.data.fileName)) {
	} else {
		log("!!! not download");
		if (!Alloy.Globals.isDownloadingAudio) {
			var canDownload = Alloy.Globals.downloadAudio(args.data.fileName, args.data.link, null);
			if (canDownload) {
				setButtonLayout("cancel");
			}
		} else {
			alert("Đang tải truyện khác!");
		}
	}
};

function eventCancelDownload() {
	setButtonLayout("download");
	Alloy.Globals.cancelDownloadAudio();
}

function eventRemoveAudio() {
	var confirmBox = Titanium.UI.createAlertDialog({
		title:'Xoá ' + args.data.title + '?',
		buttonNames: ['Xoá','Huỷ'],
		cancel: 1,
	});
	confirmBox.show();
	confirmBox.addEventListener('click', function(e) {
		if (e.index == 0) {
			Alloy.Globals.removeAudioFile(args.data.fileName);
			setButtonLayout("download");
		}
	});
}

function eventPlay() {
	// args.data.isDownloaded = Alloy.Globals.checkAudioExist(args.data.fileName);
	Alloy.Globals.openLoading(args.window);
	setTimeout(function() {
		var audioPlayerController = Alloy.createController('audioPlayer', {data: args.data});
		audioPlayerController.openMainWindow();
		Alloy.Globals.closeLoading(args.window);
	}, 300);
};


function setButtonLayout(type) {
	downloadBtn.dataType = type;
	switch(type) {
		case "download":
			downloadBtn.title = 'Tải';
			downloadBtn.backgroundImage = "/common/btn-download.png";
			// playBtn.hide();
		break;
		case "cancel":
			downloadBtn.title = 'Huỷ';
			downloadBtn.backgroundImage = "/common/btn.png";
			// playBtn.hide();
		break;
		case "remove":
			downloadBtn.title = 'Xoá';
			downloadBtn.backgroundImage = "/common/btn-delete.png";
			// playBtn.show();
		break;
	}
}
