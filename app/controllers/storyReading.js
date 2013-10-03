var args = arguments[0] || {};

exports.openMainWindow = function() {
	$.contentLabel.value = args.content;
  if (Alloy.Globals.getOSType() == "iPhone OS") {
    $.storyReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
  } else {
    $.storyReadingWindow.open();
  }
};

function closeWindow() {
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.storyReadingWindow.close({ transform: smallDown, duration:300 });
};

function changeTextSize(e) {
	var ratio = Alloy.Globals.isTablet() ? 1.8 : 1;
	if (e.source.dataType == '0') {
		$.contentLabel.font = { fontSize: 18 * ratio };
	} else {
		$.contentLabel.font = { fontSize: 22 * ratio };
	}
};
