"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpersService = void 0;
var common_1 = require("@nestjs/common");
var AWS = require("aws-sdk");
var dotenv = require("dotenv");
var sharp = require("sharp");
dotenv.config();
var HelpersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HelpersService = _classThis = /** @class */ (function () {
        function HelpersService_1() {
            this.bucketName = "".concat(process.env.EBS_S3_BUCKET_NAME);
            AWS.config.update({
                accessKeyId: "".concat(process.env.LAPONA_IAM_ACCESS_KEY),
                secretAccessKey: "".concat(process.env.LAPONA_IAM_SECRET_ACCESS_KEY),
                region: "".concat(process.env.EBS_S3_BUCKET_REGION),
            });
            this.s3 = new AWS.S3();
        }
        HelpersService_1.prototype.uploadFileToS3Bucket = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var fileName, originalName, uploadParams, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log('in uploadFileToS3Bucket', file);
                            fileName = file.originalname.split('-')[0];
                            originalName = file.originalname.replace(/\s+/g, '_');
                            console.log('originalName', originalName);
                            uploadParams = {
                                Bucket: this.bucketName,
                                Body: file.buffer,
                                Key: "".concat(process.env.UPLOADS_DIRECTORY, "/").concat(originalName),
                                ContentType: file.mimetype,
                                ContentDisposition: 'inline',
                            };
                            return [4 /*yield*/, this.s3.upload(uploadParams).promise()];
                        case 1:
                            response = _a.sent();
                            console.log('file response', response);
                            console.log('file.buffer', file.buffer);
                            if (response === null || response === void 0 ? void 0 : response.Location) {
                                return [2 /*return*/, response.Location];
                            }
                            return [2 /*return*/, null];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, error_1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        HelpersService_1.prototype.uploadContentToS3Bucket = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var originalName, uploadParams, response, error_2;
                var keyName = _b.keyName, mimeType = _b.mimeType, content = _b.content;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            originalName = keyName.replace(/\s+/g, '_');
                            console.log('originalName', originalName);
                            uploadParams = {
                                Bucket: this.bucketName,
                                Body: content,
                                Key: originalName,
                                ContentType: mimeType,
                                ContentDisposition: 'inline',
                            };
                            return [4 /*yield*/, this.s3.upload(uploadParams).promise()];
                        case 1:
                            response = _c.sent();
                            console.log('file response', response);
                            if (response === null || response === void 0 ? void 0 : response.Location) {
                                return [2 /*return*/, response.Location];
                            }
                            return [2 /*return*/, null];
                        case 2:
                            error_2 = _c.sent();
                            return [2 /*return*/, error_2];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        HelpersService_1.prototype.deleteFileFromS3Bucket = function (urls) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, urls_1, url, tokenize, s3FileKey, deleteParams, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            _i = 0, urls_1 = urls;
                            _a.label = 1;
                        case 1:
                            if (!(_i < urls_1.length)) return [3 /*break*/, 4];
                            url = urls_1[_i];
                            tokenize = url.split('/');
                            if (!(tokenize.length > 0)) return [3 /*break*/, 3];
                            s3FileKey = tokenize[tokenize.length - 1];
                            deleteParams = {
                                Bucket: this.bucketName,
                                Key: "".concat(s3FileKey),
                            };
                            return [4 /*yield*/, this.s3.deleteObject(deleteParams).promise()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_3 = _a.sent();
                            console.log('deleteFileFromS3Bucket error', error_3);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        HelpersService_1.prototype.uploadImageBase64ToS3Bucket = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var size, type, originalName, base64Data, buffer, uploadParams, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            size = file.size;
                            type = file.type;
                            originalName = file.name.replace(/\s+/g, '_');
                            base64Data = file.content.replace(/^data:.+;base64,/, '');
                            buffer = Buffer.from(base64Data, 'base64');
                            if (!(size > 1024 * 1024)) return [3 /*break*/, 4];
                            if (!(type === 'image/jpeg' || type === 'image/jpg')) return [3 /*break*/, 2];
                            return [4 /*yield*/, sharp(buffer)
                                    .resize({ width: 692 }) // Resize if needed
                                    .jpeg({ quality: 80 }) // Compress JPEG
                                    .toBuffer()];
                        case 1:
                            buffer = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, sharp(buffer)
                                .resize({ width: 692 }) // Resize if needed
                                .png({ compressionLevel: 9 }) // Compress PNG
                                .toBuffer()];
                        case 3:
                            buffer = _a.sent();
                            _a.label = 4;
                        case 4:
                            console.log('buffer', buffer);
                            uploadParams = {
                                Bucket: this.bucketName,
                                Body: buffer,
                                Key: "".concat(process.env.UPLOADS_DIRECTORY, "/").concat(originalName),
                                ContentType: type,
                                ContentDisposition: 'inline',
                            };
                            return [2 /*return*/, this.s3.upload(uploadParams).promise()];
                        case 5:
                            error_4 = _a.sent();
                            console.log('uploadImageBase64ToS3Bucket error', error_4);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return HelpersService_1;
    }());
    __setFunctionName(_classThis, "HelpersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelpersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelpersService = _classThis;
}();
exports.HelpersService = HelpersService;
