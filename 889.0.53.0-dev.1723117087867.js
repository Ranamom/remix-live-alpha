"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[889],{50889:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="import sindriClient from 'sindri'\nimport type { CircuitInfoResponse, ProofInfoResponse } from 'sindri'\n\nsindriClient.logLevel = 'info'\n\nconst authorize = async () => {\n  try {\n    const apiKey = await remix.call('settings', 'get', 'settings/sindri-access-token')\n    if (!apiKey) {\n      throw new Error('Missing API key.')\n    }\n    sindriClient.authorize({ apiKey })\n  } catch {\n    const message = 'No Sindri API key found. Please click the gear in the lower left corner to open the settings page, and add your API key under \"Sindri Credentials\".'\n    await remix.call('notification', 'toast', message)\n    throw new Error(message)\n  }\n}\n\nconst getSindriManifest = async () => {\n  const sindriJson = await remix.call('fileManager', 'readFile', `sindri.json`)\n  return JSON.parse(sindriJson)\n}\n\nconst normalizePath = (path: string): string => {\n  while (path.startsWith('/') || path.startsWith('./')) {\n    path = path.replace(/^(\\.\\/|\\/)/, '')\n  }\n  return path\n}\n\n/**\n * Compile the circuit.\n *\n * @param {string | string[] | null} tags - The tag or tags to use when compiling the circuit.\n * @returns {CircuitInfoResponse} compiled circuit\n */\nexport const compile = async (tags: string | string[] | null = ['latest']): CircuitInfoResponse => {\n  await authorize()\n  const sindriManifest = await getSindriManifest()\n\n  // Create a map from file paths to `File` objects for (almost) all files in the workspace.\n  // We exclude `.deps/` files because these are resolved to more intuitive locations so they can\n  // be used by the circuit without specifying a complex import path. We'll merge the dependencies\n  // into the files at their expected import paths in a later step.\n  const excludeRegex = /^\\.deps\\//\n  const filesByPath: {[path: string]: File} = {}\n  interface Workspace {\n    children?: Workspace\n    content?: string\n  }\n  const workspace: Workspace = await remix.call('fileManager', 'copyFolderToJson', '/')\n  const childQueue: Array<[string, Workspace]> = Object.entries(workspace)\n  while (childQueue.length > 0) {\n    const [path, child] = childQueue.pop()\n    if ('content' in child && !excludeRegex.test(path)) {\n      filesByPath[path] = new File([child.content], path)\n    }\n    if ('children' in child) {\n      childQueue.push(...Object.entries(child.children))\n    }\n  }\n\n  // Merge any of the circuit's resolved dependencies into the files at their expected import paths.\n  if (sindriManifest.circuitType === 'circom') {\n    const circuitPath = normalizePath(sindriManifest.circuitPath || 'circuit.circom')\n    let circuitContent: string\n    try {\n      circuitContent = await remix.call('fileManager', 'readFile', circuitPath)\n    } catch (error) {\n      console.error(`No circuit file found at \"${circuitPath}\", try setting \"circuitPath\" in \"sindri.json\".`)\n    }\n    const dependencies: {[path: string]: string} = await remix.call('circuit-compiler' as any, 'resolveDependencies', circuitPath, circuitContent)\n    Object.entries(dependencies).forEach(([rawPath, rawContent]) => {\n      // Convert absolute file paths to paths relative to the project root.\n      const path = normalizePath(rawPath)\n      // Removes any leading `/`s from Circom `include` paths to make them relative to the root.\n      const content = path.endsWith('.circom') ? rawContent.replace(/^\\s*include\\s+\"\\/+([^\"]+)\"\\s*;\\s*$/gm, 'include \"$1\";') : rawContent\n      filesByPath[path] = new File([content], path)\n    })\n  }\n\n  console.log(`Compiling circuit \"${sindriManifest.name}\"...`)\n  const files = Object.values(filesByPath)\n  try {\n    const circuitResponse = await sindriClient.createCircuit(files, tags)\n    if (circuitResponse.status === 'Ready') {\n      console.log(`Circuit compiled successfully, circuit id: ${circuitResponse.circuit_id}`)\n    } else {\n      console.error('Circuit compilation failed:', circuitResponse.error || 'Unknown error')\n    }\n    return circuitResponse\n  } catch (error) {\n    if ('status' in error && error.status === 401) {\n      const message = 'Sindri API key authentication failed, please check that your key is correct in the settings.'\n      console.error(message)\n      throw new Error(message)\n    } else {\n      console.error('Unknown error occurred.')\n      throw error\n    }\n  }\n}\n\n/**\n * Generate a proof against the circuit.\n *\n * @param {Object} signals - Input signals for the circuit.\n * @returns {ProofInfoResponse} The generated proof.\n */\nexport const prove = async (signals: {[id: string]: number | string}): ProofInfoResponse => {\n  await authorize()\n  const sindriManifest = await getSindriManifest()\n\n  const circuitName = sindriManifest.name\n  console.log(`Proving circuit \"${circuitName}\"...`)\n  try {\n    const proofResponse = await sindriClient.proveCircuit(circuitName, JSON.stringify(signals))\n    if (proofResponse.status === 'Ready') {\n      console.log(`Proof generated successfully, proof id: ${proofResponse.proof_id}`)\n    } else {\n      console.error('Proof generation failed:', proofResponse.error || 'Unknown error')\n    }\n    return proofResponse\n  } catch (error) {\n    if ('status' in error && error.status === 401) {\n      const message = 'Sindri API key authentication failed, please check that your key is correct in the settings.'\n      console.error(message)\n      throw new Error(message)\n    } else if ('status' in error && error.status === 404) {\n      const message = `No compiled circuit \"${circuitName}\" found, have you successfully compiled the circuit?`\n      console.error(message)\n      throw new Error(message)\n    } else {\n      console.error('Unknown error occurred.')\n      throw error\n    }\n  }\n}\n"}}]);
//# sourceMappingURL=889.0.53.0-dev.1723117087867.js.map