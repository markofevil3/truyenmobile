var overrideTabs = require('IosCustomTabBar');
overrideTabs(
  $.tabGroup, // The tab group
  { backgroundImage: '/common/top.png' }, // View parameters for the background
  { backgroundImage: '/common/top-active.png', backgroundColor: 'transparent', color: '#000', style: 0 }, // View parameters for selected tabs 
  { backgroundImage: '/common/top.png', backgroundColor: 'transparent', color: '#888', style: 0 } // View parameters for deselected tabs
);
Alloy.Globals.TAB_GROUP = $.tapGroup;
$.tabGroup.open();
