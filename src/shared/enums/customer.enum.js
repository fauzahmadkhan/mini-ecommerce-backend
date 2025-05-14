"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialProviderEnum = exports.VerificationTypeEnum = exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ACTIVE"] = "Active";
    StatusEnum["SUSPENDED"] = "Suspended";
    StatusEnum["INACTIVE"] = "Inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var VerificationTypeEnum;
(function (VerificationTypeEnum) {
    VerificationTypeEnum["isEmailVerification"] = "isEmailVerification";
    VerificationTypeEnum["isPasswordVerification"] = "isPasswordVerification";
})(VerificationTypeEnum || (exports.VerificationTypeEnum = VerificationTypeEnum = {}));
var SocialProviderEnum;
(function (SocialProviderEnum) {
    SocialProviderEnum["FACEBOOK"] = "FACEBOOK";
    SocialProviderEnum["APPLE_ID"] = "APPLE_ID";
})(SocialProviderEnum || (exports.SocialProviderEnum = SocialProviderEnum = {}));
