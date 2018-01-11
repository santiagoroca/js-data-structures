var JStandard =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateJStandard"];
/******/ 	window["webpackHotUpdateJStandard"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4b7ed02ae10fdab10068"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/built/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(5)(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CircularBuffer = __webpack_require__(2);
const Stack = __webpack_require__(3);

class Node {

	constructor(value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._size = false;
	}

	isDirty() {
		this._size = false;
	}

	size() {
		if (!this._size) {
			this._size = 1 + (this.left ? this.left.size() : 0) + (this.right ? this.right.size() : 0);
		}

		return this._size;
	}

}

const ITERATORS = [function* preorder(node) {
	if (!node) {
		return;
	}

	const stack = new Stack();
	stack.push(node);

	while (!stack.empty()) {
		let current = stack.peek();
		stack.pop();

		yield current;

		if (current.right) {
			stack.push(current.right);
		}

		if (current.left) {
			stack.push(current.left);
		}
	}
}, function* inorder(node) {
	if (!node) {
		return;
	}

	yield* inorder(node.left);
	yield node;
	yield* inorder(node.right);
}, function* postorder(node) {
	if (!node) {
		return;
	}

	const stack_inorder = new Stack();
	const stack_postorder = new Stack();
	stack_inorder.push(node);

	while (!stack_inorder.empty()) {
		let current = stack_inorder.peek();
		stack_inorder.pop();
		stack_postorder.push(current);

		if (current.left) {
			stack_inorder.push(current.left);
		}

		if (current.right) {
			stack_inorder.push(current.right);
		}
	}

	while (!stack_postorder.empty()) {
		yield stack_postorder.peek();
		stack_postorder.pop();
	}
}, function* levelorder(node) {
	if (!node) {
		return;
	}

	let buffer = new CircularBuffer();

	//Push first node to buffer to start level order traversal
	buffer.push(node);

	while (!buffer.empty()) {
		let current = buffer.peek();
		buffer.pop();

		yield current;

		if (current.left) {
			buffer.push(current.left);
		}

		if (current.right) {
			buffer.push(current.right);
		}
	}
}];

class BinarySearchTree {

	constructor(comparator) {
		this.root = null;
		this.count = 0;

		// Defines the way the tree will be iterated
		// calling the iterator
		this.iteration_mode = 1;
	}

	insert(element) {
		this.count++;
		this.root = this._insert(this.root, element);
	}

	_insert(node, element) {
		if (!node) {
			return new Node(element);
		}

		if (element < node.value) {
			node.left = this._insert(node.left, element);
		} else {
			node.right = this._insert(node.right, element);
		}

		//Let know node that should update height if it need to be used
		node.isDirty();

		return node;
	}

	contains(element) {
		return this._find(this.root, element) ? true : false;
	}

	find(element) {
		return this._find(this.root, element);
	}

	_find(node, value) {
		if (!node) {
			return null;
		}

		if (value < node.value) {
			return this._find(node.left, value);
		} else if (value > node.value) {
			return this._find(node.right, value);
		} else {
			return node;
		}
	}

	min() {
		if (this.root) {
			return this._findMin(this.root);
		}

		return null;
	}

	_findMin(node, value) {
		let current = node;

		while (current.left) {
			current = current.left;
		}

		return current;
	}

	max() {
		if (this.root) {
			return this._findMax(this.root);
		}

		return null;
	}

	_findMax(node) {
		let current = node;

		while (current.right) {
			current = current.right;
		}

		return current;
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	remove(element) {
		let count = {
			count: this.count
		};

		this.root = this._remove(this.root, element, count);
		this.count = count.count;
	}

	_remove(node, value, count) {
		if (!node) {
			return null;
		}

		if (value < node.value) {
			node.left = this._remove(node.left, value, count);
		} else if (value > node.value) {
			node.right = this._remove(node.right, value, count);
		} else {
			//Confirms that deletion succeded
			if (count) {
				count.count--;
			}

			if (!node.left) {
				return node.right;
			} else if (!node.right) {
				return node.left;
			}

			//Set current value to the minimum in the right child
			node.value = this._findMin(node.right).value;

			//Delete the original copied Node
			node.right = this._remove(node.right, node.value);
		}

		return node;
	}

	clear() {
		this.count = 0;
		this.root = null;
	}

	setIterationMode(mode) {
		this.iteration_mode = mode;
	}

	*[Symbol.iterator]() {
		yield* ITERATORS[this.iteration_mode](this.root);
	}

}

module.exports = BinarySearchTree;
module.exports.PREORDER = 0;
module.exports.INORDER = 1;
module.exports.POSTORDER = 2;
module.exports.LEVELORDER = 3;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = class NoAllowedArgumentError extends Error {};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class CircularBuffer {

	constructor(size = 1000) {
		this.read = 0;
		this.length = 0;
		this.MAX_SIZE = size;
		this.container = new Array(this.MAX_SIZE);
	}

	push(value) {
		if (!this.full()) {
			this.container[(this.read + this.length++) % this.MAX_SIZE] = value;
		}
	}

	pop(item) {
		if (!this.empty()) {
			this.length--;
			this.read++;
			this.read %= this.MAX_SIZE;
		}
	}

	peek() {
		return this.container[this.read];
	}

	full() {
		return this.length == this.MAX_SIZE;
	}

	empty() {
		return this.length == 0;
	}

	size() {
		return this.length;
	}

}

module.exports = CircularBuffer;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Node {

	constructor(value, prev) {
		this.value = value;
		this.prev = prev;
	}

}

class Stack {

	constructor() {
		this.tail = null;
		this.count = 0;
	}

	/**
  * @param  {[any]}
  */
	push(element) {
		this.count++;
		this.tail = new Node(element, this.tail);
	}

	/**
  * 
  */
	pop() {
		if (this.tail) {
			this.count--;
			this.tail = this.tail.prev;
		}
	}

	peek() {
		if (this.tail) {
			return this.tail.value;
		}

		return null;
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	clear() {
		this.count = 0;
		this.tail = null;
	}

}

module.exports = Stack;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const BinarySearchTree = __webpack_require__(0);

const findMin = node => {
	let current = node;

	while (current.left) {
		current = current.left;
	}

	return current;
};

const rightRotate = node => {
	let left = node.left;

	node.left = left.right;
	left.right = node;

	//Recalculate Heights
	node.isDirty();
	left.isDirty();

	return left;
};

const leftRotate = node => {
	let right = node.right;

	node.right = right.left;
	right.left = node;

	//Recalculate Heights
	node.isDirty();
	right.isDirty();

	return right;
};

const insert = (node, element, count) => {
	if (!node) {
		count.count++;
		return new Node(element);
	}

	if (element < node.value) {
		node.left = insert(node.left, element, count);
	} else if (element > node.value) {
		node.right = insert(node.right, element, count);
	} else {
		return node;
	}

	//Recalculate Height
	node.isDirty();

	//Get balance factor
	const balanceFactor = node.balanceFactor();

	//LEFT LEFT
	if (balanceFactor > 1 && element < node.left.value) {
		return rightRotate(node);
	}

	//RIGHT RIGHT
	if (balanceFactor < -1 && element > node.right.value) {
		return leftRotate(node);
	}

	//LEFT RIGHT
	if (balanceFactor > 1 && element > node.left.value) {
		node.left = leftRotate(node.left);
		return rightRotate(node);
	}

	//RIGHT LEFT
	if (balanceFactor < -1 && element < node.right.value) {
		node.right = rightRotate(node.right);
		return leftRotate(node);
	}

	return node;
};

const remove = (node, element, count) => {
	if (!node) {
		return null;
	}

	if (element < node.value) {
		node.left = remove(node.left, element, count);
	} else if (element > node.value) {
		node.right = remove(node.right, element, count);
	} else {
		if (count) {
			count.count--;
		}

		if (!node.left) {
			return node.right;
		} else if (!node.right) {
			return node.left;
		}

		node.value = findMin(node.right).value;
		node.right = remove(node.right, node.value);
	}

	//Recalculate Height
	node.isDirty();

	//Get balance factor
	const balanceFactor = node.balanceFactor();

	//LEFT LEFT
	if (balanceFactor > 1 && node.left.balanceFactor() >= 0) {
		return rightRotate(node);
	}

	//LEFT RIGHT
	if (balanceFactor > 1 && node.left.balanceFactor() < 0) {
		node.left = leftRotate(node.left);
		return rightRotate(node);
	}

	//RIGHT RIGHT
	if (balanceFactor < -1 && node.right.balanceFactor() <= 0) {
		return leftRotate(node);
	}

	//RIGHT LEFT
	if (balanceFactor < -1 && node.right.balanceFactor() > 0) {
		node.right = rightRotate(node.right);
		return leftRotate(node);
	}

	return node;
};

class Node {

	constructor(value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._height = false;
		this._balanceFactor = false;
		this._size = false;
	}

	isDirty() {
		this._height = false;
		this._balanceFactor = false;
		this._size = false;
	}

	height() {
		if (!this._height) {
			this._height = 1 + Math.max(this.left ? this.left.height() : 0, this.right ? this.right.height() : 0);
		}

		return this._height;
	}

	balanceFactor() {
		if (!this._balanceFactor) {
			this._balanceFactor = (this.left ? this.left.height() : 0) - (this.right ? this.right.height() : 0);
		}

		return this._balanceFactor;
	}

}

class AVL extends BinarySearchTree {

	insert(element) {
		let count = {
			count: this.count
		};

		this.root = insert(this.root, element, count);
		this.count = count.count;
	}

	remove(element) {
		let count = {
			count: this.count
		};

		this.root = remove(this.root, element, count);
		this.count = count.count;
	}

}

module.exports = AVL;
module.exports.PREORDER = 0;
module.exports.INORDER = 1;
module.exports.POSTORDER = 2;
module.exports.LEVELORDER = 3;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//Queues
const CircularBuffer = __webpack_require__(2);
const PriorityQueue = __webpack_require__(7);

//Lists
const LinkedList = __webpack_require__(8);
const SortedLinkedList = __webpack_require__(9);

//Stacks
const Stack = __webpack_require__(3);

//Trees
const BinarySearchTree = __webpack_require__(0);
const AVL = __webpack_require__(4);

//Sets
const OrderedSet = __webpack_require__(10);
const UnorderedSet = __webpack_require__(11);

//Errors
const NoAllowedArgumentError = __webpack_require__(1);

module.exports = {

	queue: {
		CircularBuffer: CircularBuffer,
		PriorityQueue: PriorityQueue
	},

	list: {
		LinkedList: LinkedList,
		SortedLinkedList: SortedLinkedList
	},

	stack: {
		Stack: Stack
	},

	tree: {
		BinarySearchTree: BinarySearchTree,
		AVL: AVL
	},

	set: {
		OrderedSet: OrderedSet,
		UnorderedSet: UnorderedSet
	},

	error: {
		NoAllowedArgumentError: NoAllowedArgumentError
	}

};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function heapify(index) {
	let left = 2 * index + 1;
	let right = left + 1;
	let parent = index;

	if (left < this.count && this.compare(this.container[left], this.container[parent])) {
		parent = left;
	}

	if (right < this.count && this.compare(this.container[right], this.container[parent])) {
		parent = right;
	}

	if (parent != index) {
		let temp = this.container[index];
		this.container[index] = this.container[parent];
		this.container[parent] = temp;
		heapify.call(this, parent);
	}
}

const compare = [(a, b) => a < b, (a, b) => a > b];

class PriorityQueue {

	constructor(comparator) {

		switch (typeof comparator) {

			case 'number':
				{
					this.compare = compare[comparator];
				}break;

			case 'function':
				{
					this.compare = comparator;
				}break;

			default:
				{
					this.compare = compare[0];
				}

		}

		this.container = new Array(1000);
		this.count = 0;
	}

	push(value) {
		//Position to insert new element
		let i = this.count;
		this.container[i] = value;
		let parent = parseInt((i - 1) / 2);

		//TODO calculate parent just once
		while (i != 0 && this.compare(this.container[i], this.container[parent])) {
			//Swap child with parent
			let temp = this.container[parent];
			this.container[parent] = this.container[i];
			this.container[i] = temp;
			i = parent;
			parent = parseInt((i - 1) / 2);
		}

		//Increment count to insert element at bottom
		this.count++;
	}

	pop() {
		if (this.count <= 0) {
			return;
		}

		//Store last element to heapify
		this.container[0] = this.container[this.count - 1];

		//Reheapify
		heapify.call(this, 0);

		this.count--;
	}

	peek() {
		return this.container[0];
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

}

module.exports = PriorityQueue;
module.exports.MIN = 0;
module.exports.MAX = 1;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Node {

	constructor(value, next) {
		this.value = value;
		this.next = next;
	}

}

class LinkedList {

	constructor() {
		this.head = null;
		this.count = 0;
	}

	/**
  * @param  {[any]}
  */
	push(element) {
		this.count++;
		this.head = new Node(element, this.head);
	}

	/**
  * 
  */
	pop() {
		if (this.head) {
			this.count--;
			this.head = this.head.next;
		}
	}

	/**
  * @param  {[type]}
  * @param  {[type]}
  * @return {[type]}
  */
	insertAt(index, element) {
		this.count++;

		if (!this.head) {
			this.head = new Node(element);
			return;
		}

		let current = this.head;

		while (--index && current.next) {
			current = current.next;
		}

		current.next = new Node(element, current.next);
	}

	removeAt(index) {
		this.count--;

		if (index == 0) {
			this.head = this.head.next;
			return;
		}

		let current = this.head;
		while (--index && current.next) {
			current = current.next;
		}

		if (index == 0 && current != this.tail) {
			current.next = current.next.next;
		}
	}

	peek() {
		return this.head;
	}

	setAt(index, element) {
		let current = this.head;
		while (index-- && current) {
			current = current.next;
		}

		if (current) {
			current.value = element;
		}
	}

	getAt(index) {
		let current = this.head;

		while (index && current) {
			current = current.next;
			index--;
		}

		if (index == 0) {
			return current;
		}

		return null;
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	contains(element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	find(element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return current;
			}

			current = current.next;
		}

		return null;
	}

	clear() {
		this.count = 0;
		this.head = null;
		this.tail = null;
	}

}

module.exports = LinkedList;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const BinarySearchTree = __webpack_require__(0);

class SortedLinkedList extends BinarySearchTree {

	setIterationMode() {}

	pop() {
		this.remove(this.root.value);
	}

	peek() {
		return this.root;
	}

	getAt(index) {
		if (index <= this.count) {
			return this._findPosition(this.root, index);
		}

		return null;
	}

	_findPosition(node, index) {
		//Uses left child size as current index
		let current_index = node.left ? node.left.size() : 0;

		if (index < current_index) {
			return this._findPosition(node.left, index);
		} else if (index == current_index) {
			return node;
		} else {
			return this._findPosition(node.right, index - (current_index + 1));
		}
	}

}

module.exports = SortedLinkedList;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const AVL = __webpack_require__(4);
const NoAllowedArgumentError = __webpack_require__(1);

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows OrderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows OrderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows OrderedSet as argument.';
const SUBSET_METHOD_ARGUMENT_ERROR = 'subset method only allows OrderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows OrderedSet as argument.';

class OrderedSet extends AVL {

	constructor(elements = []) {
		super();

		const elsLength = elements.length;
		for (let i = 0; i < elsLength; i++) {
			this.insert(elements[i]);
		}
	}

	//Iteration Mode INORDER can't be changed for OrderedSet
	setIterationMode() {}

	union(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR);
		}

		let union = new OrderedSet();

		for (let node of this) {
			union.insert(node.value);
		}

		for (let node of set) {
			union.insert(node.value);
		}

		return union;
	}

	intersection(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR);
		}

		let intersection = new OrderedSet();

		for (let node of set) {
			if (this.contains(node.value)) {
				intersection.insert(node.value);
			}
		}

		return intersection;
	}

	difference(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR);
		}

		let difference = new OrderedSet();

		for (let node of this) {
			if (!set.contains(node.value)) {
				difference.insert(node.value);
			}
		}

		return difference;
	}

	subset(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(SUBSET_METHOD_ARGUMENT_ERROR);
		}

		if (this.size() < set.size()) {
			return false;
		}

		for (let node of set) {
			if (!this.contains(node.value)) {
				return false;
			}
		}

		return true;
	}

	equals(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR);
		}

		if (this.size() != set.size()) {
			return false;
		}

		for (let node of set) {
			if (!this.contains(node.value)) {
				return false;
			}
		}

		return true;
	}

}

