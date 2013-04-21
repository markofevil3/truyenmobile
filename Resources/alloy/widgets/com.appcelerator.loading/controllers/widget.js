function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.loading/" + s : s.substring(0, index) + "/com.appcelerator.loading/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.appcelerator.loading");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.loading = Ti.UI.createImageView({
        height: 20,
        width: 20,
        images: [ "/images/com.appcelerator.loading/00.png", "/images/com.appcelerator.loading/01.png", "/images/com.appcelerator.loading/02.png", "/images/com.appcelerator.loading/03.png", "/images/com.appcelerator.loading/04.png", "/images/com.appcelerator.loading/05.png", "/images/com.appcelerator.loading/06.png", "/images/com.appcelerator.loading/07.png", "/images/com.appcelerator.loading/08.png", "/images/com.appcelerator.loading/09.png", "/images/com.appcelerator.loading/10.png", "/images/com.appcelerator.loading/11.png" ],
        id: "loading"
    });
    $.__views.loading && $.addTopLevelView($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    for (var k in args) $.loading[k] = args[k];
    "mobileweb" === Ti.Platform.osname && ($.loading.duration = 100);
    $.loading.start();
    exports.setOpacity = function(opacity) {
        $.loading.opacity = opacity;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;