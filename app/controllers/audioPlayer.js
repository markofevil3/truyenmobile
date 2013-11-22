var args = arguments[0] || {};
var updateTime;
var progressBar = $.audioProgress;
var currentTimeLabel = $.currentTimeLabel;
var maxTimeLabel = $.maxTimeLabel;
var playButton = $.playButton;
var volumeProgress = $.volumeProgress;
var player;
var isRemotePlay;
var audioPlayer;
var openTime;
var openPopupAdTime = 150000; // millisecond

exports.openMainWindow = function() {
	openTime = new Date().getTime();

	//## ADVERTISE
	// Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		// $.advView.add(advImage);
	// });
	$.audioTitle.text = args.data.title;
	$.audioAuthor.text = "Tác giả: " + args.data.author;
	$.audioSpeaker.text = "Người đọc: " + args.data.reader;
	if (args.data.cover && args.data.cover != null) {
		$.coverLink.image = args.data.cover;
	} else {
		$.coverLink.image = Alloy.Globals.SERVER + "/images/audioDefaultCover.jpg";
	}
	if (Alloy.Globals.checkAudioExist(args.data.fileName)) {
		isRemotePlay = false;
		// use Sound
		var file = Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder, args.data.fileName);
		player = Ti.Media.createSound({url: file.nativePath});
		Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
		// player.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK; 
		progressBar.max = player.duration;
		maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.duration));
		// ## update progress and time
		updateTime = setInterval(function() {
			if (player.playing) {
				currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.time / 1000));
				progressBar.value = player.time / 1000;
			}
		},500);
		
		// ## listen to drag event
		progressBar.addEventListener('stop', function(e) {
			currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(e.value));
			progressBar.value = e.value;
	    player.setTime(e.value * 1000);
		});
		
		// ## volume change on drag
		volumeProgress.addEventListener('stop', function(e) {
	    player.volume = e.value;
		});
	} else {
		isRemotePlay = true;
		player = Ti.Media.createAudioPlayer({ 
    	url: args.data.link,
    	allowBackground: true
		});
		progressBar.max = player.duration;
		maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(args.data.length));
		player.addEventListener('progress',function(e) {
			currentTimeLabel.text = Alloy.Globals.convertTime(parseInt(e.progress / 1000));
			progressBar.value = e.progress;
		});
		// use AudioPlayer to stream from server
	}
  $.audioPlayerWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
};

function closeWindow() {
	clearInterval(updateTime);
	if (player.playing) {
		player.stop();
	}
	if (new Date().getTime() - openTime >= openPopupAdTime) {
		revmob.showFullscreen();
		Alloy.Globals.readingCount = 0;
	}
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0.5);
	$.audioPlayerWindow.close({ transform: smallDown, duration:100 });
};

function eventPlay() {
		// audioPlayer.start();

	if (!player.playing) {
		playButton.backgroundImage = "/common/btn-pause.png";
		playButton.backgroundSelectedImage = "/common/btn-pause-pressed.png";
		if (isRemotePlay) {
			player.start();
		} else {
			player.play();
		}
	} else {
		playButton.backgroundImage = "/common/btn-play.png";
		playButton.backgroundSelectedImage = "/common/btn-play-active.png";
		player.pause();
	}
}

function eventMute() {
	if (player && player != null) {
		if (player.volume == 0) {
			player.volume = 1;
			volumeProgress.value = 1;
		} else {
			player.volume = 0;
			volumeProgress.value = 0;
		}

	} 
}
