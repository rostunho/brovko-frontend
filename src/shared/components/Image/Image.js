"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Image = ({ imageURL, imageAlt, imageHeight, imageWidth, }) => {
    return (react_1.default.createElement("img", { src: imageURL, alt: imageAlt, height: imageHeight, width: imageWidth }));
};
exports.default = Image;
//# sourceMappingURL=Image.js.map