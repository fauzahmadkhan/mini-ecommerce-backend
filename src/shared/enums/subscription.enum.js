"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatusEnum = void 0;
var SubscriptionStatusEnum;
(function (SubscriptionStatusEnum) {
    SubscriptionStatusEnum["PENDING"] = "Pending";
    SubscriptionStatusEnum["ACTIVE"] = "Active";
    SubscriptionStatusEnum["INCOMPLETE"] = "Incomplete";
    SubscriptionStatusEnum["INCOMPLETE_EXPIRED"] = "Incomplete expired";
    SubscriptionStatusEnum["PAST_DUE"] = "Past due";
    SubscriptionStatusEnum["UNPAID"] = "Unpaid";
    SubscriptionStatusEnum["PAUSED"] = "Paused";
    SubscriptionStatusEnum["CANCELED"] = "Canceled";
})(SubscriptionStatusEnum || (exports.SubscriptionStatusEnum = SubscriptionStatusEnum = {}));
