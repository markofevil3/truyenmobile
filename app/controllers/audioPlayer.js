var args = arguments[0] || {};
var updateTime;
var progressBar = $.audioProgress;
var player;
exports.openMainWindow = function() {
	//## ADVERTISE
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advView.add(advImage);
	});
	log("##111: " + Alloy.Globals.checkAudioExist("Vesang.mp3"));
	
	progressBar.show();
	player = Ti.Media.createSound({url:"Vesang.mp3"});
	player.play();
	progressBar.max = player.duration;
	updateTime = setInterval(function() {
		if (player.isPlaying()) {
			progressBar.value = player.time / 1000;
		}
	},500);
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