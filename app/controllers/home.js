//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advertise.add(advImage);
});

$.homeTab.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = $.homeTab;
});

log(Titanium.Filesystem.getTempDirectory());

function selectMenu(e) {
	if (e.rowData.dataName == "funnyList") {
		alert("Coming Soon!");
	} else {
		var selectedMenuController = Alloy.createController(e.rowData.dataName);
		selectedMenuController.openMainWindow();
	}
};