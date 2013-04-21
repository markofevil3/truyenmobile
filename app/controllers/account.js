exports.openMainWindow = function() {
	$.accountWindow.leftNavButton = Alloy.Globals.backButton($.accountWindow);
	var facebookButton = Alloy.Globals.facebook.createLoginButton({
		style: Ti.Facebook.BUTTON_STYLE_NORMAL,
	});
	$.accountWindow.add(facebookButton);
	Alloy.Globals.CURRENT_TAB.open($.accountWindow);
};