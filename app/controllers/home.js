var homeTab = $.homeTab;
function selectMenu(e) {
	// if (e.rowData.dataName == "funnyList" || e.rowData.dataName == "storyAudioList") {
	if (e.rowData.dataName == "funnyList") {
		alert("Coming Soon!");
	} else {
		var selectedMenuController = Alloy.createController(e.rowData.dataName);
		selectedMenuController.openMainWindow();
	}
};

function appStart() {
	Alloy.Globals.getAjax('/appVersion', {
	'null': null
	},
	function(response) {
		if (response == undefined) {
			alert("Không có kết nối Internet!");
			return;
		}
		var data = JSON.parse(response);
		Alloy.Globals.setAdmobPublisher(data.advPublisher, data.admobPublisher);
		Alloy.Globals.FBPOST_LINK = data.facebookPostLink;
		if (data.error || data.version == Titanium.App.version.toString()) {
			if (Alloy.Globals.getOSType() == "iPhone OS") {
				if (data.iosLink != undefined) {
					Alloy.Globals.FBPOST_LINK = data.iosLink;
				}
			} else {
				if (data.androidLink != undefined) {
					Alloy.Globals.FBPOST_LINK = data.androidLink;
				}
			}
			startHome();
		} else {
			// update app
			var dialog;
			if (data.force) {
				dialog = Ti.UI.createAlertDialog({
			    message: 'Có phiên bản mới!!!',
			    buttonNames: ['Nâng Cấp',],
			    title: 'Nâng Cấp'
				});
			  dialog.show();
	      dialog.addEventListener('click', function(e){
	    		openStoreLink(data);
		  	});
			} else {
			  dialog = Ti.UI.createAlertDialog({
			    cancel: 0,
			    buttonNames: ['Bỏ Qua', 'Nâng Cấp'],
			    message: 'Có phiên bản mới!!!',
			    title: 'Nâng Cấp'
			  });
			  dialog.show();
			}
	    dialog.addEventListener('click', function(e){
	    	if (e.index == 1) {
	    		openStoreLink(data);
	    	} else {
	    		startHome();
	    	}
	  	});
		}
	});
};

function openStoreLink(data) {
	if (Alloy.Globals.getOSType() == "iPhone OS") {
		Ti.Platform.openURL(data.iosLink);
	} else {
		Ti.Platform.openURL(data.androidLink);
	}
};

function startHome() {
	//## ADVERTISE
	var adview = $.advertise;
	for (var d in adview.children) {
    adview.remove(adview.children[d]);
	}
	Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
		$.advertise.add(advImage);
		$.advertise.height = Alloy.Globals.getAdvHeight();
	});
};
appStart();
homeTab.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = homeTab;
	// appStart();
});
Ti.App.addEventListener('app:reload', function(e) {
	Alloy.Globals.CURRENT_TAB = homeTab;
	appStart();
});