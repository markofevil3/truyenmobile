Titanium.App.addEventListener('pause', function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory);
	var list = f.getDirectoryListing();
	for (var i = 0; i < list.length; i++) {
		Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory+list[i]).deleteFile();
	}
});
var overrideTabs = require('IosCustomTabBar');
overrideTabs(
  $.tabGroup, // The tab group
  { backgroundImage: '/common/top.png' }, // View parameters for the background
  { backgroundImage: '/common/top-active.png', backgroundColor: 'transparent', color: '#000', style: 0 }, // View parameters for selected tabs 
  { backgroundImage: '/common/top.png', backgroundColor: 'transparent', color: '#888', style: 0 } // View parameters for deselected tabs
);
Alloy.Globals.TAB_GROUP = $.tapGroup;
$.tabGroup.open();
