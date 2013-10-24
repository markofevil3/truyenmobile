var tabGroup = $.tabGroup;
function appPause() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory);
	var list = f.getDirectoryListing();
	for (var i = 0; i < list.length; i++) {
		Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory+list[i]).deleteFile();
	}
	Alloy.Globals.saveUserData();
	Ti.App.Properties.setDouble('pausedTime', new Date().getTime());
};

function appResume() {
	var pausedTime = Ti.App.Properties.getDouble('pausedTime');
	if (new Date().getTime() - pausedTime > 10800000) {
		tabGroup.setActiveTab(0);
		for (var i = 0; i < Alloy.Globals.homeWindowStack.length; i++) {
			Alloy.Globals.homeWindowStack[i].close();
		}
	}
};

function startApp() {
	createAudioFolder();
	Ti.App.addEventListener('pause', appPause);
	Ti.App.addEventListener('resumed', appResume);
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'userData.txt');
	var content = f.read();
	if (content != undefined && content != null && content != "") {
		Alloy.Globals.readingChapters = JSON.parse(content.text);
	}
  if (Alloy.Globals.getOSType() == "iPhone OS") {
    var overrideTabs = require('IosCustomTabBar');
    overrideTabs(
      $.tabGroup, // The tab group
      { backgroundImage: '/common/top.png' }, // View parameters for the background
      { backgroundImage: '/common/top-active.png', backgroundColor: 'transparent', color: '#000', style: 0 }, // View parameters for selected tabs 
      { backgroundImage: '/common/top.png', backgroundColor: 'transparent', color: '#888', style: 0 } // View parameters for deselected tabs
    );
  }
	Alloy.Globals.TAB_GROUP = $.tapGroup;
	$.tabGroup.open();
}

function createAudioFolder() {
	var dir=Titanium.Filesystem.applicationDataDirectory +'/audioData';
  var folder =Titanium.Filesystem.getFile(dir);
  if(!folder.exists()){
    folder.createDirectory(); 
  }
}
startApp();
