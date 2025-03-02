"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[9055],{

/***/ 19055:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n## CIRCOM ZKP Hash Checker WORKSPACE\n\nWelcome to the Remix Circom ZKP Hash Checker Workspace.\n\nThe workspace comprises two main directories:\n\n### circuits: Contains sample Hash Checker contracts. These can be compiled to generate a witness using 'Circom ZKP Compiler' plugin.\n\n### scripts: Provides a sample script designed for a trusted setup using snarkjs. This script also aids in generating Solidity code, which is essential for on-chain deployment. There have 2 scripts options to choose from, Groth16 and Plonk.\n\n### first steps:\n\n#### 1) compile the hash checker circuit using the remix circom compiler. This will generate artifacts.\n\n#### 2) execute the file `groth16_trusted_setup.ts` found in `scripts/groth16` directory:\n\nThis step generate a verification key that can be used for generating proof, it will also generate a Solidity contract for on-chain verification.\n\nNote that this section should only be used for development purposes as this way of running the setup is heavily centralized (although some pieces of this script can be used to achieve that).\n\nThis generates a verification key (`./zk/build/groth16/verification_key.json`) and a key for proof generation (`./zk/build/groth16/zkey_final.txt`).\n\n#### 3) execute the file `groth16_zkproof.ts` found in `scripts/groth16`:\n\nThis script:\n\n- generate a witness and a proof of execution. The input parameters of `snarkjs.wtns.calculate` are:\n\n\t- 4 values, that should remain private. We want to verify that we know a hash that satisfy these 4 values.\n\t- a hash, this is a public signal.\n\nThe witness will be generated only if the provided hash is the poseidon hash of these 4 values.\n\n- verify that the proof is valid `(snarkjs.groth16.verify)`\n\n#### The steps above for groth16 scripts apply also to plonk scripts.\n");

/***/ })

}]);
//# sourceMappingURL=9055.plugin-etherscan.1723117058823.js.map