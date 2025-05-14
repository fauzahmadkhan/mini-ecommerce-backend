"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedTransactionReasonEnum = exports.TransactionStatusEnum = void 0;
var TransactionStatusEnum;
(function (TransactionStatusEnum) {
    TransactionStatusEnum["SUCCEEDED"] = "Succeeded";
    TransactionStatusEnum["FAILED"] = "Failed";
})(TransactionStatusEnum || (exports.TransactionStatusEnum = TransactionStatusEnum = {}));
var FailedTransactionReasonEnum;
(function (FailedTransactionReasonEnum) {
    FailedTransactionReasonEnum[FailedTransactionReasonEnum["NULL"] = null] = "NULL";
    FailedTransactionReasonEnum["PAYMENT_METHOD_NOT_FOUND"] = "Payment method on Stripe not found.";
    FailedTransactionReasonEnum["PAYMENT_INTENT_CREATION_ERROR"] = "Payment intent created unsuccessfully.";
    FailedTransactionReasonEnum["PAYMENT_INTENT_CONFIRMATION_ERROR"] = "Payment intent confirmed unsuccessfully.";
    FailedTransactionReasonEnum["LAPONA_PLAN_NOT_FOUND"] = "Lapona plan against planId not found.";
    FailedTransactionReasonEnum["STRIPE_CUSTOMER_NOT_FOUND"] = "Stripe customer against sCustomerId not found.";
})(FailedTransactionReasonEnum || (exports.FailedTransactionReasonEnum = FailedTransactionReasonEnum = {}));
