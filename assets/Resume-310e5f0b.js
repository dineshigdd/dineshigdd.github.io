var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
import { g as getAugmentedNamespace, _ as _objectWithoutPropertiesLoose$1, a as _setPrototypeOf, r as reactExports, p as propTypesExports, R as React, b as _extends$1, j as jsxs, c as jsx, s as styled } from "./index-6ac6d95c.js";
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement$1(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement$1(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect$1(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect$1,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper$2 = /* @__PURE__ */ popperGenerator();
const resumePDF = "/assets/Resume23-33fe3614.pdf";
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pdfExports = {};
var pdf = {
  get exports() {
    return pdfExports;
  },
  set exports(v) {
    pdfExports = v;
  }
};
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(globalThis, () => {
    return (
      /******/
      (() => {
        var __webpack_modules__ = [
          ,
          /* 1 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.VerbosityLevel = exports2.Util = exports2.UnknownErrorException = exports2.UnexpectedResponseException = exports2.UNSUPPORTED_FEATURES = exports2.TextRenderingMode = exports2.StreamType = exports2.RenderingIntentFlag = exports2.PermissionFlag = exports2.PasswordResponses = exports2.PasswordException = exports2.PageActionEventType = exports2.OPS = exports2.MissingPDFException = exports2.LINE_FACTOR = exports2.LINE_DESCENT_FACTOR = exports2.InvalidPDFException = exports2.ImageKind = exports2.IDENTITY_MATRIX = exports2.FormatError = exports2.FontType = exports2.FeatureTest = exports2.FONT_IDENTITY_MATRIX = exports2.DocumentActionEventType = exports2.CMapCompressionType = exports2.BaseException = exports2.AnnotationType = exports2.AnnotationStateModelType = exports2.AnnotationReviewState = exports2.AnnotationReplyType = exports2.AnnotationMode = exports2.AnnotationMarkedState = exports2.AnnotationFlag = exports2.AnnotationFieldFlag = exports2.AnnotationEditorType = exports2.AnnotationEditorPrefix = exports2.AnnotationEditorParamsType = exports2.AnnotationBorderStyleType = exports2.AnnotationActionEventType = exports2.AbortException = void 0;
            exports2.arrayByteLength = arrayByteLength;
            exports2.arraysToBytes = arraysToBytes;
            exports2.assert = assert;
            exports2.bytesToString = bytesToString;
            exports2.createPromiseCapability = createPromiseCapability;
            exports2.createValidAbsoluteUrl = createValidAbsoluteUrl;
            exports2.escapeString = escapeString;
            exports2.getModificationDate = getModificationDate;
            exports2.getVerbosityLevel = getVerbosityLevel;
            exports2.info = info;
            exports2.isArrayBuffer = isArrayBuffer2;
            exports2.isArrayEqual = isArrayEqual;
            exports2.isAscii = isAscii;
            exports2.objectFromMap = objectFromMap;
            exports2.objectSize = objectSize;
            exports2.setVerbosityLevel = setVerbosityLevel;
            exports2.shadow = shadow;
            exports2.string32 = string32;
            exports2.stringToBytes = stringToBytes;
            exports2.stringToPDFString = stringToPDFString;
            exports2.stringToUTF16BEString = stringToUTF16BEString;
            exports2.stringToUTF8String = stringToUTF8String;
            exports2.unreachable = unreachable;
            exports2.utf8StringToString = utf8StringToString;
            exports2.warn = warn;
            __w_pdfjs_require__2(2);
            const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
            exports2.IDENTITY_MATRIX = IDENTITY_MATRIX;
            const FONT_IDENTITY_MATRIX = [1e-3, 0, 0, 1e-3, 0, 0];
            exports2.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
            const LINE_FACTOR = 1.35;
            exports2.LINE_FACTOR = LINE_FACTOR;
            const LINE_DESCENT_FACTOR = 0.35;
            exports2.LINE_DESCENT_FACTOR = LINE_DESCENT_FACTOR;
            const RenderingIntentFlag = {
              ANY: 1,
              DISPLAY: 2,
              PRINT: 4,
              ANNOTATIONS_FORMS: 16,
              ANNOTATIONS_STORAGE: 32,
              ANNOTATIONS_DISABLE: 64,
              OPLIST: 256
            };
            exports2.RenderingIntentFlag = RenderingIntentFlag;
            const AnnotationMode = {
              DISABLE: 0,
              ENABLE: 1,
              ENABLE_FORMS: 2,
              ENABLE_STORAGE: 3
            };
            exports2.AnnotationMode = AnnotationMode;
            const AnnotationEditorPrefix = "pdfjs_internal_editor_";
            exports2.AnnotationEditorPrefix = AnnotationEditorPrefix;
            const AnnotationEditorType = {
              DISABLE: -1,
              NONE: 0,
              FREETEXT: 3,
              INK: 15
            };
            exports2.AnnotationEditorType = AnnotationEditorType;
            const AnnotationEditorParamsType = {
              FREETEXT_SIZE: 1,
              FREETEXT_COLOR: 2,
              FREETEXT_OPACITY: 3,
              INK_COLOR: 11,
              INK_THICKNESS: 12,
              INK_OPACITY: 13
            };
            exports2.AnnotationEditorParamsType = AnnotationEditorParamsType;
            const PermissionFlag = {
              PRINT: 4,
              MODIFY_CONTENTS: 8,
              COPY: 16,
              MODIFY_ANNOTATIONS: 32,
              FILL_INTERACTIVE_FORMS: 256,
              COPY_FOR_ACCESSIBILITY: 512,
              ASSEMBLE: 1024,
              PRINT_HIGH_QUALITY: 2048
            };
            exports2.PermissionFlag = PermissionFlag;
            const TextRenderingMode = {
              FILL: 0,
              STROKE: 1,
              FILL_STROKE: 2,
              INVISIBLE: 3,
              FILL_ADD_TO_PATH: 4,
              STROKE_ADD_TO_PATH: 5,
              FILL_STROKE_ADD_TO_PATH: 6,
              ADD_TO_PATH: 7,
              FILL_STROKE_MASK: 3,
              ADD_TO_PATH_FLAG: 4
            };
            exports2.TextRenderingMode = TextRenderingMode;
            const ImageKind = {
              GRAYSCALE_1BPP: 1,
              RGB_24BPP: 2,
              RGBA_32BPP: 3
            };
            exports2.ImageKind = ImageKind;
            const AnnotationType = {
              TEXT: 1,
              LINK: 2,
              FREETEXT: 3,
              LINE: 4,
              SQUARE: 5,
              CIRCLE: 6,
              POLYGON: 7,
              POLYLINE: 8,
              HIGHLIGHT: 9,
              UNDERLINE: 10,
              SQUIGGLY: 11,
              STRIKEOUT: 12,
              STAMP: 13,
              CARET: 14,
              INK: 15,
              POPUP: 16,
              FILEATTACHMENT: 17,
              SOUND: 18,
              MOVIE: 19,
              WIDGET: 20,
              SCREEN: 21,
              PRINTERMARK: 22,
              TRAPNET: 23,
              WATERMARK: 24,
              THREED: 25,
              REDACT: 26
            };
            exports2.AnnotationType = AnnotationType;
            const AnnotationStateModelType = {
              MARKED: "Marked",
              REVIEW: "Review"
            };
            exports2.AnnotationStateModelType = AnnotationStateModelType;
            const AnnotationMarkedState = {
              MARKED: "Marked",
              UNMARKED: "Unmarked"
            };
            exports2.AnnotationMarkedState = AnnotationMarkedState;
            const AnnotationReviewState = {
              ACCEPTED: "Accepted",
              REJECTED: "Rejected",
              CANCELLED: "Cancelled",
              COMPLETED: "Completed",
              NONE: "None"
            };
            exports2.AnnotationReviewState = AnnotationReviewState;
            const AnnotationReplyType = {
              GROUP: "Group",
              REPLY: "R"
            };
            exports2.AnnotationReplyType = AnnotationReplyType;
            const AnnotationFlag = {
              INVISIBLE: 1,
              HIDDEN: 2,
              PRINT: 4,
              NOZOOM: 8,
              NOROTATE: 16,
              NOVIEW: 32,
              READONLY: 64,
              LOCKED: 128,
              TOGGLENOVIEW: 256,
              LOCKEDCONTENTS: 512
            };
            exports2.AnnotationFlag = AnnotationFlag;
            const AnnotationFieldFlag = {
              READONLY: 1,
              REQUIRED: 2,
              NOEXPORT: 4,
              MULTILINE: 4096,
              PASSWORD: 8192,
              NOTOGGLETOOFF: 16384,
              RADIO: 32768,
              PUSHBUTTON: 65536,
              COMBO: 131072,
              EDIT: 262144,
              SORT: 524288,
              FILESELECT: 1048576,
              MULTISELECT: 2097152,
              DONOTSPELLCHECK: 4194304,
              DONOTSCROLL: 8388608,
              COMB: 16777216,
              RICHTEXT: 33554432,
              RADIOSINUNISON: 33554432,
              COMMITONSELCHANGE: 67108864
            };
            exports2.AnnotationFieldFlag = AnnotationFieldFlag;
            const AnnotationBorderStyleType = {
              SOLID: 1,
              DASHED: 2,
              BEVELED: 3,
              INSET: 4,
              UNDERLINE: 5
            };
            exports2.AnnotationBorderStyleType = AnnotationBorderStyleType;
            const AnnotationActionEventType = {
              E: "Mouse Enter",
              X: "Mouse Exit",
              D: "Mouse Down",
              U: "Mouse Up",
              Fo: "Focus",
              Bl: "Blur",
              PO: "PageOpen",
              PC: "PageClose",
              PV: "PageVisible",
              PI: "PageInvisible",
              K: "Keystroke",
              F: "Format",
              V: "Validate",
              C: "Calculate"
            };
            exports2.AnnotationActionEventType = AnnotationActionEventType;
            const DocumentActionEventType = {
              WC: "WillClose",
              WS: "WillSave",
              DS: "DidSave",
              WP: "WillPrint",
              DP: "DidPrint"
            };
            exports2.DocumentActionEventType = DocumentActionEventType;
            const PageActionEventType = {
              O: "PageOpen",
              C: "PageClose"
            };
            exports2.PageActionEventType = PageActionEventType;
            const StreamType = {
              UNKNOWN: "UNKNOWN",
              FLATE: "FLATE",
              LZW: "LZW",
              DCT: "DCT",
              JPX: "JPX",
              JBIG: "JBIG",
              A85: "A85",
              AHX: "AHX",
              CCF: "CCF",
              RLX: "RLX"
            };
            exports2.StreamType = StreamType;
            const FontType = {
              UNKNOWN: "UNKNOWN",
              TYPE1: "TYPE1",
              TYPE1STANDARD: "TYPE1STANDARD",
              TYPE1C: "TYPE1C",
              CIDFONTTYPE0: "CIDFONTTYPE0",
              CIDFONTTYPE0C: "CIDFONTTYPE0C",
              TRUETYPE: "TRUETYPE",
              CIDFONTTYPE2: "CIDFONTTYPE2",
              TYPE3: "TYPE3",
              OPENTYPE: "OPENTYPE",
              TYPE0: "TYPE0",
              MMTYPE1: "MMTYPE1"
            };
            exports2.FontType = FontType;
            const VerbosityLevel = {
              ERRORS: 0,
              WARNINGS: 1,
              INFOS: 5
            };
            exports2.VerbosityLevel = VerbosityLevel;
            const CMapCompressionType = {
              NONE: 0,
              BINARY: 1,
              STREAM: 2
            };
            exports2.CMapCompressionType = CMapCompressionType;
            const OPS = {
              dependency: 1,
              setLineWidth: 2,
              setLineCap: 3,
              setLineJoin: 4,
              setMiterLimit: 5,
              setDash: 6,
              setRenderingIntent: 7,
              setFlatness: 8,
              setGState: 9,
              save: 10,
              restore: 11,
              transform: 12,
              moveTo: 13,
              lineTo: 14,
              curveTo: 15,
              curveTo2: 16,
              curveTo3: 17,
              closePath: 18,
              rectangle: 19,
              stroke: 20,
              closeStroke: 21,
              fill: 22,
              eoFill: 23,
              fillStroke: 24,
              eoFillStroke: 25,
              closeFillStroke: 26,
              closeEOFillStroke: 27,
              endPath: 28,
              clip: 29,
              eoClip: 30,
              beginText: 31,
              endText: 32,
              setCharSpacing: 33,
              setWordSpacing: 34,
              setHScale: 35,
              setLeading: 36,
              setFont: 37,
              setTextRenderingMode: 38,
              setTextRise: 39,
              moveText: 40,
              setLeadingMoveText: 41,
              setTextMatrix: 42,
              nextLine: 43,
              showText: 44,
              showSpacedText: 45,
              nextLineShowText: 46,
              nextLineSetSpacingShowText: 47,
              setCharWidth: 48,
              setCharWidthAndBounds: 49,
              setStrokeColorSpace: 50,
              setFillColorSpace: 51,
              setStrokeColor: 52,
              setStrokeColorN: 53,
              setFillColor: 54,
              setFillColorN: 55,
              setStrokeGray: 56,
              setFillGray: 57,
              setStrokeRGBColor: 58,
              setFillRGBColor: 59,
              setStrokeCMYKColor: 60,
              setFillCMYKColor: 61,
              shadingFill: 62,
              beginInlineImage: 63,
              beginImageData: 64,
              endInlineImage: 65,
              paintXObject: 66,
              markPoint: 67,
              markPointProps: 68,
              beginMarkedContent: 69,
              beginMarkedContentProps: 70,
              endMarkedContent: 71,
              beginCompat: 72,
              endCompat: 73,
              paintFormXObjectBegin: 74,
              paintFormXObjectEnd: 75,
              beginGroup: 76,
              endGroup: 77,
              beginAnnotations: 78,
              endAnnotations: 79,
              beginAnnotation: 80,
              endAnnotation: 81,
              paintJpegXObject: 82,
              paintImageMaskXObject: 83,
              paintImageMaskXObjectGroup: 84,
              paintImageXObject: 85,
              paintInlineImageXObject: 86,
              paintInlineImageXObjectGroup: 87,
              paintImageXObjectRepeat: 88,
              paintImageMaskXObjectRepeat: 89,
              paintSolidColorImageMask: 90,
              constructPath: 91
            };
            exports2.OPS = OPS;
            const UNSUPPORTED_FEATURES = {
              unknown: "unknown",
              forms: "forms",
              javaScript: "javaScript",
              signatures: "signatures",
              smask: "smask",
              shadingPattern: "shadingPattern",
              font: "font",
              errorTilingPattern: "errorTilingPattern",
              errorExtGState: "errorExtGState",
              errorXObject: "errorXObject",
              errorFontLoadType3: "errorFontLoadType3",
              errorFontState: "errorFontState",
              errorFontMissing: "errorFontMissing",
              errorFontTranslate: "errorFontTranslate",
              errorColorSpace: "errorColorSpace",
              errorOperatorList: "errorOperatorList",
              errorFontToUnicode: "errorFontToUnicode",
              errorFontLoadNative: "errorFontLoadNative",
              errorFontBuildPath: "errorFontBuildPath",
              errorFontGetPath: "errorFontGetPath",
              errorMarkedContent: "errorMarkedContent",
              errorContentSubStream: "errorContentSubStream"
            };
            exports2.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
            const PasswordResponses2 = {
              NEED_PASSWORD: 1,
              INCORRECT_PASSWORD: 2
            };
            exports2.PasswordResponses = PasswordResponses2;
            let verbosity = VerbosityLevel.WARNINGS;
            function setVerbosityLevel(level) {
              if (Number.isInteger(level)) {
                verbosity = level;
              }
            }
            function getVerbosityLevel() {
              return verbosity;
            }
            function info(msg) {
              if (verbosity >= VerbosityLevel.INFOS) {
                console.log(`Info: ${msg}`);
              }
            }
            function warn(msg) {
              if (verbosity >= VerbosityLevel.WARNINGS) {
                console.log(`Warning: ${msg}`);
              }
            }
            function unreachable(msg) {
              throw new Error(msg);
            }
            function assert(cond, msg) {
              if (!cond) {
                unreachable(msg);
              }
            }
            function _isValidProtocol(url) {
              if (!url) {
                return false;
              }
              switch (url.protocol) {
                case "http:":
                case "https:":
                case "ftp:":
                case "mailto:":
                case "tel:":
                  return true;
                default:
                  return false;
              }
            }
            function createValidAbsoluteUrl(url, baseUrl = null, options = null) {
              if (!url) {
                return null;
              }
              try {
                if (options && typeof url === "string") {
                  if (options.addDefaultProtocol && url.startsWith("www.")) {
                    const dots = url.match(/\./g);
                    if (dots && dots.length >= 2) {
                      url = `http://${url}`;
                    }
                  }
                  if (options.tryConvertEncoding) {
                    try {
                      url = stringToUTF8String(url);
                    } catch (ex) {
                    }
                  }
                }
                const absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);
                if (_isValidProtocol(absoluteUrl)) {
                  return absoluteUrl;
                }
              } catch (ex) {
              }
              return null;
            }
            function shadow(obj, prop, value) {
              Object.defineProperty(obj, prop, {
                value,
                enumerable: true,
                configurable: true,
                writable: false
              });
              return value;
            }
            const BaseException = function BaseExceptionClosure() {
              function BaseException2(message, name) {
                if (this.constructor === BaseException2) {
                  unreachable("Cannot initialize BaseException.");
                }
                this.message = message;
                this.name = name;
              }
              BaseException2.prototype = new Error();
              BaseException2.constructor = BaseException2;
              return BaseException2;
            }();
            exports2.BaseException = BaseException;
            class PasswordException extends BaseException {
              constructor(msg, code) {
                super(msg, "PasswordException");
                this.code = code;
              }
            }
            exports2.PasswordException = PasswordException;
            class UnknownErrorException extends BaseException {
              constructor(msg, details) {
                super(msg, "UnknownErrorException");
                this.details = details;
              }
            }
            exports2.UnknownErrorException = UnknownErrorException;
            class InvalidPDFException extends BaseException {
              constructor(msg) {
                super(msg, "InvalidPDFException");
              }
            }
            exports2.InvalidPDFException = InvalidPDFException;
            class MissingPDFException extends BaseException {
              constructor(msg) {
                super(msg, "MissingPDFException");
              }
            }
            exports2.MissingPDFException = MissingPDFException;
            class UnexpectedResponseException extends BaseException {
              constructor(msg, status) {
                super(msg, "UnexpectedResponseException");
                this.status = status;
              }
            }
            exports2.UnexpectedResponseException = UnexpectedResponseException;
            class FormatError extends BaseException {
              constructor(msg) {
                super(msg, "FormatError");
              }
            }
            exports2.FormatError = FormatError;
            class AbortException extends BaseException {
              constructor(msg) {
                super(msg, "AbortException");
              }
            }
            exports2.AbortException = AbortException;
            function bytesToString(bytes) {
              if (typeof bytes !== "object" || bytes === null || bytes.length === void 0) {
                unreachable("Invalid argument for bytesToString");
              }
              const length = bytes.length;
              const MAX_ARGUMENT_COUNT = 8192;
              if (length < MAX_ARGUMENT_COUNT) {
                return String.fromCharCode.apply(null, bytes);
              }
              const strBuf = [];
              for (let i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
                const chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
                const chunk = bytes.subarray(i, chunkEnd);
                strBuf.push(String.fromCharCode.apply(null, chunk));
              }
              return strBuf.join("");
            }
            function stringToBytes(str) {
              if (typeof str !== "string") {
                unreachable("Invalid argument for stringToBytes");
              }
              const length = str.length;
              const bytes = new Uint8Array(length);
              for (let i = 0; i < length; ++i) {
                bytes[i] = str.charCodeAt(i) & 255;
              }
              return bytes;
            }
            function arrayByteLength(arr) {
              if (arr.length !== void 0) {
                return arr.length;
              }
              if (arr.byteLength !== void 0) {
                return arr.byteLength;
              }
              unreachable("Invalid argument for arrayByteLength");
            }
            function arraysToBytes(arr) {
              const length = arr.length;
              if (length === 1 && arr[0] instanceof Uint8Array) {
                return arr[0];
              }
              let resultLength = 0;
              for (let i = 0; i < length; i++) {
                resultLength += arrayByteLength(arr[i]);
              }
              let pos = 0;
              const data = new Uint8Array(resultLength);
              for (let i = 0; i < length; i++) {
                let item = arr[i];
                if (!(item instanceof Uint8Array)) {
                  if (typeof item === "string") {
                    item = stringToBytes(item);
                  } else {
                    item = new Uint8Array(item);
                  }
                }
                const itemLength = item.byteLength;
                data.set(item, pos);
                pos += itemLength;
              }
              return data;
            }
            function string32(value) {
              return String.fromCharCode(value >> 24 & 255, value >> 16 & 255, value >> 8 & 255, value & 255);
            }
            function objectSize(obj) {
              return Object.keys(obj).length;
            }
            function objectFromMap(map) {
              const obj = /* @__PURE__ */ Object.create(null);
              for (const [key, value] of map) {
                obj[key] = value;
              }
              return obj;
            }
            function isLittleEndian() {
              const buffer8 = new Uint8Array(4);
              buffer8[0] = 1;
              const view32 = new Uint32Array(buffer8.buffer, 0, 1);
              return view32[0] === 1;
            }
            function isEvalSupported() {
              try {
                new Function("");
                return true;
              } catch (e) {
                return false;
              }
            }
            class FeatureTest {
              static get isLittleEndian() {
                return shadow(this, "isLittleEndian", isLittleEndian());
              }
              static get isEvalSupported() {
                return shadow(this, "isEvalSupported", isEvalSupported());
              }
              static get isOffscreenCanvasSupported() {
                return shadow(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas !== "undefined");
              }
            }
            exports2.FeatureTest = FeatureTest;
            const hexNumbers = [...Array(256).keys()].map((n) => n.toString(16).padStart(2, "0"));
            class Util {
              static makeHexColor(r2, g, b) {
                return `#${hexNumbers[r2]}${hexNumbers[g]}${hexNumbers[b]}`;
              }
              static scaleMinMax(transform, minMax) {
                let temp;
                if (transform[0]) {
                  if (transform[0] < 0) {
                    temp = minMax[0];
                    minMax[0] = minMax[1];
                    minMax[1] = temp;
                  }
                  minMax[0] *= transform[0];
                  minMax[1] *= transform[0];
                  if (transform[3] < 0) {
                    temp = minMax[2];
                    minMax[2] = minMax[3];
                    minMax[3] = temp;
                  }
                  minMax[2] *= transform[3];
                  minMax[3] *= transform[3];
                } else {
                  temp = minMax[0];
                  minMax[0] = minMax[2];
                  minMax[2] = temp;
                  temp = minMax[1];
                  minMax[1] = minMax[3];
                  minMax[3] = temp;
                  if (transform[1] < 0) {
                    temp = minMax[2];
                    minMax[2] = minMax[3];
                    minMax[3] = temp;
                  }
                  minMax[2] *= transform[1];
                  minMax[3] *= transform[1];
                  if (transform[2] < 0) {
                    temp = minMax[0];
                    minMax[0] = minMax[1];
                    minMax[1] = temp;
                  }
                  minMax[0] *= transform[2];
                  minMax[1] *= transform[2];
                }
                minMax[0] += transform[4];
                minMax[1] += transform[4];
                minMax[2] += transform[5];
                minMax[3] += transform[5];
              }
              static transform(m1, m2) {
                return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
              }
              static applyTransform(p, m) {
                const xt = p[0] * m[0] + p[1] * m[2] + m[4];
                const yt = p[0] * m[1] + p[1] * m[3] + m[5];
                return [xt, yt];
              }
              static applyInverseTransform(p, m) {
                const d = m[0] * m[3] - m[1] * m[2];
                const xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
                const yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
                return [xt, yt];
              }
              static getAxialAlignedBoundingBox(r2, m) {
                const p1 = Util.applyTransform(r2, m);
                const p2 = Util.applyTransform(r2.slice(2, 4), m);
                const p3 = Util.applyTransform([r2[0], r2[3]], m);
                const p4 = Util.applyTransform([r2[2], r2[1]], m);
                return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
              }
              static inverseTransform(m) {
                const d = m[0] * m[3] - m[1] * m[2];
                return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
              }
              static apply3dTransform(m, v) {
                return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
              }
              static singularValueDecompose2dScale(m) {
                const transpose = [m[0], m[2], m[1], m[3]];
                const a = m[0] * transpose[0] + m[1] * transpose[2];
                const b = m[0] * transpose[1] + m[1] * transpose[3];
                const c = m[2] * transpose[0] + m[3] * transpose[2];
                const d = m[2] * transpose[1] + m[3] * transpose[3];
                const first = (a + d) / 2;
                const second = Math.sqrt((a + d) ** 2 - 4 * (a * d - c * b)) / 2;
                const sx = first + second || 1;
                const sy = first - second || 1;
                return [Math.sqrt(sx), Math.sqrt(sy)];
              }
              static normalizeRect(rect) {
                const r2 = rect.slice(0);
                if (rect[0] > rect[2]) {
                  r2[0] = rect[2];
                  r2[2] = rect[0];
                }
                if (rect[1] > rect[3]) {
                  r2[1] = rect[3];
                  r2[3] = rect[1];
                }
                return r2;
              }
              static intersect(rect1, rect2) {
                const xLow = Math.max(Math.min(rect1[0], rect1[2]), Math.min(rect2[0], rect2[2]));
                const xHigh = Math.min(Math.max(rect1[0], rect1[2]), Math.max(rect2[0], rect2[2]));
                if (xLow > xHigh) {
                  return null;
                }
                const yLow = Math.max(Math.min(rect1[1], rect1[3]), Math.min(rect2[1], rect2[3]));
                const yHigh = Math.min(Math.max(rect1[1], rect1[3]), Math.max(rect2[1], rect2[3]));
                if (yLow > yHigh) {
                  return null;
                }
                return [xLow, yLow, xHigh, yHigh];
              }
              static bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3) {
                const tvalues = [], bounds = [[], []];
                let a, b, c, t, t1, t2, b2ac, sqrtb2ac;
                for (let i = 0; i < 2; ++i) {
                  if (i === 0) {
                    b = 6 * x0 - 12 * x1 + 6 * x2;
                    a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
                    c = 3 * x1 - 3 * x0;
                  } else {
                    b = 6 * y0 - 12 * y1 + 6 * y2;
                    a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                    c = 3 * y1 - 3 * y0;
                  }
                  if (Math.abs(a) < 1e-12) {
                    if (Math.abs(b) < 1e-12) {
                      continue;
                    }
                    t = -c / b;
                    if (0 < t && t < 1) {
                      tvalues.push(t);
                    }
                    continue;
                  }
                  b2ac = b * b - 4 * c * a;
                  sqrtb2ac = Math.sqrt(b2ac);
                  if (b2ac < 0) {
                    continue;
                  }
                  t1 = (-b + sqrtb2ac) / (2 * a);
                  if (0 < t1 && t1 < 1) {
                    tvalues.push(t1);
                  }
                  t2 = (-b - sqrtb2ac) / (2 * a);
                  if (0 < t2 && t2 < 1) {
                    tvalues.push(t2);
                  }
                }
                let j = tvalues.length, mt;
                const jlen = j;
                while (j--) {
                  t = tvalues[j];
                  mt = 1 - t;
                  bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
                  bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
                }
                bounds[0][jlen] = x0;
                bounds[1][jlen] = y0;
                bounds[0][jlen + 1] = x3;
                bounds[1][jlen + 1] = y3;
                bounds[0].length = bounds[1].length = jlen + 2;
                return [Math.min(...bounds[0]), Math.min(...bounds[1]), Math.max(...bounds[0]), Math.max(...bounds[1])];
              }
            }
            exports2.Util = Util;
            const PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 728, 711, 710, 729, 733, 731, 730, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8226, 8224, 8225, 8230, 8212, 8211, 402, 8260, 8249, 8250, 8722, 8240, 8222, 8220, 8221, 8216, 8217, 8218, 8482, 64257, 64258, 321, 338, 352, 376, 381, 305, 322, 339, 353, 382, 0, 8364];
            function stringToPDFString(str) {
              if (str[0] >= "ï") {
                let encoding;
                if (str[0] === "þ" && str[1] === "ÿ") {
                  encoding = "utf-16be";
                } else if (str[0] === "ÿ" && str[1] === "þ") {
                  encoding = "utf-16le";
                } else if (str[0] === "ï" && str[1] === "»" && str[2] === "¿") {
                  encoding = "utf-8";
                }
                if (encoding) {
                  try {
                    const decoder = new TextDecoder(encoding, {
                      fatal: true
                    });
                    const buffer = stringToBytes(str);
                    return decoder.decode(buffer);
                  } catch (ex) {
                    warn(`stringToPDFString: "${ex}".`);
                  }
                }
              }
              const strBuf = [];
              for (let i = 0, ii = str.length; i < ii; i++) {
                const code = PDFStringTranslateTable[str.charCodeAt(i)];
                strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
              }
              return strBuf.join("");
            }
            function escapeString(str) {
              return str.replace(/([()\\\n\r])/g, (match) => {
                if (match === "\n") {
                  return "\\n";
                } else if (match === "\r") {
                  return "\\r";
                }
                return `\\${match}`;
              });
            }
            function isAscii(str) {
              return /^[\x00-\x7F]*$/.test(str);
            }
            function stringToUTF16BEString(str) {
              const buf = ["þÿ"];
              for (let i = 0, ii = str.length; i < ii; i++) {
                const char = str.charCodeAt(i);
                buf.push(String.fromCharCode(char >> 8 & 255), String.fromCharCode(char & 255));
              }
              return buf.join("");
            }
            function stringToUTF8String(str) {
              return decodeURIComponent(escape(str));
            }
            function utf8StringToString(str) {
              return unescape(encodeURIComponent(str));
            }
            function isArrayBuffer2(v) {
              return typeof v === "object" && v !== null && v.byteLength !== void 0;
            }
            function isArrayEqual(arr1, arr2) {
              if (arr1.length !== arr2.length) {
                return false;
              }
              for (let i = 0, ii = arr1.length; i < ii; i++) {
                if (arr1[i] !== arr2[i]) {
                  return false;
                }
              }
              return true;
            }
            function getModificationDate(date = new Date()) {
              const buffer = [date.getUTCFullYear().toString(), (date.getUTCMonth() + 1).toString().padStart(2, "0"), date.getUTCDate().toString().padStart(2, "0"), date.getUTCHours().toString().padStart(2, "0"), date.getUTCMinutes().toString().padStart(2, "0"), date.getUTCSeconds().toString().padStart(2, "0")];
              return buffer.join("");
            }
            function createPromiseCapability() {
              const capability = /* @__PURE__ */ Object.create(null);
              let isSettled = false;
              Object.defineProperty(capability, "settled", {
                get() {
                  return isSettled;
                }
              });
              capability.promise = new Promise(function(resolve, reject) {
                capability.resolve = function(data) {
                  isSettled = true;
                  resolve(data);
                };
                capability.reject = function(reason) {
                  isSettled = true;
                  reject(reason);
                };
              });
              return capability;
            }
          },
          /* 2 */
          /***/
          (__unused_webpack_module2, __unused_webpack_exports, __w_pdfjs_require__2) => {
            __w_pdfjs_require__2(3);
          },
          /* 3 */
          /***/
          (__unused_webpack_module2, exports2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.isNodeJS = void 0;
            const isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
            exports2.isNodeJS = isNodeJS;
          },
          /* 4 */
          /***/
          (__unused_webpack_module, exports, __w_pdfjs_require__) => {
            var _docId, _a, _workerPorts, _docStats, _pageCache, _pagePromises, _metadataPromise, _objs, _ensureObj, ensureObj_fn, _internalRenderTask, _canvasInUse;
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.build = exports.RenderTask = exports.PDFWorkerUtil = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDocumentLoadingTask = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultStandardFontDataFactory = exports.DefaultCanvasFactory = exports.DefaultCMapReaderFactory = void 0;
            exports.getDocument = getDocument;
            exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
            exports.version = void 0;
            var _util = __w_pdfjs_require__(1);
            var _annotation_storage = __w_pdfjs_require__(5);
            var _display_utils = __w_pdfjs_require__(8);
            var _font_loader = __w_pdfjs_require__(11);
            var _canvas = __w_pdfjs_require__(12);
            var _worker_options = __w_pdfjs_require__(15);
            var _is_node = __w_pdfjs_require__(3);
            var _message_handler = __w_pdfjs_require__(16);
            var _metadata = __w_pdfjs_require__(17);
            var _optional_content_config = __w_pdfjs_require__(18);
            var _transport_stream = __w_pdfjs_require__(19);
            var _xfa_text = __w_pdfjs_require__(20);
            const DEFAULT_RANGE_CHUNK_SIZE = 65536;
            const RENDERING_CANCELLED_TIMEOUT = 100;
            let DefaultCanvasFactory = _display_utils.DOMCanvasFactory;
            exports.DefaultCanvasFactory = DefaultCanvasFactory;
            let DefaultCMapReaderFactory = _display_utils.DOMCMapReaderFactory;
            exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
            let DefaultStandardFontDataFactory = _display_utils.DOMStandardFontDataFactory;
            exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory;
            if (_is_node.isNodeJS) {
              const {
                NodeCanvasFactory,
                NodeCMapReaderFactory,
                NodeStandardFontDataFactory
              } = __w_pdfjs_require__(21);
              exports.DefaultCanvasFactory = DefaultCanvasFactory = NodeCanvasFactory;
              exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory = NodeCMapReaderFactory;
              exports.DefaultStandardFontDataFactory = DefaultStandardFontDataFactory = NodeStandardFontDataFactory;
            }
            let createPDFNetworkStream;
            function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
              createPDFNetworkStream = pdfNetworkStreamFactory;
            }
            function getDocument(src) {
              const task = new PDFDocumentLoadingTask();
              let source;
              if (typeof src === "string" || src instanceof URL) {
                source = {
                  url: src
                };
              } else if ((0, _util.isArrayBuffer)(src)) {
                source = {
                  data: src
                };
              } else if (src instanceof PDFDataRangeTransport) {
                source = {
                  range: src
                };
              } else {
                if (typeof src !== "object") {
                  throw new Error("Invalid parameter in getDocument, need either string, URL, TypedArray, or parameter object.");
                }
                if (!src.url && !src.data && !src.range) {
                  throw new Error("Invalid parameter object: need either .data, .range or .url");
                }
                source = src;
              }
              const params = /* @__PURE__ */ Object.create(null);
              let rangeTransport = null, worker2 = null;
              for (const key in source) {
                const value = source[key];
                switch (key) {
                  case "url":
                    if (typeof window !== "undefined") {
                      try {
                        params[key] = new URL(value, window.location).href;
                        continue;
                      } catch (ex) {
                        (0, _util.warn)(`Cannot create valid URL: "${ex}".`);
                      }
                    } else if (typeof value === "string" || value instanceof URL) {
                      params[key] = value.toString();
                      continue;
                    }
                    throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
                  case "range":
                    rangeTransport = value;
                    continue;
                  case "worker":
                    worker2 = value;
                    continue;
                  case "data":
                    if (_is_node.isNodeJS && typeof Buffer !== "undefined" && value instanceof Buffer) {
                      params[key] = new Uint8Array(value);
                    } else if (value instanceof Uint8Array) {
                      break;
                    } else if (typeof value === "string") {
                      params[key] = (0, _util.stringToBytes)(value);
                    } else if (typeof value === "object" && value !== null && !isNaN(value.length)) {
                      params[key] = new Uint8Array(value);
                    } else if ((0, _util.isArrayBuffer)(value)) {
                      params[key] = new Uint8Array(value);
                    } else {
                      throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
                    }
                    continue;
                }
                params[key] = value;
              }
              params.CMapReaderFactory = params.CMapReaderFactory || DefaultCMapReaderFactory;
              params.StandardFontDataFactory = params.StandardFontDataFactory || DefaultStandardFontDataFactory;
              params.ignoreErrors = params.stopAtErrors !== true;
              params.fontExtraProperties = params.fontExtraProperties === true;
              params.pdfBug = params.pdfBug === true;
              params.enableXfa = params.enableXfa === true;
              if (!Number.isInteger(params.rangeChunkSize) || params.rangeChunkSize < 1) {
                params.rangeChunkSize = DEFAULT_RANGE_CHUNK_SIZE;
              }
              if (typeof params.docBaseUrl !== "string" || (0, _display_utils.isDataScheme)(params.docBaseUrl)) {
                params.docBaseUrl = null;
              }
              if (!Number.isInteger(params.maxImageSize) || params.maxImageSize < -1) {
                params.maxImageSize = -1;
              }
              if (typeof params.cMapUrl !== "string") {
                params.cMapUrl = null;
              }
              if (typeof params.standardFontDataUrl !== "string") {
                params.standardFontDataUrl = null;
              }
              if (typeof params.useWorkerFetch !== "boolean") {
                params.useWorkerFetch = params.CMapReaderFactory === _display_utils.DOMCMapReaderFactory && params.StandardFontDataFactory === _display_utils.DOMStandardFontDataFactory;
              }
              if (typeof params.isEvalSupported !== "boolean") {
                params.isEvalSupported = true;
              }
              if (typeof params.disableFontFace !== "boolean") {
                params.disableFontFace = _is_node.isNodeJS;
              }
              if (typeof params.useSystemFonts !== "boolean") {
                params.useSystemFonts = !_is_node.isNodeJS && !params.disableFontFace;
              }
              if (typeof params.ownerDocument !== "object" || params.ownerDocument === null) {
                params.ownerDocument = globalThis.document;
              }
              if (typeof params.disableRange !== "boolean") {
                params.disableRange = false;
              }
              if (typeof params.disableStream !== "boolean") {
                params.disableStream = false;
              }
              if (typeof params.disableAutoFetch !== "boolean") {
                params.disableAutoFetch = false;
              }
              (0, _util.setVerbosityLevel)(params.verbosity);
              if (!worker2) {
                const workerParams = {
                  verbosity: params.verbosity,
                  port: _worker_options.GlobalWorkerOptions.workerPort
                };
                worker2 = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
                task._worker = worker2;
              }
              const docId = task.docId;
              worker2.promise.then(function() {
                if (task.destroyed) {
                  throw new Error("Loading aborted");
                }
                const workerIdPromise = _fetchDocument(worker2, params, rangeTransport, docId);
                const networkStreamPromise = new Promise(function(resolve) {
                  let networkStream;
                  if (rangeTransport) {
                    networkStream = new _transport_stream.PDFDataTransportStream({
                      length: params.length,
                      initialData: params.initialData,
                      progressiveDone: params.progressiveDone,
                      contentDispositionFilename: params.contentDispositionFilename,
                      disableRange: params.disableRange,
                      disableStream: params.disableStream
                    }, rangeTransport);
                  } else if (!params.data) {
                    networkStream = createPDFNetworkStream({
                      url: params.url,
                      length: params.length,
                      httpHeaders: params.httpHeaders,
                      withCredentials: params.withCredentials,
                      rangeChunkSize: params.rangeChunkSize,
                      disableRange: params.disableRange,
                      disableStream: params.disableStream
                    });
                  }
                  resolve(networkStream);
                });
                return Promise.all([workerIdPromise, networkStreamPromise]).then(function([workerId, networkStream]) {
                  if (task.destroyed) {
                    throw new Error("Loading aborted");
                  }
                  const messageHandler = new _message_handler.MessageHandler(docId, workerId, worker2.port);
                  const transport = new WorkerTransport(messageHandler, task, networkStream, params);
                  task._transport = transport;
                  messageHandler.send("Ready", null);
                });
              }).catch(task._capability.reject);
              return task;
            }
            async function _fetchDocument(worker2, source, pdfDataRangeTransport, docId) {
              if (worker2.destroyed) {
                throw new Error("Worker was destroyed");
              }
              if (pdfDataRangeTransport) {
                source.length = pdfDataRangeTransport.length;
                source.initialData = pdfDataRangeTransport.initialData;
                source.progressiveDone = pdfDataRangeTransport.progressiveDone;
                source.contentDispositionFilename = pdfDataRangeTransport.contentDispositionFilename;
              }
              const workerId = await worker2.messageHandler.sendWithPromise("GetDocRequest", {
                docId,
                apiVersion: "2.16.105",
                source: {
                  data: source.data,
                  url: source.url,
                  password: source.password,
                  disableAutoFetch: source.disableAutoFetch,
                  rangeChunkSize: source.rangeChunkSize,
                  length: source.length
                },
                maxImageSize: source.maxImageSize,
                disableFontFace: source.disableFontFace,
                docBaseUrl: source.docBaseUrl,
                ignoreErrors: source.ignoreErrors,
                isEvalSupported: source.isEvalSupported,
                fontExtraProperties: source.fontExtraProperties,
                enableXfa: source.enableXfa,
                useSystemFonts: source.useSystemFonts,
                cMapUrl: source.useWorkerFetch ? source.cMapUrl : null,
                standardFontDataUrl: source.useWorkerFetch ? source.standardFontDataUrl : null
              });
              if (source.data) {
                source.data = null;
              }
              if (worker2.destroyed) {
                throw new Error("Worker was destroyed");
              }
              return workerId;
            }
            const _PDFDocumentLoadingTask = class {
              constructor() {
                this._capability = (0, _util.createPromiseCapability)();
                this._transport = null;
                this._worker = null;
                this.docId = `d${__privateWrapper(_PDFDocumentLoadingTask, _docId)._++}`;
                this.destroyed = false;
                this.onPassword = null;
                this.onProgress = null;
                this.onUnsupportedFeature = null;
              }
              get promise() {
                return this._capability.promise;
              }
              async destroy() {
                var _a2;
                this.destroyed = true;
                await ((_a2 = this._transport) == null ? void 0 : _a2.destroy());
                this._transport = null;
                if (this._worker) {
                  this._worker.destroy();
                  this._worker = null;
                }
              }
            };
            let PDFDocumentLoadingTask = _PDFDocumentLoadingTask;
            _docId = new WeakMap();
            __privateAdd(PDFDocumentLoadingTask, _docId, 0);
            exports.PDFDocumentLoadingTask = PDFDocumentLoadingTask;
            class PDFDataRangeTransport {
              constructor(length, initialData, progressiveDone = false, contentDispositionFilename = null) {
                this.length = length;
                this.initialData = initialData;
                this.progressiveDone = progressiveDone;
                this.contentDispositionFilename = contentDispositionFilename;
                this._rangeListeners = [];
                this._progressListeners = [];
                this._progressiveReadListeners = [];
                this._progressiveDoneListeners = [];
                this._readyCapability = (0, _util.createPromiseCapability)();
              }
              addRangeListener(listener) {
                this._rangeListeners.push(listener);
              }
              addProgressListener(listener) {
                this._progressListeners.push(listener);
              }
              addProgressiveReadListener(listener) {
                this._progressiveReadListeners.push(listener);
              }
              addProgressiveDoneListener(listener) {
                this._progressiveDoneListeners.push(listener);
              }
              onDataRange(begin, chunk) {
                for (const listener of this._rangeListeners) {
                  listener(begin, chunk);
                }
              }
              onDataProgress(loaded, total) {
                this._readyCapability.promise.then(() => {
                  for (const listener of this._progressListeners) {
                    listener(loaded, total);
                  }
                });
              }
              onDataProgressiveRead(chunk) {
                this._readyCapability.promise.then(() => {
                  for (const listener of this._progressiveReadListeners) {
                    listener(chunk);
                  }
                });
              }
              onDataProgressiveDone() {
                this._readyCapability.promise.then(() => {
                  for (const listener of this._progressiveDoneListeners) {
                    listener();
                  }
                });
              }
              transportReady() {
                this._readyCapability.resolve();
              }
              requestDataRange(begin, end2) {
                (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
              }
              abort() {
              }
            }
            exports.PDFDataRangeTransport = PDFDataRangeTransport;
            class PDFDocumentProxy {
              constructor(pdfInfo, transport) {
                this._pdfInfo = pdfInfo;
                this._transport = transport;
                Object.defineProperty(this, "fingerprint", {
                  get() {
                    (0, _display_utils.deprecated)("`PDFDocumentProxy.fingerprint`, please use `PDFDocumentProxy.fingerprints` instead.");
                    return this.fingerprints[0];
                  }
                });
                Object.defineProperty(this, "getStats", {
                  value: async () => {
                    (0, _display_utils.deprecated)("`PDFDocumentProxy.getStats`, please use the `PDFDocumentProxy.stats`-getter instead.");
                    return this.stats || {
                      streamTypes: {},
                      fontTypes: {}
                    };
                  }
                });
              }
              get annotationStorage() {
                return this._transport.annotationStorage;
              }
              get numPages() {
                return this._pdfInfo.numPages;
              }
              get fingerprints() {
                return this._pdfInfo.fingerprints;
              }
              get stats() {
                return this._transport.stats;
              }
              get isPureXfa() {
                return !!this._transport._htmlForXfa;
              }
              get allXfaHtml() {
                return this._transport._htmlForXfa;
              }
              getPage(pageNumber) {
                return this._transport.getPage(pageNumber);
              }
              getPageIndex(ref) {
                return this._transport.getPageIndex(ref);
              }
              getDestinations() {
                return this._transport.getDestinations();
              }
              getDestination(id) {
                return this._transport.getDestination(id);
              }
              getPageLabels() {
                return this._transport.getPageLabels();
              }
              getPageLayout() {
                return this._transport.getPageLayout();
              }
              getPageMode() {
                return this._transport.getPageMode();
              }
              getViewerPreferences() {
                return this._transport.getViewerPreferences();
              }
              getOpenAction() {
                return this._transport.getOpenAction();
              }
              getAttachments() {
                return this._transport.getAttachments();
              }
              getJavaScript() {
                return this._transport.getJavaScript();
              }
              getJSActions() {
                return this._transport.getDocJSActions();
              }
              getOutline() {
                return this._transport.getOutline();
              }
              getOptionalContentConfig() {
                return this._transport.getOptionalContentConfig();
              }
              getPermissions() {
                return this._transport.getPermissions();
              }
              getMetadata() {
                return this._transport.getMetadata();
              }
              getMarkInfo() {
                return this._transport.getMarkInfo();
              }
              getData() {
                return this._transport.getData();
              }
              getDownloadInfo() {
                return this._transport.downloadInfoCapability.promise;
              }
              cleanup(keepLoadedFonts = false) {
                return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa);
              }
              destroy() {
                return this.loadingTask.destroy();
              }
              get loadingParams() {
                return this._transport.loadingParams;
              }
              get loadingTask() {
                return this._transport.loadingTask;
              }
              saveDocument() {
                if (this._transport.annotationStorage.size <= 0) {
                  (0, _display_utils.deprecated)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
                }
                return this._transport.saveDocument();
              }
              getFieldObjects() {
                return this._transport.getFieldObjects();
              }
              hasJSActions() {
                return this._transport.hasJSActions();
              }
              getCalculationOrderIds() {
                return this._transport.getCalculationOrderIds();
              }
            }
            exports.PDFDocumentProxy = PDFDocumentProxy;
            class PDFPageProxy {
              constructor(pageIndex, pageInfo, transport, ownerDocument, pdfBug = false) {
                this._pageIndex = pageIndex;
                this._pageInfo = pageInfo;
                this._ownerDocument = ownerDocument;
                this._transport = transport;
                this._stats = pdfBug ? new _display_utils.StatTimer() : null;
                this._pdfBug = pdfBug;
                this.commonObjs = transport.commonObjs;
                this.objs = new PDFObjects();
                this._bitmaps = /* @__PURE__ */ new Set();
                this.cleanupAfterRender = false;
                this.pendingCleanup = false;
                this._intentStates = /* @__PURE__ */ new Map();
                this._annotationPromises = /* @__PURE__ */ new Map();
                this.destroyed = false;
              }
              get pageNumber() {
                return this._pageIndex + 1;
              }
              get rotate() {
                return this._pageInfo.rotate;
              }
              get ref() {
                return this._pageInfo.ref;
              }
              get userUnit() {
                return this._pageInfo.userUnit;
              }
              get view() {
                return this._pageInfo.view;
              }
              getViewport({
                scale,
                rotation = this.rotate,
                offsetX = 0,
                offsetY = 0,
                dontFlip = false
              } = {}) {
                return new _display_utils.PageViewport({
                  viewBox: this.view,
                  scale,
                  rotation,
                  offsetX,
                  offsetY,
                  dontFlip
                });
              }
              getAnnotations({
                intent = "display"
              } = {}) {
                const intentArgs = this._transport.getRenderingIntent(intent);
                let promise = this._annotationPromises.get(intentArgs.cacheKey);
                if (!promise) {
                  promise = this._transport.getAnnotations(this._pageIndex, intentArgs.renderingIntent);
                  this._annotationPromises.set(intentArgs.cacheKey, promise);
                  promise = promise.then((annotations) => {
                    for (const annotation of annotations) {
                      if (annotation.titleObj !== void 0) {
                        Object.defineProperty(annotation, "title", {
                          get() {
                            (0, _display_utils.deprecated)("`title`-property on annotation, please use `titleObj` instead.");
                            return annotation.titleObj.str;
                          }
                        });
                      }
                      if (annotation.contentsObj !== void 0) {
                        Object.defineProperty(annotation, "contents", {
                          get() {
                            (0, _display_utils.deprecated)("`contents`-property on annotation, please use `contentsObj` instead.");
                            return annotation.contentsObj.str;
                          }
                        });
                      }
                    }
                    return annotations;
                  });
                }
                return promise;
              }
              getJSActions() {
                return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
              }
              async getXfa() {
                var _a2;
                return ((_a2 = this._transport._htmlForXfa) == null ? void 0 : _a2.children[this._pageIndex]) || null;
              }
              render({
                canvasContext,
                viewport: viewport2,
                intent = "display",
                annotationMode = _util.AnnotationMode.ENABLE,
                transform = null,
                imageLayer = null,
                canvasFactory = null,
                background = null,
                optionalContentConfigPromise = null,
                annotationCanvasMap = null,
                pageColors = null,
                printAnnotationStorage = null
              }) {
                var _a2, _b;
                if (((_a2 = arguments[0]) == null ? void 0 : _a2.renderInteractiveForms) !== void 0) {
                  (0, _display_utils.deprecated)("render no longer accepts the `renderInteractiveForms`-option, please use the `annotationMode`-option instead.");
                  if (arguments[0].renderInteractiveForms === true && annotationMode === _util.AnnotationMode.ENABLE) {
                    annotationMode = _util.AnnotationMode.ENABLE_FORMS;
                  }
                }
                if (((_b = arguments[0]) == null ? void 0 : _b.includeAnnotationStorage) !== void 0) {
                  (0, _display_utils.deprecated)("render no longer accepts the `includeAnnotationStorage`-option, please use the `annotationMode`-option instead.");
                  if (arguments[0].includeAnnotationStorage === true && annotationMode === _util.AnnotationMode.ENABLE) {
                    annotationMode = _util.AnnotationMode.ENABLE_STORAGE;
                  }
                }
                if (this._stats) {
                  this._stats.time("Overall");
                }
                const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage);
                this.pendingCleanup = false;
                if (!optionalContentConfigPromise) {
                  optionalContentConfigPromise = this._transport.getOptionalContentConfig();
                }
                let intentState = this._intentStates.get(intentArgs.cacheKey);
                if (!intentState) {
                  intentState = /* @__PURE__ */ Object.create(null);
                  this._intentStates.set(intentArgs.cacheKey, intentState);
                }
                if (intentState.streamReaderCancelTimeout) {
                  clearTimeout(intentState.streamReaderCancelTimeout);
                  intentState.streamReaderCancelTimeout = null;
                }
                const canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
                  ownerDocument: this._ownerDocument
                });
                const intentPrint = !!(intentArgs.renderingIntent & _util.RenderingIntentFlag.PRINT);
                if (!intentState.displayReadyCapability) {
                  intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
                  intentState.operatorList = {
                    fnArray: [],
                    argsArray: [],
                    lastChunk: false,
                    separateAnnots: null
                  };
                  if (this._stats) {
                    this._stats.time("Page Request");
                  }
                  this._pumpOperatorList(intentArgs);
                }
                const complete = (error) => {
                  intentState.renderTasks.delete(internalRenderTask);
                  if (this.cleanupAfterRender || intentPrint) {
                    this.pendingCleanup = true;
                  }
                  this._tryCleanup();
                  if (error) {
                    internalRenderTask.capability.reject(error);
                    this._abortOperatorList({
                      intentState,
                      reason: error instanceof Error ? error : new Error(error)
                    });
                  } else {
                    internalRenderTask.capability.resolve();
                  }
                  if (this._stats) {
                    this._stats.timeEnd("Rendering");
                    this._stats.timeEnd("Overall");
                  }
                };
                const internalRenderTask = new InternalRenderTask({
                  callback: complete,
                  params: {
                    canvasContext,
                    viewport: viewport2,
                    transform,
                    imageLayer,
                    background
                  },
                  objs: this.objs,
                  commonObjs: this.commonObjs,
                  annotationCanvasMap,
                  operatorList: intentState.operatorList,
                  pageIndex: this._pageIndex,
                  canvasFactory: canvasFactoryInstance,
                  useRequestAnimationFrame: !intentPrint,
                  pdfBug: this._pdfBug,
                  pageColors
                });
                (intentState.renderTasks || (intentState.renderTasks = /* @__PURE__ */ new Set())).add(internalRenderTask);
                const renderTask = internalRenderTask.task;
                Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(([transparency, optionalContentConfig]) => {
                  if (this.pendingCleanup) {
                    complete();
                    return;
                  }
                  if (this._stats) {
                    this._stats.time("Rendering");
                  }
                  internalRenderTask.initializeGraphics({
                    transparency,
                    optionalContentConfig
                  });
                  internalRenderTask.operatorListChanged();
                }).catch(complete);
                return renderTask;
              }
              getOperatorList({
                intent = "display",
                annotationMode = _util.AnnotationMode.ENABLE,
                printAnnotationStorage = null
              } = {}) {
                function operatorListChanged() {
                  if (intentState.operatorList.lastChunk) {
                    intentState.opListReadCapability.resolve(intentState.operatorList);
                    intentState.renderTasks.delete(opListTask);
                  }
                }
                const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage, true);
                let intentState = this._intentStates.get(intentArgs.cacheKey);
                if (!intentState) {
                  intentState = /* @__PURE__ */ Object.create(null);
                  this._intentStates.set(intentArgs.cacheKey, intentState);
                }
                let opListTask;
                if (!intentState.opListReadCapability) {
                  opListTask = /* @__PURE__ */ Object.create(null);
                  opListTask.operatorListChanged = operatorListChanged;
                  intentState.opListReadCapability = (0, _util.createPromiseCapability)();
                  (intentState.renderTasks || (intentState.renderTasks = /* @__PURE__ */ new Set())).add(opListTask);
                  intentState.operatorList = {
                    fnArray: [],
                    argsArray: [],
                    lastChunk: false,
                    separateAnnots: null
                  };
                  if (this._stats) {
                    this._stats.time("Page Request");
                  }
                  this._pumpOperatorList(intentArgs);
                }
                return intentState.opListReadCapability.promise;
              }
              streamTextContent({
                disableCombineTextItems = false,
                includeMarkedContent = false
              } = {}) {
                const TEXT_CONTENT_CHUNK_SIZE = 100;
                return this._transport.messageHandler.sendWithStream("GetTextContent", {
                  pageIndex: this._pageIndex,
                  combineTextItems: disableCombineTextItems !== true,
                  includeMarkedContent: includeMarkedContent === true
                }, {
                  highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
                  size(textContent) {
                    return textContent.items.length;
                  }
                });
              }
              getTextContent(params = {}) {
                if (this._transport._htmlForXfa) {
                  return this.getXfa().then((xfa) => {
                    return _xfa_text.XfaText.textContent(xfa);
                  });
                }
                const readableStream = this.streamTextContent(params);
                return new Promise(function(resolve, reject) {
                  function pump() {
                    reader.read().then(function({
                      value,
                      done
                    }) {
                      if (done) {
                        resolve(textContent);
                        return;
                      }
                      Object.assign(textContent.styles, value.styles);
                      textContent.items.push(...value.items);
                      pump();
                    }, reject);
                  }
                  const reader = readableStream.getReader();
                  const textContent = {
                    items: [],
                    styles: /* @__PURE__ */ Object.create(null)
                  };
                  pump();
                });
              }
              getStructTree() {
                return this._structTreePromise || (this._structTreePromise = this._transport.getStructTree(this._pageIndex));
              }
              _destroy() {
                this.destroyed = true;
                const waitOn = [];
                for (const intentState of this._intentStates.values()) {
                  this._abortOperatorList({
                    intentState,
                    reason: new Error("Page was destroyed."),
                    force: true
                  });
                  if (intentState.opListReadCapability) {
                    continue;
                  }
                  for (const internalRenderTask of intentState.renderTasks) {
                    waitOn.push(internalRenderTask.completed);
                    internalRenderTask.cancel();
                  }
                }
                this.objs.clear();
                for (const bitmap of this._bitmaps) {
                  bitmap.close();
                }
                this._bitmaps.clear();
                this._annotationPromises.clear();
                this._jsActionsPromise = null;
                this._structTreePromise = null;
                this.pendingCleanup = false;
                return Promise.all(waitOn);
              }
              cleanup(resetStats = false) {
                this.pendingCleanup = true;
                return this._tryCleanup(resetStats);
              }
              _tryCleanup(resetStats = false) {
                if (!this.pendingCleanup) {
                  return false;
                }
                for (const {
                  renderTasks,
                  operatorList
                } of this._intentStates.values()) {
                  if (renderTasks.size > 0 || !operatorList.lastChunk) {
                    return false;
                  }
                }
                this._intentStates.clear();
                this.objs.clear();
                this._annotationPromises.clear();
                this._jsActionsPromise = null;
                this._structTreePromise = null;
                if (resetStats && this._stats) {
                  this._stats = new _display_utils.StatTimer();
                }
                for (const bitmap of this._bitmaps) {
                  bitmap.close();
                }
                this._bitmaps.clear();
                this.pendingCleanup = false;
                return true;
              }
              _startRenderPage(transparency, cacheKey) {
                const intentState = this._intentStates.get(cacheKey);
                if (!intentState) {
                  return;
                }
                if (this._stats) {
                  this._stats.timeEnd("Page Request");
                }
                if (intentState.displayReadyCapability) {
                  intentState.displayReadyCapability.resolve(transparency);
                }
              }
              _renderPageChunk(operatorListChunk, intentState) {
                for (let i = 0, ii = operatorListChunk.length; i < ii; i++) {
                  intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
                  intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
                }
                intentState.operatorList.lastChunk = operatorListChunk.lastChunk;
                intentState.operatorList.separateAnnots = operatorListChunk.separateAnnots;
                for (const internalRenderTask of intentState.renderTasks) {
                  internalRenderTask.operatorListChanged();
                }
                if (operatorListChunk.lastChunk) {
                  this._tryCleanup();
                }
              }
              _pumpOperatorList({
                renderingIntent,
                cacheKey,
                annotationStorageMap
              }) {
                const readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", {
                  pageIndex: this._pageIndex,
                  intent: renderingIntent,
                  cacheKey,
                  annotationStorage: annotationStorageMap
                });
                const reader = readableStream.getReader();
                const intentState = this._intentStates.get(cacheKey);
                intentState.streamReader = reader;
                const pump = () => {
                  reader.read().then(({
                    value,
                    done
                  }) => {
                    if (done) {
                      intentState.streamReader = null;
                      return;
                    }
                    if (this._transport.destroyed) {
                      return;
                    }
                    this._renderPageChunk(value, intentState);
                    pump();
                  }, (reason) => {
                    intentState.streamReader = null;
                    if (this._transport.destroyed) {
                      return;
                    }
                    if (intentState.operatorList) {
                      intentState.operatorList.lastChunk = true;
                      for (const internalRenderTask of intentState.renderTasks) {
                        internalRenderTask.operatorListChanged();
                      }
                      this._tryCleanup();
                    }
                    if (intentState.displayReadyCapability) {
                      intentState.displayReadyCapability.reject(reason);
                    } else if (intentState.opListReadCapability) {
                      intentState.opListReadCapability.reject(reason);
                    } else {
                      throw reason;
                    }
                  });
                };
                pump();
              }
              _abortOperatorList({
                intentState,
                reason,
                force = false
              }) {
                if (!intentState.streamReader) {
                  return;
                }
                if (!force) {
                  if (intentState.renderTasks.size > 0) {
                    return;
                  }
                  if (reason instanceof _display_utils.RenderingCancelledException) {
                    intentState.streamReaderCancelTimeout = setTimeout(() => {
                      this._abortOperatorList({
                        intentState,
                        reason,
                        force: true
                      });
                      intentState.streamReaderCancelTimeout = null;
                    }, RENDERING_CANCELLED_TIMEOUT);
                    return;
                  }
                }
                intentState.streamReader.cancel(new _util.AbortException(reason.message)).catch(() => {
                });
                intentState.streamReader = null;
                if (this._transport.destroyed) {
                  return;
                }
                for (const [curCacheKey, curIntentState] of this._intentStates) {
                  if (curIntentState === intentState) {
                    this._intentStates.delete(curCacheKey);
                    break;
                  }
                }
                this.cleanup();
              }
              get stats() {
                return this._stats;
              }
            }
            exports.PDFPageProxy = PDFPageProxy;
            class LoopbackPort {
              constructor() {
                this._listeners = [];
                this._deferred = Promise.resolve();
              }
              postMessage(obj, transfers) {
                const event = {
                  data: structuredClone(obj, transfers)
                };
                this._deferred.then(() => {
                  for (const listener of this._listeners) {
                    listener.call(this, event);
                  }
                });
              }
              addEventListener(name, listener) {
                this._listeners.push(listener);
              }
              removeEventListener(name, listener) {
                const i = this._listeners.indexOf(listener);
                this._listeners.splice(i, 1);
              }
              terminate() {
                this._listeners.length = 0;
              }
            }
            exports.LoopbackPort = LoopbackPort;
            const PDFWorkerUtil = {
              isWorkerDisabled: false,
              fallbackWorkerSrc: null,
              fakeWorkerId: 0
            };
            exports.PDFWorkerUtil = PDFWorkerUtil;
            {
              if (_is_node.isNodeJS && typeof commonjsRequire === "function") {
                PDFWorkerUtil.isWorkerDisabled = true;
                PDFWorkerUtil.fallbackWorkerSrc = "./pdf.worker.js";
              } else if (typeof document === "object") {
                const pdfjsFilePath = (_a = document == null ? void 0 : document.currentScript) == null ? void 0 : _a.src;
                if (pdfjsFilePath) {
                  PDFWorkerUtil.fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
                }
              }
              PDFWorkerUtil.isSameOrigin = function(baseUrl, otherUrl) {
                let base;
                try {
                  base = new URL(baseUrl);
                  if (!base.origin || base.origin === "null") {
                    return false;
                  }
                } catch (e) {
                  return false;
                }
                const other = new URL(otherUrl, base);
                return base.origin === other.origin;
              };
              PDFWorkerUtil.createCDNWrapper = function(url) {
                const wrapper = `importScripts("${url}");`;
                return URL.createObjectURL(new Blob([wrapper]));
              };
            }
            const _PDFWorker = class {
              constructor({
                name = null,
                port = null,
                verbosity = (0, _util.getVerbosityLevel)()
              } = {}) {
                if (port && __privateGet(_PDFWorker, _workerPorts).has(port)) {
                  throw new Error("Cannot use more than one PDFWorker per port.");
                }
                this.name = name;
                this.destroyed = false;
                this.verbosity = verbosity;
                this._readyCapability = (0, _util.createPromiseCapability)();
                this._port = null;
                this._webWorker = null;
                this._messageHandler = null;
                if (port) {
                  __privateGet(_PDFWorker, _workerPorts).set(port, this);
                  this._initializeFromPort(port);
                  return;
                }
                this._initialize();
              }
              get promise() {
                return this._readyCapability.promise;
              }
              get port() {
                return this._port;
              }
              get messageHandler() {
                return this._messageHandler;
              }
              _initializeFromPort(port) {
                this._port = port;
                this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);
                this._messageHandler.on("ready", function() {
                });
                this._readyCapability.resolve();
              }
              _initialize() {
                if (!PDFWorkerUtil.isWorkerDisabled && !_PDFWorker._mainThreadWorkerMessageHandler) {
                  let {
                    workerSrc
                  } = _PDFWorker;
                  try {
                    if (!PDFWorkerUtil.isSameOrigin(window.location.href, workerSrc)) {
                      workerSrc = PDFWorkerUtil.createCDNWrapper(new URL(workerSrc, window.location).href);
                    }
                    const worker2 = new Worker(workerSrc);
                    const messageHandler = new _message_handler.MessageHandler("main", "worker", worker2);
                    const terminateEarly = () => {
                      worker2.removeEventListener("error", onWorkerError);
                      messageHandler.destroy();
                      worker2.terminate();
                      if (this.destroyed) {
                        this._readyCapability.reject(new Error("Worker was destroyed"));
                      } else {
                        this._setupFakeWorker();
                      }
                    };
                    const onWorkerError = () => {
                      if (!this._webWorker) {
                        terminateEarly();
                      }
                    };
                    worker2.addEventListener("error", onWorkerError);
                    messageHandler.on("test", (data) => {
                      worker2.removeEventListener("error", onWorkerError);
                      if (this.destroyed) {
                        terminateEarly();
                        return;
                      }
                      if (data) {
                        this._messageHandler = messageHandler;
                        this._port = worker2;
                        this._webWorker = worker2;
                        this._readyCapability.resolve();
                        messageHandler.send("configure", {
                          verbosity: this.verbosity
                        });
                      } else {
                        this._setupFakeWorker();
                        messageHandler.destroy();
                        worker2.terminate();
                      }
                    });
                    messageHandler.on("ready", (data) => {
                      worker2.removeEventListener("error", onWorkerError);
                      if (this.destroyed) {
                        terminateEarly();
                        return;
                      }
                      try {
                        sendTest();
                      } catch (e) {
                        this._setupFakeWorker();
                      }
                    });
                    const sendTest = () => {
                      const testObj = new Uint8Array();
                      messageHandler.send("test", testObj, [testObj.buffer]);
                    };
                    sendTest();
                    return;
                  } catch (e) {
                    (0, _util.info)("The worker has been disabled.");
                  }
                }
                this._setupFakeWorker();
              }
              _setupFakeWorker() {
                if (!PDFWorkerUtil.isWorkerDisabled) {
                  (0, _util.warn)("Setting up fake worker.");
                  PDFWorkerUtil.isWorkerDisabled = true;
                }
                _PDFWorker._setupFakeWorkerGlobal.then((WorkerMessageHandler) => {
                  if (this.destroyed) {
                    this._readyCapability.reject(new Error("Worker was destroyed"));
                    return;
                  }
                  const port = new LoopbackPort();
                  this._port = port;
                  const id = `fake${PDFWorkerUtil.fakeWorkerId++}`;
                  const workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
                  WorkerMessageHandler.setup(workerHandler, port);
                  const messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
                  this._messageHandler = messageHandler;
                  this._readyCapability.resolve();
                  messageHandler.send("configure", {
                    verbosity: this.verbosity
                  });
                }).catch((reason) => {
                  this._readyCapability.reject(new Error(`Setting up fake worker failed: "${reason.message}".`));
                });
              }
              destroy() {
                this.destroyed = true;
                if (this._webWorker) {
                  this._webWorker.terminate();
                  this._webWorker = null;
                }
                __privateGet(_PDFWorker, _workerPorts).delete(this._port);
                this._port = null;
                if (this._messageHandler) {
                  this._messageHandler.destroy();
                  this._messageHandler = null;
                }
              }
              static fromPort(params) {
                if (!(params == null ? void 0 : params.port)) {
                  throw new Error("PDFWorker.fromPort - invalid method signature.");
                }
                if (__privateGet(this, _workerPorts).has(params.port)) {
                  return __privateGet(this, _workerPorts).get(params.port);
                }
                return new _PDFWorker(params);
              }
              static get workerSrc() {
                if (_worker_options.GlobalWorkerOptions.workerSrc) {
                  return _worker_options.GlobalWorkerOptions.workerSrc;
                }
                if (PDFWorkerUtil.fallbackWorkerSrc !== null) {
                  if (!_is_node.isNodeJS) {
                    (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
                  }
                  return PDFWorkerUtil.fallbackWorkerSrc;
                }
                throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
              }
              static get _mainThreadWorkerMessageHandler() {
                var _a2;
                try {
                  return ((_a2 = globalThis.pdfjsWorker) == null ? void 0 : _a2.WorkerMessageHandler) || null;
                } catch (ex) {
                  return null;
                }
              }
              static get _setupFakeWorkerGlobal() {
                const loader = async () => {
                  const mainWorkerMessageHandler = this._mainThreadWorkerMessageHandler;
                  if (mainWorkerMessageHandler) {
                    return mainWorkerMessageHandler;
                  }
                  if (_is_node.isNodeJS && typeof commonjsRequire === "function") {
                    const worker = eval("require")(this.workerSrc);
                    return worker.WorkerMessageHandler;
                  }
                  await (0, _display_utils.loadScript)(this.workerSrc);
                  return window.pdfjsWorker.WorkerMessageHandler;
                };
                return (0, _util.shadow)(this, "_setupFakeWorkerGlobal", loader());
              }
            };
            let PDFWorker = _PDFWorker;
            _workerPorts = new WeakMap();
            __privateAdd(PDFWorker, _workerPorts, /* @__PURE__ */ new WeakMap());
            exports.PDFWorker = PDFWorker;
            {
              PDFWorker.getWorkerSrc = function() {
                (0, _display_utils.deprecated)("`PDFWorker.getWorkerSrc()`, please use `PDFWorker.workerSrc` instead.");
                return this.workerSrc;
              };
            }
            class WorkerTransport {
              constructor(messageHandler, loadingTask, networkStream, params) {
                __privateAdd(this, _docStats, null);
                __privateAdd(this, _pageCache, /* @__PURE__ */ new Map());
                __privateAdd(this, _pagePromises, /* @__PURE__ */ new Map());
                __privateAdd(this, _metadataPromise, null);
                this.messageHandler = messageHandler;
                this.loadingTask = loadingTask;
                this.commonObjs = new PDFObjects();
                this.fontLoader = new _font_loader.FontLoader({
                  docId: loadingTask.docId,
                  onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
                  ownerDocument: params.ownerDocument,
                  styleElement: params.styleElement
                });
                this._params = params;
                if (!params.useWorkerFetch) {
                  this.CMapReaderFactory = new params.CMapReaderFactory({
                    baseUrl: params.cMapUrl,
                    isCompressed: params.cMapPacked
                  });
                  this.StandardFontDataFactory = new params.StandardFontDataFactory({
                    baseUrl: params.standardFontDataUrl
                  });
                }
                this.destroyed = false;
                this.destroyCapability = null;
                this._passwordCapability = null;
                this._networkStream = networkStream;
                this._fullReader = null;
                this._lastProgress = null;
                this.downloadInfoCapability = (0, _util.createPromiseCapability)();
                this.setupMessageHandler();
              }
              get annotationStorage() {
                return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
              }
              get stats() {
                return __privateGet(this, _docStats);
              }
              getRenderingIntent(intent, annotationMode = _util.AnnotationMode.ENABLE, printAnnotationStorage = null, isOpList = false) {
                let renderingIntent = _util.RenderingIntentFlag.DISPLAY;
                let annotationMap = null;
                switch (intent) {
                  case "any":
                    renderingIntent = _util.RenderingIntentFlag.ANY;
                    break;
                  case "display":
                    break;
                  case "print":
                    renderingIntent = _util.RenderingIntentFlag.PRINT;
                    break;
                  default:
                    (0, _util.warn)(`getRenderingIntent - invalid intent: ${intent}`);
                }
                switch (annotationMode) {
                  case _util.AnnotationMode.DISABLE:
                    renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                    break;
                  case _util.AnnotationMode.ENABLE:
                    break;
                  case _util.AnnotationMode.ENABLE_FORMS:
                    renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_FORMS;
                    break;
                  case _util.AnnotationMode.ENABLE_STORAGE:
                    renderingIntent += _util.RenderingIntentFlag.ANNOTATIONS_STORAGE;
                    const annotationStorage = renderingIntent & _util.RenderingIntentFlag.PRINT && printAnnotationStorage instanceof _annotation_storage.PrintAnnotationStorage ? printAnnotationStorage : this.annotationStorage;
                    annotationMap = annotationStorage.serializable;
                    break;
                  default:
                    (0, _util.warn)(`getRenderingIntent - invalid annotationMode: ${annotationMode}`);
                }
                if (isOpList) {
                  renderingIntent += _util.RenderingIntentFlag.OPLIST;
                }
                return {
                  renderingIntent,
                  cacheKey: `${renderingIntent}_${_annotation_storage.AnnotationStorage.getHash(annotationMap)}`,
                  annotationStorageMap: annotationMap
                };
              }
              destroy() {
                if (this.destroyCapability) {
                  return this.destroyCapability.promise;
                }
                this.destroyed = true;
                this.destroyCapability = (0, _util.createPromiseCapability)();
                if (this._passwordCapability) {
                  this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
                }
                const waitOn = [];
                for (const page of __privateGet(this, _pageCache).values()) {
                  waitOn.push(page._destroy());
                }
                __privateGet(this, _pageCache).clear();
                __privateGet(this, _pagePromises).clear();
                if (this.hasOwnProperty("annotationStorage")) {
                  this.annotationStorage.resetModified();
                }
                const terminated = this.messageHandler.sendWithPromise("Terminate", null);
                waitOn.push(terminated);
                Promise.all(waitOn).then(() => {
                  this.commonObjs.clear();
                  this.fontLoader.clear();
                  __privateSet(this, _metadataPromise, null);
                  this._getFieldObjectsPromise = null;
                  this._hasJSActionsPromise = null;
                  if (this._networkStream) {
                    this._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated."));
                  }
                  if (this.messageHandler) {
                    this.messageHandler.destroy();
                    this.messageHandler = null;
                  }
                  this.destroyCapability.resolve();
                }, this.destroyCapability.reject);
                return this.destroyCapability.promise;
              }
              setupMessageHandler() {
                const {
                  messageHandler,
                  loadingTask
                } = this;
                messageHandler.on("GetReader", (data, sink) => {
                  (0, _util.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available.");
                  this._fullReader = this._networkStream.getFullReader();
                  this._fullReader.onProgress = (evt) => {
                    this._lastProgress = {
                      loaded: evt.loaded,
                      total: evt.total
                    };
                  };
                  sink.onPull = () => {
                    this._fullReader.read().then(function({
                      value,
                      done
                    }) {
                      if (done) {
                        sink.close();
                        return;
                      }
                      (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
                      sink.enqueue(new Uint8Array(value), 1, [value]);
                    }).catch((reason) => {
                      sink.error(reason);
                    });
                  };
                  sink.onCancel = (reason) => {
                    this._fullReader.cancel(reason);
                    sink.ready.catch((readyReason) => {
                      if (this.destroyed) {
                        return;
                      }
                      throw readyReason;
                    });
                  };
                });
                messageHandler.on("ReaderHeadersReady", (data) => {
                  const headersCapability = (0, _util.createPromiseCapability)();
                  const fullReader = this._fullReader;
                  fullReader.headersReady.then(() => {
                    var _a2;
                    if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
                      if (this._lastProgress) {
                        (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, this._lastProgress);
                      }
                      fullReader.onProgress = (evt) => {
                        var _a3;
                        (_a3 = loadingTask.onProgress) == null ? void 0 : _a3.call(loadingTask, {
                          loaded: evt.loaded,
                          total: evt.total
                        });
                      };
                    }
                    headersCapability.resolve({
                      isStreamingSupported: fullReader.isStreamingSupported,
                      isRangeSupported: fullReader.isRangeSupported,
                      contentLength: fullReader.contentLength
                    });
                  }, headersCapability.reject);
                  return headersCapability.promise;
                });
                messageHandler.on("GetRangeReader", (data, sink) => {
                  (0, _util.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                  const rangeReader = this._networkStream.getRangeReader(data.begin, data.end);
                  if (!rangeReader) {
                    sink.close();
                    return;
                  }
                  sink.onPull = () => {
                    rangeReader.read().then(function({
                      value,
                      done
                    }) {
                      if (done) {
                        sink.close();
                        return;
                      }
                      (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
                      sink.enqueue(new Uint8Array(value), 1, [value]);
                    }).catch((reason) => {
                      sink.error(reason);
                    });
                  };
                  sink.onCancel = (reason) => {
                    rangeReader.cancel(reason);
                    sink.ready.catch((readyReason) => {
                      if (this.destroyed) {
                        return;
                      }
                      throw readyReason;
                    });
                  };
                });
                messageHandler.on("GetDoc", ({
                  pdfInfo
                }) => {
                  this._numPages = pdfInfo.numPages;
                  this._htmlForXfa = pdfInfo.htmlForXfa;
                  delete pdfInfo.htmlForXfa;
                  loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this));
                });
                messageHandler.on("DocException", function(ex) {
                  let reason;
                  switch (ex.name) {
                    case "PasswordException":
                      reason = new _util.PasswordException(ex.message, ex.code);
                      break;
                    case "InvalidPDFException":
                      reason = new _util.InvalidPDFException(ex.message);
                      break;
                    case "MissingPDFException":
                      reason = new _util.MissingPDFException(ex.message);
                      break;
                    case "UnexpectedResponseException":
                      reason = new _util.UnexpectedResponseException(ex.message, ex.status);
                      break;
                    case "UnknownErrorException":
                      reason = new _util.UnknownErrorException(ex.message, ex.details);
                      break;
                    default:
                      (0, _util.unreachable)("DocException - expected a valid Error.");
                  }
                  loadingTask._capability.reject(reason);
                });
                messageHandler.on("PasswordRequest", (exception) => {
                  this._passwordCapability = (0, _util.createPromiseCapability)();
                  if (loadingTask.onPassword) {
                    const updatePassword = (password) => {
                      if (password instanceof Error) {
                        this._passwordCapability.reject(password);
                      } else {
                        this._passwordCapability.resolve({
                          password
                        });
                      }
                    };
                    try {
                      loadingTask.onPassword(updatePassword, exception.code);
                    } catch (ex) {
                      this._passwordCapability.reject(ex);
                    }
                  } else {
                    this._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
                  }
                  return this._passwordCapability.promise;
                });
                messageHandler.on("DataLoaded", (data) => {
                  var _a2;
                  (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, {
                    loaded: data.length,
                    total: data.length
                  });
                  this.downloadInfoCapability.resolve(data);
                });
                messageHandler.on("StartRenderPage", (data) => {
                  if (this.destroyed) {
                    return;
                  }
                  const page = __privateGet(this, _pageCache).get(data.pageIndex);
                  page._startRenderPage(data.transparency, data.cacheKey);
                });
                messageHandler.on("commonobj", ([id, type, exportedData]) => {
                  var _a2;
                  if (this.destroyed) {
                    return;
                  }
                  if (this.commonObjs.has(id)) {
                    return;
                  }
                  switch (type) {
                    case "Font":
                      const params = this._params;
                      if ("error" in exportedData) {
                        const exportedError = exportedData.error;
                        (0, _util.warn)(`Error during font loading: ${exportedError}`);
                        this.commonObjs.resolve(id, exportedError);
                        break;
                      }
                      let fontRegistry = null;
                      if (params.pdfBug && ((_a2 = globalThis.FontInspector) == null ? void 0 : _a2.enabled)) {
                        fontRegistry = {
                          registerFont(font2, url) {
                            globalThis.FontInspector.fontAdded(font2, url);
                          }
                        };
                      }
                      const font = new _font_loader.FontFaceObject(exportedData, {
                        isEvalSupported: params.isEvalSupported,
                        disableFontFace: params.disableFontFace,
                        ignoreErrors: params.ignoreErrors,
                        onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
                        fontRegistry
                      });
                      this.fontLoader.bind(font).catch((reason) => {
                        return messageHandler.sendWithPromise("FontFallback", {
                          id
                        });
                      }).finally(() => {
                        if (!params.fontExtraProperties && font.data) {
                          font.data = null;
                        }
                        this.commonObjs.resolve(id, font);
                      });
                      break;
                    case "FontPath":
                    case "Image":
                      this.commonObjs.resolve(id, exportedData);
                      break;
                    default:
                      throw new Error(`Got unknown common object type ${type}`);
                  }
                });
                messageHandler.on("obj", ([id, pageIndex, type, imageData]) => {
                  var _a2;
                  if (this.destroyed) {
                    return;
                  }
                  const pageProxy = __privateGet(this, _pageCache).get(pageIndex);
                  if (pageProxy.objs.has(id)) {
                    return;
                  }
                  switch (type) {
                    case "Image":
                      pageProxy.objs.resolve(id, imageData);
                      const MAX_IMAGE_SIZE_TO_STORE = 8e6;
                      if (imageData) {
                        let length;
                        if (imageData.bitmap) {
                          const {
                            bitmap,
                            width,
                            height
                          } = imageData;
                          length = width * height * 4;
                          pageProxy._bitmaps.add(bitmap);
                        } else {
                          length = ((_a2 = imageData.data) == null ? void 0 : _a2.length) || 0;
                        }
                        if (length > MAX_IMAGE_SIZE_TO_STORE) {
                          pageProxy.cleanupAfterRender = true;
                        }
                      }
                      break;
                    case "Pattern":
                      pageProxy.objs.resolve(id, imageData);
                      break;
                    default:
                      throw new Error(`Got unknown object type ${type}`);
                  }
                });
                messageHandler.on("DocProgress", (data) => {
                  var _a2;
                  if (this.destroyed) {
                    return;
                  }
                  (_a2 = loadingTask.onProgress) == null ? void 0 : _a2.call(loadingTask, {
                    loaded: data.loaded,
                    total: data.total
                  });
                });
                messageHandler.on("DocStats", (data) => {
                  if (this.destroyed) {
                    return;
                  }
                  __privateSet(this, _docStats, Object.freeze({
                    streamTypes: Object.freeze(data.streamTypes),
                    fontTypes: Object.freeze(data.fontTypes)
                  }));
                });
                messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
                messageHandler.on("FetchBuiltInCMap", (data) => {
                  if (this.destroyed) {
                    return Promise.reject(new Error("Worker was destroyed."));
                  }
                  if (!this.CMapReaderFactory) {
                    return Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."));
                  }
                  return this.CMapReaderFactory.fetch(data);
                });
                messageHandler.on("FetchStandardFontData", (data) => {
                  if (this.destroyed) {
                    return Promise.reject(new Error("Worker was destroyed."));
                  }
                  if (!this.StandardFontDataFactory) {
                    return Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."));
                  }
                  return this.StandardFontDataFactory.fetch(data);
                });
              }
              _onUnsupportedFeature({
                featureId
              }) {
                var _a2, _b;
                if (this.destroyed) {
                  return;
                }
                (_b = (_a2 = this.loadingTask).onUnsupportedFeature) == null ? void 0 : _b.call(_a2, featureId);
              }
              getData() {
                return this.messageHandler.sendWithPromise("GetData", null);
              }
              getPage(pageNumber) {
                if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
                  return Promise.reject(new Error("Invalid page request."));
                }
                const pageIndex = pageNumber - 1, cachedPromise = __privateGet(this, _pagePromises).get(pageIndex);
                if (cachedPromise) {
                  return cachedPromise;
                }
                const promise = this.messageHandler.sendWithPromise("GetPage", {
                  pageIndex
                }).then((pageInfo) => {
                  if (this.destroyed) {
                    throw new Error("Transport destroyed");
                  }
                  const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.ownerDocument, this._params.pdfBug);
                  __privateGet(this, _pageCache).set(pageIndex, page);
                  return page;
                });
                __privateGet(this, _pagePromises).set(pageIndex, promise);
                return promise;
              }
              getPageIndex(ref) {
                if (typeof ref !== "object" || ref === null || !Number.isInteger(ref.num) || ref.num < 0 || !Number.isInteger(ref.gen) || ref.gen < 0) {
                  return Promise.reject(new Error("Invalid pageIndex request."));
                }
                return this.messageHandler.sendWithPromise("GetPageIndex", {
                  num: ref.num,
                  gen: ref.gen
                });
              }
              getAnnotations(pageIndex, intent) {
                return this.messageHandler.sendWithPromise("GetAnnotations", {
                  pageIndex,
                  intent
                });
              }
              saveDocument() {
                var _a2;
                return this.messageHandler.sendWithPromise("SaveDocument", {
                  isPureXfa: !!this._htmlForXfa,
                  numPages: this._numPages,
                  annotationStorage: this.annotationStorage.serializable,
                  filename: ((_a2 = this._fullReader) == null ? void 0 : _a2.filename) ?? null
                }).finally(() => {
                  this.annotationStorage.resetModified();
                });
              }
              getFieldObjects() {
                return this._getFieldObjectsPromise || (this._getFieldObjectsPromise = this.messageHandler.sendWithPromise("GetFieldObjects", null));
              }
              hasJSActions() {
                return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
              }
              getCalculationOrderIds() {
                return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
              }
              getDestinations() {
                return this.messageHandler.sendWithPromise("GetDestinations", null);
              }
              getDestination(id) {
                if (typeof id !== "string") {
                  return Promise.reject(new Error("Invalid destination request."));
                }
                return this.messageHandler.sendWithPromise("GetDestination", {
                  id
                });
              }
              getPageLabels() {
                return this.messageHandler.sendWithPromise("GetPageLabels", null);
              }
              getPageLayout() {
                return this.messageHandler.sendWithPromise("GetPageLayout", null);
              }
              getPageMode() {
                return this.messageHandler.sendWithPromise("GetPageMode", null);
              }
              getViewerPreferences() {
                return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
              }
              getOpenAction() {
                return this.messageHandler.sendWithPromise("GetOpenAction", null);
              }
              getAttachments() {
                return this.messageHandler.sendWithPromise("GetAttachments", null);
              }
              getJavaScript() {
                return this.messageHandler.sendWithPromise("GetJavaScript", null);
              }
              getDocJSActions() {
                return this.messageHandler.sendWithPromise("GetDocJSActions", null);
              }
              getPageJSActions(pageIndex) {
                return this.messageHandler.sendWithPromise("GetPageJSActions", {
                  pageIndex
                });
              }
              getStructTree(pageIndex) {
                return this.messageHandler.sendWithPromise("GetStructTree", {
                  pageIndex
                });
              }
              getOutline() {
                return this.messageHandler.sendWithPromise("GetOutline", null);
              }
              getOptionalContentConfig() {
                return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then((results) => {
                  return new _optional_content_config.OptionalContentConfig(results);
                });
              }
              getPermissions() {
                return this.messageHandler.sendWithPromise("GetPermissions", null);
              }
              getMetadata() {
                return __privateGet(this, _metadataPromise) || __privateSet(this, _metadataPromise, this.messageHandler.sendWithPromise("GetMetadata", null).then((results) => {
                  var _a2, _b;
                  return {
                    info: results[0],
                    metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
                    contentDispositionFilename: ((_a2 = this._fullReader) == null ? void 0 : _a2.filename) ?? null,
                    contentLength: ((_b = this._fullReader) == null ? void 0 : _b.contentLength) ?? null
                  };
                }));
              }
              getMarkInfo() {
                return this.messageHandler.sendWithPromise("GetMarkInfo", null);
              }
              async startCleanup(keepLoadedFonts = false) {
                await this.messageHandler.sendWithPromise("Cleanup", null);
                if (this.destroyed) {
                  return;
                }
                for (const page of __privateGet(this, _pageCache).values()) {
                  const cleanupSuccessful = page.cleanup();
                  if (!cleanupSuccessful) {
                    throw new Error(`startCleanup: Page ${page.pageNumber} is currently rendering.`);
                  }
                }
                this.commonObjs.clear();
                if (!keepLoadedFonts) {
                  this.fontLoader.clear();
                }
                __privateSet(this, _metadataPromise, null);
                this._getFieldObjectsPromise = null;
                this._hasJSActionsPromise = null;
              }
              get loadingParams() {
                const params = this._params;
                return (0, _util.shadow)(this, "loadingParams", {
                  disableAutoFetch: params.disableAutoFetch,
                  enableXfa: params.enableXfa
                });
              }
            }
            _docStats = new WeakMap();
            _pageCache = new WeakMap();
            _pagePromises = new WeakMap();
            _metadataPromise = new WeakMap();
            class PDFObjects {
              constructor() {
                __privateAdd(this, _ensureObj);
                __privateAdd(this, _objs, /* @__PURE__ */ Object.create(null));
              }
              get(objId, callback = null) {
                if (callback) {
                  const obj2 = __privateMethod(this, _ensureObj, ensureObj_fn).call(this, objId);
                  obj2.capability.promise.then(() => callback(obj2.data));
                  return null;
                }
                const obj = __privateGet(this, _objs)[objId];
                if (!(obj == null ? void 0 : obj.capability.settled)) {
                  throw new Error(`Requesting object that isn't resolved yet ${objId}.`);
                }
                return obj.data;
              }
              has(objId) {
                const obj = __privateGet(this, _objs)[objId];
                return (obj == null ? void 0 : obj.capability.settled) || false;
              }
              resolve(objId, data = null) {
                const obj = __privateMethod(this, _ensureObj, ensureObj_fn).call(this, objId);
                obj.data = data;
                obj.capability.resolve();
              }
              clear() {
                __privateSet(this, _objs, /* @__PURE__ */ Object.create(null));
              }
            }
            _objs = new WeakMap();
            _ensureObj = new WeakSet();
            ensureObj_fn = function(objId) {
              const obj = __privateGet(this, _objs)[objId];
              if (obj) {
                return obj;
              }
              return __privateGet(this, _objs)[objId] = {
                capability: (0, _util.createPromiseCapability)(),
                data: null
              };
            };
            class RenderTask {
              constructor(internalRenderTask) {
                __privateAdd(this, _internalRenderTask, null);
                __privateSet(this, _internalRenderTask, internalRenderTask);
                this.onContinue = null;
              }
              get promise() {
                return __privateGet(this, _internalRenderTask).capability.promise;
              }
              cancel() {
                __privateGet(this, _internalRenderTask).cancel();
              }
              get separateAnnots() {
                const {
                  separateAnnots
                } = __privateGet(this, _internalRenderTask).operatorList;
                if (!separateAnnots) {
                  return false;
                }
                const {
                  annotationCanvasMap
                } = __privateGet(this, _internalRenderTask);
                return separateAnnots.form || separateAnnots.canvas && (annotationCanvasMap == null ? void 0 : annotationCanvasMap.size) > 0;
              }
            }
            _internalRenderTask = new WeakMap();
            exports.RenderTask = RenderTask;
            const _InternalRenderTask = class {
              constructor({
                callback,
                params,
                objs,
                commonObjs,
                annotationCanvasMap,
                operatorList,
                pageIndex,
                canvasFactory,
                useRequestAnimationFrame = false,
                pdfBug = false,
                pageColors = null
              }) {
                this.callback = callback;
                this.params = params;
                this.objs = objs;
                this.commonObjs = commonObjs;
                this.annotationCanvasMap = annotationCanvasMap;
                this.operatorListIdx = null;
                this.operatorList = operatorList;
                this._pageIndex = pageIndex;
                this.canvasFactory = canvasFactory;
                this._pdfBug = pdfBug;
                this.pageColors = pageColors;
                this.running = false;
                this.graphicsReadyCallback = null;
                this.graphicsReady = false;
                this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
                this.cancelled = false;
                this.capability = (0, _util.createPromiseCapability)();
                this.task = new RenderTask(this);
                this._cancelBound = this.cancel.bind(this);
                this._continueBound = this._continue.bind(this);
                this._scheduleNextBound = this._scheduleNext.bind(this);
                this._nextBound = this._next.bind(this);
                this._canvas = params.canvasContext.canvas;
              }
              get completed() {
                return this.capability.promise.catch(function() {
                });
              }
              initializeGraphics({
                transparency = false,
                optionalContentConfig
              }) {
                var _a2;
                if (this.cancelled) {
                  return;
                }
                if (this._canvas) {
                  if (__privateGet(_InternalRenderTask, _canvasInUse).has(this._canvas)) {
                    throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                  }
                  __privateGet(_InternalRenderTask, _canvasInUse).add(this._canvas);
                }
                if (this._pdfBug && ((_a2 = globalThis.StepperManager) == null ? void 0 : _a2.enabled)) {
                  this.stepper = globalThis.StepperManager.create(this._pageIndex);
                  this.stepper.init(this.operatorList);
                  this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
                }
                const {
                  canvasContext,
                  viewport: viewport2,
                  transform,
                  imageLayer,
                  background
                } = this.params;
                this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, imageLayer, optionalContentConfig, this.annotationCanvasMap, this.pageColors);
                this.gfx.beginDrawing({
                  transform,
                  viewport: viewport2,
                  transparency,
                  background
                });
                this.operatorListIdx = 0;
                this.graphicsReady = true;
                if (this.graphicsReadyCallback) {
                  this.graphicsReadyCallback();
                }
              }
              cancel(error = null) {
                this.running = false;
                this.cancelled = true;
                if (this.gfx) {
                  this.gfx.endDrawing();
                }
                if (this._canvas) {
                  __privateGet(_InternalRenderTask, _canvasInUse).delete(this._canvas);
                }
                this.callback(error || new _display_utils.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, "canvas"));
              }
              operatorListChanged() {
                if (!this.graphicsReady) {
                  if (!this.graphicsReadyCallback) {
                    this.graphicsReadyCallback = this._continueBound;
                  }
                  return;
                }
                if (this.stepper) {
                  this.stepper.updateOperatorList(this.operatorList);
                }
                if (this.running) {
                  return;
                }
                this._continue();
              }
              _continue() {
                this.running = true;
                if (this.cancelled) {
                  return;
                }
                if (this.task.onContinue) {
                  this.task.onContinue(this._scheduleNextBound);
                } else {
                  this._scheduleNext();
                }
              }
              _scheduleNext() {
                if (this._useRequestAnimationFrame) {
                  window.requestAnimationFrame(() => {
                    this._nextBound().catch(this._cancelBound);
                  });
                } else {
                  Promise.resolve().then(this._nextBound).catch(this._cancelBound);
                }
              }
              async _next() {
                if (this.cancelled) {
                  return;
                }
                this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);
                if (this.operatorListIdx === this.operatorList.argsArray.length) {
                  this.running = false;
                  if (this.operatorList.lastChunk) {
                    this.gfx.endDrawing();
                    if (this._canvas) {
                      __privateGet(_InternalRenderTask, _canvasInUse).delete(this._canvas);
                    }
                    this.callback();
                  }
                }
              }
            };
            let InternalRenderTask = _InternalRenderTask;
            _canvasInUse = new WeakMap();
            __privateAdd(InternalRenderTask, _canvasInUse, /* @__PURE__ */ new WeakSet());
            const version = "2.16.105";
            exports.version = version;
            const build = "172ccdbe5";
            exports.build = build;
          },
          /* 5 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _setModified, setModified_fn, _serializable;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.PrintAnnotationStorage = exports2.AnnotationStorage = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _editor = __w_pdfjs_require__2(6);
            var _murmurhash = __w_pdfjs_require__2(10);
            class AnnotationStorage {
              constructor() {
                __privateAdd(this, _setModified);
                this._storage = /* @__PURE__ */ new Map();
                this._modified = false;
                this.onSetModified = null;
                this.onResetModified = null;
                this.onAnnotationEditor = null;
              }
              getValue(key, defaultValue) {
                const value = this._storage.get(key);
                if (value === void 0) {
                  return defaultValue;
                }
                return Object.assign(defaultValue, value);
              }
              getRawValue(key) {
                return this._storage.get(key);
              }
              remove(key) {
                this._storage.delete(key);
                if (this._storage.size === 0) {
                  this.resetModified();
                }
                if (typeof this.onAnnotationEditor === "function") {
                  for (const value of this._storage.values()) {
                    if (value instanceof _editor.AnnotationEditor) {
                      return;
                    }
                  }
                  this.onAnnotationEditor(null);
                }
              }
              setValue(key, value) {
                const obj = this._storage.get(key);
                let modified = false;
                if (obj !== void 0) {
                  for (const [entry, val] of Object.entries(value)) {
                    if (obj[entry] !== val) {
                      modified = true;
                      obj[entry] = val;
                    }
                  }
                } else {
                  modified = true;
                  this._storage.set(key, value);
                }
                if (modified) {
                  __privateMethod(this, _setModified, setModified_fn).call(this);
                }
                if (value instanceof _editor.AnnotationEditor && typeof this.onAnnotationEditor === "function") {
                  this.onAnnotationEditor(value.constructor._type);
                }
              }
              has(key) {
                return this._storage.has(key);
              }
              getAll() {
                return this._storage.size > 0 ? (0, _util2.objectFromMap)(this._storage) : null;
              }
              get size() {
                return this._storage.size;
              }
              resetModified() {
                if (this._modified) {
                  this._modified = false;
                  if (typeof this.onResetModified === "function") {
                    this.onResetModified();
                  }
                }
              }
              get print() {
                return new PrintAnnotationStorage(this);
              }
              get serializable() {
                if (this._storage.size === 0) {
                  return null;
                }
                const clone = /* @__PURE__ */ new Map();
                for (const [key, val] of this._storage) {
                  const serialized = val instanceof _editor.AnnotationEditor ? val.serialize() : val;
                  if (serialized) {
                    clone.set(key, serialized);
                  }
                }
                return clone;
              }
              static getHash(map) {
                if (!map) {
                  return "";
                }
                const hash2 = new _murmurhash.MurmurHash3_64();
                for (const [key, val] of map) {
                  hash2.update(`${key}:${JSON.stringify(val)}`);
                }
                return hash2.hexdigest();
              }
            }
            _setModified = new WeakSet();
            setModified_fn = function() {
              if (!this._modified) {
                this._modified = true;
                if (typeof this.onSetModified === "function") {
                  this.onSetModified();
                }
              }
            };
            exports2.AnnotationStorage = AnnotationStorage;
            class PrintAnnotationStorage extends AnnotationStorage {
              constructor(parent) {
                super();
                __privateAdd(this, _serializable, null);
                __privateSet(this, _serializable, structuredClone(parent.serializable));
              }
              get print() {
                (0, _util2.unreachable)("Should not call PrintAnnotationStorage.print");
              }
              get serializable() {
                return __privateGet(this, _serializable);
              }
            }
            _serializable = new WeakMap();
            exports2.PrintAnnotationStorage = PrintAnnotationStorage;
          },
          /* 6 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _boundFocusin, _boundFocusout, _hasBeenSelected, _isEditing, _isInEditMode, _zIndex;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.AnnotationEditor = void 0;
            var _tools = __w_pdfjs_require__2(7);
            var _util2 = __w_pdfjs_require__2(1);
            const _AnnotationEditor = class {
              constructor(parameters) {
                __privateAdd(this, _boundFocusin, this.focusin.bind(this));
                __privateAdd(this, _boundFocusout, this.focusout.bind(this));
                __privateAdd(this, _hasBeenSelected, false);
                __privateAdd(this, _isEditing, false);
                __privateAdd(this, _isInEditMode, false);
                __privateAdd(this, _zIndex, _AnnotationEditor._zIndex++);
                if (this.constructor === _AnnotationEditor) {
                  (0, _util2.unreachable)("Cannot initialize AnnotationEditor.");
                }
                this.parent = parameters.parent;
                this.id = parameters.id;
                this.width = this.height = null;
                this.pageIndex = parameters.parent.pageIndex;
                this.name = parameters.name;
                this.div = null;
                const [width, height] = this.parent.viewportBaseDimensions;
                this.x = parameters.x / width;
                this.y = parameters.y / height;
                this.rotation = this.parent.viewport.rotation;
                this.isAttachedToDOM = false;
              }
              static get _defaultLineColor() {
                return (0, _util2.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
              }
              setInBackground() {
                this.div.style.zIndex = 0;
              }
              setInForeground() {
                this.div.style.zIndex = __privateGet(this, _zIndex);
              }
              focusin(event) {
                if (!__privateGet(this, _hasBeenSelected)) {
                  this.parent.setSelected(this);
                } else {
                  __privateSet(this, _hasBeenSelected, false);
                }
              }
              focusout(event) {
                if (!this.isAttachedToDOM) {
                  return;
                }
                const target = event.relatedTarget;
                if (target == null ? void 0 : target.closest(`#${this.id}`)) {
                  return;
                }
                event.preventDefault();
                if (!this.parent.isMultipleSelection) {
                  this.commitOrRemove();
                }
              }
              commitOrRemove() {
                if (this.isEmpty()) {
                  this.remove();
                } else {
                  this.commit();
                }
              }
              commit() {
                this.parent.addToAnnotationStorage(this);
              }
              dragstart(event) {
                const rect = this.parent.div.getBoundingClientRect();
                this.startX = event.clientX - rect.x;
                this.startY = event.clientY - rect.y;
                event.dataTransfer.setData("text/plain", this.id);
                event.dataTransfer.effectAllowed = "move";
              }
              setAt(x, y, tx, ty) {
                const [width, height] = this.parent.viewportBaseDimensions;
                [tx, ty] = this.screenToPageTranslation(tx, ty);
                this.x = (x + tx) / width;
                this.y = (y + ty) / height;
                this.div.style.left = `${100 * this.x}%`;
                this.div.style.top = `${100 * this.y}%`;
              }
              translate(x, y) {
                const [width, height] = this.parent.viewportBaseDimensions;
                [x, y] = this.screenToPageTranslation(x, y);
                this.x += x / width;
                this.y += y / height;
                this.div.style.left = `${100 * this.x}%`;
                this.div.style.top = `${100 * this.y}%`;
              }
              screenToPageTranslation(x, y) {
                const {
                  rotation
                } = this.parent.viewport;
                switch (rotation) {
                  case 90:
                    return [y, -x];
                  case 180:
                    return [-x, -y];
                  case 270:
                    return [-y, x];
                  default:
                    return [x, y];
                }
              }
              setDims(width, height) {
                const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
                this.div.style.width = `${100 * width / parentWidth}%`;
                this.div.style.height = `${100 * height / parentHeight}%`;
              }
              getInitialTranslation() {
                return [0, 0];
              }
              render() {
                this.div = document.createElement("div");
                this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360);
                this.div.className = this.name;
                this.div.setAttribute("id", this.id);
                this.div.setAttribute("tabIndex", 0);
                this.setInForeground();
                this.div.addEventListener("focusin", __privateGet(this, _boundFocusin));
                this.div.addEventListener("focusout", __privateGet(this, _boundFocusout));
                const [tx, ty] = this.getInitialTranslation();
                this.translate(tx, ty);
                (0, _tools.bindEvents)(this, this.div, ["dragstart", "pointerdown"]);
                return this.div;
              }
              pointerdown(event) {
                const isMac = _tools.KeyboardManager.platform.isMac;
                if (event.button !== 0 || event.ctrlKey && isMac) {
                  event.preventDefault();
                  return;
                }
                if (event.ctrlKey && !isMac || event.shiftKey || event.metaKey && isMac) {
                  this.parent.toggleSelected(this);
                } else {
                  this.parent.setSelected(this);
                }
                __privateSet(this, _hasBeenSelected, true);
              }
              getRect(tx, ty) {
                const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
                const [pageWidth, pageHeight] = this.parent.pageDimensions;
                const shiftX = pageWidth * tx / parentWidth;
                const shiftY = pageHeight * ty / parentHeight;
                const x = this.x * pageWidth;
                const y = this.y * pageHeight;
                const width = this.width * pageWidth;
                const height = this.height * pageHeight;
                switch (this.rotation) {
                  case 0:
                    return [x + shiftX, pageHeight - y - shiftY - height, x + shiftX + width, pageHeight - y - shiftY];
                  case 90:
                    return [x + shiftY, pageHeight - y + shiftX, x + shiftY + height, pageHeight - y + shiftX + width];
                  case 180:
                    return [x - shiftX - width, pageHeight - y + shiftY, x - shiftX, pageHeight - y + shiftY + height];
                  case 270:
                    return [x - shiftY - height, pageHeight - y - shiftX - width, x - shiftY, pageHeight - y - shiftX];
                  default:
                    throw new Error("Invalid rotation");
                }
              }
              getRectInCurrentCoords(rect, pageHeight) {
                const [x1, y1, x2, y2] = rect;
                const width = x2 - x1;
                const height = y2 - y1;
                switch (this.rotation) {
                  case 0:
                    return [x1, pageHeight - y2, width, height];
                  case 90:
                    return [x1, pageHeight - y1, height, width];
                  case 180:
                    return [x2, pageHeight - y1, width, height];
                  case 270:
                    return [x2, pageHeight - y2, height, width];
                  default:
                    throw new Error("Invalid rotation");
                }
              }
              onceAdded() {
              }
              isEmpty() {
                return false;
              }
              enableEditMode() {
                __privateSet(this, _isInEditMode, true);
              }
              disableEditMode() {
                __privateSet(this, _isInEditMode, false);
              }
              isInEditMode() {
                return __privateGet(this, _isInEditMode);
              }
              shouldGetKeyboardEvents() {
                return false;
              }
              needsToBeRebuilt() {
                return this.div && !this.isAttachedToDOM;
              }
              rebuild() {
                var _a;
                (_a = this.div) == null ? void 0 : _a.addEventListener("focusin", __privateGet(this, _boundFocusin));
              }
              serialize() {
                (0, _util2.unreachable)("An editor must be serializable");
              }
              static deserialize(data, parent) {
                const editor = new this.prototype.constructor({
                  parent,
                  id: parent.getNextId()
                });
                editor.rotation = data.rotation;
                const [pageWidth, pageHeight] = parent.pageDimensions;
                const [x, y, width, height] = editor.getRectInCurrentCoords(data.rect, pageHeight);
                editor.x = x / pageWidth;
                editor.y = y / pageHeight;
                editor.width = width / pageWidth;
                editor.height = height / pageHeight;
                return editor;
              }
              remove() {
                this.div.removeEventListener("focusin", __privateGet(this, _boundFocusin));
                this.div.removeEventListener("focusout", __privateGet(this, _boundFocusout));
                if (!this.isEmpty()) {
                  this.commit();
                }
                this.parent.remove(this);
              }
              select() {
                var _a;
                (_a = this.div) == null ? void 0 : _a.classList.add("selectedEditor");
              }
              unselect() {
                var _a;
                (_a = this.div) == null ? void 0 : _a.classList.remove("selectedEditor");
              }
              updateParams(type, value) {
              }
              disableEditing() {
              }
              enableEditing() {
              }
              get propertiesToUpdate() {
                return {};
              }
              get contentDiv() {
                return this.div;
              }
              get isEditing() {
                return __privateGet(this, _isEditing);
              }
              set isEditing(value) {
                __privateSet(this, _isEditing, value);
                if (value) {
                  this.parent.setSelected(this);
                  this.parent.setActiveEditor(this);
                } else {
                  this.parent.setActiveEditor(null);
                }
              }
            };
            let AnnotationEditor = _AnnotationEditor;
            _boundFocusin = new WeakMap();
            _boundFocusout = new WeakMap();
            _hasBeenSelected = new WeakMap();
            _isEditing = new WeakMap();
            _isInEditMode = new WeakMap();
            _zIndex = new WeakMap();
            __publicField(AnnotationEditor, "_colorManager", new _tools.ColorManager());
            __publicField(AnnotationEditor, "_zIndex", 1);
            exports2.AnnotationEditor = AnnotationEditor;
          },
          /* 7 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _id, _commands, _locked, _maxSize, _position, _serialize, serialize_fn, _elements, _activeEditor, _allEditors, _allLayers, _clipboardManager, _commandManager, _currentPageIndex, _editorTypes, _eventBus, _idManager, _isEnabled, _mode, _selectedEditors, _boundKeydown, _boundOnEditingAction, _boundOnPageChanging, _previousStates, _container, _addKeyboardManager, addKeyboardManager_fn, _removeKeyboardManager, removeKeyboardManager_fn, _dispatchUpdateStates, dispatchUpdateStates_fn, _dispatchUpdateUI, dispatchUpdateUI_fn, _enableAll, enableAll_fn, _disableAll, disableAll_fn, _addEditorToLayer, addEditorToLayer_fn, _isEmpty, isEmpty_fn, _selectEditors, selectEditors_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.KeyboardManager = exports2.CommandManager = exports2.ColorManager = exports2.AnnotationEditorUIManager = void 0;
            exports2.bindEvents = bindEvents;
            exports2.opacityToHex = opacityToHex;
            var _util2 = __w_pdfjs_require__2(1);
            var _display_utils2 = __w_pdfjs_require__2(8);
            function bindEvents(obj, element, names) {
              for (const name of names) {
                element.addEventListener(name, obj[name].bind(obj));
              }
            }
            function opacityToHex(opacity) {
              return Math.round(Math.min(255, Math.max(1, 255 * opacity))).toString(16).padStart(2, "0");
            }
            class IdManager {
              constructor() {
                __privateAdd(this, _id, 0);
              }
              getId() {
                return `${_util2.AnnotationEditorPrefix}${__privateWrapper(this, _id)._++}`;
              }
            }
            _id = new WeakMap();
            class CommandManager {
              constructor(maxSize = 128) {
                __privateAdd(this, _commands, []);
                __privateAdd(this, _locked, false);
                __privateAdd(this, _maxSize, void 0);
                __privateAdd(this, _position, -1);
                __privateSet(this, _maxSize, maxSize);
              }
              add({
                cmd,
                undo,
                mustExec,
                type = NaN,
                overwriteIfSameType = false,
                keepUndo = false
              }) {
                if (mustExec) {
                  cmd();
                }
                if (__privateGet(this, _locked)) {
                  return;
                }
                const save = {
                  cmd,
                  undo,
                  type
                };
                if (__privateGet(this, _position) === -1) {
                  if (__privateGet(this, _commands).length > 0) {
                    __privateGet(this, _commands).length = 0;
                  }
                  __privateSet(this, _position, 0);
                  __privateGet(this, _commands).push(save);
                  return;
                }
                if (overwriteIfSameType && __privateGet(this, _commands)[__privateGet(this, _position)].type === type) {
                  if (keepUndo) {
                    save.undo = __privateGet(this, _commands)[__privateGet(this, _position)].undo;
                  }
                  __privateGet(this, _commands)[__privateGet(this, _position)] = save;
                  return;
                }
                const next = __privateGet(this, _position) + 1;
                if (next === __privateGet(this, _maxSize)) {
                  __privateGet(this, _commands).splice(0, 1);
                } else {
                  __privateSet(this, _position, next);
                  if (next < __privateGet(this, _commands).length) {
                    __privateGet(this, _commands).splice(next);
                  }
                }
                __privateGet(this, _commands).push(save);
              }
              undo() {
                if (__privateGet(this, _position) === -1) {
                  return;
                }
                __privateSet(this, _locked, true);
                __privateGet(this, _commands)[__privateGet(this, _position)].undo();
                __privateSet(this, _locked, false);
                __privateSet(this, _position, __privateGet(this, _position) - 1);
              }
              redo() {
                if (__privateGet(this, _position) < __privateGet(this, _commands).length - 1) {
                  __privateSet(this, _position, __privateGet(this, _position) + 1);
                  __privateSet(this, _locked, true);
                  __privateGet(this, _commands)[__privateGet(this, _position)].cmd();
                  __privateSet(this, _locked, false);
                }
              }
              hasSomethingToUndo() {
                return __privateGet(this, _position) !== -1;
              }
              hasSomethingToRedo() {
                return __privateGet(this, _position) < __privateGet(this, _commands).length - 1;
              }
              destroy() {
                __privateSet(this, _commands, null);
              }
            }
            _commands = new WeakMap();
            _locked = new WeakMap();
            _maxSize = new WeakMap();
            _position = new WeakMap();
            exports2.CommandManager = CommandManager;
            const _KeyboardManager = class {
              constructor(callbacks) {
                __privateAdd(this, _serialize);
                this.buffer = [];
                this.callbacks = /* @__PURE__ */ new Map();
                this.allKeys = /* @__PURE__ */ new Set();
                const isMac = _KeyboardManager.platform.isMac;
                for (const [keys, callback] of callbacks) {
                  for (const key of keys) {
                    const isMacKey = key.startsWith("mac+");
                    if (isMac && isMacKey) {
                      this.callbacks.set(key.slice(4), callback);
                      this.allKeys.add(key.split("+").at(-1));
                    } else if (!isMac && !isMacKey) {
                      this.callbacks.set(key, callback);
                      this.allKeys.add(key.split("+").at(-1));
                    }
                  }
                }
              }
              static get platform() {
                const platform = typeof navigator !== "undefined" ? navigator.platform : "";
                return (0, _util2.shadow)(this, "platform", {
                  isWin: platform.includes("Win"),
                  isMac: platform.includes("Mac")
                });
              }
              exec(self2, event) {
                if (!this.allKeys.has(event.key)) {
                  return;
                }
                const callback = this.callbacks.get(__privateMethod(this, _serialize, serialize_fn).call(this, event));
                if (!callback) {
                  return;
                }
                callback.bind(self2)();
                event.stopPropagation();
                event.preventDefault();
              }
            };
            let KeyboardManager = _KeyboardManager;
            _serialize = new WeakSet();
            serialize_fn = function(event) {
              if (event.altKey) {
                this.buffer.push("alt");
              }
              if (event.ctrlKey) {
                this.buffer.push("ctrl");
              }
              if (event.metaKey) {
                this.buffer.push("meta");
              }
              if (event.shiftKey) {
                this.buffer.push("shift");
              }
              this.buffer.push(event.key);
              const str = this.buffer.join("+");
              this.buffer.length = 0;
              return str;
            };
            exports2.KeyboardManager = KeyboardManager;
            class ClipboardManager {
              constructor() {
                __privateAdd(this, _elements, null);
              }
              copy(element) {
                if (!element) {
                  return;
                }
                if (Array.isArray(element)) {
                  __privateSet(this, _elements, element.map((el) => el.serialize()));
                } else {
                  __privateSet(this, _elements, [element.serialize()]);
                }
                __privateSet(this, _elements, __privateGet(this, _elements).filter((el) => !!el));
                if (__privateGet(this, _elements).length === 0) {
                  __privateSet(this, _elements, null);
                }
              }
              paste() {
                return __privateGet(this, _elements);
              }
              isEmpty() {
                return __privateGet(this, _elements) === null;
              }
              destroy() {
                __privateSet(this, _elements, null);
              }
            }
            _elements = new WeakMap();
            const _ColorManager = class {
              get _colors() {
                const colors = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
                (0, _display_utils2.getColorValues)(colors);
                return (0, _util2.shadow)(this, "_colors", colors);
              }
              convert(color) {
                const rgb = (0, _display_utils2.getRGB)(color);
                if (!window.matchMedia("(forced-colors: active)").matches) {
                  return rgb;
                }
                for (const [name, RGB] of this._colors) {
                  if (RGB.every((x, i) => x === rgb[i])) {
                    return _ColorManager._colorsMapping.get(name);
                  }
                }
                return rgb;
              }
              getHexCode(name) {
                const rgb = this._colors.get(name);
                if (!rgb) {
                  return name;
                }
                return _util2.Util.makeHexColor(...rgb);
              }
            };
            let ColorManager = _ColorManager;
            __publicField(ColorManager, "_colorsMapping", /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]));
            exports2.ColorManager = ColorManager;
            const _AnnotationEditorUIManager = class {
              constructor(container, eventBus) {
                __privateAdd(this, _addKeyboardManager);
                __privateAdd(this, _removeKeyboardManager);
                __privateAdd(this, _dispatchUpdateStates);
                __privateAdd(this, _dispatchUpdateUI);
                __privateAdd(this, _enableAll);
                __privateAdd(this, _disableAll);
                __privateAdd(this, _addEditorToLayer);
                __privateAdd(this, _isEmpty);
                __privateAdd(this, _selectEditors);
                __privateAdd(this, _activeEditor, null);
                __privateAdd(this, _allEditors, /* @__PURE__ */ new Map());
                __privateAdd(this, _allLayers, /* @__PURE__ */ new Map());
                __privateAdd(this, _clipboardManager, new ClipboardManager());
                __privateAdd(this, _commandManager, new CommandManager());
                __privateAdd(this, _currentPageIndex, 0);
                __privateAdd(this, _editorTypes, null);
                __privateAdd(this, _eventBus, null);
                __privateAdd(this, _idManager, new IdManager());
                __privateAdd(this, _isEnabled, false);
                __privateAdd(this, _mode, _util2.AnnotationEditorType.NONE);
                __privateAdd(this, _selectedEditors, /* @__PURE__ */ new Set());
                __privateAdd(this, _boundKeydown, this.keydown.bind(this));
                __privateAdd(this, _boundOnEditingAction, this.onEditingAction.bind(this));
                __privateAdd(this, _boundOnPageChanging, this.onPageChanging.bind(this));
                __privateAdd(this, _previousStates, {
                  isEditing: false,
                  isEmpty: true,
                  hasEmptyClipboard: true,
                  hasSomethingToUndo: false,
                  hasSomethingToRedo: false,
                  hasSelectedEditor: false
                });
                __privateAdd(this, _container, null);
                __privateSet(this, _container, container);
                __privateSet(this, _eventBus, eventBus);
                __privateGet(this, _eventBus)._on("editingaction", __privateGet(this, _boundOnEditingAction));
                __privateGet(this, _eventBus)._on("pagechanging", __privateGet(this, _boundOnPageChanging));
              }
              destroy() {
                __privateMethod(this, _removeKeyboardManager, removeKeyboardManager_fn).call(this);
                __privateGet(this, _eventBus)._off("editingaction", __privateGet(this, _boundOnEditingAction));
                __privateGet(this, _eventBus)._off("pagechanging", __privateGet(this, _boundOnPageChanging));
                for (const layer of __privateGet(this, _allLayers).values()) {
                  layer.destroy();
                }
                __privateGet(this, _allLayers).clear();
                __privateGet(this, _allEditors).clear();
                __privateSet(this, _activeEditor, null);
                __privateGet(this, _selectedEditors).clear();
                __privateGet(this, _clipboardManager).destroy();
                __privateGet(this, _commandManager).destroy();
              }
              onPageChanging({
                pageNumber
              }) {
                __privateSet(this, _currentPageIndex, pageNumber - 1);
              }
              focusMainContainer() {
                __privateGet(this, _container).focus();
              }
              keydown(event) {
                var _a;
                if (!((_a = this.getActive()) == null ? void 0 : _a.shouldGetKeyboardEvents())) {
                  _AnnotationEditorUIManager._keyboardManager.exec(this, event);
                }
              }
              onEditingAction(details) {
                if (["undo", "redo", "cut", "copy", "paste", "delete", "selectAll"].includes(details.name)) {
                  this[details.name]();
                }
              }
              setEditingState(isEditing) {
                if (isEditing) {
                  __privateMethod(this, _addKeyboardManager, addKeyboardManager_fn).call(this);
                  __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                    isEditing: __privateGet(this, _mode) !== _util2.AnnotationEditorType.NONE,
                    isEmpty: __privateMethod(this, _isEmpty, isEmpty_fn).call(this),
                    hasSomethingToUndo: __privateGet(this, _commandManager).hasSomethingToUndo(),
                    hasSomethingToRedo: __privateGet(this, _commandManager).hasSomethingToRedo(),
                    hasSelectedEditor: false,
                    hasEmptyClipboard: __privateGet(this, _clipboardManager).isEmpty()
                  });
                } else {
                  __privateMethod(this, _removeKeyboardManager, removeKeyboardManager_fn).call(this);
                  __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                    isEditing: false
                  });
                }
              }
              registerEditorTypes(types) {
                __privateSet(this, _editorTypes, types);
                for (const editorType of __privateGet(this, _editorTypes)) {
                  __privateMethod(this, _dispatchUpdateUI, dispatchUpdateUI_fn).call(this, editorType.defaultPropertiesToUpdate);
                }
              }
              getId() {
                return __privateGet(this, _idManager).getId();
              }
              addLayer(layer) {
                __privateGet(this, _allLayers).set(layer.pageIndex, layer);
                if (__privateGet(this, _isEnabled)) {
                  layer.enable();
                } else {
                  layer.disable();
                }
              }
              removeLayer(layer) {
                __privateGet(this, _allLayers).delete(layer.pageIndex);
              }
              updateMode(mode) {
                __privateSet(this, _mode, mode);
                if (mode === _util2.AnnotationEditorType.NONE) {
                  this.setEditingState(false);
                  __privateMethod(this, _disableAll, disableAll_fn).call(this);
                } else {
                  this.setEditingState(true);
                  __privateMethod(this, _enableAll, enableAll_fn).call(this);
                  for (const layer of __privateGet(this, _allLayers).values()) {
                    layer.updateMode(mode);
                  }
                }
              }
              updateToolbar(mode) {
                if (mode === __privateGet(this, _mode)) {
                  return;
                }
                __privateGet(this, _eventBus).dispatch("switchannotationeditormode", {
                  source: this,
                  mode
                });
              }
              updateParams(type, value) {
                for (const editor of __privateGet(this, _selectedEditors)) {
                  editor.updateParams(type, value);
                }
                for (const editorType of __privateGet(this, _editorTypes)) {
                  editorType.updateDefaultParams(type, value);
                }
              }
              getEditors(pageIndex) {
                const editors = [];
                for (const editor of __privateGet(this, _allEditors).values()) {
                  if (editor.pageIndex === pageIndex) {
                    editors.push(editor);
                  }
                }
                return editors;
              }
              getEditor(id) {
                return __privateGet(this, _allEditors).get(id);
              }
              addEditor(editor) {
                __privateGet(this, _allEditors).set(editor.id, editor);
              }
              removeEditor(editor) {
                __privateGet(this, _allEditors).delete(editor.id);
                this.unselect(editor);
              }
              setActiveEditor(editor) {
                if (__privateGet(this, _activeEditor) === editor) {
                  return;
                }
                __privateSet(this, _activeEditor, editor);
                if (editor) {
                  __privateMethod(this, _dispatchUpdateUI, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
                }
              }
              toggleSelected(editor) {
                if (__privateGet(this, _selectedEditors).has(editor)) {
                  __privateGet(this, _selectedEditors).delete(editor);
                  editor.unselect();
                  __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                    hasSelectedEditor: this.hasSelection
                  });
                  return;
                }
                __privateGet(this, _selectedEditors).add(editor);
                editor.select();
                __privateMethod(this, _dispatchUpdateUI, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSelectedEditor: true
                });
              }
              setSelected(editor) {
                for (const ed of __privateGet(this, _selectedEditors)) {
                  if (ed !== editor) {
                    ed.unselect();
                  }
                }
                __privateGet(this, _selectedEditors).clear();
                __privateGet(this, _selectedEditors).add(editor);
                editor.select();
                __privateMethod(this, _dispatchUpdateUI, dispatchUpdateUI_fn).call(this, editor.propertiesToUpdate);
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSelectedEditor: true
                });
              }
              isSelected(editor) {
                return __privateGet(this, _selectedEditors).has(editor);
              }
              unselect(editor) {
                editor.unselect();
                __privateGet(this, _selectedEditors).delete(editor);
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSelectedEditor: this.hasSelection
                });
              }
              get hasSelection() {
                return __privateGet(this, _selectedEditors).size !== 0;
              }
              undo() {
                __privateGet(this, _commandManager).undo();
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSomethingToUndo: __privateGet(this, _commandManager).hasSomethingToUndo(),
                  hasSomethingToRedo: true,
                  isEmpty: __privateMethod(this, _isEmpty, isEmpty_fn).call(this)
                });
              }
              redo() {
                __privateGet(this, _commandManager).redo();
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSomethingToUndo: true,
                  hasSomethingToRedo: __privateGet(this, _commandManager).hasSomethingToRedo(),
                  isEmpty: __privateMethod(this, _isEmpty, isEmpty_fn).call(this)
                });
              }
              addCommands(params) {
                __privateGet(this, _commandManager).add(params);
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSomethingToUndo: true,
                  hasSomethingToRedo: false,
                  isEmpty: __privateMethod(this, _isEmpty, isEmpty_fn).call(this)
                });
              }
              delete() {
                if (__privateGet(this, _activeEditor)) {
                  __privateGet(this, _activeEditor).commitOrRemove();
                }
                if (!this.hasSelection) {
                  return;
                }
                const editors = [...__privateGet(this, _selectedEditors)];
                const cmd = () => {
                  for (const editor of editors) {
                    editor.remove();
                  }
                };
                const undo = () => {
                  for (const editor of editors) {
                    __privateMethod(this, _addEditorToLayer, addEditorToLayer_fn).call(this, editor);
                  }
                };
                this.addCommands({
                  cmd,
                  undo,
                  mustExec: true
                });
              }
              copy() {
                if (__privateGet(this, _activeEditor)) {
                  __privateGet(this, _activeEditor).commitOrRemove();
                }
                if (this.hasSelection) {
                  const editors = [];
                  for (const editor of __privateGet(this, _selectedEditors)) {
                    if (!editor.isEmpty()) {
                      editors.push(editor);
                    }
                  }
                  if (editors.length === 0) {
                    return;
                  }
                  __privateGet(this, _clipboardManager).copy(editors);
                  __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                    hasEmptyClipboard: false
                  });
                }
              }
              cut() {
                this.copy();
                this.delete();
              }
              paste() {
                if (__privateGet(this, _clipboardManager).isEmpty()) {
                  return;
                }
                this.unselectAll();
                const layer = __privateGet(this, _allLayers).get(__privateGet(this, _currentPageIndex));
                const newEditors = __privateGet(this, _clipboardManager).paste().map((data) => layer.deserialize(data));
                const cmd = () => {
                  for (const editor of newEditors) {
                    __privateMethod(this, _addEditorToLayer, addEditorToLayer_fn).call(this, editor);
                  }
                  __privateMethod(this, _selectEditors, selectEditors_fn).call(this, newEditors);
                };
                const undo = () => {
                  for (const editor of newEditors) {
                    editor.remove();
                  }
                };
                this.addCommands({
                  cmd,
                  undo,
                  mustExec: true
                });
              }
              selectAll() {
                for (const editor of __privateGet(this, _selectedEditors)) {
                  editor.commit();
                }
                __privateMethod(this, _selectEditors, selectEditors_fn).call(this, __privateGet(this, _allEditors).values());
              }
              unselectAll() {
                if (__privateGet(this, _activeEditor)) {
                  __privateGet(this, _activeEditor).commitOrRemove();
                  return;
                }
                if (__privateMethod(this, _selectEditors, selectEditors_fn).size === 0) {
                  return;
                }
                for (const editor of __privateGet(this, _selectedEditors)) {
                  editor.unselect();
                }
                __privateGet(this, _selectedEditors).clear();
                __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                  hasSelectedEditor: false
                });
              }
              isActive(editor) {
                return __privateGet(this, _activeEditor) === editor;
              }
              getActive() {
                return __privateGet(this, _activeEditor);
              }
              getMode() {
                return __privateGet(this, _mode);
              }
            };
            let AnnotationEditorUIManager = _AnnotationEditorUIManager;
            _activeEditor = new WeakMap();
            _allEditors = new WeakMap();
            _allLayers = new WeakMap();
            _clipboardManager = new WeakMap();
            _commandManager = new WeakMap();
            _currentPageIndex = new WeakMap();
            _editorTypes = new WeakMap();
            _eventBus = new WeakMap();
            _idManager = new WeakMap();
            _isEnabled = new WeakMap();
            _mode = new WeakMap();
            _selectedEditors = new WeakMap();
            _boundKeydown = new WeakMap();
            _boundOnEditingAction = new WeakMap();
            _boundOnPageChanging = new WeakMap();
            _previousStates = new WeakMap();
            _container = new WeakMap();
            _addKeyboardManager = new WeakSet();
            addKeyboardManager_fn = function() {
              __privateGet(this, _container).addEventListener("keydown", __privateGet(this, _boundKeydown));
            };
            _removeKeyboardManager = new WeakSet();
            removeKeyboardManager_fn = function() {
              __privateGet(this, _container).removeEventListener("keydown", __privateGet(this, _boundKeydown));
            };
            _dispatchUpdateStates = new WeakSet();
            dispatchUpdateStates_fn = function(details) {
              const hasChanged = Object.entries(details).some(([key, value]) => __privateGet(this, _previousStates)[key] !== value);
              if (hasChanged) {
                __privateGet(this, _eventBus).dispatch("annotationeditorstateschanged", {
                  source: this,
                  details: Object.assign(__privateGet(this, _previousStates), details)
                });
              }
            };
            _dispatchUpdateUI = new WeakSet();
            dispatchUpdateUI_fn = function(details) {
              __privateGet(this, _eventBus).dispatch("annotationeditorparamschanged", {
                source: this,
                details
              });
            };
            _enableAll = new WeakSet();
            enableAll_fn = function() {
              if (!__privateGet(this, _isEnabled)) {
                __privateSet(this, _isEnabled, true);
                for (const layer of __privateGet(this, _allLayers).values()) {
                  layer.enable();
                }
              }
            };
            _disableAll = new WeakSet();
            disableAll_fn = function() {
              this.unselectAll();
              if (__privateGet(this, _isEnabled)) {
                __privateSet(this, _isEnabled, false);
                for (const layer of __privateGet(this, _allLayers).values()) {
                  layer.disable();
                }
              }
            };
            _addEditorToLayer = new WeakSet();
            addEditorToLayer_fn = function(editor) {
              const layer = __privateGet(this, _allLayers).get(editor.pageIndex);
              if (layer) {
                layer.addOrRebuild(editor);
              } else {
                this.addEditor(editor);
              }
            };
            _isEmpty = new WeakSet();
            isEmpty_fn = function() {
              if (__privateGet(this, _allEditors).size === 0) {
                return true;
              }
              if (__privateGet(this, _allEditors).size === 1) {
                for (const editor of __privateGet(this, _allEditors).values()) {
                  return editor.isEmpty();
                }
              }
              return false;
            };
            _selectEditors = new WeakSet();
            selectEditors_fn = function(editors) {
              __privateGet(this, _selectedEditors).clear();
              for (const editor of editors) {
                if (editor.isEmpty()) {
                  continue;
                }
                __privateGet(this, _selectedEditors).add(editor);
                editor.select();
              }
              __privateMethod(this, _dispatchUpdateStates, dispatchUpdateStates_fn).call(this, {
                hasSelectedEditor: true
              });
            };
            __publicField(AnnotationEditorUIManager, "_keyboardManager", new KeyboardManager([[["ctrl+a", "mac+meta+a"], _AnnotationEditorUIManager.prototype.selectAll], [["ctrl+c", "mac+meta+c"], _AnnotationEditorUIManager.prototype.copy], [["ctrl+v", "mac+meta+v"], _AnnotationEditorUIManager.prototype.paste], [["ctrl+x", "mac+meta+x"], _AnnotationEditorUIManager.prototype.cut], [["ctrl+z", "mac+meta+z"], _AnnotationEditorUIManager.prototype.undo], [["ctrl+y", "ctrl+shift+Z", "mac+meta+shift+Z"], _AnnotationEditorUIManager.prototype.redo], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete"], _AnnotationEditorUIManager.prototype.delete], [["Escape", "mac+Escape"], _AnnotationEditorUIManager.prototype.unselectAll]]));
            exports2.AnnotationEditorUIManager = AnnotationEditorUIManager;
          },
          /* 8 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.StatTimer = exports2.RenderingCancelledException = exports2.PixelsPerInch = exports2.PageViewport = exports2.PDFDateString = exports2.DOMStandardFontDataFactory = exports2.DOMSVGFactory = exports2.DOMCanvasFactory = exports2.DOMCMapReaderFactory = exports2.AnnotationPrefix = void 0;
            exports2.deprecated = deprecated;
            exports2.getColorValues = getColorValues;
            exports2.getCurrentTransform = getCurrentTransform;
            exports2.getCurrentTransformInverse = getCurrentTransformInverse;
            exports2.getFilenameFromUrl = getFilenameFromUrl;
            exports2.getPdfFilenameFromUrl = getPdfFilenameFromUrl;
            exports2.getRGB = getRGB;
            exports2.getXfaPageViewport = getXfaPageViewport;
            exports2.isDataScheme = isDataScheme;
            exports2.isPdfFile = isPdfFile;
            exports2.isValidFetchUrl = isValidFetchUrl;
            exports2.loadScript = loadScript;
            var _base_factory = __w_pdfjs_require__2(9);
            var _util2 = __w_pdfjs_require__2(1);
            const SVG_NS = "http://www.w3.org/2000/svg";
            const AnnotationPrefix = "pdfjs_internal_id_";
            exports2.AnnotationPrefix = AnnotationPrefix;
            const _PixelsPerInch = class {
            };
            let PixelsPerInch = _PixelsPerInch;
            __publicField(PixelsPerInch, "CSS", 96);
            __publicField(PixelsPerInch, "PDF", 72);
            __publicField(PixelsPerInch, "PDF_TO_CSS_UNITS", _PixelsPerInch.CSS / _PixelsPerInch.PDF);
            exports2.PixelsPerInch = PixelsPerInch;
            class DOMCanvasFactory extends _base_factory.BaseCanvasFactory {
              constructor({
                ownerDocument = globalThis.document
              } = {}) {
                super();
                this._document = ownerDocument;
              }
              _createCanvas(width, height) {
                const canvas = this._document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                return canvas;
              }
            }
            exports2.DOMCanvasFactory = DOMCanvasFactory;
            async function fetchData(url, asTypedArray = false) {
              if (isValidFetchUrl(url, document.baseURI)) {
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return asTypedArray ? new Uint8Array(await response.arrayBuffer()) : (0, _util2.stringToBytes)(await response.text());
              }
              return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open("GET", url, true);
                if (asTypedArray) {
                  request.responseType = "arraybuffer";
                }
                request.onreadystatechange = () => {
                  if (request.readyState !== XMLHttpRequest.DONE) {
                    return;
                  }
                  if (request.status === 200 || request.status === 0) {
                    let data;
                    if (asTypedArray && request.response) {
                      data = new Uint8Array(request.response);
                    } else if (!asTypedArray && request.responseText) {
                      data = (0, _util2.stringToBytes)(request.responseText);
                    }
                    if (data) {
                      resolve(data);
                      return;
                    }
                  }
                  reject(new Error(request.statusText));
                };
                request.send(null);
              });
            }
            class DOMCMapReaderFactory extends _base_factory.BaseCMapReaderFactory {
              _fetchData(url, compressionType) {
                return fetchData(url, this.isCompressed).then((data) => {
                  return {
                    cMapData: data,
                    compressionType
                  };
                });
              }
            }
            exports2.DOMCMapReaderFactory = DOMCMapReaderFactory;
            class DOMStandardFontDataFactory extends _base_factory.BaseStandardFontDataFactory {
              _fetchData(url) {
                return fetchData(url, true);
              }
            }
            exports2.DOMStandardFontDataFactory = DOMStandardFontDataFactory;
            class DOMSVGFactory extends _base_factory.BaseSVGFactory {
              _createSVG(type) {
                return document.createElementNS(SVG_NS, type);
              }
            }
            exports2.DOMSVGFactory = DOMSVGFactory;
            class PageViewport {
              constructor({
                viewBox,
                scale,
                rotation,
                offsetX = 0,
                offsetY = 0,
                dontFlip = false
              }) {
                this.viewBox = viewBox;
                this.scale = scale;
                this.rotation = rotation;
                this.offsetX = offsetX;
                this.offsetY = offsetY;
                const centerX = (viewBox[2] + viewBox[0]) / 2;
                const centerY = (viewBox[3] + viewBox[1]) / 2;
                let rotateA, rotateB, rotateC, rotateD;
                rotation %= 360;
                if (rotation < 0) {
                  rotation += 360;
                }
                switch (rotation) {
                  case 180:
                    rotateA = -1;
                    rotateB = 0;
                    rotateC = 0;
                    rotateD = 1;
                    break;
                  case 90:
                    rotateA = 0;
                    rotateB = 1;
                    rotateC = 1;
                    rotateD = 0;
                    break;
                  case 270:
                    rotateA = 0;
                    rotateB = -1;
                    rotateC = -1;
                    rotateD = 0;
                    break;
                  case 0:
                    rotateA = 1;
                    rotateB = 0;
                    rotateC = 0;
                    rotateD = -1;
                    break;
                  default:
                    throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
                }
                if (dontFlip) {
                  rotateC = -rotateC;
                  rotateD = -rotateD;
                }
                let offsetCanvasX, offsetCanvasY;
                let width, height;
                if (rotateA === 0) {
                  offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
                  offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
                  width = Math.abs(viewBox[3] - viewBox[1]) * scale;
                  height = Math.abs(viewBox[2] - viewBox[0]) * scale;
                } else {
                  offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
                  offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
                  width = Math.abs(viewBox[2] - viewBox[0]) * scale;
                  height = Math.abs(viewBox[3] - viewBox[1]) * scale;
                }
                this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
                this.width = width;
                this.height = height;
              }
              clone({
                scale = this.scale,
                rotation = this.rotation,
                offsetX = this.offsetX,
                offsetY = this.offsetY,
                dontFlip = false
              } = {}) {
                return new PageViewport({
                  viewBox: this.viewBox.slice(),
                  scale,
                  rotation,
                  offsetX,
                  offsetY,
                  dontFlip
                });
              }
              convertToViewportPoint(x, y) {
                return _util2.Util.applyTransform([x, y], this.transform);
              }
              convertToViewportRectangle(rect) {
                const topLeft = _util2.Util.applyTransform([rect[0], rect[1]], this.transform);
                const bottomRight = _util2.Util.applyTransform([rect[2], rect[3]], this.transform);
                return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
              }
              convertToPdfPoint(x, y) {
                return _util2.Util.applyInverseTransform([x, y], this.transform);
              }
            }
            exports2.PageViewport = PageViewport;
            class RenderingCancelledException extends _util2.BaseException {
              constructor(msg, type) {
                super(msg, "RenderingCancelledException");
                this.type = type;
              }
            }
            exports2.RenderingCancelledException = RenderingCancelledException;
            function isDataScheme(url) {
              const ii = url.length;
              let i = 0;
              while (i < ii && url[i].trim() === "") {
                i++;
              }
              return url.substring(i, i + 5).toLowerCase() === "data:";
            }
            function isPdfFile(filename) {
              return typeof filename === "string" && /\.pdf$/i.test(filename);
            }
            function getFilenameFromUrl(url) {
              const anchor = url.indexOf("#");
              const query = url.indexOf("?");
              const end2 = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
              return url.substring(url.lastIndexOf("/", end2) + 1, end2);
            }
            function getPdfFilenameFromUrl(url, defaultFilename = "document.pdf") {
              if (typeof url !== "string") {
                return defaultFilename;
              }
              if (isDataScheme(url)) {
                (0, _util2.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
                return defaultFilename;
              }
              const reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
              const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
              const splitURI = reURI.exec(url);
              let suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
              if (suggestedFilename) {
                suggestedFilename = suggestedFilename[0];
                if (suggestedFilename.includes("%")) {
                  try {
                    suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
                  } catch (ex) {
                  }
                }
              }
              return suggestedFilename || defaultFilename;
            }
            class StatTimer {
              constructor() {
                this.started = /* @__PURE__ */ Object.create(null);
                this.times = [];
              }
              time(name) {
                if (name in this.started) {
                  (0, _util2.warn)(`Timer is already running for ${name}`);
                }
                this.started[name] = Date.now();
              }
              timeEnd(name) {
                if (!(name in this.started)) {
                  (0, _util2.warn)(`Timer has not been started for ${name}`);
                }
                this.times.push({
                  name,
                  start: this.started[name],
                  end: Date.now()
                });
                delete this.started[name];
              }
              toString() {
                const outBuf = [];
                let longest = 0;
                for (const time of this.times) {
                  const name = time.name;
                  if (name.length > longest) {
                    longest = name.length;
                  }
                }
                for (const time of this.times) {
                  const duration = time.end - time.start;
                  outBuf.push(`${time.name.padEnd(longest)} ${duration}ms
`);
                }
                return outBuf.join("");
              }
            }
            exports2.StatTimer = StatTimer;
            function isValidFetchUrl(url, baseUrl) {
              try {
                const {
                  protocol
                } = baseUrl ? new URL(url, baseUrl) : new URL(url);
                return protocol === "http:" || protocol === "https:";
              } catch (ex) {
                return false;
              }
            }
            function loadScript(src, removeScriptElement = false) {
              return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = function(evt) {
                  if (removeScriptElement) {
                    script.remove();
                  }
                  resolve(evt);
                };
                script.onerror = function() {
                  reject(new Error(`Cannot load script at: ${script.src}`));
                };
                (document.head || document.documentElement).append(script);
              });
            }
            function deprecated(details) {
              console.log("Deprecated API usage: " + details);
            }
            let pdfDateStringRegex;
            class PDFDateString {
              static toDateObject(input) {
                if (!input || typeof input !== "string") {
                  return null;
                }
                if (!pdfDateStringRegex) {
                  pdfDateStringRegex = new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?");
                }
                const matches = pdfDateStringRegex.exec(input);
                if (!matches) {
                  return null;
                }
                const year = parseInt(matches[1], 10);
                let month = parseInt(matches[2], 10);
                month = month >= 1 && month <= 12 ? month - 1 : 0;
                let day = parseInt(matches[3], 10);
                day = day >= 1 && day <= 31 ? day : 1;
                let hour = parseInt(matches[4], 10);
                hour = hour >= 0 && hour <= 23 ? hour : 0;
                let minute = parseInt(matches[5], 10);
                minute = minute >= 0 && minute <= 59 ? minute : 0;
                let second = parseInt(matches[6], 10);
                second = second >= 0 && second <= 59 ? second : 0;
                const universalTimeRelation = matches[7] || "Z";
                let offsetHour = parseInt(matches[8], 10);
                offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
                let offsetMinute = parseInt(matches[9], 10) || 0;
                offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;
                if (universalTimeRelation === "-") {
                  hour += offsetHour;
                  minute += offsetMinute;
                } else if (universalTimeRelation === "+") {
                  hour -= offsetHour;
                  minute -= offsetMinute;
                }
                return new Date(Date.UTC(year, month, day, hour, minute, second));
              }
            }
            exports2.PDFDateString = PDFDateString;
            function getXfaPageViewport(xfaPage, {
              scale = 1,
              rotation = 0
            }) {
              const {
                width,
                height
              } = xfaPage.attributes.style;
              const viewBox = [0, 0, parseInt(width), parseInt(height)];
              return new PageViewport({
                viewBox,
                scale,
                rotation
              });
            }
            function getRGB(color) {
              if (color.startsWith("#")) {
                const colorRGB = parseInt(color.slice(1), 16);
                return [(colorRGB & 16711680) >> 16, (colorRGB & 65280) >> 8, colorRGB & 255];
              }
              if (color.startsWith("rgb(")) {
                return color.slice(4, -1).split(",").map((x) => parseInt(x));
              }
              if (color.startsWith("rgba(")) {
                return color.slice(5, -1).split(",").map((x) => parseInt(x)).slice(0, 3);
              }
              (0, _util2.warn)(`Not a valid color format: "${color}"`);
              return [0, 0, 0];
            }
            function getColorValues(colors) {
              const span = document.createElement("span");
              span.style.visibility = "hidden";
              document.body.append(span);
              for (const name of colors.keys()) {
                span.style.color = name;
                const computedColor = window.getComputedStyle(span).color;
                colors.set(name, getRGB(computedColor));
              }
              span.remove();
            }
            function getCurrentTransform(ctx) {
              const {
                a,
                b,
                c,
                d,
                e,
                f
              } = ctx.getTransform();
              return [a, b, c, d, e, f];
            }
            function getCurrentTransformInverse(ctx) {
              const {
                a,
                b,
                c,
                d,
                e,
                f
              } = ctx.getTransform().invertSelf();
              return [a, b, c, d, e, f];
            }
          },
          /* 9 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.BaseStandardFontDataFactory = exports2.BaseSVGFactory = exports2.BaseCanvasFactory = exports2.BaseCMapReaderFactory = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            class BaseCanvasFactory {
              constructor() {
                if (this.constructor === BaseCanvasFactory) {
                  (0, _util2.unreachable)("Cannot initialize BaseCanvasFactory.");
                }
              }
              create(width, height) {
                if (width <= 0 || height <= 0) {
                  throw new Error("Invalid canvas size");
                }
                const canvas = this._createCanvas(width, height);
                return {
                  canvas,
                  context: canvas.getContext("2d")
                };
              }
              reset(canvasAndContext, width, height) {
                if (!canvasAndContext.canvas) {
                  throw new Error("Canvas is not specified");
                }
                if (width <= 0 || height <= 0) {
                  throw new Error("Invalid canvas size");
                }
                canvasAndContext.canvas.width = width;
                canvasAndContext.canvas.height = height;
              }
              destroy(canvasAndContext) {
                if (!canvasAndContext.canvas) {
                  throw new Error("Canvas is not specified");
                }
                canvasAndContext.canvas.width = 0;
                canvasAndContext.canvas.height = 0;
                canvasAndContext.canvas = null;
                canvasAndContext.context = null;
              }
              _createCanvas(width, height) {
                (0, _util2.unreachable)("Abstract method `_createCanvas` called.");
              }
            }
            exports2.BaseCanvasFactory = BaseCanvasFactory;
            class BaseCMapReaderFactory {
              constructor({
                baseUrl = null,
                isCompressed = false
              }) {
                if (this.constructor === BaseCMapReaderFactory) {
                  (0, _util2.unreachable)("Cannot initialize BaseCMapReaderFactory.");
                }
                this.baseUrl = baseUrl;
                this.isCompressed = isCompressed;
              }
              async fetch({
                name
              }) {
                if (!this.baseUrl) {
                  throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
                }
                if (!name) {
                  throw new Error("CMap name must be specified.");
                }
                const url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
                const compressionType = this.isCompressed ? _util2.CMapCompressionType.BINARY : _util2.CMapCompressionType.NONE;
                return this._fetchData(url, compressionType).catch((reason) => {
                  throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${url}`);
                });
              }
              _fetchData(url, compressionType) {
                (0, _util2.unreachable)("Abstract method `_fetchData` called.");
              }
            }
            exports2.BaseCMapReaderFactory = BaseCMapReaderFactory;
            class BaseStandardFontDataFactory {
              constructor({
                baseUrl = null
              }) {
                if (this.constructor === BaseStandardFontDataFactory) {
                  (0, _util2.unreachable)("Cannot initialize BaseStandardFontDataFactory.");
                }
                this.baseUrl = baseUrl;
              }
              async fetch({
                filename
              }) {
                if (!this.baseUrl) {
                  throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
                }
                if (!filename) {
                  throw new Error("Font filename must be specified.");
                }
                const url = `${this.baseUrl}${filename}`;
                return this._fetchData(url).catch((reason) => {
                  throw new Error(`Unable to load font data at: ${url}`);
                });
              }
              _fetchData(url) {
                (0, _util2.unreachable)("Abstract method `_fetchData` called.");
              }
            }
            exports2.BaseStandardFontDataFactory = BaseStandardFontDataFactory;
            class BaseSVGFactory {
              constructor() {
                if (this.constructor === BaseSVGFactory) {
                  (0, _util2.unreachable)("Cannot initialize BaseSVGFactory.");
                }
              }
              create(width, height, skipDimensions = false) {
                if (width <= 0 || height <= 0) {
                  throw new Error("Invalid SVG dimensions");
                }
                const svg = this._createSVG("svg:svg");
                svg.setAttribute("version", "1.1");
                if (!skipDimensions) {
                  svg.setAttribute("width", `${width}px`);
                  svg.setAttribute("height", `${height}px`);
                }
                svg.setAttribute("preserveAspectRatio", "none");
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
                return svg;
              }
              createElement(type) {
                if (typeof type !== "string") {
                  throw new Error("Invalid SVG element type");
                }
                return this._createSVG(type);
              }
              _createSVG(type) {
                (0, _util2.unreachable)("Abstract method `_createSVG` called.");
              }
            }
            exports2.BaseSVGFactory = BaseSVGFactory;
          },
          /* 10 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.MurmurHash3_64 = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            const SEED = 3285377520;
            const MASK_HIGH = 4294901760;
            const MASK_LOW = 65535;
            class MurmurHash3_64 {
              constructor(seed) {
                this.h1 = seed ? seed & 4294967295 : SEED;
                this.h2 = seed ? seed & 4294967295 : SEED;
              }
              update(input) {
                let data, length;
                if (typeof input === "string") {
                  data = new Uint8Array(input.length * 2);
                  length = 0;
                  for (let i = 0, ii = input.length; i < ii; i++) {
                    const code = input.charCodeAt(i);
                    if (code <= 255) {
                      data[length++] = code;
                    } else {
                      data[length++] = code >>> 8;
                      data[length++] = code & 255;
                    }
                  }
                } else if ((0, _util2.isArrayBuffer)(input)) {
                  data = input.slice();
                  length = data.byteLength;
                } else {
                  throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.");
                }
                const blockCounts = length >> 2;
                const tailLength = length - blockCounts * 4;
                const dataUint32 = new Uint32Array(data.buffer, 0, blockCounts);
                let k1 = 0, k2 = 0;
                let h1 = this.h1, h2 = this.h2;
                const C1 = 3432918353, C2 = 461845907;
                const C1_LOW = C1 & MASK_LOW, C2_LOW = C2 & MASK_LOW;
                for (let i = 0; i < blockCounts; i++) {
                  if (i & 1) {
                    k1 = dataUint32[i];
                    k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
                    k1 = k1 << 15 | k1 >>> 17;
                    k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
                    h1 ^= k1;
                    h1 = h1 << 13 | h1 >>> 19;
                    h1 = h1 * 5 + 3864292196;
                  } else {
                    k2 = dataUint32[i];
                    k2 = k2 * C1 & MASK_HIGH | k2 * C1_LOW & MASK_LOW;
                    k2 = k2 << 15 | k2 >>> 17;
                    k2 = k2 * C2 & MASK_HIGH | k2 * C2_LOW & MASK_LOW;
                    h2 ^= k2;
                    h2 = h2 << 13 | h2 >>> 19;
                    h2 = h2 * 5 + 3864292196;
                  }
                }
                k1 = 0;
                switch (tailLength) {
                  case 3:
                    k1 ^= data[blockCounts * 4 + 2] << 16;
                  case 2:
                    k1 ^= data[blockCounts * 4 + 1] << 8;
                  case 1:
                    k1 ^= data[blockCounts * 4];
                    k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
                    k1 = k1 << 15 | k1 >>> 17;
                    k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
                    if (blockCounts & 1) {
                      h1 ^= k1;
                    } else {
                      h2 ^= k1;
                    }
                }
                this.h1 = h1;
                this.h2 = h2;
              }
              hexdigest() {
                let h1 = this.h1, h2 = this.h2;
                h1 ^= h2 >>> 1;
                h1 = h1 * 3981806797 & MASK_HIGH | h1 * 36045 & MASK_LOW;
                h2 = h2 * 4283543511 & MASK_HIGH | ((h2 << 16 | h1 >>> 16) * 2950163797 & MASK_HIGH) >>> 16;
                h1 ^= h2 >>> 1;
                h1 = h1 * 444984403 & MASK_HIGH | h1 * 60499 & MASK_LOW;
                h2 = h2 * 3301882366 & MASK_HIGH | ((h2 << 16 | h1 >>> 16) * 3120437893 & MASK_HIGH) >>> 16;
                h1 ^= h2 >>> 1;
                const hex1 = (h1 >>> 0).toString(16), hex2 = (h2 >>> 0).toString(16);
                return hex1.padStart(8, "0") + hex2.padStart(8, "0");
              }
            }
            exports2.MurmurHash3_64 = MurmurHash3_64;
          },
          /* 11 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.FontLoader = exports2.FontFaceObject = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            class BaseFontLoader {
              constructor({
                docId,
                onUnsupportedFeature,
                ownerDocument = globalThis.document,
                styleElement = null
              }) {
                if (this.constructor === BaseFontLoader) {
                  (0, _util2.unreachable)("Cannot initialize BaseFontLoader.");
                }
                this.docId = docId;
                this._onUnsupportedFeature = onUnsupportedFeature;
                this._document = ownerDocument;
                this.nativeFontFaces = [];
                this.styleElement = null;
              }
              addNativeFontFace(nativeFontFace) {
                this.nativeFontFaces.push(nativeFontFace);
                this._document.fonts.add(nativeFontFace);
              }
              insertRule(rule) {
                let styleElement = this.styleElement;
                if (!styleElement) {
                  styleElement = this.styleElement = this._document.createElement("style");
                  styleElement.id = `PDFJS_FONT_STYLE_TAG_${this.docId}`;
                  this._document.documentElement.getElementsByTagName("head")[0].append(styleElement);
                }
                const styleSheet = styleElement.sheet;
                styleSheet.insertRule(rule, styleSheet.cssRules.length);
              }
              clear() {
                for (const nativeFontFace of this.nativeFontFaces) {
                  this._document.fonts.delete(nativeFontFace);
                }
                this.nativeFontFaces.length = 0;
                if (this.styleElement) {
                  this.styleElement.remove();
                  this.styleElement = null;
                }
              }
              async bind(font) {
                if (font.attached || font.missingFile) {
                  return;
                }
                font.attached = true;
                if (this.isFontLoadingAPISupported) {
                  const nativeFontFace = font.createNativeFontFace();
                  if (nativeFontFace) {
                    this.addNativeFontFace(nativeFontFace);
                    try {
                      await nativeFontFace.loaded;
                    } catch (ex) {
                      this._onUnsupportedFeature({
                        featureId: _util2.UNSUPPORTED_FEATURES.errorFontLoadNative
                      });
                      (0, _util2.warn)(`Failed to load font '${nativeFontFace.family}': '${ex}'.`);
                      font.disableFontFace = true;
                      throw ex;
                    }
                  }
                  return;
                }
                const rule = font.createFontFaceRule();
                if (rule) {
                  this.insertRule(rule);
                  if (this.isSyncFontLoadingSupported) {
                    return;
                  }
                  await new Promise((resolve) => {
                    const request = this._queueLoadingCallback(resolve);
                    this._prepareFontLoadEvent([rule], [font], request);
                  });
                }
              }
              _queueLoadingCallback(callback) {
                (0, _util2.unreachable)("Abstract method `_queueLoadingCallback`.");
              }
              get isFontLoadingAPISupported() {
                var _a;
                const hasFonts = !!((_a = this._document) == null ? void 0 : _a.fonts);
                return (0, _util2.shadow)(this, "isFontLoadingAPISupported", hasFonts);
              }
              get isSyncFontLoadingSupported() {
                (0, _util2.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
              }
              get _loadTestFont() {
                (0, _util2.unreachable)("Abstract method `_loadTestFont`.");
              }
              _prepareFontLoadEvent(rules, fontsToLoad, request) {
                (0, _util2.unreachable)("Abstract method `_prepareFontLoadEvent`.");
              }
            }
            let FontLoader;
            exports2.FontLoader = FontLoader;
            {
              exports2.FontLoader = FontLoader = class GenericFontLoader extends BaseFontLoader {
                constructor(params) {
                  super(params);
                  this.loadingContext = {
                    requests: [],
                    nextRequestId: 0
                  };
                  this.loadTestFontId = 0;
                }
                get isSyncFontLoadingSupported() {
                  let supported = false;
                  if (typeof navigator === "undefined") {
                    supported = true;
                  } else {
                    const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
                    if ((m == null ? void 0 : m[1]) >= 14) {
                      supported = true;
                    }
                  }
                  return (0, _util2.shadow)(this, "isSyncFontLoadingSupported", supported);
                }
                _queueLoadingCallback(callback) {
                  function completeRequest() {
                    (0, _util2.assert)(!request.done, "completeRequest() cannot be called twice.");
                    request.done = true;
                    while (context.requests.length > 0 && context.requests[0].done) {
                      const otherRequest = context.requests.shift();
                      setTimeout(otherRequest.callback, 0);
                    }
                  }
                  const context = this.loadingContext;
                  const request = {
                    id: `pdfjs-font-loading-${context.nextRequestId++}`,
                    done: false,
                    complete: completeRequest,
                    callback
                  };
                  context.requests.push(request);
                  return request;
                }
                get _loadTestFont() {
                  const getLoadTestFont = function() {
                    return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
                  };
                  return (0, _util2.shadow)(this, "_loadTestFont", getLoadTestFont());
                }
                _prepareFontLoadEvent(rules, fonts, request) {
                  function int32(data2, offset2) {
                    return data2.charCodeAt(offset2) << 24 | data2.charCodeAt(offset2 + 1) << 16 | data2.charCodeAt(offset2 + 2) << 8 | data2.charCodeAt(offset2 + 3) & 255;
                  }
                  function spliceString(s, offset2, remove, insert) {
                    const chunk1 = s.substring(0, offset2);
                    const chunk2 = s.substring(offset2 + remove);
                    return chunk1 + insert + chunk2;
                  }
                  let i, ii;
                  const canvas = this._document.createElement("canvas");
                  canvas.width = 1;
                  canvas.height = 1;
                  const ctx = canvas.getContext("2d");
                  let called = 0;
                  function isFontReady(name, callback) {
                    called++;
                    if (called > 30) {
                      (0, _util2.warn)("Load test font never loaded.");
                      callback();
                      return;
                    }
                    ctx.font = "30px " + name;
                    ctx.fillText(".", 0, 20);
                    const imageData = ctx.getImageData(0, 0, 1, 1);
                    if (imageData.data[3] > 0) {
                      callback();
                      return;
                    }
                    setTimeout(isFontReady.bind(null, name, callback));
                  }
                  const loadTestFontId = `lt${Date.now()}${this.loadTestFontId++}`;
                  let data = this._loadTestFont;
                  const COMMENT_OFFSET = 976;
                  data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
                  const CFF_CHECKSUM_OFFSET = 16;
                  const XXXX_VALUE = 1482184792;
                  let checksum = int32(data, CFF_CHECKSUM_OFFSET);
                  for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
                    checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
                  }
                  if (i < loadTestFontId.length) {
                    checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i) | 0;
                  }
                  data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util2.string32)(checksum));
                  const url = `url(data:font/opentype;base64,${btoa(data)});`;
                  const rule = `@font-face {font-family:"${loadTestFontId}";src:${url}}`;
                  this.insertRule(rule);
                  const names = [];
                  for (const font of fonts) {
                    names.push(font.loadedName);
                  }
                  names.push(loadTestFontId);
                  const div = this._document.createElement("div");
                  div.style.visibility = "hidden";
                  div.style.width = div.style.height = "10px";
                  div.style.position = "absolute";
                  div.style.top = div.style.left = "0px";
                  for (const name of names) {
                    const span = this._document.createElement("span");
                    span.textContent = "Hi";
                    span.style.fontFamily = name;
                    div.append(span);
                  }
                  this._document.body.append(div);
                  isFontReady(loadTestFontId, () => {
                    div.remove();
                    request.complete();
                  });
                }
              };
            }
            class FontFaceObject {
              constructor(translatedData, {
                isEvalSupported = true,
                disableFontFace = false,
                ignoreErrors = false,
                onUnsupportedFeature,
                fontRegistry = null
              }) {
                this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
                for (const i in translatedData) {
                  this[i] = translatedData[i];
                }
                this.isEvalSupported = isEvalSupported !== false;
                this.disableFontFace = disableFontFace === true;
                this.ignoreErrors = ignoreErrors === true;
                this._onUnsupportedFeature = onUnsupportedFeature;
                this.fontRegistry = fontRegistry;
              }
              createNativeFontFace() {
                if (!this.data || this.disableFontFace) {
                  return null;
                }
                let nativeFontFace;
                if (!this.cssFontInfo) {
                  nativeFontFace = new FontFace(this.loadedName, this.data, {});
                } else {
                  const css = {
                    weight: this.cssFontInfo.fontWeight
                  };
                  if (this.cssFontInfo.italicAngle) {
                    css.style = `oblique ${this.cssFontInfo.italicAngle}deg`;
                  }
                  nativeFontFace = new FontFace(this.cssFontInfo.fontFamily, this.data, css);
                }
                if (this.fontRegistry) {
                  this.fontRegistry.registerFont(this);
                }
                return nativeFontFace;
              }
              createFontFaceRule() {
                if (!this.data || this.disableFontFace) {
                  return null;
                }
                const data = (0, _util2.bytesToString)(this.data);
                const url = `url(data:${this.mimetype};base64,${btoa(data)});`;
                let rule;
                if (!this.cssFontInfo) {
                  rule = `@font-face {font-family:"${this.loadedName}";src:${url}}`;
                } else {
                  let css = `font-weight: ${this.cssFontInfo.fontWeight};`;
                  if (this.cssFontInfo.italicAngle) {
                    css += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`;
                  }
                  rule = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${css}src:${url}}`;
                }
                if (this.fontRegistry) {
                  this.fontRegistry.registerFont(this, url);
                }
                return rule;
              }
              getPathGenerator(objs, character) {
                if (this.compiledGlyphs[character] !== void 0) {
                  return this.compiledGlyphs[character];
                }
                let cmds;
                try {
                  cmds = objs.get(this.loadedName + "_path_" + character);
                } catch (ex) {
                  if (!this.ignoreErrors) {
                    throw ex;
                  }
                  this._onUnsupportedFeature({
                    featureId: _util2.UNSUPPORTED_FEATURES.errorFontGetPath
                  });
                  (0, _util2.warn)(`getPathGenerator - ignoring character: "${ex}".`);
                  return this.compiledGlyphs[character] = function(c, size) {
                  };
                }
                if (this.isEvalSupported && _util2.FeatureTest.isEvalSupported) {
                  const jsBuf = [];
                  for (const current of cmds) {
                    const args = current.args !== void 0 ? current.args.join(",") : "";
                    jsBuf.push("c.", current.cmd, "(", args, ");\n");
                  }
                  return this.compiledGlyphs[character] = new Function("c", "size", jsBuf.join(""));
                }
                return this.compiledGlyphs[character] = function(c, size) {
                  for (const current of cmds) {
                    if (current.cmd === "scale") {
                      current.args = [size, -size];
                    }
                    c[current.cmd].apply(c, current.args);
                  }
                };
              }
            }
            exports2.FontFaceObject = FontFaceObject;
          },
          /* 12 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _restoreInitialState, restoreInitialState_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.CanvasGraphics = void 0;
            var _display_utils2 = __w_pdfjs_require__2(8);
            var _util2 = __w_pdfjs_require__2(1);
            var _pattern_helper = __w_pdfjs_require__2(13);
            var _image_utils = __w_pdfjs_require__2(14);
            var _is_node2 = __w_pdfjs_require__2(3);
            const MIN_FONT_SIZE = 16;
            const MAX_FONT_SIZE = 100;
            const MAX_GROUP_SIZE = 4096;
            const EXECUTION_TIME = 15;
            const EXECUTION_STEPS = 10;
            const MAX_SIZE_TO_COMPILE = _is_node2.isNodeJS && typeof Path2D === "undefined" ? -1 : 1e3;
            const FULL_CHUNK_HEIGHT = 16;
            function mirrorContextOperations(ctx, destCtx) {
              if (ctx._removeMirroring) {
                throw new Error("Context is already forwarding operations.");
              }
              ctx.__originalSave = ctx.save;
              ctx.__originalRestore = ctx.restore;
              ctx.__originalRotate = ctx.rotate;
              ctx.__originalScale = ctx.scale;
              ctx.__originalTranslate = ctx.translate;
              ctx.__originalTransform = ctx.transform;
              ctx.__originalSetTransform = ctx.setTransform;
              ctx.__originalResetTransform = ctx.resetTransform;
              ctx.__originalClip = ctx.clip;
              ctx.__originalMoveTo = ctx.moveTo;
              ctx.__originalLineTo = ctx.lineTo;
              ctx.__originalBezierCurveTo = ctx.bezierCurveTo;
              ctx.__originalRect = ctx.rect;
              ctx.__originalClosePath = ctx.closePath;
              ctx.__originalBeginPath = ctx.beginPath;
              ctx._removeMirroring = () => {
                ctx.save = ctx.__originalSave;
                ctx.restore = ctx.__originalRestore;
                ctx.rotate = ctx.__originalRotate;
                ctx.scale = ctx.__originalScale;
                ctx.translate = ctx.__originalTranslate;
                ctx.transform = ctx.__originalTransform;
                ctx.setTransform = ctx.__originalSetTransform;
                ctx.resetTransform = ctx.__originalResetTransform;
                ctx.clip = ctx.__originalClip;
                ctx.moveTo = ctx.__originalMoveTo;
                ctx.lineTo = ctx.__originalLineTo;
                ctx.bezierCurveTo = ctx.__originalBezierCurveTo;
                ctx.rect = ctx.__originalRect;
                ctx.closePath = ctx.__originalClosePath;
                ctx.beginPath = ctx.__originalBeginPath;
                delete ctx._removeMirroring;
              };
              ctx.save = function ctxSave() {
                destCtx.save();
                this.__originalSave();
              };
              ctx.restore = function ctxRestore() {
                destCtx.restore();
                this.__originalRestore();
              };
              ctx.translate = function ctxTranslate(x, y) {
                destCtx.translate(x, y);
                this.__originalTranslate(x, y);
              };
              ctx.scale = function ctxScale(x, y) {
                destCtx.scale(x, y);
                this.__originalScale(x, y);
              };
              ctx.transform = function ctxTransform(a, b, c, d, e, f) {
                destCtx.transform(a, b, c, d, e, f);
                this.__originalTransform(a, b, c, d, e, f);
              };
              ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
                destCtx.setTransform(a, b, c, d, e, f);
                this.__originalSetTransform(a, b, c, d, e, f);
              };
              ctx.resetTransform = function ctxResetTransform() {
                destCtx.resetTransform();
                this.__originalResetTransform();
              };
              ctx.rotate = function ctxRotate(angle) {
                destCtx.rotate(angle);
                this.__originalRotate(angle);
              };
              ctx.clip = function ctxRotate(rule) {
                destCtx.clip(rule);
                this.__originalClip(rule);
              };
              ctx.moveTo = function(x, y) {
                destCtx.moveTo(x, y);
                this.__originalMoveTo(x, y);
              };
              ctx.lineTo = function(x, y) {
                destCtx.lineTo(x, y);
                this.__originalLineTo(x, y);
              };
              ctx.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
                destCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                this.__originalBezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
              };
              ctx.rect = function(x, y, width, height) {
                destCtx.rect(x, y, width, height);
                this.__originalRect(x, y, width, height);
              };
              ctx.closePath = function() {
                destCtx.closePath();
                this.__originalClosePath();
              };
              ctx.beginPath = function() {
                destCtx.beginPath();
                this.__originalBeginPath();
              };
            }
            class CachedCanvases {
              constructor(canvasFactory) {
                this.canvasFactory = canvasFactory;
                this.cache = /* @__PURE__ */ Object.create(null);
              }
              getCanvas(id, width, height) {
                let canvasEntry;
                if (this.cache[id] !== void 0) {
                  canvasEntry = this.cache[id];
                  this.canvasFactory.reset(canvasEntry, width, height);
                } else {
                  canvasEntry = this.canvasFactory.create(width, height);
                  this.cache[id] = canvasEntry;
                }
                return canvasEntry;
              }
              delete(id) {
                delete this.cache[id];
              }
              clear() {
                for (const id in this.cache) {
                  const canvasEntry = this.cache[id];
                  this.canvasFactory.destroy(canvasEntry);
                  delete this.cache[id];
                }
              }
            }
            function drawImageAtIntegerCoords(ctx, srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH) {
              const [a, b, c, d, tx, ty] = (0, _display_utils2.getCurrentTransform)(ctx);
              if (b === 0 && c === 0) {
                const tlX = destX * a + tx;
                const rTlX = Math.round(tlX);
                const tlY = destY * d + ty;
                const rTlY = Math.round(tlY);
                const brX = (destX + destW) * a + tx;
                const rWidth = Math.abs(Math.round(brX) - rTlX) || 1;
                const brY = (destY + destH) * d + ty;
                const rHeight = Math.abs(Math.round(brY) - rTlY) || 1;
                ctx.setTransform(Math.sign(a), 0, 0, Math.sign(d), rTlX, rTlY);
                ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rWidth, rHeight);
                ctx.setTransform(a, b, c, d, tx, ty);
                return [rWidth, rHeight];
              }
              if (a === 0 && d === 0) {
                const tlX = destY * c + tx;
                const rTlX = Math.round(tlX);
                const tlY = destX * b + ty;
                const rTlY = Math.round(tlY);
                const brX = (destY + destH) * c + tx;
                const rWidth = Math.abs(Math.round(brX) - rTlX) || 1;
                const brY = (destX + destW) * b + ty;
                const rHeight = Math.abs(Math.round(brY) - rTlY) || 1;
                ctx.setTransform(0, Math.sign(b), Math.sign(c), 0, rTlX, rTlY);
                ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rHeight, rWidth);
                ctx.setTransform(a, b, c, d, tx, ty);
                return [rHeight, rWidth];
              }
              ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
              const scaleX = Math.hypot(a, b);
              const scaleY = Math.hypot(c, d);
              return [scaleX * destW, scaleY * destH];
            }
            function compileType3Glyph(imgData) {
              const {
                width,
                height
              } = imgData;
              if (width > MAX_SIZE_TO_COMPILE || height > MAX_SIZE_TO_COMPILE) {
                return null;
              }
              const POINT_TO_PROCESS_LIMIT = 1e3;
              const POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
              const width1 = width + 1;
              let points = new Uint8Array(width1 * (height + 1));
              let i, j, j0;
              const lineSize = width + 7 & ~7;
              let data = new Uint8Array(lineSize * height), pos = 0;
              for (const elem of imgData.data) {
                let mask = 128;
                while (mask > 0) {
                  data[pos++] = elem & mask ? 0 : 255;
                  mask >>= 1;
                }
              }
              let count = 0;
              pos = 0;
              if (data[pos] !== 0) {
                points[0] = 1;
                ++count;
              }
              for (j = 1; j < width; j++) {
                if (data[pos] !== data[pos + 1]) {
                  points[j] = data[pos] ? 2 : 1;
                  ++count;
                }
                pos++;
              }
              if (data[pos] !== 0) {
                points[j] = 2;
                ++count;
              }
              for (i = 1; i < height; i++) {
                pos = i * lineSize;
                j0 = i * width1;
                if (data[pos - lineSize] !== data[pos]) {
                  points[j0] = data[pos] ? 1 : 8;
                  ++count;
                }
                let sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);
                for (j = 1; j < width; j++) {
                  sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);
                  if (POINT_TYPES[sum]) {
                    points[j0 + j] = POINT_TYPES[sum];
                    ++count;
                  }
                  pos++;
                }
                if (data[pos - lineSize] !== data[pos]) {
                  points[j0 + j] = data[pos] ? 2 : 4;
                  ++count;
                }
                if (count > POINT_TO_PROCESS_LIMIT) {
                  return null;
                }
              }
              pos = lineSize * (height - 1);
              j0 = i * width1;
              if (data[pos] !== 0) {
                points[j0] = 8;
                ++count;
              }
              for (j = 1; j < width; j++) {
                if (data[pos] !== data[pos + 1]) {
                  points[j0 + j] = data[pos] ? 4 : 8;
                  ++count;
                }
                pos++;
              }
              if (data[pos] !== 0) {
                points[j0 + j] = 4;
                ++count;
              }
              if (count > POINT_TO_PROCESS_LIMIT) {
                return null;
              }
              const steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
              const path = new Path2D();
              for (i = 0; count && i <= height; i++) {
                let p = i * width1;
                const end2 = p + width;
                while (p < end2 && !points[p]) {
                  p++;
                }
                if (p === end2) {
                  continue;
                }
                path.moveTo(p % width1, i);
                const p0 = p;
                let type = points[p];
                do {
                  const step = steps[type];
                  do {
                    p += step;
                  } while (!points[p]);
                  const pp = points[p];
                  if (pp !== 5 && pp !== 10) {
                    type = pp;
                    points[p] = 0;
                  } else {
                    type = pp & 51 * type >> 4;
                    points[p] &= type >> 2 | type << 2;
                  }
                  path.lineTo(p % width1, p / width1 | 0);
                  if (!points[p]) {
                    --count;
                  }
                } while (p0 !== p);
                --i;
              }
              data = null;
              points = null;
              const drawOutline = function(c) {
                c.save();
                c.scale(1 / width, -1 / height);
                c.translate(0, -height);
                c.fill(path);
                c.beginPath();
                c.restore();
              };
              return drawOutline;
            }
            class CanvasExtraState {
              constructor(width, height) {
                this.alphaIsShape = false;
                this.fontSize = 0;
                this.fontSizeScale = 1;
                this.textMatrix = _util2.IDENTITY_MATRIX;
                this.textMatrixScale = 1;
                this.fontMatrix = _util2.FONT_IDENTITY_MATRIX;
                this.leading = 0;
                this.x = 0;
                this.y = 0;
                this.lineX = 0;
                this.lineY = 0;
                this.charSpacing = 0;
                this.wordSpacing = 0;
                this.textHScale = 1;
                this.textRenderingMode = _util2.TextRenderingMode.FILL;
                this.textRise = 0;
                this.fillColor = "#000000";
                this.strokeColor = "#000000";
                this.patternFill = false;
                this.fillAlpha = 1;
                this.strokeAlpha = 1;
                this.lineWidth = 1;
                this.activeSMask = null;
                this.transferMaps = null;
                this.startNewPathAndClipBox([0, 0, width, height]);
              }
              clone() {
                const clone = Object.create(this);
                clone.clipBox = this.clipBox.slice();
                return clone;
              }
              setCurrentPoint(x, y) {
                this.x = x;
                this.y = y;
              }
              updatePathMinMax(transform, x, y) {
                [x, y] = _util2.Util.applyTransform([x, y], transform);
                this.minX = Math.min(this.minX, x);
                this.minY = Math.min(this.minY, y);
                this.maxX = Math.max(this.maxX, x);
                this.maxY = Math.max(this.maxY, y);
              }
              updateRectMinMax(transform, rect) {
                const p1 = _util2.Util.applyTransform(rect, transform);
                const p2 = _util2.Util.applyTransform(rect.slice(2), transform);
                this.minX = Math.min(this.minX, p1[0], p2[0]);
                this.minY = Math.min(this.minY, p1[1], p2[1]);
                this.maxX = Math.max(this.maxX, p1[0], p2[0]);
                this.maxY = Math.max(this.maxY, p1[1], p2[1]);
              }
              updateScalingPathMinMax(transform, minMax) {
                _util2.Util.scaleMinMax(transform, minMax);
                this.minX = Math.min(this.minX, minMax[0]);
                this.maxX = Math.max(this.maxX, minMax[1]);
                this.minY = Math.min(this.minY, minMax[2]);
                this.maxY = Math.max(this.maxY, minMax[3]);
              }
              updateCurvePathMinMax(transform, x0, y0, x1, y1, x2, y2, x3, y3, minMax) {
                const box = _util2.Util.bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3);
                if (minMax) {
                  minMax[0] = Math.min(minMax[0], box[0], box[2]);
                  minMax[1] = Math.max(minMax[1], box[0], box[2]);
                  minMax[2] = Math.min(minMax[2], box[1], box[3]);
                  minMax[3] = Math.max(minMax[3], box[1], box[3]);
                  return;
                }
                this.updateRectMinMax(transform, box);
              }
              getPathBoundingBox(pathType = _pattern_helper.PathType.FILL, transform = null) {
                const box = [this.minX, this.minY, this.maxX, this.maxY];
                if (pathType === _pattern_helper.PathType.STROKE) {
                  if (!transform) {
                    (0, _util2.unreachable)("Stroke bounding box must include transform.");
                  }
                  const scale = _util2.Util.singularValueDecompose2dScale(transform);
                  const xStrokePad = scale[0] * this.lineWidth / 2;
                  const yStrokePad = scale[1] * this.lineWidth / 2;
                  box[0] -= xStrokePad;
                  box[1] -= yStrokePad;
                  box[2] += xStrokePad;
                  box[3] += yStrokePad;
                }
                return box;
              }
              updateClipFromPath() {
                const intersect = _util2.Util.intersect(this.clipBox, this.getPathBoundingBox());
                this.startNewPathAndClipBox(intersect || [0, 0, 0, 0]);
              }
              isEmptyClip() {
                return this.minX === Infinity;
              }
              startNewPathAndClipBox(box) {
                this.clipBox = box;
                this.minX = Infinity;
                this.minY = Infinity;
                this.maxX = 0;
                this.maxY = 0;
              }
              getClippedPathBoundingBox(pathType = _pattern_helper.PathType.FILL, transform = null) {
                return _util2.Util.intersect(this.clipBox, this.getPathBoundingBox(pathType, transform));
              }
            }
            function putBinaryImageData(ctx, imgData, transferMaps = null) {
              if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
                ctx.putImageData(imgData, 0, 0);
                return;
              }
              const height = imgData.height, width = imgData.width;
              const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
              const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
              const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
              const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
              let srcPos = 0, destPos;
              const src = imgData.data;
              const dest = chunkImgData.data;
              let i, j, thisChunkHeight, elemsInThisChunk;
              let transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;
              if (transferMaps) {
                switch (transferMaps.length) {
                  case 1:
                    transferMapRed = transferMaps[0];
                    transferMapGreen = transferMaps[0];
                    transferMapBlue = transferMaps[0];
                    transferMapGray = transferMaps[0];
                    break;
                  case 4:
                    transferMapRed = transferMaps[0];
                    transferMapGreen = transferMaps[1];
                    transferMapBlue = transferMaps[2];
                    transferMapGray = transferMaps[3];
                    break;
                }
              }
              if (imgData.kind === _util2.ImageKind.GRAYSCALE_1BPP) {
                const srcLength = src.byteLength;
                const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
                const dest32DataLength = dest32.length;
                const fullSrcDiff = width + 7 >> 3;
                let white = 4294967295;
                let black = _util2.FeatureTest.isLittleEndian ? 4278190080 : 255;
                if (transferMapGray) {
                  if (transferMapGray[0] === 255 && transferMapGray[255] === 0) {
                    [white, black] = [black, white];
                  }
                }
                for (i = 0; i < totalChunks; i++) {
                  thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
                  destPos = 0;
                  for (j = 0; j < thisChunkHeight; j++) {
                    const srcDiff = srcLength - srcPos;
                    let k = 0;
                    const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
                    const kEndUnrolled = kEnd & ~7;
                    let mask = 0;
                    let srcByte = 0;
                    for (; k < kEndUnrolled; k += 8) {
                      srcByte = src[srcPos++];
                      dest32[destPos++] = srcByte & 128 ? white : black;
                      dest32[destPos++] = srcByte & 64 ? white : black;
                      dest32[destPos++] = srcByte & 32 ? white : black;
                      dest32[destPos++] = srcByte & 16 ? white : black;
                      dest32[destPos++] = srcByte & 8 ? white : black;
                      dest32[destPos++] = srcByte & 4 ? white : black;
                      dest32[destPos++] = srcByte & 2 ? white : black;
                      dest32[destPos++] = srcByte & 1 ? white : black;
                    }
                    for (; k < kEnd; k++) {
                      if (mask === 0) {
                        srcByte = src[srcPos++];
                        mask = 128;
                      }
                      dest32[destPos++] = srcByte & mask ? white : black;
                      mask >>= 1;
                    }
                  }
                  while (destPos < dest32DataLength) {
                    dest32[destPos++] = 0;
                  }
                  ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
                }
              } else if (imgData.kind === _util2.ImageKind.RGBA_32BPP) {
                const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
                j = 0;
                elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;
                for (i = 0; i < fullChunks; i++) {
                  dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
                  srcPos += elemsInThisChunk;
                  if (hasTransferMaps) {
                    for (let k = 0; k < elemsInThisChunk; k += 4) {
                      if (transferMapRed) {
                        dest[k + 0] = transferMapRed[dest[k + 0]];
                      }
                      if (transferMapGreen) {
                        dest[k + 1] = transferMapGreen[dest[k + 1]];
                      }
                      if (transferMapBlue) {
                        dest[k + 2] = transferMapBlue[dest[k + 2]];
                      }
                    }
                  }
                  ctx.putImageData(chunkImgData, 0, j);
                  j += FULL_CHUNK_HEIGHT;
                }
                if (i < totalChunks) {
                  elemsInThisChunk = width * partialChunkHeight * 4;
                  dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
                  if (hasTransferMaps) {
                    for (let k = 0; k < elemsInThisChunk; k += 4) {
                      if (transferMapRed) {
                        dest[k + 0] = transferMapRed[dest[k + 0]];
                      }
                      if (transferMapGreen) {
                        dest[k + 1] = transferMapGreen[dest[k + 1]];
                      }
                      if (transferMapBlue) {
                        dest[k + 2] = transferMapBlue[dest[k + 2]];
                      }
                    }
                  }
                  ctx.putImageData(chunkImgData, 0, j);
                }
              } else if (imgData.kind === _util2.ImageKind.RGB_24BPP) {
                const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
                thisChunkHeight = FULL_CHUNK_HEIGHT;
                elemsInThisChunk = width * thisChunkHeight;
                for (i = 0; i < totalChunks; i++) {
                  if (i >= fullChunks) {
                    thisChunkHeight = partialChunkHeight;
                    elemsInThisChunk = width * thisChunkHeight;
                  }
                  destPos = 0;
                  for (j = elemsInThisChunk; j--; ) {
                    dest[destPos++] = src[srcPos++];
                    dest[destPos++] = src[srcPos++];
                    dest[destPos++] = src[srcPos++];
                    dest[destPos++] = 255;
                  }
                  if (hasTransferMaps) {
                    for (let k = 0; k < destPos; k += 4) {
                      if (transferMapRed) {
                        dest[k + 0] = transferMapRed[dest[k + 0]];
                      }
                      if (transferMapGreen) {
                        dest[k + 1] = transferMapGreen[dest[k + 1]];
                      }
                      if (transferMapBlue) {
                        dest[k + 2] = transferMapBlue[dest[k + 2]];
                      }
                    }
                  }
                  ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
                }
              } else {
                throw new Error(`bad image kind: ${imgData.kind}`);
              }
            }
            function putBinaryImageMask(ctx, imgData) {
              if (imgData.bitmap) {
                ctx.drawImage(imgData.bitmap, 0, 0);
                return;
              }
              const height = imgData.height, width = imgData.width;
              const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
              const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
              const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
              const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
              let srcPos = 0;
              const src = imgData.data;
              const dest = chunkImgData.data;
              for (let i = 0; i < totalChunks; i++) {
                const thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
                ({
                  srcPos
                } = (0, _image_utils.applyMaskImageData)({
                  src,
                  srcPos,
                  dest,
                  width,
                  height: thisChunkHeight
                }));
                ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
              }
            }
            function copyCtxState(sourceCtx, destCtx) {
              const properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];
              for (let i = 0, ii = properties.length; i < ii; i++) {
                const property = properties[i];
                if (sourceCtx[property] !== void 0) {
                  destCtx[property] = sourceCtx[property];
                }
              }
              if (sourceCtx.setLineDash !== void 0) {
                destCtx.setLineDash(sourceCtx.getLineDash());
                destCtx.lineDashOffset = sourceCtx.lineDashOffset;
              }
            }
            function resetCtxToDefault(ctx, foregroundColor) {
              ctx.strokeStyle = ctx.fillStyle = foregroundColor || "#000000";
              ctx.fillRule = "nonzero";
              ctx.globalAlpha = 1;
              ctx.lineWidth = 1;
              ctx.lineCap = "butt";
              ctx.lineJoin = "miter";
              ctx.miterLimit = 10;
              ctx.globalCompositeOperation = "source-over";
              ctx.font = "10px sans-serif";
              if (ctx.setLineDash !== void 0) {
                ctx.setLineDash([]);
                ctx.lineDashOffset = 0;
              }
            }
            function composeSMaskBackdrop(bytes, r0, g0, b0) {
              const length = bytes.length;
              for (let i = 3; i < length; i += 4) {
                const alpha = bytes[i];
                if (alpha === 0) {
                  bytes[i - 3] = r0;
                  bytes[i - 2] = g0;
                  bytes[i - 1] = b0;
                } else if (alpha < 255) {
                  const alpha_ = 255 - alpha;
                  bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
                  bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
                  bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
                }
              }
            }
            function composeSMaskAlpha(maskData, layerData, transferMap) {
              const length = maskData.length;
              const scale = 1 / 255;
              for (let i = 3; i < length; i += 4) {
                const alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
                layerData[i] = layerData[i] * alpha * scale | 0;
              }
            }
            function composeSMaskLuminosity(maskData, layerData, transferMap) {
              const length = maskData.length;
              for (let i = 3; i < length; i += 4) {
                const y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
                layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
              }
            }
            function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap, layerOffsetX, layerOffsetY, maskOffsetX, maskOffsetY) {
              const hasBackdrop = !!backdrop;
              const r0 = hasBackdrop ? backdrop[0] : 0;
              const g0 = hasBackdrop ? backdrop[1] : 0;
              const b0 = hasBackdrop ? backdrop[2] : 0;
              let composeFn;
              if (subtype === "Luminosity") {
                composeFn = composeSMaskLuminosity;
              } else {
                composeFn = composeSMaskAlpha;
              }
              const PIXELS_TO_PROCESS = 1048576;
              const chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));
              for (let row = 0; row < height; row += chunkSize) {
                const chunkHeight = Math.min(chunkSize, height - row);
                const maskData = maskCtx.getImageData(layerOffsetX - maskOffsetX, row + (layerOffsetY - maskOffsetY), width, chunkHeight);
                const layerData = layerCtx.getImageData(layerOffsetX, row + layerOffsetY, width, chunkHeight);
                if (hasBackdrop) {
                  composeSMaskBackdrop(maskData.data, r0, g0, b0);
                }
                composeFn(maskData.data, layerData.data, transferMap);
                layerCtx.putImageData(layerData, layerOffsetX, row + layerOffsetY);
              }
            }
            function composeSMask(ctx, smask, layerCtx, layerBox) {
              const layerOffsetX = layerBox[0];
              const layerOffsetY = layerBox[1];
              const layerWidth = layerBox[2] - layerOffsetX;
              const layerHeight = layerBox[3] - layerOffsetY;
              if (layerWidth === 0 || layerHeight === 0) {
                return;
              }
              genericComposeSMask(smask.context, layerCtx, layerWidth, layerHeight, smask.subtype, smask.backdrop, smask.transferMap, layerOffsetX, layerOffsetY, smask.offsetX, smask.offsetY);
              ctx.save();
              ctx.globalAlpha = 1;
              ctx.globalCompositeOperation = "source-over";
              ctx.setTransform(1, 0, 0, 1, 0, 0);
              ctx.drawImage(layerCtx.canvas, 0, 0);
              ctx.restore();
            }
            function getImageSmoothingEnabled(transform, interpolate) {
              const scale = _util2.Util.singularValueDecompose2dScale(transform);
              scale[0] = Math.fround(scale[0]);
              scale[1] = Math.fround(scale[1]);
              const actualScale = Math.fround((globalThis.devicePixelRatio || 1) * _display_utils2.PixelsPerInch.PDF_TO_CSS_UNITS);
              if (interpolate !== void 0) {
                return interpolate;
              } else if (scale[0] <= actualScale || scale[1] <= actualScale) {
                return true;
              }
              return false;
            }
            const LINE_CAP_STYLES = ["butt", "round", "square"];
            const LINE_JOIN_STYLES = ["miter", "round", "bevel"];
            const NORMAL_CLIP = {};
            const EO_CLIP = {};
            const _CanvasGraphics = class {
              constructor(canvasCtx, commonObjs, objs, canvasFactory, imageLayer, optionalContentConfig, annotationCanvasMap, pageColors) {
                __privateAdd(this, _restoreInitialState);
                this.ctx = canvasCtx;
                this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
                this.stateStack = [];
                this.pendingClip = null;
                this.pendingEOFill = false;
                this.res = null;
                this.xobjs = null;
                this.commonObjs = commonObjs;
                this.objs = objs;
                this.canvasFactory = canvasFactory;
                this.imageLayer = imageLayer;
                this.groupStack = [];
                this.processingType3 = null;
                this.baseTransform = null;
                this.baseTransformStack = [];
                this.groupLevel = 0;
                this.smaskStack = [];
                this.smaskCounter = 0;
                this.tempSMask = null;
                this.suspendedCtx = null;
                this.contentVisible = true;
                this.markedContentStack = [];
                this.optionalContentConfig = optionalContentConfig;
                this.cachedCanvases = new CachedCanvases(this.canvasFactory);
                this.cachedPatterns = /* @__PURE__ */ new Map();
                this.annotationCanvasMap = annotationCanvasMap;
                this.viewportScale = 1;
                this.outputScaleX = 1;
                this.outputScaleY = 1;
                this.backgroundColor = (pageColors == null ? void 0 : pageColors.background) || null;
                this.foregroundColor = (pageColors == null ? void 0 : pageColors.foreground) || null;
                this._cachedScaleForStroking = null;
                this._cachedGetSinglePixelWidth = null;
                this._cachedBitmapsMap = /* @__PURE__ */ new Map();
              }
              getObject(data, fallback = null) {
                if (typeof data === "string") {
                  return data.startsWith("g_") ? this.commonObjs.get(data) : this.objs.get(data);
                }
                return fallback;
              }
              beginDrawing({
                transform,
                viewport: viewport2,
                transparency = false,
                background = null
              }) {
                const width = this.ctx.canvas.width;
                const height = this.ctx.canvas.height;
                const defaultBackgroundColor = background || "#ffffff";
                this.ctx.save();
                if (this.foregroundColor && this.backgroundColor) {
                  this.ctx.fillStyle = this.foregroundColor;
                  const fg = this.foregroundColor = this.ctx.fillStyle;
                  this.ctx.fillStyle = this.backgroundColor;
                  const bg = this.backgroundColor = this.ctx.fillStyle;
                  let isValidDefaultBg = true;
                  let defaultBg = defaultBackgroundColor;
                  this.ctx.fillStyle = defaultBackgroundColor;
                  defaultBg = this.ctx.fillStyle;
                  isValidDefaultBg = typeof defaultBg === "string" && /^#[0-9A-Fa-f]{6}$/.test(defaultBg);
                  if (fg === "#000000" && bg === "#ffffff" || fg === bg || !isValidDefaultBg) {
                    this.foregroundColor = this.backgroundColor = null;
                  } else {
                    const [rB, gB, bB] = (0, _display_utils2.getRGB)(defaultBg);
                    const newComp = (x) => {
                      x /= 255;
                      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
                    };
                    const lumB = Math.round(0.2126 * newComp(rB) + 0.7152 * newComp(gB) + 0.0722 * newComp(bB));
                    this.selectColor = (r2, g, b) => {
                      const lumC = 0.2126 * newComp(r2) + 0.7152 * newComp(g) + 0.0722 * newComp(b);
                      return Math.round(lumC) === lumB ? bg : fg;
                    };
                  }
                }
                this.ctx.fillStyle = this.backgroundColor || defaultBackgroundColor;
                this.ctx.fillRect(0, 0, width, height);
                this.ctx.restore();
                if (transparency) {
                  const transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height);
                  this.compositeCtx = this.ctx;
                  this.transparentCanvas = transparentCanvas.canvas;
                  this.ctx = transparentCanvas.context;
                  this.ctx.save();
                  this.ctx.transform(...(0, _display_utils2.getCurrentTransform)(this.compositeCtx));
                }
                this.ctx.save();
                resetCtxToDefault(this.ctx, this.foregroundColor);
                if (transform) {
                  this.ctx.transform(...transform);
                  this.outputScaleX = transform[0];
                  this.outputScaleY = transform[0];
                }
                this.ctx.transform(...viewport2.transform);
                this.viewportScale = viewport2.scale;
                this.baseTransform = (0, _display_utils2.getCurrentTransform)(this.ctx);
                if (this.imageLayer) {
                  (0, _display_utils2.deprecated)("The `imageLayer` functionality will be removed in the future.");
                  this.imageLayer.beginLayout();
                }
              }
              executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
                const argsArray = operatorList.argsArray;
                const fnArray = operatorList.fnArray;
                let i = executionStartIdx || 0;
                const argsArrayLen = argsArray.length;
                if (argsArrayLen === i) {
                  return i;
                }
                const chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
                const endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
                let steps = 0;
                const commonObjs = this.commonObjs;
                const objs = this.objs;
                let fnId;
                while (true) {
                  if (stepper !== void 0 && i === stepper.nextBreakPoint) {
                    stepper.breakIt(i, continueCallback);
                    return i;
                  }
                  fnId = fnArray[i];
                  if (fnId !== _util2.OPS.dependency) {
                    this[fnId].apply(this, argsArray[i]);
                  } else {
                    for (const depObjId of argsArray[i]) {
                      const objsPool = depObjId.startsWith("g_") ? commonObjs : objs;
                      if (!objsPool.has(depObjId)) {
                        objsPool.get(depObjId, continueCallback);
                        return i;
                      }
                    }
                  }
                  i++;
                  if (i === argsArrayLen) {
                    return i;
                  }
                  if (chunkOperations && ++steps > EXECUTION_STEPS) {
                    if (Date.now() > endTime) {
                      continueCallback();
                      return i;
                    }
                    steps = 0;
                  }
                }
              }
              endDrawing() {
                __privateMethod(this, _restoreInitialState, restoreInitialState_fn).call(this);
                this.cachedCanvases.clear();
                this.cachedPatterns.clear();
                for (const cache of this._cachedBitmapsMap.values()) {
                  for (const canvas of cache.values()) {
                    if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
                      canvas.width = canvas.height = 0;
                    }
                  }
                  cache.clear();
                }
                this._cachedBitmapsMap.clear();
                if (this.imageLayer) {
                  this.imageLayer.endLayout();
                }
              }
              _scaleImage(img, inverseTransform) {
                const width = img.width;
                const height = img.height;
                let widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]), 1);
                let heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]), 1);
                let paintWidth = width, paintHeight = height;
                let tmpCanvasId = "prescale1";
                let tmpCanvas, tmpCtx;
                while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
                  let newWidth = paintWidth, newHeight = paintHeight;
                  if (widthScale > 2 && paintWidth > 1) {
                    newWidth = Math.ceil(paintWidth / 2);
                    widthScale /= paintWidth / newWidth;
                  }
                  if (heightScale > 2 && paintHeight > 1) {
                    newHeight = Math.ceil(paintHeight / 2);
                    heightScale /= paintHeight / newHeight;
                  }
                  tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
                  tmpCtx = tmpCanvas.context;
                  tmpCtx.clearRect(0, 0, newWidth, newHeight);
                  tmpCtx.drawImage(img, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
                  img = tmpCanvas.canvas;
                  paintWidth = newWidth;
                  paintHeight = newHeight;
                  tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
                }
                return {
                  img,
                  paintWidth,
                  paintHeight
                };
              }
              _createMaskCanvas(img) {
                const ctx = this.ctx;
                const {
                  width,
                  height
                } = img;
                const fillColor = this.current.fillColor;
                const isPatternFill = this.current.patternFill;
                const currentTransform = (0, _display_utils2.getCurrentTransform)(ctx);
                let cache, cacheKey, scaled, maskCanvas;
                if ((img.bitmap || img.data) && img.count > 1) {
                  const mainKey = img.bitmap || img.data.buffer;
                  const withoutTranslation = currentTransform.slice(0, 4);
                  cacheKey = JSON.stringify(isPatternFill ? withoutTranslation : [withoutTranslation, fillColor]);
                  cache = this._cachedBitmapsMap.get(mainKey);
                  if (!cache) {
                    cache = /* @__PURE__ */ new Map();
                    this._cachedBitmapsMap.set(mainKey, cache);
                  }
                  const cachedImage = cache.get(cacheKey);
                  if (cachedImage && !isPatternFill) {
                    const offsetX2 = Math.round(Math.min(currentTransform[0], currentTransform[2]) + currentTransform[4]);
                    const offsetY2 = Math.round(Math.min(currentTransform[1], currentTransform[3]) + currentTransform[5]);
                    return {
                      canvas: cachedImage,
                      offsetX: offsetX2,
                      offsetY: offsetY2
                    };
                  }
                  scaled = cachedImage;
                }
                if (!scaled) {
                  maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
                  putBinaryImageMask(maskCanvas.context, img);
                }
                let maskToCanvas = _util2.Util.transform(currentTransform, [1 / width, 0, 0, -1 / height, 0, 0]);
                maskToCanvas = _util2.Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]);
                const cord1 = _util2.Util.applyTransform([0, 0], maskToCanvas);
                const cord2 = _util2.Util.applyTransform([width, height], maskToCanvas);
                const rect = _util2.Util.normalizeRect([cord1[0], cord1[1], cord2[0], cord2[1]]);
                const drawnWidth = Math.round(rect[2] - rect[0]) || 1;
                const drawnHeight = Math.round(rect[3] - rect[1]) || 1;
                const fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight);
                const fillCtx = fillCanvas.context;
                const offsetX = Math.min(cord1[0], cord2[0]);
                const offsetY = Math.min(cord1[1], cord2[1]);
                fillCtx.translate(-offsetX, -offsetY);
                fillCtx.transform(...maskToCanvas);
                if (!scaled) {
                  scaled = this._scaleImage(maskCanvas.canvas, (0, _display_utils2.getCurrentTransformInverse)(fillCtx));
                  scaled = scaled.img;
                  if (cache && isPatternFill) {
                    cache.set(cacheKey, scaled);
                  }
                }
                fillCtx.imageSmoothingEnabled = getImageSmoothingEnabled((0, _display_utils2.getCurrentTransform)(fillCtx), img.interpolate);
                drawImageAtIntegerCoords(fillCtx, scaled, 0, 0, scaled.width, scaled.height, 0, 0, width, height);
                fillCtx.globalCompositeOperation = "source-in";
                const inverse = _util2.Util.transform((0, _display_utils2.getCurrentTransformInverse)(fillCtx), [1, 0, 0, 1, -offsetX, -offsetY]);
                fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, _pattern_helper.PathType.FILL) : fillColor;
                fillCtx.fillRect(0, 0, width, height);
                if (cache && !isPatternFill) {
                  this.cachedCanvases.delete("fillCanvas");
                  cache.set(cacheKey, fillCanvas.canvas);
                }
                return {
                  canvas: fillCanvas.canvas,
                  offsetX: Math.round(offsetX),
                  offsetY: Math.round(offsetY)
                };
              }
              setLineWidth(width) {
                if (width !== this.current.lineWidth) {
                  this._cachedScaleForStroking = null;
                }
                this.current.lineWidth = width;
                this.ctx.lineWidth = width;
              }
              setLineCap(style) {
                this.ctx.lineCap = LINE_CAP_STYLES[style];
              }
              setLineJoin(style) {
                this.ctx.lineJoin = LINE_JOIN_STYLES[style];
              }
              setMiterLimit(limit) {
                this.ctx.miterLimit = limit;
              }
              setDash(dashArray, dashPhase) {
                const ctx = this.ctx;
                if (ctx.setLineDash !== void 0) {
                  ctx.setLineDash(dashArray);
                  ctx.lineDashOffset = dashPhase;
                }
              }
              setRenderingIntent(intent) {
              }
              setFlatness(flatness) {
              }
              setGState(states) {
                for (let i = 0, ii = states.length; i < ii; i++) {
                  const state = states[i];
                  const key = state[0];
                  const value = state[1];
                  switch (key) {
                    case "LW":
                      this.setLineWidth(value);
                      break;
                    case "LC":
                      this.setLineCap(value);
                      break;
                    case "LJ":
                      this.setLineJoin(value);
                      break;
                    case "ML":
                      this.setMiterLimit(value);
                      break;
                    case "D":
                      this.setDash(value[0], value[1]);
                      break;
                    case "RI":
                      this.setRenderingIntent(value);
                      break;
                    case "FL":
                      this.setFlatness(value);
                      break;
                    case "Font":
                      this.setFont(value[0], value[1]);
                      break;
                    case "CA":
                      this.current.strokeAlpha = state[1];
                      break;
                    case "ca":
                      this.current.fillAlpha = state[1];
                      this.ctx.globalAlpha = state[1];
                      break;
                    case "BM":
                      this.ctx.globalCompositeOperation = value;
                      break;
                    case "SMask":
                      this.current.activeSMask = value ? this.tempSMask : null;
                      this.tempSMask = null;
                      this.checkSMaskState();
                      break;
                    case "TR":
                      this.current.transferMaps = value;
                  }
                }
              }
              get inSMaskMode() {
                return !!this.suspendedCtx;
              }
              checkSMaskState() {
                const inSMaskMode = this.inSMaskMode;
                if (this.current.activeSMask && !inSMaskMode) {
                  this.beginSMaskMode();
                } else if (!this.current.activeSMask && inSMaskMode) {
                  this.endSMaskMode();
                }
              }
              beginSMaskMode() {
                if (this.inSMaskMode) {
                  throw new Error("beginSMaskMode called while already in smask mode");
                }
                const drawnWidth = this.ctx.canvas.width;
                const drawnHeight = this.ctx.canvas.height;
                const cacheId = "smaskGroupAt" + this.groupLevel;
                const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight);
                this.suspendedCtx = this.ctx;
                this.ctx = scratchCanvas.context;
                const ctx = this.ctx;
                ctx.setTransform(...(0, _display_utils2.getCurrentTransform)(this.suspendedCtx));
                copyCtxState(this.suspendedCtx, ctx);
                mirrorContextOperations(ctx, this.suspendedCtx);
                this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
              }
              endSMaskMode() {
                if (!this.inSMaskMode) {
                  throw new Error("endSMaskMode called while not in smask mode");
                }
                this.ctx._removeMirroring();
                copyCtxState(this.ctx, this.suspendedCtx);
                this.ctx = this.suspendedCtx;
                this.suspendedCtx = null;
              }
              compose(dirtyBox) {
                if (!this.current.activeSMask) {
                  return;
                }
                if (!dirtyBox) {
                  dirtyBox = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
                } else {
                  dirtyBox[0] = Math.floor(dirtyBox[0]);
                  dirtyBox[1] = Math.floor(dirtyBox[1]);
                  dirtyBox[2] = Math.ceil(dirtyBox[2]);
                  dirtyBox[3] = Math.ceil(dirtyBox[3]);
                }
                const smask = this.current.activeSMask;
                const suspendedCtx = this.suspendedCtx;
                composeSMask(suspendedCtx, smask, this.ctx, dirtyBox);
                this.ctx.save();
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.restore();
              }
              save() {
                if (this.inSMaskMode) {
                  copyCtxState(this.ctx, this.suspendedCtx);
                  this.suspendedCtx.save();
                } else {
                  this.ctx.save();
                }
                const old = this.current;
                this.stateStack.push(old);
                this.current = old.clone();
              }
              restore() {
                if (this.stateStack.length === 0 && this.inSMaskMode) {
                  this.endSMaskMode();
                }
                if (this.stateStack.length !== 0) {
                  this.current = this.stateStack.pop();
                  if (this.inSMaskMode) {
                    this.suspendedCtx.restore();
                    copyCtxState(this.suspendedCtx, this.ctx);
                  } else {
                    this.ctx.restore();
                  }
                  this.checkSMaskState();
                  this.pendingClip = null;
                  this._cachedScaleForStroking = null;
                  this._cachedGetSinglePixelWidth = null;
                }
              }
              transform(a, b, c, d, e, f) {
                this.ctx.transform(a, b, c, d, e, f);
                this._cachedScaleForStroking = null;
                this._cachedGetSinglePixelWidth = null;
              }
              constructPath(ops, args, minMax) {
                const ctx = this.ctx;
                const current = this.current;
                let x = current.x, y = current.y;
                let startX, startY;
                const currentTransform = (0, _display_utils2.getCurrentTransform)(ctx);
                const isScalingMatrix = currentTransform[0] === 0 && currentTransform[3] === 0 || currentTransform[1] === 0 && currentTransform[2] === 0;
                const minMaxForBezier = isScalingMatrix ? minMax.slice(0) : null;
                for (let i = 0, j = 0, ii = ops.length; i < ii; i++) {
                  switch (ops[i] | 0) {
                    case _util2.OPS.rectangle:
                      x = args[j++];
                      y = args[j++];
                      const width = args[j++];
                      const height = args[j++];
                      const xw = x + width;
                      const yh = y + height;
                      ctx.moveTo(x, y);
                      if (width === 0 || height === 0) {
                        ctx.lineTo(xw, yh);
                      } else {
                        ctx.lineTo(xw, y);
                        ctx.lineTo(xw, yh);
                        ctx.lineTo(x, yh);
                      }
                      if (!isScalingMatrix) {
                        current.updateRectMinMax(currentTransform, [x, y, xw, yh]);
                      }
                      ctx.closePath();
                      break;
                    case _util2.OPS.moveTo:
                      x = args[j++];
                      y = args[j++];
                      ctx.moveTo(x, y);
                      if (!isScalingMatrix) {
                        current.updatePathMinMax(currentTransform, x, y);
                      }
                      break;
                    case _util2.OPS.lineTo:
                      x = args[j++];
                      y = args[j++];
                      ctx.lineTo(x, y);
                      if (!isScalingMatrix) {
                        current.updatePathMinMax(currentTransform, x, y);
                      }
                      break;
                    case _util2.OPS.curveTo:
                      startX = x;
                      startY = y;
                      x = args[j + 4];
                      y = args[j + 5];
                      ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
                      current.updateCurvePathMinMax(currentTransform, startX, startY, args[j], args[j + 1], args[j + 2], args[j + 3], x, y, minMaxForBezier);
                      j += 6;
                      break;
                    case _util2.OPS.curveTo2:
                      startX = x;
                      startY = y;
                      ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
                      current.updateCurvePathMinMax(currentTransform, startX, startY, x, y, args[j], args[j + 1], args[j + 2], args[j + 3], minMaxForBezier);
                      x = args[j + 2];
                      y = args[j + 3];
                      j += 4;
                      break;
                    case _util2.OPS.curveTo3:
                      startX = x;
                      startY = y;
                      x = args[j + 2];
                      y = args[j + 3];
                      ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
                      current.updateCurvePathMinMax(currentTransform, startX, startY, args[j], args[j + 1], x, y, x, y, minMaxForBezier);
                      j += 4;
                      break;
                    case _util2.OPS.closePath:
                      ctx.closePath();
                      break;
                  }
                }
                if (isScalingMatrix) {
                  current.updateScalingPathMinMax(currentTransform, minMaxForBezier);
                }
                current.setCurrentPoint(x, y);
              }
              closePath() {
                this.ctx.closePath();
              }
              stroke(consumePath) {
                consumePath = typeof consumePath !== "undefined" ? consumePath : true;
                const ctx = this.ctx;
                const strokeColor = this.current.strokeColor;
                ctx.globalAlpha = this.current.strokeAlpha;
                if (this.contentVisible) {
                  if (typeof strokeColor === "object" && (strokeColor == null ? void 0 : strokeColor.getPattern)) {
                    ctx.save();
                    ctx.strokeStyle = strokeColor.getPattern(ctx, this, (0, _display_utils2.getCurrentTransformInverse)(ctx), _pattern_helper.PathType.STROKE);
                    this.rescaleAndStroke(false);
                    ctx.restore();
                  } else {
                    this.rescaleAndStroke(true);
                  }
                }
                if (consumePath) {
                  this.consumePath(this.current.getClippedPathBoundingBox());
                }
                ctx.globalAlpha = this.current.fillAlpha;
              }
              closeStroke() {
                this.closePath();
                this.stroke();
              }
              fill(consumePath) {
                consumePath = typeof consumePath !== "undefined" ? consumePath : true;
                const ctx = this.ctx;
                const fillColor = this.current.fillColor;
                const isPatternFill = this.current.patternFill;
                let needRestore = false;
                if (isPatternFill) {
                  ctx.save();
                  ctx.fillStyle = fillColor.getPattern(ctx, this, (0, _display_utils2.getCurrentTransformInverse)(ctx), _pattern_helper.PathType.FILL);
                  needRestore = true;
                }
                const intersect = this.current.getClippedPathBoundingBox();
                if (this.contentVisible && intersect !== null) {
                  if (this.pendingEOFill) {
                    ctx.fill("evenodd");
                    this.pendingEOFill = false;
                  } else {
                    ctx.fill();
                  }
                }
                if (needRestore) {
                  ctx.restore();
                }
                if (consumePath) {
                  this.consumePath(intersect);
                }
              }
              eoFill() {
                this.pendingEOFill = true;
                this.fill();
              }
              fillStroke() {
                this.fill(false);
                this.stroke(false);
                this.consumePath();
              }
              eoFillStroke() {
                this.pendingEOFill = true;
                this.fillStroke();
              }
              closeFillStroke() {
                this.closePath();
                this.fillStroke();
              }
              closeEOFillStroke() {
                this.pendingEOFill = true;
                this.closePath();
                this.fillStroke();
              }
              endPath() {
                this.consumePath();
              }
              clip() {
                this.pendingClip = NORMAL_CLIP;
              }
              eoClip() {
                this.pendingClip = EO_CLIP;
              }
              beginText() {
                this.current.textMatrix = _util2.IDENTITY_MATRIX;
                this.current.textMatrixScale = 1;
                this.current.x = this.current.lineX = 0;
                this.current.y = this.current.lineY = 0;
              }
              endText() {
                const paths = this.pendingTextPaths;
                const ctx = this.ctx;
                if (paths === void 0) {
                  ctx.beginPath();
                  return;
                }
                ctx.save();
                ctx.beginPath();
                for (const path of paths) {
                  ctx.setTransform(...path.transform);
                  ctx.translate(path.x, path.y);
                  path.addToPath(ctx, path.fontSize);
                }
                ctx.restore();
                ctx.clip();
                ctx.beginPath();
                delete this.pendingTextPaths;
              }
              setCharSpacing(spacing) {
                this.current.charSpacing = spacing;
              }
              setWordSpacing(spacing) {
                this.current.wordSpacing = spacing;
              }
              setHScale(scale) {
                this.current.textHScale = scale / 100;
              }
              setLeading(leading) {
                this.current.leading = -leading;
              }
              setFont(fontRefName, size) {
                const fontObj = this.commonObjs.get(fontRefName);
                const current = this.current;
                if (!fontObj) {
                  throw new Error(`Can't find font for ${fontRefName}`);
                }
                current.fontMatrix = fontObj.fontMatrix || _util2.FONT_IDENTITY_MATRIX;
                if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
                  (0, _util2.warn)("Invalid font matrix for font " + fontRefName);
                }
                if (size < 0) {
                  size = -size;
                  current.fontDirection = -1;
                } else {
                  current.fontDirection = 1;
                }
                this.current.font = fontObj;
                this.current.fontSize = size;
                if (fontObj.isType3Font) {
                  return;
                }
                const name = fontObj.loadedName || "sans-serif";
                let bold = "normal";
                if (fontObj.black) {
                  bold = "900";
                } else if (fontObj.bold) {
                  bold = "bold";
                }
                const italic = fontObj.italic ? "italic" : "normal";
                const typeface = `"${name}", ${fontObj.fallbackName}`;
                let browserFontSize = size;
                if (size < MIN_FONT_SIZE) {
                  browserFontSize = MIN_FONT_SIZE;
                } else if (size > MAX_FONT_SIZE) {
                  browserFontSize = MAX_FONT_SIZE;
                }
                this.current.fontSizeScale = size / browserFontSize;
                this.ctx.font = `${italic} ${bold} ${browserFontSize}px ${typeface}`;
              }
              setTextRenderingMode(mode) {
                this.current.textRenderingMode = mode;
              }
              setTextRise(rise) {
                this.current.textRise = rise;
              }
              moveText(x, y) {
                this.current.x = this.current.lineX += x;
                this.current.y = this.current.lineY += y;
              }
              setLeadingMoveText(x, y) {
                this.setLeading(-y);
                this.moveText(x, y);
              }
              setTextMatrix(a, b, c, d, e, f) {
                this.current.textMatrix = [a, b, c, d, e, f];
                this.current.textMatrixScale = Math.hypot(a, b);
                this.current.x = this.current.lineX = 0;
                this.current.y = this.current.lineY = 0;
              }
              nextLine() {
                this.moveText(0, this.current.leading);
              }
              paintChar(character, x, y, patternTransform) {
                const ctx = this.ctx;
                const current = this.current;
                const font = current.font;
                const textRenderingMode = current.textRenderingMode;
                const fontSize = current.fontSize / current.fontSizeScale;
                const fillStrokeMode = textRenderingMode & _util2.TextRenderingMode.FILL_STROKE_MASK;
                const isAddToPathSet = !!(textRenderingMode & _util2.TextRenderingMode.ADD_TO_PATH_FLAG);
                const patternFill = current.patternFill && !font.missingFile;
                let addToPath;
                if (font.disableFontFace || isAddToPathSet || patternFill) {
                  addToPath = font.getPathGenerator(this.commonObjs, character);
                }
                if (font.disableFontFace || patternFill) {
                  ctx.save();
                  ctx.translate(x, y);
                  ctx.beginPath();
                  addToPath(ctx, fontSize);
                  if (patternTransform) {
                    ctx.setTransform(...patternTransform);
                  }
                  if (fillStrokeMode === _util2.TextRenderingMode.FILL || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    ctx.fill();
                  }
                  if (fillStrokeMode === _util2.TextRenderingMode.STROKE || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    ctx.stroke();
                  }
                  ctx.restore();
                } else {
                  if (fillStrokeMode === _util2.TextRenderingMode.FILL || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    ctx.fillText(character, x, y);
                  }
                  if (fillStrokeMode === _util2.TextRenderingMode.STROKE || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    ctx.strokeText(character, x, y);
                  }
                }
                if (isAddToPathSet) {
                  const paths = this.pendingTextPaths || (this.pendingTextPaths = []);
                  paths.push({
                    transform: (0, _display_utils2.getCurrentTransform)(ctx),
                    x,
                    y,
                    fontSize,
                    addToPath
                  });
                }
              }
              get isFontSubpixelAAEnabled() {
                const {
                  context: ctx
                } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
                ctx.scale(1.5, 1);
                ctx.fillText("I", 0, 10);
                const data = ctx.getImageData(0, 0, 10, 10).data;
                let enabled = false;
                for (let i = 3; i < data.length; i += 4) {
                  if (data[i] > 0 && data[i] < 255) {
                    enabled = true;
                    break;
                  }
                }
                return (0, _util2.shadow)(this, "isFontSubpixelAAEnabled", enabled);
              }
              showText(glyphs) {
                const current = this.current;
                const font = current.font;
                if (font.isType3Font) {
                  return this.showType3Text(glyphs);
                }
                const fontSize = current.fontSize;
                if (fontSize === 0) {
                  return void 0;
                }
                const ctx = this.ctx;
                const fontSizeScale = current.fontSizeScale;
                const charSpacing = current.charSpacing;
                const wordSpacing = current.wordSpacing;
                const fontDirection = current.fontDirection;
                const textHScale = current.textHScale * fontDirection;
                const glyphsLength = glyphs.length;
                const vertical = font.vertical;
                const spacingDir = vertical ? 1 : -1;
                const defaultVMetrics = font.defaultVMetrics;
                const widthAdvanceScale = fontSize * current.fontMatrix[0];
                const simpleFillText = current.textRenderingMode === _util2.TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
                ctx.save();
                ctx.transform(...current.textMatrix);
                ctx.translate(current.x, current.y + current.textRise);
                if (fontDirection > 0) {
                  ctx.scale(textHScale, -1);
                } else {
                  ctx.scale(textHScale, 1);
                }
                let patternTransform;
                if (current.patternFill) {
                  ctx.save();
                  const pattern = current.fillColor.getPattern(ctx, this, (0, _display_utils2.getCurrentTransformInverse)(ctx), _pattern_helper.PathType.FILL);
                  patternTransform = (0, _display_utils2.getCurrentTransform)(ctx);
                  ctx.restore();
                  ctx.fillStyle = pattern;
                }
                let lineWidth = current.lineWidth;
                const scale = current.textMatrixScale;
                if (scale === 0 || lineWidth === 0) {
                  const fillStrokeMode = current.textRenderingMode & _util2.TextRenderingMode.FILL_STROKE_MASK;
                  if (fillStrokeMode === _util2.TextRenderingMode.STROKE || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    lineWidth = this.getSinglePixelWidth();
                  }
                } else {
                  lineWidth /= scale;
                }
                if (fontSizeScale !== 1) {
                  ctx.scale(fontSizeScale, fontSizeScale);
                  lineWidth /= fontSizeScale;
                }
                ctx.lineWidth = lineWidth;
                let x = 0, i;
                for (i = 0; i < glyphsLength; ++i) {
                  const glyph = glyphs[i];
                  if (typeof glyph === "number") {
                    x += spacingDir * glyph * fontSize / 1e3;
                    continue;
                  }
                  let restoreNeeded = false;
                  const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
                  const character = glyph.fontChar;
                  const accent = glyph.accent;
                  let scaledX, scaledY;
                  let width = glyph.width;
                  if (vertical) {
                    const vmetric = glyph.vmetric || defaultVMetrics;
                    const vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
                    const vy = vmetric[2] * widthAdvanceScale;
                    width = vmetric ? -vmetric[0] : width;
                    scaledX = vx / fontSizeScale;
                    scaledY = (x + vy) / fontSizeScale;
                  } else {
                    scaledX = x / fontSizeScale;
                    scaledY = 0;
                  }
                  if (font.remeasure && width > 0) {
                    const measuredWidth = ctx.measureText(character).width * 1e3 / fontSize * fontSizeScale;
                    if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
                      const characterScaleX = width / measuredWidth;
                      restoreNeeded = true;
                      ctx.save();
                      ctx.scale(characterScaleX, 1);
                      scaledX /= characterScaleX;
                    } else if (width !== measuredWidth) {
                      scaledX += (width - measuredWidth) / 2e3 * fontSize / fontSizeScale;
                    }
                  }
                  if (this.contentVisible && (glyph.isInFont || font.missingFile)) {
                    if (simpleFillText && !accent) {
                      ctx.fillText(character, scaledX, scaledY);
                    } else {
                      this.paintChar(character, scaledX, scaledY, patternTransform);
                      if (accent) {
                        const scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
                        const scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
                        this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform);
                      }
                    }
                  }
                  let charWidth;
                  if (vertical) {
                    charWidth = width * widthAdvanceScale - spacing * fontDirection;
                  } else {
                    charWidth = width * widthAdvanceScale + spacing * fontDirection;
                  }
                  x += charWidth;
                  if (restoreNeeded) {
                    ctx.restore();
                  }
                }
                if (vertical) {
                  current.y -= x;
                } else {
                  current.x += x * textHScale;
                }
                ctx.restore();
                this.compose();
                return void 0;
              }
              showType3Text(glyphs) {
                const ctx = this.ctx;
                const current = this.current;
                const font = current.font;
                const fontSize = current.fontSize;
                const fontDirection = current.fontDirection;
                const spacingDir = font.vertical ? 1 : -1;
                const charSpacing = current.charSpacing;
                const wordSpacing = current.wordSpacing;
                const textHScale = current.textHScale * fontDirection;
                const fontMatrix = current.fontMatrix || _util2.FONT_IDENTITY_MATRIX;
                const glyphsLength = glyphs.length;
                const isTextInvisible = current.textRenderingMode === _util2.TextRenderingMode.INVISIBLE;
                let i, glyph, width, spacingLength;
                if (isTextInvisible || fontSize === 0) {
                  return;
                }
                this._cachedScaleForStroking = null;
                this._cachedGetSinglePixelWidth = null;
                ctx.save();
                ctx.transform(...current.textMatrix);
                ctx.translate(current.x, current.y);
                ctx.scale(textHScale, fontDirection);
                for (i = 0; i < glyphsLength; ++i) {
                  glyph = glyphs[i];
                  if (typeof glyph === "number") {
                    spacingLength = spacingDir * glyph * fontSize / 1e3;
                    this.ctx.translate(spacingLength, 0);
                    current.x += spacingLength * textHScale;
                    continue;
                  }
                  const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
                  const operatorList = font.charProcOperatorList[glyph.operatorListId];
                  if (!operatorList) {
                    (0, _util2.warn)(`Type3 character "${glyph.operatorListId}" is not available.`);
                    continue;
                  }
                  if (this.contentVisible) {
                    this.processingType3 = glyph;
                    this.save();
                    ctx.scale(fontSize, fontSize);
                    ctx.transform(...fontMatrix);
                    this.executeOperatorList(operatorList);
                    this.restore();
                  }
                  const transformed = _util2.Util.applyTransform([glyph.width, 0], fontMatrix);
                  width = transformed[0] * fontSize + spacing;
                  ctx.translate(width, 0);
                  current.x += width * textHScale;
                }
                ctx.restore();
                this.processingType3 = null;
              }
              setCharWidth(xWidth, yWidth) {
              }
              setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
                this.ctx.rect(llx, lly, urx - llx, ury - lly);
                this.ctx.clip();
                this.endPath();
              }
              getColorN_Pattern(IR) {
                let pattern;
                if (IR[0] === "TilingPattern") {
                  const color = IR[1];
                  const baseTransform = this.baseTransform || (0, _display_utils2.getCurrentTransform)(this.ctx);
                  const canvasGraphicsFactory = {
                    createCanvasGraphics: (ctx) => {
                      return new _CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory);
                    }
                  };
                  pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
                } else {
                  pattern = this._getPattern(IR[1], IR[2]);
                }
                return pattern;
              }
              setStrokeColorN() {
                this.current.strokeColor = this.getColorN_Pattern(arguments);
              }
              setFillColorN() {
                this.current.fillColor = this.getColorN_Pattern(arguments);
                this.current.patternFill = true;
              }
              setStrokeRGBColor(r2, g, b) {
                var _a;
                const color = ((_a = this.selectColor) == null ? void 0 : _a.call(this, r2, g, b)) || _util2.Util.makeHexColor(r2, g, b);
                this.ctx.strokeStyle = color;
                this.current.strokeColor = color;
              }
              setFillRGBColor(r2, g, b) {
                var _a;
                const color = ((_a = this.selectColor) == null ? void 0 : _a.call(this, r2, g, b)) || _util2.Util.makeHexColor(r2, g, b);
                this.ctx.fillStyle = color;
                this.current.fillColor = color;
                this.current.patternFill = false;
              }
              _getPattern(objId, matrix = null) {
                let pattern;
                if (this.cachedPatterns.has(objId)) {
                  pattern = this.cachedPatterns.get(objId);
                } else {
                  pattern = (0, _pattern_helper.getShadingPattern)(this.objs.get(objId));
                  this.cachedPatterns.set(objId, pattern);
                }
                if (matrix) {
                  pattern.matrix = matrix;
                }
                return pattern;
              }
              shadingFill(objId) {
                if (!this.contentVisible) {
                  return;
                }
                const ctx = this.ctx;
                this.save();
                const pattern = this._getPattern(objId);
                ctx.fillStyle = pattern.getPattern(ctx, this, (0, _display_utils2.getCurrentTransformInverse)(ctx), _pattern_helper.PathType.SHADING);
                const inv = (0, _display_utils2.getCurrentTransformInverse)(ctx);
                if (inv) {
                  const canvas = ctx.canvas;
                  const width = canvas.width;
                  const height = canvas.height;
                  const bl = _util2.Util.applyTransform([0, 0], inv);
                  const br = _util2.Util.applyTransform([0, height], inv);
                  const ul = _util2.Util.applyTransform([width, 0], inv);
                  const ur = _util2.Util.applyTransform([width, height], inv);
                  const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
                  const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
                  const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
                  const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
                  this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
                } else {
                  this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
                }
                this.compose(this.current.getClippedPathBoundingBox());
                this.restore();
              }
              beginInlineImage() {
                (0, _util2.unreachable)("Should not call beginInlineImage");
              }
              beginImageData() {
                (0, _util2.unreachable)("Should not call beginImageData");
              }
              paintFormXObjectBegin(matrix, bbox) {
                if (!this.contentVisible) {
                  return;
                }
                this.save();
                this.baseTransformStack.push(this.baseTransform);
                if (Array.isArray(matrix) && matrix.length === 6) {
                  this.transform(...matrix);
                }
                this.baseTransform = (0, _display_utils2.getCurrentTransform)(this.ctx);
                if (bbox) {
                  const width = bbox[2] - bbox[0];
                  const height = bbox[3] - bbox[1];
                  this.ctx.rect(bbox[0], bbox[1], width, height);
                  this.current.updateRectMinMax((0, _display_utils2.getCurrentTransform)(this.ctx), bbox);
                  this.clip();
                  this.endPath();
                }
              }
              paintFormXObjectEnd() {
                if (!this.contentVisible) {
                  return;
                }
                this.restore();
                this.baseTransform = this.baseTransformStack.pop();
              }
              beginGroup(group) {
                if (!this.contentVisible) {
                  return;
                }
                this.save();
                if (this.inSMaskMode) {
                  this.endSMaskMode();
                  this.current.activeSMask = null;
                }
                const currentCtx = this.ctx;
                if (!group.isolated) {
                  (0, _util2.info)("TODO: Support non-isolated groups.");
                }
                if (group.knockout) {
                  (0, _util2.warn)("Knockout groups not supported.");
                }
                const currentTransform = (0, _display_utils2.getCurrentTransform)(currentCtx);
                if (group.matrix) {
                  currentCtx.transform(...group.matrix);
                }
                if (!group.bbox) {
                  throw new Error("Bounding box is required.");
                }
                let bounds = _util2.Util.getAxialAlignedBoundingBox(group.bbox, (0, _display_utils2.getCurrentTransform)(currentCtx));
                const canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
                bounds = _util2.Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
                const offsetX = Math.floor(bounds[0]);
                const offsetY = Math.floor(bounds[1]);
                let drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
                let drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
                let scaleX = 1, scaleY = 1;
                if (drawnWidth > MAX_GROUP_SIZE) {
                  scaleX = drawnWidth / MAX_GROUP_SIZE;
                  drawnWidth = MAX_GROUP_SIZE;
                }
                if (drawnHeight > MAX_GROUP_SIZE) {
                  scaleY = drawnHeight / MAX_GROUP_SIZE;
                  drawnHeight = MAX_GROUP_SIZE;
                }
                this.current.startNewPathAndClipBox([0, 0, drawnWidth, drawnHeight]);
                let cacheId = "groupAt" + this.groupLevel;
                if (group.smask) {
                  cacheId += "_smask_" + this.smaskCounter++ % 2;
                }
                const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight);
                const groupCtx = scratchCanvas.context;
                groupCtx.scale(1 / scaleX, 1 / scaleY);
                groupCtx.translate(-offsetX, -offsetY);
                groupCtx.transform(...currentTransform);
                if (group.smask) {
                  this.smaskStack.push({
                    canvas: scratchCanvas.canvas,
                    context: groupCtx,
                    offsetX,
                    offsetY,
                    scaleX,
                    scaleY,
                    subtype: group.smask.subtype,
                    backdrop: group.smask.backdrop,
                    transferMap: group.smask.transferMap || null,
                    startTransformInverse: null
                  });
                } else {
                  currentCtx.setTransform(1, 0, 0, 1, 0, 0);
                  currentCtx.translate(offsetX, offsetY);
                  currentCtx.scale(scaleX, scaleY);
                  currentCtx.save();
                }
                copyCtxState(currentCtx, groupCtx);
                this.ctx = groupCtx;
                this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
                this.groupStack.push(currentCtx);
                this.groupLevel++;
              }
              endGroup(group) {
                if (!this.contentVisible) {
                  return;
                }
                this.groupLevel--;
                const groupCtx = this.ctx;
                const ctx = this.groupStack.pop();
                this.ctx = ctx;
                this.ctx.imageSmoothingEnabled = false;
                if (group.smask) {
                  this.tempSMask = this.smaskStack.pop();
                  this.restore();
                } else {
                  this.ctx.restore();
                  const currentMtx = (0, _display_utils2.getCurrentTransform)(this.ctx);
                  this.restore();
                  this.ctx.save();
                  this.ctx.setTransform(...currentMtx);
                  const dirtyBox = _util2.Util.getAxialAlignedBoundingBox([0, 0, groupCtx.canvas.width, groupCtx.canvas.height], currentMtx);
                  this.ctx.drawImage(groupCtx.canvas, 0, 0);
                  this.ctx.restore();
                  this.compose(dirtyBox);
                }
              }
              beginAnnotation(id, rect, transform, matrix, hasOwnCanvas) {
                __privateMethod(this, _restoreInitialState, restoreInitialState_fn).call(this);
                resetCtxToDefault(this.ctx, this.foregroundColor);
                this.ctx.save();
                this.save();
                if (this.baseTransform) {
                  this.ctx.setTransform(...this.baseTransform);
                }
                if (Array.isArray(rect) && rect.length === 4) {
                  const width = rect[2] - rect[0];
                  const height = rect[3] - rect[1];
                  if (hasOwnCanvas && this.annotationCanvasMap) {
                    transform = transform.slice();
                    transform[4] -= rect[0];
                    transform[5] -= rect[1];
                    rect = rect.slice();
                    rect[0] = rect[1] = 0;
                    rect[2] = width;
                    rect[3] = height;
                    const [scaleX, scaleY] = _util2.Util.singularValueDecompose2dScale((0, _display_utils2.getCurrentTransform)(this.ctx));
                    const {
                      viewportScale
                    } = this;
                    const canvasWidth = Math.ceil(width * this.outputScaleX * viewportScale);
                    const canvasHeight = Math.ceil(height * this.outputScaleY * viewportScale);
                    this.annotationCanvas = this.canvasFactory.create(canvasWidth, canvasHeight);
                    const {
                      canvas,
                      context
                    } = this.annotationCanvas;
                    this.annotationCanvasMap.set(id, canvas);
                    this.annotationCanvas.savedCtx = this.ctx;
                    this.ctx = context;
                    this.ctx.setTransform(scaleX, 0, 0, -scaleY, 0, height * scaleY);
                    resetCtxToDefault(this.ctx, this.foregroundColor);
                  } else {
                    resetCtxToDefault(this.ctx, this.foregroundColor);
                    this.ctx.rect(rect[0], rect[1], width, height);
                    this.ctx.clip();
                    this.endPath();
                  }
                }
                this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height);
                this.transform(...transform);
                this.transform(...matrix);
              }
              endAnnotation() {
                if (this.annotationCanvas) {
                  this.ctx = this.annotationCanvas.savedCtx;
                  delete this.annotationCanvas.savedCtx;
                  delete this.annotationCanvas;
                }
              }
              paintImageMaskXObject(img) {
                if (!this.contentVisible) {
                  return;
                }
                const count = img.count;
                img = this.getObject(img.data, img);
                img.count = count;
                const ctx = this.ctx;
                const glyph = this.processingType3;
                if (glyph) {
                  if (glyph.compiled === void 0) {
                    glyph.compiled = compileType3Glyph(img);
                  }
                  if (glyph.compiled) {
                    glyph.compiled(ctx);
                    return;
                  }
                }
                const mask = this._createMaskCanvas(img);
                const maskCanvas = mask.canvas;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY);
                ctx.restore();
                this.compose();
              }
              paintImageMaskXObjectRepeat(img, scaleX, skewX = 0, skewY = 0, scaleY, positions) {
                if (!this.contentVisible) {
                  return;
                }
                img = this.getObject(img.data, img);
                const ctx = this.ctx;
                ctx.save();
                const currentTransform = (0, _display_utils2.getCurrentTransform)(ctx);
                ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0);
                const mask = this._createMaskCanvas(img);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                for (let i = 0, ii = positions.length; i < ii; i += 2) {
                  const trans = _util2.Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]]);
                  const [x, y] = _util2.Util.applyTransform([0, 0], trans);
                  ctx.drawImage(mask.canvas, x, y);
                }
                ctx.restore();
                this.compose();
              }
              paintImageMaskXObjectGroup(images) {
                if (!this.contentVisible) {
                  return;
                }
                const ctx = this.ctx;
                const fillColor = this.current.fillColor;
                const isPatternFill = this.current.patternFill;
                for (const image of images) {
                  const {
                    data,
                    width,
                    height,
                    transform
                  } = image;
                  const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
                  const maskCtx = maskCanvas.context;
                  maskCtx.save();
                  const img = this.getObject(data, image);
                  putBinaryImageMask(maskCtx, img);
                  maskCtx.globalCompositeOperation = "source-in";
                  maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, (0, _display_utils2.getCurrentTransformInverse)(ctx), _pattern_helper.PathType.FILL) : fillColor;
                  maskCtx.fillRect(0, 0, width, height);
                  maskCtx.restore();
                  ctx.save();
                  ctx.transform(...transform);
                  ctx.scale(1, -1);
                  drawImageAtIntegerCoords(ctx, maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
                  ctx.restore();
                }
                this.compose();
              }
              paintImageXObject(objId) {
                if (!this.contentVisible) {
                  return;
                }
                const imgData = this.getObject(objId);
                if (!imgData) {
                  (0, _util2.warn)("Dependent image isn't ready yet");
                  return;
                }
                this.paintInlineImageXObject(imgData);
              }
              paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
                if (!this.contentVisible) {
                  return;
                }
                const imgData = this.getObject(objId);
                if (!imgData) {
                  (0, _util2.warn)("Dependent image isn't ready yet");
                  return;
                }
                const width = imgData.width;
                const height = imgData.height;
                const map = [];
                for (let i = 0, ii = positions.length; i < ii; i += 2) {
                  map.push({
                    transform: [scaleX, 0, 0, scaleY, positions[i], positions[i + 1]],
                    x: 0,
                    y: 0,
                    w: width,
                    h: height
                  });
                }
                this.paintInlineImageXObjectGroup(imgData, map);
              }
              paintInlineImageXObject(imgData) {
                if (!this.contentVisible) {
                  return;
                }
                const width = imgData.width;
                const height = imgData.height;
                const ctx = this.ctx;
                this.save();
                ctx.scale(1 / width, -1 / height);
                let imgToPaint;
                if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
                  imgToPaint = imgData;
                } else {
                  const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
                  const tmpCtx = tmpCanvas.context;
                  putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
                  imgToPaint = tmpCanvas.canvas;
                }
                const scaled = this._scaleImage(imgToPaint, (0, _display_utils2.getCurrentTransformInverse)(ctx));
                ctx.imageSmoothingEnabled = getImageSmoothingEnabled((0, _display_utils2.getCurrentTransform)(ctx), imgData.interpolate);
                const [rWidth, rHeight] = drawImageAtIntegerCoords(ctx, scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height);
                if (this.imageLayer) {
                  const [left2, top2] = _util2.Util.applyTransform([0, -height], (0, _display_utils2.getCurrentTransform)(this.ctx));
                  this.imageLayer.appendImage({
                    imgData,
                    left: left2,
                    top: top2,
                    width: rWidth,
                    height: rHeight
                  });
                }
                this.compose();
                this.restore();
              }
              paintInlineImageXObjectGroup(imgData, map) {
                if (!this.contentVisible) {
                  return;
                }
                const ctx = this.ctx;
                const w = imgData.width;
                const h = imgData.height;
                const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h);
                const tmpCtx = tmpCanvas.context;
                putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
                for (const entry of map) {
                  ctx.save();
                  ctx.transform(...entry.transform);
                  ctx.scale(1, -1);
                  drawImageAtIntegerCoords(ctx, tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);
                  if (this.imageLayer) {
                    const [left2, top2] = _util2.Util.applyTransform([entry.x, entry.y], (0, _display_utils2.getCurrentTransform)(this.ctx));
                    this.imageLayer.appendImage({
                      imgData,
                      left: left2,
                      top: top2,
                      width: w,
                      height: h
                    });
                  }
                  ctx.restore();
                }
                this.compose();
              }
              paintSolidColorImageMask() {
                if (!this.contentVisible) {
                  return;
                }
                this.ctx.fillRect(0, 0, 1, 1);
                this.compose();
              }
              markPoint(tag) {
              }
              markPointProps(tag, properties) {
              }
              beginMarkedContent(tag) {
                this.markedContentStack.push({
                  visible: true
                });
              }
              beginMarkedContentProps(tag, properties) {
                if (tag === "OC") {
                  this.markedContentStack.push({
                    visible: this.optionalContentConfig.isVisible(properties)
                  });
                } else {
                  this.markedContentStack.push({
                    visible: true
                  });
                }
                this.contentVisible = this.isContentVisible();
              }
              endMarkedContent() {
                this.markedContentStack.pop();
                this.contentVisible = this.isContentVisible();
              }
              beginCompat() {
              }
              endCompat() {
              }
              consumePath(clipBox) {
                const isEmpty = this.current.isEmptyClip();
                if (this.pendingClip) {
                  this.current.updateClipFromPath();
                }
                if (!this.pendingClip) {
                  this.compose(clipBox);
                }
                const ctx = this.ctx;
                if (this.pendingClip) {
                  if (!isEmpty) {
                    if (this.pendingClip === EO_CLIP) {
                      ctx.clip("evenodd");
                    } else {
                      ctx.clip();
                    }
                  }
                  this.pendingClip = null;
                }
                this.current.startNewPathAndClipBox(this.current.clipBox);
                ctx.beginPath();
              }
              getSinglePixelWidth() {
                if (!this._cachedGetSinglePixelWidth) {
                  const m = (0, _display_utils2.getCurrentTransform)(this.ctx);
                  if (m[1] === 0 && m[2] === 0) {
                    this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(m[0]), Math.abs(m[3]));
                  } else {
                    const absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
                    const normX = Math.hypot(m[0], m[2]);
                    const normY = Math.hypot(m[1], m[3]);
                    this._cachedGetSinglePixelWidth = Math.max(normX, normY) / absDet;
                  }
                }
                return this._cachedGetSinglePixelWidth;
              }
              getScaleForStroking() {
                if (!this._cachedScaleForStroking) {
                  const {
                    lineWidth
                  } = this.current;
                  const m = (0, _display_utils2.getCurrentTransform)(this.ctx);
                  let scaleX, scaleY;
                  if (m[1] === 0 && m[2] === 0) {
                    const normX = Math.abs(m[0]);
                    const normY = Math.abs(m[3]);
                    if (lineWidth === 0) {
                      scaleX = 1 / normX;
                      scaleY = 1 / normY;
                    } else {
                      const scaledXLineWidth = normX * lineWidth;
                      const scaledYLineWidth = normY * lineWidth;
                      scaleX = scaledXLineWidth < 1 ? 1 / scaledXLineWidth : 1;
                      scaleY = scaledYLineWidth < 1 ? 1 / scaledYLineWidth : 1;
                    }
                  } else {
                    const absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
                    const normX = Math.hypot(m[0], m[1]);
                    const normY = Math.hypot(m[2], m[3]);
                    if (lineWidth === 0) {
                      scaleX = normY / absDet;
                      scaleY = normX / absDet;
                    } else {
                      const baseArea = lineWidth * absDet;
                      scaleX = normY > baseArea ? normY / baseArea : 1;
                      scaleY = normX > baseArea ? normX / baseArea : 1;
                    }
                  }
                  this._cachedScaleForStroking = [scaleX, scaleY];
                }
                return this._cachedScaleForStroking;
              }
              rescaleAndStroke(saveRestore) {
                const {
                  ctx
                } = this;
                const {
                  lineWidth
                } = this.current;
                const [scaleX, scaleY] = this.getScaleForStroking();
                ctx.lineWidth = lineWidth || 1;
                if (scaleX === 1 && scaleY === 1) {
                  ctx.stroke();
                  return;
                }
                let savedMatrix, savedDashes, savedDashOffset;
                if (saveRestore) {
                  savedMatrix = (0, _display_utils2.getCurrentTransform)(ctx);
                  savedDashes = ctx.getLineDash().slice();
                  savedDashOffset = ctx.lineDashOffset;
                }
                ctx.scale(scaleX, scaleY);
                const scale = Math.max(scaleX, scaleY);
                ctx.setLineDash(ctx.getLineDash().map((x) => x / scale));
                ctx.lineDashOffset /= scale;
                ctx.stroke();
                if (saveRestore) {
                  ctx.setTransform(...savedMatrix);
                  ctx.setLineDash(savedDashes);
                  ctx.lineDashOffset = savedDashOffset;
                }
              }
              isContentVisible() {
                for (let i = this.markedContentStack.length - 1; i >= 0; i--) {
                  if (!this.markedContentStack[i].visible) {
                    return false;
                  }
                }
                return true;
              }
            };
            let CanvasGraphics = _CanvasGraphics;
            _restoreInitialState = new WeakSet();
            restoreInitialState_fn = function() {
              while (this.stateStack.length || this.inSMaskMode) {
                this.restore();
              }
              this.ctx.restore();
              if (this.transparentCanvas) {
                this.ctx = this.compositeCtx;
                this.ctx.save();
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.drawImage(this.transparentCanvas, 0, 0);
                this.ctx.restore();
                this.transparentCanvas = null;
              }
            };
            exports2.CanvasGraphics = CanvasGraphics;
            for (const op in _util2.OPS) {
              if (CanvasGraphics.prototype[op] !== void 0) {
                CanvasGraphics.prototype[_util2.OPS[op]] = CanvasGraphics.prototype[op];
              }
            }
          },
          /* 13 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.TilingPattern = exports2.PathType = void 0;
            exports2.getShadingPattern = getShadingPattern;
            var _util2 = __w_pdfjs_require__2(1);
            var _display_utils2 = __w_pdfjs_require__2(8);
            var _is_node2 = __w_pdfjs_require__2(3);
            const PathType = {
              FILL: "Fill",
              STROKE: "Stroke",
              SHADING: "Shading"
            };
            exports2.PathType = PathType;
            function applyBoundingBox(ctx, bbox) {
              if (!bbox || _is_node2.isNodeJS) {
                return;
              }
              const width = bbox[2] - bbox[0];
              const height = bbox[3] - bbox[1];
              const region = new Path2D();
              region.rect(bbox[0], bbox[1], width, height);
              ctx.clip(region);
            }
            class BaseShadingPattern {
              constructor() {
                if (this.constructor === BaseShadingPattern) {
                  (0, _util2.unreachable)("Cannot initialize BaseShadingPattern.");
                }
              }
              getPattern() {
                (0, _util2.unreachable)("Abstract method `getPattern` called.");
              }
            }
            class RadialAxialShadingPattern extends BaseShadingPattern {
              constructor(IR) {
                super();
                this._type = IR[1];
                this._bbox = IR[2];
                this._colorStops = IR[3];
                this._p0 = IR[4];
                this._p1 = IR[5];
                this._r0 = IR[6];
                this._r1 = IR[7];
                this.matrix = null;
              }
              _createGradient(ctx) {
                let grad;
                if (this._type === "axial") {
                  grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]);
                } else if (this._type === "radial") {
                  grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1);
                }
                for (const colorStop of this._colorStops) {
                  grad.addColorStop(colorStop[0], colorStop[1]);
                }
                return grad;
              }
              getPattern(ctx, owner, inverse, pathType) {
                let pattern;
                if (pathType === PathType.STROKE || pathType === PathType.FILL) {
                  const ownerBBox = owner.current.getClippedPathBoundingBox(pathType, (0, _display_utils2.getCurrentTransform)(ctx)) || [0, 0, 0, 0];
                  const width = Math.ceil(ownerBBox[2] - ownerBBox[0]) || 1;
                  const height = Math.ceil(ownerBBox[3] - ownerBBox[1]) || 1;
                  const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", width, height, true);
                  const tmpCtx = tmpCanvas.context;
                  tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
                  tmpCtx.beginPath();
                  tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
                  tmpCtx.translate(-ownerBBox[0], -ownerBBox[1]);
                  inverse = _util2.Util.transform(inverse, [1, 0, 0, 1, ownerBBox[0], ownerBBox[1]]);
                  tmpCtx.transform(...owner.baseTransform);
                  if (this.matrix) {
                    tmpCtx.transform(...this.matrix);
                  }
                  applyBoundingBox(tmpCtx, this._bbox);
                  tmpCtx.fillStyle = this._createGradient(tmpCtx);
                  tmpCtx.fill();
                  pattern = ctx.createPattern(tmpCanvas.canvas, "no-repeat");
                  const domMatrix = new DOMMatrix(inverse);
                  try {
                    pattern.setTransform(domMatrix);
                  } catch (ex) {
                    (0, _util2.warn)(`RadialAxialShadingPattern.getPattern: "${ex == null ? void 0 : ex.message}".`);
                  }
                } else {
                  applyBoundingBox(ctx, this._bbox);
                  pattern = this._createGradient(ctx);
                }
                return pattern;
              }
            }
            function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
              const coords = context.coords, colors = context.colors;
              const bytes = data.data, rowSize = data.width * 4;
              let tmp;
              if (coords[p1 + 1] > coords[p2 + 1]) {
                tmp = p1;
                p1 = p2;
                p2 = tmp;
                tmp = c1;
                c1 = c2;
                c2 = tmp;
              }
              if (coords[p2 + 1] > coords[p3 + 1]) {
                tmp = p2;
                p2 = p3;
                p3 = tmp;
                tmp = c2;
                c2 = c3;
                c3 = tmp;
              }
              if (coords[p1 + 1] > coords[p2 + 1]) {
                tmp = p1;
                p1 = p2;
                p2 = tmp;
                tmp = c1;
                c1 = c2;
                c2 = tmp;
              }
              const x1 = (coords[p1] + context.offsetX) * context.scaleX;
              const y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
              const x2 = (coords[p2] + context.offsetX) * context.scaleX;
              const y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
              const x3 = (coords[p3] + context.offsetX) * context.scaleX;
              const y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;
              if (y1 >= y3) {
                return;
              }
              const c1r = colors[c1], c1g = colors[c1 + 1], c1b = colors[c1 + 2];
              const c2r = colors[c2], c2g = colors[c2 + 1], c2b = colors[c2 + 2];
              const c3r = colors[c3], c3g = colors[c3 + 1], c3b = colors[c3 + 2];
              const minY = Math.round(y1), maxY = Math.round(y3);
              let xa, car, cag, cab;
              let xb, cbr, cbg, cbb;
              for (let y = minY; y <= maxY; y++) {
                if (y < y2) {
                  let k2;
                  if (y < y1) {
                    k2 = 0;
                  } else {
                    k2 = (y1 - y) / (y1 - y2);
                  }
                  xa = x1 - (x1 - x2) * k2;
                  car = c1r - (c1r - c2r) * k2;
                  cag = c1g - (c1g - c2g) * k2;
                  cab = c1b - (c1b - c2b) * k2;
                } else {
                  let k2;
                  if (y > y3) {
                    k2 = 1;
                  } else if (y2 === y3) {
                    k2 = 0;
                  } else {
                    k2 = (y2 - y) / (y2 - y3);
                  }
                  xa = x2 - (x2 - x3) * k2;
                  car = c2r - (c2r - c3r) * k2;
                  cag = c2g - (c2g - c3g) * k2;
                  cab = c2b - (c2b - c3b) * k2;
                }
                let k;
                if (y < y1) {
                  k = 0;
                } else if (y > y3) {
                  k = 1;
                } else {
                  k = (y1 - y) / (y1 - y3);
                }
                xb = x1 - (x1 - x3) * k;
                cbr = c1r - (c1r - c3r) * k;
                cbg = c1g - (c1g - c3g) * k;
                cbb = c1b - (c1b - c3b) * k;
                const x1_ = Math.round(Math.min(xa, xb));
                const x2_ = Math.round(Math.max(xa, xb));
                let j = rowSize * y + x1_ * 4;
                for (let x = x1_; x <= x2_; x++) {
                  k = (xa - x) / (xa - xb);
                  if (k < 0) {
                    k = 0;
                  } else if (k > 1) {
                    k = 1;
                  }
                  bytes[j++] = car - (car - cbr) * k | 0;
                  bytes[j++] = cag - (cag - cbg) * k | 0;
                  bytes[j++] = cab - (cab - cbb) * k | 0;
                  bytes[j++] = 255;
                }
              }
            }
            function drawFigure(data, figure, context) {
              const ps = figure.coords;
              const cs = figure.colors;
              let i, ii;
              switch (figure.type) {
                case "lattice":
                  const verticesPerRow = figure.verticesPerRow;
                  const rows = Math.floor(ps.length / verticesPerRow) - 1;
                  const cols = verticesPerRow - 1;
                  for (i = 0; i < rows; i++) {
                    let q = i * verticesPerRow;
                    for (let j = 0; j < cols; j++, q++) {
                      drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
                      drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
                    }
                  }
                  break;
                case "triangles":
                  for (i = 0, ii = ps.length; i < ii; i += 3) {
                    drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
                  }
                  break;
                default:
                  throw new Error("illegal figure");
              }
            }
            class MeshShadingPattern extends BaseShadingPattern {
              constructor(IR) {
                super();
                this._coords = IR[2];
                this._colors = IR[3];
                this._figures = IR[4];
                this._bounds = IR[5];
                this._bbox = IR[7];
                this._background = IR[8];
                this.matrix = null;
              }
              _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases) {
                const EXPECTED_SCALE = 1.1;
                const MAX_PATTERN_SIZE = 3e3;
                const BORDER_SIZE = 2;
                const offsetX = Math.floor(this._bounds[0]);
                const offsetY = Math.floor(this._bounds[1]);
                const boundsWidth = Math.ceil(this._bounds[2]) - offsetX;
                const boundsHeight = Math.ceil(this._bounds[3]) - offsetY;
                const width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
                const height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
                const scaleX = boundsWidth / width;
                const scaleY = boundsHeight / height;
                const context = {
                  coords: this._coords,
                  colors: this._colors,
                  offsetX: -offsetX,
                  offsetY: -offsetY,
                  scaleX: 1 / scaleX,
                  scaleY: 1 / scaleY
                };
                const paddedWidth = width + BORDER_SIZE * 2;
                const paddedHeight = height + BORDER_SIZE * 2;
                const tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
                const tmpCtx = tmpCanvas.context;
                const data = tmpCtx.createImageData(width, height);
                if (backgroundColor) {
                  const bytes = data.data;
                  for (let i = 0, ii = bytes.length; i < ii; i += 4) {
                    bytes[i] = backgroundColor[0];
                    bytes[i + 1] = backgroundColor[1];
                    bytes[i + 2] = backgroundColor[2];
                    bytes[i + 3] = 255;
                  }
                }
                for (const figure of this._figures) {
                  drawFigure(data, figure, context);
                }
                tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
                const canvas = tmpCanvas.canvas;
                return {
                  canvas,
                  offsetX: offsetX - BORDER_SIZE * scaleX,
                  offsetY: offsetY - BORDER_SIZE * scaleY,
                  scaleX,
                  scaleY
                };
              }
              getPattern(ctx, owner, inverse, pathType) {
                applyBoundingBox(ctx, this._bbox);
                let scale;
                if (pathType === PathType.SHADING) {
                  scale = _util2.Util.singularValueDecompose2dScale((0, _display_utils2.getCurrentTransform)(ctx));
                } else {
                  scale = _util2.Util.singularValueDecompose2dScale(owner.baseTransform);
                  if (this.matrix) {
                    const matrixScale = _util2.Util.singularValueDecompose2dScale(this.matrix);
                    scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
                  }
                }
                const temporaryPatternCanvas = this._createMeshCanvas(scale, pathType === PathType.SHADING ? null : this._background, owner.cachedCanvases);
                if (pathType !== PathType.SHADING) {
                  ctx.setTransform(...owner.baseTransform);
                  if (this.matrix) {
                    ctx.transform(...this.matrix);
                  }
                }
                ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
                ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
                return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
              }
            }
            class DummyShadingPattern extends BaseShadingPattern {
              getPattern() {
                return "hotpink";
              }
            }
            function getShadingPattern(IR) {
              switch (IR[0]) {
                case "RadialAxial":
                  return new RadialAxialShadingPattern(IR);
                case "Mesh":
                  return new MeshShadingPattern(IR);
                case "Dummy":
                  return new DummyShadingPattern();
              }
              throw new Error(`Unknown IR type: ${IR[0]}`);
            }
            const PaintType = {
              COLORED: 1,
              UNCOLORED: 2
            };
            class TilingPattern {
              static get MAX_PATTERN_SIZE() {
                return (0, _util2.shadow)(this, "MAX_PATTERN_SIZE", 3e3);
              }
              constructor(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
                this.operatorList = IR[2];
                this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];
                this.bbox = IR[4];
                this.xstep = IR[5];
                this.ystep = IR[6];
                this.paintType = IR[7];
                this.tilingType = IR[8];
                this.color = color;
                this.ctx = ctx;
                this.canvasGraphicsFactory = canvasGraphicsFactory;
                this.baseTransform = baseTransform;
              }
              createPatternCanvas(owner) {
                const operatorList = this.operatorList;
                const bbox = this.bbox;
                const xstep = this.xstep;
                const ystep = this.ystep;
                const paintType = this.paintType;
                const tilingType = this.tilingType;
                const color = this.color;
                const canvasGraphicsFactory = this.canvasGraphicsFactory;
                (0, _util2.info)("TilingType: " + tilingType);
                const x0 = bbox[0], y0 = bbox[1], x1 = bbox[2], y1 = bbox[3];
                const matrixScale = _util2.Util.singularValueDecompose2dScale(this.matrix);
                const curMatrixScale = _util2.Util.singularValueDecompose2dScale(this.baseTransform);
                const combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
                const dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
                const dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
                const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
                const tmpCtx = tmpCanvas.context;
                const graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
                graphics.groupLevel = owner.groupLevel;
                this.setFillAndStrokeStyleToContext(graphics, paintType, color);
                let adjustedX0 = x0;
                let adjustedY0 = y0;
                let adjustedX1 = x1;
                let adjustedY1 = y1;
                if (x0 < 0) {
                  adjustedX0 = 0;
                  adjustedX1 += Math.abs(x0);
                }
                if (y0 < 0) {
                  adjustedY0 = 0;
                  adjustedY1 += Math.abs(y0);
                }
                tmpCtx.translate(-(dimx.scale * adjustedX0), -(dimy.scale * adjustedY0));
                graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
                tmpCtx.save();
                this.clipBbox(graphics, adjustedX0, adjustedY0, adjustedX1, adjustedY1);
                graphics.baseTransform = (0, _display_utils2.getCurrentTransform)(graphics.ctx);
                graphics.executeOperatorList(operatorList);
                graphics.endDrawing();
                return {
                  canvas: tmpCanvas.canvas,
                  scaleX: dimx.scale,
                  scaleY: dimy.scale,
                  offsetX: adjustedX0,
                  offsetY: adjustedY0
                };
              }
              getSizeAndScale(step, realOutputSize, scale) {
                step = Math.abs(step);
                const maxSize = Math.max(TilingPattern.MAX_PATTERN_SIZE, realOutputSize);
                let size = Math.ceil(step * scale);
                if (size >= maxSize) {
                  size = maxSize;
                } else {
                  scale = size / step;
                }
                return {
                  scale,
                  size
                };
              }
              clipBbox(graphics, x0, y0, x1, y1) {
                const bboxWidth = x1 - x0;
                const bboxHeight = y1 - y0;
                graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
                graphics.current.updateRectMinMax((0, _display_utils2.getCurrentTransform)(graphics.ctx), [x0, y0, x1, y1]);
                graphics.clip();
                graphics.endPath();
              }
              setFillAndStrokeStyleToContext(graphics, paintType, color) {
                const context = graphics.ctx, current = graphics.current;
                switch (paintType) {
                  case PaintType.COLORED:
                    const ctx = this.ctx;
                    context.fillStyle = ctx.fillStyle;
                    context.strokeStyle = ctx.strokeStyle;
                    current.fillColor = ctx.fillStyle;
                    current.strokeColor = ctx.strokeStyle;
                    break;
                  case PaintType.UNCOLORED:
                    const cssColor = _util2.Util.makeHexColor(color[0], color[1], color[2]);
                    context.fillStyle = cssColor;
                    context.strokeStyle = cssColor;
                    current.fillColor = cssColor;
                    current.strokeColor = cssColor;
                    break;
                  default:
                    throw new _util2.FormatError(`Unsupported paint type: ${paintType}`);
                }
              }
              getPattern(ctx, owner, inverse, pathType) {
                let matrix = inverse;
                if (pathType !== PathType.SHADING) {
                  matrix = _util2.Util.transform(matrix, owner.baseTransform);
                  if (this.matrix) {
                    matrix = _util2.Util.transform(matrix, this.matrix);
                  }
                }
                const temporaryPatternCanvas = this.createPatternCanvas(owner);
                let domMatrix = new DOMMatrix(matrix);
                domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
                domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY);
                const pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat");
                try {
                  pattern.setTransform(domMatrix);
                } catch (ex) {
                  (0, _util2.warn)(`TilingPattern.getPattern: "${ex == null ? void 0 : ex.message}".`);
                }
                return pattern;
              }
            }
            exports2.TilingPattern = TilingPattern;
          },
          /* 14 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.applyMaskImageData = applyMaskImageData;
            var _util2 = __w_pdfjs_require__2(1);
            function applyMaskImageData({
              src,
              srcPos = 0,
              dest,
              destPos = 0,
              width,
              height,
              inverseDecode = false
            }) {
              const opaque = _util2.FeatureTest.isLittleEndian ? 4278190080 : 255;
              const [zeroMapping, oneMapping] = !inverseDecode ? [opaque, 0] : [0, opaque];
              const widthInSource = width >> 3;
              const widthRemainder = width & 7;
              const srcLength = src.length;
              dest = new Uint32Array(dest.buffer);
              for (let i = 0; i < height; i++) {
                for (const max2 = srcPos + widthInSource; srcPos < max2; srcPos++) {
                  const elem2 = srcPos < srcLength ? src[srcPos] : 255;
                  dest[destPos++] = elem2 & 128 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 64 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 32 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 16 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 8 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 4 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 2 ? oneMapping : zeroMapping;
                  dest[destPos++] = elem2 & 1 ? oneMapping : zeroMapping;
                }
                if (widthRemainder === 0) {
                  continue;
                }
                const elem = srcPos < srcLength ? src[srcPos++] : 255;
                for (let j = 0; j < widthRemainder; j++) {
                  dest[destPos++] = elem & 1 << 7 - j ? oneMapping : zeroMapping;
                }
              }
              return {
                srcPos,
                destPos
              };
            }
          },
          /* 15 */
          /***/
          (__unused_webpack_module2, exports2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.GlobalWorkerOptions = void 0;
            const GlobalWorkerOptions = /* @__PURE__ */ Object.create(null);
            exports2.GlobalWorkerOptions = GlobalWorkerOptions;
            GlobalWorkerOptions.workerPort = GlobalWorkerOptions.workerPort === void 0 ? null : GlobalWorkerOptions.workerPort;
            GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc === void 0 ? "" : GlobalWorkerOptions.workerSrc;
          },
          /* 16 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.MessageHandler = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            const CallbackKind = {
              UNKNOWN: 0,
              DATA: 1,
              ERROR: 2
            };
            const StreamKind = {
              UNKNOWN: 0,
              CANCEL: 1,
              CANCEL_COMPLETE: 2,
              CLOSE: 3,
              ENQUEUE: 4,
              ERROR: 5,
              PULL: 6,
              PULL_COMPLETE: 7,
              START_COMPLETE: 8
            };
            function wrapReason(reason) {
              if (!(reason instanceof Error || typeof reason === "object" && reason !== null)) {
                (0, _util2.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.');
              }
              switch (reason.name) {
                case "AbortException":
                  return new _util2.AbortException(reason.message);
                case "MissingPDFException":
                  return new _util2.MissingPDFException(reason.message);
                case "PasswordException":
                  return new _util2.PasswordException(reason.message, reason.code);
                case "UnexpectedResponseException":
                  return new _util2.UnexpectedResponseException(reason.message, reason.status);
                case "UnknownErrorException":
                  return new _util2.UnknownErrorException(reason.message, reason.details);
                default:
                  return new _util2.UnknownErrorException(reason.message, reason.toString());
              }
            }
            class MessageHandler {
              constructor(sourceName, targetName, comObj) {
                this.sourceName = sourceName;
                this.targetName = targetName;
                this.comObj = comObj;
                this.callbackId = 1;
                this.streamId = 1;
                this.streamSinks = /* @__PURE__ */ Object.create(null);
                this.streamControllers = /* @__PURE__ */ Object.create(null);
                this.callbackCapabilities = /* @__PURE__ */ Object.create(null);
                this.actionHandler = /* @__PURE__ */ Object.create(null);
                this._onComObjOnMessage = (event) => {
                  const data = event.data;
                  if (data.targetName !== this.sourceName) {
                    return;
                  }
                  if (data.stream) {
                    this._processStreamMessage(data);
                    return;
                  }
                  if (data.callback) {
                    const callbackId = data.callbackId;
                    const capability = this.callbackCapabilities[callbackId];
                    if (!capability) {
                      throw new Error(`Cannot resolve callback ${callbackId}`);
                    }
                    delete this.callbackCapabilities[callbackId];
                    if (data.callback === CallbackKind.DATA) {
                      capability.resolve(data.data);
                    } else if (data.callback === CallbackKind.ERROR) {
                      capability.reject(wrapReason(data.reason));
                    } else {
                      throw new Error("Unexpected callback case");
                    }
                    return;
                  }
                  const action = this.actionHandler[data.action];
                  if (!action) {
                    throw new Error(`Unknown action from worker: ${data.action}`);
                  }
                  if (data.callbackId) {
                    const cbSourceName = this.sourceName;
                    const cbTargetName = data.sourceName;
                    new Promise(function(resolve) {
                      resolve(action(data.data));
                    }).then(function(result) {
                      comObj.postMessage({
                        sourceName: cbSourceName,
                        targetName: cbTargetName,
                        callback: CallbackKind.DATA,
                        callbackId: data.callbackId,
                        data: result
                      });
                    }, function(reason) {
                      comObj.postMessage({
                        sourceName: cbSourceName,
                        targetName: cbTargetName,
                        callback: CallbackKind.ERROR,
                        callbackId: data.callbackId,
                        reason: wrapReason(reason)
                      });
                    });
                    return;
                  }
                  if (data.streamId) {
                    this._createStreamSink(data);
                    return;
                  }
                  action(data.data);
                };
                comObj.addEventListener("message", this._onComObjOnMessage);
              }
              on(actionName, handler) {
                const ah = this.actionHandler;
                if (ah[actionName]) {
                  throw new Error(`There is already an actionName called "${actionName}"`);
                }
                ah[actionName] = handler;
              }
              send(actionName, data, transfers) {
                this.comObj.postMessage({
                  sourceName: this.sourceName,
                  targetName: this.targetName,
                  action: actionName,
                  data
                }, transfers);
              }
              sendWithPromise(actionName, data, transfers) {
                const callbackId = this.callbackId++;
                const capability = (0, _util2.createPromiseCapability)();
                this.callbackCapabilities[callbackId] = capability;
                try {
                  this.comObj.postMessage({
                    sourceName: this.sourceName,
                    targetName: this.targetName,
                    action: actionName,
                    callbackId,
                    data
                  }, transfers);
                } catch (ex) {
                  capability.reject(ex);
                }
                return capability.promise;
              }
              sendWithStream(actionName, data, queueingStrategy, transfers) {
                const streamId = this.streamId++, sourceName = this.sourceName, targetName = this.targetName, comObj = this.comObj;
                return new ReadableStream({
                  start: (controller) => {
                    const startCapability = (0, _util2.createPromiseCapability)();
                    this.streamControllers[streamId] = {
                      controller,
                      startCall: startCapability,
                      pullCall: null,
                      cancelCall: null,
                      isClosed: false
                    };
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      action: actionName,
                      streamId,
                      data,
                      desiredSize: controller.desiredSize
                    }, transfers);
                    return startCapability.promise;
                  },
                  pull: (controller) => {
                    const pullCapability = (0, _util2.createPromiseCapability)();
                    this.streamControllers[streamId].pullCall = pullCapability;
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      stream: StreamKind.PULL,
                      streamId,
                      desiredSize: controller.desiredSize
                    });
                    return pullCapability.promise;
                  },
                  cancel: (reason) => {
                    (0, _util2.assert)(reason instanceof Error, "cancel must have a valid reason");
                    const cancelCapability = (0, _util2.createPromiseCapability)();
                    this.streamControllers[streamId].cancelCall = cancelCapability;
                    this.streamControllers[streamId].isClosed = true;
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      stream: StreamKind.CANCEL,
                      streamId,
                      reason: wrapReason(reason)
                    });
                    return cancelCapability.promise;
                  }
                }, queueingStrategy);
              }
              _createStreamSink(data) {
                const streamId = data.streamId, sourceName = this.sourceName, targetName = data.sourceName, comObj = this.comObj;
                const self2 = this, action = this.actionHandler[data.action];
                const streamSink = {
                  enqueue(chunk, size = 1, transfers) {
                    if (this.isCancelled) {
                      return;
                    }
                    const lastDesiredSize = this.desiredSize;
                    this.desiredSize -= size;
                    if (lastDesiredSize > 0 && this.desiredSize <= 0) {
                      this.sinkCapability = (0, _util2.createPromiseCapability)();
                      this.ready = this.sinkCapability.promise;
                    }
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      stream: StreamKind.ENQUEUE,
                      streamId,
                      chunk
                    }, transfers);
                  },
                  close() {
                    if (this.isCancelled) {
                      return;
                    }
                    this.isCancelled = true;
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      stream: StreamKind.CLOSE,
                      streamId
                    });
                    delete self2.streamSinks[streamId];
                  },
                  error(reason) {
                    (0, _util2.assert)(reason instanceof Error, "error must have a valid reason");
                    if (this.isCancelled) {
                      return;
                    }
                    this.isCancelled = true;
                    comObj.postMessage({
                      sourceName,
                      targetName,
                      stream: StreamKind.ERROR,
                      streamId,
                      reason: wrapReason(reason)
                    });
                  },
                  sinkCapability: (0, _util2.createPromiseCapability)(),
                  onPull: null,
                  onCancel: null,
                  isCancelled: false,
                  desiredSize: data.desiredSize,
                  ready: null
                };
                streamSink.sinkCapability.resolve();
                streamSink.ready = streamSink.sinkCapability.promise;
                this.streamSinks[streamId] = streamSink;
                new Promise(function(resolve) {
                  resolve(action(data.data, streamSink));
                }).then(function() {
                  comObj.postMessage({
                    sourceName,
                    targetName,
                    stream: StreamKind.START_COMPLETE,
                    streamId,
                    success: true
                  });
                }, function(reason) {
                  comObj.postMessage({
                    sourceName,
                    targetName,
                    stream: StreamKind.START_COMPLETE,
                    streamId,
                    reason: wrapReason(reason)
                  });
                });
              }
              _processStreamMessage(data) {
                const streamId = data.streamId, sourceName = this.sourceName, targetName = data.sourceName, comObj = this.comObj;
                const streamController = this.streamControllers[streamId], streamSink = this.streamSinks[streamId];
                switch (data.stream) {
                  case StreamKind.START_COMPLETE:
                    if (data.success) {
                      streamController.startCall.resolve();
                    } else {
                      streamController.startCall.reject(wrapReason(data.reason));
                    }
                    break;
                  case StreamKind.PULL_COMPLETE:
                    if (data.success) {
                      streamController.pullCall.resolve();
                    } else {
                      streamController.pullCall.reject(wrapReason(data.reason));
                    }
                    break;
                  case StreamKind.PULL:
                    if (!streamSink) {
                      comObj.postMessage({
                        sourceName,
                        targetName,
                        stream: StreamKind.PULL_COMPLETE,
                        streamId,
                        success: true
                      });
                      break;
                    }
                    if (streamSink.desiredSize <= 0 && data.desiredSize > 0) {
                      streamSink.sinkCapability.resolve();
                    }
                    streamSink.desiredSize = data.desiredSize;
                    new Promise(function(resolve) {
                      resolve(streamSink.onPull && streamSink.onPull());
                    }).then(function() {
                      comObj.postMessage({
                        sourceName,
                        targetName,
                        stream: StreamKind.PULL_COMPLETE,
                        streamId,
                        success: true
                      });
                    }, function(reason) {
                      comObj.postMessage({
                        sourceName,
                        targetName,
                        stream: StreamKind.PULL_COMPLETE,
                        streamId,
                        reason: wrapReason(reason)
                      });
                    });
                    break;
                  case StreamKind.ENQUEUE:
                    (0, _util2.assert)(streamController, "enqueue should have stream controller");
                    if (streamController.isClosed) {
                      break;
                    }
                    streamController.controller.enqueue(data.chunk);
                    break;
                  case StreamKind.CLOSE:
                    (0, _util2.assert)(streamController, "close should have stream controller");
                    if (streamController.isClosed) {
                      break;
                    }
                    streamController.isClosed = true;
                    streamController.controller.close();
                    this._deleteStreamController(streamController, streamId);
                    break;
                  case StreamKind.ERROR:
                    (0, _util2.assert)(streamController, "error should have stream controller");
                    streamController.controller.error(wrapReason(data.reason));
                    this._deleteStreamController(streamController, streamId);
                    break;
                  case StreamKind.CANCEL_COMPLETE:
                    if (data.success) {
                      streamController.cancelCall.resolve();
                    } else {
                      streamController.cancelCall.reject(wrapReason(data.reason));
                    }
                    this._deleteStreamController(streamController, streamId);
                    break;
                  case StreamKind.CANCEL:
                    if (!streamSink) {
                      break;
                    }
                    new Promise(function(resolve) {
                      resolve(streamSink.onCancel && streamSink.onCancel(wrapReason(data.reason)));
                    }).then(function() {
                      comObj.postMessage({
                        sourceName,
                        targetName,
                        stream: StreamKind.CANCEL_COMPLETE,
                        streamId,
                        success: true
                      });
                    }, function(reason) {
                      comObj.postMessage({
                        sourceName,
                        targetName,
                        stream: StreamKind.CANCEL_COMPLETE,
                        streamId,
                        reason: wrapReason(reason)
                      });
                    });
                    streamSink.sinkCapability.reject(wrapReason(data.reason));
                    streamSink.isCancelled = true;
                    delete this.streamSinks[streamId];
                    break;
                  default:
                    throw new Error("Unexpected stream case");
                }
              }
              async _deleteStreamController(streamController, streamId) {
                await Promise.allSettled([streamController.startCall && streamController.startCall.promise, streamController.pullCall && streamController.pullCall.promise, streamController.cancelCall && streamController.cancelCall.promise]);
                delete this.streamControllers[streamId];
              }
              destroy() {
                this.comObj.removeEventListener("message", this._onComObjOnMessage);
              }
            }
            exports2.MessageHandler = MessageHandler;
          },
          /* 17 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _metadataMap, _data;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.Metadata = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            class Metadata {
              constructor({
                parsedData,
                rawData
              }) {
                __privateAdd(this, _metadataMap, void 0);
                __privateAdd(this, _data, void 0);
                __privateSet(this, _metadataMap, parsedData);
                __privateSet(this, _data, rawData);
              }
              getRaw() {
                return __privateGet(this, _data);
              }
              get(name) {
                return __privateGet(this, _metadataMap).get(name) ?? null;
              }
              getAll() {
                return (0, _util2.objectFromMap)(__privateGet(this, _metadataMap));
              }
              has(name) {
                return __privateGet(this, _metadataMap).has(name);
              }
            }
            _metadataMap = new WeakMap();
            _data = new WeakMap();
            exports2.Metadata = Metadata;
          },
          /* 18 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _visible, _cachedHasInitialVisibility, _groups, _initialVisibility, _order, _evaluateVisibilityExpression, evaluateVisibilityExpression_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.OptionalContentConfig = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            const INTERNAL = Symbol("INTERNAL");
            class OptionalContentGroup {
              constructor(name, intent) {
                __privateAdd(this, _visible, true);
                this.name = name;
                this.intent = intent;
              }
              get visible() {
                return __privateGet(this, _visible);
              }
              _setVisible(internal, visible) {
                if (internal !== INTERNAL) {
                  (0, _util2.unreachable)("Internal method `_setVisible` called.");
                }
                __privateSet(this, _visible, visible);
              }
            }
            _visible = new WeakMap();
            class OptionalContentConfig {
              constructor(data) {
                __privateAdd(this, _evaluateVisibilityExpression);
                __privateAdd(this, _cachedHasInitialVisibility, true);
                __privateAdd(this, _groups, /* @__PURE__ */ new Map());
                __privateAdd(this, _initialVisibility, null);
                __privateAdd(this, _order, null);
                this.name = null;
                this.creator = null;
                if (data === null) {
                  return;
                }
                this.name = data.name;
                this.creator = data.creator;
                __privateSet(this, _order, data.order);
                for (const group of data.groups) {
                  __privateGet(this, _groups).set(group.id, new OptionalContentGroup(group.name, group.intent));
                }
                if (data.baseState === "OFF") {
                  for (const group of __privateGet(this, _groups).values()) {
                    group._setVisible(INTERNAL, false);
                  }
                }
                for (const on of data.on) {
                  __privateGet(this, _groups).get(on)._setVisible(INTERNAL, true);
                }
                for (const off of data.off) {
                  __privateGet(this, _groups).get(off)._setVisible(INTERNAL, false);
                }
                __privateSet(this, _initialVisibility, /* @__PURE__ */ new Map());
                for (const [id, group] of __privateGet(this, _groups)) {
                  __privateGet(this, _initialVisibility).set(id, group.visible);
                }
              }
              isVisible(group) {
                if (__privateGet(this, _groups).size === 0) {
                  return true;
                }
                if (!group) {
                  (0, _util2.warn)("Optional content group not defined.");
                  return true;
                }
                if (group.type === "OCG") {
                  if (!__privateGet(this, _groups).has(group.id)) {
                    (0, _util2.warn)(`Optional content group not found: ${group.id}`);
                    return true;
                  }
                  return __privateGet(this, _groups).get(group.id).visible;
                } else if (group.type === "OCMD") {
                  if (group.expression) {
                    return __privateMethod(this, _evaluateVisibilityExpression, evaluateVisibilityExpression_fn).call(this, group.expression);
                  }
                  if (!group.policy || group.policy === "AnyOn") {
                    for (const id of group.ids) {
                      if (!__privateGet(this, _groups).has(id)) {
                        (0, _util2.warn)(`Optional content group not found: ${id}`);
                        return true;
                      }
                      if (__privateGet(this, _groups).get(id).visible) {
                        return true;
                      }
                    }
                    return false;
                  } else if (group.policy === "AllOn") {
                    for (const id of group.ids) {
                      if (!__privateGet(this, _groups).has(id)) {
                        (0, _util2.warn)(`Optional content group not found: ${id}`);
                        return true;
                      }
                      if (!__privateGet(this, _groups).get(id).visible) {
                        return false;
                      }
                    }
                    return true;
                  } else if (group.policy === "AnyOff") {
                    for (const id of group.ids) {
                      if (!__privateGet(this, _groups).has(id)) {
                        (0, _util2.warn)(`Optional content group not found: ${id}`);
                        return true;
                      }
                      if (!__privateGet(this, _groups).get(id).visible) {
                        return true;
                      }
                    }
                    return false;
                  } else if (group.policy === "AllOff") {
                    for (const id of group.ids) {
                      if (!__privateGet(this, _groups).has(id)) {
                        (0, _util2.warn)(`Optional content group not found: ${id}`);
                        return true;
                      }
                      if (__privateGet(this, _groups).get(id).visible) {
                        return false;
                      }
                    }
                    return true;
                  }
                  (0, _util2.warn)(`Unknown optional content policy ${group.policy}.`);
                  return true;
                }
                (0, _util2.warn)(`Unknown group type ${group.type}.`);
                return true;
              }
              setVisibility(id, visible = true) {
                if (!__privateGet(this, _groups).has(id)) {
                  (0, _util2.warn)(`Optional content group not found: ${id}`);
                  return;
                }
                __privateGet(this, _groups).get(id)._setVisible(INTERNAL, !!visible);
                __privateSet(this, _cachedHasInitialVisibility, null);
              }
              get hasInitialVisibility() {
                if (__privateGet(this, _cachedHasInitialVisibility) !== null) {
                  return __privateGet(this, _cachedHasInitialVisibility);
                }
                for (const [id, group] of __privateGet(this, _groups)) {
                  const visible = __privateGet(this, _initialVisibility).get(id);
                  if (group.visible !== visible) {
                    return __privateSet(this, _cachedHasInitialVisibility, false);
                  }
                }
                return __privateSet(this, _cachedHasInitialVisibility, true);
              }
              getOrder() {
                if (!__privateGet(this, _groups).size) {
                  return null;
                }
                if (__privateGet(this, _order)) {
                  return __privateGet(this, _order).slice();
                }
                return [...__privateGet(this, _groups).keys()];
              }
              getGroups() {
                return __privateGet(this, _groups).size > 0 ? (0, _util2.objectFromMap)(__privateGet(this, _groups)) : null;
              }
              getGroup(id) {
                return __privateGet(this, _groups).get(id) || null;
              }
            }
            _cachedHasInitialVisibility = new WeakMap();
            _groups = new WeakMap();
            _initialVisibility = new WeakMap();
            _order = new WeakMap();
            _evaluateVisibilityExpression = new WeakSet();
            evaluateVisibilityExpression_fn = function(array) {
              const length = array.length;
              if (length < 2) {
                return true;
              }
              const operator = array[0];
              for (let i = 1; i < length; i++) {
                const element = array[i];
                let state;
                if (Array.isArray(element)) {
                  state = __privateMethod(this, _evaluateVisibilityExpression, evaluateVisibilityExpression_fn).call(this, element);
                } else if (__privateGet(this, _groups).has(element)) {
                  state = __privateGet(this, _groups).get(element).visible;
                } else {
                  (0, _util2.warn)(`Optional content group not found: ${element}`);
                  return true;
                }
                switch (operator) {
                  case "And":
                    if (!state) {
                      return false;
                    }
                    break;
                  case "Or":
                    if (state) {
                      return true;
                    }
                    break;
                  case "Not":
                    return !state;
                  default:
                    return true;
                }
              }
              return operator === "And";
            };
            exports2.OptionalContentConfig = OptionalContentConfig;
          },
          /* 19 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.PDFDataTransportStream = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _display_utils2 = __w_pdfjs_require__2(8);
            class PDFDataTransportStream {
              constructor(params, pdfDataRangeTransport) {
                (0, _util2.assert)(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
                this._queuedChunks = [];
                this._progressiveDone = params.progressiveDone || false;
                this._contentDispositionFilename = params.contentDispositionFilename || null;
                const initialData = params.initialData;
                if ((initialData == null ? void 0 : initialData.length) > 0) {
                  const buffer = new Uint8Array(initialData).buffer;
                  this._queuedChunks.push(buffer);
                }
                this._pdfDataRangeTransport = pdfDataRangeTransport;
                this._isStreamingSupported = !params.disableStream;
                this._isRangeSupported = !params.disableRange;
                this._contentLength = params.length;
                this._fullRequestReader = null;
                this._rangeReaders = [];
                this._pdfDataRangeTransport.addRangeListener((begin, chunk) => {
                  this._onReceiveData({
                    begin,
                    chunk
                  });
                });
                this._pdfDataRangeTransport.addProgressListener((loaded, total) => {
                  this._onProgress({
                    loaded,
                    total
                  });
                });
                this._pdfDataRangeTransport.addProgressiveReadListener((chunk) => {
                  this._onReceiveData({
                    chunk
                  });
                });
                this._pdfDataRangeTransport.addProgressiveDoneListener(() => {
                  this._onProgressiveDone();
                });
                this._pdfDataRangeTransport.transportReady();
              }
              _onReceiveData(args) {
                const buffer = new Uint8Array(args.chunk).buffer;
                if (args.begin === void 0) {
                  if (this._fullRequestReader) {
                    this._fullRequestReader._enqueue(buffer);
                  } else {
                    this._queuedChunks.push(buffer);
                  }
                } else {
                  const found = this._rangeReaders.some(function(rangeReader) {
                    if (rangeReader._begin !== args.begin) {
                      return false;
                    }
                    rangeReader._enqueue(buffer);
                    return true;
                  });
                  (0, _util2.assert)(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
                }
              }
              get _progressiveDataLength() {
                var _a;
                return ((_a = this._fullRequestReader) == null ? void 0 : _a._loaded) ?? 0;
              }
              _onProgress(evt) {
                if (evt.total === void 0) {
                  const firstReader = this._rangeReaders[0];
                  if (firstReader == null ? void 0 : firstReader.onProgress) {
                    firstReader.onProgress({
                      loaded: evt.loaded
                    });
                  }
                } else {
                  const fullReader = this._fullRequestReader;
                  if (fullReader == null ? void 0 : fullReader.onProgress) {
                    fullReader.onProgress({
                      loaded: evt.loaded,
                      total: evt.total
                    });
                  }
                }
              }
              _onProgressiveDone() {
                if (this._fullRequestReader) {
                  this._fullRequestReader.progressiveDone();
                }
                this._progressiveDone = true;
              }
              _removeRangeReader(reader) {
                const i = this._rangeReaders.indexOf(reader);
                if (i >= 0) {
                  this._rangeReaders.splice(i, 1);
                }
              }
              getFullReader() {
                (0, _util2.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
                const queuedChunks = this._queuedChunks;
                this._queuedChunks = null;
                return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename);
              }
              getRangeReader(begin, end2) {
                if (end2 <= this._progressiveDataLength) {
                  return null;
                }
                const reader = new PDFDataTransportStreamRangeReader(this, begin, end2);
                this._pdfDataRangeTransport.requestDataRange(begin, end2);
                this._rangeReaders.push(reader);
                return reader;
              }
              cancelAllRequests(reason) {
                if (this._fullRequestReader) {
                  this._fullRequestReader.cancel(reason);
                }
                for (const reader of this._rangeReaders.slice(0)) {
                  reader.cancel(reason);
                }
                this._pdfDataRangeTransport.abort();
              }
            }
            exports2.PDFDataTransportStream = PDFDataTransportStream;
            class PDFDataTransportStreamReader {
              constructor(stream, queuedChunks, progressiveDone = false, contentDispositionFilename = null) {
                this._stream = stream;
                this._done = progressiveDone || false;
                this._filename = (0, _display_utils2.isPdfFile)(contentDispositionFilename) ? contentDispositionFilename : null;
                this._queuedChunks = queuedChunks || [];
                this._loaded = 0;
                for (const chunk of this._queuedChunks) {
                  this._loaded += chunk.byteLength;
                }
                this._requests = [];
                this._headersReady = Promise.resolve();
                stream._fullRequestReader = this;
                this.onProgress = null;
              }
              _enqueue(chunk) {
                if (this._done) {
                  return;
                }
                if (this._requests.length > 0) {
                  const requestCapability = this._requests.shift();
                  requestCapability.resolve({
                    value: chunk,
                    done: false
                  });
                } else {
                  this._queuedChunks.push(chunk);
                }
                this._loaded += chunk.byteLength;
              }
              get headersReady() {
                return this._headersReady;
              }
              get filename() {
                return this._filename;
              }
              get isRangeSupported() {
                return this._stream._isRangeSupported;
              }
              get isStreamingSupported() {
                return this._stream._isStreamingSupported;
              }
              get contentLength() {
                return this._stream._contentLength;
              }
              async read() {
                if (this._queuedChunks.length > 0) {
                  const chunk = this._queuedChunks.shift();
                  return {
                    value: chunk,
                    done: false
                  };
                }
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                const requestCapability = (0, _util2.createPromiseCapability)();
                this._requests.push(requestCapability);
                return requestCapability.promise;
              }
              cancel(reason) {
                this._done = true;
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
              }
              progressiveDone() {
                if (this._done) {
                  return;
                }
                this._done = true;
              }
            }
            class PDFDataTransportStreamRangeReader {
              constructor(stream, begin, end2) {
                this._stream = stream;
                this._begin = begin;
                this._end = end2;
                this._queuedChunk = null;
                this._requests = [];
                this._done = false;
                this.onProgress = null;
              }
              _enqueue(chunk) {
                if (this._done) {
                  return;
                }
                if (this._requests.length === 0) {
                  this._queuedChunk = chunk;
                } else {
                  const requestsCapability = this._requests.shift();
                  requestsCapability.resolve({
                    value: chunk,
                    done: false
                  });
                  for (const requestCapability of this._requests) {
                    requestCapability.resolve({
                      value: void 0,
                      done: true
                    });
                  }
                  this._requests.length = 0;
                }
                this._done = true;
                this._stream._removeRangeReader(this);
              }
              get isStreamingSupported() {
                return false;
              }
              async read() {
                if (this._queuedChunk) {
                  const chunk = this._queuedChunk;
                  this._queuedChunk = null;
                  return {
                    value: chunk,
                    done: false
                  };
                }
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                const requestCapability = (0, _util2.createPromiseCapability)();
                this._requests.push(requestCapability);
                return requestCapability.promise;
              }
              cancel(reason) {
                this._done = true;
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
                this._stream._removeRangeReader(this);
              }
            }
          },
          /* 20 */
          /***/
          (__unused_webpack_module2, exports2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.XfaText = void 0;
            class XfaText {
              static textContent(xfa) {
                const items = [];
                const output = {
                  items,
                  styles: /* @__PURE__ */ Object.create(null)
                };
                function walk(node) {
                  var _a;
                  if (!node) {
                    return;
                  }
                  let str = null;
                  const name = node.name;
                  if (name === "#text") {
                    str = node.value;
                  } else if (!XfaText.shouldBuildText(name)) {
                    return;
                  } else if ((_a = node == null ? void 0 : node.attributes) == null ? void 0 : _a.textContent) {
                    str = node.attributes.textContent;
                  } else if (node.value) {
                    str = node.value;
                  }
                  if (str !== null) {
                    items.push({
                      str
                    });
                  }
                  if (!node.children) {
                    return;
                  }
                  for (const child of node.children) {
                    walk(child);
                  }
                }
                walk(xfa);
                return output;
              }
              static shouldBuildText(name) {
                return !(name === "textarea" || name === "input" || name === "option" || name === "select");
              }
            }
            exports2.XfaText = XfaText;
          },
          /* 21 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.NodeStandardFontDataFactory = exports2.NodeCanvasFactory = exports2.NodeCMapReaderFactory = void 0;
            var _base_factory = __w_pdfjs_require__2(9);
            const fetchData = function(url) {
              return new Promise((resolve, reject) => {
                const fs = require$$5;
                fs.readFile(url, (error, data) => {
                  if (error || !data) {
                    reject(new Error(error));
                    return;
                  }
                  resolve(new Uint8Array(data));
                });
              });
            };
            class NodeCanvasFactory extends _base_factory.BaseCanvasFactory {
              _createCanvas(width, height) {
                const Canvas = require$$5;
                return Canvas.createCanvas(width, height);
              }
            }
            exports2.NodeCanvasFactory = NodeCanvasFactory;
            class NodeCMapReaderFactory extends _base_factory.BaseCMapReaderFactory {
              _fetchData(url, compressionType) {
                return fetchData(url).then((data) => {
                  return {
                    cMapData: data,
                    compressionType
                  };
                });
              }
            }
            exports2.NodeCMapReaderFactory = NodeCMapReaderFactory;
            class NodeStandardFontDataFactory extends _base_factory.BaseStandardFontDataFactory {
              _fetchData(url) {
                return fetchData(url);
              }
            }
            exports2.NodeStandardFontDataFactory = NodeStandardFontDataFactory;
          },
          /* 22 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _accessibilityManager, _allowClick, _boundPointerup, _boundPointerdown, _editors, _hadPointerDown, _isCleaningUp, _uiManager, _changeParent, changeParent_fn, _createNewEditor, createNewEditor_fn, _createAndAddNewEditor, createAndAddNewEditor_fn, _cleanup, cleanup_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.AnnotationEditorLayer = void 0;
            var _tools = __w_pdfjs_require__2(7);
            var _util2 = __w_pdfjs_require__2(1);
            var _freetext = __w_pdfjs_require__2(23);
            var _ink = __w_pdfjs_require__2(24);
            const _AnnotationEditorLayer = class {
              constructor(options) {
                __privateAdd(this, _changeParent);
                __privateAdd(this, _createNewEditor);
                __privateAdd(this, _createAndAddNewEditor);
                __privateAdd(this, _cleanup);
                __privateAdd(this, _accessibilityManager, void 0);
                __privateAdd(this, _allowClick, false);
                __privateAdd(this, _boundPointerup, this.pointerup.bind(this));
                __privateAdd(this, _boundPointerdown, this.pointerdown.bind(this));
                __privateAdd(this, _editors, /* @__PURE__ */ new Map());
                __privateAdd(this, _hadPointerDown, false);
                __privateAdd(this, _isCleaningUp, false);
                __privateAdd(this, _uiManager, void 0);
                if (!_AnnotationEditorLayer._initialized) {
                  _AnnotationEditorLayer._initialized = true;
                  _freetext.FreeTextEditor.initialize(options.l10n);
                  _ink.InkEditor.initialize(options.l10n);
                  options.uiManager.registerEditorTypes([_freetext.FreeTextEditor, _ink.InkEditor]);
                }
                __privateSet(this, _uiManager, options.uiManager);
                this.annotationStorage = options.annotationStorage;
                this.pageIndex = options.pageIndex;
                this.div = options.div;
                __privateSet(this, _accessibilityManager, options.accessibilityManager);
                __privateGet(this, _uiManager).addLayer(this);
              }
              updateToolbar(mode) {
                __privateGet(this, _uiManager).updateToolbar(mode);
              }
              updateMode(mode = __privateGet(this, _uiManager).getMode()) {
                __privateMethod(this, _cleanup, cleanup_fn).call(this);
                if (mode === _util2.AnnotationEditorType.INK) {
                  this.addInkEditorIfNeeded(false);
                  this.disableClick();
                } else {
                  this.enableClick();
                }
                __privateGet(this, _uiManager).unselectAll();
              }
              addInkEditorIfNeeded(isCommitting) {
                if (!isCommitting && __privateGet(this, _uiManager).getMode() !== _util2.AnnotationEditorType.INK) {
                  return;
                }
                if (!isCommitting) {
                  for (const editor2 of __privateGet(this, _editors).values()) {
                    if (editor2.isEmpty()) {
                      editor2.setInBackground();
                      return;
                    }
                  }
                }
                const editor = __privateMethod(this, _createAndAddNewEditor, createAndAddNewEditor_fn).call(this, {
                  offsetX: 0,
                  offsetY: 0
                });
                editor.setInBackground();
              }
              setEditingState(isEditing) {
                __privateGet(this, _uiManager).setEditingState(isEditing);
              }
              addCommands(params) {
                __privateGet(this, _uiManager).addCommands(params);
              }
              enable() {
                this.div.style.pointerEvents = "auto";
                for (const editor of __privateGet(this, _editors).values()) {
                  editor.enableEditing();
                }
              }
              disable() {
                this.div.style.pointerEvents = "none";
                for (const editor of __privateGet(this, _editors).values()) {
                  editor.disableEditing();
                }
              }
              setActiveEditor(editor) {
                const currentActive = __privateGet(this, _uiManager).getActive();
                if (currentActive === editor) {
                  return;
                }
                __privateGet(this, _uiManager).setActiveEditor(editor);
              }
              enableClick() {
                this.div.addEventListener("pointerdown", __privateGet(this, _boundPointerdown));
                this.div.addEventListener("pointerup", __privateGet(this, _boundPointerup));
              }
              disableClick() {
                this.div.removeEventListener("pointerdown", __privateGet(this, _boundPointerdown));
                this.div.removeEventListener("pointerup", __privateGet(this, _boundPointerup));
              }
              attach(editor) {
                __privateGet(this, _editors).set(editor.id, editor);
              }
              detach(editor) {
                var _a;
                __privateGet(this, _editors).delete(editor.id);
                (_a = __privateGet(this, _accessibilityManager)) == null ? void 0 : _a.removePointerInTextLayer(editor.contentDiv);
              }
              remove(editor) {
                __privateGet(this, _uiManager).removeEditor(editor);
                this.detach(editor);
                this.annotationStorage.remove(editor.id);
                editor.div.style.display = "none";
                setTimeout(() => {
                  editor.div.style.display = "";
                  editor.div.remove();
                  editor.isAttachedToDOM = false;
                  if (document.activeElement === document.body) {
                    __privateGet(this, _uiManager).focusMainContainer();
                  }
                }, 0);
                if (!__privateGet(this, _isCleaningUp)) {
                  this.addInkEditorIfNeeded(false);
                }
              }
              add(editor) {
                __privateMethod(this, _changeParent, changeParent_fn).call(this, editor);
                __privateGet(this, _uiManager).addEditor(editor);
                this.attach(editor);
                if (!editor.isAttachedToDOM) {
                  const div = editor.render();
                  this.div.append(div);
                  editor.isAttachedToDOM = true;
                }
                this.moveEditorInDOM(editor);
                editor.onceAdded();
                this.addToAnnotationStorage(editor);
              }
              moveEditorInDOM(editor) {
                var _a;
                (_a = __privateGet(this, _accessibilityManager)) == null ? void 0 : _a.moveElementInDOM(this.div, editor.div, editor.contentDiv, true);
              }
              addToAnnotationStorage(editor) {
                if (!editor.isEmpty() && !this.annotationStorage.has(editor.id)) {
                  this.annotationStorage.setValue(editor.id, editor);
                }
              }
              addOrRebuild(editor) {
                if (editor.needsToBeRebuilt()) {
                  editor.rebuild();
                } else {
                  this.add(editor);
                }
              }
              addANewEditor(editor) {
                const cmd = () => {
                  this.addOrRebuild(editor);
                };
                const undo = () => {
                  editor.remove();
                };
                this.addCommands({
                  cmd,
                  undo,
                  mustExec: true
                });
              }
              addUndoableEditor(editor) {
                const cmd = () => {
                  this.addOrRebuild(editor);
                };
                const undo = () => {
                  editor.remove();
                };
                this.addCommands({
                  cmd,
                  undo,
                  mustExec: false
                });
              }
              getNextId() {
                return __privateGet(this, _uiManager).getId();
              }
              deserialize(data) {
                switch (data.annotationType) {
                  case _util2.AnnotationEditorType.FREETEXT:
                    return _freetext.FreeTextEditor.deserialize(data, this);
                  case _util2.AnnotationEditorType.INK:
                    return _ink.InkEditor.deserialize(data, this);
                }
                return null;
              }
              setSelected(editor) {
                __privateGet(this, _uiManager).setSelected(editor);
              }
              toggleSelected(editor) {
                __privateGet(this, _uiManager).toggleSelected(editor);
              }
              isSelected(editor) {
                return __privateGet(this, _uiManager).isSelected(editor);
              }
              unselect(editor) {
                __privateGet(this, _uiManager).unselect(editor);
              }
              pointerup(event) {
                const isMac = _tools.KeyboardManager.platform.isMac;
                if (event.button !== 0 || event.ctrlKey && isMac) {
                  return;
                }
                if (event.target !== this.div) {
                  return;
                }
                if (!__privateGet(this, _hadPointerDown)) {
                  return;
                }
                __privateSet(this, _hadPointerDown, false);
                if (!__privateGet(this, _allowClick)) {
                  __privateSet(this, _allowClick, true);
                  return;
                }
                __privateMethod(this, _createAndAddNewEditor, createAndAddNewEditor_fn).call(this, event);
              }
              pointerdown(event) {
                const isMac = _tools.KeyboardManager.platform.isMac;
                if (event.button !== 0 || event.ctrlKey && isMac) {
                  return;
                }
                if (event.target !== this.div) {
                  return;
                }
                __privateSet(this, _hadPointerDown, true);
                const editor = __privateGet(this, _uiManager).getActive();
                __privateSet(this, _allowClick, !editor || editor.isEmpty());
              }
              drop(event) {
                const id = event.dataTransfer.getData("text/plain");
                const editor = __privateGet(this, _uiManager).getEditor(id);
                if (!editor) {
                  return;
                }
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                __privateMethod(this, _changeParent, changeParent_fn).call(this, editor);
                const rect = this.div.getBoundingClientRect();
                const endX = event.clientX - rect.x;
                const endY = event.clientY - rect.y;
                editor.translate(endX - editor.startX, endY - editor.startY);
                this.moveEditorInDOM(editor);
                editor.div.focus();
              }
              dragover(event) {
                event.preventDefault();
              }
              destroy() {
                var _a, _b;
                if (((_a = __privateGet(this, _uiManager).getActive()) == null ? void 0 : _a.parent) === this) {
                  __privateGet(this, _uiManager).setActiveEditor(null);
                }
                for (const editor of __privateGet(this, _editors).values()) {
                  (_b = __privateGet(this, _accessibilityManager)) == null ? void 0 : _b.removePointerInTextLayer(editor.contentDiv);
                  editor.isAttachedToDOM = false;
                  editor.div.remove();
                  editor.parent = null;
                }
                this.div = null;
                __privateGet(this, _editors).clear();
                __privateGet(this, _uiManager).removeLayer(this);
              }
              render(parameters) {
                this.viewport = parameters.viewport;
                (0, _tools.bindEvents)(this, this.div, ["dragover", "drop"]);
                this.setDimensions();
                for (const editor of __privateGet(this, _uiManager).getEditors(this.pageIndex)) {
                  this.add(editor);
                }
                this.updateMode();
              }
              update(parameters) {
                this.viewport = parameters.viewport;
                this.setDimensions();
                this.updateMode();
              }
              get scaleFactor() {
                return this.viewport.scale;
              }
              get pageDimensions() {
                const [pageLLx, pageLLy, pageURx, pageURy] = this.viewport.viewBox;
                const width = pageURx - pageLLx;
                const height = pageURy - pageLLy;
                return [width, height];
              }
              get viewportBaseDimensions() {
                const {
                  width,
                  height,
                  rotation
                } = this.viewport;
                return rotation % 180 === 0 ? [width, height] : [height, width];
              }
              setDimensions() {
                const {
                  width,
                  height,
                  rotation
                } = this.viewport;
                const flipOrientation = rotation % 180 !== 0, widthStr = Math.floor(width) + "px", heightStr = Math.floor(height) + "px";
                this.div.style.width = flipOrientation ? heightStr : widthStr;
                this.div.style.height = flipOrientation ? widthStr : heightStr;
                this.div.setAttribute("data-main-rotation", rotation);
              }
            };
            let AnnotationEditorLayer = _AnnotationEditorLayer;
            _accessibilityManager = new WeakMap();
            _allowClick = new WeakMap();
            _boundPointerup = new WeakMap();
            _boundPointerdown = new WeakMap();
            _editors = new WeakMap();
            _hadPointerDown = new WeakMap();
            _isCleaningUp = new WeakMap();
            _uiManager = new WeakMap();
            _changeParent = new WeakSet();
            changeParent_fn = function(editor) {
              var _a;
              if (editor.parent === this) {
                return;
              }
              this.attach(editor);
              editor.pageIndex = this.pageIndex;
              (_a = editor.parent) == null ? void 0 : _a.detach(editor);
              editor.parent = this;
              if (editor.div && editor.isAttachedToDOM) {
                editor.div.remove();
                this.div.append(editor.div);
              }
            };
            _createNewEditor = new WeakSet();
            createNewEditor_fn = function(params) {
              switch (__privateGet(this, _uiManager).getMode()) {
                case _util2.AnnotationEditorType.FREETEXT:
                  return new _freetext.FreeTextEditor(params);
                case _util2.AnnotationEditorType.INK:
                  return new _ink.InkEditor(params);
              }
              return null;
            };
            _createAndAddNewEditor = new WeakSet();
            createAndAddNewEditor_fn = function(event) {
              const id = this.getNextId();
              const editor = __privateMethod(this, _createNewEditor, createNewEditor_fn).call(this, {
                parent: this,
                id,
                x: event.offsetX,
                y: event.offsetY
              });
              if (editor) {
                this.add(editor);
              }
              return editor;
            };
            _cleanup = new WeakSet();
            cleanup_fn = function() {
              __privateSet(this, _isCleaningUp, true);
              for (const editor of __privateGet(this, _editors).values()) {
                if (editor.isEmpty()) {
                  editor.remove();
                }
              }
              __privateSet(this, _isCleaningUp, false);
            };
            __publicField(AnnotationEditorLayer, "_initialized", false);
            exports2.AnnotationEditorLayer = AnnotationEditorLayer;
          },
          /* 23 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _boundEditorDivBlur, _boundEditorDivFocus, _boundEditorDivKeydown, _color, _content, _hasAlreadyBeenCommitted, _fontSize, _updateFontSize, updateFontSize_fn, _updateColor, updateColor_fn, _extractText, extractText_fn, _setEditorDimensions, setEditorDimensions_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.FreeTextEditor = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _tools = __w_pdfjs_require__2(7);
            var _editor = __w_pdfjs_require__2(6);
            const _FreeTextEditor = class extends _editor.AnnotationEditor {
              constructor(params) {
                super({
                  ...params,
                  name: "freeTextEditor"
                });
                __privateAdd(this, _updateFontSize);
                __privateAdd(this, _updateColor);
                __privateAdd(this, _extractText);
                __privateAdd(this, _setEditorDimensions);
                __privateAdd(this, _boundEditorDivBlur, this.editorDivBlur.bind(this));
                __privateAdd(this, _boundEditorDivFocus, this.editorDivFocus.bind(this));
                __privateAdd(this, _boundEditorDivKeydown, this.editorDivKeydown.bind(this));
                __privateAdd(this, _color, void 0);
                __privateAdd(this, _content, "");
                __privateAdd(this, _hasAlreadyBeenCommitted, false);
                __privateAdd(this, _fontSize, void 0);
                __privateSet(this, _color, params.color || _FreeTextEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor);
                __privateSet(this, _fontSize, params.fontSize || _FreeTextEditor._defaultFontSize);
              }
              static initialize(l10n) {
                this._l10nPromise = new Map(["free_text_default_content", "editor_free_text_aria_label"].map((str) => [str, l10n.get(str)]));
                const style = getComputedStyle(document.documentElement);
                this._internalPadding = parseFloat(style.getPropertyValue("--freetext-padding"));
              }
              static updateDefaultParams(type, value) {
                switch (type) {
                  case _util2.AnnotationEditorParamsType.FREETEXT_SIZE:
                    _FreeTextEditor._defaultFontSize = value;
                    break;
                  case _util2.AnnotationEditorParamsType.FREETEXT_COLOR:
                    _FreeTextEditor._defaultColor = value;
                    break;
                }
              }
              updateParams(type, value) {
                switch (type) {
                  case _util2.AnnotationEditorParamsType.FREETEXT_SIZE:
                    __privateMethod(this, _updateFontSize, updateFontSize_fn).call(this, value);
                    break;
                  case _util2.AnnotationEditorParamsType.FREETEXT_COLOR:
                    __privateMethod(this, _updateColor, updateColor_fn).call(this, value);
                    break;
                }
              }
              static get defaultPropertiesToUpdate() {
                return [[_util2.AnnotationEditorParamsType.FREETEXT_SIZE, _FreeTextEditor._defaultFontSize], [_util2.AnnotationEditorParamsType.FREETEXT_COLOR, _FreeTextEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor]];
              }
              get propertiesToUpdate() {
                return [[_util2.AnnotationEditorParamsType.FREETEXT_SIZE, __privateGet(this, _fontSize)], [_util2.AnnotationEditorParamsType.FREETEXT_COLOR, __privateGet(this, _color)]];
              }
              getInitialTranslation() {
                return [-_FreeTextEditor._internalPadding * this.parent.scaleFactor, -(_FreeTextEditor._internalPadding + __privateGet(this, _fontSize)) * this.parent.scaleFactor];
              }
              rebuild() {
                super.rebuild();
                if (this.div === null) {
                  return;
                }
                if (!this.isAttachedToDOM) {
                  this.parent.add(this);
                }
              }
              enableEditMode() {
                if (this.isInEditMode()) {
                  return;
                }
                this.parent.setEditingState(false);
                this.parent.updateToolbar(_util2.AnnotationEditorType.FREETEXT);
                super.enableEditMode();
                this.enableEditing();
                this.overlayDiv.classList.remove("enabled");
                this.editorDiv.contentEditable = true;
                this.div.draggable = false;
                this.editorDiv.addEventListener("keydown", __privateGet(this, _boundEditorDivKeydown));
                this.editorDiv.addEventListener("focus", __privateGet(this, _boundEditorDivFocus));
                this.editorDiv.addEventListener("blur", __privateGet(this, _boundEditorDivBlur));
              }
              disableEditMode() {
                if (!this.isInEditMode()) {
                  return;
                }
                this.parent.setEditingState(true);
                super.disableEditMode();
                this.disableEditing();
                this.overlayDiv.classList.add("enabled");
                this.editorDiv.contentEditable = false;
                this.div.draggable = true;
                this.editorDiv.removeEventListener("keydown", __privateGet(this, _boundEditorDivKeydown));
                this.editorDiv.removeEventListener("focus", __privateGet(this, _boundEditorDivFocus));
                this.editorDiv.removeEventListener("blur", __privateGet(this, _boundEditorDivBlur));
                this.div.focus();
                this.isEditing = false;
              }
              focusin(event) {
                super.focusin(event);
                if (event.target !== this.editorDiv) {
                  this.editorDiv.focus();
                }
              }
              onceAdded() {
                if (this.width) {
                  return;
                }
                this.enableEditMode();
                this.editorDiv.focus();
              }
              isEmpty() {
                return !this.editorDiv || this.editorDiv.innerText.trim() === "";
              }
              remove() {
                this.isEditing = false;
                this.parent.setEditingState(true);
                super.remove();
              }
              commit() {
                super.commit();
                if (!__privateGet(this, _hasAlreadyBeenCommitted)) {
                  __privateSet(this, _hasAlreadyBeenCommitted, true);
                  this.parent.addUndoableEditor(this);
                }
                this.disableEditMode();
                __privateSet(this, _content, __privateMethod(this, _extractText, extractText_fn).call(this).trimEnd());
                __privateMethod(this, _setEditorDimensions, setEditorDimensions_fn).call(this);
              }
              shouldGetKeyboardEvents() {
                return this.isInEditMode();
              }
              dblclick(event) {
                this.enableEditMode();
                this.editorDiv.focus();
              }
              keydown(event) {
                if (event.target === this.div && event.key === "Enter") {
                  this.enableEditMode();
                  this.editorDiv.focus();
                }
              }
              editorDivKeydown(event) {
                _FreeTextEditor._keyboardManager.exec(this, event);
              }
              editorDivFocus(event) {
                this.isEditing = true;
              }
              editorDivBlur(event) {
                this.isEditing = false;
              }
              disableEditing() {
                this.editorDiv.setAttribute("role", "comment");
                this.editorDiv.removeAttribute("aria-multiline");
              }
              enableEditing() {
                this.editorDiv.setAttribute("role", "textbox");
                this.editorDiv.setAttribute("aria-multiline", true);
              }
              render() {
                if (this.div) {
                  return this.div;
                }
                let baseX, baseY;
                if (this.width) {
                  baseX = this.x;
                  baseY = this.y;
                }
                super.render();
                this.editorDiv = document.createElement("div");
                this.editorDiv.className = "internal";
                this.editorDiv.setAttribute("id", `${this.id}-editor`);
                this.enableEditing();
                _FreeTextEditor._l10nPromise.get("editor_free_text_aria_label").then((msg) => {
                  var _a;
                  return (_a = this.editorDiv) == null ? void 0 : _a.setAttribute("aria-label", msg);
                });
                _FreeTextEditor._l10nPromise.get("free_text_default_content").then((msg) => {
                  var _a;
                  return (_a = this.editorDiv) == null ? void 0 : _a.setAttribute("default-content", msg);
                });
                this.editorDiv.contentEditable = true;
                const {
                  style
                } = this.editorDiv;
                style.fontSize = `calc(${__privateGet(this, _fontSize)}px * var(--scale-factor))`;
                style.color = __privateGet(this, _color);
                this.div.append(this.editorDiv);
                this.overlayDiv = document.createElement("div");
                this.overlayDiv.classList.add("overlay", "enabled");
                this.div.append(this.overlayDiv);
                (0, _tools.bindEvents)(this, this.div, ["dblclick", "keydown"]);
                if (this.width) {
                  const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
                  this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
                  for (const line of __privateGet(this, _content).split("\n")) {
                    const div = document.createElement("div");
                    div.append(line ? document.createTextNode(line) : document.createElement("br"));
                    this.editorDiv.append(div);
                  }
                  this.div.draggable = true;
                  this.editorDiv.contentEditable = false;
                } else {
                  this.div.draggable = false;
                  this.editorDiv.contentEditable = true;
                }
                return this.div;
              }
              get contentDiv() {
                return this.editorDiv;
              }
              static deserialize(data, parent) {
                const editor = super.deserialize(data, parent);
                __privateSet(editor, _fontSize, data.fontSize);
                __privateSet(editor, _color, _util2.Util.makeHexColor(...data.color));
                __privateSet(editor, _content, data.value);
                return editor;
              }
              serialize() {
                if (this.isEmpty()) {
                  return null;
                }
                const padding = _FreeTextEditor._internalPadding * this.parent.scaleFactor;
                const rect = this.getRect(padding, padding);
                const color = _editor.AnnotationEditor._colorManager.convert(getComputedStyle(this.editorDiv).color);
                return {
                  annotationType: _util2.AnnotationEditorType.FREETEXT,
                  color,
                  fontSize: __privateGet(this, _fontSize),
                  value: __privateGet(this, _content),
                  pageIndex: this.parent.pageIndex,
                  rect,
                  rotation: this.rotation
                };
              }
            };
            let FreeTextEditor = _FreeTextEditor;
            _boundEditorDivBlur = new WeakMap();
            _boundEditorDivFocus = new WeakMap();
            _boundEditorDivKeydown = new WeakMap();
            _color = new WeakMap();
            _content = new WeakMap();
            _hasAlreadyBeenCommitted = new WeakMap();
            _fontSize = new WeakMap();
            _updateFontSize = new WeakSet();
            updateFontSize_fn = function(fontSize) {
              const setFontsize = (size) => {
                this.editorDiv.style.fontSize = `calc(${size}px * var(--scale-factor))`;
                this.translate(0, -(size - __privateGet(this, _fontSize)) * this.parent.scaleFactor);
                __privateSet(this, _fontSize, size);
                __privateMethod(this, _setEditorDimensions, setEditorDimensions_fn).call(this);
              };
              const savedFontsize = __privateGet(this, _fontSize);
              this.parent.addCommands({
                cmd: () => {
                  setFontsize(fontSize);
                },
                undo: () => {
                  setFontsize(savedFontsize);
                },
                mustExec: true,
                type: _util2.AnnotationEditorParamsType.FREETEXT_SIZE,
                overwriteIfSameType: true,
                keepUndo: true
              });
            };
            _updateColor = new WeakSet();
            updateColor_fn = function(color) {
              const savedColor = __privateGet(this, _color);
              this.parent.addCommands({
                cmd: () => {
                  __privateSet(this, _color, color);
                  this.editorDiv.style.color = color;
                },
                undo: () => {
                  __privateSet(this, _color, savedColor);
                  this.editorDiv.style.color = savedColor;
                },
                mustExec: true,
                type: _util2.AnnotationEditorParamsType.FREETEXT_COLOR,
                overwriteIfSameType: true,
                keepUndo: true
              });
            };
            _extractText = new WeakSet();
            extractText_fn = function() {
              const divs = this.editorDiv.getElementsByTagName("div");
              if (divs.length === 0) {
                return this.editorDiv.innerText;
              }
              const buffer = [];
              for (let i = 0, ii = divs.length; i < ii; i++) {
                const div = divs[i];
                const first = div.firstChild;
                if ((first == null ? void 0 : first.nodeName) === "#text") {
                  buffer.push(first.data);
                } else {
                  buffer.push("");
                }
              }
              return buffer.join("\n");
            };
            _setEditorDimensions = new WeakSet();
            setEditorDimensions_fn = function() {
              const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
              const rect = this.div.getBoundingClientRect();
              this.width = rect.width / parentWidth;
              this.height = rect.height / parentHeight;
            };
            __publicField(FreeTextEditor, "_freeTextDefaultContent", "");
            __publicField(FreeTextEditor, "_l10nPromise");
            __publicField(FreeTextEditor, "_internalPadding", 0);
            __publicField(FreeTextEditor, "_defaultColor", null);
            __publicField(FreeTextEditor, "_defaultFontSize", 10);
            __publicField(FreeTextEditor, "_keyboardManager", new _tools.KeyboardManager([[["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], _FreeTextEditor.prototype.commitOrRemove]]));
            __publicField(FreeTextEditor, "_type", "freetext");
            exports2.FreeTextEditor = FreeTextEditor;
          },
          /* 24 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _aspectRatio, _baseHeight, _baseWidth, _boundCanvasPointermove, _boundCanvasPointerleave, _boundCanvasPointerup, _boundCanvasPointerdown, _disableEditing, _isCanvasInitialized, _lastPoint, _observer, _realWidth, _realHeight, _requestFrameCallback, _updateThickness, updateThickness_fn, _updateColor, updateColor_fn, _updateOpacity, updateOpacity_fn, _getInitialBBox, getInitialBBox_fn, _setStroke, setStroke_fn, _startDrawing, startDrawing_fn, _draw, draw_fn, _stopDrawing, stopDrawing_fn, _redraw, redraw_fn, _endDrawing, endDrawing_fn, _createCanvas, createCanvas_fn, _createObserver, createObserver_fn, _setCanvasDims, setCanvasDims_fn, _setScaleFactor, setScaleFactor_fn, _updateTransform, updateTransform_fn, _buildPath2D, buildPath2D_fn, _serializePaths, serializePaths_fn, _extractPointsOnBezier, extractPointsOnBezier_fn, _isAlmostFlat, isAlmostFlat_fn, _getBbox, getBbox_fn, _getPadding, getPadding_fn, _fitToContent, fitToContent_fn, _setMinDims, setMinDims_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.InkEditor = void 0;
            Object.defineProperty(exports2, "fitCurve", {
              enumerable: true,
              get: function() {
                return _pdfjsFitCurve.fitCurve;
              }
            });
            var _util2 = __w_pdfjs_require__2(1);
            var _editor = __w_pdfjs_require__2(6);
            var _pdfjsFitCurve = __w_pdfjs_require__2(25);
            var _tools = __w_pdfjs_require__2(7);
            const RESIZER_SIZE = 16;
            const _InkEditor = class extends _editor.AnnotationEditor {
              constructor(params) {
                super({
                  ...params,
                  name: "inkEditor"
                });
                __privateAdd(this, _updateThickness);
                __privateAdd(this, _updateColor);
                __privateAdd(this, _updateOpacity);
                __privateAdd(this, _getInitialBBox);
                __privateAdd(this, _setStroke);
                __privateAdd(this, _startDrawing);
                __privateAdd(this, _draw);
                __privateAdd(this, _stopDrawing);
                __privateAdd(this, _redraw);
                __privateAdd(this, _endDrawing);
                __privateAdd(this, _createCanvas);
                __privateAdd(this, _createObserver);
                __privateAdd(this, _setCanvasDims);
                __privateAdd(this, _setScaleFactor);
                __privateAdd(this, _updateTransform);
                __privateAdd(this, _serializePaths);
                __privateAdd(this, _extractPointsOnBezier);
                __privateAdd(this, _isAlmostFlat);
                __privateAdd(this, _getBbox);
                __privateAdd(this, _getPadding);
                __privateAdd(this, _fitToContent);
                __privateAdd(this, _setMinDims);
                __privateAdd(this, _aspectRatio, 0);
                __privateAdd(this, _baseHeight, 0);
                __privateAdd(this, _baseWidth, 0);
                __privateAdd(this, _boundCanvasPointermove, this.canvasPointermove.bind(this));
                __privateAdd(this, _boundCanvasPointerleave, this.canvasPointerleave.bind(this));
                __privateAdd(this, _boundCanvasPointerup, this.canvasPointerup.bind(this));
                __privateAdd(this, _boundCanvasPointerdown, this.canvasPointerdown.bind(this));
                __privateAdd(this, _disableEditing, false);
                __privateAdd(this, _isCanvasInitialized, false);
                __privateAdd(this, _lastPoint, null);
                __privateAdd(this, _observer, null);
                __privateAdd(this, _realWidth, 0);
                __privateAdd(this, _realHeight, 0);
                __privateAdd(this, _requestFrameCallback, null);
                this.color = params.color || null;
                this.thickness = params.thickness || null;
                this.opacity = params.opacity || null;
                this.paths = [];
                this.bezierPath2D = [];
                this.currentPath = [];
                this.scaleFactor = 1;
                this.translationX = this.translationY = 0;
                this.x = 0;
                this.y = 0;
              }
              static initialize(l10n) {
                this._l10nPromise = new Map(["editor_ink_canvas_aria_label", "editor_ink_aria_label"].map((str) => [str, l10n.get(str)]));
              }
              static updateDefaultParams(type, value) {
                switch (type) {
                  case _util2.AnnotationEditorParamsType.INK_THICKNESS:
                    _InkEditor._defaultThickness = value;
                    break;
                  case _util2.AnnotationEditorParamsType.INK_COLOR:
                    _InkEditor._defaultColor = value;
                    break;
                  case _util2.AnnotationEditorParamsType.INK_OPACITY:
                    _InkEditor._defaultOpacity = value / 100;
                    break;
                }
              }
              updateParams(type, value) {
                switch (type) {
                  case _util2.AnnotationEditorParamsType.INK_THICKNESS:
                    __privateMethod(this, _updateThickness, updateThickness_fn).call(this, value);
                    break;
                  case _util2.AnnotationEditorParamsType.INK_COLOR:
                    __privateMethod(this, _updateColor, updateColor_fn).call(this, value);
                    break;
                  case _util2.AnnotationEditorParamsType.INK_OPACITY:
                    __privateMethod(this, _updateOpacity, updateOpacity_fn).call(this, value);
                    break;
                }
              }
              static get defaultPropertiesToUpdate() {
                return [[_util2.AnnotationEditorParamsType.INK_THICKNESS, _InkEditor._defaultThickness], [_util2.AnnotationEditorParamsType.INK_COLOR, _InkEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor], [_util2.AnnotationEditorParamsType.INK_OPACITY, Math.round(_InkEditor._defaultOpacity * 100)]];
              }
              get propertiesToUpdate() {
                return [[_util2.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || _InkEditor._defaultThickness], [_util2.AnnotationEditorParamsType.INK_COLOR, this.color || _InkEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor], [_util2.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? _InkEditor._defaultOpacity))]];
              }
              rebuild() {
                super.rebuild();
                if (this.div === null) {
                  return;
                }
                if (!this.canvas) {
                  __privateMethod(this, _createCanvas, createCanvas_fn).call(this);
                  __privateMethod(this, _createObserver, createObserver_fn).call(this);
                }
                if (!this.isAttachedToDOM) {
                  this.parent.add(this);
                  __privateMethod(this, _setCanvasDims, setCanvasDims_fn).call(this);
                }
                __privateMethod(this, _fitToContent, fitToContent_fn).call(this);
              }
              remove() {
                if (this.canvas === null) {
                  return;
                }
                if (!this.isEmpty()) {
                  this.commit();
                }
                this.canvas.width = this.canvas.height = 0;
                this.canvas.remove();
                this.canvas = null;
                __privateGet(this, _observer).disconnect();
                __privateSet(this, _observer, null);
                super.remove();
              }
              enableEditMode() {
                if (__privateGet(this, _disableEditing) || this.canvas === null) {
                  return;
                }
                super.enableEditMode();
                this.div.draggable = false;
                this.canvas.addEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
                this.canvas.addEventListener("pointerup", __privateGet(this, _boundCanvasPointerup));
              }
              disableEditMode() {
                if (!this.isInEditMode() || this.canvas === null) {
                  return;
                }
                super.disableEditMode();
                this.div.draggable = !this.isEmpty();
                this.div.classList.remove("editing");
                this.canvas.removeEventListener("pointerdown", __privateGet(this, _boundCanvasPointerdown));
                this.canvas.removeEventListener("pointerup", __privateGet(this, _boundCanvasPointerup));
              }
              onceAdded() {
                this.div.draggable = !this.isEmpty();
              }
              isEmpty() {
                return this.paths.length === 0 || this.paths.length === 1 && this.paths[0].length === 0;
              }
              commit() {
                if (__privateGet(this, _disableEditing)) {
                  return;
                }
                super.commit();
                this.isEditing = false;
                this.disableEditMode();
                this.setInForeground();
                __privateSet(this, _disableEditing, true);
                this.div.classList.add("disabled");
                __privateMethod(this, _fitToContent, fitToContent_fn).call(this, true);
                this.parent.addInkEditorIfNeeded(true);
                this.parent.moveEditorInDOM(this);
                this.div.focus();
              }
              focusin(event) {
                super.focusin(event);
                this.enableEditMode();
              }
              canvasPointerdown(event) {
                if (event.button !== 0 || !this.isInEditMode() || __privateGet(this, _disableEditing)) {
                  return;
                }
                this.setInForeground();
                if (event.type !== "mouse") {
                  this.div.focus();
                }
                event.stopPropagation();
                this.canvas.addEventListener("pointerleave", __privateGet(this, _boundCanvasPointerleave));
                this.canvas.addEventListener("pointermove", __privateGet(this, _boundCanvasPointermove));
                __privateMethod(this, _startDrawing, startDrawing_fn).call(this, event.offsetX, event.offsetY);
              }
              canvasPointermove(event) {
                event.stopPropagation();
                __privateMethod(this, _draw, draw_fn).call(this, event.offsetX, event.offsetY);
              }
              canvasPointerup(event) {
                if (event.button !== 0) {
                  return;
                }
                if (this.isInEditMode() && this.currentPath.length !== 0) {
                  event.stopPropagation();
                  __privateMethod(this, _endDrawing, endDrawing_fn).call(this, event);
                  this.setInBackground();
                }
              }
              canvasPointerleave(event) {
                __privateMethod(this, _endDrawing, endDrawing_fn).call(this, event);
                this.setInBackground();
              }
              render() {
                if (this.div) {
                  return this.div;
                }
                let baseX, baseY;
                if (this.width) {
                  baseX = this.x;
                  baseY = this.y;
                }
                super.render();
                _InkEditor._l10nPromise.get("editor_ink_aria_label").then((msg) => {
                  var _a;
                  return (_a = this.div) == null ? void 0 : _a.setAttribute("aria-label", msg);
                });
                const [x, y, w, h] = __privateMethod(this, _getInitialBBox, getInitialBBox_fn).call(this);
                this.setAt(x, y, 0, 0);
                this.setDims(w, h);
                __privateMethod(this, _createCanvas, createCanvas_fn).call(this);
                if (this.width) {
                  const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
                  this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
                  __privateSet(this, _isCanvasInitialized, true);
                  __privateMethod(this, _setCanvasDims, setCanvasDims_fn).call(this);
                  this.setDims(this.width * parentWidth, this.height * parentHeight);
                  __privateMethod(this, _redraw, redraw_fn).call(this);
                  __privateMethod(this, _setMinDims, setMinDims_fn).call(this);
                  this.div.classList.add("disabled");
                } else {
                  this.div.classList.add("editing");
                  this.enableEditMode();
                }
                __privateMethod(this, _createObserver, createObserver_fn).call(this);
                return this.div;
              }
              setDimensions(width, height) {
                const roundedWidth = Math.round(width);
                const roundedHeight = Math.round(height);
                if (__privateGet(this, _realWidth) === roundedWidth && __privateGet(this, _realHeight) === roundedHeight) {
                  return;
                }
                __privateSet(this, _realWidth, roundedWidth);
                __privateSet(this, _realHeight, roundedHeight);
                this.canvas.style.visibility = "hidden";
                if (__privateGet(this, _aspectRatio) && Math.abs(__privateGet(this, _aspectRatio) - width / height) > 0.01) {
                  height = Math.ceil(width / __privateGet(this, _aspectRatio));
                  this.setDims(width, height);
                }
                const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
                this.width = width / parentWidth;
                this.height = height / parentHeight;
                if (__privateGet(this, _disableEditing)) {
                  __privateMethod(this, _setScaleFactor, setScaleFactor_fn).call(this, width, height);
                }
                __privateMethod(this, _setCanvasDims, setCanvasDims_fn).call(this);
                __privateMethod(this, _redraw, redraw_fn).call(this);
                this.canvas.style.visibility = "visible";
              }
              static deserialize(data, parent) {
                var _a, _b;
                const editor = super.deserialize(data, parent);
                editor.thickness = data.thickness;
                editor.color = _util2.Util.makeHexColor(...data.color);
                editor.opacity = data.opacity;
                const [pageWidth, pageHeight] = parent.pageDimensions;
                const width = editor.width * pageWidth;
                const height = editor.height * pageHeight;
                const scaleFactor = parent.scaleFactor;
                const padding = data.thickness / 2;
                __privateSet(editor, _aspectRatio, width / height);
                __privateSet(editor, _disableEditing, true);
                __privateSet(editor, _realWidth, Math.round(width));
                __privateSet(editor, _realHeight, Math.round(height));
                for (const {
                  bezier
                } of data.paths) {
                  const path = [];
                  editor.paths.push(path);
                  let p0 = scaleFactor * (bezier[0] - padding);
                  let p1 = scaleFactor * (height - bezier[1] - padding);
                  for (let i = 2, ii = bezier.length; i < ii; i += 6) {
                    const p10 = scaleFactor * (bezier[i] - padding);
                    const p11 = scaleFactor * (height - bezier[i + 1] - padding);
                    const p20 = scaleFactor * (bezier[i + 2] - padding);
                    const p21 = scaleFactor * (height - bezier[i + 3] - padding);
                    const p30 = scaleFactor * (bezier[i + 4] - padding);
                    const p31 = scaleFactor * (height - bezier[i + 5] - padding);
                    path.push([[p0, p1], [p10, p11], [p20, p21], [p30, p31]]);
                    p0 = p30;
                    p1 = p31;
                  }
                  const path2D = __privateMethod(this, _buildPath2D, buildPath2D_fn).call(this, path);
                  editor.bezierPath2D.push(path2D);
                }
                const bbox = __privateMethod(_a = editor, _getBbox, getBbox_fn).call(_a);
                __privateSet(editor, _baseWidth, Math.max(RESIZER_SIZE, bbox[2] - bbox[0]));
                __privateSet(editor, _baseHeight, Math.max(RESIZER_SIZE, bbox[3] - bbox[1]));
                __privateMethod(_b = editor, _setScaleFactor, setScaleFactor_fn).call(_b, width, height);
                return editor;
              }
              serialize() {
                if (this.isEmpty()) {
                  return null;
                }
                const rect = this.getRect(0, 0);
                const height = this.rotation % 180 === 0 ? rect[3] - rect[1] : rect[2] - rect[0];
                const color = _editor.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
                return {
                  annotationType: _util2.AnnotationEditorType.INK,
                  color,
                  thickness: this.thickness,
                  opacity: this.opacity,
                  paths: __privateMethod(this, _serializePaths, serializePaths_fn).call(this, this.scaleFactor / this.parent.scaleFactor, this.translationX, this.translationY, height),
                  pageIndex: this.parent.pageIndex,
                  rect,
                  rotation: this.rotation
                };
              }
            };
            let InkEditor = _InkEditor;
            _aspectRatio = new WeakMap();
            _baseHeight = new WeakMap();
            _baseWidth = new WeakMap();
            _boundCanvasPointermove = new WeakMap();
            _boundCanvasPointerleave = new WeakMap();
            _boundCanvasPointerup = new WeakMap();
            _boundCanvasPointerdown = new WeakMap();
            _disableEditing = new WeakMap();
            _isCanvasInitialized = new WeakMap();
            _lastPoint = new WeakMap();
            _observer = new WeakMap();
            _realWidth = new WeakMap();
            _realHeight = new WeakMap();
            _requestFrameCallback = new WeakMap();
            _updateThickness = new WeakSet();
            updateThickness_fn = function(thickness) {
              const savedThickness = this.thickness;
              this.parent.addCommands({
                cmd: () => {
                  this.thickness = thickness;
                  __privateMethod(this, _fitToContent, fitToContent_fn).call(this);
                },
                undo: () => {
                  this.thickness = savedThickness;
                  __privateMethod(this, _fitToContent, fitToContent_fn).call(this);
                },
                mustExec: true,
                type: _util2.AnnotationEditorParamsType.INK_THICKNESS,
                overwriteIfSameType: true,
                keepUndo: true
              });
            };
            _updateColor = new WeakSet();
            updateColor_fn = function(color) {
              const savedColor = this.color;
              this.parent.addCommands({
                cmd: () => {
                  this.color = color;
                  __privateMethod(this, _redraw, redraw_fn).call(this);
                },
                undo: () => {
                  this.color = savedColor;
                  __privateMethod(this, _redraw, redraw_fn).call(this);
                },
                mustExec: true,
                type: _util2.AnnotationEditorParamsType.INK_COLOR,
                overwriteIfSameType: true,
                keepUndo: true
              });
            };
            _updateOpacity = new WeakSet();
            updateOpacity_fn = function(opacity) {
              opacity /= 100;
              const savedOpacity = this.opacity;
              this.parent.addCommands({
                cmd: () => {
                  this.opacity = opacity;
                  __privateMethod(this, _redraw, redraw_fn).call(this);
                },
                undo: () => {
                  this.opacity = savedOpacity;
                  __privateMethod(this, _redraw, redraw_fn).call(this);
                },
                mustExec: true,
                type: _util2.AnnotationEditorParamsType.INK_OPACITY,
                overwriteIfSameType: true,
                keepUndo: true
              });
            };
            _getInitialBBox = new WeakSet();
            getInitialBBox_fn = function() {
              const {
                width,
                height,
                rotation
              } = this.parent.viewport;
              switch (rotation) {
                case 90:
                  return [0, width, width, height];
                case 180:
                  return [width, height, width, height];
                case 270:
                  return [height, 0, width, height];
                default:
                  return [0, 0, width, height];
              }
            };
            _setStroke = new WeakSet();
            setStroke_fn = function() {
              this.ctx.lineWidth = this.thickness * this.parent.scaleFactor / this.scaleFactor;
              this.ctx.lineCap = "round";
              this.ctx.lineJoin = "round";
              this.ctx.miterLimit = 10;
              this.ctx.strokeStyle = `${this.color}${(0, _tools.opacityToHex)(this.opacity)}`;
            };
            _startDrawing = new WeakSet();
            startDrawing_fn = function(x, y) {
              this.isEditing = true;
              if (!__privateGet(this, _isCanvasInitialized)) {
                __privateSet(this, _isCanvasInitialized, true);
                __privateMethod(this, _setCanvasDims, setCanvasDims_fn).call(this);
                this.thickness || (this.thickness = _InkEditor._defaultThickness);
                this.color || (this.color = _InkEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor);
                this.opacity ?? (this.opacity = _InkEditor._defaultOpacity);
              }
              this.currentPath.push([x, y]);
              __privateSet(this, _lastPoint, null);
              __privateMethod(this, _setStroke, setStroke_fn).call(this);
              this.ctx.beginPath();
              this.ctx.moveTo(x, y);
              __privateSet(this, _requestFrameCallback, () => {
                if (!__privateGet(this, _requestFrameCallback)) {
                  return;
                }
                if (__privateGet(this, _lastPoint)) {
                  if (this.isEmpty()) {
                    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                  } else {
                    __privateMethod(this, _redraw, redraw_fn).call(this);
                  }
                  this.ctx.lineTo(...__privateGet(this, _lastPoint));
                  __privateSet(this, _lastPoint, null);
                  this.ctx.stroke();
                }
                window.requestAnimationFrame(__privateGet(this, _requestFrameCallback));
              });
              window.requestAnimationFrame(__privateGet(this, _requestFrameCallback));
            };
            _draw = new WeakSet();
            draw_fn = function(x, y) {
              const [lastX, lastY] = this.currentPath.at(-1);
              if (x === lastX && y === lastY) {
                return;
              }
              this.currentPath.push([x, y]);
              __privateSet(this, _lastPoint, [x, y]);
            };
            _stopDrawing = new WeakSet();
            stopDrawing_fn = function(x, y) {
              var _a;
              this.ctx.closePath();
              __privateSet(this, _requestFrameCallback, null);
              x = Math.min(Math.max(x, 0), this.canvas.width);
              y = Math.min(Math.max(y, 0), this.canvas.height);
              const [lastX, lastY] = this.currentPath.at(-1);
              if (x !== lastX || y !== lastY) {
                this.currentPath.push([x, y]);
              }
              let bezier;
              if (this.currentPath.length !== 1) {
                bezier = (0, _pdfjsFitCurve.fitCurve)(this.currentPath, 30, null);
              } else {
                const xy = [x, y];
                bezier = [[xy, xy.slice(), xy.slice(), xy]];
              }
              const path2D = __privateMethod(_a = _InkEditor, _buildPath2D, buildPath2D_fn).call(_a, bezier);
              this.currentPath.length = 0;
              const cmd = () => {
                this.paths.push(bezier);
                this.bezierPath2D.push(path2D);
                this.rebuild();
              };
              const undo = () => {
                this.paths.pop();
                this.bezierPath2D.pop();
                if (this.paths.length === 0) {
                  this.remove();
                } else {
                  if (!this.canvas) {
                    __privateMethod(this, _createCanvas, createCanvas_fn).call(this);
                    __privateMethod(this, _createObserver, createObserver_fn).call(this);
                  }
                  __privateMethod(this, _fitToContent, fitToContent_fn).call(this);
                }
              };
              this.parent.addCommands({
                cmd,
                undo,
                mustExec: true
              });
            };
            _redraw = new WeakSet();
            redraw_fn = function() {
              if (this.isEmpty()) {
                __privateMethod(this, _updateTransform, updateTransform_fn).call(this);
                return;
              }
              __privateMethod(this, _setStroke, setStroke_fn).call(this);
              const {
                canvas,
                ctx
              } = this;
              ctx.setTransform(1, 0, 0, 1, 0, 0);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              __privateMethod(this, _updateTransform, updateTransform_fn).call(this);
              for (const path of this.bezierPath2D) {
                ctx.stroke(path);
              }
            };
            _endDrawing = new WeakSet();
            endDrawing_fn = function(event) {
              __privateMethod(this, _stopDrawing, stopDrawing_fn).call(this, event.offsetX, event.offsetY);
              this.canvas.removeEventListener("pointerleave", __privateGet(this, _boundCanvasPointerleave));
              this.canvas.removeEventListener("pointermove", __privateGet(this, _boundCanvasPointermove));
              this.parent.addToAnnotationStorage(this);
            };
            _createCanvas = new WeakSet();
            createCanvas_fn = function() {
              this.canvas = document.createElement("canvas");
              this.canvas.width = this.canvas.height = 0;
              this.canvas.className = "inkEditorCanvas";
              _InkEditor._l10nPromise.get("editor_ink_canvas_aria_label").then((msg) => {
                var _a;
                return (_a = this.canvas) == null ? void 0 : _a.setAttribute("aria-label", msg);
              });
              this.div.append(this.canvas);
              this.ctx = this.canvas.getContext("2d");
            };
            _createObserver = new WeakSet();
            createObserver_fn = function() {
              __privateSet(this, _observer, new ResizeObserver((entries) => {
                const rect = entries[0].contentRect;
                if (rect.width && rect.height) {
                  this.setDimensions(rect.width, rect.height);
                }
              }));
              __privateGet(this, _observer).observe(this.div);
            };
            _setCanvasDims = new WeakSet();
            setCanvasDims_fn = function() {
              if (!__privateGet(this, _isCanvasInitialized)) {
                return;
              }
              const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
              this.canvas.width = Math.ceil(this.width * parentWidth);
              this.canvas.height = Math.ceil(this.height * parentHeight);
              __privateMethod(this, _updateTransform, updateTransform_fn).call(this);
            };
            _setScaleFactor = new WeakSet();
            setScaleFactor_fn = function(width, height) {
              const padding = __privateMethod(this, _getPadding, getPadding_fn).call(this);
              const scaleFactorW = (width - padding) / __privateGet(this, _baseWidth);
              const scaleFactorH = (height - padding) / __privateGet(this, _baseHeight);
              this.scaleFactor = Math.min(scaleFactorW, scaleFactorH);
            };
            _updateTransform = new WeakSet();
            updateTransform_fn = function() {
              const padding = __privateMethod(this, _getPadding, getPadding_fn).call(this) / 2;
              this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + padding, this.translationY * this.scaleFactor + padding);
            };
            _buildPath2D = new WeakSet();
            buildPath2D_fn = function(bezier) {
              const path2D = new Path2D();
              for (let i = 0, ii = bezier.length; i < ii; i++) {
                const [first, control1, control2, second] = bezier[i];
                if (i === 0) {
                  path2D.moveTo(...first);
                }
                path2D.bezierCurveTo(control1[0], control1[1], control2[0], control2[1], second[0], second[1]);
              }
              return path2D;
            };
            _serializePaths = new WeakSet();
            serializePaths_fn = function(s, tx, ty, h) {
              const NUMBER_OF_POINTS_ON_BEZIER_CURVE = 4;
              const paths = [];
              const padding = this.thickness / 2;
              let buffer, points;
              for (const bezier of this.paths) {
                buffer = [];
                points = [];
                for (let i = 0, ii = bezier.length; i < ii; i++) {
                  const [first, control1, control2, second] = bezier[i];
                  const p10 = s * (first[0] + tx) + padding;
                  const p11 = h - s * (first[1] + ty) - padding;
                  const p20 = s * (control1[0] + tx) + padding;
                  const p21 = h - s * (control1[1] + ty) - padding;
                  const p30 = s * (control2[0] + tx) + padding;
                  const p31 = h - s * (control2[1] + ty) - padding;
                  const p40 = s * (second[0] + tx) + padding;
                  const p41 = h - s * (second[1] + ty) - padding;
                  if (i === 0) {
                    buffer.push(p10, p11);
                    points.push(p10, p11);
                  }
                  buffer.push(p20, p21, p30, p31, p40, p41);
                  __privateMethod(this, _extractPointsOnBezier, extractPointsOnBezier_fn).call(this, p10, p11, p20, p21, p30, p31, p40, p41, NUMBER_OF_POINTS_ON_BEZIER_CURVE, points);
                }
                paths.push({
                  bezier: buffer,
                  points
                });
              }
              return paths;
            };
            _extractPointsOnBezier = new WeakSet();
            extractPointsOnBezier_fn = function(p10, p11, p20, p21, p30, p31, p40, p41, n, points) {
              if (__privateMethod(this, _isAlmostFlat, isAlmostFlat_fn).call(this, p10, p11, p20, p21, p30, p31, p40, p41)) {
                points.push(p40, p41);
                return;
              }
              for (let i = 1; i < n - 1; i++) {
                const t = i / n;
                const mt = 1 - t;
                let q10 = t * p10 + mt * p20;
                let q11 = t * p11 + mt * p21;
                let q20 = t * p20 + mt * p30;
                let q21 = t * p21 + mt * p31;
                const q30 = t * p30 + mt * p40;
                const q31 = t * p31 + mt * p41;
                q10 = t * q10 + mt * q20;
                q11 = t * q11 + mt * q21;
                q20 = t * q20 + mt * q30;
                q21 = t * q21 + mt * q31;
                q10 = t * q10 + mt * q20;
                q11 = t * q11 + mt * q21;
                points.push(q10, q11);
              }
              points.push(p40, p41);
            };
            _isAlmostFlat = new WeakSet();
            isAlmostFlat_fn = function(p10, p11, p20, p21, p30, p31, p40, p41) {
              const tol = 10;
              const ax = (3 * p20 - 2 * p10 - p40) ** 2;
              const ay = (3 * p21 - 2 * p11 - p41) ** 2;
              const bx = (3 * p30 - p10 - 2 * p40) ** 2;
              const by = (3 * p31 - p11 - 2 * p41) ** 2;
              return Math.max(ax, bx) + Math.max(ay, by) <= tol;
            };
            _getBbox = new WeakSet();
            getBbox_fn = function() {
              let xMin = Infinity;
              let xMax = -Infinity;
              let yMin = Infinity;
              let yMax = -Infinity;
              for (const path of this.paths) {
                for (const [first, control1, control2, second] of path) {
                  const bbox = _util2.Util.bezierBoundingBox(...first, ...control1, ...control2, ...second);
                  xMin = Math.min(xMin, bbox[0]);
                  yMin = Math.min(yMin, bbox[1]);
                  xMax = Math.max(xMax, bbox[2]);
                  yMax = Math.max(yMax, bbox[3]);
                }
              }
              return [xMin, yMin, xMax, yMax];
            };
            _getPadding = new WeakSet();
            getPadding_fn = function() {
              return __privateGet(this, _disableEditing) ? Math.ceil(this.thickness * this.parent.scaleFactor) : 0;
            };
            _fitToContent = new WeakSet();
            fitToContent_fn = function(firstTime = false) {
              if (this.isEmpty()) {
                return;
              }
              if (!__privateGet(this, _disableEditing)) {
                __privateMethod(this, _redraw, redraw_fn).call(this);
                return;
              }
              const bbox = __privateMethod(this, _getBbox, getBbox_fn).call(this);
              const padding = __privateMethod(this, _getPadding, getPadding_fn).call(this);
              __privateSet(this, _baseWidth, Math.max(RESIZER_SIZE, bbox[2] - bbox[0]));
              __privateSet(this, _baseHeight, Math.max(RESIZER_SIZE, bbox[3] - bbox[1]));
              const width = Math.ceil(padding + __privateGet(this, _baseWidth) * this.scaleFactor);
              const height = Math.ceil(padding + __privateGet(this, _baseHeight) * this.scaleFactor);
              const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
              this.width = width / parentWidth;
              this.height = height / parentHeight;
              __privateSet(this, _aspectRatio, width / height);
              __privateMethod(this, _setMinDims, setMinDims_fn).call(this);
              const prevTranslationX = this.translationX;
              const prevTranslationY = this.translationY;
              this.translationX = -bbox[0];
              this.translationY = -bbox[1];
              __privateMethod(this, _setCanvasDims, setCanvasDims_fn).call(this);
              __privateMethod(this, _redraw, redraw_fn).call(this);
              __privateSet(this, _realWidth, width);
              __privateSet(this, _realHeight, height);
              this.setDims(width, height);
              const unscaledPadding = firstTime ? padding / this.scaleFactor / 2 : 0;
              this.translate(prevTranslationX - this.translationX - unscaledPadding, prevTranslationY - this.translationY - unscaledPadding);
            };
            _setMinDims = new WeakSet();
            setMinDims_fn = function() {
              const {
                style
              } = this.div;
              if (__privateGet(this, _aspectRatio) >= 1) {
                style.minHeight = `${RESIZER_SIZE}px`;
                style.minWidth = `${Math.round(__privateGet(this, _aspectRatio) * RESIZER_SIZE)}px`;
              } else {
                style.minWidth = `${RESIZER_SIZE}px`;
                style.minHeight = `${Math.round(RESIZER_SIZE / __privateGet(this, _aspectRatio))}px`;
              }
            };
            __privateAdd(InkEditor, _buildPath2D);
            __publicField(InkEditor, "_defaultColor", null);
            __publicField(InkEditor, "_defaultOpacity", 1);
            __publicField(InkEditor, "_defaultThickness", 1);
            __publicField(InkEditor, "_l10nPromise");
            __publicField(InkEditor, "_type", "ink");
            exports2.InkEditor = InkEditor;
          },
          /* 25 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.fitCurve = void 0;
            const fitCurve = __w_pdfjs_require__2(26);
            exports2.fitCurve = fitCurve;
          },
          /* 26 */
          /***/
          (module2) => {
            function fitCurve(points, maxError, progressCallback) {
              if (!Array.isArray(points)) {
                throw new TypeError("First argument should be an array");
              }
              points.forEach((point) => {
                if (!Array.isArray(point) || point.some((item) => typeof item !== "number") || point.length !== points[0].length) {
                  throw Error("Each point should be an array of numbers. Each point should have the same amount of numbers.");
                }
              });
              points = points.filter((point, i) => i === 0 || !point.every((val, j) => val === points[i - 1][j]));
              if (points.length < 2) {
                return [];
              }
              const len = points.length;
              const leftTangent = createTangent(points[1], points[0]);
              const rightTangent = createTangent(points[len - 2], points[len - 1]);
              return fitCubic(points, leftTangent, rightTangent, maxError, progressCallback);
            }
            function fitCubic(points, leftTangent, rightTangent, error, progressCallback) {
              const MaxIterations = 20;
              var bezCurve, u, uPrime, maxError, prevErr, splitPoint, prevSplit, centerVector, toCenterTangent, fromCenterTangent, beziers, dist, i;
              if (points.length === 2) {
                dist = maths.vectorLen(maths.subtract(points[0], points[1])) / 3;
                bezCurve = [points[0], maths.addArrays(points[0], maths.mulItems(leftTangent, dist)), maths.addArrays(points[1], maths.mulItems(rightTangent, dist)), points[1]];
                return [bezCurve];
              }
              u = chordLengthParameterize(points);
              [bezCurve, maxError, splitPoint] = generateAndReport(points, u, u, leftTangent, rightTangent, progressCallback);
              if (maxError === 0 || maxError < error) {
                return [bezCurve];
              }
              if (maxError < error * error) {
                uPrime = u;
                prevErr = maxError;
                prevSplit = splitPoint;
                for (i = 0; i < MaxIterations; i++) {
                  uPrime = reparameterize(bezCurve, points, uPrime);
                  [bezCurve, maxError, splitPoint] = generateAndReport(points, u, uPrime, leftTangent, rightTangent, progressCallback);
                  if (maxError < error) {
                    return [bezCurve];
                  } else if (splitPoint === prevSplit) {
                    let errChange = maxError / prevErr;
                    if (errChange > 0.9999 && errChange < 1.0001) {
                      break;
                    }
                  }
                  prevErr = maxError;
                  prevSplit = splitPoint;
                }
              }
              beziers = [];
              centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint + 1]);
              if (centerVector.every((val) => val === 0)) {
                centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint]);
                [centerVector[0], centerVector[1]] = [-centerVector[1], centerVector[0]];
              }
              toCenterTangent = maths.normalize(centerVector);
              fromCenterTangent = maths.mulItems(toCenterTangent, -1);
              beziers = beziers.concat(fitCubic(points.slice(0, splitPoint + 1), leftTangent, toCenterTangent, error, progressCallback));
              beziers = beziers.concat(fitCubic(points.slice(splitPoint), fromCenterTangent, rightTangent, error, progressCallback));
              return beziers;
            }
            function generateAndReport(points, paramsOrig, paramsPrime, leftTangent, rightTangent, progressCallback) {
              var bezCurve, maxError, splitPoint;
              bezCurve = generateBezier(points, paramsPrime, leftTangent, rightTangent);
              [maxError, splitPoint] = computeMaxError(points, bezCurve, paramsOrig);
              if (progressCallback) {
                progressCallback({
                  bez: bezCurve,
                  points,
                  params: paramsOrig,
                  maxErr: maxError,
                  maxPoint: splitPoint
                });
              }
              return [bezCurve, maxError, splitPoint];
            }
            function generateBezier(points, parameters, leftTangent, rightTangent) {
              var bezCurve, A, a, C, X, det_C0_C1, det_C0_X, det_X_C1, alpha_l, alpha_r, epsilon, segLength, i, len, tmp, u, ux, firstPoint = points[0], lastPoint = points[points.length - 1];
              bezCurve = [firstPoint, null, null, lastPoint];
              A = maths.zeros_Xx2x2(parameters.length);
              for (i = 0, len = parameters.length; i < len; i++) {
                u = parameters[i];
                ux = 1 - u;
                a = A[i];
                a[0] = maths.mulItems(leftTangent, 3 * u * (ux * ux));
                a[1] = maths.mulItems(rightTangent, 3 * ux * (u * u));
              }
              C = [[0, 0], [0, 0]];
              X = [0, 0];
              for (i = 0, len = points.length; i < len; i++) {
                u = parameters[i];
                a = A[i];
                C[0][0] += maths.dot(a[0], a[0]);
                C[0][1] += maths.dot(a[0], a[1]);
                C[1][0] += maths.dot(a[0], a[1]);
                C[1][1] += maths.dot(a[1], a[1]);
                tmp = maths.subtract(points[i], bezier.q([firstPoint, firstPoint, lastPoint, lastPoint], u));
                X[0] += maths.dot(a[0], tmp);
                X[1] += maths.dot(a[1], tmp);
              }
              det_C0_C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1];
              det_C0_X = C[0][0] * X[1] - C[1][0] * X[0];
              det_X_C1 = X[0] * C[1][1] - X[1] * C[0][1];
              alpha_l = det_C0_C1 === 0 ? 0 : det_X_C1 / det_C0_C1;
              alpha_r = det_C0_C1 === 0 ? 0 : det_C0_X / det_C0_C1;
              segLength = maths.vectorLen(maths.subtract(firstPoint, lastPoint));
              epsilon = 1e-6 * segLength;
              if (alpha_l < epsilon || alpha_r < epsilon) {
                bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, segLength / 3));
                bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, segLength / 3));
              } else {
                bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, alpha_l));
                bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, alpha_r));
              }
              return bezCurve;
            }
            function reparameterize(bezier2, points, parameters) {
              return parameters.map((p, i) => newtonRaphsonRootFind(bezier2, points[i], p));
            }
            function newtonRaphsonRootFind(bez, point, u) {
              var d = maths.subtract(bezier.q(bez, u), point), qprime = bezier.qprime(bez, u), numerator = maths.mulMatrix(d, qprime), denominator = maths.sum(maths.squareItems(qprime)) + 2 * maths.mulMatrix(d, bezier.qprimeprime(bez, u));
              if (denominator === 0) {
                return u;
              } else {
                return u - numerator / denominator;
              }
            }
            function chordLengthParameterize(points) {
              var u = [], currU, prevU, prevP;
              points.forEach((p, i) => {
                currU = i ? prevU + maths.vectorLen(maths.subtract(p, prevP)) : 0;
                u.push(currU);
                prevU = currU;
                prevP = p;
              });
              u = u.map((x) => x / prevU);
              return u;
            }
            function computeMaxError(points, bez, parameters) {
              var dist, maxDist, splitPoint, v, i, count, point, t;
              maxDist = 0;
              splitPoint = Math.floor(points.length / 2);
              const t_distMap = mapTtoRelativeDistances(bez, 10);
              for (i = 0, count = points.length; i < count; i++) {
                point = points[i];
                t = find_t(bez, parameters[i], t_distMap, 10);
                v = maths.subtract(bezier.q(bez, t), point);
                dist = v[0] * v[0] + v[1] * v[1];
                if (dist > maxDist) {
                  maxDist = dist;
                  splitPoint = i;
                }
              }
              return [maxDist, splitPoint];
            }
            var mapTtoRelativeDistances = function(bez, B_parts) {
              var B_t_curr;
              var B_t_dist = [0];
              var B_t_prev = bez[0];
              var sumLen = 0;
              for (var i = 1; i <= B_parts; i++) {
                B_t_curr = bezier.q(bez, i / B_parts);
                sumLen += maths.vectorLen(maths.subtract(B_t_curr, B_t_prev));
                B_t_dist.push(sumLen);
                B_t_prev = B_t_curr;
              }
              B_t_dist = B_t_dist.map((x) => x / sumLen);
              return B_t_dist;
            };
            function find_t(bez, param, t_distMap, B_parts) {
              if (param < 0) {
                return 0;
              }
              if (param > 1) {
                return 1;
              }
              var lenMax, lenMin, tMax, tMin, t;
              for (var i = 1; i <= B_parts; i++) {
                if (param <= t_distMap[i]) {
                  tMin = (i - 1) / B_parts;
                  tMax = i / B_parts;
                  lenMin = t_distMap[i - 1];
                  lenMax = t_distMap[i];
                  t = (param - lenMin) / (lenMax - lenMin) * (tMax - tMin) + tMin;
                  break;
                }
              }
              return t;
            }
            function createTangent(pointA, pointB) {
              return maths.normalize(maths.subtract(pointA, pointB));
            }
            class maths {
              static zeros_Xx2x2(x) {
                var zs = [];
                while (x--) {
                  zs.push([0, 0]);
                }
                return zs;
              }
              static mulItems(items, multiplier) {
                return items.map((x) => x * multiplier);
              }
              static mulMatrix(m1, m2) {
                return m1.reduce((sum, x1, i) => sum + x1 * m2[i], 0);
              }
              static subtract(arr1, arr2) {
                return arr1.map((x1, i) => x1 - arr2[i]);
              }
              static addArrays(arr1, arr2) {
                return arr1.map((x1, i) => x1 + arr2[i]);
              }
              static addItems(items, addition) {
                return items.map((x) => x + addition);
              }
              static sum(items) {
                return items.reduce((sum, x) => sum + x);
              }
              static dot(m1, m2) {
                return maths.mulMatrix(m1, m2);
              }
              static vectorLen(v) {
                return Math.hypot(...v);
              }
              static divItems(items, divisor) {
                return items.map((x) => x / divisor);
              }
              static squareItems(items) {
                return items.map((x) => x * x);
              }
              static normalize(v) {
                return this.divItems(v, this.vectorLen(v));
              }
            }
            class bezier {
              static q(ctrlPoly, t) {
                var tx = 1 - t;
                var pA = maths.mulItems(ctrlPoly[0], tx * tx * tx), pB = maths.mulItems(ctrlPoly[1], 3 * tx * tx * t), pC = maths.mulItems(ctrlPoly[2], 3 * tx * t * t), pD = maths.mulItems(ctrlPoly[3], t * t * t);
                return maths.addArrays(maths.addArrays(pA, pB), maths.addArrays(pC, pD));
              }
              static qprime(ctrlPoly, t) {
                var tx = 1 - t;
                var pA = maths.mulItems(maths.subtract(ctrlPoly[1], ctrlPoly[0]), 3 * tx * tx), pB = maths.mulItems(maths.subtract(ctrlPoly[2], ctrlPoly[1]), 6 * tx * t), pC = maths.mulItems(maths.subtract(ctrlPoly[3], ctrlPoly[2]), 3 * t * t);
                return maths.addArrays(maths.addArrays(pA, pB), pC);
              }
              static qprimeprime(ctrlPoly, t) {
                return maths.addArrays(maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[2], maths.mulItems(ctrlPoly[1], 2)), ctrlPoly[0]), 6 * (1 - t)), maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[3], maths.mulItems(ctrlPoly[2], 2)), ctrlPoly[1]), 6 * t));
              }
            }
            module2.exports = fitCurve;
            module2.exports.fitCubic = fitCubic;
            module2.exports.createTangent = createTangent;
          },
          /* 27 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            var _appendElement, appendElement_fn, _setDimensions, setDimensions_fn, _setAnnotationCanvasMap, setAnnotationCanvasMap_fn;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.AnnotationLayer = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _display_utils2 = __w_pdfjs_require__2(8);
            var _annotation_storage2 = __w_pdfjs_require__2(5);
            var _scripting_utils = __w_pdfjs_require__2(28);
            var _xfa_layer = __w_pdfjs_require__2(29);
            const DEFAULT_TAB_INDEX = 1e3;
            const DEFAULT_FONT_SIZE = 9;
            const GetElementsByNameSet = /* @__PURE__ */ new WeakSet();
            function getRectDims(rect) {
              return {
                width: rect[2] - rect[0],
                height: rect[3] - rect[1]
              };
            }
            class AnnotationElementFactory {
              static create(parameters) {
                const subtype = parameters.data.annotationType;
                switch (subtype) {
                  case _util2.AnnotationType.LINK:
                    return new LinkAnnotationElement(parameters);
                  case _util2.AnnotationType.TEXT:
                    return new TextAnnotationElement(parameters);
                  case _util2.AnnotationType.WIDGET:
                    const fieldType = parameters.data.fieldType;
                    switch (fieldType) {
                      case "Tx":
                        return new TextWidgetAnnotationElement(parameters);
                      case "Btn":
                        if (parameters.data.radioButton) {
                          return new RadioButtonWidgetAnnotationElement(parameters);
                        } else if (parameters.data.checkBox) {
                          return new CheckboxWidgetAnnotationElement(parameters);
                        }
                        return new PushButtonWidgetAnnotationElement(parameters);
                      case "Ch":
                        return new ChoiceWidgetAnnotationElement(parameters);
                    }
                    return new WidgetAnnotationElement(parameters);
                  case _util2.AnnotationType.POPUP:
                    return new PopupAnnotationElement(parameters);
                  case _util2.AnnotationType.FREETEXT:
                    return new FreeTextAnnotationElement(parameters);
                  case _util2.AnnotationType.LINE:
                    return new LineAnnotationElement(parameters);
                  case _util2.AnnotationType.SQUARE:
                    return new SquareAnnotationElement(parameters);
                  case _util2.AnnotationType.CIRCLE:
                    return new CircleAnnotationElement(parameters);
                  case _util2.AnnotationType.POLYLINE:
                    return new PolylineAnnotationElement(parameters);
                  case _util2.AnnotationType.CARET:
                    return new CaretAnnotationElement(parameters);
                  case _util2.AnnotationType.INK:
                    return new InkAnnotationElement(parameters);
                  case _util2.AnnotationType.POLYGON:
                    return new PolygonAnnotationElement(parameters);
                  case _util2.AnnotationType.HIGHLIGHT:
                    return new HighlightAnnotationElement(parameters);
                  case _util2.AnnotationType.UNDERLINE:
                    return new UnderlineAnnotationElement(parameters);
                  case _util2.AnnotationType.SQUIGGLY:
                    return new SquigglyAnnotationElement(parameters);
                  case _util2.AnnotationType.STRIKEOUT:
                    return new StrikeOutAnnotationElement(parameters);
                  case _util2.AnnotationType.STAMP:
                    return new StampAnnotationElement(parameters);
                  case _util2.AnnotationType.FILEATTACHMENT:
                    return new FileAttachmentAnnotationElement(parameters);
                  default:
                    return new AnnotationElement(parameters);
                }
              }
            }
            class AnnotationElement {
              constructor(parameters, {
                isRenderable = false,
                ignoreBorder = false,
                createQuadrilaterals = false
              } = {}) {
                this.isRenderable = isRenderable;
                this.data = parameters.data;
                this.layer = parameters.layer;
                this.page = parameters.page;
                this.viewport = parameters.viewport;
                this.linkService = parameters.linkService;
                this.downloadManager = parameters.downloadManager;
                this.imageResourcesPath = parameters.imageResourcesPath;
                this.renderForms = parameters.renderForms;
                this.svgFactory = parameters.svgFactory;
                this.annotationStorage = parameters.annotationStorage;
                this.enableScripting = parameters.enableScripting;
                this.hasJSActions = parameters.hasJSActions;
                this._fieldObjects = parameters.fieldObjects;
                this._mouseState = parameters.mouseState;
                if (isRenderable) {
                  this.container = this._createContainer(ignoreBorder);
                }
                if (createQuadrilaterals) {
                  this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
                }
              }
              _createContainer(ignoreBorder = false) {
                const data = this.data, page = this.page, viewport2 = this.viewport;
                const container = document.createElement("section");
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const [pageLLx, pageLLy, pageURx, pageURy] = viewport2.viewBox;
                const pageWidth = pageURx - pageLLx;
                const pageHeight = pageURy - pageLLy;
                container.setAttribute("data-annotation-id", data.id);
                const rect = _util2.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);
                if (!ignoreBorder && data.borderStyle.width > 0) {
                  container.style.borderWidth = `${data.borderStyle.width}px`;
                  const horizontalRadius = data.borderStyle.horizontalCornerRadius;
                  const verticalRadius = data.borderStyle.verticalCornerRadius;
                  if (horizontalRadius > 0 || verticalRadius > 0) {
                    const radius = `calc(${horizontalRadius}px * var(--scale-factor)) / calc(${verticalRadius}px * var(--scale-factor))`;
                    container.style.borderRadius = radius;
                  } else if (this instanceof RadioButtonWidgetAnnotationElement) {
                    const radius = `calc(${width}px * var(--scale-factor)) / calc(${height}px * var(--scale-factor))`;
                    container.style.borderRadius = radius;
                  }
                  switch (data.borderStyle.style) {
                    case _util2.AnnotationBorderStyleType.SOLID:
                      container.style.borderStyle = "solid";
                      break;
                    case _util2.AnnotationBorderStyleType.DASHED:
                      container.style.borderStyle = "dashed";
                      break;
                    case _util2.AnnotationBorderStyleType.BEVELED:
                      (0, _util2.warn)("Unimplemented border style: beveled");
                      break;
                    case _util2.AnnotationBorderStyleType.INSET:
                      (0, _util2.warn)("Unimplemented border style: inset");
                      break;
                    case _util2.AnnotationBorderStyleType.UNDERLINE:
                      container.style.borderBottomStyle = "solid";
                      break;
                  }
                  const borderColor = data.borderColor || null;
                  if (borderColor) {
                    container.style.borderColor = _util2.Util.makeHexColor(borderColor[0] | 0, borderColor[1] | 0, borderColor[2] | 0);
                  } else {
                    container.style.borderWidth = 0;
                  }
                }
                container.style.left = `${100 * (rect[0] - pageLLx) / pageWidth}%`;
                container.style.top = `${100 * (rect[1] - pageLLy) / pageHeight}%`;
                const {
                  rotation
                } = data;
                if (data.hasOwnCanvas || rotation === 0) {
                  container.style.width = `${100 * width / pageWidth}%`;
                  container.style.height = `${100 * height / pageHeight}%`;
                } else {
                  this.setRotation(rotation, container);
                }
                return container;
              }
              setRotation(angle, container = this.container) {
                const [pageLLx, pageLLy, pageURx, pageURy] = this.viewport.viewBox;
                const pageWidth = pageURx - pageLLx;
                const pageHeight = pageURy - pageLLy;
                const {
                  width,
                  height
                } = getRectDims(this.data.rect);
                let elementWidth, elementHeight;
                if (angle % 180 === 0) {
                  elementWidth = 100 * width / pageWidth;
                  elementHeight = 100 * height / pageHeight;
                } else {
                  elementWidth = 100 * height / pageWidth;
                  elementHeight = 100 * width / pageHeight;
                }
                container.style.width = `${elementWidth}%`;
                container.style.height = `${elementHeight}%`;
                container.setAttribute("data-main-rotation", (360 - angle) % 360);
              }
              get _commonActions() {
                const setColor = (jsName, styleName, event) => {
                  const color = event.detail[jsName];
                  event.target.style[styleName] = _scripting_utils.ColorConverters[`${color[0]}_HTML`](color.slice(1));
                };
                return (0, _util2.shadow)(this, "_commonActions", {
                  display: (event) => {
                    const hidden = event.detail.display % 2 === 1;
                    this.container.style.visibility = hidden ? "hidden" : "visible";
                    this.annotationStorage.setValue(this.data.id, {
                      hidden,
                      print: event.detail.display === 0 || event.detail.display === 3
                    });
                  },
                  print: (event) => {
                    this.annotationStorage.setValue(this.data.id, {
                      print: event.detail.print
                    });
                  },
                  hidden: (event) => {
                    this.container.style.visibility = event.detail.hidden ? "hidden" : "visible";
                    this.annotationStorage.setValue(this.data.id, {
                      hidden: event.detail.hidden
                    });
                  },
                  focus: (event) => {
                    setTimeout(() => event.target.focus({
                      preventScroll: false
                    }), 0);
                  },
                  userName: (event) => {
                    event.target.title = event.detail.userName;
                  },
                  readonly: (event) => {
                    if (event.detail.readonly) {
                      event.target.setAttribute("readonly", "");
                    } else {
                      event.target.removeAttribute("readonly");
                    }
                  },
                  required: (event) => {
                    this._setRequired(event.target, event.detail.required);
                  },
                  bgColor: (event) => {
                    setColor("bgColor", "backgroundColor", event);
                  },
                  fillColor: (event) => {
                    setColor("fillColor", "backgroundColor", event);
                  },
                  fgColor: (event) => {
                    setColor("fgColor", "color", event);
                  },
                  textColor: (event) => {
                    setColor("textColor", "color", event);
                  },
                  borderColor: (event) => {
                    setColor("borderColor", "borderColor", event);
                  },
                  strokeColor: (event) => {
                    setColor("strokeColor", "borderColor", event);
                  },
                  rotation: (event) => {
                    const angle = event.detail.rotation;
                    this.setRotation(angle);
                    this.annotationStorage.setValue(this.data.id, {
                      rotation: angle
                    });
                  }
                });
              }
              _dispatchEventFromSandbox(actions, jsEvent) {
                const commonActions = this._commonActions;
                for (const name of Object.keys(jsEvent.detail)) {
                  const action = actions[name] || commonActions[name];
                  if (action) {
                    action(jsEvent);
                  }
                }
              }
              _setDefaultPropertiesFromJS(element) {
                if (!this.enableScripting) {
                  return;
                }
                const storedData = this.annotationStorage.getRawValue(this.data.id);
                if (!storedData) {
                  return;
                }
                const commonActions = this._commonActions;
                for (const [actionName, detail] of Object.entries(storedData)) {
                  const action = commonActions[actionName];
                  if (action) {
                    const eventProxy = {
                      detail: {
                        [actionName]: detail
                      },
                      target: element
                    };
                    action(eventProxy);
                    delete storedData[actionName];
                  }
                }
              }
              _createQuadrilaterals(ignoreBorder = false) {
                if (!this.data.quadPoints) {
                  return null;
                }
                const quadrilaterals = [];
                const savedRect = this.data.rect;
                for (const quadPoint of this.data.quadPoints) {
                  this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
                  quadrilaterals.push(this._createContainer(ignoreBorder));
                }
                this.data.rect = savedRect;
                return quadrilaterals;
              }
              _createPopup(trigger, data) {
                let container = this.container;
                if (this.quadrilaterals) {
                  trigger = trigger || this.quadrilaterals;
                  container = this.quadrilaterals[0];
                }
                if (!trigger) {
                  trigger = document.createElement("div");
                  trigger.className = "popupTriggerArea";
                  container.append(trigger);
                }
                const popupElement = new PopupElement({
                  container,
                  trigger,
                  color: data.color,
                  titleObj: data.titleObj,
                  modificationDate: data.modificationDate,
                  contentsObj: data.contentsObj,
                  richText: data.richText,
                  hideWrapper: true
                });
                const popup = popupElement.render();
                popup.style.left = "100%";
                container.append(popup);
              }
              _renderQuadrilaterals(className) {
                for (const quadrilateral of this.quadrilaterals) {
                  quadrilateral.className = className;
                }
                return this.quadrilaterals;
              }
              render() {
                (0, _util2.unreachable)("Abstract method `AnnotationElement.render` called");
              }
              _getElementsByName(name, skipId = null) {
                const fields = [];
                if (this._fieldObjects) {
                  const fieldObj = this._fieldObjects[name];
                  if (fieldObj) {
                    for (const {
                      page,
                      id,
                      exportValues
                    } of fieldObj) {
                      if (page === -1) {
                        continue;
                      }
                      if (id === skipId) {
                        continue;
                      }
                      const exportValue = typeof exportValues === "string" ? exportValues : null;
                      const domElement = document.querySelector(`[data-element-id="${id}"]`);
                      if (domElement && !GetElementsByNameSet.has(domElement)) {
                        (0, _util2.warn)(`_getElementsByName - element not allowed: ${id}`);
                        continue;
                      }
                      fields.push({
                        id,
                        exportValue,
                        domElement
                      });
                    }
                  }
                  return fields;
                }
                for (const domElement of document.getElementsByName(name)) {
                  const {
                    id,
                    exportValue
                  } = domElement;
                  if (id === skipId) {
                    continue;
                  }
                  if (!GetElementsByNameSet.has(domElement)) {
                    continue;
                  }
                  fields.push({
                    id,
                    exportValue,
                    domElement
                  });
                }
                return fields;
              }
              static get platform() {
                const platform = typeof navigator !== "undefined" ? navigator.platform : "";
                return (0, _util2.shadow)(this, "platform", {
                  isWin: platform.includes("Win"),
                  isMac: platform.includes("Mac")
                });
              }
            }
            class LinkAnnotationElement extends AnnotationElement {
              constructor(parameters, options = null) {
                super(parameters, {
                  isRenderable: true,
                  ignoreBorder: !!(options == null ? void 0 : options.ignoreBorder),
                  createQuadrilaterals: true
                });
                this.isTooltipOnly = parameters.data.isTooltipOnly;
              }
              render() {
                const {
                  data,
                  linkService
                } = this;
                const link = document.createElement("a");
                link.setAttribute("data-element-id", data.id);
                let isBound = false;
                if (data.url) {
                  linkService.addLinkAttributes(link, data.url, data.newWindow);
                  isBound = true;
                } else if (data.action) {
                  this._bindNamedAction(link, data.action);
                  isBound = true;
                } else if (data.dest) {
                  this._bindLink(link, data.dest);
                  isBound = true;
                } else {
                  if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
                    this._bindJSAction(link, data);
                    isBound = true;
                  }
                  if (data.resetForm) {
                    this._bindResetFormAction(link, data.resetForm);
                    isBound = true;
                  } else if (this.isTooltipOnly && !isBound) {
                    this._bindLink(link, "");
                    isBound = true;
                  }
                }
                if (this.quadrilaterals) {
                  return this._renderQuadrilaterals("linkAnnotation").map((quadrilateral, index) => {
                    const linkElement = index === 0 ? link : link.cloneNode();
                    quadrilateral.append(linkElement);
                    return quadrilateral;
                  });
                }
                this.container.className = "linkAnnotation";
                if (isBound) {
                  this.container.append(link);
                }
                return this.container;
              }
              _bindLink(link, destination) {
                link.href = this.linkService.getDestinationHash(destination);
                link.onclick = () => {
                  if (destination) {
                    this.linkService.goToDestination(destination);
                  }
                  return false;
                };
                if (destination || destination === "") {
                  link.className = "internalLink";
                }
              }
              _bindNamedAction(link, action) {
                link.href = this.linkService.getAnchorUrl("");
                link.onclick = () => {
                  this.linkService.executeNamedAction(action);
                  return false;
                };
                link.className = "internalLink";
              }
              _bindJSAction(link, data) {
                link.href = this.linkService.getAnchorUrl("");
                const map = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
                for (const name of Object.keys(data.actions)) {
                  const jsName = map.get(name);
                  if (!jsName) {
                    continue;
                  }
                  link[jsName] = () => {
                    var _a;
                    (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: data.id,
                        name
                      }
                    });
                    return false;
                  };
                }
                if (!link.onclick) {
                  link.onclick = () => false;
                }
                link.className = "internalLink";
              }
              _bindResetFormAction(link, resetForm) {
                const otherClickAction = link.onclick;
                if (!otherClickAction) {
                  link.href = this.linkService.getAnchorUrl("");
                }
                link.className = "internalLink";
                if (!this._fieldObjects) {
                  (0, _util2.warn)(`_bindResetFormAction - "resetForm" action not supported, ensure that the \`fieldObjects\` parameter is provided.`);
                  if (!otherClickAction) {
                    link.onclick = () => false;
                  }
                  return;
                }
                link.onclick = () => {
                  var _a;
                  if (otherClickAction) {
                    otherClickAction();
                  }
                  const {
                    fields: resetFormFields,
                    refs: resetFormRefs,
                    include
                  } = resetForm;
                  const allFields = [];
                  if (resetFormFields.length !== 0 || resetFormRefs.length !== 0) {
                    const fieldIds = new Set(resetFormRefs);
                    for (const fieldName of resetFormFields) {
                      const fields = this._fieldObjects[fieldName] || [];
                      for (const {
                        id
                      } of fields) {
                        fieldIds.add(id);
                      }
                    }
                    for (const fields of Object.values(this._fieldObjects)) {
                      for (const field of fields) {
                        if (fieldIds.has(field.id) === include) {
                          allFields.push(field);
                        }
                      }
                    }
                  } else {
                    for (const fields of Object.values(this._fieldObjects)) {
                      allFields.push(...fields);
                    }
                  }
                  const storage = this.annotationStorage;
                  const allIds = [];
                  for (const field of allFields) {
                    const {
                      id
                    } = field;
                    allIds.push(id);
                    switch (field.type) {
                      case "text": {
                        const value = field.defaultValue || "";
                        storage.setValue(id, {
                          value
                        });
                        break;
                      }
                      case "checkbox":
                      case "radiobutton": {
                        const value = field.defaultValue === field.exportValues;
                        storage.setValue(id, {
                          value
                        });
                        break;
                      }
                      case "combobox":
                      case "listbox": {
                        const value = field.defaultValue || "";
                        storage.setValue(id, {
                          value
                        });
                        break;
                      }
                      default:
                        continue;
                    }
                    const domElement = document.querySelector(`[data-element-id="${id}"]`);
                    if (!domElement) {
                      continue;
                    } else if (!GetElementsByNameSet.has(domElement)) {
                      (0, _util2.warn)(`_bindResetFormAction - element not allowed: ${id}`);
                      continue;
                    }
                    domElement.dispatchEvent(new Event("resetform"));
                  }
                  if (this.enableScripting) {
                    (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: "app",
                        ids: allIds,
                        name: "ResetForm"
                      }
                    });
                  }
                  return false;
                };
              }
            }
            class TextAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable
                });
              }
              render() {
                this.container.className = "textAnnotation";
                const image = document.createElement("img");
                image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
                image.alt = "[{{type}} Annotation]";
                image.dataset.l10nId = "text_annotation_type";
                image.dataset.l10nArgs = JSON.stringify({
                  type: this.data.name
                });
                if (!this.data.hasPopup) {
                  this._createPopup(image, this.data);
                }
                this.container.append(image);
                return this.container;
              }
            }
            class WidgetAnnotationElement extends AnnotationElement {
              render() {
                if (this.data.alternativeText) {
                  this.container.title = this.data.alternativeText;
                }
                return this.container;
              }
              _getKeyModifier(event) {
                const {
                  isWin,
                  isMac
                } = AnnotationElement.platform;
                return isWin && event.ctrlKey || isMac && event.metaKey;
              }
              _setEventListener(element, baseName, eventName, valueGetter) {
                if (baseName.includes("mouse")) {
                  element.addEventListener(baseName, (event) => {
                    var _a;
                    (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: this.data.id,
                        name: eventName,
                        value: valueGetter(event),
                        shift: event.shiftKey,
                        modifier: this._getKeyModifier(event)
                      }
                    });
                  });
                } else {
                  element.addEventListener(baseName, (event) => {
                    var _a;
                    (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: this.data.id,
                        name: eventName,
                        value: valueGetter(event)
                      }
                    });
                  });
                }
              }
              _setEventListeners(element, names, getter) {
                var _a;
                for (const [baseName, eventName] of names) {
                  if (eventName === "Action" || ((_a = this.data.actions) == null ? void 0 : _a[eventName])) {
                    this._setEventListener(element, baseName, eventName, getter);
                  }
                }
              }
              _setBackgroundColor(element) {
                const color = this.data.backgroundColor || null;
                element.style.backgroundColor = color === null ? "transparent" : _util2.Util.makeHexColor(color[0], color[1], color[2]);
              }
              _setTextStyle(element) {
                const TEXT_ALIGNMENT = ["left", "center", "right"];
                const {
                  fontColor
                } = this.data.defaultAppearanceData;
                const fontSize = this.data.defaultAppearanceData.fontSize || DEFAULT_FONT_SIZE;
                const style = element.style;
                let computedFontSize;
                if (this.data.multiLine) {
                  const height = Math.abs(this.data.rect[3] - this.data.rect[1]);
                  const numberOfLines = Math.round(height / (_util2.LINE_FACTOR * fontSize)) || 1;
                  const lineHeight = height / numberOfLines;
                  computedFontSize = Math.min(fontSize, Math.round(lineHeight / _util2.LINE_FACTOR));
                } else {
                  const height = Math.abs(this.data.rect[3] - this.data.rect[1]);
                  computedFontSize = Math.min(fontSize, Math.round(height / _util2.LINE_FACTOR));
                }
                style.fontSize = `calc(${computedFontSize}px * var(--scale-factor))`;
                style.color = _util2.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);
                if (this.data.textAlignment !== null) {
                  style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
                }
              }
              _setRequired(element, isRequired) {
                if (isRequired) {
                  element.setAttribute("required", true);
                } else {
                  element.removeAttribute("required");
                }
                element.setAttribute("aria-required", isRequired);
              }
            }
            class TextWidgetAnnotationElement extends WidgetAnnotationElement {
              constructor(parameters) {
                const isRenderable = parameters.renderForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
                super(parameters, {
                  isRenderable
                });
              }
              setPropertyOnSiblings(base, key, value, keyInStorage) {
                const storage = this.annotationStorage;
                for (const element of this._getElementsByName(base.name, base.id)) {
                  if (element.domElement) {
                    element.domElement[key] = value;
                  }
                  storage.setValue(element.id, {
                    [keyInStorage]: value
                  });
                }
              }
              render() {
                var _a;
                const storage = this.annotationStorage;
                const id = this.data.id;
                this.container.className = "textWidgetAnnotation";
                let element = null;
                if (this.renderForms) {
                  const storedData = storage.getValue(id, {
                    value: this.data.fieldValue
                  });
                  let textContent = storedData.formattedValue || storedData.value || "";
                  const maxLen = storage.getValue(id, {
                    charLimit: this.data.maxLen
                  }).charLimit;
                  if (maxLen && textContent.length > maxLen) {
                    textContent = textContent.slice(0, maxLen);
                  }
                  const elementData = {
                    userValue: textContent,
                    formattedValue: null,
                    valueOnFocus: ""
                  };
                  if (this.data.multiLine) {
                    element = document.createElement("textarea");
                    element.textContent = textContent;
                    if (this.data.doNotScroll) {
                      element.style.overflowY = "hidden";
                    }
                  } else {
                    element = document.createElement("input");
                    element.type = "text";
                    element.setAttribute("value", textContent);
                    if (this.data.doNotScroll) {
                      element.style.overflowX = "hidden";
                    }
                  }
                  GetElementsByNameSet.add(element);
                  element.setAttribute("data-element-id", id);
                  element.disabled = this.data.readOnly;
                  element.name = this.data.fieldName;
                  element.tabIndex = DEFAULT_TAB_INDEX;
                  this._setRequired(element, this.data.required);
                  if (maxLen) {
                    element.maxLength = maxLen;
                  }
                  element.addEventListener("input", (event) => {
                    storage.setValue(id, {
                      value: event.target.value
                    });
                    this.setPropertyOnSiblings(element, "value", event.target.value, "value");
                  });
                  element.addEventListener("resetform", (event) => {
                    const defaultValue = this.data.defaultFieldValue ?? "";
                    element.value = elementData.userValue = defaultValue;
                    elementData.formattedValue = null;
                  });
                  let blurListener = (event) => {
                    const {
                      formattedValue
                    } = elementData;
                    if (formattedValue !== null && formattedValue !== void 0) {
                      event.target.value = formattedValue;
                    }
                    event.target.scrollLeft = 0;
                  };
                  if (this.enableScripting && this.hasJSActions) {
                    element.addEventListener("focus", (event) => {
                      if (elementData.userValue) {
                        event.target.value = elementData.userValue;
                      }
                      elementData.valueOnFocus = event.target.value;
                    });
                    element.addEventListener("updatefromsandbox", (jsEvent) => {
                      const actions = {
                        value(event) {
                          elementData.userValue = event.detail.value ?? "";
                          storage.setValue(id, {
                            value: elementData.userValue.toString()
                          });
                          event.target.value = elementData.userValue;
                        },
                        formattedValue(event) {
                          const {
                            formattedValue
                          } = event.detail;
                          elementData.formattedValue = formattedValue;
                          if (formattedValue !== null && formattedValue !== void 0 && event.target !== document.activeElement) {
                            event.target.value = formattedValue;
                          }
                          storage.setValue(id, {
                            formattedValue
                          });
                        },
                        selRange(event) {
                          event.target.setSelectionRange(...event.detail.selRange);
                        },
                        charLimit: (event) => {
                          var _a2;
                          const {
                            charLimit
                          } = event.detail;
                          const {
                            target
                          } = event;
                          if (charLimit === 0) {
                            target.removeAttribute("maxLength");
                            return;
                          }
                          target.setAttribute("maxLength", charLimit);
                          let value = elementData.userValue;
                          if (!value || value.length <= charLimit) {
                            return;
                          }
                          value = value.slice(0, charLimit);
                          target.value = elementData.userValue = value;
                          storage.setValue(id, {
                            value
                          });
                          (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
                            source: this,
                            detail: {
                              id,
                              name: "Keystroke",
                              value,
                              willCommit: true,
                              commitKey: 1,
                              selStart: target.selectionStart,
                              selEnd: target.selectionEnd
                            }
                          });
                        }
                      };
                      this._dispatchEventFromSandbox(actions, jsEvent);
                    });
                    element.addEventListener("keydown", (event) => {
                      var _a2;
                      let commitKey = -1;
                      if (event.key === "Escape") {
                        commitKey = 0;
                      } else if (event.key === "Enter") {
                        commitKey = 2;
                      } else if (event.key === "Tab") {
                        commitKey = 3;
                      }
                      if (commitKey === -1) {
                        return;
                      }
                      const {
                        value
                      } = event.target;
                      if (elementData.valueOnFocus === value) {
                        return;
                      }
                      elementData.userValue = value;
                      (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
                        source: this,
                        detail: {
                          id,
                          name: "Keystroke",
                          value,
                          willCommit: true,
                          commitKey,
                          selStart: event.target.selectionStart,
                          selEnd: event.target.selectionEnd
                        }
                      });
                    });
                    const _blurListener = blurListener;
                    blurListener = null;
                    element.addEventListener("blur", (event) => {
                      var _a2;
                      const {
                        value
                      } = event.target;
                      elementData.userValue = value;
                      if (this._mouseState.isDown && elementData.valueOnFocus !== value) {
                        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
                          source: this,
                          detail: {
                            id,
                            name: "Keystroke",
                            value,
                            willCommit: true,
                            commitKey: 1,
                            selStart: event.target.selectionStart,
                            selEnd: event.target.selectionEnd
                          }
                        });
                      }
                      _blurListener(event);
                    });
                    if ((_a = this.data.actions) == null ? void 0 : _a.Keystroke) {
                      element.addEventListener("beforeinput", (event) => {
                        var _a2;
                        const {
                          data,
                          target
                        } = event;
                        const {
                          value,
                          selectionStart,
                          selectionEnd
                        } = target;
                        let selStart = selectionStart, selEnd = selectionEnd;
                        switch (event.inputType) {
                          case "deleteWordBackward": {
                            const match = value.substring(0, selectionStart).match(/\w*[^\w]*$/);
                            if (match) {
                              selStart -= match[0].length;
                            }
                            break;
                          }
                          case "deleteWordForward": {
                            const match = value.substring(selectionStart).match(/^[^\w]*\w*/);
                            if (match) {
                              selEnd += match[0].length;
                            }
                            break;
                          }
                          case "deleteContentBackward":
                            if (selectionStart === selectionEnd) {
                              selStart -= 1;
                            }
                            break;
                          case "deleteContentForward":
                            if (selectionStart === selectionEnd) {
                              selEnd += 1;
                            }
                            break;
                        }
                        event.preventDefault();
                        (_a2 = this.linkService.eventBus) == null ? void 0 : _a2.dispatch("dispatcheventinsandbox", {
                          source: this,
                          detail: {
                            id,
                            name: "Keystroke",
                            value,
                            change: data || "",
                            willCommit: false,
                            selStart,
                            selEnd
                          }
                        });
                      });
                    }
                    this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.value);
                  }
                  if (blurListener) {
                    element.addEventListener("blur", blurListener);
                  }
                  if (this.data.comb) {
                    const fieldWidth = this.data.rect[2] - this.data.rect[0];
                    const combWidth = fieldWidth / maxLen;
                    element.classList.add("comb");
                    element.style.letterSpacing = `calc(${combWidth}px * var(--scale-factor) - 1ch)`;
                  }
                } else {
                  element = document.createElement("div");
                  element.textContent = this.data.fieldValue;
                  element.style.verticalAlign = "middle";
                  element.style.display = "table-cell";
                }
                this._setTextStyle(element);
                this._setBackgroundColor(element);
                this._setDefaultPropertiesFromJS(element);
                this.container.append(element);
                return this.container;
              }
            }
            class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
              constructor(parameters) {
                super(parameters, {
                  isRenderable: parameters.renderForms
                });
              }
              render() {
                const storage = this.annotationStorage;
                const data = this.data;
                const id = data.id;
                let value = storage.getValue(id, {
                  value: data.exportValue === data.fieldValue
                }).value;
                if (typeof value === "string") {
                  value = value !== "Off";
                  storage.setValue(id, {
                    value
                  });
                }
                this.container.className = "buttonWidgetAnnotation checkBox";
                const element = document.createElement("input");
                GetElementsByNameSet.add(element);
                element.setAttribute("data-element-id", id);
                element.disabled = data.readOnly;
                this._setRequired(element, this.data.required);
                element.type = "checkbox";
                element.name = data.fieldName;
                if (value) {
                  element.setAttribute("checked", true);
                }
                element.setAttribute("exportValue", data.exportValue);
                element.tabIndex = DEFAULT_TAB_INDEX;
                element.addEventListener("change", (event) => {
                  const {
                    name,
                    checked
                  } = event.target;
                  for (const checkbox of this._getElementsByName(name, id)) {
                    const curChecked = checked && checkbox.exportValue === data.exportValue;
                    if (checkbox.domElement) {
                      checkbox.domElement.checked = curChecked;
                    }
                    storage.setValue(checkbox.id, {
                      value: curChecked
                    });
                  }
                  storage.setValue(id, {
                    value: checked
                  });
                });
                element.addEventListener("resetform", (event) => {
                  const defaultValue = data.defaultFieldValue || "Off";
                  event.target.checked = defaultValue === data.exportValue;
                });
                if (this.enableScripting && this.hasJSActions) {
                  element.addEventListener("updatefromsandbox", (jsEvent) => {
                    const actions = {
                      value(event) {
                        event.target.checked = event.detail.value !== "Off";
                        storage.setValue(id, {
                          value: event.target.checked
                        });
                      }
                    };
                    this._dispatchEventFromSandbox(actions, jsEvent);
                  });
                  this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.checked);
                }
                this._setBackgroundColor(element);
                this._setDefaultPropertiesFromJS(element);
                this.container.append(element);
                return this.container;
              }
            }
            class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
              constructor(parameters) {
                super(parameters, {
                  isRenderable: parameters.renderForms
                });
              }
              render() {
                this.container.className = "buttonWidgetAnnotation radioButton";
                const storage = this.annotationStorage;
                const data = this.data;
                const id = data.id;
                let value = storage.getValue(id, {
                  value: data.fieldValue === data.buttonValue
                }).value;
                if (typeof value === "string") {
                  value = value !== data.buttonValue;
                  storage.setValue(id, {
                    value
                  });
                }
                const element = document.createElement("input");
                GetElementsByNameSet.add(element);
                element.setAttribute("data-element-id", id);
                element.disabled = data.readOnly;
                this._setRequired(element, this.data.required);
                element.type = "radio";
                element.name = data.fieldName;
                if (value) {
                  element.setAttribute("checked", true);
                }
                element.tabIndex = DEFAULT_TAB_INDEX;
                element.addEventListener("change", (event) => {
                  const {
                    name,
                    checked
                  } = event.target;
                  for (const radio of this._getElementsByName(name, id)) {
                    storage.setValue(radio.id, {
                      value: false
                    });
                  }
                  storage.setValue(id, {
                    value: checked
                  });
                });
                element.addEventListener("resetform", (event) => {
                  const defaultValue = data.defaultFieldValue;
                  event.target.checked = defaultValue !== null && defaultValue !== void 0 && defaultValue === data.buttonValue;
                });
                if (this.enableScripting && this.hasJSActions) {
                  const pdfButtonValue = data.buttonValue;
                  element.addEventListener("updatefromsandbox", (jsEvent) => {
                    const actions = {
                      value: (event) => {
                        const checked = pdfButtonValue === event.detail.value;
                        for (const radio of this._getElementsByName(event.target.name)) {
                          const curChecked = checked && radio.id === id;
                          if (radio.domElement) {
                            radio.domElement.checked = curChecked;
                          }
                          storage.setValue(radio.id, {
                            value: curChecked
                          });
                        }
                      }
                    };
                    this._dispatchEventFromSandbox(actions, jsEvent);
                  });
                  this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (event) => event.target.checked);
                }
                this._setBackgroundColor(element);
                this._setDefaultPropertiesFromJS(element);
                this.container.append(element);
                return this.container;
              }
            }
            class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
              constructor(parameters) {
                super(parameters, {
                  ignoreBorder: parameters.data.hasAppearance
                });
              }
              render() {
                const container = super.render();
                container.className = "buttonWidgetAnnotation pushButton";
                if (this.data.alternativeText) {
                  container.title = this.data.alternativeText;
                }
                const linkElement = container.lastChild;
                if (this.enableScripting && this.hasJSActions && linkElement) {
                  this._setDefaultPropertiesFromJS(linkElement);
                  linkElement.addEventListener("updatefromsandbox", (jsEvent) => {
                    this._dispatchEventFromSandbox({}, jsEvent);
                  });
                }
                return container;
              }
            }
            class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
              constructor(parameters) {
                super(parameters, {
                  isRenderable: parameters.renderForms
                });
              }
              render() {
                this.container.className = "choiceWidgetAnnotation";
                const storage = this.annotationStorage;
                const id = this.data.id;
                const storedData = storage.getValue(id, {
                  value: this.data.fieldValue
                });
                const selectElement = document.createElement("select");
                GetElementsByNameSet.add(selectElement);
                selectElement.setAttribute("data-element-id", id);
                selectElement.disabled = this.data.readOnly;
                this._setRequired(selectElement, this.data.required);
                selectElement.name = this.data.fieldName;
                selectElement.tabIndex = DEFAULT_TAB_INDEX;
                let addAnEmptyEntry = this.data.combo && this.data.options.length > 0;
                if (!this.data.combo) {
                  selectElement.size = this.data.options.length;
                  if (this.data.multiSelect) {
                    selectElement.multiple = true;
                  }
                }
                selectElement.addEventListener("resetform", (event) => {
                  const defaultValue = this.data.defaultFieldValue;
                  for (const option of selectElement.options) {
                    option.selected = option.value === defaultValue;
                  }
                });
                for (const option of this.data.options) {
                  const optionElement = document.createElement("option");
                  optionElement.textContent = option.displayValue;
                  optionElement.value = option.exportValue;
                  if (storedData.value.includes(option.exportValue)) {
                    optionElement.setAttribute("selected", true);
                    addAnEmptyEntry = false;
                  }
                  selectElement.append(optionElement);
                }
                let removeEmptyEntry = null;
                if (addAnEmptyEntry) {
                  const noneOptionElement = document.createElement("option");
                  noneOptionElement.value = " ";
                  noneOptionElement.setAttribute("hidden", true);
                  noneOptionElement.setAttribute("selected", true);
                  selectElement.prepend(noneOptionElement);
                  removeEmptyEntry = () => {
                    noneOptionElement.remove();
                    selectElement.removeEventListener("input", removeEmptyEntry);
                    removeEmptyEntry = null;
                  };
                  selectElement.addEventListener("input", removeEmptyEntry);
                }
                const getValue = (event, isExport) => {
                  const name = isExport ? "value" : "textContent";
                  const options = event.target.options;
                  if (!event.target.multiple) {
                    return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
                  }
                  return Array.prototype.filter.call(options, (option) => option.selected).map((option) => option[name]);
                };
                const getItems = (event) => {
                  const options = event.target.options;
                  return Array.prototype.map.call(options, (option) => {
                    return {
                      displayValue: option.textContent,
                      exportValue: option.value
                    };
                  });
                };
                if (this.enableScripting && this.hasJSActions) {
                  selectElement.addEventListener("updatefromsandbox", (jsEvent) => {
                    const actions = {
                      value(event) {
                        removeEmptyEntry == null ? void 0 : removeEmptyEntry();
                        const value = event.detail.value;
                        const values = new Set(Array.isArray(value) ? value : [value]);
                        for (const option of selectElement.options) {
                          option.selected = values.has(option.value);
                        }
                        storage.setValue(id, {
                          value: getValue(event, true)
                        });
                      },
                      multipleSelection(event) {
                        selectElement.multiple = true;
                      },
                      remove(event) {
                        const options = selectElement.options;
                        const index = event.detail.remove;
                        options[index].selected = false;
                        selectElement.remove(index);
                        if (options.length > 0) {
                          const i = Array.prototype.findIndex.call(options, (option) => option.selected);
                          if (i === -1) {
                            options[0].selected = true;
                          }
                        }
                        storage.setValue(id, {
                          value: getValue(event, true),
                          items: getItems(event)
                        });
                      },
                      clear(event) {
                        while (selectElement.length !== 0) {
                          selectElement.remove(0);
                        }
                        storage.setValue(id, {
                          value: null,
                          items: []
                        });
                      },
                      insert(event) {
                        const {
                          index,
                          displayValue,
                          exportValue
                        } = event.detail.insert;
                        const selectChild = selectElement.children[index];
                        const optionElement = document.createElement("option");
                        optionElement.textContent = displayValue;
                        optionElement.value = exportValue;
                        if (selectChild) {
                          selectChild.before(optionElement);
                        } else {
                          selectElement.append(optionElement);
                        }
                        storage.setValue(id, {
                          value: getValue(event, true),
                          items: getItems(event)
                        });
                      },
                      items(event) {
                        const {
                          items
                        } = event.detail;
                        while (selectElement.length !== 0) {
                          selectElement.remove(0);
                        }
                        for (const item of items) {
                          const {
                            displayValue,
                            exportValue
                          } = item;
                          const optionElement = document.createElement("option");
                          optionElement.textContent = displayValue;
                          optionElement.value = exportValue;
                          selectElement.append(optionElement);
                        }
                        if (selectElement.options.length > 0) {
                          selectElement.options[0].selected = true;
                        }
                        storage.setValue(id, {
                          value: getValue(event, true),
                          items: getItems(event)
                        });
                      },
                      indices(event) {
                        const indices = new Set(event.detail.indices);
                        for (const option of event.target.options) {
                          option.selected = indices.has(option.index);
                        }
                        storage.setValue(id, {
                          value: getValue(event, true)
                        });
                      },
                      editable(event) {
                        event.target.disabled = !event.detail.editable;
                      }
                    };
                    this._dispatchEventFromSandbox(actions, jsEvent);
                  });
                  selectElement.addEventListener("input", (event) => {
                    var _a;
                    const exportValue = getValue(event, true);
                    const value = getValue(event, false);
                    storage.setValue(id, {
                      value: exportValue
                    });
                    (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id,
                        name: "Keystroke",
                        value,
                        changeEx: exportValue,
                        willCommit: true,
                        commitKey: 1,
                        keyDown: false
                      }
                    });
                  });
                  this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], (event) => event.target.checked);
                } else {
                  selectElement.addEventListener("input", function(event) {
                    storage.setValue(id, {
                      value: getValue(event, true)
                    });
                  });
                }
                if (this.data.combo) {
                  this._setTextStyle(selectElement);
                }
                this._setBackgroundColor(selectElement);
                this._setDefaultPropertiesFromJS(selectElement);
                this.container.append(selectElement);
                return this.container;
              }
            }
            class PopupAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable
                });
              }
              render() {
                const IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
                this.container.className = "popupAnnotation";
                if (IGNORE_TYPES.includes(this.data.parentType)) {
                  return this.container;
                }
                const selector = `[data-annotation-id="${this.data.parentId}"]`;
                const parentElements = this.layer.querySelectorAll(selector);
                if (parentElements.length === 0) {
                  return this.container;
                }
                const popup = new PopupElement({
                  container: this.container,
                  trigger: Array.from(parentElements),
                  color: this.data.color,
                  titleObj: this.data.titleObj,
                  modificationDate: this.data.modificationDate,
                  contentsObj: this.data.contentsObj,
                  richText: this.data.richText
                });
                const page = this.page;
                const rect = _util2.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);
                const popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
                const popupTop = rect[1];
                const [pageLLx, pageLLy, pageURx, pageURy] = this.viewport.viewBox;
                const pageWidth = pageURx - pageLLx;
                const pageHeight = pageURy - pageLLy;
                this.container.style.left = `${100 * (popupLeft - pageLLx) / pageWidth}%`;
                this.container.style.top = `${100 * (popupTop - pageLLy) / pageHeight}%`;
                this.container.append(popup.render());
                return this.container;
              }
            }
            class PopupElement {
              constructor(parameters) {
                this.container = parameters.container;
                this.trigger = parameters.trigger;
                this.color = parameters.color;
                this.titleObj = parameters.titleObj;
                this.modificationDate = parameters.modificationDate;
                this.contentsObj = parameters.contentsObj;
                this.richText = parameters.richText;
                this.hideWrapper = parameters.hideWrapper || false;
                this.pinned = false;
              }
              render() {
                var _a, _b;
                const BACKGROUND_ENLIGHT = 0.7;
                const wrapper = document.createElement("div");
                wrapper.className = "popupWrapper";
                this.hideElement = this.hideWrapper ? wrapper : this.container;
                this.hideElement.hidden = true;
                const popup = document.createElement("div");
                popup.className = "popup";
                const color = this.color;
                if (color) {
                  const r2 = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
                  const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
                  const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
                  popup.style.backgroundColor = _util2.Util.makeHexColor(r2 | 0, g | 0, b | 0);
                }
                const title = document.createElement("h1");
                title.dir = this.titleObj.dir;
                title.textContent = this.titleObj.str;
                popup.append(title);
                const dateObject = _display_utils2.PDFDateString.toDateObject(this.modificationDate);
                if (dateObject) {
                  const modificationDate = document.createElement("span");
                  modificationDate.className = "popupDate";
                  modificationDate.textContent = "{{date}}, {{time}}";
                  modificationDate.dataset.l10nId = "annotation_date_string";
                  modificationDate.dataset.l10nArgs = JSON.stringify({
                    date: dateObject.toLocaleDateString(),
                    time: dateObject.toLocaleTimeString()
                  });
                  popup.append(modificationDate);
                }
                if (((_a = this.richText) == null ? void 0 : _a.str) && (!((_b = this.contentsObj) == null ? void 0 : _b.str) || this.contentsObj.str === this.richText.str)) {
                  _xfa_layer.XfaLayer.render({
                    xfaHtml: this.richText.html,
                    intent: "richText",
                    div: popup
                  });
                  popup.lastChild.className = "richText popupContent";
                } else {
                  const contents = this._formatContents(this.contentsObj);
                  popup.append(contents);
                }
                if (!Array.isArray(this.trigger)) {
                  this.trigger = [this.trigger];
                }
                for (const element of this.trigger) {
                  element.addEventListener("click", this._toggle.bind(this));
                  element.addEventListener("mouseover", this._show.bind(this, false));
                  element.addEventListener("mouseout", this._hide.bind(this, false));
                }
                popup.addEventListener("click", this._hide.bind(this, true));
                wrapper.append(popup);
                return wrapper;
              }
              _formatContents({
                str,
                dir
              }) {
                const p = document.createElement("p");
                p.className = "popupContent";
                p.dir = dir;
                const lines = str.split(/(?:\r\n?|\n)/);
                for (let i = 0, ii = lines.length; i < ii; ++i) {
                  const line = lines[i];
                  p.append(document.createTextNode(line));
                  if (i < ii - 1) {
                    p.append(document.createElement("br"));
                  }
                }
                return p;
              }
              _toggle() {
                if (this.pinned) {
                  this._hide(true);
                } else {
                  this._show(true);
                }
              }
              _show(pin = false) {
                if (pin) {
                  this.pinned = true;
                }
                if (this.hideElement.hidden) {
                  this.hideElement.hidden = false;
                  this.container.style.zIndex = parseInt(this.container.style.zIndex) + 1e3;
                }
              }
              _hide(unpin = true) {
                if (unpin) {
                  this.pinned = false;
                }
                if (!this.hideElement.hidden && !this.pinned) {
                  this.hideElement.hidden = true;
                  this.container.style.zIndex = parseInt(this.container.style.zIndex) - 1e3;
                }
              }
            }
            class FreeTextAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
                this.textContent = parameters.data.textContent;
              }
              render() {
                this.container.className = "freeTextAnnotation";
                if (this.textContent) {
                  const content = document.createElement("div");
                  content.className = "annotationTextContent";
                  content.setAttribute("role", "comment");
                  for (const line of this.textContent) {
                    const lineSpan = document.createElement("span");
                    lineSpan.textContent = line;
                    content.append(lineSpan);
                  }
                  this.container.append(content);
                }
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                return this.container;
              }
            }
            class LineAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
              }
              render() {
                this.container.className = "lineAnnotation";
                const data = this.data;
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const svg = this.svgFactory.create(width, height, true);
                const line = this.svgFactory.createElement("svg:line");
                line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
                line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
                line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
                line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
                line.setAttribute("stroke-width", data.borderStyle.width || 1);
                line.setAttribute("stroke", "transparent");
                line.setAttribute("fill", "transparent");
                svg.append(line);
                this.container.append(svg);
                this._createPopup(line, data);
                return this.container;
              }
            }
            class SquareAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
              }
              render() {
                this.container.className = "squareAnnotation";
                const data = this.data;
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const svg = this.svgFactory.create(width, height, true);
                const borderWidth = data.borderStyle.width;
                const square = this.svgFactory.createElement("svg:rect");
                square.setAttribute("x", borderWidth / 2);
                square.setAttribute("y", borderWidth / 2);
                square.setAttribute("width", width - borderWidth);
                square.setAttribute("height", height - borderWidth);
                square.setAttribute("stroke-width", borderWidth || 1);
                square.setAttribute("stroke", "transparent");
                square.setAttribute("fill", "transparent");
                svg.append(square);
                this.container.append(svg);
                this._createPopup(square, data);
                return this.container;
              }
            }
            class CircleAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
              }
              render() {
                this.container.className = "circleAnnotation";
                const data = this.data;
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const svg = this.svgFactory.create(width, height, true);
                const borderWidth = data.borderStyle.width;
                const circle = this.svgFactory.createElement("svg:ellipse");
                circle.setAttribute("cx", width / 2);
                circle.setAttribute("cy", height / 2);
                circle.setAttribute("rx", width / 2 - borderWidth / 2);
                circle.setAttribute("ry", height / 2 - borderWidth / 2);
                circle.setAttribute("stroke-width", borderWidth || 1);
                circle.setAttribute("stroke", "transparent");
                circle.setAttribute("fill", "transparent");
                svg.append(circle);
                this.container.append(svg);
                this._createPopup(circle, data);
                return this.container;
              }
            }
            class PolylineAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
                this.containerClassName = "polylineAnnotation";
                this.svgElementName = "svg:polyline";
              }
              render() {
                this.container.className = this.containerClassName;
                const data = this.data;
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const svg = this.svgFactory.create(width, height, true);
                let points = [];
                for (const coordinate of data.vertices) {
                  const x = coordinate.x - data.rect[0];
                  const y = data.rect[3] - coordinate.y;
                  points.push(x + "," + y);
                }
                points = points.join(" ");
                const polyline = this.svgFactory.createElement(this.svgElementName);
                polyline.setAttribute("points", points);
                polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
                polyline.setAttribute("stroke", "transparent");
                polyline.setAttribute("fill", "transparent");
                svg.append(polyline);
                this.container.append(svg);
                this._createPopup(polyline, data);
                return this.container;
              }
            }
            class PolygonAnnotationElement extends PolylineAnnotationElement {
              constructor(parameters) {
                super(parameters);
                this.containerClassName = "polygonAnnotation";
                this.svgElementName = "svg:polygon";
              }
            }
            class CaretAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
              }
              render() {
                this.container.className = "caretAnnotation";
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                return this.container;
              }
            }
            class InkAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
                this.containerClassName = "inkAnnotation";
                this.svgElementName = "svg:polyline";
              }
              render() {
                this.container.className = this.containerClassName;
                const data = this.data;
                const {
                  width,
                  height
                } = getRectDims(data.rect);
                const svg = this.svgFactory.create(width, height, true);
                for (const inkList of data.inkLists) {
                  let points = [];
                  for (const coordinate of inkList) {
                    const x = coordinate.x - data.rect[0];
                    const y = data.rect[3] - coordinate.y;
                    points.push(`${x},${y}`);
                  }
                  points = points.join(" ");
                  const polyline = this.svgFactory.createElement(this.svgElementName);
                  polyline.setAttribute("points", points);
                  polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
                  polyline.setAttribute("stroke", "transparent");
                  polyline.setAttribute("fill", "transparent");
                  this._createPopup(polyline, data);
                  svg.append(polyline);
                }
                this.container.append(svg);
                return this.container;
              }
            }
            class HighlightAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true,
                  createQuadrilaterals: true
                });
              }
              render() {
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                if (this.quadrilaterals) {
                  return this._renderQuadrilaterals("highlightAnnotation");
                }
                this.container.className = "highlightAnnotation";
                return this.container;
              }
            }
            class UnderlineAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true,
                  createQuadrilaterals: true
                });
              }
              render() {
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                if (this.quadrilaterals) {
                  return this._renderQuadrilaterals("underlineAnnotation");
                }
                this.container.className = "underlineAnnotation";
                return this.container;
              }
            }
            class SquigglyAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true,
                  createQuadrilaterals: true
                });
              }
              render() {
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                if (this.quadrilaterals) {
                  return this._renderQuadrilaterals("squigglyAnnotation");
                }
                this.container.className = "squigglyAnnotation";
                return this.container;
              }
            }
            class StrikeOutAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true,
                  createQuadrilaterals: true
                });
              }
              render() {
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                if (this.quadrilaterals) {
                  return this._renderQuadrilaterals("strikeoutAnnotation");
                }
                this.container.className = "strikeoutAnnotation";
                return this.container;
              }
            }
            class StampAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a, _b, _c;
                const isRenderable = !!(parameters.data.hasPopup || ((_a = parameters.data.titleObj) == null ? void 0 : _a.str) || ((_b = parameters.data.contentsObj) == null ? void 0 : _b.str) || ((_c = parameters.data.richText) == null ? void 0 : _c.str));
                super(parameters, {
                  isRenderable,
                  ignoreBorder: true
                });
              }
              render() {
                this.container.className = "stampAnnotation";
                if (!this.data.hasPopup) {
                  this._createPopup(null, this.data);
                }
                return this.container;
              }
            }
            class FileAttachmentAnnotationElement extends AnnotationElement {
              constructor(parameters) {
                var _a;
                super(parameters, {
                  isRenderable: true
                });
                const {
                  filename,
                  content
                } = this.data.file;
                this.filename = (0, _display_utils2.getFilenameFromUrl)(filename);
                this.content = content;
                (_a = this.linkService.eventBus) == null ? void 0 : _a.dispatch("fileattachmentannotation", {
                  source: this,
                  filename,
                  content
                });
              }
              render() {
                var _a, _b;
                this.container.className = "fileAttachmentAnnotation";
                const trigger = document.createElement("div");
                trigger.className = "popupTriggerArea";
                trigger.addEventListener("dblclick", this._download.bind(this));
                if (!this.data.hasPopup && (((_a = this.data.titleObj) == null ? void 0 : _a.str) || ((_b = this.data.contentsObj) == null ? void 0 : _b.str) || this.data.richText)) {
                  this._createPopup(trigger, this.data);
                }
                this.container.append(trigger);
                return this.container;
              }
              _download() {
                var _a;
                (_a = this.downloadManager) == null ? void 0 : _a.openOrDownloadData(this.container, this.content, this.filename);
              }
            }
            const _AnnotationLayer = class {
              static render(parameters) {
                var _a, _b;
                const {
                  annotations,
                  div,
                  viewport: viewport2,
                  accessibilityManager
                } = parameters;
                __privateMethod(this, _setDimensions, setDimensions_fn).call(this, div, viewport2);
                let zIndex = 0;
                for (const data of annotations) {
                  if (data.annotationType !== _util2.AnnotationType.POPUP) {
                    const {
                      width,
                      height
                    } = getRectDims(data.rect);
                    if (width <= 0 || height <= 0) {
                      continue;
                    }
                  }
                  const element = AnnotationElementFactory.create({
                    data,
                    layer: div,
                    page: parameters.page,
                    viewport: viewport2,
                    linkService: parameters.linkService,
                    downloadManager: parameters.downloadManager,
                    imageResourcesPath: parameters.imageResourcesPath || "",
                    renderForms: parameters.renderForms !== false,
                    svgFactory: new _display_utils2.DOMSVGFactory(),
                    annotationStorage: parameters.annotationStorage || new _annotation_storage2.AnnotationStorage(),
                    enableScripting: parameters.enableScripting,
                    hasJSActions: parameters.hasJSActions,
                    fieldObjects: parameters.fieldObjects,
                    mouseState: parameters.mouseState || {
                      isDown: false
                    }
                  });
                  if (element.isRenderable) {
                    const rendered = element.render();
                    if (data.hidden) {
                      rendered.style.visibility = "hidden";
                    }
                    if (Array.isArray(rendered)) {
                      for (const renderedElement of rendered) {
                        renderedElement.style.zIndex = zIndex++;
                        __privateMethod(_a = _AnnotationLayer, _appendElement, appendElement_fn).call(_a, renderedElement, data.id, div, accessibilityManager);
                      }
                    } else {
                      rendered.style.zIndex = zIndex++;
                      if (element instanceof PopupAnnotationElement) {
                        div.prepend(rendered);
                      } else {
                        __privateMethod(_b = _AnnotationLayer, _appendElement, appendElement_fn).call(_b, rendered, data.id, div, accessibilityManager);
                      }
                    }
                  }
                }
                __privateMethod(this, _setAnnotationCanvasMap, setAnnotationCanvasMap_fn).call(this, div, parameters.annotationCanvasMap);
              }
              static update(parameters) {
                const {
                  annotationCanvasMap,
                  div,
                  viewport: viewport2
                } = parameters;
                __privateMethod(this, _setDimensions, setDimensions_fn).call(this, div, viewport2);
                __privateMethod(this, _setAnnotationCanvasMap, setAnnotationCanvasMap_fn).call(this, div, annotationCanvasMap);
                div.hidden = false;
              }
            };
            let AnnotationLayer3 = _AnnotationLayer;
            _appendElement = new WeakSet();
            appendElement_fn = function(element, id, div, accessibilityManager) {
              const contentElement = element.firstChild || element;
              contentElement.id = `${_display_utils2.AnnotationPrefix}${id}`;
              div.append(element);
              accessibilityManager == null ? void 0 : accessibilityManager.moveElementInDOM(div, element, contentElement, false);
            };
            _setDimensions = new WeakSet();
            setDimensions_fn = function(div, {
              width,
              height,
              rotation
            }) {
              const {
                style
              } = div;
              const flipOrientation = rotation % 180 !== 0, widthStr = Math.floor(width) + "px", heightStr = Math.floor(height) + "px";
              style.width = flipOrientation ? heightStr : widthStr;
              style.height = flipOrientation ? widthStr : heightStr;
              div.setAttribute("data-main-rotation", rotation);
            };
            _setAnnotationCanvasMap = new WeakSet();
            setAnnotationCanvasMap_fn = function(div, annotationCanvasMap) {
              if (!annotationCanvasMap) {
                return;
              }
              for (const [id, canvas] of annotationCanvasMap) {
                const element = div.querySelector(`[data-annotation-id="${id}"]`);
                if (!element) {
                  continue;
                }
                const {
                  firstChild
                } = element;
                if (!firstChild) {
                  element.append(canvas);
                } else if (firstChild.nodeName === "CANVAS") {
                  firstChild.replaceWith(canvas);
                } else {
                  firstChild.before(canvas);
                }
              }
              annotationCanvasMap.clear();
            };
            __privateAdd(AnnotationLayer3, _appendElement);
            __privateAdd(AnnotationLayer3, _setDimensions);
            __privateAdd(AnnotationLayer3, _setAnnotationCanvasMap);
            exports2.AnnotationLayer = AnnotationLayer3;
          },
          /* 28 */
          /***/
          (__unused_webpack_module2, exports2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.ColorConverters = void 0;
            function makeColorComp(n) {
              return Math.floor(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
            }
            class ColorConverters {
              static CMYK_G([c, y, m, k]) {
                return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k)];
              }
              static G_CMYK([g]) {
                return ["CMYK", 0, 0, 0, 1 - g];
              }
              static G_RGB([g]) {
                return ["RGB", g, g, g];
              }
              static G_HTML([g]) {
                const G = makeColorComp(g);
                return `#${G}${G}${G}`;
              }
              static RGB_G([r2, g, b]) {
                return ["G", 0.3 * r2 + 0.59 * g + 0.11 * b];
              }
              static RGB_HTML([r2, g, b]) {
                const R = makeColorComp(r2);
                const G = makeColorComp(g);
                const B = makeColorComp(b);
                return `#${R}${G}${B}`;
              }
              static T_HTML() {
                return "#00000000";
              }
              static CMYK_RGB([c, y, m, k]) {
                return ["RGB", 1 - Math.min(1, c + k), 1 - Math.min(1, m + k), 1 - Math.min(1, y + k)];
              }
              static CMYK_HTML(components) {
                const rgb = this.CMYK_RGB(components).slice(1);
                return this.RGB_HTML(rgb);
              }
              static RGB_CMYK([r2, g, b]) {
                const c = 1 - r2;
                const m = 1 - g;
                const y = 1 - b;
                const k = Math.min(c, m, y);
                return ["CMYK", c, m, y, k];
              }
            }
            exports2.ColorConverters = ColorConverters;
          },
          /* 29 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.XfaLayer = void 0;
            var _xfa_text2 = __w_pdfjs_require__2(20);
            class XfaLayer {
              static setupStorage(html, id, element, storage, intent) {
                const storedData = storage.getValue(id, {
                  value: null
                });
                switch (element.name) {
                  case "textarea":
                    if (storedData.value !== null) {
                      html.textContent = storedData.value;
                    }
                    if (intent === "print") {
                      break;
                    }
                    html.addEventListener("input", (event) => {
                      storage.setValue(id, {
                        value: event.target.value
                      });
                    });
                    break;
                  case "input":
                    if (element.attributes.type === "radio" || element.attributes.type === "checkbox") {
                      if (storedData.value === element.attributes.xfaOn) {
                        html.setAttribute("checked", true);
                      } else if (storedData.value === element.attributes.xfaOff) {
                        html.removeAttribute("checked");
                      }
                      if (intent === "print") {
                        break;
                      }
                      html.addEventListener("change", (event) => {
                        storage.setValue(id, {
                          value: event.target.checked ? event.target.getAttribute("xfaOn") : event.target.getAttribute("xfaOff")
                        });
                      });
                    } else {
                      if (storedData.value !== null) {
                        html.setAttribute("value", storedData.value);
                      }
                      if (intent === "print") {
                        break;
                      }
                      html.addEventListener("input", (event) => {
                        storage.setValue(id, {
                          value: event.target.value
                        });
                      });
                    }
                    break;
                  case "select":
                    if (storedData.value !== null) {
                      for (const option of element.children) {
                        if (option.attributes.value === storedData.value) {
                          option.attributes.selected = true;
                        }
                      }
                    }
                    html.addEventListener("input", (event) => {
                      const options = event.target.options;
                      const value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
                      storage.setValue(id, {
                        value
                      });
                    });
                    break;
                }
              }
              static setAttributes({
                html,
                element,
                storage = null,
                intent,
                linkService
              }) {
                const {
                  attributes
                } = element;
                const isHTMLAnchorElement = html instanceof HTMLAnchorElement;
                if (attributes.type === "radio") {
                  attributes.name = `${attributes.name}-${intent}`;
                }
                for (const [key, value] of Object.entries(attributes)) {
                  if (value === null || value === void 0) {
                    continue;
                  }
                  switch (key) {
                    case "class":
                      if (value.length) {
                        html.setAttribute(key, value.join(" "));
                      }
                      break;
                    case "dataId":
                      break;
                    case "id":
                      html.setAttribute("data-element-id", value);
                      break;
                    case "style":
                      Object.assign(html.style, value);
                      break;
                    case "textContent":
                      html.textContent = value;
                      break;
                    default:
                      if (!isHTMLAnchorElement || key !== "href" && key !== "newWindow") {
                        html.setAttribute(key, value);
                      }
                  }
                }
                if (isHTMLAnchorElement) {
                  linkService.addLinkAttributes(html, attributes.href, attributes.newWindow);
                }
                if (storage && attributes.dataId) {
                  this.setupStorage(html, attributes.dataId, element, storage);
                }
              }
              static render(parameters) {
                var _a;
                const storage = parameters.annotationStorage;
                const linkService = parameters.linkService;
                const root = parameters.xfaHtml;
                const intent = parameters.intent || "display";
                const rootHtml = document.createElement(root.name);
                if (root.attributes) {
                  this.setAttributes({
                    html: rootHtml,
                    element: root,
                    intent,
                    linkService
                  });
                }
                const stack = [[root, -1, rootHtml]];
                const rootDiv = parameters.div;
                rootDiv.append(rootHtml);
                if (parameters.viewport) {
                  const transform = `matrix(${parameters.viewport.transform.join(",")})`;
                  rootDiv.style.transform = transform;
                }
                if (intent !== "richText") {
                  rootDiv.setAttribute("class", "xfaLayer xfaFont");
                }
                const textDivs = [];
                while (stack.length > 0) {
                  const [parent, i, html] = stack.at(-1);
                  if (i + 1 === parent.children.length) {
                    stack.pop();
                    continue;
                  }
                  const child = parent.children[++stack.at(-1)[1]];
                  if (child === null) {
                    continue;
                  }
                  const {
                    name
                  } = child;
                  if (name === "#text") {
                    const node = document.createTextNode(child.value);
                    textDivs.push(node);
                    html.append(node);
                    continue;
                  }
                  let childHtml;
                  if ((_a = child == null ? void 0 : child.attributes) == null ? void 0 : _a.xmlns) {
                    childHtml = document.createElementNS(child.attributes.xmlns, name);
                  } else {
                    childHtml = document.createElement(name);
                  }
                  html.append(childHtml);
                  if (child.attributes) {
                    this.setAttributes({
                      html: childHtml,
                      element: child,
                      storage,
                      intent,
                      linkService
                    });
                  }
                  if (child.children && child.children.length > 0) {
                    stack.push([child, -1, childHtml]);
                  } else if (child.value) {
                    const node = document.createTextNode(child.value);
                    if (_xfa_text2.XfaText.shouldBuildText(name)) {
                      textDivs.push(node);
                    }
                    childHtml.append(node);
                  }
                }
                for (const el of rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea")) {
                  el.setAttribute("readOnly", true);
                }
                return {
                  textDivs
                };
              }
              static update(parameters) {
                const transform = `matrix(${parameters.viewport.transform.join(",")})`;
                parameters.div.style.transform = transform;
                parameters.div.hidden = false;
              }
            }
            exports2.XfaLayer = XfaLayer;
          },
          /* 30 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.TextLayerRenderTask = void 0;
            exports2.renderTextLayer = renderTextLayer;
            var _util2 = __w_pdfjs_require__2(1);
            var _display_utils2 = __w_pdfjs_require__2(8);
            const MAX_TEXT_DIVS_TO_RENDER = 1e5;
            const DEFAULT_FONT_SIZE = 30;
            const DEFAULT_FONT_ASCENT = 0.8;
            const ascentCache = /* @__PURE__ */ new Map();
            const AllWhitespaceRegexp = /^\s+$/g;
            function getAscent(fontFamily, ctx) {
              const cachedAscent = ascentCache.get(fontFamily);
              if (cachedAscent) {
                return cachedAscent;
              }
              ctx.save();
              ctx.font = `${DEFAULT_FONT_SIZE}px ${fontFamily}`;
              const metrics = ctx.measureText("");
              let ascent = metrics.fontBoundingBoxAscent;
              let descent = Math.abs(metrics.fontBoundingBoxDescent);
              if (ascent) {
                ctx.restore();
                const ratio = ascent / (ascent + descent);
                ascentCache.set(fontFamily, ratio);
                return ratio;
              }
              ctx.strokeStyle = "red";
              ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
              ctx.strokeText("g", 0, 0);
              let pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
              descent = 0;
              for (let i = pixels.length - 1 - 3; i >= 0; i -= 4) {
                if (pixels[i] > 0) {
                  descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE);
                  break;
                }
              }
              ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
              ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
              pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
              ascent = 0;
              for (let i = 0, ii = pixels.length; i < ii; i += 4) {
                if (pixels[i] > 0) {
                  ascent = DEFAULT_FONT_SIZE - Math.floor(i / 4 / DEFAULT_FONT_SIZE);
                  break;
                }
              }
              ctx.restore();
              if (ascent) {
                const ratio = ascent / (ascent + descent);
                ascentCache.set(fontFamily, ratio);
                return ratio;
              }
              ascentCache.set(fontFamily, DEFAULT_FONT_ASCENT);
              return DEFAULT_FONT_ASCENT;
            }
            function appendText(task, geom, styles, ctx) {
              const textDiv = document.createElement("span");
              const textDivProperties = task._enhanceTextSelection ? {
                angle: 0,
                canvasWidth: 0,
                hasText: geom.str !== "",
                hasEOL: geom.hasEOL,
                originalTransform: null,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                scale: 1,
                fontSize: 0
              } : {
                angle: 0,
                canvasWidth: 0,
                hasText: geom.str !== "",
                hasEOL: geom.hasEOL,
                fontSize: 0
              };
              task._textDivs.push(textDiv);
              const tx = _util2.Util.transform(task._viewport.transform, geom.transform);
              let angle = Math.atan2(tx[1], tx[0]);
              const style = styles[geom.fontName];
              if (style.vertical) {
                angle += Math.PI / 2;
              }
              const fontHeight = Math.hypot(tx[2], tx[3]);
              const fontAscent = fontHeight * getAscent(style.fontFamily, ctx);
              let left2, top2;
              if (angle === 0) {
                left2 = tx[4];
                top2 = tx[5] - fontAscent;
              } else {
                left2 = tx[4] + fontAscent * Math.sin(angle);
                top2 = tx[5] - fontAscent * Math.cos(angle);
              }
              textDiv.style.left = `${left2}px`;
              textDiv.style.top = `${top2}px`;
              textDiv.style.fontSize = `${fontHeight}px`;
              textDiv.style.fontFamily = style.fontFamily;
              textDivProperties.fontSize = fontHeight;
              textDiv.setAttribute("role", "presentation");
              textDiv.textContent = geom.str;
              textDiv.dir = geom.dir;
              if (task._fontInspectorEnabled) {
                textDiv.dataset.fontName = geom.fontName;
              }
              if (angle !== 0) {
                textDivProperties.angle = angle * (180 / Math.PI);
              }
              let shouldScaleText = false;
              if (geom.str.length > 1 || task._enhanceTextSelection && AllWhitespaceRegexp.test(geom.str)) {
                shouldScaleText = true;
              } else if (geom.str !== " " && geom.transform[0] !== geom.transform[3]) {
                const absScaleX = Math.abs(geom.transform[0]), absScaleY = Math.abs(geom.transform[3]);
                if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY) / Math.min(absScaleX, absScaleY) > 1.5) {
                  shouldScaleText = true;
                }
              }
              if (shouldScaleText) {
                if (style.vertical) {
                  textDivProperties.canvasWidth = geom.height * task._viewport.scale;
                } else {
                  textDivProperties.canvasWidth = geom.width * task._viewport.scale;
                }
              }
              task._textDivProperties.set(textDiv, textDivProperties);
              if (task._textContentStream) {
                task._layoutText(textDiv);
              }
              if (task._enhanceTextSelection && textDivProperties.hasText) {
                let angleCos = 1, angleSin = 0;
                if (angle !== 0) {
                  angleCos = Math.cos(angle);
                  angleSin = Math.sin(angle);
                }
                const divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
                const divHeight = fontHeight;
                let m, b;
                if (angle !== 0) {
                  m = [angleCos, angleSin, -angleSin, angleCos, left2, top2];
                  b = _util2.Util.getAxialAlignedBoundingBox([0, 0, divWidth, divHeight], m);
                } else {
                  b = [left2, top2, left2 + divWidth, top2 + divHeight];
                }
                task._bounds.push({
                  left: b[0],
                  top: b[1],
                  right: b[2],
                  bottom: b[3],
                  div: textDiv,
                  size: [divWidth, divHeight],
                  m
                });
              }
            }
            function render(task) {
              if (task._canceled) {
                return;
              }
              const textDivs = task._textDivs;
              const capability = task._capability;
              const textDivsLength = textDivs.length;
              if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
                task._renderingDone = true;
                capability.resolve();
                return;
              }
              if (!task._textContentStream) {
                for (let i = 0; i < textDivsLength; i++) {
                  task._layoutText(textDivs[i]);
                }
              }
              task._renderingDone = true;
              capability.resolve();
            }
            function findPositiveMin(ts, offset2, count) {
              let result = 0;
              for (let i = 0; i < count; i++) {
                const t = ts[offset2++];
                if (t > 0) {
                  result = result ? Math.min(t, result) : t;
                }
              }
              return result;
            }
            function expand(task) {
              const bounds = task._bounds;
              const viewport2 = task._viewport;
              const expanded = expandBounds(viewport2.width, viewport2.height, bounds);
              for (let i = 0; i < expanded.length; i++) {
                const div = bounds[i].div;
                const divProperties = task._textDivProperties.get(div);
                if (divProperties.angle === 0) {
                  divProperties.paddingLeft = bounds[i].left - expanded[i].left;
                  divProperties.paddingTop = bounds[i].top - expanded[i].top;
                  divProperties.paddingRight = expanded[i].right - bounds[i].right;
                  divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;
                  task._textDivProperties.set(div, divProperties);
                  continue;
                }
                const e = expanded[i], b = bounds[i];
                const m = b.m, c = m[0], s = m[1];
                const points = [[0, 0], [0, b.size[1]], [b.size[0], 0], b.size];
                const ts = new Float64Array(64);
                for (let j = 0, jj = points.length; j < jj; j++) {
                  const t = _util2.Util.applyTransform(points[j], m);
                  ts[j + 0] = c && (e.left - t[0]) / c;
                  ts[j + 4] = s && (e.top - t[1]) / s;
                  ts[j + 8] = c && (e.right - t[0]) / c;
                  ts[j + 12] = s && (e.bottom - t[1]) / s;
                  ts[j + 16] = s && (e.left - t[0]) / -s;
                  ts[j + 20] = c && (e.top - t[1]) / c;
                  ts[j + 24] = s && (e.right - t[0]) / -s;
                  ts[j + 28] = c && (e.bottom - t[1]) / c;
                  ts[j + 32] = c && (e.left - t[0]) / -c;
                  ts[j + 36] = s && (e.top - t[1]) / -s;
                  ts[j + 40] = c && (e.right - t[0]) / -c;
                  ts[j + 44] = s && (e.bottom - t[1]) / -s;
                  ts[j + 48] = s && (e.left - t[0]) / s;
                  ts[j + 52] = c && (e.top - t[1]) / -c;
                  ts[j + 56] = s && (e.right - t[0]) / s;
                  ts[j + 60] = c && (e.bottom - t[1]) / -c;
                }
                const boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
                divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
                divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
                divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
                divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;
                task._textDivProperties.set(div, divProperties);
              }
            }
            function expandBounds(width, height, boxes) {
              const bounds = boxes.map(function(box, i) {
                return {
                  x1: box.left,
                  y1: box.top,
                  x2: box.right,
                  y2: box.bottom,
                  index: i,
                  x1New: void 0,
                  x2New: void 0
                };
              });
              expandBoundsLTR(width, bounds);
              const expanded = new Array(boxes.length);
              for (const b of bounds) {
                const i = b.index;
                expanded[i] = {
                  left: b.x1New,
                  top: 0,
                  right: b.x2New,
                  bottom: 0
                };
              }
              boxes.map(function(box, i) {
                const e = expanded[i], b = bounds[i];
                b.x1 = box.top;
                b.y1 = width - e.right;
                b.x2 = box.bottom;
                b.y2 = width - e.left;
                b.index = i;
                b.x1New = void 0;
                b.x2New = void 0;
              });
              expandBoundsLTR(height, bounds);
              for (const b of bounds) {
                const i = b.index;
                expanded[i].top = b.x1New;
                expanded[i].bottom = b.x2New;
              }
              return expanded;
            }
            function expandBoundsLTR(width, bounds) {
              bounds.sort(function(a, b) {
                return a.x1 - b.x1 || a.index - b.index;
              });
              const fakeBoundary = {
                x1: -Infinity,
                y1: -Infinity,
                x2: 0,
                y2: Infinity,
                index: -1,
                x1New: 0,
                x2New: 0
              };
              const horizon = [{
                start: -Infinity,
                end: Infinity,
                boundary: fakeBoundary
              }];
              for (const boundary of bounds) {
                let i = 0;
                while (i < horizon.length && horizon[i].end <= boundary.y1) {
                  i++;
                }
                let j = horizon.length - 1;
                while (j >= 0 && horizon[j].start >= boundary.y2) {
                  j--;
                }
                let horizonPart, affectedBoundary;
                let q, k, maxXNew = -Infinity;
                for (q = i; q <= j; q++) {
                  horizonPart = horizon[q];
                  affectedBoundary = horizonPart.boundary;
                  let xNew;
                  if (affectedBoundary.x2 > boundary.x1) {
                    xNew = affectedBoundary.index > boundary.index ? affectedBoundary.x1New : boundary.x1;
                  } else if (affectedBoundary.x2New === void 0) {
                    xNew = (affectedBoundary.x2 + boundary.x1) / 2;
                  } else {
                    xNew = affectedBoundary.x2New;
                  }
                  if (xNew > maxXNew) {
                    maxXNew = xNew;
                  }
                }
                boundary.x1New = maxXNew;
                for (q = i; q <= j; q++) {
                  horizonPart = horizon[q];
                  affectedBoundary = horizonPart.boundary;
                  if (affectedBoundary.x2New === void 0) {
                    if (affectedBoundary.x2 > boundary.x1) {
                      if (affectedBoundary.index > boundary.index) {
                        affectedBoundary.x2New = affectedBoundary.x2;
                      }
                    } else {
                      affectedBoundary.x2New = maxXNew;
                    }
                  } else if (affectedBoundary.x2New > maxXNew) {
                    affectedBoundary.x2New = Math.max(maxXNew, affectedBoundary.x2);
                  }
                }
                const changedHorizon = [];
                let lastBoundary = null;
                for (q = i; q <= j; q++) {
                  horizonPart = horizon[q];
                  affectedBoundary = horizonPart.boundary;
                  const useBoundary = affectedBoundary.x2 > boundary.x2 ? affectedBoundary : boundary;
                  if (lastBoundary === useBoundary) {
                    changedHorizon.at(-1).end = horizonPart.end;
                  } else {
                    changedHorizon.push({
                      start: horizonPart.start,
                      end: horizonPart.end,
                      boundary: useBoundary
                    });
                    lastBoundary = useBoundary;
                  }
                }
                if (horizon[i].start < boundary.y1) {
                  changedHorizon[0].start = boundary.y1;
                  changedHorizon.unshift({
                    start: horizon[i].start,
                    end: boundary.y1,
                    boundary: horizon[i].boundary
                  });
                }
                if (boundary.y2 < horizon[j].end) {
                  changedHorizon.at(-1).end = boundary.y2;
                  changedHorizon.push({
                    start: boundary.y2,
                    end: horizon[j].end,
                    boundary: horizon[j].boundary
                  });
                }
                for (q = i; q <= j; q++) {
                  horizonPart = horizon[q];
                  affectedBoundary = horizonPart.boundary;
                  if (affectedBoundary.x2New !== void 0) {
                    continue;
                  }
                  let used = false;
                  for (k = i - 1; !used && k >= 0 && horizon[k].start >= affectedBoundary.y1; k--) {
                    used = horizon[k].boundary === affectedBoundary;
                  }
                  for (k = j + 1; !used && k < horizon.length && horizon[k].end <= affectedBoundary.y2; k++) {
                    used = horizon[k].boundary === affectedBoundary;
                  }
                  for (k = 0; !used && k < changedHorizon.length; k++) {
                    used = changedHorizon[k].boundary === affectedBoundary;
                  }
                  if (!used) {
                    affectedBoundary.x2New = maxXNew;
                  }
                }
                Array.prototype.splice.apply(horizon, [i, j - i + 1, ...changedHorizon]);
              }
              for (const horizonPart of horizon) {
                const affectedBoundary = horizonPart.boundary;
                if (affectedBoundary.x2New === void 0) {
                  affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
                }
              }
            }
            class TextLayerRenderTask {
              constructor({
                textContent,
                textContentStream,
                container,
                viewport: viewport2,
                textDivs,
                textContentItemsStr,
                enhanceTextSelection
              }) {
                var _a;
                if (enhanceTextSelection) {
                  (0, _display_utils2.deprecated)("The `enhanceTextSelection` functionality will be removed in the future.");
                }
                this._textContent = textContent;
                this._textContentStream = textContentStream;
                this._container = container;
                this._document = container.ownerDocument;
                this._viewport = viewport2;
                this._textDivs = textDivs || [];
                this._textContentItemsStr = textContentItemsStr || [];
                this._enhanceTextSelection = !!enhanceTextSelection;
                this._fontInspectorEnabled = !!((_a = globalThis.FontInspector) == null ? void 0 : _a.enabled);
                this._reader = null;
                this._layoutTextLastFontSize = null;
                this._layoutTextLastFontFamily = null;
                this._layoutTextCtx = null;
                this._textDivProperties = /* @__PURE__ */ new WeakMap();
                this._renderingDone = false;
                this._canceled = false;
                this._capability = (0, _util2.createPromiseCapability)();
                this._renderTimer = null;
                this._bounds = [];
                this._devicePixelRatio = globalThis.devicePixelRatio || 1;
                this._capability.promise.finally(() => {
                  if (!this._enhanceTextSelection) {
                    this._textDivProperties = null;
                  }
                  if (this._layoutTextCtx) {
                    this._layoutTextCtx.canvas.width = 0;
                    this._layoutTextCtx.canvas.height = 0;
                    this._layoutTextCtx = null;
                  }
                }).catch(() => {
                });
              }
              get promise() {
                return this._capability.promise;
              }
              cancel() {
                this._canceled = true;
                if (this._reader) {
                  this._reader.cancel(new _util2.AbortException("TextLayer task cancelled.")).catch(() => {
                  });
                  this._reader = null;
                }
                if (this._renderTimer !== null) {
                  clearTimeout(this._renderTimer);
                  this._renderTimer = null;
                }
                this._capability.reject(new Error("TextLayer task cancelled."));
              }
              _processItems(items, styleCache) {
                for (let i = 0, len = items.length; i < len; i++) {
                  if (items[i].str === void 0) {
                    if (items[i].type === "beginMarkedContentProps" || items[i].type === "beginMarkedContent") {
                      const parent = this._container;
                      this._container = document.createElement("span");
                      this._container.classList.add("markedContent");
                      if (items[i].id !== null) {
                        this._container.setAttribute("id", `${items[i].id}`);
                      }
                      parent.append(this._container);
                    } else if (items[i].type === "endMarkedContent") {
                      this._container = this._container.parentNode;
                    }
                    continue;
                  }
                  this._textContentItemsStr.push(items[i].str);
                  appendText(this, items[i], styleCache, this._layoutTextCtx);
                }
              }
              _layoutText(textDiv) {
                const textDivProperties = this._textDivProperties.get(textDiv);
                let transform = "";
                if (textDivProperties.canvasWidth !== 0 && textDivProperties.hasText) {
                  const {
                    fontFamily
                  } = textDiv.style;
                  const {
                    fontSize
                  } = textDivProperties;
                  if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
                    this._layoutTextCtx.font = `${fontSize * this._devicePixelRatio}px ${fontFamily}`;
                    this._layoutTextLastFontSize = fontSize;
                    this._layoutTextLastFontFamily = fontFamily;
                  }
                  const {
                    width
                  } = this._layoutTextCtx.measureText(textDiv.textContent);
                  if (width > 0) {
                    const scale = this._devicePixelRatio * textDivProperties.canvasWidth / width;
                    if (this._enhanceTextSelection) {
                      textDivProperties.scale = scale;
                    }
                    transform = `scaleX(${scale})`;
                  }
                }
                if (textDivProperties.angle !== 0) {
                  transform = `rotate(${textDivProperties.angle}deg) ${transform}`;
                }
                if (transform.length > 0) {
                  if (this._enhanceTextSelection) {
                    textDivProperties.originalTransform = transform;
                  }
                  textDiv.style.transform = transform;
                }
                if (textDivProperties.hasText) {
                  this._container.append(textDiv);
                }
                if (textDivProperties.hasEOL) {
                  const br = document.createElement("br");
                  br.setAttribute("role", "presentation");
                  this._container.append(br);
                }
              }
              _render(timeout = 0) {
                const capability = (0, _util2.createPromiseCapability)();
                let styleCache = /* @__PURE__ */ Object.create(null);
                const canvas = this._document.createElement("canvas");
                canvas.height = canvas.width = DEFAULT_FONT_SIZE;
                this._layoutTextCtx = canvas.getContext("2d", {
                  alpha: false
                });
                if (this._textContent) {
                  const textItems = this._textContent.items;
                  const textStyles = this._textContent.styles;
                  this._processItems(textItems, textStyles);
                  capability.resolve();
                } else if (this._textContentStream) {
                  const pump = () => {
                    this._reader.read().then(({
                      value,
                      done
                    }) => {
                      if (done) {
                        capability.resolve();
                        return;
                      }
                      Object.assign(styleCache, value.styles);
                      this._processItems(value.items, styleCache);
                      pump();
                    }, capability.reject);
                  };
                  this._reader = this._textContentStream.getReader();
                  pump();
                } else {
                  throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
                }
                capability.promise.then(() => {
                  styleCache = null;
                  if (!timeout) {
                    render(this);
                  } else {
                    this._renderTimer = setTimeout(() => {
                      render(this);
                      this._renderTimer = null;
                    }, timeout);
                  }
                }, this._capability.reject);
              }
              expandTextDivs(expandDivs = false) {
                if (!this._enhanceTextSelection || !this._renderingDone) {
                  return;
                }
                if (this._bounds !== null) {
                  expand(this);
                  this._bounds = null;
                }
                const transformBuf = [], paddingBuf = [];
                for (let i = 0, ii = this._textDivs.length; i < ii; i++) {
                  const div = this._textDivs[i];
                  const divProps = this._textDivProperties.get(div);
                  if (!divProps.hasText) {
                    continue;
                  }
                  if (expandDivs) {
                    transformBuf.length = 0;
                    paddingBuf.length = 0;
                    if (divProps.originalTransform) {
                      transformBuf.push(divProps.originalTransform);
                    }
                    if (divProps.paddingTop > 0) {
                      paddingBuf.push(`${divProps.paddingTop}px`);
                      transformBuf.push(`translateY(${-divProps.paddingTop}px)`);
                    } else {
                      paddingBuf.push(0);
                    }
                    if (divProps.paddingRight > 0) {
                      paddingBuf.push(`${divProps.paddingRight / divProps.scale}px`);
                    } else {
                      paddingBuf.push(0);
                    }
                    if (divProps.paddingBottom > 0) {
                      paddingBuf.push(`${divProps.paddingBottom}px`);
                    } else {
                      paddingBuf.push(0);
                    }
                    if (divProps.paddingLeft > 0) {
                      paddingBuf.push(`${divProps.paddingLeft / divProps.scale}px`);
                      transformBuf.push(`translateX(${-divProps.paddingLeft / divProps.scale}px)`);
                    } else {
                      paddingBuf.push(0);
                    }
                    div.style.padding = paddingBuf.join(" ");
                    if (transformBuf.length) {
                      div.style.transform = transformBuf.join(" ");
                    }
                  } else {
                    div.style.padding = null;
                    div.style.transform = divProps.originalTransform;
                  }
                }
              }
            }
            exports2.TextLayerRenderTask = TextLayerRenderTask;
            function renderTextLayer(renderParameters) {
              const task = new TextLayerRenderTask({
                textContent: renderParameters.textContent,
                textContentStream: renderParameters.textContentStream,
                container: renderParameters.container,
                viewport: renderParameters.viewport,
                textDivs: renderParameters.textDivs,
                textContentItemsStr: renderParameters.textContentItemsStr,
                enhanceTextSelection: renderParameters.enhanceTextSelection
              });
              task._render(renderParameters.timeout);
              return task;
            }
          },
          /* 31 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.SVGGraphics = void 0;
            var _display_utils2 = __w_pdfjs_require__2(8);
            var _util2 = __w_pdfjs_require__2(1);
            var _is_node2 = __w_pdfjs_require__2(3);
            let SVGGraphics = class {
              constructor() {
                (0, _util2.unreachable)("Not implemented: SVGGraphics");
              }
            };
            exports2.SVGGraphics = SVGGraphics;
            {
              let opListToTree = function(opList) {
                let opTree = [];
                const tmp = [];
                for (const opListElement of opList) {
                  if (opListElement.fn === "save") {
                    opTree.push({
                      fnId: 92,
                      fn: "group",
                      items: []
                    });
                    tmp.push(opTree);
                    opTree = opTree.at(-1).items;
                    continue;
                  }
                  if (opListElement.fn === "restore") {
                    opTree = tmp.pop();
                  } else {
                    opTree.push(opListElement);
                  }
                }
                return opTree;
              }, pf = function(value) {
                if (Number.isInteger(value)) {
                  return value.toString();
                }
                const s = value.toFixed(10);
                let i = s.length - 1;
                if (s[i] !== "0") {
                  return s;
                }
                do {
                  i--;
                } while (s[i] === "0");
                return s.substring(0, s[i] === "." ? i : i + 1);
              }, pm = function(m) {
                if (m[4] === 0 && m[5] === 0) {
                  if (m[1] === 0 && m[2] === 0) {
                    if (m[0] === 1 && m[3] === 1) {
                      return "";
                    }
                    return `scale(${pf(m[0])} ${pf(m[3])})`;
                  }
                  if (m[0] === m[3] && m[1] === -m[2]) {
                    const a = Math.acos(m[0]) * 180 / Math.PI;
                    return `rotate(${pf(a)})`;
                  }
                } else {
                  if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
                    return `translate(${pf(m[4])} ${pf(m[5])})`;
                  }
                }
                return `matrix(${pf(m[0])} ${pf(m[1])} ${pf(m[2])} ${pf(m[3])} ${pf(m[4])} ${pf(m[5])})`;
              };
              const SVG_DEFAULTS = {
                fontStyle: "normal",
                fontWeight: "normal",
                fillColor: "#000000"
              };
              const XML_NS = "http://www.w3.org/XML/1998/namespace";
              const XLINK_NS = "http://www.w3.org/1999/xlink";
              const LINE_CAP_STYLES = ["butt", "round", "square"];
              const LINE_JOIN_STYLES = ["miter", "round", "bevel"];
              const createObjectURL = function(data, contentType = "", forceDataSchema = false) {
                if (URL.createObjectURL && typeof Blob !== "undefined" && !forceDataSchema) {
                  return URL.createObjectURL(new Blob([data], {
                    type: contentType
                  }));
                }
                const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                let buffer = `data:${contentType};base64,`;
                for (let i = 0, ii = data.length; i < ii; i += 3) {
                  const b1 = data[i] & 255;
                  const b2 = data[i + 1] & 255;
                  const b3 = data[i + 2] & 255;
                  const d1 = b1 >> 2, d2 = (b1 & 3) << 4 | b2 >> 4;
                  const d3 = i + 1 < ii ? (b2 & 15) << 2 | b3 >> 6 : 64;
                  const d4 = i + 2 < ii ? b3 & 63 : 64;
                  buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
                }
                return buffer;
              };
              const convertImgDataToPng = function() {
                const PNG_HEADER = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
                const CHUNK_WRAPPER_SIZE = 12;
                const crcTable = new Int32Array(256);
                for (let i = 0; i < 256; i++) {
                  let c = i;
                  for (let h = 0; h < 8; h++) {
                    if (c & 1) {
                      c = 3988292384 ^ c >> 1 & 2147483647;
                    } else {
                      c = c >> 1 & 2147483647;
                    }
                  }
                  crcTable[i] = c;
                }
                function crc32(data, start2, end2) {
                  let crc = -1;
                  for (let i = start2; i < end2; i++) {
                    const a = (crc ^ data[i]) & 255;
                    const b = crcTable[a];
                    crc = crc >>> 8 ^ b;
                  }
                  return crc ^ -1;
                }
                function writePngChunk(type, body, data, offset2) {
                  let p = offset2;
                  const len = body.length;
                  data[p] = len >> 24 & 255;
                  data[p + 1] = len >> 16 & 255;
                  data[p + 2] = len >> 8 & 255;
                  data[p + 3] = len & 255;
                  p += 4;
                  data[p] = type.charCodeAt(0) & 255;
                  data[p + 1] = type.charCodeAt(1) & 255;
                  data[p + 2] = type.charCodeAt(2) & 255;
                  data[p + 3] = type.charCodeAt(3) & 255;
                  p += 4;
                  data.set(body, p);
                  p += body.length;
                  const crc = crc32(data, offset2 + 4, p);
                  data[p] = crc >> 24 & 255;
                  data[p + 1] = crc >> 16 & 255;
                  data[p + 2] = crc >> 8 & 255;
                  data[p + 3] = crc & 255;
                }
                function adler32(data, start2, end2) {
                  let a = 1;
                  let b = 0;
                  for (let i = start2; i < end2; ++i) {
                    a = (a + (data[i] & 255)) % 65521;
                    b = (b + a) % 65521;
                  }
                  return b << 16 | a;
                }
                function deflateSync(literals) {
                  if (!_is_node2.isNodeJS) {
                    return deflateSyncUncompressed(literals);
                  }
                  try {
                    let input;
                    if (parseInt(process.versions.node) >= 8) {
                      input = literals;
                    } else {
                      input = Buffer.from(literals);
                    }
                    const output = require$$5.deflateSync(input, {
                      level: 9
                    });
                    return output instanceof Uint8Array ? output : new Uint8Array(output);
                  } catch (e) {
                    (0, _util2.warn)("Not compressing PNG because zlib.deflateSync is unavailable: " + e);
                  }
                  return deflateSyncUncompressed(literals);
                }
                function deflateSyncUncompressed(literals) {
                  let len = literals.length;
                  const maxBlockLength = 65535;
                  const deflateBlocks = Math.ceil(len / maxBlockLength);
                  const idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);
                  let pi = 0;
                  idat[pi++] = 120;
                  idat[pi++] = 156;
                  let pos = 0;
                  while (len > maxBlockLength) {
                    idat[pi++] = 0;
                    idat[pi++] = 255;
                    idat[pi++] = 255;
                    idat[pi++] = 0;
                    idat[pi++] = 0;
                    idat.set(literals.subarray(pos, pos + maxBlockLength), pi);
                    pi += maxBlockLength;
                    pos += maxBlockLength;
                    len -= maxBlockLength;
                  }
                  idat[pi++] = 1;
                  idat[pi++] = len & 255;
                  idat[pi++] = len >> 8 & 255;
                  idat[pi++] = ~len & 65535 & 255;
                  idat[pi++] = (~len & 65535) >> 8 & 255;
                  idat.set(literals.subarray(pos), pi);
                  pi += literals.length - pos;
                  const adler = adler32(literals, 0, literals.length);
                  idat[pi++] = adler >> 24 & 255;
                  idat[pi++] = adler >> 16 & 255;
                  idat[pi++] = adler >> 8 & 255;
                  idat[pi++] = adler & 255;
                  return idat;
                }
                function encode(imgData, kind, forceDataSchema, isMask) {
                  const width = imgData.width;
                  const height = imgData.height;
                  let bitDepth, colorType, lineSize;
                  const bytes = imgData.data;
                  switch (kind) {
                    case _util2.ImageKind.GRAYSCALE_1BPP:
                      colorType = 0;
                      bitDepth = 1;
                      lineSize = width + 7 >> 3;
                      break;
                    case _util2.ImageKind.RGB_24BPP:
                      colorType = 2;
                      bitDepth = 8;
                      lineSize = width * 3;
                      break;
                    case _util2.ImageKind.RGBA_32BPP:
                      colorType = 6;
                      bitDepth = 8;
                      lineSize = width * 4;
                      break;
                    default:
                      throw new Error("invalid format");
                  }
                  const literals = new Uint8Array((1 + lineSize) * height);
                  let offsetLiterals = 0, offsetBytes = 0;
                  for (let y = 0; y < height; ++y) {
                    literals[offsetLiterals++] = 0;
                    literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize), offsetLiterals);
                    offsetBytes += lineSize;
                    offsetLiterals += lineSize;
                  }
                  if (kind === _util2.ImageKind.GRAYSCALE_1BPP && isMask) {
                    offsetLiterals = 0;
                    for (let y = 0; y < height; y++) {
                      offsetLiterals++;
                      for (let i = 0; i < lineSize; i++) {
                        literals[offsetLiterals++] ^= 255;
                      }
                    }
                  }
                  const ihdr = new Uint8Array([width >> 24 & 255, width >> 16 & 255, width >> 8 & 255, width & 255, height >> 24 & 255, height >> 16 & 255, height >> 8 & 255, height & 255, bitDepth, colorType, 0, 0, 0]);
                  const idat = deflateSync(literals);
                  const pngLength = PNG_HEADER.length + CHUNK_WRAPPER_SIZE * 3 + ihdr.length + idat.length;
                  const data = new Uint8Array(pngLength);
                  let offset2 = 0;
                  data.set(PNG_HEADER, offset2);
                  offset2 += PNG_HEADER.length;
                  writePngChunk("IHDR", ihdr, data, offset2);
                  offset2 += CHUNK_WRAPPER_SIZE + ihdr.length;
                  writePngChunk("IDATA", idat, data, offset2);
                  offset2 += CHUNK_WRAPPER_SIZE + idat.length;
                  writePngChunk("IEND", new Uint8Array(0), data, offset2);
                  return createObjectURL(data, "image/png", forceDataSchema);
                }
                return function convertImgDataToPng2(imgData, forceDataSchema, isMask) {
                  const kind = imgData.kind === void 0 ? _util2.ImageKind.GRAYSCALE_1BPP : imgData.kind;
                  return encode(imgData, kind, forceDataSchema, isMask);
                };
              }();
              class SVGExtraState {
                constructor() {
                  this.fontSizeScale = 1;
                  this.fontWeight = SVG_DEFAULTS.fontWeight;
                  this.fontSize = 0;
                  this.textMatrix = _util2.IDENTITY_MATRIX;
                  this.fontMatrix = _util2.FONT_IDENTITY_MATRIX;
                  this.leading = 0;
                  this.textRenderingMode = _util2.TextRenderingMode.FILL;
                  this.textMatrixScale = 1;
                  this.x = 0;
                  this.y = 0;
                  this.lineX = 0;
                  this.lineY = 0;
                  this.charSpacing = 0;
                  this.wordSpacing = 0;
                  this.textHScale = 1;
                  this.textRise = 0;
                  this.fillColor = SVG_DEFAULTS.fillColor;
                  this.strokeColor = "#000000";
                  this.fillAlpha = 1;
                  this.strokeAlpha = 1;
                  this.lineWidth = 1;
                  this.lineJoin = "";
                  this.lineCap = "";
                  this.miterLimit = 0;
                  this.dashArray = [];
                  this.dashPhase = 0;
                  this.dependencies = [];
                  this.activeClipUrl = null;
                  this.clipGroup = null;
                  this.maskId = "";
                }
                clone() {
                  return Object.create(this);
                }
                setCurrentPoint(x, y) {
                  this.x = x;
                  this.y = y;
                }
              }
              let clipCount = 0;
              let maskCount = 0;
              let shadingCount = 0;
              exports2.SVGGraphics = SVGGraphics = class {
                constructor(commonObjs, objs, forceDataSchema = false) {
                  (0, _display_utils2.deprecated)("The SVG back-end is no longer maintained and *may* be removed in the future.");
                  this.svgFactory = new _display_utils2.DOMSVGFactory();
                  this.current = new SVGExtraState();
                  this.transformMatrix = _util2.IDENTITY_MATRIX;
                  this.transformStack = [];
                  this.extraStack = [];
                  this.commonObjs = commonObjs;
                  this.objs = objs;
                  this.pendingClip = null;
                  this.pendingEOFill = false;
                  this.embedFonts = false;
                  this.embeddedFonts = /* @__PURE__ */ Object.create(null);
                  this.cssStyle = null;
                  this.forceDataSchema = !!forceDataSchema;
                  this._operatorIdMapping = [];
                  for (const op in _util2.OPS) {
                    this._operatorIdMapping[_util2.OPS[op]] = op;
                  }
                }
                save() {
                  this.transformStack.push(this.transformMatrix);
                  const old = this.current;
                  this.extraStack.push(old);
                  this.current = old.clone();
                }
                restore() {
                  this.transformMatrix = this.transformStack.pop();
                  this.current = this.extraStack.pop();
                  this.pendingClip = null;
                  this.tgrp = null;
                }
                group(items) {
                  this.save();
                  this.executeOpTree(items);
                  this.restore();
                }
                loadDependencies(operatorList) {
                  const fnArray = operatorList.fnArray;
                  const argsArray = operatorList.argsArray;
                  for (let i = 0, ii = fnArray.length; i < ii; i++) {
                    if (fnArray[i] !== _util2.OPS.dependency) {
                      continue;
                    }
                    for (const obj of argsArray[i]) {
                      const objsPool = obj.startsWith("g_") ? this.commonObjs : this.objs;
                      const promise = new Promise((resolve) => {
                        objsPool.get(obj, resolve);
                      });
                      this.current.dependencies.push(promise);
                    }
                  }
                  return Promise.all(this.current.dependencies);
                }
                transform(a, b, c, d, e, f) {
                  const transformMatrix = [a, b, c, d, e, f];
                  this.transformMatrix = _util2.Util.transform(this.transformMatrix, transformMatrix);
                  this.tgrp = null;
                }
                getSVG(operatorList, viewport2) {
                  this.viewport = viewport2;
                  const svgElement = this._initialize(viewport2);
                  return this.loadDependencies(operatorList).then(() => {
                    this.transformMatrix = _util2.IDENTITY_MATRIX;
                    this.executeOpTree(this.convertOpList(operatorList));
                    return svgElement;
                  });
                }
                convertOpList(operatorList) {
                  const operatorIdMapping = this._operatorIdMapping;
                  const argsArray = operatorList.argsArray;
                  const fnArray = operatorList.fnArray;
                  const opList = [];
                  for (let i = 0, ii = fnArray.length; i < ii; i++) {
                    const fnId = fnArray[i];
                    opList.push({
                      fnId,
                      fn: operatorIdMapping[fnId],
                      args: argsArray[i]
                    });
                  }
                  return opListToTree(opList);
                }
                executeOpTree(opTree) {
                  for (const opTreeElement of opTree) {
                    const fn2 = opTreeElement.fn;
                    const fnId = opTreeElement.fnId;
                    const args = opTreeElement.args;
                    switch (fnId | 0) {
                      case _util2.OPS.beginText:
                        this.beginText();
                        break;
                      case _util2.OPS.dependency:
                        break;
                      case _util2.OPS.setLeading:
                        this.setLeading(args);
                        break;
                      case _util2.OPS.setLeadingMoveText:
                        this.setLeadingMoveText(args[0], args[1]);
                        break;
                      case _util2.OPS.setFont:
                        this.setFont(args);
                        break;
                      case _util2.OPS.showText:
                        this.showText(args[0]);
                        break;
                      case _util2.OPS.showSpacedText:
                        this.showText(args[0]);
                        break;
                      case _util2.OPS.endText:
                        this.endText();
                        break;
                      case _util2.OPS.moveText:
                        this.moveText(args[0], args[1]);
                        break;
                      case _util2.OPS.setCharSpacing:
                        this.setCharSpacing(args[0]);
                        break;
                      case _util2.OPS.setWordSpacing:
                        this.setWordSpacing(args[0]);
                        break;
                      case _util2.OPS.setHScale:
                        this.setHScale(args[0]);
                        break;
                      case _util2.OPS.setTextMatrix:
                        this.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
                        break;
                      case _util2.OPS.setTextRise:
                        this.setTextRise(args[0]);
                        break;
                      case _util2.OPS.setTextRenderingMode:
                        this.setTextRenderingMode(args[0]);
                        break;
                      case _util2.OPS.setLineWidth:
                        this.setLineWidth(args[0]);
                        break;
                      case _util2.OPS.setLineJoin:
                        this.setLineJoin(args[0]);
                        break;
                      case _util2.OPS.setLineCap:
                        this.setLineCap(args[0]);
                        break;
                      case _util2.OPS.setMiterLimit:
                        this.setMiterLimit(args[0]);
                        break;
                      case _util2.OPS.setFillRGBColor:
                        this.setFillRGBColor(args[0], args[1], args[2]);
                        break;
                      case _util2.OPS.setStrokeRGBColor:
                        this.setStrokeRGBColor(args[0], args[1], args[2]);
                        break;
                      case _util2.OPS.setStrokeColorN:
                        this.setStrokeColorN(args);
                        break;
                      case _util2.OPS.setFillColorN:
                        this.setFillColorN(args);
                        break;
                      case _util2.OPS.shadingFill:
                        this.shadingFill(args[0]);
                        break;
                      case _util2.OPS.setDash:
                        this.setDash(args[0], args[1]);
                        break;
                      case _util2.OPS.setRenderingIntent:
                        this.setRenderingIntent(args[0]);
                        break;
                      case _util2.OPS.setFlatness:
                        this.setFlatness(args[0]);
                        break;
                      case _util2.OPS.setGState:
                        this.setGState(args[0]);
                        break;
                      case _util2.OPS.fill:
                        this.fill();
                        break;
                      case _util2.OPS.eoFill:
                        this.eoFill();
                        break;
                      case _util2.OPS.stroke:
                        this.stroke();
                        break;
                      case _util2.OPS.fillStroke:
                        this.fillStroke();
                        break;
                      case _util2.OPS.eoFillStroke:
                        this.eoFillStroke();
                        break;
                      case _util2.OPS.clip:
                        this.clip("nonzero");
                        break;
                      case _util2.OPS.eoClip:
                        this.clip("evenodd");
                        break;
                      case _util2.OPS.paintSolidColorImageMask:
                        this.paintSolidColorImageMask();
                        break;
                      case _util2.OPS.paintImageXObject:
                        this.paintImageXObject(args[0]);
                        break;
                      case _util2.OPS.paintInlineImageXObject:
                        this.paintInlineImageXObject(args[0]);
                        break;
                      case _util2.OPS.paintImageMaskXObject:
                        this.paintImageMaskXObject(args[0]);
                        break;
                      case _util2.OPS.paintFormXObjectBegin:
                        this.paintFormXObjectBegin(args[0], args[1]);
                        break;
                      case _util2.OPS.paintFormXObjectEnd:
                        this.paintFormXObjectEnd();
                        break;
                      case _util2.OPS.closePath:
                        this.closePath();
                        break;
                      case _util2.OPS.closeStroke:
                        this.closeStroke();
                        break;
                      case _util2.OPS.closeFillStroke:
                        this.closeFillStroke();
                        break;
                      case _util2.OPS.closeEOFillStroke:
                        this.closeEOFillStroke();
                        break;
                      case _util2.OPS.nextLine:
                        this.nextLine();
                        break;
                      case _util2.OPS.transform:
                        this.transform(args[0], args[1], args[2], args[3], args[4], args[5]);
                        break;
                      case _util2.OPS.constructPath:
                        this.constructPath(args[0], args[1]);
                        break;
                      case _util2.OPS.endPath:
                        this.endPath();
                        break;
                      case 92:
                        this.group(opTreeElement.items);
                        break;
                      default:
                        (0, _util2.warn)(`Unimplemented operator ${fn2}`);
                        break;
                    }
                  }
                }
                setWordSpacing(wordSpacing) {
                  this.current.wordSpacing = wordSpacing;
                }
                setCharSpacing(charSpacing) {
                  this.current.charSpacing = charSpacing;
                }
                nextLine() {
                  this.moveText(0, this.current.leading);
                }
                setTextMatrix(a, b, c, d, e, f) {
                  const current = this.current;
                  current.textMatrix = current.lineMatrix = [a, b, c, d, e, f];
                  current.textMatrixScale = Math.hypot(a, b);
                  current.x = current.lineX = 0;
                  current.y = current.lineY = 0;
                  current.xcoords = [];
                  current.ycoords = [];
                  current.tspan = this.svgFactory.createElement("svg:tspan");
                  current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
                  current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);
                  current.tspan.setAttributeNS(null, "y", pf(-current.y));
                  current.txtElement = this.svgFactory.createElement("svg:text");
                  current.txtElement.append(current.tspan);
                }
                beginText() {
                  const current = this.current;
                  current.x = current.lineX = 0;
                  current.y = current.lineY = 0;
                  current.textMatrix = _util2.IDENTITY_MATRIX;
                  current.lineMatrix = _util2.IDENTITY_MATRIX;
                  current.textMatrixScale = 1;
                  current.tspan = this.svgFactory.createElement("svg:tspan");
                  current.txtElement = this.svgFactory.createElement("svg:text");
                  current.txtgrp = this.svgFactory.createElement("svg:g");
                  current.xcoords = [];
                  current.ycoords = [];
                }
                moveText(x, y) {
                  const current = this.current;
                  current.x = current.lineX += x;
                  current.y = current.lineY += y;
                  current.xcoords = [];
                  current.ycoords = [];
                  current.tspan = this.svgFactory.createElement("svg:tspan");
                  current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
                  current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);
                  current.tspan.setAttributeNS(null, "y", pf(-current.y));
                }
                showText(glyphs) {
                  const current = this.current;
                  const font = current.font;
                  const fontSize = current.fontSize;
                  if (fontSize === 0) {
                    return;
                  }
                  const fontSizeScale = current.fontSizeScale;
                  const charSpacing = current.charSpacing;
                  const wordSpacing = current.wordSpacing;
                  const fontDirection = current.fontDirection;
                  const textHScale = current.textHScale * fontDirection;
                  const vertical = font.vertical;
                  const spacingDir = vertical ? 1 : -1;
                  const defaultVMetrics = font.defaultVMetrics;
                  const widthAdvanceScale = fontSize * current.fontMatrix[0];
                  let x = 0;
                  for (const glyph of glyphs) {
                    if (glyph === null) {
                      x += fontDirection * wordSpacing;
                      continue;
                    } else if (typeof glyph === "number") {
                      x += spacingDir * glyph * fontSize / 1e3;
                      continue;
                    }
                    const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
                    const character = glyph.fontChar;
                    let scaledX, scaledY;
                    let width = glyph.width;
                    if (vertical) {
                      let vx;
                      const vmetric = glyph.vmetric || defaultVMetrics;
                      vx = glyph.vmetric ? vmetric[1] : width * 0.5;
                      vx = -vx * widthAdvanceScale;
                      const vy = vmetric[2] * widthAdvanceScale;
                      width = vmetric ? -vmetric[0] : width;
                      scaledX = vx / fontSizeScale;
                      scaledY = (x + vy) / fontSizeScale;
                    } else {
                      scaledX = x / fontSizeScale;
                      scaledY = 0;
                    }
                    if (glyph.isInFont || font.missingFile) {
                      current.xcoords.push(current.x + scaledX);
                      if (vertical) {
                        current.ycoords.push(-current.y + scaledY);
                      }
                      current.tspan.textContent += character;
                    }
                    let charWidth;
                    if (vertical) {
                      charWidth = width * widthAdvanceScale - spacing * fontDirection;
                    } else {
                      charWidth = width * widthAdvanceScale + spacing * fontDirection;
                    }
                    x += charWidth;
                  }
                  current.tspan.setAttributeNS(null, "x", current.xcoords.map(pf).join(" "));
                  if (vertical) {
                    current.tspan.setAttributeNS(null, "y", current.ycoords.map(pf).join(" "));
                  } else {
                    current.tspan.setAttributeNS(null, "y", pf(-current.y));
                  }
                  if (vertical) {
                    current.y -= x;
                  } else {
                    current.x += x * textHScale;
                  }
                  current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
                  current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);
                  if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {
                    current.tspan.setAttributeNS(null, "font-style", current.fontStyle);
                  }
                  if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {
                    current.tspan.setAttributeNS(null, "font-weight", current.fontWeight);
                  }
                  const fillStrokeMode = current.textRenderingMode & _util2.TextRenderingMode.FILL_STROKE_MASK;
                  if (fillStrokeMode === _util2.TextRenderingMode.FILL || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    if (current.fillColor !== SVG_DEFAULTS.fillColor) {
                      current.tspan.setAttributeNS(null, "fill", current.fillColor);
                    }
                    if (current.fillAlpha < 1) {
                      current.tspan.setAttributeNS(null, "fill-opacity", current.fillAlpha);
                    }
                  } else if (current.textRenderingMode === _util2.TextRenderingMode.ADD_TO_PATH) {
                    current.tspan.setAttributeNS(null, "fill", "transparent");
                  } else {
                    current.tspan.setAttributeNS(null, "fill", "none");
                  }
                  if (fillStrokeMode === _util2.TextRenderingMode.STROKE || fillStrokeMode === _util2.TextRenderingMode.FILL_STROKE) {
                    const lineWidthScale = 1 / (current.textMatrixScale || 1);
                    this._setStrokeAttributes(current.tspan, lineWidthScale);
                  }
                  let textMatrix = current.textMatrix;
                  if (current.textRise !== 0) {
                    textMatrix = textMatrix.slice();
                    textMatrix[5] += current.textRise;
                  }
                  current.txtElement.setAttributeNS(null, "transform", `${pm(textMatrix)} scale(${pf(textHScale)}, -1)`);
                  current.txtElement.setAttributeNS(XML_NS, "xml:space", "preserve");
                  current.txtElement.append(current.tspan);
                  current.txtgrp.append(current.txtElement);
                  this._ensureTransformGroup().append(current.txtElement);
                }
                setLeadingMoveText(x, y) {
                  this.setLeading(-y);
                  this.moveText(x, y);
                }
                addFontStyle(fontObj) {
                  if (!fontObj.data) {
                    throw new Error('addFontStyle: No font data available, ensure that the "fontExtraProperties" API parameter is set.');
                  }
                  if (!this.cssStyle) {
                    this.cssStyle = this.svgFactory.createElement("svg:style");
                    this.cssStyle.setAttributeNS(null, "type", "text/css");
                    this.defs.append(this.cssStyle);
                  }
                  const url = createObjectURL(fontObj.data, fontObj.mimetype, this.forceDataSchema);
                  this.cssStyle.textContent += `@font-face { font-family: "${fontObj.loadedName}"; src: url(${url}); }
`;
                }
                setFont(details) {
                  const current = this.current;
                  const fontObj = this.commonObjs.get(details[0]);
                  let size = details[1];
                  current.font = fontObj;
                  if (this.embedFonts && !fontObj.missingFile && !this.embeddedFonts[fontObj.loadedName]) {
                    this.addFontStyle(fontObj);
                    this.embeddedFonts[fontObj.loadedName] = fontObj;
                  }
                  current.fontMatrix = fontObj.fontMatrix || _util2.FONT_IDENTITY_MATRIX;
                  let bold = "normal";
                  if (fontObj.black) {
                    bold = "900";
                  } else if (fontObj.bold) {
                    bold = "bold";
                  }
                  const italic = fontObj.italic ? "italic" : "normal";
                  if (size < 0) {
                    size = -size;
                    current.fontDirection = -1;
                  } else {
                    current.fontDirection = 1;
                  }
                  current.fontSize = size;
                  current.fontFamily = fontObj.loadedName;
                  current.fontWeight = bold;
                  current.fontStyle = italic;
                  current.tspan = this.svgFactory.createElement("svg:tspan");
                  current.tspan.setAttributeNS(null, "y", pf(-current.y));
                  current.xcoords = [];
                  current.ycoords = [];
                }
                endText() {
                  var _a;
                  const current = this.current;
                  if (current.textRenderingMode & _util2.TextRenderingMode.ADD_TO_PATH_FLAG && ((_a = current.txtElement) == null ? void 0 : _a.hasChildNodes())) {
                    current.element = current.txtElement;
                    this.clip("nonzero");
                    this.endPath();
                  }
                }
                setLineWidth(width) {
                  if (width > 0) {
                    this.current.lineWidth = width;
                  }
                }
                setLineCap(style) {
                  this.current.lineCap = LINE_CAP_STYLES[style];
                }
                setLineJoin(style) {
                  this.current.lineJoin = LINE_JOIN_STYLES[style];
                }
                setMiterLimit(limit) {
                  this.current.miterLimit = limit;
                }
                setStrokeAlpha(strokeAlpha) {
                  this.current.strokeAlpha = strokeAlpha;
                }
                setStrokeRGBColor(r2, g, b) {
                  this.current.strokeColor = _util2.Util.makeHexColor(r2, g, b);
                }
                setFillAlpha(fillAlpha) {
                  this.current.fillAlpha = fillAlpha;
                }
                setFillRGBColor(r2, g, b) {
                  this.current.fillColor = _util2.Util.makeHexColor(r2, g, b);
                  this.current.tspan = this.svgFactory.createElement("svg:tspan");
                  this.current.xcoords = [];
                  this.current.ycoords = [];
                }
                setStrokeColorN(args) {
                  this.current.strokeColor = this._makeColorN_Pattern(args);
                }
                setFillColorN(args) {
                  this.current.fillColor = this._makeColorN_Pattern(args);
                }
                shadingFill(args) {
                  const width = this.viewport.width;
                  const height = this.viewport.height;
                  const inv = _util2.Util.inverseTransform(this.transformMatrix);
                  const bl = _util2.Util.applyTransform([0, 0], inv);
                  const br = _util2.Util.applyTransform([0, height], inv);
                  const ul = _util2.Util.applyTransform([width, 0], inv);
                  const ur = _util2.Util.applyTransform([width, height], inv);
                  const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
                  const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
                  const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
                  const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
                  const rect = this.svgFactory.createElement("svg:rect");
                  rect.setAttributeNS(null, "x", x0);
                  rect.setAttributeNS(null, "y", y0);
                  rect.setAttributeNS(null, "width", x1 - x0);
                  rect.setAttributeNS(null, "height", y1 - y0);
                  rect.setAttributeNS(null, "fill", this._makeShadingPattern(args));
                  if (this.current.fillAlpha < 1) {
                    rect.setAttributeNS(null, "fill-opacity", this.current.fillAlpha);
                  }
                  this._ensureTransformGroup().append(rect);
                }
                _makeColorN_Pattern(args) {
                  if (args[0] === "TilingPattern") {
                    return this._makeTilingPattern(args);
                  }
                  return this._makeShadingPattern(args);
                }
                _makeTilingPattern(args) {
                  const color = args[1];
                  const operatorList = args[2];
                  const matrix = args[3] || _util2.IDENTITY_MATRIX;
                  const [x0, y0, x1, y1] = args[4];
                  const xstep = args[5];
                  const ystep = args[6];
                  const paintType = args[7];
                  const tilingId = `shading${shadingCount++}`;
                  const [tx0, ty0, tx1, ty1] = _util2.Util.normalizeRect([..._util2.Util.applyTransform([x0, y0], matrix), ..._util2.Util.applyTransform([x1, y1], matrix)]);
                  const [xscale, yscale] = _util2.Util.singularValueDecompose2dScale(matrix);
                  const txstep = xstep * xscale;
                  const tystep = ystep * yscale;
                  const tiling = this.svgFactory.createElement("svg:pattern");
                  tiling.setAttributeNS(null, "id", tilingId);
                  tiling.setAttributeNS(null, "patternUnits", "userSpaceOnUse");
                  tiling.setAttributeNS(null, "width", txstep);
                  tiling.setAttributeNS(null, "height", tystep);
                  tiling.setAttributeNS(null, "x", `${tx0}`);
                  tiling.setAttributeNS(null, "y", `${ty0}`);
                  const svg = this.svg;
                  const transformMatrix = this.transformMatrix;
                  const fillColor = this.current.fillColor;
                  const strokeColor = this.current.strokeColor;
                  const bbox = this.svgFactory.create(tx1 - tx0, ty1 - ty0);
                  this.svg = bbox;
                  this.transformMatrix = matrix;
                  if (paintType === 2) {
                    const cssColor = _util2.Util.makeHexColor(...color);
                    this.current.fillColor = cssColor;
                    this.current.strokeColor = cssColor;
                  }
                  this.executeOpTree(this.convertOpList(operatorList));
                  this.svg = svg;
                  this.transformMatrix = transformMatrix;
                  this.current.fillColor = fillColor;
                  this.current.strokeColor = strokeColor;
                  tiling.append(bbox.childNodes[0]);
                  this.defs.append(tiling);
                  return `url(#${tilingId})`;
                }
                _makeShadingPattern(args) {
                  if (typeof args === "string") {
                    args = this.objs.get(args);
                  }
                  switch (args[0]) {
                    case "RadialAxial":
                      const shadingId = `shading${shadingCount++}`;
                      const colorStops = args[3];
                      let gradient;
                      switch (args[1]) {
                        case "axial":
                          const point0 = args[4];
                          const point1 = args[5];
                          gradient = this.svgFactory.createElement("svg:linearGradient");
                          gradient.setAttributeNS(null, "id", shadingId);
                          gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                          gradient.setAttributeNS(null, "x1", point0[0]);
                          gradient.setAttributeNS(null, "y1", point0[1]);
                          gradient.setAttributeNS(null, "x2", point1[0]);
                          gradient.setAttributeNS(null, "y2", point1[1]);
                          break;
                        case "radial":
                          const focalPoint = args[4];
                          const circlePoint = args[5];
                          const focalRadius = args[6];
                          const circleRadius = args[7];
                          gradient = this.svgFactory.createElement("svg:radialGradient");
                          gradient.setAttributeNS(null, "id", shadingId);
                          gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                          gradient.setAttributeNS(null, "cx", circlePoint[0]);
                          gradient.setAttributeNS(null, "cy", circlePoint[1]);
                          gradient.setAttributeNS(null, "r", circleRadius);
                          gradient.setAttributeNS(null, "fx", focalPoint[0]);
                          gradient.setAttributeNS(null, "fy", focalPoint[1]);
                          gradient.setAttributeNS(null, "fr", focalRadius);
                          break;
                        default:
                          throw new Error(`Unknown RadialAxial type: ${args[1]}`);
                      }
                      for (const colorStop of colorStops) {
                        const stop = this.svgFactory.createElement("svg:stop");
                        stop.setAttributeNS(null, "offset", colorStop[0]);
                        stop.setAttributeNS(null, "stop-color", colorStop[1]);
                        gradient.append(stop);
                      }
                      this.defs.append(gradient);
                      return `url(#${shadingId})`;
                    case "Mesh":
                      (0, _util2.warn)("Unimplemented pattern Mesh");
                      return null;
                    case "Dummy":
                      return "hotpink";
                    default:
                      throw new Error(`Unknown IR type: ${args[0]}`);
                  }
                }
                setDash(dashArray, dashPhase) {
                  this.current.dashArray = dashArray;
                  this.current.dashPhase = dashPhase;
                }
                constructPath(ops, args) {
                  const current = this.current;
                  let x = current.x, y = current.y;
                  let d = [];
                  let j = 0;
                  for (const op of ops) {
                    switch (op | 0) {
                      case _util2.OPS.rectangle:
                        x = args[j++];
                        y = args[j++];
                        const width = args[j++];
                        const height = args[j++];
                        const xw = x + width;
                        const yh = y + height;
                        d.push("M", pf(x), pf(y), "L", pf(xw), pf(y), "L", pf(xw), pf(yh), "L", pf(x), pf(yh), "Z");
                        break;
                      case _util2.OPS.moveTo:
                        x = args[j++];
                        y = args[j++];
                        d.push("M", pf(x), pf(y));
                        break;
                      case _util2.OPS.lineTo:
                        x = args[j++];
                        y = args[j++];
                        d.push("L", pf(x), pf(y));
                        break;
                      case _util2.OPS.curveTo:
                        x = args[j + 4];
                        y = args[j + 5];
                        d.push("C", pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]), pf(x), pf(y));
                        j += 6;
                        break;
                      case _util2.OPS.curveTo2:
                        d.push("C", pf(x), pf(y), pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]));
                        x = args[j + 2];
                        y = args[j + 3];
                        j += 4;
                        break;
                      case _util2.OPS.curveTo3:
                        x = args[j + 2];
                        y = args[j + 3];
                        d.push("C", pf(args[j]), pf(args[j + 1]), pf(x), pf(y), pf(x), pf(y));
                        j += 4;
                        break;
                      case _util2.OPS.closePath:
                        d.push("Z");
                        break;
                    }
                  }
                  d = d.join(" ");
                  if (current.path && ops.length > 0 && ops[0] !== _util2.OPS.rectangle && ops[0] !== _util2.OPS.moveTo) {
                    d = current.path.getAttributeNS(null, "d") + d;
                  } else {
                    current.path = this.svgFactory.createElement("svg:path");
                    this._ensureTransformGroup().append(current.path);
                  }
                  current.path.setAttributeNS(null, "d", d);
                  current.path.setAttributeNS(null, "fill", "none");
                  current.element = current.path;
                  current.setCurrentPoint(x, y);
                }
                endPath() {
                  const current = this.current;
                  current.path = null;
                  if (!this.pendingClip) {
                    return;
                  }
                  if (!current.element) {
                    this.pendingClip = null;
                    return;
                  }
                  const clipId = `clippath${clipCount++}`;
                  const clipPath = this.svgFactory.createElement("svg:clipPath");
                  clipPath.setAttributeNS(null, "id", clipId);
                  clipPath.setAttributeNS(null, "transform", pm(this.transformMatrix));
                  const clipElement = current.element.cloneNode(true);
                  if (this.pendingClip === "evenodd") {
                    clipElement.setAttributeNS(null, "clip-rule", "evenodd");
                  } else {
                    clipElement.setAttributeNS(null, "clip-rule", "nonzero");
                  }
                  this.pendingClip = null;
                  clipPath.append(clipElement);
                  this.defs.append(clipPath);
                  if (current.activeClipUrl) {
                    current.clipGroup = null;
                    for (const prev of this.extraStack) {
                      prev.clipGroup = null;
                    }
                    clipPath.setAttributeNS(null, "clip-path", current.activeClipUrl);
                  }
                  current.activeClipUrl = `url(#${clipId})`;
                  this.tgrp = null;
                }
                clip(type) {
                  this.pendingClip = type;
                }
                closePath() {
                  const current = this.current;
                  if (current.path) {
                    const d = `${current.path.getAttributeNS(null, "d")}Z`;
                    current.path.setAttributeNS(null, "d", d);
                  }
                }
                setLeading(leading) {
                  this.current.leading = -leading;
                }
                setTextRise(textRise) {
                  this.current.textRise = textRise;
                }
                setTextRenderingMode(textRenderingMode) {
                  this.current.textRenderingMode = textRenderingMode;
                }
                setHScale(scale) {
                  this.current.textHScale = scale / 100;
                }
                setRenderingIntent(intent) {
                }
                setFlatness(flatness) {
                }
                setGState(states) {
                  for (const [key, value] of states) {
                    switch (key) {
                      case "LW":
                        this.setLineWidth(value);
                        break;
                      case "LC":
                        this.setLineCap(value);
                        break;
                      case "LJ":
                        this.setLineJoin(value);
                        break;
                      case "ML":
                        this.setMiterLimit(value);
                        break;
                      case "D":
                        this.setDash(value[0], value[1]);
                        break;
                      case "RI":
                        this.setRenderingIntent(value);
                        break;
                      case "FL":
                        this.setFlatness(value);
                        break;
                      case "Font":
                        this.setFont(value);
                        break;
                      case "CA":
                        this.setStrokeAlpha(value);
                        break;
                      case "ca":
                        this.setFillAlpha(value);
                        break;
                      default:
                        (0, _util2.warn)(`Unimplemented graphic state operator ${key}`);
                        break;
                    }
                  }
                }
                fill() {
                  const current = this.current;
                  if (current.element) {
                    current.element.setAttributeNS(null, "fill", current.fillColor);
                    current.element.setAttributeNS(null, "fill-opacity", current.fillAlpha);
                    this.endPath();
                  }
                }
                stroke() {
                  const current = this.current;
                  if (current.element) {
                    this._setStrokeAttributes(current.element);
                    current.element.setAttributeNS(null, "fill", "none");
                    this.endPath();
                  }
                }
                _setStrokeAttributes(element, lineWidthScale = 1) {
                  const current = this.current;
                  let dashArray = current.dashArray;
                  if (lineWidthScale !== 1 && dashArray.length > 0) {
                    dashArray = dashArray.map(function(value) {
                      return lineWidthScale * value;
                    });
                  }
                  element.setAttributeNS(null, "stroke", current.strokeColor);
                  element.setAttributeNS(null, "stroke-opacity", current.strokeAlpha);
                  element.setAttributeNS(null, "stroke-miterlimit", pf(current.miterLimit));
                  element.setAttributeNS(null, "stroke-linecap", current.lineCap);
                  element.setAttributeNS(null, "stroke-linejoin", current.lineJoin);
                  element.setAttributeNS(null, "stroke-width", pf(lineWidthScale * current.lineWidth) + "px");
                  element.setAttributeNS(null, "stroke-dasharray", dashArray.map(pf).join(" "));
                  element.setAttributeNS(null, "stroke-dashoffset", pf(lineWidthScale * current.dashPhase) + "px");
                }
                eoFill() {
                  if (this.current.element) {
                    this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
                  }
                  this.fill();
                }
                fillStroke() {
                  this.stroke();
                  this.fill();
                }
                eoFillStroke() {
                  if (this.current.element) {
                    this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
                  }
                  this.fillStroke();
                }
                closeStroke() {
                  this.closePath();
                  this.stroke();
                }
                closeFillStroke() {
                  this.closePath();
                  this.fillStroke();
                }
                closeEOFillStroke() {
                  this.closePath();
                  this.eoFillStroke();
                }
                paintSolidColorImageMask() {
                  const rect = this.svgFactory.createElement("svg:rect");
                  rect.setAttributeNS(null, "x", "0");
                  rect.setAttributeNS(null, "y", "0");
                  rect.setAttributeNS(null, "width", "1px");
                  rect.setAttributeNS(null, "height", "1px");
                  rect.setAttributeNS(null, "fill", this.current.fillColor);
                  this._ensureTransformGroup().append(rect);
                }
                paintImageXObject(objId) {
                  const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);
                  if (!imgData) {
                    (0, _util2.warn)(`Dependent image with object ID ${objId} is not ready yet`);
                    return;
                  }
                  this.paintInlineImageXObject(imgData);
                }
                paintInlineImageXObject(imgData, mask) {
                  const width = imgData.width;
                  const height = imgData.height;
                  const imgSrc = convertImgDataToPng(imgData, this.forceDataSchema, !!mask);
                  const cliprect = this.svgFactory.createElement("svg:rect");
                  cliprect.setAttributeNS(null, "x", "0");
                  cliprect.setAttributeNS(null, "y", "0");
                  cliprect.setAttributeNS(null, "width", pf(width));
                  cliprect.setAttributeNS(null, "height", pf(height));
                  this.current.element = cliprect;
                  this.clip("nonzero");
                  const imgEl = this.svgFactory.createElement("svg:image");
                  imgEl.setAttributeNS(XLINK_NS, "xlink:href", imgSrc);
                  imgEl.setAttributeNS(null, "x", "0");
                  imgEl.setAttributeNS(null, "y", pf(-height));
                  imgEl.setAttributeNS(null, "width", pf(width) + "px");
                  imgEl.setAttributeNS(null, "height", pf(height) + "px");
                  imgEl.setAttributeNS(null, "transform", `scale(${pf(1 / width)} ${pf(-1 / height)})`);
                  if (mask) {
                    mask.append(imgEl);
                  } else {
                    this._ensureTransformGroup().append(imgEl);
                  }
                }
                paintImageMaskXObject(imgData) {
                  const current = this.current;
                  const width = imgData.width;
                  const height = imgData.height;
                  const fillColor = current.fillColor;
                  current.maskId = `mask${maskCount++}`;
                  const mask = this.svgFactory.createElement("svg:mask");
                  mask.setAttributeNS(null, "id", current.maskId);
                  const rect = this.svgFactory.createElement("svg:rect");
                  rect.setAttributeNS(null, "x", "0");
                  rect.setAttributeNS(null, "y", "0");
                  rect.setAttributeNS(null, "width", pf(width));
                  rect.setAttributeNS(null, "height", pf(height));
                  rect.setAttributeNS(null, "fill", fillColor);
                  rect.setAttributeNS(null, "mask", `url(#${current.maskId})`);
                  this.defs.append(mask);
                  this._ensureTransformGroup().append(rect);
                  this.paintInlineImageXObject(imgData, mask);
                }
                paintFormXObjectBegin(matrix, bbox) {
                  if (Array.isArray(matrix) && matrix.length === 6) {
                    this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
                  }
                  if (bbox) {
                    const width = bbox[2] - bbox[0];
                    const height = bbox[3] - bbox[1];
                    const cliprect = this.svgFactory.createElement("svg:rect");
                    cliprect.setAttributeNS(null, "x", bbox[0]);
                    cliprect.setAttributeNS(null, "y", bbox[1]);
                    cliprect.setAttributeNS(null, "width", pf(width));
                    cliprect.setAttributeNS(null, "height", pf(height));
                    this.current.element = cliprect;
                    this.clip("nonzero");
                    this.endPath();
                  }
                }
                paintFormXObjectEnd() {
                }
                _initialize(viewport2) {
                  const svg = this.svgFactory.create(viewport2.width, viewport2.height);
                  const definitions = this.svgFactory.createElement("svg:defs");
                  svg.append(definitions);
                  this.defs = definitions;
                  const rootGroup = this.svgFactory.createElement("svg:g");
                  rootGroup.setAttributeNS(null, "transform", pm(viewport2.transform));
                  svg.append(rootGroup);
                  this.svg = rootGroup;
                  return svg;
                }
                _ensureClipGroup() {
                  if (!this.current.clipGroup) {
                    const clipGroup = this.svgFactory.createElement("svg:g");
                    clipGroup.setAttributeNS(null, "clip-path", this.current.activeClipUrl);
                    this.svg.append(clipGroup);
                    this.current.clipGroup = clipGroup;
                  }
                  return this.current.clipGroup;
                }
                _ensureTransformGroup() {
                  if (!this.tgrp) {
                    this.tgrp = this.svgFactory.createElement("svg:g");
                    this.tgrp.setAttributeNS(null, "transform", pm(this.transformMatrix));
                    if (this.current.activeClipUrl) {
                      this._ensureClipGroup().append(this.tgrp);
                    } else {
                      this.svg.append(this.tgrp);
                    }
                  }
                  return this.tgrp;
                }
              };
            }
          },
          /* 32 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.PDFNodeStream = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _network_utils = __w_pdfjs_require__2(33);
            const fs = require$$5;
            const http = require$$5;
            const https = require$$5;
            const url = require$$5;
            const fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;
            function parseUrl(sourceUrl) {
              const parsedUrl = url.parse(sourceUrl);
              if (parsedUrl.protocol === "file:" || parsedUrl.host) {
                return parsedUrl;
              }
              if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
                return url.parse(`file:///${sourceUrl}`);
              }
              if (!parsedUrl.host) {
                parsedUrl.protocol = "file:";
              }
              return parsedUrl;
            }
            class PDFNodeStream {
              constructor(source) {
                this.source = source;
                this.url = parseUrl(source.url);
                this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:";
                this.isFsUrl = this.url.protocol === "file:";
                this.httpHeaders = this.isHttp && source.httpHeaders || {};
                this._fullRequestReader = null;
                this._rangeRequestReaders = [];
              }
              get _progressiveDataLength() {
                var _a;
                return ((_a = this._fullRequestReader) == null ? void 0 : _a._loaded) ?? 0;
              }
              getFullReader() {
                (0, _util2.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
                this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
                return this._fullRequestReader;
              }
              getRangeReader(start2, end2) {
                if (end2 <= this._progressiveDataLength) {
                  return null;
                }
                const rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start2, end2) : new PDFNodeStreamRangeReader(this, start2, end2);
                this._rangeRequestReaders.push(rangeReader);
                return rangeReader;
              }
              cancelAllRequests(reason) {
                if (this._fullRequestReader) {
                  this._fullRequestReader.cancel(reason);
                }
                for (const reader of this._rangeRequestReaders.slice(0)) {
                  reader.cancel(reason);
                }
              }
            }
            exports2.PDFNodeStream = PDFNodeStream;
            class BaseFullReader {
              constructor(stream) {
                this._url = stream.url;
                this._done = false;
                this._storedError = null;
                this.onProgress = null;
                const source = stream.source;
                this._contentLength = source.length;
                this._loaded = 0;
                this._filename = null;
                this._disableRange = source.disableRange || false;
                this._rangeChunkSize = source.rangeChunkSize;
                if (!this._rangeChunkSize && !this._disableRange) {
                  this._disableRange = true;
                }
                this._isStreamingSupported = !source.disableStream;
                this._isRangeSupported = !source.disableRange;
                this._readableStream = null;
                this._readCapability = (0, _util2.createPromiseCapability)();
                this._headersCapability = (0, _util2.createPromiseCapability)();
              }
              get headersReady() {
                return this._headersCapability.promise;
              }
              get filename() {
                return this._filename;
              }
              get contentLength() {
                return this._contentLength;
              }
              get isRangeSupported() {
                return this._isRangeSupported;
              }
              get isStreamingSupported() {
                return this._isStreamingSupported;
              }
              async read() {
                await this._readCapability.promise;
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                if (this._storedError) {
                  throw this._storedError;
                }
                const chunk = this._readableStream.read();
                if (chunk === null) {
                  this._readCapability = (0, _util2.createPromiseCapability)();
                  return this.read();
                }
                this._loaded += chunk.length;
                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded,
                    total: this._contentLength
                  });
                }
                const buffer = new Uint8Array(chunk).buffer;
                return {
                  value: buffer,
                  done: false
                };
              }
              cancel(reason) {
                if (!this._readableStream) {
                  this._error(reason);
                  return;
                }
                this._readableStream.destroy(reason);
              }
              _error(reason) {
                this._storedError = reason;
                this._readCapability.resolve();
              }
              _setReadableStream(readableStream) {
                this._readableStream = readableStream;
                readableStream.on("readable", () => {
                  this._readCapability.resolve();
                });
                readableStream.on("end", () => {
                  readableStream.destroy();
                  this._done = true;
                  this._readCapability.resolve();
                });
                readableStream.on("error", (reason) => {
                  this._error(reason);
                });
                if (!this._isStreamingSupported && this._isRangeSupported) {
                  this._error(new _util2.AbortException("streaming is disabled"));
                }
                if (this._storedError) {
                  this._readableStream.destroy(this._storedError);
                }
              }
            }
            class BaseRangeReader {
              constructor(stream) {
                this._url = stream.url;
                this._done = false;
                this._storedError = null;
                this.onProgress = null;
                this._loaded = 0;
                this._readableStream = null;
                this._readCapability = (0, _util2.createPromiseCapability)();
                const source = stream.source;
                this._isStreamingSupported = !source.disableStream;
              }
              get isStreamingSupported() {
                return this._isStreamingSupported;
              }
              async read() {
                await this._readCapability.promise;
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                if (this._storedError) {
                  throw this._storedError;
                }
                const chunk = this._readableStream.read();
                if (chunk === null) {
                  this._readCapability = (0, _util2.createPromiseCapability)();
                  return this.read();
                }
                this._loaded += chunk.length;
                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded
                  });
                }
                const buffer = new Uint8Array(chunk).buffer;
                return {
                  value: buffer,
                  done: false
                };
              }
              cancel(reason) {
                if (!this._readableStream) {
                  this._error(reason);
                  return;
                }
                this._readableStream.destroy(reason);
              }
              _error(reason) {
                this._storedError = reason;
                this._readCapability.resolve();
              }
              _setReadableStream(readableStream) {
                this._readableStream = readableStream;
                readableStream.on("readable", () => {
                  this._readCapability.resolve();
                });
                readableStream.on("end", () => {
                  readableStream.destroy();
                  this._done = true;
                  this._readCapability.resolve();
                });
                readableStream.on("error", (reason) => {
                  this._error(reason);
                });
                if (this._storedError) {
                  this._readableStream.destroy(this._storedError);
                }
              }
            }
            function createRequestOptions(parsedUrl, headers) {
              return {
                protocol: parsedUrl.protocol,
                auth: parsedUrl.auth,
                host: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: "GET",
                headers
              };
            }
            class PDFNodeStreamFullReader extends BaseFullReader {
              constructor(stream) {
                super(stream);
                const handleResponse = (response) => {
                  if (response.statusCode === 404) {
                    const error = new _util2.MissingPDFException(`Missing PDF "${this._url}".`);
                    this._storedError = error;
                    this._headersCapability.reject(error);
                    return;
                  }
                  this._headersCapability.resolve();
                  this._setReadableStream(response);
                  const getResponseHeader = (name) => {
                    return this._readableStream.headers[name.toLowerCase()];
                  };
                  const {
                    allowRangeRequests,
                    suggestedLength
                  } = (0, _network_utils.validateRangeRequestCapabilities)({
                    getResponseHeader,
                    isHttp: stream.isHttp,
                    rangeChunkSize: this._rangeChunkSize,
                    disableRange: this._disableRange
                  });
                  this._isRangeSupported = allowRangeRequests;
                  this._contentLength = suggestedLength || this._contentLength;
                  this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
                };
                this._request = null;
                if (this._url.protocol === "http:") {
                  this._request = http.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
                } else {
                  this._request = https.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
                }
                this._request.on("error", (reason) => {
                  this._storedError = reason;
                  this._headersCapability.reject(reason);
                });
                this._request.end();
              }
            }
            class PDFNodeStreamRangeReader extends BaseRangeReader {
              constructor(stream, start2, end2) {
                super(stream);
                this._httpHeaders = {};
                for (const property in stream.httpHeaders) {
                  const value = stream.httpHeaders[property];
                  if (typeof value === "undefined") {
                    continue;
                  }
                  this._httpHeaders[property] = value;
                }
                this._httpHeaders.Range = `bytes=${start2}-${end2 - 1}`;
                const handleResponse = (response) => {
                  if (response.statusCode === 404) {
                    const error = new _util2.MissingPDFException(`Missing PDF "${this._url}".`);
                    this._storedError = error;
                    return;
                  }
                  this._setReadableStream(response);
                };
                this._request = null;
                if (this._url.protocol === "http:") {
                  this._request = http.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
                } else {
                  this._request = https.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
                }
                this._request.on("error", (reason) => {
                  this._storedError = reason;
                });
                this._request.end();
              }
            }
            class PDFNodeStreamFsFullReader extends BaseFullReader {
              constructor(stream) {
                super(stream);
                let path = decodeURIComponent(this._url.path);
                if (fileUriRegex.test(this._url.href)) {
                  path = path.replace(/^\//, "");
                }
                fs.lstat(path, (error, stat) => {
                  if (error) {
                    if (error.code === "ENOENT") {
                      error = new _util2.MissingPDFException(`Missing PDF "${path}".`);
                    }
                    this._storedError = error;
                    this._headersCapability.reject(error);
                    return;
                  }
                  this._contentLength = stat.size;
                  this._setReadableStream(fs.createReadStream(path));
                  this._headersCapability.resolve();
                });
              }
            }
            class PDFNodeStreamFsRangeReader extends BaseRangeReader {
              constructor(stream, start2, end2) {
                super(stream);
                let path = decodeURIComponent(this._url.path);
                if (fileUriRegex.test(this._url.href)) {
                  path = path.replace(/^\//, "");
                }
                this._setReadableStream(fs.createReadStream(path, {
                  start: start2,
                  end: end2 - 1
                }));
              }
            }
          },
          /* 33 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.createResponseStatusError = createResponseStatusError;
            exports2.extractFilenameFromHeader = extractFilenameFromHeader;
            exports2.validateRangeRequestCapabilities = validateRangeRequestCapabilities;
            exports2.validateResponseStatus = validateResponseStatus;
            var _util2 = __w_pdfjs_require__2(1);
            var _content_disposition = __w_pdfjs_require__2(34);
            var _display_utils2 = __w_pdfjs_require__2(8);
            function validateRangeRequestCapabilities({
              getResponseHeader,
              isHttp,
              rangeChunkSize,
              disableRange
            }) {
              const returnValues = {
                allowRangeRequests: false,
                suggestedLength: void 0
              };
              const length = parseInt(getResponseHeader("Content-Length"), 10);
              if (!Number.isInteger(length)) {
                return returnValues;
              }
              returnValues.suggestedLength = length;
              if (length <= 2 * rangeChunkSize) {
                return returnValues;
              }
              if (disableRange || !isHttp) {
                return returnValues;
              }
              if (getResponseHeader("Accept-Ranges") !== "bytes") {
                return returnValues;
              }
              const contentEncoding = getResponseHeader("Content-Encoding") || "identity";
              if (contentEncoding !== "identity") {
                return returnValues;
              }
              returnValues.allowRangeRequests = true;
              return returnValues;
            }
            function extractFilenameFromHeader(getResponseHeader) {
              const contentDisposition = getResponseHeader("Content-Disposition");
              if (contentDisposition) {
                let filename = (0, _content_disposition.getFilenameFromContentDispositionHeader)(contentDisposition);
                if (filename.includes("%")) {
                  try {
                    filename = decodeURIComponent(filename);
                  } catch (ex) {
                  }
                }
                if ((0, _display_utils2.isPdfFile)(filename)) {
                  return filename;
                }
              }
              return null;
            }
            function createResponseStatusError(status, url) {
              if (status === 404 || status === 0 && url.startsWith("file:")) {
                return new _util2.MissingPDFException('Missing PDF "' + url + '".');
              }
              return new _util2.UnexpectedResponseException(`Unexpected server response (${status}) while retrieving PDF "${url}".`, status);
            }
            function validateResponseStatus(status) {
              return status === 200 || status === 206;
            }
          },
          /* 34 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.getFilenameFromContentDispositionHeader = getFilenameFromContentDispositionHeader;
            var _util2 = __w_pdfjs_require__2(1);
            function getFilenameFromContentDispositionHeader(contentDisposition) {
              let needsEncodingFixup = true;
              let tmp = toParamRegExp("filename\\*", "i").exec(contentDisposition);
              if (tmp) {
                tmp = tmp[1];
                let filename = rfc2616unquote(tmp);
                filename = unescape(filename);
                filename = rfc5987decode(filename);
                filename = rfc2047decode(filename);
                return fixupEncoding(filename);
              }
              tmp = rfc2231getparam(contentDisposition);
              if (tmp) {
                const filename = rfc2047decode(tmp);
                return fixupEncoding(filename);
              }
              tmp = toParamRegExp("filename", "i").exec(contentDisposition);
              if (tmp) {
                tmp = tmp[1];
                let filename = rfc2616unquote(tmp);
                filename = rfc2047decode(filename);
                return fixupEncoding(filename);
              }
              function toParamRegExp(attributePattern, flags) {
                return new RegExp("(?:^|;)\\s*" + attributePattern + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', flags);
              }
              function textdecode(encoding, value) {
                if (encoding) {
                  if (!/^[\x00-\xFF]+$/.test(value)) {
                    return value;
                  }
                  try {
                    const decoder = new TextDecoder(encoding, {
                      fatal: true
                    });
                    const buffer = (0, _util2.stringToBytes)(value);
                    value = decoder.decode(buffer);
                    needsEncodingFixup = false;
                  } catch (e) {
                  }
                }
                return value;
              }
              function fixupEncoding(value) {
                if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
                  value = textdecode("utf-8", value);
                  if (needsEncodingFixup) {
                    value = textdecode("iso-8859-1", value);
                  }
                }
                return value;
              }
              function rfc2231getparam(contentDispositionStr) {
                const matches = [];
                let match;
                const iter = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
                while ((match = iter.exec(contentDispositionStr)) !== null) {
                  let [, n, quot, part] = match;
                  n = parseInt(n, 10);
                  if (n in matches) {
                    if (n === 0) {
                      break;
                    }
                    continue;
                  }
                  matches[n] = [quot, part];
                }
                const parts = [];
                for (let n = 0; n < matches.length; ++n) {
                  if (!(n in matches)) {
                    break;
                  }
                  let [quot, part] = matches[n];
                  part = rfc2616unquote(part);
                  if (quot) {
                    part = unescape(part);
                    if (n === 0) {
                      part = rfc5987decode(part);
                    }
                  }
                  parts.push(part);
                }
                return parts.join("");
              }
              function rfc2616unquote(value) {
                if (value.startsWith('"')) {
                  const parts = value.slice(1).split('\\"');
                  for (let i = 0; i < parts.length; ++i) {
                    const quotindex = parts[i].indexOf('"');
                    if (quotindex !== -1) {
                      parts[i] = parts[i].slice(0, quotindex);
                      parts.length = i + 1;
                    }
                    parts[i] = parts[i].replace(/\\(.)/g, "$1");
                  }
                  value = parts.join('"');
                }
                return value;
              }
              function rfc5987decode(extvalue) {
                const encodingend = extvalue.indexOf("'");
                if (encodingend === -1) {
                  return extvalue;
                }
                const encoding = extvalue.slice(0, encodingend);
                const langvalue = extvalue.slice(encodingend + 1);
                const value = langvalue.replace(/^[^']*'/, "");
                return textdecode(encoding, value);
              }
              function rfc2047decode(value) {
                if (!value.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(value)) {
                  return value;
                }
                return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(matches, charset, encoding, text) {
                  if (encoding === "q" || encoding === "Q") {
                    text = text.replace(/_/g, " ");
                    text = text.replace(/=([0-9a-fA-F]{2})/g, function(match, hex) {
                      return String.fromCharCode(parseInt(hex, 16));
                    });
                    return textdecode(charset, text);
                  }
                  try {
                    text = atob(text);
                  } catch (e) {
                  }
                  return textdecode(charset, text);
                });
              }
              return "";
            }
          },
          /* 35 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.PDFNetworkStream = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _network_utils = __w_pdfjs_require__2(33);
            const OK_RESPONSE = 200;
            const PARTIAL_CONTENT_RESPONSE = 206;
            function getArrayBuffer(xhr) {
              const data = xhr.response;
              if (typeof data !== "string") {
                return data;
              }
              const array = (0, _util2.stringToBytes)(data);
              return array.buffer;
            }
            class NetworkManager {
              constructor(url, args = {}) {
                this.url = url;
                this.isHttp = /^https?:/i.test(url);
                this.httpHeaders = this.isHttp && args.httpHeaders || /* @__PURE__ */ Object.create(null);
                this.withCredentials = args.withCredentials || false;
                this.getXhr = args.getXhr || function NetworkManager_getXhr() {
                  return new XMLHttpRequest();
                };
                this.currXhrId = 0;
                this.pendingRequests = /* @__PURE__ */ Object.create(null);
              }
              requestRange(begin, end2, listeners) {
                const args = {
                  begin,
                  end: end2
                };
                for (const prop in listeners) {
                  args[prop] = listeners[prop];
                }
                return this.request(args);
              }
              requestFull(listeners) {
                return this.request(listeners);
              }
              request(args) {
                const xhr = this.getXhr();
                const xhrId = this.currXhrId++;
                const pendingRequest = this.pendingRequests[xhrId] = {
                  xhr
                };
                xhr.open("GET", this.url);
                xhr.withCredentials = this.withCredentials;
                for (const property in this.httpHeaders) {
                  const value = this.httpHeaders[property];
                  if (typeof value === "undefined") {
                    continue;
                  }
                  xhr.setRequestHeader(property, value);
                }
                if (this.isHttp && "begin" in args && "end" in args) {
                  xhr.setRequestHeader("Range", `bytes=${args.begin}-${args.end - 1}`);
                  pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
                } else {
                  pendingRequest.expectedStatus = OK_RESPONSE;
                }
                xhr.responseType = "arraybuffer";
                if (args.onError) {
                  xhr.onerror = function(evt) {
                    args.onError(xhr.status);
                  };
                }
                xhr.onreadystatechange = this.onStateChange.bind(this, xhrId);
                xhr.onprogress = this.onProgress.bind(this, xhrId);
                pendingRequest.onHeadersReceived = args.onHeadersReceived;
                pendingRequest.onDone = args.onDone;
                pendingRequest.onError = args.onError;
                pendingRequest.onProgress = args.onProgress;
                xhr.send(null);
                return xhrId;
              }
              onProgress(xhrId, evt) {
                var _a;
                const pendingRequest = this.pendingRequests[xhrId];
                if (!pendingRequest) {
                  return;
                }
                (_a = pendingRequest.onProgress) == null ? void 0 : _a.call(pendingRequest, evt);
              }
              onStateChange(xhrId, evt) {
                var _a, _b, _c;
                const pendingRequest = this.pendingRequests[xhrId];
                if (!pendingRequest) {
                  return;
                }
                const xhr = pendingRequest.xhr;
                if (xhr.readyState >= 2 && pendingRequest.onHeadersReceived) {
                  pendingRequest.onHeadersReceived();
                  delete pendingRequest.onHeadersReceived;
                }
                if (xhr.readyState !== 4) {
                  return;
                }
                if (!(xhrId in this.pendingRequests)) {
                  return;
                }
                delete this.pendingRequests[xhrId];
                if (xhr.status === 0 && this.isHttp) {
                  (_a = pendingRequest.onError) == null ? void 0 : _a.call(pendingRequest, xhr.status);
                  return;
                }
                const xhrStatus = xhr.status || OK_RESPONSE;
                const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;
                if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
                  (_b = pendingRequest.onError) == null ? void 0 : _b.call(pendingRequest, xhr.status);
                  return;
                }
                const chunk = getArrayBuffer(xhr);
                if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
                  const rangeHeader = xhr.getResponseHeader("Content-Range");
                  const matches = /bytes (\d+)-(\d+)\/(\d+)/.exec(rangeHeader);
                  pendingRequest.onDone({
                    begin: parseInt(matches[1], 10),
                    chunk
                  });
                } else if (chunk) {
                  pendingRequest.onDone({
                    begin: 0,
                    chunk
                  });
                } else {
                  (_c = pendingRequest.onError) == null ? void 0 : _c.call(pendingRequest, xhr.status);
                }
              }
              getRequestXhr(xhrId) {
                return this.pendingRequests[xhrId].xhr;
              }
              isPendingRequest(xhrId) {
                return xhrId in this.pendingRequests;
              }
              abortRequest(xhrId) {
                const xhr = this.pendingRequests[xhrId].xhr;
                delete this.pendingRequests[xhrId];
                xhr.abort();
              }
            }
            class PDFNetworkStream {
              constructor(source) {
                this._source = source;
                this._manager = new NetworkManager(source.url, {
                  httpHeaders: source.httpHeaders,
                  withCredentials: source.withCredentials
                });
                this._rangeChunkSize = source.rangeChunkSize;
                this._fullRequestReader = null;
                this._rangeRequestReaders = [];
              }
              _onRangeRequestReaderClosed(reader) {
                const i = this._rangeRequestReaders.indexOf(reader);
                if (i >= 0) {
                  this._rangeRequestReaders.splice(i, 1);
                }
              }
              getFullReader() {
                (0, _util2.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
                this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
                return this._fullRequestReader;
              }
              getRangeReader(begin, end2) {
                const reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end2);
                reader.onClosed = this._onRangeRequestReaderClosed.bind(this);
                this._rangeRequestReaders.push(reader);
                return reader;
              }
              cancelAllRequests(reason) {
                var _a;
                (_a = this._fullRequestReader) == null ? void 0 : _a.cancel(reason);
                for (const reader of this._rangeRequestReaders.slice(0)) {
                  reader.cancel(reason);
                }
              }
            }
            exports2.PDFNetworkStream = PDFNetworkStream;
            class PDFNetworkStreamFullRequestReader {
              constructor(manager, source) {
                this._manager = manager;
                const args = {
                  onHeadersReceived: this._onHeadersReceived.bind(this),
                  onDone: this._onDone.bind(this),
                  onError: this._onError.bind(this),
                  onProgress: this._onProgress.bind(this)
                };
                this._url = source.url;
                this._fullRequestId = manager.requestFull(args);
                this._headersReceivedCapability = (0, _util2.createPromiseCapability)();
                this._disableRange = source.disableRange || false;
                this._contentLength = source.length;
                this._rangeChunkSize = source.rangeChunkSize;
                if (!this._rangeChunkSize && !this._disableRange) {
                  this._disableRange = true;
                }
                this._isStreamingSupported = false;
                this._isRangeSupported = false;
                this._cachedChunks = [];
                this._requests = [];
                this._done = false;
                this._storedError = void 0;
                this._filename = null;
                this.onProgress = null;
              }
              _onHeadersReceived() {
                const fullRequestXhrId = this._fullRequestId;
                const fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId);
                const getResponseHeader = (name) => {
                  return fullRequestXhr.getResponseHeader(name);
                };
                const {
                  allowRangeRequests,
                  suggestedLength
                } = (0, _network_utils.validateRangeRequestCapabilities)({
                  getResponseHeader,
                  isHttp: this._manager.isHttp,
                  rangeChunkSize: this._rangeChunkSize,
                  disableRange: this._disableRange
                });
                if (allowRangeRequests) {
                  this._isRangeSupported = true;
                }
                this._contentLength = suggestedLength || this._contentLength;
                this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
                if (this._isRangeSupported) {
                  this._manager.abortRequest(fullRequestXhrId);
                }
                this._headersReceivedCapability.resolve();
              }
              _onDone(data) {
                if (data) {
                  if (this._requests.length > 0) {
                    const requestCapability = this._requests.shift();
                    requestCapability.resolve({
                      value: data.chunk,
                      done: false
                    });
                  } else {
                    this._cachedChunks.push(data.chunk);
                  }
                }
                this._done = true;
                if (this._cachedChunks.length > 0) {
                  return;
                }
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
              }
              _onError(status) {
                this._storedError = (0, _network_utils.createResponseStatusError)(status, this._url);
                this._headersReceivedCapability.reject(this._storedError);
                for (const requestCapability of this._requests) {
                  requestCapability.reject(this._storedError);
                }
                this._requests.length = 0;
                this._cachedChunks.length = 0;
              }
              _onProgress(evt) {
                var _a;
                (_a = this.onProgress) == null ? void 0 : _a.call(this, {
                  loaded: evt.loaded,
                  total: evt.lengthComputable ? evt.total : this._contentLength
                });
              }
              get filename() {
                return this._filename;
              }
              get isRangeSupported() {
                return this._isRangeSupported;
              }
              get isStreamingSupported() {
                return this._isStreamingSupported;
              }
              get contentLength() {
                return this._contentLength;
              }
              get headersReady() {
                return this._headersReceivedCapability.promise;
              }
              async read() {
                if (this._storedError) {
                  throw this._storedError;
                }
                if (this._cachedChunks.length > 0) {
                  const chunk = this._cachedChunks.shift();
                  return {
                    value: chunk,
                    done: false
                  };
                }
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                const requestCapability = (0, _util2.createPromiseCapability)();
                this._requests.push(requestCapability);
                return requestCapability.promise;
              }
              cancel(reason) {
                this._done = true;
                this._headersReceivedCapability.reject(reason);
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
                if (this._manager.isPendingRequest(this._fullRequestId)) {
                  this._manager.abortRequest(this._fullRequestId);
                }
                this._fullRequestReader = null;
              }
            }
            class PDFNetworkStreamRangeRequestReader {
              constructor(manager, begin, end2) {
                this._manager = manager;
                const args = {
                  onDone: this._onDone.bind(this),
                  onError: this._onError.bind(this),
                  onProgress: this._onProgress.bind(this)
                };
                this._url = manager.url;
                this._requestId = manager.requestRange(begin, end2, args);
                this._requests = [];
                this._queuedChunk = null;
                this._done = false;
                this._storedError = void 0;
                this.onProgress = null;
                this.onClosed = null;
              }
              _close() {
                var _a;
                (_a = this.onClosed) == null ? void 0 : _a.call(this, this);
              }
              _onDone(data) {
                const chunk = data.chunk;
                if (this._requests.length > 0) {
                  const requestCapability = this._requests.shift();
                  requestCapability.resolve({
                    value: chunk,
                    done: false
                  });
                } else {
                  this._queuedChunk = chunk;
                }
                this._done = true;
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
                this._close();
              }
              _onError(status) {
                this._storedError = (0, _network_utils.createResponseStatusError)(status, this._url);
                for (const requestCapability of this._requests) {
                  requestCapability.reject(this._storedError);
                }
                this._requests.length = 0;
                this._queuedChunk = null;
              }
              _onProgress(evt) {
                var _a;
                if (!this.isStreamingSupported) {
                  (_a = this.onProgress) == null ? void 0 : _a.call(this, {
                    loaded: evt.loaded
                  });
                }
              }
              get isStreamingSupported() {
                return false;
              }
              async read() {
                if (this._storedError) {
                  throw this._storedError;
                }
                if (this._queuedChunk !== null) {
                  const chunk = this._queuedChunk;
                  this._queuedChunk = null;
                  return {
                    value: chunk,
                    done: false
                  };
                }
                if (this._done) {
                  return {
                    value: void 0,
                    done: true
                  };
                }
                const requestCapability = (0, _util2.createPromiseCapability)();
                this._requests.push(requestCapability);
                return requestCapability.promise;
              }
              cancel(reason) {
                this._done = true;
                for (const requestCapability of this._requests) {
                  requestCapability.resolve({
                    value: void 0,
                    done: true
                  });
                }
                this._requests.length = 0;
                if (this._manager.isPendingRequest(this._requestId)) {
                  this._manager.abortRequest(this._requestId);
                }
                this._close();
              }
            }
          },
          /* 36 */
          /***/
          (__unused_webpack_module2, exports2, __w_pdfjs_require__2) => {
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.PDFFetchStream = void 0;
            var _util2 = __w_pdfjs_require__2(1);
            var _network_utils = __w_pdfjs_require__2(33);
            function createFetchOptions(headers, withCredentials, abortController) {
              return {
                method: "GET",
                headers,
                signal: abortController.signal,
                mode: "cors",
                credentials: withCredentials ? "include" : "same-origin",
                redirect: "follow"
              };
            }
            function createHeaders(httpHeaders) {
              const headers = new Headers();
              for (const property in httpHeaders) {
                const value = httpHeaders[property];
                if (typeof value === "undefined") {
                  continue;
                }
                headers.append(property, value);
              }
              return headers;
            }
            class PDFFetchStream {
              constructor(source) {
                this.source = source;
                this.isHttp = /^https?:/i.test(source.url);
                this.httpHeaders = this.isHttp && source.httpHeaders || {};
                this._fullRequestReader = null;
                this._rangeRequestReaders = [];
              }
              get _progressiveDataLength() {
                var _a;
                return ((_a = this._fullRequestReader) == null ? void 0 : _a._loaded) ?? 0;
              }
              getFullReader() {
                (0, _util2.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
                this._fullRequestReader = new PDFFetchStreamReader(this);
                return this._fullRequestReader;
              }
              getRangeReader(begin, end2) {
                if (end2 <= this._progressiveDataLength) {
                  return null;
                }
                const reader = new PDFFetchStreamRangeReader(this, begin, end2);
                this._rangeRequestReaders.push(reader);
                return reader;
              }
              cancelAllRequests(reason) {
                if (this._fullRequestReader) {
                  this._fullRequestReader.cancel(reason);
                }
                for (const reader of this._rangeRequestReaders.slice(0)) {
                  reader.cancel(reason);
                }
              }
            }
            exports2.PDFFetchStream = PDFFetchStream;
            class PDFFetchStreamReader {
              constructor(stream) {
                this._stream = stream;
                this._reader = null;
                this._loaded = 0;
                this._filename = null;
                const source = stream.source;
                this._withCredentials = source.withCredentials || false;
                this._contentLength = source.length;
                this._headersCapability = (0, _util2.createPromiseCapability)();
                this._disableRange = source.disableRange || false;
                this._rangeChunkSize = source.rangeChunkSize;
                if (!this._rangeChunkSize && !this._disableRange) {
                  this._disableRange = true;
                }
                this._abortController = new AbortController();
                this._isStreamingSupported = !source.disableStream;
                this._isRangeSupported = !source.disableRange;
                this._headers = createHeaders(this._stream.httpHeaders);
                const url = source.url;
                fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then((response) => {
                  if (!(0, _network_utils.validateResponseStatus)(response.status)) {
                    throw (0, _network_utils.createResponseStatusError)(response.status, url);
                  }
                  this._reader = response.body.getReader();
                  this._headersCapability.resolve();
                  const getResponseHeader = (name) => {
                    return response.headers.get(name);
                  };
                  const {
                    allowRangeRequests,
                    suggestedLength
                  } = (0, _network_utils.validateRangeRequestCapabilities)({
                    getResponseHeader,
                    isHttp: this._stream.isHttp,
                    rangeChunkSize: this._rangeChunkSize,
                    disableRange: this._disableRange
                  });
                  this._isRangeSupported = allowRangeRequests;
                  this._contentLength = suggestedLength || this._contentLength;
                  this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
                  if (!this._isStreamingSupported && this._isRangeSupported) {
                    this.cancel(new _util2.AbortException("Streaming is disabled."));
                  }
                }).catch(this._headersCapability.reject);
                this.onProgress = null;
              }
              get headersReady() {
                return this._headersCapability.promise;
              }
              get filename() {
                return this._filename;
              }
              get contentLength() {
                return this._contentLength;
              }
              get isRangeSupported() {
                return this._isRangeSupported;
              }
              get isStreamingSupported() {
                return this._isStreamingSupported;
              }
              async read() {
                await this._headersCapability.promise;
                const {
                  value,
                  done
                } = await this._reader.read();
                if (done) {
                  return {
                    value,
                    done
                  };
                }
                this._loaded += value.byteLength;
                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded,
                    total: this._contentLength
                  });
                }
                const buffer = new Uint8Array(value).buffer;
                return {
                  value: buffer,
                  done: false
                };
              }
              cancel(reason) {
                if (this._reader) {
                  this._reader.cancel(reason);
                }
                this._abortController.abort();
              }
            }
            class PDFFetchStreamRangeReader {
              constructor(stream, begin, end2) {
                this._stream = stream;
                this._reader = null;
                this._loaded = 0;
                const source = stream.source;
                this._withCredentials = source.withCredentials || false;
                this._readCapability = (0, _util2.createPromiseCapability)();
                this._isStreamingSupported = !source.disableStream;
                this._abortController = new AbortController();
                this._headers = createHeaders(this._stream.httpHeaders);
                this._headers.append("Range", `bytes=${begin}-${end2 - 1}`);
                const url = source.url;
                fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then((response) => {
                  if (!(0, _network_utils.validateResponseStatus)(response.status)) {
                    throw (0, _network_utils.createResponseStatusError)(response.status, url);
                  }
                  this._readCapability.resolve();
                  this._reader = response.body.getReader();
                }).catch(this._readCapability.reject);
                this.onProgress = null;
              }
              get isStreamingSupported() {
                return this._isStreamingSupported;
              }
              async read() {
                await this._readCapability.promise;
                const {
                  value,
                  done
                } = await this._reader.read();
                if (done) {
                  return {
                    value,
                    done
                  };
                }
                this._loaded += value.byteLength;
                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded
                  });
                }
                const buffer = new Uint8Array(value).buffer;
                return {
                  value: buffer,
                  done: false
                };
              }
              cancel(reason) {
                if (this._reader) {
                  this._reader.cancel(reason);
                }
                this._abortController.abort();
              }
            }
          }
          /******/
        ];
        var __webpack_module_cache__ = {};
        function __w_pdfjs_require__(moduleId) {
          var cachedModule = __webpack_module_cache__[moduleId];
          if (cachedModule !== void 0) {
            return cachedModule.exports;
          }
          var module2 = __webpack_module_cache__[moduleId] = {
            /******/
            // no module.id needed
            /******/
            // no module.loaded needed
            /******/
            exports: {}
            /******/
          };
          __webpack_modules__[moduleId](module2, module2.exports, __w_pdfjs_require__);
          return module2.exports;
        }
        var __webpack_exports__ = {};
        (() => {
          var exports2 = __webpack_exports__;
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          Object.defineProperty(exports2, "AnnotationEditorLayer", {
            enumerable: true,
            get: function() {
              return _annotation_editor_layer.AnnotationEditorLayer;
            }
          });
          Object.defineProperty(exports2, "AnnotationEditorParamsType", {
            enumerable: true,
            get: function() {
              return _util2.AnnotationEditorParamsType;
            }
          });
          Object.defineProperty(exports2, "AnnotationEditorType", {
            enumerable: true,
            get: function() {
              return _util2.AnnotationEditorType;
            }
          });
          Object.defineProperty(exports2, "AnnotationEditorUIManager", {
            enumerable: true,
            get: function() {
              return _tools.AnnotationEditorUIManager;
            }
          });
          Object.defineProperty(exports2, "AnnotationLayer", {
            enumerable: true,
            get: function() {
              return _annotation_layer.AnnotationLayer;
            }
          });
          Object.defineProperty(exports2, "AnnotationMode", {
            enumerable: true,
            get: function() {
              return _util2.AnnotationMode;
            }
          });
          Object.defineProperty(exports2, "CMapCompressionType", {
            enumerable: true,
            get: function() {
              return _util2.CMapCompressionType;
            }
          });
          Object.defineProperty(exports2, "GlobalWorkerOptions", {
            enumerable: true,
            get: function() {
              return _worker_options2.GlobalWorkerOptions;
            }
          });
          Object.defineProperty(exports2, "InvalidPDFException", {
            enumerable: true,
            get: function() {
              return _util2.InvalidPDFException;
            }
          });
          Object.defineProperty(exports2, "LoopbackPort", {
            enumerable: true,
            get: function() {
              return _api.LoopbackPort;
            }
          });
          Object.defineProperty(exports2, "MissingPDFException", {
            enumerable: true,
            get: function() {
              return _util2.MissingPDFException;
            }
          });
          Object.defineProperty(exports2, "OPS", {
            enumerable: true,
            get: function() {
              return _util2.OPS;
            }
          });
          Object.defineProperty(exports2, "PDFDataRangeTransport", {
            enumerable: true,
            get: function() {
              return _api.PDFDataRangeTransport;
            }
          });
          Object.defineProperty(exports2, "PDFDateString", {
            enumerable: true,
            get: function() {
              return _display_utils2.PDFDateString;
            }
          });
          Object.defineProperty(exports2, "PDFWorker", {
            enumerable: true,
            get: function() {
              return _api.PDFWorker;
            }
          });
          Object.defineProperty(exports2, "PasswordResponses", {
            enumerable: true,
            get: function() {
              return _util2.PasswordResponses;
            }
          });
          Object.defineProperty(exports2, "PermissionFlag", {
            enumerable: true,
            get: function() {
              return _util2.PermissionFlag;
            }
          });
          Object.defineProperty(exports2, "PixelsPerInch", {
            enumerable: true,
            get: function() {
              return _display_utils2.PixelsPerInch;
            }
          });
          Object.defineProperty(exports2, "RenderingCancelledException", {
            enumerable: true,
            get: function() {
              return _display_utils2.RenderingCancelledException;
            }
          });
          Object.defineProperty(exports2, "SVGGraphics", {
            enumerable: true,
            get: function() {
              return _svg.SVGGraphics;
            }
          });
          Object.defineProperty(exports2, "UNSUPPORTED_FEATURES", {
            enumerable: true,
            get: function() {
              return _util2.UNSUPPORTED_FEATURES;
            }
          });
          Object.defineProperty(exports2, "UnexpectedResponseException", {
            enumerable: true,
            get: function() {
              return _util2.UnexpectedResponseException;
            }
          });
          Object.defineProperty(exports2, "Util", {
            enumerable: true,
            get: function() {
              return _util2.Util;
            }
          });
          Object.defineProperty(exports2, "VerbosityLevel", {
            enumerable: true,
            get: function() {
              return _util2.VerbosityLevel;
            }
          });
          Object.defineProperty(exports2, "XfaLayer", {
            enumerable: true,
            get: function() {
              return _xfa_layer.XfaLayer;
            }
          });
          Object.defineProperty(exports2, "build", {
            enumerable: true,
            get: function() {
              return _api.build;
            }
          });
          Object.defineProperty(exports2, "createPromiseCapability", {
            enumerable: true,
            get: function() {
              return _util2.createPromiseCapability;
            }
          });
          Object.defineProperty(exports2, "createValidAbsoluteUrl", {
            enumerable: true,
            get: function() {
              return _util2.createValidAbsoluteUrl;
            }
          });
          Object.defineProperty(exports2, "getDocument", {
            enumerable: true,
            get: function() {
              return _api.getDocument;
            }
          });
          Object.defineProperty(exports2, "getFilenameFromUrl", {
            enumerable: true,
            get: function() {
              return _display_utils2.getFilenameFromUrl;
            }
          });
          Object.defineProperty(exports2, "getPdfFilenameFromUrl", {
            enumerable: true,
            get: function() {
              return _display_utils2.getPdfFilenameFromUrl;
            }
          });
          Object.defineProperty(exports2, "getXfaPageViewport", {
            enumerable: true,
            get: function() {
              return _display_utils2.getXfaPageViewport;
            }
          });
          Object.defineProperty(exports2, "isPdfFile", {
            enumerable: true,
            get: function() {
              return _display_utils2.isPdfFile;
            }
          });
          Object.defineProperty(exports2, "loadScript", {
            enumerable: true,
            get: function() {
              return _display_utils2.loadScript;
            }
          });
          Object.defineProperty(exports2, "renderTextLayer", {
            enumerable: true,
            get: function() {
              return _text_layer.renderTextLayer;
            }
          });
          Object.defineProperty(exports2, "shadow", {
            enumerable: true,
            get: function() {
              return _util2.shadow;
            }
          });
          Object.defineProperty(exports2, "version", {
            enumerable: true,
            get: function() {
              return _api.version;
            }
          });
          var _util2 = __w_pdfjs_require__(1);
          var _api = __w_pdfjs_require__(4);
          var _display_utils2 = __w_pdfjs_require__(8);
          var _annotation_editor_layer = __w_pdfjs_require__(22);
          var _tools = __w_pdfjs_require__(7);
          var _annotation_layer = __w_pdfjs_require__(27);
          var _worker_options2 = __w_pdfjs_require__(15);
          var _is_node2 = __w_pdfjs_require__(3);
          var _text_layer = __w_pdfjs_require__(30);
          var _svg = __w_pdfjs_require__(31);
          var _xfa_layer = __w_pdfjs_require__(29);
          {
            if (_is_node2.isNodeJS) {
              const {
                PDFNodeStream
              } = __w_pdfjs_require__(32);
              (0, _api.setPDFNetworkStreamFactory)((params) => {
                return new PDFNodeStream(params);
              });
            } else {
              const {
                PDFNetworkStream
              } = __w_pdfjs_require__(35);
              const {
                PDFFetchStream
              } = __w_pdfjs_require__(36);
              (0, _api.setPDFNetworkStreamFactory)((params) => {
                if ((0, _display_utils2.isValidFetchUrl)(params.url)) {
                  return new PDFFetchStream(params);
                }
                return new PDFNetworkStream(params);
              });
            }
          }
        })();
        return __webpack_exports__;
      })()
    );
  });
})(pdf);
function _objectWithoutProperties$1(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var clipboardEvents = ["onCopy", "onCut", "onPaste"];
var compositionEvents = [
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate"
];
var keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"];
var focusEvents = ["onFocus", "onBlur"];
var formEvents = ["onChange", "onInput", "onInvalid", "onReset", "onSubmit"];
var genericEvents = ["onError", "onLoad"];
var mouseEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp"
];
var pointerEvents = [
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut"
];
var selectionEvents = ["onSelect"];
var touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
var uiEvents = ["onScroll"];
var wheelEvents = ["onWheel"];
var mediaEvents = [
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting"
];
var imageEvents = ["onLoad", "onError"];
var animationEvents = [
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration"
];
var transitionEvents = ["onTransitionEnd"];
var otherEvents = ["onToggle"];
var allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], clipboardEvents, true), compositionEvents, true), keyboardEvents, true), focusEvents, true), formEvents, true), genericEvents, true), mouseEvents, true), pointerEvents, true), selectionEvents, true), touchEvents, true), uiEvents, true), wheelEvents, true), mediaEvents, true), imageEvents, true), animationEvents, true), transitionEvents, true), otherEvents, true);
function makeEventProps(props, getArgs) {
  var eventProps2 = {};
  allEvents.forEach(function(eventName) {
    var eventHandler = props[eventName];
    if (!eventHandler) {
      return;
    }
    if (!getArgs) {
      eventProps2[eventName] = eventHandler;
      return;
    }
    eventProps2[eventName] = function(event) {
      return eventHandler(event, getArgs(eventName));
    };
  });
  return eventProps2;
}
function makeCancellablePromise(promise) {
  var isCancelled = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(value) {
      return !isCancelled && resolve(value);
    }).catch(function(error) {
      return !isCancelled && reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function() {
      isCancelled = true;
    }
  };
}
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var isProduction$1 = true;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction$1) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}
var isProduction = true;
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
const DocumentContext = /* @__PURE__ */ reactExports.createContext(null);
function Message(_ref) {
  var children = _ref.children, type = _ref.type;
  return /* @__PURE__ */ React.createElement("div", {
    className: "react-pdf__message react-pdf__message--".concat(type)
  }, children);
}
Message.propTypes = {
  children: propTypesExports.node,
  type: propTypesExports.oneOf(["error", "loading", "no-data"]).isRequired
};
var DEFAULT_LINK_REL = "noopener noreferrer nofollow";
var LinkService = /* @__PURE__ */ function() {
  function LinkService2() {
    _classCallCheck(this, LinkService2);
    this.externalLinkTarget = null;
    this.externalLinkRel = null;
  }
  _createClass(LinkService2, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      this.pdfDocument = pdfDocument;
    }
  }, {
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setExternalLinkRel",
    value: function setExternalLinkRel(externalLinkRel) {
      this.externalLinkRel = externalLinkRel;
    }
  }, {
    key: "setExternalLinkTarget",
    value: function setExternalLinkTarget(externalLinkTarget) {
      this.externalLinkTarget = externalLinkTarget;
    }
  }, {
    key: "setHistory",
    value: function setHistory() {
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function get() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function set(value) {
      this.pdfViewer.currentPageNumber = value;
    }
  }, {
    key: "rotation",
    get: function get() {
      return 0;
    },
    set: function set(value) {
    }
  }, {
    key: "goToDestination",
    value: function goToDestination(dest) {
      var _this = this;
      new Promise(function(resolve) {
        if (typeof dest === "string") {
          _this.pdfDocument.getDestination(dest).then(resolve);
        } else if (Array.isArray(dest)) {
          resolve(dest);
        } else {
          dest.then(resolve);
        }
      }).then(function(explicitDest) {
        invariant(Array.isArray(explicitDest), '"'.concat(explicitDest, '" is not a valid destination array.'));
        var destRef = explicitDest[0];
        new Promise(function(resolve) {
          if (destRef instanceof Object) {
            _this.pdfDocument.getPageIndex(destRef).then(function(pageIndex) {
              resolve(pageIndex);
            })["catch"](function() {
              invariant(false, '"'.concat(destRef, '" is not a valid page reference.'));
            });
          } else if (typeof destRef === "number") {
            resolve(destRef);
          } else {
            invariant(false, '"'.concat(destRef, '" is not a valid destination reference.'));
          }
        }).then(function(pageIndex) {
          var pageNumber = pageIndex + 1;
          invariant(pageNumber >= 1 && pageNumber <= _this.pagesCount, '"'.concat(pageNumber, '" is not a valid page number.'));
          _this.pdfViewer.scrollPageIntoView({
            dest,
            pageIndex,
            pageNumber
          });
        });
      });
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(dest) {
      this.goToDestination(dest);
    }
  }, {
    key: "goToPage",
    value: function goToPage() {
    }
  }, {
    key: "addLinkAttributes",
    value: function addLinkAttributes(link, url, newWindow) {
      link.href = url;
      link.rel = this.externalLinkRel || DEFAULT_LINK_REL;
      link.target = newWindow ? "_blank" : this.externalLinkTarget || "";
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash() {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl() {
      return "#";
    }
  }, {
    key: "setHash",
    value: function setHash() {
    }
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction() {
    }
  }, {
    key: "cachePageRef",
    value: function cachePageRef() {
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible() {
      return true;
    }
  }, {
    key: "isPageCached",
    value: function isPageCached() {
      return true;
    }
  }]);
  return LinkService2;
}();
var PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
var isBrowser = typeof document !== "undefined";
var isLocalFileSystem = isBrowser && window.location.protocol === "file:";
function isDefined(variable) {
  return typeof variable !== "undefined";
}
function isProvided(variable) {
  return isDefined(variable) && variable !== null;
}
function isString(variable) {
  return typeof variable === "string";
}
function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
}
function isBlob(variable) {
  invariant(isBrowser, "isBlob can only be used in a browser environment");
  return variable instanceof Blob;
}
function isFile$1(variable) {
  invariant(isBrowser, "isFile can only be used in a browser environment");
  return variable instanceof File;
}
function isDataURI(str) {
  return isString(str) && /^data:/.test(str);
}
function dataURItoByteString(dataURI) {
  invariant(isDataURI(dataURI), "Invalid data URI.");
  var _dataURI$split = dataURI.split(","), _dataURI$split2 = _slicedToArray(_dataURI$split, 2), headersString = _dataURI$split2[0], dataString = _dataURI$split2[1];
  var headers = headersString.split(";");
  if (headers.indexOf("base64") !== -1) {
    return atob(dataString);
  }
  return unescape(dataString);
}
function getDevicePixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
}
var allowFileAccessFromFilesTip = "On Chromium based browsers, you can use --allow-file-access-from-files flag for debugging purposes.";
function displayCORSWarning() {
  warning(!isLocalFileSystem, "Loading PDF as base64 strings/URLs may not work on protocols other than HTTP/HTTPS. ".concat(allowFileAccessFromFilesTip));
}
function displayWorkerWarning() {
  warning(!isLocalFileSystem, "Loading PDF.js worker may not work on protocols other than HTTP/HTTPS. ".concat(allowFileAccessFromFilesTip));
}
function cancelRunningTask(runningTask) {
  if (runningTask && runningTask.cancel)
    runningTask.cancel();
}
function makePageCallback(page, scale) {
  Object.defineProperty(page, "width", {
    get: function get() {
      return this.view[2] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "height", {
    get: function get() {
      return this.view[3] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "originalWidth", {
    get: function get() {
      return this.view[2];
    },
    configurable: true
  });
  Object.defineProperty(page, "originalHeight", {
    get: function get() {
      return this.view[3];
    },
    configurable: true
  });
  return page;
}
function isCancelException(error) {
  return error.name === "RenderingCancelledException";
}
function loadFromFile(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      return resolve(new Uint8Array(reader.result));
    };
    reader.onerror = function(event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          return reject(new Error("Error while reading a file: File not found."));
        case event.target.error.NOT_READABLE_ERR:
          return reject(new Error("Error while reading a file: File not readable."));
        case event.target.error.SECURITY_ERR:
          return reject(new Error("Error while reading a file: Security error."));
        case event.target.error.ABORT_ERR:
          return reject(new Error("Error while reading a file: Aborted."));
        default:
          return reject(new Error("Error while reading a file."));
      }
    };
    reader.readAsArrayBuffer(file);
    return null;
  });
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var eventProps = function() {
  var result = {};
  [].concat(_toConsumableArray(mouseEvents), _toConsumableArray(touchEvents), _toConsumableArray(keyboardEvents)).forEach(function(eventName) {
    result[eventName] = propTypesExports.func;
  });
  return result;
}();
var fileTypes = [propTypesExports.string, propTypesExports.instanceOf(ArrayBuffer), propTypesExports.shape({
  data: propTypesExports.oneOfType([propTypesExports.object, propTypesExports.string]),
  httpHeaders: propTypesExports.object,
  range: propTypesExports.object,
  url: propTypesExports.string,
  withCredentials: propTypesExports.bool
})];
if (typeof File !== "undefined") {
  fileTypes.push(propTypesExports.instanceOf(File));
}
if (typeof Blob !== "undefined") {
  fileTypes.push(propTypesExports.instanceOf(Blob));
}
var isClassName = propTypesExports.oneOfType([propTypesExports.string, propTypesExports.arrayOf(propTypesExports.string)]);
var isFile = propTypesExports.oneOfType(fileTypes);
var isLinkService = propTypesExports.instanceOf(LinkService);
propTypesExports.oneOf(["_self", "_blank", "_parent", "_top"]);
var isPage = propTypesExports.shape({
  commonObjs: propTypesExports.shape({}).isRequired,
  getAnnotations: propTypesExports.func.isRequired,
  getTextContent: propTypesExports.func.isRequired,
  getViewport: propTypesExports.func.isRequired,
  render: propTypesExports.func.isRequired
});
var isPageIndex = function isPageIndex2(props, propName, componentName) {
  var pageIndex = props[propName], pageNumber = props.pageNumber, pdf2 = props.pdf;
  if (!isDefined(pdf2)) {
    return null;
  }
  if (isDefined(pageIndex)) {
    if (typeof pageIndex !== "number") {
      return new Error("`".concat(propName, "` of type `").concat(_typeof(pageIndex), "` supplied to `").concat(componentName, "`, expected `number`."));
    }
    if (pageIndex < 0) {
      return new Error("Expected `".concat(propName, "` to be greater or equal to 0."));
    }
    var numPages = pdf2.numPages;
    if (pageIndex + 1 > numPages) {
      return new Error("Expected `".concat(propName, "` to be less or equal to ").concat(numPages - 1, "."));
    }
  } else if (!isDefined(pageNumber)) {
    return new Error("`".concat(propName, "` not supplied. Either pageIndex or pageNumber must be supplied to `").concat(componentName, "`."));
  }
  return null;
};
var isPageNumber = function isPageNumber2(props, propName, componentName) {
  var pageNumber = props[propName], pageIndex = props.pageIndex, pdf2 = props.pdf;
  if (!isDefined(pdf2)) {
    return null;
  }
  if (isDefined(pageNumber)) {
    if (typeof pageNumber !== "number") {
      return new Error("`".concat(propName, "` of type `").concat(_typeof(pageNumber), "` supplied to `").concat(componentName, "`, expected `number`."));
    }
    if (pageNumber < 1) {
      return new Error("Expected `".concat(propName, "` to be greater or equal to 1."));
    }
    var numPages = pdf2.numPages;
    if (pageNumber > numPages) {
      return new Error("Expected `".concat(propName, "` to be less or equal to ").concat(numPages, "."));
    }
  } else if (!isDefined(pageIndex)) {
    return new Error("`".concat(propName, "` not supplied. Either pageIndex or pageNumber must be supplied to `").concat(componentName, "`."));
  }
  return null;
};
var isPdf = propTypesExports.oneOfType([propTypesExports.shape({
  getDestination: propTypesExports.func.isRequired,
  getOutline: propTypesExports.func.isRequired,
  getPage: propTypesExports.func.isRequired,
  numPages: propTypesExports.number.isRequired
}), propTypesExports.bool]);
var isRef = propTypesExports.oneOfType([propTypesExports.func, propTypesExports.shape({
  current: propTypesExports.any
})]);
var isRenderMode = propTypesExports.oneOf(["canvas", "none", "svg"]);
var isRotate = propTypesExports.oneOf([0, 90, 180, 270]);
var _excluded$1 = ["url"];
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$3(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createSuper$5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$5() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PDFDataRangeTransport = pdfExports.PDFDataRangeTransport;
var Document = /* @__PURE__ */ function(_PureComponent) {
  _inherits(Document2, _PureComponent);
  var _super = _createSuper$5(Document2);
  function Document2() {
    var _this;
    _classCallCheck(this, Document2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      pdf: null
    });
    _defineProperty(_assertThisInitialized(_this), "viewer", {
      scrollPageIntoView: function scrollPageIntoView(_ref) {
        var dest = _ref.dest, pageIndex = _ref.pageIndex, pageNumber = _ref.pageNumber;
        var onItemClick = _this.props.onItemClick;
        if (onItemClick) {
          onItemClick({
            dest,
            pageIndex,
            pageNumber
          });
          return;
        }
        var page = _this.pages[pageIndex];
        if (page) {
          page.scrollIntoView();
          return;
        }
        warning(false, "An internal link leading to page ".concat(pageNumber, " was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>."));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "linkService", new LinkService());
    _defineProperty(_assertThisInitialized(_this), "loadDocument", function() {
      cancelRunningTask(_this.runningTask);
      if (_this.loadingTask)
        _this.loadingTask.destroy();
      var cancellable = makeCancellablePromise(_this.findDocumentSource());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(source) {
        _this.onSourceSuccess();
        if (!source) {
          return;
        }
        _this.setState(function(prevState) {
          if (!prevState.pdf) {
            return null;
          }
          return {
            pdf: null
          };
        });
        var _this$props = _this.props, options = _this$props.options, onLoadProgress = _this$props.onLoadProgress, onPassword2 = _this$props.onPassword;
        var destroyable = pdfExports.getDocument(_objectSpread$3(_objectSpread$3({}, source), options));
        destroyable.onPassword = onPassword2;
        if (onLoadProgress) {
          destroyable.onProgress = onLoadProgress;
        }
        _this.loadingTask = destroyable;
        destroyable.promise.then(function(pdf2) {
          _this.setState(function(prevState) {
            if (prevState.pdf && prevState.pdf.fingerprint === pdf2.fingerprint) {
              return null;
            }
            return {
              pdf: pdf2
            };
          }, _this.onLoadSuccess);
        })["catch"](function(error) {
          _this.onLoadError(error);
        });
      })["catch"](function(error) {
        _this.onSourceError(error);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setupLinkService", function() {
      var _this$props2 = _this.props, externalLinkRel = _this$props2.externalLinkRel, externalLinkTarget = _this$props2.externalLinkTarget;
      _this.linkService.setViewer(_this.viewer);
      _this.linkService.setExternalLinkRel(externalLinkRel);
      _this.linkService.setExternalLinkTarget(externalLinkTarget);
    });
    _defineProperty(_assertThisInitialized(_this), "onSourceSuccess", function() {
      var onSourceSuccess = _this.props.onSourceSuccess;
      if (onSourceSuccess)
        onSourceSuccess();
    });
    _defineProperty(_assertThisInitialized(_this), "onSourceError", function(error) {
      warning(error);
      var onSourceError = _this.props.onSourceError;
      if (onSourceError)
        onSourceError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadSuccess", function() {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var pdf2 = _this.state.pdf;
      if (onLoadSuccess)
        onLoadSuccess(pdf2);
      _this.pages = new Array(pdf2.numPages);
      _this.linkService.setDocument(pdf2);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadError", function(error) {
      _this.setState({
        pdf: false
      });
      warning(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError)
        onLoadError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "findDocumentSource", function() {
      return new Promise(function(resolve) {
        var file = _this.props.file;
        if (!file) {
          resolve(null);
        }
        if (typeof file === "string") {
          if (isDataURI(file)) {
            var fileByteString = dataURItoByteString(file);
            resolve({
              data: fileByteString
            });
          }
          displayCORSWarning();
          resolve({
            url: file
          });
        }
        if (file instanceof PDFDataRangeTransport) {
          resolve({
            range: file
          });
        }
        if (isArrayBuffer(file)) {
          resolve({
            data: file
          });
        }
        if (isBrowser) {
          if (isBlob(file) || isFile$1(file)) {
            loadFromFile(file).then(function(data) {
              resolve({
                data
              });
            });
            return;
          }
        }
        invariant(_typeof(file) === "object", "Invalid parameter in file, need either Uint8Array, string or a parameter object");
        invariant(file.url || file.data || file.range, "Invalid parameter object: need either .data, .range or .url");
        if (typeof file.url === "string") {
          if (isDataURI(file.url)) {
            var url = file.url, otherParams = _objectWithoutProperties$1(file, _excluded$1);
            var _fileByteString = dataURItoByteString(url);
            resolve(_objectSpread$3({
              data: _fileByteString
            }, otherParams));
          }
          displayCORSWarning();
        }
        resolve(file);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "registerPage", function(pageIndex, ref) {
      _this.pages[pageIndex] = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "unregisterPage", function(pageIndex) {
      delete _this.pages[pageIndex];
    });
    return _this;
  }
  _createClass(Document2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadDocument();
      this.setupLinkService();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var file = this.props.file;
      if (file !== prevProps.file) {
        this.loadDocument();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
      if (this.loadingTask)
        this.loadingTask.destroy();
    }
  }, {
    key: "childContext",
    get: function get() {
      var linkService = this.linkService, registerPage = this.registerPage, unregisterPage = this.unregisterPage;
      var _this$props3 = this.props, imageResourcesPath = _this$props3.imageResourcesPath, renderMode = _this$props3.renderMode, rotate = _this$props3.rotate;
      var pdf2 = this.state.pdf;
      return {
        imageResourcesPath,
        linkService,
        pdf: pdf2,
        registerPage,
        renderMode,
        rotate,
        unregisterPage
      };
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;
      return makeEventProps(this.props, function() {
        return _this2.state.pdf;
      });
    }
    /**
     * Called when a document source is resolved correctly
     */
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return /* @__PURE__ */ React.createElement(DocumentContext.Provider, {
        value: this.childContext
      }, children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var file = this.props.file;
      var pdf2 = this.state.pdf;
      if (!file) {
        var noData = this.props.noData;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "no-data"
        }, typeof noData === "function" ? noData() : noData);
      }
      if (pdf2 === null) {
        var loading = this.props.loading;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "loading"
        }, typeof loading === "function" ? loading() : loading);
      }
      if (pdf2 === false) {
        var error = this.props.error;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "error"
        }, typeof error === "function" ? error() : error);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, className = _this$props4.className, inputRef = _this$props4.inputRef;
      return /* @__PURE__ */ React.createElement("div", _extends$1({
        className: clsx("react-pdf__Document", className),
        ref: inputRef
      }, this.eventProps), this.renderContent());
    }
  }]);
  return Document2;
}(reactExports.PureComponent);
Document.defaultProps = {
  error: "Failed to load PDF file.",
  loading: "Loading PDF…",
  noData: "No PDF file specified.",
  onPassword: function onPassword(callback, reason) {
    switch (reason) {
      case PasswordResponses.NEED_PASSWORD: {
        var password = prompt("Enter the password to open this PDF file.");
        callback(password);
        break;
      }
      case PasswordResponses.INCORRECT_PASSWORD: {
        var _password = prompt("Invalid password. Please try again.");
        callback(_password);
        break;
      }
    }
  }
};
var isFunctionOrNode$1 = propTypesExports.oneOfType([propTypesExports.func, propTypesExports.node]);
Document.propTypes = _objectSpread$3(_objectSpread$3({}, eventProps), {}, {
  children: propTypesExports.node,
  className: isClassName,
  error: isFunctionOrNode$1,
  externalLinkRel: propTypesExports.string,
  externalLinkTarget: propTypesExports.string,
  file: isFile,
  imageResourcesPath: propTypesExports.string,
  inputRef: isRef,
  loading: isFunctionOrNode$1,
  noData: isFunctionOrNode$1,
  onItemClick: propTypesExports.func,
  onLoadError: propTypesExports.func,
  onLoadProgress: propTypesExports.func,
  onLoadSuccess: propTypesExports.func,
  onPassword: propTypesExports.func,
  onSourceError: propTypesExports.func,
  onSourceSuccess: propTypesExports.func,
  rotate: propTypesExports.number
});
var isDestination = propTypesExports.oneOfType([propTypesExports.string, propTypesExports.arrayOf(propTypesExports.any)]);
({
  item: propTypesExports.shape({
    dest: isDestination,
    items: propTypesExports.arrayOf(propTypesExports.shape({
      dest: isDestination,
      title: propTypesExports.string
    })),
    title: propTypesExports.string
  }).isRequired,
  onClick: propTypesExports.func,
  pdf: isPdf.isRequired
});
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
_objectSpread$2({
  className: isClassName,
  inputRef: isRef,
  onItemClick: propTypesExports.func,
  onLoadError: propTypesExports.func,
  onLoadSuccess: propTypesExports.func,
  pdf: isPdf
}, eventProps);
function mergeRefs() {
  var inputRefs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputRefs[_i] = arguments[_i];
  }
  var filteredInputRefs = inputRefs.filter(Boolean);
  if (filteredInputRefs.length <= 1) {
    var firstRef = filteredInputRefs[0];
    return firstRef || null;
  }
  return function mergedRefs(ref) {
    filteredInputRefs.forEach(function(inputRef) {
      if (typeof inputRef === "function") {
        inputRef(ref);
      } else if (inputRef) {
        inputRef.current = ref;
      }
    });
  };
}
const PageContext = /* @__PURE__ */ reactExports.createContext(null);
function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var ANNOTATION_MODE = pdfExports.AnnotationMode;
var PageCanvasInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits(PageCanvasInternal2, _PureComponent);
  var _super = _createSuper$4(PageCanvasInternal2);
  function PageCanvasInternal2() {
    var _this;
    _classCallCheck(this, PageCanvasInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "canvasElement", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "onRenderSuccess", function() {
      _this.renderer = null;
      var _this$props = _this.props, onRenderSuccess = _this$props.onRenderSuccess, page = _this$props.page, scale = _this$props.scale;
      if (onRenderSuccess)
        onRenderSuccess(makePageCallback(page, scale));
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderError", function(error) {
      if (isCancelException(error)) {
        return;
      }
      warning(error);
      var onRenderError = _this.props.onRenderError;
      if (onRenderError)
        onRenderError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "drawPageOnCanvas", function() {
      var canvas = _this.canvasElement.current;
      if (!canvas) {
        return null;
      }
      var _assertThisInitialize = _assertThisInitialized(_this), renderViewport = _assertThisInitialize.renderViewport, viewport2 = _assertThisInitialize.viewport;
      var _this$props2 = _this.props, canvasBackground = _this$props2.canvasBackground, page = _this$props2.page, renderForms = _this$props2.renderForms;
      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      canvas.style.width = "".concat(Math.floor(viewport2.width), "px");
      canvas.style.height = "".concat(Math.floor(viewport2.height), "px");
      var renderContext = {
        annotationMode: renderForms ? ANNOTATION_MODE.ENABLE_FORMS : ANNOTATION_MODE.ENABLE,
        get canvasContext() {
          return canvas.getContext("2d", {
            alpha: false
          });
        },
        viewport: renderViewport
      };
      if (canvasBackground) {
        renderContext.background = canvasBackground;
      }
      _this.cancelRenderingTask();
      var cancellable = page.render(renderContext);
      _this.renderer = cancellable;
      return cancellable.promise.then(_this.onRenderSuccess)["catch"](_this.onRenderError);
    });
    return _this;
  }
  _createClass(PageCanvasInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawPageOnCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props, canvasBackground = _this$props3.canvasBackground, devicePixelRatio = _this$props3.devicePixelRatio, page = _this$props3.page, renderForms = _this$props3.renderForms;
      if (canvasBackground !== prevProps.canvasBackground || devicePixelRatio !== prevProps.devicePixelRatio || renderForms !== prevProps.renderForms) {
        page.cleanup();
        this.drawPageOnCanvas();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRenderingTask();
      var canvas = this.canvasElement.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    }
  }, {
    key: "cancelRenderingTask",
    value: function cancelRenderingTask() {
      if (this.renderer) {
        this.renderer.cancel();
        this.renderer = null;
      }
    }
    /**
     * Called when a page is rendered successfully.
     */
  }, {
    key: "devicePixelRatio",
    get: function get() {
      var devicePixelRatio = this.props.devicePixelRatio;
      return devicePixelRatio || getDevicePixelRatio();
    }
  }, {
    key: "renderViewport",
    get: function get() {
      var devicePixelRatio = this.devicePixelRatio;
      var _this$props4 = this.props, page = _this$props4.page, rotate = _this$props4.rotate, scale = _this$props4.scale;
      return page.getViewport({
        scale: scale * devicePixelRatio,
        rotation: rotate
      });
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props5 = this.props, page = _this$props5.page, rotate = _this$props5.rotate, scale = _this$props5.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var canvasRef = this.props.canvasRef;
      return /* @__PURE__ */ React.createElement("canvas", {
        className: "react-pdf__Page__canvas",
        dir: "ltr",
        ref: mergeRefs(canvasRef, this.canvasElement),
        style: {
          display: "block",
          userSelect: "none"
        }
      });
    }
  }]);
  return PageCanvasInternal2;
}(reactExports.PureComponent);
PageCanvasInternal.propTypes = {
  canvasBackground: propTypesExports.string,
  canvasRef: isRef,
  devicePixelRatio: propTypesExports.number,
  onRenderError: propTypesExports.func,
  onRenderSuccess: propTypesExports.func,
  page: isPage.isRequired,
  renderForms: propTypesExports.bool,
  rotate: isRotate,
  scale: propTypesExports.number.isRequired
};
function PageCanvas(props) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(context) {
    return /* @__PURE__ */ React.createElement(PageCanvasInternal, _extends$1({}, context, props));
  });
}
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PageSVGInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits(PageSVGInternal2, _PureComponent);
  var _super = _createSuper$3(PageSVGInternal2);
  function PageSVGInternal2() {
    var _this;
    _classCallCheck(this, PageSVGInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      svg: null
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderSuccess", function() {
      _this.renderer = null;
      var _this$props = _this.props, onRenderSuccess = _this$props.onRenderSuccess, page = _this$props.page, scale = _this$props.scale;
      if (onRenderSuccess)
        onRenderSuccess(makePageCallback(page, scale));
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderError", function(error) {
      if (isCancelException(error)) {
        return;
      }
      warning(error);
      var onRenderError = _this.props.onRenderError;
      if (onRenderError)
        onRenderError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "renderSVG", function() {
      var page = _this.props.page;
      _this.renderer = page.getOperatorList();
      return _this.renderer.then(function(operatorList) {
        var svgGfx = new pdfExports.SVGGraphics(page.commonObjs, page.objs);
        _this.renderer = svgGfx.getSVG(operatorList, _this.viewport).then(function(svg) {
          _this.setState({
            svg
          }, _this.onRenderSuccess);
        })["catch"](_this.onRenderError);
      })["catch"](_this.onRenderError);
    });
    _defineProperty(_assertThisInitialized(_this), "drawPageOnContainer", function(element) {
      var svg = _this.state.svg;
      if (!element || !svg) {
        return;
      }
      if (!element.firstElementChild) {
        element.appendChild(svg);
      }
      var _this$viewport = _this.viewport, width = _this$viewport.width, height = _this$viewport.height;
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
    });
    return _this;
  }
  _createClass(PageSVGInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderSVG();
    }
    /**
     * Called when a page is rendered successfully.
     */
  }, {
    key: "viewport",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, rotate = _this$props2.rotate, scale = _this$props2.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$viewport2 = this.viewport, width = _this$viewport2.width, height = _this$viewport2.height;
      return /* @__PURE__ */ React.createElement("div", {
        className: "react-pdf__Page__svg",
        ref: function ref(_ref) {
          return _this2.drawPageOnContainer(_ref);
        },
        style: {
          display: "block",
          backgroundColor: "white",
          overflow: "hidden",
          width,
          height,
          userSelect: "none"
        }
      });
    }
  }]);
  return PageSVGInternal2;
}(reactExports.PureComponent);
PageSVGInternal.propTypes = {
  onRenderError: propTypesExports.func,
  onRenderSuccess: propTypesExports.func,
  page: isPage.isRequired,
  rotate: isRotate,
  scale: propTypesExports.number.isRequired
};
function PageSVG(props) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(context) {
    return /* @__PURE__ */ React.createElement(PageSVGInternal, _extends$1({}, context, props));
  });
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextLayerInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits(TextLayerInternal2, _PureComponent);
  var _super = _createSuper$2(TextLayerInternal2);
  function TextLayerInternal2() {
    var _this;
    _classCallCheck(this, TextLayerInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      textContent: null
    });
    _defineProperty(_assertThisInitialized(_this), "layerElement", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "endElement", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "loadTextContent", function() {
      var page = _this.props.page;
      var cancellable = makeCancellablePromise(page.getTextContent());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(textContent) {
        _this.setState({
          textContent
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadSuccess", function() {
      var onGetTextSuccess = _this.props.onGetTextSuccess;
      var textContent = _this.state.textContent;
      if (onGetTextSuccess)
        onGetTextSuccess(textContent);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadError", function(error) {
      _this.setState({
        textItems: false
      });
      warning(error);
      var onGetTextError = _this.props.onGetTextError;
      if (onGetTextError)
        onGetTextError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderSuccess", function() {
      var onRenderTextLayerSuccess = _this.props.onRenderTextLayerSuccess;
      if (onRenderTextLayerSuccess)
        onRenderTextLayerSuccess();
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderError", function(error) {
      warning(error);
      var onRenderTextLayerError = _this.props.onRenderTextLayerError;
      if (onRenderTextLayerError)
        onRenderTextLayerError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function() {
      var end2 = _this.endElement.current;
      if (!end2) {
        return;
      }
      end2.classList.add("active");
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function() {
      var end2 = _this.endElement.current;
      if (!end2) {
        return;
      }
      end2.classList.remove("active");
    });
    return _this;
  }
  _createClass(TextLayerInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var page = this.props.page;
      invariant(page, "Attempted to load page text content, but no page was specified.");
      warning(parseInt(window.getComputedStyle(document.body).getPropertyValue("--react-pdf-text-layer"), 10) === 1, "TextLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-text-layer");
      this.loadTextContent();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var page = this.props.page;
      if (prevProps.page && page !== prevProps.page) {
        this.loadTextContent();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props = this.props, page = _this$props.page, rotate = _this$props.rotate, scale = _this$props.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "unrotatedViewport",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, scale = _this$props2.scale;
      return page.getViewport({
        scale
      });
    }
    /**
     * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
     * text content.
     */
  }, {
    key: "rotate",
    get: function get() {
      var _this$props3 = this.props, page = _this$props3.page, rotate = _this$props3.rotate;
      return rotate - page.rotate;
    }
  }, {
    key: "renderTextLayer",
    value: function renderTextLayer() {
      var _this2 = this;
      var textContent = this.state.textContent;
      if (!textContent) {
        return null;
      }
      var container = this.layerElement.current;
      var viewport2 = this.viewport;
      var _this$props4 = this.props, customTextRenderer = _this$props4.customTextRenderer, pageIndex = _this$props4.pageIndex, pageNumber = _this$props4.pageNumber;
      cancelRunningTask(this.runningTask);
      container.innerHTML = "";
      var parameters = {
        container,
        textContent,
        viewport: viewport2
      };
      var cancellable = pdfExports.renderTextLayer(parameters);
      this.runningTask = cancellable;
      cancellable.promise.then(function() {
        var end2 = document.createElement("div");
        end2.className = "endOfContent";
        container.append(end2);
        _this2.endElement.current = end2;
        if (customTextRenderer) {
          var index = 0;
          textContent.items.forEach(function(item, itemIndex) {
            var child = _this2.layerElement.current.children[index];
            var content = customTextRenderer(_objectSpread$1({
              pageIndex,
              pageNumber,
              itemIndex
            }, item));
            child.innerHTML = content;
            index += item.str && item.hasEOL ? 2 : 1;
          });
        }
        _this2.onRenderSuccess();
      })["catch"](function(error) {
        _this2.onRenderError(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        /* @__PURE__ */ React.createElement("div", {
          className: "react-pdf__Page__textContent textLayer",
          onMouseUp: this.onMouseUp,
          onMouseDown: this.onMouseDown,
          ref: this.layerElement
        }, this.renderTextLayer())
      );
    }
  }]);
  return TextLayerInternal2;
}(reactExports.PureComponent);
TextLayerInternal.propTypes = {
  customTextRenderer: propTypesExports.func,
  onGetTextError: propTypesExports.func,
  onGetTextSuccess: propTypesExports.func,
  onRenderTextLayerError: propTypesExports.func,
  onRenderTextLayerSuccess: propTypesExports.func,
  page: isPage.isRequired,
  pageIndex: propTypesExports.number.isRequired,
  pageNumber: propTypesExports.number.isRequired,
  rotate: isRotate,
  scale: propTypesExports.number
};
function TextLayer$1(props) {
  return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(context) {
    return /* @__PURE__ */ React.createElement(TextLayerInternal, _extends$1({}, context, props));
  });
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AnnotationLayerInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits(AnnotationLayerInternal2, _PureComponent);
  var _super = _createSuper$1(AnnotationLayerInternal2);
  function AnnotationLayerInternal2() {
    var _this;
    _classCallCheck(this, AnnotationLayerInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      annotations: null
    });
    _defineProperty(_assertThisInitialized(_this), "layerElement", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "loadAnnotations", function() {
      var page = _this.props.page;
      var cancellable = makeCancellablePromise(page.getAnnotations());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(annotations) {
        _this.setState({
          annotations
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadSuccess", function() {
      var onGetAnnotationsSuccess = _this.props.onGetAnnotationsSuccess;
      var annotations = _this.state.annotations;
      if (onGetAnnotationsSuccess)
        onGetAnnotationsSuccess(annotations);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadError", function(error) {
      _this.setState({
        annotations: false
      });
      warning(error);
      var onGetAnnotationsError = _this.props.onGetAnnotationsError;
      if (onGetAnnotationsError)
        onGetAnnotationsError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderSuccess", function() {
      var onRenderAnnotationLayerSuccess = _this.props.onRenderAnnotationLayerSuccess;
      if (onRenderAnnotationLayerSuccess)
        onRenderAnnotationLayerSuccess();
    });
    _defineProperty(_assertThisInitialized(_this), "onRenderError", function(error) {
      warning(error);
      var onRenderAnnotationLayerError = _this.props.onRenderAnnotationLayerError;
      if (onRenderAnnotationLayerError)
        onRenderAnnotationLayerError(error);
    });
    return _this;
  }
  _createClass(AnnotationLayerInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var page = this.props.page;
      invariant(page, "Attempted to load page annotations, but no page was specified.");
      warning(parseInt(window.getComputedStyle(document.body).getPropertyValue("--react-pdf-annotation-layer"), 10) === 1, "AnnotationLayer styles not found. Read more: https://github.com/wojtekmaj/react-pdf#support-for-annotations");
      this.loadAnnotations();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props, page = _this$props.page, renderForms = _this$props.renderForms;
      if (prevProps.page && page !== prevProps.page || renderForms !== prevProps.renderForms) {
        this.loadAnnotations();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, rotate = _this$props2.rotate, scale = _this$props2.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "renderAnnotationLayer",
    value: function renderAnnotationLayer() {
      var annotations = this.state.annotations;
      if (!annotations) {
        return;
      }
      var _this$props3 = this.props, imageResourcesPath = _this$props3.imageResourcesPath, linkService = _this$props3.linkService, page = _this$props3.page, renderForms = _this$props3.renderForms;
      var viewport2 = this.viewport.clone({
        dontFlip: true
      });
      var parameters = {
        annotations,
        div: this.layerElement.current,
        imageResourcesPath,
        linkService,
        page,
        renderForms,
        viewport: viewport2
      };
      this.layerElement.current.innerHTML = "";
      try {
        pdfExports.AnnotationLayer.render(parameters);
        this.onRenderSuccess();
      } catch (error) {
        this.onRenderError(error);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /* @__PURE__ */ React.createElement("div", {
        className: "react-pdf__Page__annotations annotationLayer",
        ref: this.layerElement
      }, this.renderAnnotationLayer());
    }
  }]);
  return AnnotationLayerInternal2;
}(reactExports.PureComponent);
AnnotationLayerInternal.propTypes = {
  imageResourcesPath: propTypesExports.string,
  linkService: isLinkService.isRequired,
  onGetAnnotationsError: propTypesExports.func,
  onGetAnnotationsSuccess: propTypesExports.func,
  onRenderAnnotationLayerError: propTypesExports.func,
  onRenderAnnotationLayerSuccess: propTypesExports.func,
  page: isPage,
  renderForms: propTypesExports.bool,
  rotate: isRotate,
  scale: propTypesExports.number
};
var AnnotationLayer$1 = function AnnotationLayer2(props) {
  return /* @__PURE__ */ React.createElement(DocumentContext.Consumer, null, function(documentContext) {
    return /* @__PURE__ */ React.createElement(PageContext.Consumer, null, function(pageContext) {
      return /* @__PURE__ */ React.createElement(AnnotationLayerInternal, _extends$1({}, documentContext, pageContext, props));
    });
  });
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var defaultScale = 1;
var PageInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits(PageInternal2, _PureComponent);
  var _super = _createSuper(PageInternal2);
  function PageInternal2() {
    var _this;
    _classCallCheck(this, PageInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      page: null
    });
    _defineProperty(_assertThisInitialized(_this), "pageElement", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "onLoadSuccess", function() {
      var _this$props = _this.props, onLoadSuccess = _this$props.onLoadSuccess, registerPage = _this$props.registerPage;
      var page = _this.state.page;
      if (onLoadSuccess)
        onLoadSuccess(makePageCallback(page, _this.scale));
      if (registerPage)
        registerPage(_this.pageIndex, _this.pageElement.current);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadError", function(error) {
      _this.setState({
        page: false
      });
      warning(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError)
        onLoadError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "loadPage", function() {
      var pdf2 = _this.props.pdf;
      var pageNumber = _this.getPageNumber();
      if (!pageNumber) {
        return;
      }
      _this.setState(function(prevState) {
        if (!prevState.page) {
          return null;
        }
        return {
          page: null
        };
      });
      var cancellable = makeCancellablePromise(pdf2.getPage(pageNumber));
      _this.runningTask = cancellable;
      cancellable.promise.then(function(page) {
        _this.setState({
          page
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    return _this;
  }
  _createClass(PageInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pdf2 = this.props.pdf;
      invariant(pdf2, "Attempted to load a page, but no document was specified.");
      this.loadPage();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pdf2 = this.props.pdf;
      if (prevProps.pdf && pdf2 !== prevProps.pdf || this.getPageNumber() !== this.getPageNumber(prevProps)) {
        var unregisterPage = this.props.unregisterPage;
        if (unregisterPage)
          unregisterPage(this.getPageIndex(prevProps));
        this.loadPage();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var unregisterPage = this.props.unregisterPage;
      if (unregisterPage)
        unregisterPage(this.pageIndex);
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "childContext",
    get: function get() {
      var pageIndex = this.pageIndex, pageNumber = this.pageNumber;
      var page = this.state.page;
      if (!page) {
        return {};
      }
      var _this$props2 = this.props, canvasBackground = _this$props2.canvasBackground, customTextRenderer = _this$props2.customTextRenderer, devicePixelRatio = _this$props2.devicePixelRatio, onGetAnnotationsError = _this$props2.onGetAnnotationsError, onGetAnnotationsSuccess = _this$props2.onGetAnnotationsSuccess, onGetTextError = _this$props2.onGetTextError, onGetTextSuccess = _this$props2.onGetTextSuccess, onRenderAnnotationLayerError = _this$props2.onRenderAnnotationLayerError, onRenderAnnotationLayerSuccess = _this$props2.onRenderAnnotationLayerSuccess, onRenderError = _this$props2.onRenderError, onRenderSuccess = _this$props2.onRenderSuccess, onRenderTextLayerError = _this$props2.onRenderTextLayerError, onRenderTextLayerSuccess = _this$props2.onRenderTextLayerSuccess, renderForms = _this$props2.renderForms, renderInteractiveForms = _this$props2.renderInteractiveForms;
      return {
        canvasBackground,
        customTextRenderer,
        devicePixelRatio,
        onGetAnnotationsError,
        onGetAnnotationsSuccess,
        onGetTextError,
        onGetTextSuccess,
        onRenderAnnotationLayerError,
        onRenderAnnotationLayerSuccess,
        onRenderError,
        onRenderSuccess,
        onRenderTextLayerError,
        onRenderTextLayerSuccess,
        page,
        pageIndex,
        pageNumber,
        renderForms: renderForms !== null && renderForms !== void 0 ? renderForms : renderInteractiveForms,
        // For backward compatibility
        rotate: this.rotate,
        scale: this.scale
      };
    }
    /**
     * Called when a page is loaded successfully
     */
  }, {
    key: "getPageIndex",
    value: function getPageIndex() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      if (isProvided(props.pageNumber)) {
        return props.pageNumber - 1;
      }
      if (isProvided(props.pageIndex)) {
        return props.pageIndex;
      }
      return null;
    }
  }, {
    key: "getPageNumber",
    value: function getPageNumber() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      if (isProvided(props.pageNumber)) {
        return props.pageNumber;
      }
      if (isProvided(props.pageIndex)) {
        return props.pageIndex + 1;
      }
      return null;
    }
  }, {
    key: "pageIndex",
    get: function get() {
      return this.getPageIndex();
    }
  }, {
    key: "pageNumber",
    get: function get() {
      return this.getPageNumber();
    }
  }, {
    key: "rotate",
    get: function get() {
      var rotate = this.props.rotate;
      if (isProvided(rotate)) {
        return rotate;
      }
      var page = this.state.page;
      if (!page) {
        return null;
      }
      return page.rotate;
    }
  }, {
    key: "scale",
    get: function get() {
      var page = this.state.page;
      if (!page) {
        return null;
      }
      var _this$props3 = this.props, scale = _this$props3.scale, width = _this$props3.width, height = _this$props3.height;
      var rotate = this.rotate;
      var pageScale = 1;
      var scaleWithDefault = scale === null ? defaultScale : scale;
      if (width || height) {
        var viewport2 = page.getViewport({
          scale: 1,
          rotation: rotate
        });
        pageScale = width ? width / viewport2.width : height / viewport2.height;
      }
      return scaleWithDefault * pageScale;
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;
      return makeEventProps(this.props, function() {
        var page = _this2.state.page;
        if (!page) {
          return page;
        }
        return makePageCallback(page, _this2.scale);
      });
    }
  }, {
    key: "pageKey",
    get: function get() {
      return "".concat(this.pageIndex, "@").concat(this.scale, "/").concat(this.rotate);
    }
  }, {
    key: "pageKeyNoScale",
    get: function get() {
      return "".concat(this.pageIndex, "/").concat(this.rotate);
    }
  }, {
    key: "renderMainLayer",
    value: function renderMainLayer() {
      var _this$props4 = this.props, canvasRef = _this$props4.canvasRef, renderMode = _this$props4.renderMode;
      switch (renderMode) {
        case "none":
          return null;
        case "svg":
          return /* @__PURE__ */ React.createElement(PageSVG, {
            key: "".concat(this.pageKeyNoScale, "_svg")
          });
        case "canvas":
        default:
          return /* @__PURE__ */ React.createElement(PageCanvas, {
            key: "".concat(this.pageKey, "_canvas"),
            canvasRef
          });
      }
    }
  }, {
    key: "renderTextLayer",
    value: function renderTextLayer() {
      var renderTextLayer2 = this.props.renderTextLayer;
      if (!renderTextLayer2) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(TextLayer$1, {
        key: "".concat(this.pageKey, "_text")
      });
    }
  }, {
    key: "renderAnnotationLayer",
    value: function renderAnnotationLayer() {
      var renderAnnotationLayer2 = this.props.renderAnnotationLayer;
      if (!renderAnnotationLayer2) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(AnnotationLayer$1, {
        key: "".concat(this.pageKey, "_annotations")
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return /* @__PURE__ */ React.createElement(PageContext.Provider, {
        value: this.childContext
      }, this.renderMainLayer(), this.renderTextLayer(), this.renderAnnotationLayer(), children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var pageNumber = this.pageNumber;
      var pdf2 = this.props.pdf;
      var page = this.state.page;
      if (!pageNumber) {
        var noData = this.props.noData;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "no-data"
        }, typeof noData === "function" ? noData() : noData);
      }
      if (pdf2 === null || page === null) {
        var loading = this.props.loading;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "loading"
        }, typeof loading === "function" ? loading() : loading);
      }
      if (pdf2 === false || page === false) {
        var error = this.props.error;
        return /* @__PURE__ */ React.createElement(Message, {
          type: "error"
        }, typeof error === "function" ? error() : error);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var pageNumber = this.pageNumber;
      var _this$props5 = this.props, className = _this$props5.className, inputRef = _this$props5.inputRef;
      return /* @__PURE__ */ React.createElement("div", _extends$1({
        className: clsx("react-pdf__Page", className),
        "data-page-number": pageNumber,
        ref: mergeRefs(inputRef, this.pageElement),
        style: {
          position: "relative",
          minWidth: "min-content",
          minHeight: "min-content"
        }
      }, this.eventProps), this.renderContent());
    }
  }]);
  return PageInternal2;
}(reactExports.PureComponent);
PageInternal.defaultProps = {
  error: "Failed to load the page.",
  loading: "Loading page…",
  noData: "No page specified.",
  renderAnnotationLayer: true,
  renderMode: "canvas",
  renderTextLayer: true,
  scale: defaultScale
};
var isFunctionOrNode = propTypesExports.oneOfType([propTypesExports.func, propTypesExports.node]);
PageInternal.propTypes = _objectSpread(_objectSpread({}, eventProps), {}, {
  canvasBackground: propTypesExports.string,
  children: propTypesExports.node,
  className: isClassName,
  customTextRenderer: propTypesExports.func,
  devicePixelRatio: propTypesExports.number,
  error: isFunctionOrNode,
  height: propTypesExports.number,
  imageResourcesPath: propTypesExports.string,
  inputRef: isRef,
  loading: isFunctionOrNode,
  noData: isFunctionOrNode,
  onGetTextError: propTypesExports.func,
  onGetTextSuccess: propTypesExports.func,
  onLoadError: propTypesExports.func,
  onLoadSuccess: propTypesExports.func,
  onRenderError: propTypesExports.func,
  onRenderSuccess: propTypesExports.func,
  onRenderTextLayerError: propTypesExports.func,
  onRenderTextLayerSuccess: propTypesExports.func,
  pageIndex: isPageIndex,
  pageNumber: isPageNumber,
  pdf: isPdf,
  registerPage: propTypesExports.func,
  renderAnnotationLayer: propTypesExports.bool,
  renderForms: propTypesExports.bool,
  renderInteractiveForms: propTypesExports.bool,
  // For backward compatibility
  renderMode: isRenderMode,
  renderTextLayer: propTypesExports.bool,
  rotate: isRotate,
  scale: propTypesExports.number,
  unregisterPage: propTypesExports.func,
  width: propTypesExports.number
});
function Page(props, ref) {
  return /* @__PURE__ */ React.createElement(DocumentContext.Consumer, null, function(context) {
    return /* @__PURE__ */ React.createElement(PageInternal, _extends$1({
      ref
    }, context, props));
  });
}
const Page$1 = /* @__PURE__ */ React.forwardRef(Page);
displayWorkerWarning();
pdfExports.GlobalWorkerOptions.workerSrc = new URL("/assets/pdf.worker-6b078827.js", self.location);
const TextLayer = "";
const AnnotationLayer = "";
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};
var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
});
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
const Popper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain,
  afterRead,
  afterWrite,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  auto,
  basePlacements,
  beforeMain,
  beforeRead,
  beforeWrite,
  bottom,
  clippingParents,
  computeStyles: computeStyles$1,
  createPopper,
  createPopperBase: createPopper$2,
  createPopperLite: createPopper$1,
  detectOverflow,
  end,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  left,
  main,
  modifierPhases,
  offset: offset$1,
  placements,
  popper,
  popperGenerator,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1,
  read,
  reference,
  right,
  start,
  top,
  variationPlacements,
  viewport,
  write
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const MAX_UID = 1e6;
const MILLISECONDS_MULTIPLIER = 1e3;
const TRANSITION_END = "transitionend";
const toType = (object) => {
  if (object === null || object === void 0) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
const getUID = (prefix2) => {
  do {
    prefix2 += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix2));
  return prefix2;
};
const getSelector = (element) => {
  let selector = element.getAttribute("data-bs-target");
  if (!selector || selector === "#") {
    let hrefAttribute = element.getAttribute("href");
    if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
      return null;
    }
    if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
      hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
  }
  return selector;
};
const getSelectorFromElement = (element) => {
  const selector = getSelector(element);
  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }
  return null;
};
const getElementFromSelector = (element) => {
  const selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};
const getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = (object) => {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (typeof object.jquery !== "undefined") {
    object = object[0];
  }
  return typeof object.nodeType !== "undefined";
};
const getElement = (object) => {
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === "string" && object.length > 0) {
    return document.querySelector(object);
  }
  return null;
};
const isVisible = (element) => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
  const closedDetails = element.closest("details:not([open])");
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    const summary = element.closest("summary");
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
const isDisabled = (element) => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains("disabled")) {
    return true;
  }
  if (typeof element.disabled !== "undefined") {
    return element.disabled;
  }
  return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
};
const findShadowRoot = (element) => {
  if (!document.documentElement.attachShadow) {
    return null;
  }
  if (typeof element.getRootNode === "function") {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {
};
const reflow = (element) => {
  element.offsetHeight;
};
const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
    return window.jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = (callback) => {
  if (document.readyState === "loading") {
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener("DOMContentLoaded", () => {
        for (const callback2 of DOMContentLoadedCallbacks) {
          callback2();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === "rtl";
const defineJQueryPlugin = (plugin) => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const execute = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};
const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {};
let uidEvent = 1;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function makeEventUid(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  const uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn2) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn2);
    }
    return fn2.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn2) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, {
          delegateTarget: target
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn2);
        }
        return fn2.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === "string";
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
  if (originalTypeEvent in customEvents) {
    const wrapFunction = (fn3) => {
      return function(event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn3.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
  const fn2 = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn2.delegationSelector = isDelegated ? handler : null;
  fn2.callable = callable;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid;
  handlers[uid] = fn2;
  element.addEventListener(typeEvent, fn2, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const handlerKey of Object.keys(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  event = event.replace(stripNameRegex, "");
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith(".");
    if (typeof callable !== "undefined") {
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const keyHandlers of Object.keys(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, "");
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element, event, args) {
    if (typeof event !== "string" || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    let evt = new Event(event, {
      bubbles,
      cancelable: true
    });
    evt = hydrateObj(evt, args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta) {
  for (const [key, value] of Object.entries(meta || {})) {
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}
const elementMap = /* @__PURE__ */ new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, /* @__PURE__ */ new Map());
    }
    const instanceMap = elementMap.get(element);
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};
function normalizeData(value) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === "" || value === "null") {
    return null;
  }
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  }
};
class Config {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element) {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof jsonConfig === "object" ? jsonConfig : {},
      ...isElement(element) ? Manipulator.getDataAttributes(element) : {},
      ...typeof config === "object" ? config : {}
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const property of Object.keys(configTypes)) {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = isElement(value) ? "element" : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    }
  }
}
const VERSION = "5.2.3";
class BaseComponent extends Config {
  constructor(element, config) {
    super();
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }
  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
}
const enableDismissTrigger = (component, method = "hide") => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);
    instance[method]();
  });
};
const NAME$f = "alert";
const DATA_KEY$a = "bs.alert";
const EVENT_KEY$b = `.${DATA_KEY$a}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = "fade";
const CLASS_NAME_SHOW$8 = "show";
class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$f;
  }
  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }
  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
enableDismissTrigger(Alert, "close");
defineJQueryPlugin(Alert);
const NAME$e = "button";
const DATA_KEY$9 = "bs.button";
const EVENT_KEY$a = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = ".data-api";
const CLASS_NAME_ACTIVE$3 = "active";
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$e;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Button.getOrCreateInstance(this);
      if (config === "toggle") {
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});
defineJQueryPlugin(Button);
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter((child) => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
    return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
  }
};
const NAME$d = "swipe";
const EVENT_KEY$9 = ".bs.swipe";
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const POINTER_TYPE_TOUCH = "touch";
const POINTER_TYPE_PEN = "pen";
const CLASS_NAME_POINTER_EVENT = "pointer-event";
const SWIPE_THRESHOLD = 40;
const Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
const DefaultType$c = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Swipe extends Config {
  constructor(element, config) {
    super();
    this._element = element;
    if (!element || !Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }
  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$d;
  }
  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$9);
  }
  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const NAME$c = "carousel";
const DATA_KEY$8 = "bs.carousel";
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = ".data-api";
const ARROW_LEFT_KEY$1 = "ArrowLeft";
const ARROW_RIGHT_KEY$1 = "ArrowRight";
const TOUCHEVENT_COMPAT_WAIT = 500;
const ORDER_NEXT = "next";
const ORDER_PREV = "prev";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
const EVENT_SLID = `slid${EVENT_KEY$8}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_CAROUSEL = "carousel";
const CLASS_NAME_ACTIVE$2 = "active";
const CLASS_NAME_SLIDE = "slide";
const CLASS_NAME_END = "carousel-item-end";
const CLASS_NAME_START = "carousel-item-start";
const CLASS_NAME_NEXT = "carousel-item-next";
const CLASS_NAME_PREV = "carousel-item-prev";
const SELECTOR_ACTIVE = ".active";
const SELECTOR_ITEM = ".carousel-item";
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = ".carousel-item img";
const SELECTOR_INDICATORS = ".carousel-indicators";
const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$b = {
  interval: 5e3,
  keyboard: true,
  pause: "hover",
  ride: false,
  touch: true,
  wrap: true
};
const DefaultType$b = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }
  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$c;
  }
  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order2, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
    }
    if (this._config.pause === "hover") {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== "hover") {
        return;
      }
      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element) {
    return this._getItems().indexOf(element);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute("aria-current");
    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute("aria-current", "true");
    }
  }
  _updateInterval() {
    const element = this._activeElement || this._getActive();
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order2, element = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order2 === ORDER_NEXT;
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = (eventName) => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order2),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order2) {
    if (isRTL()) {
      return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Carousel.getOrCreateInstance(this, config);
      if (typeof config === "number") {
        data.to(config);
        return;
      }
      if (typeof config === "string") {
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function(event) {
  const target = getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  const carousel = Carousel.getOrCreateInstance(target);
  const slideIndex = this.getAttribute("data-bs-slide-to");
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, "slide") === "next") {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
  }
});
defineJQueryPlugin(Carousel);
const NAME$b = "collapse";
const DATA_KEY$7 = "bs.collapse";
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = ".data-api";
const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = "show";
const CLASS_NAME_COLLAPSE = "collapse";
const CLASS_NAME_COLLAPSING = "collapsing";
const CLASS_NAME_COLLAPSED = "collapsed";
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
const WIDTH = "width";
const HEIGHT = "height";
const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
const Default$a = {
  parent: null,
  toggle: true
};
const DefaultType$a = {
  parent: "(null|element)",
  toggle: "boolean"
};
class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (const elem of toggleList) {
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }
  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$b;
  }
  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => Collapse.getOrCreateInstance(element, {
        toggle: false
      }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = "";
      EventHandler.trigger(this._element, EVENT_SHOWN$6);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    for (const trigger of this._triggerArray) {
      const element = getElementFromSelector(trigger);
      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    };
    this._element.style[dimension] = "";
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }
  // Private
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle);
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    for (const element of children) {
      const selected = getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute("aria-expanded", isOpen);
    }
  }
  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === "string" && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function() {
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
  if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
    event.preventDefault();
  }
  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  for (const element of selectorElements) {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});
defineJQueryPlugin(Collapse);
const NAME$a = "dropdown";
const DATA_KEY$6 = "bs.dropdown";
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = ".data-api";
const ESCAPE_KEY$2 = "Escape";
const TAB_KEY$1 = "Tab";
const ARROW_UP_KEY$1 = "ArrowUp";
const ARROW_DOWN_KEY$1 = "ArrowDown";
const RIGHT_MOUSE_BUTTON = 2;
const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_SHOW$6 = "show";
const CLASS_NAME_DROPUP = "dropup";
const CLASS_NAME_DROPEND = "dropend";
const CLASS_NAME_DROPSTART = "dropstart";
const CLASS_NAME_DROPUP_CENTER = "dropup-center";
const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
const SELECTOR_MENU = ".dropdown-menu";
const SELECTOR_NAVBAR = ".navbar";
const SELECTOR_NAVBAR_NAV = ".navbar-nav";
const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
const PLACEMENT_TOPCENTER = "top";
const PLACEMENT_BOTTOMCENTER = "bottom";
const Default$9 = {
  autoClose: true,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
};
const DefaultType$9 = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._popper = null;
    this._parent = this._element.parentNode;
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$a;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();
    if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, "mouseover", noop);
      }
    }
    this._element.focus();
    this._element.setAttribute("aria-expanded", true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }
  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, "mouseover", noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute("aria-expanded", "false");
    Manipulator.removeDataAttribute(this._menu, "popper");
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper() {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    }
    let referenceElement = this._element;
    if (this._config.reference === "parent") {
      referenceElement = this._parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === "object") {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = createPopper(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }
    const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    if (this._inNavbar || this._config.display === "static") {
      Manipulator.setDataAttribute(this._menu, "popper", "static");
      defaultBsPopperConfig.modifiers = [{
        name: "applyStyles",
        enabled: false
      }];
    }
    return {
      ...defaultBsPopperConfig,
      ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
    };
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
    if (!items.length) {
      return;
    }
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
        continue;
      }
      if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event.type === "click") {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY$2;
    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
}
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown);
const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
const SELECTOR_STICKY_CONTENT = ".sticky-top";
const PROPERTY_PADDING = "padding-right";
const PROPERTY_MARGIN = "margin-right";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element) => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = (element) => {
      const value = Manipulator.getDataAttribute(element, styleProperty);
      if (value === null) {
        element.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element, styleProperty);
      element.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
}
const NAME$9 = "backdrop";
const CLASS_NAME_FADE$4 = "fade";
const CLASS_NAME_SHOW$5 = "show";
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
const Default$8 = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
};
const DefaultType$8 = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class Backdrop extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }
  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }
  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element = this._getElement();
    if (this._config.isAnimated) {
      reflow(element);
    }
    element.classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }
  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element = this._getElement();
    this._config.rootElement.append(element);
    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}
const NAME$8 = "focustrap";
const DATA_KEY$5 = "bs.focustrap";
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
const TAB_KEY = "Tab";
const TAB_NAV_FORWARD = "forward";
const TAB_NAV_BACKWARD = "backward";
const Default$7 = {
  autofocus: true,
  trapElement: null
  // The element to trap focus inside of
};
const DefaultType$7 = {
  autofocus: "boolean",
  trapElement: "element"
};
class FocusTrap extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$8;
  }
  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$5);
    EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }
  // Private
  _handleFocusin(event) {
    const {
      trapElement
    } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
}
const NAME$7 = "modal";
const DATA_KEY$4 = "bs.modal";
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const DATA_API_KEY$2 = ".data-api";
const ESCAPE_KEY$1 = "Escape";
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
const CLASS_NAME_OPEN = "modal-open";
const CLASS_NAME_FADE$3 = "fade";
const CLASS_NAME_SHOW$4 = "show";
const CLASS_NAME_STATIC = "modal-static";
const OPEN_SELECTOR$1 = ".modal.show";
const SELECTOR_DIALOG = ".modal-dialog";
const SELECTOR_MODAL_BODY = ".modal-body";
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
const DefaultType$6 = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Modal extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$7;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    for (const htmlElement of [window, this._dialog]) {
      EventHandler.off(htmlElement, EVENT_KEY$4);
    }
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        event.preventDefault();
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === "static") {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = "hidden";
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? "paddingLeft" : "paddingRight";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? "paddingRight" : "paddingLeft";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function() {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
    if (showEvent.defaultPrevented) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);
defineJQueryPlugin(Modal);
const NAME$6 = "offcanvas";
const DATA_KEY$3 = "bs.offcanvas";
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const DATA_API_KEY$1 = ".data-api";
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
const ESCAPE_KEY = "Escape";
const CLASS_NAME_SHOW$3 = "show";
const CLASS_NAME_SHOWING$1 = "showing";
const CLASS_NAME_HIDING = "hiding";
const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
const OPEN_SELECTOR = ".offcanvas.show";
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$5 = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$6;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$3);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === "static") {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    };
    const isVisible2 = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: isVisible2,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible2 ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
      if (event.key !== ESCAPE_KEY) {
        return;
      }
      if (!this._config.keyboard) {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    });
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, () => {
    if (isVisible(this)) {
      this.focus();
    }
  });
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) {
    if (getComputedStyle(element).position !== "fixed") {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);
defineJQueryPlugin(Offcanvas);
const uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }
  return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
};
const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === "function") {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}
const NAME$5 = "TemplateFactory";
const Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: "<div></div>"
};
const DefaultType$4 = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
};
const DefaultContentType = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class TemplateFactory extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }
  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$5;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = {
      ...this._config.content,
      ...content
    };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement("div");
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(" "));
    }
    return template;
  }
  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({
        selector,
        entry: content
      }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return typeof arg === "function" ? arg(this) : arg;
  }
  _putElementInTemplate(element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = "";
      templateElement.append(element);
      return;
    }
    templateElement.textContent = element.textContent;
  }
}
const NAME$4 = "tooltip";
const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
const CLASS_NAME_FADE$2 = "fade";
const CLASS_NAME_MODAL = "modal";
const CLASS_NAME_SHOW$2 = "show";
const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = "hide.bs.modal";
const TRIGGER_HOVER = "hover";
const TRIGGER_FOCUS = "focus";
const TRIGGER_CLICK = "click";
const TRIGGER_MANUAL = "manual";
const EVENT_HIDE$2 = "hide";
const EVENT_HIDDEN$2 = "hidden";
const EVENT_SHOW$2 = "show";
const EVENT_SHOWN$2 = "shown";
const EVENT_INSERTED = "inserted";
const EVENT_CLICK$1 = "click";
const EVENT_FOCUSIN$1 = "focusin";
const EVENT_FOCUSOUT$1 = "focusout";
const EVENT_MOUSEENTER = "mouseenter";
const EVENT_MOUSELEAVE = "mouseleave";
const AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left"
};
const Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: "clippingParents",
  container: false,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: false,
  offset: [0, 0],
  placement: "top",
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
};
const DefaultType$3 = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    }
    super(element, config);
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }
  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$4;
  }
  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    this._activeTrigger.click = !this._activeTrigger.click;
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._element.getAttribute("data-bs-original-title")) {
      this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
    const {
      container
    } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, "mouseover", noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, "mouseover", noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null;
    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute("aria-describedby");
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }
  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute("id", tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  }
  _createPopper(tip) {
    const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
    const attachment = AttachmentMap[placement.toUpperCase()];
    return createPopper(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _resolvePossibleFunction(arg) {
    return typeof arg === "function" ? arg.call(this._element) : arg;
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "preSetPlacement",
        enabled: true,
        phase: "beforeMain",
        fn: (data) => {
          this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
        }
      }]
    };
    return {
      ...defaultBsPopperConfig,
      ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(" ");
    for (const trigger of triggers) {
      if (trigger === "click") {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  }
  _fixTitle() {
    const title = this._element.getAttribute("title");
    if (!title) {
      return;
    }
    if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
      this._element.setAttribute("aria-label", title);
    }
    this._element.setAttribute("data-bs-original-title", title);
    this._element.removeAttribute("title");
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...typeof config === "object" && config ? config : {}
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === "number") {
      config.title = config.title.toString();
    }
    if (typeof config.content === "number") {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const key in this._config) {
      if (this.constructor.Default[key] !== this._config[key]) {
        config[key] = this._config[key];
      }
    }
    config.selector = false;
    config.trigger = "manual";
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
defineJQueryPlugin(Tooltip);
const NAME$3 = "popover";
const SELECTOR_TITLE = ".popover-header";
const SELECTOR_CONTENT = ".popover-body";
const Default$2 = {
  ...Tooltip.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
};
const DefaultType$2 = {
  ...Tooltip.DefaultType,
  content: "(null|string|element|function)"
};
class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
defineJQueryPlugin(Popover);
const NAME$2 = "scrollspy";
const DATA_KEY$2 = "bs.scrollspy";
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY = ".data-api";
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_CLICK = `click${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
const CLASS_NAME_ACTIVE$1 = "active";
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_TARGET_LINKS = "[href]";
const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
const SELECTOR_NAV_LINKS = ".nav-link";
const SELECTOR_NAV_ITEMS = ".nav-item";
const SELECTOR_LIST_ITEMS = ".list-group-item";
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = ".dropdown";
const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
const Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
const DefaultType$1 = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh();
  }
  // Getters
  static get Default() {
    return Default$1;
  }
  static get DefaultType() {
    return DefaultType$1;
  }
  static get NAME() {
    return NAME$2;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.target = getElement(config.target) || document.body;
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === "string") {
      config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: "smooth"
          });
          return;
        }
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((entries) => this._observerCallback(entries), options);
  }
  // The logic of selection
  _observerCallback(entries) {
    const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
    const activate = (entry) => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        if (!parentScrollTop) {
          return;
        }
        continue;
      }
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(anchor.hash, this._element);
      if (isVisible(observableSection)) {
        this._targetLinks.set(anchor.hash, anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _activateParents(target) {
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
  }
});
defineJQueryPlugin(ScrollSpy);
const NAME$1 = "tab";
const DATA_KEY$1 = "bs.tab";
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const CLASS_NAME_ACTIVE = "active";
const CLASS_NAME_FADE$1 = "fade";
const CLASS_NAME_SHOW$1 = "show";
const CLASS_DROPDOWN = "dropdown";
const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
const NOT_SELECTOR_DROPDOWN_TOGGLE = ":not(.dropdown-toggle)";
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = ".nav-item, .list-group-item";
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
class Tab extends BaseComponent {
  constructor(element) {
    super(element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
    }
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
  }
  // Getters
  static get NAME() {
    return NAME$1;
  }
  // Public
  show() {
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }
  // Private
  _activate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    this._activate(getElementFromSelector(element));
    const complete = () => {
      if (element.getAttribute("role") !== "tab") {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }
      element.removeAttribute("tabindex");
      element.setAttribute("aria-selected", true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();
    this._deactivate(getElementFromSelector(element));
    const complete = () => {
      if (element.getAttribute("role") !== "tab") {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }
      element.setAttribute("aria-selected", false);
      element.setAttribute("tabindex", "-1");
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
    const nextActiveElement = getNextActiveElement(this._getChildren().filter((element) => !isDisabled(element)), event.target, isNext, true);
    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((child) => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, "role", "tablist");
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute("aria-selected", isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, "role", "presentation");
    }
    if (!isActive) {
      child.setAttribute("tabindex", "-1");
    }
    this._setAttributeIfNotExists(child, "role", "tab");
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, "role", "tabpanel");
    if (child.id) {
      this._setAttributeIfNotExists(target, "aria-labelledby", `#${child.id}`);
    }
  }
  _toggleDropDown(element, open) {
    const outerElem = this._getOuterElement(element);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element2 = SelectorEngine.findOne(selector, outerElem);
      if (element2) {
        element2.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute("aria-expanded", open);
  }
  _setAttributeIfNotExists(element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
  }
});
defineJQueryPlugin(Tab);
const NAME = "toast";
const DATA_KEY = "bs.toast";
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = "fade";
const CLASS_NAME_HIDE = "hide";
const CLASS_NAME_SHOW = "show";
const CLASS_NAME_SHOWING = "showing";
const DefaultType = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5e3
};
class Toast extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }
  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }
  // Private
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = isInteracting;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = isInteracting;
        break;
      }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}
enableDismissTrigger(Toast);
defineJQueryPlugin(Toast);
var _excluded = ["color", "size", "title"];
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var FileEarmarkArrowDownFill = /* @__PURE__ */ reactExports.forwardRef(function(_ref, ref) {
  var color = _ref.color, size = _ref.size, title = _ref.title, rest = _objectWithoutProperties(_ref, _excluded);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    ref,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: size,
    height: size,
    fill: color
  }, rest), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement("path", {
    d: "M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"
  }));
});
FileEarmarkArrowDownFill.propTypes = {
  color: propTypesExports.string,
  size: propTypesExports.oneOfType([propTypesExports.string, propTypesExports.number]),
  title: propTypesExports.string
};
FileEarmarkArrowDownFill.defaultProps = {
  color: "currentColor",
  size: "1em",
  title: null
};
const FileEarmarkArrowDownFill$1 = FileEarmarkArrowDownFill;
function Resume() {
  const [numPages, setNumPages] = reactExports.useState(null);
  const [pageNumber, setPageNumber] = reactExports.useState(1);
  reactExports.useState(null);
  function onDocumentLoadSuccess({ numPages: numPages2 }) {
    setNumPages(numPages2);
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResumeContainer, { children: /* @__PURE__ */ jsx(ResumeInnerContainer, { file: resumePDF, onLoadSuccess: onDocumentLoadSuccess, children: /* @__PURE__ */ jsx(
      Page$1,
      {
        pageNumber,
        renderTextLayer: false,
        canvasBackground: "#e6ffff",
        width: 800
      }
    ) }) }),
    /* @__PURE__ */ jsx("a", { href: resumePDF, download: "DineshResume", children: /* @__PURE__ */ jsx(DownloadButton, { size: 50 }) })
  ] });
}
const ResumeContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 1000;    
`;
const ResumeInnerContainer = styled(Document)`  
    padding: 20px;
    background: gray;
    margin-top:100px;
`;
const DownloadButton = styled(FileEarmarkArrowDownFill$1)`
  position: absolute;
  top:100px;
  right:250px;
  color:#0b5ed7;
  cursor: pointer;
`;
export {
  Resume as default
};
