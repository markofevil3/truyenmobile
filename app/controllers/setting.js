//## ADVERTISE
var adview = $.adv;
for (var d in adview.children) {
  adview.remove(adview.children[d]);
}
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	adview.add(advImage);
});

$.settingTab.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = $.settingTab;
	$.facebookLikeBox.url = Alloy.Globals.SERVER + '/facebook?type=' + Alloy.Globals.getDeviceType();
});
function selectMenu(e) {
	var selectedMenuController = Alloy.createController(e.rowData.id);
	selectedMenuController.openMainWindow();
};