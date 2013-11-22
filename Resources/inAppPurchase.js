function inAppPurchase() {}

var Storekit = require("ti.storekit");

Storekit.receiptVerificationSandbox = "production" !== Ti.App.deployType;

Storekit.receiptVerificationSharedSecret = "<YOUR STOREKIT SHARED SECRET HERE>";

Storekit.autoFinishTransactions = false;

Storekit.bundleVersion = "<YOUR APP BUNDLE VERSION>";

Storekit.bundleIdentifier = "<YOUR APP BUNDLE IDENTIFIER>";

var verifyingReceipts = false;

var purchaseUserId;

var purTime;

inAppPurchase.requestProduct = function(identifier, callback) {
    Storekit.requestProducts([ identifier ], function(evt) {
        evt.success ? evt.invalid ? alert("ERROR: We requested an invalid product!") : callback(evt.products[0]) : alert("ERROR: We failed to talk to Apple!");
    });
};

inAppPurchase.purchaseProduct = function(userId, product, pTime) {
    purchaseUserId = userId;
    purTime = pTime;
    Storekit.purchase({
        product: product
    });
};

Storekit.addEventListener("transactionState", function(evt) {
    switch (evt.state) {
      case Storekit.TRANSACTION_STATE_FAILED:
        evt.cancelled ? alert("Purchase cancelled") : alert("ERROR: Buying failed! " + evt.message);
        evt.transaction && evt.transaction.finish();
        break;

      case Storekit.TRANSACTION_STATE_PURCHASED:
        Ti.App.fireEvent("openScreen", {
            screenName: "storyAudioList"
        });
        Alloy.Globals.sendUnlockRequest("audio", purchaseUserId, purTime);
        evt.transaction && evt.transaction.finish();
        break;

      case Storekit.TRANSACTION_STATE_PURCHASING:
        Ti.API.info("Purchasing " + evt.productIdentifier);
        break;

      case Storekit.TRANSACTION_STATE_RESTORED:
        evt.transaction && evt.transaction.finish();
    }
});

Storekit.addTransactionObserver();