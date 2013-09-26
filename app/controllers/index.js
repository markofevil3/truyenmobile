function appPause() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory);
	var list = f.getDirectoryListing();
	for (var i = 0; i < list.length; i++) {
		Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory+list[i]).deleteFile();
	}
	Ti.App.Properties.setInt('pausedTime', new Date().getTime());
};

function appResume() {
	var pausedTime = Ti.App.Properties.getInt('pausedTime');
	if (new Date().getTime() - pausedTime > 10800000) {
		var indexController = Alloy.createController('index');
		indexController.openMainWindow();	}
};

Titanium.App.addEventListener('pause', function() {
	appPause();
});

Ti.App.addEventListener('resumed', function (e) {
	appResume();
});


exports.openMainWindow = function() {
	appStart();
};

function appStart() {
	Alloy.Globals.getAjax('/appVersion', {
	'null': null
	},
	function(response) {
		if (response == undefined) {
			alert("Không có kết nối Internet!");
		}
		var data = JSON.parse(response);
	
		if (data.error || data.version == Titanium.App.version) {
			if (Alloy.Globals.getOSType() == "iPhone OS") {
				if (data.iosLink != undefined) {
					Alloy.Globals.FBPOST_LINK = data.iosLink;
				}
			} else {
				if (data.androidLink != undefined) {
					Alloy.Globals.FBPOST_LINK = data.androidLink;
				}
			}
			startApp();
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
	    		openStoreLink(response);
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
	    		openStoreLink(response);
	    	} else {
	    		startApp();
	    	}
	  	});
		}
	});
};

appStart();

function openStoreLink(data) {
	if (Alloy.Globals.getOSType() == "iPhone OS") {
		Ti.Platform.openURL(data.iosLink);
	} else {
		Ti.Platform.openURL(data.androidLink);
	}
};

function startApp() {
	var overrideTabs = require('IosCustomTabBar');
	overrideTabs(
	  $.tabGroup, // The tab group
	  { backgroundImage: '/common/top.png' }, // View parameters for the background
	  { backgroundImage: '/common/top-active.png', backgroundColor: 'transparent', color: '#000', style: 0 }, // View parameters for selected tabs 
	  { backgroundImage: '/common/top.png', backgroundColor: 'transparent', color: '#888', style: 0 } // View parameters for deselected tabs
	);
	Alloy.Globals.TAB_GROUP = $.tapGroup;
	$.tabGroup.open();
}
