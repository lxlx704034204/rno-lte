// OpenLayers 3. See https://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.19.1
;(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
    var k, aa = this;
    function r(a, b) {
        var c = a.split("."), d = OPENLAYERS || aa;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)c.length || void 0 === b ? d[e] ? d = d[e] : d = d[e] = {} : d[e] = b
    }
    var ba, ca;
    function v(a, b) {
        a.prototype = Object.create(b.prototype);
        a.prototype.constructor = a
    }
    function da() {
    }
    function ea(a) {
        return a.On || (a.On = ++fa)
    }
    var fa = 0;
    function ga(a) {
        this.message = "Assertion failed. See https://openlayers.org/en/v3.19.1/doc/errors/#" + a + " for details.";
        this.code = a;
        this.name = "AssertionError"
    }
    v(ga, Error);
    function ha(a, b) {
        if (!a)throw new ga(b);
    }
    function ia(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }
    var ja = function () {
        var a;
        "cosh" in Math ? a = Math.cosh : a = function (a) {
            a = Math.exp(a);
            return (a + 1 / a) / 2
        };
        return a
    }();
    function ka(a) {
        ha(0 < a, 29);
        return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2))
    }
    function la(a, b, c, d, e, f) {
        var g = e - c, h = f - d;
        if (0 !== g || 0 !== h) {
            var l = ((a - c) * g + (b - d) * h) / (g * g + h * h);
            1 < l ? (c = e, d = f) : 0 < l && (c += g * l, d += h * l)
        }
        return ma(a, b, c, d)
    }
    function ma(a, b, c, d) {
        a = c - a;
        b = d - b;
        return a * a + b * b
    }
    function na(a) {
        return a * Math.PI / 180
    }
    function oa(a, b) {
        var c = a % b;
        return 0 > c * b ? c + b : c
    }
    function pa(a, b, c) {
        return a + c * (b - a)
    }
    function qa(a) {
        return function (b) {
            if (b)return [ia(b[0], a[0], a[2]), ia(b[1], a[1], a[3])]
        }
    }
    function sa(a) {
        return a
    }
    function ta(a, b, c) {
        this.center = a;
        this.resolution = b;
        this.rotation = c
    }
    var ua = "function" === typeof Object.assign ? Object.assign : function (a, b) {
        if (!a || !a)throw new TypeError("Cannot convert undefined or null to object");
        for (var c = Object(a), d = 1, e = arguments.length; d < e; ++d) {
            var f = arguments[d];
            if (void 0 !== f && null !== f)for (var g in f)f.hasOwnProperty(g) && (c[g] = f[g])
        }
        return c
    };
    function va(a) {
        for (var b in a)delete a[b]
    }
    function wa(a) {
        var b = [], c;
        for (c in a)b.push(a[c]);
        return b
    }
    function xa(a) {
        for (var b in a)return !1;
        return !b
    }
    function ya(a) {
        function b(b) {
            var d = a.listener, e = a.jg || a.target;
            a.lg && za(a);
            return d.call(e, b)
        }
        return a.kg = b
    }
    function Aa(a, b, c, d) {
        for (var e, f = 0, g = a.length; f < g; ++f)if (e = a[f], e.listener === b && e.jg === c)return d && (e.deleteIndex = f), e
    }
    function Ba(a, b) {
        var c = a.$a;
        return c ? c[b] : void 0
    }
    function Ca(a) {
        var b = a.$a;
        b || (b = a.$a = {});
        return b
    }
    function Da(a,b){var c=Ba(a,b);if(c){for(var d=0,e=c.length;d<e;++d)a.removeEventListener(b,c[d].kg),va(c[d]);c.length=0;if(c=a.$a)delete c[b],0===Object.keys(c).length&&delete a.$a}}function w(a,b,c,d,e){var f=Ca(a),g=f[b];g||(g=f[b]=[]);(f=Aa(g,c,d,!1))?e||(f.lg=!1):(f={jg:d,lg:!!e,listener:c,target:a,type:b},a.addEventListener(b,ya(f)),g.push(f));return f}function Ea(a,b,c,d){return w(a,b,c,d,!0)}function Fa(a,b,c,d){(a=Ba(a,b))&&(c=Aa(a,c,d,!0))&&za(c)}
    function za(a) {
        if (a && a.target) {
            a.target.removeEventListener(a.type, a.kg);
            var b = Ba(a.target, a.type);
            if (b) {
                var c = "deleteIndex" in a ? a.deleteIndex : b.indexOf(a);
                -1 !== c && b.splice(c, 1);
                0 === b.length && Da(a.target, a.type)
            }
            va(a)
        }
    }
    function Ha(a) {
        var b = Ca(a), c;
        for (c in b)Da(a, c)
    }
    function Ia() {
    }
    Ia.prototype.Ib = !1;
    function Ja(a) {
        a.Ib || (a.Ib = !0, a.la())
    }
    Ia.prototype.la = da;
    function Ka(a) {
        this.type = a;
        this.target = null
    }
    Ka.prototype.preventDefault = Ka.prototype.stopPropagation = function () {
        this.io = !0
    };
    function La(a) {
        a.stopPropagation()
    }
    function Ma() {
        this.Qa = {};
        this.za = {};
        this.na = {}
    }
    v(Ma, Ia);
    Ma.prototype.addEventListener = function (a, b) {
        var c = this.na[a];
        c || (c = this.na[a] = []);
        -1 === c.indexOf(b) && c.push(b)
    };
    Ma.prototype.b=function(a){var b="string"===typeof a?new Ka(a):a;a=b.type;b.target=this;var c=this.na[a],d;if(c){a in this.za||(this.za[a]=0,this.Qa[a]=0);++this.za[a];for(var e=0,f=c.length;e<f;++e)if(!1===c[e].call(this,b)||b.io){d=!1;break}--this.za[a];if(0===this.za[a]){b=this.Qa[a];for(delete this.Qa[a];b--;)this.removeEventListener(a,da);delete this.za[a]}return d}};Ma.prototype.la=function(){Ha(this)};function Na(a,b){return b?b in a.na:0<Object.keys(a.na).length}
Ma.prototype.removeEventListener=function(a,b){var c=this.na[a];if(c){var d=c.indexOf(b);a in this.Qa?(c[d]=da,++this.Qa[a]):(c.splice(d,1),0===c.length&&delete this.na[a])}};function Pa(){Ma.call(this);this.g=0}v(Pa,Ma);function Qa(a){if(Array.isArray(a))for(var b=0,c=a.length;b<c;++b)za(a[b]);else za(a)}k=Pa.prototype;k.v=function(){++this.g;this.b("change")};k.K=function(){return this.g};k.I=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=w(this,a[f],b,c);return e}return w(this,a,b,c)};k.L=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=Ea(this,a[f],b,c);return e}return Ea(this,a,b,c)};
k.J=function(a,b,c){if(Array.isArray(a))for(var d=0,e=a.length;d<e;++d)Fa(this,a[d],b,c);else Fa(this,a,b,c)};k.M=Qa;function Ta(a,b,c){Ka.call(this,a);this.key=b;this.oldValue=c}v(Ta,Ka);function Ua(a){Pa.call(this);ea(this);this.T={};void 0!==a&&this.H(a)}v(Ua,Pa);var Va={};function Wa(a){return Va.hasOwnProperty(a)?Va[a]:Va[a]="change:"+a}k=Ua.prototype;k.get=function(a){var b;this.T.hasOwnProperty(a)&&(b=this.T[a]);return b};k.O=function(){return Object.keys(this.T)};k.N=function(){return ua({},this.T)};function Xa(a,b,c){var d;d=Wa(b);a.b(new Ta(d,b,c));a.b(new Ta("propertychange",b,c))}
k.set=function(a,b,c){c?this.T[a]=b:(c=this.T[a],this.T[a]=b,c!==b&&Xa(this,a,c))};k.H=function(a,b){for(var c in a)this.set(c,a[c],b)};k.R=function(a,b){if(a in this.T){var c=this.T[a];delete this.T[a];b||Xa(this,a,c)}};function Ya(a,b){return a>b?1:a<b?-1:0}function Za(a,b){return 0<=a.indexOf(b)}function $a(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1}function ab(a){return a.reduce(function(a,c){return Array.isArray(c)?a.concat(ab(c)):a.concat(c)},[])}
function bb(a,b){var c,d=Array.isArray(b)?b:[b],e=d.length;for(c=0;c<e;c++)a[a.length]=d[c]}function cb(a,b){var c=a.indexOf(b),d=-1<c;d&&a.splice(c,1);return d}function db(a,b){for(var c=a.length>>>0,d,e=0;e<c;e++)if(d=a[e],b(d,e,a))return d;return null}function eb(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;d<c;d++)if(a[d]!==b[d])return!1;return!0}
    function fb(a) {
        var b = gb, c = a.length, d = Array(a.length), e;
        for (e = 0; e < c; e++)d[e] = {index: e, value: a[e]};
        d.sort(function (a, c) {
            return b(a.value, c.value) || a.index - c.index
        });
        for (e = 0; e < a.length; e++)a[e] = d[e].value
    }
    function hb(a, b) {
        var c;
        return a.every(function (d, e) {
            c = e;
            return !b(d, e, a)
        }) ? -1 : c
    }
    function ib(a, b) {
        var c = b || Ya;
        return a.every(function (b, e) {
            if (0 === e)return !0;
            var f = c(a[e - 1], b);
            return !(0 < f || 0 === f)
        })
    }
    function jb(a) {
        return function (b, c, d) {
            if (void 0 !== b)return b = $a(a, b, d), b = ia(b + c, 0, a.length - 1), c = Math.floor(b), b != c && c < a.length - 1 ? a[c] / Math.pow(a[c] / a[c + 1], b - c) : a[c]
        }
    }
    function kb(a, b, c) {
        return function (d, e, f) {
            if (void 0 !== d)return d = Math.max(Math.floor(Math.log(b / d) / Math.log(a) + (-f / 2 + .5)) + e, 0), void 0 !== c && (d = Math.min(d, c)), b / Math.pow(a, d)
        }
    }
    function lb(a) {
        if (void 0 !== a)return 0
    }
    function mb(a, b) {
        if (void 0 !== a)return a + b
    }
    function nb(a) {
        var b = 2 * Math.PI / a;
        return function (a, d) {
            if (void 0 !== a)return a = Math.floor((a + d) / b + .5) * b
        }
    }
    function ob() {
        var a = na(5);
        return function (b, c) {
            if (void 0 !== b)return Math.abs(b + c) <= a ? 0 : b + c
        }
    }
    function pb(a, b) {
        var c = void 0 !== b ? a.toFixed(b) : "" + a, d = c.indexOf("."), d = -1 === d ? c.length : d;
        return 2 < d ? c : Array(3 - d).join("0") + c
    }
    function qb(a) {
        a = ("" + a).split(".");
        for (var b = ["1", "3"], c = 0; c < Math.max(a.length, b.length); c++) {
            var d = parseInt(a[c] || "0", 10), e = parseInt(b[c] || "0", 10);
            if (d > e)return 1;
            if (e > d)return -1
        }
        return 0
    }
    function rb(a, b) {
        a[0] += b[0];
        a[1] += b[1];
        return a
    }
    function sb(a, b) {
        var c = a[0], d = a[1], e = b[0], f = b[1], g = e[0], e = e[1], h = f[0], f = f[1], l = h - g, m = f - e, c = 0 === l && 0 === m ? 0 : (l * (c - g) + m * (d - e)) / (l * l + m * m || 0);
        0 >= c || (1 <= c ? (g = h, e = f) : (g += c * l, e += c * m));
        return [g, e]
    }
    function tb(a, b, c) {
        a = oa(a + 180, 360) - 180;
        var d = Math.abs(3600 * a);
        return Math.floor(d / 3600) + "\u00b0 " + pb(Math.floor(d / 60 % 60)) + "\u2032 " + pb(d % 60, c || 0) + "\u2033 " + b.charAt(0 > a ? 1 : 0)
    }
    function ub(a, b, c) {
        return a ? b.replace("{x}", a[0].toFixed(c)).replace("{y}", a[1].toFixed(c)) : ""
    }
    function vb(a, b) {
        for (var c = !0, d = a.length - 1; 0 <= d; --d)if (a[d] != b[d]) {
            c = !1;
            break
        }
        return c
    }
    function wb(a, b) {
        var c = Math.cos(b), d = Math.sin(b), e = a[1] * c + a[0] * d;
        a[0] = a[0] * c - a[1] * d;
        a[1] = e;
        return a
    }
    function xb(a, b) {
        var c = a[0] - b[0], d = a[1] - b[1];
        return c * c + d * d
    }
    function yb(a, b) {
        return xb(a, sb(a, b))
    }
    function zb(a, b) {
        return ub(a, "{x}, {y}", b)
    }
    function Ab(a) {
        for (var b = Bb(), c = 0, d = a.length; c < d; ++c)Cb(b, a[c]);
        return b
    }
    function Db(a, b, c) {
        return c ? (c[0] = a[0] - b, c[1] = a[1] - b, c[2] = a[2] + b, c[3] = a[3] + b, c) : [a[0] - b, a[1] - b, a[2] + b, a[3] + b]
    }
    function Eb(a, b) {
        return b ? (b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b) : a.slice()
    }
    function Fb(a, b, c) {
        b = b < a[0] ? a[0] - b : a[2] < b ? b - a[2] : 0;
        a = c < a[1] ? a[1] - c : a[3] < c ? c - a[3] : 0;
        return b * b + a * a
    }
    function Gb(a, b) {
        return Hb(a, b[0], b[1])
    }
    function Ib(a, b) {
        return a[0] <= b[0] && b[2] <= a[2] && a[1] <= b[1] && b[3] <= a[3]
    }
    function Hb(a,b,c){return a[0]<=b&&b<=a[2]&&a[1]<=c&&c<=a[3]}function Jb(a,b){var c=a[1],d=a[2],e=a[3],f=b[0],g=b[1],h=0;f<a[0]?h|=16:f>d&&(h|=4);g<c?h|=8:g>e&&(h|=2);0===h&&(h=1);return h}function Bb(){return[Infinity,Infinity,-Infinity,-Infinity]}function Kb(a,b,c,d,e){return e?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}function Lb(a,b){var c=a[0],d=a[1];return Kb(c,d,c,d,b)}function Mb(a,b,c,d,e){e=Kb(Infinity,Infinity,-Infinity,-Infinity,e);return Ob(e,a,b,c,d)}
function Pb(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function Qb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3]);return a}function Cb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[2]&&(a[2]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[3]&&(a[3]=b[1])}function Ob(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}
function Rb(a,b,c){var d;return(d=b.call(c,Sb(a)))||(d=b.call(c,Tb(a)))||(d=b.call(c,Vb(a)))?d:(d=b.call(c,Wb(a)))?d:!1}function Xb(a){var b=0;Yb(a)||(b=Zb(a)*$b(a));return b}function Sb(a){return[a[0],a[1]]}function Tb(a){return[a[2],a[1]]}function ac(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
function bc(a,b,c,d,e){var f=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);var g=Math.sin(c);c=f*b;f*=g;b*=d;var h=d*g,l=a[0],m=a[1];a=l-c+h;d=l-c-h;g=l+c-h;c=l+c+h;var h=m-f-b,l=m-f+b,n=m+f+b,f=m+f-b;return Kb(Math.min(a,d,g,c),Math.min(h,l,n,f),Math.max(a,d,g,c),Math.max(h,l,n,f),e)}function $b(a){return a[3]-a[1]}function cc(a,b,c){c=c?c:Bb();dc(a,b)&&(c[0]=a[0]>b[0]?a[0]:b[0],c[1]=a[1]>b[1]?a[1]:b[1],c[2]=a[2]<b[2]?a[2]:b[2],c[3]=a[3]<b[3]?a[3]:b[3]);return c}function Wb(a){return[a[0],a[3]]}
function Vb(a){return[a[2],a[3]]}function Zb(a){return a[2]-a[0]}function dc(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function Yb(a){return a[2]<a[0]||a[3]<a[1]}function ec(a,b){var c=(a[2]-a[0])/2*(b-1),d=(a[3]-a[1])/2*(b-1);a[0]-=c;a[2]+=c;a[1]-=d;a[3]+=d}
    function fc(a, b, c) {
        a = [a[0], a[1], a[0], a[3], a[2], a[1], a[2], a[3]];
        b(a, a, 2);
        var d = [a[0], a[2], a[4], a[6]], e = [a[1], a[3], a[5], a[7]];
        b = Math.min.apply(null, d);
        a = Math.min.apply(null, e);
        d = Math.max.apply(null, d);
        e = Math.max.apply(null, e);
        return Kb(b, a, d, e, c)
    }
    function gc() {
        return !0
    }
    function hc() {
        return !1
    }
    /*

     Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function ic(a){this.radius=a}ic.prototype.a=function(a){for(var b=0,c=a.length,d=a[c-1][0],e=a[c-1][1],f=0;f<c;f++)var g=a[f][0],h=a[f][1],b=b+na(g-d)*(2+Math.sin(na(e))+Math.sin(na(h))),d=g,e=h;return b*this.radius*this.radius/2};ic.prototype.b=function(a,b){var c=na(a[1]),d=na(b[1]),e=(d-c)/2,f=na(b[0]-a[0])/2,c=Math.sin(e)*Math.sin(e)+Math.sin(f)*Math.sin(f)*Math.cos(c)*Math.cos(d);return 2*this.radius*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))};
ic.prototype.offset=function(a,b,c){var d=na(a[1]);b/=this.radius;var e=Math.asin(Math.sin(d)*Math.cos(b)+Math.cos(d)*Math.sin(b)*Math.cos(c));return[180*(na(a[0])+Math.atan2(Math.sin(c)*Math.sin(b)*Math.cos(d),Math.cos(b)-Math.sin(d)*Math.sin(e)))/Math.PI,180*e/Math.PI]};var jc=new ic(6370997);var kc={};kc.degrees=2*Math.PI*jc.radius/360;kc.ft=.3048;kc.m=1;kc["us-ft"]=1200/3937;
function lc(a){this.eb=a.code;this.c=a.units;this.f=void 0!==a.extent?a.extent:null;this.i=void 0!==a.worldExtent?a.worldExtent:null;this.b=void 0!==a.axisOrientation?a.axisOrientation:"enu";this.g=void 0!==a.global?a.global:!1;this.a=!(!this.g||!this.f);this.l=void 0!==a.getPointResolution?a.getPointResolution:this.fk;this.j=null;this.o=a.metersPerUnit;var b=mc,c=a.code,d=nc||window.proj4;if("function"==typeof d&&void 0===b[c]){var e=d.defs(c);if(void 0!==e){void 0!==e.axis&&void 0===a.axisOrientation&&
(this.b=e.axis);void 0===a.metersPerUnit&&(this.o=e.to_meter);void 0===a.units&&(this.c=e.units);for(var f in b)b=d.defs(f),void 0!==b&&(a=qc(f),b===e?rc([a,this]):(b=d(f,c),sc(a,this,b.forward,b.inverse)))}}}k=lc.prototype;k.Gj=function(){return this.eb};k.D=function(){return this.f};k.yb=function(){return this.c};k.dc=function(){return this.o||kc[this.c]};k.sk=function(){return this.i};k.bl=function(){return this.g};k.Ro=function(a){this.g=a;this.a=!(!a||!this.f)};
k.Am=function(a){this.f=a;this.a=!(!this.g||!a)};k.Yo=function(a){this.i=a};k.Qo=function(a){this.l=a};k.fk=function(a,b){if("degrees"==this.yb())return a;var c=tc(this,qc("EPSG:4326")),d=[b[0]-a/2,b[1],b[0]+a/2,b[1],b[0],b[1]-a/2,b[0],b[1]+a/2],d=c(d,d,2),c=(jc.b(d.slice(0,2),d.slice(2,4))+jc.b(d.slice(4,6),d.slice(6,8)))/2,d=this.dc();void 0!==d&&(c/=d);return c};k.getPointResolution=function(a,b){return this.l(a,b)};var mc={},uc={},nc=null;
function rc(a){vc(a);a.forEach(function(b){a.forEach(function(a){b!==a&&wc(b,a,xc)})})}function yc(){var a=zc,b=Ac,c=Bc;Cc.forEach(function(d){a.forEach(function(a){wc(d,a,b);wc(a,d,c)})})}function Dc(a){mc[a.eb]=a;wc(a,a,xc)}function vc(a){var b=[];a.forEach(function(a){b.push(Dc(a))})}function Ec(a){return a?"string"===typeof a?qc(a):a:qc("EPSG:3857")}function wc(a,b,c){a=a.eb;b=b.eb;a in uc||(uc[a]={});uc[a][b]=c}function sc(a,b,c,d){a=qc(a);b=qc(b);wc(a,b,Fc(c));wc(b,a,Fc(d))}
function Fc(a){return function(b,c,d){var e=b.length;d=void 0!==d?d:2;c=void 0!==c?c:Array(e);var f,g;for(g=0;g<e;g+=d)for(f=a([b[g],b[g+1]]),c[g]=f[0],c[g+1]=f[1],f=d-1;2<=f;--f)c[g+f]=b[g+f];return c}}function qc(a){var b;if(a instanceof lc)b=a;else if("string"===typeof a){b=mc[a];var c=nc||window.proj4;void 0===b&&"function"==typeof c&&void 0!==c.defs(a)&&(b=new lc({code:a}),Dc(b))}return b||null}function Hc(a,b){if(a===b)return!0;var c=a.yb()===b.yb();return a.eb===b.eb?c:tc(a,b)===xc&&c}
    function Ic(a, b) {
        var c = qc(a), d = qc(b);
        return tc(c, d)
    }
    function tc(a, b) {
        var c = a.eb, d = b.eb, e;
        c in uc && d in uc[c] && (e = uc[c][d]);
        void 0 === e && (e = Jc);
        return e
    }
    function Jc(a, b) {
        if (void 0 !== b && a !== b) {
            for (var c = 0, d = a.length; c < d; ++c)b[c] = a[c];
            a = b
        }
        return a
    }
    function xc(a, b) {
        var c;
        if (void 0 !== b) {
            c = 0;
            for (var d = a.length; c < d; ++c)b[c] = a[c];
            c = b
        } else c = a.slice();
        return c
    }
    function Kc(a, b, c) {
        return Ic(b, c)(a, void 0, a.length)
    }
    function Lc(a, b, c) {
        b = Ic(b, c);
        return fc(a, b)
    }
    function Mc() {
        Ua.call(this);
        this.s = Bb();
        this.u = -1;
        this.i = {};
        this.o = this.j = 0
    }
    v(Mc, Ua);
    k = Mc.prototype;
    k.xb = function (a, b) {
        var c = b ? b : [NaN, NaN];
        this.vb(a[0], a[1], c, Infinity);
        return c
    };
    k.jb = function (a) {
        return this.Ac(a[0], a[1])
    };
    k.Ac = hc;
    k.D = function (a) {
        this.u != this.g && (this.s = this.Pd(this.s), this.u = this.g);
        var b = this.s;
        a ? (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3]) : a = b;
        return a
    };
    k.Db = function (a) {
        return this.pd(a * a)
    };
    k.lb = function (a, b) {
        this.oc(Ic(a, b));
        return this
    };
    function Nc(a, b, c, d, e, f) {
        for (var g = f ? f : [], h = 0; b < c; b += d) {
            var l = a[b], m = a[b + 1];
            g[h++] = e[0] * l + e[2] * m + e[4];
            g[h++] = e[1] * l + e[3] * m + e[5]
        }
        f && g.length != h && (g.length = h);
        return g
    }
    function Oc() {
        Mc.call(this);
        this.ia = "XY";
        this.a = 2;
        this.A = null
    }
    v(Oc, Mc);
    function Pc(a) {
        var b;
        "XY" == a ? b = 2 : "XYZ" == a || "XYM" == a ? b = 3 : "XYZM" == a && (b = 4);
        return b
    }
    k = Oc.prototype;
    k.Ac = hc;
    k.Pd = function (a) {
        return Mb(this.A, 0, this.A.length, this.a, a)
    };
    k.Lb = function () {
        return this.A.slice(0, this.a)
    };
    k.ka = function () {
        return this.A
    };
    k.Mb = function () {
        return this.A.slice(this.A.length - this.a)
    };
    k.Nb = function () {
        return this.ia
    };
    k.pd=function(a){this.o!=this.g&&(va(this.i),this.j=0,this.o=this.g);if(0>a||0!==this.j&&a<=this.j)return this;var b=a.toString();if(this.i.hasOwnProperty(b))return this.i[b];var c=this.Mc(a);if(c.ka().length<this.A.length)return this.i[b]=c;this.j=a;return this};k.Mc=function(){return this};k.sa=function(){return this.a};function Qc(a,b,c){a.a=Pc(b);a.ia=b;a.A=c}
function Rc(a,b,c,d){if(b)c=Pc(b);else{for(b=0;b<d;++b){if(0===c.length){a.ia="XY";a.a=2;return}c=c[0]}c=c.length;var e;2==c?e="XY":3==c?e="XYZ":4==c&&(e="XYZM");b=e}a.ia=b;a.a=c}k.oc=function(a){this.A&&(a(this.A,this.A,this.a),this.v())};
k.rotate=function(a,b){var c=this.ka();if(c){for(var d=c.length,e=this.sa(),f=c?c:[],g=Math.cos(a),h=Math.sin(a),l=b[0],m=b[1],n=0,p=0;p<d;p+=e){var q=c[p]-l,t=c[p+1]-m;f[n++]=l+q*g-t*h;f[n++]=m+q*h+t*g;for(q=p+2;q<p+e;++q)f[n++]=c[q]}c&&f.length!=n&&(f.length=n);this.v()}};
    k.scale = function (a, b, c) {
        var d = b;
        void 0 === d && (d = a);
        var e = c;
        e || (e = ac(this.D()));
        if (c = this.ka()) {
            b = c.length;
            for (var f = this.sa(), g = c ? c : [], h = e[0], e = e[1], l = 0, m = 0; m < b; m += f) {
                var n = c[m] - h, p = c[m + 1] - e;
                g[l++] = h + a * n;
                g[l++] = e + d * p;
                for (n = m + 2; n < m + f; ++n)g[l++] = c[n]
            }
            c && g.length != l && (g.length = l);
            this.v()
        }
    };
    k.Pc = function (a, b) {
        var c = this.ka();
        if (c) {
            var d = c.length, e = this.sa(), f = c ? c : [], g = 0, h, l;
            for (h = 0; h < d; h += e)for (f[g++] = c[h] + a, f[g++] = c[h + 1] + b, l = h + 2; l < h + e; ++l)f[g++] = c[l];
            c && f.length != g && (f.length = g);
            this.v()
        }
    };
    function Sc(a, b, c, d) {
        for (var e = 0, f = a[c - d], g = a[c - d + 1]; b < c; b += d)var h = a[b], l = a[b + 1], e = e + (g * h - f * l), f = h, g = l;
        return e / 2
    }
    function Tc(a, b, c, d) {
        var e = 0, f, g;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var h = c[f], e = e + Sc(a, b, h, d);
            b = h
        }
        return e
    }
    function Uc(a, b, c, d, e, f, g) {
        var h = a[b], l = a[b + 1], m = a[c] - h, n = a[c + 1] - l;
        if (0 !== m || 0 !== n)if (f = ((e - h) * m + (f - l) * n) / (m * m + n * n), 1 < f)b = c; else if (0 < f) {
            for (e = 0; e < d; ++e)g[e] = pa(a[b + e], a[c + e], f);
            g.length = d;
            return
        }
        for (e = 0; e < d; ++e)g[e] = a[b + e];
        g.length = d
    }
    function Vc(a, b, c, d, e) {
        var f = a[b], g = a[b + 1];
        for (b += d; b < c; b += d) {
            var h = a[b], l = a[b + 1], f = ma(f, g, h, l);
            f > e && (e = f);
            f = h;
            g = l
        }
        return e
    }
    function Wc(a, b, c, d, e) {
        var f, g;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var h = c[f];
            e = Vc(a, b, h, d, e);
            b = h
        }
        return e
    }
    function Xc(a,b,c,d,e,f,g,h,l,m,n){if(b==c)return m;var p;if(0===e){p=ma(g,h,a[b],a[b+1]);if(p<m){for(n=0;n<d;++n)l[n]=a[b+n];l.length=d;return p}return m}for(var q=n?n:[NaN,NaN],t=b+d;t<c;)if(Uc(a,t-d,t,d,g,h,q),p=ma(g,h,q[0],q[1]),p<m){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d;t+=d}else t+=d*Math.max((Math.sqrt(p)-Math.sqrt(m))/e|0,1);if(f&&(Uc(a,c-d,b,d,g,h,q),p=ma(g,h,q[0],q[1]),p<m)){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d}return m}
    function Yc(a, b, c, d, e, f, g, h, l, m, n) {
        n = n ? n : [NaN, NaN];
        var p, q;
        p = 0;
        for (q = c.length; p < q; ++p) {
            var t = c[p];
            m = Xc(a, b, t, d, e, f, g, h, l, m, n);
            b = t
        }
        return m
    }
    function Zc(a, b) {
        var c = 0, d, e;
        d = 0;
        for (e = b.length; d < e; ++d)a[c++] = b[d];
        return c
    }
    function $c(a, b, c, d) {
        var e, f;
        e = 0;
        for (f = c.length; e < f; ++e) {
            var g = c[e], h;
            for (h = 0; h < d; ++h)a[b++] = g[h]
        }
        return b
    }
    function ad(a, b, c, d, e) {
        e = e ? e : [];
        var f = 0, g, h;
        g = 0;
        for (h = c.length; g < h; ++g)b = $c(a, b, c[g], d), e[f++] = b;
        e.length = f;
        return e
    }
    function cd(a, b, c, d, e) {
        e = void 0 !== e ? e : [];
        for (var f = 0; b < c; b += d)e[f++] = a.slice(b, b + d);
        e.length = f;
        return e
    }
    function dd(a, b, c, d, e) {
        e = void 0 !== e ? e : [];
        var f = 0, g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var l = c[g];
            e[f++] = cd(a, b, l, d, e[f]);
            b = l
        }
        e.length = f;
        return e
    }
    function ed(a, b, c, d, e, f, g) {
        var h = (c - b) / d;
        if (3 > h) {
            for (; b < c; b += d)f[g++] = a[b], f[g++] = a[b + 1];
            return g
        }
        var l = Array(h);
        l[0] = 1;
        l[h - 1] = 1;
        c = [b, c - d];
        for (var m = 0, n; 0 < c.length;) {
            var p = c.pop(), q = c.pop(), t = 0, u = a[q], y = a[q + 1], x = a[p], C = a[p + 1];
            for (n = q + d; n < p; n += d) {
                var z = la(a[n], a[n + 1], u, y, x, C);
                z > t && (m = n, t = z)
            }
            t > e && (l[(m - b) / d] = 1, q + d < m && c.push(q, m), m + d < p && c.push(m, p))
        }
        for (n = 0; n < h; ++n)l[n] && (f[g++] = a[b + n * d], f[g++] = a[b + n * d + 1]);
        return g
    }
    function fd(a,b,c,d,e,f,g,h){var l,m;l=0;for(m=c.length;l<m;++l){var n=c[l];a:{var p=a,q=n,t=d,u=e,y=f;if(b!=q){var x=u*Math.round(p[b]/u),C=u*Math.round(p[b+1]/u);b+=t;y[g++]=x;y[g++]=C;var z,K;do if(z=u*Math.round(p[b]/u),K=u*Math.round(p[b+1]/u),b+=t,b==q){y[g++]=z;y[g++]=K;break a}while(z==x&&K==C);for(;b<q;){var V,Z;V=u*Math.round(p[b]/u);Z=u*Math.round(p[b+1]/u);b+=t;if(V!=z||Z!=K){var Ra=z-x,F=K-C,Ga=V-x,ra=Z-C;Ra*ra==F*Ga&&(0>Ra&&Ga<Ra||Ra==Ga||0<Ra&&Ga>Ra)&&(0>F&&ra<F||F==ra||0<F&&ra>F)||
(y[g++] = z, y[g++] = K, x = z, C = K);
    z = V;
    K = Z
}
}
    y[g++] = z;
    y[g++] = K
}
}
    h.push(g);
    b = n
}
    return g
}
    function gd(a, b) {
        Oc.call(this);
        this.c = this.l = -1;
        this.ma(a, b)
    }
    v(gd, Oc);
    k = gd.prototype;
    k.clone = function () {
        var a = new gd(null);
        hd(a, this.ia, this.A.slice());
        return a
    };
    k.vb = function (a, b, c, d) {
        if (d < Fb(this.D(), a, b))return d;
        this.c != this.g && (this.l = Math.sqrt(Vc(this.A, 0, this.A.length, this.a, 0)), this.c = this.g);
        return Xc(this.A, 0, this.A.length, this.a, this.l, !0, a, b, c, d)
    };
    k.bm = function () {
        return Sc(this.A, 0, this.A.length, this.a)
    };
    k.Y = function () {
        return cd(this.A, 0, this.A.length, this.a)
    };
    k.Mc = function (a) {
        var b = [];
        b.length = ed(this.A, 0, this.A.length, this.a, a, b, 0);
        a = new gd(null);
        hd(a, "XY", b);
        return a
    };
    k.X = function () {
        return "LinearRing"
    };
    k.ma = function (a, b) {
        a ? (Rc(this, b, a, 1), this.A || (this.A = []), this.A.length = $c(this.A, 0, a, this.a), this.v()) : hd(this, "XY", null)
    };
    function hd(a, b, c) {
        Qc(a, b, c);
        a.v()
    }
    function A(a, b) {
        Oc.call(this);
        this.ma(a, b)
    }
    v(A, Oc);
    k = A.prototype;
    k.clone = function () {
        var a = new A(null);
        a.aa(this.ia, this.A.slice());
        return a
    };
    k.vb = function (a, b, c, d) {
        var e = this.A;
        a = ma(a, b, e[0], e[1]);
        if (a < d) {
            d = this.a;
            for (b = 0; b < d; ++b)c[b] = e[b];
            c.length = d;
            return a
        }
        return d
    };
    k.Y = function () {
        return this.A ? this.A.slice() : []
    };
    k.Pd = function (a) {
        return Lb(this.A, a)
    };
    k.X = function () {
        return "Point"
    };
    k.Na = function (a) {
        return Hb(a, this.A[0], this.A[1])
    };
    k.ma = function (a, b) {
        a ? (Rc(this, b, a, 0), this.A || (this.A = []), this.A.length = Zc(this.A, a), this.v()) : this.aa("XY", null)
    };
    k.aa = function (a, b) {
        Qc(this, a, b);
        this.v()
    };
    function id(a, b, c, d, e) {
        return !Rb(e, function (e) {
            return !jd(a, b, c, d, e[0], e[1])
        })
    }
    function jd(a, b, c, d, e, f) {
        for (var g = !1, h = a[c - d], l = a[c - d + 1]; b < c; b += d) {
            var m = a[b], n = a[b + 1];
            l > f != n > f && e < (m - h) * (f - l) / (n - l) + h && (g = !g);
            h = m;
            l = n
        }
        return g
    }
    function kd(a, b, c, d, e, f) {
        if (0 === c.length || !jd(a, b, c[0], d, e, f))return !1;
        var g;
        b = 1;
        for (g = c.length; b < g; ++b)if (jd(a, c[b - 1], c[b], d, e, f))return !1;
        return !0
    }
    function ld(a, b, c, d, e, f, g) {
        var h, l, m, n, p, q = e[f + 1], t = [], u = c[0];
        m = a[u - d];
        p = a[u - d + 1];
        for (h = b; h < u; h += d) {
            n = a[h];
            l = a[h + 1];
            if (q <= p && l <= q || p <= q && q <= l)m = (q - p) / (l - p) * (n - m) + m, t.push(m);
            m = n;
            p = l
        }
        u = NaN;
        p = -Infinity;
        t.sort(Ya);
        m = t[0];
        h = 1;
        for (l = t.length; h < l; ++h) {
            n = t[h];
            var y = Math.abs(n - m);
            y > p && (m = (m + n) / 2, kd(a, b, c, d, m, q) && (u = m, p = y));
            m = n
        }
        isNaN(u) && (u = e[f]);
        return g ? (g.push(u, q), g) : [u, q]
    }
    function md(a, b, c, d, e, f) {
        for (var g = [a[b], a[b + 1]], h = [], l; b + d < c; b += d) {
            h[0] = a[b + d];
            h[1] = a[b + d + 1];
            if (l = e.call(f, g, h))return l;
            g[0] = h[0];
            g[1] = h[1]
        }
        return !1
    }
    function nd(a, b, c, d, e) {
        var f = Ob(Bb(), a, b, c, d);
        return dc(e, f) ? Ib(e, f) || f[0] >= e[0] && f[2] <= e[2] || f[1] >= e[1] && f[3] <= e[3] ? !0 : md(a, b, c, d, function (a, b) {
            var c = !1, d = Jb(e, a), f = Jb(e, b);
            if (1 === d || 1 === f)c = !0; else {
                var p = e[0], q = e[1], t = e[2], u = e[3], y = b[0], x = b[1], C = (x - a[1]) / (y - a[0]);
                f & 2 && !(d & 2) && (c = y - (x - u) / C, c = c >= p && c <= t);
                c || !(f & 4) || d & 4 || (c = x - (y - t) * C, c = c >= q && c <= u);
                c || !(f & 8) || d & 8 || (c = y - (x - q) / C, c = c >= p && c <= t);
                c || !(f & 16) || d & 16 || (c = x - (y - p) * C, c = c >= q && c <= u)
            }
            return c
        }) : !1
    }
    function od(a, b, c, d, e) {
        var f = c[0];
        if (!(nd(a, b, f, d, e) || jd(a, b, f, d, e[0], e[1]) || jd(a, b, f, d, e[0], e[3]) || jd(a, b, f, d, e[2], e[1]) || jd(a, b, f, d, e[2], e[3])))return !1;
        if (1 === c.length)return !0;
        b = 1;
        for (f = c.length; b < f; ++b)if (id(a, c[b - 1], c[b], d, e))return !1;
        return !0
    }
    function pd(a, b, c, d) {
        for (var e = 0, f = a[c - d], g = a[c - d + 1]; b < c; b += d)var h = a[b], l = a[b + 1], e = e + (h - f) * (l + g), f = h, g = l;
        return 0 < e
    }
    function qd(a, b, c, d) {
        var e = 0;
        d = void 0 !== d ? d : !1;
        var f, g;
        f = 0;
        for (g = b.length; f < g; ++f) {
            var h = b[f], e = pd(a, e, h, c);
            if (0 === f) {
                if (d && e || !d && !e)return !1
            } else if (d && !e || !d && e)return !1;
            e = h
        }
        return !0
    }
    function rd(a, b, c, d, e) {
        e = void 0 !== e ? e : !1;
        var f, g;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var h = c[f], l = pd(a, b, h, d);
            if (0 === f ? e && l || !e && !l : e && !l || !e && l)for (var l = a, m = h, n = d; b < m - n;) {
                var p;
                for (p = 0; p < n; ++p) {
                    var q = l[b + p];
                    l[b + p] = l[m - n + p];
                    l[m - n + p] = q
                }
                b += n;
                m -= n
            }
            b = h
        }
        return b
    }
    function sd(a, b, c, d) {
        var e = 0, f, g;
        f = 0;
        for (g = b.length; f < g; ++f)e = rd(a, e, b[f], c, d);
        return e
    }
    function B(a, b) {
        Oc.call(this);
        this.c = [];
        this.C = -1;
        this.B = null;
        this.P = this.G = this.S = -1;
        this.l = null;
        this.ma(a, b)
    }
    v(B, Oc);
    k = B.prototype;
    k.mj = function (a) {
        this.A ? bb(this.A, a.ka()) : this.A = a.ka().slice();
        this.c.push(this.A.length);
        this.v()
    };
    k.clone = function () {
        var a = new B(null);
        a.aa(this.ia, this.A.slice(), this.c.slice());
        return a
    };
    k.vb=function(a,b,c,d){if(d<Fb(this.D(),a,b))return d;this.G!=this.g&&(this.S=Math.sqrt(Wc(this.A,0,this.c,this.a,0)),this.G=this.g);return Yc(this.A,0,this.c,this.a,this.S,!0,a,b,c,d)};k.Ac=function(a,b){return kd(this.Ob(),0,this.c,this.a,a,b)};k.em=function(){return Tc(this.Ob(),0,this.c,this.a)};k.Y=function(a){var b;void 0!==a?(b=this.Ob().slice(),rd(b,0,this.c,this.a,a)):b=this.A;return dd(b,0,this.c,this.a)};k.Eb=function(){return this.c};
function td(a){if(a.C!=a.g){var b=ac(a.D());a.B=ld(a.Ob(),0,a.c,a.a,b,0);a.C=a.g}return a.B}k.Qj=function(){return new A(td(this))};k.Vj=function(){return this.c.length};k.Bg=function(a){if(0>a||this.c.length<=a)return null;var b=new gd(null);hd(b,this.ia,this.A.slice(0===a?0:this.c[a-1],this.c[a]));return b};k.Vd=function(){var a=this.ia,b=this.A,c=this.c,d=[],e=0,f,g;f=0;for(g=c.length;f<g;++f){var h=c[f],l=new gd(null);hd(l,a,b.slice(e,h));d.push(l);e=h}return d};
k.Ob=function(){if(this.P!=this.g){var a=this.A;qd(a,this.c,this.a)?this.l=a:(this.l=a.slice(),this.l.length=rd(this.l,0,this.c,this.a));this.P=this.g}return this.l};k.Mc=function(a){var b=[],c=[];b.length=fd(this.A,0,this.c,this.a,Math.sqrt(a),b,0,c);a=new B(null);a.aa("XY",b,c);return a};k.X=function(){return"Polygon"};k.Na=function(a){return od(this.Ob(),0,this.c,this.a,a)};
k.ma=function(a,b){if(a){Rc(this,b,a,2);this.A||(this.A=[]);var c=ad(this.A,0,a,this.a,this.c);this.A.length=0===c.length?0:c[c.length-1];this.v()}else this.aa("XY",null,this.c)};k.aa=function(a,b,c){Qc(this,a,b);this.c=c;this.v()};function ud(a,b,c,d){var e=d?d:32;d=[];var f;for(f=0;f<e;++f)bb(d,a.offset(b,c,2*Math.PI*f/e));d.push(d[0],d[1]);a=new B(null);a.aa("XY",d,[d.length]);return a}
    function vd(a) {
        var b = a[0], c = a[1], d = a[2];
        a = a[3];
        b = [b, c, b, a, d, a, d, c, b, c];
        c = new B(null);
        c.aa("XY", b, [b.length]);
        return c
    }
    function wd(a, b, c) {
        var d = b ? b : 32, e = a.sa();
        b = a.ia;
        for (var f = new B(null, b), d = e * (d + 1), e = Array(d), g = 0; g < d; g++)e[g] = 0;
        f.aa(b, e, [e.length]);
        xd(f, a.td(), a.vf(), c);
        return f
    }
    function xd(a, b, c, d) {
        var e = a.ka(), f = a.ia, g = a.sa(), h = a.Eb(), l = e.length / g - 1;
        d = d ? d : 0;
        for (var m, n, p = 0; p <= l; ++p)n = p * g, m = d + 2 * oa(p, l) * Math.PI / l, e[n] = b[0] + c * Math.cos(m), e[n + 1] = b[1] + c * Math.sin(m);
        a.aa(f, e, h)
    }
    function yd(a) {
        Ua.call(this);
        a = a || {};
        this.c = [0, 0];
        var b = {};
        b[zd] = void 0 !== a.center ? a.center : null;
        this.l = Ec(a.projection);
        var c, d, e, f = void 0 !== a.minZoom ? a.minZoom : 0;
        c = void 0 !== a.maxZoom ? a.maxZoom : 28;
        var g = void 0 !== a.zoomFactor ? a.zoomFactor : 2;
        if (void 0 !== a.resolutions)c = a.resolutions, d = c[0], e = c[c.length - 1], c = jb(c); else {
            d = Ec(a.projection);
            e = d.D();
            var h = (e ? Math.max(Zb(e), $b(e)) : 360 * kc.degrees / d.dc()) / 256 / Math.pow(2, 0), l = h / Math.pow(2, 28);
            d = a.maxResolution;
            void 0 !== d ? f = 0 : d = h / Math.pow(g, f);
            e = a.minResolution;
            void 0===e&&(e=void 0!==a.maxZoom?void 0!==a.maxResolution?d/Math.pow(g,c):h/Math.pow(g,c):l);c=f+Math.floor(Math.log(d/e)/Math.log(g));e=d/Math.pow(g,c-f);c=kb(g,d,c-f)}this.a=d;this.i=e;this.s=g;this.f=a.resolutions;this.j=f;f=void 0!==a.extent?qa(a.extent):sa;(void 0!==a.enableRotation?a.enableRotation:1)?(g=a.constrainRotation,g=void 0===g||!0===g?ob():!1===g?mb:"number"===typeof g?nb(g):mb):g=lb;this.o=new ta(f,c,g);void 0!==a.resolution?b[Ad]=a.resolution:void 0!==a.zoom&&(b[Ad]=this.constrainResolution(this.a,
a.zoom-this.j));b[Bd]=void 0!==a.rotation?a.rotation:0;this.H(b)}v(yd,Ua);k=yd.prototype;k.Qd=function(a){return this.o.center(a)};k.constrainResolution=function(a,b,c){return this.o.resolution(a,b||0,c||0)};k.constrainRotation=function(a,b){return this.o.rotation(a,b||0)};k.bb=function(){return this.get(zd)};function Cd(a,b){return void 0!==b?(b[0]=a.c[0],b[1]=a.c[1],b):a.c.slice()}
k.Jc=function(a){var b=this.bb();ha(b,1);var c=this.Ma();ha(void 0!==c,2);var d=this.Pa();ha(void 0!==d,3);return bc(b,c,d,a)};k.Jl=function(){return this.a};k.Kl=function(){return this.i};k.Ll=function(){return this.l};k.Ma=function(){return this.get(Ad)};k.Ml=function(){return this.f};function Dd(a,b){return Math.max(Zb(a)/b[0],$b(a)/b[1])}function Ed(a){var b=a.a,c=Math.log(b/a.i)/Math.log(2);return function(a){return b/Math.pow(2,a*c)}}k.Pa=function(){return this.get(Bd)};
function Fd(a){var b=a.a,c=Math.log(b/a.i)/Math.log(2);return function(a){return Math.log(b/a)/Math.log(2)/c}}k.U=function(){var a=this.bb(),b=this.l,c=this.Ma(),d=this.Pa();return{center:a.slice(),projection:void 0!==b?b:null,resolution:c,rotation:d}};k.tk=function(){var a,b=this.Ma();if(void 0!==b&&b>=this.i&&b<=this.a){a=this.j||0;var c,d;if(this.f){d=$a(this.f,b,1);a+=d;if(d==this.f.length-1)return a;c=this.f[d];d=c/this.f[d+1]}else c=this.a,d=this.s;a+=Math.log(c/b)/Math.log(d)}return a};
k.$e=function(a,b,c){a instanceof Oc||(ha(Array.isArray(a),24),ha(!Yb(a),25),a=vd(a));var d=c||{};c=void 0!==d.padding?d.padding:[0,0,0,0];var e=void 0!==d.constrainResolution?d.constrainResolution:!0,f=void 0!==d.nearest?d.nearest:!1,g;void 0!==d.minResolution?g=d.minResolution:void 0!==d.maxZoom?g=this.constrainResolution(this.a,d.maxZoom-this.j,0):g=0;var h=a.ka(),l=this.Pa(),d=Math.cos(-l),l=Math.sin(-l),m=Infinity,n=Infinity,p=-Infinity,q=-Infinity;a=a.sa();for(var t=0,u=h.length;t<u;t+=a)var y=
h[t]*d-h[t+1]*l,x=h[t]*l+h[t+1]*d,m=Math.min(m,y),n=Math.min(n,x),p=Math.max(p,y),q=Math.max(q,x);b=Dd([m,n,p,q],[b[0]-c[1]-c[3],b[1]-c[0]-c[2]]);b=isNaN(b)?g:Math.max(b,g);e&&(g=this.constrainResolution(b,0,0),!f&&g<b&&(g=this.constrainResolution(g,-1,0)),b=g);this.Yb(b);l=-l;f=(m+p)/2+(c[1]-c[3])/2*b;c=(n+q)/2+(c[0]-c[2])/2*b;this.rb([f*d-c*l,c*d+f*l])};
k.sj=function(a,b,c){var d=this.Pa(),e=Math.cos(-d),d=Math.sin(-d),f=a[0]*e-a[1]*d;a=a[1]*e+a[0]*d;var g=this.Ma(),f=f+(b[0]/2-c[0])*g;a+=(c[1]-b[1]/2)*g;d=-d;this.rb([f*e-a*d,a*e+f*d])};function Gd(a){return!!a.bb()&&void 0!==a.Ma()}k.rotate=function(a,b){if(void 0!==b){var c,d=this.bb();void 0!==d&&(c=[d[0]-b[0],d[1]-b[1]],wb(c,a-this.Pa()),rb(c,b));this.rb(c)}this.ie(a)};k.rb=function(a){this.set(zd,a)};function Hd(a,b){a.c[1]+=b}k.Yb=function(a){this.set(Ad,a)};k.ie=function(a){this.set(Bd,a)};
    k.Zo = function (a) {
        a = this.constrainResolution(this.a, a - this.j, 0);
        this.Yb(a)
    };
    var zd = "center", Ad = "resolution", Bd = "rotation";
    function Id(a) {
        return Math.pow(a, 3)
    }
    function Jd(a) {
        return 1 - Id(1 - a)
    }
    function Kd(a) {
        return 3 * a * a - 2 * a * a * a
    }
    function Ld(a) {
        return a
    }
    function Md(a) {
        return .5 > a ? Kd(2 * a) : 1 - Kd(2 * (a - .5))
    }
    function Nd(a) {
        var b = a.source, c = a.start ? a.start : Date.now(), d = b[0], e = b[1], f = void 0 !== a.duration ? a.duration : 1E3, g = a.easing ? a.easing : Kd;
        return function (a, b) {
            if (b.time < c)return b.animate = !0, b.viewHints[0] += 1, !0;
            if (b.time < c + f) {
                var m = 1 - g((b.time - c) / f), n = d - b.viewState.center[0], p = e - b.viewState.center[1];
                b.animate = !0;
                b.viewState.center[0] += m * n;
                b.viewState.center[1] += m * p;
                b.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }
    function Od(a){var b=a.rotation?a.rotation:0,c=a.start?a.start:Date.now(),d=void 0!==a.duration?a.duration:1E3,e=a.easing?a.easing:Kd,f=a.anchor?a.anchor:null;return function(a,h){if(h.time<c)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<c+d){var l=1-e((h.time-c)/d),l=(b-h.viewState.rotation)*l;h.animate=!0;h.viewState.rotation+=l;if(f){var m=h.viewState.center;m[0]-=f[0];m[1]-=f[1];wb(m,l);rb(m,f)}h.viewHints[0]+=1;return!0}return!1}}
    function Pd(a) {
        var b = a.resolution, c = a.start ? a.start : Date.now(), d = void 0 !== a.duration ? a.duration : 1E3, e = a.easing ? a.easing : Kd;
        return function (a, g) {
            if (g.time < c)return g.animate = !0, g.viewHints[0] += 1, !0;
            if (g.time < c + d) {
                var h = 1 - e((g.time - c) / d), l = b - g.viewState.resolution;
                g.animate = !0;
                g.viewState.resolution += h * l;
                g.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }
    function Qd(a, b, c, d) {
        this.ba = a;
        this.da = b;
        this.ea = c;
        this.ha = d
    }
    function Rd(a, b, c) {
        return a.ba <= b && b <= a.da && a.ea <= c && c <= a.ha
    }
    function Sd(a, b) {
        return a.ba == b.ba && a.ea == b.ea && a.da == b.da && a.ha == b.ha
    }
    function Td(a, b) {
        return a.ba <= b.da && a.da >= b.ba && a.ea <= b.ha && a.ha >= b.ea
    }
    function Ud(a, b, c) {
        void 0 === c && (c = [0, 0]);
        c[0] = a[0] + 2 * b;
        c[1] = a[1] + 2 * b;
        return c
    }
    function Vd(a, b, c) {
        void 0 === c && (c = [0, 0]);
        c[0] = a[0] * b + .5 | 0;
        c[1] = a[1] * b + .5 | 0;
        return c
    }
    function Wd(a, b) {
        if (Array.isArray(a))return a;
        void 0 === b ? b = [a, a] : b[0] = b[1] = a;
        return b
    }
    function Xd(a, b, c, d) {
        return void 0 !== d ? (d[0] = a, d[1] = b, d[2] = c, d) : [a, b, c]
    }
    function Yd(a) {
        var b = a[0], c = Array(b), d = 1 << b - 1, e, f;
        for (e = 0; e < b; ++e)f = 48, a[1] & d && (f += 1), a[2] & d && (f += 2), c[e] = String.fromCharCode(f), d >>= 1;
        return c.join("")
    }
    function Zd(a) {
        this.minZoom = void 0 !== a.minZoom ? a.minZoom : 0;
        this.b = a.resolutions;
        ha(ib(this.b, function (a, b) {
            return b - a
        }), 17);
        this.maxZoom = this.b.length - 1;
        this.g = void 0 !== a.origin ? a.origin : null;
        this.f = null;
        void 0 !== a.origins && (this.f = a.origins, ha(this.f.length == this.b.length, 20));
        var b = a.extent;
        void 0 === b || this.g || this.f || (this.g = Wb(b));
        ha(!this.g && this.f || this.g && !this.f, 18);
        this.c = null;
        void 0 !== a.tileSizes && (this.c = a.tileSizes, ha(this.c.length == this.b.length, 19));
        this.i = void 0 !== a.tileSize ? a.tileSize :
            this.c?null:256;ha(!this.i&&this.c||this.i&&!this.c,22);this.s=void 0!==b?b:null;this.a=null;this.j=[0,0];void 0!==a.sizes?this.a=a.sizes.map(function(a){return new Qd(Math.min(0,a[0]),Math.max(a[0]-1,-1),Math.min(0,a[1]),Math.max(a[1]-1,-1))},this):b&&$d(this,b)}var ae=[0,0,0];k=Zd.prototype;k.sg=function(a,b,c){a=be(this,a,b);for(var d=a.ba,e=a.da;d<=e;++d)for(var f=a.ea,g=a.ha;f<=g;++f)c([b,d,f])};
function ce(a,b,c,d,e){e=a.Ia(b,e);for(b=b[0]-1;b>=a.minZoom;){if(c.call(null,b,be(a,e,b,d)))return!0;--b}return!1}k.D=function(){return this.s};k.Cg=function(){return this.maxZoom};k.Dg=function(){return this.minZoom};k.Tc=function(a){return this.g?this.g:this.f[a]};k.Ga=function(a){return this.b[a]};k.Bh=function(){return this.b};function de(a,b,c,d){return b[0]<a.maxZoom?(d=a.Ia(b,d),be(a,d,b[0]+1,c)):null}
function ee(a,b,c,d){fe(a,b[0],b[1],c,!1,ae);var e=ae[1],f=ae[2];fe(a,b[2],b[3],c,!0,ae);a=ae[1];b=ae[2];void 0!==d?(d.ba=e,d.da=a,d.ea=f,d.ha=b):d=new Qd(e,a,f,b);return d}function be(a,b,c,d){c=a.Ga(c);return ee(a,b,c,d)}function ge(a,b){var c=a.Tc(b[0]),d=a.Ga(b[0]),e=Wd(a.Va(b[0]),a.j);return[c[0]+(b[1]+.5)*e[0]*d,c[1]+(b[2]+.5)*e[1]*d]}k.Ia=function(a,b){var c=this.Tc(a[0]),d=this.Ga(a[0]),e=Wd(this.Va(a[0]),this.j),f=c[0]+a[1]*e[0]*d,c=c[1]+a[2]*e[1]*d;return Kb(f,c,f+e[0]*d,c+e[1]*d,b)};
k.Yd=function(a,b,c){return fe(this,a[0],a[1],b,!1,c)};function fe(a,b,c,d,e,f){var g=a.wc(d),h=d/a.Ga(g),l=a.Tc(g);a=Wd(a.Va(g),a.j);b=h*Math.floor((b-l[0])/d+(e?.5:0))/a[0];c=h*Math.floor((c-l[1])/d+(e?0:.5))/a[1];e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));return Xd(g,b,c,f)}k.Zd=function(a,b,c){b=this.Ga(b);return fe(this,a[0],a[1],b,!1,c)};k.Va=function(a){return this.i?this.i:this.c[a]};k.wc=function(a,b){return ia($a(this.b,a,b||0),this.minZoom,this.maxZoom)};
    function $d(a, b) {
        for (var c = a.b.length, d = Array(c), e = a.minZoom; e < c; ++e)d[e] = be(a, b, e);
        a.a = d
    }
    function he(a) {
        var b = a.j;
        if (!b) {
            var b = ie(a), c = je(b, void 0, void 0), b = new Zd({
                extent: b,
                origin: Wb(b),
                resolutions: c,
                tileSize: void 0
            });
            a.j = b
        }
        return b
    }
    function ke(a) {
        var b = {};
        ua(b, void 0 !== a ? a : {});
        void 0 === b.extent && (b.extent = qc("EPSG:3857").D());
        b.resolutions = je(b.extent, b.maxZoom, b.tileSize);
        delete b.maxZoom;
        return new Zd(b)
    }
    function je(a, b, c) {
        b = void 0 !== b ? b : 42;
        var d = $b(a);
        a = Zb(a);
        c = Wd(void 0 !== c ? c : 256);
        c = Math.max(a / c[0], d / c[1]);
        b += 1;
        d = Array(b);
        for (a = 0; a < b; ++a)d[a] = c / Math.pow(2, a);
        return d
    }
    function ie(a) {
        a = qc(a);
        var b = a.D();
        b || (a = 180 * kc.degrees / a.dc(), b = Kb(-a, -a, a, a));
        return b
    }
    function le(a) {
        this.a = a.html;
        this.b = a.tileRanges ? a.tileRanges : null
    }
    le.prototype.g = function () {
        return this.a
    };
    function me(a) {
        Ua.call(this);
        this.a = a ? a : [];
        ne(this)
    }
    v(me, Ua);
    k = me.prototype;
    k.clear = function () {
        for (; 0 < this.yc();)this.pop()
    };
    k.qf = function (a) {
        var b, c;
        b = 0;
        for (c = a.length; b < c; ++b)this.push(a[b]);
        return this
    };
    k.forEach = function (a, b) {
        this.a.forEach(a, b)
    };
    k.sl = function () {
        return this.a
    };
    k.item = function (a) {
        return this.a[a]
    };
    k.yc = function () {
        return this.get(qe)
    };
    k.ee = function (a, b) {
        this.a.splice(a, 0, b);
        ne(this);
        this.b(new re(se, b))
    };
    k.pop = function () {
        return this.Nf(this.yc() - 1)
    };
    k.push=function(a){var b=this.a.length;this.ee(b,a);return b};k.remove=function(a){var b=this.a,c,d;c=0;for(d=b.length;c<d;++c)if(b[c]===a)return this.Nf(c)};k.Nf=function(a){var b=this.a[a];this.a.splice(a,1);ne(this);this.b(new re(te,b));return b};k.Oo=function(a,b){var c=this.yc();if(a<c)c=this.a[a],this.a[a]=b,this.b(new re(te,c)),this.b(new re(se,b));else{for(;c<a;++c)this.ee(c,void 0);this.ee(a,b)}};function ne(a){a.set(qe,a.a.length)}var qe="length",se="add",te="remove";
function re(a,b){Ka.call(this,a);this.element=b}v(re,Ka);var ue=/^#(?:[0-9a-f]{3}){1,2}$/i,ve=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,we=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i,xe=/^([a-z]*)$/i;function ye(a){return Array.isArray(a)?a:ze(a)}function Ae(a){if("string"!==typeof a){var b=a[0];b!=(b|0)&&(b=b+.5|0);var c=a[1];c!=(c|0)&&(c=c+.5|0);var d=a[2];d!=(d|0)&&(d=d+.5|0);a="rgba("+b+","+c+","+d+","+(void 0===a[3]?1:a[3])+")"}return a}
var ze=function(){var a={},b=0;return function(c){var d;if(a.hasOwnProperty(c))d=a[c];else{if(1024<=b){d=0;for(var e in a)0===(d++&3)&&(delete a[e],--b)}d=c;var f,g;xe.exec(d)&&(e=document.createElement("div"),e.style.color=d,document.body.appendChild(e),d=getComputedStyle(e).color,document.body.removeChild(e));ue.exec(d)?(f=d.length-1,ha(3==f||6==f,54),g=3==f?1:2,f=parseInt(d.substr(1+0*g,g),16),e=parseInt(d.substr(1+1*g,g),16),d=parseInt(d.substr(1+2*g,g),16),1==g&&(f=(f<<4)+f,e=(e<<4)+e,d=(d<<
    4) + d), f = [f, e, d, 1]) : (g = we.exec(d)) ? (f = Number(g[1]), e = Number(g[2]), d = Number(g[3]), g = Number(g[4]), f = Be([f, e, d, g])) : (g = ve.exec(d)) ? (f = Number(g[1]), e = Number(g[2]), d = Number(g[3]), f = Be([f, e, d, 1])) : ha(!1, 14);
    d = f;
    a[c] = d;
    ++b
}
    return d
}
}();
    function Be(a) {
        var b = [];
        b[0] = ia(a[0] + .5 | 0, 0, 255);
        b[1] = ia(a[1] + .5 | 0, 0, 255);
        b[2] = ia(a[2] + .5 | 0, 0, 255);
        b[3] = ia(a[3], 0, 1);
        return b
    }
    function Ce(a) {
        return "string" === typeof a || a instanceof CanvasPattern || a instanceof CanvasGradient ? a : Ae(a)
    }
    function De(a, b) {
        var c = document.createElement("CANVAS");
        a && (c.width = a);
        b && (c.height = b);
        return c.getContext("2d")
    }
    function Ee(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    }
    function Fe(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
    function Ge(a, b, c) {
        Ka.call(this, a);
        this.map = b;
        this.frameState = void 0 !== c ? c : null
    }
    v(Ge, Ka);
    function He(a) {
        Ua.call(this);
        this.element = a.element ? a.element : null;
        this.a = this.P = null;
        this.s = [];
        this.render = a.render ? a.render : da;
        a.target && this.c(a.target)
    }
    v(He, Ua);
    He.prototype.la = function () {
        Fe(this.element);
        Ua.prototype.la.call(this)
    };
    He.prototype.i = function () {
        return this.a
    };
    He.prototype.setMap=function(a){this.a&&Fe(this.element);for(var b=0,c=this.s.length;b<c;++b)za(this.s[b]);this.s.length=0;if(this.a=a)(this.P?this.P:a.u).appendChild(this.element),this.render!==da&&this.s.push(w(a,"postrender",this.render,this)),a.render()};He.prototype.c=function(a){this.P="string"===typeof a?document.getElementById(a):a};function Ie(a){a=a?a:{};this.S=document.createElement("UL");this.u=document.createElement("LI");this.S.appendChild(this.u);this.u.style.display="none";this.f=void 0!==a.collapsed?a.collapsed:!0;this.l=void 0!==a.collapsible?a.collapsible:!0;this.l||(this.f=!1);var b=void 0!==a.className?a.className:"ol-attribution",c=void 0!==a.tipLabel?a.tipLabel:"Attributions",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00bb";"string"===typeof d?(this.C=document.createElement("span"),this.C.textContent=d):this.C=
d;d=void 0!==a.label?a.label:"i";"string"===typeof d?(this.B=document.createElement("span"),this.B.textContent=d):this.B=d;var e=this.l&&!this.f?this.C:this.B,d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);w(d,"click",this.Pl,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control"+(this.f&&this.l?" ol-collapsed":"")+(this.l?"":" ol-uncollapsible");c.appendChild(this.S);c.appendChild(d);He.call(this,{element:c,render:a.render?
a.render:Je,target:a.target});this.G=!0;this.o={};this.j={};this.W={}}v(Ie,He);
function Je(a){if(a=a.frameState){var b,c,d,e,f,g,h,l,m,n,p,q=a.layerStatesArray,t=ua({},a.attributions),u={},y=a.viewState.projection;c=0;for(b=q.length;c<b;c++)if(g=q[c].layer.ga())if(n=ea(g).toString(),m=g.j)for(d=0,e=m.length;d<e;d++)if(h=m[d],l=ea(h).toString(),!(l in t)){if(f=a.usedTiles[n]){var x=g.pb(y);a:{p=h;var C=y;if(p.b){var z,K,V,Z=void 0;for(Z in f)if(Z in p.b){V=f[Z];var Ra;z=0;for(K=p.b[Z].length;z<K;++z){Ra=p.b[Z][z];if(Td(Ra,V)){p=!0;break a}var F=be(x,ie(C),parseInt(Z,10)),Ga=
F.da-F.ba+1;if(V.ba<F.ba||V.da>F.da)if(Td(Ra,new Qd(oa(V.ba,Ga),oa(V.da,Ga),V.ea,V.ha))||V.da-V.ba+1>Ga&&Td(Ra,F)){p=!0;break a}}}p=!1}else p=!0}}else p=!1;p?(l in u&&delete u[l],t[l]=h):u[l]=h}b=[t,u];c=b[0];b=b[1];for(var ra in this.o)ra in c?(this.j[ra]||(this.o[ra].style.display="",this.j[ra]=!0),delete c[ra]):ra in b?(this.j[ra]&&(this.o[ra].style.display="none",delete this.j[ra]),delete b[ra]):(Fe(this.o[ra]),delete this.o[ra],delete this.j[ra]);for(ra in c)d=document.createElement("LI"),d.innerHTML=
c[ra].a,this.S.appendChild(d),this.o[ra]=d,this.j[ra]=!0;for(ra in b)d=document.createElement("LI"),d.innerHTML=b[ra].a,d.style.display="none",this.S.appendChild(d),this.o[ra]=d;ra=!xa(this.j)||!xa(a.logos);this.G!=ra&&(this.element.style.display=ra?"":"none",this.G=ra);ra&&xa(this.j)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");var Oa;a=a.logos;ra=this.W;for(Oa in ra)Oa in a||(Fe(ra[Oa]),delete ra[Oa]);for(var Sa in a)b=a[Sa],b instanceof HTMLElement&&
(this.u.appendChild(b),ra[Sa]=b),Sa in ra||(Oa=new Image,Oa.src=Sa,""===b?c=Oa:(c=document.createElement("a"),c.href=b,c.appendChild(Oa)),this.u.appendChild(c),ra[Sa]=c);this.u.style.display=xa(a)?"none":""}else this.G&&(this.element.style.display="none",this.G=!1)}k=Ie.prototype;k.Pl=function(a){a.preventDefault();Ke(this)};function Ke(a){a.element.classList.toggle("ol-collapsed");a.f?Ee(a.C,a.B):Ee(a.B,a.C);a.f=!a.f}k.Ol=function(){return this.l};
k.Rl=function(a){this.l!==a&&(this.l=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.f&&Ke(this))};k.Ql=function(a){this.l&&this.f!==a&&Ke(this)};k.Nl=function(){return this.f};function Le(a){a=a?a:{};this.f=void 0!==a.className?a.className:"ol-full-screen";var b=void 0!==a.label?a.label:"\u2922";this.l="string"===typeof b?document.createTextNode(b):b;b=void 0!==a.labelActive?a.labelActive:"\u00d7";this.o="string"===typeof b?document.createTextNode(b):b;var c=a.tipLabel?a.tipLabel:"Toggle full-screen",b=document.createElement("button");b.className=this.f+"-"+Me();b.setAttribute("type","button");b.title=c;b.appendChild(this.l);w(b,"click",this.B,this);c=document.createElement("div");
c.className=this.f+" ol-unselectable ol-control "+(Ne()?"":"ol-unsupported");c.appendChild(b);He.call(this,{element:c,target:a.target});this.C=void 0!==a.keys?a.keys:!1;this.j=a.source}v(Le,He);
Le.prototype.B=function(a){a.preventDefault();Ne()&&(a=this.a)&&(Me()?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(a=this.j?"string"===typeof this.j?document.getElementById(this.j):this.j:a.uc(),this.C?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):
Oe(a):Oe(a)))};Le.prototype.u=function(){var a=this.element.firstElementChild,b=this.a;Me()?(a.className=this.f+"-true",Ee(this.o,this.l)):(a.className=this.f+"-false",Ee(this.l,this.o));b&&b.Yc()};Le.prototype.setMap=function(a){He.prototype.setMap.call(this,a);a&&this.s.push(w(document,Pe(),this.u,this))};
function Ne(){var a=document.body;return!!(a.webkitRequestFullscreen||a.mozRequestFullScreen&&document.mozFullScreenEnabled||a.msRequestFullscreen&&document.msFullscreenEnabled||a.requestFullscreen&&document.fullscreenEnabled)}function Me(){return!!(document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||document.fullscreenElement)}
function Oe(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()}var Pe=function(){var a;return function(){if(!a){var b=document.body;b.webkitRequestFullscreen?a="webkitfullscreenchange":b.mozRequestFullScreen?a="mozfullscreenchange":b.msRequestFullscreen?a="MSFullscreenChange":b.requestFullscreen&&(a="fullscreenchange")}return a}}();function Qe(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-rotate",c=void 0!==a.label?a.label:"\u21e7";this.f=null;"string"===typeof c?(this.f=document.createElement("span"),this.f.className="ol-compass",this.f.textContent=c):(this.f=c,this.f.classList.add("ol-compass"));var d=a.tipLabel?a.tipLabel:"Reset rotation",c=document.createElement("button");c.className=b+"-reset";c.setAttribute("type","button");c.title=d;c.appendChild(this.f);w(c,"click",Qe.prototype.C,this);d=document.createElement("div");
d.className=b+" ol-unselectable ol-control";d.appendChild(c);b=a.render?a.render:Re;this.l=a.resetNorth?a.resetNorth:void 0;He.call(this,{element:d,render:b,target:a.target});this.o=void 0!==a.duration?a.duration:250;this.j=void 0!==a.autoHide?a.autoHide:!0;this.u=void 0;this.j&&this.element.classList.add("ol-hidden")}v(Qe,He);
Qe.prototype.C=function(a){a.preventDefault();if(void 0!==this.l)this.l();else{a=this.a;var b=a.$();if(b){var c=b.Pa();void 0!==c&&(0<this.o&&(c%=2*Math.PI,c<-Math.PI&&(c+=2*Math.PI),c>Math.PI&&(c-=2*Math.PI),a.ab(Od({rotation:c,duration:this.o,easing:Jd}))),b.ie(0))}}};
    function Re(a) {
        if (a = a.frameState) {
            a = a.viewState.rotation;
            if (a != this.u) {
                var b = "rotate(" + a + "rad)";
                if (this.j) {
                    var c = this.element.classList.contains("ol-hidden");
                    c || 0 !== a ? c && 0 !== a && this.element.classList.remove("ol-hidden") : this.element.classList.add("ol-hidden")
                }
                this.f.style.msTransform = b;
                this.f.style.webkitTransform = b;
                this.f.style.transform = b
            }
            this.u = a
        }
    }
    function Se(a) {
        a = a ? a : {};
        var b = void 0 !== a.className ? a.className : "ol-zoom", c = void 0 !== a.delta ? a.delta : 1, d = void 0 !== a.zoomInLabel ? a.zoomInLabel : "+", e = void 0 !== a.zoomOutLabel ? a.zoomOutLabel : "\u2212", f = void 0 !== a.zoomInTipLabel ? a.zoomInTipLabel : "Zoom in", g = void 0 !== a.zoomOutTipLabel ? a.zoomOutTipLabel : "Zoom out", h = document.createElement("button");
        h.className = b + "-in";
        h.setAttribute("type", "button");
        h.title = f;
        h.appendChild("string" === typeof d ? document.createTextNode(d) : d);
        w(h, "click", Se.prototype.j.bind(this,
            c));d=document.createElement("button");d.className=b+"-out";d.setAttribute("type","button");d.title=g;d.appendChild("string"===typeof e?document.createTextNode(e):e);w(d,"click",Se.prototype.j.bind(this,-c));c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(h);c.appendChild(d);He.call(this,{element:c,target:a.target});this.f=void 0!==a.duration?a.duration:250}v(Se,He);
    Se.prototype.j = function (a, b) {
        b.preventDefault();
        var c = this.a, d = c.$();
        if (d) {
            var e = d.Ma();
            e && (0 < this.f && c.ab(Pd({
                resolution: e,
                duration: this.f,
                easing: Jd
            })), c = d.constrainResolution(e, a), d.Yb(c))
        }
    };
    function Te(a) {
        a = a ? a : {};
        var b = new me;
        (void 0 !== a.zoom ? a.zoom : 1) && b.push(new Se(a.zoomOptions));
        (void 0 !== a.rotate ? a.rotate : 1) && b.push(new Qe(a.rotateOptions));
        (void 0 !== a.attribution ? a.attribution : 1) && b.push(new Ie(a.attributionOptions));
        return b
    }
    function Ue(a) {
        a = a ? a : {};
        var b = document.createElement("DIV");
        b.className = void 0 !== a.className ? a.className : "ol-mouse-position";
        He.call(this, {element: b, render: a.render ? a.render : Ve, target: a.target});
        w(this, Wa(We), this.Sl, this);
        a.coordinateFormat && this.Uh(a.coordinateFormat);
        a.projection && this.$g(qc(a.projection));
        this.u = void 0 !== a.undefinedHTML ? a.undefinedHTML : "";
        this.o = b.innerHTML;
        this.l = this.j = this.f = null
    }
    v(Ue, He);
    function Ve(a){a=a.frameState;a?this.f!=a.viewState.projection&&(this.f=a.viewState.projection,this.j=null):this.f=null;Xe(this,this.l)}k=Ue.prototype;k.Sl=function(){this.j=null};k.wg=function(){return this.get(Ye)};k.Zg=function(){return this.get(We)};k.Jk=function(a){this.l=this.a.Ud(a);Xe(this,this.l)};k.Kk=function(){Xe(this,null);this.l=null};k.setMap=function(a){He.prototype.setMap.call(this,a);a&&(a=a.a,this.s.push(w(a,"mousemove",this.Jk,this),w(a,"mouseout",this.Kk,this)))};
    k.Uh = function (a) {
        this.set(Ye, a)
    };
    k.$g = function (a) {
        this.set(We, a)
    };
    function Xe(a, b) {
        var c = a.u;
        if (b && a.f) {
            if (!a.j) {
                var d = a.Zg();
                a.j = d ? tc(a.f, d) : Jc
            }
            if (d = a.a.Ja(b))a.j(d, d), c = (c = a.wg()) ? c(d) : d.toString()
        }
        a.o && c == a.o || (a.element.innerHTML = c, a.o = c)
    }
    var We = "projection", Ye = "coordinateFormat";
    var Ze = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
    function $e(a, b) {
        var c, d, e = Ze.length;
        for (d = 0; d < e; ++d)try {
            if (c = a.getContext(Ze[d], b))return c
        } catch (f) {
        }
        return null
    }
    var af, bf = "undefined" !== typeof navigator ? navigator.userAgent.toLowerCase() : "", cf = -1 !== bf.indexOf("firefox"), df = -1 !== bf.indexOf("safari") && -1 == bf.indexOf("chrom"), ef = -1 !== bf.indexOf("webkit") && -1 == bf.indexOf("edge"), ff = -1 !== bf.indexOf("macintosh"), gf = window.devicePixelRatio || 1, hf = !1, jf = function () {
        if (!("HTMLCanvasElement" in window))return !1;
        try {
            var a = document.createElement("CANVAS").getContext("2d");
            return a ? (void 0 !== a.setLineDash && (hf = !0), !0) : !1
        } catch (b) {
            return !1
        }
    }(), kf = "DeviceOrientationEvent" in
        window, lf = "geolocation" in navigator, mf = "ontouchstart" in window, nf = "PointerEvent" in window, of = !!navigator.msPointerEnabled, pf = !1, qf, rf = [];
    if ("WebGLRenderingContext" in window)try {
        var sf = $e(document.createElement("CANVAS"), {failIfMajorPerformanceCaveat: !0});
        sf && (pf = !0, qf = sf.getParameter(sf.MAX_TEXTURE_SIZE), rf = sf.getSupportedExtensions())
    } catch (a) {
    }
    af = pf;
    ca = rf;
    ba = qf;
    function tf(a, b) {
        this.b = a;
        this.c = b
    }
    function uf(a) {
        tf.call(this, a, {
            mousedown: this.dl,
            mousemove: this.el,
            mouseup: this.hl,
            mouseover: this.gl,
            mouseout: this.fl
        });
        this.a = a.g;
        this.g = []
    }
    v(uf, tf);
    function vf(a, b) {
        for (var c = a.g, d = b.clientX, e = b.clientY, f = 0, g = c.length, h; f < g && (h = c[f]); f++) {
            var l = Math.abs(e - h[1]);
            if (25 >= Math.abs(d - h[0]) && 25 >= l)return !0
        }
        return !1
    }
    function wf(a) {
        var b = xf(a, a), c = b.preventDefault;
        b.preventDefault = function () {
            a.preventDefault();
            c()
        };
        b.pointerId = 1;
        b.isPrimary = !0;
        b.pointerType = "mouse";
        return b
    }
    k = uf.prototype;
    k.dl=function(a){if(!vf(this,a)){if((1).toString()in this.a){var b=wf(a);yf(this.b,"pointercancel",b,a);delete this.a[(1).toString()]}b=wf(a);this.a[(1).toString()]=a;yf(this.b,"pointerdown",b,a)}};k.el=function(a){if(!vf(this,a)){var b=wf(a);yf(this.b,"pointermove",b,a)}};k.hl=function(a){if(!vf(this,a)){var b=this.a[(1).toString()];b&&b.button===a.button&&(b=wf(a),yf(this.b,"pointerup",b,a),delete this.a[(1).toString()])}};k.gl=function(a){if(!vf(this,a)){var b=wf(a);zf(this.b,b,a)}};
k.fl=function(a){if(!vf(this,a)){var b=wf(a);Af(this.b,b,a)}};function Bf(a){tf.call(this,a,{MSPointerDown:this.ml,MSPointerMove:this.nl,MSPointerUp:this.ql,MSPointerOut:this.ol,MSPointerOver:this.pl,MSPointerCancel:this.ll,MSGotPointerCapture:this.jl,MSLostPointerCapture:this.kl});this.a=a.g;this.g=["","unavailable","touch","pen","mouse"]}v(Bf,tf);function Cf(a,b){var c=b;"number"===typeof b.pointerType&&(c=xf(b,b),c.pointerType=a.g[b.pointerType]);return c}k=Bf.prototype;
k.ml=function(a){this.a[a.pointerId.toString()]=a;var b=Cf(this,a);yf(this.b,"pointerdown",b,a)};k.nl=function(a){var b=Cf(this,a);yf(this.b,"pointermove",b,a)};k.ql=function(a){var b=Cf(this,a);yf(this.b,"pointerup",b,a);delete this.a[a.pointerId.toString()]};k.ol=function(a){var b=Cf(this,a);Af(this.b,b,a)};k.pl=function(a){var b=Cf(this,a);zf(this.b,b,a)};k.ll=function(a){var b=Cf(this,a);yf(this.b,"pointercancel",b,a);delete this.a[a.pointerId.toString()]};
k.kl=function(a){this.b.b(new Df("lostpointercapture",a,a))};k.jl=function(a){this.b.b(new Df("gotpointercapture",a,a))};function Ef(a){tf.call(this,a,{pointerdown:this.Zn,pointermove:this.$n,pointerup:this.co,pointerout:this.ao,pointerover:this.bo,pointercancel:this.Yn,gotpointercapture:this.uk,lostpointercapture:this.cl})}v(Ef,tf);k=Ef.prototype;k.Zn=function(a){Ff(this.b,a)};k.$n=function(a){Ff(this.b,a)};k.co=function(a){Ff(this.b,a)};k.ao=function(a){Ff(this.b,a)};k.bo=function(a){Ff(this.b,a)};k.Yn=function(a){Ff(this.b,a)};k.cl=function(a){Ff(this.b,a)};k.uk=function(a){Ff(this.b,a)};function Df(a,b,c){Ka.call(this,a);this.b=b;a=c?c:{};this.buttons=Gf(a);this.pressure=Hf(a,this.buttons);this.bubbles="bubbles"in a?a.bubbles:!1;this.cancelable="cancelable"in a?a.cancelable:!1;this.view="view"in a?a.view:null;this.detail="detail"in a?a.detail:null;this.screenX="screenX"in a?a.screenX:0;this.screenY="screenY"in a?a.screenY:0;this.clientX="clientX"in a?a.clientX:0;this.clientY="clientY"in a?a.clientY:0;this.button="button"in a?a.button:0;this.relatedTarget="relatedTarget"in a?a.relatedTarget:
null;this.pointerId="pointerId"in a?a.pointerId:0;this.width="width"in a?a.width:0;this.height="height"in a?a.height:0;this.pointerType="pointerType"in a?a.pointerType:"";this.isPrimary="isPrimary"in a?a.isPrimary:!1;b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}v(Df,Ka);function Gf(a){if(a.buttons||If)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}
    function Hf(a, b) {
        var c = 0;
        a.pressure ? c = a.pressure : c = b ? .5 : 0;
        return c
    }
    var If = !1;
    try {
        If = 1 === (new MouseEvent("click", {buttons: 1})).buttons
    } catch (a) {
    }
    function Jf(a, b) {
        tf.call(this, a, {touchstart: this.ep, touchmove: this.cp, touchend: this.bp, touchcancel: this.ap});
        this.a = a.g;
        this.j = b;
        this.g = void 0;
        this.i = 0;
        this.f = void 0
    }
    v(Jf, tf);
    k = Jf.prototype;
    k.Sh = function () {
        this.i = 0;
        this.f = void 0
    };
    function Kf(a,b,c){b=xf(b,c);b.pointerId=c.identifier+2;b.bubbles=!0;b.cancelable=!0;b.detail=a.i;b.button=0;b.buttons=1;b.width=c.webkitRadiusX||c.radiusX||0;b.height=c.webkitRadiusY||c.radiusY||0;b.pressure=c.webkitForce||c.force||.5;b.isPrimary=a.g===c.identifier;b.pointerType="touch";b.clientX=c.clientX;b.clientY=c.clientY;b.screenX=c.screenX;b.screenY=c.screenY;return b}
function Lf(a,b,c){function d(){b.preventDefault()}var e=Array.prototype.slice.call(b.changedTouches),f=e.length,g,h;for(g=0;g<f;++g)h=Kf(a,b,e[g]),h.preventDefault=d,c.call(a,b,h)}
k.ep=function(a){var b=a.touches,c=Object.keys(this.a),d=c.length;if(d>=b.length){var e=[],f,g,h;for(f=0;f<d;++f){g=c[f];h=this.a[g];var l;if(!(l=1==g))a:{l=b.length;for(var m,n=0;n<l;n++)if(m=b[n],m.identifier===g-2){l=!0;break a}l=!1}l||e.push(h.out)}for(f=0;f<e.length;++f)this.Re(a,e[f])}b=a.changedTouches[0];c=Object.keys(this.a).length;if(0===c||1===c&&(1).toString()in this.a)this.g=b.identifier,void 0!==this.f&&clearTimeout(this.f);Mf(this,a);this.i++;Lf(this,a,this.Un)};
k.Un=function(a,b){this.a[b.pointerId]={target:b.target,out:b,Ch:b.target};var c=this.b;b.bubbles=!0;yf(c,"pointerover",b,a);c=this.b;b.bubbles=!1;yf(c,"pointerenter",b,a);yf(this.b,"pointerdown",b,a)};k.cp=function(a){a.preventDefault();Lf(this,a,this.il)};
k.il=function(a,b){var c=this.a[b.pointerId];if(c){var d=c.out,e=c.Ch;yf(this.b,"pointermove",b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(Af(this.b,d,a),zf(this.b,b,a)):(b.target=e,b.relatedTarget=null,this.Re(a,b)));c.out=b;c.Ch=b.target}};k.bp=function(a){Mf(this,a);Lf(this,a,this.fp)};
k.fp=function(a,b){yf(this.b,"pointerup",b,a);this.b.out(b,a);Nf(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.g=void 0,this.f=setTimeout(this.Sh.bind(this),200))};k.ap=function(a){Lf(this,a,this.Re)};k.Re=function(a,b){yf(this.b,"pointercancel",b,a);this.b.out(b,a);Nf(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.g=void 0,this.f=setTimeout(this.Sh.bind(this),200))};
    function Mf(a, b) {
        var c = a.j.g, d = b.changedTouches[0];
        if (a.g === d.identifier) {
            var e = [d.clientX, d.clientY];
            c.push(e);
            setTimeout(function () {
                cb(c, e)
            }, 2500)
        }
    }
    function Of(a) {
        Ma.call(this);
        this.i = a;
        this.g = {};
        this.c = {};
        this.a = [];
        nf ? Pf(this, new Ef(this)) : of ? Pf(this, new Bf(this)) : (a = new uf(this), Pf(this, a), mf && Pf(this, new Jf(this, a)));
        a = this.a.length;
        for (var b, c = 0; c < a; c++)b = this.a[c], Qf(this, Object.keys(b.c))
    }
    v(Of, Ma);
    function Pf(a, b) {
        var c = Object.keys(b.c);
        c && (c.forEach(function (a) {
            var c = b.c[a];
            c && (this.c[a] = c.bind(b))
        }, a), a.a.push(b))
    }
    Of.prototype.f = function (a) {
        var b = this.c[a.type];
        b && b(a)
    };
    function Qf(a,b){b.forEach(function(a){w(this.i,a,this.f,this)},a)}function Rf(a,b){b.forEach(function(a){Fa(this.i,a,this.f,this)},a)}function xf(a,b){for(var c={},d,e=0,f=Sf.length;e<f;e++)d=Sf[e][0],c[d]=a[d]||b[d]||Sf[e][1];return c}function Nf(a,b,c){b.bubbles=!1;yf(a,"pointerleave",b,c)}Of.prototype.out=function(a,b){a.bubbles=!0;yf(this,"pointerout",a,b)};function Af(a,b,c){a.out(b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||Nf(a,b,c)}
function zf(a,b,c){b.bubbles=!0;yf(a,"pointerover",b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,yf(a,"pointerenter",b,c))}function yf(a,b,c,d){a.b(new Df(b,d,c))}function Ff(a,b){a.b(new Df(b.type,b,b))}Of.prototype.la=function(){for(var a=this.a.length,b,c=0;c<a;c++)b=this.a[c],Rf(this,Object.keys(b.c));Ma.prototype.la.call(this)};
var Sf=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Tf(a,b,c,d,e){Ge.call(this,a,b,e);this.originalEvent=c;this.pixel=b.Ud(c);this.coordinate=b.Ja(this.pixel);this.dragging=void 0!==d?d:!1}v(Tf,Ge);Tf.prototype.preventDefault=function(){Ge.prototype.preventDefault.call(this);this.originalEvent.preventDefault()};Tf.prototype.stopPropagation=function(){Ge.prototype.stopPropagation.call(this);this.originalEvent.stopPropagation()};function Uf(a,b,c,d,e){Tf.call(this,a,b,c.b,d,e);this.b=c}v(Uf,Tf);
function Vf(a){Ma.call(this);this.f=a;this.j=0;this.l=!1;this.c=[];this.g=null;a=this.f.a;this.u=0;this.T={};this.i=new Of(a);this.a=null;this.o=w(this.i,"pointerdown",this.Mk,this);this.s=w(this.i,"pointermove",this.Co,this)}v(Vf,Ma);function Wf(a,b){var c=new Uf(Xf,a.f,b);a.b(c);0!==a.j?(clearTimeout(a.j),a.j=0,c=new Uf(Yf,a.f,b),a.b(c)):a.j=setTimeout(function(){this.j=0;var a=new Uf(Zf,this.f,b);this.b(a)}.bind(a),250)}
function $f(a,b){b.type==ag||b.type==bg?delete a.T[b.pointerId]:b.type==cg&&(a.T[b.pointerId]=!0);a.u=Object.keys(a.T).length}k=Vf.prototype;k.Kg=function(a){$f(this,a);var b=new Uf(ag,this.f,a);this.b(b);!this.l&&0===a.button&&Wf(this,this.g);0===this.u&&(this.c.forEach(za),this.c.length=0,this.l=!1,this.g=null,Ja(this.a),this.a=null)};
k.Mk=function(a){$f(this,a);var b=new Uf(cg,this.f,a);this.b(b);this.g=a;0===this.c.length&&(this.a=new Of(document),this.c.push(w(this.a,dg,this.Fl,this),w(this.a,ag,this.Kg,this),w(this.i,bg,this.Kg,this)))};k.Fl=function(a){if(a.clientX!=this.g.clientX||a.clientY!=this.g.clientY){this.l=!0;var b=new Uf(eg,this.f,a,this.l);this.b(b)}a.preventDefault()};k.Co=function(a){this.b(new Uf(a.type,this.f,a,!(!this.g||a.clientX==this.g.clientX&&a.clientY==this.g.clientY)))};
k.la=function(){this.s&&(za(this.s),this.s=null);this.o&&(za(this.o),this.o=null);this.c.forEach(za);this.c.length=0;this.a&&(Ja(this.a),this.a=null);this.i&&(Ja(this.i),this.i=null);Ma.prototype.la.call(this)};var Zf="singleclick",Xf="click",Yf="dblclick",eg="pointerdrag",dg="pointermove",cg="pointerdown",ag="pointerup",bg="pointercancel",fg={xp:Zf,mp:Xf,np:Yf,qp:eg,tp:dg,pp:cg,wp:ag,vp:"pointerover",up:"pointerout",rp:"pointerenter",sp:"pointerleave",op:bg};function gg(a,b){Ma.call(this);this.ya=a;this.state=b;this.a=null;this.key=""}v(gg,Ma);function hg(a){a.b("change")}gg.prototype.Xa=function(){return this.key+"/"+this.ya};function ig(a){if(!a.a)return a;var b=a.a;do{if(b.U()==jg)return b;b=b.a}while(b);return a}gg.prototype.i=function(){return this.ya};gg.prototype.U=function(){return this.state};var jg=2;function kg(a,b){this.o=a;this.f=b;this.b=[];this.g=[];this.a={}}kg.prototype.clear=function(){this.b.length=0;this.g.length=0;va(this.a)};function lg(a){var b=a.b,c=a.g,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),mg(a,0));b=a.f(d);delete a.a[b];return d}kg.prototype.c=function(a){ha(!(this.f(a)in this.a),31);var b=this.o(a);return Infinity!=b?(this.b.push(a),this.g.push(b),this.a[this.f(a)]=!0,ng(this,0,this.b.length-1),!0):!1};
    function mg(a, b) {
        for (var c = a.b, d = a.g, e = c.length, f = c[b], g = d[b], h = b; b < e >> 1;) {
            var l = 2 * b + 1, m = 2 * b + 2, l = m < e && d[m] < d[l] ? m : l;
            c[b] = c[l];
            d[b] = d[l];
            b = l
        }
        c[b] = f;
        d[b] = g;
        ng(a, h, b)
    }
    function ng(a, b, c) {
        var d = a.b;
        a = a.g;
        for (var e = d[c], f = a[c]; c > b;) {
            var g = c - 1 >> 1;
            if (a[g] > f)d[c] = d[g], a[c] = a[g], c = g; else break
        }
        d[c] = e;
        a[c] = f
    }
    function og(a) {
        var b = a.o, c = a.b, d = a.g, e = 0, f = c.length, g, h, l;
        for (h = 0; h < f; ++h)g = c[h], l = b(g), Infinity == l ? delete a.a[a.f(g)] : (d[e] = l, c[e++] = g);
        c.length = e;
        d.length = e;
        for (b = (a.b.length >> 1) - 1; 0 <= b; b--)mg(a, b)
    }
    function pg(a, b) {
        kg.call(this, function (b) {
            return a.apply(null, b)
        }, function (a) {
            return a[0].Xa()
        });
        this.s = b;
        this.j = 0;
        this.i = {}
    }
    v(pg, kg);
    pg.prototype.c = function (a) {
        var b = kg.prototype.c.call(this, a);
        b && w(a[0], "change", this.l, this);
        return b
    };
    pg.prototype.l = function (a) {
        a = a.target;
        var b = a.U();
        if (b === jg || 3 === b || 4 === b || 5 === b)Fa(a, "change", this.l, this), a = a.Xa(), a in this.i && (delete this.i[a], --this.j), this.s()
    };
    function qg(a, b, c) {
        for (var d = 0, e, f; a.j < b && d < c && 0 < a.b.length;)e = lg(a)[0], f = e.Xa(), 0 !== e.U() || f in a.i || (a.i[f] = !0, ++a.j, ++d, e.load())
    }
    function rg(a, b, c) {
        this.f = a;
        this.g = b;
        this.i = c;
        this.b = [];
        this.a = this.c = 0
    }
    function sg(a, b) {
        var c = a.f, d = a.a, e = a.g - d, f = Math.log(a.g / a.a) / a.f;
        return Nd({
            source: b, duration: f, easing: function (a) {
                return d * (Math.exp(c * a * f) - 1) / e
            }
        })
    }
    function tg(a) {
        Ua.call(this);
        this.s = null;
        this.Ba(!0);
        this.handleEvent = a.handleEvent
    }
    v(tg, Ua);
    tg.prototype.f = function () {
        return this.get(ug)
    };
    tg.prototype.c = function () {
        return this.s
    };
    tg.prototype.Ba = function (a) {
        this.set(ug, a)
    };
    tg.prototype.setMap = function (a) {
        this.s = a
    };
    function vg(a, b, c, d, e) {
        if (void 0 !== c) {
            var f = b.Pa(), g = b.bb();
            void 0 !== f && g && e && 0 < e && (a.ab(Od({
                rotation: f,
                duration: e,
                easing: Jd
            })), d && a.ab(Nd({source: g, duration: e, easing: Jd})));
            b.rotate(c, d)
        }
    }
    function wg(a, b, c, d, e) {
        var f = b.Ma();
        c = b.constrainResolution(f, c, 0);
        xg(a, b, c, d, e)
    }
    function xg(a, b, c, d, e) {
        if (c) {
            var f = b.Ma(), g = b.bb();
            void 0 !== f && g && c !== f && e && 0 < e && (a.ab(Pd({
                resolution: f,
                duration: e,
                easing: Jd
            })), d && a.ab(Nd({source: g, duration: e, easing: Jd})));
            if (d) {
                var h;
                a = b.bb();
                e = b.Ma();
                void 0 !== a && void 0 !== e && (h = [d[0] - c * (d[0] - a[0]) / e, d[1] - c * (d[1] - a[1]) / e]);
                b.rb(h)
            }
            b.Yb(c)
        }
    }
    var ug = "active";
    function yg(a) {
        a = a ? a : {};
        this.a = a.delta ? a.delta : 1;
        tg.call(this, {handleEvent: zg});
        this.i = void 0 !== a.duration ? a.duration : 250
    }
    v(yg, tg);
    function zg(a) {
        var b = !1, c = a.originalEvent;
        if (a.type == Yf) {
            var b = a.map, d = a.coordinate, c = c.shiftKey ? -this.a : this.a, e = b.$();
            wg(b, e, c, d, this.i);
            a.preventDefault();
            b = !0
        }
        return !b
    }
    function Ag(a) {
        a = a.originalEvent;
        return a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey
    }
    function Bg(a) {
        a = a.originalEvent;
        return 0 == a.button && !(ef && ff && a.ctrlKey)
    }
    function Cg(a) {
        return "pointermove" == a.type
    }
    function Dg(a) {
        return a.type == Zf
    }
    function Eg(a) {
        a = a.originalEvent;
        return !a.altKey && !(a.metaKey || a.ctrlKey) && !a.shiftKey
    }
    function Fg(a) {
        a = a.originalEvent;
        return !a.altKey && !(a.metaKey || a.ctrlKey) && a.shiftKey
    }
    function Gg(a) {
        a = a.originalEvent.target.tagName;
        return "INPUT" !== a && "SELECT" !== a && "TEXTAREA" !== a
    }
    function Hg(a) {
        ha(a.b, 56);
        return "mouse" == a.b.pointerType
    }
    function Ig(a) {
        a = a.b;
        return a.isPrimary && 0 === a.button
    }
    function Jg(a) {
        a = a ? a : {};
        tg.call(this, {handleEvent: a.handleEvent ? a.handleEvent : Kg});
        this.Me = a.handleDownEvent ? a.handleDownEvent : hc;
        this.Je = a.handleDragEvent ? a.handleDragEvent : da;
        this.hj = a.handleMoveEvent ? a.handleMoveEvent : da;
        this.pj = a.handleUpEvent ? a.handleUpEvent : hc;
        this.C = !1;
        this.Z = {};
        this.l = []
    }
    v(Jg, tg);
    function Lg(a) {
        for (var b = a.length, c = 0, d = 0, e = 0; e < b; e++)c += a[e].clientX, d += a[e].clientY;
        return [c / b, d / b]
    }
    function Kg(a){if(!(a instanceof Uf))return!0;var b=!1,c=a.type;if(c===cg||c===eg||c===ag)c=a.b,a.type==ag?delete this.Z[c.pointerId]:a.type==cg?this.Z[c.pointerId]=c:c.pointerId in this.Z&&(this.Z[c.pointerId]=c),this.l=wa(this.Z);this.C&&(a.type==eg?this.Je(a):a.type==ag&&(this.C=this.pj(a)));a.type==cg?(this.C=a=this.Me(a),b=this.Fc(a)):a.type==dg&&this.hj(a);return!b}Jg.prototype.Fc=function(a){return a};function Mg(a){Jg.call(this,{handleDownEvent:Ng,handleDragEvent:Og,handleUpEvent:Pg});a=a?a:{};this.a=a.kinetic;this.i=this.j=null;this.u=a.condition?a.condition:Eg;this.o=!1}v(Mg,Jg);function Og(a){var b=Lg(this.l);this.a&&this.a.b.push(b[0],b[1],Date.now());if(this.i){var c=this.i[0]-b[0],d=b[1]-this.i[1];a=a.map.$();var e=a.U(),d=c=[c,d],f=e.resolution;d[0]*=f;d[1]*=f;wb(c,e.rotation);rb(c,e.center);c=a.Qd(c);a.rb(c)}this.i=b}
function Pg(a){var b=a.map;a=b.$();if(0===this.l.length){var c;if(c=!this.o&&this.a)if(c=this.a,6>c.b.length)c=!1;else{var d=Date.now()-c.i,e=c.b.length-3;if(c.b[e+2]<d)c=!1;else{for(var f=e-3;0<f&&c.b[f+2]>d;)f-=3;var d=c.b[e+2]-c.b[f+2],g=c.b[e]-c.b[f],e=c.b[e+1]-c.b[f+1];c.c=Math.atan2(e,g);c.a=Math.sqrt(g*g+e*e)/d;c=c.a>c.g}}c?(c=this.a,c=(c.g-c.a)/c.f,e=this.a.c,f=a.bb(),this.j=sg(this.a,f),b.ab(this.j),f=b.Ca(f),b=b.Ja([f[0]-c*Math.cos(e),f[1]-c*Math.sin(e)]),b=a.Qd(b),a.rb(b)):b.render();Hd(a,
-1);return!1}this.i=null;return!0}function Ng(a){if(0<this.l.length&&this.u(a)){var b=a.map,c=b.$();this.i=null;this.C||Hd(c,1);this.j&&cb(b.S,this.j)&&(c.rb(a.frameState.viewState.center),this.j=null);this.a&&(a=this.a,a.b.length=0,a.c=0,a.a=0);this.o=1<this.l.length;return!0}return!1}Mg.prototype.Fc=hc;function Qg(a){a=a?a:{};Jg.call(this,{handleDownEvent:Rg,handleDragEvent:Sg,handleUpEvent:Tg});this.i=a.condition?a.condition:Ag;this.a=void 0;this.j=void 0!==a.duration?a.duration:250}v(Qg,Jg);function Sg(a){if(Hg(a)){var b=a.map,c=b.kb();a=a.pixel;c=Math.atan2(c[1]/2-a[1],a[0]-c[0]/2);if(void 0!==this.a){a=c-this.a;var d=b.$(),e=d.Pa();vg(b,d,e-a)}this.a=c}}
function Tg(a){if(!Hg(a))return!0;a=a.map;var b=a.$();Hd(b,-1);var c=b.Pa(),d=this.j,c=b.constrainRotation(c,0);vg(a,b,c,void 0,d);return!1}function Rg(a){return Hg(a)&&Bg(a)&&this.i(a)?(Hd(a.map.$(),1),this.a=void 0,!0):!1}Qg.prototype.Fc=hc;function Ug(a){this.f=null;this.a=document.createElement("div");this.a.style.position="absolute";this.a.className="ol-box "+a;this.g=this.c=this.b=null}v(Ug,Ia);Ug.prototype.la=function(){this.setMap(null)};function Vg(a){var b=a.c,c=a.g;a=a.a.style;a.left=Math.min(b[0],c[0])+"px";a.top=Math.min(b[1],c[1])+"px";a.width=Math.abs(c[0]-b[0])+"px";a.height=Math.abs(c[1]-b[1])+"px"}
Ug.prototype.setMap=function(a){if(this.b){this.b.C.removeChild(this.a);var b=this.a.style;b.left=b.top=b.width=b.height="inherit"}(this.b=a)&&this.b.C.appendChild(this.a)};function Wg(a){var b=a.c,c=a.g,b=[b,[b[0],c[1]],c,[c[0],b[1]]].map(a.b.Ja,a.b);b[4]=b[0].slice();a.f?a.f.ma([b]):a.f=new B([b])}Ug.prototype.V=function(){return this.f};function Xg(a){Jg.call(this,{handleDownEvent:Yg,handleDragEvent:Zg,handleUpEvent:$g});a=a?a:{};this.a=new Ug(a.className||"ol-dragbox");this.i=null;this.B=a.condition?a.condition:gc;this.u=a.boxEndCondition?a.boxEndCondition:ah}v(Xg,Jg);function ah(a,b,c){a=c[0]-b[0];b=c[1]-b[1];return 64<=a*a+b*b}function Zg(a){if(Hg(a)){var b=this.a,c=a.pixel;b.c=this.i;b.g=c;Wg(b);Vg(b);this.b(new bh(ch,a.coordinate,a))}}Xg.prototype.V=function(){return this.a.V()};Xg.prototype.o=da;
function $g(a){if(!Hg(a))return!0;this.a.setMap(null);this.u(a,this.i,a.pixel)&&(this.o(a),this.b(new bh(dh,a.coordinate,a)));return!1}function Yg(a){if(Hg(a)&&Bg(a)&&this.B(a)){this.i=a.pixel;this.a.setMap(a.map);var b=this.a,c=this.i;b.c=this.i;b.g=c;Wg(b);Vg(b);this.b(new bh(eh,a.coordinate,a));return!0}return!1}var eh="boxstart",ch="boxdrag",dh="boxend";function bh(a,b,c){Ka.call(this,a);this.coordinate=b;this.mapBrowserEvent=c}v(bh,Ka);function fh(a){a=a?a:{};var b=a.condition?a.condition:Fg;this.j=void 0!==a.duration?a.duration:200;this.G=void 0!==a.out?a.out:!1;Xg.call(this,{condition:b,className:a.className||"ol-dragzoom"})}v(fh,Xg);
fh.prototype.o=function(){var a=this.s,b=a.$(),c=a.kb(),d=this.V().D();if(this.G){var e=b.Jc(c),d=[a.Ca(Sb(d)),a.Ca(Vb(d))],f=Kb(Infinity,Infinity,-Infinity,-Infinity,void 0),g,h;g=0;for(h=d.length;g<h;++g)Cb(f,d[g]);ec(e,1/Dd(f,c));d=e}c=b.constrainResolution(Dd(d,c));e=b.Ma();f=b.bb();a.ab(Pd({resolution:e,duration:this.j,easing:Jd}));a.ab(Nd({source:f,duration:this.j,easing:Jd}));b.rb(ac(d));b.Yb(c)};function gh(a){tg.call(this,{handleEvent:hh});a=a||{};this.a=function(a){return Eg(a)&&Gg(a)};this.i=void 0!==a.condition?a.condition:this.a;this.j=void 0!==a.duration?a.duration:100;this.l=void 0!==a.pixelDelta?a.pixelDelta:128}v(gh,tg);
    function hh(a) {
        var b = !1;
        if ("keydown" == a.type) {
            var c = a.originalEvent.keyCode;
            if (this.i(a) && (40 == c || 37 == c || 39 == c || 38 == c)) {
                var d = a.map, b = d.$(), e = b.Ma() * this.l, f = 0, g = 0;
                40 == c ? g = -e : 37 == c ? f = -e : 39 == c ? f = e : g = e;
                c = [f, g];
                wb(c, b.Pa());
                e = this.j;
                if (f = b.bb())e && 0 < e && d.ab(Nd({
                    source: f,
                    duration: e,
                    easing: Ld
                })), d = b.Qd([f[0] + c[0], f[1] + c[1]]), b.rb(d);
                a.preventDefault();
                b = !0
            }
        }
        return !b
    }
    function ih(a) {
        tg.call(this, {handleEvent: jh});
        a = a ? a : {};
        this.i = a.condition ? a.condition : Gg;
        this.a = a.delta ? a.delta : 1;
        this.j = void 0 !== a.duration ? a.duration : 100
    }
    v(ih, tg);
    function jh(a) {
        var b = !1;
        if ("keydown" == a.type || "keypress" == a.type) {
            var c = a.originalEvent.charCode;
            if (this.i(a) && (43 == c || 45 == c)) {
                var b = a.map, c = 43 == c ? this.a : -this.a, d = b.$();
                wg(b, d, c, void 0, this.j);
                a.preventDefault();
                b = !0
            }
        }
        return !b
    }
    function kh(a) {
        tg.call(this, {handleEvent: lh});
        a = a || {};
        this.i = 0;
        this.C = void 0 !== a.duration ? a.duration : 250;
        this.G = void 0 !== a.timeout ? a.timeout : 80;
        this.o = void 0 !== a.useAnchor ? a.useAnchor : !0;
        this.a = null;
        this.l = this.j = void 0
    }
    v(kh, tg);
    function lh(a){var b=!1;if("wheel"==a.type||"mousewheel"==a.type){var b=a.map,c=a.originalEvent;this.o&&(this.a=a.coordinate);var d;"wheel"==a.type?(d=c.deltaY,cf&&c.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(d/=gf),c.deltaMode===WheelEvent.DOM_DELTA_LINE&&(d*=40)):"mousewheel"==a.type&&(d=-c.wheelDeltaY,df&&(d/=3));this.i+=d;void 0===this.j&&(this.j=Date.now());d=Math.max(this.G-(Date.now()-this.j),0);clearTimeout(this.l);this.l=setTimeout(this.u.bind(this,b),d);a.preventDefault();b=!0}return!b}
kh.prototype.u=function(a){var b=ia(this.i,-1,1),c=a.$();wg(a,c,-b,this.a,this.C);this.i=0;this.a=null;this.l=this.j=void 0};kh.prototype.B=function(a){this.o=a;a||(this.a=null)};function mh(a){Jg.call(this,{handleDownEvent:nh,handleDragEvent:oh,handleUpEvent:ph});a=a||{};this.i=null;this.j=void 0;this.a=!1;this.o=0;this.B=void 0!==a.threshold?a.threshold:.3;this.u=void 0!==a.duration?a.duration:250}v(mh,Jg);
function oh(a){var b=0,c=this.l[0],d=this.l[1],c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);void 0!==this.j&&(b=c-this.j,this.o+=b,!this.a&&Math.abs(this.o)>this.B&&(this.a=!0));this.j=c;a=a.map;c=a.a.getBoundingClientRect();d=Lg(this.l);d[0]-=c.left;d[1]-=c.top;this.i=a.Ja(d);this.a&&(c=a.$(),d=c.Pa(),a.render(),vg(a,c,d+b,this.i))}
function ph(a){if(2>this.l.length){a=a.map;var b=a.$();Hd(b,-1);if(this.a){var c=b.Pa(),d=this.i,e=this.u,c=b.constrainRotation(c,0);vg(a,b,c,d,e)}return!1}return!0}function nh(a){return 2<=this.l.length?(a=a.map,this.i=null,this.j=void 0,this.a=!1,this.o=0,this.C||Hd(a.$(),1),a.render(),!0):!1}mh.prototype.Fc=hc;function qh(a){Jg.call(this,{handleDownEvent:rh,handleDragEvent:sh,handleUpEvent:th});a=a?a:{};this.i=null;this.o=void 0!==a.duration?a.duration:400;this.a=void 0;this.j=1}v(qh,Jg);function sh(a){var b=1,c=this.l[0],d=this.l[1],e=c.clientX-d.clientX,c=c.clientY-d.clientY,e=Math.sqrt(e*e+c*c);void 0!==this.a&&(b=this.a/e);this.a=e;1!=b&&(this.j=b);a=a.map;var e=a.$(),c=e.Ma(),d=a.a.getBoundingClientRect(),f=Lg(this.l);f[0]-=d.left;f[1]-=d.top;this.i=a.Ja(f);a.render();xg(a,e,c*b,this.i)}
function th(a){if(2>this.l.length){a=a.map;var b=a.$();Hd(b,-1);var c=b.Ma(),d=this.i,e=this.o,c=b.constrainResolution(c,0,this.j-1);xg(a,b,c,d,e);return!1}return!0}function rh(a){return 2<=this.l.length?(a=a.map,this.i=null,this.a=void 0,this.j=1,this.C||Hd(a.$(),1),a.render(),!0):!1}qh.prototype.Fc=hc;function uh(a){a=a?a:{};var b=new me,c=new rg(-.005,.05,100);(void 0!==a.altShiftDragRotate?a.altShiftDragRotate:1)&&b.push(new Qg);(void 0!==a.doubleClickZoom?a.doubleClickZoom:1)&&b.push(new yg({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.dragPan?a.dragPan:1)&&b.push(new Mg({kinetic:c}));(void 0!==a.pinchRotate?a.pinchRotate:1)&&b.push(new mh);(void 0!==a.pinchZoom?a.pinchZoom:1)&&b.push(new qh({duration:a.zoomDuration}));if(void 0!==a.keyboard?a.keyboard:1)b.push(new gh),b.push(new ih({delta:a.zoomDelta,
        duration: a.zoomDuration
    }));
        (void 0 !== a.mouseWheelZoom ? a.mouseWheelZoom : 1) && b.push(new kh({duration: a.zoomDuration}));
        (void 0 !== a.shiftDragZoom ? a.shiftDragZoom : 1) && b.push(new fh({duration: a.zoomDuration}));
        return b
    }
    function vh(a) {
        Ua.call(this);
        var b = ua({}, a);
        b.opacity = void 0 !== a.opacity ? a.opacity : 1;
        b.visible = void 0 !== a.visible ? a.visible : !0;
        b.zIndex = void 0 !== a.zIndex ? a.zIndex : 0;
        b.maxResolution = void 0 !== a.maxResolution ? a.maxResolution : Infinity;
        b.minResolution = void 0 !== a.minResolution ? a.minResolution : 0;
        this.H(b);
        this.a = {layer: this, sd: !0}
    }
    v(vh, Ua);
    function wh(a){a.a.opacity=ia(a.Rb(),0,1);a.a.mi=a.hf();a.a.visible=a.zb();a.a.extent=a.D();a.a.zIndex=a.Sb();a.a.maxResolution=a.Pb();a.a.minResolution=Math.max(a.Qb(),0);return a.a}k=vh.prototype;k.D=function(){return this.get("extent")};k.Pb=function(){return this.get("maxResolution")};k.Qb=function(){return this.get("minResolution")};k.Rb=function(){return this.get("opacity")};k.zb=function(){return this.get("visible")};k.Sb=function(){return this.get("zIndex")};
k.fc=function(a){this.set("extent",a)};k.lc=function(a){this.set("maxResolution",a)};k.mc=function(a){this.set("minResolution",a)};k.gc=function(a){this.set("opacity",a)};k.hc=function(a){this.set("visible",a)};k.ic=function(a){this.set("zIndex",a)};function xh(a){var b=a||{};a=ua({},b);delete a.layers;b=b.layers;vh.call(this,a);this.c=[];this.f={};w(this,Wa(yh),this.Fk,this);b?Array.isArray(b)?b=new me(b.slice()):ha(b instanceof me,43):b=new me;this.gh(b)}v(xh,vh);k=xh.prototype;k.be=function(){this.zb()&&this.v()};
k.Fk=function(){this.c.forEach(za);this.c.length=0;var a=this.Qc();this.c.push(w(a,se,this.Ek,this),w(a,te,this.Gk,this));for(var b in this.f)this.f[b].forEach(za);va(this.f);var a=a.a,c,d;b=0;for(c=a.length;b<c;b++)d=a[b],this.f[ea(d).toString()]=[w(d,"propertychange",this.be,this),w(d,"change",this.be,this)];this.v()};k.Ek=function(a){a=a.element;var b=ea(a).toString();this.f[b]=[w(a,"propertychange",this.be,this),w(a,"change",this.be,this)];this.v()};
k.Gk=function(a){a=ea(a.element).toString();this.f[a].forEach(za);delete this.f[a];this.v()};k.Qc=function(){return this.get(yh)};k.gh=function(a){this.set(yh,a)};
k.ff=function(a){var b=void 0!==a?a:[],c=b.length;this.Qc().forEach(function(a){a.ff(b)});a=wh(this);var d,e;for(d=b.length;c<d;c++)e=b[c],e.opacity*=a.opacity,e.visible=e.visible&&a.visible,e.maxResolution=Math.min(e.maxResolution,a.maxResolution),e.minResolution=Math.max(e.minResolution,a.minResolution),void 0!==a.extent&&(e.extent=void 0!==e.extent?cc(e.extent,a.extent):a.extent);return b};k.hf=function(){return"ready"};var yh="layers";function zh(a){lc.call(this,{code:a,units:"m",extent:Ah,global:!0,worldExtent:Bh})}v(zh,lc);zh.prototype.getPointResolution=function(a,b){return a/ja(b[1]/6378137)};var Ch=6378137*Math.PI,Ah=[-Ch,-Ch,Ch,Ch],Bh=[-180,-85,180,85],zc="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(a){return new zh(a)});
    function Ac(a, b, c) {
        var d = a.length;
        c = 1 < c ? c : 2;
        void 0 === b && (2 < c ? b = a.slice() : b = Array(d));
        for (var e = 0; e < d; e += c) {
            b[e] = Ch * a[e] / 180;
            var f = 6378137 * Math.log(Math.tan(Math.PI * (a[e + 1] + 90) / 360));
            f > Ch ? f = Ch : f < -Ch && (f = -Ch);
            b[e + 1] = f
        }
        return b
    }
    function Bc(a, b, c) {
        var d = a.length;
        c = 1 < c ? c : 2;
        void 0 === b && (2 < c ? b = a.slice() : b = Array(d));
        for (var e = 0; e < d; e += c)b[e] = 180 * a[e] / Ch, b[e + 1] = 360 * Math.atan(Math.exp(a[e + 1] / 6378137)) / Math.PI - 90;
        return b
    }
    var Dh = new ic(6378137);
    function Eh(a, b) {
        lc.call(this, {
            code: a,
            units: "degrees",
            extent: Fh,
            axisOrientation: b,
            global: !0,
            metersPerUnit: Gh,
            worldExtent: Fh
        })
    }
    v(Eh, lc);
    Eh.prototype.getPointResolution = function (a) {
        return a
    };
    var Fh = [-180, -90, 180, 90], Gh = Math.PI * Dh.radius / 180, Cc = [new Eh("CRS:84"), new Eh("EPSG:4326", "neu"), new Eh("urn:ogc:def:crs:EPSG::4326", "neu"), new Eh("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new Eh("urn:ogc:def:crs:OGC:1.3:CRS84"), new Eh("urn:ogc:def:crs:OGC:2:84"), new Eh("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new Eh("urn:x-ogc:def:crs:EPSG:4326", "neu")];
    function Hh() {
        rc(zc);
        rc(Cc);
        yc()
    }
    function Ih(a, b, c, d, e) {
        Ka.call(this, a);
        this.vectorContext = b;
        this.frameState = c;
        this.context = d;
        this.glContext = e
    }
    v(Ih, Ka);
    function Jh(a) {
        var b = ua({}, a);
        delete b.source;
        vh.call(this, b);
        this.C = this.s = this.o = null;
        a.map && this.setMap(a.map);
        w(this, Wa("source"), this.Sk, this);
        this.Ec(a.source ? a.source : null)
    }
    v(Jh, vh);
    function Kh(a, b) {
        return a.visible && b >= a.minResolution && b < a.maxResolution
    }
    k = Jh.prototype;
    k.ff = function (a) {
        a = a ? a : [];
        a.push(wh(this));
        return a
    };
    k.ga = function () {
        return this.get("source") || null
    };
    k.hf = function () {
        var a = this.ga();
        return a ? a.U() : "undefined"
    };
    k.zm = function () {
        this.v()
    };
    k.Sk=function(){this.C&&(za(this.C),this.C=null);var a=this.ga();a&&(this.C=w(a,"change",this.zm,this));this.v()};k.setMap=function(a){this.o&&(za(this.o),this.o=null);a||this.v();this.s&&(za(this.s),this.s=null);a&&(this.o=w(a,"precompose",function(a){var c=wh(this);c.sd=!1;c.zIndex=Infinity;a.frameState.layerStatesArray.push(c);a.frameState.layerStates[ea(this)]=c},this),this.s=w(this,"change",a.render,a),this.v())};k.Ec=function(a){this.set("source",a)};function Lh(){this.b={};this.a=0}Lh.prototype.clear=function(){this.b={};this.a=0};Lh.prototype.get=function(a,b,c){a=b+":"+a+":"+(c?Ae(c):"null");return a in this.b?this.b[a]:null};Lh.prototype.set=function(a,b,c,d){this.b[b+":"+a+":"+(c?Ae(c):"null")]=d;++this.a};var Mh=new Lh;var Nh=Array(6);function Oh(){return[1,0,0,1,0,0]}function Ph(a){return Qh(a,1,0,0,1,0,0)}function Rh(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],l=b[0],m=b[1],n=b[2],p=b[3],q=b[4],t=b[5];a[0]=c*l+e*m;a[1]=d*l+f*m;a[2]=c*n+e*p;a[3]=d*n+f*p;a[4]=c*q+e*t+g;a[5]=d*q+f*t+h;return a}function Qh(a,b,c,d,e,f,g){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;return a}function Sh(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}
function Th(a,b){var c=b[0],d=b[1];b[0]=a[0]*c+a[2]*d+a[4];b[1]=a[1]*c+a[3]*d+a[5];return b}function Uh(a,b){var c=Math.cos(b),d=Math.sin(b);Rh(a,Qh(Nh,c,d,-d,c,0,0))}function Vh(a,b,c){return Rh(a,Qh(Nh,b,0,0,c,0,0))}function Wh(a,b,c){Rh(a,Qh(Nh,1,0,0,1,b,c))}function Xh(a,b,c,d,e,f,g,h){var l=Math.sin(f);f=Math.cos(f);a[0]=d*f;a[1]=e*l;a[2]=-d*l;a[3]=e*f;a[4]=g*d*f-h*d*l+b;a[5]=g*e*l+h*e*f+c;return a}
    function Yh(a) {
        var b = a[0] * a[3] - a[1] * a[2];
        ha(0 !== b, 32);
        var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], h = a[5];
        a[0] = f / b;
        a[1] = -d / b;
        a[2] = -e / b;
        a[3] = c / b;
        a[4] = (e * h - f * g) / b;
        a[5] = -(c * h - d * g) / b;
        return a
    }
    function Zh(a, b) {
        this.l = b;
        this.f = {};
        this.s = {}
    }
    v(Zh, Ia);
    function $h(a) {
        var b = a.viewState, c = a.coordinateToPixelTransform, d = a.pixelToCoordinateTransform;
        Xh(c, a.size[0] / 2, a.size[1] / 2, 1 / b.resolution, -1 / b.resolution, -b.rotation, -b.center[0], -b.center[1]);
        Yh(Sh(d, c))
    }
    k = Zh.prototype;
    k.la = function () {
        for (var a in this.f)Ja(this.f[a])
    };
    function ai() {
        if (32 < Mh.a) {
            var a = 0, b, c;
            for (b in Mh.b)c = Mh.b[b], 0 !== (a++ & 3) || Na(c) || (delete Mh.b[b], --Mh.a)
        }
    }
    k.xa=function(a,b,c,d,e,f){function g(a,e){var f=ea(a).toString(),g=b.layerStates[ea(e)].sd;if(!(f in b.skippedFeatureUids)||g)return c.call(d,a,g?e:null)}var h,l=b.viewState,m=l.resolution,n=l.projection,l=a;if(n.a){var n=n.D(),p=Zb(n),q=a[0];if(q<n[0]||q>n[2])l=[q+p*Math.ceil((n[0]-q)/p),a[1]]}n=b.layerStatesArray;for(p=n.length-1;0<=p;--p){var t=n[p],q=t.layer;if(Kh(t,m)&&e.call(f,q)&&(t=bi(this,q),q.ga()&&(h=t.xa(q.ga().G?l:a,b,g,d)),h))return h}};
k.jh=function(a,b,c,d,e,f){var g,h=b.viewState.resolution,l=b.layerStatesArray,m;for(m=l.length-1;0<=m;--m){g=l[m];var n=g.layer;if(Kh(g,h)&&e.call(f,n)&&(g=bi(this,n).Bc(a,b,c,d)))return g}};k.kh=function(a,b,c,d){return void 0!==this.xa(a,b,gc,this,c,d)};function bi(a,b){var c=ea(b).toString();if(c in a.f)return a.f[c];var d=a.ng(b);a.f[c]=d;a.s[c]=w(d,"change",a.Dk,a);return d}k.Dk=function(){this.l.render()};k.Pf=da;
    k.Io = function (a, b) {
        for (var c in this.f)if (!(b && c in b.layerStates)) {
            var d = c, e = this.f[d];
            delete this.f[d];
            za(this.s[d]);
            delete this.s[d];
            Ja(e)
        }
    };
    function ci(a, b) {
        for (var c in a.f)if (!(c in b.layerStates)) {
            b.postRenderFunctions.push(a.Io.bind(a));
            break
        }
    }
    function gb(a, b) {
        return a.zIndex - b.zIndex
    }
    function di(a) {
        Jh.call(this, a ? a : {})
    }
    v(di, Jh);
    function D(a) {
        a = a ? a : {};
        var b = ua({}, a);
        delete b.preload;
        delete b.useInterimTilesOnError;
        Jh.call(this, b);
        this.l(void 0 !== a.preload ? a.preload : 0);
        this.B(void 0 !== a.useInterimTilesOnError ? a.useInterimTilesOnError : !0)
    }
    v(D, Jh);
    D.prototype.f = function () {
        return this.get(ei)
    };
    D.prototype.l = function (a) {
        this.set(ei, a)
    };
    D.prototype.c = function () {
        return this.get(fi)
    };
    D.prototype.B = function (a) {
        this.set(fi, a)
    };
    var ei = "preload", fi = "useInterimTilesOnError";
    function gi(a, b, c, d, e) {
        Ma.call(this);
        this.j = e;
        this.extent = a;
        this.f = c;
        this.resolution = b;
        this.state = d
    }
    v(gi, Ma);
    function hi(a) {
        a.b("change")
    }
    gi.prototype.D = function () {
        return this.extent
    };
    gi.prototype.U = function () {
        return this.state
    };
    function ii(a, b, c, d, e, f, g) {
        gi.call(this, a, b, c, ji, d);
        this.o = e;
        this.g = new Image;
        null !== f && (this.g.crossOrigin = f);
        this.i = {};
        this.c = null;
        this.state = ji;
        this.l = g
    }
    v(ii, gi);
    ii.prototype.a = function (a) {
        if (void 0 !== a) {
            var b;
            a = ea(a);
            if (a in this.i)return this.i[a];
            xa(this.i) ? b = this.g : b = this.g.cloneNode(!1);
            return this.i[a] = b
        }
        return this.g
    };
    ii.prototype.s = function () {
        this.state = ki;
        this.c.forEach(za);
        this.c = null;
        hi(this)
    };
    ii.prototype.T = function () {
        void 0 === this.resolution && (this.resolution = $b(this.extent) / this.g.height);
        this.state = li;
        this.c.forEach(za);
        this.c = null;
        hi(this)
    };
    ii.prototype.load = function () {
        if (this.state == ji || this.state == ki)this.state = mi, hi(this), this.c = [Ea(this.g, "error", this.s, this), Ea(this.g, "load", this.T, this)], this.l(this, this.o)
    };
    var ji = 0, mi = 1, li = 2, ki = 3;
    var ni = [0, 0, 0, 1], oi = [], pi = [0, 0, 0, 1];
    function qi(a, b, c, d) {
        0 !== b && (a.translate(c, d), a.rotate(b), a.translate(-c, -d))
    }
    function ri(a) {
        this.l = a.opacity;
        this.T = a.rotateWithView;
        this.o = a.rotation;
        this.c = a.scale;
        this.u = a.snapToPixel
    }
    k = ri.prototype;
    k.qe = function () {
        return this.l
    };
    k.re = function () {
        return this.T
    };
    k.se = function () {
        return this.o
    };
    k.te = function () {
        return this.c
    };
    k.Xd = function () {
        return this.u
    };
    k.Rc = function (a) {
        this.l = a
    };
    k.ue = function (a) {
        this.o = a
    };
    k.Sc = function (a) {
        this.c = a
    };
    function si(a) {
        a = a || {};
        this.s = a.atlasManager;
        this.j = this.f = this.i = null;
        this.g = void 0 !== a.fill ? a.fill : null;
        this.b = void 0 !== a.stroke ? a.stroke : null;
        this.a = a.radius;
        this.S = [0, 0];
        this.C = this.G = this.na = this.B = null;
        ti(this, this.s);
        ri.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: 0,
            scale: 1,
            snapToPixel: void 0 !== a.snapToPixel ? a.snapToPixel : !0
        })
    }
    v(si, ri);
    k = si.prototype;
    k.clone=function(){var a=new si({fill:this.g?this.g.clone():void 0,stroke:this.b?this.b.clone():void 0,radius:this.a,snapToPixel:this.u,atlasManager:this.s});a.Rc(this.l);a.Sc(this.c);return a};k.cc=function(){return this.B};k.nn=function(){return this.g};k.pe=function(){return this.j};k.Tb=function(){return this.f};k.vd=function(){return li};k.md=function(){return this.G};k.jc=function(){return this.S};k.pn=function(){return this.a};k.Gb=function(){return this.na};k.qn=function(){return this.b};
k.rn=function(a){this.a=a;ti(this,this.s)};k.pf=da;k.load=da;k.Uf=da;
function ti(a,b){var c,d=null,e,f=0;a.b&&(e=Ce(a.b.a),f=a.b.f,void 0===f&&(f=1),d=a.b.g,hf||(d=null));var g=2*(a.a+f)+1,d={strokeStyle:e,Dd:f,size:g,lineDash:d};if(void 0===b)e=De(g,g),a.f=e.canvas,c=g=a.f.width,a.wh(d,e,0,0),a.C=[d.size,d.size],a.g?a.j=a.f:(e=De(d.size,d.size),a.j=e.canvas,a.vh(d,e,0,0));else{g=Math.round(g);(e=!a.g)&&(c=a.vh.bind(a,d));var f=a.b?ui(a.b):"-",h=a.g?vi(a.g):"-";a.i&&f==a.i[1]&&h==a.i[2]&&a.a==a.i[3]||(a.i=["c"+f+h+(void 0!==a.a?a.a.toString():"-"),f,h,a.a]);d=b.add(a.i[0],
g,g,a.wh.bind(a,d),c);a.f=d.image;a.S=[d.offsetX,d.offsetY];c=d.image.width;e?(a.j=d.de,a.C=[d.de.width,d.de.height]):(a.j=a.f,a.C=[c,c])}a.B=[g/2,g/2];a.na=[g,g];a.G=[c,c]}k.wh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();b.arc(a.size/2,a.size/2,this.a,0,2*Math.PI,!0);this.g&&(b.fillStyle=Ce(this.g.b),b.fill());this.b&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.Dd,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};
    k.vh = function (a, b, c, d) {
        b.setTransform(1, 0, 0, 1, 0, 0);
        b.translate(c, d);
        b.beginPath();
        b.arc(a.size / 2, a.size / 2, this.a, 0, 2 * Math.PI, !0);
        b.fillStyle = Ae(ni);
        b.fill();
        this.b && (b.strokeStyle = a.strokeStyle, b.lineWidth = a.Dd, a.lineDash && b.setLineDash(a.lineDash), b.stroke());
        b.closePath()
    };
    function wi(a) {
        a = a || {};
        this.b = void 0 !== a.color ? a.color : null;
        this.a = void 0
    }
    wi.prototype.clone = function () {
        var a = this.b;
        return new wi({color: a && a.slice ? a.slice() : a || void 0})
    };
    wi.prototype.g = function () {
        return this.b
    };
    wi.prototype.f = function (a) {
        this.b = a;
        this.a = void 0
    };
    function vi(a) {
        void 0 === a.a && (a.a = a.b instanceof CanvasPattern || a.b instanceof CanvasGradient ? ea(a.b).toString() : "f" + (a.b ? Ae(a.b) : "-"));
        return a.a
    }
    function xi(a) {
        a = a || {};
        this.a = void 0 !== a.color ? a.color : null;
        this.c = a.lineCap;
        this.g = void 0 !== a.lineDash ? a.lineDash : null;
        this.i = a.lineJoin;
        this.j = a.miterLimit;
        this.f = a.width;
        this.b = void 0
    }
    k = xi.prototype;
    k.clone = function () {
        var a = this.a;
        return new xi({
            color: a && a.slice ? a.slice() : a || void 0,
            lineCap: this.c,
            lineDash: this.g ? this.g.slice() : void 0,
            lineJoin: this.i,
            miterLimit: this.j,
            width: this.f
        })
    };
    k.zn = function () {
        return this.a
    };
    k.Sj = function () {
        return this.c
    };
    k.An = function () {
        return this.g
    };
    k.Tj = function () {
        return this.i
    };
    k.Yj=function(){return this.j};k.Bn=function(){return this.f};k.Cn=function(a){this.a=a;this.b=void 0};k.So=function(a){this.c=a;this.b=void 0};k.setLineDash=function(a){this.g=a;this.b=void 0};k.To=function(a){this.i=a;this.b=void 0};k.Uo=function(a){this.j=a;this.b=void 0};k.Xo=function(a){this.f=a;this.b=void 0};
    function ui(a) {
        void 0 === a.b && (a.b = "s", a.b = a.a ? "string" === typeof a.a ? a.b + a.a : a.b + ea(a.a).toString() : a.b + "-", a.b += "," + (void 0 !== a.c ? a.c.toString() : "-") + "," + (a.g ? a.g.toString() : "-") + "," + (void 0 !== a.i ? a.i : "-") + "," + (void 0 !== a.j ? a.j.toString() : "-") + "," + (void 0 !== a.f ? a.f.toString() : "-"));
        return a.b
    }
    function yi(a) {
        a = a || {};
        this.i = null;
        this.c = zi;
        void 0 !== a.geometry && this.zh(a.geometry);
        this.f = void 0 !== a.fill ? a.fill : null;
        this.a = void 0 !== a.image ? a.image : null;
        this.g = void 0 !== a.stroke ? a.stroke : null;
        this.j = void 0 !== a.text ? a.text : null;
        this.b = a.zIndex
    }
    k = yi.prototype;
    k.clone = function () {
        var a = this.V();
        a && a.clone && (a = a.clone());
        return new yi({
            geometry: a,
            fill: this.f ? this.f.clone() : void 0,
            image: this.a ? this.a.clone() : void 0,
            stroke: this.g ? this.g.clone() : void 0,
            text: this.Fa() ? this.Fa().clone() : void 0,
            zIndex: this.b
        })
    };
    k.V=function(){return this.i};k.Nj=function(){return this.c};k.Dn=function(){return this.f};k.En=function(){return this.a};k.Fn=function(){return this.g};k.Fa=function(){return this.j};k.Gn=function(){return this.b};k.zh=function(a){"function"===typeof a?this.c=a:"string"===typeof a?this.c=function(b){return b.get(a)}:a?a&&(this.c=function(){return a}):this.c=zi;this.i=a};k.Hn=function(a){this.b=a};
function Ai(a){if("function"!==typeof a){var b;Array.isArray(a)?b=a:(ha(a instanceof yi,41),b=[a]);a=function(){return b}}return a}var Bi=null;function Ci(){if(!Bi){var a=new wi({color:"rgba(255,255,255,0.4)"}),b=new xi({color:"#3399CC",width:1.25});Bi=[new yi({image:new si({fill:a,stroke:b,radius:5}),fill:a,stroke:b})]}return Bi}
function Di(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new yi({fill:new wi({color:[255,255,255,.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new yi({stroke:new xi({color:b,width:5})}),new yi({stroke:new xi({color:c,width:3})})];a.MultiLineString=a.LineString;a.Circle=a.Polygon.concat(a.LineString);a.Point=[new yi({image:new si({radius:6,fill:new wi({color:c}),stroke:new xi({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.LineString,
    a.Point);
    return a
}
    function zi(a) {
        return a.V()
    }
    function E(a) {
        a = a ? a : {};
        var b = ua({}, a);
        delete b.style;
        delete b.renderBuffer;
        delete b.updateWhileAnimating;
        delete b.updateWhileInteracting;
        Jh.call(this, b);
        this.i = void 0 !== a.renderBuffer ? a.renderBuffer : 100;
        this.B = null;
        this.j = void 0;
        this.l(a.style);
        this.Z = void 0 !== a.updateWhileAnimating ? a.updateWhileAnimating : !1;
        this.fa = void 0 !== a.updateWhileInteracting ? a.updateWhileInteracting : !1
    }
    v(E, Jh);
    E.prototype.G = function () {
        return this.B
    };
    E.prototype.S = function () {
        return this.j
    };
    E.prototype.l=function(a){this.B=void 0!==a?a:Ci;this.j=null===a?void 0:Ai(this.B);this.v()};function G(a){a=a?a:{};var b=ua({},a);delete b.preload;delete b.useInterimTilesOnError;E.call(this,b);this.P(a.preload?a.preload:0);this.W(a.useInterimTilesOnError?a.useInterimTilesOnError:!0);ha(void 0==a.renderMode||a.renderMode==Ei||a.renderMode==Fi||a.renderMode==Gi,28);this.u=a.renderMode||Fi}v(G,E);G.prototype.f=function(){return this.get(Hi)};G.prototype.c=function(){return this.get(Ii)};G.prototype.P=function(a){this.set(ei,a)};G.prototype.W=function(a){this.set(fi,a)};
    var Hi = "preload", Ii = "useInterimTilesOnError", Ei = "image", Fi = "hybrid", Gi = "vector";
    function Ji() {
    }
    function Ki(a, b, c, d, e) {
        this.f = a;
        this.C = b;
        this.c = c;
        this.B = d;
        this.ac = e;
        this.i = this.b = this.a = this.Z = this.Qa = this.W = null;
        this.fa = this.$a = this.T = this.na = this.S = this.G = 0;
        this.ra = !1;
        this.j = this.Ib = 0;
        this.oa = !1;
        this.za = 0;
        this.g = "";
        this.Aa = this.Ka = 0;
        this.La = !1;
        this.o = this.ub = 0;
        this.P = this.s = this.l = null;
        this.u = [];
        this.Jb = Oh()
    }
    v(Ki, Ji);
    function Li(a,b,c){if(a.i){b=Nc(b,0,c,2,a.B,a.u);c=a.f;var d=a.Jb,e=c.globalAlpha;1!=a.T&&(c.globalAlpha=e*a.T);var f=a.Ib;a.ra&&(f+=a.ac);var g,h;g=0;for(h=b.length;g<h;g+=2){var l=b[g]-a.G,m=b[g+1]-a.S;a.oa&&(l=Math.round(l),m=Math.round(m));if(0!==f||1!=a.j){var n=l+a.G,p=m+a.S;Xh(d,n,p,a.j,a.j,f,-n,-p);c.setTransform.apply(c,d)}c.drawImage(a.i,a.$a,a.fa,a.za,a.na,l,m,a.za,a.na)}0===f&&1==a.j||c.setTransform(1,0,0,1,0,0);1!=a.T&&(c.globalAlpha=e)}}
function Mi(a,b,c,d){var e=0;if(a.P&&""!==a.g){a.l&&Ni(a,a.l);a.s&&Oi(a,a.s);var f=a.P,g=a.f,h=a.Z;h?(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=f.textAlign&&(h.textAlign=g.textAlign=f.textAlign),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline)):(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline,a.Z={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});b=Nc(b,e,c,d,a.B,a.u);f=a.f;g=a.ub;for(a.La&&(g+=a.ac);e<c;e+=d){var h=b[e]+a.Ka,
l=b[e+1]+a.Aa;if(0!==g||1!=a.o){var m=Xh(a.Jb,h,l,a.o,a.o,g,-h,-l);f.setTransform.apply(f,m)}a.s&&f.strokeText(a.g,h,l);a.l&&f.fillText(a.g,h,l)}0===g&&1==a.o||f.setTransform(1,0,0,1,0,0)}}function Pi(a,b,c,d,e,f){var g=a.f;a=Nc(b,c,d,e,a.B,a.u);g.moveTo(a[0],a[1]);b=a.length;f&&(b-=2);for(c=2;c<b;c+=2)g.lineTo(a[c],a[c+1]);f&&g.closePath();return d}function Qi(a,b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f)c=Pi(a,b,c,d[f],e,!0);return c}k=Ki.prototype;
k.Rd=function(a){if(dc(this.c,a.D())){if(this.a||this.b){this.a&&Ni(this,this.a);this.b&&Oi(this,this.b);var b;b=this.B;var c=this.u,d=a.ka();b=d?Nc(d,0,d.length,a.sa(),b,c):null;c=b[2]-b[0];d=b[3]-b[1];c=Math.sqrt(c*c+d*d);d=this.f;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);this.a&&d.fill();this.b&&d.stroke()}""!==this.g&&Mi(this,a.td(),2,2)}};k.ud=function(a){this.Vb(a.f,a.g);this.Xb(a.a);this.Zb(a.Fa())};
k.pc=function(a){switch(a.X()){case "Point":this.rc(a);break;case "LineString":this.kd(a);break;case "Polygon":this.Ze(a);break;case "MultiPoint":this.qc(a);break;case "MultiLineString":this.Xe(a);break;case "MultiPolygon":this.Ye(a);break;case "GeometryCollection":this.We(a);break;case "Circle":this.Rd(a)}};k.Ve=function(a,b){var c=(0,b.c)(a);c&&dc(this.c,c.D())&&(this.ud(b),this.pc(c))};k.We=function(a){a=a.f;var b,c;b=0;for(c=a.length;b<c;++b)this.pc(a[b])};
k.rc=function(a){var b=a.ka();a=a.sa();this.i&&Li(this,b,b.length);""!==this.g&&Mi(this,b,b.length,a)};k.qc=function(a){var b=a.ka();a=a.sa();this.i&&Li(this,b,b.length);""!==this.g&&Mi(this,b,b.length,a)};k.kd=function(a){if(dc(this.c,a.D())){if(this.b){Oi(this,this.b);var b=this.f,c=a.ka();b.beginPath();Pi(this,c,0,c.length,a.sa(),!1);b.stroke()}""!==this.g&&(a=Ri(a),Mi(this,a,2,2))}};
k.Xe=function(a){var b=a.D();if(dc(this.c,b)){if(this.b){Oi(this,this.b);var b=this.f,c=a.ka(),d=0,e=a.Eb(),f=a.sa();b.beginPath();var g,h;g=0;for(h=e.length;g<h;++g)d=Pi(this,c,d,e[g],f,!1);b.stroke()}""!==this.g&&(a=Si(a),Mi(this,a,a.length,2))}};k.Ze=function(a){if(dc(this.c,a.D())){if(this.b||this.a){this.a&&Ni(this,this.a);this.b&&Oi(this,this.b);var b=this.f;b.beginPath();Qi(this,a.Ob(),0,a.Eb(),a.sa());this.a&&b.fill();this.b&&b.stroke()}""!==this.g&&(a=td(a),Mi(this,a,2,2))}};
k.Ye=function(a){if(dc(this.c,a.D())){if(this.b||this.a){this.a&&Ni(this,this.a);this.b&&Oi(this,this.b);var b=this.f,c=Ti(a),d=0,e=a.c,f=a.sa(),g,h;b.beginPath();g=0;for(h=e.length;g<h;++g)d=Qi(this,c,d,e[g],f);this.a&&b.fill();this.b&&b.stroke()}""!==this.g&&(a=Ui(a),Mi(this,a,a.length,2))}};function Ni(a,b){var c=a.f,d=a.W;d?d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle):(c.fillStyle=b.fillStyle,a.W={fillStyle:b.fillStyle})}
function Oi(a,b){var c=a.f,d=a.Qa;d?(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),hf&&!eb(d.lineDash,b.lineDash)&&c.setLineDash(d.lineDash=b.lineDash),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle)):(c.lineCap=b.lineCap,hf&&c.setLineDash(b.lineDash),c.lineJoin=b.lineJoin,c.lineWidth=
b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.Qa={lineCap:b.lineCap,lineDash:b.lineDash,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle})}
k.Vb=function(a,b){if(a){var c=a.b;this.a={fillStyle:Ce(c?c:ni)}}else this.a=null;if(b){var c=b.a,d=b.c,e=b.g,f=b.i,g=b.f,h=b.j;this.b={lineCap:void 0!==d?d:"round",lineDash:e?e:oi,lineJoin:void 0!==f?f:"round",lineWidth:this.C*(void 0!==g?g:1),miterLimit:void 0!==h?h:10,strokeStyle:Ce(c?c:pi)}}else this.b=null};
k.Xb=function(a){if(a){var b=a.cc(),c=a.Tb(1),d=a.jc(),e=a.Gb();this.G=b[0];this.S=b[1];this.na=e[1];this.i=c;this.T=a.l;this.$a=d[0];this.fa=d[1];this.ra=a.T;this.Ib=a.o;this.j=a.c;this.oa=a.u;this.za=e[0]}else this.i=null};
k.Zb=function(a){if(a){var b=a.b;b?(b=b.b,this.l={fillStyle:Ce(b?b:ni)}):this.l=null;var c=a.f;if(c){var b=c.a,d=c.c,e=c.g,f=c.i,g=c.f,c=c.j;this.s={lineCap:void 0!==d?d:"round",lineDash:e?e:oi,lineJoin:void 0!==f?f:"round",lineWidth:void 0!==g?g:1,miterLimit:void 0!==c?c:10,strokeStyle:Ce(b?b:pi)}}else this.s=null;var b=a.g,d=a.c,e=a.i,f=a.s,g=a.j,c=a.a,h=a.Fa(),l=a.l;a=a.o;this.P={font:void 0!==b?b:"10px sans-serif",textAlign:void 0!==l?l:"center",textBaseline:void 0!==a?a:"middle"};this.g=void 0!==
h?h:"";this.Ka=void 0!==d?this.C*d:0;this.Aa=void 0!==e?this.C*e:0;this.La=void 0!==f?f:!1;this.ub=void 0!==g?g:0;this.o=this.C*(void 0!==c?c:1)}else this.g=""};function Vi(a){Pa.call(this);this.a=a}v(Vi,Pa);k=Vi.prototype;k.xa=da;k.Bc=function(a,b,c,d){a=Th(b.pixelToCoordinateTransform,a.slice());if(this.xa(a,b,gc,this))return c.call(d,this.a,null)};k.le=hc;k.Ue=function(a,b,c){return function(d,e){return Wi(a,b,d,e,function(a){c[d]||(c[d]={});c[d][a.ya.toString()]=a})}};k.Cm=function(a){a.target.U()===li&&Xi(this)};function Yi(a,b){var c=b.U();c!=li&&c!=ki&&w(b,"change",a.Cm,a);c==ji&&(b.load(),c=b.U());return c==li}
function Xi(a){var b=a.a;b.zb()&&"ready"==b.hf()&&a.v()}function Zi(a,b){b.qh()&&a.postRenderFunctions.push(function(a,b,e){b=ea(a).toString();a.Kc(e.viewState.projection,e.usedTiles[b])}.bind(null,b))}function $i(a,b){if(b){var c,d,e;d=0;for(e=b.length;d<e;++d)c=b[d],a[ea(c).toString()]=c}}function aj(a,b){var c=b.S;void 0!==c&&("string"===typeof c?a.logos[c]="":c&&(ha("string"==typeof c.href,44),ha("string"==typeof c.src,45),a.logos[c.src]=c.href))}
function bj(a,b,c,d){b=ea(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.ba<a.ba&&(a.ba=d.ba),d.da>a.da&&(a.da=d.da),d.ea<a.ea&&(a.ea=d.ea),d.ha>a.ha&&(a.ha=d.ha)):a[b][c]=d:(a[b]={},a[b][c]=d)}
    function cj(a, b, c, d, e, f, g, h, l, m) {
        var n = ea(b).toString();
        n in a.wantedTiles || (a.wantedTiles[n] = {});
        var p = a.wantedTiles[n];
        a = a.tileQueue;
        var q = c.minZoom, t, u, y, x, C, z;
        for (z = g; z >= q; --z)for (u = be(c, f, z, u), y = c.Ga(z), x = u.ba; x <= u.da; ++x)for (C = u.ea; C <= u.ha; ++C)g - z <= h ? (t = b.vc(z, x, C, d, e), 0 == t.U() && (p[t.Xa()] = !0, t.Xa() in a.a || a.c([t, n, ge(c, t.ya), y])), void 0 !== l && l.call(m, t)) : b.Vf(z, x, C, e)
    }
    function dj(a) {
        Vi.call(this, a);
        this.S = Oh()
    }
    v(dj, Vi);
    function ej(a, b, c) {
        var d = b.pixelRatio, e = b.size[0] * d, f = b.size[1] * d, g = b.viewState.rotation, h = Wb(c), l = Vb(c), m = Tb(c);
        c = Sb(c);
        Th(b.coordinateToPixelTransform, h);
        Th(b.coordinateToPixelTransform, l);
        Th(b.coordinateToPixelTransform, m);
        Th(b.coordinateToPixelTransform, c);
        a.save();
        qi(a, -g, e / 2, f / 2);
        a.beginPath();
        a.moveTo(h[0] * d, h[1] * d);
        a.lineTo(l[0] * d, l[1] * d);
        a.lineTo(m[0] * d, m[1] * d);
        a.lineTo(c[0] * d, c[1] * d);
        a.clip();
        qi(a, g, e / 2, f / 2)
    }
    dj.prototype.i=function(a,b,c){fj(this,"precompose",c,a,void 0);var d=this.f?this.f.a():null;if(d){var e=b.extent,f=void 0!==e;f&&ej(c,a,e);var e=this.s,g=c.globalAlpha;c.globalAlpha=b.opacity;c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[4]),Math.round(e[5]),Math.round(d.width*e[0]),Math.round(d.height*e[3]));c.globalAlpha=g;f&&c.restore()}gj(this,c,a)};
    function fj(a, b, c, d, e) {
        var f = a.a;
        if (Na(f, b)) {
            var g = d.size[0] * d.pixelRatio, h = d.size[1] * d.pixelRatio, l = d.viewState.rotation;
            qi(c, -l, g / 2, h / 2);
            a = void 0 !== e ? e : hj(a, d, 0);
            f.b(new Ih(b, new Ki(c, d.pixelRatio, d.extent, a, d.viewState.rotation), d, c, null));
            qi(c, l, g / 2, h / 2)
        }
    }
    function gj(a, b, c, d) {
        fj(a, "postcompose", b, c, d)
    }
    function hj(a, b, c) {
        var d = b.viewState, e = b.pixelRatio, f = e / d.resolution;
        return Xh(a.S, e * b.size[0] / 2, e * b.size[1] / 2, f, -f, -d.rotation, -d.center[0] + c, -d.center[1])
    }
    function ij() {
    }
    function jj(a, b, c, d) {
        this.ra = a;
        this.W = b;
        this.overlaps = d;
        this.f = 0;
        this.resolution = c;
        this.na = this.S = null;
        this.a = [];
        this.coordinates = [];
        this.Qa = Oh();
        this.b = [];
        this.Z = [];
        this.fa = Oh();
        this.$a = Oh()
    }
    v(jj, Ji);
    function kj(a,b,c,d,e,f,g){var h=a.coordinates.length,l=a.af();g&&(c+=e);g=[b[c],b[c+1]];var m=[NaN,NaN],n=!0,p,q,t;for(p=c+e;p<d;p+=e)m[0]=b[p],m[1]=b[p+1],t=Jb(l,m),t!==q?(n&&(a.coordinates[h++]=g[0],a.coordinates[h++]=g[1]),a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):1===t?(a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):n=!0,g[0]=m[0],g[1]=m[1],q=t;if(f&&n||p===c+e)a.coordinates[h++]=g[0],a.coordinates[h++]=g[1];return h}
function lj(a,b){a.S=[0,b,0];a.a.push(a.S);a.na=[0,b,0];a.b.push(a.na)}function mj(a,b,c){if(a.P){var d=Th(a.Qa,a.P.slice());b.translate(d[0],d[1]);b.rotate(c)}b.fill();a.P&&b.setTransform.apply(b,a.$a)}
function nj(a,b,c,d,e,f,g,h,l){var m;eb(d,a.Qa)?m=a.Z:(m=Nc(a.coordinates,0,a.coordinates.length,2,d,a.Z),Sh(a.Qa,d));d=!xa(f);for(var n=0,p=g.length,q,t,u=a.fa,y=a.$a,x,C,z,K,V=0,Z=0,Ra=a.a!=g||a.overlaps?0:200;n<p;){var F=g[n],Ga,ra,Oa,Sa;switch(F[0]){case 0:q=F[1];d&&f[ea(q).toString()]||!q.V()?n=F[2]:void 0===l||dc(l,q.V().D())?++n:n=F[2]+1;break;case 1:V>Ra&&(mj(a,b,e),V=0);Z>Ra&&(b.stroke(),Z=0);V||Z||b.beginPath();++n;break;case 2:q=F[1];t=m[q];F=m[q+1];z=m[q+2]-t;q=m[q+3]-F;q=Math.sqrt(z*
z+q*q);b.moveTo(t+q,F);b.arc(t,F,q,0,2*Math.PI,!0);++n;break;case 3:b.closePath();++n;break;case 4:q=F[1];t=F[2];Ga=F[3];ra=F[4]*c;Oa=F[5]*c;var Nb=F[6],Ub=F[7],oc=F[8],Gc=F[9];Sa=F[10];z=F[11];K=F[12];var pc=F[13],oe=F[14];for(Sa&&(z+=e);q<t;q+=2){F=m[q]-ra;Sa=m[q+1]-Oa;pc&&(F=Math.round(F),Sa=Math.round(Sa));if(1!=K||0!==z){var pe=F+ra,bd=Sa+Oa;Xh(u,pe,bd,K,K,z,-pe,-bd);b.setTransform.apply(b,u)}pe=b.globalAlpha;1!=Ub&&(b.globalAlpha=pe*Ub);var bd=oe+oc>Ga.width?Ga.width-oc:oe,Rn=Nb+Gc>Ga.height?
Ga.height-Gc:Nb;b.drawImage(Ga,oc,Gc,bd,Rn,F,Sa,bd*c,Rn*c);1!=Ub&&(b.globalAlpha=pe);1==K&&0===z||b.setTransform.apply(b,y)}++n;break;case 5:q=F[1];t=F[2];Oa=F[3];Nb=F[4]*c;Ub=F[5]*c;z=F[6];K=F[7]*c;Ga=F[8];ra=F[9];for((Sa=F[10])&&(z+=e);q<t;q+=2){F=m[q]+Nb;Sa=m[q+1]+Ub;if(1!=K||0!==z)Xh(u,F,Sa,K,K,z,-F,-Sa),b.setTransform.apply(b,u);oc=Oa.split("\n");Gc=oc.length;1<Gc?(pc=Math.round(1.5*b.measureText("M").width),Sa-=(Gc-1)/2*pc):pc=0;for(oe=0;oe<Gc;oe++)pe=oc[oe],ra&&b.strokeText(pe,F,Sa),Ga&&b.fillText(pe,
F,Sa),Sa+=pc;1==K&&0===z||b.setTransform.apply(b,y)}++n;break;case 6:if(void 0!==h&&(q=F[1],q=h(q)))return q;++n;break;case 7:Ra?V++:mj(a,b,e);++n;break;case 8:q=F[1];t=F[2];F=m[q];Sa=m[q+1];z=F+.5|0;K=Sa+.5|0;if(z!==x||K!==C)b.moveTo(F,Sa),x=z,C=K;for(q+=2;q<t;q+=2)if(F=m[q],Sa=m[q+1],z=F+.5|0,K=Sa+.5|0,q==t-2||z!==x||K!==C)b.lineTo(F,Sa),x=z,C=K;++n;break;case 9:a.P=F[2];V&&(mj(a,b,e),V=0);b.fillStyle=F[1];++n;break;case 10:x=void 0!==F[7]?F[7]:!0;C=F[2];Z&&(b.stroke(),Z=0);b.strokeStyle=F[1];b.lineWidth=
x?C*c:C;b.lineCap=F[3];b.lineJoin=F[4];b.miterLimit=F[5];hf&&b.setLineDash(F[6]);C=x=NaN;++n;break;case 11:b.font=F[1];b.textAlign=F[2];b.textBaseline=F[3];++n;break;case 12:Ra?Z++:b.stroke();++n;break;default:++n}}V&&mj(a,b,e);Z&&b.stroke()}jj.prototype.Za=function(a,b,c,d,e){nj(this,a,b,c,d,e,this.a,void 0,void 0)};
function oj(a){var b=a.b;b.reverse();var c,d=b.length,e,f,g=-1;for(c=0;c<d;++c)if(e=b[c],f=e[0],6==f)g=c;else if(0==f){e[2]=c;e=a.b;for(f=c;g<f;){var h=e[g];e[g]=e[f];e[f]=h;++g;--f}g=-1}}function pj(a,b){a.S[2]=a.a.length;a.S=null;a.na[2]=a.b.length;a.na=null;var c=[6,b];a.a.push(c);a.b.push(c)}jj.prototype.ke=da;jj.prototype.af=function(){return this.W};function qj(a,b,c,d){jj.call(this,a,b,c,d);this.j=this.za=null;this.G=this.B=this.C=this.u=this.T=this.s=this.o=this.l=this.i=this.c=this.g=void 0}v(qj,jj);
qj.prototype.rc=function(a,b){if(this.j){lj(this,b);var c=a.ka(),d=this.coordinates.length,c=kj(this,c,0,c.length,a.sa(),!1,!1);this.a.push([4,d,c,this.j,this.g,this.c,this.i,this.l,this.o,this.s,this.T,this.u,this.C,this.B,this.G]);this.b.push([4,d,c,this.za,this.g,this.c,this.i,this.l,this.o,this.s,this.T,this.u,this.C,this.B,this.G]);pj(this,b)}};
qj.prototype.qc=function(a,b){if(this.j){lj(this,b);var c=a.ka(),d=this.coordinates.length,c=kj(this,c,0,c.length,a.sa(),!1,!1);this.a.push([4,d,c,this.j,this.g,this.c,this.i,this.l,this.o,this.s,this.T,this.u,this.C,this.B,this.G]);this.b.push([4,d,c,this.za,this.g,this.c,this.i,this.l,this.o,this.s,this.T,this.u,this.C,this.B,this.G]);pj(this,b)}};qj.prototype.ke=function(){oj(this);this.c=this.g=void 0;this.j=this.za=null;this.G=this.B=this.u=this.T=this.s=this.o=this.l=this.C=this.i=void 0};
qj.prototype.Xb=function(a){var b=a.cc(),c=a.Gb(),d=a.pe(1),e=a.Tb(1),f=a.jc();this.g=b[0];this.c=b[1];this.za=d;this.j=e;this.i=c[1];this.l=a.l;this.o=f[0];this.s=f[1];this.T=a.T;this.u=a.o;this.C=a.c;this.B=a.u;this.G=c[0]};function rj(a,b,c,d){jj.call(this,a,b,c,d);this.c=null;this.g={hd:void 0,cd:void 0,dd:null,ed:void 0,fd:void 0,gd:void 0,nf:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(rj,jj);function sj(a,b,c,d,e){var f=a.coordinates.length;b=kj(a,b,c,d,e,!1,!1);f=[8,f,b];a.a.push(f);a.b.push(f);return d}k=rj.prototype;k.af=function(){this.c||(this.c=Eb(this.W),0<this.f&&Db(this.c,this.resolution*(this.f+1)/2,this.c));return this.c};
function tj(a){var b=a.g,c=b.strokeStyle,d=b.lineCap,e=b.lineDash,f=b.lineJoin,g=b.lineWidth,h=b.miterLimit;b.hd==c&&b.cd==d&&eb(b.dd,e)&&b.ed==f&&b.fd==g&&b.gd==h||(b.nf!=a.coordinates.length&&(a.a.push([12]),b.nf=a.coordinates.length),a.a.push([10,c,g,d,f,h,e],[1]),b.hd=c,b.cd=d,b.dd=e,b.ed=f,b.fd=g,b.gd=h)}
k.kd=function(a,b){var c=this.g,d=c.lineWidth;void 0!==c.strokeStyle&&void 0!==d&&(tj(this),lj(this,b),this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]),c=a.ka(),sj(this,c,0,c.length,a.sa()),this.b.push([12]),pj(this,b))};
k.Xe=function(a,b){var c=this.g,d=c.lineWidth;if(void 0!==c.strokeStyle&&void 0!==d){tj(this);lj(this,b);this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]);var c=a.Eb(),d=a.ka(),e=a.sa(),f=0,g,h;g=0;for(h=c.length;g<h;++g)f=sj(this,d,f,c[g],e);this.b.push([12]);pj(this,b)}};k.ke=function(){this.g.nf!=this.coordinates.length&&this.a.push([12]);oj(this);this.g=null};
k.Vb=function(a,b){var c=b.a;this.g.strokeStyle=Ce(c?c:pi);c=b.c;this.g.lineCap=void 0!==c?c:"round";c=b.g;this.g.lineDash=c?c:oi;c=b.i;this.g.lineJoin=void 0!==c?c:"round";c=b.f;this.g.lineWidth=void 0!==c?c:1;c=b.j;this.g.miterLimit=void 0!==c?c:10;this.g.lineWidth>this.f&&(this.f=this.g.lineWidth,this.c=null)};function uj(a,b,c,d){jj.call(this,a,b,c,d);this.c=null;this.g={og:void 0,hd:void 0,cd:void 0,dd:null,ed:void 0,fd:void 0,gd:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(uj,jj);
function vj(a,b,c,d,e){var f=a.g,g=void 0!==f.fillStyle,f=void 0!=f.strokeStyle,h=d.length,l=[1];a.a.push(l);a.b.push(l);for(l=0;l<h;++l){var m=d[l],n=a.coordinates.length;c=kj(a,b,c,m,e,!0,!f);c=[8,n,c];a.a.push(c);a.b.push(c);f&&(c=[3],a.a.push(c),a.b.push(c));c=m}b=[7];a.b.push(b);g&&a.a.push(b);f&&(g=[12],a.a.push(g),a.b.push(g));return c}k=uj.prototype;
k.Rd=function(a,b){var c=this.g,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){wj(this,a);lj(this,b);this.b.push([9,Ae(ni)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var e=a.ka(),d=this.coordinates.length;kj(this,e,0,e.length,a.sa(),!1,!1);e=[1];d=[2,d];this.a.push(e,d);this.b.push(e,d);d=[7];this.b.push(d);void 0!==c.fillStyle&&this.a.push(d);void 0!==c.strokeStyle&&(c=[12],this.a.push(c),this.b.push(c));pj(this,b)}};
k.Ze=function(a,b){var c=this.g;wj(this,a);lj(this,b);this.b.push([9,Ae(ni)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var c=a.Eb(),d=a.Ob();vj(this,d,0,c,a.sa());pj(this,b)};
k.Ye=function(a,b){var c=this.g,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){wj(this,a);lj(this,b);this.b.push([9,Ae(ni)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var c=a.c,d=Ti(a),e=a.sa(),f=0,g,h;g=0;for(h=c.length;g<h;++g)f=vj(this,d,f,c[g],e);pj(this,b)}};k.ke=function(){oj(this);this.g=null;var a=this.ra;if(0!==a){var b=this.coordinates,c,d;c=0;for(d=b.length;c<d;++c)b[c]=a*Math.round(b[c]/a)}};
k.af=function(){this.c||(this.c=Eb(this.W),0<this.f&&Db(this.c,this.resolution*(this.f+1)/2,this.c));return this.c};
k.Vb=function(a,b){var c=this.g;if(a){var d=a.b;c.fillStyle=Ce(d?d:ni)}else c.fillStyle=void 0;b?(d=b.a,c.strokeStyle=Ce(d?d:pi),d=b.c,c.lineCap=void 0!==d?d:"round",d=b.g,c.lineDash=d?d.slice():oi,d=b.i,c.lineJoin=void 0!==d?d:"round",d=b.f,c.lineWidth=void 0!==d?d:1,d=b.j,c.miterLimit=void 0!==d?d:10,c.lineWidth>this.f&&(this.f=c.lineWidth,this.c=null)):(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=void 0)};
    function wj(a, b) {
        var c = a.g, d = c.fillStyle, e = c.strokeStyle, f = c.lineCap, g = c.lineDash, h = c.lineJoin, l = c.lineWidth, m = c.miterLimit;
        if (void 0 !== d && ("string" !== typeof d || c.og != d)) {
            var n = [9, d];
            "string" !== typeof d && (d = b.D(), n.push([d[0], d[3]]));
            a.a.push(n);
            c.og = c.fillStyle
        }
        void 0 === e || c.hd == e && c.cd == f && c.dd == g && c.ed == h && c.fd == l && c.gd == m || (a.a.push([10, e, l, f, h, m, g]), c.hd = e, c.cd = f, c.dd = g, c.ed = h, c.fd = l, c.gd = m)
    }
    function xj(a, b, c, d) {
        jj.call(this, a, b, c, d);
        this.G = this.B = this.C = null;
        this.j = "";
        this.o = this.l = 0;
        this.s = void 0;
        this.u = this.T = 0;
        this.i = this.c = this.g = null
    }
    v(xj, jj);
    function yj(a,b,c,d,e){if(""!==a.j&&a.i&&(a.g||a.c)){if(a.g){var f=a.g,g=a.C;if(!g||g.fillStyle!=f.fillStyle){var h=[9,f.fillStyle];a.a.push(h);a.b.push(h);g?g.fillStyle=f.fillStyle:a.C={fillStyle:f.fillStyle}}}a.c&&(f=a.c,g=a.B,g&&g.lineCap==f.lineCap&&g.lineDash==f.lineDash&&g.lineJoin==f.lineJoin&&g.lineWidth==f.lineWidth&&g.miterLimit==f.miterLimit&&g.strokeStyle==f.strokeStyle||(h=[10,f.strokeStyle,f.lineWidth,f.lineCap,f.lineJoin,f.miterLimit,f.lineDash,!1],a.a.push(h),a.b.push(h),g?(g.lineCap=
f.lineCap,g.lineDash=f.lineDash,g.lineJoin=f.lineJoin,g.lineWidth=f.lineWidth,g.miterLimit=f.miterLimit,g.strokeStyle=f.strokeStyle):a.B={lineCap:f.lineCap,lineDash:f.lineDash,lineJoin:f.lineJoin,lineWidth:f.lineWidth,miterLimit:f.miterLimit,strokeStyle:f.strokeStyle}));f=a.i;g=a.G;g&&g.font==f.font&&g.textAlign==f.textAlign&&g.textBaseline==f.textBaseline||(h=[11,f.font,f.textAlign,f.textBaseline],a.a.push(h),a.b.push(h),g?(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline):a.G=
{font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});lj(a,e);f=a.coordinates.length;b=kj(a,b,0,c,d,!1,!1);b=[5,f,b,a.j,a.l,a.o,a.T,a.u,!!a.g,!!a.c,a.s];a.a.push(b);a.b.push(b);pj(a,e)}}
xj.prototype.Zb=function(a){if(a){var b=a.b;b?(b=b.b,b=Ce(b?b:ni),this.g?this.g.fillStyle=b:this.g={fillStyle:b}):this.g=null;var c=a.f;if(c){var b=c.a,d=c.c,e=c.g,f=c.i,g=c.f,c=c.j,d=void 0!==d?d:"round",e=e?e.slice():oi,f=void 0!==f?f:"round",g=void 0!==g?g:1,c=void 0!==c?c:10,b=Ce(b?b:pi);if(this.c){var h=this.c;h.lineCap=d;h.lineDash=e;h.lineJoin=f;h.lineWidth=g;h.miterLimit=c;h.strokeStyle=b}else this.c={lineCap:d,lineDash:e,lineJoin:f,lineWidth:g,miterLimit:c,strokeStyle:b}}else this.c=null;
var l=a.g,b=a.c,d=a.i,e=a.s,g=a.j,c=a.a,f=a.Fa(),h=a.l,m=a.o;a=void 0!==l?l:"10px sans-serif";h=void 0!==h?h:"center";m=void 0!==m?m:"middle";this.i?(l=this.i,l.font=a,l.textAlign=h,l.textBaseline=m):this.i={font:a,textAlign:h,textBaseline:m};this.j=void 0!==f?f:"";this.l=void 0!==b?b:0;this.o=void 0!==d?d:0;this.s=void 0!==e?e:!1;this.T=void 0!==g?g:0;this.u=void 0!==c?c:1}else this.j=""};var zj=["Polygon","LineString","Image","Text"];function Aj(a,b,c,d,e){this.s=a;this.f=b;this.l=d;this.o=c;this.c=e;this.a={};this.i=De(1,1);this.j=Oh()}v(Aj,ij);function Bj(a){for(var b in a.a){var c=a.a[b],d;for(d in c)c[d].ke()}}Aj.prototype.xa=function(a,b,c,d,e){var f=Xh(this.j,.5,.5,1/b,-1/b,-c,-a[0],-a[1]),g=this.i;g.clearRect(0,0,1,1);var h;void 0!==this.c&&(h=Bb(),Cb(h,a),Db(h,b*this.c,h));return Cj(this,g,f,c,d,function(a){if(0<g.getImageData(0,0,1,1).data[3]){if(a=e(a))return a;g.clearRect(0,0,1,1)}},h)};
Aj.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0",d=this.a[c];void 0===d&&(d={},this.a[c]=d);c=d[b];void 0===c&&(c=new Dj[b](this.s,this.f,this.o,this.l),d[b]=c);return c};Aj.prototype.g=function(){return xa(this.a)};
Aj.prototype.Za=function(a,b,c,d,e,f){var g=Object.keys(this.a).map(Number);g.sort(Ya);var h=this.f,l=h[0],m=h[1],n=h[2],h=h[3],l=[l,m,l,h,n,h,n,m];Nc(l,0,8,2,c,l);a.save();a.beginPath();a.moveTo(l[0],l[1]);a.lineTo(l[2],l[3]);a.lineTo(l[4],l[5]);a.lineTo(l[6],l[7]);a.clip();f=f?f:zj;for(var p,q,l=0,m=g.length;l<m;++l)for(p=this.a[g[l].toString()],n=0,h=f.length;n<h;++n)q=p[f[n]],void 0!==q&&q.Za(a,b,c,d,e);a.restore()};
function Cj(a,b,c,d,e,f,g){var h=Object.keys(a.a).map(Number);h.sort(function(a,b){return b-a});var l,m,n,p,q;l=0;for(m=h.length;l<m;++l)for(p=a.a[h[l].toString()],n=zj.length-1;0<=n;--n)if(q=p[zj[n]],void 0!==q&&(q=nj(q,b,1,c,d,e,q.b,f,g)))return q}var Dj={Image:qj,LineString:rj,Polygon:uj,Text:xj};function Ej(a,b){return ea(a)-ea(b)}function Fj(a,b){var c=.5*a/b;return c*c}function Gj(a,b,c,d,e,f){var g=!1,h,l;if(h=c.a)l=h.vd(),l==li||l==ki?h.Uf(e,f):(l==ji&&h.load(),h.pf(e,f),g=!0);if(e=(0,c.c)(b))d=e.pd(d),(0,Hj[d.X()])(a,d,c,b);return g}
var Hj={Point:function(a,b,c,d){var e=c.a;if(e){if(e.vd()!=li)return;var f=a.b(c.b,"Image");f.Xb(e);f.rc(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),yj(a,b.ka(),2,2,d)},LineString:function(a,b,c,d){var e=c.g;if(e){var f=a.b(c.b,"LineString");f.Vb(null,e);f.kd(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),yj(a,Ri(b),2,2,d)},Polygon:function(a,b,c,d){var e=c.f,f=c.g;if(e||f){var g=a.b(c.b,"Polygon");g.Vb(e,f);g.Ze(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),yj(a,td(b),2,2,d)},MultiPoint:function(a,b,c,d){var e=
c.a;if(e){if(e.vd()!=li)return;var f=a.b(c.b,"Image");f.Xb(e);f.qc(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),c=b.ka(),yj(a,c,c.length,b.sa(),d)},MultiLineString:function(a,b,c,d){var e=c.g;if(e){var f=a.b(c.b,"LineString");f.Vb(null,e);f.Xe(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),b=Si(b),yj(a,b,b.length,2,d)},MultiPolygon:function(a,b,c,d){var e=c.f,f=c.g;if(f||e){var g=a.b(c.b,"Polygon");g.Vb(e,f);g.Ye(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),b=Ui(b),yj(a,b,b.length,2,d)},GeometryCollection:function(a,
b,c,d){b=b.f;var e,f;e=0;for(f=b.length;e<f;++e)(0,Hj[b[e].X()])(a,b[e],c,d)},Circle:function(a,b,c,d){var e=c.f,f=c.g;if(e||f){var g=a.b(c.b,"Polygon");g.Vb(e,f);g.Rd(b,d)}if(e=c.Fa())a=a.b(c.b,"Text"),a.Zb(e),yj(a,b.td(),2,2,d)}};function Ij(a,b,c,d,e,f){this.c=void 0!==f?f:null;gi.call(this,a,b,c,void 0!==f?ji:li,d);this.g=e}v(Ij,gi);Ij.prototype.i=function(a){this.state=a?ki:li;hi(this)};Ij.prototype.load=function(){this.state==ji&&(this.state=mi,hi(this),this.c(this.i.bind(this)))};Ij.prototype.a=function(){return this.g};var Jj,Kj=-1<navigator.userAgent.indexOf("OPR"),Lj=-1<navigator.userAgent.indexOf("Edge");Jj=!(!navigator.userAgent.match("CriOS")&&"chrome"in window&&"Google Inc."===navigator.vendor&&0==Kj&&0==Lj);function Mj(a,b,c,d){var e=Kc(c,b,a);c=b.getPointResolution(d,c);b=b.dc();void 0!==b&&(c*=b);b=a.dc();void 0!==b&&(c/=b);a=a.getPointResolution(c,e)/c;isFinite(a)&&0<a&&(c/=a);return c}function Nj(a,b,c,d){a=c-a;b=d-b;var e=Math.sqrt(a*a+b*b);return[Math.round(c+a/e),Math.round(d+b/e)]}
function Oj(a,b,c,d,e,f,g,h,l,m,n){var p=De(Math.round(c*a),Math.round(c*b));if(0===l.length)return p.canvas;p.scale(c,c);var q=Bb();l.forEach(function(a){Qb(q,a.extent)});var t=De(Math.round(c*Zb(q)/d),Math.round(c*$b(q)/d)),u=c/d;l.forEach(function(a){t.drawImage(a.image,m,m,a.image.width-2*m,a.image.height-2*m,(a.extent[0]-q[0])*u,-(a.extent[3]-q[3])*u,Zb(a.extent)*u,$b(a.extent)*u)});var y=Wb(g);h.f.forEach(function(a){var b=a.source,e=a.target,g=b[1][0],h=b[1][1],l=b[2][0],m=b[2][1];a=(e[0][0]-
y[0])/f;var n=-(e[0][1]-y[1])/f,u=(e[1][0]-y[0])/f,ra=-(e[1][1]-y[1])/f,Oa=(e[2][0]-y[0])/f,Sa=-(e[2][1]-y[1])/f,e=b[0][0],b=b[0][1],g=g-e,h=h-b,l=l-e,m=m-b;a:{g=[[g,h,0,0,u-a],[l,m,0,0,Oa-a],[0,0,g,h,ra-n],[0,0,l,m,Sa-n]];h=g.length;for(l=0;l<h;l++){for(var m=l,Nb=Math.abs(g[l][l]),Ub=l+1;Ub<h;Ub++){var oc=Math.abs(g[Ub][l]);oc>Nb&&(Nb=oc,m=Ub)}if(0===Nb){g=null;break a}Nb=g[m];g[m]=g[l];g[l]=Nb;for(m=l+1;m<h;m++)for(Nb=-g[m][l]/g[l][l],Ub=l;Ub<h+1;Ub++)g[m][Ub]=l==Ub?0:g[m][Ub]+Nb*g[l][Ub]}l=Array(h);
for(m=h-1;0<=m;m--)for(l[m]=g[m][h]/g[m][m],Nb=m-1;0<=Nb;Nb--)g[Nb][h]-=g[Nb][m]*l[m];g=l}g&&(p.save(),p.beginPath(),Jj?(l=(a+u+Oa)/3,m=(n+ra+Sa)/3,h=Nj(l,m,a,n),u=Nj(l,m,u,ra),Oa=Nj(l,m,Oa,Sa),p.moveTo(u[0],u[1]),p.lineTo(h[0],h[1]),p.lineTo(Oa[0],Oa[1])):(p.moveTo(u,ra),p.lineTo(a,n),p.lineTo(Oa,Sa)),p.clip(),p.transform(g[0],g[2],g[1],g[3],a,n),p.translate(q[0]-e,q[3]-b),p.scale(d/c,-d/c),p.drawImage(t.canvas,0,0),p.restore())});n&&(p.save(),p.strokeStyle="black",p.lineWidth=1,h.f.forEach(function(a){var b=
    a.target;
    a = (b[0][0] - y[0]) / f;
    var c = -(b[0][1] - y[1]) / f, d = (b[1][0] - y[0]) / f, e = -(b[1][1] - y[1]) / f, g = (b[2][0] - y[0]) / f, b = -(b[2][1] - y[1]) / f;
    p.beginPath();
    p.moveTo(d, e);
    p.lineTo(a, c);
    p.lineTo(g, b);
    p.closePath();
    p.stroke()
}), p.restore());
    return p.canvas
}
    function Pj(a, b, c, d, e) {
        this.g = a;
        this.c = b;
        var f = {}, g = Ic(this.c, this.g);
        this.a = function (a) {
            var b = a[0] + "/" + a[1];
            f[b] || (f[b] = g(a));
            return f[b]
        };
        this.i = d;
        this.s = e * e;
        this.f = [];
        this.l = !1;
        this.o = this.g.a && !!d && !!this.g.D() && Zb(d) == Zb(this.g.D());
        this.b = this.g.D() ? Zb(this.g.D()) : null;
        this.j = this.c.D() ? Zb(this.c.D()) : null;
        a = Wb(c);
        b = Vb(c);
        d = Tb(c);
        c = Sb(c);
        e = this.a(a);
        var h = this.a(b), l = this.a(d), m = this.a(c);
        Qj(this, a, b, d, c, e, h, l, m, 10);
        if (this.l) {
            var n = Infinity;
            this.f.forEach(function (a) {
                n = Math.min(n, a.source[0][0],
                    a.source[1][0],a.source[2][0])});this.f.forEach(function(a){if(Math.max(a.source[0][0],a.source[1][0],a.source[2][0])-n>this.b/2){var b=[[a.source[0][0],a.source[0][1]],[a.source[1][0],a.source[1][1]],[a.source[2][0],a.source[2][1]]];b[0][0]-n>this.b/2&&(b[0][0]-=this.b);b[1][0]-n>this.b/2&&(b[1][0]-=this.b);b[2][0]-n>this.b/2&&(b[2][0]-=this.b);Math.max(b[0][0],b[1][0],b[2][0])-Math.min(b[0][0],b[1][0],b[2][0])<this.b/2&&(a.source=b)}},this)}f={}}
function Qj(a,b,c,d,e,f,g,h,l,m){var n=Ab([f,g,h,l]),p=a.b?Zb(n)/a.b:null,q=a.b,t=a.g.a&&.5<p&&1>p,u=!1;if(0<m){if(a.c.g&&a.j)var y=Ab([b,c,d,e]),u=u|.25<Zb(y)/a.j;!t&&a.g.g&&p&&(u|=.25<p)}if(u||!a.i||dc(n,a.i)){if(!(u||isFinite(f[0])&&isFinite(f[1])&&isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(n=a.a([(b[0]+d[0])/2,(b[1]+d[1])/2]),q=t?(oa(f[0],q)+oa(h[0],q))/2-oa(n[0],q):(f[0]+h[0])/2-n[0],n=(f[1]+h[1])/2-n[1],
u=q*q+n*n>a.s),u)){Math.abs(b[0]-d[0])<=Math.abs(b[1]-d[1])?(t=[(c[0]+d[0])/2,(c[1]+d[1])/2],q=a.a(t),n=[(e[0]+b[0])/2,(e[1]+b[1])/2],p=a.a(n),Qj(a,b,c,t,n,f,g,q,p,m-1),Qj(a,n,t,d,e,p,q,h,l,m-1)):(t=[(b[0]+c[0])/2,(b[1]+c[1])/2],q=a.a(t),n=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=a.a(n),Qj(a,b,t,n,e,f,q,p,l,m-1),Qj(a,t,c,d,n,q,g,h,p,m-1));return}if(t){if(!a.o)return;a.l=!0}a.f.push({source:[f,h,l],target:[b,d,e]});a.f.push({source:[f,g,h],target:[b,c,d]})}}
    function Rj(a) {
        var b = Bb();
        a.f.forEach(function (a) {
            a = a.source;
            Cb(b, a[0]);
            Cb(b, a[1]);
            Cb(b, a[2])
        });
        return b
    }
    function Sj(a, b, c, d, e, f) {
        this.T = b;
        this.s = a.D();
        var g = b.D(), h = g ? cc(c, g) : c, g = Mj(a, b, ac(h), d);
        this.l = new Pj(a, b, h, this.s, .5 * g);
        this.c = d;
        this.g = c;
        a = Rj(this.l);
        this.o = (this.sb = f(a, g, e)) ? this.sb.f : 1;
        this.Cd = this.i = null;
        e = li;
        f = [];
        this.sb && (e = ji, f = this.sb.j);
        gi.call(this, c, d, this.o, e, f)
    }
    v(Sj, gi);
    Sj.prototype.la = function () {
        this.state == mi && (za(this.Cd), this.Cd = null);
        gi.prototype.la.call(this)
    };
    Sj.prototype.a = function () {
        return this.i
    };
    Sj.prototype.Bd=function(){var a=this.sb.U();a==li&&(this.i=Oj(Zb(this.g)/this.c,$b(this.g)/this.c,this.o,this.sb.resolution,0,this.c,this.g,this.l,[{extent:this.sb.D(),image:this.sb.a()}],0));this.state=a;hi(this)};Sj.prototype.load=function(){if(this.state==ji){this.state=mi;hi(this);var a=this.sb.U();a==li||a==ki?this.Bd():(this.Cd=w(this.sb,"change",function(){var a=this.sb.U();if(a==li||a==ki)za(this.Cd),this.Cd=null,this.Bd()},this),this.sb.load())}};function Tj(a){Ua.call(this);this.f=qc(a.projection);this.j=Uj(a.attributions);this.S=a.logo;this.Ka=void 0!==a.state?a.state:"ready";this.G=void 0!==a.wrapX?a.wrapX:!1}v(Tj,Ua);function Uj(a){if("string"===typeof a)return[new le({html:a})];if(a instanceof le)return[a];if(Array.isArray(a)){for(var b=a.length,c=Array(b),d=0;d<b;d++){var e=a[d];c[d]="string"===typeof e?new le({html:e}):e}return c}return null}k=Tj.prototype;k.xa=da;k.va=function(){return this.j};k.ua=function(){return this.S};k.wa=function(){return this.f};
    k.U = function () {
        return this.Ka
    };
    k.ta = function () {
        this.v()
    };
    k.qa = function (a) {
        this.j = Uj(a);
        this.v()
    };
    function Vj(a, b) {
        a.Ka = b;
        a.v()
    }
    function Wj(a) {
        Tj.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection,
            state: a.state
        });
        this.C = void 0 !== a.resolutions ? a.resolutions : null;
        this.a = null;
        this.ra = 0
    }
    v(Wj, Tj);
    function Xj(a, b) {
        a.C && (b = a.C[$a(a.C, b, 0)]);
        return b
    }
    Wj.prototype.W=function(a,b,c,d){var e=this.f;if(e&&d&&!Hc(e,d)){if(this.a){if(this.ra==this.g&&Hc(this.a.T,d)&&this.a.resolution==b&&this.a.f==c&&Pb(this.a.D(),a))return this.a;Ja(this.a);this.a=null}this.a=new Sj(e,d,a,b,c,function(a,b,c){return this.Lc(a,b,c,e)}.bind(this));this.ra=this.g;return this.a}e&&(d=e);return this.Lc(a,b,c,d)};Wj.prototype.o=function(a){a=a.target;switch(a.U()){case mi:this.b(new Yj(Zj,a));break;case li:this.b(new Yj(ak,a));break;case ki:this.b(new Yj(bk,a))}};
function ck(a,b){a.a().src=b}function Yj(a,b){Ka.call(this,a);this.image=b}v(Yj,Ka);var Zj="imageloadstart",ak="imageloadend",bk="imageloaderror";function dk(a){Wj.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions,state:a.state});this.fa=a.canvasFunction;this.P=null;this.Z=0;this.oa=void 0!==a.ratio?a.ratio:1.5}v(dk,Wj);dk.prototype.Lc=function(a,b,c,d){b=Xj(this,b);var e=this.P;if(e&&this.Z==this.g&&e.resolution==b&&e.f==c&&Ib(e.D(),a))return e;a=a.slice();ec(a,this.oa);(d=this.fa(a,b,c,[Zb(a)/b*c,$b(a)/b*c],d))&&(e=new Ij(a,b,c,this.j,d));this.P=e;this.Z=this.g;return e};function ek(a){this.c=a.source;this.La=Oh();this.i=De();this.l=[0,0];this.Aa=void 0==a.renderBuffer?100:a.renderBuffer;this.u=null;dk.call(this,{attributions:a.attributions,canvasFunction:this.rj.bind(this),logo:a.logo,projection:a.projection,ratio:a.ratio,resolutions:a.resolutions,state:this.c.U()});this.B=null;this.s=void 0;this.nh(a.style);w(this.c,"change",this.Tm,this)}v(ek,dk);k=ek.prototype;
k.rj=function(a,b,c,d,e){var f=new Aj(.5*b/c,a,b,this.c.Aa,this.Aa);this.c.rd(a,b,e);var g=!1;this.c.Kb(a,function(a){var d;if(!(d=g)){var e;(d=a.zc())?e=d.call(a,b):this.s&&(e=this.s(a,b));if(e){var n,p=!1;Array.isArray(e)||(e=[e]);d=0;for(n=e.length;d<n;++d)p=Gj(f,a,e[d],Fj(b,c),this.Sm,this)||p;d=p}else d=!1}g=d},this);Bj(f);if(g)return null;this.l[0]!=d[0]||this.l[1]!=d[1]?(this.i.canvas.width=d[0],this.i.canvas.height=d[1],this.l[0]=d[0],this.l[1]=d[1]):this.i.clearRect(0,0,d[0],d[1]);a=fk(this,
ac(a),b,c,d);f.Za(this.i,c,a,0,{});this.u=f;return this.i.canvas};k.xa=function(a,b,c,d,e){if(this.u){var f={};return this.u.xa(a,b,0,d,function(a){var b=ea(a).toString();if(!(b in f))return f[b]=!0,e(a)})}};k.Pm=function(){return this.c};k.Qm=function(){return this.B};k.Rm=function(){return this.s};function fk(a,b,c,d,e){c=d/c;return Xh(a.La,e[0]/2,e[1]/2,c,-c,0,-b[0],-b[1])}k.Sm=function(){this.v()};k.Tm=function(){Vj(this,this.c.U())};
k.nh=function(a){this.B=void 0!==a?a:Ci;this.s=a?Ai(this.B):void 0;this.v()};function gk(a){dj.call(this,a);this.f=null;this.s=Oh();this.c=this.l=null}v(gk,dj);gk.prototype.xa=function(a,b,c,d){var e=this.a;return e.ga().xa(a,b.viewState.resolution,b.viewState.rotation,b.skippedFeatureUids,function(a){return c.call(d,a,e)})};
gk.prototype.Bc=function(a,b,c,d){if(this.f&&this.f.a())if(this.a.ga()instanceof ek){if(a=Th(b.pixelToCoordinateTransform,a.slice()),this.xa(a,b,gc,this))return c.call(d,this.a,null)}else if(this.l||(this.l=Yh(this.s.slice())),b=Th(this.l,a.slice()),this.c||(this.c=De(1,1)),this.c.clearRect(0,0,1,1),this.c.drawImage(this.f?this.f.a():null,b[0],b[1],1,1,0,0,1,1),b=this.c.getImageData(0,0,1,1).data,0<b[3])return c.call(d,this.a,b)};
gk.prototype.j=function(a,b){var c=a.pixelRatio,d=a.viewState,e=d.center,f=d.resolution,g=this.a.ga(),h=a.viewHints,l=a.extent;void 0!==b.extent&&(l=cc(l,b.extent));h[0]||h[1]||Yb(l)||(d=g.W(l,f,c,d.projection))&&Yi(this,d)&&(this.f=d);if(this.f){var d=this.f,h=d.D(),l=d.resolution,m=d.f,f=c*l/(f*m),n=Ph(this.s);Wh(n,c*a.size[0]/2,c*a.size[1]/2);Vh(n,f,f);Wh(n,m*(h[0]-e[0])/l,m*(e[1]-h[3])/l);this.l=null;$i(a.attributions,d.j);aj(a,g)}return!!this.f};function hk(a){dj.call(this,a);this.c=De();this.l=[];this.o=Bb();this.P=[0,0,0];this.G=Oh();this.B=0}v(hk,dj);hk.prototype.i=function(a,b,c){var d=hj(this,a,0);fj(this,"precompose",c,a,d);ik(this,c,a,b);gj(this,c,a,d)};
hk.prototype.j=function(a,b){function c(a){a=a.U();return a==jg||4==a||3==a&&!t}var d=a.pixelRatio,e=a.viewState,f=e.projection,g=this.a,h=g.ga(),l=h.pb(f),e=l.wc(e.resolution,this.B),m=l.Ga(e),n=a.extent;void 0!==b.extent&&(n=cc(n,b.extent));if(Yb(n))return!1;var m=ee(l,n,m),p={};p[e]={};var q=this.Ue(h,f,p),t=g.c(),u=this.o,y=new Qd(0,0,0,0),x,C,z,K;for(z=m.ba;z<=m.da;++z)for(K=m.ea;K<=m.ha;++K)x=h.vc(e,z,K,d,f),c(x)||(x=ig(x)),c(x)?p[e][x.ya.toString()]=x:(C=ce(l,x.ya,q,y,u),C||(x=de(l,x.ya,y,
u))&&q(e+1,x));q=Object.keys(p).map(Number);q.sort(Ya);u=this.l;u.length=0;var V,y=0;for(z=q.length;y<z;++y)for(V in x=q[y],K=p[x],K)x=K[V],x.U()==jg&&u.push(x);bj(a.usedTiles,h,e,m);cj(a,h,l,d,f,n,e,g.f());Zi(a,h);aj(a,h);return!0};hk.prototype.Bc=function(a,b,c,d){var e=this.c.canvas,f=b.size,g=b.pixelRatio;e.width=f[0]*g;e.height=f[1]*g;this.i(b,wh(this.a),this.c);a=this.c.getImageData(a[0],a[1],1,1).data;if(0<a[3])return c.call(d,this.a,a)};
function ik(a,b,c,d){var e=a.l;if(0!==e.length){var f=c.pixelRatio,g=c.viewState,h=g.center,l=g.projection,m=g.rotation,n=c.size,p=Math.round(f*n[0]/2),n=Math.round(f*n[1]/2),g=f/g.resolution,q=a.a,t=q.ga(),u=t.gb(f)*t.df(l),y=t.pb(l),q=Na(q,"render"),x=b,C=1,z,K,V;if(m||q){x=a.c;z=x.canvas;var C=t.gb(f)/f,Z=b.canvas.width*C;K=b.canvas.height*C;V=Math.round(Math.sqrt(Z*Z+K*K));z.width!=V?z.width=z.height=V:x.clearRect(0,0,V,V);z=(V-Z)/2/C;K=(V-K)/2/C;g*=C;p=Math.round(C*(p+z));n=Math.round(C*(n+K))}Z=
x.globalAlpha;x.globalAlpha=d.opacity;var Ra,F=t.gf(l)&&1==d.opacity;F||(e.reverse(),Ra=[]);var Ga=d.extent;if(d=void 0!==Ga){var ra=Wb(Ga),Oa=Vb(Ga),Sa=Tb(Ga),Ga=Sb(Ga);Th(c.coordinateToPixelTransform,ra);Th(c.coordinateToPixelTransform,Oa);Th(c.coordinateToPixelTransform,Sa);Th(c.coordinateToPixelTransform,Ga);var Nb=z||0,Ub=K||0;x.save();var oc=x.canvas.width/2,Gc=x.canvas.height/2;qi(x,-m,oc,Gc);x.beginPath();x.moveTo(C*(ra[0]*f+Nb),C*(ra[1]*f+Ub));x.lineTo(C*(Oa[0]*f+Nb),C*(Oa[1]*f+Ub));x.lineTo(C*
(Sa[0]*f+Nb),C*(Sa[1]*f+Ub));x.lineTo(C*(Ga[0]*f+Nb),C*(Ga[1]*f+Ub));x.clip();qi(x,m,oc,Gc)}ra=0;for(Oa=e.length;ra<Oa;++ra){var Sa=e[ra],Ga=Sa.ya,Gc=y.Ia(Ga,a.o),oc=Ga[0],pc=Sb(y.Ia(y.Zd(h,oc,a.P))),Ga=Math.round(Zb(Gc)*g),Nb=Math.round($b(Gc)*g),Ub=Math.round((Gc[0]-pc[0])*g/Ga)*Ga+p+Math.round((pc[0]-h[0])*g),Gc=Math.round((pc[1]-Gc[3])*g/Nb)*Nb+n+Math.round((h[1]-pc[1])*g);if(!F){pc=[Ub,Gc,Ub+Ga,Gc+Nb];x.save();for(var oe=0,pe=Ra.length;oe<pe;++oe){var bd=Ra[oe];dc(pc,bd)&&(x.beginPath(),x.moveTo(pc[0],
    pc[1]), x.lineTo(pc[0], pc[3]), x.lineTo(pc[2], pc[3]), x.lineTo(pc[2], pc[1]), x.moveTo(bd[0], bd[1]), x.lineTo(bd[2], bd[1]), x.lineTo(bd[2], bd[3]), x.lineTo(bd[0], bd[3]), x.closePath(), x.clip())
}
    Ra.push(pc)
}
    oc = t.kf(oc, f, l);
    x.drawImage(Sa.qb(), u, u, oc[0], oc[1], Ub, Gc, Ga, Nb);
    F || x.restore()
}
    d && x.restore();
    q && (e = z - p / C + p, f = K - n / C + n, h = Xh(a.G, V / 2 - e, V / 2 - f, g, -g, -m, -h[0] + e / g, -h[1] - f / g), fj(a, "render", x, c, h));
    (m || q) && b.drawImage(x.canvas, -Math.round(z), -Math.round(K), V / C, V / C);
    x.globalAlpha = Z
}
}
    function jk(a) {
        dj.call(this, a);
        this.c = !1;
        this.B = -1;
        this.C = NaN;
        this.T = Bb();
        this.l = this.u = null;
        this.o = De()
    }
    v(jk, dj);
    jk.prototype.i=function(a,b,c){var d=a.extent,e=a.pixelRatio,f=b.sd?a.skippedFeatureUids:{},g=a.viewState,h=g.projection,g=g.rotation,l=h.D(),m=this.a.ga(),n=hj(this,a,0);fj(this,"precompose",c,a,n);var p=b.extent,q=void 0!==p;q&&ej(c,a,p);if((p=this.l)&&!p.g()){var t=0,u=0,y;if(Na(this.a,"render")){y=c.canvas.width;var x=c.canvas.height;if(g){var C=Math.round(Math.sqrt(y*y+x*x)),t=(C-y)/2,u=(C-x)/2;y=x=C}this.o.canvas.width=y;this.o.canvas.height=x;y=this.o}else y=c;x=y.globalAlpha;y.globalAlpha=
b.opacity;y!=c&&y.translate(t,u);b=a.size[0]*e;C=a.size[1]*e;qi(y,-g,b/2,C/2);p.Za(y,e,n,g,f);if(m.G&&h.a&&!Ib(l,d)){for(var h=d[0],m=Zb(l),z=0;h<l[0];)--z,n=m*z,n=hj(this,a,n),p.Za(y,e,n,g,f),h+=m;z=0;for(h=d[2];h>l[2];)++z,n=m*z,n=hj(this,a,n),p.Za(y,e,n,g,f),h-=m;n=hj(this,a,0)}qi(y,g,b/2,C/2);y!=c&&(fj(this,"render",y,a,n),c.drawImage(y.canvas,-t,-u),y.translate(-t,-u));y.globalAlpha=x}q&&c.restore();gj(this,c,a,n)};
jk.prototype.xa=function(a,b,c,d){if(this.l){var e=this.a,f={};return this.l.xa(a,b.viewState.resolution,b.viewState.rotation,{},function(a){var b=ea(a).toString();if(!(b in f))return f[b]=!0,c.call(d,a,e)})}};jk.prototype.G=function(){Xi(this)};
jk.prototype.j=function(a){function b(a){var b,d=a.zc();d?b=d.call(a,m):(d=c.j)&&(b=d(a,m));if(b){if(b){d=!1;if(Array.isArray(b))for(var e=0,f=b.length;e<f;++e)d=Gj(q,a,b[e],Fj(m,n),this.G,this)||d;else d=Gj(q,a,b,Fj(m,n),this.G,this)||d;a=d}else a=!1;this.c=this.c||a}}var c=this.a,d=c.ga();$i(a.attributions,d.j);aj(a,d);var e=a.viewHints[0],f=a.viewHints[1],g=c.Z,h=c.fa;if(!this.c&&!g&&e||!h&&f)return!0;var l=a.extent,h=a.viewState,e=h.projection,m=h.resolution,n=a.pixelRatio,f=c.g,p=c.i,g=c.get("renderOrder");
void 0===g&&(g=Ej);l=Db(l,p*m);p=h.projection.D();d.G&&h.projection.a&&!Ib(p,a.extent)&&(a=Math.max(Zb(l)/2,Zb(p)),l[0]=p[0]-a,l[2]=p[2]+a);if(!this.c&&this.C==m&&this.B==f&&this.u==g&&Ib(this.T,l))return!0;this.l=null;this.c=!1;var q=new Aj(.5*m/n,l,m,d.Aa,c.i);d.rd(l,m,e);if(g){var t=[];d.Kb(l,function(a){t.push(a)},this);t.sort(g);t.forEach(b,this)}else d.Kb(l,b,this);Bj(q);this.C=m;this.B=f;this.u=g;this.T=l;this.l=q;return!0};function kk(a){hk.call(this,a);this.u=!1;this.T=Oh();this.B=a.u==Gi?1:0}v(kk,hk);var lk={image:zj,hybrid:["Polygon","LineString"]},mk={hybrid:["Image","Text"],vector:zj};
kk.prototype.i=function(a,b,c){var d=hj(this,a,0);fj(this,"precompose",c,a,d);var e=b.extent,f=void 0!==e;f&&ej(c,a,e);e=this.a.u;e!==Gi&&ik(this,c,a,b);if(e!==Ei){var g=this.a,e=mk[g.u],h=a.pixelRatio,l=b.sd?a.skippedFeatureUids:{},m=a.viewState,n=m.center,p=m.rotation,q=a.size,m=h/m.resolution,t=g.ga(),u=t.gb(),y=hj(this,a,0);Na(g,"render")?(this.c.canvas.width=c.canvas.width,this.c.canvas.height=c.canvas.height,g=this.c):g=c;var x=g.globalAlpha;g.globalAlpha=b.opacity;b=this.l;var t=t.tileGrid,
C,z,K,V,Z,Ra,F,Ga;z=0;for(K=b.length;z<K;++z)V=b[z],F=V.f,Z=t.Ia(V.ya,this.o),C=V.ya[0],Ra="tile-pixels"==V.l.yb(),C=t.Ga(C),Ga=C/u,C=Math.round(h*q[0]/2),V=Math.round(h*q[1]/2),Ra?(Z=Wb(Z),Ph(this.T),Z=Xh(this.T,C,V,m*Ga,m*Ga,p,(Z[0]-n[0])/Ga,(n[1]-Z[1])/Ga)):Z=y,qi(g,-p,C,V),F.Ad.Za(g,h,Z,p,l,e),qi(g,p,C,V);g!=c&&(fj(this,"render",g,a,y),c.drawImage(g.canvas,0,0));g.globalAlpha=x}f&&c.restore();gj(this,c,a,d)};
function nk(a,b,c){function d(a){var b,c=a.zc();c?b=c.call(a,u):(c=e.j)&&(b=c(a,u));if(b){Array.isArray(b)||(b=[b]);var c=z,d=C;if(b){var f=!1;if(Array.isArray(b))for(var g=0,h=b.length;g<h;++g)f=Gj(d,a,b[g],c,this.C,this)||f;else f=Gj(d,a,b,c,this.C,this)||f;a=f}else a=!1;this.u=this.u||a;l.jd=l.jd||a}}var e=a.a,f=c.pixelRatio;c=c.viewState.projection;var g=e.g,h=e.get("renderOrder")||null,l=b.f;if(l.jd||l.Rh!=g||l.Qf!=h){l.Ad=null;l.jd=!1;var m=e.ga(),n=m.tileGrid,p=b.ya,q=b.l,t="tile-pixels"==
q.yb(),u=n.Ga(p[0]),y;if(t)var x=t=m.gb(),n=Wd(n.Va(p[0])),n=[0,0,n[0]*x,n[1]*x];else t=u,n=n.Ia(p),Hc(c,q)||(y=!0,b.uf(c));l.jd=!1;var C=new Aj(0,n,t,m.i,e.i),z=Fj(t,f);b=b.c;h&&h!==l.Qf&&b.sort(h);m=0;for(t=b.length;m<t;++m)f=b[m],y&&f.V().lb(q,c),d.call(a,f);Bj(C);l.Rh=g;l.Qf=h;l.Ad=C;l.resolution=NaN}}
kk.prototype.xa=function(a,b,c,d){var e=b.viewState.resolution;b=b.viewState.rotation;var f=this.a,g={},h=this.l,l=f.ga(),m=l.tileGrid,n,p,q,t,u,y;q=0;for(t=h.length;q<t;++q)y=h[q],p=y.ya,u=l.tileGrid.Ia(p,this.o),Gb(u,a)&&("tile-pixels"===y.l.yb()?(u=Wb(u),e=l.gb(),p=m.Ga(p[0])/e,p=[(a[0]-u[0])/p,(u[1]-a[1])/p]):p=a,y=y.f.Ad,n=n||y.xa(p,e,b,{},function(a){var b=ea(a).toString();if(!(b in g))return g[b]=!0,c.call(d,a,f)}));return n};kk.prototype.C=function(){Xi(this)};
kk.prototype.j=function(a,b){var c=hk.prototype.j.call(this,a,b);if(c)for(var d=Object.keys(a.Ce||{}),e=0,f=this.l.length;e<f;++e){var g=this.l[e];nk(this,g,a);var h=g,g=a,l=this.a,m=lk[l.u];if(m){var n=g.pixelRatio,p=h.f,q=l.g;if(!eb(p.li,d)||p.Rf!==q){p.li=d;p.Rf=q;var q=h.g,t=l.ga(),u=t.tileGrid,y=h.ya[0],x=u.Ga(y),l=Wd(u.Va(y)),y=u.Ga(y),C=y/x,z=l[0]*n*C,K=l[1]*n*C;q.canvas.width=z/C+.5;q.canvas.height=K/C+.5;q.scale(1/C,1/C);q.translate(z/2,K/2);C="tile-pixels"==h.l.yb();x=n/x;t=t.gb();y/=t;
u=u.Ia(h.ya,this.o);h=Ph(this.T);C?(Vh(h,x*y,x*y),Wh(h,-l[0]*t/2,-l[1]*t/2)):(l=ac(u),Vh(h,x,-x),Wh(h,-l[0],-l[1]));p.Ad.Za(q,n,h,0,g.skippedFeatureUids||{},m)}}}return c};function ok(a,b){Zh.call(this,0,b);this.g=De();this.b=this.g.canvas;this.b.style.width="100%";this.b.style.height="100%";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0;this.c=Oh()}v(ok,Zh);ok.prototype.ng=function(a){return a instanceof di?new gk(a):a instanceof D?new hk(a):a instanceof G?new kk(a):a instanceof E?new jk(a):null};
function pk(a,b,c){var d=a.l,e=a.g;if(Na(d,b)){var f=c.extent,g=c.pixelRatio,h=c.viewState.rotation,l=c.viewState,m=c.pixelRatio/l.resolution;a=Xh(a.c,a.b.width/2,a.b.height/2,m,-m,-l.rotation,-l.center[0],-l.center[1]);d.b(new Ih(b,new Ki(e,g,f,a,h),c,e,null))}}ok.prototype.X=function(){return"canvas"};
ok.prototype.Pf=function(a){if(a){var b=this.g,c=a.pixelRatio,d=Math.round(a.size[0]*c),c=Math.round(a.size[1]*c);this.b.width!=d||this.b.height!=c?(this.b.width=d,this.b.height=c):b.clearRect(0,0,d,c);var e=a.viewState.rotation;$h(a);pk(this,"precompose",a);var f=a.layerStatesArray;fb(f);qi(b,e,d/2,c/2);var g=a.viewState.resolution,h,l,m,n;h=0;for(l=f.length;h<l;++h)n=f[h],m=n.layer,m=bi(this,m),Kh(n,g)&&"ready"==n.mi&&m.j(a,n)&&m.i(a,n,b);qi(b,-e,d/2,c/2);pk(this,"postcompose",a);this.a||(this.b.style.display=
    "", this.a = !0);
    ci(this, a);
    a.postRenderFunctions.push(ai)
} else this.a && (this.b.style.display = "none", this.a = !1)
};
    function qk(a) {
        this.b = a
    }
    function rk(a) {
        this.b = a
    }
    v(rk, qk);
    rk.prototype.X = function () {
        return 35632
    };
    function sk(a) {
        this.b = a
    }
    v(sk, qk);
    sk.prototype.X = function () {
        return 35633
    };
    function tk() {
        this.b = "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"
    }
    v(tk, rk);
    var uk = new tk;
    function vk(){this.b="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}v(vk,sk);var wk=new vk;
    function xk(a, b) {
        this.l = a.getUniformLocation(b, "j");
        this.o = a.getUniformLocation(b, "i");
        this.i = a.getUniformLocation(b, "k");
        this.j = a.getUniformLocation(b, "h");
        this.b = a.getAttribLocation(b, "e");
        this.a = a.getAttribLocation(b, "f");
        this.f = a.getAttribLocation(b, "c");
        this.g = a.getAttribLocation(b, "g");
        this.c = a.getAttribLocation(b, "d")
    }
    function yk() {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    }
    function zk(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[4] = b[2];
        a[5] = b[3];
        a[12] = b[4];
        a[13] = b[5];
        return a
    }
    function Ak(a) {
        this.b = void 0 !== a ? a : [];
        this.a = Bk
    }
    var Bk = 35044;
    function Ck(a, b) {
        this.j = a;
        this.b = b;
        this.a = {};
        this.c = {};
        this.f = {};
        this.o = this.s = this.i = this.l = null;
        (this.g = Za(ca, "OES_element_index_uint")) && b.getExtension("OES_element_index_uint");
        w(this.j, "webglcontextlost", this.Qn, this);
        w(this.j, "webglcontextrestored", this.Rn, this)
    }
    v(Ck, Ia);
    function Dk(a,b,c){var d=a.b,e=c.b,f=String(ea(c));if(f in a.a)d.bindBuffer(b,a.a[f].buffer);else{var g=d.createBuffer();d.bindBuffer(b,g);var h;34962==b?h=new Float32Array(e):34963==b&&(h=a.g?new Uint32Array(e):new Uint16Array(e));d.bufferData(b,h,c.a);a.a[f]={bc:c,buffer:g}}}function Ek(a,b){var c=a.b,d=String(ea(b)),e=a.a[d];c.isContextLost()||c.deleteBuffer(e.buffer);delete a.a[d]}k=Ck.prototype;
k.la=function(){Ha(this.j);var a=this.b;if(!a.isContextLost()){for(var b in this.a)a.deleteBuffer(this.a[b].buffer);for(b in this.f)a.deleteProgram(this.f[b]);for(b in this.c)a.deleteShader(this.c[b]);a.deleteFramebuffer(this.i);a.deleteRenderbuffer(this.o);a.deleteTexture(this.s)}};k.Pn=function(){return this.b};
function Fk(a){if(!a.i){var b=a.b,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=Gk(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,null);a.i=c;
a.s=d;a.o=e}return a.i}function Hk(a,b){var c=String(ea(b));if(c in a.c)return a.c[c];var d=a.b,e=d.createShader(b.X());d.shaderSource(e,b.b);d.compileShader(e);return a.c[c]=e}function Ik(a,b,c){var d=ea(b)+"/"+ea(c);if(d in a.f)return a.f[d];var e=a.b,f=e.createProgram();e.attachShader(f,Hk(a,b));e.attachShader(f,Hk(a,c));e.linkProgram(f);return a.f[d]=f}k.Qn=function(){va(this.a);va(this.c);va(this.f);this.o=this.s=this.i=this.l=null};k.Rn=function(){};
k.ve=function(a){if(a==this.l)return!1;this.b.useProgram(a);this.l=a;return!0};function Jk(a,b,c){var d=a.createTexture();a.bindTexture(a.TEXTURE_2D,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);void 0!==b&&a.texParameteri(3553,10242,b);void 0!==c&&a.texParameteri(3553,10243,c);return d}function Gk(a,b,c){var d=Jk(a,void 0,void 0);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,a.UNSIGNED_BYTE,null);return d}
    function Kk(a, b) {
        var c = Jk(a, 33071, 33071);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b);
        return c
    }
    function Lk(a, b) {
        this.B = this.C = void 0;
        this.o = ac(b);
        this.u = [];
        this.i = [];
        this.S = void 0;
        this.c = [];
        this.f = [];
        this.za = this.na = void 0;
        this.a = [];
        this.G = this.l = null;
        this.P = void 0;
        this.Ka = Oh();
        this.Aa = Oh();
        this.Qa = this.W = void 0;
        this.La = Oh();
        this.ra = yk();
        this.fa = this.$a = this.Z = void 0;
        this.oa = [];
        this.j = [];
        this.b = [];
        this.T = null;
        this.g = [];
        this.s = [];
        this.Ib = void 0
    }
    v(Lk, Ji);
    function Mk(a,b){var c=a.T,d=a.l,e=a.oa,f=a.j,g=b.b;return function(){if(!g.isContextLost()){var a,l;a=0;for(l=e.length;a<l;++a)g.deleteTexture(e[a]);a=0;for(l=f.length;a<l;++a)g.deleteTexture(f[a])}Ek(b,c);Ek(b,d)}}
function Nk(a,b,c,d){var e=a.C,f=a.B,g=a.S,h=a.na,l=a.za,m=a.P,n=a.W,p=a.Qa,q=a.Z?1:0,t=a.$a,u=a.fa,y=a.Ib,x=Math.cos(t),t=Math.sin(t),C=a.a.length,z=a.b.length,K,V,Z,Ra,F,Ga;for(K=0;K<c;K+=d)F=b[K]-a.o[0],Ga=b[K+1]-a.o[1],V=z/8,Z=-u*e,Ra=-u*(g-f),a.b[z++]=F,a.b[z++]=Ga,a.b[z++]=Z*x-Ra*t,a.b[z++]=Z*t+Ra*x,a.b[z++]=n/l,a.b[z++]=(p+g)/h,a.b[z++]=m,a.b[z++]=q,Z=u*(y-e),Ra=-u*(g-f),a.b[z++]=F,a.b[z++]=Ga,a.b[z++]=Z*x-Ra*t,a.b[z++]=Z*t+Ra*x,a.b[z++]=(n+y)/l,a.b[z++]=(p+g)/h,a.b[z++]=m,a.b[z++]=q,Z=u*(y-
e),Ra=u*f,a.b[z++]=F,a.b[z++]=Ga,a.b[z++]=Z*x-Ra*t,a.b[z++]=Z*t+Ra*x,a.b[z++]=(n+y)/l,a.b[z++]=p/h,a.b[z++]=m,a.b[z++]=q,Z=-u*e,Ra=u*f,a.b[z++]=F,a.b[z++]=Ga,a.b[z++]=Z*x-Ra*t,a.b[z++]=Z*t+Ra*x,a.b[z++]=n/l,a.b[z++]=p/h,a.b[z++]=m,a.b[z++]=q,a.a[C++]=V,a.a[C++]=V+1,a.a[C++]=V+2,a.a[C++]=V,a.a[C++]=V+2,a.a[C++]=V+3}Lk.prototype.qc=function(a,b){this.g.push(this.a.length);this.s.push(b);var c=a.ka();Nk(this,c,c.length,a.sa())};
Lk.prototype.rc=function(a,b){this.g.push(this.a.length);this.s.push(b);var c=a.ka();Nk(this,c,c.length,a.sa())};function Ok(a,b){var c=b.b;a.u.push(a.a.length);a.i.push(a.a.length);a.T=new Ak(a.b);Dk(b,34962,a.T);a.l=new Ak(a.a);Dk(b,34963,a.l);var d={};Pk(a.oa,a.c,d,c);Pk(a.j,a.f,d,c);a.C=void 0;a.B=void 0;a.S=void 0;a.c=null;a.f=null;a.na=void 0;a.za=void 0;a.a=null;a.P=void 0;a.W=void 0;a.Qa=void 0;a.Z=void 0;a.$a=void 0;a.fa=void 0;a.b=null;a.Ib=void 0}
function Pk(a,b,c,d){var e,f,g,h=b.length;for(g=0;g<h;++g)e=b[g],f=ea(e).toString(),f in c?e=c[f]:(e=Kk(d,e),c[f]=e),a[g]=e}
Lk.prototype.Za=function(a,b,c,d,e,f,g,h,l,m,n){f=a.b;Dk(a,34962,this.T);Dk(a,34963,this.l);var p=Ik(a,uk,wk),q;this.G?q=this.G:this.G=q=new xk(f,p);a.ve(p);f.enableVertexAttribArray(q.f);f.vertexAttribPointer(q.f,2,5126,!1,32,0);f.enableVertexAttribArray(q.b);f.vertexAttribPointer(q.b,2,5126,!1,32,8);f.enableVertexAttribArray(q.c);f.vertexAttribPointer(q.c,2,5126,!1,32,16);f.enableVertexAttribArray(q.a);f.vertexAttribPointer(q.a,1,5126,!1,32,24);f.enableVertexAttribArray(q.g);f.vertexAttribPointer(q.g,
1,5126,!1,32,28);p=Ph(this.La);Vh(p,2/(c*e[0]),2/(c*e[1]));Uh(p,-d);Wh(p,-(b[0]-this.o[0]),-(b[1]-this.o[1]));b=Ph(this.Aa);Vh(b,2/e[0],2/e[1]);e=Ph(this.Ka);0!==d&&Uh(e,-d);f.uniformMatrix4fv(q.j,!1,zk(this.ra,p));f.uniformMatrix4fv(q.o,!1,zk(this.ra,b));f.uniformMatrix4fv(q.l,!1,zk(this.ra,e));f.uniform1f(q.i,g);var t;if(void 0===l)Qk(this,f,a,h,this.oa,this.u);else{if(m)a:{d=a.g?5125:5123;a=a.g?4:2;e=this.g.length-1;for(g=this.j.length-1;0<=g;--g)for(f.bindTexture(3553,this.j[g]),m=0<g?this.i[g-
1]:0,b=this.i[g];0<=e&&this.g[e]>=m;){t=this.g[e];c=this.s[e];p=ea(c).toString();if(void 0===h[p]&&c.V()&&(void 0===n||dc(n,c.V().D()))&&(f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),f.drawElements(4,b-t,d,t*a),b=l(c))){h=b;break a}b=t;e--}h=void 0}else f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),Qk(this,f,a,h,this.j,this.i),h=(h=l(null))?h:void 0;t=h}f.disableVertexAttribArray(q.f);f.disableVertexAttribArray(q.b);f.disableVertexAttribArray(q.c);f.disableVertexAttribArray(q.a);f.disableVertexAttribArray(q.g);
return t};function Qk(a,b,c,d,e,f){var g=c.g?5125:5123;c=c.g?4:2;if(xa(d)){var h;a=0;d=e.length;for(h=0;a<d;++a){b.bindTexture(3553,e[a]);var l=f[a];b.drawElements(4,l-h,g,h*c);h=l}}else{h=0;var m,l=0;for(m=e.length;l<m;++l){b.bindTexture(3553,e[l]);for(var n=0<l?f[l-1]:0,p=f[l],q=n;h<a.g.length&&a.g[h]<=p;){var t=ea(a.s[h]).toString();void 0!==d[t]?(q!==n&&b.drawElements(4,n-q,g,q*c),n=q=h===a.g.length-1?p:a.g[h+1]):n=h===a.g.length-1?p:a.g[h+1];h++}q!==n&&b.drawElements(4,n-q,g,q*c)}}}
Lk.prototype.Xb=function(a){var b=a.cc(),c=a.Tb(1),d=a.md(),e=a.pe(1),f=a.l,g=a.jc(),h=a.T,l=a.o,m=a.Gb();a=a.c;var n;0===this.c.length?this.c.push(c):(n=this.c[this.c.length-1],ea(n)!=ea(c)&&(this.u.push(this.a.length),this.c.push(c)));0===this.f.length?this.f.push(e):(n=this.f[this.f.length-1],ea(n)!=ea(e)&&(this.i.push(this.a.length),this.f.push(e)));this.C=b[0];this.B=b[1];this.S=m[1];this.na=d[1];this.za=d[0];this.P=f;this.W=g[0];this.Qa=g[1];this.$a=l;this.Z=h;this.fa=a;this.Ib=m[0]};
function Rk(a,b,c){this.c=b;this.i=a;this.f=c;this.a={}}v(Rk,ij);function Sk(a,b){var c=[],d;for(d in a.a)c.push(Mk(a.a[d],b));return function(){for(var a=c.length,b,d=0;d<a;d++)b=c[d].apply(this,arguments);return b}}function Tk(a,b){for(var c in a.a)Ok(a.a[c],b)}Rk.prototype.b=function(a,b){var c=this.a[b];void 0===c&&(c=new Uk[b](this.i,this.c),this.a[b]=c);return c};Rk.prototype.g=function(){return xa(this.a)};
Rk.prototype.Za=function(a,b,c,d,e,f,g,h){var l,m,n;l=0;for(m=zj.length;l<m;++l)n=this.a[zj[l]],void 0!==n&&n.Za(a,b,c,d,e,f,g,h,void 0,!1)};function Vk(a,b,c,d,e,f,g,h,l,m,n){var p=Wk,q,t;for(q=zj.length-1;0<=q;--q)if(t=a.a[zj[q]],void 0!==t&&(t=t.Za(b,c,d,e,p,f,g,h,l,m,n)))return t}
Rk.prototype.xa=function(a,b,c,d,e,f,g,h,l,m){var n=b.b;n.bindFramebuffer(n.FRAMEBUFFER,Fk(b));var p;void 0!==this.f&&(p=Db(Lb(a),d*this.f));return Vk(this,b,a,d,e,g,h,l,function(a){var b=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,b);if(0<b[3]&&(a=m(a)))return a},!0,p)};
function Xk(a,b,c,d,e,f,g,h){var l=c.b;l.bindFramebuffer(l.FRAMEBUFFER,Fk(c));return void 0!==Vk(a,c,b,d,e,f,g,h,function(){var a=new Uint8Array(4);l.readPixels(0,0,1,1,l.RGBA,l.UNSIGNED_BYTE,a);return 0<a[3]},!1)}var Uk={Image:Lk},Wk=[1,1];function Yk(a,b,c,d,e,f,g){this.b=a;this.f=b;this.g=f;this.c=g;this.l=e;this.j=d;this.i=c;this.a=null}v(Yk,Ji);k=Yk.prototype;k.ud=function(a){this.Xb(a.a)};k.pc=function(a){switch(a.X()){case "Point":this.rc(a,null);break;case "MultiPoint":this.qc(a,null);break;case "GeometryCollection":this.We(a,null)}};k.Ve=function(a,b){var c=(0,b.c)(a);c&&dc(this.g,c.D())&&(this.ud(b),this.pc(c))};k.We=function(a){a=a.f;var b,c;b=0;for(c=a.length;b<c;++b)this.pc(a[b])};
k.rc=function(a,b){var c=this.b,d=(new Rk(1,this.g)).b(0,"Image");d.Xb(this.a);d.rc(a,b);Ok(d,c);d.Za(this.b,this.f,this.i,this.j,this.l,this.c,1,{},void 0,!1);Mk(d,c)()};k.qc=function(a,b){var c=this.b,d=(new Rk(1,this.g)).b(0,"Image");d.Xb(this.a);d.qc(a,b);Ok(d,c);d.Za(this.b,this.f,this.i,this.j,this.l,this.c,1,{},void 0,!1);Mk(d,c)()};k.Xb=function(a){this.a=a};function Zk(){this.b="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}v(Zk,rk);var $k=new Zk;function al(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}v(al,sk);var bl=new al;
    function cl(a, b) {
        this.g = a.getUniformLocation(b, "f");
        this.f = a.getUniformLocation(b, "e");
        this.i = a.getUniformLocation(b, "d");
        this.c = a.getUniformLocation(b, "g");
        this.b = a.getAttribLocation(b, "b");
        this.a = a.getAttribLocation(b, "c")
    }
    function dl(a, b) {
        Vi.call(this, b);
        this.f = a;
        this.W = new Ak([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
        this.i = this.tb = null;
        this.j = void 0;
        this.s = Oh();
        this.u = Oh();
        this.B = yk();
        this.T = null
    }
    v(dl, Vi);
    function el(a,b,c){var d=a.f.g;if(void 0===a.j||a.j!=c){b.postRenderFunctions.push(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))}.bind(null,d,a.i,a.tb));b=Gk(d,c,c);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.tb=b;a.i=e;a.j=c}else d.bindFramebuffer(36160,a.i)}
dl.prototype.lh=function(a,b,c){fl(this,"precompose",c,a);Dk(c,34962,this.W);var d=c.b,e=Ik(c,$k,bl),f;this.T?f=this.T:this.T=f=new cl(d,e);c.ve(e)&&(d.enableVertexAttribArray(f.b),d.vertexAttribPointer(f.b,2,5126,!1,16,0),d.enableVertexAttribArray(f.a),d.vertexAttribPointer(f.a,2,5126,!1,16,8),d.uniform1i(f.c,0));d.uniformMatrix4fv(f.i,!1,zk(this.B,this.s));d.uniformMatrix4fv(f.f,!1,zk(this.B,this.u));d.uniform1f(f.g,b.opacity);d.bindTexture(3553,this.tb);d.drawArrays(5,0,4);fl(this,"postcompose",
c,a)};function fl(a,b,c,d){a=a.a;if(Na(a,b)){var e=d.viewState;a.b(new Ih(b,new Yk(c,e.center,e.resolution,e.rotation,d.size,d.extent,d.pixelRatio),d,null,c))}}dl.prototype.xf=function(){this.i=this.tb=null;this.j=void 0};function gl(a,b){dl.call(this,a,b);this.o=this.l=this.c=null}v(gl,dl);function hl(a,b){var c=b.a();return Kk(a.f.g,c)}gl.prototype.xa=function(a,b,c,d){var e=this.a;return e.ga().xa(a,b.viewState.resolution,b.viewState.rotation,b.skippedFeatureUids,function(a){return c.call(d,a,e)})};
gl.prototype.yf=function(a,b){var c=this.f.g,d=a.pixelRatio,e=a.viewState,f=e.center,g=e.resolution,h=e.rotation,l=this.c,m=this.tb,n=this.a.ga(),p=a.viewHints,q=a.extent;void 0!==b.extent&&(q=cc(q,b.extent));p[0]||p[1]||Yb(q)||(e=n.W(q,g,d,e.projection))&&Yi(this,e)&&(l=e,m=hl(this,e),this.tb&&a.postRenderFunctions.push(function(a,b){a.isContextLost()||a.deleteTexture(b)}.bind(null,c,this.tb)));l&&(c=this.f.c.j,il(this,c.width,c.height,d,f,g,h,l.D()),this.o=null,d=this.s,Ph(d),Vh(d,1,-1),Wh(d,0,
-1),this.c=l,this.tb=m,$i(a.attributions,l.j),aj(a,n));return!0};function il(a,b,c,d,e,f,g,h){b*=f;c*=f;a=a.u;Ph(a);Vh(a,2*d/b,2*d/c);Uh(a,-g);Wh(a,h[0]-e[0],h[1]-e[1]);Vh(a,(h[2]-h[0])/2,(h[3]-h[1])/2);Wh(a,1,1)}gl.prototype.le=function(a,b){return void 0!==this.xa(a,b,gc,this)};
gl.prototype.Bc=function(a,b,c,d){if(this.c&&this.c.a())if(this.a.ga()instanceof ek){var e=Th(b.pixelToCoordinateTransform,a.slice());if(this.xa(e,b,gc,this))return c.call(d,this.a,null)}else{e=[this.c.a().width,this.c.a().height];if(!this.o){var f=b.size;b=Oh();Wh(b,-1,-1);Vh(b,2/f[0],2/f[1]);Wh(b,0,f[1]);Vh(b,1,-1);var f=Yh(this.u.slice()),g=Oh();Wh(g,0,e[1]);Vh(g,1,-1);Vh(g,e[0]/2,e[1]/2);Wh(g,1,1);Rh(g,f);Rh(g,b);this.o=g}a=Th(this.o,a.slice());if(!(0>a[0]||a[0]>e[0]||0>a[1]||a[1]>e[1])&&(this.l||
    (this.l = De(1, 1)), this.l.clearRect(0, 0, 1, 1), this.l.drawImage(this.c.a(), a[0], a[1], 1, 1, 0, 0, 1, 1), e = this.l.getImageData(0, 0, 1, 1).data, 0 < e[3]))return c.call(d, this.a, e)
}
};
    function jl() {
        this.b = "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"
    }
    v(jl, rk);
    var kl = new jl;
    function ll() {
        this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"
    }
    v(ll, sk);
    var ml = new ll;
    function nl(a, b) {
        this.g = a.getUniformLocation(b, "e");
        this.f = a.getUniformLocation(b, "d");
        this.b = a.getAttribLocation(b, "b");
        this.a = a.getAttribLocation(b, "c")
    }
    function pl(a, b) {
        dl.call(this, a, b);
        this.S = kl;
        this.Z = ml;
        this.c = null;
        this.G = new Ak([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
        this.C = this.l = null;
        this.o = -1;
        this.P = [0, 0]
    }
    v(pl, dl);
    k = pl.prototype;
    k.la = function () {
        Ek(this.f.c, this.G);
        dl.prototype.la.call(this)
    };
    k.Ue = function (a, b, c) {
        var d = this.f;
        return function (e, f) {
            return Wi(a, b, e, f, function (a) {
                var b = d.a.b.hasOwnProperty(a.Xa());
                b && (c[e] || (c[e] = {}), c[e][a.ya.toString()] = a);
                return b
            })
        }
    };
    k.xf = function () {
        dl.prototype.xf.call(this);
        this.c = null
    };
    k.yf=function(a,b,c){var d=this.f,e=c.b,f=a.viewState,g=f.projection,h=this.a,l=h.ga(),m=l.pb(g),n=m.wc(f.resolution),p=m.Ga(n),q=l.kf(n,a.pixelRatio,g),t=q[0]/Wd(m.Va(n),this.P)[0],u=p/t,y=l.gb(t)*l.df(g),x=f.center,C=a.extent,z=ee(m,C,p);if(this.l&&Sd(this.l,z)&&this.o==l.g)u=this.C;else{var K=[z.da-z.ba+1,z.ha-z.ea+1],V=ka(Math.max(K[0]*q[0],K[1]*q[1])),K=u*V,Z=m.Tc(n),Ra=Z[0]+z.ba*q[0]*u,u=Z[1]+z.ea*q[1]*u,u=[Ra,u,Ra+K,u+K];el(this,a,V);e.viewport(0,0,V,V);e.clearColor(0,0,0,0);e.clear(16384);
e.disable(3042);V=Ik(c,this.S,this.Z);c.ve(V);this.c||(this.c=new nl(e,V));Dk(c,34962,this.G);e.enableVertexAttribArray(this.c.b);e.vertexAttribPointer(this.c.b,2,5126,!1,16,0);e.enableVertexAttribArray(this.c.a);e.vertexAttribPointer(this.c.a,2,5126,!1,16,8);e.uniform1i(this.c.g,0);c={};c[n]={};var F=this.Ue(l,g,c),Ga=h.c(),V=!0,Ra=Bb(),ra=new Qd(0,0,0,0),Oa,Sa,Nb;for(Sa=z.ba;Sa<=z.da;++Sa)for(Nb=z.ea;Nb<=z.ha;++Nb){Z=l.vc(n,Sa,Nb,t,g);if(void 0!==b.extent&&(Oa=m.Ia(Z.ya,Ra),!dc(Oa,b.extent)))continue;
Oa=Z.U();(Oa=Oa==jg||4==Oa||3==Oa&&!Ga)||(Z=ig(Z));Oa=Z.U();if(Oa==jg){if(d.a.b.hasOwnProperty(Z.Xa())){c[n][Z.ya.toString()]=Z;continue}}else if(4==Oa||3==Oa&&!Ga)continue;V=!1;Oa=ce(m,Z.ya,F,ra,Ra);Oa||(Z=de(m,Z.ya,ra,Ra))&&F(n+1,Z)}b=Object.keys(c).map(Number);b.sort(Ya);for(var F=new Float32Array(4),Ub,Ga=0,ra=b.length;Ga<ra;++Ga)for(Ub in Sa=c[b[Ga]],Sa)Z=Sa[Ub],Oa=m.Ia(Z.ya,Ra),F[0]=2*(Oa[2]-Oa[0])/K,F[1]=2*(Oa[3]-Oa[1])/K,F[2]=2*(Oa[0]-u[0])/K-1,F[3]=2*(Oa[1]-u[1])/K-1,e.uniform4fv(this.c.f,
F),ql(d,Z,q,y*t),e.drawArrays(5,0,4);V?(this.l=z,this.C=u,this.o=l.g):(this.C=this.l=null,this.o=-1,a.animate=!0)}bj(a.usedTiles,l,n,z);var oc=d.j;cj(a,l,m,t,g,C,n,h.f(),function(a){a.U()!=jg||d.a.b.hasOwnProperty(a.Xa())||a.Xa()in oc.a||oc.c([a,ge(m,a.ya),m.Ga(a.ya[0]),q,y*t])},this);Zi(a,l);aj(a,l);e=this.s;Ph(e);Wh(e,(Math.round(x[0]/p)*p-u[0])/(u[2]-u[0]),(Math.round(x[1]/p)*p-u[1])/(u[3]-u[1]));0!==f.rotation&&Uh(e,f.rotation);Vh(e,a.size[0]*f.resolution/(u[2]-u[0]),a.size[1]*f.resolution/(u[3]-
u[1]));Wh(e,-.5,-.5);return!0};k.Bc=function(a,b,c,d){if(this.i){a=Th(this.s,[a[0]/b.size[0],(b.size[1]-a[1])/b.size[1]].slice());a=[a[0]*this.j,a[1]*this.j];b=this.f.c.b;b.bindFramebuffer(b.FRAMEBUFFER,this.i);var e=new Uint8Array(4);b.readPixels(a[0],a[1],1,1,b.RGBA,b.UNSIGNED_BYTE,e);if(0<e[3])return c.call(d,this.a,e)}};function rl(a,b){dl.call(this,a,b);this.o=!1;this.P=-1;this.S=NaN;this.C=Bb();this.l=this.c=this.G=null}v(rl,dl);k=rl.prototype;k.lh=function(a,b,c){this.l=b;var d=a.viewState,e=this.c;e&&!e.g()&&e.Za(c,d.center,d.resolution,d.rotation,a.size,a.pixelRatio,b.opacity,b.sd?a.skippedFeatureUids:{})};k.la=function(){var a=this.c;a&&(Sk(a,this.f.c)(),this.c=null);dl.prototype.la.call(this)};
k.xa=function(a,b,c,d){if(this.c&&this.l){var e=b.viewState,f=this.a,g={};return this.c.xa(a,this.f.c,e.center,e.resolution,e.rotation,b.size,b.pixelRatio,this.l.opacity,{},function(a){var b=ea(a).toString();if(!(b in g))return g[b]=!0,c.call(d,a,f)})}};k.le=function(a,b){if(this.c&&this.l){var c=b.viewState;return Xk(this.c,a,this.f.c,c.resolution,c.rotation,b.pixelRatio,this.l.opacity,b.skippedFeatureUids)}return!1};
k.Bc=function(a,b,c,d){a=Th(b.pixelToCoordinateTransform,a.slice());if(this.le(a,b))return c.call(d,this.a,null)};k.mh=function(){Xi(this)};
k.yf=function(a,b,c){function d(a){var b,c=a.zc();c?b=c.call(a,m):(c=e.j)&&(b=c(a,m));if(b){if(b){c=!1;if(Array.isArray(b))for(var d=0,f=b.length;d<f;++d)c=Gj(q,a,b[d],Fj(m,n),this.mh,this)||c;else c=Gj(q,a,b,Fj(m,n),this.mh,this)||c;a=c}else a=!1;this.o=this.o||a}}var e=this.a;b=e.ga();$i(a.attributions,b.j);aj(a,b);var f=a.viewHints[0],g=a.viewHints[1],h=e.Z,l=e.fa;if(!this.o&&!h&&f||!l&&g)return!0;var g=a.extent,h=a.viewState,f=h.projection,m=h.resolution,n=a.pixelRatio,h=e.g,p=e.i,l=e.get("renderOrder");
void 0===l&&(l=Ej);g=Db(g,p*m);if(!this.o&&this.S==m&&this.P==h&&this.G==l&&Ib(this.C,g))return!0;this.c&&a.postRenderFunctions.push(Sk(this.c,c));this.o=!1;var q=new Rk(.5*m/n,g,e.i);b.rd(g,m,f);if(l){var t=[];b.Kb(g,function(a){t.push(a)},this);t.sort(l);t.forEach(d,this)}else b.Kb(g,d,this);Tk(q,c);this.S=m;this.P=h;this.G=l;this.C=g;this.c=q;return!0};function sl(){this.f=0;this.b={};this.g=this.a=null}k=sl.prototype;k.clear=function(){this.f=0;this.b={};this.g=this.a=null};k.forEach=function(a,b){for(var c=this.a;c;)a.call(b,c.Gc,c.ec,this),c=c.Ab};k.get=function(a){a=this.b[a];ha(void 0!==a,15);if(a===this.g)return a.Gc;a===this.a?(this.a=this.a.Ab,this.a.Uc=null):(a.Ab.Uc=a.Uc,a.Uc.Ab=a.Ab);a.Ab=null;a.Uc=this.g;this.g=this.g.Ab=a;return a.Gc};
k.pop=function(){var a=this.a;delete this.b[a.ec];a.Ab&&(a.Ab.Uc=null);this.a=a.Ab;this.a||(this.g=null);--this.f;return a.Gc};k.replace=function(a,b){this.get(a);this.b[a].Gc=b};k.set=function(a,b){ha(!(a in this.b),16);var c={ec:a,Ab:null,Uc:this.g,Gc:b};this.g?this.g.Ab=c:this.a=c;this.g=c;this.b[a]=c;++this.f};function tl(a,b){Zh.call(this,0,b);this.b=document.createElement("CANVAS");this.b.style.width="100%";this.b.style.height="100%";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.u=this.C=0;this.B=De();this.o=!0;this.g=$e(this.b,{antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.c=new Ck(this.b,this.g);w(this.b,"webglcontextlost",this.Dm,this);w(this.b,"webglcontextrestored",this.Em,this);this.a=new sl;this.T=null;this.j=
new kg(function(a){var b=a[1];a=a[2];var e=b[0]-this.T[0],b=b[1]-this.T[1];return 65536*Math.log(a)+Math.sqrt(e*e+b*b)/a}.bind(this),function(a){return a[0].Xa()});this.G=function(){if(0!==this.j.b.length){og(this.j);var a=lg(this.j);ql(this,a[0],a[3],a[4])}return!1}.bind(this);this.i=0;ul(this)}v(tl,Zh);
function ql(a,b,c,d){var e=a.g,f=b.Xa();if(a.a.b.hasOwnProperty(f))a=a.a.get(f),e.bindTexture(3553,a.tb),9729!=a.Og&&(e.texParameteri(3553,10240,9729),a.Og=9729),9729!=a.Qg&&(e.texParameteri(3553,10241,9729),a.Qg=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.B.canvas,l=a.B;a.C!==c[0]||a.u!==c[1]?(h.width=c[0],h.height=c[1],a.C=c[0],a.u=c[1]):l.clearRect(0,0,c[0],c[1]);l.drawImage(b.qb(),d,d,c[0],c[1],0,0,c[0],c[1]);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,
0,6408,6408,5121,b.qb());e.texParameteri(3553,10240,9729);e.texParameteri(3553,10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);a.a.set(f,{tb:g,Og:9729,Qg:9729})}}k=tl.prototype;k.ng=function(a){return a instanceof di?new gl(this,a):a instanceof D?new pl(this,a):a instanceof E?new rl(this,a):null};function vl(a,b,c){var d=a.l;if(Na(d,b)){a=a.c;var e=c.viewState;d.b(new Ih(b,new Yk(a,e.center,e.resolution,e.rotation,c.size,c.extent,c.pixelRatio),c,null,a))}}
k.la=function(){var a=this.g;a.isContextLost()||this.a.forEach(function(b){b&&a.deleteTexture(b.tb)});Ja(this.c);Zh.prototype.la.call(this)};k.uj=function(a,b){for(var c=this.g,d;1024<this.a.f-this.i;){if(d=this.a.a.Gc)c.deleteTexture(d.tb);else if(+this.a.a.ec==b.index)break;else--this.i;this.a.pop()}};k.X=function(){return"webgl"};k.Dm=function(a){a.preventDefault();this.a.clear();this.i=0;a=this.f;for(var b in a)a[b].xf()};k.Em=function(){ul(this);this.l.render()};
function ul(a){a=a.g;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
k.Pf=function(a){var b=this.c,c=this.g;if(c.isContextLost())return!1;if(!a)return this.o&&(this.b.style.display="none",this.o=!1),!1;this.T=a.focus;this.a.set((-a.index).toString(),null);++this.i;vl(this,"precompose",a);var d=[],e=a.layerStatesArray;fb(e);var f=a.viewState.resolution,g,h,l,m;g=0;for(h=e.length;g<h;++g)m=e[g],Kh(m,f)&&"ready"==m.mi&&(l=bi(this,m.layer),l.yf(a,m,b)&&d.push(m));e=a.size[0]*a.pixelRatio;f=a.size[1]*a.pixelRatio;if(this.b.width!=e||this.b.height!=f)this.b.width=e,this.b.height=
f;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.b.width,this.b.height);g=0;for(h=d.length;g<h;++g)m=d[g],l=bi(this,m.layer),l.lh(a,m,b);this.o||(this.b.style.display="",this.o=!0);$h(a);1024<this.a.f-this.i&&a.postRenderFunctions.push(this.uj.bind(this));0!==this.j.b.length&&(a.postRenderFunctions.push(this.G),a.animate=!0);vl(this,"postcompose",a);ci(this,a);a.postRenderFunctions.push(ai)};
k.xa=function(a,b,c,d,e,f){var g;if(this.g.isContextLost())return!1;var h=b.viewState,l=b.layerStatesArray,m;for(m=l.length-1;0<=m;--m){g=l[m];var n=g.layer;if(Kh(g,h.resolution)&&e.call(f,n)&&(g=bi(this,n).xa(a,b,c,d)))return g}};k.kh=function(a,b,c,d){var e=!1;if(this.g.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h],m=l.layer;if(Kh(l,f.resolution)&&c.call(d,m)&&(e=bi(this,m).le(a,b)))return!0}return e};
k.jh=function(a,b,c,d,e){if(this.g.isContextLost())return!1;var f=b.viewState,g,h=b.layerStatesArray,l;for(l=h.length-1;0<=l;--l){g=h[l];var m=g.layer;if(Kh(g,f.resolution)&&e.call(d,m)&&(g=bi(this,m).Bc(a,b,c,d)))return g}};var wl=["canvas","webgl"];
function H(a){Ua.call(this);var b=xl(a);this.Jb=void 0!==a.loadTilesWhileAnimating?a.loadTilesWhileAnimating:!1;this.ac=void 0!==a.loadTilesWhileInteracting?a.loadTilesWhileInteracting:!1;this.Me=void 0!==a.pixelRatio?a.pixelRatio:gf;this.Le=b.logos;this.Z=function(){this.i=void 0;this.Jo.call(this,Date.now())}.bind(this);this.La=Oh();this.Je=Oh();this.ub=0;this.f=null;this.Aa=Bb();this.G=this.P=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(mf?" ol-touch":"");this.a.style.position=
"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.C=document.createElement("DIV");this.C.className="ol-overlaycontainer";this.a.appendChild(this.C);this.u=document.createElement("DIV");this.u.className="ol-overlaycontainer-stopevent";a=["click","dblclick","mousedown","touchstart","mspointerdown",cg,"mousewheel","wheel"];for(var c=0,d=a.length;c<d;++c)w(this.u,a[c],La);this.a.appendChild(this.u);
this.ra=new Vf(this);for(var e in fg)w(this.ra,fg[e],this.Jg,this);this.fa=b.keyboardEventTarget;this.s=null;w(this.a,"wheel",this.Nc,this);w(this.a,"mousewheel",this.Nc,this);this.l=b.controls;this.j=b.interactions;this.o=b.overlays;this.Af={};this.B=new b.Lo(this.a,this);this.W=null;this.S=[];this.Ka=[];this.oa=new pg(this.pk.bind(this),this.Uk.bind(this));this.Ce={};w(this,Wa(yl),this.Ck,this);w(this,Wa(zl),this.Vk,this);w(this,Wa(Al),this.Rk,this);w(this,Wa(Bl),this.Tk,this);this.H(b.values);
this.l.forEach(function(a){a.setMap(this)},this);w(this.l,se,function(a){a.element.setMap(this)},this);w(this.l,te,function(a){a.element.setMap(null)},this);this.j.forEach(function(a){a.setMap(this)},this);w(this.j,se,function(a){a.element.setMap(this)},this);w(this.j,te,function(a){a.element.setMap(null)},this);this.o.forEach(this.ig,this);w(this.o,se,function(a){this.ig(a.element)},this);w(this.o,te,function(a){var b=a.element.j;void 0!==b&&delete this.Af[b.toString()];a.element.setMap(null)},this)}
v(H,Ua);k=H.prototype;k.ij=function(a){this.l.push(a)};k.jj=function(a){this.j.push(a)};k.gg=function(a){this.tc().Qc().push(a)};k.hg=function(a){this.o.push(a)};k.ig=function(a){var b=a.j;void 0!==b&&(this.Af[b.toString()]=a);a.setMap(this)};k.ab=function(a){this.render();Array.prototype.push.apply(this.S,arguments)};
k.la=function(){Ja(this.ra);Ja(this.B);Fa(this.a,"wheel",this.Nc,this);Fa(this.a,"mousewheel",this.Nc,this);void 0!==this.c&&(window.removeEventListener("resize",this.c,!1),this.c=void 0);this.i&&(cancelAnimationFrame(this.i),this.i=void 0);this.Xg(null);Ua.prototype.la.call(this)};k.Sd=function(a,b,c,d,e){if(this.f)return a=this.Ja(a),this.B.xa(a,this.f,b,void 0!==c?c:null,void 0!==d?d:gc,void 0!==e?e:null)};
k.Gl=function(a,b,c,d,e){if(this.f)return this.B.jh(a,this.f,b,void 0!==c?c:null,void 0!==d?d:gc,void 0!==e?e:null)};k.Xk=function(a,b,c){if(!this.f)return!1;a=this.Ja(a);return this.B.kh(a,this.f,void 0!==b?b:gc,void 0!==c?c:null)};k.Kj=function(a){return this.Ja(this.Ud(a))};k.Ud=function(a){var b=this.a.getBoundingClientRect();a=a.changedTouches?a.changedTouches[0]:a;return[a.clientX-b.left,a.clientY-b.top]};k.jf=function(){return this.get(Bl)};
k.uc=function(){var a=this.jf();return void 0!==a?"string"===typeof a?document.getElementById(a):a:null};k.Ja=function(a){var b=this.f;return b?Th(b.pixelToCoordinateTransform,a.slice()):null};k.Ij=function(){return this.l};k.bk=function(){return this.o};k.ak=function(a){a=this.Af[a.toString()];return void 0!==a?a:null};k.Pj=function(){return this.j};k.tc=function(){return this.get(yl)};k.Wg=function(){return this.tc().Qc()};
k.Ca=function(a){var b=this.f;return b?Th(b.coordinateToPixelTransform,a.slice(0,2)):null};k.kb=function(){return this.get(Al)};k.$=function(){return this.get(zl)};k.rk=function(){return this.a};k.pk=function(a,b,c,d){var e=this.f;if(!(e&&b in e.wantedTiles&&e.wantedTiles[b][a.Xa()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};k.Nc=function(a,b){var c=new Tf(b||a.type,this,a);this.Jg(c)};
k.Jg=function(a){if(this.f){this.W=a.coordinate;a.frameState=this.f;var b=this.j.a,c;if(!1!==this.b(a))for(c=b.length-1;0<=c;c--){var d=b[c];if(d.f()&&!d.handleEvent(a))break}}};k.Pk=function(){var a=this.f,b=this.oa;if(0!==b.b.length){var c=16,d=c;if(a){var e=a.viewHints;e[0]&&(c=this.Jb?8:0,d=2);e[1]&&(c=this.ac?8:0,d=2)}b.j<c&&(og(b),qg(b,c,d))}b=this.Ka;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};k.Rk=function(){this.render()};
k.Tk=function(){var a;this.jf()&&(a=this.uc());if(this.s){for(var b=0,c=this.s.length;b<c;++b)za(this.s[b]);this.s=null}a?(a.appendChild(this.a),a=this.fa?this.fa:a,this.s=[w(a,"keydown",this.Nc,this),w(a,"keypress",this.Nc,this)],this.c||(this.c=this.Yc.bind(this),window.addEventListener("resize",this.c,!1))):(Fe(this.a),void 0!==this.c&&(window.removeEventListener("resize",this.c,!1),this.c=void 0));this.Yc()};k.Uk=function(){this.render()};k.Wk=function(){this.render()};
k.Vk=function(){this.P&&(za(this.P),this.P=null);var a=this.$();a&&(this.P=w(a,"propertychange",this.Wk,this));this.render()};k.Ck=function(){this.G&&(this.G.forEach(za),this.G=null);var a=this.tc();a&&(this.G=[w(a,"propertychange",this.render,this),w(a,"change",this.render,this)]);this.render()};k.Ko=function(){this.i&&cancelAnimationFrame(this.i);this.Z()};k.render=function(){void 0===this.i&&(this.i=requestAnimationFrame(this.Z))};k.Do=function(a){return this.l.remove(a)};k.Eo=function(a){return this.j.remove(a)};
k.Go=function(a){return this.tc().Qc().remove(a)};k.Ho=function(a){return this.o.remove(a)};
k.Jo=function(a){var b,c,d,e=this.kb(),f=this.$(),g=Bb(),h=null;if(void 0!==e&&0<e[0]&&0<e[1]&&f&&Gd(f)){var h=Cd(f,this.f?this.f.viewHints:void 0),l=this.tc().ff(),m={};b=0;for(c=l.length;b<c;++b)m[ea(l[b].layer)]=l[b];d=f.U();h={animate:!1,attributions:{},coordinateToPixelTransform:this.La,extent:g,focus:this.W?this.W:d.center,index:this.ub++,layerStates:m,layerStatesArray:l,logos:ua({},this.Le),pixelRatio:this.Me,pixelToCoordinateTransform:this.Je,postRenderFunctions:[],size:e,skippedFeatureUids:this.Ce,
tileQueue:this.oa,time:a,usedTiles:{},viewState:d,viewHints:h,wantedTiles:{}}}if(h){a=this.S;b=e=0;for(c=a.length;b<c;++b)f=a[b],f(this,h)&&(a[e++]=f);a.length=e;h.extent=bc(d.center,d.resolution,d.rotation,h.size,g)}this.f=h;this.B.Pf(h);h&&(h.animate&&this.render(),Array.prototype.push.apply(this.Ka,h.postRenderFunctions),0!==this.S.length||h.viewHints[0]||h.viewHints[1]||Pb(h.extent,this.Aa)||(this.b(new Ge("moveend",this,h)),Eb(h.extent,this.Aa)));this.b(new Ge("postrender",this,h));setTimeout(this.Pk.bind(this),
0)};k.ai=function(a){this.set(yl,a)};k.Tf=function(a){this.set(Al,a)};k.Xg=function(a){this.set(Bl,a)};k.Wo=function(a){this.set(zl,a)};k.ki=function(a){a=ea(a).toString();this.Ce[a]=!0;this.render()};k.Yc=function(){var a=this.uc();if(a){var b=getComputedStyle(a);this.Tf([a.offsetWidth-parseFloat(b.borderLeftWidth)-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderRightWidth),a.offsetHeight-parseFloat(b.borderTopWidth)-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderBottomWidth)])}else this.Tf(void 0)};
k.oi=function(a){a=ea(a).toString();delete this.Ce[a];this.render()};
function xl(a){var b=null;void 0!==a.keyboardEventTarget&&(b="string"===typeof a.keyboardEventTarget?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d={};if(void 0===a.logo||"boolean"===typeof a.logo&&a.logo)d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]="https://openlayers.org/";
else{var e=a.logo;"string"===typeof e?d[e]="":e instanceof HTMLElement?d[ea(e).toString()]=e:e&&(ha("string"==typeof e.href,44),ha("string"==typeof e.src,45),d[e.src]=e.href)}e=a.layers instanceof xh?a.layers:new xh({layers:a.layers});c[yl]=e;c[Bl]=a.target;c[zl]=void 0!==a.view?a.view:new yd;var e=Zh,f;void 0!==a.renderer?(Array.isArray(a.renderer)?f=a.renderer:"string"===typeof a.renderer?f=[a.renderer]:ha(!1,46),0<=f.indexOf("dom")&&(f=f.concat(wl))):f=wl;var g,h;g=0;for(h=f.length;g<h;++g){var l=
f[g];if("canvas"==l){if(jf){e=ok;break}}else if("webgl"==l&&af){e=tl;break}}void 0!==a.controls?Array.isArray(a.controls)?f=new me(a.controls.slice()):(ha(a.controls instanceof me,47),f=a.controls):f=Te();void 0!==a.interactions?Array.isArray(a.interactions)?g=new me(a.interactions.slice()):(ha(a.interactions instanceof me,48),g=a.interactions):g=uh();void 0!==a.overlays?Array.isArray(a.overlays)?a=new me(a.overlays.slice()):(ha(a.overlays instanceof me,49),a=a.overlays):a=new me;return{controls:f,
interactions:g,keyboardEventTarget:b,logos:d,overlays:a,Lo:e,values:c}}var yl="layergroup",Al="size",Bl="target",zl="view";Hh();function Cl(a){Ua.call(this);this.j=a.id;this.o=void 0!==a.insertFirst?a.insertFirst:!0;this.s=void 0!==a.stopEvent?a.stopEvent:!0;this.f=document.createElement("DIV");this.f.className="ol-overlay-container";this.f.style.position="absolute";this.autoPan=void 0!==a.autoPan?a.autoPan:!1;this.i=void 0!==a.autoPanAnimation?a.autoPanAnimation:{};this.l=void 0!==a.autoPanMargin?a.autoPanMargin:20;this.a={Od:"",fe:"",Be:"",De:"",visible:!0};this.c=null;w(this,Wa(Dl),this.xk,this);w(this,Wa(El),this.Hk,this);
w(this,Wa(Fl),this.Lk,this);w(this,Wa(Gl),this.Nk,this);w(this,Wa(Hl),this.Ok,this);void 0!==a.element&&this.Vh(a.element);this.ci(void 0!==a.offset?a.offset:[0,0]);this.fi(void 0!==a.positioning?a.positioning:Il);void 0!==a.position&&this.tf(a.position)}v(Cl,Ua);k=Cl.prototype;k.Td=function(){return this.get(Dl)};k.Hl=function(){return this.j};k.he=function(){return this.get(El)};k.Eg=function(){return this.get(Fl)};k.Yg=function(){return this.get(Gl)};k.Fg=function(){return this.get(Hl)};
k.xk=function(){for(var a=this.f;a.lastChild;)a.removeChild(a.lastChild);(a=this.Td())&&this.f.appendChild(a)};k.Hk=function(){this.c&&(Fe(this.f),za(this.c),this.c=null);var a=this.he();a&&(this.c=w(a,"postrender",this.render,this),Jl(this),a=this.s?a.u:a.C,this.o?a.insertBefore(this.f,a.childNodes[0]||null):a.appendChild(this.f))};k.render=function(){Jl(this)};k.Lk=function(){Jl(this)};
k.Nk=function(){Jl(this);if(void 0!==this.get(Gl)&&this.autoPan){var a=this.he();if(void 0!==a&&a.uc()){var b=Kl(a.uc(),a.kb()),c=this.Td(),d=c.offsetWidth,e=c.currentStyle||getComputedStyle(c),d=d+(parseInt(e.marginLeft,10)+parseInt(e.marginRight,10)),e=c.offsetHeight,f=c.currentStyle||getComputedStyle(c),e=e+(parseInt(f.marginTop,10)+parseInt(f.marginBottom,10)),g=Kl(c,[d,e]),c=this.l;Ib(b,g)||(d=g[0]-b[0],e=b[2]-g[2],f=g[1]-b[1],g=b[3]-g[3],b=[0,0],0>d?b[0]=d-c:0>e&&(b[0]=Math.abs(e)+c),0>f?b[1]=
f-c:0>g&&(b[1]=Math.abs(g)+c),0===b[0]&&0===b[1])||(c=a.$().bb(),d=a.Ca(c),b=[d[0]+b[0],d[1]+b[1]],this.i&&(this.i.source=c,a.ab(Nd(this.i))),a.$().rb(a.Ja(b)))}}};k.Ok=function(){Jl(this)};k.Vh=function(a){this.set(Dl,a)};k.setMap=function(a){this.set(El,a)};k.ci=function(a){this.set(Fl,a)};k.tf=function(a){this.set(Gl,a)};function Kl(a,b){var c=a.getBoundingClientRect(),d=c.left+window.pageXOffset,c=c.top+window.pageYOffset;return[d,c,d+b[0],c+b[1]]}k.fi=function(a){this.set(Hl,a)};
function Ll(a,b){a.a.visible!==b&&(a.f.style.display=b?"":"none",a.a.visible=b)}
function Jl(a){var b=a.he(),c=a.Yg();if(void 0!==b&&b.f&&void 0!==c){var c=b.Ca(c),d=b.kb(),b=a.f.style,e=a.Eg(),f=a.Fg(),g=e[0],e=e[1];if(f==Ml||f==Nl||f==Ol)""!==a.a.fe&&(a.a.fe=b.left=""),g=Math.round(d[0]-c[0]-g)+"px",a.a.Be!=g&&(a.a.Be=b.right=g);else{""!==a.a.Be&&(a.a.Be=b.right="");if(f==Pl||f==Ql||f==Rl)g-=a.f.offsetWidth/2;g=Math.round(c[0]+g)+"px";a.a.fe!=g&&(a.a.fe=b.left=g)}if(f==Sl||f==Pl||f==Ml)""!==a.a.De&&(a.a.De=b.top=""),c=Math.round(d[1]-c[1]-e)+"px",a.a.Od!=c&&(a.a.Od=b.bottom=
c);else{""!==a.a.Od&&(a.a.Od=b.bottom="");if(f==Tl||f==Ql||f==Nl)e-=a.f.offsetHeight/2;c=Math.round(c[1]+e)+"px";a.a.De!=c&&(a.a.De=b.top=c)}Ll(a,!0)}else Ll(a,!1)}var Sl="bottom-left",Pl="bottom-center",Ml="bottom-right",Tl="center-left",Ql="center-center",Nl="center-right",Il="top-left",Rl="top-center",Ol="top-right",Dl="element",El="map",Fl="offset",Gl="position",Hl="positioning";function Ul(a){a=a?a:{};this.j=void 0!==a.collapsed?a.collapsed:!0;this.l=void 0!==a.collapsible?a.collapsible:!0;this.l||(this.j=!1);var b=void 0!==a.className?a.className:"ol-overviewmap",c=void 0!==a.tipLabel?a.tipLabel:"Overview map",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00ab";"string"===typeof d?(this.o=document.createElement("span"),this.o.textContent=d):this.o=d;d=void 0!==a.label?a.label:"\u00bb";"string"===typeof d?(this.u=document.createElement("span"),this.u.textContent=d):this.u=
d;var e=this.l&&!this.j?this.o:this.u,d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);w(d,"click",this.Vl,this);c=document.createElement("DIV");c.className="ol-overviewmap-map";var f=this.f=new H({controls:new me,interactions:new me,target:c,view:a.view});a.layers&&a.layers.forEach(function(a){f.gg(a)},this);e=document.createElement("DIV");e.className="ol-overviewmap-box";e.style.boxSizing="border-box";this.C=new Cl({position:[0,0],positioning:Sl,element:e});
this.f.hg(this.C);e=document.createElement("div");e.className=b+" ol-unselectable ol-control"+(this.j&&this.l?" ol-collapsed":"")+(this.l?"":" ol-uncollapsible");e.appendChild(c);e.appendChild(d);He.call(this,{element:e,render:a.render?a.render:Vl,target:a.target})}v(Ul,He);k=Ul.prototype;
k.setMap=function(a){var b=this.a;a!==b&&(b&&(b=b.$())&&Fa(b,Wa(Bd),this.ce,this),He.prototype.setMap.call(this,a),a&&(this.s.push(w(a,"propertychange",this.Ik,this)),0===this.f.Wg().yc()&&this.f.ai(a.tc()),a=a.$()))&&(w(a,Wa(Bd),this.ce,this),Gd(a)&&(this.f.Yc(),Wl(this)))};k.Ik=function(a){a.key===zl&&((a=a.oldValue)&&Fa(a,Wa(Bd),this.ce,this),a=this.a.$(),w(a,Wa(Bd),this.ce,this))};k.ce=function(){this.f.$().ie(this.a.$().Pa())};
function Vl(){var a=this.a,b=this.f;if(a.f&&b.f){var c=a.kb(),a=a.$().Jc(c),d=b.kb(),c=b.$().Jc(d),e=b.Ca(Wb(a)),f=b.Ca(Tb(a)),b=Math.abs(e[0]-f[0]),e=Math.abs(e[1]-f[1]),f=d[0],d=d[1];b<.1*f||e<.1*d||b>.75*f||e>.75*d?Wl(this):Ib(c,a)||(a=this.f,c=this.a.$(),a.$().rb(c.bb()))}Xl(this)}function Wl(a){var b=a.a;a=a.f;var c=b.kb(),b=b.$().Jc(c),c=a.kb();a=a.$();ec(b,1/(.1*Math.pow(2,Math.log(7.5)/Math.LN2/2)));a.$e(b,c)}
function Xl(a){var b=a.a,c=a.f;if(b.f&&c.f){var d=b.kb(),e=b.$(),f=c.$(),c=e.Pa(),b=a.C,g=a.C.Td(),h=e.Jc(d),d=f.Ma(),e=Sb(h),f=Vb(h),l;if(a=a.a.$().bb())l=[e[0]-a[0],e[1]-a[1]],wb(l,c),rb(l,a);b.tf(l);g&&(g.style.width=Math.abs((e[0]-f[0])/d)+"px",g.style.height=Math.abs((f[1]-e[1])/d)+"px")}}k.Vl=function(a){a.preventDefault();Yl(this)};
function Yl(a){a.element.classList.toggle("ol-collapsed");a.j?Ee(a.o,a.u):Ee(a.u,a.o);a.j=!a.j;var b=a.f;a.j||b.f||(b.Yc(),Wl(a),Ea(b,"postrender",function(){Xl(this)},a))}k.Ul=function(){return this.l};k.Xl=function(a){this.l!==a&&(this.l=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.j&&Yl(this))};k.Wl=function(a){this.l&&this.j!==a&&Yl(this)};k.Tl=function(){return this.j};k.ck=function(){return this.f};function Zl(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-scale-line";this.l=document.createElement("DIV");this.l.className=b+"-inner";this.f=document.createElement("DIV");this.f.className=b+" ol-unselectable";this.f.appendChild(this.l);this.u=null;this.o=void 0!==a.minWidth?a.minWidth:64;this.j=!1;this.B=void 0;this.C="";He.call(this,{element:this.f,render:a.render?a.render:$l,target:a.target});w(this,Wa(am),this.S,this);this.G(a.units||bm)}v(Zl,He);var cm=[1,2,5];Zl.prototype.yb=function(){return this.get(am)};
function $l(a){(a=a.frameState)?this.u=a.viewState:this.u=null;dm(this)}Zl.prototype.S=function(){dm(this)};Zl.prototype.G=function(a){this.set(am,a)};
function dm(a){var b=a.u;if(b){var c=b.projection,d=c.dc(),b=c.getPointResolution(b.resolution,b.center)*d,d=a.o*b,c="",e=a.yb();e==em?(c=kc.degrees,b/=c,d<c/60?(c="\u2033",b*=3600):d<c?(c="\u2032",b*=60):c="\u00b0"):e==fm?.9144>d?(c="in",b/=.0254):1609.344>d?(c="ft",b/=.3048):(c="mi",b/=1609.344):e==gm?(b/=1852,c="nm"):e==bm?1>d?(c="mm",b*=1E3):1E3>d?c="m":(c="km",b/=1E3):e==hm?.9144>d?(c="in",b*=39.37):1609.344>d?(c="ft",b/=.30480061):(c="mi",b/=1609.3472):ha(!1,33);for(var e=3*Math.floor(Math.log(a.o*
b)/Math.log(10)),f;;){f=cm[(e%3+3)%3]*Math.pow(10,Math.floor(e/3));d=Math.round(f/b);if(isNaN(d)){a.f.style.display="none";a.j=!1;return}if(d>=a.o)break;++e}b=f+" "+c;a.C!=b&&(a.l.innerHTML=b,a.C=b);a.B!=d&&(a.l.style.width=d+"px",a.B=d);a.j||(a.f.style.display="",a.j=!0)}else a.j&&(a.f.style.display="none",a.j=!1)}var am="units",em="degrees",fm="imperial",gm="nautical",bm="metric",hm="us";function im(a){a=a?a:{};this.f=void 0;this.j=jm;this.u=[];this.B=this.o=0;this.W=null;this.fa=!1;this.Z=void 0!==a.duration?a.duration:200;var b=void 0!==a.className?a.className:"ol-zoomslider",c=document.createElement("button");c.setAttribute("type","button");c.className=b+"-thumb ol-unselectable";var d=document.createElement("div");d.className=b+" ol-unselectable ol-control";d.appendChild(c);this.l=new Of(d);w(this.l,"pointerdown",this.wk,this);w(this.l,"pointermove",this.Hg,this);w(this.l,"pointerup",
this.Ig,this);w(d,"click",this.vk,this);w(c,"click",La);He.call(this,{element:d,render:a.render?a.render:km})}v(im,He);im.prototype.la=function(){Ja(this.l);He.prototype.la.call(this)};var jm=0;k=im.prototype;k.setMap=function(a){He.prototype.setMap.call(this,a);a&&a.render()};
function km(a){if(a.frameState){if(!this.fa){var b=this.element,c=b.offsetWidth,d=b.offsetHeight,e=b.firstElementChild,f=getComputedStyle(e),b=e.offsetWidth+parseFloat(f.marginRight)+parseFloat(f.marginLeft),e=e.offsetHeight+parseFloat(f.marginTop)+parseFloat(f.marginBottom);this.W=[b,e];c>d?(this.j=1,this.B=c-b):(this.j=jm,this.o=d-e);this.fa=!0}a=a.frameState.viewState.resolution;a!==this.f&&(this.f=a,lm(this,a))}}
k.vk=function(a){var b=this.a,c=b.$(),d=c.Ma();b.ab(Pd({resolution:d,duration:this.Z,easing:Jd}));a=mm(this,ia(1===this.j?(a.offsetX-this.W[0]/2)/this.B:(a.offsetY-this.W[1]/2)/this.o,0,1));c.Yb(c.constrainResolution(a))};
k.wk=function(a){if(!this.C&&a.b.target===this.element.firstElementChild&&(Hd(this.a.$(),1),this.G=a.clientX,this.S=a.clientY,this.C=!0,0===this.u.length)){a=this.Hg;var b=this.Ig;this.u.push(w(document,"mousemove",a,this),w(document,"touchmove",a,this),w(document,"pointermove",a,this),w(document,"mouseup",b,this),w(document,"touchend",b,this),w(document,"pointerup",b,this))}};
k.Hg=function(a){if(this.C){var b=this.element.firstElementChild;this.f=mm(this,ia(1===this.j?(a.clientX-this.G+parseInt(b.style.left,10))/this.B:(a.clientY-this.S+parseInt(b.style.top,10))/this.o,0,1));this.a.$().Yb(this.f);lm(this,this.f);this.G=a.clientX;this.S=a.clientY}};k.Ig=function(){if(this.C){var a=this.a,b=a.$();Hd(b,-1);a.ab(Pd({resolution:this.f,duration:this.Z,easing:Jd}));a=b.constrainResolution(this.f);b.Yb(a);this.C=!1;this.S=this.G=void 0;this.u.forEach(za);this.u.length=0}};
    function lm(a, b) {
        var c;
        c = 1 - Fd(a.a.$())(b);
        var d = a.element.firstElementChild;
        1 == a.j ? d.style.left = a.B * c + "px" : d.style.top = a.o * c + "px"
    }
    function mm(a, b) {
        return Ed(a.a.$())(1 - b)
    }
    function nm(a) {
        a = a ? a : {};
        this.f = a.extent ? a.extent : null;
        var b = void 0 !== a.className ? a.className : "ol-zoom-extent", c = void 0 !== a.label ? a.label : "E", d = void 0 !== a.tipLabel ? a.tipLabel : "Fit to extent", e = document.createElement("button");
        e.setAttribute("type", "button");
        e.title = d;
        e.appendChild("string" === typeof c ? document.createTextNode(c) : c);
        w(e, "click", this.j, this);
        c = document.createElement("div");
        c.className = b + " ol-unselectable ol-control";
        c.appendChild(e);
        He.call(this, {element: c, target: a.target})
    }
    v(nm, He);
    nm.prototype.j=function(a){a.preventDefault();var b=this.a;a=b.$();var c=this.f?this.f:a.l.D(),b=b.kb();a.$e(c,b)};function om(a){Ua.call(this);a=a?a:{};this.a=null;w(this,Wa(pm),this.ul,this);this.rf(void 0!==a.tracking?a.tracking:!1)}v(om,Ua);k=om.prototype;k.la=function(){this.rf(!1);Ua.prototype.la.call(this)};
k.Sn=function(a){if(null!==a.alpha){var b=na(a.alpha);this.set(qm,b);"boolean"===typeof a.absolute&&a.absolute?this.set(rm,b):"number"===typeof a.webkitCompassHeading&&-1!=a.webkitCompassAccuracy&&this.set(rm,na(a.webkitCompassHeading))}null!==a.beta&&this.set(sm,na(a.beta));null!==a.gamma&&this.set(tm,na(a.gamma));this.v()};k.Cj=function(){return this.get(qm)};k.Fj=function(){return this.get(sm)};k.Mj=function(){return this.get(tm)};k.tl=function(){return this.get(rm)};k.Sg=function(){return this.get(pm)};
k.ul=function(){if(kf){var a=this.Sg();a&&!this.a?this.a=w(window,"deviceorientation",this.Sn,this):a||null===this.a||(za(this.a),this.a=null)}};k.rf=function(a){this.set(pm,a)};var qm="alpha",sm="beta",tm="gamma",rm="heading",pm="tracking";function I(a){Ua.call(this);this.a=void 0;this.f="geometry";this.i=null;this.j=void 0;this.c=null;w(this,Wa(this.f),this.ae,this);void 0!==a&&(a instanceof Mc||!a?this.Oa(a):this.H(a))}v(I,Ua);k=I.prototype;k.clone=function(){var a=new I(this.N());a.Dc(this.f);var b=this.V();b&&a.Oa(b.clone());(b=this.i)&&a.sf(b);return a};k.V=function(){return this.get(this.f)};k.vl=function(){return this.a};k.Oj=function(){return this.f};k.wl=function(){return this.i};k.zc=function(){return this.j};k.xl=function(){this.v()};
    k.ae = function () {
        this.c && (za(this.c), this.c = null);
        var a = this.V();
        a && (this.c = w(a, "change", this.xl, this));
        this.v()
    };
    k.Oa = function (a) {
        this.set(this.f, a)
    };
    k.sf = function (a) {
        this.j = (this.i = a) ? um(a) : void 0;
        this.v()
    };
    k.Wb = function (a) {
        this.a = a;
        this.v()
    };
    k.Dc = function (a) {
        Fa(this, Wa(this.f), this.ae, this);
        this.f = a;
        w(this, Wa(this.f), this.ae, this);
        this.ae()
    };
    function um(a) {
        if ("function" !== typeof a) {
            var b;
            Array.isArray(a) ? b = a : (ha(a instanceof yi, 41), b = [a]);
            a = function () {
                return b
            }
        }
        return a
    }
    var vm = document.implementation.createDocument("", "", null);
    function wm(a, b) {
        return vm.createElementNS(a, b)
    }
    function xm(a, b) {
        return ym(a, b, []).join("")
    }
    function ym(a, b, c) {
        if (a.nodeType == Node.CDATA_SECTION_NODE || a.nodeType == Node.TEXT_NODE)b ? c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : c.push(a.nodeValue); else for (a = a.firstChild; a; a = a.nextSibling)ym(a, b, c);
        return c
    }
    function zm(a) {
        return a instanceof Document
    }
    function Am(a) {
        return a instanceof Node
    }
    function Bm(a){return(new DOMParser).parseFromString(a,"application/xml")}function Cm(a,b){return function(c,d){var e=a.call(b,c,d);void 0!==e&&bb(d[d.length-1],e)}}function Dm(a,b){return function(c,d){var e=a.call(void 0!==b?b:this,c,d);void 0!==e&&d[d.length-1].push(e)}}function Em(a,b){return function(c,d){var e=a.call(void 0!==b?b:this,c,d);void 0!==e&&(d[d.length-1]=e)}}
function Fm(a){return function(b,c){var d=a.call(this,b,c);if(void 0!==d){var e=c[c.length-1],f=b.localName,g;f in e?g=e[f]:g=e[f]=[];g.push(d)}}}function J(a,b){return function(c,d){var e=a.call(this,c,d);void 0!==e&&(d[d.length-1][void 0!==b?b:c.localName]=e)}}function L(a,b){return function(c,d,e){a.call(void 0!==b?b:this,c,d,e);e[e.length-1].node.appendChild(c)}}
function Gm(a){var b,c;return function(d,e,f){if(!b){b={};var g={};g[d.localName]=a;b[d.namespaceURI]=g;c=Hm(d.localName)}Im(b,c,e,f)}}function Hm(a,b){return function(c,d,e){c=d[d.length-1].node;d=a;void 0===d&&(d=e);e=b;void 0===b&&(e=c.namespaceURI);return wm(e,d)}}var Jm=Hm();function Km(a,b){for(var c=b.length,d=Array(c),e=0;e<c;++e)d[e]=a[b[e]];return d}function M(a,b,c){c=void 0!==c?c:{};var d,e;d=0;for(e=a.length;d<e;++d)c[a[d]]=b;return c}
    function Lm(a, b, c, d) {
        for (b = b.firstElementChild; b; b = b.nextElementSibling) {
            var e = a[b.namespaceURI];
            void 0 !== e && (e = e[b.localName]) && e.call(d, b, c)
        }
    }
    function N(a, b, c, d, e) {
        d.push(a);
        Lm(b, c, d, e);
        return d.pop()
    }
    function Im(a, b, c, d, e, f) {
        for (var g = (void 0 !== e ? e : c).length, h, l, m = 0; m < g; ++m)h = c[m], void 0 !== h && (l = b.call(f, h, d, void 0 !== e ? e[m] : void 0), void 0 !== l && a[l.namespaceURI][l.localName].call(f, l, h, d))
    }
    function Mm(a, b, c, d, e, f, g) {
        e.push(a);
        Im(b, c, d, e, f, g);
        e.pop()
    }
    function Nm(a, b, c, d) {
        return function (e, f, g) {
            var h = new XMLHttpRequest;
            h.open("GET", "function" === typeof a ? a(e, f, g) : a, !0);
            "arraybuffer" == b.X() && (h.responseType = "arraybuffer");
            h.onload = function () {
                if (!h.status || 200 <= h.status && 300 > h.status) {
                    var a = b.X(), e;
                    "json" == a || "text" == a ? e = h.responseText : "xml" == a ? (e = h.responseXML) || (e = Bm(h.responseText)) : "arraybuffer" == a && (e = h.response);
                    e ? c.call(this, b.Ha(e, {featureProjection: g}), b.Sa(e)) : d.call(this)
                } else d.call(this)
            }.bind(this);
            h.send()
        }
    }
    function Om(a, b) {
        return Nm(a, b, function (a, b) {
            this.uf(b);
            this.Wh(a)
        }, function () {
            this.state = 3;
            hg(this)
        })
    }
    function Pm(a, b) {
        return Nm(a, b, function (a) {
            this.Ic(a)
        }, da)
    }
    function Qm() {
        this.j = this.defaultDataProjection = null
    }
    function Rm(a, b, c) {
        var d;
        c && (d = {
            dataProjection: c.dataProjection ? c.dataProjection : a.Sa(b),
            featureProjection: c.featureProjection
        });
        return Sm(a, d)
    }
    function Sm(a, b) {
        return ua({dataProjection: a.defaultDataProjection, featureProjection: a.j}, b)
    }
    function Tm(a, b, c) {
        var d = c ? qc(c.featureProjection) : null, e = c ? qc(c.dataProjection) : null, f;
        d && e && !Hc(d, e) ? a instanceof Mc ? f = (b ? a.clone() : a).lb(b ? d : e, b ? e : d) : f = Lc(b ? a.slice() : a, b ? d : e, b ? e : d) : f = a;
        if (b && c && c.decimals) {
            var g = Math.pow(10, c.decimals);
            a = function (a) {
                for (var b = 0, c = a.length; b < c; ++b)a[b] = Math.round(a[b] * g) / g;
                return a
            };
            Array.isArray(f) ? a(f) : f.oc(a)
        }
        return f
    }
    function Um() {
        Qm.call(this)
    }
    v(Um, Qm);
    function Vm(a) {
        return "string" === typeof a ? (a = JSON.parse(a)) ? a : null : null !== a ? a : null
    }
    k = Um.prototype;
    k.X = function () {
        return "json"
    };
    k.Ub = function (a, b) {
        return this.Vc(Vm(a), Rm(this, a, b))
    };
    k.Ha = function (a, b) {
        return this.Gf(Vm(a), Rm(this, a, b))
    };
    k.Wc = function (a, b) {
        return this.Ih(Vm(a), Rm(this, a, b))
    };
    k.Sa = function (a) {
        return this.Oh(Vm(a))
    };
    k.Fd = function (a, b) {
        return JSON.stringify(this.Zc(a, b))
    };
    k.$b = function (a, b) {
        return JSON.stringify(this.Ge(a, b))
    };
    k.$c=function(a,b){return JSON.stringify(this.He(a,b))};function Wm(a,b,c,d,e,f){var g=NaN,h=NaN,l=(c-b)/d;if(0!==l)if(1==l)g=a[b],h=a[b+1];else if(2==l)g=(1-e)*a[b]+e*a[b+d],h=(1-e)*a[b+1]+e*a[b+d+1];else{var h=a[b],l=a[b+1],m=0,g=[0],n;for(n=b+d;n<c;n+=d){var p=a[n],q=a[n+1],m=m+Math.sqrt((p-h)*(p-h)+(q-l)*(q-l));g.push(m);h=p;l=q}c=e*m;l=0;m=g.length;for(n=!1;l<m;)e=l+(m-l>>1),h=+Ya(g[e],c),0>h?l=e+1:(m=e,n=!h);e=n?l:~l;0>e?(c=(c-g[-e-2])/(g[-e-1]-g[-e-2]),b+=(-e-2)*d,g=pa(a[b],a[b+d],c),h=pa(a[b+1],a[b+d+1],c)):(g=a[b+e*d],h=a[b+e*d+1])}return f?(f[0]=
g,f[1]=h,f):[g,h]}function Xm(a,b,c,d,e,f){if(c==b)return null;if(e<a[b+d-1])return f?(c=a.slice(b,b+d),c[d-1]=e,c):null;if(a[c-1]<e)return f?(c=a.slice(c-d,c),c[d-1]=e,c):null;if(e==a[b+d-1])return a.slice(b,b+d);b/=d;for(c/=d;b<c;)f=b+c>>1,e<a[(f+1)*d-1]?c=f:b=f+1;c=a[b*d-1];if(e==c)return a.slice((b-1)*d,(b-1)*d+d);f=(e-c)/(a[(b+1)*d-1]-c);c=[];var g;for(g=0;g<d-1;++g)c.push(pa(a[(b-1)*d+g],a[b*d+g],f));c.push(e);return c}
    function Ym(a, b, c, d, e, f) {
        var g = 0;
        if (f)return Xm(a, g, b[b.length - 1], c, d, e);
        if (d < a[c - 1])return e ? (a = a.slice(0, c), a[c - 1] = d, a) : null;
        if (a[a.length - 1] < d)return e ? (a = a.slice(a.length - c), a[c - 1] = d, a) : null;
        e = 0;
        for (f = b.length; e < f; ++e) {
            var h = b[e];
            if (g != h) {
                if (d < a[g + c - 1])break;
                if (d <= a[h - 1])return Xm(a, g, h, c, d, !1);
                g = h
            }
        }
        return null
    }
    function O(a, b) {
        Oc.call(this);
        this.c = null;
        this.C = this.B = this.l = -1;
        this.ma(a, b)
    }
    v(O, Oc);
    k = O.prototype;
    k.kj = function (a) {
        this.A ? bb(this.A, a) : this.A = a.slice();
        this.v()
    };
    k.clone = function () {
        var a = new O(null);
        a.aa(this.ia, this.A.slice());
        return a
    };
    k.vb = function (a, b, c, d) {
        if (d < Fb(this.D(), a, b))return d;
        this.C != this.g && (this.B = Math.sqrt(Vc(this.A, 0, this.A.length, this.a, 0)), this.C = this.g);
        return Xc(this.A, 0, this.A.length, this.a, this.B, !1, a, b, c, d)
    };
    k.zj=function(a,b){return md(this.A,0,this.A.length,this.a,a,b)};k.$l=function(a,b){return"XYM"!=this.ia&&"XYZM"!=this.ia?null:Xm(this.A,0,this.A.length,this.a,a,void 0!==b?b:!1)};k.Y=function(){return cd(this.A,0,this.A.length,this.a)};k.vg=function(a,b){return Wm(this.A,0,this.A.length,this.a,a,b)};k.am=function(){var a=this.A,b=this.a,c=a[0],d=a[1],e=0,f;for(f=0+b;f<this.A.length;f+=b)var g=a[f],h=a[f+1],e=e+Math.sqrt((g-c)*(g-c)+(h-d)*(h-d)),c=g,d=h;return e};
function Ri(a){a.l!=a.g&&(a.c=a.vg(.5,a.c),a.l=a.g);return a.c}k.Mc=function(a){var b=[];b.length=ed(this.A,0,this.A.length,this.a,a,b,0);a=new O(null);a.aa("XY",b);return a};k.X=function(){return"LineString"};k.Na=function(a){return nd(this.A,0,this.A.length,this.a,a)};k.ma=function(a,b){a?(Rc(this,b,a,1),this.A||(this.A=[]),this.A.length=$c(this.A,0,a,this.a),this.v()):this.aa("XY",null)};k.aa=function(a,b){Qc(this,a,b);this.v()};function P(a,b){Oc.call(this);this.c=[];this.l=this.C=-1;this.ma(a,b)}v(P,Oc);k=P.prototype;k.lj=function(a){this.A?bb(this.A,a.ka().slice()):this.A=a.ka().slice();this.c.push(this.A.length);this.v()};k.clone=function(){var a=new P(null);a.aa(this.ia,this.A.slice(),this.c.slice());return a};k.vb=function(a,b,c,d){if(d<Fb(this.D(),a,b))return d;this.l!=this.g&&(this.C=Math.sqrt(Wc(this.A,0,this.c,this.a,0)),this.l=this.g);return Yc(this.A,0,this.c,this.a,this.C,!1,a,b,c,d)};
k.cm=function(a,b,c){return"XYM"!=this.ia&&"XYZM"!=this.ia||0===this.A.length?null:Ym(this.A,this.c,this.a,a,void 0!==b?b:!1,void 0!==c?c:!1)};k.Y=function(){return dd(this.A,0,this.c,this.a)};k.Eb=function(){return this.c};k.Uj=function(a){if(0>a||this.c.length<=a)return null;var b=new O(null);b.aa(this.ia,this.A.slice(0===a?0:this.c[a-1],this.c[a]));return b};
k.od=function(){var a=this.A,b=this.c,c=this.ia,d=[],e=0,f,g;f=0;for(g=b.length;f<g;++f){var h=b[f],l=new O(null);l.aa(c,a.slice(e,h));d.push(l);e=h}return d};function Si(a){var b=[],c=a.A,d=0,e=a.c;a=a.a;var f,g;f=0;for(g=e.length;f<g;++f){var h=e[f],d=Wm(c,d,h,a,.5);bb(b,d);d=h}return b}k.Mc=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a,g=0,h=0,l,m;l=0;for(m=e.length;l<m;++l){var n=e[l],h=ed(d,g,n,f,a,b,h);c.push(h);g=n}b.length=h;a=new P(null);a.aa("XY",b,c);return a};k.X=function(){return"MultiLineString"};
k.Na=function(a){a:{var b=this.A,c=this.c,d=this.a,e=0,f,g;f=0;for(g=c.length;f<g;++f){if(nd(b,e,c[f],d,a)){a=!0;break a}e=c[f]}a=!1}return a};k.ma=function(a,b){if(a){Rc(this,b,a,2);this.A||(this.A=[]);var c=ad(this.A,0,a,this.a,this.c);this.A.length=0===c.length?0:c[c.length-1];this.v()}else this.aa("XY",null,this.c)};k.aa=function(a,b,c){Qc(this,a,b);this.c=c;this.v()};
    function Zm(a, b) {
        var c = a.ia, d = [], e = [], f, g;
        f = 0;
        for (g = b.length; f < g; ++f) {
            var h = b[f];
            0 === f && (c = h.ia);
            bb(d, h.ka());
            e.push(d.length)
        }
        a.aa(c, d, e)
    }
    function Q(a, b) {
        Oc.call(this);
        this.ma(a, b)
    }
    v(Q, Oc);
    k = Q.prototype;
    k.nj = function (a) {
        this.A ? bb(this.A, a.ka()) : this.A = a.ka().slice();
        this.v()
    };
    k.clone = function () {
        var a = new Q(null);
        a.aa(this.ia, this.A.slice());
        return a
    };
    k.vb = function (a, b, c, d) {
        if (d < Fb(this.D(), a, b))return d;
        var e = this.A, f = this.a, g, h, l;
        g = 0;
        for (h = e.length; g < h; g += f)if (l = ma(a, b, e[g], e[g + 1]), l < d) {
            d = l;
            for (l = 0; l < f; ++l)c[l] = e[g + l];
            c.length = f
        }
        return d
    };
    k.Y = function () {
        return cd(this.A, 0, this.A.length, this.a)
    };
    k.ek=function(a){var b=this.A?this.A.length/this.a:0;if(0>a||b<=a)return null;b=new A(null);b.aa(this.ia,this.A.slice(a*this.a,(a+1)*this.a));return b};k.je=function(){var a=this.A,b=this.ia,c=this.a,d=[],e,f;e=0;for(f=a.length;e<f;e+=c){var g=new A(null);g.aa(b,a.slice(e,e+c));d.push(g)}return d};k.X=function(){return"MultiPoint"};k.Na=function(a){var b=this.A,c=this.a,d,e,f,g;d=0;for(e=b.length;d<e;d+=c)if(f=b[d],g=b[d+1],Hb(a,f,g))return!0;return!1};
k.ma=function(a,b){a?(Rc(this,b,a,1),this.A||(this.A=[]),this.A.length=$c(this.A,0,a,this.a),this.v()):this.aa("XY",null)};k.aa=function(a,b){Qc(this,a,b);this.v()};function R(a,b){Oc.call(this);this.c=[];this.C=-1;this.B=null;this.P=this.G=this.S=-1;this.l=null;this.ma(a,b)}v(R,Oc);k=R.prototype;k.oj=function(a){if(this.A){var b=this.A.length;bb(this.A,a.ka());a=a.Eb().slice();var c,d;c=0;for(d=a.length;c<d;++c)a[c]+=b}else this.A=a.ka().slice(),a=a.Eb().slice(),this.c.push();this.c.push(a);this.v()};k.clone=function(){for(var a=new R(null),b=this.c.length,c=Array(b),d=0;d<b;++d)c[d]=this.c[d].slice();$m(a,this.ia,this.A.slice(),c);return a};
k.vb=function(a,b,c,d){if(d<Fb(this.D(),a,b))return d;if(this.G!=this.g){var e=this.c,f=0,g=0,h,l;h=0;for(l=e.length;h<l;++h)var m=e[h],g=Wc(this.A,f,m,this.a,g),f=m[m.length-1];this.S=Math.sqrt(g);this.G=this.g}e=Ti(this);f=this.c;g=this.a;h=this.S;l=0;var m=[NaN,NaN],n,p;n=0;for(p=f.length;n<p;++n){var q=f[n];d=Yc(e,l,q,g,h,!0,a,b,c,d,m);l=q[q.length-1]}return d};
k.Ac=function(a,b){var c;a:{c=Ti(this);var d=this.c,e=this.a,f=0;if(0!==d.length){var g,h;g=0;for(h=d.length;g<h;++g){var l=d[g];if(kd(c,f,l,e,a,b)){c=!0;break a}f=l[l.length-1]}}c=!1}return c};k.dm=function(){var a=Ti(this),b=this.c,c=0,d=0,e,f;e=0;for(f=b.length;e<f;++e)var g=b[e],d=d+Tc(a,c,g,this.a),c=g[g.length-1];return d};
k.Y=function(a){var b;void 0!==a?(b=Ti(this).slice(),sd(b,this.c,this.a,a)):b=this.A;a=b;b=this.c;var c=this.a,d=0,e=[],f=0,g,h;g=0;for(h=b.length;g<h;++g){var l=b[g];e[f++]=dd(a,d,l,c,e[f]);d=l[l.length-1]}e.length=f;return e};
function Ui(a){if(a.C!=a.g){var b=a.A,c=a.c,d=a.a,e=0,f=[],g,h;g=0;for(h=c.length;g<h;++g){var l=c[g],e=Mb(b,e,l[0],d);f.push((e[0]+e[2])/2,(e[1]+e[3])/2);e=l[l.length-1]}b=Ti(a);c=a.c;d=a.a;g=0;h=[];l=0;for(e=c.length;l<e;++l){var m=c[l];h=ld(b,g,m,d,f,2*l,h);g=m[m.length-1]}a.B=h;a.C=a.g}return a.B}k.Rj=function(){var a=new Q(null);a.aa("XY",Ui(this).slice());return a};
function Ti(a){if(a.P!=a.g){var b=a.A,c;a:{c=a.c;var d,e;d=0;for(e=c.length;d<e;++d)if(!qd(b,c[d],a.a,void 0)){c=!1;break a}c=!0}c?a.l=b:(a.l=b.slice(),a.l.length=sd(a.l,a.c,a.a));a.P=a.g}return a.l}k.Mc=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a;a=Math.sqrt(a);var g=0,h=0,l,m;l=0;for(m=e.length;l<m;++l){var n=e[l],p=[],h=fd(d,g,n,f,a,b,h,p);c.push(p);g=n[n.length-1]}b.length=h;d=new R(null);$m(d,"XY",b,c);return d};
k.gk=function(a){if(0>a||this.c.length<=a)return null;var b;0===a?b=0:(b=this.c[a-1],b=b[b.length-1]);a=this.c[a].slice();var c=a[a.length-1];if(0!==b){var d,e;d=0;for(e=a.length;d<e;++d)a[d]-=b}d=new B(null);d.aa(this.ia,this.A.slice(b,c),a);return d};k.Wd=function(){var a=this.ia,b=this.A,c=this.c,d=[],e=0,f,g,h,l;f=0;for(g=c.length;f<g;++f){var m=c[f].slice(),n=m[m.length-1];if(0!==e)for(h=0,l=m.length;h<l;++h)m[h]-=e;h=new B(null);h.aa(a,b.slice(e,n),m);d.push(h);e=n}return d};k.X=function(){return"MultiPolygon"};
k.Na=function(a){a:{var b=Ti(this),c=this.c,d=this.a,e=0,f,g;f=0;for(g=c.length;f<g;++f){var h=c[f];if(od(b,e,h,d,a)){a=!0;break a}e=h[h.length-1]}a=!1}return a};k.ma=function(a,b){if(a){Rc(this,b,a,3);this.A||(this.A=[]);var c=this.A,d=this.a,e=this.c,f=0,e=e?e:[],g=0,h,l;h=0;for(l=a.length;h<l;++h)f=ad(c,f,a[h],d,e[g]),e[g++]=f,f=f[f.length-1];e.length=g;0===e.length?this.A.length=0:(c=e[e.length-1],this.A.length=0===c.length?0:c[c.length-1]);this.v()}else $m(this,"XY",null,this.c)};
    function $m(a, b, c, d) {
        Qc(a, b, c);
        a.c = d;
        a.v()
    }
    function an(a, b) {
        var c = a.ia, d = [], e = [], f, g, h;
        f = 0;
        for (g = b.length; f < g; ++f) {
            var l = b[f];
            0 === f && (c = l.ia);
            var m = d.length;
            h = l.Eb();
            var n, p;
            n = 0;
            for (p = h.length; n < p; ++n)h[n] += m;
            bb(d, l.ka());
            e.push(h)
        }
        $m(a, c, d, e)
    }
    function bn(a) {
        a = a ? a : {};
        Qm.call(this);
        this.b = a.geometryName
    }
    v(bn, Um);
    function cn(a,b){if(!a)return null;var c;if("number"===typeof a.x&&"number"===typeof a.y)c="Point";else if(a.points)c="MultiPoint";else if(a.paths)c=1===a.paths.length?"LineString":"MultiLineString";else if(a.rings){var d=a.rings,e=dn(a),f=[];c=[];var g,h;g=0;for(h=d.length;g<h;++g){var l=ab(d[g]);pd(l,0,l.length,e.length)?f.push([d[g]]):c.push(d[g])}for(;c.length;){d=c.shift();e=!1;for(g=f.length-1;0<=g;g--)if(Ib((new gd(f[g][0])).D(),(new gd(d)).D())){f[g].push(d);e=!0;break}e||f.push([d.reverse()])}a=
ua({},a);1===f.length?(c="Polygon",a.rings=f[0]):(c="MultiPolygon",a.rings=f)}return Tm((0,en[c])(a),!1,b)}function dn(a){var b="XY";!0===a.hasZ&&!0===a.hasM?b="XYZM":!0===a.hasZ?b="XYZ":!0===a.hasM&&(b="XYM");return b}function fn(a){a=a.ia;return{hasZ:"XYZ"===a||"XYZM"===a,hasM:"XYM"===a||"XYZM"===a}}
var en={Point:function(a){return void 0!==a.m&&void 0!==a.z?new A([a.x,a.y,a.z,a.m],"XYZM"):void 0!==a.z?new A([a.x,a.y,a.z],"XYZ"):void 0!==a.m?new A([a.x,a.y,a.m],"XYM"):new A([a.x,a.y])},LineString:function(a){return new O(a.paths[0],dn(a))},Polygon:function(a){return new B(a.rings,dn(a))},MultiPoint:function(a){return new Q(a.points,dn(a))},MultiLineString:function(a){return new P(a.paths,dn(a))},MultiPolygon:function(a){return new R(a.rings,dn(a))}},gn={Point:function(a){var b=a.Y(),c;a=a.ia;
"XYZ"===a?c={x:b[0],y:b[1],z:b[2]}:"XYM"===a?c={x:b[0],y:b[1],m:b[2]}:"XYZM"===a?c={x:b[0],y:b[1],z:b[2],m:b[3]}:"XY"===a?c={x:b[0],y:b[1]}:ha(!1,34);return c},LineString:function(a){var b=fn(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:[a.Y()]}},Polygon:function(a){var b=fn(a);return{hasZ:b.hasZ,hasM:b.hasM,rings:a.Y(!1)}},MultiPoint:function(a){var b=fn(a);return{hasZ:b.hasZ,hasM:b.hasM,points:a.Y()}},MultiLineString:function(a){var b=fn(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:a.Y()}},MultiPolygon:function(a){var b=
fn(a);a=a.Y(!1);for(var c=[],d=0;d<a.length;d++)for(var e=a[d].length-1;0<=e;e--)c.push(a[d][e]);return{hasZ:b.hasZ,hasM:b.hasM,rings:c}}};k=bn.prototype;k.Vc=function(a,b){var c=cn(a.geometry,b),d=new I;this.b&&d.Dc(this.b);d.Oa(c);b&&b.mf&&a.attributes[b.mf]&&d.Wb(a.attributes[b.mf]);a.attributes&&d.H(a.attributes);return d};
k.Gf=function(a,b){var c=b?b:{};if(a.features){var d=[],e=a.features,f,g;c.mf=a.objectIdFieldName;f=0;for(g=e.length;f<g;++f)d.push(this.Vc(e[f],c));return d}return[this.Vc(a,c)]};k.Ih=function(a,b){return cn(a,b)};k.Oh=function(a){return a.spatialReference&&a.spatialReference.wkid?qc("EPSG:"+a.spatialReference.wkid):null};function hn(a,b){return(0,gn[a.X()])(Tm(a,!0,b),b)}k.He=function(a,b){return hn(a,Sm(this,b))};
    k.Zc = function (a, b) {
        b = Sm(this, b);
        var c = {}, d = a.V();
        d && (c.geometry = hn(d, b));
        d = a.N();
        delete d[a.f];
        c.attributes = xa(d) ? {} : d;
        b && b.featureProjection && (c.spatialReference = {wkid: qc(b.featureProjection).eb.split(":").pop()});
        return c
    };
    k.Ge = function (a, b) {
        b = Sm(this, b);
        var c = [], d, e;
        d = 0;
        for (e = a.length; d < e; ++d)c.push(this.Zc(a[d], b));
        return {features: c}
    };
    function jn(a) {
        this.Hb = a
    }
    function kn(a) {
        this.Hb = a
    }
    v(kn, jn);
    function ln(a, b, c) {
        this.Hb = a;
        this.b = b;
        this.a = c
    }
    v(ln, kn);
    function mn(a, b) {
        ln.call(this, "And", a, b)
    }
    v(mn, ln);
    function nn(a, b, c) {
        this.Hb = "BBOX";
        this.geometryName = a;
        this.extent = b;
        this.srsName = c
    }
    v(nn, jn);
    function on(a, b) {
        this.Hb = a;
        this.b = b
    }
    v(on, jn);
    function pn(a, b, c, d) {
        on.call(this, a, b);
        this.g = c;
        this.a = d
    }
    v(pn, on);
    function qn(a, b, c) {
        pn.call(this, "PropertyIsEqualTo", a, b, c)
    }
    v(qn, pn);
    function rn(a, b) {
        pn.call(this, "PropertyIsGreaterThan", a, b)
    }
    v(rn, pn);
    function sn(a, b) {
        pn.call(this, "PropertyIsGreaterThanOrEqualTo", a, b)
    }
    v(sn, pn);
    function tn(a, b, c, d) {
        this.Hb = a;
        this.geometryName = b || "the_geom";
        this.geometry = c;
        this.srsName = d
    }
    v(tn, jn);
    function un(a, b, c) {
        tn.call(this, "Intersects", a, b, c)
    }
    v(un, tn);
    function vn(a, b, c) {
        on.call(this, "PropertyIsBetween", a);
        this.a = b;
        this.g = c
    }
    v(vn, on);
    function wn(a, b, c, d, e, f) {
        on.call(this, "PropertyIsLike", a);
        this.f = b;
        this.i = void 0 !== c ? c : "*";
        this.c = void 0 !== d ? d : ".";
        this.g = void 0 !== e ? e : "!";
        this.a = f
    }
    v(wn, on);
    function xn(a) {
        on.call(this, "PropertyIsNull", a)
    }
    v(xn, on);
    function yn(a, b) {
        pn.call(this, "PropertyIsLessThan", a, b)
    }
    v(yn, pn);
    function zn(a, b) {
        pn.call(this, "PropertyIsLessThanOrEqualTo", a, b)
    }
    v(zn, pn);
    function An(a) {
        this.Hb = "Not";
        this.condition = a
    }
    v(An, kn);
    function Bn(a, b, c) {
        pn.call(this, "PropertyIsNotEqualTo", a, b, c)
    }
    v(Bn, pn);
    function Cn(a, b) {
        ln.call(this, "Or", a, b)
    }
    v(Cn, ln);
    function Dn(a, b, c) {
        tn.call(this, "Within", a, b, c)
    }
    v(Dn, tn);
    function En(a, b) {
        return new mn(a, b)
    }
    function Fn(a, b, c) {
        return new nn(a, b, c)
    }
    function Gn(a) {
        Mc.call(this);
        this.f = a ? a : null;
        Hn(this)
    }
    v(Gn, Mc);
    function In(a) {
        var b = [], c, d;
        c = 0;
        for (d = a.length; c < d; ++c)b.push(a[c].clone());
        return b
    }
    function Jn(a) {
        var b, c;
        if (a.f)for (b = 0, c = a.f.length; b < c; ++b)Fa(a.f[b], "change", a.v, a)
    }
    function Hn(a) {
        var b, c;
        if (a.f)for (b = 0, c = a.f.length; b < c; ++b)w(a.f[b], "change", a.v, a)
    }
    k = Gn.prototype;
    k.clone = function () {
        var a = new Gn(null);
        a.Zh(this.f);
        return a
    };
    k.vb=function(a,b,c,d){if(d<Fb(this.D(),a,b))return d;var e=this.f,f,g;f=0;for(g=e.length;f<g;++f)d=e[f].vb(a,b,c,d);return d};k.Ac=function(a,b){var c=this.f,d,e;d=0;for(e=c.length;d<e;++d)if(c[d].Ac(a,b))return!0;return!1};k.Pd=function(a){Kb(Infinity,Infinity,-Infinity,-Infinity,a);for(var b=this.f,c=0,d=b.length;c<d;++c)Qb(a,b[c].D());return a};k.cf=function(){return In(this.f)};
k.pd=function(a){this.o!=this.g&&(va(this.i),this.j=0,this.o=this.g);if(0>a||0!==this.j&&a<this.j)return this;var b=a.toString();if(this.i.hasOwnProperty(b))return this.i[b];var c=[],d=this.f,e=!1,f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],l=h.pd(a);c.push(l);l!==h&&(e=!0)}if(e)return a=new Gn(null),Jn(a),a.f=c,Hn(a),a.v(),this.i[b]=a;this.j=a;return this};k.X=function(){return"GeometryCollection"};k.Na=function(a){var b=this.f,c,d;c=0;for(d=b.length;c<d;++c)if(b[c].Na(a))return!0;return!1};
k.rotate=function(a,b){for(var c=this.f,d=0,e=c.length;d<e;++d)c[d].rotate(a,b);this.v()};k.scale=function(a,b,c){c||(c=ac(this.D()));for(var d=this.f,e=0,f=d.length;e<f;++e)d[e].scale(a,b,c);this.v()};k.Zh=function(a){a=In(a);Jn(this);this.f=a;Hn(this);this.v()};k.oc=function(a){var b=this.f,c,d;c=0;for(d=b.length;c<d;++c)b[c].oc(a);this.v()};k.Pc=function(a,b){var c=this.f,d,e;d=0;for(e=c.length;d<e;++d)c[d].Pc(a,b);this.v()};k.la=function(){Jn(this);Mc.prototype.la.call(this)};function Kn(a){a=a?a:{};Qm.call(this);this.defaultDataProjection=qc(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326");a.featureProjection&&(this.j=qc(a.featureProjection));this.b=a.geometryName}v(Kn,Um);function Ln(a,b){return a?Tm((0,Mn[a.type])(a),!1,b):null}function Nn(a,b){return(0,On[a.X()])(Tm(a,!0,b),b)}
var Mn={Point:function(a){return new A(a.coordinates)},LineString:function(a){return new O(a.coordinates)},Polygon:function(a){return new B(a.coordinates)},MultiPoint:function(a){return new Q(a.coordinates)},MultiLineString:function(a){return new P(a.coordinates)},MultiPolygon:function(a){return new R(a.coordinates)},GeometryCollection:function(a,b){var c=a.geometries.map(function(a){return Ln(a,b)});return new Gn(c)}},On={Point:function(a){return{type:"Point",coordinates:a.Y()}},LineString:function(a){return{type:"LineString",
coordinates:a.Y()}},Polygon:function(a,b){var c;b&&(c=b.rightHanded);return{type:"Polygon",coordinates:a.Y(c)}},MultiPoint:function(a){return{type:"MultiPoint",coordinates:a.Y()}},MultiLineString:function(a){return{type:"MultiLineString",coordinates:a.Y()}},MultiPolygon:function(a,b){var c;b&&(c=b.rightHanded);return{type:"MultiPolygon",coordinates:a.Y(c)}},GeometryCollection:function(a,b){return{type:"GeometryCollection",geometries:a.f.map(function(a){var d=ua({},b);delete d.featureProjection;return Nn(a,
d)})}},Circle:function(){return{type:"GeometryCollection",geometries:[]}}};k=Kn.prototype;k.Vc=function(a,b){var c;c="Feature"===a.type?a:{type:"Feature",geometry:a};var d=Ln(c.geometry,b),e=new I;this.b&&e.Dc(this.b);e.Oa(d);void 0!==c.id&&e.Wb(c.id);c.properties&&e.H(c.properties);return e};k.Gf=function(a,b){var c;if("FeatureCollection"===a.type){c=[];var d=a.features,e,f;e=0;for(f=d.length;e<f;++e)c.push(this.Vc(d[e],b))}else c=[this.Vc(a,b)];return c};k.Ih=function(a,b){return Ln(a,b)};
k.Oh=function(a){a=a.crs;var b;a?"name"==a.type?b=qc(a.properties.name):"EPSG"==a.type?b=qc("EPSG:"+a.properties.code):ha(!1,36):b=this.defaultDataProjection;return b};k.Zc=function(a,b){b=Sm(this,b);var c={type:"Feature"},d=a.a;void 0!==d&&(c.id=d);(d=a.V())?c.geometry=Nn(d,b):c.geometry=null;d=a.N();delete d[a.f];xa(d)?c.properties=null:c.properties=d;return c};k.Ge=function(a,b){b=Sm(this,b);var c=[],d,e;d=0;for(e=a.length;d<e;++d)c.push(this.Zc(a[d],b));return{type:"FeatureCollection",features:c}};
k.He=function(a,b){return Nn(a,Sm(this,b))};function Pn(){this.f=new XMLSerializer;Qm.call(this)}v(Pn,Qm);k=Pn.prototype;k.X=function(){return"xml"};k.Ub=function(a,b){if(zm(a))return Qn(this,a,b);if(Am(a))return this.Gh(a,b);if("string"===typeof a){var c=Bm(a);return Qn(this,c,b)}return null};function Qn(a,b,c){a=Sn(a,b,c);return 0<a.length?a[0]:null}k.Ha=function(a,b){if(zm(a))return Sn(this,a,b);if(Am(a))return this.kc(a,b);if("string"===typeof a){var c=Bm(a);return Sn(this,c,b)}return[]};
function Sn(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&bb(d,a.kc(b,c));return d}k.Wc=function(a,b){if(zm(a))return this.u(a,b);if(Am(a)){var c=this.xe(a,[Rm(this,a,b?b:{})]);return c?c:null}return"string"===typeof a?(c=Bm(a),this.u(c,b)):null};k.Sa=function(a){return zm(a)?this.Lf(a):Am(a)?this.Ae(a):"string"===typeof a?(a=Bm(a),this.Lf(a)):null};k.Lf=function(){return this.defaultDataProjection};k.Ae=function(){return this.defaultDataProjection};
k.Fd=function(a,b){var c=this.B(a,b);return this.f.serializeToString(c)};k.$b=function(a,b){var c=this.a(a,b);return this.f.serializeToString(c)};k.$c=function(a,b){var c=this.T(a,b);return this.f.serializeToString(c)};function Tn(a){a=a?a:{};this.featureType=a.featureType;this.featureNS=a.featureNS;this.srsName=a.srsName;this.schemaLocation="";this.b={};this.b["http://www.opengis.net/gml"]={featureMember:Em(Tn.prototype.xd),featureMembers:Em(Tn.prototype.xd)};Pn.call(this)}v(Tn,Pn);var Un=/^[\s\xa0]*$/;k=Tn.prototype;
k.xd=function(a,b){var c=a.localName,d=null;if("FeatureCollection"==c)"http://www.opengis.net/wfs"===a.namespaceURI?d=N([],this.b,a,b,this):d=N(null,this.b,a,b,this);else if("featureMembers"==c||"featureMember"==c){var e=b[0],f=e.featureType,g=e.featureNS,h,l;if(!f&&a.childNodes){f=[];g={};h=0;for(l=a.childNodes.length;h<l;++h){var m=a.childNodes[h];if(1===m.nodeType){var n=m.nodeName.split(":").pop();if(-1===f.indexOf(n)){var p="",q=0,m=m.namespaceURI,t;for(t in g){if(g[t]===m){p=t;break}++q}p||
(p="p"+q,g[p]=m);f.push(p+":"+n)}}}"featureMember"!=c&&(e.featureType=f,e.featureNS=g)}"string"===typeof g&&(h=g,g={},g.p0=h);var e={},f=Array.isArray(f)?f:[f],u;for(u in g){n={};h=0;for(l=f.length;h<l;++h)(-1===f[h].indexOf(":")?"p0":f[h].split(":")[0])===u&&(n[f[h].split(":").pop()]="featureMembers"==c?Dm(this.Ff,this):Em(this.Ff,this));e[g[u]]=n}"featureMember"==c?d=N(void 0,e,a,b):d=N([],e,a,b)}null===d&&(d=[]);return d};
k.xe=function(a,b){var c=b[0];c.srsName=a.firstElementChild.getAttribute("srsName");var d=N(null,this.Yf,a,b,this);if(d)return Tm(d,!1,c)};
k.Ff=function(a,b){var c,d;(d=a.getAttribute("fid"))||(d=a.getAttributeNS("http://www.opengis.net/gml","id")||"");var e={},f;for(c=a.firstElementChild;c;c=c.nextElementSibling){var g=c.localName;if(0===c.childNodes.length||1===c.childNodes.length&&(3===c.firstChild.nodeType||4===c.firstChild.nodeType)){var h=xm(c,!1);Un.test(h)&&(h=void 0);e[g]=h}else"boundedBy"!==g&&(f=g),e[g]=this.xe(c,b)}c=new I(e);f&&c.Dc(f);d&&c.Wb(d);return c};
k.Nh=function(a,b){var c=this.we(a,b);if(c){var d=new A(null);d.aa("XYZ",c);return d}};k.Lh=function(a,b){var c=N([],this.Ji,a,b,this);if(c)return new Q(c)};k.Kh=function(a,b){var c=N([],this.Ii,a,b,this);if(c){var d=new P(null);Zm(d,c);return d}};k.Mh=function(a,b){var c=N([],this.Ki,a,b,this);if(c){var d=new R(null);an(d,c);return d}};k.Dh=function(a,b){Lm(this.Ni,a,b,this)};k.Mg=function(a,b){Lm(this.Gi,a,b,this)};k.Eh=function(a,b){Lm(this.Oi,a,b,this)};
k.ye=function(a,b){var c=this.we(a,b);if(c){var d=new O(null);d.aa("XYZ",c);return d}};k.oo=function(a,b){var c=N(null,this.Hd,a,b,this);if(c)return c};k.Jh=function(a,b){var c=this.we(a,b);if(c){var d=new gd(null);hd(d,"XYZ",c);return d}};k.ze=function(a,b){var c=N([null],this.Ke,a,b,this);if(c&&c[0]){var d=new B(null),e=c[0],f=[e.length],g,h;g=1;for(h=c.length;g<h;++g)bb(e,c[g]),f.push(e.length);d.aa("XYZ",e,f);return d}};k.we=function(a,b){return N(null,this.Hd,a,b,this)};
k.Ji={"http://www.opengis.net/gml":{pointMember:Dm(Tn.prototype.Dh),pointMembers:Dm(Tn.prototype.Dh)}};k.Ii={"http://www.opengis.net/gml":{lineStringMember:Dm(Tn.prototype.Mg),lineStringMembers:Dm(Tn.prototype.Mg)}};k.Ki={"http://www.opengis.net/gml":{polygonMember:Dm(Tn.prototype.Eh),polygonMembers:Dm(Tn.prototype.Eh)}};k.Ni={"http://www.opengis.net/gml":{Point:Dm(Tn.prototype.we)}};k.Gi={"http://www.opengis.net/gml":{LineString:Dm(Tn.prototype.ye)}};k.Oi={"http://www.opengis.net/gml":{Polygon:Dm(Tn.prototype.ze)}};
k.Id={"http://www.opengis.net/gml":{LinearRing:Em(Tn.prototype.oo)}};k.kc=function(a,b){var c={featureType:this.featureType,featureNS:this.featureNS};b&&ua(c,Rm(this,a,b));return this.xd(a,[c])||[]};k.Ae=function(a){return qc(this.srsName?this.srsName:a.firstElementChild.getAttribute("srsName"))};function Vn(a){a=xm(a,!1);return Wn(a)}function Wn(a){if(a=/^\s*(true|1)|(false|0)\s*$/.exec(a))return void 0!==a[1]||!1}function Xn(a){a=xm(a,!1);a=Date.parse(a);return isNaN(a)?void 0:a/1E3}function Yn(a){a=xm(a,!1);return Zn(a)}function Zn(a){if(a=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))return parseFloat(a[1])}function $n(a){a=xm(a,!1);return ao(a)}function ao(a){if(a=/^\s*(\d+)\s*$/.exec(a))return parseInt(a[1],10)}function S(a){return xm(a,!1).trim()}
    function bo(a, b) {
        co(a, b ? "1" : "0")
    }
    function eo(a, b) {
        a.appendChild(vm.createTextNode(b.toPrecision()))
    }
    function fo(a, b) {
        a.appendChild(vm.createTextNode(b.toString()))
    }
    function co(a, b) {
        a.appendChild(vm.createTextNode(b))
    }
    function go(a) {
        a = a ? a : {};
        Tn.call(this, a);
        this.s = void 0 !== a.surface ? a.surface : !1;
        this.i = void 0 !== a.curve ? a.curve : !1;
        this.l = void 0 !== a.multiCurve ? a.multiCurve : !0;
        this.o = void 0 !== a.multiSurface ? a.multiSurface : !0;
        this.schemaLocation = a.schemaLocation ? a.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"
    }
    v(go, Tn);
    k = go.prototype;
    k.so = function (a, b) {
        var c = N([], this.Hi, a, b, this);
        if (c) {
            var d = new P(null);
            Zm(d, c);
            return d
        }
    };
    k.to=function(a,b){var c=N([],this.Li,a,b,this);if(c){var d=new R(null);an(d,c);return d}};k.pg=function(a,b){Lm(this.Di,a,b,this)};k.ni=function(a,b){Lm(this.Si,a,b,this)};k.wo=function(a,b){return N([null],this.Mi,a,b,this)};k.yo=function(a,b){return N([null],this.Ri,a,b,this)};k.xo=function(a,b){return N([null],this.Ke,a,b,this)};k.ro=function(a,b){return N([null],this.Hd,a,b,this)};k.al=function(a,b){var c=N(void 0,this.Id,a,b,this);c&&b[b.length-1].push(c)};
k.vj=function(a,b){var c=N(void 0,this.Id,a,b,this);c&&(b[b.length-1][0]=c)};k.Ph=function(a,b){var c=N([null],this.Ti,a,b,this);if(c&&c[0]){var d=new B(null),e=c[0],f=[e.length],g,h;g=1;for(h=c.length;g<h;++g)bb(e,c[g]),f.push(e.length);d.aa("XYZ",e,f);return d}};k.Fh=function(a,b){var c=N([null],this.Ei,a,b,this);if(c){var d=new O(null);d.aa("XYZ",c);return d}};k.no=function(a,b){var c=N([null],this.Fi,a,b,this);return Kb(c[1][0],c[1][1],c[2][0],c[2][1])};
k.po=function(a,b){for(var c=xm(a,!1),d=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,e=[],f;f=d.exec(c);)e.push(parseFloat(f[1])),c=c.substr(f[0].length);if(""===c){c=b[0].srsName;d="enu";c&&(d=qc(c).b);if("neu"===d)for(c=0,d=e.length;c<d;c+=3)f=e[c],e[c]=e[c+1],e[c+1]=f;c=e.length;2==c&&e.push(0);return 0===c?void 0:e}};
k.Jf=function(a,b){var c=xm(a,!1).replace(/^\s*|\s*$/g,""),d=b[0].srsName,e=a.parentNode.getAttribute("srsDimension"),f="enu";d&&(f=qc(d).b);c=c.split(/\s+/);d=2;a.getAttribute("srsDimension")?d=ao(a.getAttribute("srsDimension")):a.getAttribute("dimension")?d=ao(a.getAttribute("dimension")):e&&(d=ao(e));for(var g,h,l=[],m=0,n=c.length;m<n;m+=d)e=parseFloat(c[m]),g=parseFloat(c[m+1]),h=3===d?parseFloat(c[m+2]):0,"en"===f.substr(0,2)?l.push(e,g,h):l.push(g,e,h);return l};
k.Hd={"http://www.opengis.net/gml":{pos:Em(go.prototype.po),posList:Em(go.prototype.Jf)}};k.Ke={"http://www.opengis.net/gml":{interior:go.prototype.al,exterior:go.prototype.vj}};
k.Yf={"http://www.opengis.net/gml":{Point:Em(Tn.prototype.Nh),MultiPoint:Em(Tn.prototype.Lh),LineString:Em(Tn.prototype.ye),MultiLineString:Em(Tn.prototype.Kh),LinearRing:Em(Tn.prototype.Jh),Polygon:Em(Tn.prototype.ze),MultiPolygon:Em(Tn.prototype.Mh),Surface:Em(go.prototype.Ph),MultiSurface:Em(go.prototype.to),Curve:Em(go.prototype.Fh),MultiCurve:Em(go.prototype.so),Envelope:Em(go.prototype.no)}};k.Hi={"http://www.opengis.net/gml":{curveMember:Dm(go.prototype.pg),curveMembers:Dm(go.prototype.pg)}};
k.Li={"http://www.opengis.net/gml":{surfaceMember:Dm(go.prototype.ni),surfaceMembers:Dm(go.prototype.ni)}};k.Di={"http://www.opengis.net/gml":{LineString:Dm(Tn.prototype.ye),Curve:Dm(go.prototype.Fh)}};k.Si={"http://www.opengis.net/gml":{Polygon:Dm(Tn.prototype.ze),Surface:Dm(go.prototype.Ph)}};k.Ti={"http://www.opengis.net/gml":{patches:Em(go.prototype.wo)}};k.Ei={"http://www.opengis.net/gml":{segments:Em(go.prototype.yo)}};k.Fi={"http://www.opengis.net/gml":{lowerCorner:Dm(go.prototype.Jf),upperCorner:Dm(go.prototype.Jf)}};
k.Mi={"http://www.opengis.net/gml":{PolygonPatch:Em(go.prototype.xo)}};k.Ri={"http://www.opengis.net/gml":{LineStringSegment:Em(go.prototype.ro)}};function ho(a,b,c){c=c[c.length-1].srsName;b=b.Y();for(var d=b.length,e=Array(d),f,g=0;g<d;++g){f=b[g];var h=g,l="enu";c&&(l=qc(c).b);e[h]="en"===l.substr(0,2)?f[0]+" "+f[1]:f[1]+" "+f[0]}co(a,e.join(" "))}
k.zi=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=wm(a.namespaceURI,"pos");a.appendChild(d);c=c[c.length-1].srsName;a="enu";c&&(a=qc(c).b);b=b.Y();co(d,"en"===a.substr(0,2)?b[0]+" "+b[1]:b[1]+" "+b[0])};var io={"http://www.opengis.net/gml":{lowerCorner:L(co),upperCorner:L(co)}};k=go.prototype;k.jp=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Mm({node:a},io,Jm,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};
k.wi=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=wm(a.namespaceURI,"posList");a.appendChild(d);ho(d,b,c)};k.Qi=function(a,b){var c=b[b.length-1],d=c.node,e=c.exteriorWritten;void 0===e&&(c.exteriorWritten=!0);return wm(d.namespaceURI,void 0!==e?"interior":"exterior")};
k.Ie=function(a,b,c){var d=c[c.length-1].srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Vd(),Mm({node:a,srsName:d},jo,this.Qi,b,c,void 0,this)):"Surface"===a.nodeName&&(d=wm(a.namespaceURI,"patches"),a.appendChild(d),a=wm(d.namespaceURI,"PolygonPatch"),d.appendChild(a),this.Ie(a,b,c))};
k.Ee=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=wm(a.namespaceURI,"posList"),a.appendChild(d),ho(d,b,c)):"Curve"===a.nodeName&&(d=wm(a.namespaceURI,"segments"),a.appendChild(d),a=wm(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Ee(a,b,c))};
k.yi=function(a,b,c){var d=c[c.length-1],e=d.srsName,d=d.surface;e&&a.setAttribute("srsName",e);b=b.Wd();Mm({node:a,srsName:e,surface:d},ko,this.c,b,c,void 0,this)};k.kp=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);b=b.je();Mm({node:a,srsName:d},lo,Hm("pointMember"),b,c,void 0,this)};k.xi=function(a,b,c){var d=c[c.length-1],e=d.srsName,d=d.curve;e&&a.setAttribute("srsName",e);b=b.od();Mm({node:a,srsName:e,curve:d},mo,this.c,b,c,void 0,this)};
k.Ai=function(a,b,c){var d=wm(a.namespaceURI,"LinearRing");a.appendChild(d);this.wi(d,b,c)};k.Bi=function(a,b,c){var d=this.g(b,c);d&&(a.appendChild(d),this.Ie(d,b,c))};k.lp=function(a,b,c){var d=wm(a.namespaceURI,"Point");a.appendChild(d);this.zi(d,b,c)};k.vi=function(a,b,c){var d=this.g(b,c);d&&(a.appendChild(d),this.Ee(d,b,c))};
k.ad=function(a,b,c){var d=c[c.length-1],e=ua({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=Lc(b,d.featureProjection,d.dataProjection):f=b:f=Tm(b,!0,d);Mm(e,no,this.g,[f],c,void 0,this)};
k.ti=function(a,b,c){var d=b.a;d&&a.setAttribute("fid",d);var d=c[c.length-1],e=d.featureNS,f=b.f;d.Cc||(d.Cc={},d.Cc[e]={});var g=b.N();b=[];var h=[],l;for(l in g){var m=g[l];null!==m&&(b.push(l),h.push(m),l==f||m instanceof Mc?l in d.Cc[e]||(d.Cc[e][l]=L(this.ad,this)):l in d.Cc[e]||(d.Cc[e][l]=L(co)))}l=ua({},d);l.node=a;Mm(l,d.Cc,Hm(void 0,e),h,c,b)};
var ko={"http://www.opengis.net/gml":{surfaceMember:L(go.prototype.Bi),polygonMember:L(go.prototype.Bi)}},lo={"http://www.opengis.net/gml":{pointMember:L(go.prototype.lp)}},mo={"http://www.opengis.net/gml":{lineStringMember:L(go.prototype.vi),curveMember:L(go.prototype.vi)}},jo={"http://www.opengis.net/gml":{exterior:L(go.prototype.Ai),interior:L(go.prototype.Ai)}},no={"http://www.opengis.net/gml":{Curve:L(go.prototype.Ee),MultiCurve:L(go.prototype.xi),Point:L(go.prototype.zi),MultiPoint:L(go.prototype.kp),
LineString:L(go.prototype.Ee),MultiLineString:L(go.prototype.xi),LinearRing:L(go.prototype.wi),Polygon:L(go.prototype.Ie),MultiPolygon:L(go.prototype.yi),Surface:L(go.prototype.Ie),MultiSurface:L(go.prototype.yi),Envelope:L(go.prototype.jp)}},oo={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};go.prototype.c=function(a,b){return wm("http://www.opengis.net/gml",oo[b[b.length-1].node.nodeName])};
go.prototype.g=function(a,b){var c=b[b.length-1],d=c.multiSurface,e=c.surface,f=c.curve,c=c.multiCurve,g;Array.isArray(a)?g="Envelope":(g=a.X(),"MultiPolygon"===g&&!0===d?g="MultiSurface":"Polygon"===g&&!0===e?g="Surface":"LineString"===g&&!0===f?g="Curve":"MultiLineString"===g&&!0===c&&(g="MultiCurve"));return wm("http://www.opengis.net/gml",g)};
go.prototype.T=function(a,b){b=Sm(this,b);var c=wm("http://www.opengis.net/gml","geom"),d={node:c,srsName:this.srsName,curve:this.i,surface:this.s,multiSurface:this.o,multiCurve:this.l};b&&ua(d,b);this.ad(c,a,[d]);return c};
go.prototype.a=function(a,b){b=Sm(this,b);var c=wm("http://www.opengis.net/gml","featureMembers");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var d={srsName:this.srsName,curve:this.i,surface:this.s,multiSurface:this.o,multiCurve:this.l,featureNS:this.featureNS,featureType:this.featureType};b&&ua(d,b);var d=[d],e=d[d.length-1],f=e.featureType,g=e.featureNS,h={};h[g]={};h[g][f]=L(this.ti,this);e=ua({},e);e.node=c;Mm(e,h,Hm(f,g),a,d);return c};function po(a){a=a?a:{};Tn.call(this,a);this.b["http://www.opengis.net/gml"].featureMember=Dm(Tn.prototype.xd);this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}v(po,Tn);k=po.prototype;
k.Hh=function(a,b){var c=xm(a,!1).replace(/^\s*|\s*$/g,""),d=b[0].srsName,e=a.parentNode.getAttribute("srsDimension"),f="enu";d&&(d=qc(d))&&(f=d.b);c=c.split(/[\s,]+/);d=2;a.getAttribute("srsDimension")?d=ao(a.getAttribute("srsDimension")):a.getAttribute("dimension")?d=ao(a.getAttribute("dimension")):e&&(d=ao(e));for(var g,h,l=[],m=0,n=c.length;m<n;m+=d)e=parseFloat(c[m]),g=parseFloat(c[m+1]),h=3===d?parseFloat(c[m+2]):0,"en"===f.substr(0,2)?l.push(e,g,h):l.push(g,e,h);return l};
k.lo=function(a,b){var c=N([null],this.Ci,a,b,this);return Kb(c[1][0],c[1][1],c[1][3],c[1][4])};k.Zk=function(a,b){var c=N(void 0,this.Id,a,b,this);c&&b[b.length-1].push(c)};k.Tn=function(a,b){var c=N(void 0,this.Id,a,b,this);c&&(b[b.length-1][0]=c)};k.Hd={"http://www.opengis.net/gml":{coordinates:Em(po.prototype.Hh)}};k.Ke={"http://www.opengis.net/gml":{innerBoundaryIs:po.prototype.Zk,outerBoundaryIs:po.prototype.Tn}};k.Ci={"http://www.opengis.net/gml":{coordinates:Dm(po.prototype.Hh)}};
k.Yf={"http://www.opengis.net/gml":{Point:Em(Tn.prototype.Nh),MultiPoint:Em(Tn.prototype.Lh),LineString:Em(Tn.prototype.ye),MultiLineString:Em(Tn.prototype.Kh),LinearRing:Em(Tn.prototype.Jh),Polygon:Em(Tn.prototype.ze),MultiPolygon:Em(Tn.prototype.Mh),Box:Em(po.prototype.lo)}};function qo(a){a=a?a:{};Pn.call(this);this.defaultDataProjection=qc("EPSG:4326");this.b=a.readExtensions}v(qo,Pn);var ro=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function so(a,b,c){a.push(parseFloat(b.getAttribute("lon")),parseFloat(b.getAttribute("lat")));"ele"in c?(a.push(c.ele),delete c.ele):a.push(0);"time"in c?(a.push(c.time),delete c.time):a.push(0);return a}function to(a,b){var c=b[b.length-1],d=a.getAttribute("href");null!==d&&(c.link=d);Lm(uo,a,b)}
function vo(a,b){b[b.length-1].extensionsNode_=a}function wo(a,b){var c=b[0],d=N({flatCoordinates:[]},xo,a,b);if(d){var e=d.flatCoordinates;delete d.flatCoordinates;var f=new O(null);f.aa("XYZM",e);Tm(f,!1,c);c=new I(f);c.H(d);return c}}function yo(a,b){var c=b[0],d=N({flatCoordinates:[],ends:[]},zo,a,b);if(d){var e=d.flatCoordinates;delete d.flatCoordinates;var f=d.ends;delete d.ends;var g=new P(null);g.aa("XYZM",e,f);Tm(g,!1,c);c=new I(g);c.H(d);return c}}
function Ao(a,b){var c=b[0],d=N({},Bo,a,b);if(d){var e=so([],a,d),e=new A(e,"XYZM");Tm(e,!1,c);c=new I(e);c.H(d);return c}}
var Co={rte:wo,trk:yo,wpt:Ao},Do=M(ro,{rte:Dm(wo),trk:Dm(yo),wpt:Dm(Ao)}),uo=M(ro,{text:J(S,"linkText"),type:J(S,"linkType")}),xo=M(ro,{name:J(S),cmt:J(S),desc:J(S),src:J(S),link:to,number:J($n),extensions:vo,type:J(S),rtept:function(a,b){var c=N({},Eo,a,b);c&&so(b[b.length-1].flatCoordinates,a,c)}}),Eo=M(ro,{ele:J(Yn),time:J(Xn)}),zo=M(ro,{name:J(S),cmt:J(S),desc:J(S),src:J(S),link:to,number:J($n),type:J(S),extensions:vo,trkseg:function(a,b){var c=b[b.length-1];Lm(Fo,a,b);c.ends.push(c.flatCoordinates.length)}}),
Fo=M(ro,{trkpt:function(a,b){var c=N({},Go,a,b);c&&so(b[b.length-1].flatCoordinates,a,c)}}),Go=M(ro,{ele:J(Yn),time:J(Xn)}),Bo=M(ro,{ele:J(Yn),time:J(Xn),magvar:J(Yn),geoidheight:J(Yn),name:J(S),cmt:J(S),desc:J(S),src:J(S),link:to,sym:J(S),type:J(S),fix:J(S),sat:J($n),hdop:J(Yn),vdop:J(Yn),pdop:J(Yn),ageofdgpsdata:J(Yn),dgpsid:J($n),extensions:vo});
function Ho(a,b){b||(b=[]);for(var c=0,d=b.length;c<d;++c){var e=b[c];if(a.b){var f=e.get("extensionsNode_")||null;a.b(e,f)}e.set("extensionsNode_",void 0)}}qo.prototype.Gh=function(a,b){if(!Za(ro,a.namespaceURI))return null;var c=Co[a.localName];if(!c)return null;c=c(a,[Rm(this,a,b)]);if(!c)return null;Ho(this,[c]);return c};qo.prototype.kc=function(a,b){if(!Za(ro,a.namespaceURI))return[];if("gpx"==a.localName){var c=N([],Do,a,[Rm(this,a,b)]);if(c)return Ho(this,c),c}return[]};
function Io(a,b,c){a.setAttribute("href",b);b=c[c.length-1].properties;Mm({node:a},Jo,Jm,[b.linkText,b.linkType],c,Ko)}function Lo(a,b,c){var d=c[c.length-1],e=d.node.namespaceURI,f=d.properties;a.setAttributeNS(null,"lat",b[1]);a.setAttributeNS(null,"lon",b[0]);switch(d.geometryLayout){case "XYZM":0!==b[3]&&(f.time=b[3]);case "XYZ":0!==b[2]&&(f.ele=b[2]);break;case "XYM":0!==b[2]&&(f.time=b[2])}b="rtept"==a.nodeName?Mo[e]:No[e];d=Km(f,b);Mm({node:a,properties:f},Oo,Jm,d,c,b)}
var Ko=["text","type"],Jo=M(ro,{text:L(co),type:L(co)}),Po=M(ro,"name cmt desc src link number type rtept".split(" ")),Qo=M(ro,{name:L(co),cmt:L(co),desc:L(co),src:L(co),link:L(Io),number:L(fo),type:L(co),rtept:Gm(L(Lo))}),Mo=M(ro,["ele","time"]),Ro=M(ro,"name cmt desc src link number type trkseg".split(" ")),Uo=M(ro,{name:L(co),cmt:L(co),desc:L(co),src:L(co),link:L(Io),number:L(fo),type:L(co),trkseg:Gm(L(function(a,b,c){Mm({node:a,geometryLayout:b.ia,properties:{}},So,To,b.Y(),c)}))}),To=Hm("trkpt"),
So=M(ro,{trkpt:L(Lo)}),No=M(ro,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),Oo=M(ro,{ele:L(eo),time:L(function(a,b){var c=new Date(1E3*b);a.appendChild(vm.createTextNode(c.getUTCFullYear()+"-"+pb(c.getUTCMonth()+1)+"-"+pb(c.getUTCDate())+"T"+pb(c.getUTCHours())+":"+pb(c.getUTCMinutes())+":"+pb(c.getUTCSeconds())+"Z"))}),magvar:L(eo),geoidheight:L(eo),name:L(co),cmt:L(co),desc:L(co),src:L(co),link:L(Io),sym:L(co),type:L(co),fix:L(co),
sat:L(fo),hdop:L(eo),vdop:L(eo),pdop:L(eo),ageofdgpsdata:L(eo),dgpsid:L(fo)}),Vo={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function Wo(a,b){var c=a.V();if(c&&(c=Vo[c.X()]))return wm(b[b.length-1].node.namespaceURI,c)}
var Xo=M(ro,{rte:L(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Tm(b,!0,d),a.geometryLayout=b.ia,e.rtept=b.Y();d=Po[c[c.length-1].node.namespaceURI];e=Km(e,d);Mm(a,Qo,Jm,e,c,d)}),trk:L(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Tm(b,!0,d),e.trkseg=b.od();d=Ro[c[c.length-1].node.namespaceURI];e=Km(e,d);Mm(a,Uo,Jm,e,c,d)}),wpt:L(function(a,b,c){var d=c[0],e=c[c.length-1];e.properties=b.N();if(b=b.V())b=Tm(b,!0,d),e.geometryLayout=b.ia,Lo(a,b.Y(),
c)})});qo.prototype.a=function(a,b){b=Sm(this,b);var c=wm("http://www.topografix.com/GPX/1/1","gpx");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd");c.setAttribute("version","1.1");c.setAttribute("creator","OpenLayers 3");Mm({node:c},Xo,Wo,a,[b]);return c};function Yo(){Qm.call(this)}v(Yo,Qm);function Zo(a){return"string"===typeof a?a:""}k=Yo.prototype;k.X=function(){return"text"};k.Ub=function(a,b){return this.wd(Zo(a),Sm(this,b))};k.Ha=function(a,b){return this.Hf(Zo(a),Sm(this,b))};k.Wc=function(a,b){return this.yd(Zo(a),Sm(this,b))};k.Sa=function(){return this.defaultDataProjection};k.Fd=function(a,b){return this.Fe(a,Sm(this,b))};k.$b=function(a,b){return this.ui(a,Sm(this,b))};k.$c=function(a,b){return this.Gd(a,Sm(this,b))};function $o(a){a=a?a:{};Qm.call(this);this.defaultDataProjection=qc("EPSG:4326");this.b=a.altitudeMode?a.altitudeMode:ap}v($o,Yo);var bp=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,cp=/^H.([A-Z]{3}).*?:(.*)/,dp=/^HFDTE(\d{2})(\d{2})(\d{2})/,ep=/\r\n|\r|\n/;
$o.prototype.wd=function(a,b){var c=this.b,d=a.split(ep),e={},f=[],g=2E3,h=0,l=1,m=-1,n,p;n=0;for(p=d.length;n<p;++n){var q=d[n],t;if("B"==q.charAt(0)){if(t=bp.exec(q)){var q=parseInt(t[1],10),u=parseInt(t[2],10),y=parseInt(t[3],10),x=parseInt(t[4],10)+parseInt(t[5],10)/6E4;"S"==t[6]&&(x=-x);var C=parseInt(t[7],10)+parseInt(t[8],10)/6E4;"W"==t[9]&&(C=-C);f.push(C,x);c!=ap&&f.push(c==fp?parseInt(t[11],10):c==gp?parseInt(t[12],10):0);t=Date.UTC(g,h,l,q,u,y);t<m&&(t=Date.UTC(g,h,l+1,q,u,y));f.push(t/
1E3);m=t}}else"H"==q.charAt(0)&&((t=dp.exec(q))?(l=parseInt(t[1],10),h=parseInt(t[2],10)-1,g=2E3+parseInt(t[3],10)):(t=cp.exec(q))&&(e[t[1]]=t[2].trim()))}if(0===f.length)return null;d=new O(null);d.aa(c==ap?"XYM":"XYZM",f);c=new I(Tm(d,!1,b));c.H(e);return c};$o.prototype.Hf=function(a,b){var c=this.wd(a,b);return c?[c]:[]};var gp="barometric",fp="gps",ap="none";function hp(a,b,c,d,e,f){Ma.call(this);this.l=null;this.a=a?a:new Image;null!==d&&(this.a.crossOrigin=d);this.c=f?document.createElement("CANVAS"):null;this.j=f;this.i=null;this.f=e;this.g=c;this.o=b;this.s=!1;this.f==li&&ip(this)}v(hp,Ma);function ip(a){var b=De(1,1);try{b.drawImage(a.a,0,0),b.getImageData(0,0,1,1)}catch(c){a.s=!0}}hp.prototype.T=function(){this.f=ki;this.i.forEach(za);this.i=null;this.b("change")};
hp.prototype.u=function(){this.f=li;this.g&&(this.a.width=this.g[0],this.a.height=this.g[1]);this.g=[this.a.width,this.a.height];this.i.forEach(za);this.i=null;ip(this);if(!this.s&&null!==this.j){this.c.width=this.a.width;this.c.height=this.a.height;var a=this.c.getContext("2d");a.drawImage(this.a,0,0);for(var b=a.getImageData(0,0,this.a.width,this.a.height),c=b.data,d=this.j[0]/255,e=this.j[1]/255,f=this.j[2]/255,g=0,h=c.length;g<h;g+=4)c[g]*=d,c[g+1]*=e,c[g+2]*=f;a.putImageData(b,0,0)}this.b("change")};
hp.prototype.load=function(){if(this.f==ji){this.f=mi;this.i=[Ea(this.a,"error",this.T,this),Ea(this.a,"load",this.u,this)];try{this.a.src=this.o}catch(a){this.T()}}};function jp(a){a=a||{};this.f=void 0!==a.anchor?a.anchor:[.5,.5];this.j=null;this.a=void 0!==a.anchorOrigin?a.anchorOrigin:kp;this.B=void 0!==a.anchorXUnits?a.anchorXUnits:lp;this.G=void 0!==a.anchorYUnits?a.anchorYUnits:lp;this.na=void 0!==a.crossOrigin?a.crossOrigin:null;var b=void 0!==a.img?a.img:null,c=void 0!==a.imgSize?a.imgSize:null,d=a.src;ha(!(void 0!==d&&b),4);ha(!b||b&&c,5);void 0!==d&&0!==d.length||!b||(d=b.src||ea(b).toString());ha(void 0!==d&&0<d.length,6);var e=void 0!==a.src?ji:li;
this.i=void 0!==a.color?ye(a.color):null;var f=this.na,g=this.i,h=Mh.get(d,f,g);h||(h=new hp(b,d,c,f,e,g),Mh.set(d,f,g,h));this.b=h;this.S=void 0!==a.offset?a.offset:[0,0];this.g=void 0!==a.offsetOrigin?a.offsetOrigin:kp;this.s=null;this.C=void 0!==a.size?a.size:null;ri.call(this,{opacity:void 0!==a.opacity?a.opacity:1,rotation:void 0!==a.rotation?a.rotation:0,scale:void 0!==a.scale?a.scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:
!1})}v(jp,ri);k=jp.prototype;
k.clone=function(){var a=this.Tb(1),b;if(this.b.f===li)if("IMG"===a.tagName.toUpperCase())b=a.cloneNode(!0);else{b=document.createElement("canvas");var c=b.getContext("2d");b.width=a.width;b.height=a.height;c.drawImage(a,0,0)}return new jp({anchor:this.f.slice(),anchorOrigin:this.a,anchorXUnits:this.B,anchorYUnits:this.G,crossOrigin:this.na,color:this.i&&this.i.slice?this.i.slice():this.i||void 0,img:b?b:void 0,imgSize:b?this.b.g.slice():void 0,src:b?void 0:this.b.o,offset:this.S.slice(),offsetOrigin:this.g,
size:null!==this.C?this.C.slice():void 0,opacity:this.l,scale:this.c,snapToPixel:this.u,rotation:this.o,rotateWithView:this.T})};k.cc=function(){if(this.j)return this.j;var a=this.f,b=this.Gb();if(this.B==lp||this.G==lp){if(!b)return null;a=this.f.slice();this.B==lp&&(a[0]*=b[0]);this.G==lp&&(a[1]*=b[1])}if(this.a!=kp){if(!b)return null;a===this.f&&(a=this.f.slice());if(this.a==mp||this.a==np)a[0]=-a[0]+b[0];if(this.a==op||this.a==np)a[1]=-a[1]+b[1]}return this.j=a};
k.Tb=function(){var a=this.b;return a.c?a.c:a.a};k.md=function(){return this.b.g};k.vd=function(){return this.b.f};k.pe=function(){var a=this.b;if(!a.l)if(a.s){var b=a.g[0],c=a.g[1],d=De(b,c);d.fillRect(0,0,b,c);a.l=d.canvas}else a.l=a.a;return a.l};k.jc=function(){if(this.s)return this.s;var a=this.S;if(this.g!=kp){var b=this.Gb(),c=this.b.g;if(!b||!c)return null;a=a.slice();if(this.g==mp||this.g==np)a[0]=c[0]-b[0]-a[0];if(this.g==op||this.g==np)a[1]=c[1]-b[1]-a[1]}return this.s=a};k.sn=function(){return this.b.o};
k.Gb=function(){return this.C?this.C:this.b.g};k.pf=function(a,b){return w(this.b,"change",a,b)};k.load=function(){this.b.load()};k.Uf=function(a,b){Fa(this.b,"change",a,b)};var lp="fraction",op="bottom-left",np="bottom-right",kp="top-left",mp="top-right";function pp(a){a=a||{};this.g=a.font;this.j=a.rotation;this.s=a.rotateWithView;this.a=a.scale;this.T=a.text;this.l=a.textAlign;this.o=a.textBaseline;this.b=void 0!==a.fill?a.fill:new wi({color:"#333"});this.f=void 0!==a.stroke?a.stroke:null;this.c=void 0!==a.offsetX?a.offsetX:0;this.i=void 0!==a.offsetY?a.offsetY:0}k=pp.prototype;
k.clone=function(){return new pp({font:this.g,rotation:this.j,rotateWithView:this.s,scale:this.a,text:this.Fa(),textAlign:this.l,textBaseline:this.o,fill:this.b?this.b.clone():void 0,stroke:this.f?this.f.clone():void 0,offsetX:this.c,offsetY:this.i})};k.Lj=function(){return this.g};k.Zj=function(){return this.c};k.$j=function(){return this.i};k.In=function(){return this.b};k.Jn=function(){return this.s};k.Kn=function(){return this.j};k.Ln=function(){return this.a};k.Mn=function(){return this.f};
k.Fa=function(){return this.T};k.lk=function(){return this.l};k.mk=function(){return this.o};k.Yh=function(a){this.g=a};k.di=function(a){this.c=a};k.ei=function(a){this.i=a};k.Xh=function(a){this.b=a};k.Nn=function(a){this.j=a};k.Ah=function(a){this.a=a};k.gi=function(a){this.f=a};k.hi=function(a){this.T=a};k.ii=function(a){this.l=a};k.Vo=function(a){this.o=a};function qp(a){a=a?a:{};Pn.call(this);this.defaultDataProjection=qc("EPSG:4326");var b;a.defaultStyle?b=a.defaultStyle:(b=rp)||(sp=[255,255,255,1],tp=new wi({color:sp}),up=[20,2],vp=wp="pixels",xp=[64,64],yp="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",zp=.5,Ap=new jp({anchor:up,anchorOrigin:op,anchorXUnits:wp,anchorYUnits:vp,crossOrigin:"anonymous",rotation:0,scale:zp,size:xp,src:yp}),Bp="NO_IMAGE",Cp=new xi({color:sp,width:1}),Dp=new xi({color:[51,51,51,1],width:2}),Ep=new pp({font:"bold 16px Helvetica",
fill:tp,stroke:Dp,scale:.8}),Fp=new yi({fill:tp,image:Ap,text:Ep,stroke:Cp,zIndex:0}),b=rp=[Fp]);this.g=b;this.c=void 0!==a.extractStyles?a.extractStyles:!0;this.l=void 0!==a.writeStyles?a.writeStyles:!0;this.b={};this.i=void 0!==a.showPointNames?a.showPointNames:!0}var rp,sp,tp,up,wp,vp,xp,yp,zp,Ap,Bp,Cp,Dp,Ep,Fp;v(qp,Pn);
var Gp=["http://www.google.com/kml/ext/2.2"],Hp=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],Ip={fraction:lp,pixels:"pixels"};
function Jp(a,b){var c,d=[0,0],e="start";if(a.a){c=a.a.md();null===c&&(c=xp);var f=a.a.c;isNaN(f)&&(f=zp);2==c.length&&(d[0]=f*c[0]/2,d[1]=-f*c[1]/2,e="left")}null!==a.Fa()?(f=a.Fa(),c=f.clone(),c.Yh(f.g||Ep.g),c.Ah(f.a||Ep.a),c.Xh(f.b||Ep.b),c.gi(f.f||Dp)):c=Ep.clone();c.hi(b);c.di(d[0]);c.ei(d[1]);c.ii(e);return new yi({text:c})}
function Kp(a,b,c,d,e){return function(){var f=e,g="";f&&this.V()&&(f="Point"===this.V().X());f&&(g=this.get("name"),f=f&&g);if(a)return f?(f=Jp(a[0],g),a.concat(f)):a;if(b){var h=Lp(b,c,d);return f?(f=Jp(h[0],g),h.concat(f)):h}return f?(f=Jp(c[0],g),c.concat(f)):c}}function Lp(a,b,c){return Array.isArray(a)?a:"string"===typeof a?(!(a in c)&&"#"+a in c&&(a="#"+a),Lp(c[a],b,c)):b}
function Mp(a){a=xm(a,!1);if(a=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))return a=a[1],[parseInt(a.substr(6,2),16),parseInt(a.substr(4,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(0,2),16)/255]}function Np(a){a=xm(a,!1);for(var b=[],c=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,d;d=c.exec(a);)b.push(parseFloat(d[1]),parseFloat(d[2]),d[3]?parseFloat(d[3]):0),a=a.substr(d[0].length);return""!==a?void 0:b}
function Op(a){var b=xm(a,!1).trim();return a.baseURI?(new URL(b,a.baseURI)).href:b}function Pp(a){return Yn(a)}function Qp(a,b){return N(null,Rp,a,b)}function Sp(a,b){var c=N({A:[],si:[]},Tp,a,b);if(c){var d=c.A,c=c.si,e,f;e=0;for(f=Math.min(d.length,c.length);e<f;++e)d[4*e+3]=c[e];c=new O(null);c.aa("XYZM",d);return c}}function Up(a,b){var c=N({},Vp,a,b),d=N(null,Wp,a,b);if(d){var e=new O(null);e.aa("XYZ",d);e.H(c);return e}}
function Xp(a,b){var c=N({},Vp,a,b),d=N(null,Wp,a,b);if(d){var e=new B(null);e.aa("XYZ",d,[d.length]);e.H(c);return e}}
function Yp(a,b){var c=N([],Zp,a,b);if(!c)return null;if(0===c.length)return new Gn(c);var d,e=!0,f=c[0].X(),g,h,l;h=1;for(l=c.length;h<l;++h)if(g=c[h],g.X()!=f){e=!1;break}if(e)if("Point"==f){d=c[0];e=d.ia;f=d.ka();h=1;for(l=c.length;h<l;++h)g=c[h],bb(f,g.ka());d=new Q(null);d.aa(e,f);$p(d,c)}else"LineString"==f?(d=new P(null),Zm(d,c),$p(d,c)):"Polygon"==f?(d=new R(null),an(d,c),$p(d,c)):"GeometryCollection"==f?d=new Gn(c):ha(!1,37);else d=new Gn(c);return d}
function aq(a,b){var c=N({},Vp,a,b),d=N(null,Wp,a,b);if(d){var e=new A(null);e.aa("XYZ",d);e.H(c);return e}}function bq(a,b){var c=N({},Vp,a,b),d=N([null],cq,a,b);if(d&&d[0]){var e=new B(null),f=d[0],g=[f.length],h,l;h=1;for(l=d.length;h<l;++h)bb(f,d[h]),g.push(f.length);e.aa("XYZ",f,g);e.H(c);return e}}
function dq(a,b){var c=N({},eq,a,b);if(!c)return null;var d="fillStyle"in c?c.fillStyle:tp,e=c.fill;void 0===e||e||(d=null);e="imageStyle"in c?c.imageStyle:Ap;e==Bp&&(e=void 0);var f="textStyle"in c?c.textStyle:Ep,g="strokeStyle"in c?c.strokeStyle:Cp,c=c.outline;void 0===c||c||(g=null);return[new yi({fill:d,image:e,stroke:g,text:f,zIndex:void 0})]}
function $p(a,b){var c=b.length,d=Array(b.length),e=Array(b.length),f,g,h,l;h=l=!1;for(g=0;g<c;++g)f=b[g],d[g]=f.get("extrude"),e[g]=f.get("altitudeMode"),h=h||void 0!==d[g],l=l||e[g];h&&a.set("extrude",d);l&&a.set("altitudeMode",e)}function fq(a,b){Lm(gq,a,b)}
var hq=M(Hp,{value:Em(S)}),gq=M(Hp,{Data:function(a,b){var c=a.getAttribute("name");if(null!==c){var d=N(void 0,hq,a,b);d&&(b[b.length-1][c]=d)}},SchemaData:function(a,b){Lm(iq,a,b)}}),Vp=M(Hp,{extrude:J(Vn),altitudeMode:J(S)}),Rp=M(Hp,{coordinates:Em(Np)}),cq=M(Hp,{innerBoundaryIs:function(a,b){var c=N(void 0,jq,a,b);c&&b[b.length-1].push(c)},outerBoundaryIs:function(a,b){var c=N(void 0,kq,a,b);c&&(b[b.length-1][0]=c)}}),Tp=M(Hp,{when:function(a,b){var c=b[b.length-1].si,d=xm(a,!1),d=Date.parse(d);
c.push(isNaN(d)?0:d)}},M(Gp,{coord:function(a,b){var c=b[b.length-1].A,d=xm(a,!1);(d=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(d))?c.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]),0):c.push(0,0,0,0)}})),Wp=M(Hp,{coordinates:Em(Np)}),lq=M(Hp,{href:J(Op)},M(Gp,{x:J(Yn),y:J(Yn),w:J(Yn),h:J(Yn)})),mq=M(Hp,{Icon:J(function(a,b){var c=N({},lq,a,b);return c?c:null}),heading:J(Yn),hotSpot:J(function(a){var b=
a.getAttribute("xunits"),c=a.getAttribute("yunits");return{x:parseFloat(a.getAttribute("x")),Wf:Ip[b],y:parseFloat(a.getAttribute("y")),Xf:Ip[c]}}),scale:J(Pp)}),jq=M(Hp,{LinearRing:Em(Qp)}),nq=M(Hp,{color:J(Mp),scale:J(Pp)}),oq=M(Hp,{color:J(Mp),width:J(Yn)}),Zp=M(Hp,{LineString:Dm(Up),LinearRing:Dm(Xp),MultiGeometry:Dm(Yp),Point:Dm(aq),Polygon:Dm(bq)}),pq=M(Gp,{Track:Dm(Sp)}),rq=M(Hp,{ExtendedData:fq,Link:function(a,b){Lm(qq,a,b)},address:J(S),description:J(S),name:J(S),open:J(Vn),phoneNumber:J(S),
visibility:J(Vn)}),qq=M(Hp,{href:J(Op)}),kq=M(Hp,{LinearRing:Em(Qp)}),sq=M(Hp,{Style:J(dq),key:J(S),styleUrl:J(Op)}),uq=M(Hp,{ExtendedData:fq,MultiGeometry:J(Yp,"geometry"),LineString:J(Up,"geometry"),LinearRing:J(Xp,"geometry"),Point:J(aq,"geometry"),Polygon:J(bq,"geometry"),Style:J(dq),StyleMap:function(a,b){var c=N(void 0,tq,a,b);if(c){var d=b[b.length-1];Array.isArray(c)?d.Style=c:"string"===typeof c?d.styleUrl=c:ha(!1,38)}},address:J(S),description:J(S),name:J(S),open:J(Vn),phoneNumber:J(S),
styleUrl:J(Op),visibility:J(Vn)},M(Gp,{MultiTrack:J(function(a,b){var c=N([],pq,a,b);if(c){var d=new P(null);Zm(d,c);return d}},"geometry"),Track:J(Sp,"geometry")})),vq=M(Hp,{color:J(Mp),fill:J(Vn),outline:J(Vn)}),iq=M(Hp,{SimpleData:function(a,b){var c=a.getAttribute("name");if(null!==c){var d=S(a);b[b.length-1][c]=d}}}),eq=M(Hp,{IconStyle:function(a,b){var c=N({},mq,a,b);if(c){var d=b[b.length-1],e="Icon"in c?c.Icon:{},f=!("Icon"in c)||0<Object.keys(e).length,g,h=e.href;h?g=h:f&&(g=yp);var l,m,
n;(h=c.hotSpot)?(l=[h.x,h.y],m=h.Wf,n=h.Xf):g===yp?(l=up,m=wp,n=vp):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g)&&(l=[.5,0],n=m=lp);var p,h=e.x,q=e.y;void 0!==h&&void 0!==q&&(p=[h,q]);var t,h=e.w,e=e.h;void 0!==h&&void 0!==e&&(t=[h,e]);var u,e=c.heading;void 0!==e&&(u=na(e));c=c.scale;c=isNaN(c)||void 0===c?zp:c*zp;f?(g==yp&&(t=xp,void 0===c&&(c=zp)),f=new jp({anchor:l,anchorOrigin:op,anchorXUnits:m,anchorYUnits:n,crossOrigin:"anonymous",offset:p,offsetOrigin:op,rotation:u,scale:c,size:t,src:g}),
d.imageStyle=f):d.imageStyle=Bp}},LabelStyle:function(a,b){var c=N({},nq,a,b);c&&(b[b.length-1].textStyle=new pp({fill:new wi({color:"color"in c?c.color:sp}),scale:c.scale}))},LineStyle:function(a,b){var c=N({},oq,a,b);c&&(b[b.length-1].strokeStyle=new xi({color:"color"in c?c.color:sp,width:"width"in c?c.width:1}))},PolyStyle:function(a,b){var c=N({},vq,a,b);if(c){var d=b[b.length-1];d.fillStyle=new wi({color:"color"in c?c.color:sp});var e=c.fill;void 0!==e&&(d.fill=e);c=c.outline;void 0!==c&&(d.outline=
c)}}}),tq=M(Hp,{Pair:function(a,b){var c=N({},sq,a,b);if(c){var d=c.key;d&&"normal"==d&&((d=c.styleUrl)&&(b[b.length-1]=d),(c=c.Style)&&(b[b.length-1]=c))}}});k=qp.prototype;k.Ef=function(a,b){var c=M(Hp,{Document:Cm(this.Ef,this),Folder:Cm(this.Ef,this),Placemark:Dm(this.Kf,this),Style:this.Ao.bind(this),StyleMap:this.zo.bind(this)});if(c=N([],c,a,b,this))return c};
k.Kf=function(a,b){var c=N({geometry:null},uq,a,b);if(c){var d=new I,e=a.getAttribute("id");null!==e&&d.Wb(e);var e=b[0],f=c.geometry;f&&Tm(f,!1,e);d.Oa(f);delete c.geometry;this.c&&d.sf(Kp(c.Style,c.styleUrl,this.g,this.b,this.i));delete c.Style;d.H(c);return d}};k.Ao=function(a,b){var c=a.getAttribute("id");if(null!==c){var d=dq(a,b);d&&(c=a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[c]=d)}};
k.zo=function(a,b){var c=a.getAttribute("id");if(null!==c){var d=N(void 0,tq,a,b);d&&(c=a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[c]=d)}};k.Gh=function(a,b){if(!Za(Hp,a.namespaceURI))return null;var c=this.Kf(a,[Rm(this,a,b)]);return c?c:null};
k.kc=function(a,b){if(!Za(Hp,a.namespaceURI))return[];var c;c=a.localName;if("Document"==c||"Folder"==c)return(c=this.Ef(a,[Rm(this,a,b)]))?c:[];if("Placemark"==c)return(c=this.Kf(a,[Rm(this,a,b)]))?[c]:[];if("kml"==c){c=[];var d;for(d=a.firstElementChild;d;d=d.nextElementSibling){var e=this.kc(d,b);e&&bb(c,e)}return c}return[]};k.uo=function(a){if(zm(a))return wq(this,a);if(Am(a))return xq(this,a);if("string"===typeof a)return a=Bm(a),wq(this,a)};
function wq(a,b){var c;for(c=b.firstChild;c;c=c.nextSibling)if(c.nodeType==Node.ELEMENT_NODE){var d=xq(a,c);if(d)return d}}function xq(a,b){var c;for(c=b.firstElementChild;c;c=c.nextElementSibling)if(Za(Hp,c.namespaceURI)&&"name"==c.localName)return S(c);for(c=b.firstElementChild;c;c=c.nextElementSibling){var d=c.localName;if(Za(Hp,c.namespaceURI)&&("Document"==d||"Folder"==d||"Placemark"==d||"kml"==d)&&(d=xq(a,c)))return d}}
k.vo=function(a){var b=[];zm(a)?bb(b,yq(this,a)):Am(a)?bb(b,zq(this,a)):"string"===typeof a&&(a=Bm(a),bb(b,yq(this,a)));return b};function yq(a,b){var c,d=[];for(c=b.firstChild;c;c=c.nextSibling)c.nodeType==Node.ELEMENT_NODE&&bb(d,zq(a,c));return d}
function zq(a,b){var c,d=[];for(c=b.firstElementChild;c;c=c.nextElementSibling)if(Za(Hp,c.namespaceURI)&&"NetworkLink"==c.localName){var e=N({},rq,c,[]);d.push(e)}for(c=b.firstElementChild;c;c=c.nextElementSibling)e=c.localName,!Za(Hp,c.namespaceURI)||"Document"!=e&&"Folder"!=e&&"kml"!=e||bb(d,zq(a,c));return d}function Aq(a,b){var c=ye(b),c=[255*(4==c.length?c[3]:1),c[2],c[1],c[0]],d;for(d=0;4>d;++d){var e=parseInt(c[d],10).toString(16);c[d]=1==e.length?"0"+e:e}co(a,c.join(""))}
function Bq(a,b,c){a={node:a};var d=b.X(),e,f;"GeometryCollection"==d?(e=b.cf(),f=Cq):"MultiPoint"==d?(e=b.je(),f=Dq):"MultiLineString"==d?(e=b.od(),f=Eq):"MultiPolygon"==d?(e=b.Wd(),f=Fq):ha(!1,39);Mm(a,Gq,f,e,c)}function Hq(a,b,c){Mm({node:a},Iq,Jq,[b],c)}
function Kq(a,b,c){var d={node:a};b.a&&a.setAttribute("id",b.a);a=b.N();var e=b.zc();e&&(e=e.call(b,0))&&(e=Array.isArray(e)?e[0]:e,this.l&&(a.Style=e),(e=e.Fa())&&(a.name=e.Fa()));e=Lq[c[c.length-1].node.namespaceURI];a=Km(a,e);Mm(d,Mq,Jm,a,c,e);a=c[0];(b=b.V())&&(b=Tm(b,!0,a));Mm(d,Mq,Cq,[b],c)}function Nq(a,b,c){var d=b.ka();a={node:a};a.layout=b.ia;a.stride=b.sa();Mm(a,Oq,Pq,[d],c)}function Qq(a,b,c){b=b.Vd();var d=b.shift();a={node:a};Mm(a,Rq,Sq,b,c);Mm(a,Rq,Tq,[d],c)}
function Uq(a,b){eo(a,Math.round(b*b*1E6)/1E6)}
var Vq=M(Hp,["Document","Placemark"]),Yq=M(Hp,{Document:L(function(a,b,c){Mm({node:a},Wq,Xq,b,c,void 0,this)}),Placemark:L(Kq)}),Wq=M(Hp,{Placemark:L(Kq)}),Zq={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},$q=M(Hp,["href"],M(Gp,["x","y","w","h"])),ar=M(Hp,{href:L(co)},M(Gp,{x:L(eo),y:L(eo),w:L(eo),h:L(eo)})),br=M(Hp,["scale","heading","Icon",
"hotSpot"]),dr=M(Hp,{Icon:L(function(a,b,c){a={node:a};var d=$q[c[c.length-1].node.namespaceURI],e=Km(b,d);Mm(a,ar,Jm,e,c,d);d=$q[Gp[0]];e=Km(b,d);Mm(a,ar,cr,e,c,d)}),heading:L(eo),hotSpot:L(function(a,b){a.setAttribute("x",b.x);a.setAttribute("y",b.y);a.setAttribute("xunits",b.Wf);a.setAttribute("yunits",b.Xf)}),scale:L(Uq)}),er=M(Hp,["color","scale"]),fr=M(Hp,{color:L(Aq),scale:L(Uq)}),gr=M(Hp,["color","width"]),hr=M(Hp,{color:L(Aq),width:L(eo)}),Iq=M(Hp,{LinearRing:L(Nq)}),Gq=M(Hp,{LineString:L(Nq),
Point:L(Nq),Polygon:L(Qq),GeometryCollection:L(Bq)}),Lq=M(Hp,"name open visibility address phoneNumber description styleUrl Style".split(" ")),Mq=M(Hp,{MultiGeometry:L(Bq),LineString:L(Nq),LinearRing:L(Nq),Point:L(Nq),Polygon:L(Qq),Style:L(function(a,b,c){a={node:a};var d={},e=b.f,f=b.g,g=b.a;b=b.Fa();g instanceof jp&&(d.IconStyle=g);b&&(d.LabelStyle=b);f&&(d.LineStyle=f);e&&(d.PolyStyle=e);b=ir[c[c.length-1].node.namespaceURI];d=Km(d,b);Mm(a,jr,Jm,d,c,b)}),address:L(co),description:L(co),name:L(co),
open:L(bo),phoneNumber:L(co),styleUrl:L(co),visibility:L(bo)}),Oq=M(Hp,{coordinates:L(function(a,b,c){c=c[c.length-1];var d=c.layout;c=c.stride;var e;"XY"==d||"XYM"==d?e=2:"XYZ"==d||"XYZM"==d?e=3:ha(!1,34);var f,g=b.length,h="";if(0<g){h+=b[0];for(d=1;d<e;++d)h+=","+b[d];for(f=c;f<g;f+=c)for(h+=" "+b[f],d=1;d<e;++d)h+=","+b[f+d]}co(a,h)})}),Rq=M(Hp,{outerBoundaryIs:L(Hq),innerBoundaryIs:L(Hq)}),kr=M(Hp,{color:L(Aq)}),ir=M(Hp,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),jr=M(Hp,{IconStyle:L(function(a,
b,c){a={node:a};var d={},e=b.Gb(),f=b.md(),g={href:b.b.o};if(e){g.w=e[0];g.h=e[1];var h=b.cc(),l=b.jc();l&&f&&0!==l[0]&&l[1]!==e[1]&&(g.x=l[0],g.y=f[1]-(l[1]+e[1]));h&&0!==h[0]&&h[1]!==e[1]&&(d.hotSpot={x:h[0],Wf:"pixels",y:e[1]-h[1],Xf:"pixels"})}d.Icon=g;e=b.c;1!==e&&(d.scale=e);b=b.o;0!==b&&(d.heading=b);b=br[c[c.length-1].node.namespaceURI];d=Km(d,b);Mm(a,dr,Jm,d,c,b)}),LabelStyle:L(function(a,b,c){a={node:a};var d={},e=b.b;e&&(d.color=e.b);(b=b.a)&&1!==b&&(d.scale=b);b=er[c[c.length-1].node.namespaceURI];
d=Km(d,b);Mm(a,fr,Jm,d,c,b)}),LineStyle:L(function(a,b,c){a={node:a};var d=gr[c[c.length-1].node.namespaceURI];b=Km({color:b.a,width:b.f},d);Mm(a,hr,Jm,b,c,d)}),PolyStyle:L(function(a,b,c){Mm({node:a},kr,lr,[b.b],c)})});function cr(a,b,c){return wm(Gp[0],"gx:"+c)}function Xq(a,b){return wm(b[b.length-1].node.namespaceURI,"Placemark")}function Cq(a,b){if(a)return wm(b[b.length-1].node.namespaceURI,Zq[a.X()])}
var lr=Hm("color"),Pq=Hm("coordinates"),Sq=Hm("innerBoundaryIs"),Dq=Hm("Point"),Eq=Hm("LineString"),Jq=Hm("LinearRing"),Fq=Hm("Polygon"),Tq=Hm("outerBoundaryIs");
qp.prototype.a=function(a,b){b=Sm(this,b);var c=wm(Hp[4],"kml");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:gx",Gp[0]);c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var d={node:c},e={};1<a.length?e.Document=a:1==a.length&&(e.Placemark=a[0]);var f=Vq[c.namespaceURI],
e=Km(e,f);Mm(d,Yq,Jm,e,[b],f,this);return c};var mr,nr,or,pr;
(function(){var a={},b={ja:a};(function(c){if("object"===typeof a&&"undefined"!==typeof b)b.ja=c();else{var d;"undefined"!==typeof window?d=window:"undefined"!==typeof global?d=global:"undefined"!==typeof self?d=self:d=this;d.Bp=c()}})(function(){return function d(a,b,g){function h(m,p){if(!b[m]){if(!a[m]){var q="function"==typeof require&&require;if(!p&&q)return q(m,!0);if(l)return l(m,!0);q=Error("Cannot find module '"+m+"'");throw q.code="MODULE_NOT_FOUND",q;}q=b[m]={ja:{}};a[m][0].call(q.ja,function(b){var d=
a[m][1][b];return h(d?d:b)},q,q.ja,d,a,b,g)}return b[m].ja}for(var l="function"==typeof require&&require,m=0;m<g.length;m++)h(g[m]);return h}({1:[function(a,b,f){f.read=function(a,b,d,e,f){var p;p=8*f-e-1;var q=(1<<p)-1,t=q>>1,u=-7;f=d?f-1:0;var y=d?-1:1,x=a[b+f];f+=y;d=x&(1<<-u)-1;x>>=-u;for(u+=p;0<u;d=256*d+a[b+f],f+=y,u-=8);p=d&(1<<-u)-1;d>>=-u;for(u+=e;0<u;p=256*p+a[b+f],f+=y,u-=8);if(0===d)d=1-t;else{if(d===q)return p?NaN:Infinity*(x?-1:1);p+=Math.pow(2,e);d-=t}return(x?-1:1)*p*Math.pow(2,d-
e)};f.write=function(a,b,d,e,f,p){var q,t=8*p-f-1,u=(1<<t)-1,y=u>>1,x=23===f?Math.pow(2,-24)-Math.pow(2,-77):0;p=e?0:p-1;var C=e?1:-1,z=0>b||0===b&&0>1/b?1:0;b=Math.abs(b);isNaN(b)||Infinity===b?(b=isNaN(b)?1:0,e=u):(e=Math.floor(Math.log(b)/Math.LN2),1>b*(q=Math.pow(2,-e))&&(e--,q*=2),b=1<=e+y?b+x/q:b+x*Math.pow(2,1-y),2<=b*q&&(e++,q/=2),e+y>=u?(b=0,e=u):1<=e+y?(b=(b*q-1)*Math.pow(2,f),e+=y):(b=b*Math.pow(2,y-1)*Math.pow(2,f),e=0));for(;8<=f;a[d+p]=b&255,p+=C,b/=256,f-=8);e=e<<f|b;for(t+=f;0<t;a[d+
p]=e&255,p+=C,e/=256,t-=8);a[d+p-C]|=128*z}},{}],2:[function(a,b){function f(a){this.bc=ArrayBuffer.isView(a)?a:new Uint8Array(a||0);this.type=this.ca=0;this.length=this.bc.length}function g(a,b,d){var e=d.bc,f,g;g=e[d.ca++];f=(g&112)>>4;if(128>g)return h(a,f,b);g=e[d.ca++];f|=(g&127)<<3;if(128>g)return h(a,f,b);g=e[d.ca++];f|=(g&127)<<10;if(128>g)return h(a,f,b);g=e[d.ca++];f|=(g&127)<<17;if(128>g)return h(a,f,b);g=e[d.ca++];f|=(g&127)<<24;if(128>g)return h(a,f,b);g=e[d.ca++];if(128>g)return h(a,
f|(g&1)<<31,b);throw Error("Expected varint not more than 10 bytes");}function h(a,b,d){return d?4294967296*b+(a>>>0):4294967296*(b>>>0)+(a>>>0)}b.ja=f;var l=a("ieee754");f.f=0;f.g=1;f.b=2;f.a=5;f.prototype={If:function(a,b,d){for(d=d||this.length;this.ca<d;){var e=this.Ea(),f=e>>3,g=this.ca;this.type=e&7;a(f,b,this);this.ca===g&&this.$o(e)}return b},qo:function(){var a=l.read(this.bc,this.ca,!0,23,4);this.ca+=4;return a},mo:function(){var a=l.read(this.bc,this.ca,!0,52,8);this.ca+=8;return a},Ea:function(a){var b=
this.bc,d,e;e=b[this.ca++];d=e&127;if(128>e)return d;e=b[this.ca++];d|=(e&127)<<7;if(128>e)return d;e=b[this.ca++];d|=(e&127)<<14;if(128>e)return d;e=b[this.ca++];d|=(e&127)<<21;if(128>e)return d;e=b[this.ca];return g(d|(e&15)<<28,a,this)},Bo:function(){return this.Ea(!0)},zd:function(){var a=this.Ea();return 1===a%2?(a+1)/-2:a/2},ko:function(){return!!this.Ea()},Mf:function(){for(var a=this.Ea()+this.ca,b=this.bc,d="",e=this.ca;e<a;){var f=b[e],g=null,h=239<f?4:223<f?3:191<f?2:1;if(e+h>a)break;var l,
C,z;if(1===h)128>f&&(g=f);else if(2===h)l=b[e+1],128===(l&192)&&(g=(f&31)<<6|l&63,127>=g&&(g=null));else if(3===h){if(l=b[e+1],C=b[e+2],128===(l&192)&&128===(C&192)&&(g=(f&15)<<12|(l&63)<<6|C&63,2047>=g||55296<=g&&57343>=g))g=null}else 4===h&&(l=b[e+1],C=b[e+2],z=b[e+3],128===(l&192)&&128===(C&192)&&128===(z&192)&&(g=(f&15)<<18|(l&63)<<12|(C&63)<<6|z&63,65535>=g||1114112<=g))&&(g=null);null===g?(g=65533,h=1):65535<g&&(g-=65536,d+=String.fromCharCode(g>>>10&1023|55296),g=56320|g&1023);d+=String.fromCharCode(g);
e+=h}this.ca=a;return d},$o:function(a){a&=7;if(a===f.f)for(;127<this.bc[this.ca++];);else if(a===f.b)this.ca=this.Ea()+this.ca;else if(a===f.a)this.ca+=4;else if(a===f.g)this.ca+=8;else throw Error("Unimplemented type: "+a);}}},{ieee754:1}]},{},[2])(2)});mr=b.ja})();(function(){var a={},b={ja:a};(function(c){if("object"===typeof a&&"undefined"!==typeof b)b.ja=c();else{var d;"undefined"!==typeof window?d=window:"undefined"!==typeof global?d=global:"undefined"!==typeof self?d=self:d=this;d.Ep=c()}})(function(){return function d(a,b,g){function h(m,p){if(!b[m]){if(!a[m]){var q="function"==typeof require&&require;if(!p&&q)return q(m,!0);if(l)return l(m,!0);q=Error("Cannot find module '"+m+"'");throw q.code="MODULE_NOT_FOUND",q;}q=b[m]={ja:{}};a[m][0].call(q.ja,function(b){var d=
a[m][1][b];return h(d?d:b)},q,q.ja,d,a,b,g)}return b[m].ja}for(var l="function"==typeof require&&require,m=0;m<g.length;m++)h(g[m]);return h}({1:[function(a,b){function f(a,b){this.x=a;this.y=b}b.ja=f;f.prototype={clone:function(){return new f(this.x,this.y)},add:function(a){return this.clone().Vi(a)},rotate:function(a){return this.clone().ej(a)},round:function(){return this.clone().fj()},angle:function(){return Math.atan2(this.y,this.x)},Vi:function(a){this.x+=a.x;this.y+=a.y;return this},ej:function(a){var b=
Math.cos(a);a=Math.sin(a);var d=a*this.x+b*this.y;this.x=b*this.x-a*this.y;this.y=d;return this},fj:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this}};f.b=function(a){return a instanceof f?a:Array.isArray(a)?new f(a[0],a[1]):a}},{}],2:[function(a,b){b.ja.Ui=a("./lib/vectortile.js");b.ja.yp=a("./lib/vectortilefeature.js");b.ja.zp=a("./lib/vectortilelayer.js")},{"./lib/vectortile.js":3,"./lib/vectortilefeature.js":4,"./lib/vectortilelayer.js":5}],3:[function(a,b){function f(a,
b,d){3===a&&(a=new g(d,d.Ea()+d.ca),a.length&&(b[a.name]=a))}var g=a("./vectortilelayer");b.ja=function(a,b){this.layers=a.If(f,{},b)}},{"./vectortilelayer":5}],4:[function(a,b){function f(a,b,d,e,f){this.properties={};this.extent=d;this.type=0;this.nc=a;this.Ne=-1;this.Kd=e;this.Md=f;a.If(g,this,b)}function g(a,b,d){if(1==a)b.id=d.Ea();else if(2==a)for(a=d.Ea()+d.ca;d.ca<a;){var e=b.Kd[d.Ea()],f=b.Md[d.Ea()];b.properties[e]=f}else 3==a?b.type=d.Ea():4==a&&(b.Ne=d.ca)}var h=a("point-geometry");b.ja=
f;f.b=["Unknown","Point","LineString","Polygon"];f.prototype.Ng=function(){var a=this.nc;a.ca=this.Ne;for(var b=a.Ea()+a.ca,d=1,e=0,f=0,g=0,u=[],y;a.ca<b;)if(e||(e=a.Ea(),d=e&7,e>>=3),e--,1===d||2===d)f+=a.zd(),g+=a.zd(),1===d&&(y&&u.push(y),y=[]),y.push(new h(f,g));else if(7===d)y&&y.push(y[0].clone());else throw Error("unknown command "+d);y&&u.push(y);return u};f.prototype.bbox=function(){var a=this.nc;a.ca=this.Ne;for(var b=a.Ea()+a.ca,d=1,e=0,f=0,g=0,h=Infinity,y=-Infinity,x=Infinity,C=-Infinity;a.ca<
b;)if(e||(e=a.Ea(),d=e&7,e>>=3),e--,1===d||2===d)f+=a.zd(),g+=a.zd(),f<h&&(h=f),f>y&&(y=f),g<x&&(x=g),g>C&&(C=g);else if(7!==d)throw Error("unknown command "+d);return[h,x,y,C]}},{"point-geometry":1}],5:[function(a,b){function f(a,b){this.version=1;this.name=null;this.extent=4096;this.length=0;this.nc=a;this.Kd=[];this.Md=[];this.Jd=[];a.If(g,this,b);this.length=this.Jd.length}function g(a,b,d){15===a?b.version=d.Ea():1===a?b.name=d.Mf():5===a?b.extent=d.Ea():2===a?b.Jd.push(d.ca):3===a?b.Kd.push(d.Mf()):
4===a&&b.Md.push(h(d))}function h(a){for(var b=null,d=a.Ea()+a.ca;a.ca<d;)b=a.Ea()>>3,b=1===b?a.Mf():2===b?a.qo():3===b?a.mo():4===b?a.Bo():5===b?a.Ea():6===b?a.zd():7===b?a.ko():null;return b}var l=a("./vectortilefeature.js");b.ja=f;f.prototype.feature=function(a){if(0>a||a>=this.Jd.length)throw Error("feature index out of bounds");this.nc.ca=this.Jd[a];a=this.nc.Ea()+this.nc.ca;return new l(this.nc,a,this.extent,this.Kd,this.Md)}},{"./vectortilefeature.js":4}]},{},[2])(2)});nr=b.ja})();function qr(a,b,c,d){this.g=a;this.b=b;this.c=c;this.f=d}k=qr.prototype;k.get=function(a){return this.f[a]};k.Eb=function(){return this.c};k.D=function(){this.a||(this.a="Point"===this.g?Lb(this.b):Mb(this.b,0,this.b.length,2));return this.a};k.Ob=function(){return this.b};k.ka=qr.prototype.Ob;k.V=function(){return this};k.Bm=function(){return this.f};k.pd=qr.prototype.V;k.sa=function(){return 2};k.zc=da;k.X=function(){return this.g};function rr(a){Qm.call(this);a=a?a:{};this.defaultDataProjection=new lc({code:"",units:"tile-pixels"});this.b=a.featureClass?a.featureClass:qr;this.g=a.geometryName?a.geometryName:"geometry";this.a=a.layerName?a.layerName:"layer";this.f=a.layers?a.layers:null}v(rr,Qm);rr.prototype.X=function(){return"arraybuffer"};
rr.prototype.Ha=function(a,b){var c=this.f,d=new mr(a),d=new nr.Ui(d),e=[],f=this.b,g,h,l;for(l in d.layers)if(!c||-1!=c.indexOf(l)){g=d.layers[l];for(var m=0,n=g.length;m<n;++m){if(f===qr){var p=g.feature(m);h=l;var q=p.Ng(),t=[],u=[];sr(q,u,t);var y=p.type,x=void 0;1===y?x=1===q.length?"Point":"MultiPoint":2===y?x=1===q.length?"LineString":"MultiLineString":3===y&&(x="Polygon");p=p.properties;p[this.a]=h;h=new this.b(x,u,t,p)}else{q=g.feature(m);p=l;x=b;h=new this.b;t=q.id;u=q.properties;u[this.a]=
p;p=q.type;if(0===p)p=null;else{var q=q.Ng(),y=[],C=[];sr(q,C,y);var z=void 0;1===p?z=1===q.length?new A(null):new Q(null):2===p?1===q.length?z=new O(null):z=new P(null):3===p&&(z=new B(null));z.aa("XY",C,y);p=z}(x=Tm(p,!1,Sm(this,x)))&&(u[this.g]=x);h.Wb(t);h.H(u);h.Dc(this.g)}e.push(h)}}return e};rr.prototype.Sa=function(){return this.defaultDataProjection};rr.prototype.c=function(a){this.f=a};
    function sr(a, b, c) {
        for (var d = 0, e = 0, f = a.length; e < f; ++e) {
            var g = a[e], h, l;
            h = 0;
            for (l = g.length; h < l; ++h) {
                var m = g[h];
                b.push(m.x, m.y)
            }
            d += 2 * h;
            c.push(d)
        }
    }
    function tr() {
        Pn.call(this);
        this.defaultDataProjection = qc("EPSG:4326")
    }
    v(tr, Pn);
    function ur(a, b) {
        b[b.length - 1].Ed[a.getAttribute("k")] = a.getAttribute("v")
    }
    var vr=[null],wr=M(vr,{nd:function(a,b){b[b.length-1].Oc.push(a.getAttribute("ref"))},tag:ur}),yr=M(vr,{node:function(a,b){var c=b[0],d=b[b.length-1],e=a.getAttribute("id"),f=[parseFloat(a.getAttribute("lon")),parseFloat(a.getAttribute("lat"))];d.Rg[e]=f;var g=N({Ed:{}},xr,a,b);xa(g.Ed)||(f=new A(f),Tm(f,!1,c),c=new I(f),c.Wb(e),c.H(g.Ed),d.features.push(c))},way:function(a,b){for(var c=b[0],d=a.getAttribute("id"),e=N({Oc:[],Ed:{}},wr,a,b),f=b[b.length-1],g=[],h=0,l=e.Oc.length;h<l;h++)bb(g,f.Rg[e.Oc[h]]);
    e.Oc[0] == e.Oc[e.Oc.length - 1] ? (h = new B(null), h.aa("XY", g, [g.length])) : (h = new O(null), h.aa("XY", g));
    Tm(h, !1, c);
    c = new I(h);
    c.Wb(d);
    c.H(e.Ed);
    f.features.push(c)
}
}), xr = M(vr, {tag: ur});
    tr.prototype.kc = function (a, b) {
        var c = Rm(this, a, b);
        return "osm" == a.localName && (c = N({Rg: {}, features: []}, yr, a, [c]), c.features) ? c.features : []
    };
    function zr(a) {
        return a.getAttributeNS("http://www.w3.org/1999/xlink", "href")
    }
    function Ar() {
    }
    Ar.prototype.read = function (a) {
        return zm(a) ? this.a(a) : Am(a) ? this.b(a) : "string" === typeof a ? (a = Bm(a), this.a(a)) : null
    };
    function Br() {
    }
    v(Br, Ar);
    Br.prototype.a = function (a) {
        for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType == Node.ELEMENT_NODE)return this.b(a);
        return null
    };
    Br.prototype.b = function (a) {
        return (a = N({}, Cr, a, [])) ? a : null
    };
    var Dr=[null,"http://www.opengis.net/ows/1.1"],Cr=M(Dr,{ServiceIdentification:J(function(a,b){return N({},Er,a,b)}),ServiceProvider:J(function(a,b){return N({},Fr,a,b)}),OperationsMetadata:J(function(a,b){return N({},Gr,a,b)})}),Hr=M(Dr,{DeliveryPoint:J(S),City:J(S),AdministrativeArea:J(S),PostalCode:J(S),Country:J(S),ElectronicMailAddress:J(S)}),Ir=M(Dr,{Value:Fm(function(a){return S(a)})}),Jr=M(Dr,{AllowedValues:J(function(a,b){return N({},Ir,a,b)})}),Lr=M(Dr,{Phone:J(function(a,b){return N({},
Kr,a,b)}),Address:J(function(a,b){return N({},Hr,a,b)})}),Nr=M(Dr,{HTTP:J(function(a,b){return N({},Mr,a,b)})}),Mr=M(Dr,{Get:Fm(function(a,b){var c=zr(a);return c?N({href:c},Or,a,b):void 0}),Post:void 0}),Pr=M(Dr,{DCP:J(function(a,b){return N({},Nr,a,b)})}),Gr=M(Dr,{Operation:function(a,b){var c=a.getAttribute("name"),d=N({},Pr,a,b);d&&(b[b.length-1][c]=d)}}),Kr=M(Dr,{Voice:J(S),Facsimile:J(S)}),Or=M(Dr,{Constraint:Fm(function(a,b){var c=a.getAttribute("name");return c?N({name:c},Jr,a,b):void 0})}),
    Qr = M(Dr, {
        IndividualName: J(S), PositionName: J(S), ContactInfo: J(function (a, b) {
            return N({}, Lr, a, b)
        })
    }), Er = M(Dr, {Title: J(S), ServiceTypeVersion: J(S), ServiceType: J(S)}), Fr = M(Dr, {
        ProviderName: J(S),
        ProviderSite: J(zr),
        ServiceContact: J(function (a, b) {
            return N({}, Qr, a, b)
        })
    });
    function Rr(a, b, c, d) {
        var e;
        void 0 !== d ? e = d : e = [];
        for (var f = d = 0; f < b;) {
            var g = a[f++];
            e[d++] = a[f++];
            e[d++] = g;
            for (g = 2; g < c; ++g)e[d++] = a[f++]
        }
        e.length = d
    }
    function Sr(a) {
        a = a ? a : {};
        Qm.call(this);
        this.defaultDataProjection = qc("EPSG:4326");
        this.b = a.factor ? a.factor : 1E5;
        this.a = a.geometryLayout ? a.geometryLayout : "XY"
    }
    v(Sr, Yo);
    function Tr(a, b, c) {
        var d, e = Array(b);
        for (d = 0; d < b; ++d)e[d] = 0;
        var f, g;
        f = 0;
        for (g = a.length; f < g;)for (d = 0; d < b; ++d, ++f) {
            var h = a[f], l = h - e[d];
            e[d] = h;
            a[f] = l
        }
        return Ur(a, c ? c : 1E5)
    }
    function Vr(a, b, c) {
        var d, e = Array(b);
        for (d = 0; d < b; ++d)e[d] = 0;
        a = Wr(a, c ? c : 1E5);
        var f;
        c = 0;
        for (f = a.length; c < f;)for (d = 0; d < b; ++d, ++c)e[d] += a[c], a[c] = e[d];
        return a
    }
    function Ur(a,b){var c=b?b:1E5,d,e;d=0;for(e=a.length;d<e;++d)a[d]=Math.round(a[d]*c);c=0;for(d=a.length;c<d;++c)e=a[c],a[c]=0>e?~(e<<1):e<<1;c="";d=0;for(e=a.length;d<e;++d){for(var f=a[d],g,h="";32<=f;)g=(32|f&31)+63,h+=String.fromCharCode(g),f>>=5;h+=String.fromCharCode(f+63);c+=h}return c}
function Wr(a,b){var c=b?b:1E5,d=[],e=0,f=0,g,h;g=0;for(h=a.length;g<h;++g){var l=a.charCodeAt(g)-63,e=e|(l&31)<<f;32>l?(d.push(e),f=e=0):f+=5}e=0;for(f=d.length;e<f;++e)g=d[e],d[e]=g&1?~(g>>1):g>>1;e=0;for(f=d.length;e<f;++e)d[e]/=c;return d}k=Sr.prototype;k.wd=function(a,b){var c=this.yd(a,b);return new I(c)};k.Hf=function(a,b){return[this.wd(a,b)]};k.yd=function(a,b){var c=Pc(this.a),d=Vr(a,c,this.b);Rr(d,d.length,c,d);c=cd(d,0,d.length,c);return Tm(new O(c,this.a),!1,Sm(this,b))};
k.Fe=function(a,b){var c=a.V();if(c)return this.Gd(c,b);ha(!1,40);return""};k.ui=function(a,b){return this.Fe(a[0],b)};k.Gd=function(a,b){a=Tm(a,!0,Sm(this,b));var c=a.ka(),d=a.sa();Rr(c,c.length,d,c);return Tr(c,d,this.b)};function Xr(a){a=a?a:{};Qm.call(this);this.defaultDataProjection=qc(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326")}v(Xr,Um);function Yr(a,b){var c=[],d,e,f,g;f=0;for(g=a.length;f<g;++f)d=a[f],0<f&&c.pop(),0<=d?e=b[d]:e=b[~d].slice().reverse(),c.push.apply(c,e);d=0;for(e=c.length;d<e;++d)c[d]=c[d].slice();return c}function Zr(a,b,c,d,e){a=a.geometries;var f=[],g,h;g=0;for(h=a.length;g<h;++g)f[g]=$r(a[g],b,c,d,e);return f}
function $r(a,b,c,d,e){var f=a.type,g=as[f];b="Point"===f||"MultiPoint"===f?g(a,c,d):g(a,b);c=new I;c.Oa(Tm(b,!1,e));void 0!==a.id&&c.Wb(a.id);a.properties&&c.H(a.properties);return c}
Xr.prototype.Gf=function(a,b){if("Topology"==a.type){var c,d=null,e=null;a.transform&&(c=a.transform,d=c.scale,e=c.translate);var f=a.arcs;if(c){c=d;var g=e,h,l;h=0;for(l=f.length;h<l;++h){var m=f[h],n=c,p=g,q=0,t=0,u,y,x;y=0;for(x=m.length;y<x;++y)u=m[y],q+=u[0],t+=u[1],u[0]=q,u[1]=t,bs(u,n,p)}}c=[];g=wa(a.objects);h=0;for(l=g.length;h<l;++h)"GeometryCollection"===g[h].type?(m=g[h],c.push.apply(c,Zr(m,f,d,e,b))):(m=g[h],c.push($r(m,f,d,e,b)));return c}return[]};
function bs(a,b,c){a[0]=a[0]*b[0]+c[0];a[1]=a[1]*b[1]+c[1]}Xr.prototype.Sa=function(){return this.defaultDataProjection};
var as={Point:function(a,b,c){a=a.coordinates;b&&c&&bs(a,b,c);return new A(a)},LineString:function(a,b){var c=Yr(a.arcs,b);return new O(c)},Polygon:function(a,b){var c=[],d,e;d=0;for(e=a.arcs.length;d<e;++d)c[d]=Yr(a.arcs[d],b);return new B(c)},MultiPoint:function(a,b,c){a=a.coordinates;var d,e;if(b&&c)for(d=0,e=a.length;d<e;++d)bs(a[d],b,c);return new Q(a)},MultiLineString:function(a,b){var c=[],d,e;d=0;for(e=a.arcs.length;d<e;++d)c[d]=Yr(a.arcs[d],b);return new P(c)},MultiPolygon:function(a,b){var c=
[],d,e,f,g,h,l;h=0;for(l=a.arcs.length;h<l;++h){d=a.arcs[h];e=[];f=0;for(g=d.length;f<g;++f)e[f]=Yr(d[f],b);c[h]=e}return new R(c)}};function cs(a){a=a?a:{};this.i=a.featureType;this.g=a.featureNS;this.b=a.gmlFormat?a.gmlFormat:new go;this.c=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";Pn.call(this)}v(cs,Pn);cs.prototype.kc=function(a,b){var c={featureType:this.i,featureNS:this.g};ua(c,Rm(this,a,b?b:{}));c=[c];this.b.b["http://www.opengis.net/gml"].featureMember=Dm(Tn.prototype.xd);(c=N([],this.b.b,a,c,this.b))||(c=[]);return c};
cs.prototype.o=function(a){if(zm(a))return ds(a);if(Am(a))return N({},es,a,[]);if("string"===typeof a)return a=Bm(a),ds(a)};cs.prototype.l=function(a){if(zm(a))return fs(this,a);if(Am(a))return gs(this,a);if("string"===typeof a)return a=Bm(a),fs(this,a)};function fs(a,b){for(var c=b.firstChild;c;c=c.nextSibling)if(c.nodeType==Node.ELEMENT_NODE)return gs(a,c)}var hs={"http://www.opengis.net/gml":{boundedBy:J(Tn.prototype.xe,"bounds")}};
function gs(a,b){var c={},d=ao(b.getAttribute("numberOfFeatures"));c.numberOfFeatures=d;return N(c,hs,b,[],a.b)}
var is={"http://www.opengis.net/wfs":{totalInserted:J($n),totalUpdated:J($n),totalDeleted:J($n)}},js={"http://www.opengis.net/ogc":{FeatureId:Dm(function(a){return a.getAttribute("fid")})}},ks={"http://www.opengis.net/wfs":{Feature:function(a,b){Lm(js,a,b)}}},es={"http://www.opengis.net/wfs":{TransactionSummary:J(function(a,b){return N({},is,a,b)},"transactionSummary"),InsertResults:J(function(a,b){return N([],ks,a,b)},"insertIds")}};
function ds(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return N({},es,a,[])}var ls={"http://www.opengis.net/wfs":{PropertyName:L(co)}};function ms(a,b){var c=wm("http://www.opengis.net/ogc","Filter"),d=wm("http://www.opengis.net/ogc","FeatureId");c.appendChild(d);d.setAttribute("fid",b);a.appendChild(c)}
var ns={"http://www.opengis.net/wfs":{Insert:L(function(a,b,c){var d=c[c.length-1],d=wm(d.featureNS,d.featureType);a.appendChild(d);go.prototype.ti(d,b,c)}),Update:L(function(a,b,c){var d=c[c.length-1];ha(void 0!==b.a,27);var e=d.featureType,f=d.featurePrefix,f=f?f:"feature",g=d.featureNS;a.setAttribute("typeName",f+":"+e);a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+f,g);e=b.a;if(void 0!==e){for(var f=b.O(),g=[],h=0,l=f.length;h<l;h++){var m=b.get(f[h]);void 0!==m&&g.push({name:f[h],
value:m})}Mm({node:a,srsName:d.srsName},ns,Hm("Property"),g,c);ms(a,e)}}),Delete:L(function(a,b,c){var d=c[c.length-1];ha(void 0!==b.a,26);c=d.featureType;var e=d.featurePrefix,e=e?e:"feature",d=d.featureNS;a.setAttribute("typeName",e+":"+c);a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,d);b=b.a;void 0!==b&&ms(a,b)}),Property:L(function(a,b,c){var d=wm("http://www.opengis.net/wfs","Name");a.appendChild(d);co(d,b.name);void 0!==b.value&&null!==b.value&&(d=wm("http://www.opengis.net/wfs",
"Value"),a.appendChild(d),b.value instanceof Mc?go.prototype.ad(d,b.value,c):co(d,b.value))}),Native:L(function(a,b){b.ip&&a.setAttribute("vendorId",b.ip);void 0!==b.No&&a.setAttribute("safeToIgnore",b.No);void 0!==b.value&&co(a,b.value)})}};function os(a,b,c){a={node:a};var d=b.b;Mm(a,ps,Hm(d.Hb),[d],c);b=b.a;Mm(a,ps,Hm(b.Hb),[b],c)}function qs(a,b){void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());rs(a,b.b);ss(a,""+b.g)}
function ts(a,b,c){a=wm("http://www.opengis.net/ogc",a);co(a,c);b.appendChild(a)}function rs(a,b){ts("PropertyName",a,b)}function ss(a,b){ts("Literal",a,b)}
var ps={"http://www.opengis.net/wfs":{Query:L(function(a,b,c){var d=c[c.length-1],e=d.featurePrefix,f=d.featureNS,g=d.propertyNames,h=d.srsName;a.setAttribute("typeName",(e?e+":":"")+b);h&&a.setAttribute("srsName",h);f&&a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);b=ua({},d);b.node=a;Mm(b,ls,Hm("PropertyName"),g,c);if(d=d.filter)g=wm("http://www.opengis.net/ogc","Filter"),a.appendChild(g),Mm({node:g},ps,Hm(d.Hb),[d],c)})},"http://www.opengis.net/ogc":{And:L(os),Or:L(os),Not:L(function(a,
b,c){b=b.condition;Mm({node:a},ps,Hm(b.Hb),[b],c)}),BBOX:L(function(a,b,c){c[c.length-1].srsName=b.srsName;rs(a,b.geometryName);go.prototype.ad(a,b.extent,c)}),Intersects:L(function(a,b,c){c[c.length-1].srsName=b.srsName;rs(a,b.geometryName);go.prototype.ad(a,b.geometry,c)}),Within:L(function(a,b,c){c[c.length-1].srsName=b.srsName;rs(a,b.geometryName);go.prototype.ad(a,b.geometry,c)}),PropertyIsEqualTo:L(qs),PropertyIsNotEqualTo:L(qs),PropertyIsLessThan:L(qs),PropertyIsLessThanOrEqualTo:L(qs),PropertyIsGreaterThan:L(qs),
PropertyIsGreaterThanOrEqualTo:L(qs),PropertyIsNull:L(function(a,b){rs(a,b.b)}),PropertyIsBetween:L(function(a,b){rs(a,b.b);var c=wm("http://www.opengis.net/ogc","LowerBoundary");a.appendChild(c);ss(c,""+b.a);c=wm("http://www.opengis.net/ogc","UpperBoundary");a.appendChild(c);ss(c,""+b.g)}),PropertyIsLike:L(function(a,b){a.setAttribute("wildCard",b.i);a.setAttribute("singleChar",b.c);a.setAttribute("escapeChar",b.g);void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());rs(a,b.b);ss(a,""+b.f)})}};
cs.prototype.s=function(a){var b=wm("http://www.opengis.net/wfs","GetFeature");b.setAttribute("service","WFS");b.setAttribute("version","1.1.0");var c;if(a&&(a.handle&&b.setAttribute("handle",a.handle),a.outputFormat&&b.setAttribute("outputFormat",a.outputFormat),void 0!==a.maxFeatures&&b.setAttribute("maxFeatures",a.maxFeatures),a.resultType&&b.setAttribute("resultType",a.resultType),void 0!==a.startIndex&&b.setAttribute("startIndex",a.startIndex),void 0!==a.count&&b.setAttribute("count",a.count),
c=a.filter,a.bbox)){ha(a.geometryName,12);var d=Fn(a.geometryName,a.bbox,a.srsName);c?c=En(c,d):c=d}b.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.c);c={node:b,srsName:a.srsName,featureNS:a.featureNS?a.featureNS:this.g,featurePrefix:a.featurePrefix,geometryName:a.geometryName,filter:c,propertyNames:a.propertyNames?a.propertyNames:[]};ha(Array.isArray(a.featureTypes),11);a=a.featureTypes;c=[c];d=ua({},c[c.length-1]);d.node=b;Mm(d,ps,Hm("Query"),a,c);return b};
cs.prototype.C=function(a,b,c,d){var e=[],f=wm("http://www.opengis.net/wfs","Transaction");f.setAttribute("service","WFS");f.setAttribute("version","1.1.0");var g,h;d&&(g=d.gmlOptions?d.gmlOptions:{},d.handle&&f.setAttribute("handle",d.handle));f.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.c);a&&(h={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,srsName:d.srsName},ua(h,g),Mm(h,ns,Hm("Insert"),a,e));b&&(h={node:f,featureNS:d.featureNS,
featureType:d.featureType,featurePrefix:d.featurePrefix,srsName:d.srsName},ua(h,g),Mm(h,ns,Hm("Update"),b,e));c&&Mm({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,srsName:d.srsName},ns,Hm("Delete"),c,e);d.nativeElements&&Mm({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,srsName:d.srsName},ns,Hm("Native"),d.nativeElements,e);return f};
cs.prototype.Lf=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.Ae(a);return null};cs.prototype.Ae=function(a){if(a.firstElementChild&&a.firstElementChild.firstElementChild)for(a=a.firstElementChild.firstElementChild,a=a.firstElementChild;a;a=a.nextElementSibling)if(0!==a.childNodes.length&&(1!==a.childNodes.length||3!==a.firstChild.nodeType)){var b=[{}];this.b.xe(a,b);return qc(b.pop().srsName)}return null};function us(a){a=a?a:{};Qm.call(this);this.b=void 0!==a.splitCollection?a.splitCollection:!1}v(us,Yo);function vs(a){a=a.Y();return 0===a.length?"":a[0]+" "+a[1]}function ws(a){a=a.Y();for(var b=[],c=0,d=a.length;c<d;++c)b.push(a[c][0]+" "+a[c][1]);return b.join(",")}function xs(a){var b=[];a=a.Vd();for(var c=0,d=a.length;c<d;++c)b.push("("+ws(a[c])+")");return b.join(",")}function ys(a){var b=a.X();a=(0,zs[b])(a);b=b.toUpperCase();return 0===a.length?b+" EMPTY":b+"("+a+")"}
var zs={Point:vs,LineString:ws,Polygon:xs,MultiPoint:function(a){var b=[];a=a.je();for(var c=0,d=a.length;c<d;++c)b.push("("+vs(a[c])+")");return b.join(",")},MultiLineString:function(a){var b=[];a=a.od();for(var c=0,d=a.length;c<d;++c)b.push("("+ws(a[c])+")");return b.join(",")},MultiPolygon:function(a){var b=[];a=a.Wd();for(var c=0,d=a.length;c<d;++c)b.push("("+xs(a[c])+")");return b.join(",")},GeometryCollection:function(a){var b=[];a=a.cf();for(var c=0,d=a.length;c<d;++c)b.push(ys(a[c]));return b.join(",")}};
k=us.prototype;k.wd=function(a,b){var c=this.yd(a,b);if(c){var d=new I;d.Oa(c);return d}return null};k.Hf=function(a,b){var c=[],d=this.yd(a,b);this.b&&"GeometryCollection"==d.X()?c=d.f:c=[d];for(var e=[],f=0,g=c.length;f<g;++f)d=new I,d.Oa(c[f]),e.push(d);return e};k.yd=function(a,b){var c;c=new As(new Bs(a));c.b=Cs(c.a);return(c=Ds(c))?Tm(c,!1,b):null};k.Fe=function(a,b){var c=a.V();return c?this.Gd(c,b):""};
k.ui=function(a,b){if(1==a.length)return this.Fe(a[0],b);for(var c=[],d=0,e=a.length;d<e;++d)c.push(a[d].V());c=new Gn(c);return this.Gd(c,b)};k.Gd=function(a,b){return ys(Tm(a,!0,b))};function Bs(a){this.a=a;this.b=-1}
function Cs(a){var b=a.a.charAt(++a.b),c={position:a.b,value:b};if("("==b)c.type=2;else if(","==b)c.type=5;else if(")"==b)c.type=3;else if("0"<=b&&"9">=b||"."==b||"-"==b){c.type=4;var d,b=a.b,e=!1,f=!1;do{if("."==d)e=!0;else if("e"==d||"E"==d)f=!0;d=a.a.charAt(++a.b)}while("0"<=d&&"9">=d||"."==d&&(void 0===e||!e)||!f&&("e"==d||"E"==d)||f&&("-"==d||"+"==d));a=parseFloat(a.a.substring(b,a.b--));c.value=a}else if("a"<=b&&"z">=b||"A"<=b&&"Z">=b){c.type=1;b=a.b;do d=a.a.charAt(++a.b);while("a"<=d&&"z">=
d||"A"<=d&&"Z">=d);a=a.a.substring(b,a.b--).toUpperCase();c.value=a}else{if(" "==b||"\t"==b||"\r"==b||"\n"==b)return Cs(a);if(""===b)c.type=6;else throw Error("Unexpected character: "+b);}return c}function As(a){this.a=a}function Es(a,b){var c=a.b.type==b;c&&(a.b=Cs(a.a));return c}
function Ds(a){var b=a.b;if(Es(a,1)){var c=b.value;if("GEOMETRYCOLLECTION"==c){a:{if(Es(a,2)){b=[];do b.push(Ds(a));while(Es(a,5));if(Es(a,3)){a=b;break a}}else if(Fs(a)){a=[];break a}throw Error(Gs(a));}return new Gn(a)}var d=Hs[c],b=Is[c];if(!d||!b)throw Error("Invalid geometry type: "+c);a=d.call(a);return new b(a)}throw Error(Gs(a));}k=As.prototype;k.Cf=function(){if(Es(this,2)){var a=Js(this);if(Es(this,3))return a}else if(Fs(this))return null;throw Error(Gs(this));};
k.Bf=function(){if(Es(this,2)){var a=Ks(this);if(Es(this,3))return a}else if(Fs(this))return[];throw Error(Gs(this));};k.Df=function(){if(Es(this,2)){var a=Ls(this);if(Es(this,3))return a}else if(Fs(this))return[];throw Error(Gs(this));};k.Wn=function(){if(Es(this,2)){var a;if(2==this.b.type)for(a=[this.Cf()];Es(this,5);)a.push(this.Cf());else a=Ks(this);if(Es(this,3))return a}else if(Fs(this))return[];throw Error(Gs(this));};
k.Vn=function(){if(Es(this,2)){var a=Ls(this);if(Es(this,3))return a}else if(Fs(this))return[];throw Error(Gs(this));};k.Xn=function(){if(Es(this,2)){for(var a=[this.Df()];Es(this,5);)a.push(this.Df());if(Es(this,3))return a}else if(Fs(this))return[];throw Error(Gs(this));};function Js(a){for(var b=[],c=0;2>c;++c){var d=a.b;if(Es(a,4))b.push(d.value);else break}if(2==b.length)return b;throw Error(Gs(a));}function Ks(a){for(var b=[Js(a)];Es(a,5);)b.push(Js(a));return b}
function Ls(a){for(var b=[a.Bf()];Es(a,5);)b.push(a.Bf());return b}function Fs(a){var b=1==a.b.type&&"EMPTY"==a.b.value;b&&(a.b=Cs(a.a));return b}function Gs(a){return"Unexpected `"+a.b.value+"` at position "+a.b.position+" in `"+a.a.a+"`"}var Is={POINT:A,LINESTRING:O,POLYGON:B,MULTIPOINT:Q,MULTILINESTRING:P,MULTIPOLYGON:R},Hs={POINT:As.prototype.Cf,LINESTRING:As.prototype.Bf,POLYGON:As.prototype.Df,MULTIPOINT:As.prototype.Wn,MULTILINESTRING:As.prototype.Vn,MULTIPOLYGON:As.prototype.Xn};function Ms(){this.version=void 0}v(Ms,Ar);Ms.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};Ms.prototype.b=function(a){this.version=a.getAttribute("version").trim();return(a=N({version:this.version},Ns,a,[]))?a:null};function Os(a,b){return N({},Ps,a,b)}function Qs(a,b){return N({},Rs,a,b)}function Ss(a,b){var c=Os(a,b);if(c){var d=[ao(a.getAttribute("width")),ao(a.getAttribute("height"))];c.size=d;return c}}
function Ts(a,b){return N([],Us,a,b)}
var Vs=[null,"http://www.opengis.net/wms"],Ns=M(Vs,{Service:J(function(a,b){return N({},Ws,a,b)}),Capability:J(function(a,b){return N({},Xs,a,b)})}),Xs=M(Vs,{Request:J(function(a,b){return N({},Ys,a,b)}),Exception:J(function(a,b){return N([],Zs,a,b)}),Layer:J(function(a,b){return N({},$s,a,b)})}),Ws=M(Vs,{Name:J(S),Title:J(S),Abstract:J(S),KeywordList:J(Ts),OnlineResource:J(zr),ContactInformation:J(function(a,b){return N({},at,a,b)}),Fees:J(S),AccessConstraints:J(S),LayerLimit:J($n),MaxWidth:J($n),
MaxHeight:J($n)}),at=M(Vs,{ContactPersonPrimary:J(function(a,b){return N({},bt,a,b)}),ContactPosition:J(S),ContactAddress:J(function(a,b){return N({},ct,a,b)}),ContactVoiceTelephone:J(S),ContactFacsimileTelephone:J(S),ContactElectronicMailAddress:J(S)}),bt=M(Vs,{ContactPerson:J(S),ContactOrganization:J(S)}),ct=M(Vs,{AddressType:J(S),Address:J(S),City:J(S),StateOrProvince:J(S),PostCode:J(S),Country:J(S)}),Zs=M(Vs,{Format:Dm(S)}),$s=M(Vs,{Name:J(S),Title:J(S),Abstract:J(S),KeywordList:J(Ts),CRS:Fm(S),
EX_GeographicBoundingBox:J(function(a,b){var c=N({},dt,a,b);if(c){var d=c.westBoundLongitude,e=c.southBoundLatitude,f=c.eastBoundLongitude,c=c.northBoundLatitude;return void 0===d||void 0===e||void 0===f||void 0===c?void 0:[d,e,f,c]}}),BoundingBox:Fm(function(a){var b=[Zn(a.getAttribute("minx")),Zn(a.getAttribute("miny")),Zn(a.getAttribute("maxx")),Zn(a.getAttribute("maxy"))],c=[Zn(a.getAttribute("resx")),Zn(a.getAttribute("resy"))];return{crs:a.getAttribute("CRS"),extent:b,res:c}}),Dimension:Fm(function(a){return{name:a.getAttribute("name"),
units:a.getAttribute("units"),unitSymbol:a.getAttribute("unitSymbol"),"default":a.getAttribute("default"),multipleValues:Wn(a.getAttribute("multipleValues")),nearestValue:Wn(a.getAttribute("nearestValue")),current:Wn(a.getAttribute("current")),values:S(a)}}),Attribution:J(function(a,b){return N({},et,a,b)}),AuthorityURL:Fm(function(a,b){var c=Os(a,b);if(c)return c.name=a.getAttribute("name"),c}),Identifier:Fm(S),MetadataURL:Fm(function(a,b){var c=Os(a,b);if(c)return c.type=a.getAttribute("type"),
c}),DataURL:Fm(Os),FeatureListURL:Fm(Os),Style:Fm(function(a,b){return N({},ft,a,b)}),MinScaleDenominator:J(Yn),MaxScaleDenominator:J(Yn),Layer:Fm(function(a,b){var c=b[b.length-1],d=N({},$s,a,b);if(d){var e=Wn(a.getAttribute("queryable"));void 0===e&&(e=c.queryable);d.queryable=void 0!==e?e:!1;e=ao(a.getAttribute("cascaded"));void 0===e&&(e=c.cascaded);d.cascaded=e;e=Wn(a.getAttribute("opaque"));void 0===e&&(e=c.opaque);d.opaque=void 0!==e?e:!1;e=Wn(a.getAttribute("noSubsets"));void 0===e&&(e=c.noSubsets);
d.noSubsets=void 0!==e?e:!1;(e=Zn(a.getAttribute("fixedWidth")))||(e=c.fixedWidth);d.fixedWidth=e;(e=Zn(a.getAttribute("fixedHeight")))||(e=c.fixedHeight);d.fixedHeight=e;["Style","CRS","AuthorityURL"].forEach(function(a){a in c&&(d[a]=(d[a]||[]).concat(c[a]))});"EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(a){a in d||(d[a]=c[a])});return d}})}),et=M(Vs,{Title:J(S),OnlineResource:J(zr),LogoURL:J(Ss)}),dt=M(Vs,{westBoundLongitude:J(Yn),
eastBoundLongitude:J(Yn),southBoundLatitude:J(Yn),northBoundLatitude:J(Yn)}),Ys=M(Vs,{GetCapabilities:J(Qs),GetMap:J(Qs),GetFeatureInfo:J(Qs)}),Rs=M(Vs,{Format:Fm(S),DCPType:Fm(function(a,b){return N({},gt,a,b)})}),gt=M(Vs,{HTTP:J(function(a,b){return N({},ht,a,b)})}),ht=M(Vs,{Get:J(Os),Post:J(Os)}),ft=M(Vs,{Name:J(S),Title:J(S),Abstract:J(S),LegendURL:Fm(Ss),StyleSheetURL:J(Os),StyleURL:J(Os)}),Ps=M(Vs,{Format:J(S),OnlineResource:J(zr)}),Us=M(Vs,{Keyword:Dm(S)});function it(a){a=a?a:{};this.g="http://mapserver.gis.umn.edu/mapserver";this.b=new po;this.c=a.layers?a.layers:null;Pn.call(this)}v(it,Pn);
it.prototype.kc=function(a,b){var c={};b&&ua(c,Rm(this,a,b));var d=[c];a.setAttribute("namespaceURI",this.g);var e=a.localName,c=[];if(0!==a.childNodes.length){if("msGMLOutput"==e)for(var f=0,g=a.childNodes.length;f<g;f++){var h=a.childNodes[f];if(h.nodeType===Node.ELEMENT_NODE){var l=d[0],m=h.localName.replace("_layer","");if(!this.c||Za(this.c,m)){m+="_feature";l.featureType=m;l.featureNS=this.g;var n={};n[m]=Dm(this.b.Ff,this.b);l=M([l.featureNS,null],n);h.setAttribute("namespaceURI",this.g);(h=
N([],l,h,d,this.b))&&bb(c,h)}}}"FeatureCollection"==e&&(d=N([],this.b.b,a,[{}],this.b))&&(c=d)}return c};function jt(){this.g=new Br}v(jt,Ar);jt.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};jt.prototype.b=function(a){var b=a.getAttribute("version").trim(),c=this.g.b(a);if(!c)return null;c.version=b;return(c=N(c,kt,a,[]))?c:null};function lt(a){var b=S(a).split(" ");if(b&&2==b.length)return a=+b[0],b=+b[1],isNaN(a)||isNaN(b)?void 0:[a,b]}
var mt=[null,"http://www.opengis.net/wmts/1.0"],nt=[null,"http://www.opengis.net/ows/1.1"],kt=M(mt,{Contents:J(function(a,b){return N({},ot,a,b)})}),ot=M(mt,{Layer:Fm(function(a,b){return N({},pt,a,b)}),TileMatrixSet:Fm(function(a,b){return N({},qt,a,b)})}),pt=M(mt,{Style:Fm(function(a,b){var c=N({},rt,a,b);if(c){var d="true"===a.getAttribute("isDefault");c.isDefault=d;return c}}),Format:Fm(S),TileMatrixSetLink:Fm(function(a,b){return N({},st,a,b)}),Dimension:Fm(function(a,b){return N({},tt,a,b)}),
ResourceURL:Fm(function(a){var b=a.getAttribute("format"),c=a.getAttribute("template");a=a.getAttribute("resourceType");var d={};b&&(d.format=b);c&&(d.template=c);a&&(d.resourceType=a);return d})},M(nt,{Title:J(S),Abstract:J(S),WGS84BoundingBox:J(function(a,b){var c=N([],ut,a,b);return 2!=c.length?void 0:Ab(c)}),Identifier:J(S)})),rt=M(mt,{LegendURL:Fm(function(a){var b={};b.format=a.getAttribute("format");b.href=zr(a);return b})},M(nt,{Title:J(S),Identifier:J(S)})),st=M(mt,{TileMatrixSet:J(S)}),
tt=M(mt,{Default:J(S),Value:Fm(S)},M(nt,{Identifier:J(S)})),ut=M(nt,{LowerCorner:Dm(lt),UpperCorner:Dm(lt)}),qt=M(mt,{WellKnownScaleSet:J(S),TileMatrix:Fm(function(a,b){return N({},vt,a,b)})},M(nt,{SupportedCRS:J(S),Identifier:J(S)})),vt=M(mt,{TopLeftCorner:J(lt),ScaleDenominator:J(Yn),TileWidth:J($n),TileHeight:J($n),MatrixWidth:J($n),MatrixHeight:J($n)},M(nt,{Identifier:J(S)}));function wt(a){Ua.call(this);a=a||{};this.a=null;this.c=Jc;this.f=void 0;w(this,Wa(xt),this.Al,this);w(this,Wa(yt),this.Bl,this);void 0!==a.projection&&this.Vg(qc(a.projection));void 0!==a.trackingOptions&&this.ji(a.trackingOptions);this.ge(void 0!==a.tracking?a.tracking:!1)}v(wt,Ua);k=wt.prototype;k.la=function(){this.ge(!1);Ua.prototype.la.call(this)};k.Al=function(){var a=this.Tg();a&&(this.c=tc(qc("EPSG:4326"),a),this.a&&this.set(zt,this.c(this.a)))};
k.Bl=function(){if(lf){var a=this.Ug();a&&void 0===this.f?this.f=navigator.geolocation.watchPosition(this.eo.bind(this),this.fo.bind(this),this.Gg()):a||void 0===this.f||(navigator.geolocation.clearWatch(this.f),this.f=void 0)}};
k.eo=function(a){a=a.coords;this.set(At,a.accuracy);this.set(Bt,null===a.altitude?void 0:a.altitude);this.set(Ct,null===a.altitudeAccuracy?void 0:a.altitudeAccuracy);this.set(Dt,null===a.heading?void 0:na(a.heading));this.a?(this.a[0]=a.longitude,this.a[1]=a.latitude):this.a=[a.longitude,a.latitude];var b=this.c(this.a);this.set(zt,b);this.set(Et,null===a.speed?void 0:a.speed);a=ud(Dh,this.a,a.accuracy);a.oc(this.c);this.set(Ft,a);this.v()};k.fo=function(a){a.type="error";this.ge(!1);this.b(a)};
k.Aj=function(){return this.get(At)};k.Bj=function(){return this.get(Ft)||null};k.Dj=function(){return this.get(Bt)};k.Ej=function(){return this.get(Ct)};k.yl=function(){return this.get(Dt)};k.zl=function(){return this.get(zt)};k.Tg=function(){return this.get(xt)};k.jk=function(){return this.get(Et)};k.Ug=function(){return this.get(yt)};k.Gg=function(){return this.get(Gt)};k.Vg=function(a){this.set(xt,a)};k.ge=function(a){this.set(yt,a)};k.ji=function(a){this.set(Gt,a)};
var At="accuracy",Ft="accuracyGeometry",Bt="altitude",Ct="altitudeAccuracy",Dt="heading",zt="position",xt="projection",Et="speed",yt="tracking",Gt="trackingOptions";function Ht(a,b,c){Oc.call(this);this.Sf(a,b?b:0,c)}v(Ht,Oc);k=Ht.prototype;k.clone=function(){var a=new Ht(null);Qc(a,this.ia,this.A.slice());a.v();return a};k.vb=function(a,b,c,d){var e=this.A;a-=e[0];var f=b-e[1];b=a*a+f*f;if(b<d){if(0===b)for(d=0;d<this.a;++d)c[d]=e[d];else for(d=this.vf()/Math.sqrt(b),c[0]=e[0]+d*a,c[1]=e[1]+d*f,d=2;d<this.a;++d)c[d]=e[d];c.length=this.a;return b}return d};k.Ac=function(a,b){var c=this.A,d=a-c[0],c=b-c[1];return d*d+c*c<=It(this)};
k.td=function(){return this.A.slice(0,this.a)};k.Pd=function(a){var b=this.A,c=b[this.a]-b[0];return Kb(b[0]-c,b[1]-c,b[0]+c,b[1]+c,a)};k.vf=function(){return Math.sqrt(It(this))};function It(a){var b=a.A[a.a]-a.A[0];a=a.A[a.a+1]-a.A[1];return b*b+a*a}k.X=function(){return"Circle"};k.Na=function(a){var b=this.D();return dc(a,b)?(b=this.td(),a[0]<=b[0]&&a[2]>=b[0]||a[1]<=b[1]&&a[3]>=b[1]?!0:Rb(a,this.jb,this)):!1};
k.Yl=function(a){var b=this.a,c=a.slice();c[b]=c[0]+(this.A[b]-this.A[0]);var d;for(d=1;d<b;++d)c[b+d]=a[d];Qc(this,this.ia,c);this.v()};k.Sf=function(a,b,c){if(a){Rc(this,c,a,0);this.A||(this.A=[]);c=this.A;a=Zc(c,a);c[a++]=c[0]+b;var d;b=1;for(d=this.a;b<d;++b)c[a++]=c[b];c.length=a}else Qc(this,"XY",null);this.v()};k.Zl=function(a){this.A[this.a]=this.A[0]+a;this.v()};function Jt(a,b,c){for(var d=[],e=a(0),f=a(1),g=b(e),h=b(f),l=[f,e],m=[h,g],n=[1,0],p={},q=1E5,t,u,y,x,C;0<--q&&0<n.length;)y=n.pop(),e=l.pop(),g=m.pop(),f=y.toString(),f in p||(d.push(g[0],g[1]),p[f]=!0),x=n.pop(),f=l.pop(),h=m.pop(),C=(y+x)/2,t=a(C),u=b(t),la(u[0],u[1],g[0],g[1],h[0],h[1])<c?(d.push(h[0],h[1]),f=x.toString(),p[f]=!0):(n.push(x,C,C,y),m.push(h,u,u,g),l.push(f,t,t,e));return d}function Kt(a,b,c,d,e){var f=qc("EPSG:4326");return Jt(function(d){return[a,b+(c-b)*d]},Ic(f,d),e)}
    function Lt(a, b, c, d, e) {
        var f = qc("EPSG:4326");
        return Jt(function (d) {
            return [b + (c - b) * d, a]
        }, Ic(f, d), e)
    }
    function Mt(a) {
        a = a || {};
        this.c = this.l = null;
        this.g = this.i = Infinity;
        this.f = this.j = -Infinity;
        this.C = this.u = Infinity;
        this.G = this.B = -Infinity;
        this.za = void 0 !== a.targetSize ? a.targetSize : 100;
        this.S = void 0 !== a.maxLines ? a.maxLines : 100;
        this.b = [];
        this.a = [];
        this.na = void 0 !== a.strokeStyle ? a.strokeStyle : Nt;
        this.T = this.o = void 0;
        this.s = null;
        this.setMap(void 0 !== a.map ? a.map : null)
    }
    var Nt = new xi({color: "rgba(0,0,0,0.2)"}), Ot = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];
    function Pt(a,b,c,d,e,f,g){var h=g;b=Kt(b,c,d,a.c,e);h=void 0!==a.b[h]?a.b[h]:new O(null);h.aa("XY",b);dc(h.D(),f)&&(a.b[g++]=h);return g}function Qt(a,b,c,d,e){var f=e;b=Lt(b,a.f,a.g,a.c,c);f=void 0!==a.a[f]?a.a[f]:new O(null);f.aa("XY",b);dc(f.D(),d)&&(a.a[e++]=f);return e}k=Mt.prototype;k.Cl=function(){return this.l};k.Xj=function(){return this.b};k.dk=function(){return this.a};
k.Lg=function(a){var b=a.vectorContext,c=a.frameState,d=c.extent;a=c.viewState;var e=a.center,f=a.projection,g=a.resolution;a=c.pixelRatio;a=g*g/(4*a*a);if(!this.c||!Hc(this.c,f)){var h=qc("EPSG:4326"),l=f.D(),m=f.i,n=Lc(m,h,f),p=m[2],q=m[1],t=m[0],u=n[3],y=n[2],x=n[1],n=n[0];this.i=m[3];this.g=p;this.j=q;this.f=t;this.u=u;this.C=y;this.B=x;this.G=n;this.o=Ic(h,f);this.T=Ic(f,h);this.s=this.T(ac(l));this.c=f}f.a&&(f=f.D(),h=Zb(f),c=c.focus[0],c<f[0]||c>f[2])&&(c=h*Math.ceil((f[0]-c)/h),d=[d[0]+c,
d[1],d[2]+c,d[3]]);c=this.s[0];f=this.s[1];h=-1;m=Math.pow(this.za*g,2);p=[];q=[];g=0;for(l=Ot.length;g<l;++g){t=Ot[g]/2;p[0]=c-t;p[1]=f-t;q[0]=c+t;q[1]=f+t;this.o(p,p);this.o(q,q);t=Math.pow(q[0]-p[0],2)+Math.pow(q[1]-p[1],2);if(t<=m)break;h=Ot[g]}g=h;if(-1==g)this.b.length=this.a.length=0;else{c=this.T(e);e=c[0];c=c[1];f=this.S;h=[Math.max(d[0],this.G),Math.max(d[1],this.B),Math.min(d[2],this.C),Math.min(d[3],this.u)];h=Lc(h,this.c,"EPSG:4326");m=h[3];q=h[1];e=Math.floor(e/g)*g;p=ia(e,this.f,this.g);
l=Pt(this,p,q,m,a,d,0);for(h=0;p!=this.f&&h++<f;)p=Math.max(p-g,this.f),l=Pt(this,p,q,m,a,d,l);p=ia(e,this.f,this.g);for(h=0;p!=this.g&&h++<f;)p=Math.min(p+g,this.g),l=Pt(this,p,q,m,a,d,l);this.b.length=l;c=Math.floor(c/g)*g;e=ia(c,this.j,this.i);l=Qt(this,e,a,d,0);for(h=0;e!=this.j&&h++<f;)e=Math.max(e-g,this.j),l=Qt(this,e,a,d,l);e=ia(c,this.j,this.i);for(h=0;e!=this.i&&h++<f;)e=Math.min(e+g,this.i),l=Qt(this,e,a,d,l);this.a.length=l}b.Vb(null,this.na);a=0;for(e=this.b.length;a<e;++a)g=this.b[a],
b.kd(g,null);a=0;for(e=this.a.length;a<e;++a)g=this.a[a],b.kd(g,null)};k.setMap=function(a){this.l&&(this.l.J("postcompose",this.Lg,this),this.l.render());a&&(a.I("postcompose",this.Lg,this),a.render());this.l=a};function Rt(a,b,c,d,e){gg.call(this,a,b);this.o=c;this.g=new Image;null!==d&&(this.g.crossOrigin=d);this.j=null;this.s=e}v(Rt,gg);k=Rt.prototype;k.la=function(){1==this.state&&St(this);this.a&&Ja(this.a);this.state=5;hg(this);gg.prototype.la.call(this)};k.qb=function(){return this.g};k.Xa=function(){return this.o};k.Dl=function(){this.state=3;St(this);hg(this)};k.El=function(){this.state=this.g.naturalWidth&&this.g.naturalHeight?jg:4;St(this);hg(this)};
    k.load = function () {
        if (0 == this.state || 3 == this.state)this.state = 1, hg(this), this.j = [Ea(this.g, "error", this.Dl, this), Ea(this.g, "load", this.El, this)], this.s(this, this.o)
    };
    function St(a) {
        a.j.forEach(za);
        a.j = null
    }
    function Tt(a) {
        a = a ? a : {};
        tg.call(this, {handleEvent: gc});
        this.i = a.formatConstructors ? a.formatConstructors : [];
        this.l = a.projection ? qc(a.projection) : null;
        this.a = null;
        this.target = a.target ? a.target : null
    }
    v(Tt, tg);
    function Ut(a) {
        a = a.dataTransfer.files;
        var b, c, d;
        b = 0;
        for (c = a.length; b < c; ++b) {
            d = a.item(b);
            var e = new FileReader;
            e.addEventListener("load", this.j.bind(this, d));
            e.readAsText(d)
        }
    }
    function Vt(a) {
        a.stopPropagation();
        a.preventDefault();
        a.dataTransfer.dropEffect = "copy"
    }
    Tt.prototype.j=function(a,b){var c=b.target.result,d=this.s,e=this.l;e||(e=d.$().l);var d=this.i,f=[],g,h;g=0;for(h=d.length;g<h;++g){var l=new d[g];var m={featureProjection:e};try{f=l.Ha(c,m)}catch(n){f=null}if(f&&0<f.length)break}this.b(new Wt(Xt,a,f,e))};Tt.prototype.setMap=function(a){this.a&&(this.a.forEach(za),this.a=null);tg.prototype.setMap.call(this,a);a&&(a=this.target?this.target:a.a,this.a=[w(a,"drop",Ut,this),w(a,"dragenter",Vt,this),w(a,"dragover",Vt,this),w(a,"drop",Vt,this)])};
var Xt="addfeatures";function Wt(a,b,c,d){Ka.call(this,a);this.features=c;this.file=b;this.projection=d}v(Wt,Ka);function Yt(a){a=a?a:{};Jg.call(this,{handleDownEvent:Zt,handleDragEvent:$t,handleUpEvent:au});this.o=a.condition?a.condition:Fg;this.a=this.i=void 0;this.j=0;this.u=void 0!==a.duration?a.duration:400}v(Yt,Jg);function $t(a){if(Hg(a)){var b=a.map,c=b.kb(),d=a.pixel;a=d[0]-c[0]/2;d=c[1]/2-d[1];c=Math.atan2(d,a);a=Math.sqrt(a*a+d*d);d=b.$();if(void 0!==this.i){var e=c-this.i;vg(b,d,d.Pa()-e)}this.i=c;void 0!==this.a&&(c=this.a*(d.Ma()/a),xg(b,d,c));void 0!==this.a&&(this.j=this.a/a);this.a=a}}
    function au(a) {
        if (!Hg(a))return !0;
        a = a.map;
        var b = a.$();
        Hd(b, -1);
        var c = this.j - 1, d = b.Pa(), d = b.constrainRotation(d, 0);
        vg(a, b, d, void 0, void 0);
        var d = b.Ma(), e = this.u, d = b.constrainResolution(d, 0, c);
        xg(a, b, d, void 0, e);
        this.j = 0;
        return !1
    }
    function Zt(a) {
        return Hg(a) && this.o(a) ? (Hd(a.map.$(), 1), this.a = this.i = void 0, !0) : !1
    }
    function bu() {
        return [[-Infinity, -Infinity, Infinity, Infinity]]
    }
    (function () {
        var a = {}, b = {ja: a};
        (function (c) {
            if ("object" === typeof a && "undefined" !== typeof b)b.ja = c(); else {
                var d;
                "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
                d.Dp = c()
            }
        })(function () {
            return function d(a, b, g) {
                function h(m, p) {
                    if (!b[m]) {
                        if (!a[m]) {
                            var q = "function" == typeof require && require;
                            if (!p && q)return q(m, !0);
                            if (l)return l(m, !0);
                            q = Error("Cannot find module '" + m + "'");
                            throw q.code = "MODULE_NOT_FOUND", q;
                        }
                        q = b[m] = {ja: {}};
                        a[m][0].call(q.ja, function (b) {
                            var d =
                                a[m][1][b];return h(d?d:b)},q,q.ja,d,a,b,g)}return b[m].ja}for(var l="function"==typeof require&&require,m=0;m<g.length;m++)h(g[m]);return h}({1:[function(a,b){function f(a,b,d,e,q){d=d||0;e=e||a.length-1;for(q=q||h;e>d;){if(600<e-d){var t=e-d+1,u=b-d+1,y=Math.log(t),x=.5*Math.exp(2*y/3),y=.5*Math.sqrt(y*x*(t-x)/t)*(0>u-t/2?-1:1);f(a,b,Math.max(d,Math.floor(b-u*x/t+y)),Math.min(e,Math.floor(b+(t-u)*x/t+y)),q)}t=a[b];u=d;x=e;g(a,d,b);for(0<q(a[e],t)&&g(a,d,e);u<x;){g(a,u,x);u++;for(x--;0>q(a[u],t);)u++;
for(;0<q(a[x],t);)x--}0===q(a[d],t)?g(a,d,x):(x++,g(a,x,e));x<=b&&(d=x+1);b<=x&&(e=x-1)}}function g(a,b,d){var e=a[b];a[b]=a[d];a[d]=e}function h(a,b){return a<b?-1:a>b?1:0}b.ja=f},{}],2:[function(a,b){function f(a,b){if(!(this instanceof f))return new f(a,b);this.Qe=Math.max(4,a||9);this.dg=Math.max(2,Math.ceil(.4*this.Qe));b&&this.bj(b);this.clear()}function g(a,b){h(a,0,a.children.length,b,a)}function h(a,b,d,e,f){f||(f=y(null));f.ba=Infinity;f.ea=Infinity;f.da=-Infinity;f.ha=-Infinity;for(var g;b<
d;b++)g=a.children[b],l(f,a.Wa?e(g):g);return f}function l(a,b){a.ba=Math.min(a.ba,b.ba);a.ea=Math.min(a.ea,b.ea);a.da=Math.max(a.da,b.da);a.ha=Math.max(a.ha,b.ha)}function m(a,b){return a.ba-b.ba}function n(a,b){return a.ea-b.ea}function p(a){return(a.da-a.ba)*(a.ha-a.ea)}function q(a){return a.da-a.ba+(a.ha-a.ea)}function t(a,b){return a.ba<=b.ba&&a.ea<=b.ea&&b.da<=a.da&&b.ha<=a.ha}function u(a,b){return b.ba<=a.da&&b.ea<=a.ha&&b.da>=a.ba&&b.ha>=a.ea}function y(a){return{children:a,height:1,Wa:!0,
ba:Infinity,ea:Infinity,da:-Infinity,ha:-Infinity}}function x(a,b,d,e,f){for(var g=[b,d],h;g.length;)d=g.pop(),b=g.pop(),d-b<=e||(h=b+Math.ceil((d-b)/e/2)*e,C(a,h,b,d,f),g.push(b,h,h,d))}b.ja=f;var C=a("quickselect");f.prototype={all:function(){return this.Zf(this.data,[])},search:function(a){var b=this.data,d=[],e=this.ob;if(!u(a,b))return d;for(var f=[],g,h,l,m;b;){g=0;for(h=b.children.length;g<h;g++)l=b.children[g],m=b.Wa?e(l):l,u(a,m)&&(b.Wa?d.push(l):t(a,m)?this.Zf(l,d):f.push(l));b=f.pop()}return d},
load:function(a){if(!a||!a.length)return this;if(a.length<this.dg){for(var b=0,d=a.length;b<d;b++)this.Da(a[b]);return this}a=this.ag(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.fg(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.cg(a,this.data.height-a.height-1,!0)):this.data=a;return this},Da:function(a){a&&this.cg(a,this.data.height-1);return this},clear:function(){this.data=y([]);return this},remove:function(a,b){if(!a)return this;
for(var d=this.data,e=this.ob(a),f=[],g=[],h,l,m,n;d||f.length;){d||(d=f.pop(),l=f[f.length-1],h=g.pop(),n=!0);if(d.Wa){a:{m=a;var q=d.children,p=b;if(p){for(var u=0;u<q.length;u++)if(p(m,q[u])){m=u;break a}m=-1}else m=q.indexOf(m)}if(-1!==m){d.children.splice(m,1);f.push(d);this.$i(f);break}}n||d.Wa||!t(d,e)?l?(h++,d=l.children[h],n=!1):d=null:(f.push(d),g.push(h),h=0,l=d,d=d.children[0])}return this},ob:function(a){return a},Se:m,Te:n,toJSON:function(){return this.data},Zf:function(a,b){for(var d=
[];a;)a.Wa?b.push.apply(b,a.children):d.push.apply(d,a.children),a=d.pop();return b},ag:function(a,b,d,e){var f=d-b+1,h=this.Qe,l;if(f<=h)return l=y(a.slice(b,d+1)),g(l,this.ob),l;e||(e=Math.ceil(Math.log(f)/Math.log(h)),h=Math.ceil(f/Math.pow(h,e-1)));l=y([]);l.Wa=!1;l.height=e;var f=Math.ceil(f/h),h=f*Math.ceil(Math.sqrt(h)),m,n,q;for(x(a,b,d,h,this.Se);b<=d;b+=h)for(n=Math.min(b+h-1,d),x(a,b,n,f,this.Te),m=b;m<=n;m+=f)q=Math.min(m+f-1,n),l.children.push(this.ag(a,m,q,e-1));g(l,this.ob);return l},
Zi:function(a,b,d,e){for(var f,g,h,l,m,n,q,t;;){e.push(b);if(b.Wa||e.length-1===d)break;q=t=Infinity;f=0;for(g=b.children.length;f<g;f++)h=b.children[f],m=p(h),n=(Math.max(h.da,a.da)-Math.min(h.ba,a.ba))*(Math.max(h.ha,a.ha)-Math.min(h.ea,a.ea))-m,n<t?(t=n,q=m<q?m:q,l=h):n===t&&m<q&&(q=m,l=h);b=l||b.children[0]}return b},cg:function(a,b,d){var e=this.ob;d=d?a:e(a);var e=[],f=this.Zi(d,this.data,b,e);f.children.push(a);for(l(f,d);0<=b;)if(e[b].children.length>this.Qe)this.gj(e,b),b--;else break;this.Wi(d,
e,b)},gj:function(a,b){var d=a[b],e=d.children.length,f=this.dg;this.Xi(d,f,e);e=this.Yi(d,f,e);e=y(d.children.splice(e,d.children.length-e));e.height=d.height;e.Wa=d.Wa;g(d,this.ob);g(e,this.ob);b?a[b-1].children.push(e):this.fg(d,e)},fg:function(a,b){this.data=y([a,b]);this.data.height=a.height+1;this.data.Wa=!1;g(this.data,this.ob)},Yi:function(a,b,d){var e,f,g,l,m,n,q;m=n=Infinity;for(e=b;e<=d-b;e++)f=h(a,0,e,this.ob),g=h(a,e,d,this.ob),l=Math.max(0,Math.min(f.da,g.da)-Math.max(f.ba,g.ba))*Math.max(0,
Math.min(f.ha,g.ha)-Math.max(f.ea,g.ea)),f=p(f)+p(g),l<m?(m=l,q=e,n=f<n?f:n):l===m&&f<n&&(n=f,q=e);return q},Xi:function(a,b,d){var e=a.Wa?this.Se:m,f=a.Wa?this.Te:n,g=this.$f(a,b,d,e);b=this.$f(a,b,d,f);g<b&&a.children.sort(e)},$f:function(a,b,d,e){a.children.sort(e);e=this.ob;var f=h(a,0,b,e),g=h(a,d-b,d,e),m=q(f)+q(g),n,p;for(n=b;n<d-b;n++)p=a.children[n],l(f,a.Wa?e(p):p),m+=q(f);for(n=d-b-1;n>=b;n--)p=a.children[n],l(g,a.Wa?e(p):p),m+=q(g);return m},Wi:function(a,b,d){for(;0<=d;d--)l(b[d],a)},
$i:function(a){for(var b=a.length-1,d;0<=b;b--)0===a[b].children.length?0<b?(d=a[b-1].children,d.splice(d.indexOf(a[b]),1)):this.clear():g(a[b],this.ob)},bj:function(a){var b=["return a"," - b",";"];this.Se=new Function("a","b",b.join(a[0]));this.Te=new Function("a","b",b.join(a[1]));this.ob=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}}},{quickselect:1}]},{},[2])(2)});or=b.ja})();function cu(a){this.b=or(a);this.a={}}k=cu.prototype;k.Da=function(a,b){var c={ba:a[0],ea:a[1],da:a[2],ha:a[3],value:b};this.b.Da(c);this.a[ea(b)]=c};k.load=function(a,b){for(var c=Array(b.length),d=0,e=b.length;d<e;d++){var f=a[d],g=b[d],f={ba:f[0],ea:f[1],da:f[2],ha:f[3],value:g};c[d]=f;this.a[ea(g)]=f}this.b.load(c)};k.remove=function(a){a=ea(a);var b=this.a[a];delete this.a[a];return null!==this.b.remove(b)};
function du(a,b,c){var d=a.a[ea(c)];Pb([d.ba,d.ea,d.da,d.ha],b)||(a.remove(c),a.Da(b,c))}function eu(a){return a.b.all().map(function(a){return a.value})}function fu(a,b){return a.b.search({ba:b[0],ea:b[1],da:b[2],ha:b[3]}).map(function(a){return a.value})}k.forEach=function(a,b){return gu(eu(this),a,b)};function hu(a,b,c,d){return gu(fu(a,b),c,d)}function gu(a,b,c){for(var d,e=0,f=a.length;e<f&&!(d=b.call(c,a[e]));e++);return d}k.clear=function(){this.b.clear();this.a={}};
k.D=function(){var a=this.b.data;return[a.ba,a.ea,a.da,a.ha]};function T(a){a=a||{};Tj.call(this,{attributions:a.attributions,logo:a.logo,projection:void 0,state:"ready",wrapX:void 0!==a.wrapX?a.wrapX:!0});this.W=da;this.P=a.format;this.Aa=void 0==a.overlaps?!0:a.overlaps;this.Z=a.url;void 0!==a.loader?this.W=a.loader:void 0!==this.Z&&(ha(this.P,7),this.W=Pm(this.Z,this.P));this.ac=void 0!==a.strategy?a.strategy:bu;var b=void 0!==a.useSpatialIndex?a.useSpatialIndex:!0;this.a=b?new cu:null;this.ra=new cu;this.i={};this.l={};this.o={};this.s={};this.c=null;var c,
d;a.features instanceof me?(c=a.features,d=c.a):Array.isArray(a.features)&&(d=a.features);b||void 0!==c||(c=new me(d));void 0!==d&&iu(this,d);void 0!==c&&ju(this,c)}v(T,Tj);k=T.prototype;k.cb=function(a){var b=ea(a).toString();if(ku(this,b,a)){lu(this,b,a);var c=a.V();c?(b=c.D(),this.a&&this.a.Da(b,a)):this.i[b]=a;this.b(new mu(nu,a))}this.v()};function lu(a,b,c){a.s[b]=[w(c,"change",a.uh,a),w(c,"propertychange",a.uh,a)]}
function ku(a,b,c){var d=!0,e=c.a;void 0!==e?e.toString()in a.l?d=!1:a.l[e.toString()]=c:(ha(!(b in a.o),30),a.o[b]=c);return d}k.Ic=function(a){iu(this,a);this.v()};function iu(a,b){var c,d,e,f,g=[],h=[],l=[];d=0;for(e=b.length;d<e;d++)f=b[d],c=ea(f).toString(),ku(a,c,f)&&h.push(f);d=0;for(e=h.length;d<e;d++){f=h[d];c=ea(f).toString();lu(a,c,f);var m=f.V();m?(c=m.D(),g.push(c),l.push(f)):a.i[c]=f}a.a&&a.a.load(g,l);d=0;for(e=h.length;d<e;d++)a.b(new mu(nu,h[d]))}
function ju(a,b){var c=!1;w(a,nu,function(a){c||(c=!0,b.push(a.feature),c=!1)});w(a,ou,function(a){c||(c=!0,b.remove(a.feature),c=!1)});w(b,se,function(a){c||(c=!0,this.cb(a.element),c=!1)},a);w(b,te,function(a){c||(c=!0,this.mb(a.element),c=!1)},a);a.c=b}
k.clear=function(a){if(a){for(var b in this.s)this.s[b].forEach(za);this.c||(this.s={},this.l={},this.o={})}else if(this.a){this.a.forEach(this.Of,this);for(var c in this.i)this.Of(this.i[c])}this.c&&this.c.clear();this.a&&this.a.clear();this.ra.clear();this.i={};this.b(new mu(pu));this.v()};k.qg=function(a,b){if(this.a)return this.a.forEach(a,b);if(this.c)return this.c.forEach(a,b)};function qu(a,b,c){a.Kb([b[0],b[1],b[0],b[1]],function(a){if(a.V().jb(b))return c.call(void 0,a)})}
k.Kb=function(a,b,c){if(this.a)return hu(this.a,a,b,c);if(this.c)return this.c.forEach(b,c)};k.rg=function(a,b,c){return this.Kb(a,function(d){if(d.V().Na(a)&&(d=b.call(c,d)))return d})};k.zg=function(){return this.c};k.oe=function(){var a;this.c?a=this.c.a:this.a&&(a=eu(this.a),xa(this.i)||bb(a,wa(this.i)));return a};k.yg=function(a){var b=[];qu(this,a,function(a){b.push(a)});return b};k.bf=function(a){return fu(this.a,a)};
k.ug=function(a,b){var c=a[0],d=a[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity],l=b?b:gc;hu(this.a,h,function(a){if(l(a)){var b=a.V(),p=g;g=b.vb(c,d,f,g);g<p&&(e=a,a=Math.sqrt(g),h[0]=c-a,h[1]=d-a,h[2]=c+a,h[3]=d+a)}});return e};k.D=function(){return this.a.D()};k.xg=function(a){a=this.l[a.toString()];return void 0!==a?a:null};k.sh=function(){return this.P};k.th=function(){return this.Z};
k.uh=function(a){a=a.target;var b=ea(a).toString(),c=a.V();c?(c=c.D(),b in this.i?(delete this.i[b],this.a&&this.a.Da(c,a)):this.a&&du(this.a,c,a)):b in this.i||(this.a&&this.a.remove(a),this.i[b]=a);c=a.a;void 0!==c?(c=c.toString(),b in this.o?(delete this.o[b],this.l[c]=a):this.l[c]!==a&&(ru(this,a),this.l[c]=a)):b in this.o||(ru(this,a),this.o[b]=a);this.v();this.b(new mu(su,a))};
k.rd=function(a,b,c){var d=this.ra;a=this.ac(a,b);var e,f;e=0;for(f=a.length;e<f;++e){var g=a[e];hu(d,g,function(a){return Ib(a.extent,g)})||(this.W.call(this,g,b,c),d.Da(g,{extent:g.slice()}))}};k.mb=function(a){var b=ea(a).toString();b in this.i?delete this.i[b]:this.a&&this.a.remove(a);this.Of(a);this.v()};k.Of=function(a){var b=ea(a).toString();this.s[b].forEach(za);delete this.s[b];var c=a.a;void 0!==c?delete this.l[c.toString()]:delete this.o[b];this.b(new mu(ou,a))};
function ru(a,b){for(var c in a.l)if(a.l[c]===b){delete a.l[c];break}}function mu(a,b){Ka.call(this,a);this.feature=b}v(mu,Ka);var nu="addfeature",su="changefeature",pu="clear",ou="removefeature";function tu(a){Jg.call(this,{handleDownEvent:uu,handleEvent:vu,handleUpEvent:wu});this.fa=null;this.u=!1;this.ub=a.source?a.source:null;this.Aa=a.features?a.features:null;this.tj=a.snapTolerance?a.snapTolerance:12;this.W=a.type;this.i=xu(this.W);this.Ka=a.minPoints?a.minPoints:this.i===yu?3:2;this.oa=a.maxPoints?a.maxPoints:Infinity;this.ac=a.finishCondition?a.finishCondition:gc;var b=a.geometryFunction;if(!b)if("Circle"===this.W)b=function(a,b){var c=b?b:new Ht([NaN,NaN]);c.Sf(a[0],Math.sqrt(xb(a[0],
a[1])));return c};else{var c,d=this.i;d===zu?c=A:d===Au?c=O:d===yu&&(c=B);b=function(a,b){var g=b;g?d===yu?g.ma([a[0].concat([a[0][0]])]):g.ma(a):g=new c(a);return g}}this.G=b;this.P=this.B=this.a=this.S=this.j=this.o=null;this.Jb=a.clickTolerance?a.clickTolerance*a.clickTolerance:36;this.ra=new E({source:new T({useSpatialIndex:!1,wrapX:a.wrapX?a.wrapX:!1}),style:a.style?a.style:Bu()});this.La=a.geometryName;this.qj=a.condition?a.condition:Eg;this.Le=a.freehand?gc:a.freehandCondition?a.freehandCondition:
Fg;w(this,Wa(ug),this.ri,this)}v(tu,Jg);function Bu(){var a=Di();return function(b){return a[b.V().X()]}}k=tu.prototype;k.setMap=function(a){Jg.prototype.setMap.call(this,a);this.ri()};function vu(a){this.u=this.i!==zu&&this.Le(a);var b=!this.u;this.u&&a.type===eg&&null!==this.j?(Cu(this,a),b=!1):a.type===dg?b=Du(this,a):a.type===Yf&&(b=!1);return Kg.call(this,a)&&b}function uu(a){return this.u?(this.fa=a.pixel,this.o||Eu(this,a),!0):this.qj(a)?(this.fa=a.pixel,!0):!1}
function wu(a){var b=this.fa,c=a.pixel,d=b[0]-c[0],b=b[1]-c[1],d=d*d+b*b,b=!0;if(this.u?d>this.Jb:d<=this.Jb)Du(this,a),this.o?this.u||this.i===Fu?this.ld():Gu(this,a)?this.ac(a)&&this.ld():Cu(this,a):(Eu(this,a),this.i===zu&&this.ld()),b=!1;return b}
function Du(a,b){if(a.o){var c=b.coordinate,d=a.j.V(),e;a.i===zu?e=a.a:a.i===yu?(e=a.a[0],e=e[e.length-1],Gu(a,b)&&(c=a.o.slice())):(e=a.a,e=e[e.length-1]);e[0]=c[0];e[1]=c[1];a.G(a.a,d);a.S&&a.S.V().ma(c);d instanceof B&&a.i!==yu?(a.B||(a.B=new I(new O(null))),d=d.Bg(0),c=a.B.V(),c.aa(d.ia,d.ka())):a.P&&(c=a.B.V(),c.ma(a.P));Hu(a)}else c=b.coordinate.slice(),a.S?a.S.V().ma(c):(a.S=new I(new A(c)),Hu(a));return!0}
function Gu(a,b){var c=!1;if(a.j){var d=!1,e=[a.o];a.i===Au?d=a.a.length>a.Ka:a.i===yu&&(d=a.a[0].length>a.Ka,e=[a.a[0][0],a.a[0][a.a[0].length-2]]);if(d)for(var d=b.map,f=0,g=e.length;f<g;f++){var h=e[f],l=d.Ca(h),m=b.pixel,c=m[0]-l[0],l=m[1]-l[1];if(c=Math.sqrt(c*c+l*l)<=(a.u?1:a.tj)){a.o=h;break}}}return c}
function Eu(a,b){var c=b.coordinate;a.o=c;a.i===zu?a.a=c.slice():a.i===yu?(a.a=[[c.slice(),c.slice()]],a.P=a.a[0]):(a.a=[c.slice(),c.slice()],a.i===Fu&&(a.P=a.a));a.P&&(a.B=new I(new O(a.P)));c=a.G(a.a);a.j=new I;a.La&&a.j.Dc(a.La);a.j.Oa(c);Hu(a);a.b(new Iu(Ju,a.j))}
function Cu(a,b){var c=b.coordinate,d=a.j.V(),e,f;a.i===Au?(a.o=c.slice(),f=a.a,f.length>=a.oa&&(a.u?f.pop():e=!0),f.push(c.slice()),a.G(f,d)):a.i===yu&&(f=a.a[0],f.length>=a.oa&&(a.u?f.pop():e=!0),f.push(c.slice()),e&&(a.o=f[0]),a.G(a.a,d));Hu(a);e&&a.ld()}k.Fo=function(){var a=this.j.V(),b,c;this.i===Au?(b=this.a,b.splice(-2,1),this.G(b,a)):this.i===yu&&(b=this.a[0],b.splice(-2,1),c=this.B.V(),c.ma(b),this.G(this.a,a));0===b.length&&(this.o=null);Hu(this)};
k.ld=function(){var a=Ku(this),b=this.a,c=a.V();this.i===Au?(b.pop(),this.G(b,c)):this.i===yu&&(b[0].pop(),this.G(b,c),b=c.Y());"MultiPoint"===this.W?a.Oa(new Q([b])):"MultiLineString"===this.W?a.Oa(new P([b])):"MultiPolygon"===this.W&&a.Oa(new R([b]));this.b(new Iu(Lu,a));this.Aa&&this.Aa.push(a);this.ub&&this.ub.cb(a)};function Ku(a){a.o=null;var b=a.j;b&&(a.j=null,a.S=null,a.B=null,a.ra.ga().clear(!0));return b}
k.fm=function(a){var b=a.V();this.j=a;this.a=b.Y();a=this.a[this.a.length-1];this.o=a.slice();this.a.push(a.slice());Hu(this);this.b(new Iu(Ju,this.j))};k.Fc=hc;function Hu(a){var b=[];a.j&&b.push(a.j);a.B&&b.push(a.B);a.S&&b.push(a.S);a=a.ra.ga();a.clear(!0);a.Ic(b)}k.ri=function(){var a=this.s,b=this.f();a&&b||Ku(this);this.ra.setMap(b?a:null)};
function xu(a){var b;"Point"===a||"MultiPoint"===a?b=zu:"LineString"===a||"MultiLineString"===a?b=Au:"Polygon"===a||"MultiPolygon"===a?b=yu:"Circle"===a&&(b=Fu);return b}var zu="Point",Au="LineString",yu="Polygon",Fu="Circle";function Iu(a,b){Ka.call(this,a);this.feature=b}v(Iu,Ka);var Ju="drawstart",Lu="drawend";function Mu(a){this.a=this.j=null;this.B=!1;this.G=this.o=null;a||(a={});a.extent&&this.i(a.extent);Jg.call(this,{handleDownEvent:Nu,handleDragEvent:Ou,handleEvent:Pu,handleUpEvent:Qu});this.u=new E({source:new T({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.boxStyle?a.boxStyle:Ru(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.S=new E({source:new T({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.pointerStyle?a.pointerStyle:Su(),updateWhileAnimating:!0,updateWhileInteracting:!0})}v(Mu,Jg);
function Pu(a){if(!(a instanceof Uf))return!0;if(a.type==dg&&!this.C){var b=a.pixel,c=a.map,d=Tu(this,b,c);d||(d=c.Ja(b));Uu(this,d)}Kg.call(this,a);return!1}
function Nu(a){function b(a){var b=null,c=null;a[0]==e[0]?b=e[2]:a[0]==e[2]&&(b=e[0]);a[1]==e[1]?c=e[3]:a[1]==e[3]&&(c=e[1]);return null!==b&&null!==c?[b,c]:null}var c=a.pixel,d=a.map,e=this.D();(a=Tu(this,c,d))&&e?(c=a[0]==e[0]||a[0]==e[2]?a[0]:null,d=a[1]==e[1]||a[1]==e[3]?a[1]:null,null!==c&&null!==d?this.a=Vu(b(a)):null!==c?this.a=Wu(b([c,e[1]]),b([c,e[3]])):null!==d&&(this.a=Wu(b([e[0],d]),b([e[2],d])))):(a=d.Ja(c),this.i([a[0],a[1],a[0],a[1]]),this.a=Vu(a));return!0}
function Ou(a){this.a&&(a=a.coordinate,this.i(this.a(a)),Uu(this,a));return!0}function Qu(){this.a=null;var a=this.D();a&&0!==Xb(a)||this.i(null);return!1}function Ru(){var a=Di();return function(){return a.Polygon}}function Su(){var a=Di();return function(){return a.Point}}function Vu(a){return function(b){return Ab([a,b])}}function Wu(a,b){return a[0]==b[0]?function(c){return Ab([a,[c[0],b[1]]])}:a[1]==b[1]?function(c){return Ab([a,[b[0],c[1]]])}:null}
function Tu(a,b,c){function d(a,b){return yb(e,a)-yb(e,b)}var e=c.Ja(b),f=a.D();if(f){f=[[[f[0],f[1]],[f[0],f[3]]],[[f[0],f[3]],[f[2],f[3]]],[[f[2],f[3]],[f[2],f[1]]],[[f[2],f[1]],[f[0],f[1]]]];f.sort(d);var f=f[0],g=sb(e,f),h=c.Ca(g);if(10>=Math.sqrt(xb(b,h)))return b=c.Ca(f[0]),c=c.Ca(f[1]),b=xb(h,b),c=xb(h,c),a.B=10>=Math.sqrt(Math.min(b,c)),a.B&&(g=b>c?f[1]:f[0]),g}return null}function Uu(a,b){var c=a.G;c?c.V().ma(b):(c=new I(new A(b)),a.G=c,a.S.ga().cb(c))}
Mu.prototype.setMap=function(a){this.u.setMap(a);this.S.setMap(a);Jg.prototype.setMap.call(this,a)};Mu.prototype.D=function(){return this.j};Mu.prototype.i=function(a){this.j=a?a:null;var b=this.o;b?a?b.Oa(vd(a)):b.Oa(void 0):(this.o=b=a?new I(vd(a)):new I({}),this.u.ga().cb(b));this.b(new Xu(this.j))};function Xu(a){Ka.call(this,Yu);this.b=a}v(Xu,Ka);var Yu="extentchanged";function Zu(a){Jg.call(this,{handleDownEvent:$u,handleDragEvent:av,handleEvent:bv,handleUpEvent:cv});this.ub=a.condition?a.condition:Ig;this.Aa=function(a){return Eg(a)&&Dg(a)};this.La=a.deleteCondition?a.deleteCondition:this.Aa;this.Ka=this.a=null;this.ra=[0,0];this.B=this.P=!1;this.i=new cu;this.S=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.o=this.oa=!1;this.j=[];this.G=new E({source:new T({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.style?a.style:dv(),updateWhileAnimating:!0,updateWhileInteracting:!0});
this.fa={Point:this.mm,LineString:this.bh,LinearRing:this.bh,Polygon:this.nm,MultiPoint:this.km,MultiLineString:this.jm,MultiPolygon:this.lm,GeometryCollection:this.im};this.u=a.features;this.u.forEach(this.wf,this);w(this.u,se,this.gm,this);w(this.u,te,this.hm,this);this.W=null}v(Zu,Jg);k=Zu.prototype;k.wf=function(a){var b=a.V();b&&b.X()in this.fa&&this.fa[b.X()].call(this,a,b);(b=this.s)&&ev(this,this.ra,b);w(a,"change",this.ah,this)};function fv(a,b){a.B||(a.B=!0,a.b(new gv(hv,a.u,b)))}
function iv(a,b){jv(a,b);a.a&&0===a.u.yc()&&(a.G.ga().mb(a.a),a.a=null);Fa(b,"change",a.ah,a)}function jv(a,b){var c=a.i,d=[];c.forEach(function(a){b===a.feature&&d.push(a)});for(var e=d.length-1;0<=e;--e)c.remove(d[e])}k.Ba=function(a){this.a&&!a&&(this.G.ga().mb(this.a),this.a=null);Jg.prototype.Ba.call(this,a)};k.setMap=function(a){this.G.setMap(a);Jg.prototype.setMap.call(this,a)};k.gm=function(a){this.wf(a.element)};k.ah=function(a){this.o||(a=a.target,iv(this,a),this.wf(a))};
k.hm=function(a){iv(this,a.element)};k.mm=function(a,b){var c=b.Y(),c={feature:a,geometry:b,pa:[c,c]};this.i.Da(b.D(),c)};k.km=function(a,b){var c=b.Y(),d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],d={feature:a,geometry:b,depth:[e],index:e,pa:[d,d]},this.i.Da(b.D(),d)};k.bh=function(a,b){var c=b.Y(),d,e,f,g;d=0;for(e=c.length-1;d<e;++d)f=c.slice(d,d+2),g={feature:a,geometry:b,index:d,pa:f},this.i.Da(Ab(f),g)};
k.jm=function(a,b){var c=b.Y(),d,e,f,g,h,l,m;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)l=d.slice(e,e+2),m={feature:a,geometry:b,depth:[g],index:e,pa:l},this.i.Da(Ab(l),m)};k.nm=function(a,b){var c=b.Y(),d,e,f,g,h,l,m;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)l=d.slice(e,e+2),m={feature:a,geometry:b,depth:[g],index:e,pa:l},this.i.Da(Ab(l),m)};
k.lm=function(a,b){var c=b.Y(),d,e,f,g,h,l,m,n,p,q;l=0;for(m=c.length;l<m;++l)for(n=c[l],g=0,h=n.length;g<h;++g)for(d=n[g],e=0,f=d.length-1;e<f;++e)p=d.slice(e,e+2),q={feature:a,geometry:b,depth:[g,l],index:e,pa:p},this.i.Da(Ab(p),q)};k.im=function(a,b){var c,d=b.f;for(c=0;c<d.length;++c)this.fa[d[c].X()].call(this,a,d[c])};function kv(a,b){var c=a.a;c?c.V().ma(b):(c=new I(new A(b)),a.a=c,a.G.ga().cb(c))}function lv(a,b){return a.index-b.index}
function $u(a){if(!this.ub(a))return!1;ev(this,a.pixel,a.map);this.j.length=0;this.B=!1;var b=this.a;if(b){var c=[],b=b.V().Y(),d=Ab([b]),d=fu(this.i,d),e={};d.sort(lv);for(var f=0,g=d.length;f<g;++f){var h=d[f],l=h.pa,m=ea(h.feature),n=h.depth;n&&(m+="-"+n.join("-"));e[m]||(e[m]=Array(2));if(vb(l[0],b)&&!e[m][0])this.j.push([h,0]),e[m][0]=h;else if(vb(l[1],b)&&!e[m][1]){if("LineString"!==h.geometry.X()&&"MultiLineString"!==h.geometry.X()||!e[m][0]||0!==e[m][0].index)this.j.push([h,1]),e[m][1]=h}else ea(l)in
this.Ka&&!e[m][0]&&!e[m][1]&&c.push([h,b])}c.length&&fv(this,a);for(a=c.length-1;0<=a;--a)this.$k.apply(this,c[a])}return!!this.a}
function av(a){this.P=!1;fv(this,a);a=a.coordinate;for(var b=0,c=this.j.length;b<c;++b){for(var d=this.j[b],e=d[0],f=e.depth,g=e.geometry,h=g.Y(),l=e.pa,d=d[1];a.length<g.sa();)a.push(0);switch(g.X()){case "Point":h=a;l[0]=l[1]=a;break;case "MultiPoint":h[e.index]=a;l[0]=l[1]=a;break;case "LineString":h[e.index+d]=a;l[d]=a;break;case "MultiLineString":h[f[0]][e.index+d]=a;l[d]=a;break;case "Polygon":h[f[0]][e.index+d]=a;l[d]=a;break;case "MultiPolygon":h[f[1]][f[0]][e.index+d]=a,l[d]=a}e=g;this.o=
!0;e.ma(h);this.o=!1}kv(this,a)}function cv(a){for(var b,c=this.j.length-1;0<=c;--c)b=this.j[c][0],du(this.i,Ab(b.pa),b);this.B&&(this.b(new gv(mv,this.u,a)),this.B=!1);return!1}function bv(a){if(!(a instanceof Uf))return!0;this.W=a;var b;Cd(a.map.$())[1]||a.type!=dg||this.C||(this.ra=a.pixel,ev(this,a.pixel,a.map));this.a&&this.La(a)&&(b=a.type==Zf&&this.P?!0:this.Qh());a.type==Zf&&(this.P=!1);return Kg.call(this,a)&&!b}
function ev(a,b,c){function d(a,b){return yb(e,a.pa)-yb(e,b.pa)}var e=c.Ja(b),f=c.Ja([b[0]-a.S,b[1]+a.S]),g=c.Ja([b[0]+a.S,b[1]-a.S]),f=Ab([f,g]),f=fu(a.i,f);if(0<f.length){f.sort(d);var g=f[0].pa,h=sb(e,g),l=c.Ca(h);if(Math.sqrt(xb(b,l))<=a.S){b=c.Ca(g[0]);c=c.Ca(g[1]);b=xb(l,b);c=xb(l,c);a.oa=Math.sqrt(Math.min(b,c))<=a.S;a.oa&&(h=b>c?g[1]:g[0]);kv(a,h);c={};c[ea(g)]=!0;b=1;for(l=f.length;b<l;++b)if(h=f[b].pa,vb(g[0],h[0])&&vb(g[1],h[1])||vb(g[0],h[1])&&vb(g[1],h[0]))c[ea(h)]=!0;else break;a.Ka=
c;return}}a.a&&(a.G.ga().mb(a.a),a.a=null)}
k.$k=function(a,b){for(var c=a.pa,d=a.feature,e=a.geometry,f=a.depth,g=a.index,h;b.length<e.sa();)b.push(0);switch(e.X()){case "MultiLineString":h=e.Y();h[f[0]].splice(g+1,0,b);break;case "Polygon":h=e.Y();h[f[0]].splice(g+1,0,b);break;case "MultiPolygon":h=e.Y();h[f[1]][f[0]].splice(g+1,0,b);break;case "LineString":h=e.Y();h.splice(g+1,0,b);break;default:return}this.o=!0;e.ma(h);this.o=!1;h=this.i;h.remove(a);nv(this,e,g,f,1);var l={pa:[c[0],b],feature:d,geometry:e,depth:f,index:g};h.Da(Ab(l.pa),
l);this.j.push([l,1]);c={pa:[b,c[1]],feature:d,geometry:e,depth:f,index:g+1};h.Da(Ab(c.pa),c);this.j.push([c,0]);this.P=!0};
k.Qh=function(){var a=!1;if(this.W&&this.W.type!=eg){var b=this.W;fv(this,b);var c=this.j,a={},d=!1,e,f,g,h,l,m,n,p;for(h=c.length-1;0<=h;--h)g=c[h],n=g[0],p=ea(n.feature),n.depth&&(p+="-"+n.depth.join("-")),p in a||(a[p]={}),0===g[1]?(a[p].right=n,a[p].index=n.index):1==g[1]&&(a[p].left=n,a[p].index=n.index+1);for(p in a){m=a[p].right;h=a[p].left;g=a[p].index;l=g-1;n=void 0!==h?h:m;0>l&&(l=0);c=n.geometry;e=f=c.Y();d=!1;switch(c.X()){case "MultiLineString":2<f[n.depth[0]].length&&(f[n.depth[0]].splice(g,
1),d=!0);break;case "LineString":2<f.length&&(f.splice(g,1),d=!0);break;case "MultiPolygon":e=e[n.depth[1]];case "Polygon":e=e[n.depth[0]],4<e.length&&(g==e.length-1&&(g=0),e.splice(g,1),d=!0,0===g&&(e.pop(),e.push(e[0]),l=e.length-1))}d&&(e=c,this.o=!0,e.ma(f),this.o=!1,f=[],void 0!==h&&(this.i.remove(h),f.push(h.pa[0])),void 0!==m&&(this.i.remove(m),f.push(m.pa[1])),void 0!==h&&void 0!==m&&(h={depth:n.depth,feature:n.feature,geometry:n.geometry,index:l,pa:f},this.i.Da(Ab(h.pa),h)),nv(this,c,g,n.depth,
-1),this.a&&(this.G.ga().mb(this.a),this.a=null))}a=d;this.b(new gv(mv,this.u,b));this.B=!1}return a};function nv(a,b,c,d,e){hu(a.i,b.D(),function(a){a.geometry===b&&(void 0===d||void 0===a.depth||eb(a.depth,d))&&a.index>c&&(a.index+=e)})}function dv(){var a=Di();return function(){return a.Point}}function gv(a,b,c){Ka.call(this,a);this.features=b;this.mapBrowserEvent=c}v(gv,Ka);var hv="modifystart",mv="modifyend";function ov(a){tg.call(this,{handleEvent:pv});a=a?a:{};this.C=a.condition?a.condition:Dg;this.u=a.addCondition?a.addCondition:hc;this.B=a.removeCondition?a.removeCondition:hc;this.G=a.toggleCondition?a.toggleCondition:Fg;this.l=a.multi?a.multi:!1;this.j=a.filter?a.filter:gc;this.i=new E({source:new T({useSpatialIndex:!1,features:a.features,wrapX:a.wrapX}),style:a.style?a.style:qv(),updateWhileAnimating:!0,updateWhileInteracting:!0});if(a.layers)if("function"===typeof a.layers)a=a.layers;else{var b=
a.layers;a=function(a){return Za(b,a)}}else a=gc;this.o=a;this.a={};a=this.i.ga().c;w(a,se,this.om,this);w(a,te,this.rm,this)}v(ov,tg);k=ov.prototype;k.pm=function(){return this.i.ga().c};k.qm=function(a){a=ea(a);return this.a[a]};
function pv(a){if(!this.C(a))return!0;var b=this.u(a),c=this.B(a),d=this.G(a),e=!b&&!c&&!d,f=a.map,g=this.i.ga().c,h=[],l=[];if(e){va(this.a);f.Sd(a.pixel,function(a,b){if(this.j(a,b)){l.push(a);var c=ea(a);this.a[c]=b;return!this.l}},this,this.o);for(e=g.yc()-1;0<=e;--e){var f=g.item(e),m=l.indexOf(f);-1<m?l.splice(m,1):(g.remove(f),h.push(f))}0!==l.length&&g.qf(l)}else{f.Sd(a.pixel,function(a,e){if(this.j(a,e)){if(!b&&!d||Za(g.a,a))(c||d)&&Za(g.a,a)&&(h.push(a),f=ea(a),delete this.a[f]);else{l.push(a);
var f=ea(a);this.a[f]=e}return!this.l}},this,this.o);for(e=h.length-1;0<=e;--e)g.remove(h[e]);g.qf(l)}(0<l.length||0<h.length)&&this.b(new rv(sv,l,h,a));return Cg(a)}k.setMap=function(a){var b=this.s,c=this.i.ga().c;b&&c.forEach(b.oi,b);tg.prototype.setMap.call(this,a);this.i.setMap(a);a&&c.forEach(a.ki,a)};function qv(){var a=Di();bb(a.Polygon,a.LineString);bb(a.GeometryCollection,a.LineString);return function(b){return b.V()?a[b.V().X()]:null}}k.om=function(a){var b=this.s;b&&b.ki(a.element)};
k.rm=function(a){var b=this.s;b&&b.oi(a.element)};function rv(a,b,c,d){Ka.call(this,a);this.selected=b;this.deselected=c;this.mapBrowserEvent=d}v(rv,Ka);var sv="select";function tv(a){Jg.call(this,{handleEvent:uv,handleDownEvent:gc,handleUpEvent:vv});a=a?a:{};this.o=a.source?a.source:null;this.ra=void 0!==a.vertex?a.vertex:!0;this.P=void 0!==a.edge?a.edge:!0;this.j=a.features?a.features:null;this.oa=[];this.B={};this.G={};this.W={};this.u={};this.S=null;this.i=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.Ka=wv.bind(this);this.a=new cu;this.fa={Point:this.xm,LineString:this.fh,LinearRing:this.fh,Polygon:this.ym,MultiPoint:this.vm,MultiLineString:this.um,MultiPolygon:this.wm,
GeometryCollection:this.tm}}v(tv,Jg);k=tv.prototype;k.cb=function(a,b){var c=void 0!==b?b:!0,d=ea(a),e=a.V();if(e){var f=this.fa[e.X()];f&&(this.W[d]=e.D(Bb()),f.call(this,a,e),c&&(this.G[d]=w(e,"change",this.yk.bind(this,a),this)))}c&&(this.B[d]=w(a,Wa(a.f),this.sm,this))};k.xj=function(a){this.cb(a)};k.yj=function(a){this.mb(a)};k.dh=function(a){var b;a instanceof mu?b=a.feature:a instanceof re&&(b=a.element);this.cb(b)};
k.eh=function(a){var b;a instanceof mu?b=a.feature:a instanceof re&&(b=a.element);this.mb(b)};k.sm=function(a){a=a.target;this.mb(a,!0);this.cb(a,!0)};k.yk=function(a){if(this.C){var b=ea(a);b in this.u||(this.u[b]=a)}else this.pi(a)};k.mb=function(a,b){var c=void 0!==b?b:!0,d=ea(a),e=this.W[d];if(e){var f=this.a,g=[];hu(f,e,function(b){a===b.feature&&g.push(b)});for(e=g.length-1;0<=e;--e)f.remove(g[e]);c&&(Qa(this.G[d]),delete this.G[d])}c&&(Qa(this.B[d]),delete this.B[d])};
k.setMap=function(a){var b=this.s,c=this.oa,d;this.j?d=this.j:this.o&&(d=this.o.oe());b&&(c.forEach(Qa),c.length=0,d.forEach(this.yj,this));Jg.prototype.setMap.call(this,a);a&&(this.j?c.push(w(this.j,se,this.dh,this),w(this.j,te,this.eh,this)):this.o&&c.push(w(this.o,nu,this.dh,this),w(this.o,ou,this.eh,this)),d.forEach(this.xj,this))};k.Fc=hc;k.pi=function(a){this.mb(a,!1);this.cb(a,!1)};k.tm=function(a,b){var c,d=b.f;for(c=0;c<d.length;++c)this.fa[d[c].X()].call(this,a,d[c])};
k.fh=function(a,b){var c=b.Y(),d,e,f,g;d=0;for(e=c.length-1;d<e;++d)f=c.slice(d,d+2),g={feature:a,pa:f},this.a.Da(Ab(f),g)};k.um=function(a,b){var c=b.Y(),d,e,f,g,h,l,m;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)l=d.slice(e,e+2),m={feature:a,pa:l},this.a.Da(Ab(l),m)};k.vm=function(a,b){var c=b.Y(),d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],d={feature:a,pa:[d,d]},this.a.Da(b.D(),d)};
k.wm=function(a,b){var c=b.Y(),d,e,f,g,h,l,m,n,p,q;l=0;for(m=c.length;l<m;++l)for(n=c[l],g=0,h=n.length;g<h;++g)for(d=n[g],e=0,f=d.length-1;e<f;++e)p=d.slice(e,e+2),q={feature:a,pa:p},this.a.Da(Ab(p),q)};k.xm=function(a,b){var c=b.Y(),c={feature:a,pa:[c,c]};this.a.Da(b.D(),c)};k.ym=function(a,b){var c=b.Y(),d,e,f,g,h,l,m;g=0;for(h=c.length;g<h;++g)for(d=c[g],e=0,f=d.length-1;e<f;++e)l=d.slice(e,e+2),m={feature:a,pa:l},this.a.Da(Ab(l),m)};
function uv(a){var b,c,d=a.pixel,e=a.coordinate;b=a.map;var f=b.Ja([d[0]-this.i,d[1]+this.i]);c=b.Ja([d[0]+this.i,d[1]-this.i]);var f=Ab([f,c]),g=fu(this.a,f),h,f=!1,l=null;c=null;if(0<g.length){this.S=e;g.sort(this.Ka);g=g[0].pa;if(this.ra&&!this.P){if(e=b.Ca(g[0]),h=b.Ca(g[1]),e=xb(d,e),d=xb(d,h),h=Math.sqrt(Math.min(e,d)),h=h<=this.i)f=!0,l=e>d?g[1]:g[0],c=b.Ca(l)}else this.P&&(l=sb(e,g),c=b.Ca(l),Math.sqrt(xb(d,c))<=this.i&&(f=!0,this.ra&&(e=b.Ca(g[0]),h=b.Ca(g[1]),e=xb(c,e),d=xb(c,h),h=Math.sqrt(Math.min(e,
    d)), h = h <= this.i))) && (l = e > d ? g[1] : g[0], c = b.Ca(l));
    f && (c = [Math.round(c[0]), Math.round(c[1])])
}
    b = l;
    f && (a.coordinate = b.slice(0, 2), a.pixel = c);
    return Kg.call(this, a)
}
    function vv() {
        var a = wa(this.u);
        a.length && (a.forEach(this.pi, this), this.u = {});
        return !1
    }
    function wv(a, b) {
        return yb(this.S, a.pa) - yb(this.S, b.pa)
    }
    function xv(a) {
        Jg.call(this, {handleDownEvent: yv, handleDragEvent: zv, handleMoveEvent: Av, handleUpEvent: Bv});
        this.o = void 0;
        this.a = null;
        this.i = void 0 !== a.features ? a.features : null;
        if (a.layers)if ("function" === typeof a.layers)a = a.layers; else {
            var b = a.layers;
            a = function (a) {
                return Za(b, a)
            }
        } else a = gc;
        this.u = a;
        this.j = null
    }
    v(xv, Jg);
    function yv(a) {
        this.j = Cv(this, a.pixel, a.map);
        return !this.a && this.j ? (this.a = a.coordinate, Av.call(this, a), this.b(new Dv(Ev, this.i, a.coordinate)), !0) : !1
    }
    function Bv(a){return this.a?(this.a=null,Av.call(this,a),this.b(new Dv(Fv,this.i,a.coordinate)),!0):!1}function zv(a){if(this.a){a=a.coordinate;var b=a[0]-this.a[0],c=a[1]-this.a[1];if(this.i)this.i.forEach(function(a){var d=a.V();d.Pc(b,c);a.Oa(d)});else if(this.j){var d=this.j.V();d.Pc(b,c);this.j.Oa(d)}this.a=a;this.b(new Dv(Gv,this.i,a))}}
function Av(a){var b=a.map.uc();Cv(this,a.pixel,a.map)?(this.o=b.style.cursor,b.style.cursor=this.a?"-webkit-grabbing":"-webkit-grab",b.style.cursor=this.a?"grabbing":"grab"):(b.style.cursor=void 0!==this.o?this.o:"",this.o=void 0)}function Cv(a,b,c){var d=null;b=c.Sd(b,function(a){return a},a,a.u);a.i&&Za(a.i.a,b)&&(d=b);return d}function Dv(a,b,c){Ka.call(this,a);this.features=b;this.coordinate=c}v(Dv,Ka);var Ev="translatestart",Gv="translating",Fv="translateend";function U(a){a=a?a:{};var b=ua({},a);delete b.gradient;delete b.radius;delete b.blur;delete b.shadow;delete b.weight;E.call(this,b);this.f=null;this.W=void 0!==a.shadow?a.shadow:250;this.P=void 0;this.c=null;w(this,Wa(Hv),this.zk,this);this.$h(a.gradient?a.gradient:Iv);this.Th(void 0!==a.blur?a.blur:15);this.ih(void 0!==a.radius?a.radius:8);w(this,Wa(Jv),this.lf,this);w(this,Wa(Kv),this.lf,this);this.lf();var c=a.weight?a.weight:"weight",d;"string"===typeof c?d=function(a){return a.get(c)}:d=c;this.l(function(a){a=
d(a);a=void 0!==a?ia(a,0,1):1;var b=255*a|0,c=this.c[b];c||(c=[new yi({image:new jp({opacity:a,src:this.P})})],this.c[b]=c);return c}.bind(this));this.set("renderOrder",null);w(this,"render",this.Qk,this)}v(U,E);var Iv=["#00f","#0ff","#0f0","#ff0","#f00"];k=U.prototype;k.tg=function(){return this.get(Jv)};k.Ag=function(){return this.get(Hv)};k.hh=function(){return this.get(Kv)};
k.zk=function(){for(var a=this.Ag(),b=De(1,256),c=b.createLinearGradient(0,0,1,256),d=1/(a.length-1),e=0,f=a.length;e<f;++e)c.addColorStop(e*d,a[e]);b.fillStyle=c;b.fillRect(0,0,1,256);this.f=b.getImageData(0,0,1,256).data};k.lf=function(){var a=this.hh(),b=this.tg(),c=a+b+1,d=2*c,d=De(d,d);d.shadowOffsetX=d.shadowOffsetY=this.W;d.shadowBlur=b;d.shadowColor="#000";d.beginPath();b=c-this.W;d.arc(b,b,a,0,2*Math.PI,!0);d.fill();this.P=d.canvas.toDataURL();this.c=Array(256);this.v()};
    k.Qk = function (a) {
        a = a.context;
        var b = a.canvas, b = a.getImageData(0, 0, b.width, b.height), c = b.data, d, e, f;
        d = 0;
        for (e = c.length; d < e; d += 4)if (f = 4 * c[d + 3])c[d] = this.f[f], c[d + 1] = this.f[f + 1], c[d + 2] = this.f[f + 2];
        a.putImageData(b, 0, 0)
    };
    k.Th = function (a) {
        this.set(Jv, a)
    };
    k.$h = function (a) {
        this.set(Hv, a)
    };
    k.ih = function (a) {
        this.set(Kv, a)
    };
    var Jv = "blur", Hv = "gradient", Kv = "radius";
    function Lv(a, b, c, d) {
        function e() {
            delete window[g];
            f.parentNode.removeChild(f)
        }
        var f = document.createElement("script"), g = "olc_" + ea(b);
        f.async = !0;
        f.src = a + (-1 == a.indexOf("?") ? "?" : "&") + (d || "callback") + "=" + g;
        var h = setTimeout(function () {
            e();
            c && c()
        }, 1E4);
        window[g] = function (a) {
            clearTimeout(h);
            e();
            b(a)
        };
        document.getElementsByTagName("head")[0].appendChild(f)
    }
    function Mv(a, b, c, d, e, f, g, h, l, m, n) {
        gg.call(this, e, 0);
        this.G = void 0 !== n ? n : !1;
        this.B = g;
        this.C = h;
        this.u = null;
        this.c = b;
        this.o = d;
        this.s = f ? f : e;
        this.g = [];
        this.Xc = null;
        this.j = 0;
        f = d.Ia(this.s);
        h = this.o.D();
        e = this.c.D();
        f = h ? cc(f, h) : f;
        if (0 === Xb(f))this.state = 4; else if ((h = a.D()) && (e ? e = cc(e, h) : e = h), d = d.Ga(this.s[0]), d = Mj(a, c, ac(f), d), !isFinite(d) || 0 >= d)this.state = 4; else if (this.T = new Pj(a, c, f, e, d * (void 0 !== m ? m : .5)), 0 === this.T.f.length)this.state = 4; else if (this.j = b.wc(d), c = Rj(this.T), e && (a.a ? (c[1] = ia(c[1], e[1],
                e[3]),c[3]=ia(c[3],e[1],e[3])):c=cc(c,e)),Xb(c)){a=be(b,c,this.j);for(b=a.ba;b<=a.da;b++)for(c=a.ea;c<=a.ha;c++)(m=l(this.j,b,c,g))&&this.g.push(m);0===this.g.length&&(this.state=4)}else this.state=4}v(Mv,gg);Mv.prototype.la=function(){1==this.state&&(this.Xc.forEach(za),this.Xc=null);gg.prototype.la.call(this)};Mv.prototype.qb=function(){return this.u};
Mv.prototype.Bd=function(){var a=[];this.g.forEach(function(b){b&&b.U()==jg&&a.push({extent:this.c.Ia(b.ya),image:b.qb()})},this);this.g.length=0;if(0===a.length)this.state=3;else{var b=this.s[0],c=this.o.Va(b),d="number"===typeof c?c:c[0],c="number"===typeof c?c:c[1],b=this.o.Ga(b),e=this.c.Ga(this.j),f=this.o.Ia(this.s);this.u=Oj(d,c,this.B,e,this.c.D(),b,f,this.T,a,this.C,this.G);this.state=jg}hg(this)};
Mv.prototype.load=function(){if(0==this.state){this.state=1;hg(this);var a=0;this.Xc=[];this.g.forEach(function(b){var c=b.U();if(0==c||1==c){a++;var d;d=w(b,"change",function(){var c=b.U();if(c==jg||3==c||4==c)za(d),a--,0===a&&(this.Xc.forEach(za),this.Xc=null,this.Bd())},this);this.Xc.push(d)}},this);this.g.forEach(function(a){0==a.U()&&a.load()});0===a&&setTimeout(this.Bd.bind(this),0)}};function Nv(a,b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){if(g)return a.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,function(){return(-g[2]-1).toString()}).replace(f,function(){var a=b.a?b.a[g[0]]:null;ha(a,55);return(a.ha-a.ea+1+g[2]).toString()})}}function Ov(a,b){for(var c=a.length,d=Array(c),e=0;e<c;++e)d[e]=Nv(a[e],b);return Pv(d)}function Pv(a){return 1===a.length?a[0]:function(b,c,d){if(b)return a[oa((b[1]<<b[0])+b[2],a.length)](b,c,d)}}
    function Qv() {
    }
    function Rv(a) {
        var b = [], c = /\{([a-z])-([a-z])\}/.exec(a);
        if (c) {
            var d = c[2].charCodeAt(0), e;
            for (e = c[1].charCodeAt(0); e <= d; ++e)b.push(a.replace(c[0], String.fromCharCode(e)));
            return b
        }
        if (c = c = /\{(\d+)-(\d+)\}/.exec(a)) {
            d = parseInt(c[2], 10);
            for (e = parseInt(c[1], 10); e <= d; e++)b.push(a.replace(c[0], e.toString()));
            return b
        }
        b.push(a);
        return b
    }
    function Sv(a) {
        sl.call(this);
        this.c = void 0 !== a ? a : 2048
    }
    v(Sv, sl);
    function Tv(a) {
        return a.f > a.c
    }
    Sv.prototype.Kc = function (a) {
        for (var b, c; Tv(this);) {
            b = this.a.Gc;
            c = b.ya[0].toString();
            var d;
            if (d = c in a)b = b.ya, d = Rd(a[c], b[1], b[2]);
            if (d)break; else Ja(this.pop())
        }
    };
    function Uv(a) {
        Tj.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection,
            state: a.state,
            wrapX: a.wrapX
        });
        this.fa = void 0 !== a.opaque ? a.opaque : !1;
        this.oa = void 0 !== a.tilePixelRatio ? a.tilePixelRatio : 1;
        this.tileGrid = void 0 !== a.tileGrid ? a.tileGrid : null;
        this.a = new Sv(a.cacheSize);
        this.l = [0, 0];
        this.ec = ""
    }
    v(Uv, Tj);
    k = Uv.prototype;
    k.qh = function () {
        return Tv(this.a)
    };
    k.Kc = function (a, b) {
        var c = this.qd(a);
        c && c.Kc(b)
    };
    function Wi(a,b,c,d,e){b=a.qd(b);if(!b)return!1;for(var f=!0,g,h,l=d.ba;l<=d.da;++l)for(var m=d.ea;m<=d.ha;++m)g=a.Fb(c,l,m),h=!1,b.b.hasOwnProperty(g)&&(g=b.get(g),(h=g.U()===jg)&&(h=!1!==e(g))),h||(f=!1);return f}k.df=function(){return 0};function Vv(a,b){a.ec!==b&&(a.ec=b,a.v())}k.Fb=function(a,b,c){return a+"/"+b+"/"+c};k.gf=function(){return this.fa};k.Ra=function(){return this.tileGrid};k.pb=function(a){return this.tileGrid?this.tileGrid:he(a)};
k.qd=function(a){var b=this.f;return b&&!Hc(b,a)?null:this.a};k.gb=function(){return this.oa};k.kf=function(a,b,c){c=this.pb(c);b=this.gb(b);a=Wd(c.Va(a),this.l);return 1==b?a:Vd(a,b,this.l)};function Wv(a,b,c){var d=void 0!==c?c:a.f;c=a.pb(d);if(a.G&&d.g){var e=b;b=e[0];a=ge(c,e);d=ie(d);Gb(d,a)?b=e:(e=Zb(d),a[0]+=e*Math.ceil((d[0]-a[0])/e),b=c.Zd(a,b))}e=b[0];d=b[1];a=b[2];if(c.minZoom>e||e>c.maxZoom)c=!1;else{var f=c.D();c=(c=f?be(c,f,e):c.a?c.a[e]:null)?Rd(c,d,a):!0}return c?b:null}
k.ta=function(){this.a.clear();this.v()};k.Vf=da;function Xv(a,b){Ka.call(this,a);this.tile=b}v(Xv,Ka);function Yv(a){Uv.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tilePixelRatio:a.tilePixelRatio,wrapX:a.wrapX});this.tileLoadFunction=a.tileLoadFunction;this.tileUrlFunction=this.sc?this.sc.bind(this):Qv;this.urls=null;a.urls?this.Ua(a.urls):a.url&&this.Ya(a.url);a.tileUrlFunction&&this.Ta(a.tileUrlFunction)}v(Yv,Uv);k=Yv.prototype;k.fb=function(){return this.tileLoadFunction};
k.hb=function(){return this.tileUrlFunction};k.ib=function(){return this.urls};k.rh=function(a){a=a.target;switch(a.U()){case 1:this.b(new Xv("tileloadstart",a));break;case jg:this.b(new Xv("tileloadend",a));break;case 3:this.b(new Xv("tileloaderror",a))}};k.nb=function(a){this.a.clear();this.tileLoadFunction=a;this.v()};k.Ta=function(a,b){this.tileUrlFunction=a;"undefined"!==typeof b?Vv(this,b):this.v()};
k.Ya=function(a){var b=this.urls=Rv(a);this.Ta(this.sc?this.sc.bind(this):Ov(b,this.tileGrid),a)};k.Ua=function(a){this.urls=a;var b=a.join("\n");this.Ta(this.sc?this.sc.bind(this):Ov(a,this.tileGrid),b)};k.Vf=function(a,b,c){a=this.Fb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function W(a){Yv.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:Zv,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:a.wrapX});this.crossOrigin=void 0!==a.crossOrigin?a.crossOrigin:null;this.tileClass=void 0!==a.tileClass?a.tileClass:Rt;this.i={};this.s={};this.ra=a.reprojectionErrorThreshold;
this.B=!1}v(W,Yv);k=W.prototype;k.qh=function(){if(Tv(this.a))return!0;for(var a in this.i)if(Tv(this.i[a]))return!0;return!1};k.Kc=function(a,b){var c=this.qd(a);this.a.Kc(this.a==c?b:{});for(var d in this.i){var e=this.i[d];e.Kc(e==c?b:{})}};k.df=function(a){return this.f&&a&&!Hc(this.f,a)?0:this.ef()};k.ef=function(){return 0};k.gf=function(a){return this.f&&a&&!Hc(this.f,a)?!1:Yv.prototype.gf.call(this,a)};
k.pb=function(a){var b=this.f;return!this.tileGrid||b&&!Hc(b,a)?(b=ea(a).toString(),b in this.s||(this.s[b]=he(a)),this.s[b]):this.tileGrid};k.qd=function(a){var b=this.f;if(!b||Hc(b,a))return this.a;a=ea(a).toString();a in this.i||(this.i[a]=new Sv);return this.i[a]};function $v(a,b,c,d,e,f,g){b=[b,c,d];e=(c=Wv(a,b,f))?a.tileUrlFunction(c,e,f):void 0;e=new a.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",a.crossOrigin,a.tileLoadFunction);e.key=g;w(e,"change",a.rh,a);return e}
k.vc=function(a,b,c,d,e){if(this.f&&e&&!Hc(this.f,e)){var f=this.qd(e);c=[a,b,c];var g;a=this.Fb.apply(this,c);f.b.hasOwnProperty(a)&&(g=f.get(a));b=this.ec;if(g&&g.key==b)return g;var h=this.f,l=this.pb(h),m=this.pb(e),n=Wv(this,c,e);d=new Mv(h,l,e,m,c,n,this.gb(d),this.ef(),function(a,b,c,d){return aw(this,a,b,c,d,h)}.bind(this),this.ra,this.B);d.key=b;g?(d.a=g,f.replace(a,d)):f.set(a,d);return d}return aw(this,a,b,c,d,e)};
function aw(a,b,c,d,e,f){var g,h=a.Fb(b,c,d),l=a.ec;if(a.a.b.hasOwnProperty(h)){if(g=a.a.get(h),g.key!=l){var m=g;g=$v(a,b,c,d,e,f,l);0==m.U()?g.a=m.a:g.a=m;if(g.a){b=g.a;c=g;do{if(b.U()==jg){b.a=null;break}else 1==b.U()?c=b:0==b.U()?c.a=b.a:c=b;b=c.a}while(b)}a.a.replace(h,g)}}else g=$v(a,b,c,d,e,f,l),a.a.set(h,g);return g}k.Bb=function(a){if(this.B!=a){this.B=a;for(var b in this.i)this.i[b].clear();this.v()}};k.Cb=function(a,b){var c=qc(a);c&&(c=ea(c).toString(),c in this.s||(this.s[c]=b))};
    function Zv(a, b) {
        a.qb().src = b
    }
    function bw(a) {
        W.call(this, {
            cacheSize: a.cacheSize,
            crossOrigin: "anonymous",
            opaque: !0,
            projection: qc("EPSG:3857"),
            reprojectionErrorThreshold: a.reprojectionErrorThreshold,
            state: "loading",
            tileLoadFunction: a.tileLoadFunction,
            wrapX: void 0 !== a.wrapX ? a.wrapX : !0
        });
        this.C = void 0 !== a.culture ? a.culture : "en-us";
        this.u = void 0 !== a.maxZoom ? a.maxZoom : -1;
        this.c = a.key;
        this.o = a.imagerySet;
        Lv("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.o + "?uriScheme=https&include=ImageryProviders&key=" + this.c, this.Z.bind(this),
            void 0,"jsonp")}v(bw,W);var cw=new le({html:'<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});bw.prototype.P=function(){return this.c};bw.prototype.W=function(){return this.o};
bw.prototype.Z=function(a){if(200!=a.statusCode||"OK"!=a.statusDescription||"ValidCredentials"!=a.authenticationResultCode||1!=a.resourceSets.length||1!=a.resourceSets[0].resources.length)Vj(this,"error");else{var b=a.brandLogoUri;-1==b.indexOf("https")&&(b=b.replace("http","https"));var c=a.resourceSets[0].resources[0],d=-1==this.u?c.zoomMax:this.u;a=ie(this.f);var e=ke({extent:a,minZoom:c.zoomMin,maxZoom:d,tileSize:c.imageWidth==c.imageHeight?c.imageWidth:[c.imageWidth,c.imageHeight]});this.tileGrid=
e;var f=this.C;this.tileUrlFunction=Pv(c.imageUrlSubdomains.map(function(a){var b=[0,0,0],d=c.imageUrl.replace("{subdomain}",a).replace("{culture}",f);return function(a){if(a)return Xd(a[0],a[1],-a[2]-1,b),d.replace("{quadkey}",Yd(b))}}));if(c.imageryProviders){var g=tc(qc("EPSG:4326"),this.f);a=c.imageryProviders.map(function(a){var b=a.attribution,c={};a.coverageAreas.forEach(function(a){var b=a.zoomMin,f=Math.min(a.zoomMax,d);a=a.bbox;a=fc([a[1],a[0],a[3],a[2]],g);var h,l;for(h=b;h<=f;++h)l=h.toString(),
b=be(e,a,h),l in c?c[l].push(b):c[l]=[b]});return new le({html:b,tileRanges:c})});a.push(cw);this.qa(a)}this.S=b;Vj(this,"ready")}};function dw(a){a=a||{};var b=void 0!==a.projection?a.projection:"EPSG:3857",c=void 0!==a.tileGrid?a.tileGrid:ke({extent:ie(b),maxZoom:a.maxZoom,minZoom:a.minZoom,tileSize:a.tileSize});W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:a.opaque,projection:b,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:c,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,
wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(dw,W);function ew(a){this.u=a.account;this.C=a.map||"";this.c=a.config||{};this.o={};dw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,maxZoom:void 0!==a.maxZoom?a.maxZoom:18,minZoom:a.minZoom,projection:a.projection,state:"loading",wrapX:a.wrapX});fw(this)}v(ew,dw);k=ew.prototype;k.Hj=function(){return this.c};k.gp=function(a){ua(this.c,a);fw(this)};k.Po=function(a){this.c=a||{};fw(this)};
function fw(a){var b=JSON.stringify(a.c);if(a.o[b])gw(a,a.o[b]);else{var c="https://"+a.u+".cartodb.com/api/v1/map";a.C&&(c+="/named/"+a.C);var d=new XMLHttpRequest;d.addEventListener("load",a.Bk.bind(a,b));d.addEventListener("error",a.Ak.bind(a));d.open("POST",c);d.setRequestHeader("Content-type","application/json");d.send(JSON.stringify(a.c))}}
    k.Bk = function (a, b) {
        var c = b.target;
        if (!c.status || 200 <= c.status && 300 > c.status) {
            var d;
            try {
                d = JSON.parse(c.responseText)
            } catch (e) {
                Vj(this, "error");
                return
            }
            gw(this, d);
            this.o[a] = d;
            Vj(this, "ready")
        } else Vj(this, "error")
    };
    k.Ak = function () {
        Vj(this, "error")
    };
    function gw(a, b) {
        a.Ya("https://" + b.cdn_url.https + "/" + a.u + "/api/v1/map/" + b.layergroupid + "/{z}/{x}/{y}.png")
    }
    function X(a) {
        T.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection,
            wrapX: a.wrapX
        });
        this.B = void 0;
        this.fa = void 0 !== a.distance ? a.distance : 20;
        this.C = [];
        this.oa = a.geometryFunction || function (a) {
                a = a.V();
                ha(a instanceof A, 10);
                return a
            };
        this.u = a.source;
        this.u.I("change", X.prototype.La, this)
    }
    v(X, T);
    X.prototype.ub = function () {
        return this.u
    };
    X.prototype.rd = function (a, b, c) {
        this.u.rd(a, b, c);
        b !== this.B && (this.clear(), this.B = b, hw(this), this.Ic(this.C))
    };
    X.prototype.Jb=function(a){this.fa=a;this.La()};X.prototype.La=function(){this.clear();hw(this);this.Ic(this.C);this.v()};function hw(a){if(void 0!==a.B){a.C.length=0;for(var b=Bb(),c=a.fa*a.B,d=a.u.oe(),e={},f=0,g=d.length;f<g;f++){var h=d[f];ea(h).toString()in e||!(h=a.oa(h))||(h=h.Y(),Lb(h,b),Db(b,c,b),h=a.u.bf(b),h=h.filter(function(a){a=ea(a).toString();return a in e?!1:e[a]=!0}),a.C.push(iw(a,h)))}}}
    function iw(a, b) {
        for (var c = [0, 0], d = b.length - 1; 0 <= d; --d) {
            var e = a.oa(b[d]);
            e ? rb(c, e.Y()) : b.splice(d, 1)
        }
        d = 1 / b.length;
        c[0] *= d;
        c[1] *= d;
        c = new I(new A(c));
        c.set("features", b);
        return c
    }
    function jw(a, b) {
        var c = [];
        Object.keys(b).forEach(function (a) {
            null !== b[a] && void 0 !== b[a] && c.push(a + "=" + encodeURIComponent(b[a]))
        });
        var d = c.join("&");
        a = a.replace(/[?&]$/, "");
        a = -1 === a.indexOf("?") ? a + "?" : a + "&";
        return a + d
    }
    function kw(a) {
        a = a || {};
        Wj.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: a.projection,
            resolutions: a.resolutions
        });
        this.Z = void 0 !== a.crossOrigin ? a.crossOrigin : null;
        this.i = a.url;
        this.l = void 0 !== a.imageLoadFunction ? a.imageLoadFunction : ck;
        this.u = a.params || {};
        this.c = null;
        this.s = [0, 0];
        this.P = 0;
        this.B = void 0 !== a.ratio ? a.ratio : 1.5
    }
    v(kw, Wj);
    k = kw.prototype;
    k.Gm = function () {
        return this.u
    };
    k.Lc=function(a,b,c,d){if(void 0===this.i)return null;b=Xj(this,b);var e=this.c;if(e&&this.P==this.g&&e.resolution==b&&e.f==c&&Ib(e.D(),a))return e;e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};ua(e,this.u);a=a.slice();var f=(a[0]+a[2])/2,g=(a[1]+a[3])/2;if(1!=this.B){var h=this.B*Zb(a)/2,l=this.B*$b(a)/2;a[0]=f-h;a[1]=g-l;a[2]=f+h;a[3]=g+l}var h=b/c,l=Math.ceil(Zb(a)/h),m=Math.ceil($b(a)/h);a[0]=f-h*l/2;a[2]=f+h*l/2;a[1]=g-h*m/2;a[3]=g+h*m/2;this.s[0]=l;this.s[1]=m;f=a;g=this.s;d=d.eb.split(":").pop();
e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=90*c;d=this.i;f=d.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage");f==d&&ha(!1,50);e=jw(f,e);this.c=new ii(a,b,c,this.j,e,this.Z,this.l);this.P=this.g;w(this.c,"change",this.o,this);return this.c};k.Fm=function(){return this.l};k.Hm=function(){return this.i};k.Im=function(a){this.c=null;this.l=a;this.v()};k.Jm=function(a){a!=this.i&&(this.i=a,this.c=null,this.v())};
k.Km=function(a){ua(this.u,a);this.c=null;this.v()};function lw(a){Wj.call(this,{projection:a.projection,resolutions:a.resolutions});this.Z=void 0!==a.crossOrigin?a.crossOrigin:null;this.s=void 0!==a.displayDpi?a.displayDpi:96;this.l=a.params||{};this.P=a.url;this.c=void 0!==a.imageLoadFunction?a.imageLoadFunction:ck;this.fa=void 0!==a.hidpi?a.hidpi:!0;this.oa=void 0!==a.metersPerUnit?a.metersPerUnit:1;this.u=void 0!==a.ratio?a.ratio:1;this.Aa=void 0!==a.useOverlay?a.useOverlay:!1;this.i=null;this.B=0}v(lw,Wj);k=lw.prototype;k.Mm=function(){return this.l};
k.Lc=function(a,b,c){b=Xj(this,b);c=this.fa?c:1;var d=this.i;if(d&&this.B==this.g&&d.resolution==b&&d.f==c&&Ib(d.D(),a))return d;1!=this.u&&(a=a.slice(),ec(a,this.u));var e=[Zb(a)/b*c,$b(a)/b*c];if(void 0!==this.P){var d=this.P,f=ac(a),g=this.oa,h=Zb(a),l=$b(a),m=e[0],n=e[1],p=.0254/this.s,e={OPERATION:this.Aa?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.s,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),
SETVIEWSCALE:n*h>m*l?h*g/(m*p):l*g/(n*p),SETVIEWCENTERX:f[0],SETVIEWCENTERY:f[1]};ua(e,this.l);d=jw(d,e);d=new ii(a,b,c,this.j,d,this.Z,this.c);w(d,"change",this.o,this)}else d=null;this.i=d;this.B=this.g;return d};k.Lm=function(){return this.c};k.Om=function(a){ua(this.l,a);this.v()};k.Nm=function(a){this.i=null;this.c=a;this.v()};function mw(a){var b=a.imageExtent,c=void 0!==a.crossOrigin?a.crossOrigin:null,d=void 0!==a.imageLoadFunction?a.imageLoadFunction:ck;Wj.call(this,{attributions:a.attributions,logo:a.logo,projection:qc(a.projection)});this.c=new ii(b,void 0,1,this.j,a.url,c,d);this.i=a.imageSize?a.imageSize:null;w(this.c,"change",this.o,this)}v(mw,Wj);mw.prototype.Lc=function(a){return dc(a,this.c.D())?this.c:null};
mw.prototype.o=function(a){if(this.c.U()==li){var b=this.c.D(),c=this.c.a(),d,e;this.i?(d=this.i[0],e=this.i[1]):(d=c.width,e=c.height);b=Math.ceil(Zb(b)/($b(b)/e));if(b!=d){var b=De(b,e),f=b.canvas;b.drawImage(c,0,0,d,e,0,0,f.width,f.height);this.c.g=f}}Wj.prototype.o.call(this,a)};function nw(a){a=a||{};Wj.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.oa=void 0!==a.crossOrigin?a.crossOrigin:null;this.l=a.url;this.B=void 0!==a.imageLoadFunction?a.imageLoadFunction:ck;this.i=a.params||{};this.u=!0;ow(this);this.fa=a.serverType;this.Aa=void 0!==a.hidpi?a.hidpi:!0;this.c=null;this.P=[0,0];this.Z=0;this.s=void 0!==a.ratio?a.ratio:1.5}v(nw,Wj);var pw=[101,101];k=nw.prototype;
k.Um=function(a,b,c,d){if(void 0!==this.l){var e=bc(a,b,0,pw),f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.i.LAYERS};ua(f,this.i,d);d=Math.floor((e[3]-a[1])/b);f[this.u?"I":"X"]=Math.floor((a[0]-e[0])/b);f[this.u?"J":"Y"]=d;return qw(this,e,pw,1,qc(c),f)}};k.Wm=function(){return this.i};
k.Lc=function(a,b,c,d){if(void 0===this.l)return null;b=Xj(this,b);1==c||this.Aa&&void 0!==this.fa||(c=1);a=a.slice();var e=(a[0]+a[2])/2,f=(a[1]+a[3])/2,g=b/c,h=Zb(a)/g,g=$b(a)/g,l=this.c;if(l&&this.Z==this.g&&l.resolution==b&&l.f==c&&Ib(l.D(),a))return l;if(1!=this.s){var l=this.s*Zb(a)/2,m=this.s*$b(a)/2;a[0]=e-l;a[1]=f-m;a[2]=e+l;a[3]=f+m}e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};ua(e,this.i);this.P[0]=Math.ceil(h*this.s);this.P[1]=Math.ceil(g*this.s);
d=qw(this,a,this.P,c,d,e);this.c=new ii(a,b,c,this.j,d,this.oa,this.B);this.Z=this.g;w(this.c,"change",this.o,this);return this.c};k.Vm=function(){return this.B};
function qw(a,b,c,d,e,f){ha(void 0!==a.l,9);f[a.u?"CRS":"SRS"]=e.eb;"STYLES"in a.i||(f.STYLES="");if(1!=d)switch(a.fa){case "geoserver":d=90*d+.5|0;f.FORMAT_OPTIONS="FORMAT_OPTIONS"in f?f.FORMAT_OPTIONS+(";dpi:"+d):"dpi:"+d;break;case "mapserver":f.MAP_RESOLUTION=90*d;break;case "carmentaserver":case "qgis":f.DPI=90*d;break;default:ha(!1,8)}f.WIDTH=c[0];f.HEIGHT=c[1];c=e.b;var g;a.u&&"ne"==c.substr(0,2)?g=[b[1],b[0],b[3],b[2]]:g=b;f.BBOX=g.join(",");return jw(a.l,f)}k.Xm=function(){return this.l};
    k.Ym = function (a) {
        this.c = null;
        this.B = a;
        this.v()
    };
    k.Zm = function (a) {
        a != this.l && (this.l = a, this.c = null, this.v())
    };
    k.$m = function (a) {
        ua(this.i, a);
        ow(this);
        this.c = null;
        this.v()
    };
    function ow(a) {
        a.u = 0 <= qb(a.i.VERSION || "1.3.0")
    }
    function rw(a) {
        a = a || {};
        var b;
        void 0 !== a.attributions ? b = a.attributions : b = [sw];
        dw.call(this, {
            attributions: b,
            cacheSize: a.cacheSize,
            crossOrigin: void 0 !== a.crossOrigin ? a.crossOrigin : "anonymous",
            opaque: void 0 !== a.opaque ? a.opaque : !0,
            maxZoom: void 0 !== a.maxZoom ? a.maxZoom : 19,
            reprojectionErrorThreshold: a.reprojectionErrorThreshold,
            tileLoadFunction: a.tileLoadFunction,
            url: void 0 !== a.url ? a.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            wrapX: a.wrapX
        })
    }
    v(rw, dw);
    var sw = new le({html: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});
    (function () {
        var a = {}, b = {ja: a};
        (function (c) {
            if ("object" === typeof a && "undefined" !== typeof b)b.ja = c(); else {
                var d;
                "undefined" !== typeof window ? d = window : "undefined" !== typeof global ? d = global : "undefined" !== typeof self ? d = self : d = this;
                d.Cp = c()
            }
        })(function () {
            return function d(a, b, g) {
                function h(m, p) {
                    if (!b[m]) {
                        if (!a[m]) {
                            var q = "function" == typeof require && require;
                            if (!p && q)return q(m, !0);
                            if (l)return l(m, !0);
                            q = Error("Cannot find module '" + m + "'");
                            throw q.code = "MODULE_NOT_FOUND", q;
                        }
                        q = b[m] = {ja: {}};
                        a[m][0].call(q.ja, function (b) {
                            var d =
                                a[m][1][b];return h(d?d:b)},q,q.ja,d,a,b,g)}return b[m].ja}for(var l="function"==typeof require&&require,m=0;m<g.length;m++)h(g[m]);return h}({1:[function(a,b,f){a=a("./processor");f.Pi=a},{"./processor":2}],2:[function(a,b){function f(a){var b=!0;try{new ImageData(10,10)}catch(d){b=!1}return function(d){var e=d.buffers,f=d.meta,g=d.width,h=d.height,l=e.length,m=e[0].byteLength;if(d.imageOps){m=Array(l);for(d=0;d<l;++d){var K=m,V=d,Z;Z=new Uint8ClampedArray(e[d]);var Ra=g,F=h;Z=b?new ImageData(Z,
Ra,F):{data:Z,width:Ra,height:F};K[V]=Z}g=a(m,f).data}else{g=new Uint8ClampedArray(m);h=Array(l);K=Array(l);for(d=0;d<l;++d)h[d]=new Uint8ClampedArray(e[d]),K[d]=[0,0,0,0];for(e=0;e<m;e+=4){for(d=0;d<l;++d)V=h[d],K[d][0]=V[e],K[d][1]=V[e+1],K[d][2]=V[e+2],K[d][3]=V[e+3];d=a(K,f);g[e]=d[0];g[e+1]=d[1];g[e+2]=d[2];g[e+3]=d[3]}}return g.buffer}}function g(a,b){var d=Object.keys(a.lib||{}).map(function(b){return"var "+b+" = "+a.lib[b].toString()+";"}).concat(["var __minion__ = ("+f.toString()+")(",a.operation.toString(),
");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);","});"]),d=URL.createObjectURL(new Blob(d,{type:"text/javascript"})),d=new Worker(d);d.addEventListener("message",b);return d}function h(a,b){var d=f(a.operation);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function l(a){this.Oe=!!a.Yk;var b;0===a.threads?b=0:this.Oe?b=1:b=a.threads||
1;var d=[];if(b)for(var e=0;e<b;++e)d[e]=g(a,this.eg.bind(this,e));else d[0]=h(a,this.eg.bind(this,0));this.Nd=d;this.bd=[];this.cj=a.jo||Infinity;this.Ld=0;this.Hc={};this.Pe=null}var m=a("./util").rl;l.prototype.ho=function(a,b,d){this.aj({xc:a,Pg:b,mg:d});this.bg()};l.prototype.aj=function(a){for(this.bd.push(a);this.bd.length>this.cj;)this.bd.shift().mg(null,null)};l.prototype.bg=function(){if(0===this.Ld&&0<this.bd.length){var a=this.Pe=this.bd.shift(),b=a.xc[0].width,d=a.xc[0].height,e=a.xc.map(function(a){return a.data.buffer}),
f=this.Nd.length;this.Ld=f;if(1===f)this.Nd[0].postMessage({buffers:e,meta:a.Pg,imageOps:this.Oe,width:b,height:d},e);else for(var g=4*Math.ceil(a.xc[0].data.length/4/f),h=0;h<f;++h){for(var l=h*g,m=[],K=0,V=e.length;K<V;++K)m.push(e[h].slice(l,l+g));this.Nd[h].postMessage({buffers:m,meta:a.Pg,imageOps:this.Oe,width:b,height:d},m)}}};l.prototype.eg=function(a,b){this.Ap||(this.Hc[a]=b.data,--this.Ld,0===this.Ld&&this.dj())};l.prototype.dj=function(){var a=this.Pe,b=this.Nd.length,d,e;if(1===b)d=new Uint8ClampedArray(this.Hc[0].buffer),
e=this.Hc[0].meta;else{var f=a.xc[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);for(var f=4*Math.ceil(f/4/b),g=0;g<b;++g){var h=g*f;d.set(new Uint8ClampedArray(this.Hc[g].buffer),h);e[g]=this.Hc[g].meta}}this.Pe=null;this.Hc={};a.mg(null,m(d,a.xc[0].width,a.xc[0].height),e);this.bg()};b.ja=l},{"./util":3}],3:[function(a,b,f){var g=!0;try{new ImageData(10,10)}catch(l){g=!1}var h=document.createElement("canvas").getContext("2d");f.rl=function(a,b,d){if(g)return new ImageData(a,b,d);b=h.createImageData(b,
d);b.data.set(a);return b}},{}]},{},[1])(1)});pr=b.ja})();function tw(a){this.B=null;this.Aa=void 0!==a.operationType?a.operationType:"pixel";this.La=void 0!==a.threads?a.threads:1;this.c=uw(a.sources);for(var b=0,c=this.c.length;b<c;++b)w(this.c[b],"change",this.v,this);this.i=De();this.fa=new pg(function(){return 1},this.v.bind(this));for(var b=vw(this.c),c={},d=0,e=b.length;d<e;++d)c[ea(b[d].layer)]=b[d];this.l=this.s=null;this.Z={animate:!1,attributions:{},coordinateToPixelTransform:Oh(),extent:null,focus:null,index:0,layerStates:c,layerStatesArray:b,
logos:{},pixelRatio:1,pixelToCoordinateTransform:Oh(),postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:this.fa,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}};Wj.call(this,{});void 0!==a.operation&&this.u(a.operation,a.lib)}v(tw,Wj);tw.prototype.u=function(a,b){this.B=new pr.Pi({operation:a,Yk:"image"===this.Aa,jo:1,lib:b,threads:this.La});this.v()};function ww(a,b,c){var d=a.s;return!d||a.g!==d.Mo||c!==d.resolution||!Pb(b,d.extent)}
tw.prototype.W=function(a,b,c,d){c=!0;for(var e,f=0,g=this.c.length;f<g;++f)if(e=this.c[f].a.ga(),"ready"!==e.U()){c=!1;break}if(!c)return null;a=a.slice();if(!ww(this,a,b))return this.l;c=this.i.canvas;e=Math.round(Zb(a)/b);f=Math.round($b(a)/b);if(e!==c.width||f!==c.height)c.width=e,c.height=f;e=ua({},this.Z);e.viewState=ua({},e.viewState);var f=ac(a),g=Math.round(Zb(a)/b),h=Math.round($b(a)/b);e.extent=a;e.focus=ac(a);e.size[0]=g;e.size[1]=h;g=e.viewState;g.center=f;g.projection=d;g.resolution=
b;this.l=d=new Ij(a,b,1,this.j,c,this.P.bind(this,e));this.s={extent:a,resolution:b,Mo:this.g};return d};
tw.prototype.P=function(a,b){for(var c=this.c.length,d=Array(c),e=0;e<c;++e){var f;f=this.c[e];var g=a,h=a.layerStatesArray[e];if(f.j(g,h)){var l=g.size[0],m=g.size[1];if(xw){var n=xw.canvas;n.width!==l||n.height!==m?xw=De(l,m):xw.clearRect(0,0,l,m)}else xw=De(l,m);f.i(g,h,xw);f=xw.getImageData(0,0,l,m)}else f=null;if(f)d[e]=f;else return}c={};this.b(new yw(zw,a,c));this.B.ho(d,c,this.oa.bind(this,a,b));qg(a.tileQueue,16,16)};
tw.prototype.oa=function(a,b,c,d,e){c?b(c):d&&(this.b(new yw(Aw,a,e)),ww(this,a.extent,a.viewState.resolution/a.pixelRatio)||this.i.putImageData(d,0,0),b(null))};var xw=null;function vw(a){return a.map(function(a){return wh(a.a)})}function uw(a){for(var b=a.length,c=Array(b),d=0;d<b;++d){var e=d,f=a[d],g=null;f instanceof Uv?(f=new D({source:f}),g=new hk(f)):f instanceof Wj&&(f=new di({source:f}),g=new gk(f));c[e]=g}return c}
function yw(a,b,c){Ka.call(this,a);this.extent=b.extent;this.resolution=b.viewState.resolution/b.pixelRatio;this.data=c}v(yw,Ka);var zw="beforeoperations",Aw="afteroperations";function Bw(a){var b=a.layer.indexOf("-"),b=Cw[-1==b?a.layer:a.layer.slice(0,b)],c=Dw[a.layer];dw.call(this,{attributions:Ew,cacheSize:a.cacheSize,crossOrigin:"anonymous",maxZoom:void 0!=a.maxZoom?a.maxZoom:b.maxZoom,minZoom:void 0!=a.minZoom?a.minZoom:b.minZoom,opaque:c.opaque,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+a.layer+"/{z}/{x}/{y}."+c.wb})}v(Bw,dw);
var Ew=[new le({html:'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}),sw],Dw={terrain:{wb:"jpg",opaque:!0},"terrain-background":{wb:"jpg",opaque:!0},"terrain-labels":{wb:"png",opaque:!1},"terrain-lines":{wb:"png",opaque:!1},"toner-background":{wb:"png",opaque:!0},toner:{wb:"png",opaque:!0},"toner-hybrid":{wb:"png",opaque:!1},"toner-labels":{wb:"png",opaque:!1},"toner-lines":{wb:"png",opaque:!1},"toner-lite":{wb:"png",
opaque:!0},watercolor:{wb:"jpg",opaque:!0}},Cw={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:1,maxZoom:16}};function Fw(a){a=a||{};W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.c=a.params||{};this.o=Bb();Vv(this,Gw(this))}v(Fw,W);function Gw(a){var b=0,c=[],d;for(d in a.c)c[b++]=d+"-"+a.c[d];return c.join("/")}Fw.prototype.u=function(){return this.c};
Fw.prototype.gb=function(a){return a};
Fw.prototype.sc=function(a,b,c){var d=this.tileGrid;d||(d=this.pb(c));if(!(d.b.length<=a[0])){var e=d.Ia(a,this.o),f=Wd(d.Va(a[0]),this.l);1!=b&&(f=Vd(f,b,this.l));d={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};ua(d,this.c);var g=this.urls;g?(c=c.eb.split(":").pop(),d.SIZE=f[0]+","+f[1],d.BBOX=e.join(","),d.BBOXSR=c,d.IMAGESR=c,d.DPI=Math.round(d.DPI?d.DPI*b:90*b),a=1==g.length?g[0]:g[oa((a[1]<<a[0])+a[2],g.length)],b=a.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),
b==a&&ha(!1,50),d=jw(b,d)):d=void 0;return d}};Fw.prototype.C=function(a){ua(this.c,a);Vv(this,Gw(this))};function Hw(a){Uv.call(this,{opaque:!1,projection:a.projection,tileGrid:a.tileGrid,wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(Hw,Uv);Hw.prototype.vc=function(a,b,c){var d=this.Fb(a,b,c);if(this.a.b.hasOwnProperty(d))return this.a.get(d);var e=Wd(this.tileGrid.Va(a));a=[a,b,c];b=(b=Wv(this,a))?Wv(this,b).toString():"";e=new Iw(a,e,b);this.a.set(d,e);return e};function Iw(a,b,c){gg.call(this,a,jg);this.j=b;this.c=c;this.g=null}v(Iw,gg);
Iw.prototype.qb=function(){if(this.g)return this.g;var a=this.j,b=De(a[0],a[1]);b.strokeStyle="black";b.strokeRect(.5,.5,a[0]+.5,a[1]+.5);b.fillStyle="black";b.textAlign="center";b.textBaseline="middle";b.font="24px sans-serif";b.fillText(this.c,a[0]/2,a[1]/2);return this.g=b.canvas};function Jw(a){this.c=null;W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,projection:qc("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,wrapX:void 0!==a.wrapX?a.wrapX:!0});if(a.jsonp)Lv(a.url,this.oh.bind(this),this.me.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.bn.bind(this));b.addEventListener("error",this.an.bind(this));b.open("GET",a.url);b.send()}}
v(Jw,W);k=Jw.prototype;k.bn=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){var b;try{b=JSON.parse(a.responseText)}catch(c){this.me();return}this.oh(b)}else this.me()};k.an=function(){this.me()};k.nk=function(){return this.c};
k.oh=function(a){var b=qc("EPSG:4326"),c=this.f,d;if(void 0!==a.bounds){var e=tc(b,c);d=fc(a.bounds,e)}var f=a.minzoom||0,e=a.maxzoom||22;this.tileGrid=c=ke({extent:ie(c),maxZoom:e,minZoom:f});this.tileUrlFunction=Ov(a.tiles,c);if(void 0!==a.attribution&&!this.j){b=void 0!==d?d:b.D();d={};for(var g;f<=e;++f)g=f.toString(),d[g]=[be(c,b,f)];this.qa([new le({html:a.attribution,tileRanges:d})])}this.c=a;Vj(this,"ready")};k.me=function(){Vj(this,"error")};function Kw(a){Uv.call(this,{projection:qc("EPSG:3857"),state:"loading"});this.s=void 0!==a.preemptive?a.preemptive:!0;this.o=Qv;this.i=void 0;this.c=a.jsonp||!1;if(a.url)if(this.c)Lv(a.url,this.zf.bind(this),this.ne.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.fn.bind(this));b.addEventListener("error",this.en.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?this.zf(a.tileJSON):ha(!1,51)}v(Kw,Uv);k=Kw.prototype;
k.fn=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){var b;try{b=JSON.parse(a.responseText)}catch(c){this.ne();return}this.zf(b)}else this.ne()};k.en=function(){this.ne()};k.kk=function(){return this.i};k.wj=function(a,b,c,d,e){this.tileGrid?(b=this.tileGrid.Yd(a,b),Lw(this.vc(b[0],b[1],b[2],1,this.f),a,c,d,e)):!0===e?setTimeout(function(){c.call(d,null)},0):c.call(d,null)};k.ne=function(){Vj(this,"error")};
k.zf=function(a){var b=qc("EPSG:4326"),c=this.f,d;if(void 0!==a.bounds){var e=tc(b,c);d=fc(a.bounds,e)}var f=a.minzoom||0,e=a.maxzoom||22;this.tileGrid=c=ke({extent:ie(c),maxZoom:e,minZoom:f});this.i=a.template;var g=a.grids;if(g){this.o=Ov(g,c);if(void 0!==a.attribution){b=void 0!==d?d:b.D();for(d={};f<=e;++f)g=f.toString(),d[g]=[be(c,b,f)];this.qa([new le({html:a.attribution,tileRanges:d})])}Vj(this,"ready")}else Vj(this,"error")};
k.vc=function(a,b,c,d,e){var f=this.Fb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];b=Wv(this,a,e);d=this.o(b,d,e);d=new Mw(a,void 0!==d?0:4,void 0!==d?d:"",this.tileGrid.Ia(a),this.s,this.c);this.a.set(f,d);return d};k.Vf=function(a,b,c){a=this.Fb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function Mw(a,b,c,d,e,f){gg.call(this,a,b);this.s=c;this.g=d;this.u=e;this.c=this.o=this.j=null;this.T=f}v(Mw,gg);k=Mw.prototype;k.qb=function(){return null};
k.getData=function(a){if(!this.j||!this.o)return null;var b=this.j[Math.floor((1-(a[1]-this.g[1])/(this.g[3]-this.g[1]))*this.j.length)];if("string"!==typeof b)return null;b=b.charCodeAt(Math.floor((a[0]-this.g[0])/(this.g[2]-this.g[0])*b.length));93<=b&&b--;35<=b&&b--;b-=32;a=null;b in this.o&&(b=this.o[b],this.c&&b in this.c?a=this.c[b]:a=b);return a};
function Lw(a,b,c,d,e){0==a.state&&!0===e?(Ea(a,"change",function(){c.call(d,this.getData(b))},a),Nw(a)):!0===e?setTimeout(function(){c.call(d,this.getData(b))}.bind(a),0):c.call(d,a.getData(b))}k.Xa=function(){return this.s};k.$d=function(){this.state=3;hg(this)};k.ph=function(a){this.j=a.grid;this.o=a.keys;this.c=a.data;this.state=4;hg(this)};
function Nw(a){if(0==a.state)if(a.state=1,a.T)Lv(a.s,a.ph.bind(a),a.$d.bind(a));else{var b=new XMLHttpRequest;b.addEventListener("load",a.dn.bind(a));b.addEventListener("error",a.cn.bind(a));b.open("GET",a.s);b.send()}}k.dn=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){var b;try{b=JSON.parse(a.responseText)}catch(c){this.$d();return}this.ph(b)}else this.$d()};k.cn=function(){this.$d()};k.load=function(){this.u&&Nw(this)};function Ow(a){a=a||{};var b=a.params||{};W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:!("TRANSPARENT"in b?b.TRANSPARENT:1),projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.u=void 0!==a.gutter?a.gutter:0;this.c=b;this.o=!0;this.C=a.serverType;this.W=void 0!==a.hidpi?a.hidpi:!0;this.P="";
Pw(this);this.Z=Bb();Qw(this);Vv(this,Rw(this))}v(Ow,W);k=Ow.prototype;
k.gn=function(a,b,c,d){c=qc(c);var e=this.tileGrid;e||(e=this.pb(c));b=e.Yd(a,b);if(!(e.b.length<=b[0])){var f=e.Ga(b[0]),g=e.Ia(b,this.Z),e=Wd(e.Va(b[0]),this.l),h=this.u;0!==h&&(e=Ud(e,h,this.l),g=Db(g,f*h,g));h={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.c.LAYERS};ua(h,this.c,d);d=Math.floor((g[3]-a[1])/f);h[this.o?"I":"X"]=Math.floor((a[0]-g[0])/f);h[this.o?"J":"Y"]=d;return Sw(this,b,e,g,1,c,h)}};k.ef=function(){return this.u};
k.Fb=function(a,b,c){return this.P+W.prototype.Fb.call(this,a,b,c)};k.hn=function(){return this.c};
function Sw(a,b,c,d,e,f,g){var h=a.urls;if(h){g.WIDTH=c[0];g.HEIGHT=c[1];g[a.o?"CRS":"SRS"]=f.eb;"STYLES"in a.c||(g.STYLES="");if(1!=e)switch(a.C){case "geoserver":c=90*e+.5|0;g.FORMAT_OPTIONS="FORMAT_OPTIONS"in g?g.FORMAT_OPTIONS+(";dpi:"+c):"dpi:"+c;break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e;break;default:ha(!1,52)}f=f.b;a.o&&"ne"==f.substr(0,2)&&(a=d[0],d[0]=d[1],d[1]=a,a=d[2],d[2]=d[3],d[3]=a);g.BBOX=d.join(",");return jw(1==h.length?h[0]:h[oa((b[1]<<
b[0])+b[2],h.length)],g)}}k.gb=function(a){return this.W&&void 0!==this.C?a:1};function Pw(a){var b=0,c=[];if(a.urls){var d,e;d=0;for(e=a.urls.length;d<e;++d)c[b++]=a.urls[d]}a.P=c.join("#")}function Rw(a){var b=0,c=[],d;for(d in a.c)c[b++]=d+"-"+a.c[d];return c.join("/")}
k.sc=function(a,b,c){var d=this.tileGrid;d||(d=this.pb(c));if(!(d.b.length<=a[0])){1==b||this.W&&void 0!==this.C||(b=1);var e=d.Ga(a[0]),f=d.Ia(a,this.Z),d=Wd(d.Va(a[0]),this.l),g=this.u;0!==g&&(d=Ud(d,g,this.l),f=Db(f,e*g,f));1!=b&&(d=Vd(d,b,this.l));e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};ua(e,this.c);return Sw(this,a,d,f,b,c,e)}};k.Ua=function(a){W.prototype.Ua.call(this,a);Pw(this)};k.jn=function(a){ua(this.c,a);Pw(this);Qw(this);Vv(this,Rw(this))};
    function Qw(a) {
        a.o = 0 <= qb(a.c.VERSION || "1.3.0")
    }
    function Tw(a, b, c, d, e) {
        gg.call(this, a, b);
        this.g = De();
        this.j = d;
        this.c = null;
        this.f = {jd: !1, Qf: null, Rh: -1, Rf: -1, Ad: null, li: []};
        this.T = e;
        this.o = c
    }
    v(Tw, gg);
    k = Tw.prototype;
    k.qb = function () {
        return -1 == this.f.Rf ? null : this.g.canvas
    };
    k.Il = function () {
        return this.j
    };
    k.Xa = function () {
        return this.o
    };
    k.load = function () {
        0 == this.state && (this.state = 1, hg(this), this.T(this, this.o), this.s(null, NaN, null))
    };
    k.Wh = function (a) {
        this.c = a;
        this.state = jg;
        hg(this)
    };
    k.uf = function (a) {
        this.l = a
    };
    k.bi = function (a) {
        this.s = a
    };
    function Uw(a) {
        Yv.call(this, {
            attributions: a.attributions,
            cacheSize: void 0 !== a.cacheSize ? a.cacheSize : 128,
            extent: a.extent,
            logo: a.logo,
            opaque: !1,
            projection: a.projection,
            state: a.state,
            tileGrid: a.tileGrid,
            tileLoadFunction: a.tileLoadFunction ? a.tileLoadFunction : Vw,
            tileUrlFunction: a.tileUrlFunction,
            tilePixelRatio: a.tilePixelRatio,
            url: a.url,
            urls: a.urls,
            wrapX: void 0 === a.wrapX ? !0 : a.wrapX
        });
        this.c = a.format ? a.format : null;
        this.i = void 0 == a.overlaps ? !0 : a.overlaps;
        this.tileClass = a.tileClass ? a.tileClass : Tw
    }
    v(Uw, Yv);
    Uw.prototype.vc=function(a,b,c,d,e){var f=this.Fb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];d=(b=Wv(this,a,e))?this.tileUrlFunction(b,d,e):void 0;d=new this.tileClass(a,void 0!==d?0:4,void 0!==d?d:"",this.c,this.tileLoadFunction);w(d,"change",this.rh,this);this.a.set(f,d);return d};Uw.prototype.gb=function(a){return void 0==a?Yv.prototype.gb.call(this,a):a};Uw.prototype.kf=function(a,b){var c=Wd(this.tileGrid.Va(a));return[Math.round(c[0]*b),Math.round(c[1]*b)]};
    function Vw(a, b) {
        a.bi(Om(b, a.j))
    }
    function Ww(a) {
        this.l = a.matrixIds;
        Zd.call(this, {
            extent: a.extent,
            origin: a.origin,
            origins: a.origins,
            resolutions: a.resolutions,
            tileSize: a.tileSize,
            tileSizes: a.tileSizes,
            sizes: a.sizes
        })
    }
    v(Ww, Zd);
    Ww.prototype.o = function () {
        return this.l
    };
    function Xw(a,b){var c=[],d=[],e=[],f=[],g=[],h;h=qc(a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var l=h.dc(),m="ne"==h.b.substr(0,2);a.TileMatrix.sort(function(a,b){return b.ScaleDenominator-a.ScaleDenominator});a.TileMatrix.forEach(function(a){d.push(a.Identifier);var b=2.8E-4*a.ScaleDenominator/l,h=a.TileWidth,t=a.TileHeight;m?e.push([a.TopLeftCorner[1],a.TopLeftCorner[0]]):e.push(a.TopLeftCorner);c.push(b);f.push(h==t?h:[h,t]);g.push([a.MatrixWidth,-a.MatrixHeight])});
    return new Ww({extent: b, origins: e, resolutions: c, matrixIds: d, tileSizes: f, sizes: g})
}
    function Y(a) {
        function b(a) {
            a = d == Yw ? jw(a, f) : a.replace(/\{(\w+?)\}/g, function (a, b) {
                return b.toLowerCase() in f ? f[b.toLowerCase()] : a
            });
            return function (b) {
                if (b) {
                    var c = {TileMatrix: e.l[b[0]], TileCol: b[1], TileRow: -b[2] - 1};
                    ua(c, g);
                    b = a;
                    return b = d == Yw ? jw(b, c) : b.replace(/\{(\w+?)\}/g, function (a, b) {
                        return c[b]
                    })
                }
            }
        }
        this.Z = void 0 !== a.version ? a.version : "1.0.0";
        this.u = void 0 !== a.format ? a.format : "image/jpeg";
        this.c = void 0 !== a.dimensions ? a.dimensions : {};
        this.C = a.layer;
        this.o = a.matrixSet;
        this.P = a.style;
        var c = a.urls;
        void 0===c&&void 0!==a.url&&(c=Rv(a.url));var d=this.W=void 0!==a.requestEncoding?a.requestEncoding:Yw,e=a.tileGrid,f={layer:this.C,style:this.P,tilematrixset:this.o};d==Yw&&ua(f,{Service:"WMTS",Request:"GetTile",Version:this.Z,Format:this.u});var g=this.c,h=c&&0<c.length?Pv(c.map(b)):Qv;W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:a.tileClass,tileGrid:e,
tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:h,urls:c,wrapX:void 0!==a.wrapX?a.wrapX:!1});Vv(this,Zw(this))}v(Y,W);k=Y.prototype;k.Jj=function(){return this.c};k.kn=function(){return this.u};k.ln=function(){return this.C};k.Wj=function(){return this.o};k.ik=function(){return this.W};k.mn=function(){return this.P};k.qk=function(){return this.Z};function Zw(a){var b=0,c=[],d;for(d in a.c)c[b++]=d+"-"+a.c[d];return c.join("/")}
k.hp=function(a){ua(this.c,a);Vv(this,Zw(this))};var Yw="KVP";function $w(a){a=a||{};var b=a.size,c=b[0],d=b[1],e=[],f=256;switch(void 0!==a.tierSizeCalculation?a.tierSizeCalculation:ax){case ax:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),f+=f;break;case bx:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),c>>=1,d>>=1;break;default:ha(!1,53)}e.push([1,1]);e.reverse();for(var f=[1],g=[0],d=1,c=e.length;d<c;d++)f.push(1<<d),g.push(e[d-1][0]*e[d-1][1]+g[d-1]);f.reverse();var b=[0,-b[1],b[0],0],b=new Zd({extent:b,origin:Wb(b),resolutions:f}),h=a.url;
W.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:cx,tileGrid:b,tileUrlFunction:function(a){if(a){var b=a[0],c=a[1];a=-a[2]-1;return h+"TileGroup"+((c+a*e[b][0]+g[b])/256|0)+"/"+b+"-"+c+"-"+a+".jpg"}}})}v($w,W);function cx(a,b,c,d,e){Rt.call(this,a,b,c,d,e);this.c=null}v(cx,Rt);
cx.prototype.qb=function(){if(this.c)return this.c;var a=Rt.prototype.qb.call(this);if(this.state==jg){if(256==a.width&&256==a.height)return this.c=a;var b=De(256,256);b.drawImage(a,0,0);return this.c=b.canvas}return a};var ax="default",bx="truncated";function dx(a,b){this.b=b;this.a=[{x:0,y:0,width:a,height:a}];this.f={};this.g=De(a,a);this.c=this.g.canvas}dx.prototype.get=function(a){return this.f[a]||null};
dx.prototype.add=function(a,b,c,d,e){var f,g,h;g=0;for(h=this.a.length;g<h;++g)if(f=this.a[g],f.width>=b+this.b&&f.height>=c+this.b)return h={offsetX:f.x+this.b,offsetY:f.y+this.b,image:this.c},this.f[a]=h,d.call(e,this.g,f.x+this.b,f.y+this.b),a=g,b+=this.b,d=c+this.b,f.width-b>f.height-d?(c={x:f.x+b,y:f.y,width:f.width-b,height:f.height},b={x:f.x,y:f.y+d,width:b,height:f.height-d},ex(this,a,c,b)):(c={x:f.x+b,y:f.y,width:f.width-b,height:d},b={x:f.x,y:f.y+d,width:f.width,height:f.height-d},ex(this,
    a, c, b)), h;
    return null
};
    function ex(a, b, c, d) {
        b = [b, 1];
        0 < c.width && 0 < c.height && b.push(c);
        0 < d.width && 0 < d.height && b.push(d);
        a.a.splice.apply(a.a, b)
    }
    function fx(a) {
        a = a || {};
        this.a = void 0 !== a.initialSize ? a.initialSize : 256;
        this.g = void 0 !== a.maxSize ? a.maxSize : void 0 !== ba ? ba : 2048;
        this.b = void 0 !== a.space ? a.space : 1;
        this.c = [new dx(this.a, this.b)];
        this.f = this.a;
        this.i = [new dx(this.f, this.b)]
    }
    fx.prototype.add = function (a, b, c, d, e, f) {
        if (b + this.b > this.g || c + this.b > this.g)return null;
        d = gx(this, !1, a, b, c, d, f);
        if (!d)return null;
        a = gx(this, !0, a, b, c, void 0 !== e ? e : da, f);
        return {offsetX: d.offsetX, offsetY: d.offsetY, image: d.image, de: a.image}
    };
    function gx(a, b, c, d, e, f, g) {
        var h = b ? a.i : a.c, l, m, n;
        m = 0;
        for (n = h.length; m < n; ++m) {
            l = h[m];
            if (l = l.add(c, d, e, f, g))return l;
            l || m !== n - 1 || (b ? (l = Math.min(2 * a.f, a.g), a.f = l) : (l = Math.min(2 * a.a, a.g), a.a = l), l = new dx(l, a.b), h.push(l), ++n)
        }
        return null
    }
    function hx(a) {
        this.B = this.C = this.i = null;
        this.j = void 0 !== a.fill ? a.fill : null;
        this.za = [0, 0];
        this.b = a.points;
        this.g = void 0 !== a.radius ? a.radius : a.radius1;
        this.f = void 0 !== a.radius2 ? a.radius2 : this.g;
        this.s = void 0 !== a.angle ? a.angle : 0;
        this.a = void 0 !== a.stroke ? a.stroke : null;
        this.na = this.P = this.G = null;
        var b = this.S = a.atlasManager, c = "", d = "", e = 0, f = null, g, h = 0;
        this.a && (g = Ce(this.a.a), h = this.a.f, void 0 === h && (h = 1), f = this.a.g, hf || (f = null), d = this.a.i, void 0 === d && (d = "round"), c = this.a.c, void 0 === c && (c = "round"), e = this.a.j,
        void 0===e&&(e=10));var l=2*(this.g+h)+1,c={strokeStyle:g,Dd:h,size:l,lineCap:c,lineDash:f,lineJoin:d,miterLimit:e};if(void 0===b){var m=De(l,l);this.C=m.canvas;b=l=this.C.width;this.yh(c,m,0,0);this.j?this.B=this.C:(m=De(c.size,c.size),this.B=m.canvas,this.xh(c,m,0,0))}else l=Math.round(l),(d=!this.j)&&(m=this.xh.bind(this,c)),e=this.a?ui(this.a):"-",f=this.j?vi(this.j):"-",this.i&&e==this.i[1]&&f==this.i[2]&&this.g==this.i[3]&&this.f==this.i[4]&&this.s==this.i[5]&&this.b==this.i[6]||(this.i=["r"+
e+f+(void 0!==this.g?this.g.toString():"-")+(void 0!==this.f?this.f.toString():"-")+(void 0!==this.s?this.s.toString():"-")+(void 0!==this.b?this.b.toString():"-"),e,f,this.g,this.f,this.s,this.b]),m=b.add(this.i[0],l,l,this.yh.bind(this,c),m),this.C=m.image,this.za=[m.offsetX,m.offsetY],b=m.image.width,this.B=d?m.de:this.C;this.G=[l/2,l/2];this.P=[l,l];this.na=[b,b];ri.call(this,{opacity:1,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:!1,rotation:void 0!==a.rotation?a.rotation:0,scale:1,
snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0})}v(hx,ri);k=hx.prototype;k.clone=function(){var a=new hx({fill:this.j?this.j.clone():void 0,points:this.f!==this.g?this.b/2:this.b,radius:this.g,radius2:this.f,angle:this.s,snapToPixel:this.u,stroke:this.a?this.a.clone():void 0,rotation:this.o,rotateWithView:this.T,atlasManager:this.S});a.Rc(this.l);a.Sc(this.c);return a};k.cc=function(){return this.G};k.tn=function(){return this.s};k.vn=function(){return this.j};k.pe=function(){return this.B};
k.Tb=function(){return this.C};k.md=function(){return this.na};k.vd=function(){return li};k.jc=function(){return this.za};k.wn=function(){return this.b};k.xn=function(){return this.g};k.hk=function(){return this.f};k.Gb=function(){return this.P};k.yn=function(){return this.a};k.pf=da;k.load=da;k.Uf=da;
k.yh=function(a,b,c,d){var e;b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();this.f!==this.g&&(this.b*=2);for(c=0;c<=this.b;c++)d=2*c*Math.PI/this.b-Math.PI/2+this.s,e=0===c%2?this.g:this.f,b.lineTo(a.size/2+e*Math.cos(d),a.size/2+e*Math.sin(d));this.j&&(b.fillStyle=Ce(this.j.b),b.fill());this.a&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.Dd,a.lineDash&&b.setLineDash(a.lineDash),b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.miterLimit=a.miterLimit,b.stroke());b.closePath()};
k.xh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();this.f!==this.g&&(this.b*=2);var e;for(c=0;c<=this.b;c++)e=2*c*Math.PI/this.b-Math.PI/2+this.s,d=0===c%2?this.g:this.f,b.lineTo(a.size/2+d*Math.cos(e),a.size/2+d*Math.sin(e));b.fillStyle=ni;b.fill();this.a&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.Dd,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};r("ol.animation.bounce",function(a){var b=a.resolution,c=a.start?a.start:Date.now(),d=void 0!==a.duration?a.duration:1E3,e=a.easing?a.easing:Md;return function(a,g){if(g.time<c)return g.animate=!0,g.viewHints[0]+=1,!0;if(g.time<c+d){var h=e((g.time-c)/d),l=b-g.viewState.resolution;g.animate=!0;g.viewState.resolution+=h*l;g.viewHints[0]+=1;return!0}return!1}});r("ol.animation.pan",Nd);r("ol.animation.rotate",Od);r("ol.animation.zoom",Pd);ga.prototype.code=ga.prototype.code;r("ol.Attribution",le);
le.prototype.getHTML=le.prototype.g;r("ol.Collection",me);me.prototype.clear=me.prototype.clear;me.prototype.extend=me.prototype.qf;me.prototype.forEach=me.prototype.forEach;me.prototype.getArray=me.prototype.sl;me.prototype.item=me.prototype.item;me.prototype.getLength=me.prototype.yc;me.prototype.insertAt=me.prototype.ee;me.prototype.pop=me.prototype.pop;me.prototype.push=me.prototype.push;me.prototype.remove=me.prototype.remove;me.prototype.removeAt=me.prototype.Nf;me.prototype.setAt=me.prototype.Oo;
re.prototype.element=re.prototype.element;r("ol.color.asArray",ye);r("ol.color.asString",Ae);r("ol.colorlike.asColorLike",Ce);r("ol.coordinate.add",rb);r("ol.coordinate.createStringXY",function(a){return function(b){return zb(b,a)}});r("ol.coordinate.format",ub);r("ol.coordinate.rotate",wb);r("ol.coordinate.toStringHDMS",function(a,b){return a?tb(a[1],"NS",b)+" "+tb(a[0],"EW",b):""});r("ol.coordinate.toStringXY",zb);r("ol.DeviceOrientation",om);om.prototype.getAlpha=om.prototype.Cj;
om.prototype.getBeta=om.prototype.Fj;om.prototype.getGamma=om.prototype.Mj;om.prototype.getHeading=om.prototype.tl;om.prototype.getTracking=om.prototype.Sg;om.prototype.setTracking=om.prototype.rf;r("ol.easing.easeIn",Id);r("ol.easing.easeOut",Jd);r("ol.easing.inAndOut",Kd);r("ol.easing.linear",Ld);r("ol.easing.upAndDown",Md);r("ol.extent.boundingExtent",Ab);r("ol.extent.buffer",Db);r("ol.extent.containsCoordinate",Gb);r("ol.extent.containsExtent",Ib);r("ol.extent.containsXY",Hb);
r("ol.extent.createEmpty",Bb);r("ol.extent.equals",Pb);r("ol.extent.extend",Qb);r("ol.extent.getBottomLeft",Sb);r("ol.extent.getBottomRight",Tb);r("ol.extent.getCenter",ac);r("ol.extent.getHeight",$b);r("ol.extent.getIntersection",cc);r("ol.extent.getSize",function(a){return[a[2]-a[0],a[3]-a[1]]});r("ol.extent.getTopLeft",Wb);r("ol.extent.getTopRight",Vb);r("ol.extent.getWidth",Zb);r("ol.extent.intersects",dc);r("ol.extent.isEmpty",Yb);r("ol.extent.applyTransform",fc);r("ol.Feature",I);
I.prototype.clone=I.prototype.clone;I.prototype.getGeometry=I.prototype.V;I.prototype.getId=I.prototype.vl;I.prototype.getGeometryName=I.prototype.Oj;I.prototype.getStyle=I.prototype.wl;I.prototype.getStyleFunction=I.prototype.zc;I.prototype.setGeometry=I.prototype.Oa;I.prototype.setStyle=I.prototype.sf;I.prototype.setId=I.prototype.Wb;I.prototype.setGeometryName=I.prototype.Dc;r("ol.featureloader.tile",Om);r("ol.featureloader.xhr",Pm);r("ol.Geolocation",wt);wt.prototype.getAccuracy=wt.prototype.Aj;
wt.prototype.getAccuracyGeometry=wt.prototype.Bj;wt.prototype.getAltitude=wt.prototype.Dj;wt.prototype.getAltitudeAccuracy=wt.prototype.Ej;wt.prototype.getHeading=wt.prototype.yl;wt.prototype.getPosition=wt.prototype.zl;wt.prototype.getProjection=wt.prototype.Tg;wt.prototype.getSpeed=wt.prototype.jk;wt.prototype.getTracking=wt.prototype.Ug;wt.prototype.getTrackingOptions=wt.prototype.Gg;wt.prototype.setProjection=wt.prototype.Vg;wt.prototype.setTracking=wt.prototype.ge;
wt.prototype.setTrackingOptions=wt.prototype.ji;r("ol.Graticule",Mt);Mt.prototype.getMap=Mt.prototype.Cl;Mt.prototype.getMeridians=Mt.prototype.Xj;Mt.prototype.getParallels=Mt.prototype.dk;Mt.prototype.setMap=Mt.prototype.setMap;r("ol.has.DEVICE_PIXEL_RATIO",gf);r("ol.has.CANVAS",jf);r("ol.has.DEVICE_ORIENTATION",kf);r("ol.has.GEOLOCATION",lf);r("ol.has.TOUCH",mf);r("ol.has.WEBGL",af);ii.prototype.getImage=ii.prototype.a;ii.prototype.load=ii.prototype.load;Rt.prototype.getImage=Rt.prototype.qb;
Rt.prototype.load=Rt.prototype.load;r("ol.inherits",v);r("ol.Kinetic",rg);r("ol.loadingstrategy.all",bu);r("ol.loadingstrategy.bbox",function(a){return[a]});r("ol.loadingstrategy.tile",function(a){return function(b,c){var d=a.wc(c),e=be(a,b,d),f=[],d=[d,0,0];for(d[1]=e.ba;d[1]<=e.da;++d[1])for(d[2]=e.ea;d[2]<=e.ha;++d[2])f.push(a.Ia(d));return f}});r("ol.Map",H);H.prototype.addControl=H.prototype.ij;H.prototype.addInteraction=H.prototype.jj;H.prototype.addLayer=H.prototype.gg;
H.prototype.addOverlay=H.prototype.hg;H.prototype.beforeRender=H.prototype.ab;H.prototype.forEachFeatureAtPixel=H.prototype.Sd;H.prototype.forEachLayerAtPixel=H.prototype.Gl;H.prototype.hasFeatureAtPixel=H.prototype.Xk;H.prototype.getEventCoordinate=H.prototype.Kj;H.prototype.getEventPixel=H.prototype.Ud;H.prototype.getTarget=H.prototype.jf;H.prototype.getTargetElement=H.prototype.uc;H.prototype.getCoordinateFromPixel=H.prototype.Ja;H.prototype.getControls=H.prototype.Ij;H.prototype.getOverlays=H.prototype.bk;
H.prototype.getOverlayById=H.prototype.ak;H.prototype.getInteractions=H.prototype.Pj;H.prototype.getLayerGroup=H.prototype.tc;H.prototype.getLayers=H.prototype.Wg;H.prototype.getPixelFromCoordinate=H.prototype.Ca;H.prototype.getSize=H.prototype.kb;H.prototype.getView=H.prototype.$;H.prototype.getViewport=H.prototype.rk;H.prototype.renderSync=H.prototype.Ko;H.prototype.render=H.prototype.render;H.prototype.removeControl=H.prototype.Do;H.prototype.removeInteraction=H.prototype.Eo;
H.prototype.removeLayer=H.prototype.Go;H.prototype.removeOverlay=H.prototype.Ho;H.prototype.setLayerGroup=H.prototype.ai;H.prototype.setSize=H.prototype.Tf;H.prototype.setTarget=H.prototype.Xg;H.prototype.setView=H.prototype.Wo;H.prototype.updateSize=H.prototype.Yc;Tf.prototype.originalEvent=Tf.prototype.originalEvent;Tf.prototype.pixel=Tf.prototype.pixel;Tf.prototype.coordinate=Tf.prototype.coordinate;Tf.prototype.dragging=Tf.prototype.dragging;Ge.prototype.map=Ge.prototype.map;
Ge.prototype.frameState=Ge.prototype.frameState;Ta.prototype.key=Ta.prototype.key;Ta.prototype.oldValue=Ta.prototype.oldValue;r("ol.Object",Ua);Ua.prototype.get=Ua.prototype.get;Ua.prototype.getKeys=Ua.prototype.O;Ua.prototype.getProperties=Ua.prototype.N;Ua.prototype.set=Ua.prototype.set;Ua.prototype.setProperties=Ua.prototype.H;Ua.prototype.unset=Ua.prototype.R;r("ol.Observable",Pa);r("ol.Observable.unByKey",Qa);Pa.prototype.changed=Pa.prototype.v;Pa.prototype.dispatchEvent=Pa.prototype.b;
Pa.prototype.getRevision=Pa.prototype.K;Pa.prototype.on=Pa.prototype.I;Pa.prototype.once=Pa.prototype.L;Pa.prototype.un=Pa.prototype.J;Pa.prototype.unByKey=Pa.prototype.M;r("ol.Overlay",Cl);Cl.prototype.getElement=Cl.prototype.Td;Cl.prototype.getId=Cl.prototype.Hl;Cl.prototype.getMap=Cl.prototype.he;Cl.prototype.getOffset=Cl.prototype.Eg;Cl.prototype.getPosition=Cl.prototype.Yg;Cl.prototype.getPositioning=Cl.prototype.Fg;Cl.prototype.setElement=Cl.prototype.Vh;Cl.prototype.setMap=Cl.prototype.setMap;
Cl.prototype.setOffset=Cl.prototype.ci;Cl.prototype.setPosition=Cl.prototype.tf;Cl.prototype.setPositioning=Cl.prototype.fi;r("ol.render.toContext",function(a,b){var c=a.canvas,d=b?b:{},e=d.pixelRatio||gf;if(d=d.size)c.width=d[0]*e,c.height=d[1]*e,c.style.width=d[0]+"px",c.style.height=d[1]+"px";c=[0,0,c.width,c.height];d=Vh(Oh(),e,e);return new Ki(a,e,c,d,0)});r("ol.size.toSize",Wd);gg.prototype.getTileCoord=gg.prototype.i;gg.prototype.load=gg.prototype.load;Tw.prototype.getFormat=Tw.prototype.Il;
Tw.prototype.setFeatures=Tw.prototype.Wh;Tw.prototype.setProjection=Tw.prototype.uf;Tw.prototype.setLoader=Tw.prototype.bi;r("ol.View",yd);yd.prototype.constrainCenter=yd.prototype.Qd;yd.prototype.constrainResolution=yd.prototype.constrainResolution;yd.prototype.constrainRotation=yd.prototype.constrainRotation;yd.prototype.getCenter=yd.prototype.bb;yd.prototype.calculateExtent=yd.prototype.Jc;yd.prototype.getMaxResolution=yd.prototype.Jl;yd.prototype.getMinResolution=yd.prototype.Kl;
yd.prototype.getProjection=yd.prototype.Ll;yd.prototype.getResolution=yd.prototype.Ma;yd.prototype.getResolutions=yd.prototype.Ml;yd.prototype.getRotation=yd.prototype.Pa;yd.prototype.getZoom=yd.prototype.tk;yd.prototype.fit=yd.prototype.$e;yd.prototype.centerOn=yd.prototype.sj;yd.prototype.rotate=yd.prototype.rotate;yd.prototype.setCenter=yd.prototype.rb;yd.prototype.setResolution=yd.prototype.Yb;yd.prototype.setRotation=yd.prototype.ie;yd.prototype.setZoom=yd.prototype.Zo;
r("ol.xml.getAllTextContent",xm);r("ol.xml.parse",Bm);Ck.prototype.getGL=Ck.prototype.Pn;Ck.prototype.useProgram=Ck.prototype.ve;r("ol.tilegrid.createXYZ",ke);r("ol.tilegrid.TileGrid",Zd);Zd.prototype.forEachTileCoord=Zd.prototype.sg;Zd.prototype.getMaxZoom=Zd.prototype.Cg;Zd.prototype.getMinZoom=Zd.prototype.Dg;Zd.prototype.getOrigin=Zd.prototype.Tc;Zd.prototype.getResolution=Zd.prototype.Ga;Zd.prototype.getResolutions=Zd.prototype.Bh;Zd.prototype.getTileCoordExtent=Zd.prototype.Ia;
Zd.prototype.getTileCoordForCoordAndResolution=Zd.prototype.Yd;Zd.prototype.getTileCoordForCoordAndZ=Zd.prototype.Zd;Zd.prototype.getTileSize=Zd.prototype.Va;Zd.prototype.getZForResolution=Zd.prototype.wc;r("ol.tilegrid.WMTS",Ww);Ww.prototype.getMatrixIds=Ww.prototype.o;r("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",Xw);r("ol.style.AtlasManager",fx);r("ol.style.Circle",si);si.prototype.clone=si.prototype.clone;si.prototype.getFill=si.prototype.nn;si.prototype.getImage=si.prototype.Tb;
si.prototype.getRadius=si.prototype.pn;si.prototype.getStroke=si.prototype.qn;si.prototype.setRadius=si.prototype.rn;r("ol.style.Fill",wi);wi.prototype.clone=wi.prototype.clone;wi.prototype.getColor=wi.prototype.g;wi.prototype.setColor=wi.prototype.f;r("ol.style.Icon",jp);jp.prototype.clone=jp.prototype.clone;jp.prototype.getAnchor=jp.prototype.cc;jp.prototype.getImage=jp.prototype.Tb;jp.prototype.getOrigin=jp.prototype.jc;jp.prototype.getSrc=jp.prototype.sn;jp.prototype.getSize=jp.prototype.Gb;
jp.prototype.load=jp.prototype.load;r("ol.style.Image",ri);ri.prototype.getOpacity=ri.prototype.qe;ri.prototype.getRotateWithView=ri.prototype.re;ri.prototype.getRotation=ri.prototype.se;ri.prototype.getScale=ri.prototype.te;ri.prototype.getSnapToPixel=ri.prototype.Xd;ri.prototype.setOpacity=ri.prototype.Rc;ri.prototype.setRotation=ri.prototype.ue;ri.prototype.setScale=ri.prototype.Sc;r("ol.style.RegularShape",hx);hx.prototype.clone=hx.prototype.clone;hx.prototype.getAnchor=hx.prototype.cc;
hx.prototype.getAngle=hx.prototype.tn;hx.prototype.getFill=hx.prototype.vn;hx.prototype.getImage=hx.prototype.Tb;hx.prototype.getOrigin=hx.prototype.jc;hx.prototype.getPoints=hx.prototype.wn;hx.prototype.getRadius=hx.prototype.xn;hx.prototype.getRadius2=hx.prototype.hk;hx.prototype.getSize=hx.prototype.Gb;hx.prototype.getStroke=hx.prototype.yn;r("ol.style.Stroke",xi);xi.prototype.clone=xi.prototype.clone;xi.prototype.getColor=xi.prototype.zn;xi.prototype.getLineCap=xi.prototype.Sj;
xi.prototype.getLineDash=xi.prototype.An;xi.prototype.getLineJoin=xi.prototype.Tj;xi.prototype.getMiterLimit=xi.prototype.Yj;xi.prototype.getWidth=xi.prototype.Bn;xi.prototype.setColor=xi.prototype.Cn;xi.prototype.setLineCap=xi.prototype.So;xi.prototype.setLineDash=xi.prototype.setLineDash;xi.prototype.setLineJoin=xi.prototype.To;xi.prototype.setMiterLimit=xi.prototype.Uo;xi.prototype.setWidth=xi.prototype.Xo;r("ol.style.Style",yi);yi.prototype.clone=yi.prototype.clone;yi.prototype.getGeometry=yi.prototype.V;
yi.prototype.getGeometryFunction=yi.prototype.Nj;yi.prototype.getFill=yi.prototype.Dn;yi.prototype.getImage=yi.prototype.En;yi.prototype.getStroke=yi.prototype.Fn;yi.prototype.getText=yi.prototype.Fa;yi.prototype.getZIndex=yi.prototype.Gn;yi.prototype.setGeometry=yi.prototype.zh;yi.prototype.setZIndex=yi.prototype.Hn;r("ol.style.Text",pp);pp.prototype.clone=pp.prototype.clone;pp.prototype.getFont=pp.prototype.Lj;pp.prototype.getOffsetX=pp.prototype.Zj;pp.prototype.getOffsetY=pp.prototype.$j;
pp.prototype.getFill=pp.prototype.In;pp.prototype.getRotateWithView=pp.prototype.Jn;pp.prototype.getRotation=pp.prototype.Kn;pp.prototype.getScale=pp.prototype.Ln;pp.prototype.getStroke=pp.prototype.Mn;pp.prototype.getText=pp.prototype.Fa;pp.prototype.getTextAlign=pp.prototype.lk;pp.prototype.getTextBaseline=pp.prototype.mk;pp.prototype.setFont=pp.prototype.Yh;pp.prototype.setOffsetX=pp.prototype.di;pp.prototype.setOffsetY=pp.prototype.ei;pp.prototype.setFill=pp.prototype.Xh;
pp.prototype.setRotation=pp.prototype.Nn;pp.prototype.setScale=pp.prototype.Ah;pp.prototype.setStroke=pp.prototype.gi;pp.prototype.setText=pp.prototype.hi;pp.prototype.setTextAlign=pp.prototype.ii;pp.prototype.setTextBaseline=pp.prototype.Vo;r("ol.Sphere",ic);ic.prototype.geodesicArea=ic.prototype.a;ic.prototype.haversineDistance=ic.prototype.b;r("ol.source.BingMaps",bw);r("ol.source.BingMaps.TOS_ATTRIBUTION",cw);bw.prototype.getApiKey=bw.prototype.P;bw.prototype.getImagerySet=bw.prototype.W;
r("ol.source.CartoDB",ew);ew.prototype.getConfig=ew.prototype.Hj;ew.prototype.updateConfig=ew.prototype.gp;ew.prototype.setConfig=ew.prototype.Po;r("ol.source.Cluster",X);X.prototype.getSource=X.prototype.ub;X.prototype.setDistance=X.prototype.Jb;r("ol.source.Image",Wj);Yj.prototype.image=Yj.prototype.image;r("ol.source.ImageArcGISRest",kw);kw.prototype.getParams=kw.prototype.Gm;kw.prototype.getImageLoadFunction=kw.prototype.Fm;kw.prototype.getUrl=kw.prototype.Hm;
kw.prototype.setImageLoadFunction=kw.prototype.Im;kw.prototype.setUrl=kw.prototype.Jm;kw.prototype.updateParams=kw.prototype.Km;r("ol.source.ImageCanvas",dk);r("ol.source.ImageMapGuide",lw);lw.prototype.getParams=lw.prototype.Mm;lw.prototype.getImageLoadFunction=lw.prototype.Lm;lw.prototype.updateParams=lw.prototype.Om;lw.prototype.setImageLoadFunction=lw.prototype.Nm;r("ol.source.ImageStatic",mw);r("ol.source.ImageVector",ek);ek.prototype.getSource=ek.prototype.Pm;ek.prototype.getStyle=ek.prototype.Qm;
ek.prototype.getStyleFunction=ek.prototype.Rm;ek.prototype.setStyle=ek.prototype.nh;r("ol.source.ImageWMS",nw);nw.prototype.getGetFeatureInfoUrl=nw.prototype.Um;nw.prototype.getParams=nw.prototype.Wm;nw.prototype.getImageLoadFunction=nw.prototype.Vm;nw.prototype.getUrl=nw.prototype.Xm;nw.prototype.setImageLoadFunction=nw.prototype.Ym;nw.prototype.setUrl=nw.prototype.Zm;nw.prototype.updateParams=nw.prototype.$m;r("ol.source.OSM",rw);r("ol.source.OSM.ATTRIBUTION",sw);r("ol.source.Raster",tw);
tw.prototype.setOperation=tw.prototype.u;yw.prototype.extent=yw.prototype.extent;yw.prototype.resolution=yw.prototype.resolution;yw.prototype.data=yw.prototype.data;r("ol.source.Source",Tj);Tj.prototype.getAttributions=Tj.prototype.va;Tj.prototype.getLogo=Tj.prototype.ua;Tj.prototype.getProjection=Tj.prototype.wa;Tj.prototype.getState=Tj.prototype.U;Tj.prototype.refresh=Tj.prototype.ta;Tj.prototype.setAttributions=Tj.prototype.qa;r("ol.source.Stamen",Bw);r("ol.source.Tile",Uv);
Uv.prototype.getTileGrid=Uv.prototype.Ra;Xv.prototype.tile=Xv.prototype.tile;r("ol.source.TileArcGISRest",Fw);Fw.prototype.getParams=Fw.prototype.u;Fw.prototype.updateParams=Fw.prototype.C;r("ol.source.TileDebug",Hw);r("ol.source.TileImage",W);W.prototype.setRenderReprojectionEdges=W.prototype.Bb;W.prototype.setTileGridForProjection=W.prototype.Cb;r("ol.source.TileJSON",Jw);Jw.prototype.getTileJSON=Jw.prototype.nk;r("ol.source.TileUTFGrid",Kw);Kw.prototype.getTemplate=Kw.prototype.kk;
Kw.prototype.forDataAtCoordinateAndResolution=Kw.prototype.wj;r("ol.source.TileWMS",Ow);Ow.prototype.getGetFeatureInfoUrl=Ow.prototype.gn;Ow.prototype.getParams=Ow.prototype.hn;Ow.prototype.updateParams=Ow.prototype.jn;Yv.prototype.getTileLoadFunction=Yv.prototype.fb;Yv.prototype.getTileUrlFunction=Yv.prototype.hb;Yv.prototype.getUrls=Yv.prototype.ib;Yv.prototype.setTileLoadFunction=Yv.prototype.nb;Yv.prototype.setTileUrlFunction=Yv.prototype.Ta;Yv.prototype.setUrl=Yv.prototype.Ya;
Yv.prototype.setUrls=Yv.prototype.Ua;r("ol.source.Vector",T);T.prototype.addFeature=T.prototype.cb;T.prototype.addFeatures=T.prototype.Ic;T.prototype.clear=T.prototype.clear;T.prototype.forEachFeature=T.prototype.qg;T.prototype.forEachFeatureInExtent=T.prototype.Kb;T.prototype.forEachFeatureIntersectingExtent=T.prototype.rg;T.prototype.getFeaturesCollection=T.prototype.zg;T.prototype.getFeatures=T.prototype.oe;T.prototype.getFeaturesAtCoordinate=T.prototype.yg;T.prototype.getFeaturesInExtent=T.prototype.bf;
T.prototype.getClosestFeatureToCoordinate=T.prototype.ug;T.prototype.getExtent=T.prototype.D;T.prototype.getFeatureById=T.prototype.xg;T.prototype.getFormat=T.prototype.sh;T.prototype.getUrl=T.prototype.th;T.prototype.removeFeature=T.prototype.mb;mu.prototype.feature=mu.prototype.feature;r("ol.source.VectorTile",Uw);r("ol.source.WMTS",Y);Y.prototype.getDimensions=Y.prototype.Jj;Y.prototype.getFormat=Y.prototype.kn;Y.prototype.getLayer=Y.prototype.ln;Y.prototype.getMatrixSet=Y.prototype.Wj;
Y.prototype.getRequestEncoding=Y.prototype.ik;Y.prototype.getStyle=Y.prototype.mn;Y.prototype.getVersion=Y.prototype.qk;Y.prototype.updateDimensions=Y.prototype.hp;
r("ol.source.WMTS.optionsFromCapabilities",function(a,b){var c=db(a.Contents.Layer,function(a){return a.Identifier==b.layer}),d=a.Contents.TileMatrixSet,e,f;e=1<c.TileMatrixSetLink.length?"projection"in b?hb(c.TileMatrixSetLink,function(a){return db(d,function(b){return b.Identifier==a.TileMatrixSet}).SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3")==b.projection}):hb(c.TileMatrixSetLink,function(a){return a.TileMatrixSet==b.matrixSet}):0;0>e&&(e=0);f=c.TileMatrixSetLink[e].TileMatrixSet;
var g=c.Format[0];"format"in b&&(g=b.format);e=hb(c.Style,function(a){return"style"in b?a.Title==b.style:a.isDefault});0>e&&(e=0);e=c.Style[e].Identifier;var h={};"Dimension"in c&&c.Dimension.forEach(function(a){var b=a.Identifier,c=a.Default;void 0===c&&(c=a.Value[0]);h[b]=c});var l=db(a.Contents.TileMatrixSet,function(a){return a.Identifier==f}),m;m="projection"in b?qc(b.projection):qc(l.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var n=c.WGS84BoundingBox,p,q;void 0!==n&&
(q=qc("EPSG:4326").D(),q=n[0]==q[0]&&n[2]==q[2],p=Lc(n,"EPSG:4326",m),(n=m.D())&&(Ib(n,p)||(p=void 0)));var l=Xw(l,p),t=[];p=b.requestEncoding;p=void 0!==p?p:"";if("OperationsMetadata"in a&&"GetTile"in a.OperationsMetadata)for(var n=a.OperationsMetadata.GetTile.DCP.HTTP.Get,u=0,y=n.length;u<y;++u){var x=db(n[u].Constraint,function(a){return"GetEncoding"==a.name}).AllowedValues.Value;""===p&&(p=x[0]);if(p===Yw)Za(x,Yw)&&t.push(n[u].href);else break}0===t.length&&(p="REST",c.ResourceURL.forEach(function(a){"tile"===
a.resourceType&&(g=a.format,t.push(a.template))}));return{urls:t,layer:b.layer,matrixSet:f,format:g,projection:m,requestEncoding:p,tileGrid:l,style:e,dimensions:h,wrapX:q}});r("ol.source.XYZ",dw);r("ol.source.Zoomify",$w);Ih.prototype.vectorContext=Ih.prototype.vectorContext;Ih.prototype.frameState=Ih.prototype.frameState;Ih.prototype.context=Ih.prototype.context;Ih.prototype.glContext=Ih.prototype.glContext;qr.prototype.get=qr.prototype.get;qr.prototype.getExtent=qr.prototype.D;
qr.prototype.getGeometry=qr.prototype.V;qr.prototype.getProperties=qr.prototype.Bm;qr.prototype.getType=qr.prototype.X;r("ol.render.VectorContext",Ji);Yk.prototype.setStyle=Yk.prototype.ud;Yk.prototype.drawGeometry=Yk.prototype.pc;Yk.prototype.drawFeature=Yk.prototype.Ve;Ki.prototype.drawCircle=Ki.prototype.Rd;Ki.prototype.setStyle=Ki.prototype.ud;Ki.prototype.drawGeometry=Ki.prototype.pc;Ki.prototype.drawFeature=Ki.prototype.Ve;r("ol.proj.common.add",Hh);r("ol.proj.METERS_PER_UNIT",kc);
r("ol.proj.Projection",lc);lc.prototype.getCode=lc.prototype.Gj;lc.prototype.getExtent=lc.prototype.D;lc.prototype.getUnits=lc.prototype.yb;lc.prototype.getMetersPerUnit=lc.prototype.dc;lc.prototype.getWorldExtent=lc.prototype.sk;lc.prototype.isGlobal=lc.prototype.bl;lc.prototype.setGlobal=lc.prototype.Ro;lc.prototype.setExtent=lc.prototype.Am;lc.prototype.setWorldExtent=lc.prototype.Yo;lc.prototype.setGetPointResolution=lc.prototype.Qo;lc.prototype.getPointResolution=lc.prototype.getPointResolution;
r("ol.proj.setProj4",function(a){nc=a});r("ol.proj.addEquivalentProjections",rc);r("ol.proj.addProjection",Dc);r("ol.proj.addCoordinateTransforms",sc);r("ol.proj.fromLonLat",function(a,b){return Kc(a,"EPSG:4326",void 0!==b?b:"EPSG:3857")});r("ol.proj.toLonLat",function(a,b){return Kc(a,void 0!==b?b:"EPSG:3857","EPSG:4326")});r("ol.proj.get",qc);r("ol.proj.equivalent",Hc);r("ol.proj.getTransform",Ic);r("ol.proj.transform",Kc);r("ol.proj.transformExtent",Lc);r("ol.layer.Base",vh);
vh.prototype.getExtent=vh.prototype.D;vh.prototype.getMaxResolution=vh.prototype.Pb;vh.prototype.getMinResolution=vh.prototype.Qb;vh.prototype.getOpacity=vh.prototype.Rb;vh.prototype.getVisible=vh.prototype.zb;vh.prototype.getZIndex=vh.prototype.Sb;vh.prototype.setExtent=vh.prototype.fc;vh.prototype.setMaxResolution=vh.prototype.lc;vh.prototype.setMinResolution=vh.prototype.mc;vh.prototype.setOpacity=vh.prototype.gc;vh.prototype.setVisible=vh.prototype.hc;vh.prototype.setZIndex=vh.prototype.ic;
r("ol.layer.Group",xh);xh.prototype.getLayers=xh.prototype.Qc;xh.prototype.setLayers=xh.prototype.gh;r("ol.layer.Heatmap",U);U.prototype.getBlur=U.prototype.tg;U.prototype.getGradient=U.prototype.Ag;U.prototype.getRadius=U.prototype.hh;U.prototype.setBlur=U.prototype.Th;U.prototype.setGradient=U.prototype.$h;U.prototype.setRadius=U.prototype.ih;r("ol.layer.Image",di);di.prototype.getSource=di.prototype.ga;r("ol.layer.Layer",Jh);Jh.prototype.getSource=Jh.prototype.ga;Jh.prototype.setMap=Jh.prototype.setMap;
Jh.prototype.setSource=Jh.prototype.Ec;r("ol.layer.Tile",D);D.prototype.getPreload=D.prototype.f;D.prototype.getSource=D.prototype.ga;D.prototype.setPreload=D.prototype.l;D.prototype.getUseInterimTilesOnError=D.prototype.c;D.prototype.setUseInterimTilesOnError=D.prototype.B;r("ol.layer.Vector",E);E.prototype.getSource=E.prototype.ga;E.prototype.getStyle=E.prototype.G;E.prototype.getStyleFunction=E.prototype.S;E.prototype.setStyle=E.prototype.l;r("ol.layer.VectorTile",G);G.prototype.getPreload=G.prototype.f;
G.prototype.getUseInterimTilesOnError=G.prototype.c;G.prototype.setPreload=G.prototype.P;G.prototype.setUseInterimTilesOnError=G.prototype.W;r("ol.interaction.DoubleClickZoom",yg);r("ol.interaction.DoubleClickZoom.handleEvent",zg);r("ol.interaction.DragAndDrop",Tt);r("ol.interaction.DragAndDrop.handleEvent",gc);Wt.prototype.features=Wt.prototype.features;Wt.prototype.file=Wt.prototype.file;Wt.prototype.projection=Wt.prototype.projection;r("ol.interaction.DragBox",Xg);Xg.prototype.getGeometry=Xg.prototype.V;
bh.prototype.coordinate=bh.prototype.coordinate;bh.prototype.mapBrowserEvent=bh.prototype.mapBrowserEvent;r("ol.interaction.DragPan",Mg);r("ol.interaction.DragRotate",Qg);r("ol.interaction.DragRotateAndZoom",Yt);r("ol.interaction.DragZoom",fh);r("ol.interaction.Draw",tu);r("ol.interaction.Draw.handleEvent",vu);tu.prototype.removeLastPoint=tu.prototype.Fo;tu.prototype.finishDrawing=tu.prototype.ld;tu.prototype.extend=tu.prototype.fm;
r("ol.interaction.Draw.createRegularPolygon",function(a,b){return function(c,d){var e=c[0],f=c[1],g=Math.sqrt(xb(e,f)),h=d?d:wd(new Ht(e),a);xd(h,e,g,b?b:Math.atan((f[1]-e[1])/(f[0]-e[0])));return h}});r("ol.interaction.Draw.createBox",function(){return function(a,b){var c=Ab(a),d=b||new B(null);d.ma([[Sb(c),Tb(c),Vb(c),Wb(c),Sb(c)]]);return d}});Iu.prototype.feature=Iu.prototype.feature;r("ol.interaction.Extent",Mu);Mu.prototype.getExtent=Mu.prototype.D;Mu.prototype.setExtent=Mu.prototype.i;
Xu.prototype.extent_=Xu.prototype.b;r("ol.interaction.defaults",uh);r("ol.interaction.Interaction",tg);tg.prototype.getActive=tg.prototype.f;tg.prototype.getMap=tg.prototype.c;tg.prototype.setActive=tg.prototype.Ba;r("ol.interaction.KeyboardPan",gh);r("ol.interaction.KeyboardPan.handleEvent",hh);r("ol.interaction.KeyboardZoom",ih);r("ol.interaction.KeyboardZoom.handleEvent",jh);r("ol.interaction.Modify",Zu);r("ol.interaction.Modify.handleEvent",bv);Zu.prototype.removePoint=Zu.prototype.Qh;
gv.prototype.features=gv.prototype.features;gv.prototype.mapBrowserEvent=gv.prototype.mapBrowserEvent;r("ol.interaction.MouseWheelZoom",kh);r("ol.interaction.MouseWheelZoom.handleEvent",lh);kh.prototype.setMouseAnchor=kh.prototype.B;r("ol.interaction.PinchRotate",mh);r("ol.interaction.PinchZoom",qh);r("ol.interaction.Pointer",Jg);r("ol.interaction.Pointer.handleEvent",Kg);r("ol.interaction.Select",ov);ov.prototype.getFeatures=ov.prototype.pm;ov.prototype.getLayer=ov.prototype.qm;
r("ol.interaction.Select.handleEvent",pv);ov.prototype.setMap=ov.prototype.setMap;rv.prototype.selected=rv.prototype.selected;rv.prototype.deselected=rv.prototype.deselected;rv.prototype.mapBrowserEvent=rv.prototype.mapBrowserEvent;r("ol.interaction.Snap",tv);tv.prototype.addFeature=tv.prototype.cb;tv.prototype.removeFeature=tv.prototype.mb;r("ol.interaction.Translate",xv);Dv.prototype.features=Dv.prototype.features;Dv.prototype.coordinate=Dv.prototype.coordinate;r("ol.geom.Circle",Ht);
Ht.prototype.clone=Ht.prototype.clone;Ht.prototype.getCenter=Ht.prototype.td;Ht.prototype.getRadius=Ht.prototype.vf;Ht.prototype.getType=Ht.prototype.X;Ht.prototype.intersectsExtent=Ht.prototype.Na;Ht.prototype.setCenter=Ht.prototype.Yl;Ht.prototype.setCenterAndRadius=Ht.prototype.Sf;Ht.prototype.setRadius=Ht.prototype.Zl;Ht.prototype.transform=Ht.prototype.lb;r("ol.geom.Geometry",Mc);Mc.prototype.getClosestPoint=Mc.prototype.xb;Mc.prototype.intersectsCoordinate=Mc.prototype.jb;
Mc.prototype.getExtent=Mc.prototype.D;Mc.prototype.rotate=Mc.prototype.rotate;Mc.prototype.scale=Mc.prototype.scale;Mc.prototype.simplify=Mc.prototype.Db;Mc.prototype.transform=Mc.prototype.lb;r("ol.geom.GeometryCollection",Gn);Gn.prototype.clone=Gn.prototype.clone;Gn.prototype.getGeometries=Gn.prototype.cf;Gn.prototype.getType=Gn.prototype.X;Gn.prototype.intersectsExtent=Gn.prototype.Na;Gn.prototype.setGeometries=Gn.prototype.Zh;Gn.prototype.applyTransform=Gn.prototype.oc;
Gn.prototype.translate=Gn.prototype.Pc;r("ol.geom.LinearRing",gd);gd.prototype.clone=gd.prototype.clone;gd.prototype.getArea=gd.prototype.bm;gd.prototype.getCoordinates=gd.prototype.Y;gd.prototype.getType=gd.prototype.X;gd.prototype.setCoordinates=gd.prototype.ma;r("ol.geom.LineString",O);O.prototype.appendCoordinate=O.prototype.kj;O.prototype.clone=O.prototype.clone;O.prototype.forEachSegment=O.prototype.zj;O.prototype.getCoordinateAtM=O.prototype.$l;O.prototype.getCoordinates=O.prototype.Y;
O.prototype.getCoordinateAt=O.prototype.vg;O.prototype.getLength=O.prototype.am;O.prototype.getType=O.prototype.X;O.prototype.intersectsExtent=O.prototype.Na;O.prototype.setCoordinates=O.prototype.ma;r("ol.geom.MultiLineString",P);P.prototype.appendLineString=P.prototype.lj;P.prototype.clone=P.prototype.clone;P.prototype.getCoordinateAtM=P.prototype.cm;P.prototype.getCoordinates=P.prototype.Y;P.prototype.getLineString=P.prototype.Uj;P.prototype.getLineStrings=P.prototype.od;P.prototype.getType=P.prototype.X;
P.prototype.intersectsExtent=P.prototype.Na;P.prototype.setCoordinates=P.prototype.ma;r("ol.geom.MultiPoint",Q);Q.prototype.appendPoint=Q.prototype.nj;Q.prototype.clone=Q.prototype.clone;Q.prototype.getCoordinates=Q.prototype.Y;Q.prototype.getPoint=Q.prototype.ek;Q.prototype.getPoints=Q.prototype.je;Q.prototype.getType=Q.prototype.X;Q.prototype.intersectsExtent=Q.prototype.Na;Q.prototype.setCoordinates=Q.prototype.ma;r("ol.geom.MultiPolygon",R);R.prototype.appendPolygon=R.prototype.oj;
R.prototype.clone=R.prototype.clone;R.prototype.getArea=R.prototype.dm;R.prototype.getCoordinates=R.prototype.Y;R.prototype.getInteriorPoints=R.prototype.Rj;R.prototype.getPolygon=R.prototype.gk;R.prototype.getPolygons=R.prototype.Wd;R.prototype.getType=R.prototype.X;R.prototype.intersectsExtent=R.prototype.Na;R.prototype.setCoordinates=R.prototype.ma;r("ol.geom.Point",A);A.prototype.clone=A.prototype.clone;A.prototype.getCoordinates=A.prototype.Y;A.prototype.getType=A.prototype.X;
A.prototype.intersectsExtent=A.prototype.Na;A.prototype.setCoordinates=A.prototype.ma;r("ol.geom.Polygon",B);B.prototype.appendLinearRing=B.prototype.mj;B.prototype.clone=B.prototype.clone;B.prototype.getArea=B.prototype.em;B.prototype.getCoordinates=B.prototype.Y;B.prototype.getInteriorPoint=B.prototype.Qj;B.prototype.getLinearRingCount=B.prototype.Vj;B.prototype.getLinearRing=B.prototype.Bg;B.prototype.getLinearRings=B.prototype.Vd;B.prototype.getType=B.prototype.X;
B.prototype.intersectsExtent=B.prototype.Na;B.prototype.setCoordinates=B.prototype.ma;r("ol.geom.Polygon.circular",ud);r("ol.geom.Polygon.fromExtent",vd);r("ol.geom.Polygon.fromCircle",wd);r("ol.geom.SimpleGeometry",Oc);Oc.prototype.getFirstCoordinate=Oc.prototype.Lb;Oc.prototype.getLastCoordinate=Oc.prototype.Mb;Oc.prototype.getLayout=Oc.prototype.Nb;Oc.prototype.applyTransform=Oc.prototype.oc;Oc.prototype.translate=Oc.prototype.Pc;r("ol.format.EsriJSON",bn);bn.prototype.readFeature=bn.prototype.Ub;
bn.prototype.readFeatures=bn.prototype.Ha;bn.prototype.readGeometry=bn.prototype.Wc;bn.prototype.readProjection=bn.prototype.Sa;bn.prototype.writeGeometry=bn.prototype.$c;bn.prototype.writeGeometryObject=bn.prototype.He;bn.prototype.writeFeature=bn.prototype.Fd;bn.prototype.writeFeatureObject=bn.prototype.Zc;bn.prototype.writeFeatures=bn.prototype.$b;bn.prototype.writeFeaturesObject=bn.prototype.Ge;r("ol.format.Feature",Qm);r("ol.format.GeoJSON",Kn);Kn.prototype.readFeature=Kn.prototype.Ub;
Kn.prototype.readFeatures=Kn.prototype.Ha;Kn.prototype.readGeometry=Kn.prototype.Wc;Kn.prototype.readProjection=Kn.prototype.Sa;Kn.prototype.writeFeature=Kn.prototype.Fd;Kn.prototype.writeFeatureObject=Kn.prototype.Zc;Kn.prototype.writeFeatures=Kn.prototype.$b;Kn.prototype.writeFeaturesObject=Kn.prototype.Ge;Kn.prototype.writeGeometry=Kn.prototype.$c;Kn.prototype.writeGeometryObject=Kn.prototype.He;r("ol.format.GML",go);go.prototype.writeFeatures=go.prototype.$b;go.prototype.writeFeaturesNode=go.prototype.a;
r("ol.format.GML2",po);r("ol.format.GML3",go);go.prototype.writeGeometryNode=go.prototype.T;go.prototype.writeFeatures=go.prototype.$b;go.prototype.writeFeaturesNode=go.prototype.a;Tn.prototype.readFeatures=Tn.prototype.Ha;r("ol.format.GPX",qo);qo.prototype.readFeature=qo.prototype.Ub;qo.prototype.readFeatures=qo.prototype.Ha;qo.prototype.readProjection=qo.prototype.Sa;qo.prototype.writeFeatures=qo.prototype.$b;qo.prototype.writeFeaturesNode=qo.prototype.a;r("ol.format.IGC",$o);
$o.prototype.readFeature=$o.prototype.Ub;$o.prototype.readFeatures=$o.prototype.Ha;$o.prototype.readProjection=$o.prototype.Sa;r("ol.format.KML",qp);qp.prototype.readFeature=qp.prototype.Ub;qp.prototype.readFeatures=qp.prototype.Ha;qp.prototype.readName=qp.prototype.uo;qp.prototype.readNetworkLinks=qp.prototype.vo;qp.prototype.readProjection=qp.prototype.Sa;qp.prototype.writeFeatures=qp.prototype.$b;qp.prototype.writeFeaturesNode=qp.prototype.a;r("ol.format.MVT",rr);rr.prototype.readFeatures=rr.prototype.Ha;
rr.prototype.readProjection=rr.prototype.Sa;rr.prototype.setLayers=rr.prototype.c;r("ol.format.OSMXML",tr);tr.prototype.readFeatures=tr.prototype.Ha;tr.prototype.readProjection=tr.prototype.Sa;r("ol.format.Polyline",Sr);r("ol.format.Polyline.encodeDeltas",Tr);r("ol.format.Polyline.decodeDeltas",Vr);r("ol.format.Polyline.encodeFloats",Ur);r("ol.format.Polyline.decodeFloats",Wr);Sr.prototype.readFeature=Sr.prototype.Ub;Sr.prototype.readFeatures=Sr.prototype.Ha;Sr.prototype.readGeometry=Sr.prototype.Wc;
Sr.prototype.readProjection=Sr.prototype.Sa;Sr.prototype.writeGeometry=Sr.prototype.$c;r("ol.format.TopoJSON",Xr);Xr.prototype.readFeatures=Xr.prototype.Ha;Xr.prototype.readProjection=Xr.prototype.Sa;r("ol.format.WFS",cs);cs.prototype.readFeatures=cs.prototype.Ha;cs.prototype.readTransactionResponse=cs.prototype.o;cs.prototype.readFeatureCollectionMetadata=cs.prototype.l;cs.prototype.writeGetFeature=cs.prototype.s;cs.prototype.writeTransaction=cs.prototype.C;cs.prototype.readProjection=cs.prototype.Sa;
r("ol.format.WKT",us);us.prototype.readFeature=us.prototype.Ub;us.prototype.readFeatures=us.prototype.Ha;us.prototype.readGeometry=us.prototype.Wc;us.prototype.writeFeature=us.prototype.Fd;us.prototype.writeFeatures=us.prototype.$b;us.prototype.writeGeometry=us.prototype.$c;r("ol.format.WMSCapabilities",Ms);Ms.prototype.read=Ms.prototype.read;r("ol.format.WMSGetFeatureInfo",it);it.prototype.readFeatures=it.prototype.Ha;r("ol.format.WMTSCapabilities",jt);jt.prototype.read=jt.prototype.read;
r("ol.format.filter.And",mn);r("ol.format.filter.Bbox",nn);r("ol.format.filter.Comparison",on);r("ol.format.filter.ComparisonBinary",pn);r("ol.format.filter.EqualTo",qn);r("ol.format.filter.Filter",jn);r("ol.format.filter.GreaterThan",rn);r("ol.format.filter.GreaterThanOrEqualTo",sn);r("ol.format.filter.and",En);r("ol.format.filter.or",function(a,b){return new Cn(a,b)});r("ol.format.filter.not",function(a){return new An(a)});r("ol.format.filter.bbox",Fn);
r("ol.format.filter.intersects",function(a,b,c){return new un(a,b,c)});r("ol.format.filter.within",function(a,b,c){return new Dn(a,b,c)});r("ol.format.filter.equalTo",function(a,b,c){return new qn(a,b,c)});r("ol.format.filter.notEqualTo",function(a,b,c){return new Bn(a,b,c)});r("ol.format.filter.lessThan",function(a,b){return new yn(a,b)});r("ol.format.filter.lessThanOrEqualTo",function(a,b){return new zn(a,b)});r("ol.format.filter.greaterThan",function(a,b){return new rn(a,b)});
r("ol.format.filter.greaterThanOrEqualTo",function(a,b){return new sn(a,b)});r("ol.format.filter.isNull",function(a){return new xn(a)});r("ol.format.filter.between",function(a,b,c){return new vn(a,b,c)});r("ol.format.filter.like",function(a,b,c,d,e,f){return new wn(a,b,c,d,e,f)});r("ol.format.filter.Intersects",un);r("ol.format.filter.IsBetween",vn);r("ol.format.filter.IsLike",wn);r("ol.format.filter.IsNull",xn);r("ol.format.filter.LessThan",yn);r("ol.format.filter.LessThanOrEqualTo",zn);
r("ol.format.filter.Not",An);r("ol.format.filter.NotEqualTo",Bn);r("ol.format.filter.Or",Cn);r("ol.format.filter.Spatial",tn);r("ol.format.filter.Within",Dn);r("ol.events.condition.altKeyOnly",function(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey});r("ol.events.condition.altShiftKeysOnly",Ag);r("ol.events.condition.always",gc);r("ol.events.condition.click",function(a){return a.type==Xf});r("ol.events.condition.never",hc);r("ol.events.condition.pointerMove",Cg);
r("ol.events.condition.singleClick",Dg);r("ol.events.condition.doubleClick",function(a){return a.type==Yf});r("ol.events.condition.noModifierKeys",Eg);r("ol.events.condition.platformModifierKeyOnly",function(a){a=a.originalEvent;return!a.altKey&&(ff?a.metaKey:a.ctrlKey)&&!a.shiftKey});r("ol.events.condition.shiftKeyOnly",Fg);r("ol.events.condition.targetNotEditable",Gg);r("ol.events.condition.mouseOnly",Hg);r("ol.events.condition.primaryAction",Ig);Ka.prototype.type=Ka.prototype.type;
Ka.prototype.target=Ka.prototype.target;Ka.prototype.preventDefault=Ka.prototype.preventDefault;Ka.prototype.stopPropagation=Ka.prototype.stopPropagation;r("ol.control.Attribution",Ie);r("ol.control.Attribution.render",Je);Ie.prototype.getCollapsible=Ie.prototype.Ol;Ie.prototype.setCollapsible=Ie.prototype.Rl;Ie.prototype.setCollapsed=Ie.prototype.Ql;Ie.prototype.getCollapsed=Ie.prototype.Nl;r("ol.control.Control",He);He.prototype.getMap=He.prototype.i;He.prototype.setMap=He.prototype.setMap;
He.prototype.setTarget=He.prototype.c;r("ol.control.FullScreen",Le);r("ol.control.defaults",Te);r("ol.control.MousePosition",Ue);r("ol.control.MousePosition.render",Ve);Ue.prototype.getCoordinateFormat=Ue.prototype.wg;Ue.prototype.getProjection=Ue.prototype.Zg;Ue.prototype.setCoordinateFormat=Ue.prototype.Uh;Ue.prototype.setProjection=Ue.prototype.$g;r("ol.control.OverviewMap",Ul);r("ol.control.OverviewMap.render",Vl);Ul.prototype.getCollapsible=Ul.prototype.Ul;Ul.prototype.setCollapsible=Ul.prototype.Xl;
Ul.prototype.setCollapsed=Ul.prototype.Wl;Ul.prototype.getCollapsed=Ul.prototype.Tl;Ul.prototype.getOverviewMap=Ul.prototype.ck;r("ol.control.Rotate",Qe);r("ol.control.Rotate.render",Re);r("ol.control.ScaleLine",Zl);Zl.prototype.getUnits=Zl.prototype.yb;r("ol.control.ScaleLine.render",$l);Zl.prototype.setUnits=Zl.prototype.G;r("ol.control.Zoom",Se);r("ol.control.ZoomSlider",im);r("ol.control.ZoomSlider.render",km);r("ol.control.ZoomToExtent",nm);Ua.prototype.changed=Ua.prototype.v;
Ua.prototype.dispatchEvent=Ua.prototype.b;Ua.prototype.getRevision=Ua.prototype.K;Ua.prototype.on=Ua.prototype.I;Ua.prototype.once=Ua.prototype.L;Ua.prototype.un=Ua.prototype.J;Ua.prototype.unByKey=Ua.prototype.M;me.prototype.get=me.prototype.get;me.prototype.getKeys=me.prototype.O;me.prototype.getProperties=me.prototype.N;me.prototype.set=me.prototype.set;me.prototype.setProperties=me.prototype.H;me.prototype.unset=me.prototype.R;me.prototype.changed=me.prototype.v;me.prototype.dispatchEvent=me.prototype.b;
me.prototype.getRevision=me.prototype.K;me.prototype.on=me.prototype.I;me.prototype.once=me.prototype.L;me.prototype.un=me.prototype.J;me.prototype.unByKey=me.prototype.M;re.prototype.type=re.prototype.type;re.prototype.target=re.prototype.target;re.prototype.preventDefault=re.prototype.preventDefault;re.prototype.stopPropagation=re.prototype.stopPropagation;om.prototype.get=om.prototype.get;om.prototype.getKeys=om.prototype.O;om.prototype.getProperties=om.prototype.N;om.prototype.set=om.prototype.set;
om.prototype.setProperties=om.prototype.H;om.prototype.unset=om.prototype.R;om.prototype.changed=om.prototype.v;om.prototype.dispatchEvent=om.prototype.b;om.prototype.getRevision=om.prototype.K;om.prototype.on=om.prototype.I;om.prototype.once=om.prototype.L;om.prototype.un=om.prototype.J;om.prototype.unByKey=om.prototype.M;I.prototype.get=I.prototype.get;I.prototype.getKeys=I.prototype.O;I.prototype.getProperties=I.prototype.N;I.prototype.set=I.prototype.set;I.prototype.setProperties=I.prototype.H;
I.prototype.unset=I.prototype.R;I.prototype.changed=I.prototype.v;I.prototype.dispatchEvent=I.prototype.b;I.prototype.getRevision=I.prototype.K;I.prototype.on=I.prototype.I;I.prototype.once=I.prototype.L;I.prototype.un=I.prototype.J;I.prototype.unByKey=I.prototype.M;wt.prototype.get=wt.prototype.get;wt.prototype.getKeys=wt.prototype.O;wt.prototype.getProperties=wt.prototype.N;wt.prototype.set=wt.prototype.set;wt.prototype.setProperties=wt.prototype.H;wt.prototype.unset=wt.prototype.R;
wt.prototype.changed=wt.prototype.v;wt.prototype.dispatchEvent=wt.prototype.b;wt.prototype.getRevision=wt.prototype.K;wt.prototype.on=wt.prototype.I;wt.prototype.once=wt.prototype.L;wt.prototype.un=wt.prototype.J;wt.prototype.unByKey=wt.prototype.M;Rt.prototype.getTileCoord=Rt.prototype.i;H.prototype.get=H.prototype.get;H.prototype.getKeys=H.prototype.O;H.prototype.getProperties=H.prototype.N;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.H;H.prototype.unset=H.prototype.R;
H.prototype.changed=H.prototype.v;H.prototype.dispatchEvent=H.prototype.b;H.prototype.getRevision=H.prototype.K;H.prototype.on=H.prototype.I;H.prototype.once=H.prototype.L;H.prototype.un=H.prototype.J;H.prototype.unByKey=H.prototype.M;Ge.prototype.type=Ge.prototype.type;Ge.prototype.target=Ge.prototype.target;Ge.prototype.preventDefault=Ge.prototype.preventDefault;Ge.prototype.stopPropagation=Ge.prototype.stopPropagation;Tf.prototype.map=Tf.prototype.map;Tf.prototype.frameState=Tf.prototype.frameState;
Tf.prototype.type=Tf.prototype.type;Tf.prototype.target=Tf.prototype.target;Tf.prototype.preventDefault=Tf.prototype.preventDefault;Tf.prototype.stopPropagation=Tf.prototype.stopPropagation;Uf.prototype.originalEvent=Uf.prototype.originalEvent;Uf.prototype.pixel=Uf.prototype.pixel;Uf.prototype.coordinate=Uf.prototype.coordinate;Uf.prototype.dragging=Uf.prototype.dragging;Uf.prototype.preventDefault=Uf.prototype.preventDefault;Uf.prototype.stopPropagation=Uf.prototype.stopPropagation;
Uf.prototype.map=Uf.prototype.map;Uf.prototype.frameState=Uf.prototype.frameState;Uf.prototype.type=Uf.prototype.type;Uf.prototype.target=Uf.prototype.target;Ta.prototype.type=Ta.prototype.type;Ta.prototype.target=Ta.prototype.target;Ta.prototype.preventDefault=Ta.prototype.preventDefault;Ta.prototype.stopPropagation=Ta.prototype.stopPropagation;Cl.prototype.get=Cl.prototype.get;Cl.prototype.getKeys=Cl.prototype.O;Cl.prototype.getProperties=Cl.prototype.N;Cl.prototype.set=Cl.prototype.set;
Cl.prototype.setProperties=Cl.prototype.H;Cl.prototype.unset=Cl.prototype.R;Cl.prototype.changed=Cl.prototype.v;Cl.prototype.dispatchEvent=Cl.prototype.b;Cl.prototype.getRevision=Cl.prototype.K;Cl.prototype.on=Cl.prototype.I;Cl.prototype.once=Cl.prototype.L;Cl.prototype.un=Cl.prototype.J;Cl.prototype.unByKey=Cl.prototype.M;Tw.prototype.getTileCoord=Tw.prototype.i;yd.prototype.get=yd.prototype.get;yd.prototype.getKeys=yd.prototype.O;yd.prototype.getProperties=yd.prototype.N;yd.prototype.set=yd.prototype.set;
yd.prototype.setProperties=yd.prototype.H;yd.prototype.unset=yd.prototype.R;yd.prototype.changed=yd.prototype.v;yd.prototype.dispatchEvent=yd.prototype.b;yd.prototype.getRevision=yd.prototype.K;yd.prototype.on=yd.prototype.I;yd.prototype.once=yd.prototype.L;yd.prototype.un=yd.prototype.J;yd.prototype.unByKey=yd.prototype.M;Ww.prototype.forEachTileCoord=Ww.prototype.sg;Ww.prototype.getMaxZoom=Ww.prototype.Cg;Ww.prototype.getMinZoom=Ww.prototype.Dg;Ww.prototype.getOrigin=Ww.prototype.Tc;
Ww.prototype.getResolution=Ww.prototype.Ga;Ww.prototype.getResolutions=Ww.prototype.Bh;Ww.prototype.getTileCoordExtent=Ww.prototype.Ia;Ww.prototype.getTileCoordForCoordAndResolution=Ww.prototype.Yd;Ww.prototype.getTileCoordForCoordAndZ=Ww.prototype.Zd;Ww.prototype.getTileSize=Ww.prototype.Va;Ww.prototype.getZForResolution=Ww.prototype.wc;si.prototype.getOpacity=si.prototype.qe;si.prototype.getRotateWithView=si.prototype.re;si.prototype.getRotation=si.prototype.se;si.prototype.getScale=si.prototype.te;
si.prototype.getSnapToPixel=si.prototype.Xd;si.prototype.setOpacity=si.prototype.Rc;si.prototype.setRotation=si.prototype.ue;si.prototype.setScale=si.prototype.Sc;jp.prototype.getOpacity=jp.prototype.qe;jp.prototype.getRotateWithView=jp.prototype.re;jp.prototype.getRotation=jp.prototype.se;jp.prototype.getScale=jp.prototype.te;jp.prototype.getSnapToPixel=jp.prototype.Xd;jp.prototype.setOpacity=jp.prototype.Rc;jp.prototype.setRotation=jp.prototype.ue;jp.prototype.setScale=jp.prototype.Sc;
hx.prototype.getOpacity=hx.prototype.qe;hx.prototype.getRotateWithView=hx.prototype.re;hx.prototype.getRotation=hx.prototype.se;hx.prototype.getScale=hx.prototype.te;hx.prototype.getSnapToPixel=hx.prototype.Xd;hx.prototype.setOpacity=hx.prototype.Rc;hx.prototype.setRotation=hx.prototype.ue;hx.prototype.setScale=hx.prototype.Sc;Tj.prototype.get=Tj.prototype.get;Tj.prototype.getKeys=Tj.prototype.O;Tj.prototype.getProperties=Tj.prototype.N;Tj.prototype.set=Tj.prototype.set;
Tj.prototype.setProperties=Tj.prototype.H;Tj.prototype.unset=Tj.prototype.R;Tj.prototype.changed=Tj.prototype.v;Tj.prototype.dispatchEvent=Tj.prototype.b;Tj.prototype.getRevision=Tj.prototype.K;Tj.prototype.on=Tj.prototype.I;Tj.prototype.once=Tj.prototype.L;Tj.prototype.un=Tj.prototype.J;Tj.prototype.unByKey=Tj.prototype.M;Uv.prototype.getAttributions=Uv.prototype.va;Uv.prototype.getLogo=Uv.prototype.ua;Uv.prototype.getProjection=Uv.prototype.wa;Uv.prototype.getState=Uv.prototype.U;
Uv.prototype.refresh=Uv.prototype.ta;Uv.prototype.setAttributions=Uv.prototype.qa;Uv.prototype.get=Uv.prototype.get;Uv.prototype.getKeys=Uv.prototype.O;Uv.prototype.getProperties=Uv.prototype.N;Uv.prototype.set=Uv.prototype.set;Uv.prototype.setProperties=Uv.prototype.H;Uv.prototype.unset=Uv.prototype.R;Uv.prototype.changed=Uv.prototype.v;Uv.prototype.dispatchEvent=Uv.prototype.b;Uv.prototype.getRevision=Uv.prototype.K;Uv.prototype.on=Uv.prototype.I;Uv.prototype.once=Uv.prototype.L;
Uv.prototype.un=Uv.prototype.J;Uv.prototype.unByKey=Uv.prototype.M;Yv.prototype.getTileGrid=Yv.prototype.Ra;Yv.prototype.refresh=Yv.prototype.ta;Yv.prototype.getAttributions=Yv.prototype.va;Yv.prototype.getLogo=Yv.prototype.ua;Yv.prototype.getProjection=Yv.prototype.wa;Yv.prototype.getState=Yv.prototype.U;Yv.prototype.setAttributions=Yv.prototype.qa;Yv.prototype.get=Yv.prototype.get;Yv.prototype.getKeys=Yv.prototype.O;Yv.prototype.getProperties=Yv.prototype.N;Yv.prototype.set=Yv.prototype.set;
Yv.prototype.setProperties=Yv.prototype.H;Yv.prototype.unset=Yv.prototype.R;Yv.prototype.changed=Yv.prototype.v;Yv.prototype.dispatchEvent=Yv.prototype.b;Yv.prototype.getRevision=Yv.prototype.K;Yv.prototype.on=Yv.prototype.I;Yv.prototype.once=Yv.prototype.L;Yv.prototype.un=Yv.prototype.J;Yv.prototype.unByKey=Yv.prototype.M;W.prototype.getTileLoadFunction=W.prototype.fb;W.prototype.getTileUrlFunction=W.prototype.hb;W.prototype.getUrls=W.prototype.ib;W.prototype.setTileLoadFunction=W.prototype.nb;
W.prototype.setTileUrlFunction=W.prototype.Ta;W.prototype.setUrl=W.prototype.Ya;W.prototype.setUrls=W.prototype.Ua;W.prototype.getTileGrid=W.prototype.Ra;W.prototype.refresh=W.prototype.ta;W.prototype.getAttributions=W.prototype.va;W.prototype.getLogo=W.prototype.ua;W.prototype.getProjection=W.prototype.wa;W.prototype.getState=W.prototype.U;W.prototype.setAttributions=W.prototype.qa;W.prototype.get=W.prototype.get;W.prototype.getKeys=W.prototype.O;W.prototype.getProperties=W.prototype.N;
W.prototype.set=W.prototype.set;W.prototype.setProperties=W.prototype.H;W.prototype.unset=W.prototype.R;W.prototype.changed=W.prototype.v;W.prototype.dispatchEvent=W.prototype.b;W.prototype.getRevision=W.prototype.K;W.prototype.on=W.prototype.I;W.prototype.once=W.prototype.L;W.prototype.un=W.prototype.J;W.prototype.unByKey=W.prototype.M;bw.prototype.setRenderReprojectionEdges=bw.prototype.Bb;bw.prototype.setTileGridForProjection=bw.prototype.Cb;bw.prototype.getTileLoadFunction=bw.prototype.fb;
bw.prototype.getTileUrlFunction=bw.prototype.hb;bw.prototype.getUrls=bw.prototype.ib;bw.prototype.setTileLoadFunction=bw.prototype.nb;bw.prototype.setTileUrlFunction=bw.prototype.Ta;bw.prototype.setUrl=bw.prototype.Ya;bw.prototype.setUrls=bw.prototype.Ua;bw.prototype.getTileGrid=bw.prototype.Ra;bw.prototype.refresh=bw.prototype.ta;bw.prototype.getAttributions=bw.prototype.va;bw.prototype.getLogo=bw.prototype.ua;bw.prototype.getProjection=bw.prototype.wa;bw.prototype.getState=bw.prototype.U;
bw.prototype.setAttributions=bw.prototype.qa;bw.prototype.get=bw.prototype.get;bw.prototype.getKeys=bw.prototype.O;bw.prototype.getProperties=bw.prototype.N;bw.prototype.set=bw.prototype.set;bw.prototype.setProperties=bw.prototype.H;bw.prototype.unset=bw.prototype.R;bw.prototype.changed=bw.prototype.v;bw.prototype.dispatchEvent=bw.prototype.b;bw.prototype.getRevision=bw.prototype.K;bw.prototype.on=bw.prototype.I;bw.prototype.once=bw.prototype.L;bw.prototype.un=bw.prototype.J;
bw.prototype.unByKey=bw.prototype.M;dw.prototype.setRenderReprojectionEdges=dw.prototype.Bb;dw.prototype.setTileGridForProjection=dw.prototype.Cb;dw.prototype.getTileLoadFunction=dw.prototype.fb;dw.prototype.getTileUrlFunction=dw.prototype.hb;dw.prototype.getUrls=dw.prototype.ib;dw.prototype.setTileLoadFunction=dw.prototype.nb;dw.prototype.setTileUrlFunction=dw.prototype.Ta;dw.prototype.setUrl=dw.prototype.Ya;dw.prototype.setUrls=dw.prototype.Ua;dw.prototype.getTileGrid=dw.prototype.Ra;
dw.prototype.refresh=dw.prototype.ta;dw.prototype.getAttributions=dw.prototype.va;dw.prototype.getLogo=dw.prototype.ua;dw.prototype.getProjection=dw.prototype.wa;dw.prototype.getState=dw.prototype.U;dw.prototype.setAttributions=dw.prototype.qa;dw.prototype.get=dw.prototype.get;dw.prototype.getKeys=dw.prototype.O;dw.prototype.getProperties=dw.prototype.N;dw.prototype.set=dw.prototype.set;dw.prototype.setProperties=dw.prototype.H;dw.prototype.unset=dw.prototype.R;dw.prototype.changed=dw.prototype.v;
dw.prototype.dispatchEvent=dw.prototype.b;dw.prototype.getRevision=dw.prototype.K;dw.prototype.on=dw.prototype.I;dw.prototype.once=dw.prototype.L;dw.prototype.un=dw.prototype.J;dw.prototype.unByKey=dw.prototype.M;ew.prototype.setRenderReprojectionEdges=ew.prototype.Bb;ew.prototype.setTileGridForProjection=ew.prototype.Cb;ew.prototype.getTileLoadFunction=ew.prototype.fb;ew.prototype.getTileUrlFunction=ew.prototype.hb;ew.prototype.getUrls=ew.prototype.ib;ew.prototype.setTileLoadFunction=ew.prototype.nb;
ew.prototype.setTileUrlFunction=ew.prototype.Ta;ew.prototype.setUrl=ew.prototype.Ya;ew.prototype.setUrls=ew.prototype.Ua;ew.prototype.getTileGrid=ew.prototype.Ra;ew.prototype.refresh=ew.prototype.ta;ew.prototype.getAttributions=ew.prototype.va;ew.prototype.getLogo=ew.prototype.ua;ew.prototype.getProjection=ew.prototype.wa;ew.prototype.getState=ew.prototype.U;ew.prototype.setAttributions=ew.prototype.qa;ew.prototype.get=ew.prototype.get;ew.prototype.getKeys=ew.prototype.O;
ew.prototype.getProperties=ew.prototype.N;ew.prototype.set=ew.prototype.set;ew.prototype.setProperties=ew.prototype.H;ew.prototype.unset=ew.prototype.R;ew.prototype.changed=ew.prototype.v;ew.prototype.dispatchEvent=ew.prototype.b;ew.prototype.getRevision=ew.prototype.K;ew.prototype.on=ew.prototype.I;ew.prototype.once=ew.prototype.L;ew.prototype.un=ew.prototype.J;ew.prototype.unByKey=ew.prototype.M;T.prototype.getAttributions=T.prototype.va;T.prototype.getLogo=T.prototype.ua;
T.prototype.getProjection=T.prototype.wa;T.prototype.getState=T.prototype.U;T.prototype.refresh=T.prototype.ta;T.prototype.setAttributions=T.prototype.qa;T.prototype.get=T.prototype.get;T.prototype.getKeys=T.prototype.O;T.prototype.getProperties=T.prototype.N;T.prototype.set=T.prototype.set;T.prototype.setProperties=T.prototype.H;T.prototype.unset=T.prototype.R;T.prototype.changed=T.prototype.v;T.prototype.dispatchEvent=T.prototype.b;T.prototype.getRevision=T.prototype.K;T.prototype.on=T.prototype.I;
T.prototype.once=T.prototype.L;T.prototype.un=T.prototype.J;T.prototype.unByKey=T.prototype.M;X.prototype.addFeature=X.prototype.cb;X.prototype.addFeatures=X.prototype.Ic;X.prototype.clear=X.prototype.clear;X.prototype.forEachFeature=X.prototype.qg;X.prototype.forEachFeatureInExtent=X.prototype.Kb;X.prototype.forEachFeatureIntersectingExtent=X.prototype.rg;X.prototype.getFeaturesCollection=X.prototype.zg;X.prototype.getFeatures=X.prototype.oe;X.prototype.getFeaturesAtCoordinate=X.prototype.yg;
X.prototype.getFeaturesInExtent=X.prototype.bf;X.prototype.getClosestFeatureToCoordinate=X.prototype.ug;X.prototype.getExtent=X.prototype.D;X.prototype.getFeatureById=X.prototype.xg;X.prototype.getFormat=X.prototype.sh;X.prototype.getUrl=X.prototype.th;X.prototype.removeFeature=X.prototype.mb;X.prototype.getAttributions=X.prototype.va;X.prototype.getLogo=X.prototype.ua;X.prototype.getProjection=X.prototype.wa;X.prototype.getState=X.prototype.U;X.prototype.refresh=X.prototype.ta;
X.prototype.setAttributions=X.prototype.qa;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.O;X.prototype.getProperties=X.prototype.N;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.H;X.prototype.unset=X.prototype.R;X.prototype.changed=X.prototype.v;X.prototype.dispatchEvent=X.prototype.b;X.prototype.getRevision=X.prototype.K;X.prototype.on=X.prototype.I;X.prototype.once=X.prototype.L;X.prototype.un=X.prototype.J;X.prototype.unByKey=X.prototype.M;
Wj.prototype.getAttributions=Wj.prototype.va;Wj.prototype.getLogo=Wj.prototype.ua;Wj.prototype.getProjection=Wj.prototype.wa;Wj.prototype.getState=Wj.prototype.U;Wj.prototype.refresh=Wj.prototype.ta;Wj.prototype.setAttributions=Wj.prototype.qa;Wj.prototype.get=Wj.prototype.get;Wj.prototype.getKeys=Wj.prototype.O;Wj.prototype.getProperties=Wj.prototype.N;Wj.prototype.set=Wj.prototype.set;Wj.prototype.setProperties=Wj.prototype.H;Wj.prototype.unset=Wj.prototype.R;Wj.prototype.changed=Wj.prototype.v;
Wj.prototype.dispatchEvent=Wj.prototype.b;Wj.prototype.getRevision=Wj.prototype.K;Wj.prototype.on=Wj.prototype.I;Wj.prototype.once=Wj.prototype.L;Wj.prototype.un=Wj.prototype.J;Wj.prototype.unByKey=Wj.prototype.M;Yj.prototype.type=Yj.prototype.type;Yj.prototype.target=Yj.prototype.target;Yj.prototype.preventDefault=Yj.prototype.preventDefault;Yj.prototype.stopPropagation=Yj.prototype.stopPropagation;kw.prototype.getAttributions=kw.prototype.va;kw.prototype.getLogo=kw.prototype.ua;
kw.prototype.getProjection=kw.prototype.wa;kw.prototype.getState=kw.prototype.U;kw.prototype.refresh=kw.prototype.ta;kw.prototype.setAttributions=kw.prototype.qa;kw.prototype.get=kw.prototype.get;kw.prototype.getKeys=kw.prototype.O;kw.prototype.getProperties=kw.prototype.N;kw.prototype.set=kw.prototype.set;kw.prototype.setProperties=kw.prototype.H;kw.prototype.unset=kw.prototype.R;kw.prototype.changed=kw.prototype.v;kw.prototype.dispatchEvent=kw.prototype.b;kw.prototype.getRevision=kw.prototype.K;
kw.prototype.on=kw.prototype.I;kw.prototype.once=kw.prototype.L;kw.prototype.un=kw.prototype.J;kw.prototype.unByKey=kw.prototype.M;dk.prototype.getAttributions=dk.prototype.va;dk.prototype.getLogo=dk.prototype.ua;dk.prototype.getProjection=dk.prototype.wa;dk.prototype.getState=dk.prototype.U;dk.prototype.refresh=dk.prototype.ta;dk.prototype.setAttributions=dk.prototype.qa;dk.prototype.get=dk.prototype.get;dk.prototype.getKeys=dk.prototype.O;dk.prototype.getProperties=dk.prototype.N;
dk.prototype.set=dk.prototype.set;dk.prototype.setProperties=dk.prototype.H;dk.prototype.unset=dk.prototype.R;dk.prototype.changed=dk.prototype.v;dk.prototype.dispatchEvent=dk.prototype.b;dk.prototype.getRevision=dk.prototype.K;dk.prototype.on=dk.prototype.I;dk.prototype.once=dk.prototype.L;dk.prototype.un=dk.prototype.J;dk.prototype.unByKey=dk.prototype.M;lw.prototype.getAttributions=lw.prototype.va;lw.prototype.getLogo=lw.prototype.ua;lw.prototype.getProjection=lw.prototype.wa;
lw.prototype.getState=lw.prototype.U;lw.prototype.refresh=lw.prototype.ta;lw.prototype.setAttributions=lw.prototype.qa;lw.prototype.get=lw.prototype.get;lw.prototype.getKeys=lw.prototype.O;lw.prototype.getProperties=lw.prototype.N;lw.prototype.set=lw.prototype.set;lw.prototype.setProperties=lw.prototype.H;lw.prototype.unset=lw.prototype.R;lw.prototype.changed=lw.prototype.v;lw.prototype.dispatchEvent=lw.prototype.b;lw.prototype.getRevision=lw.prototype.K;lw.prototype.on=lw.prototype.I;
lw.prototype.once=lw.prototype.L;lw.prototype.un=lw.prototype.J;lw.prototype.unByKey=lw.prototype.M;mw.prototype.getAttributions=mw.prototype.va;mw.prototype.getLogo=mw.prototype.ua;mw.prototype.getProjection=mw.prototype.wa;mw.prototype.getState=mw.prototype.U;mw.prototype.refresh=mw.prototype.ta;mw.prototype.setAttributions=mw.prototype.qa;mw.prototype.get=mw.prototype.get;mw.prototype.getKeys=mw.prototype.O;mw.prototype.getProperties=mw.prototype.N;mw.prototype.set=mw.prototype.set;
mw.prototype.setProperties=mw.prototype.H;mw.prototype.unset=mw.prototype.R;mw.prototype.changed=mw.prototype.v;mw.prototype.dispatchEvent=mw.prototype.b;mw.prototype.getRevision=mw.prototype.K;mw.prototype.on=mw.prototype.I;mw.prototype.once=mw.prototype.L;mw.prototype.un=mw.prototype.J;mw.prototype.unByKey=mw.prototype.M;ek.prototype.getAttributions=ek.prototype.va;ek.prototype.getLogo=ek.prototype.ua;ek.prototype.getProjection=ek.prototype.wa;ek.prototype.getState=ek.prototype.U;
ek.prototype.refresh=ek.prototype.ta;ek.prototype.setAttributions=ek.prototype.qa;ek.prototype.get=ek.prototype.get;ek.prototype.getKeys=ek.prototype.O;ek.prototype.getProperties=ek.prototype.N;ek.prototype.set=ek.prototype.set;ek.prototype.setProperties=ek.prototype.H;ek.prototype.unset=ek.prototype.R;ek.prototype.changed=ek.prototype.v;ek.prototype.dispatchEvent=ek.prototype.b;ek.prototype.getRevision=ek.prototype.K;ek.prototype.on=ek.prototype.I;ek.prototype.once=ek.prototype.L;
ek.prototype.un=ek.prototype.J;ek.prototype.unByKey=ek.prototype.M;nw.prototype.getAttributions=nw.prototype.va;nw.prototype.getLogo=nw.prototype.ua;nw.prototype.getProjection=nw.prototype.wa;nw.prototype.getState=nw.prototype.U;nw.prototype.refresh=nw.prototype.ta;nw.prototype.setAttributions=nw.prototype.qa;nw.prototype.get=nw.prototype.get;nw.prototype.getKeys=nw.prototype.O;nw.prototype.getProperties=nw.prototype.N;nw.prototype.set=nw.prototype.set;nw.prototype.setProperties=nw.prototype.H;
nw.prototype.unset=nw.prototype.R;nw.prototype.changed=nw.prototype.v;nw.prototype.dispatchEvent=nw.prototype.b;nw.prototype.getRevision=nw.prototype.K;nw.prototype.on=nw.prototype.I;nw.prototype.once=nw.prototype.L;nw.prototype.un=nw.prototype.J;nw.prototype.unByKey=nw.prototype.M;rw.prototype.setRenderReprojectionEdges=rw.prototype.Bb;rw.prototype.setTileGridForProjection=rw.prototype.Cb;rw.prototype.getTileLoadFunction=rw.prototype.fb;rw.prototype.getTileUrlFunction=rw.prototype.hb;
rw.prototype.getUrls=rw.prototype.ib;rw.prototype.setTileLoadFunction=rw.prototype.nb;rw.prototype.setTileUrlFunction=rw.prototype.Ta;rw.prototype.setUrl=rw.prototype.Ya;rw.prototype.setUrls=rw.prototype.Ua;rw.prototype.getTileGrid=rw.prototype.Ra;rw.prototype.refresh=rw.prototype.ta;rw.prototype.getAttributions=rw.prototype.va;rw.prototype.getLogo=rw.prototype.ua;rw.prototype.getProjection=rw.prototype.wa;rw.prototype.getState=rw.prototype.U;rw.prototype.setAttributions=rw.prototype.qa;
rw.prototype.get=rw.prototype.get;rw.prototype.getKeys=rw.prototype.O;rw.prototype.getProperties=rw.prototype.N;rw.prototype.set=rw.prototype.set;rw.prototype.setProperties=rw.prototype.H;rw.prototype.unset=rw.prototype.R;rw.prototype.changed=rw.prototype.v;rw.prototype.dispatchEvent=rw.prototype.b;rw.prototype.getRevision=rw.prototype.K;rw.prototype.on=rw.prototype.I;rw.prototype.once=rw.prototype.L;rw.prototype.un=rw.prototype.J;rw.prototype.unByKey=rw.prototype.M;tw.prototype.getAttributions=tw.prototype.va;
tw.prototype.getLogo=tw.prototype.ua;tw.prototype.getProjection=tw.prototype.wa;tw.prototype.getState=tw.prototype.U;tw.prototype.refresh=tw.prototype.ta;tw.prototype.setAttributions=tw.prototype.qa;tw.prototype.get=tw.prototype.get;tw.prototype.getKeys=tw.prototype.O;tw.prototype.getProperties=tw.prototype.N;tw.prototype.set=tw.prototype.set;tw.prototype.setProperties=tw.prototype.H;tw.prototype.unset=tw.prototype.R;tw.prototype.changed=tw.prototype.v;tw.prototype.dispatchEvent=tw.prototype.b;
tw.prototype.getRevision=tw.prototype.K;tw.prototype.on=tw.prototype.I;tw.prototype.once=tw.prototype.L;tw.prototype.un=tw.prototype.J;tw.prototype.unByKey=tw.prototype.M;yw.prototype.type=yw.prototype.type;yw.prototype.target=yw.prototype.target;yw.prototype.preventDefault=yw.prototype.preventDefault;yw.prototype.stopPropagation=yw.prototype.stopPropagation;Bw.prototype.setRenderReprojectionEdges=Bw.prototype.Bb;Bw.prototype.setTileGridForProjection=Bw.prototype.Cb;
Bw.prototype.getTileLoadFunction=Bw.prototype.fb;Bw.prototype.getTileUrlFunction=Bw.prototype.hb;Bw.prototype.getUrls=Bw.prototype.ib;Bw.prototype.setTileLoadFunction=Bw.prototype.nb;Bw.prototype.setTileUrlFunction=Bw.prototype.Ta;Bw.prototype.setUrl=Bw.prototype.Ya;Bw.prototype.setUrls=Bw.prototype.Ua;Bw.prototype.getTileGrid=Bw.prototype.Ra;Bw.prototype.refresh=Bw.prototype.ta;Bw.prototype.getAttributions=Bw.prototype.va;Bw.prototype.getLogo=Bw.prototype.ua;Bw.prototype.getProjection=Bw.prototype.wa;
Bw.prototype.getState=Bw.prototype.U;Bw.prototype.setAttributions=Bw.prototype.qa;Bw.prototype.get=Bw.prototype.get;Bw.prototype.getKeys=Bw.prototype.O;Bw.prototype.getProperties=Bw.prototype.N;Bw.prototype.set=Bw.prototype.set;Bw.prototype.setProperties=Bw.prototype.H;Bw.prototype.unset=Bw.prototype.R;Bw.prototype.changed=Bw.prototype.v;Bw.prototype.dispatchEvent=Bw.prototype.b;Bw.prototype.getRevision=Bw.prototype.K;Bw.prototype.on=Bw.prototype.I;Bw.prototype.once=Bw.prototype.L;
Bw.prototype.un=Bw.prototype.J;Bw.prototype.unByKey=Bw.prototype.M;Xv.prototype.type=Xv.prototype.type;Xv.prototype.target=Xv.prototype.target;Xv.prototype.preventDefault=Xv.prototype.preventDefault;Xv.prototype.stopPropagation=Xv.prototype.stopPropagation;Fw.prototype.setRenderReprojectionEdges=Fw.prototype.Bb;Fw.prototype.setTileGridForProjection=Fw.prototype.Cb;Fw.prototype.getTileLoadFunction=Fw.prototype.fb;Fw.prototype.getTileUrlFunction=Fw.prototype.hb;Fw.prototype.getUrls=Fw.prototype.ib;
Fw.prototype.setTileLoadFunction=Fw.prototype.nb;Fw.prototype.setTileUrlFunction=Fw.prototype.Ta;Fw.prototype.setUrl=Fw.prototype.Ya;Fw.prototype.setUrls=Fw.prototype.Ua;Fw.prototype.getTileGrid=Fw.prototype.Ra;Fw.prototype.refresh=Fw.prototype.ta;Fw.prototype.getAttributions=Fw.prototype.va;Fw.prototype.getLogo=Fw.prototype.ua;Fw.prototype.getProjection=Fw.prototype.wa;Fw.prototype.getState=Fw.prototype.U;Fw.prototype.setAttributions=Fw.prototype.qa;Fw.prototype.get=Fw.prototype.get;
Fw.prototype.getKeys=Fw.prototype.O;Fw.prototype.getProperties=Fw.prototype.N;Fw.prototype.set=Fw.prototype.set;Fw.prototype.setProperties=Fw.prototype.H;Fw.prototype.unset=Fw.prototype.R;Fw.prototype.changed=Fw.prototype.v;Fw.prototype.dispatchEvent=Fw.prototype.b;Fw.prototype.getRevision=Fw.prototype.K;Fw.prototype.on=Fw.prototype.I;Fw.prototype.once=Fw.prototype.L;Fw.prototype.un=Fw.prototype.J;Fw.prototype.unByKey=Fw.prototype.M;Hw.prototype.getTileGrid=Hw.prototype.Ra;Hw.prototype.refresh=Hw.prototype.ta;
Hw.prototype.getAttributions=Hw.prototype.va;Hw.prototype.getLogo=Hw.prototype.ua;Hw.prototype.getProjection=Hw.prototype.wa;Hw.prototype.getState=Hw.prototype.U;Hw.prototype.setAttributions=Hw.prototype.qa;Hw.prototype.get=Hw.prototype.get;Hw.prototype.getKeys=Hw.prototype.O;Hw.prototype.getProperties=Hw.prototype.N;Hw.prototype.set=Hw.prototype.set;Hw.prototype.setProperties=Hw.prototype.H;Hw.prototype.unset=Hw.prototype.R;Hw.prototype.changed=Hw.prototype.v;Hw.prototype.dispatchEvent=Hw.prototype.b;
Hw.prototype.getRevision=Hw.prototype.K;Hw.prototype.on=Hw.prototype.I;Hw.prototype.once=Hw.prototype.L;Hw.prototype.un=Hw.prototype.J;Hw.prototype.unByKey=Hw.prototype.M;Jw.prototype.setRenderReprojectionEdges=Jw.prototype.Bb;Jw.prototype.setTileGridForProjection=Jw.prototype.Cb;Jw.prototype.getTileLoadFunction=Jw.prototype.fb;Jw.prototype.getTileUrlFunction=Jw.prototype.hb;Jw.prototype.getUrls=Jw.prototype.ib;Jw.prototype.setTileLoadFunction=Jw.prototype.nb;Jw.prototype.setTileUrlFunction=Jw.prototype.Ta;
Jw.prototype.setUrl=Jw.prototype.Ya;Jw.prototype.setUrls=Jw.prototype.Ua;Jw.prototype.getTileGrid=Jw.prototype.Ra;Jw.prototype.refresh=Jw.prototype.ta;Jw.prototype.getAttributions=Jw.prototype.va;Jw.prototype.getLogo=Jw.prototype.ua;Jw.prototype.getProjection=Jw.prototype.wa;Jw.prototype.getState=Jw.prototype.U;Jw.prototype.setAttributions=Jw.prototype.qa;Jw.prototype.get=Jw.prototype.get;Jw.prototype.getKeys=Jw.prototype.O;Jw.prototype.getProperties=Jw.prototype.N;Jw.prototype.set=Jw.prototype.set;
Jw.prototype.setProperties=Jw.prototype.H;Jw.prototype.unset=Jw.prototype.R;Jw.prototype.changed=Jw.prototype.v;Jw.prototype.dispatchEvent=Jw.prototype.b;Jw.prototype.getRevision=Jw.prototype.K;Jw.prototype.on=Jw.prototype.I;Jw.prototype.once=Jw.prototype.L;Jw.prototype.un=Jw.prototype.J;Jw.prototype.unByKey=Jw.prototype.M;Kw.prototype.getTileGrid=Kw.prototype.Ra;Kw.prototype.refresh=Kw.prototype.ta;Kw.prototype.getAttributions=Kw.prototype.va;Kw.prototype.getLogo=Kw.prototype.ua;
Kw.prototype.getProjection=Kw.prototype.wa;Kw.prototype.getState=Kw.prototype.U;Kw.prototype.setAttributions=Kw.prototype.qa;Kw.prototype.get=Kw.prototype.get;Kw.prototype.getKeys=Kw.prototype.O;Kw.prototype.getProperties=Kw.prototype.N;Kw.prototype.set=Kw.prototype.set;Kw.prototype.setProperties=Kw.prototype.H;Kw.prototype.unset=Kw.prototype.R;Kw.prototype.changed=Kw.prototype.v;Kw.prototype.dispatchEvent=Kw.prototype.b;Kw.prototype.getRevision=Kw.prototype.K;Kw.prototype.on=Kw.prototype.I;
Kw.prototype.once=Kw.prototype.L;Kw.prototype.un=Kw.prototype.J;Kw.prototype.unByKey=Kw.prototype.M;Ow.prototype.setRenderReprojectionEdges=Ow.prototype.Bb;Ow.prototype.setTileGridForProjection=Ow.prototype.Cb;Ow.prototype.getTileLoadFunction=Ow.prototype.fb;Ow.prototype.getTileUrlFunction=Ow.prototype.hb;Ow.prototype.getUrls=Ow.prototype.ib;Ow.prototype.setTileLoadFunction=Ow.prototype.nb;Ow.prototype.setTileUrlFunction=Ow.prototype.Ta;Ow.prototype.setUrl=Ow.prototype.Ya;Ow.prototype.setUrls=Ow.prototype.Ua;
Ow.prototype.getTileGrid=Ow.prototype.Ra;Ow.prototype.refresh=Ow.prototype.ta;Ow.prototype.getAttributions=Ow.prototype.va;Ow.prototype.getLogo=Ow.prototype.ua;Ow.prototype.getProjection=Ow.prototype.wa;Ow.prototype.getState=Ow.prototype.U;Ow.prototype.setAttributions=Ow.prototype.qa;Ow.prototype.get=Ow.prototype.get;Ow.prototype.getKeys=Ow.prototype.O;Ow.prototype.getProperties=Ow.prototype.N;Ow.prototype.set=Ow.prototype.set;Ow.prototype.setProperties=Ow.prototype.H;Ow.prototype.unset=Ow.prototype.R;
Ow.prototype.changed=Ow.prototype.v;Ow.prototype.dispatchEvent=Ow.prototype.b;Ow.prototype.getRevision=Ow.prototype.K;Ow.prototype.on=Ow.prototype.I;Ow.prototype.once=Ow.prototype.L;Ow.prototype.un=Ow.prototype.J;Ow.prototype.unByKey=Ow.prototype.M;mu.prototype.type=mu.prototype.type;mu.prototype.target=mu.prototype.target;mu.prototype.preventDefault=mu.prototype.preventDefault;mu.prototype.stopPropagation=mu.prototype.stopPropagation;Uw.prototype.getTileLoadFunction=Uw.prototype.fb;
Uw.prototype.getTileUrlFunction=Uw.prototype.hb;Uw.prototype.getUrls=Uw.prototype.ib;Uw.prototype.setTileLoadFunction=Uw.prototype.nb;Uw.prototype.setTileUrlFunction=Uw.prototype.Ta;Uw.prototype.setUrl=Uw.prototype.Ya;Uw.prototype.setUrls=Uw.prototype.Ua;Uw.prototype.getTileGrid=Uw.prototype.Ra;Uw.prototype.refresh=Uw.prototype.ta;Uw.prototype.getAttributions=Uw.prototype.va;Uw.prototype.getLogo=Uw.prototype.ua;Uw.prototype.getProjection=Uw.prototype.wa;Uw.prototype.getState=Uw.prototype.U;
Uw.prototype.setAttributions=Uw.prototype.qa;Uw.prototype.get=Uw.prototype.get;Uw.prototype.getKeys=Uw.prototype.O;Uw.prototype.getProperties=Uw.prototype.N;Uw.prototype.set=Uw.prototype.set;Uw.prototype.setProperties=Uw.prototype.H;Uw.prototype.unset=Uw.prototype.R;Uw.prototype.changed=Uw.prototype.v;Uw.prototype.dispatchEvent=Uw.prototype.b;Uw.prototype.getRevision=Uw.prototype.K;Uw.prototype.on=Uw.prototype.I;Uw.prototype.once=Uw.prototype.L;Uw.prototype.un=Uw.prototype.J;
Uw.prototype.unByKey=Uw.prototype.M;Y.prototype.setRenderReprojectionEdges=Y.prototype.Bb;Y.prototype.setTileGridForProjection=Y.prototype.Cb;Y.prototype.getTileLoadFunction=Y.prototype.fb;Y.prototype.getTileUrlFunction=Y.prototype.hb;Y.prototype.getUrls=Y.prototype.ib;Y.prototype.setTileLoadFunction=Y.prototype.nb;Y.prototype.setTileUrlFunction=Y.prototype.Ta;Y.prototype.setUrl=Y.prototype.Ya;Y.prototype.setUrls=Y.prototype.Ua;Y.prototype.getTileGrid=Y.prototype.Ra;Y.prototype.refresh=Y.prototype.ta;
Y.prototype.getAttributions=Y.prototype.va;Y.prototype.getLogo=Y.prototype.ua;Y.prototype.getProjection=Y.prototype.wa;Y.prototype.getState=Y.prototype.U;Y.prototype.setAttributions=Y.prototype.qa;Y.prototype.get=Y.prototype.get;Y.prototype.getKeys=Y.prototype.O;Y.prototype.getProperties=Y.prototype.N;Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.H;Y.prototype.unset=Y.prototype.R;Y.prototype.changed=Y.prototype.v;Y.prototype.dispatchEvent=Y.prototype.b;
Y.prototype.getRevision=Y.prototype.K;Y.prototype.on=Y.prototype.I;Y.prototype.once=Y.prototype.L;Y.prototype.un=Y.prototype.J;Y.prototype.unByKey=Y.prototype.M;$w.prototype.setRenderReprojectionEdges=$w.prototype.Bb;$w.prototype.setTileGridForProjection=$w.prototype.Cb;$w.prototype.getTileLoadFunction=$w.prototype.fb;$w.prototype.getTileUrlFunction=$w.prototype.hb;$w.prototype.getUrls=$w.prototype.ib;$w.prototype.setTileLoadFunction=$w.prototype.nb;$w.prototype.setTileUrlFunction=$w.prototype.Ta;
$w.prototype.setUrl=$w.prototype.Ya;$w.prototype.setUrls=$w.prototype.Ua;$w.prototype.getTileGrid=$w.prototype.Ra;$w.prototype.refresh=$w.prototype.ta;$w.prototype.getAttributions=$w.prototype.va;$w.prototype.getLogo=$w.prototype.ua;$w.prototype.getProjection=$w.prototype.wa;$w.prototype.getState=$w.prototype.U;$w.prototype.setAttributions=$w.prototype.qa;$w.prototype.get=$w.prototype.get;$w.prototype.getKeys=$w.prototype.O;$w.prototype.getProperties=$w.prototype.N;$w.prototype.set=$w.prototype.set;
$w.prototype.setProperties=$w.prototype.H;$w.prototype.unset=$w.prototype.R;$w.prototype.changed=$w.prototype.v;$w.prototype.dispatchEvent=$w.prototype.b;$w.prototype.getRevision=$w.prototype.K;$w.prototype.on=$w.prototype.I;$w.prototype.once=$w.prototype.L;$w.prototype.un=$w.prototype.J;$w.prototype.unByKey=$w.prototype.M;Mv.prototype.getTileCoord=Mv.prototype.i;Mv.prototype.load=Mv.prototype.load;Vi.prototype.changed=Vi.prototype.v;Vi.prototype.dispatchEvent=Vi.prototype.b;
Vi.prototype.getRevision=Vi.prototype.K;Vi.prototype.on=Vi.prototype.I;Vi.prototype.once=Vi.prototype.L;Vi.prototype.un=Vi.prototype.J;Vi.prototype.unByKey=Vi.prototype.M;dl.prototype.changed=dl.prototype.v;dl.prototype.dispatchEvent=dl.prototype.b;dl.prototype.getRevision=dl.prototype.K;dl.prototype.on=dl.prototype.I;dl.prototype.once=dl.prototype.L;dl.prototype.un=dl.prototype.J;dl.prototype.unByKey=dl.prototype.M;gl.prototype.changed=gl.prototype.v;gl.prototype.dispatchEvent=gl.prototype.b;
gl.prototype.getRevision=gl.prototype.K;gl.prototype.on=gl.prototype.I;gl.prototype.once=gl.prototype.L;gl.prototype.un=gl.prototype.J;gl.prototype.unByKey=gl.prototype.M;pl.prototype.changed=pl.prototype.v;pl.prototype.dispatchEvent=pl.prototype.b;pl.prototype.getRevision=pl.prototype.K;pl.prototype.on=pl.prototype.I;pl.prototype.once=pl.prototype.L;pl.prototype.un=pl.prototype.J;pl.prototype.unByKey=pl.prototype.M;rl.prototype.changed=rl.prototype.v;rl.prototype.dispatchEvent=rl.prototype.b;
rl.prototype.getRevision=rl.prototype.K;rl.prototype.on=rl.prototype.I;rl.prototype.once=rl.prototype.L;rl.prototype.un=rl.prototype.J;rl.prototype.unByKey=rl.prototype.M;dj.prototype.changed=dj.prototype.v;dj.prototype.dispatchEvent=dj.prototype.b;dj.prototype.getRevision=dj.prototype.K;dj.prototype.on=dj.prototype.I;dj.prototype.once=dj.prototype.L;dj.prototype.un=dj.prototype.J;dj.prototype.unByKey=dj.prototype.M;gk.prototype.changed=gk.prototype.v;gk.prototype.dispatchEvent=gk.prototype.b;
gk.prototype.getRevision=gk.prototype.K;gk.prototype.on=gk.prototype.I;gk.prototype.once=gk.prototype.L;gk.prototype.un=gk.prototype.J;gk.prototype.unByKey=gk.prototype.M;hk.prototype.changed=hk.prototype.v;hk.prototype.dispatchEvent=hk.prototype.b;hk.prototype.getRevision=hk.prototype.K;hk.prototype.on=hk.prototype.I;hk.prototype.once=hk.prototype.L;hk.prototype.un=hk.prototype.J;hk.prototype.unByKey=hk.prototype.M;jk.prototype.changed=jk.prototype.v;jk.prototype.dispatchEvent=jk.prototype.b;
jk.prototype.getRevision=jk.prototype.K;jk.prototype.on=jk.prototype.I;jk.prototype.once=jk.prototype.L;jk.prototype.un=jk.prototype.J;jk.prototype.unByKey=jk.prototype.M;kk.prototype.changed=kk.prototype.v;kk.prototype.dispatchEvent=kk.prototype.b;kk.prototype.getRevision=kk.prototype.K;kk.prototype.on=kk.prototype.I;kk.prototype.once=kk.prototype.L;kk.prototype.un=kk.prototype.J;kk.prototype.unByKey=kk.prototype.M;Ih.prototype.type=Ih.prototype.type;Ih.prototype.target=Ih.prototype.target;
Ih.prototype.preventDefault=Ih.prototype.preventDefault;Ih.prototype.stopPropagation=Ih.prototype.stopPropagation;Df.prototype.type=Df.prototype.type;Df.prototype.target=Df.prototype.target;Df.prototype.preventDefault=Df.prototype.preventDefault;Df.prototype.stopPropagation=Df.prototype.stopPropagation;vh.prototype.get=vh.prototype.get;vh.prototype.getKeys=vh.prototype.O;vh.prototype.getProperties=vh.prototype.N;vh.prototype.set=vh.prototype.set;vh.prototype.setProperties=vh.prototype.H;
vh.prototype.unset=vh.prototype.R;vh.prototype.changed=vh.prototype.v;vh.prototype.dispatchEvent=vh.prototype.b;vh.prototype.getRevision=vh.prototype.K;vh.prototype.on=vh.prototype.I;vh.prototype.once=vh.prototype.L;vh.prototype.un=vh.prototype.J;vh.prototype.unByKey=vh.prototype.M;xh.prototype.getExtent=xh.prototype.D;xh.prototype.getMaxResolution=xh.prototype.Pb;xh.prototype.getMinResolution=xh.prototype.Qb;xh.prototype.getOpacity=xh.prototype.Rb;xh.prototype.getVisible=xh.prototype.zb;
xh.prototype.getZIndex=xh.prototype.Sb;xh.prototype.setExtent=xh.prototype.fc;xh.prototype.setMaxResolution=xh.prototype.lc;xh.prototype.setMinResolution=xh.prototype.mc;xh.prototype.setOpacity=xh.prototype.gc;xh.prototype.setVisible=xh.prototype.hc;xh.prototype.setZIndex=xh.prototype.ic;xh.prototype.get=xh.prototype.get;xh.prototype.getKeys=xh.prototype.O;xh.prototype.getProperties=xh.prototype.N;xh.prototype.set=xh.prototype.set;xh.prototype.setProperties=xh.prototype.H;xh.prototype.unset=xh.prototype.R;
xh.prototype.changed=xh.prototype.v;xh.prototype.dispatchEvent=xh.prototype.b;xh.prototype.getRevision=xh.prototype.K;xh.prototype.on=xh.prototype.I;xh.prototype.once=xh.prototype.L;xh.prototype.un=xh.prototype.J;xh.prototype.unByKey=xh.prototype.M;Jh.prototype.getExtent=Jh.prototype.D;Jh.prototype.getMaxResolution=Jh.prototype.Pb;Jh.prototype.getMinResolution=Jh.prototype.Qb;Jh.prototype.getOpacity=Jh.prototype.Rb;Jh.prototype.getVisible=Jh.prototype.zb;Jh.prototype.getZIndex=Jh.prototype.Sb;
Jh.prototype.setExtent=Jh.prototype.fc;Jh.prototype.setMaxResolution=Jh.prototype.lc;Jh.prototype.setMinResolution=Jh.prototype.mc;Jh.prototype.setOpacity=Jh.prototype.gc;Jh.prototype.setVisible=Jh.prototype.hc;Jh.prototype.setZIndex=Jh.prototype.ic;Jh.prototype.get=Jh.prototype.get;Jh.prototype.getKeys=Jh.prototype.O;Jh.prototype.getProperties=Jh.prototype.N;Jh.prototype.set=Jh.prototype.set;Jh.prototype.setProperties=Jh.prototype.H;Jh.prototype.unset=Jh.prototype.R;Jh.prototype.changed=Jh.prototype.v;
Jh.prototype.dispatchEvent=Jh.prototype.b;Jh.prototype.getRevision=Jh.prototype.K;Jh.prototype.on=Jh.prototype.I;Jh.prototype.once=Jh.prototype.L;Jh.prototype.un=Jh.prototype.J;Jh.prototype.unByKey=Jh.prototype.M;E.prototype.setMap=E.prototype.setMap;E.prototype.setSource=E.prototype.Ec;E.prototype.getExtent=E.prototype.D;E.prototype.getMaxResolution=E.prototype.Pb;E.prototype.getMinResolution=E.prototype.Qb;E.prototype.getOpacity=E.prototype.Rb;E.prototype.getVisible=E.prototype.zb;
E.prototype.getZIndex=E.prototype.Sb;E.prototype.setExtent=E.prototype.fc;E.prototype.setMaxResolution=E.prototype.lc;E.prototype.setMinResolution=E.prototype.mc;E.prototype.setOpacity=E.prototype.gc;E.prototype.setVisible=E.prototype.hc;E.prototype.setZIndex=E.prototype.ic;E.prototype.get=E.prototype.get;E.prototype.getKeys=E.prototype.O;E.prototype.getProperties=E.prototype.N;E.prototype.set=E.prototype.set;E.prototype.setProperties=E.prototype.H;E.prototype.unset=E.prototype.R;
E.prototype.changed=E.prototype.v;E.prototype.dispatchEvent=E.prototype.b;E.prototype.getRevision=E.prototype.K;E.prototype.on=E.prototype.I;E.prototype.once=E.prototype.L;E.prototype.un=E.prototype.J;E.prototype.unByKey=E.prototype.M;U.prototype.getSource=U.prototype.ga;U.prototype.getStyle=U.prototype.G;U.prototype.getStyleFunction=U.prototype.S;U.prototype.setStyle=U.prototype.l;U.prototype.setMap=U.prototype.setMap;U.prototype.setSource=U.prototype.Ec;U.prototype.getExtent=U.prototype.D;
U.prototype.getMaxResolution=U.prototype.Pb;U.prototype.getMinResolution=U.prototype.Qb;U.prototype.getOpacity=U.prototype.Rb;U.prototype.getVisible=U.prototype.zb;U.prototype.getZIndex=U.prototype.Sb;U.prototype.setExtent=U.prototype.fc;U.prototype.setMaxResolution=U.prototype.lc;U.prototype.setMinResolution=U.prototype.mc;U.prototype.setOpacity=U.prototype.gc;U.prototype.setVisible=U.prototype.hc;U.prototype.setZIndex=U.prototype.ic;U.prototype.get=U.prototype.get;U.prototype.getKeys=U.prototype.O;
U.prototype.getProperties=U.prototype.N;U.prototype.set=U.prototype.set;U.prototype.setProperties=U.prototype.H;U.prototype.unset=U.prototype.R;U.prototype.changed=U.prototype.v;U.prototype.dispatchEvent=U.prototype.b;U.prototype.getRevision=U.prototype.K;U.prototype.on=U.prototype.I;U.prototype.once=U.prototype.L;U.prototype.un=U.prototype.J;U.prototype.unByKey=U.prototype.M;di.prototype.setMap=di.prototype.setMap;di.prototype.setSource=di.prototype.Ec;di.prototype.getExtent=di.prototype.D;
di.prototype.getMaxResolution=di.prototype.Pb;di.prototype.getMinResolution=di.prototype.Qb;di.prototype.getOpacity=di.prototype.Rb;di.prototype.getVisible=di.prototype.zb;di.prototype.getZIndex=di.prototype.Sb;di.prototype.setExtent=di.prototype.fc;di.prototype.setMaxResolution=di.prototype.lc;di.prototype.setMinResolution=di.prototype.mc;di.prototype.setOpacity=di.prototype.gc;di.prototype.setVisible=di.prototype.hc;di.prototype.setZIndex=di.prototype.ic;di.prototype.get=di.prototype.get;
di.prototype.getKeys=di.prototype.O;di.prototype.getProperties=di.prototype.N;di.prototype.set=di.prototype.set;di.prototype.setProperties=di.prototype.H;di.prototype.unset=di.prototype.R;di.prototype.changed=di.prototype.v;di.prototype.dispatchEvent=di.prototype.b;di.prototype.getRevision=di.prototype.K;di.prototype.on=di.prototype.I;di.prototype.once=di.prototype.L;di.prototype.un=di.prototype.J;di.prototype.unByKey=di.prototype.M;D.prototype.setMap=D.prototype.setMap;D.prototype.setSource=D.prototype.Ec;
D.prototype.getExtent=D.prototype.D;D.prototype.getMaxResolution=D.prototype.Pb;D.prototype.getMinResolution=D.prototype.Qb;D.prototype.getOpacity=D.prototype.Rb;D.prototype.getVisible=D.prototype.zb;D.prototype.getZIndex=D.prototype.Sb;D.prototype.setExtent=D.prototype.fc;D.prototype.setMaxResolution=D.prototype.lc;D.prototype.setMinResolution=D.prototype.mc;D.prototype.setOpacity=D.prototype.gc;D.prototype.setVisible=D.prototype.hc;D.prototype.setZIndex=D.prototype.ic;D.prototype.get=D.prototype.get;
D.prototype.getKeys=D.prototype.O;D.prototype.getProperties=D.prototype.N;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.H;D.prototype.unset=D.prototype.R;D.prototype.changed=D.prototype.v;D.prototype.dispatchEvent=D.prototype.b;D.prototype.getRevision=D.prototype.K;D.prototype.on=D.prototype.I;D.prototype.once=D.prototype.L;D.prototype.un=D.prototype.J;D.prototype.unByKey=D.prototype.M;G.prototype.getSource=G.prototype.ga;G.prototype.getStyle=G.prototype.G;
G.prototype.getStyleFunction=G.prototype.S;G.prototype.setStyle=G.prototype.l;G.prototype.setMap=G.prototype.setMap;G.prototype.setSource=G.prototype.Ec;G.prototype.getExtent=G.prototype.D;G.prototype.getMaxResolution=G.prototype.Pb;G.prototype.getMinResolution=G.prototype.Qb;G.prototype.getOpacity=G.prototype.Rb;G.prototype.getVisible=G.prototype.zb;G.prototype.getZIndex=G.prototype.Sb;G.prototype.setExtent=G.prototype.fc;G.prototype.setMaxResolution=G.prototype.lc;G.prototype.setMinResolution=G.prototype.mc;
G.prototype.setOpacity=G.prototype.gc;G.prototype.setVisible=G.prototype.hc;G.prototype.setZIndex=G.prototype.ic;G.prototype.get=G.prototype.get;G.prototype.getKeys=G.prototype.O;G.prototype.getProperties=G.prototype.N;G.prototype.set=G.prototype.set;G.prototype.setProperties=G.prototype.H;G.prototype.unset=G.prototype.R;G.prototype.changed=G.prototype.v;G.prototype.dispatchEvent=G.prototype.b;G.prototype.getRevision=G.prototype.K;G.prototype.on=G.prototype.I;G.prototype.once=G.prototype.L;
G.prototype.un=G.prototype.J;G.prototype.unByKey=G.prototype.M;tg.prototype.get=tg.prototype.get;tg.prototype.getKeys=tg.prototype.O;tg.prototype.getProperties=tg.prototype.N;tg.prototype.set=tg.prototype.set;tg.prototype.setProperties=tg.prototype.H;tg.prototype.unset=tg.prototype.R;tg.prototype.changed=tg.prototype.v;tg.prototype.dispatchEvent=tg.prototype.b;tg.prototype.getRevision=tg.prototype.K;tg.prototype.on=tg.prototype.I;tg.prototype.once=tg.prototype.L;tg.prototype.un=tg.prototype.J;
tg.prototype.unByKey=tg.prototype.M;yg.prototype.getActive=yg.prototype.f;yg.prototype.getMap=yg.prototype.c;yg.prototype.setActive=yg.prototype.Ba;yg.prototype.get=yg.prototype.get;yg.prototype.getKeys=yg.prototype.O;yg.prototype.getProperties=yg.prototype.N;yg.prototype.set=yg.prototype.set;yg.prototype.setProperties=yg.prototype.H;yg.prototype.unset=yg.prototype.R;yg.prototype.changed=yg.prototype.v;yg.prototype.dispatchEvent=yg.prototype.b;yg.prototype.getRevision=yg.prototype.K;
yg.prototype.on=yg.prototype.I;yg.prototype.once=yg.prototype.L;yg.prototype.un=yg.prototype.J;yg.prototype.unByKey=yg.prototype.M;Tt.prototype.getActive=Tt.prototype.f;Tt.prototype.getMap=Tt.prototype.c;Tt.prototype.setActive=Tt.prototype.Ba;Tt.prototype.get=Tt.prototype.get;Tt.prototype.getKeys=Tt.prototype.O;Tt.prototype.getProperties=Tt.prototype.N;Tt.prototype.set=Tt.prototype.set;Tt.prototype.setProperties=Tt.prototype.H;Tt.prototype.unset=Tt.prototype.R;Tt.prototype.changed=Tt.prototype.v;
Tt.prototype.dispatchEvent=Tt.prototype.b;Tt.prototype.getRevision=Tt.prototype.K;Tt.prototype.on=Tt.prototype.I;Tt.prototype.once=Tt.prototype.L;Tt.prototype.un=Tt.prototype.J;Tt.prototype.unByKey=Tt.prototype.M;Wt.prototype.type=Wt.prototype.type;Wt.prototype.target=Wt.prototype.target;Wt.prototype.preventDefault=Wt.prototype.preventDefault;Wt.prototype.stopPropagation=Wt.prototype.stopPropagation;Jg.prototype.getActive=Jg.prototype.f;Jg.prototype.getMap=Jg.prototype.c;Jg.prototype.setActive=Jg.prototype.Ba;
Jg.prototype.get=Jg.prototype.get;Jg.prototype.getKeys=Jg.prototype.O;Jg.prototype.getProperties=Jg.prototype.N;Jg.prototype.set=Jg.prototype.set;Jg.prototype.setProperties=Jg.prototype.H;Jg.prototype.unset=Jg.prototype.R;Jg.prototype.changed=Jg.prototype.v;Jg.prototype.dispatchEvent=Jg.prototype.b;Jg.prototype.getRevision=Jg.prototype.K;Jg.prototype.on=Jg.prototype.I;Jg.prototype.once=Jg.prototype.L;Jg.prototype.un=Jg.prototype.J;Jg.prototype.unByKey=Jg.prototype.M;Xg.prototype.getActive=Xg.prototype.f;
Xg.prototype.getMap=Xg.prototype.c;Xg.prototype.setActive=Xg.prototype.Ba;Xg.prototype.get=Xg.prototype.get;Xg.prototype.getKeys=Xg.prototype.O;Xg.prototype.getProperties=Xg.prototype.N;Xg.prototype.set=Xg.prototype.set;Xg.prototype.setProperties=Xg.prototype.H;Xg.prototype.unset=Xg.prototype.R;Xg.prototype.changed=Xg.prototype.v;Xg.prototype.dispatchEvent=Xg.prototype.b;Xg.prototype.getRevision=Xg.prototype.K;Xg.prototype.on=Xg.prototype.I;Xg.prototype.once=Xg.prototype.L;Xg.prototype.un=Xg.prototype.J;
Xg.prototype.unByKey=Xg.prototype.M;bh.prototype.type=bh.prototype.type;bh.prototype.target=bh.prototype.target;bh.prototype.preventDefault=bh.prototype.preventDefault;bh.prototype.stopPropagation=bh.prototype.stopPropagation;Mg.prototype.getActive=Mg.prototype.f;Mg.prototype.getMap=Mg.prototype.c;Mg.prototype.setActive=Mg.prototype.Ba;Mg.prototype.get=Mg.prototype.get;Mg.prototype.getKeys=Mg.prototype.O;Mg.prototype.getProperties=Mg.prototype.N;Mg.prototype.set=Mg.prototype.set;
Mg.prototype.setProperties=Mg.prototype.H;Mg.prototype.unset=Mg.prototype.R;Mg.prototype.changed=Mg.prototype.v;Mg.prototype.dispatchEvent=Mg.prototype.b;Mg.prototype.getRevision=Mg.prototype.K;Mg.prototype.on=Mg.prototype.I;Mg.prototype.once=Mg.prototype.L;Mg.prototype.un=Mg.prototype.J;Mg.prototype.unByKey=Mg.prototype.M;Qg.prototype.getActive=Qg.prototype.f;Qg.prototype.getMap=Qg.prototype.c;Qg.prototype.setActive=Qg.prototype.Ba;Qg.prototype.get=Qg.prototype.get;Qg.prototype.getKeys=Qg.prototype.O;
Qg.prototype.getProperties=Qg.prototype.N;Qg.prototype.set=Qg.prototype.set;Qg.prototype.setProperties=Qg.prototype.H;Qg.prototype.unset=Qg.prototype.R;Qg.prototype.changed=Qg.prototype.v;Qg.prototype.dispatchEvent=Qg.prototype.b;Qg.prototype.getRevision=Qg.prototype.K;Qg.prototype.on=Qg.prototype.I;Qg.prototype.once=Qg.prototype.L;Qg.prototype.un=Qg.prototype.J;Qg.prototype.unByKey=Qg.prototype.M;Yt.prototype.getActive=Yt.prototype.f;Yt.prototype.getMap=Yt.prototype.c;Yt.prototype.setActive=Yt.prototype.Ba;
Yt.prototype.get=Yt.prototype.get;Yt.prototype.getKeys=Yt.prototype.O;Yt.prototype.getProperties=Yt.prototype.N;Yt.prototype.set=Yt.prototype.set;Yt.prototype.setProperties=Yt.prototype.H;Yt.prototype.unset=Yt.prototype.R;Yt.prototype.changed=Yt.prototype.v;Yt.prototype.dispatchEvent=Yt.prototype.b;Yt.prototype.getRevision=Yt.prototype.K;Yt.prototype.on=Yt.prototype.I;Yt.prototype.once=Yt.prototype.L;Yt.prototype.un=Yt.prototype.J;Yt.prototype.unByKey=Yt.prototype.M;fh.prototype.getGeometry=fh.prototype.V;
fh.prototype.getActive=fh.prototype.f;fh.prototype.getMap=fh.prototype.c;fh.prototype.setActive=fh.prototype.Ba;fh.prototype.get=fh.prototype.get;fh.prototype.getKeys=fh.prototype.O;fh.prototype.getProperties=fh.prototype.N;fh.prototype.set=fh.prototype.set;fh.prototype.setProperties=fh.prototype.H;fh.prototype.unset=fh.prototype.R;fh.prototype.changed=fh.prototype.v;fh.prototype.dispatchEvent=fh.prototype.b;fh.prototype.getRevision=fh.prototype.K;fh.prototype.on=fh.prototype.I;
fh.prototype.once=fh.prototype.L;fh.prototype.un=fh.prototype.J;fh.prototype.unByKey=fh.prototype.M;tu.prototype.getActive=tu.prototype.f;tu.prototype.getMap=tu.prototype.c;tu.prototype.setActive=tu.prototype.Ba;tu.prototype.get=tu.prototype.get;tu.prototype.getKeys=tu.prototype.O;tu.prototype.getProperties=tu.prototype.N;tu.prototype.set=tu.prototype.set;tu.prototype.setProperties=tu.prototype.H;tu.prototype.unset=tu.prototype.R;tu.prototype.changed=tu.prototype.v;tu.prototype.dispatchEvent=tu.prototype.b;
tu.prototype.getRevision=tu.prototype.K;tu.prototype.on=tu.prototype.I;tu.prototype.once=tu.prototype.L;tu.prototype.un=tu.prototype.J;tu.prototype.unByKey=tu.prototype.M;Iu.prototype.type=Iu.prototype.type;Iu.prototype.target=Iu.prototype.target;Iu.prototype.preventDefault=Iu.prototype.preventDefault;Iu.prototype.stopPropagation=Iu.prototype.stopPropagation;Mu.prototype.getActive=Mu.prototype.f;Mu.prototype.getMap=Mu.prototype.c;Mu.prototype.setActive=Mu.prototype.Ba;Mu.prototype.get=Mu.prototype.get;
Mu.prototype.getKeys=Mu.prototype.O;Mu.prototype.getProperties=Mu.prototype.N;Mu.prototype.set=Mu.prototype.set;Mu.prototype.setProperties=Mu.prototype.H;Mu.prototype.unset=Mu.prototype.R;Mu.prototype.changed=Mu.prototype.v;Mu.prototype.dispatchEvent=Mu.prototype.b;Mu.prototype.getRevision=Mu.prototype.K;Mu.prototype.on=Mu.prototype.I;Mu.prototype.once=Mu.prototype.L;Mu.prototype.un=Mu.prototype.J;Mu.prototype.unByKey=Mu.prototype.M;Xu.prototype.type=Xu.prototype.type;Xu.prototype.target=Xu.prototype.target;
Xu.prototype.preventDefault=Xu.prototype.preventDefault;Xu.prototype.stopPropagation=Xu.prototype.stopPropagation;gh.prototype.getActive=gh.prototype.f;gh.prototype.getMap=gh.prototype.c;gh.prototype.setActive=gh.prototype.Ba;gh.prototype.get=gh.prototype.get;gh.prototype.getKeys=gh.prototype.O;gh.prototype.getProperties=gh.prototype.N;gh.prototype.set=gh.prototype.set;gh.prototype.setProperties=gh.prototype.H;gh.prototype.unset=gh.prototype.R;gh.prototype.changed=gh.prototype.v;
gh.prototype.dispatchEvent=gh.prototype.b;gh.prototype.getRevision=gh.prototype.K;gh.prototype.on=gh.prototype.I;gh.prototype.once=gh.prototype.L;gh.prototype.un=gh.prototype.J;gh.prototype.unByKey=gh.prototype.M;ih.prototype.getActive=ih.prototype.f;ih.prototype.getMap=ih.prototype.c;ih.prototype.setActive=ih.prototype.Ba;ih.prototype.get=ih.prototype.get;ih.prototype.getKeys=ih.prototype.O;ih.prototype.getProperties=ih.prototype.N;ih.prototype.set=ih.prototype.set;ih.prototype.setProperties=ih.prototype.H;
ih.prototype.unset=ih.prototype.R;ih.prototype.changed=ih.prototype.v;ih.prototype.dispatchEvent=ih.prototype.b;ih.prototype.getRevision=ih.prototype.K;ih.prototype.on=ih.prototype.I;ih.prototype.once=ih.prototype.L;ih.prototype.un=ih.prototype.J;ih.prototype.unByKey=ih.prototype.M;Zu.prototype.getActive=Zu.prototype.f;Zu.prototype.getMap=Zu.prototype.c;Zu.prototype.setActive=Zu.prototype.Ba;Zu.prototype.get=Zu.prototype.get;Zu.prototype.getKeys=Zu.prototype.O;Zu.prototype.getProperties=Zu.prototype.N;
Zu.prototype.set=Zu.prototype.set;Zu.prototype.setProperties=Zu.prototype.H;Zu.prototype.unset=Zu.prototype.R;Zu.prototype.changed=Zu.prototype.v;Zu.prototype.dispatchEvent=Zu.prototype.b;Zu.prototype.getRevision=Zu.prototype.K;Zu.prototype.on=Zu.prototype.I;Zu.prototype.once=Zu.prototype.L;Zu.prototype.un=Zu.prototype.J;Zu.prototype.unByKey=Zu.prototype.M;gv.prototype.type=gv.prototype.type;gv.prototype.target=gv.prototype.target;gv.prototype.preventDefault=gv.prototype.preventDefault;
gv.prototype.stopPropagation=gv.prototype.stopPropagation;kh.prototype.getActive=kh.prototype.f;kh.prototype.getMap=kh.prototype.c;kh.prototype.setActive=kh.prototype.Ba;kh.prototype.get=kh.prototype.get;kh.prototype.getKeys=kh.prototype.O;kh.prototype.getProperties=kh.prototype.N;kh.prototype.set=kh.prototype.set;kh.prototype.setProperties=kh.prototype.H;kh.prototype.unset=kh.prototype.R;kh.prototype.changed=kh.prototype.v;kh.prototype.dispatchEvent=kh.prototype.b;kh.prototype.getRevision=kh.prototype.K;
kh.prototype.on=kh.prototype.I;kh.prototype.once=kh.prototype.L;kh.prototype.un=kh.prototype.J;kh.prototype.unByKey=kh.prototype.M;mh.prototype.getActive=mh.prototype.f;mh.prototype.getMap=mh.prototype.c;mh.prototype.setActive=mh.prototype.Ba;mh.prototype.get=mh.prototype.get;mh.prototype.getKeys=mh.prototype.O;mh.prototype.getProperties=mh.prototype.N;mh.prototype.set=mh.prototype.set;mh.prototype.setProperties=mh.prototype.H;mh.prototype.unset=mh.prototype.R;mh.prototype.changed=mh.prototype.v;
mh.prototype.dispatchEvent=mh.prototype.b;mh.prototype.getRevision=mh.prototype.K;mh.prototype.on=mh.prototype.I;mh.prototype.once=mh.prototype.L;mh.prototype.un=mh.prototype.J;mh.prototype.unByKey=mh.prototype.M;qh.prototype.getActive=qh.prototype.f;qh.prototype.getMap=qh.prototype.c;qh.prototype.setActive=qh.prototype.Ba;qh.prototype.get=qh.prototype.get;qh.prototype.getKeys=qh.prototype.O;qh.prototype.getProperties=qh.prototype.N;qh.prototype.set=qh.prototype.set;qh.prototype.setProperties=qh.prototype.H;
qh.prototype.unset=qh.prototype.R;qh.prototype.changed=qh.prototype.v;qh.prototype.dispatchEvent=qh.prototype.b;qh.prototype.getRevision=qh.prototype.K;qh.prototype.on=qh.prototype.I;qh.prototype.once=qh.prototype.L;qh.prototype.un=qh.prototype.J;qh.prototype.unByKey=qh.prototype.M;ov.prototype.getActive=ov.prototype.f;ov.prototype.getMap=ov.prototype.c;ov.prototype.setActive=ov.prototype.Ba;ov.prototype.get=ov.prototype.get;ov.prototype.getKeys=ov.prototype.O;ov.prototype.getProperties=ov.prototype.N;
ov.prototype.set=ov.prototype.set;ov.prototype.setProperties=ov.prototype.H;ov.prototype.unset=ov.prototype.R;ov.prototype.changed=ov.prototype.v;ov.prototype.dispatchEvent=ov.prototype.b;ov.prototype.getRevision=ov.prototype.K;ov.prototype.on=ov.prototype.I;ov.prototype.once=ov.prototype.L;ov.prototype.un=ov.prototype.J;ov.prototype.unByKey=ov.prototype.M;rv.prototype.type=rv.prototype.type;rv.prototype.target=rv.prototype.target;rv.prototype.preventDefault=rv.prototype.preventDefault;
rv.prototype.stopPropagation=rv.prototype.stopPropagation;tv.prototype.getActive=tv.prototype.f;tv.prototype.getMap=tv.prototype.c;tv.prototype.setActive=tv.prototype.Ba;tv.prototype.get=tv.prototype.get;tv.prototype.getKeys=tv.prototype.O;tv.prototype.getProperties=tv.prototype.N;tv.prototype.set=tv.prototype.set;tv.prototype.setProperties=tv.prototype.H;tv.prototype.unset=tv.prototype.R;tv.prototype.changed=tv.prototype.v;tv.prototype.dispatchEvent=tv.prototype.b;tv.prototype.getRevision=tv.prototype.K;
tv.prototype.on=tv.prototype.I;tv.prototype.once=tv.prototype.L;tv.prototype.un=tv.prototype.J;tv.prototype.unByKey=tv.prototype.M;xv.prototype.getActive=xv.prototype.f;xv.prototype.getMap=xv.prototype.c;xv.prototype.setActive=xv.prototype.Ba;xv.prototype.get=xv.prototype.get;xv.prototype.getKeys=xv.prototype.O;xv.prototype.getProperties=xv.prototype.N;xv.prototype.set=xv.prototype.set;xv.prototype.setProperties=xv.prototype.H;xv.prototype.unset=xv.prototype.R;xv.prototype.changed=xv.prototype.v;
xv.prototype.dispatchEvent=xv.prototype.b;xv.prototype.getRevision=xv.prototype.K;xv.prototype.on=xv.prototype.I;xv.prototype.once=xv.prototype.L;xv.prototype.un=xv.prototype.J;xv.prototype.unByKey=xv.prototype.M;Dv.prototype.type=Dv.prototype.type;Dv.prototype.target=Dv.prototype.target;Dv.prototype.preventDefault=Dv.prototype.preventDefault;Dv.prototype.stopPropagation=Dv.prototype.stopPropagation;Mc.prototype.get=Mc.prototype.get;Mc.prototype.getKeys=Mc.prototype.O;Mc.prototype.getProperties=Mc.prototype.N;
Mc.prototype.set=Mc.prototype.set;Mc.prototype.setProperties=Mc.prototype.H;Mc.prototype.unset=Mc.prototype.R;Mc.prototype.changed=Mc.prototype.v;Mc.prototype.dispatchEvent=Mc.prototype.b;Mc.prototype.getRevision=Mc.prototype.K;Mc.prototype.on=Mc.prototype.I;Mc.prototype.once=Mc.prototype.L;Mc.prototype.un=Mc.prototype.J;Mc.prototype.unByKey=Mc.prototype.M;Oc.prototype.getClosestPoint=Oc.prototype.xb;Oc.prototype.intersectsCoordinate=Oc.prototype.jb;Oc.prototype.getExtent=Oc.prototype.D;
Oc.prototype.rotate=Oc.prototype.rotate;Oc.prototype.scale=Oc.prototype.scale;Oc.prototype.simplify=Oc.prototype.Db;Oc.prototype.transform=Oc.prototype.lb;Oc.prototype.get=Oc.prototype.get;Oc.prototype.getKeys=Oc.prototype.O;Oc.prototype.getProperties=Oc.prototype.N;Oc.prototype.set=Oc.prototype.set;Oc.prototype.setProperties=Oc.prototype.H;Oc.prototype.unset=Oc.prototype.R;Oc.prototype.changed=Oc.prototype.v;Oc.prototype.dispatchEvent=Oc.prototype.b;Oc.prototype.getRevision=Oc.prototype.K;
Oc.prototype.on=Oc.prototype.I;Oc.prototype.once=Oc.prototype.L;Oc.prototype.un=Oc.prototype.J;Oc.prototype.unByKey=Oc.prototype.M;Ht.prototype.getFirstCoordinate=Ht.prototype.Lb;Ht.prototype.getLastCoordinate=Ht.prototype.Mb;Ht.prototype.getLayout=Ht.prototype.Nb;Ht.prototype.rotate=Ht.prototype.rotate;Ht.prototype.scale=Ht.prototype.scale;Ht.prototype.getClosestPoint=Ht.prototype.xb;Ht.prototype.intersectsCoordinate=Ht.prototype.jb;Ht.prototype.getExtent=Ht.prototype.D;Ht.prototype.simplify=Ht.prototype.Db;
Ht.prototype.get=Ht.prototype.get;Ht.prototype.getKeys=Ht.prototype.O;Ht.prototype.getProperties=Ht.prototype.N;Ht.prototype.set=Ht.prototype.set;Ht.prototype.setProperties=Ht.prototype.H;Ht.prototype.unset=Ht.prototype.R;Ht.prototype.changed=Ht.prototype.v;Ht.prototype.dispatchEvent=Ht.prototype.b;Ht.prototype.getRevision=Ht.prototype.K;Ht.prototype.on=Ht.prototype.I;Ht.prototype.once=Ht.prototype.L;Ht.prototype.un=Ht.prototype.J;Ht.prototype.unByKey=Ht.prototype.M;Gn.prototype.getClosestPoint=Gn.prototype.xb;
Gn.prototype.intersectsCoordinate=Gn.prototype.jb;Gn.prototype.getExtent=Gn.prototype.D;Gn.prototype.rotate=Gn.prototype.rotate;Gn.prototype.scale=Gn.prototype.scale;Gn.prototype.simplify=Gn.prototype.Db;Gn.prototype.transform=Gn.prototype.lb;Gn.prototype.get=Gn.prototype.get;Gn.prototype.getKeys=Gn.prototype.O;Gn.prototype.getProperties=Gn.prototype.N;Gn.prototype.set=Gn.prototype.set;Gn.prototype.setProperties=Gn.prototype.H;Gn.prototype.unset=Gn.prototype.R;Gn.prototype.changed=Gn.prototype.v;
Gn.prototype.dispatchEvent=Gn.prototype.b;Gn.prototype.getRevision=Gn.prototype.K;Gn.prototype.on=Gn.prototype.I;Gn.prototype.once=Gn.prototype.L;Gn.prototype.un=Gn.prototype.J;Gn.prototype.unByKey=Gn.prototype.M;gd.prototype.getFirstCoordinate=gd.prototype.Lb;gd.prototype.getLastCoordinate=gd.prototype.Mb;gd.prototype.getLayout=gd.prototype.Nb;gd.prototype.rotate=gd.prototype.rotate;gd.prototype.scale=gd.prototype.scale;gd.prototype.getClosestPoint=gd.prototype.xb;
gd.prototype.intersectsCoordinate=gd.prototype.jb;gd.prototype.getExtent=gd.prototype.D;gd.prototype.simplify=gd.prototype.Db;gd.prototype.transform=gd.prototype.lb;gd.prototype.get=gd.prototype.get;gd.prototype.getKeys=gd.prototype.O;gd.prototype.getProperties=gd.prototype.N;gd.prototype.set=gd.prototype.set;gd.prototype.setProperties=gd.prototype.H;gd.prototype.unset=gd.prototype.R;gd.prototype.changed=gd.prototype.v;gd.prototype.dispatchEvent=gd.prototype.b;gd.prototype.getRevision=gd.prototype.K;
gd.prototype.on=gd.prototype.I;gd.prototype.once=gd.prototype.L;gd.prototype.un=gd.prototype.J;gd.prototype.unByKey=gd.prototype.M;O.prototype.getFirstCoordinate=O.prototype.Lb;O.prototype.getLastCoordinate=O.prototype.Mb;O.prototype.getLayout=O.prototype.Nb;O.prototype.rotate=O.prototype.rotate;O.prototype.scale=O.prototype.scale;O.prototype.getClosestPoint=O.prototype.xb;O.prototype.intersectsCoordinate=O.prototype.jb;O.prototype.getExtent=O.prototype.D;O.prototype.simplify=O.prototype.Db;
O.prototype.transform=O.prototype.lb;O.prototype.get=O.prototype.get;O.prototype.getKeys=O.prototype.O;O.prototype.getProperties=O.prototype.N;O.prototype.set=O.prototype.set;O.prototype.setProperties=O.prototype.H;O.prototype.unset=O.prototype.R;O.prototype.changed=O.prototype.v;O.prototype.dispatchEvent=O.prototype.b;O.prototype.getRevision=O.prototype.K;O.prototype.on=O.prototype.I;O.prototype.once=O.prototype.L;O.prototype.un=O.prototype.J;O.prototype.unByKey=O.prototype.M;
P.prototype.getFirstCoordinate=P.prototype.Lb;P.prototype.getLastCoordinate=P.prototype.Mb;P.prototype.getLayout=P.prototype.Nb;P.prototype.rotate=P.prototype.rotate;P.prototype.scale=P.prototype.scale;P.prototype.getClosestPoint=P.prototype.xb;P.prototype.intersectsCoordinate=P.prototype.jb;P.prototype.getExtent=P.prototype.D;P.prototype.simplify=P.prototype.Db;P.prototype.transform=P.prototype.lb;P.prototype.get=P.prototype.get;P.prototype.getKeys=P.prototype.O;P.prototype.getProperties=P.prototype.N;
P.prototype.set=P.prototype.set;P.prototype.setProperties=P.prototype.H;P.prototype.unset=P.prototype.R;P.prototype.changed=P.prototype.v;P.prototype.dispatchEvent=P.prototype.b;P.prototype.getRevision=P.prototype.K;P.prototype.on=P.prototype.I;P.prototype.once=P.prototype.L;P.prototype.un=P.prototype.J;P.prototype.unByKey=P.prototype.M;Q.prototype.getFirstCoordinate=Q.prototype.Lb;Q.prototype.getLastCoordinate=Q.prototype.Mb;Q.prototype.getLayout=Q.prototype.Nb;Q.prototype.rotate=Q.prototype.rotate;
Q.prototype.scale=Q.prototype.scale;Q.prototype.getClosestPoint=Q.prototype.xb;Q.prototype.intersectsCoordinate=Q.prototype.jb;Q.prototype.getExtent=Q.prototype.D;Q.prototype.simplify=Q.prototype.Db;Q.prototype.transform=Q.prototype.lb;Q.prototype.get=Q.prototype.get;Q.prototype.getKeys=Q.prototype.O;Q.prototype.getProperties=Q.prototype.N;Q.prototype.set=Q.prototype.set;Q.prototype.setProperties=Q.prototype.H;Q.prototype.unset=Q.prototype.R;Q.prototype.changed=Q.prototype.v;
Q.prototype.dispatchEvent=Q.prototype.b;Q.prototype.getRevision=Q.prototype.K;Q.prototype.on=Q.prototype.I;Q.prototype.once=Q.prototype.L;Q.prototype.un=Q.prototype.J;Q.prototype.unByKey=Q.prototype.M;R.prototype.getFirstCoordinate=R.prototype.Lb;R.prototype.getLastCoordinate=R.prototype.Mb;R.prototype.getLayout=R.prototype.Nb;R.prototype.rotate=R.prototype.rotate;R.prototype.scale=R.prototype.scale;R.prototype.getClosestPoint=R.prototype.xb;R.prototype.intersectsCoordinate=R.prototype.jb;
R.prototype.getExtent=R.prototype.D;R.prototype.simplify=R.prototype.Db;R.prototype.transform=R.prototype.lb;R.prototype.get=R.prototype.get;R.prototype.getKeys=R.prototype.O;R.prototype.getProperties=R.prototype.N;R.prototype.set=R.prototype.set;R.prototype.setProperties=R.prototype.H;R.prototype.unset=R.prototype.R;R.prototype.changed=R.prototype.v;R.prototype.dispatchEvent=R.prototype.b;R.prototype.getRevision=R.prototype.K;R.prototype.on=R.prototype.I;R.prototype.once=R.prototype.L;
R.prototype.un=R.prototype.J;R.prototype.unByKey=R.prototype.M;A.prototype.getFirstCoordinate=A.prototype.Lb;A.prototype.getLastCoordinate=A.prototype.Mb;A.prototype.getLayout=A.prototype.Nb;A.prototype.rotate=A.prototype.rotate;A.prototype.scale=A.prototype.scale;A.prototype.getClosestPoint=A.prototype.xb;A.prototype.intersectsCoordinate=A.prototype.jb;A.prototype.getExtent=A.prototype.D;A.prototype.simplify=A.prototype.Db;A.prototype.transform=A.prototype.lb;A.prototype.get=A.prototype.get;
A.prototype.getKeys=A.prototype.O;A.prototype.getProperties=A.prototype.N;A.prototype.set=A.prototype.set;A.prototype.setProperties=A.prototype.H;A.prototype.unset=A.prototype.R;A.prototype.changed=A.prototype.v;A.prototype.dispatchEvent=A.prototype.b;A.prototype.getRevision=A.prototype.K;A.prototype.on=A.prototype.I;A.prototype.once=A.prototype.L;A.prototype.un=A.prototype.J;A.prototype.unByKey=A.prototype.M;B.prototype.getFirstCoordinate=B.prototype.Lb;B.prototype.getLastCoordinate=B.prototype.Mb;
B.prototype.getLayout=B.prototype.Nb;B.prototype.rotate=B.prototype.rotate;B.prototype.scale=B.prototype.scale;B.prototype.getClosestPoint=B.prototype.xb;B.prototype.intersectsCoordinate=B.prototype.jb;B.prototype.getExtent=B.prototype.D;B.prototype.simplify=B.prototype.Db;B.prototype.transform=B.prototype.lb;B.prototype.get=B.prototype.get;B.prototype.getKeys=B.prototype.O;B.prototype.getProperties=B.prototype.N;B.prototype.set=B.prototype.set;B.prototype.setProperties=B.prototype.H;
B.prototype.unset=B.prototype.R;B.prototype.changed=B.prototype.v;B.prototype.dispatchEvent=B.prototype.b;B.prototype.getRevision=B.prototype.K;B.prototype.on=B.prototype.I;B.prototype.once=B.prototype.L;B.prototype.un=B.prototype.J;B.prototype.unByKey=B.prototype.M;go.prototype.readFeatures=go.prototype.Ha;po.prototype.readFeatures=po.prototype.Ha;go.prototype.readFeatures=go.prototype.Ha;He.prototype.get=He.prototype.get;He.prototype.getKeys=He.prototype.O;He.prototype.getProperties=He.prototype.N;
He.prototype.set=He.prototype.set;He.prototype.setProperties=He.prototype.H;He.prototype.unset=He.prototype.R;He.prototype.changed=He.prototype.v;He.prototype.dispatchEvent=He.prototype.b;He.prototype.getRevision=He.prototype.K;He.prototype.on=He.prototype.I;He.prototype.once=He.prototype.L;He.prototype.un=He.prototype.J;He.prototype.unByKey=He.prototype.M;Ie.prototype.getMap=Ie.prototype.i;Ie.prototype.setMap=Ie.prototype.setMap;Ie.prototype.setTarget=Ie.prototype.c;Ie.prototype.get=Ie.prototype.get;
Ie.prototype.getKeys=Ie.prototype.O;Ie.prototype.getProperties=Ie.prototype.N;Ie.prototype.set=Ie.prototype.set;Ie.prototype.setProperties=Ie.prototype.H;Ie.prototype.unset=Ie.prototype.R;Ie.prototype.changed=Ie.prototype.v;Ie.prototype.dispatchEvent=Ie.prototype.b;Ie.prototype.getRevision=Ie.prototype.K;Ie.prototype.on=Ie.prototype.I;Ie.prototype.once=Ie.prototype.L;Ie.prototype.un=Ie.prototype.J;Ie.prototype.unByKey=Ie.prototype.M;Le.prototype.getMap=Le.prototype.i;Le.prototype.setMap=Le.prototype.setMap;
Le.prototype.setTarget=Le.prototype.c;Le.prototype.get=Le.prototype.get;Le.prototype.getKeys=Le.prototype.O;Le.prototype.getProperties=Le.prototype.N;Le.prototype.set=Le.prototype.set;Le.prototype.setProperties=Le.prototype.H;Le.prototype.unset=Le.prototype.R;Le.prototype.changed=Le.prototype.v;Le.prototype.dispatchEvent=Le.prototype.b;Le.prototype.getRevision=Le.prototype.K;Le.prototype.on=Le.prototype.I;Le.prototype.once=Le.prototype.L;Le.prototype.un=Le.prototype.J;Le.prototype.unByKey=Le.prototype.M;
Ue.prototype.getMap=Ue.prototype.i;Ue.prototype.setMap=Ue.prototype.setMap;Ue.prototype.setTarget=Ue.prototype.c;Ue.prototype.get=Ue.prototype.get;Ue.prototype.getKeys=Ue.prototype.O;Ue.prototype.getProperties=Ue.prototype.N;Ue.prototype.set=Ue.prototype.set;Ue.prototype.setProperties=Ue.prototype.H;Ue.prototype.unset=Ue.prototype.R;Ue.prototype.changed=Ue.prototype.v;Ue.prototype.dispatchEvent=Ue.prototype.b;Ue.prototype.getRevision=Ue.prototype.K;Ue.prototype.on=Ue.prototype.I;
Ue.prototype.once=Ue.prototype.L;Ue.prototype.un=Ue.prototype.J;Ue.prototype.unByKey=Ue.prototype.M;Ul.prototype.getMap=Ul.prototype.i;Ul.prototype.setMap=Ul.prototype.setMap;Ul.prototype.setTarget=Ul.prototype.c;Ul.prototype.get=Ul.prototype.get;Ul.prototype.getKeys=Ul.prototype.O;Ul.prototype.getProperties=Ul.prototype.N;Ul.prototype.set=Ul.prototype.set;Ul.prototype.setProperties=Ul.prototype.H;Ul.prototype.unset=Ul.prototype.R;Ul.prototype.changed=Ul.prototype.v;Ul.prototype.dispatchEvent=Ul.prototype.b;
Ul.prototype.getRevision=Ul.prototype.K;Ul.prototype.on=Ul.prototype.I;Ul.prototype.once=Ul.prototype.L;Ul.prototype.un=Ul.prototype.J;Ul.prototype.unByKey=Ul.prototype.M;Qe.prototype.getMap=Qe.prototype.i;Qe.prototype.setMap=Qe.prototype.setMap;Qe.prototype.setTarget=Qe.prototype.c;Qe.prototype.get=Qe.prototype.get;Qe.prototype.getKeys=Qe.prototype.O;Qe.prototype.getProperties=Qe.prototype.N;Qe.prototype.set=Qe.prototype.set;Qe.prototype.setProperties=Qe.prototype.H;Qe.prototype.unset=Qe.prototype.R;
Qe.prototype.changed=Qe.prototype.v;Qe.prototype.dispatchEvent=Qe.prototype.b;Qe.prototype.getRevision=Qe.prototype.K;Qe.prototype.on=Qe.prototype.I;Qe.prototype.once=Qe.prototype.L;Qe.prototype.un=Qe.prototype.J;Qe.prototype.unByKey=Qe.prototype.M;Zl.prototype.getMap=Zl.prototype.i;Zl.prototype.setMap=Zl.prototype.setMap;Zl.prototype.setTarget=Zl.prototype.c;Zl.prototype.get=Zl.prototype.get;Zl.prototype.getKeys=Zl.prototype.O;Zl.prototype.getProperties=Zl.prototype.N;Zl.prototype.set=Zl.prototype.set;
Zl.prototype.setProperties=Zl.prototype.H;Zl.prototype.unset=Zl.prototype.R;Zl.prototype.changed=Zl.prototype.v;Zl.prototype.dispatchEvent=Zl.prototype.b;Zl.prototype.getRevision=Zl.prototype.K;Zl.prototype.on=Zl.prototype.I;Zl.prototype.once=Zl.prototype.L;Zl.prototype.un=Zl.prototype.J;Zl.prototype.unByKey=Zl.prototype.M;Se.prototype.getMap=Se.prototype.i;Se.prototype.setMap=Se.prototype.setMap;Se.prototype.setTarget=Se.prototype.c;Se.prototype.get=Se.prototype.get;Se.prototype.getKeys=Se.prototype.O;
Se.prototype.getProperties=Se.prototype.N;Se.prototype.set=Se.prototype.set;Se.prototype.setProperties=Se.prototype.H;Se.prototype.unset=Se.prototype.R;Se.prototype.changed=Se.prototype.v;Se.prototype.dispatchEvent=Se.prototype.b;Se.prototype.getRevision=Se.prototype.K;Se.prototype.on=Se.prototype.I;Se.prototype.once=Se.prototype.L;Se.prototype.un=Se.prototype.J;Se.prototype.unByKey=Se.prototype.M;im.prototype.getMap=im.prototype.i;im.prototype.setMap=im.prototype.setMap;im.prototype.setTarget=im.prototype.c;
im.prototype.get=im.prototype.get;im.prototype.getKeys=im.prototype.O;im.prototype.getProperties=im.prototype.N;im.prototype.set=im.prototype.set;im.prototype.setProperties=im.prototype.H;im.prototype.unset=im.prototype.R;im.prototype.changed=im.prototype.v;im.prototype.dispatchEvent=im.prototype.b;im.prototype.getRevision=im.prototype.K;im.prototype.on=im.prototype.I;im.prototype.once=im.prototype.L;im.prototype.un=im.prototype.J;im.prototype.unByKey=im.prototype.M;nm.prototype.getMap=nm.prototype.i;
nm.prototype.setMap=nm.prototype.setMap;nm.prototype.setTarget=nm.prototype.c;nm.prototype.get=nm.prototype.get;nm.prototype.getKeys=nm.prototype.O;nm.prototype.getProperties=nm.prototype.N;nm.prototype.set=nm.prototype.set;nm.prototype.setProperties=nm.prototype.H;nm.prototype.unset=nm.prototype.R;nm.prototype.changed=nm.prototype.v;nm.prototype.dispatchEvent=nm.prototype.b;nm.prototype.getRevision=nm.prototype.K;nm.prototype.on=nm.prototype.I;nm.prototype.once=nm.prototype.L;nm.prototype.un=nm.prototype.J;
nm.prototype.unByKey=nm.prototype.M;
  return OPENLAYERS.ol;
}));

