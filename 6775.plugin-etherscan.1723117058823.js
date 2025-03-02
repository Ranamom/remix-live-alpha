"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[6775],{

/***/ 6775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// SPDX-License-Identifier: GPL-3.0\n\npragma solidity ^0.5.9;\n\nimport \"@0x/contracts-erc20/contracts/src/ERC20Token.sol\";\n\n/**\n * @title SampleERC20\n * @dev Create a sample ERC20 standard token\n */\ncontract SampleERC20 is ERC20Token {\n\n    string public name;\n    string public symbol;\n    uint256 public decimals;\n\n    constructor (\n        string memory _name,\n        string memory _symbol,\n        uint256 _decimals,\n        uint256 _totalSupply\n    )\n        public\n    {\n        name = _name;\n        symbol = _symbol;\n        decimals = _decimals;\n        _totalSupply = _totalSupply;\n        balances[msg.sender] = _totalSupply;\n    }\n}");

/***/ })

}]);
//# sourceMappingURL=6775.plugin-etherscan.1723117058823.js.map