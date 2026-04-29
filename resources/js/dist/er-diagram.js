var e = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function t(t) {
	var n = t += "", r = n.indexOf(":");
	return r >= 0 && (n = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), e.hasOwnProperty(n) ? {
		space: e[n],
		local: t
	} : t;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function n(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function r(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function i(e) {
	var i = t(e);
	return (i.local ? r : n)(i);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function a() {}
function o(e) {
	return e == null ? a : function() {
		return this.querySelector(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function s(e) {
	typeof e != "function" && (e = o(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], s = a.length, c = r[i] = Array(s), l, u, d = 0; d < s; ++d) (l = a[d]) && (u = e.call(l, l.__data__, d, a)) && ("__data__" in l && (u.__data__ = l.__data__), c[d] = u);
	return new T(r, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function c(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function l() {
	return [];
}
function u(e) {
	return e == null ? l : function() {
		return this.querySelectorAll(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function d(e) {
	return function() {
		return c(e.apply(this, arguments));
	};
}
function f(e) {
	e = typeof e == "function" ? d(e) : u(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new T(r, i);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function p(e) {
	return function() {
		return this.matches(e);
	};
}
function m(e) {
	return function(t) {
		return t.matches(e);
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var h = Array.prototype.find;
function g(e) {
	return function() {
		return h.call(this.children, e);
	};
}
function _() {
	return this.firstElementChild;
}
function v(e) {
	return this.select(e == null ? _ : g(typeof e == "function" ? e : m(e)));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var y = Array.prototype.filter;
function b() {
	return Array.from(this.children);
}
function x(e) {
	return function() {
		return y.call(this.children, e);
	};
}
function S(e) {
	return this.selectAll(e == null ? b : x(typeof e == "function" ? e : m(e)));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function ee(e) {
	typeof e != "function" && (e = p(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new T(r, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function te(e) {
	return Array(e.length);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function ne() {
	return new T(this._enter || this._groups.map(te), this._parents);
}
function C(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
C.prototype = {
	constructor: C,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function re(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function ie(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new C(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function ae(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new C(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function oe(e) {
	return e.__data__;
}
function se(e, t) {
	if (!arguments.length) return Array.from(this, oe);
	var n = t ? ae : ie, r = this._parents, i = this._groups;
	typeof e != "function" && (e = re(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = ce(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new T(o, r), o._enter = s, o._exit = c, o;
}
function ce(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function le() {
	return new T(this._exit || this._groups.map(te), this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function ue(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function de(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new T(s, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function fe() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function pe(e) {
	e ||= me;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new T(i, this._parents).order();
}
function me(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function he() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function ge() {
	return Array.from(this);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function _e() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function ve() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function ye() {
	return !this.node();
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function be(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function xe(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Se(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Ce(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function we(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function Te(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function Ee(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function De(e, n) {
	var r = t(e);
	if (arguments.length < 2) {
		var i = this.node();
		return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
	}
	return this.each((n == null ? r.local ? Se : xe : typeof n == "function" ? r.local ? Ee : Te : r.local ? we : Ce)(r, n));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function Oe(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function ke(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Ae(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function je(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Me(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? ke : typeof t == "function" ? je : Ae)(e, t, n ?? "")) : w(this.node(), e);
}
function w(e, t) {
	return e.style.getPropertyValue(t) || Oe(e).getComputedStyle(e, null).getPropertyValue(t);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function Ne(e) {
	return function() {
		delete this[e];
	};
}
function Pe(e, t) {
	return function() {
		this[e] = t;
	};
}
function Fe(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function Ie(e, t) {
	return arguments.length > 1 ? this.each((t == null ? Ne : typeof t == "function" ? Fe : Pe)(e, t)) : this.node()[e];
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function Le(e) {
	return e.trim().split(/^|\s+/);
}
function Re(e) {
	return e.classList || new ze(e);
}
function ze(e) {
	this._node = e, this._names = Le(e.getAttribute("class") || "");
}
ze.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function Be(e, t) {
	for (var n = Re(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function Ve(e, t) {
	for (var n = Re(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function He(e) {
	return function() {
		Be(this, e);
	};
}
function Ue(e) {
	return function() {
		Ve(this, e);
	};
}
function We(e, t) {
	return function() {
		(t.apply(this, arguments) ? Be : Ve)(this, e);
	};
}
function Ge(e, t) {
	var n = Le(e + "");
	if (arguments.length < 2) {
		for (var r = Re(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? We : t ? He : Ue)(n, t));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function Ke() {
	this.textContent = "";
}
function qe(e) {
	return function() {
		this.textContent = e;
	};
}
function Je(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function Ye(e) {
	return arguments.length ? this.each(e == null ? Ke : (typeof e == "function" ? Je : qe)(e)) : this.node().textContent;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function Xe() {
	this.innerHTML = "";
}
function Ze(e) {
	return function() {
		this.innerHTML = e;
	};
}
function Qe(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function $e(e) {
	return arguments.length ? this.each(e == null ? Xe : (typeof e == "function" ? Qe : Ze)(e)) : this.node().innerHTML;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function et() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function tt() {
	return this.each(et);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function nt() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rt() {
	return this.each(nt);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function it(e) {
	var t = typeof e == "function" ? e : i(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function at() {
	return null;
}
function ot(e, t) {
	var n = typeof e == "function" ? e : i(e), r = t == null ? at : typeof t == "function" ? t : o(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function st() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function ct() {
	return this.each(st);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function lt() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ut() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function dt(e) {
	return this.select(e ? ut : lt);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function ft(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function pt(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function mt(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function ht(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function gt(e, t, n) {
	return function() {
		var r = this.__on, i, a = pt(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function _t(e, t, n) {
	var r = mt(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
		return;
	}
	for (s = t ? gt : ht, i = 0; i < a; ++i) this.each(s(r[i], t, n));
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function vt(e, t, n) {
	var r = Oe(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function yt(e, t) {
	return function() {
		return vt(this, e, t);
	};
}
function bt(e, t) {
	return function() {
		return vt(this, e, t.apply(this, arguments));
	};
}
function xt(e, t) {
	return this.each((typeof t == "function" ? bt : yt)(e, t));
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* St() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var Ct = [null];
function T(e, t) {
	this._groups = e, this._parents = t;
}
function E() {
	return new T([[document.documentElement]], Ct);
}
function wt() {
	return this;
}
T.prototype = E.prototype = {
	constructor: T,
	select: s,
	selectAll: f,
	selectChild: v,
	selectChildren: S,
	filter: ee,
	data: se,
	enter: ne,
	exit: le,
	join: ue,
	merge: de,
	selection: wt,
	order: fe,
	sort: pe,
	call: he,
	nodes: ge,
	node: _e,
	size: ve,
	empty: ye,
	each: be,
	attr: De,
	style: Me,
	property: Ie,
	classed: Ge,
	text: Ye,
	html: $e,
	raise: tt,
	lower: rt,
	append: it,
	insert: ot,
	remove: ct,
	clone: dt,
	datum: ft,
	on: _t,
	dispatch: xt,
	[Symbol.iterator]: St
};
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function D(e) {
	return typeof e == "string" ? new T([[document.querySelector(e)]], [document.documentElement]) : new T([[e]], Ct);
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
function Tt(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
//#endregion
//#region node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
function O(e, t) {
	if (e = Tt(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
//#endregion
//#region node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var Et = { value: () => {} };
function Dt() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new Ot(n);
}
function Ot(e) {
	this._ = e;
}
function kt(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
Ot.prototype = Dt.prototype = {
	constructor: Ot,
	on: function(e, t) {
		var n = this._, r = kt(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = At(n[i], e.name))) return i;
			return;
		}
		if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
		for (; ++a < o;) if (i = (e = r[a]).type) n[i] = jt(n[i], e.name, t);
		else if (t == null) for (i in n) n[i] = jt(n[i], e.name, null);
		return this;
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new Ot(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function At(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function jt(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = Et, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
var Mt = { passive: !1 }, Nt = {
	capture: !0,
	passive: !1
};
function Pt(e) {
	e.stopImmediatePropagation();
}
function k(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
function Ft(e) {
	var t = e.document.documentElement, n = D(e).on("dragstart.drag", k, Nt);
	"onselectstart" in t ? n.on("selectstart.drag", k, Nt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function It(e, t) {
	var n = e.document.documentElement, r = D(e).on("dragstart.drag", null);
	t && (r.on("click.drag", k, Nt), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
var Lt = (e) => () => e;
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function Rt(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
Rt.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
//#endregion
//#region node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js
function zt(e) {
	return !e.ctrlKey && !e.button;
}
function Bt() {
	return this.parentNode;
}
function Vt(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function Ht() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ut() {
	var e = zt, t = Bt, n = Vt, r = Ht, i = {}, a = Dt("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, Mt).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!(u || !e.call(this, n, r))) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (D(n.view).on("mousemove.drag", m, Nt).on("mouseup.drag", h, Nt), Ft(n.view), Pt(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if (k(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		D(e.view).on("mousemove.drag mouseup.drag", null), It(e.view, l), k(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) {
			var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s, c;
			for (s = 0; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Pt(n), c("start", n, i[s]));
		}
	}
	function _(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (r = 0; r < n; ++r) (a = i[t[r].identifier]) && (k(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Pt(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = O(l || r, t), p, m, h;
		if ((h = n.call(e, new Rt("beforestart", {
			sourceEvent: r,
			target: f,
			identifier: c,
			active: o,
			x: d[0],
			y: d[1],
			dx: 0,
			dy: 0,
			dispatch: u
		}), s)) != null) return p = h.x - d[0] || 0, m = h.y - d[1] || 0, function n(r, a, l) {
			var g = d, _;
			switch (r) {
				case "start":
					i[c] = n, _ = o++;
					break;
				case "end": delete i[c], --o;
				case "drag":
					d = O(l || a, t), _ = o;
					break;
			}
			u.call(r, e, new Rt(r, {
				sourceEvent: a,
				subject: h,
				target: f,
				identifier: c,
				active: _,
				x: d[0] + p,
				y: d[1] + m,
				dx: d[0] - g[0],
				dy: d[1] - g[1],
				dispatch: u
			}), s);
		};
	}
	return f.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Lt(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Lt(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Lt(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Lt(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
//#endregion
//#region node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function Wt(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function Gt(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function A() {}
var j = .7, Kt = 1 / j, M = "\\s*([+-]?\\d+)\\s*", N = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", P = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qt = /^#([0-9a-f]{3,8})$/, Jt = RegExp(`^rgb\\(${M},${M},${M}\\)$`), Yt = RegExp(`^rgb\\(${P},${P},${P}\\)$`), Xt = RegExp(`^rgba\\(${M},${M},${M},${N}\\)$`), Zt = RegExp(`^rgba\\(${P},${P},${P},${N}\\)$`), Qt = RegExp(`^hsl\\(${N},${P},${P}\\)$`), $t = RegExp(`^hsla\\(${N},${P},${P},${N}\\)$`), en = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
Wt(A, F, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: tn,
	formatHex: tn,
	formatHex8: nn,
	formatHsl: rn,
	formatRgb: an,
	toString: an
});
function tn() {
	return this.rgb().formatHex();
}
function nn() {
	return this.rgb().formatHex8();
}
function rn() {
	return hn(this).formatHsl();
}
function an() {
	return this.rgb().formatRgb();
}
function F(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = qt.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? on(t) : n === 3 ? new I(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? sn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? sn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Jt.exec(e)) ? new I(t[1], t[2], t[3], 1) : (t = Yt.exec(e)) ? new I(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Xt.exec(e)) ? sn(t[1], t[2], t[3], t[4]) : (t = Zt.exec(e)) ? sn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Qt.exec(e)) ? mn(t[1], t[2] / 100, t[3] / 100, 1) : (t = $t.exec(e)) ? mn(t[1], t[2] / 100, t[3] / 100, t[4]) : en.hasOwnProperty(e) ? on(en[e]) : e === "transparent" ? new I(NaN, NaN, NaN, 0) : null;
}
function on(e) {
	return new I(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function sn(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new I(e, t, n, r);
}
function cn(e) {
	return e instanceof A || (e = F(e)), e ? (e = e.rgb(), new I(e.r, e.g, e.b, e.opacity)) : new I();
}
function ln(e, t, n, r) {
	return arguments.length === 1 ? cn(e) : new I(e, t, n, r ?? 1);
}
function I(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Wt(I, ln, Gt(A, {
	brighter(e) {
		return e = e == null ? Kt : Kt ** +e, new I(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? j : j ** +e, new I(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new I(L(this.r), L(this.g), L(this.b), pn(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: un,
	formatHex: un,
	formatHex8: dn,
	formatRgb: fn,
	toString: fn
}));
function un() {
	return `#${R(this.r)}${R(this.g)}${R(this.b)}`;
}
function dn() {
	return `#${R(this.r)}${R(this.g)}${R(this.b)}${R((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function fn() {
	let e = pn(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${L(this.r)}, ${L(this.g)}, ${L(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function pn(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function L(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function R(e) {
	return e = L(e), (e < 16 ? "0" : "") + e.toString(16);
}
function mn(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new z(e, t, n, r);
}
function hn(e) {
	if (e instanceof z) return new z(e.h, e.s, e.l, e.opacity);
	if (e instanceof A || (e = F(e)), !e) return new z();
	if (e instanceof z) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new z(o, s, c, e.opacity);
}
function gn(e, t, n, r) {
	return arguments.length === 1 ? hn(e) : new z(e, t, n, r ?? 1);
}
function z(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Wt(z, gn, Gt(A, {
	brighter(e) {
		return e = e == null ? Kt : Kt ** +e, new z(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? j : j ** +e, new z(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new I(yn(e >= 240 ? e - 240 : e + 120, i, r), yn(e, i, r), yn(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new z(_n(this.h), vn(this.s), vn(this.l), pn(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = pn(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${vn(this.s) * 100}%, ${vn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function _n(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function vn(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function yn(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var bn = (e) => () => e;
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function xn(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function Sn(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Cn(e) {
	return (e = +e) == 1 ? wn : function(t, n) {
		return n - t ? Sn(t, n, e) : bn(isNaN(t) ? n : t);
	};
}
function wn(e, t) {
	var n = t - e;
	return n ? xn(e, n) : bn(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var Tn = (function e(t) {
	var n = Cn(t);
	function r(e, t) {
		var r = n((e = ln(e)).r, (t = ln(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = wn(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function B(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var En = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Dn = new RegExp(En.source, "g");
function On(e) {
	return function() {
		return e;
	};
}
function kn(e) {
	return function(t) {
		return e(t) + "";
	};
}
function An(e, t) {
	var n = En.lastIndex = Dn.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = En.exec(e)) && (i = Dn.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: B(r, i)
	})), n = Dn.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? kn(c[0].x) : On(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var jn = 180 / Math.PI, Mn = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function Nn(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * jn,
		skewX: Math.atan(c) * jn,
		scaleX: o,
		scaleY: s
	};
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var Pn;
function Fn(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Mn : Nn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function In(e) {
	return e == null || (Pn ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), Pn.setAttribute("transform", e), !(e = Pn.transform.baseVal.consolidate())) ? Mn : (e = e.matrix, Nn(e.a, e.b, e.c, e.d, e.e, e.f));
}
//#endregion
//#region node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function Ln(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: B(e, i)
			}, {
				i: c - 2,
				x: B(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: B(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: B(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: B(e, n)
			}, {
				i: s - 2,
				x: B(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var Rn = Ln(Fn, "px, ", "px)", "deg)"), zn = Ln(In, ", ", ")", ")"), Bn = 1e-12;
function Vn(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Hn(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Un(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var Wn = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < Bn) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = Vn(y), c = s / (n * g) * (i * Un(t * r + y) - Hn(y));
				return [
					a + c * d,
					o + c * f,
					s * i / Vn(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), V = 0, Gn = 0, Kn = 0, qn = 1e3, Jn, Yn, Xn = 0, H = 0, Zn = 0, Qn = typeof performance == "object" && performance.now ? performance : Date, $n = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function er() {
	return H ||= ($n(tr), Qn.now() + Zn);
}
function tr() {
	H = 0;
}
function nr() {
	this._call = this._time = this._next = null;
}
nr.prototype = rr.prototype = {
	constructor: nr,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? er() : +n) + (t == null ? 0 : +t), !this._next && Yn !== this && (Yn ? Yn._next = this : Jn = this, Yn = this), this._call = e, this._time = n, cr();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, cr());
	}
};
function rr(e, t, n) {
	var r = new nr();
	return r.restart(e, t, n), r;
}
function ir() {
	er(), ++V;
	for (var e = Jn, t; e;) (t = H - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--V;
}
function ar() {
	H = (Xn = Qn.now()) + Zn, V = Gn = 0;
	try {
		ir();
	} finally {
		V = 0, sr(), H = 0;
	}
}
function or() {
	var e = Qn.now(), t = e - Xn;
	t > qn && (Zn -= t, Xn = e);
}
function sr() {
	for (var e, t = Jn, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Jn = n);
	Yn = e, cr(r);
}
function cr(e) {
	V || (Gn &&= clearTimeout(Gn), e - H > 24 ? (e < Infinity && (Gn = setTimeout(ar, e - Qn.now() - Zn)), Kn &&= clearInterval(Kn)) : (Kn ||= (Xn = Qn.now(), setInterval(or, qn)), V = 1, $n(ar)));
}
//#endregion
//#region node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function lr(e, t, n) {
	var r = new nr();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var ur = Dt("start", "end", "cancel", "interrupt"), dr = [];
function fr(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	mr(e, n, {
		name: t,
		index: r,
		group: i,
		on: ur,
		tween: dr,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function pr(e, t) {
	var n = W(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function U(e, t) {
	var n = W(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function W(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function mr(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = rr(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return lr(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (lr(function() {
			n.state === 3 && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), n.state === 2) {
			for (n.state = 3, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = 5, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === 5 && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = 6, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function hr(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) {
			if ((r = n[o]).name !== t) {
				a = !1;
				continue;
			}
			i = r.state > 2 && r.state < 5, r.state = 6, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
		}
		a && delete e.__transition;
	}
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function gr(e) {
	return this.each(function() {
		hr(this, e);
	});
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function _r(e, t) {
	var n, r;
	return function() {
		var i = U(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function vr(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = U(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function yr(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = W(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? _r : vr)(n, e, t));
}
function br(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = U(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return W(e, r).value[t];
	};
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function xr(e, t) {
	var n;
	return (typeof t == "number" ? B : t instanceof F ? Tn : (n = F(t)) ? (t = n, Tn) : An)(e, t);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function Sr(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Cr(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function wr(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Tr(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function Er(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Dr(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Or(e, n) {
	var r = t(e), i = r === "transform" ? zn : xr;
	return this.attrTween(e, typeof n == "function" ? (r.local ? Dr : Er)(r, i, br(this, "attr." + e, n)) : n == null ? (r.local ? Cr : Sr)(r) : (r.local ? Tr : wr)(r, i, n));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function kr(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Ar(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function jr(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Ar(e, i)), n;
	}
	return i._value = t, i;
}
function Mr(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && kr(e, i)), n;
	}
	return i._value = t, i;
}
function Nr(e, n) {
	var r = "attr." + e;
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (n == null) return this.tween(r, null);
	if (typeof n != "function") throw Error();
	var i = t(e);
	return this.tween(r, (i.local ? jr : Mr)(i, n));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function Pr(e, t) {
	return function() {
		pr(this, e).delay = +t.apply(this, arguments);
	};
}
function Fr(e, t) {
	return t = +t, function() {
		pr(this, e).delay = t;
	};
}
function Ir(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Pr : Fr)(t, e)) : W(this.node(), t).delay;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function Lr(e, t) {
	return function() {
		U(this, e).duration = +t.apply(this, arguments);
	};
}
function Rr(e, t) {
	return t = +t, function() {
		U(this, e).duration = t;
	};
}
function zr(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Lr : Rr)(t, e)) : W(this.node(), t).duration;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function Br(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		U(this, e).ease = t;
	};
}
function Vr(e) {
	var t = this._id;
	return arguments.length ? this.each(Br(t, e)) : W(this.node(), t).ease;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function Hr(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		U(this, e).ease = n;
	};
}
function Ur(e) {
	if (typeof e != "function") throw Error();
	return this.each(Hr(this._id, e));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function Wr(e) {
	typeof e != "function" && (e = p(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new G(r, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function Gr(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new G(o, this._parents, this._name, this._id);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function Kr(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function qr(e, t, n) {
	var r, i, a = Kr(t) ? pr : U;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function Jr(e, t) {
	var n = this._id;
	return arguments.length < 2 ? W(this.node(), n).on.on(e) : this.each(qr(n, e, t));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function Yr(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function Xr() {
	return this.on("end.remove", Yr(this._id));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function Zr(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = o(e));
	for (var r = this._groups, i = r.length, a = Array(i), s = 0; s < i; ++s) for (var c = r[s], l = c.length, u = a[s] = Array(l), d, f, p = 0; p < l; ++p) (d = c[p]) && (f = e.call(d, d.__data__, p, c)) && ("__data__" in d && (f.__data__ = d.__data__), u[p] = f, fr(u[p], t, n, p, u, W(d, n)));
	return new G(a, this._parents, t, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function Qr(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = u(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, d, f = 0; f < l; ++f) if (d = c[f]) {
		for (var p = e.call(d, d.__data__, f, c), m, h = W(d, n), g = 0, _ = p.length; g < _; ++g) (m = p[g]) && fr(m, t, n, g, p, h);
		a.push(p), o.push(d);
	}
	return new G(a, o, t, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var $r = E.prototype.constructor;
function ei() {
	return new $r(this._groups, this._parents);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function ti(e, t) {
	var n, r, i;
	return function() {
		var a = w(this, e), o = (this.style.removeProperty(e), w(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function ni(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function ri(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = w(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function ii(e, t, n) {
	var r, i, a;
	return function() {
		var o = w(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), w(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function ai(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = U(this, e), l = c.on, u = c.value[a] == null ? s ||= ni(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function oi(e, t, n) {
	var r = (e += "") == "transform" ? Rn : xr;
	return t == null ? this.styleTween(e, ti(e, r)).on("end.style." + e, ni(e)) : typeof t == "function" ? this.styleTween(e, ii(e, r, br(this, "style." + e, t))).each(ai(this._id, e)) : this.styleTween(e, ri(e, r, t), n).on("end.style." + e, null);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function si(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function ci(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && si(e, a, n)), r;
	}
	return a._value = t, a;
}
function li(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, ci(e, t, n ?? ""));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function ui(e) {
	return function() {
		this.textContent = e;
	};
}
function di(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function fi(e) {
	return this.tween("text", typeof e == "function" ? di(br(this, "text", e)) : ui(e == null ? "" : e + ""));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function pi(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function mi(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && pi(r)), t;
	}
	return r._value = e, r;
}
function hi(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, mi(e));
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function gi() {
	for (var e = this._name, t = this._id, n = bi(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = W(c, t);
		fr(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new G(r, this._parents, e, n);
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function _i() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = U(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var vi = 0;
function G(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function yi(e) {
	return E().transition(e);
}
function bi() {
	return ++vi;
}
var K = E.prototype;
G.prototype = yi.prototype = {
	constructor: G,
	select: Zr,
	selectAll: Qr,
	selectChild: K.selectChild,
	selectChildren: K.selectChildren,
	filter: Wr,
	merge: Gr,
	selection: ei,
	transition: gi,
	call: K.call,
	nodes: K.nodes,
	node: K.node,
	size: K.size,
	empty: K.empty,
	each: K.each,
	on: Jr,
	attr: Or,
	attrTween: Nr,
	style: oi,
	styleTween: li,
	text: fi,
	textTween: hi,
	remove: Xr,
	tween: yr,
	delay: Ir,
	duration: zr,
	ease: Vr,
	easeVarying: Ur,
	end: _i,
	[Symbol.iterator]: K[Symbol.iterator]
};
//#endregion
//#region node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function xi(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
//#endregion
//#region node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var Si = {
	time: null,
	delay: 0,
	duration: 250,
	ease: xi
};
function Ci(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function wi(e) {
	var t, n;
	e instanceof G ? (t = e._id, e = e._name) : (t = bi(), (n = Si).time = er(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && fr(c, e, t, l, o, n || Ci(c, t));
	return new G(r, this._parents, e, t);
}
E.prototype.interrupt = gr, E.prototype.transition = wi;
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
var Ti = (e) => () => e;
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
function Ei(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		transform: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		_: { value: i }
	});
}
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function q(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
q.prototype = {
	constructor: q,
	scale: function(e) {
		return e === 1 ? this : new q(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new q(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var J = new q(1, 0, 0);
Di.prototype = q.prototype;
function Di(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return J;
	return e.__zoom;
}
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
function Oi(e) {
	e.stopImmediatePropagation();
}
function ki(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
//#endregion
//#region node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
function Ai(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ji() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Mi() {
	return this.__zoom || J;
}
function Ni(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function Pi() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fi(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function Ii() {
	var e = Ai, t = ji, n = Fi, r = Ni, i = Pi, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = Wn, l = Dt("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", Mi).on("wheel.zoom", te, { passive: !1 }).on("mousedown.zoom", ne).on("dblclick.zoom", C).filter(i).on("touchstart.zoom", re).on("touchmove.zoom", ie).on("touchend.zoom touchcancel.zoom", ae).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", Mi), e === i ? i.interrupt().each(function() {
			S(this, arguments).event(r).start().zoom(null, typeof t == "function" ? t.apply(this, arguments) : t).end();
		}) : x(e, t, n, r);
	}, _.scaleBy = function(e, t, n, r) {
		_.scaleTo(e, function() {
			return this.__zoom.k * (typeof t == "function" ? t.apply(this, arguments) : t);
		}, n, r);
	}, _.scaleTo = function(e, r, i, a) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), a = this.__zoom, s = i == null ? b(e) : typeof i == "function" ? i.apply(this, arguments) : i, c = a.invert(s), l = typeof r == "function" ? r.apply(this, arguments) : r;
			return n(y(v(a, l), s, c), e, o);
		}, i, a);
	}, _.translateBy = function(e, r, i, a) {
		_.transform(e, function() {
			return n(this.__zoom.translate(typeof r == "function" ? r.apply(this, arguments) : r, typeof i == "function" ? i.apply(this, arguments) : i), t.apply(this, arguments), o);
		}, null, a);
	}, _.translateTo = function(e, r, i, a, s) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), s = this.__zoom, c = a == null ? b(e) : typeof a == "function" ? a.apply(this, arguments) : a;
			return n(J.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new q(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new q(e.k, r, i);
	}
	function b(e) {
		return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2];
	}
	function x(e, n, r, i) {
		e.on("start.zoom", function() {
			S(this, arguments).event(i).start();
		}).on("interrupt.zoom end.zoom", function() {
			S(this, arguments).event(i).end();
		}).tween("zoom", function() {
			var e = this, a = arguments, o = S(e, a).event(i), s = t.apply(e, a), l = r == null ? b(s) : typeof r == "function" ? r.apply(e, a) : r, u = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1]), d = e.__zoom, f = typeof n == "function" ? n.apply(e, a) : n, p = c(d.invert(l).concat(u / d.k), f.invert(l).concat(u / f.k));
			return function(e) {
				if (e === 1) e = f;
				else {
					var t = p(e), n = u / t[2];
					e = new q(n, l[0] - t[0] * n, l[1] - t[1] * n);
				}
				o.zoom(null, e);
			};
		});
	}
	function S(e, t, n) {
		return !n && e.__zooming || new ee(e, t);
	}
	function ee(e, n) {
		this.that = e, this.args = n, this.active = 0, this.sourceEvent = null, this.extent = t.apply(e, n), this.taps = 0;
	}
	ee.prototype = {
		event: function(e) {
			return e && (this.sourceEvent = e), this;
		},
		start: function() {
			return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
		},
		zoom: function(e, t) {
			return this.mouse && e !== "mouse" && (this.mouse[1] = t.invert(this.mouse[0])), this.touch0 && e !== "touch" && (this.touch0[1] = t.invert(this.touch0[0])), this.touch1 && e !== "touch" && (this.touch1[1] = t.invert(this.touch1[0])), this.that.__zoom = t, this.emit("zoom"), this;
		},
		end: function() {
			return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
		},
		emit: function(e) {
			var t = D(this.that).datum();
			l.call(e, this.that, new Ei(e, {
				sourceEvent: this.sourceEvent,
				target: _,
				type: e,
				transform: this.that.__zoom,
				dispatch: l
			}), t);
		}
	};
	function te(t, ...i) {
		if (!e.apply(this, arguments)) return;
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = O(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], hr(this), s.start();
		ki(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function ne(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = D(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = O(t, i), l = t.clientX, u = t.clientY;
		Ft(t.view), Oi(t), a.mouse = [c, this.__zoom.invert(c)], hr(this), a.start();
		function d(e) {
			if (ki(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = O(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), It(e.view, a.moved), ki(e), a.event(e).end();
		}
	}
	function C(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = O(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			ki(r), s > 0 ? D(this).transition().duration(s).call(x, d, c, r) : D(this).call(_.transform, d, c, r);
		}
	}
	function re(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (Oi(t), s = 0; s < i; ++s) c = r[s], l = O(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), hr(this), a.start());
		}
	}
	function ie(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (ki(e), s = 0; s < a; ++s) c = i[s], l = O(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
			if (c = r.that.__zoom, r.touch1) {
				var d = r.touch0[0], f = r.touch0[1], p = r.touch1[0], m = r.touch1[1], h = (h = p[0] - d[0]) * h + (h = p[1] - d[1]) * h, g = (g = m[0] - f[0]) * g + (g = m[1] - f[1]) * g;
				c = v(c, Math.sqrt(h / g)), l = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2], u = [(f[0] + m[0]) / 2, (f[1] + m[1]) / 2];
			} else if (r.touch0) l = r.touch0[0], u = r.touch0[1];
			else return;
			r.zoom("touch", n(y(c, l, u), r.extent, o));
		}
	}
	function ae(e, ...t) {
		if (this.__zooming) {
			var n = S(this, t).event(e), r = e.changedTouches, i = r.length, a, o;
			for (Oi(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = O(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = D(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Ti(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Ti(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Ti(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Ti([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
	}, _.scaleExtent = function(e) {
		return arguments.length ? (a[0] = +e[0], a[1] = +e[1], _) : [a[0], a[1]];
	}, _.translateExtent = function(e) {
		return arguments.length ? (o[0][0] = +e[0][0], o[1][0] = +e[1][0], o[0][1] = +e[0][1], o[1][1] = +e[1][1], _) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
	}, _.constrain = function(e) {
		return arguments.length ? (n = e, _) : n;
	}, _.duration = function(e) {
		return arguments.length ? (s = +e, _) : s;
	}, _.interpolate = function(e) {
		return arguments.length ? (c = e, _) : c;
	}, _.on = function() {
		var e = l.on.apply(l, arguments);
		return e === l ? _ : e;
	}, _.clickDistance = function(e) {
		return arguments.length ? (h = (e = +e) * e, _) : Math.sqrt(h);
	}, _.tapDistance = function(e) {
		return arguments.length ? (g = +e, _) : g;
	}, _;
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/center.js
function Li(e, t) {
	var n, r = 1;
	e ??= 0, t ??= 0;
	function i() {
		var i, a = n.length, o, s = 0, c = 0;
		for (i = 0; i < a; ++i) o = n[i], s += o.x, c += o.y;
		for (s = (s / a - e) * r, c = (c / a - t) * r, i = 0; i < a; ++i) o = n[i], o.x -= s, o.y -= c;
	}
	return i.initialize = function(e) {
		n = e;
	}, i.x = function(t) {
		return arguments.length ? (e = +t, i) : e;
	}, i.y = function(e) {
		return arguments.length ? (t = +e, i) : t;
	}, i.strength = function(e) {
		return arguments.length ? (r = +e, i) : r;
	}, i;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/add.js
function Ri(e) {
	let t = +this._x.call(null, e), n = +this._y.call(null, e);
	return zi(this.cover(t, n), t, n, e);
}
function zi(e, t, n, r) {
	if (isNaN(t) || isNaN(n)) return e;
	var i, a = e._root, o = { data: r }, s = e._x0, c = e._y0, l = e._x1, u = e._y1, d, f, p, m, h, g, _, v;
	if (!a) return e._root = o, e;
	for (; a.length;) if ((h = t >= (d = (s + l) / 2)) ? s = d : l = d, (g = n >= (f = (c + u) / 2)) ? c = f : u = f, i = a, !(a = a[_ = g << 1 | h])) return i[_] = o, e;
	if (p = +e._x.call(null, a.data), m = +e._y.call(null, a.data), t === p && n === m) return o.next = a, i ? i[_] = o : e._root = o, e;
	do
		i = i ? i[_] = [
			,
			,
			,
			,
		] : e._root = [
			,
			,
			,
			,
		], (h = t >= (d = (s + l) / 2)) ? s = d : l = d, (g = n >= (f = (c + u) / 2)) ? c = f : u = f;
	while ((_ = g << 1 | h) == (v = (m >= f) << 1 | p >= d));
	return i[v] = a, i[_] = o, e;
}
function Bi(e) {
	var t, n, r = e.length, i, a, o = Array(r), s = Array(r), c = Infinity, l = Infinity, u = -Infinity, d = -Infinity;
	for (n = 0; n < r; ++n) isNaN(i = +this._x.call(null, t = e[n])) || isNaN(a = +this._y.call(null, t)) || (o[n] = i, s[n] = a, i < c && (c = i), i > u && (u = i), a < l && (l = a), a > d && (d = a));
	if (c > u || l > d) return this;
	for (this.cover(c, l).cover(u, d), n = 0; n < r; ++n) zi(this, o[n], s[n], e[n]);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/cover.js
function Vi(e, t) {
	if (isNaN(e = +e) || isNaN(t = +t)) return this;
	var n = this._x0, r = this._y0, i = this._x1, a = this._y1;
	if (isNaN(n)) i = (n = Math.floor(e)) + 1, a = (r = Math.floor(t)) + 1;
	else {
		for (var o = i - n || 1, s = this._root, c, l; n > e || e >= i || r > t || t >= a;) switch (l = (t < r) << 1 | e < n, c = [
			,
			,
			,
			,
		], c[l] = s, s = c, o *= 2, l) {
			case 0:
				i = n + o, a = r + o;
				break;
			case 1:
				n = i - o, a = r + o;
				break;
			case 2:
				i = n + o, r = a - o;
				break;
			case 3:
				n = i - o, r = a - o;
				break;
		}
		this._root && this._root.length && (this._root = s);
	}
	return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/data.js
function Hi() {
	var e = [];
	return this.visit(function(t) {
		if (!t.length) do
			e.push(t.data);
		while (t = t.next);
	}), e;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/extent.js
function Ui(e) {
	return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/quad.js
function Y(e, t, n, r, i) {
	this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/find.js
function Wi(e, t, n) {
	var r, i = this._x0, a = this._y0, o, s, c, l, u = this._x1, d = this._y1, f = [], p = this._root, m, h;
	for (p && f.push(new Y(p, i, a, u, d)), n == null ? n = Infinity : (i = e - n, a = t - n, u = e + n, d = t + n, n *= n); m = f.pop();) if (!(!(p = m.node) || (o = m.x0) > u || (s = m.y0) > d || (c = m.x1) < i || (l = m.y1) < a)) if (p.length) {
		var g = (o + c) / 2, _ = (s + l) / 2;
		f.push(new Y(p[3], g, _, c, l), new Y(p[2], o, _, g, l), new Y(p[1], g, s, c, _), new Y(p[0], o, s, g, _)), (h = (t >= _) << 1 | e >= g) && (m = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - h], f[f.length - 1 - h] = m);
	} else {
		var v = e - +this._x.call(null, p.data), y = t - +this._y.call(null, p.data), b = v * v + y * y;
		if (b < n) {
			var x = Math.sqrt(n = b);
			i = e - x, a = t - x, u = e + x, d = t + x, r = p.data;
		}
	}
	return r;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/remove.js
function Gi(e) {
	if (isNaN(u = +this._x.call(null, e)) || isNaN(d = +this._y.call(null, e))) return this;
	var t, n = this._root, r, i, a, o = this._x0, s = this._y0, c = this._x1, l = this._y1, u, d, f, p, m, h, g, _;
	if (!n) return this;
	if (n.length) for (;;) {
		if ((m = u >= (f = (o + c) / 2)) ? o = f : c = f, (h = d >= (p = (s + l) / 2)) ? s = p : l = p, t = n, !(n = n[g = h << 1 | m])) return this;
		if (!n.length) break;
		(t[g + 1 & 3] || t[g + 2 & 3] || t[g + 3 & 3]) && (r = t, _ = g);
	}
	for (; n.data !== e;) if (i = n, !(n = n.next)) return this;
	return (a = n.next) && delete n.next, i ? (a ? i.next = a : delete i.next, this) : t ? (a ? t[g] = a : delete t[g], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[_] = n : this._root = n), this) : (this._root = a, this);
}
function Ki(e) {
	for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/root.js
function qi() {
	return this._root;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/size.js
function Ji() {
	var e = 0;
	return this.visit(function(t) {
		if (!t.length) do
			++e;
		while (t = t.next);
	}), e;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/visit.js
function Yi(e) {
	var t = [], n, r = this._root, i, a, o, s, c;
	for (r && t.push(new Y(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop();) if (!e(r = n.node, a = n.x0, o = n.y0, s = n.x1, c = n.y1) && r.length) {
		var l = (a + s) / 2, u = (o + c) / 2;
		(i = r[3]) && t.push(new Y(i, l, u, s, c)), (i = r[2]) && t.push(new Y(i, a, u, l, c)), (i = r[1]) && t.push(new Y(i, l, o, s, u)), (i = r[0]) && t.push(new Y(i, a, o, l, u));
	}
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/visitAfter.js
function Xi(e) {
	var t = [], n = [], r;
	for (this._root && t.push(new Y(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop();) {
		var i = r.node;
		if (i.length) {
			var a, o = r.x0, s = r.y0, c = r.x1, l = r.y1, u = (o + c) / 2, d = (s + l) / 2;
			(a = i[0]) && t.push(new Y(a, o, s, u, d)), (a = i[1]) && t.push(new Y(a, u, s, c, d)), (a = i[2]) && t.push(new Y(a, o, d, u, l)), (a = i[3]) && t.push(new Y(a, u, d, c, l));
		}
		n.push(r);
	}
	for (; r = n.pop();) e(r.node, r.x0, r.y0, r.x1, r.y1);
	return this;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/x.js
function Zi(e) {
	return e[0];
}
function Qi(e) {
	return arguments.length ? (this._x = e, this) : this._x;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/y.js
function $i(e) {
	return e[1];
}
function ea(e) {
	return arguments.length ? (this._y = e, this) : this._y;
}
//#endregion
//#region node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/quadtree.js
function ta(e, t, n) {
	var r = new na(t ?? Zi, n ?? $i, NaN, NaN, NaN, NaN);
	return e == null ? r : r.addAll(e);
}
function na(e, t, n, r, i, a) {
	this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this._root = void 0;
}
function ra(e) {
	for (var t = { data: e.data }, n = t; e = e.next;) n = n.next = { data: e.data };
	return t;
}
var X = ta.prototype = na.prototype;
X.copy = function() {
	var e = new na(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
	if (!t) return e;
	if (!t.length) return e._root = ra(t), e;
	for (n = [{
		source: t,
		target: e._root = [
			,
			,
			,
			,
		]
	}]; t = n.pop();) for (var i = 0; i < 4; ++i) (r = t.source[i]) && (r.length ? n.push({
		source: r,
		target: t.target[i] = [
			,
			,
			,
			,
		]
	}) : t.target[i] = ra(r));
	return e;
}, X.add = Ri, X.addAll = Bi, X.cover = Vi, X.data = Hi, X.extent = Ui, X.find = Wi, X.remove = Gi, X.removeAll = Ki, X.root = qi, X.size = Ji, X.visit = Yi, X.visitAfter = Xi, X.x = Qi, X.y = ea;
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/constant.js
function Z(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/jiggle.js
function Q(e) {
	return (e() - .5) * 1e-6;
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/collide.js
function ia(e) {
	return e.x + e.vx;
}
function aa(e) {
	return e.y + e.vy;
}
function oa(e) {
	var t, n, r, i = 1, a = 1;
	typeof e != "function" && (e = Z(e == null ? 1 : +e));
	function o() {
		for (var e, o = t.length, c, l, u, d, f, p, m = 0; m < a; ++m) for (c = ta(t, ia, aa).visitAfter(s), e = 0; e < o; ++e) l = t[e], f = n[l.index], p = f * f, u = l.x + l.vx, d = l.y + l.vy, c.visit(h);
		function h(e, t, n, a, o) {
			var s = e.data, c = e.r, m = f + c;
			if (s) {
				if (s.index > l.index) {
					var h = u - s.x - s.vx, g = d - s.y - s.vy, _ = h * h + g * g;
					_ < m * m && (h === 0 && (h = Q(r), _ += h * h), g === 0 && (g = Q(r), _ += g * g), _ = (m - (_ = Math.sqrt(_))) / _ * i, l.vx += (h *= _) * (m = (c *= c) / (p + c)), l.vy += (g *= _) * m, s.vx -= h * (m = 1 - m), s.vy -= g * m);
				}
				return;
			}
			return t > u + m || a < u - m || n > d + m || o < d - m;
		}
	}
	function s(e) {
		if (e.data) return e.r = n[e.data.index];
		for (var t = e.r = 0; t < 4; ++t) e[t] && e[t].r > e.r && (e.r = e[t].r);
	}
	function c() {
		if (t) {
			var r, i = t.length, a;
			for (n = Array(i), r = 0; r < i; ++r) a = t[r], n[a.index] = +e(a, r, t);
		}
	}
	return o.initialize = function(e, n) {
		t = e, r = n, c();
	}, o.iterations = function(e) {
		return arguments.length ? (a = +e, o) : a;
	}, o.strength = function(e) {
		return arguments.length ? (i = +e, o) : i;
	}, o.radius = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Z(+t), c(), o) : e;
	}, o;
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/link.js
function sa(e) {
	return e.index;
}
function ca(e, t) {
	var n = e.get(t);
	if (!n) throw Error("node not found: " + t);
	return n;
}
function la(e) {
	var t = sa, n = d, r, i = Z(30), a, o, s, c, l, u = 1;
	e ??= [];
	function d(e) {
		return 1 / Math.min(s[e.source.index], s[e.target.index]);
	}
	function f(t) {
		for (var n = 0, i = e.length; n < u; ++n) for (var o = 0, s, d, f, p, m, h, g; o < i; ++o) s = e[o], d = s.source, f = s.target, p = f.x + f.vx - d.x - d.vx || Q(l), m = f.y + f.vy - d.y - d.vy || Q(l), h = Math.sqrt(p * p + m * m), h = (h - a[o]) / h * t * r[o], p *= h, m *= h, f.vx -= p * (g = c[o]), f.vy -= m * g, d.vx += p * (g = 1 - g), d.vy += m * g;
	}
	function p() {
		if (o) {
			var n, i = o.length, l = e.length, u = new Map(o.map((e, n) => [t(e, n, o), e])), d;
			for (n = 0, s = Array(i); n < l; ++n) d = e[n], d.index = n, typeof d.source != "object" && (d.source = ca(u, d.source)), typeof d.target != "object" && (d.target = ca(u, d.target)), s[d.source.index] = (s[d.source.index] || 0) + 1, s[d.target.index] = (s[d.target.index] || 0) + 1;
			for (n = 0, c = Array(l); n < l; ++n) d = e[n], c[n] = s[d.source.index] / (s[d.source.index] + s[d.target.index]);
			r = Array(l), m(), a = Array(l), h();
		}
	}
	function m() {
		if (o) for (var t = 0, i = e.length; t < i; ++t) r[t] = +n(e[t], t, e);
	}
	function h() {
		if (o) for (var t = 0, n = e.length; t < n; ++t) a[t] = +i(e[t], t, e);
	}
	return f.initialize = function(e, t) {
		o = e, l = t, p();
	}, f.links = function(t) {
		return arguments.length ? (e = t, p(), f) : e;
	}, f.id = function(e) {
		return arguments.length ? (t = e, f) : t;
	}, f.iterations = function(e) {
		return arguments.length ? (u = +e, f) : u;
	}, f.strength = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Z(+e), m(), f) : n;
	}, f.distance = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Z(+e), h(), f) : i;
	}, f;
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/lcg.js
var ua = 1664525, da = 1013904223, fa = 4294967296;
function pa() {
	let e = 1;
	return () => (e = (ua * e + da) % fa) / fa;
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/simulation.js
function ma(e) {
	return e.x;
}
function ha(e) {
	return e.y;
}
var ga = 10, _a = Math.PI * (3 - Math.sqrt(5));
function va(e) {
	var t, n = 1, r = .001, i = 1 - r ** (1 / 300), a = 0, o = .6, s = /* @__PURE__ */ new Map(), c = rr(d), l = Dt("tick", "end"), u = pa();
	e ??= [];
	function d() {
		f(), l.call("tick", t), n < r && (c.stop(), l.call("end", t));
	}
	function f(r) {
		var c, l = e.length, u;
		r === void 0 && (r = 1);
		for (var d = 0; d < r; ++d) for (n += (a - n) * i, s.forEach(function(e) {
			e(n);
		}), c = 0; c < l; ++c) u = e[c], u.fx == null ? u.x += u.vx *= o : (u.x = u.fx, u.vx = 0), u.fy == null ? u.y += u.vy *= o : (u.y = u.fy, u.vy = 0);
		return t;
	}
	function p() {
		for (var t = 0, n = e.length, r; t < n; ++t) {
			if (r = e[t], r.index = t, r.fx != null && (r.x = r.fx), r.fy != null && (r.y = r.fy), isNaN(r.x) || isNaN(r.y)) {
				var i = ga * Math.sqrt(.5 + t), a = t * _a;
				r.x = i * Math.cos(a), r.y = i * Math.sin(a);
			}
			(isNaN(r.vx) || isNaN(r.vy)) && (r.vx = r.vy = 0);
		}
	}
	function m(t) {
		return t.initialize && t.initialize(e, u), t;
	}
	return p(), t = {
		tick: f,
		restart: function() {
			return c.restart(d), t;
		},
		stop: function() {
			return c.stop(), t;
		},
		nodes: function(n) {
			return arguments.length ? (e = n, p(), s.forEach(m), t) : e;
		},
		alpha: function(e) {
			return arguments.length ? (n = +e, t) : n;
		},
		alphaMin: function(e) {
			return arguments.length ? (r = +e, t) : r;
		},
		alphaDecay: function(e) {
			return arguments.length ? (i = +e, t) : +i;
		},
		alphaTarget: function(e) {
			return arguments.length ? (a = +e, t) : a;
		},
		velocityDecay: function(e) {
			return arguments.length ? (o = 1 - e, t) : 1 - o;
		},
		randomSource: function(e) {
			return arguments.length ? (u = e, s.forEach(m), t) : u;
		},
		force: function(e, n) {
			return arguments.length > 1 ? (n == null ? s.delete(e) : s.set(e, m(n)), t) : s.get(e);
		},
		find: function(t, n, r) {
			var i = 0, a = e.length, o, s, c, l, u;
			for (r == null ? r = Infinity : r *= r, i = 0; i < a; ++i) l = e[i], o = t - l.x, s = n - l.y, c = o * o + s * s, c < r && (u = l, r = c);
			return u;
		},
		on: function(e, n) {
			return arguments.length > 1 ? (l.on(e, n), t) : l.on(e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/manyBody.js
function ya() {
	var e, t, n, r, i = Z(-30), a, o = 1, s = Infinity, c = .81;
	function l(n) {
		var i, a = e.length, o = ta(e, ma, ha).visitAfter(d);
		for (r = n, i = 0; i < a; ++i) t = e[i], o.visit(f);
	}
	function u() {
		if (e) {
			var t, n = e.length, r;
			for (a = Array(n), t = 0; t < n; ++t) r = e[t], a[r.index] = +i(r, t, e);
		}
	}
	function d(e) {
		var t = 0, n, r, i = 0, o, s, c;
		if (e.length) {
			for (o = s = c = 0; c < 4; ++c) (n = e[c]) && (r = Math.abs(n.value)) && (t += n.value, i += r, o += r * n.x, s += r * n.y);
			e.x = o / i, e.y = s / i;
		} else {
			n = e, n.x = n.data.x, n.y = n.data.y;
			do
				t += a[n.data.index];
			while (n = n.next);
		}
		e.value = t;
	}
	function f(e, i, l, u) {
		if (!e.value) return !0;
		var d = e.x - t.x, f = e.y - t.y, p = u - i, m = d * d + f * f;
		if (p * p / c < m) return m < s && (d === 0 && (d = Q(n), m += d * d), f === 0 && (f = Q(n), m += f * f), m < o && (m = Math.sqrt(o * m)), t.vx += d * e.value * r / m, t.vy += f * e.value * r / m), !0;
		if (!(e.length || m >= s)) {
			(e.data !== t || e.next) && (d === 0 && (d = Q(n), m += d * d), f === 0 && (f = Q(n), m += f * f), m < o && (m = Math.sqrt(o * m)));
			do
				e.data !== t && (p = a[e.data.index] * r / m, t.vx += d * p, t.vy += f * p);
			while (e = e.next);
		}
	}
	return l.initialize = function(t, r) {
		e = t, n = r, u();
	}, l.strength = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Z(+e), u(), l) : i;
	}, l.distanceMin = function(e) {
		return arguments.length ? (o = e * e, l) : Math.sqrt(o);
	}, l.distanceMax = function(e) {
		return arguments.length ? (s = e * e, l) : Math.sqrt(s);
	}, l.theta = function(e) {
		return arguments.length ? (c = e * e, l) : Math.sqrt(c);
	}, l;
}
//#endregion
//#region resources/js/components/er-diagram.js
var ba = [
	{
		fill: "#E6F1FB",
		header: "#B5D4F4",
		border: "#185FA5",
		text: "#0C447C"
	},
	{
		fill: "#EEEDFE",
		header: "#CECBF6",
		border: "#534AB7",
		text: "#3C3489"
	},
	{
		fill: "#EAF3DE",
		header: "#C0DD97",
		border: "#3B6D11",
		text: "#27500A"
	},
	{
		fill: "#E1F5EE",
		header: "#9FE1CB",
		border: "#0F6E56",
		text: "#085041"
	},
	{
		fill: "#FAEEDA",
		header: "#FAC775",
		border: "#854F0B",
		text: "#633806"
	},
	{
		fill: "#FAECE7",
		header: "#F5C4B3",
		border: "#993C1D",
		text: "#712B13"
	},
	{
		fill: "#FBEAF0",
		header: "#F4C0D1",
		border: "#993556",
		text: "#72243E"
	}
], xa = [
	{
		fill: "#042C53",
		header: "#0C447C",
		border: "#378ADD",
		text: "#B5D4F4"
	},
	{
		fill: "#26215C",
		header: "#3C3489",
		border: "#7F77DD",
		text: "#CECBF6"
	},
	{
		fill: "#173404",
		header: "#27500A",
		border: "#639922",
		text: "#C0DD97"
	},
	{
		fill: "#04342C",
		header: "#085041",
		border: "#1D9E75",
		text: "#9FE1CB"
	},
	{
		fill: "#412402",
		header: "#633806",
		border: "#BA7517",
		text: "#FAC775"
	},
	{
		fill: "#4A1B0C",
		header: "#712B13",
		border: "#D85A30",
		text: "#F5C4B3"
	},
	{
		fill: "#4B1528",
		header: "#72243E",
		border: "#D4537E",
		text: "#F4C0D1"
	}
], Sa = {
	hasMany: {
		stroke: "#3b82f6",
		dash: null,
		marker: "url(#m-hasmany)"
	},
	hasOne: {
		stroke: "#22c55e",
		dash: null,
		marker: "url(#m-hasone)"
	},
	belongsTo: {
		stroke: "#9ca3af",
		dash: "6,4",
		marker: "url(#m-belongsto)"
	},
	belongsToMany: {
		stroke: "#a855f7",
		dash: null,
		marker: "url(#m-manymany)"
	},
	hasManyThrough: {
		stroke: "#3b82f6",
		dash: "3,3",
		marker: "url(#m-hasmany)"
	},
	morphMany: {
		stroke: "#f97316",
		dash: null,
		marker: "url(#m-hasmany)"
	},
	morphOne: {
		stroke: "#22c55e",
		dash: null,
		marker: "url(#m-hasone)"
	}
}, Ca = 172, $ = 32, wa = 22, Ta = 8, Ea = { highlight_connections_hint: "" };
function Da(e) {
	return $ + e.columns.length * wa + Ta;
}
function Oa(e) {
	let t = e?.data?.data?.nodes ? e.data : e;
	return {
		data: t?.data?.nodes ? t.data : t,
		summary: t?.summary ?? {
			models: "",
			relationships: "",
			node_relationships: {}
		}
	};
}
function ka(e, t = {}) {
	let n = {
		...Ea,
		...t
	}, r = Oa(e);
	return {
		data: r.data,
		summary: r.summary,
		statusMsg: n.highlight_connections_hint,
		_sim: null,
		_zoom: null,
		_selectedId: null,
		init(e) {
			this._render(e);
		},
		refresh(e) {
			let t = Oa(e), r = t.data;
			!r?.nodes || !r?.edges || (this.data = r, this.summary = t.summary, this.statusMsg = n.highlight_connections_hint, this._selectedId = null, this._render(this.$refs?.svg));
		},
		_render(e) {
			if (!e) return;
			this._sim?.stop(), this._sim = null, this._zoom = null;
			let t = document.documentElement.classList.contains("dark"), n = t ? xa : ba, r = e.clientWidth || 900, i = e.clientHeight || 600, a = this.data.nodes.map((e, t) => ({
				...e,
				w: Ca,
				h: Da(e),
				color: n[t % n.length],
				x: r / 2 + Math.cos(t / this.data.nodes.length * 2 * Math.PI) * 270,
				y: i / 2 + Math.sin(t / this.data.nodes.length * 2 * Math.PI) * 200
			})), o = Object.fromEntries(a.map((e) => [e.id, e])), s = this.data.edges.filter((e) => o[e.source] && o[e.target]).map((e) => ({
				...e,
				source: o[e.source],
				target: o[e.target]
			})), c = D(e), l = c.select("#er-g");
			c.interrupt(), l.interrupt().attr("transform", null).selectAll("*").remove(), this._zoom = Ii().scaleExtent([.15, 4]).on("zoom", (e) => l.attr("transform", e.transform)), c.call(this._zoom), c.call(this._zoom.transform, J);
			let u = l.append("g").selectAll("g").data(s).enter().append("g"), d = u.append("path").attr("fill", "none").attr("stroke-width", 1.5).attr("stroke", (e) => Sa[e.type]?.stroke ?? "#9ca3af").attr("stroke-dasharray", (e) => Sa[e.type]?.dash ?? null).attr("marker-end", (e) => Sa[e.type]?.marker ?? "url(#m-belongsto)"), f = u.append("text").text((e) => e.name).attr("font-size", "10").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", t ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"), p = l.append("g").selectAll("g.er-node").data(a).enter().append("g").attr("class", "er-node").style("cursor", "pointer").on("click", (e, t) => this._selectNode(t, p, d, f, s)).call(Ut().on("start", (e, t) => {
				e.active || this._sim.alphaTarget(.3).restart(), t.fx = t.x, t.fy = t.y;
			}).on("drag", (e, t) => {
				t.fx = e.x, t.fy = e.y;
			}).on("end", (e, t) => {
				e.active || this._sim.alphaTarget(0), t.fx = null, t.fy = null;
			}));
			p.append("rect").attr("class", "er-body").attr("width", (e) => e.w).attr("height", (e) => e.h).attr("rx", 8).attr("fill", (e) => e.color.fill).attr("stroke", (e) => e.color.border).attr("stroke-width", 1), p.append("rect").attr("width", (e) => e.w).attr("height", $).attr("rx", 8).attr("fill", (e) => e.color.header), p.append("rect").attr("y", $ - 8).attr("width", (e) => e.w).attr("height", 8).attr("fill", (e) => e.color.header), p.append("text").text((e) => e.id).attr("x", 10).attr("y", $ / 2).attr("dominant-baseline", "central").attr("font-size", 13).attr("font-weight", 500).attr("fill", (e) => e.color.text), p.append("text").text((e) => e.table).attr("x", (e) => e.w - 8).attr("y", $ / 2).attr("text-anchor", "end").attr("dominant-baseline", "central").attr("font-size", 9).attr("opacity", .65).attr("fill", (e) => e.color.border), p.each(function(e) {
				let n = D(this);
				e.columns.forEach((r, i) => {
					let a = $ + i * wa + wa / 2 + 4;
					i > 0 && n.append("line").attr("x1", 6).attr("x2", e.w - 6).attr("y1", $ + i * wa + 4).attr("y2", $ + i * wa + 4).attr("stroke", t ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)").attr("stroke-width", .5), n.append("text").text(r.name).attr("x", 10).attr("y", a).attr("dominant-baseline", "central").attr("font-size", 11).attr("fill", t ? "rgba(255,255,255,0.65)" : "rgba(20,20,20,0.72)"), n.append("text").text(r.type).attr("x", e.w - (r.pk || r.fk ? 32 : 8)).attr("y", a).attr("text-anchor", "end").attr("dominant-baseline", "central").attr("font-size", 9).attr("fill", t ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"), (r.pk || r.fk) && n.append("text").text(r.pk ? "PK" : "FK").attr("x", e.w - 8).attr("y", a).attr("text-anchor", "end").attr("dominant-baseline", "central").attr("font-size", 9).attr("font-weight", 600).attr("fill", r.pk ? e.color.border : "#9ca3af");
				});
			}), this._sim = va(a).force("link", la(s).id((e) => e.id).distance(310).strength(.22)).force("charge", ya().strength(-650)).force("center", Li(r / 2, i / 2)).force("collide", oa().radius((e) => Math.max(e.w, e.h) * .68 + 20)).on("tick", () => {
				p.attr("transform", (e) => `translate(${e.x - e.w / 2},${e.y - e.h / 2})`), d.attr("d", (e) => {
					if (e.source === e.target) {
						let t = e.source.x + e.source.w / 2, n = e.source.y;
						return `M${t},${n} C${t + 90},${n - 70} ${t + 90},${n + 70} ${t},${n + 24}`;
					}
					let t = e.target.x - e.source.x, n = Math.min(Math.abs(t) * .45, 160);
					return `M${e.source.x},${e.source.y} C${e.source.x + n},${e.source.y} ${e.target.x - n},${e.target.y} ${e.target.x},${e.target.y}`;
				}), f.attr("x", (e) => (e.source.x + e.target.x) / 2).attr("y", (e) => (e.source.y + e.target.y) / 2 - 10);
			}), this._sim.on("end", () => this.erZoomReset()).alphaMin(.05);
		},
		_selectNode(e, t, r, i, a) {
			if (this._selectedId = this._selectedId === e.id ? null : e.id, !this._selectedId) {
				t.style("opacity", 1), r.style("opacity", .85), i.style("opacity", .7), this.statusMsg = n.highlight_connections_hint;
				return;
			}
			let o = new Set([this._selectedId]);
			a.forEach((e) => {
				e.source.id === this._selectedId && o.add(e.target.id), e.target.id === this._selectedId && o.add(e.source.id);
			}), t.style("opacity", (e) => o.has(e.id) ? 1 : .12), r.style("opacity", (e) => e.source.id === this._selectedId || e.target.id === this._selectedId ? 1 : .04), i.style("opacity", (e) => e.source.id === this._selectedId || e.target.id === this._selectedId ? 1 : .04);
			let s = this.summary.node_relationships?.[e.id] ?? "";
			this.statusMsg = [
				e.id,
				e.table,
				s
			].filter(Boolean).join(" · ");
		},
		search(e) {
			D(document.getElementById("er-g")).selectAll("g.er-node").style("opacity", (t) => e ? t.id.toLowerCase().includes(e.toLowerCase()) ? 1 : .1 : 1);
		},
		erZoom(e) {
			D(this.$refs?.svg ?? "#er-svg").transition().duration(250).call(this._zoom.scaleBy, e);
		},
		erZoomReset() {
			let e = this.$refs?.svg;
			if (!e || !this._zoom) return;
			let t = D(e), n = t.select("#er-g").node()?.getBBox();
			if (!n || n.width === 0 || n.height === 0) {
				t.transition().duration(350).call(this._zoom.transform, J);
				return;
			}
			let r = e.clientWidth, i = e.clientHeight, a = e.parentElement?.querySelector(".absolute.bottom-0")?.offsetHeight ?? 32, o = r - 80, s = i - 80 - a, c = Math.min(o / n.width, s / n.height, 1), l = r / 2 - c * (n.x + n.width / 2), u = (i - a) / 2 - c * (n.y + n.height / 2);
			t.transition().duration(350).call(this._zoom.transform, J.translate(l, u).scale(c));
		},
		exportSvg(e) {
			if (!e) return;
			let t = e.cloneNode(!0), n = (e) => {
				[...e.attributes].forEach((t) => {
					(t.name.startsWith("wire:") || t.name.startsWith("x-") || t.name.startsWith("@") || t.name.startsWith(":")) && e.removeAttribute(t.name);
				});
			};
			n(t), t.querySelectorAll("*").forEach(n), t.getAttribute("xmlns") || t.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			let r = new XMLSerializer().serializeToString(t), i = new Blob([r], { type: "image/svg+xml;charset=utf-8" });
			this._triggerDownload(URL.createObjectURL(i), "er-diagram.svg");
		},
		exportPng(e) {
			if (!e) return;
			let t = e.clientWidth, n = e.clientHeight, r = e.cloneNode(!0);
			r.removeAttribute("wire:ignore"), r.removeAttribute("x-ref"), r.getAttribute("viewBox") || r.setAttribute("viewBox", `0 0 ${t} ${n}`), r.setAttribute("width", t * 3), r.setAttribute("height", n * 3), r.querySelectorAll("*").forEach((e) => {
				let t = window.getComputedStyle(e);
				[
					"stroke",
					"fill",
					"stroke-width",
					"stroke-dasharray",
					"font-family",
					"font-size",
					"font-weight",
					"opacity",
					"visibility",
					"display"
				].forEach((n) => {
					let r = t.getPropertyValue(n);
					r && (e.style[n.replace(/-./g, (e) => e[1].toUpperCase())] = r);
				}), e.removeAttribute("class");
			});
			let i = new Blob([new XMLSerializer().serializeToString(r)], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(i), o = Object.assign(document.createElement("canvas"), {
				width: t * 3,
				height: n * 3
			}), s = o.getContext("2d");
			s.imageSmoothingEnabled = !1;
			let c = new Image();
			c.onload = () => {
				s.drawImage(c, 0, 0), this._triggerDownload(o.toDataURL("image/png", 1), "er-diagram.png"), URL.revokeObjectURL(a);
			}, c.onerror = () => {
				console.error("PNG export failed"), URL.revokeObjectURL(a);
			}, c.src = a;
		},
		_triggerDownload(e, t) {
			Object.assign(document.createElement("a"), {
				href: e,
				download: t
			}).click();
		}
	};
}
//#endregion
export { ka as default };
