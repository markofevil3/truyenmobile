exports.openMainWindow = function() {
	$.versionLabel.text = 'Version ' + 	Titanium.App.version;
	$.aboutUsWindow.leftNavButton = Alloy.Globals.backButton($.aboutUsWindow);
	Alloy.Globals.CURRENT_TAB.open($.aboutUsWindow);
};