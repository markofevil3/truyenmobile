function inAppPurchase() {};

var Storekit = require('ti.storekit');
 
Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');
Storekit.receiptVerificationSharedSecret = "<YOUR STOREKIT SHARED SECRET HERE>";
Storekit.autoFinishTransactions = false;
Storekit.bundleVersion = "<YOUR APP BUNDLE VERSION>"; // eg. "1.0.0"
Storekit.bundleIdentifier = "<YOUR APP BUNDLE IDENTIFIER>"; // eg. "com.appc.storekit"

var verifyingReceipts = false;
var purchaseUserId;
var purTime;

inAppPurchase.requestProduct = function(identifier, callback) {
	Storekit.requestProducts([identifier], function (evt) {
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
		}
		else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
		}
		else {
			callback(evt.products[0]);
		}
	});
};

inAppPurchase.purchaseProduct = function(userId, product, pTime) {
	// if (product.downloadable) {
		// Ti.API.info('Purchasing a product that is downloadable');
	// }
	purchaseUserId = userId;
	purTime = pTime;
	Storekit.purchase({
		product: product
		// applicationUsername is a opaque identifier for the user’s account on your system. 
		// Used by Apple to detect irregular activity. Should hash the username before setting.
		// applicationUsername: '<HASHED APPLICATION USERNAME>'
	});
};

Storekit.addEventListener('transactionState', function (evt) {
	switch (evt.state) {
		case Storekit.TRANSACTION_STATE_FAILED:
			if (evt.cancelled) {
				alert('Purchase cancelled');
			} else {
				alert('ERROR: Buying failed! ' + evt.message);
			}
			evt.transaction && evt.transaction.finish();
			break;
		case Storekit.TRANSACTION_STATE_PURCHASED:
			// markProductAsPurchased(evt.productIdentifier);
  		Ti.App.fireEvent('openScreen', {screenName: "storyAudioList"});
			Alloy.Globals.sendUnlockRequest("audio", purchaseUserId, purTime);
			evt.transaction && evt.transaction.finish();
			break;
		case Storekit.TRANSACTION_STATE_PURCHASING:
			Ti.API.info('Purchasing ' + evt.productIdentifier);
			break;
		case Storekit.TRANSACTION_STATE_RESTORED:
			evt.transaction && evt.transaction.finish();
			break;
	}
});

Storekit.addTransactionObserver();