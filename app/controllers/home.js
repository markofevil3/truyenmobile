//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advertise.add(advImage);
	$.advertise.height = Alloy.Globals.getAdvHeight();
});

$.homeTab.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = $.homeTab;
});

log(Titanium.Filesystem.getTempDirectory());

function selectMenu(e) {
	if (e.rowData.dataName == "funnyList" || e.rowData.dataName == "storyList") {
		alert("Coming Soon!");
	} else {
		var selectedMenuController = Alloy.createController(e.rowData.dataName);
		selectedMenuController.openMainWindow();
	}
};