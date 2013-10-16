var args = arguments[0] || {};

exports.openMainWindow = function() {
  $.audioPlayerWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
};

function closeWindow() {
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0.5);
	$.audioPlayerWindow.close({ transform: smallDown, duration:100 });
};