var args = arguments[0] || {};
var webview = $.webview;
var openTime = new Date().getTime();
var openPopupAdTime = 30000; // millisecond
exports.openMainWindow = function() {
	Alloy.Globals.adv(3, function(advImage) {
		$.advView.add(advImage);
		$.advView.height = Alloy.Globals.getAdvHeight();
	});
	// $.contentLabel.value = args.content;
	webview.url = "storyReading.html";
	// webview.setHtml('<html><body><div id="content">' + args.content + '</div></body></html>');
	webview.addEventListener('load',function(e) {
		Ti.App.fireEvent('setContent', {message: args.content });
		$.slider.setValue(Alloy.Globals.readingFontSize);
		// changeTextSize({value: Alloy.Globals.readingFontSize});
	});
	webview.bottom = Alloy.Globals.getAdvHeight();	
  if (Alloy.Globals.getOSType() == "iPhone OS") {
    $.storyReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
  } else {
    $.storyReadingWindow.open();
  }
  SaveReadingChapter();
};

function closeWindow() {
	if (new Date().getTime() - openTime >= openPopupAdTime) {
		Alloy.Globals.readingCount++;
		if (Alloy.Globals.readingCount % Alloy.Globals.popupAdNumb == 0) {
			revmob.showFullscreen();
			Alloy.Globals.readingCount = 0;
		}
	}
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.storyReadingWindow.close({ transform: smallDown, duration:300 });
};

function changeTextSize(e) {
	Alloy.Globals.readingFontSize = e.value;
	Ti.App.fireEvent('changeFont', {message: Alloy.Globals.readingFontSize });
};

function SaveReadingChapter() {
	Alloy.Globals.readingChapters[args.storyId] = args.title;
};
