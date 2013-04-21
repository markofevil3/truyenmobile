function overrideTabs(tabGroup, backgroundOptions, selectedOptions, deselectedOptions) {
    deselectedOptions.top = deselectedOptions.bottom = selectedOptions.top = selectedOptions.bottom = backgroundOptions.left = backgroundOptions.right = backgroundOptions.bottom = 0;
    backgroundOptions.height = 50;
    var background = Ti.UI.createView(backgroundOptions);
    background.touchEnabled = false;
    var increment = 100 / tabGroup.tabs.length;
    deselectedOptions.width = selectedOptions.width = Alloy.Globals.isTablet() ? 100 / 9 + "%" : increment + "%";
    for (var i = 0, l = tabGroup.tabs.length; l > i; i++) {
        var tab = tabGroup.tabs[i];
        selectedOptions.left = deselectedOptions.left = Alloy.Globals.isTablet() ? 300 / 9 - 3 + (100 / 9 + 3) * i + "%" : increment * i + "%";
        selectedOptions.title = deselectedOptions.title = tab.title;
        selectedOptions.height = deselectedOptions.height = 50;
        tab.backgroundImage && (selectedOptions.backgroundImage = deselectedOptions.backgroundImage = tab.backgroundImage);
        tab.selectedBackgroundImage && (selectedOptions.backgroundImage = tab.selectedBackgroundImage);
        tab.deselectedBackgroundImage && (deselectedOptions.backgroundImage = tab.deselectedBackgroundImage);
        selectedOptions.visible = false;
        var iconBtn1 = Ti.UI.createImageView({
            image: tab.icon,
            height: 30,
            width: 30
        });
        var iconBtn2 = Ti.UI.createImageView({
            image: tab.icon,
            height: 30,
            width: 30
        });
        tab.deselected = Ti.UI.createButton(deselectedOptions);
        tab.selected = Ti.UI.createButton(selectedOptions);
        tab.selected.add(iconBtn1);
        tab.deselected.add(iconBtn2);
        background.add(tab.deselected);
        background.add(tab.selected);
        Titanium.Gesture.addEventListener("orientationchange", function() {
            switch (Titanium.Gesture.orientation) {
              case Titanium.UI.LANDSCAPE_LEFT:
              case Titanium.UI.LANDSCAPE_RIGHT:
                background.width = "100%";
                break;

              case Titanium.UI.PORTRAIT:
              case Titanium.UI.UPSIDE_PORTRAIT:
                background.width = "100%";
            }
        });
    }
    tabGroup.overrideTabs ? tabGroup.remove(tabGroup.overrideTabs) : tabGroup.addEventListener("focus", overrideFocusTab);
    tabGroup.add(background);
    tabGroup.overrideTabs = background;
}

function overrideFocusTab(evt) {
    evt.previousIndex >= 0 && (evt.source.tabs[evt.previousIndex].selected.visible = false);
    evt.tab.selected.visible = true;
}

module.exports = overrideTabs;