var args = arguments[0] || {};
var updateTime;
var progressBar = $.audioProgress;
var currentTimeLabel = $.currentTimeLabel;
var maxTimeLabel = $.maxTimeLabel;
var playButton = $.playButton;
var player;
exports.openMainWindow = function() {
	//## ADVERTISE
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advView.add(advImage);
	});
	log("##111: " + Alloy.Globals.checkAudioExist("Vesang.mp3"));
	
	// progressBar.show();
	player = Ti.Media.createSound({url:"Vesang.mp3"});
	progressBar.max = player.duration;
	maxTimeLabel.text = Alloy.Globals.convertTime(parseInt(player.duration));
	// ## update progress and time
	updateTime = setInterval(function() {
		if (player.isPlaying()) {
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
	// console.log("### duration " + player.duration);
	// console.log(player.time);
  $.audioPlayerWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
};

function closeWindow() {
	clearInterval(updateTime);
	if (player.isPlaying()) {
		player.stop();
	}
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0.5);
	$.audioPlayerWindow.close({ transform: smallDown, duration:100 });
};

function eventPlay() {
	if (!player.isPlaying()) {
		playButton.backgroundImage = "/common/btn-pause.png";
		playButton.backgroundSelectedImage = "/common/btn-pause-pressed.png";
		player.play();
	} else {
		playButton.backgroundImage = "/common/btn-play.png";
		playButton.backgroundSelectedImage = "/common/btn-play-active.png";
		player.pause();
	}
}

function eventStop() {
	
}
