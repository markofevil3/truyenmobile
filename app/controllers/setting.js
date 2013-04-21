//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.adv.add(advImage);
});

$.settingTab.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = $.settingTab;
});

$.facebookLikeBox.url = Alloy.Globals.SERVER + '/facebook?type=' + Alloy.Globals.isTablet();
function selectMenu(e) {
	var selectedMenuController = Alloy.createController(e.rowData.id);
	selectedMenuController.openMainWindow();
};