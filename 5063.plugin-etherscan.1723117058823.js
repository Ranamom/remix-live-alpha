"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5063],{

/***/ 5063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("pragma circom 2.1.0;\n\ninclude \"circomlib/circuits/poseidon.circom\";\ninclude \"circomlib/circuits/mux1.circom\";\ninclude \"circomlib/circuits/bitify.circom\";\ninclude \"circomlib/circuits/comparators.circom\";\n\ntemplate MerkleTreeInclusionProof(DEPTH) {\n    signal input leaf;\n    signal input pathIndex[DEPTH];\n    signal input pathElements[DEPTH];\n\n    signal output root;\n\n    signal mux[DEPTH][2];\n    signal levelHashes[DEPTH + 1];\n    \n    levelHashes[0] <== leaf;\n    for (var i = 0; i < DEPTH; i++) {\n        pathIndex[i] * (pathIndex[i] - 1) === 0;\n\n        mux[i] <== MultiMux1(2)(\n            [\n                [levelHashes[i], pathElements[i]], \n                [pathElements[i], levelHashes[i]]\n            ], \n            pathIndex[i]\n        );\n\n        levelHashes[i + 1] <== Poseidon(2)([mux[i][0], mux[i][1]]);\n    }\n\n    root <== levelHashes[DEPTH];\n}\n\ntemplate RangeCheck(LIMIT_BIT_SIZE) {\n    assert(LIMIT_BIT_SIZE < 253);\n\n    signal input messageId;\n    signal input limit;\n\n    signal bitCheck[LIMIT_BIT_SIZE] <== Num2Bits(LIMIT_BIT_SIZE)(messageId);\n    signal rangeCheck <== LessThan(LIMIT_BIT_SIZE)([messageId, limit]);\n    rangeCheck === 1;\n}");

/***/ })

}]);
//# sourceMappingURL=5063.plugin-etherscan.1723117058823.js.map