module.exports = OrderedSet;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const NoAllowedArgumentError = __webpack_require__(1);

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows UnorderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows UnorderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows UnorderedSet as argument.';
const SUBSET_METHOD_ARGUMENT_ERROR = 'subset method only allows UnorderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows UnorderedSet as argument.';

class UnorderedSet {

    constructor(elements = []) {
        this.container = new Set(elements);
    }

    insert(element) {
        this.container.add(element);
    }

    contains(element) {
        return this.container.has(element);
    }

    size() {
        return this.container.size;
    }

    empty() {
        return this.container.size == 0;
    }

    remove(element) {
        return this.container.delete(element);
    }

    clear() {
        this.container.clear();
    }

    union(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR);
        }

        let union = new UnorderedSet();

        for (let node of this) {
            union.insert(node);
        }

        for (let node of set) {
            union.insert(node);
        }

        return union;
    }

    intersection(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR);
        }

        let intersection = new UnorderedSet();

        for (let node of set) {
            if (this.contains(node)) {
                intersection.insert(node);
            }
        }

        return intersection;
    }

    difference(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR);
        }

        let difference = new UnorderedSet();

        for (let node of this) {
            if (!set.contains(node)) {
                difference.insert(node);
            }
        }

        return difference;
    }

    subset(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(SUBSET_METHOD_ARGUMENT_ERROR);
        }

        if (this.size() < set.size()) {
            return false;
        }

        for (let node of set) {
            if (!this.contains(node)) {
                return false;
            }
        }

        return true;
    }

    equals(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR);
        }

        if (this.container.size != set.size()) {
            return false;
        }

        for (let key of this) {
            if (!set.contains(key)) {
                return false;
            }
        }

        return true;
    }

    *[Symbol.iterator]() {
        yield* this.container[Symbol.iterator]();
    }

}

module.exports = UnorderedSet;

/***/ })
/******/ ]);