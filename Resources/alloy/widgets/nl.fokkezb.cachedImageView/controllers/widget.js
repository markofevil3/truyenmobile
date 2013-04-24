function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.cachedImageView/" + s : s.substring(0, index) + "/nl.fokkezb.cachedImageView/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function init(args) {
        function saveImage() {
            $.imageView.removeEventListener("load", saveImage);
            savedFile.write(Ti.UI.createImageView({
                image: $.imageView.image,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            }).toImage());
        }
        if (true && args.cacheHires && "high" === Ti.Platform.displayCaps.density) {
            args.image = args.cacheHires;
            args.hires = true;
        }
        if (args.image && Ti.Platform.canOpenURL(args.image)) {
            args.cacheName || (args.cacheName = Ti.Utils.md5HexDigest(args.image));
            args.hires && (args.cacheName = args.cacheName + "@2x");
            if (!args.cacheExtension) {
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(args.image)[1];
                args.cacheExtension = ext ? ext : "";
            }
            var savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.cacheName + "." + args.cacheExtension);
            var saveFile = true;
            if (savedFile.exists()) {
                args.image = savedFile;
                saveFile = false;
            }
        } else {
            delete args.image;
            saveFile = false;
        }
        delete args.id;
        delete args.cacheName;
        delete args.cacheExtension;
        delete args.cacheHires;
        delete args.$model;
        $.imageView.applyProperties(args);
        true === saveFile && $.imageView.addEventListener("load", saveImage);
    }
    new (require("alloy/widget"))("nl.fokkezb.cachedImageView");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.imageView = Ti.UI.createImageView({
        id: "imageView"
    });
    $.__views.imageView && $.addTopLevelView($.__views.imageView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    _.size(args) > 0 && init(args);
    exports.init = init;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;