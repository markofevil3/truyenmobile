exports.openMainWindow = function() {
	$.accountWindow.leftNavButton = Alloy.Globals.backButton($.accountWindow);
	var facebookButton = Alloy.Globals.facebook.createLoginButton({
		style: Alloy.Globals.facebook.BUTTON_STYLE_WIDE,
	});
	$.accountWindow.add(facebookButton);
	Alloy.Globals.CURRENT_TAB.open($.accountWindow);
};