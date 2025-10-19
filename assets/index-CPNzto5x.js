(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Oa(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Te={},Es=[],qt=()=>{},ah=()=>!1,ji=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Na=t=>t.startsWith("onUpdate:"),Ge=Object.assign,ka=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Cp=Object.prototype.hasOwnProperty,Ee=(t,e)=>Cp.call(t,e),se=Array.isArray,vs=t=>Hi(t)==="[object Map]",ch=t=>Hi(t)==="[object Set]",ie=t=>typeof t=="function",$e=t=>typeof t=="string",Ln=t=>typeof t=="symbol",Pe=t=>t!==null&&typeof t=="object",lh=t=>(Pe(t)||ie(t))&&ie(t.then)&&ie(t.catch),uh=Object.prototype.toString,Hi=t=>uh.call(t),Pp=t=>Hi(t).slice(8,-1),hh=t=>Hi(t)==="[object Object]",Da=t=>$e(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,ar=Oa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),$i=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Op=/-\w/g,Rt=$i(t=>t.replace(Op,e=>e.slice(1).toUpperCase())),Np=/\B([A-Z])/g,cs=$i(t=>t.replace(Np,"-$1").toLowerCase()),Wi=$i(t=>t.charAt(0).toUpperCase()+t.slice(1)),To=$i(t=>t?`on${Wi(t)}`:""),Cn=(t,e)=>!Object.is(t,e),li=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},fh=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Qo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let il;const Gi=()=>il||(il=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function xa(t){if(se(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=$e(s)?Lp(s):xa(s);if(r)for(const o in r)e[o]=r[o]}return e}else if($e(t)||Pe(t))return t}const kp=/;(?![^(]*\))/g,Dp=/:([^]+)/,xp=/\/\*[^]*?\*\//g;function Lp(t){const e={};return t.replace(xp,"").split(kp).forEach(n=>{if(n){const s=n.split(Dp);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function La(t){let e="";if($e(t))e=t;else if(se(t))for(let n=0;n<t.length;n++){const s=La(t[n]);s&&(e+=s+" ")}else if(Pe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Mp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Up=Oa(Mp);function dh(t){return!!t||t===""}const ph=t=>!!(t&&t.__v_isRef===!0),ze=t=>$e(t)?t:t==null?"":se(t)||Pe(t)&&(t.toString===uh||!ie(t.toString))?ph(t)?ze(t.value):JSON.stringify(t,gh,2):String(t),gh=(t,e)=>ph(e)?gh(t,e.value):vs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],o)=>(n[So(s,o)+" =>"]=r,n),{})}:ch(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>So(n))}:Ln(e)?So(e):Pe(e)&&!se(e)&&!hh(e)?String(e):e,So=(t,e="")=>{var n;return Ln(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let dt;class Fp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=dt,!e&&dt&&(this.index=(dt.scopes||(dt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=dt;try{return dt=this,e()}finally{dt=n}}}on(){++this._on===1&&(this.prevScope=dt,dt=this)}off(){this._on>0&&--this._on===0&&(dt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Vp(){return dt}let Ae;const Ao=new WeakSet;class mh{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,dt&&dt.active&&dt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ao.has(this)&&(Ao.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||yh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ol(this),wh(this);const e=Ae,n=Nt;Ae=this,Nt=!0;try{return this.fn()}finally{Eh(this),Ae=e,Nt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Fa(e);this.deps=this.depsTail=void 0,ol(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ao.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Zo(this)&&this.run()}get dirty(){return Zo(this)}}let _h=0,cr,lr;function yh(t,e=!1){if(t.flags|=8,e){t.next=lr,lr=t;return}t.next=cr,cr=t}function Ma(){_h++}function Ua(){if(--_h>0)return;if(lr){let e=lr;for(lr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;cr;){let e=cr;for(cr=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function wh(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Eh(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),Fa(s),Bp(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function Zo(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(vh(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function vh(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===vr)||(t.globalVersion=vr,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Zo(t))))return;t.flags|=2;const e=t.dep,n=Ae,s=Nt;Ae=t,Nt=!0;try{wh(t);const r=t.fn(t._value);(e.version===0||Cn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{Ae=n,Nt=s,Eh(t),t.flags&=-3}}function Fa(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)Fa(o,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Bp(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Nt=!0;const bh=[];function an(){bh.push(Nt),Nt=!1}function cn(){const t=bh.pop();Nt=t===void 0?!0:t}function ol(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ae;Ae=void 0;try{e()}finally{Ae=n}}}let vr=0;class jp{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Va{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ae||!Nt||Ae===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ae)n=this.activeLink=new jp(Ae,this),Ae.deps?(n.prevDep=Ae.depsTail,Ae.depsTail.nextDep=n,Ae.depsTail=n):Ae.deps=Ae.depsTail=n,Ih(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Ae.depsTail,n.nextDep=void 0,Ae.depsTail.nextDep=n,Ae.depsTail=n,Ae.deps===n&&(Ae.deps=s)}return n}trigger(e){this.version++,vr++,this.notify(e)}notify(e){Ma();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ua()}}}function Ih(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Ih(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const ea=new WeakMap,Yn=Symbol(""),ta=Symbol(""),br=Symbol("");function Ze(t,e,n){if(Nt&&Ae){let s=ea.get(t);s||ea.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new Va),r.map=s,r.key=n),r.track()}}function en(t,e,n,s,r,o){const a=ea.get(t);if(!a){vr++;return}const c=u=>{u&&u.trigger()};if(Ma(),e==="clear")a.forEach(c);else{const u=se(t),f=u&&Da(n);if(u&&n==="length"){const d=Number(s);a.forEach((g,_)=>{(_==="length"||_===br||!Ln(_)&&_>=d)&&c(g)})}else switch((n!==void 0||a.has(void 0))&&c(a.get(n)),f&&c(a.get(br)),e){case"add":u?f&&c(a.get("length")):(c(a.get(Yn)),vs(t)&&c(a.get(ta)));break;case"delete":u||(c(a.get(Yn)),vs(t)&&c(a.get(ta)));break;case"set":vs(t)&&c(a.get(Yn));break}}Ua()}function gs(t){const e=we(t);return e===t?e:(Ze(e,"iterate",br),kt(t)?e:e.map(ct))}function Ba(t){return Ze(t=we(t),"iterate",br),t}const Hp={__proto__:null,[Symbol.iterator](){return Ro(this,Symbol.iterator,ct)},concat(...t){return gs(this).concat(...t.map(e=>se(e)?gs(e):e))},entries(){return Ro(this,"entries",t=>(t[1]=ct(t[1]),t))},every(t,e){return Yt(this,"every",t,e,void 0,arguments)},filter(t,e){return Yt(this,"filter",t,e,n=>n.map(ct),arguments)},find(t,e){return Yt(this,"find",t,e,ct,arguments)},findIndex(t,e){return Yt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Yt(this,"findLast",t,e,ct,arguments)},findLastIndex(t,e){return Yt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Yt(this,"forEach",t,e,void 0,arguments)},includes(...t){return Co(this,"includes",t)},indexOf(...t){return Co(this,"indexOf",t)},join(t){return gs(this).join(t)},lastIndexOf(...t){return Co(this,"lastIndexOf",t)},map(t,e){return Yt(this,"map",t,e,void 0,arguments)},pop(){return er(this,"pop")},push(...t){return er(this,"push",t)},reduce(t,...e){return al(this,"reduce",t,e)},reduceRight(t,...e){return al(this,"reduceRight",t,e)},shift(){return er(this,"shift")},some(t,e){return Yt(this,"some",t,e,void 0,arguments)},splice(...t){return er(this,"splice",t)},toReversed(){return gs(this).toReversed()},toSorted(t){return gs(this).toSorted(t)},toSpliced(...t){return gs(this).toSpliced(...t)},unshift(...t){return er(this,"unshift",t)},values(){return Ro(this,"values",ct)}};function Ro(t,e,n){const s=Ba(t),r=s[e]();return s!==t&&!kt(t)&&(r._next=r.next,r.next=()=>{const o=r._next();return o.done||(o.value=n(o.value)),o}),r}const $p=Array.prototype;function Yt(t,e,n,s,r,o){const a=Ba(t),c=a!==t&&!kt(t),u=a[e];if(u!==$p[e]){const g=u.apply(t,o);return c?ct(g):g}let f=n;a!==t&&(c?f=function(g,_){return n.call(this,ct(g),_,t)}:n.length>2&&(f=function(g,_){return n.call(this,g,_,t)}));const d=u.call(a,f,s);return c&&r?r(d):d}function al(t,e,n,s){const r=Ba(t);let o=n;return r!==t&&(kt(t)?n.length>3&&(o=function(a,c,u){return n.call(this,a,c,u,t)}):o=function(a,c,u){return n.call(this,a,ct(c),u,t)}),r[e](o,...s)}function Co(t,e,n){const s=we(t);Ze(s,"iterate",br);const r=s[e](...n);return(r===-1||r===!1)&&$a(n[0])?(n[0]=we(n[0]),s[e](...n)):r}function er(t,e,n=[]){an(),Ma();const s=we(t)[e].apply(t,n);return Ua(),cn(),s}const Wp=Oa("__proto__,__v_isRef,__isVue"),Th=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Ln));function Gp(t){Ln(t)||(t=String(t));const e=we(this);return Ze(e,"has",t),e.hasOwnProperty(t)}class Sh{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return o;if(n==="__v_raw")return s===(r?o?tg:Ph:o?Ch:Rh).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const a=se(e);if(!r){let u;if(a&&(u=Hp[n]))return u;if(n==="hasOwnProperty")return Gp}const c=Reflect.get(e,n,nt(e)?e:s);if((Ln(n)?Th.has(n):Wp(n))||(r||Ze(e,"get",n),o))return c;if(nt(c)){const u=a&&Da(n)?c:c.value;return r&&Pe(u)?sa(u):u}return Pe(c)?r?sa(c):qi(c):c}}class Ah extends Sh{constructor(e=!1){super(!1,e)}set(e,n,s,r){let o=e[n];if(!this._isShallow){const u=ts(o);if(!kt(s)&&!ts(s)&&(o=we(o),s=we(s)),!se(e)&&nt(o)&&!nt(s))return u||(o.value=s),!0}const a=se(e)&&Da(n)?Number(n)<e.length:Ee(e,n),c=Reflect.set(e,n,s,nt(e)?e:r);return e===we(r)&&(a?Cn(s,o)&&en(e,"set",n,s):en(e,"add",n,s)),c}deleteProperty(e,n){const s=Ee(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&en(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!Ln(n)||!Th.has(n))&&Ze(e,"has",n),s}ownKeys(e){return Ze(e,"iterate",se(e)?"length":Yn),Reflect.ownKeys(e)}}class qp extends Sh{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Kp=new Ah,zp=new qp,Jp=new Ah(!0);const na=t=>t,ni=t=>Reflect.getPrototypeOf(t);function Xp(t,e,n){return function(...s){const r=this.__v_raw,o=we(r),a=vs(o),c=t==="entries"||t===Symbol.iterator&&a,u=t==="keys"&&a,f=r[t](...s),d=n?na:e?ra:ct;return!e&&Ze(o,"iterate",u?ta:Yn),{next(){const{value:g,done:_}=f.next();return _?{value:g,done:_}:{value:c?[d(g[0]),d(g[1])]:d(g),done:_}},[Symbol.iterator](){return this}}}}function si(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Yp(t,e){const n={get(r){const o=this.__v_raw,a=we(o),c=we(r);t||(Cn(r,c)&&Ze(a,"get",r),Ze(a,"get",c));const{has:u}=ni(a),f=e?na:t?ra:ct;if(u.call(a,r))return f(o.get(r));if(u.call(a,c))return f(o.get(c));o!==a&&o.get(r)},get size(){const r=this.__v_raw;return!t&&Ze(we(r),"iterate",Yn),r.size},has(r){const o=this.__v_raw,a=we(o),c=we(r);return t||(Cn(r,c)&&Ze(a,"has",r),Ze(a,"has",c)),r===c?o.has(r):o.has(r)||o.has(c)},forEach(r,o){const a=this,c=a.__v_raw,u=we(c),f=e?na:t?ra:ct;return!t&&Ze(u,"iterate",Yn),c.forEach((d,g)=>r.call(o,f(d),f(g),a))}};return Ge(n,t?{add:si("add"),set:si("set"),delete:si("delete"),clear:si("clear")}:{add(r){!e&&!kt(r)&&!ts(r)&&(r=we(r));const o=we(this);return ni(o).has.call(o,r)||(o.add(r),en(o,"add",r,r)),this},set(r,o){!e&&!kt(o)&&!ts(o)&&(o=we(o));const a=we(this),{has:c,get:u}=ni(a);let f=c.call(a,r);f||(r=we(r),f=c.call(a,r));const d=u.call(a,r);return a.set(r,o),f?Cn(o,d)&&en(a,"set",r,o):en(a,"add",r,o),this},delete(r){const o=we(this),{has:a,get:c}=ni(o);let u=a.call(o,r);u||(r=we(r),u=a.call(o,r)),c&&c.call(o,r);const f=o.delete(r);return u&&en(o,"delete",r,void 0),f},clear(){const r=we(this),o=r.size!==0,a=r.clear();return o&&en(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Xp(r,t,e)}),n}function ja(t,e){const n=Yp(t,e);return(s,r,o)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(Ee(n,r)&&r in s?n:s,r,o)}const Qp={get:ja(!1,!1)},Zp={get:ja(!1,!0)},eg={get:ja(!0,!1)};const Rh=new WeakMap,Ch=new WeakMap,Ph=new WeakMap,tg=new WeakMap;function ng(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function sg(t){return t.__v_skip||!Object.isExtensible(t)?0:ng(Pp(t))}function qi(t){return ts(t)?t:Ha(t,!1,Kp,Qp,Rh)}function Oh(t){return Ha(t,!1,Jp,Zp,Ch)}function sa(t){return Ha(t,!0,zp,eg,Ph)}function Ha(t,e,n,s,r){if(!Pe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const o=sg(t);if(o===0)return t;const a=r.get(t);if(a)return a;const c=new Proxy(t,o===2?s:n);return r.set(t,c),c}function ur(t){return ts(t)?ur(t.__v_raw):!!(t&&t.__v_isReactive)}function ts(t){return!!(t&&t.__v_isReadonly)}function kt(t){return!!(t&&t.__v_isShallow)}function $a(t){return t?!!t.__v_raw:!1}function we(t){const e=t&&t.__v_raw;return e?we(e):t}function rg(t){return!Ee(t,"__v_skip")&&Object.isExtensible(t)&&fh(t,"__v_skip",!0),t}const ct=t=>Pe(t)?qi(t):t,ra=t=>Pe(t)?sa(t):t;function nt(t){return t?t.__v_isRef===!0:!1}function Je(t){return Nh(t,!1)}function ig(t){return Nh(t,!0)}function Nh(t,e){return nt(t)?t:new og(t,e)}class og{constructor(e,n){this.dep=new Va,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:we(e),this._value=n?e:ct(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||kt(e)||ts(e);e=s?e:we(e),Cn(e,n)&&(this._rawValue=e,this._value=s?e:ct(e),this.dep.trigger())}}function bs(t){return nt(t)?t.value:t}const ag={get:(t,e,n)=>e==="__v_raw"?t:bs(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return nt(r)&&!nt(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function kh(t){return ur(t)?t:new Proxy(t,ag)}class cg{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Va(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Ae!==this)return yh(this,!0),!0}get value(){const e=this.dep.track();return vh(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function lg(t,e,n=!1){let s,r;return ie(t)?s=t:(s=t.get,r=t.set),new cg(s,r,n)}const ri={},bi=new WeakMap;let Gn;function ug(t,e=!1,n=Gn){if(n){let s=bi.get(n);s||bi.set(n,s=[]),s.push(t)}}function hg(t,e,n=Te){const{immediate:s,deep:r,once:o,scheduler:a,augmentJob:c,call:u}=n,f=G=>r?G:kt(G)||r===!1||r===0?tn(G,1):tn(G);let d,g,_,A,S=!1,k=!1;if(nt(t)?(g=()=>t.value,S=kt(t)):ur(t)?(g=()=>f(t),S=!0):se(t)?(k=!0,S=t.some(G=>ur(G)||kt(G)),g=()=>t.map(G=>{if(nt(G))return G.value;if(ur(G))return f(G);if(ie(G))return u?u(G,2):G()})):ie(t)?e?g=u?()=>u(t,2):t:g=()=>{if(_){an();try{_()}finally{cn()}}const G=Gn;Gn=d;try{return u?u(t,3,[A]):t(A)}finally{Gn=G}}:g=qt,e&&r){const G=g,ee=r===!0?1/0:r;g=()=>tn(G(),ee)}const D=Vp(),j=()=>{d.stop(),D&&D.active&&ka(D.effects,d)};if(o&&e){const G=e;e=(...ee)=>{G(...ee),j()}}let $=k?new Array(t.length).fill(ri):ri;const W=G=>{if(!(!(d.flags&1)||!d.dirty&&!G))if(e){const ee=d.run();if(r||S||(k?ee.some((ce,b)=>Cn(ce,$[b])):Cn(ee,$))){_&&_();const ce=Gn;Gn=d;try{const b=[ee,$===ri?void 0:k&&$[0]===ri?[]:$,A];$=ee,u?u(e,3,b):e(...b)}finally{Gn=ce}}}else d.run()};return c&&c(W),d=new mh(g),d.scheduler=a?()=>a(W,!1):W,A=G=>ug(G,!1,d),_=d.onStop=()=>{const G=bi.get(d);if(G){if(u)u(G,4);else for(const ee of G)ee();bi.delete(d)}},e?s?W(!0):$=d.run():a?a(W.bind(null,!0),!0):d.run(),j.pause=d.pause.bind(d),j.resume=d.resume.bind(d),j.stop=j,j}function tn(t,e=1/0,n){if(e<=0||!Pe(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,nt(t))tn(t.value,e,n);else if(se(t))for(let s=0;s<t.length;s++)tn(t[s],e,n);else if(ch(t)||vs(t))t.forEach(s=>{tn(s,e,n)});else if(hh(t)){for(const s in t)tn(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&tn(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Dr(t,e,n,s){try{return s?t(...s):t()}catch(r){Ki(r,e,n)}}function Jt(t,e,n,s){if(ie(t)){const r=Dr(t,e,n,s);return r&&lh(r)&&r.catch(o=>{Ki(o,e,n)}),r}if(se(t)){const r=[];for(let o=0;o<t.length;o++)r.push(Jt(t[o],e,n,s));return r}}function Ki(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Te;if(e){let c=e.parent;const u=e.proxy,f=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const d=c.ec;if(d){for(let g=0;g<d.length;g++)if(d[g](t,u,f)===!1)return}c=c.parent}if(o){an(),Dr(o,null,10,[t,u,f]),cn();return}}fg(t,n,r,s,a)}function fg(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const lt=[];let Bt=-1;const Is=[];let vn=null,ms=0;const Dh=Promise.resolve();let Ii=null;function xh(t){const e=Ii||Dh;return t?e.then(this?t.bind(this):t):e}function dg(t){let e=Bt+1,n=lt.length;for(;e<n;){const s=e+n>>>1,r=lt[s],o=Ir(r);o<t||o===t&&r.flags&2?e=s+1:n=s}return e}function Wa(t){if(!(t.flags&1)){const e=Ir(t),n=lt[lt.length-1];!n||!(t.flags&2)&&e>=Ir(n)?lt.push(t):lt.splice(dg(e),0,t),t.flags|=1,Lh()}}function Lh(){Ii||(Ii=Dh.then(Uh))}function pg(t){se(t)?Is.push(...t):vn&&t.id===-1?vn.splice(ms+1,0,t):t.flags&1||(Is.push(t),t.flags|=1),Lh()}function cl(t,e,n=Bt+1){for(;n<lt.length;n++){const s=lt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;lt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Mh(t){if(Is.length){const e=[...new Set(Is)].sort((n,s)=>Ir(n)-Ir(s));if(Is.length=0,vn){vn.push(...e);return}for(vn=e,ms=0;ms<vn.length;ms++){const n=vn[ms];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}vn=null,ms=0}}const Ir=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Uh(t){try{for(Bt=0;Bt<lt.length;Bt++){const e=lt[Bt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Dr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Bt<lt.length;Bt++){const e=lt[Bt];e&&(e.flags&=-2)}Bt=-1,lt.length=0,Mh(),Ii=null,(lt.length||Is.length)&&Uh()}}let vt=null,Fh=null;function Ti(t){const e=vt;return vt=t,Fh=t&&t.type.__scopeId||null,e}function jt(t,e=vt,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&Ci(-1);const o=Ti(e);let a;try{a=t(...r)}finally{Ti(o),s._d&&Ci(1)}return a};return s._n=!0,s._c=!0,s._d=!0,s}function Tr(t,e){if(vt===null)return t;const n=Yi(vt),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[o,a,c,u=Te]=e[r];o&&(ie(o)&&(o={mounted:o,updated:o}),o.deep&&tn(a),s.push({dir:o,instance:n,value:a,oldValue:void 0,arg:c,modifiers:u}))}return t}function $n(t,e,n,s){const r=t.dirs,o=e&&e.dirs;for(let a=0;a<r.length;a++){const c=r[a];o&&(c.oldValue=o[a].value);let u=c.dir[s];u&&(an(),Jt(u,n,8,[t.el,c,t,e]),cn())}}const gg=Symbol("_vte"),mg=t=>t.__isTeleport,_g=Symbol("_leaveCb");function Ga(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Ga(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Vh(t,e){return ie(t)?Ge({name:t.name},e,{setup:t}):t}function Bh(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const Si=new WeakMap;function hr(t,e,n,s,r=!1){if(se(t)){t.forEach((S,k)=>hr(S,e&&(se(e)?e[k]:e),n,s,r));return}if(fr(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&hr(t,e,n,s.component.subTree);return}const o=s.shapeFlag&4?Yi(s.component):s.el,a=r?null:o,{i:c,r:u}=t,f=e&&e.r,d=c.refs===Te?c.refs={}:c.refs,g=c.setupState,_=we(g),A=g===Te?ah:S=>Ee(_,S);if(f!=null&&f!==u){if(ll(e),$e(f))d[f]=null,A(f)&&(g[f]=null);else if(nt(f)){f.value=null;const S=e;S.k&&(d[S.k]=null)}}if(ie(u))Dr(u,c,12,[a,d]);else{const S=$e(u),k=nt(u);if(S||k){const D=()=>{if(t.f){const j=S?A(u)?g[u]:d[u]:u.value;if(r)se(j)&&ka(j,o);else if(se(j))j.includes(o)||j.push(o);else if(S)d[u]=[o],A(u)&&(g[u]=d[u]);else{const $=[o];u.value=$,t.k&&(d[t.k]=$)}}else S?(d[u]=a,A(u)&&(g[u]=a)):k&&(u.value=a,t.k&&(d[t.k]=a))};if(a){const j=()=>{D(),Si.delete(t)};j.id=-1,Si.set(t,j),wt(j,n)}else ll(t),D()}}}function ll(t){const e=Si.get(t);e&&(e.flags|=8,Si.delete(t))}Gi().requestIdleCallback;Gi().cancelIdleCallback;const fr=t=>!!t.type.__asyncLoader,jh=t=>t.type.__isKeepAlive;function yg(t,e){Hh(t,"a",e)}function wg(t,e){Hh(t,"da",e)}function Hh(t,e,n=et){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(zi(e,s,n),n){let r=n.parent;for(;r&&r.parent;)jh(r.parent.vnode)&&Eg(s,e,n,r),r=r.parent}}function Eg(t,e,n,s){const r=zi(e,t,s,!0);Wh(()=>{ka(s[e],r)},n)}function zi(t,e,n=et,s=!1){if(n){const r=n[t]||(n[t]=[]),o=e.__weh||(e.__weh=(...a)=>{an();const c=xr(n),u=Jt(e,n,t,a);return c(),cn(),u});return s?r.unshift(o):r.push(o),o}}const hn=t=>(e,n=et)=>{(!Ar||t==="sp")&&zi(t,(...s)=>e(...s),n)},vg=hn("bm"),$h=hn("m"),bg=hn("bu"),Ig=hn("u"),Tg=hn("bum"),Wh=hn("um"),Sg=hn("sp"),Ag=hn("rtg"),Rg=hn("rtc");function Cg(t,e=et){zi("ec",t,e)}const Gh="components";function Ai(t,e){return Og(Gh,t,!0,e)||t}const Pg=Symbol.for("v-ndc");function Og(t,e,n=!0,s=!1){const r=vt||et;if(r){const o=r.type;if(t===Gh){const c=wm(o,!1);if(c&&(c===e||c===Rt(e)||c===Wi(Rt(e))))return o}const a=ul(r[t]||o[t],e)||ul(r.appContext[t],e);return!a&&s?o:a}}function ul(t,e){return t&&(t[e]||t[Rt(e)]||t[Wi(Rt(e))])}const ia=t=>t?hf(t)?Yi(t):ia(t.parent):null,dr=Ge(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>ia(t.parent),$root:t=>ia(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>qa(t),$forceUpdate:t=>t.f||(t.f=()=>{Wa(t.update)}),$nextTick:t=>t.n||(t.n=xh.bind(t.proxy)),$watch:t=>Yg.bind(t)}),Po=(t,e)=>t!==Te&&!t.__isScriptSetup&&Ee(t,e),Ng={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:o,accessCache:a,type:c,appContext:u}=t;let f;if(e[0]!=="$"){const A=a[e];if(A!==void 0)switch(A){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return o[e]}else{if(Po(s,e))return a[e]=1,s[e];if(r!==Te&&Ee(r,e))return a[e]=2,r[e];if((f=t.propsOptions[0])&&Ee(f,e))return a[e]=3,o[e];if(n!==Te&&Ee(n,e))return a[e]=4,n[e];oa&&(a[e]=0)}}const d=dr[e];let g,_;if(d)return e==="$attrs"&&Ze(t.attrs,"get",""),d(t);if((g=c.__cssModules)&&(g=g[e]))return g;if(n!==Te&&Ee(n,e))return a[e]=4,n[e];if(_=u.config.globalProperties,Ee(_,e))return _[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:o}=t;return Po(r,e)?(r[e]=n,!0):s!==Te&&Ee(s,e)?(s[e]=n,!0):Ee(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(o[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:o,type:a}},c){let u,f;return!!(n[c]||t!==Te&&c[0]!=="$"&&Ee(t,c)||Po(e,c)||(u=o[0])&&Ee(u,c)||Ee(s,c)||Ee(dr,c)||Ee(r.config.globalProperties,c)||(f=a.__cssModules)&&f[c])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ee(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function hl(t){return se(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let oa=!0;function kg(t){const e=qa(t),n=t.proxy,s=t.ctx;oa=!1,e.beforeCreate&&fl(e.beforeCreate,t,"bc");const{data:r,computed:o,methods:a,watch:c,provide:u,inject:f,created:d,beforeMount:g,mounted:_,beforeUpdate:A,updated:S,activated:k,deactivated:D,beforeDestroy:j,beforeUnmount:$,destroyed:W,unmounted:G,render:ee,renderTracked:ce,renderTriggered:b,errorCaptured:y,serverPrefetch:v,expose:T,inheritAttrs:I,components:R,directives:w,filters:be}=e;if(f&&Dg(f,s,null),a)for(const pe in a){const ne=a[pe];ie(ne)&&(s[pe]=ne.bind(n))}if(r){const pe=r.call(n,n);Pe(pe)&&(t.data=qi(pe))}if(oa=!0,o)for(const pe in o){const ne=o[pe],Ke=ie(ne)?ne.bind(n,n):ie(ne.get)?ne.get.bind(n,n):qt,It=!ie(ne)&&ie(ne.set)?ne.set.bind(n):qt,Ne=Et({get:Ke,set:It});Object.defineProperty(s,pe,{enumerable:!0,configurable:!0,get:()=>Ne.value,set:Ce=>Ne.value=Ce})}if(c)for(const pe in c)qh(c[pe],s,n,pe);if(u){const pe=ie(u)?u.call(n):u;Reflect.ownKeys(pe).forEach(ne=>{ui(ne,pe[ne])})}d&&fl(d,t,"c");function ge(pe,ne){se(ne)?ne.forEach(Ke=>pe(Ke.bind(n))):ne&&pe(ne.bind(n))}if(ge(vg,g),ge($h,_),ge(bg,A),ge(Ig,S),ge(yg,k),ge(wg,D),ge(Cg,y),ge(Rg,ce),ge(Ag,b),ge(Tg,$),ge(Wh,G),ge(Sg,v),se(T))if(T.length){const pe=t.exposed||(t.exposed={});T.forEach(ne=>{Object.defineProperty(pe,ne,{get:()=>n[ne],set:Ke=>n[ne]=Ke,enumerable:!0})})}else t.exposed||(t.exposed={});ee&&t.render===qt&&(t.render=ee),I!=null&&(t.inheritAttrs=I),R&&(t.components=R),w&&(t.directives=w),v&&Bh(t)}function Dg(t,e,n=qt){se(t)&&(t=aa(t));for(const s in t){const r=t[s];let o;Pe(r)?"default"in r?o=At(r.from||s,r.default,!0):o=At(r.from||s):o=At(r),nt(o)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[s]=o}}function fl(t,e,n){Jt(se(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function qh(t,e,n,s){let r=s.includes(".")?of(n,s):()=>n[s];if($e(t)){const o=e[t];ie(o)&&hi(r,o)}else if(ie(t))hi(r,t.bind(n));else if(Pe(t))if(se(t))t.forEach(o=>qh(o,e,n,s));else{const o=ie(t.handler)?t.handler.bind(n):e[t.handler];ie(o)&&hi(r,o,t)}}function qa(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:o,config:{optionMergeStrategies:a}}=t.appContext,c=o.get(e);let u;return c?u=c:!r.length&&!n&&!s?u=e:(u={},r.length&&r.forEach(f=>Ri(u,f,a,!0)),Ri(u,e,a)),Pe(e)&&o.set(e,u),u}function Ri(t,e,n,s=!1){const{mixins:r,extends:o}=e;o&&Ri(t,o,n,!0),r&&r.forEach(a=>Ri(t,a,n,!0));for(const a in e)if(!(s&&a==="expose")){const c=xg[a]||n&&n[a];t[a]=c?c(t[a],e[a]):e[a]}return t}const xg={data:dl,props:pl,emits:pl,methods:rr,computed:rr,beforeCreate:rt,created:rt,beforeMount:rt,mounted:rt,beforeUpdate:rt,updated:rt,beforeDestroy:rt,beforeUnmount:rt,destroyed:rt,unmounted:rt,activated:rt,deactivated:rt,errorCaptured:rt,serverPrefetch:rt,components:rr,directives:rr,watch:Mg,provide:dl,inject:Lg};function dl(t,e){return e?t?function(){return Ge(ie(t)?t.call(this,this):t,ie(e)?e.call(this,this):e)}:e:t}function Lg(t,e){return rr(aa(t),aa(e))}function aa(t){if(se(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function rt(t,e){return t?[...new Set([].concat(t,e))]:e}function rr(t,e){return t?Ge(Object.create(null),t,e):e}function pl(t,e){return t?se(t)&&se(e)?[...new Set([...t,...e])]:Ge(Object.create(null),hl(t),hl(e??{})):e}function Mg(t,e){if(!t)return e;if(!e)return t;const n=Ge(Object.create(null),t);for(const s in e)n[s]=rt(t[s],e[s]);return n}function Kh(){return{app:null,config:{isNativeTag:ah,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ug=0;function Fg(t,e){return function(s,r=null){ie(s)||(s=Ge({},s)),r!=null&&!Pe(r)&&(r=null);const o=Kh(),a=new WeakSet,c=[];let u=!1;const f=o.app={_uid:Ug++,_component:s,_props:r,_container:null,_context:o,_instance:null,version:vm,get config(){return o.config},set config(d){},use(d,...g){return a.has(d)||(d&&ie(d.install)?(a.add(d),d.install(f,...g)):ie(d)&&(a.add(d),d(f,...g))),f},mixin(d){return o.mixins.includes(d)||o.mixins.push(d),f},component(d,g){return g?(o.components[d]=g,f):o.components[d]},directive(d,g){return g?(o.directives[d]=g,f):o.directives[d]},mount(d,g,_){if(!u){const A=f._ceVNode||Oe(s,r);return A.appContext=o,_===!0?_="svg":_===!1&&(_=void 0),g&&e?e(A,d):t(A,d,_),u=!0,f._container=d,d.__vue_app__=f,Yi(A.component)}},onUnmount(d){c.push(d)},unmount(){u&&(Jt(c,f._instance,16),t(null,f._container),delete f._container.__vue_app__)},provide(d,g){return o.provides[d]=g,f},runWithContext(d){const g=Ts;Ts=f;try{return d()}finally{Ts=g}}};return f}}let Ts=null;function ui(t,e){if(et){let n=et.provides;const s=et.parent&&et.parent.provides;s===n&&(n=et.provides=Object.create(s)),n[t]=e}}function At(t,e,n=!1){const s=pm();if(s||Ts){let r=Ts?Ts._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&ie(e)?e.call(s&&s.proxy):e}}const zh={},Jh=()=>Object.create(zh),Xh=t=>Object.getPrototypeOf(t)===zh;function Vg(t,e,n,s=!1){const r={},o=Jh();t.propsDefaults=Object.create(null),Yh(t,e,r,o);for(const a in t.propsOptions[0])a in r||(r[a]=void 0);n?t.props=s?r:Oh(r):t.type.props?t.props=r:t.props=o,t.attrs=o}function Bg(t,e,n,s){const{props:r,attrs:o,vnode:{patchFlag:a}}=t,c=we(r),[u]=t.propsOptions;let f=!1;if((s||a>0)&&!(a&16)){if(a&8){const d=t.vnode.dynamicProps;for(let g=0;g<d.length;g++){let _=d[g];if(Ji(t.emitsOptions,_))continue;const A=e[_];if(u)if(Ee(o,_))A!==o[_]&&(o[_]=A,f=!0);else{const S=Rt(_);r[S]=ca(u,c,S,A,t,!1)}else A!==o[_]&&(o[_]=A,f=!0)}}}else{Yh(t,e,r,o)&&(f=!0);let d;for(const g in c)(!e||!Ee(e,g)&&((d=cs(g))===g||!Ee(e,d)))&&(u?n&&(n[g]!==void 0||n[d]!==void 0)&&(r[g]=ca(u,c,g,void 0,t,!0)):delete r[g]);if(o!==c)for(const g in o)(!e||!Ee(e,g))&&(delete o[g],f=!0)}f&&en(t.attrs,"set","")}function Yh(t,e,n,s){const[r,o]=t.propsOptions;let a=!1,c;if(e)for(let u in e){if(ar(u))continue;const f=e[u];let d;r&&Ee(r,d=Rt(u))?!o||!o.includes(d)?n[d]=f:(c||(c={}))[d]=f:Ji(t.emitsOptions,u)||(!(u in s)||f!==s[u])&&(s[u]=f,a=!0)}if(o){const u=we(n),f=c||Te;for(let d=0;d<o.length;d++){const g=o[d];n[g]=ca(r,u,g,f[g],t,!Ee(f,g))}}return a}function ca(t,e,n,s,r,o){const a=t[n];if(a!=null){const c=Ee(a,"default");if(c&&s===void 0){const u=a.default;if(a.type!==Function&&!a.skipFactory&&ie(u)){const{propsDefaults:f}=r;if(n in f)s=f[n];else{const d=xr(r);s=f[n]=u.call(null,e),d()}}else s=u;r.ce&&r.ce._setProp(n,s)}a[0]&&(o&&!c?s=!1:a[1]&&(s===""||s===cs(n))&&(s=!0))}return s}const jg=new WeakMap;function Qh(t,e,n=!1){const s=n?jg:e.propsCache,r=s.get(t);if(r)return r;const o=t.props,a={},c=[];let u=!1;if(!ie(t)){const d=g=>{u=!0;const[_,A]=Qh(g,e,!0);Ge(a,_),A&&c.push(...A)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!o&&!u)return Pe(t)&&s.set(t,Es),Es;if(se(o))for(let d=0;d<o.length;d++){const g=Rt(o[d]);gl(g)&&(a[g]=Te)}else if(o)for(const d in o){const g=Rt(d);if(gl(g)){const _=o[d],A=a[g]=se(_)||ie(_)?{type:_}:Ge({},_),S=A.type;let k=!1,D=!0;if(se(S))for(let j=0;j<S.length;++j){const $=S[j],W=ie($)&&$.name;if(W==="Boolean"){k=!0;break}else W==="String"&&(D=!1)}else k=ie(S)&&S.name==="Boolean";A[0]=k,A[1]=D,(k||Ee(A,"default"))&&c.push(g)}}const f=[a,c];return Pe(t)&&s.set(t,f),f}function gl(t){return t[0]!=="$"&&!ar(t)}const Ka=t=>t==="_"||t==="_ctx"||t==="$stable",za=t=>se(t)?t.map($t):[$t(t)],Hg=(t,e,n)=>{if(e._n)return e;const s=jt((...r)=>za(e(...r)),n);return s._c=!1,s},Zh=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Ka(r))continue;const o=t[r];if(ie(o))e[r]=Hg(r,o,s);else if(o!=null){const a=za(o);e[r]=()=>a}}},ef=(t,e)=>{const n=za(e);t.slots.default=()=>n},tf=(t,e,n)=>{for(const s in e)(n||!Ka(s))&&(t[s]=e[s])},$g=(t,e,n)=>{const s=t.slots=Jh();if(t.vnode.shapeFlag&32){const r=e._;r?(tf(s,e,n),n&&fh(s,"_",r,!0)):Zh(e,s)}else e&&ef(t,e)},Wg=(t,e,n)=>{const{vnode:s,slots:r}=t;let o=!0,a=Te;if(s.shapeFlag&32){const c=e._;c?n&&c===1?o=!1:tf(r,e,n):(o=!e.$stable,Zh(e,r)),a=e}else e&&(ef(t,e),a={default:1});if(o)for(const c in r)!Ka(c)&&a[c]==null&&delete r[c]},wt=im;function Gg(t){return qg(t)}function qg(t,e){const n=Gi();n.__VUE__=!0;const{insert:s,remove:r,patchProp:o,createElement:a,createText:c,createComment:u,setText:f,setElementText:d,parentNode:g,nextSibling:_,setScopeId:A=qt,insertStaticContent:S}=t,k=(m,E,P,M=null,x=null,U=null,B=void 0,F=null,H=!!E.dynamicChildren)=>{if(m===E)return;m&&!tr(m,E)&&(M=L(m),Ce(m,x,U,!0),m=null),E.patchFlag===-2&&(H=!1,E.dynamicChildren=null);const{type:V,ref:Q,shapeFlag:z}=E;switch(V){case Xi:D(m,E,P,M);break;case kn:j(m,E,P,M);break;case ko:m==null&&$(E,P,M,B);break;case ut:R(m,E,P,M,x,U,B,F,H);break;default:z&1?ee(m,E,P,M,x,U,B,F,H):z&6?w(m,E,P,M,x,U,B,F,H):(z&64||z&128)&&V.process(m,E,P,M,x,U,B,F,H,Y)}Q!=null&&x?hr(Q,m&&m.ref,U,E||m,!E):Q==null&&m&&m.ref!=null&&hr(m.ref,null,U,m,!0)},D=(m,E,P,M)=>{if(m==null)s(E.el=c(E.children),P,M);else{const x=E.el=m.el;E.children!==m.children&&f(x,E.children)}},j=(m,E,P,M)=>{m==null?s(E.el=u(E.children||""),P,M):E.el=m.el},$=(m,E,P,M)=>{[m.el,m.anchor]=S(m.children,E,P,M,m.el,m.anchor)},W=({el:m,anchor:E},P,M)=>{let x;for(;m&&m!==E;)x=_(m),s(m,P,M),m=x;s(E,P,M)},G=({el:m,anchor:E})=>{let P;for(;m&&m!==E;)P=_(m),r(m),m=P;r(E)},ee=(m,E,P,M,x,U,B,F,H)=>{E.type==="svg"?B="svg":E.type==="math"&&(B="mathml"),m==null?ce(E,P,M,x,U,B,F,H):v(m,E,x,U,B,F,H)},ce=(m,E,P,M,x,U,B,F)=>{let H,V;const{props:Q,shapeFlag:z,transition:X,dirs:te}=m;if(H=m.el=a(m.type,U,Q&&Q.is,Q),z&8?d(H,m.children):z&16&&y(m.children,H,null,M,x,Oo(m,U),B,F),te&&$n(m,null,M,"created"),b(H,m,m.scopeId,B,M),Q){for(const _e in Q)_e!=="value"&&!ar(_e)&&o(H,_e,null,Q[_e],U,M);"value"in Q&&o(H,"value",null,Q.value,U),(V=Q.onVnodeBeforeMount)&&Ft(V,M,m)}te&&$n(m,null,M,"beforeMount");const ue=Kg(x,X);ue&&X.beforeEnter(H),s(H,E,P),((V=Q&&Q.onVnodeMounted)||ue||te)&&wt(()=>{V&&Ft(V,M,m),ue&&X.enter(H),te&&$n(m,null,M,"mounted")},x)},b=(m,E,P,M,x)=>{if(P&&A(m,P),M)for(let U=0;U<M.length;U++)A(m,M[U]);if(x){let U=x.subTree;if(E===U||cf(U.type)&&(U.ssContent===E||U.ssFallback===E)){const B=x.vnode;b(m,B,B.scopeId,B.slotScopeIds,x.parent)}}},y=(m,E,P,M,x,U,B,F,H=0)=>{for(let V=H;V<m.length;V++){const Q=m[V]=F?bn(m[V]):$t(m[V]);k(null,Q,E,P,M,x,U,B,F)}},v=(m,E,P,M,x,U,B)=>{const F=E.el=m.el;let{patchFlag:H,dynamicChildren:V,dirs:Q}=E;H|=m.patchFlag&16;const z=m.props||Te,X=E.props||Te;let te;if(P&&Wn(P,!1),(te=X.onVnodeBeforeUpdate)&&Ft(te,P,E,m),Q&&$n(E,m,P,"beforeUpdate"),P&&Wn(P,!0),(z.innerHTML&&X.innerHTML==null||z.textContent&&X.textContent==null)&&d(F,""),V?T(m.dynamicChildren,V,F,P,M,Oo(E,x),U):B||ne(m,E,F,null,P,M,Oo(E,x),U,!1),H>0){if(H&16)I(F,z,X,P,x);else if(H&2&&z.class!==X.class&&o(F,"class",null,X.class,x),H&4&&o(F,"style",z.style,X.style,x),H&8){const ue=E.dynamicProps;for(let _e=0;_e<ue.length;_e++){const me=ue[_e],Qe=z[me],Fe=X[me];(Fe!==Qe||me==="value")&&o(F,me,Qe,Fe,x,P)}}H&1&&m.children!==E.children&&d(F,E.children)}else!B&&V==null&&I(F,z,X,P,x);((te=X.onVnodeUpdated)||Q)&&wt(()=>{te&&Ft(te,P,E,m),Q&&$n(E,m,P,"updated")},M)},T=(m,E,P,M,x,U,B)=>{for(let F=0;F<E.length;F++){const H=m[F],V=E[F],Q=H.el&&(H.type===ut||!tr(H,V)||H.shapeFlag&198)?g(H.el):P;k(H,V,Q,null,M,x,U,B,!0)}},I=(m,E,P,M,x)=>{if(E!==P){if(E!==Te)for(const U in E)!ar(U)&&!(U in P)&&o(m,U,E[U],null,x,M);for(const U in P){if(ar(U))continue;const B=P[U],F=E[U];B!==F&&U!=="value"&&o(m,U,F,B,x,M)}"value"in P&&o(m,"value",E.value,P.value,x)}},R=(m,E,P,M,x,U,B,F,H)=>{const V=E.el=m?m.el:c(""),Q=E.anchor=m?m.anchor:c("");let{patchFlag:z,dynamicChildren:X,slotScopeIds:te}=E;te&&(F=F?F.concat(te):te),m==null?(s(V,P,M),s(Q,P,M),y(E.children||[],P,Q,x,U,B,F,H)):z>0&&z&64&&X&&m.dynamicChildren?(T(m.dynamicChildren,X,P,x,U,B,F),(E.key!=null||x&&E===x.subTree)&&nf(m,E,!0)):ne(m,E,P,Q,x,U,B,F,H)},w=(m,E,P,M,x,U,B,F,H)=>{E.slotScopeIds=F,m==null?E.shapeFlag&512?x.ctx.activate(E,P,M,B,H):be(E,P,M,x,U,B,H):qe(m,E,H)},be=(m,E,P,M,x,U,B)=>{const F=m.component=dm(m,M,x);if(jh(m)&&(F.ctx.renderer=Y),gm(F,!1,B),F.asyncDep){if(x&&x.registerDep(F,ge,B),!m.el){const H=F.subTree=Oe(kn);j(null,H,E,P),m.placeholder=H.el}}else ge(F,m,E,P,x,U,B)},qe=(m,E,P)=>{const M=E.component=m.component;if(sm(m,E,P))if(M.asyncDep&&!M.asyncResolved){pe(M,E,P);return}else M.next=E,M.update();else E.el=m.el,M.vnode=E},ge=(m,E,P,M,x,U,B)=>{const F=()=>{if(m.isMounted){let{next:z,bu:X,u:te,parent:ue,vnode:_e}=m;{const Ve=sf(m);if(Ve){z&&(z.el=_e.el,pe(m,z,B)),Ve.asyncDep.then(()=>{m.isUnmounted||F()});return}}let me=z,Qe;Wn(m,!1),z?(z.el=_e.el,pe(m,z,B)):z=_e,X&&li(X),(Qe=z.props&&z.props.onVnodeBeforeUpdate)&&Ft(Qe,ue,z,_e),Wn(m,!0);const Fe=No(m),_t=m.subTree;m.subTree=Fe,k(_t,Fe,g(_t.el),L(_t),m,x,U),z.el=Fe.el,me===null&&rm(m,Fe.el),te&&wt(te,x),(Qe=z.props&&z.props.onVnodeUpdated)&&wt(()=>Ft(Qe,ue,z,_e),x)}else{let z;const{el:X,props:te}=E,{bm:ue,m:_e,parent:me,root:Qe,type:Fe}=m,_t=fr(E);if(Wn(m,!1),ue&&li(ue),!_t&&(z=te&&te.onVnodeBeforeMount)&&Ft(z,me,E),Wn(m,!0),X&&Se){const Ve=()=>{m.subTree=No(m),Se(X,m.subTree,m,x,null)};_t&&Fe.__asyncHydrate?Fe.__asyncHydrate(X,m,Ve):Ve()}else{Qe.ce&&Qe.ce._def.shadowRoot!==!1&&Qe.ce._injectChildStyle(Fe);const Ve=m.subTree=No(m);k(null,Ve,P,M,m,x,U),E.el=Ve.el}if(_e&&wt(_e,x),!_t&&(z=te&&te.onVnodeMounted)){const Ve=E;wt(()=>Ft(z,me,Ve),x)}(E.shapeFlag&256||me&&fr(me.vnode)&&me.vnode.shapeFlag&256)&&m.a&&wt(m.a,x),m.isMounted=!0,E=P=M=null}};m.scope.on();const H=m.effect=new mh(F);m.scope.off();const V=m.update=H.run.bind(H),Q=m.job=H.runIfDirty.bind(H);Q.i=m,Q.id=m.uid,H.scheduler=()=>Wa(Q),Wn(m,!0),V()},pe=(m,E,P)=>{E.component=m;const M=m.vnode.props;m.vnode=E,m.next=null,Bg(m,E.props,M,P),Wg(m,E.children,P),an(),cl(m),cn()},ne=(m,E,P,M,x,U,B,F,H=!1)=>{const V=m&&m.children,Q=m?m.shapeFlag:0,z=E.children,{patchFlag:X,shapeFlag:te}=E;if(X>0){if(X&128){It(V,z,P,M,x,U,B,F,H);return}else if(X&256){Ke(V,z,P,M,x,U,B,F,H);return}}te&8?(Q&16&&Ye(V,x,U),z!==V&&d(P,z)):Q&16?te&16?It(V,z,P,M,x,U,B,F,H):Ye(V,x,U,!0):(Q&8&&d(P,""),te&16&&y(z,P,M,x,U,B,F,H))},Ke=(m,E,P,M,x,U,B,F,H)=>{m=m||Es,E=E||Es;const V=m.length,Q=E.length,z=Math.min(V,Q);let X;for(X=0;X<z;X++){const te=E[X]=H?bn(E[X]):$t(E[X]);k(m[X],te,P,null,x,U,B,F,H)}V>Q?Ye(m,x,U,!0,!1,z):y(E,P,M,x,U,B,F,H,z)},It=(m,E,P,M,x,U,B,F,H)=>{let V=0;const Q=E.length;let z=m.length-1,X=Q-1;for(;V<=z&&V<=X;){const te=m[V],ue=E[V]=H?bn(E[V]):$t(E[V]);if(tr(te,ue))k(te,ue,P,null,x,U,B,F,H);else break;V++}for(;V<=z&&V<=X;){const te=m[z],ue=E[X]=H?bn(E[X]):$t(E[X]);if(tr(te,ue))k(te,ue,P,null,x,U,B,F,H);else break;z--,X--}if(V>z){if(V<=X){const te=X+1,ue=te<Q?E[te].el:M;for(;V<=X;)k(null,E[V]=H?bn(E[V]):$t(E[V]),P,ue,x,U,B,F,H),V++}}else if(V>X)for(;V<=z;)Ce(m[V],x,U,!0),V++;else{const te=V,ue=V,_e=new Map;for(V=ue;V<=X;V++){const Le=E[V]=H?bn(E[V]):$t(E[V]);Le.key!=null&&_e.set(Le.key,V)}let me,Qe=0;const Fe=X-ue+1;let _t=!1,Ve=0;const Xt=new Array(Fe);for(V=0;V<Fe;V++)Xt[V]=0;for(V=te;V<=z;V++){const Le=m[V];if(Qe>=Fe){Ce(Le,x,U,!0);continue}let yt;if(Le.key!=null)yt=_e.get(Le.key);else for(me=ue;me<=X;me++)if(Xt[me-ue]===0&&tr(Le,E[me])){yt=me;break}yt===void 0?Ce(Le,x,U,!0):(Xt[yt-ue]=V+1,yt>=Ve?Ve=yt:_t=!0,k(Le,E[yt],P,null,x,U,B,F,H),Qe++)}const us=_t?zg(Xt):Es;for(me=us.length-1,V=Fe-1;V>=0;V--){const Le=ue+V,yt=E[Le],hs=E[Le+1],Vs=Le+1<Q?hs.el||hs.placeholder:M;Xt[V]===0?k(null,yt,P,Vs,x,U,B,F,H):_t&&(me<0||V!==us[me]?Ne(yt,P,Vs,2):me--)}}},Ne=(m,E,P,M,x=null)=>{const{el:U,type:B,transition:F,children:H,shapeFlag:V}=m;if(V&6){Ne(m.component.subTree,E,P,M);return}if(V&128){m.suspense.move(E,P,M);return}if(V&64){B.move(m,E,P,Y);return}if(B===ut){s(U,E,P);for(let z=0;z<H.length;z++)Ne(H[z],E,P,M);s(m.anchor,E,P);return}if(B===ko){W(m,E,P);return}if(M!==2&&V&1&&F)if(M===0)F.beforeEnter(U),s(U,E,P),wt(()=>F.enter(U),x);else{const{leave:z,delayLeave:X,afterLeave:te}=F,ue=()=>{m.ctx.isUnmounted?r(U):s(U,E,P)},_e=()=>{U._isLeaving&&U[_g](!0),z(U,()=>{ue(),te&&te()})};X?X(U,ue,_e):_e()}else s(U,E,P)},Ce=(m,E,P,M=!1,x=!1)=>{const{type:U,props:B,ref:F,children:H,dynamicChildren:V,shapeFlag:Q,patchFlag:z,dirs:X,cacheIndex:te}=m;if(z===-2&&(x=!1),F!=null&&(an(),hr(F,null,P,m,!0),cn()),te!=null&&(E.renderCache[te]=void 0),Q&256){E.ctx.deactivate(m);return}const ue=Q&1&&X,_e=!fr(m);let me;if(_e&&(me=B&&B.onVnodeBeforeUnmount)&&Ft(me,E,m),Q&6)ft(m.component,P,M);else{if(Q&128){m.suspense.unmount(P,M);return}ue&&$n(m,null,E,"beforeUnmount"),Q&64?m.type.remove(m,E,P,Y,M):V&&!V.hasOnce&&(U!==ut||z>0&&z&64)?Ye(V,E,P,!1,!0):(U===ut&&z&384||!x&&Q&16)&&Ye(H,E,P),M&&mt(m)}(_e&&(me=B&&B.onVnodeUnmounted)||ue)&&wt(()=>{me&&Ft(me,E,m),ue&&$n(m,null,E,"unmounted")},P)},mt=m=>{const{type:E,el:P,anchor:M,transition:x}=m;if(E===ut){Xe(P,M);return}if(E===ko){G(m);return}const U=()=>{r(P),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(m.shapeFlag&1&&x&&!x.persisted){const{leave:B,delayLeave:F}=x,H=()=>B(P,U);F?F(m.el,U,H):H()}else U()},Xe=(m,E)=>{let P;for(;m!==E;)P=_(m),r(m),m=P;r(E)},ft=(m,E,P)=>{const{bum:M,scope:x,job:U,subTree:B,um:F,m:H,a:V}=m;ml(H),ml(V),M&&li(M),x.stop(),U&&(U.flags|=8,Ce(B,m,E,P)),F&&wt(F,E),wt(()=>{m.isUnmounted=!0},E)},Ye=(m,E,P,M=!1,x=!1,U=0)=>{for(let B=U;B<m.length;B++)Ce(m[B],E,P,M,x)},L=m=>{if(m.shapeFlag&6)return L(m.component.subTree);if(m.shapeFlag&128)return m.suspense.next();const E=_(m.anchor||m.el),P=E&&E[gg];return P?_(P):E};let J=!1;const K=(m,E,P)=>{m==null?E._vnode&&Ce(E._vnode,null,null,!0):k(E._vnode||null,m,E,null,null,null,P),E._vnode=m,J||(J=!0,cl(),Mh(),J=!1)},Y={p:k,um:Ce,m:Ne,r:mt,mt:be,mc:y,pc:ne,pbc:T,n:L,o:t};let le,Se;return{render:K,hydrate:le,createApp:Fg(K,le)}}function Oo({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Wn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Kg(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function nf(t,e,n=!1){const s=t.children,r=e.children;if(se(s)&&se(r))for(let o=0;o<s.length;o++){const a=s[o];let c=r[o];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=r[o]=bn(r[o]),c.el=a.el),!n&&c.patchFlag!==-2&&nf(a,c)),c.type===Xi&&c.patchFlag!==-1&&(c.el=a.el),c.type===kn&&!c.el&&(c.el=a.el)}}function zg(t){const e=t.slice(),n=[0];let s,r,o,a,c;const u=t.length;for(s=0;s<u;s++){const f=t[s];if(f!==0){if(r=n[n.length-1],t[r]<f){e[s]=r,n.push(s);continue}for(o=0,a=n.length-1;o<a;)c=o+a>>1,t[n[c]]<f?o=c+1:a=c;f<t[n[o]]&&(o>0&&(e[s]=n[o-1]),n[o]=s)}}for(o=n.length,a=n[o-1];o-- >0;)n[o]=a,a=e[a];return n}function sf(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sf(e)}function ml(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Jg=Symbol.for("v-scx"),Xg=()=>At(Jg);function hi(t,e,n){return rf(t,e,n)}function rf(t,e,n=Te){const{immediate:s,deep:r,flush:o,once:a}=n,c=Ge({},n),u=e&&s||!e&&o!=="post";let f;if(Ar){if(o==="sync"){const A=Xg();f=A.__watcherHandles||(A.__watcherHandles=[])}else if(!u){const A=()=>{};return A.stop=qt,A.resume=qt,A.pause=qt,A}}const d=et;c.call=(A,S,k)=>Jt(A,d,S,k);let g=!1;o==="post"?c.scheduler=A=>{wt(A,d&&d.suspense)}:o!=="sync"&&(g=!0,c.scheduler=(A,S)=>{S?A():Wa(A)}),c.augmentJob=A=>{e&&(A.flags|=4),g&&(A.flags|=2,d&&(A.id=d.uid,A.i=d))};const _=hg(t,e,c);return Ar&&(f?f.push(_):u&&_()),_}function Yg(t,e,n){const s=this.proxy,r=$e(t)?t.includes(".")?of(s,t):()=>s[t]:t.bind(s,s);let o;ie(e)?o=e:(o=e.handler,n=e);const a=xr(this),c=rf(r,o.bind(s),n);return a(),c}function of(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const Qg=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Rt(e)}Modifiers`]||t[`${cs(e)}Modifiers`];function Zg(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||Te;let r=n;const o=e.startsWith("update:"),a=o&&Qg(s,e.slice(7));a&&(a.trim&&(r=n.map(d=>$e(d)?d.trim():d)),a.number&&(r=n.map(Qo)));let c,u=s[c=To(e)]||s[c=To(Rt(e))];!u&&o&&(u=s[c=To(cs(e))]),u&&Jt(u,t,6,r);const f=s[c+"Once"];if(f){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,Jt(f,t,6,r)}}const em=new WeakMap;function af(t,e,n=!1){const s=n?em:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const o=t.emits;let a={},c=!1;if(!ie(t)){const u=f=>{const d=af(f,e,!0);d&&(c=!0,Ge(a,d))};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}return!o&&!c?(Pe(t)&&s.set(t,null),null):(se(o)?o.forEach(u=>a[u]=null):Ge(a,o),Pe(t)&&s.set(t,a),a)}function Ji(t,e){return!t||!ji(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ee(t,e[0].toLowerCase()+e.slice(1))||Ee(t,cs(e))||Ee(t,e))}function No(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[o],slots:a,attrs:c,emit:u,render:f,renderCache:d,props:g,data:_,setupState:A,ctx:S,inheritAttrs:k}=t,D=Ti(t);let j,$;try{if(n.shapeFlag&4){const G=r||s,ee=G;j=$t(f.call(ee,G,d,g,A,_,S)),$=c}else{const G=e;j=$t(G.length>1?G(g,{attrs:c,slots:a,emit:u}):G(g,null)),$=e.props?c:tm(c)}}catch(G){pr.length=0,Ki(G,t,1),j=Oe(kn)}let W=j;if($&&k!==!1){const G=Object.keys($),{shapeFlag:ee}=W;G.length&&ee&7&&(o&&G.some(Na)&&($=nm($,o)),W=Ps(W,$,!1,!0))}return n.dirs&&(W=Ps(W,null,!1,!0),W.dirs=W.dirs?W.dirs.concat(n.dirs):n.dirs),n.transition&&Ga(W,n.transition),j=W,Ti(D),j}const tm=t=>{let e;for(const n in t)(n==="class"||n==="style"||ji(n))&&((e||(e={}))[n]=t[n]);return e},nm=(t,e)=>{const n={};for(const s in t)(!Na(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function sm(t,e,n){const{props:s,children:r,component:o}=t,{props:a,children:c,patchFlag:u}=e,f=o.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&u>=0){if(u&1024)return!0;if(u&16)return s?_l(s,a,f):!!a;if(u&8){const d=e.dynamicProps;for(let g=0;g<d.length;g++){const _=d[g];if(a[_]!==s[_]&&!Ji(f,_))return!0}}}else return(r||c)&&(!c||!c.$stable)?!0:s===a?!1:s?a?_l(s,a,f):!0:!!a;return!1}function _l(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const o=s[r];if(e[o]!==t[o]&&!Ji(n,o))return!0}return!1}function rm({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const cf=t=>t.__isSuspense;function im(t,e){e&&e.pendingBranch?se(t)?e.effects.push(...t):e.effects.push(t):pg(t)}const ut=Symbol.for("v-fgt"),Xi=Symbol.for("v-txt"),kn=Symbol.for("v-cmt"),ko=Symbol.for("v-stc"),pr=[];let bt=null;function Ue(t=!1){pr.push(bt=t?null:[])}function om(){pr.pop(),bt=pr[pr.length-1]||null}let Sr=1;function Ci(t,e=!1){Sr+=t,t<0&&bt&&e&&(bt.hasOnce=!0)}function lf(t){return t.dynamicChildren=Sr>0?bt||Es:null,om(),Sr>0&&bt&&bt.push(t),t}function He(t,e,n,s,r,o){return lf(re(t,e,n,s,r,o,!0))}function am(t,e,n,s,r){return lf(Oe(t,e,n,s,r,!0))}function Pi(t){return t?t.__v_isVNode===!0:!1}function tr(t,e){return t.type===e.type&&t.key===e.key}const uf=({key:t})=>t??null,fi=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?$e(t)||nt(t)||ie(t)?{i:vt,r:t,k:e,f:!!n}:t:null);function re(t,e=null,n=null,s=0,r=null,o=t===ut?0:1,a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&uf(e),ref:e&&fi(e),scopeId:Fh,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:vt};return c?(Ja(u,n),o&128&&t.normalize(u)):n&&(u.shapeFlag|=$e(n)?8:16),Sr>0&&!a&&bt&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&bt.push(u),u}const Oe=cm;function cm(t,e=null,n=null,s=0,r=null,o=!1){if((!t||t===Pg)&&(t=kn),Pi(t)){const c=Ps(t,e,!0);return n&&Ja(c,n),Sr>0&&!o&&bt&&(c.shapeFlag&6?bt[bt.indexOf(t)]=c:bt.push(c)),c.patchFlag=-2,c}if(Em(t)&&(t=t.__vccOpts),e){e=lm(e);let{class:c,style:u}=e;c&&!$e(c)&&(e.class=La(c)),Pe(u)&&($a(u)&&!se(u)&&(u=Ge({},u)),e.style=xa(u))}const a=$e(t)?1:cf(t)?128:mg(t)?64:Pe(t)?4:ie(t)?2:0;return re(t,e,n,s,r,a,o,!0)}function lm(t){return t?$a(t)||Xh(t)?Ge({},t):t:null}function Ps(t,e,n=!1,s=!1){const{props:r,ref:o,patchFlag:a,children:c,transition:u}=t,f=e?um(r||{},e):r,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:f,key:f&&uf(f),ref:e&&e.ref?n&&o?se(o)?o.concat(fi(e)):[o,fi(e)]:fi(e):o,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==ut?a===-1?16:a|16:a,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:u,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Ps(t.ssContent),ssFallback:t.ssFallback&&Ps(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return u&&s&&Ga(d,u.clone(d)),d}function at(t=" ",e=0){return Oe(Xi,null,t,e)}function Dn(t="",e=!1){return e?(Ue(),am(kn,null,t)):Oe(kn,null,t)}function $t(t){return t==null||typeof t=="boolean"?Oe(kn):se(t)?Oe(ut,null,t.slice()):Pi(t)?bn(t):Oe(Xi,null,String(t))}function bn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Ps(t)}function Ja(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(se(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Ja(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Xh(e)?e._ctx=vt:r===3&&vt&&(vt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ie(e)?(e={default:e,_ctx:vt},n=32):(e=String(e),s&64?(n=16,e=[at(e)]):n=8);t.children=e,t.shapeFlag|=n}function um(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=La([e.class,s.class]));else if(r==="style")e.style=xa([e.style,s.style]);else if(ji(r)){const o=e[r],a=s[r];a&&o!==a&&!(se(o)&&o.includes(a))&&(e[r]=o?[].concat(o,a):a)}else r!==""&&(e[r]=s[r])}return e}function Ft(t,e,n,s=null){Jt(t,e,7,[n,s])}const hm=Kh();let fm=0;function dm(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||hm,o={uid:fm++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Fp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Qh(s,r),emitsOptions:af(s,r),emit:null,emitted:null,propsDefaults:Te,inheritAttrs:s.inheritAttrs,ctx:Te,data:Te,props:Te,attrs:Te,slots:Te,refs:Te,setupState:Te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=e?e.root:o,o.emit=Zg.bind(null,o),t.ce&&t.ce(o),o}let et=null;const pm=()=>et||vt;let Oi,la;{const t=Gi(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),o=>{r.length>1?r.forEach(a=>a(o)):r[0](o)}};Oi=e("__VUE_INSTANCE_SETTERS__",n=>et=n),la=e("__VUE_SSR_SETTERS__",n=>Ar=n)}const xr=t=>{const e=et;return Oi(t),t.scope.on(),()=>{t.scope.off(),Oi(e)}},yl=()=>{et&&et.scope.off(),Oi(null)};function hf(t){return t.vnode.shapeFlag&4}let Ar=!1;function gm(t,e=!1,n=!1){e&&la(e);const{props:s,children:r}=t.vnode,o=hf(t);Vg(t,s,o,e),$g(t,r,n||e);const a=o?mm(t,e):void 0;return e&&la(!1),a}function mm(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Ng);const{setup:s}=n;if(s){an();const r=t.setupContext=s.length>1?ym(t):null,o=xr(t),a=Dr(s,t,0,[t.props,r]),c=lh(a);if(cn(),o(),(c||t.sp)&&!fr(t)&&Bh(t),c){if(a.then(yl,yl),e)return a.then(u=>{wl(t,u,e)}).catch(u=>{Ki(u,t,0)});t.asyncDep=a}else wl(t,a,e)}else ff(t,e)}function wl(t,e,n){ie(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Pe(e)&&(t.setupState=kh(e)),ff(t,n)}let El;function ff(t,e,n){const s=t.type;if(!t.render){if(!e&&El&&!s.render){const r=s.template||qa(t).template;if(r){const{isCustomElement:o,compilerOptions:a}=t.appContext.config,{delimiters:c,compilerOptions:u}=s,f=Ge(Ge({isCustomElement:o,delimiters:c},a),u);s.render=El(r,f)}}t.render=s.render||qt}{const r=xr(t);an();try{kg(t)}finally{cn(),r()}}}const _m={get(t,e){return Ze(t,"get",""),t[e]}};function ym(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,_m),slots:t.slots,emit:t.emit,expose:e}}function Yi(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(kh(rg(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in dr)return dr[n](t)},has(e,n){return n in e||n in dr}})):t.proxy}function wm(t,e=!0){return ie(t)?t.displayName||t.name:t.name||e&&t.__name}function Em(t){return ie(t)&&"__vccOpts"in t}const Et=(t,e)=>lg(t,e,Ar);function df(t,e,n){try{Ci(-1);const s=arguments.length;return s===2?Pe(e)&&!se(e)?Pi(e)?Oe(t,null,[e]):Oe(t,e):Oe(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Pi(n)&&(n=[n]),Oe(t,e,n))}finally{Ci(1)}}const vm="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ua;const vl=typeof window<"u"&&window.trustedTypes;if(vl)try{ua=vl.createPolicy("vue",{createHTML:t=>t})}catch{}const pf=ua?t=>ua.createHTML(t):t=>t,bm="http://www.w3.org/2000/svg",Im="http://www.w3.org/1998/Math/MathML",Zt=typeof document<"u"?document:null,bl=Zt&&Zt.createElement("template"),Tm={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?Zt.createElementNS(bm,t):e==="mathml"?Zt.createElementNS(Im,t):n?Zt.createElement(t,{is:n}):Zt.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>Zt.createTextNode(t),createComment:t=>Zt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Zt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,o){const a=n?n.previousSibling:e.lastChild;if(r&&(r===o||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===o||!(r=r.nextSibling)););else{bl.innerHTML=pf(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const c=bl.content;if(s==="svg"||s==="mathml"){const u=c.firstChild;for(;u.firstChild;)c.appendChild(u.firstChild);c.removeChild(u)}e.insertBefore(c,n)}return[a?a.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Sm=Symbol("_vtc");function Am(t,e,n){const s=t[Sm];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Il=Symbol("_vod"),Rm=Symbol("_vsh"),Cm=Symbol(""),Pm=/(?:^|;)\s*display\s*:/;function Om(t,e,n){const s=t.style,r=$e(n);let o=!1;if(n&&!r){if(e)if($e(e))for(const a of e.split(";")){const c=a.slice(0,a.indexOf(":")).trim();n[c]==null&&di(s,c,"")}else for(const a in e)n[a]==null&&di(s,a,"");for(const a in n)a==="display"&&(o=!0),di(s,a,n[a])}else if(r){if(e!==n){const a=s[Cm];a&&(n+=";"+a),s.cssText=n,o=Pm.test(n)}}else e&&t.removeAttribute("style");Il in t&&(t[Il]=o?s.display:"",t[Rm]&&(s.display="none"))}const Tl=/\s*!important$/;function di(t,e,n){if(se(n))n.forEach(s=>di(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=Nm(t,e);Tl.test(n)?t.setProperty(cs(s),n.replace(Tl,""),"important"):t[s]=n}}const Sl=["Webkit","Moz","ms"],Do={};function Nm(t,e){const n=Do[e];if(n)return n;let s=Rt(e);if(s!=="filter"&&s in t)return Do[e]=s;s=Wi(s);for(let r=0;r<Sl.length;r++){const o=Sl[r]+s;if(o in t)return Do[e]=o}return e}const Al="http://www.w3.org/1999/xlink";function Rl(t,e,n,s,r,o=Up(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Al,e.slice(6,e.length)):t.setAttributeNS(Al,e,n):n==null||o&&!dh(n)?t.removeAttribute(e):t.setAttribute(e,o?"":Ln(n)?String(n):n)}function Cl(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?pf(n):n);return}const o=t.tagName;if(e==="value"&&o!=="PROGRESS"&&!o.includes("-")){const c=o==="OPTION"?t.getAttribute("value")||"":t.value,u=n==null?t.type==="checkbox"?"on":"":String(n);(c!==u||!("_value"in t))&&(t.value=u),n==null&&t.removeAttribute(e),t._value=n;return}let a=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=dh(n):n==null&&c==="string"?(n="",a=!0):c==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(r||e)}function _s(t,e,n,s){t.addEventListener(e,n,s)}function km(t,e,n,s){t.removeEventListener(e,n,s)}const Pl=Symbol("_vei");function Dm(t,e,n,s,r=null){const o=t[Pl]||(t[Pl]={}),a=o[e];if(s&&a)a.value=s;else{const[c,u]=xm(e);if(s){const f=o[e]=Um(s,r);_s(t,c,f,u)}else a&&(km(t,c,a,u),o[e]=void 0)}}const Ol=/(?:Once|Passive|Capture)$/;function xm(t){let e;if(Ol.test(t)){e={};let s;for(;s=t.match(Ol);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):cs(t.slice(2)),e]}let xo=0;const Lm=Promise.resolve(),Mm=()=>xo||(Lm.then(()=>xo=0),xo=Date.now());function Um(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Jt(Fm(s,n.value),e,5,[s])};return n.value=t,n.attached=Mm(),n}function Fm(t,e){if(se(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const Nl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Vm=(t,e,n,s,r,o)=>{const a=r==="svg";e==="class"?Am(t,s,a):e==="style"?Om(t,n,s):ji(e)?Na(e)||Dm(t,e,n,s,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Bm(t,e,s,a))?(Cl(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Rl(t,e,s,a,o,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!$e(s))?Cl(t,Rt(e),s,o,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Rl(t,e,s,a))};function Bm(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Nl(e)&&ie(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Nl(e)&&$e(n)?!1:e in t}const kl=t=>{const e=t.props["onUpdate:modelValue"]||!1;return se(e)?n=>li(e,n):e};function jm(t){t.target.composing=!0}function Dl(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Lo=Symbol("_assign"),Rr={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t[Lo]=kl(r);const o=s||r.props&&r.props.type==="number";_s(t,e?"change":"input",a=>{if(a.target.composing)return;let c=t.value;n&&(c=c.trim()),o&&(c=Qo(c)),t[Lo](c)}),n&&_s(t,"change",()=>{t.value=t.value.trim()}),e||(_s(t,"compositionstart",jm),_s(t,"compositionend",Dl),_s(t,"change",Dl))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:o}},a){if(t[Lo]=kl(a),t.composing)return;const c=(o||t.type==="number")&&!/^0\d/.test(t.value)?Qo(t.value):t.value,u=e??"";c!==u&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===u)||(t.value=u))}},Hm=["ctrl","shift","alt","meta"],$m={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Hm.some(n=>t[`${n}Key`]&&!e.includes(n))},Wm=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...o)=>{for(let a=0;a<e.length;a++){const c=$m[e[a]];if(c&&c(r,e))return}return t(r,...o)})},Gm=Ge({patchProp:Vm},Tm);let xl;function qm(){return xl||(xl=Gg(Gm))}const Km=(...t)=>{const e=qm().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Jm(s);if(!r)return;const o=e._component;!ie(o)&&!o.render&&!o.template&&(o.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=n(r,!1,zm(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function zm(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Jm(t){return $e(t)?document.querySelector(t):t}const Xm={class:"border-bottom py-2 px-3 d-flex align-items-center"},Ym={class:"ms-auto d-flex align-items-center gap-2"},Qm={class:"text-muted small"},Zm={class:"container py-4"},e_={__name:"App",setup(t){const e=At("currentUserRef",null),n=Et(()=>{var s;return((s=e==null?void 0:e.value)==null?void 0:s.email)||null});return(s,r)=>{const o=Ai("RouterLink"),a=Ai("RouterView");return Ue(),He(ut,null,[re("header",Xm,[Oe(o,{class:"me-3 text-decoration-none",to:"/"},{default:jt(()=>[...r[0]||(r[0]=[at("Home",-1)])]),_:1}),Oe(o,{class:"me-3 text-decoration-none",to:"/addbook"},{default:jt(()=>[...r[1]||(r[1]=[at("Add Book",-1)])]),_:1}),Oe(o,{class:"btn btn-outline-secondary btn-sm ms-2",to:"/books/count"},{default:jt(()=>[...r[2]||(r[2]=[at(" Book Count ",-1)])]),_:1}),Oe(o,{class:"me-3 text-decoration-none",to:"/weather"},{default:jt(()=>[...r[3]||(r[3]=[at("Weather",-1)])]),_:1}),re("div",Ym,[n.value?(Ue(),He(ut,{key:0},[re("span",Qm,"Signed in as "+ze(n.value),1),Oe(o,{class:"btn btn-outline-secondary btn-sm",to:"/logout"},{default:jt(()=>[...r[4]||(r[4]=[at("Logout",-1)])]),_:1})],64)):(Ue(),He(ut,{key:1},[Oe(o,{class:"btn btn-outline-primary btn-sm",to:"/signin"},{default:jt(()=>[...r[5]||(r[5]=[at("Sign in",-1)])]),_:1}),Oe(o,{class:"btn btn-primary btn-sm",to:"/register"},{default:jt(()=>[...r[6]||(r[6]=[at("Register",-1)])]),_:1})],64))])]),re("main",Zm,[Oe(a)])],64)}}};/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ys=typeof document<"u";function gf(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function t_(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&gf(t.default)}const ye=Object.assign;function Mo(t,e){const n={};for(const s in e){const r=e[s];n[s]=Dt(r)?r.map(t):t(r)}return n}const gr=()=>{},Dt=Array.isArray;function Ll(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const mf=/#/g,n_=/&/g,s_=/\//g,r_=/=/g,i_=/\?/g,_f=/\+/g,o_=/%5B/g,a_=/%5D/g,yf=/%5E/g,c_=/%60/g,wf=/%7B/g,l_=/%7C/g,Ef=/%7D/g,u_=/%20/g;function Xa(t){return t==null?"":encodeURI(""+t).replace(l_,"|").replace(o_,"[").replace(a_,"]")}function h_(t){return Xa(t).replace(wf,"{").replace(Ef,"}").replace(yf,"^")}function ha(t){return Xa(t).replace(_f,"%2B").replace(u_,"+").replace(mf,"%23").replace(n_,"%26").replace(c_,"`").replace(wf,"{").replace(Ef,"}").replace(yf,"^")}function f_(t){return ha(t).replace(r_,"%3D")}function d_(t){return Xa(t).replace(mf,"%23").replace(i_,"%3F")}function p_(t){return d_(t).replace(s_,"%2F")}function Cr(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const g_=/\/$/,m_=t=>t.replace(g_,"");function Uo(t,e,n="/"){let s,r={},o="",a="";const c=e.indexOf("#");let u=e.indexOf("?");return u=c>=0&&u>c?-1:u,u>=0&&(s=e.slice(0,u),o=e.slice(u,c>0?c:e.length),r=t(o.slice(1))),c>=0&&(s=s||e.slice(0,c),a=e.slice(c,e.length)),s=E_(s??e,n),{fullPath:s+o+a,path:s,query:r,hash:Cr(a)}}function __(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Ml(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function y_(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&Os(e.matched[s],n.matched[r])&&vf(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Os(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function vf(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!w_(t[n],e[n]))return!1;return!0}function w_(t,e){return Dt(t)?Ul(t,e):Dt(e)?Ul(e,t):t===e}function Ul(t,e){return Dt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function E_(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let o=n.length-1,a,c;for(a=0;a<s.length;a++)if(c=s[a],c!==".")if(c==="..")o>1&&o--;else break;return n.slice(0,o).join("/")+"/"+s.slice(a).join("/")}const wn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let fa=function(t){return t.pop="pop",t.push="push",t}({}),Fo=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function v_(t){if(!t)if(ys){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),m_(t)}const b_=/^[^#]+#/;function I_(t,e){return t.replace(b_,"#")+e}function T_(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Qi=()=>({left:window.scrollX,top:window.scrollY});function S_(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=T_(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Fl(t,e){return(history.state?history.state.position-e:-1)+t}const da=new Map;function A_(t,e){da.set(t,e)}function R_(t){const e=da.get(t);return da.delete(t),e}function C_(t){return typeof t=="string"||t&&typeof t=="object"}function bf(t){return typeof t=="string"||typeof t=="symbol"}let ke=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const If=Symbol("");ke.MATCHER_NOT_FOUND+"",ke.NAVIGATION_GUARD_REDIRECT+"",ke.NAVIGATION_ABORTED+"",ke.NAVIGATION_CANCELLED+"",ke.NAVIGATION_DUPLICATED+"";function Ns(t,e){return ye(new Error,{type:t,[If]:!0},e)}function Qt(t,e){return t instanceof Error&&If in t&&(e==null||!!(t.type&e))}const P_=["params","query","hash"];function O_(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of P_)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function N_(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const r=n[s].replace(_f," "),o=r.indexOf("="),a=Cr(o<0?r:r.slice(0,o)),c=o<0?null:Cr(r.slice(o+1));if(a in e){let u=e[a];Dt(u)||(u=e[a]=[u]),u.push(c)}else e[a]=c}return e}function Vl(t){let e="";for(let n in t){const s=t[n];if(n=f_(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Dt(s)?s.map(r=>r&&ha(r)):[s&&ha(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function k_(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Dt(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const D_=Symbol(""),Bl=Symbol(""),Zi=Symbol(""),Tf=Symbol(""),pa=Symbol("");function nr(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function In(t,e,n,s,r,o=a=>a()){const a=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((c,u)=>{const f=_=>{_===!1?u(Ns(ke.NAVIGATION_ABORTED,{from:n,to:e})):_ instanceof Error?u(_):C_(_)?u(Ns(ke.NAVIGATION_GUARD_REDIRECT,{from:e,to:_})):(a&&s.enterCallbacks[r]===a&&typeof _=="function"&&a.push(_),c())},d=o(()=>t.call(s&&s.instances[r],e,n,f));let g=Promise.resolve(d);t.length<3&&(g=g.then(f)),g.catch(_=>u(_))})}function Vo(t,e,n,s,r=o=>o()){const o=[];for(const a of t)for(const c in a.components){let u=a.components[c];if(!(e!=="beforeRouteEnter"&&!a.instances[c]))if(gf(u)){const f=(u.__vccOpts||u)[e];f&&o.push(In(f,n,s,a,c,r))}else{let f=u();o.push(()=>f.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${c}" at "${a.path}"`);const g=t_(d)?d.default:d;a.mods[c]=d,a.components[c]=g;const _=(g.__vccOpts||g)[e];return _&&In(_,n,s,a,c,r)()}))}}return o}function x_(t,e){const n=[],s=[],r=[],o=Math.max(e.matched.length,t.matched.length);for(let a=0;a<o;a++){const c=e.matched[a];c&&(t.matched.find(f=>Os(f,c))?s.push(c):n.push(c));const u=t.matched[a];u&&(e.matched.find(f=>Os(f,u))||r.push(u))}return[n,s,r]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let L_=()=>location.protocol+"//"+location.host;function Sf(t,e){const{pathname:n,search:s,hash:r}=e,o=t.indexOf("#");if(o>-1){let a=r.includes(t.slice(o))?t.slice(o).length:1,c=r.slice(a);return c[0]!=="/"&&(c="/"+c),Ml(c,"")}return Ml(n,t)+s+r}function M_(t,e,n,s){let r=[],o=[],a=null;const c=({state:_})=>{const A=Sf(t,location),S=n.value,k=e.value;let D=0;if(_){if(n.value=A,e.value=_,a&&a===S){a=null;return}D=k?_.position-k.position:0}else s(A);r.forEach(j=>{j(n.value,S,{delta:D,type:fa.pop,direction:D?D>0?Fo.forward:Fo.back:Fo.unknown})})};function u(){a=n.value}function f(_){r.push(_);const A=()=>{const S=r.indexOf(_);S>-1&&r.splice(S,1)};return o.push(A),A}function d(){if(document.visibilityState==="hidden"){const{history:_}=window;if(!_.state)return;_.replaceState(ye({},_.state,{scroll:Qi()}),"")}}function g(){for(const _ of o)_();o=[],window.removeEventListener("popstate",c),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",c),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:u,listen:f,destroy:g}}function jl(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?Qi():null}}function U_(t){const{history:e,location:n}=window,s={value:Sf(t,n)},r={value:e.state};r.value||o(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function o(u,f,d){const g=t.indexOf("#"),_=g>-1?(n.host&&document.querySelector("base")?t:t.slice(g))+u:L_()+t+u;try{e[d?"replaceState":"pushState"](f,"",_),r.value=f}catch(A){console.error(A),n[d?"replace":"assign"](_)}}function a(u,f){o(u,ye({},e.state,jl(r.value.back,u,r.value.forward,!0),f,{position:r.value.position}),!0),s.value=u}function c(u,f){const d=ye({},r.value,e.state,{forward:u,scroll:Qi()});o(d.current,d,!0),o(u,ye({},jl(s.value,u,null),{position:d.position+1},f),!1),s.value=u}return{location:s,state:r,push:c,replace:a}}function F_(t){t=v_(t);const e=U_(t),n=M_(t,e.state,e.location,e.replace);function s(o,a=!0){a||n.pauseListeners(),history.go(o)}const r=ye({location:"",base:t,go:s,createHref:I_.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let zn=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var je=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(je||{});const V_={type:zn.Static,value:""},B_=/[a-zA-Z0-9_]/;function j_(t){if(!t)return[[]];if(t==="/")return[[V_]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(A){throw new Error(`ERR (${n})/"${f}": ${A}`)}let n=je.Static,s=n;const r=[];let o;function a(){o&&r.push(o),o=[]}let c=0,u,f="",d="";function g(){f&&(n===je.Static?o.push({type:zn.Static,value:f}):n===je.Param||n===je.ParamRegExp||n===je.ParamRegExpEnd?(o.length>1&&(u==="*"||u==="+")&&e(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),o.push({type:zn.Param,value:f,regexp:d,repeatable:u==="*"||u==="+",optional:u==="*"||u==="?"})):e("Invalid state to consume buffer"),f="")}function _(){f+=u}for(;c<t.length;){if(u=t[c++],u==="\\"&&n!==je.ParamRegExp){s=n,n=je.EscapeNext;continue}switch(n){case je.Static:u==="/"?(f&&g(),a()):u===":"?(g(),n=je.Param):_();break;case je.EscapeNext:_(),n=s;break;case je.Param:u==="("?n=je.ParamRegExp:B_.test(u)?_():(g(),n=je.Static,u!=="*"&&u!=="?"&&u!=="+"&&c--);break;case je.ParamRegExp:u===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+u:n=je.ParamRegExpEnd:d+=u;break;case je.ParamRegExpEnd:g(),n=je.Static,u!=="*"&&u!=="?"&&u!=="+"&&c--,d="";break;default:e("Unknown state");break}}return n===je.ParamRegExp&&e(`Unfinished custom RegExp for param "${f}"`),g(),a(),r}const Hl="[^/]+?",H_={sensitive:!1,strict:!1,start:!0,end:!0};var it=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(it||{});const $_=/[.+*?^${}()[\]/\\]/g;function W_(t,e){const n=ye({},H_,e),s=[];let r=n.start?"^":"";const o=[];for(const f of t){const d=f.length?[]:[it.Root];n.strict&&!f.length&&(r+="/");for(let g=0;g<f.length;g++){const _=f[g];let A=it.Segment+(n.sensitive?it.BonusCaseSensitive:0);if(_.type===zn.Static)g||(r+="/"),r+=_.value.replace($_,"\\$&"),A+=it.Static;else if(_.type===zn.Param){const{value:S,repeatable:k,optional:D,regexp:j}=_;o.push({name:S,repeatable:k,optional:D});const $=j||Hl;if($!==Hl){A+=it.BonusCustomRegExp;try{`${$}`}catch(G){throw new Error(`Invalid custom RegExp for param "${S}" (${$}): `+G.message)}}let W=k?`((?:${$})(?:/(?:${$}))*)`:`(${$})`;g||(W=D&&f.length<2?`(?:/${W})`:"/"+W),D&&(W+="?"),r+=W,A+=it.Dynamic,D&&(A+=it.BonusOptional),k&&(A+=it.BonusRepeatable),$===".*"&&(A+=it.BonusWildcard)}d.push(A)}s.push(d)}if(n.strict&&n.end){const f=s.length-1;s[f][s[f].length-1]+=it.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const a=new RegExp(r,n.sensitive?"":"i");function c(f){const d=f.match(a),g={};if(!d)return null;for(let _=1;_<d.length;_++){const A=d[_]||"",S=o[_-1];g[S.name]=A&&S.repeatable?A.split("/"):A}return g}function u(f){let d="",g=!1;for(const _ of t){(!g||!d.endsWith("/"))&&(d+="/"),g=!1;for(const A of _)if(A.type===zn.Static)d+=A.value;else if(A.type===zn.Param){const{value:S,repeatable:k,optional:D}=A,j=S in f?f[S]:"";if(Dt(j)&&!k)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const $=Dt(j)?j.join("/"):j;if(!$)if(D)_.length<2&&(d.endsWith("/")?d=d.slice(0,-1):g=!0);else throw new Error(`Missing required param "${S}"`);d+=$}}return d||"/"}return{re:a,score:s,keys:o,parse:c,stringify:u}}function G_(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===it.Static+it.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===it.Static+it.Segment?1:-1:0}function Af(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const o=G_(s[n],r[n]);if(o)return o;n++}if(Math.abs(r.length-s.length)===1){if($l(s))return 1;if($l(r))return-1}return r.length-s.length}function $l(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const q_={strict:!1,end:!0,sensitive:!1};function K_(t,e,n){const s=W_(j_(t.path),n),r=ye(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function z_(t,e){const n=[],s=new Map;e=Ll(q_,e);function r(g){return s.get(g)}function o(g,_,A){const S=!A,k=Gl(g);k.aliasOf=A&&A.record;const D=Ll(e,g),j=[k];if("alias"in g){const G=typeof g.alias=="string"?[g.alias]:g.alias;for(const ee of G)j.push(Gl(ye({},k,{components:A?A.record.components:k.components,path:ee,aliasOf:A?A.record:k})))}let $,W;for(const G of j){const{path:ee}=G;if(_&&ee[0]!=="/"){const ce=_.record.path,b=ce[ce.length-1]==="/"?"":"/";G.path=_.record.path+(ee&&b+ee)}if($=K_(G,_,D),A?A.alias.push($):(W=W||$,W!==$&&W.alias.push($),S&&g.name&&!ql($)&&a(g.name)),Rf($)&&u($),k.children){const ce=k.children;for(let b=0;b<ce.length;b++)o(ce[b],$,A&&A.children[b])}A=A||$}return W?()=>{a(W)}:gr}function a(g){if(bf(g)){const _=s.get(g);_&&(s.delete(g),n.splice(n.indexOf(_),1),_.children.forEach(a),_.alias.forEach(a))}else{const _=n.indexOf(g);_>-1&&(n.splice(_,1),g.record.name&&s.delete(g.record.name),g.children.forEach(a),g.alias.forEach(a))}}function c(){return n}function u(g){const _=Y_(g,n);n.splice(_,0,g),g.record.name&&!ql(g)&&s.set(g.record.name,g)}function f(g,_){let A,S={},k,D;if("name"in g&&g.name){if(A=s.get(g.name),!A)throw Ns(ke.MATCHER_NOT_FOUND,{location:g});D=A.record.name,S=ye(Wl(_.params,A.keys.filter(W=>!W.optional).concat(A.parent?A.parent.keys.filter(W=>W.optional):[]).map(W=>W.name)),g.params&&Wl(g.params,A.keys.map(W=>W.name))),k=A.stringify(S)}else if(g.path!=null)k=g.path,A=n.find(W=>W.re.test(k)),A&&(S=A.parse(k),D=A.record.name);else{if(A=_.name?s.get(_.name):n.find(W=>W.re.test(_.path)),!A)throw Ns(ke.MATCHER_NOT_FOUND,{location:g,currentLocation:_});D=A.record.name,S=ye({},_.params,g.params),k=A.stringify(S)}const j=[];let $=A;for(;$;)j.unshift($.record),$=$.parent;return{name:D,path:k,params:S,matched:j,meta:X_(j)}}t.forEach(g=>o(g));function d(){n.length=0,s.clear()}return{addRoute:o,resolve:f,removeRoute:a,clearRoutes:d,getRoutes:c,getRecordMatcher:r}}function Wl(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Gl(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:J_(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function J_(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function ql(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function X_(t){return t.reduce((e,n)=>ye(e,n.meta),{})}function Y_(t,e){let n=0,s=e.length;for(;n!==s;){const o=n+s>>1;Af(t,e[o])<0?s=o:n=o+1}const r=Q_(t);return r&&(s=e.lastIndexOf(r,s-1)),s}function Q_(t){let e=t;for(;e=e.parent;)if(Rf(e)&&Af(t,e)===0)return e}function Rf({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Kl(t){const e=At(Zi),n=At(Tf),s=Et(()=>{const u=bs(t.to);return e.resolve(u)}),r=Et(()=>{const{matched:u}=s.value,{length:f}=u,d=u[f-1],g=n.matched;if(!d||!g.length)return-1;const _=g.findIndex(Os.bind(null,d));if(_>-1)return _;const A=zl(u[f-2]);return f>1&&zl(d)===A&&g[g.length-1].path!==A?g.findIndex(Os.bind(null,u[f-2])):_}),o=Et(()=>r.value>-1&&sy(n.params,s.value.params)),a=Et(()=>r.value>-1&&r.value===n.matched.length-1&&vf(n.params,s.value.params));function c(u={}){if(ny(u)){const f=e[bs(t.replace)?"replace":"push"](bs(t.to)).catch(gr);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>f),f}return Promise.resolve()}return{route:s,href:Et(()=>s.value.href),isActive:o,isExactActive:a,navigate:c}}function Z_(t){return t.length===1?t[0]:t}const ey=Vh({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Kl,setup(t,{slots:e}){const n=qi(Kl(t)),{options:s}=At(Zi),r=Et(()=>({[Jl(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Jl(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const o=e.default&&Z_(e.default(n));return t.custom?o:df("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},o)}}}),ty=ey;function ny(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function sy(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Dt(r)||r.length!==s.length||s.some((o,a)=>o!==r[a]))return!1}return!0}function zl(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Jl=(t,e,n)=>t??e??n,ry=Vh({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=At(pa),r=Et(()=>t.route||s.value),o=At(Bl,0),a=Et(()=>{let f=bs(o);const{matched:d}=r.value;let g;for(;(g=d[f])&&!g.components;)f++;return f}),c=Et(()=>r.value.matched[a.value]);ui(Bl,Et(()=>a.value+1)),ui(D_,c),ui(pa,r);const u=Je();return hi(()=>[u.value,c.value,t.name],([f,d,g],[_,A,S])=>{d&&(d.instances[g]=f,A&&A!==d&&f&&f===_&&(d.leaveGuards.size||(d.leaveGuards=A.leaveGuards),d.updateGuards.size||(d.updateGuards=A.updateGuards))),f&&d&&(!A||!Os(d,A)||!_)&&(d.enterCallbacks[g]||[]).forEach(k=>k(f))},{flush:"post"}),()=>{const f=r.value,d=t.name,g=c.value,_=g&&g.components[d];if(!_)return Xl(n.default,{Component:_,route:f});const A=g.props[d],S=A?A===!0?f.params:typeof A=="function"?A(f):A:null,D=df(_,ye({},S,e,{onVnodeUnmounted:j=>{j.component.isUnmounted&&(g.instances[d]=null)},ref:u}));return Xl(n.default,{Component:D,route:f})||D}}});function Xl(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const iy=ry;function oy(t){const e=z_(t.routes,t),n=t.parseQuery||N_,s=t.stringifyQuery||Vl,r=t.history,o=nr(),a=nr(),c=nr(),u=ig(wn);let f=wn;ys&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Mo.bind(null,L=>""+L),g=Mo.bind(null,p_),_=Mo.bind(null,Cr);function A(L,J){let K,Y;return bf(L)?(K=e.getRecordMatcher(L),Y=J):Y=L,e.addRoute(Y,K)}function S(L){const J=e.getRecordMatcher(L);J&&e.removeRoute(J)}function k(){return e.getRoutes().map(L=>L.record)}function D(L){return!!e.getRecordMatcher(L)}function j(L,J){if(J=ye({},J||u.value),typeof L=="string"){const E=Uo(n,L,J.path),P=e.resolve({path:E.path},J),M=r.createHref(E.fullPath);return ye(E,P,{params:_(P.params),hash:Cr(E.hash),redirectedFrom:void 0,href:M})}let K;if(L.path!=null)K=ye({},L,{path:Uo(n,L.path,J.path).path});else{const E=ye({},L.params);for(const P in E)E[P]==null&&delete E[P];K=ye({},L,{params:g(E)}),J.params=g(J.params)}const Y=e.resolve(K,J),le=L.hash||"";Y.params=d(_(Y.params));const Se=__(s,ye({},L,{hash:h_(le),path:Y.path})),m=r.createHref(Se);return ye({fullPath:Se,hash:le,query:s===Vl?k_(L.query):L.query||{}},Y,{redirectedFrom:void 0,href:m})}function $(L){return typeof L=="string"?Uo(n,L,u.value.path):ye({},L)}function W(L,J){if(f!==L)return Ns(ke.NAVIGATION_CANCELLED,{from:J,to:L})}function G(L){return b(L)}function ee(L){return G(ye($(L),{replace:!0}))}function ce(L,J){const K=L.matched[L.matched.length-1];if(K&&K.redirect){const{redirect:Y}=K;let le=typeof Y=="function"?Y(L,J):Y;return typeof le=="string"&&(le=le.includes("?")||le.includes("#")?le=$(le):{path:le},le.params={}),ye({query:L.query,hash:L.hash,params:le.path!=null?{}:L.params},le)}}function b(L,J){const K=f=j(L),Y=u.value,le=L.state,Se=L.force,m=L.replace===!0,E=ce(K,Y);if(E)return b(ye($(E),{state:typeof E=="object"?ye({},le,E.state):le,force:Se,replace:m}),J||K);const P=K;P.redirectedFrom=J;let M;return!Se&&y_(s,Y,K)&&(M=Ns(ke.NAVIGATION_DUPLICATED,{to:P,from:Y}),Ne(Y,Y,!0,!1)),(M?Promise.resolve(M):T(P,Y)).catch(x=>Qt(x)?Qt(x,ke.NAVIGATION_GUARD_REDIRECT)?x:It(x):ne(x,P,Y)).then(x=>{if(x){if(Qt(x,ke.NAVIGATION_GUARD_REDIRECT))return b(ye({replace:m},$(x.to),{state:typeof x.to=="object"?ye({},le,x.to.state):le,force:Se}),J||P)}else x=R(P,Y,!0,m,le);return I(P,Y,x),x})}function y(L,J){const K=W(L,J);return K?Promise.reject(K):Promise.resolve()}function v(L){const J=Xe.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(L):L()}function T(L,J){let K;const[Y,le,Se]=x_(L,J);K=Vo(Y.reverse(),"beforeRouteLeave",L,J);for(const E of Y)E.leaveGuards.forEach(P=>{K.push(In(P,L,J))});const m=y.bind(null,L,J);return K.push(m),Ye(K).then(()=>{K=[];for(const E of o.list())K.push(In(E,L,J));return K.push(m),Ye(K)}).then(()=>{K=Vo(le,"beforeRouteUpdate",L,J);for(const E of le)E.updateGuards.forEach(P=>{K.push(In(P,L,J))});return K.push(m),Ye(K)}).then(()=>{K=[];for(const E of Se)if(E.beforeEnter)if(Dt(E.beforeEnter))for(const P of E.beforeEnter)K.push(In(P,L,J));else K.push(In(E.beforeEnter,L,J));return K.push(m),Ye(K)}).then(()=>(L.matched.forEach(E=>E.enterCallbacks={}),K=Vo(Se,"beforeRouteEnter",L,J,v),K.push(m),Ye(K))).then(()=>{K=[];for(const E of a.list())K.push(In(E,L,J));return K.push(m),Ye(K)}).catch(E=>Qt(E,ke.NAVIGATION_CANCELLED)?E:Promise.reject(E))}function I(L,J,K){c.list().forEach(Y=>v(()=>Y(L,J,K)))}function R(L,J,K,Y,le){const Se=W(L,J);if(Se)return Se;const m=J===wn,E=ys?history.state:{};K&&(Y||m?r.replace(L.fullPath,ye({scroll:m&&E&&E.scroll},le)):r.push(L.fullPath,le)),u.value=L,Ne(L,J,K,m),It()}let w;function be(){w||(w=r.listen((L,J,K)=>{if(!ft.listening)return;const Y=j(L),le=ce(Y,ft.currentRoute.value);if(le){b(ye(le,{replace:!0,force:!0}),Y).catch(gr);return}f=Y;const Se=u.value;ys&&A_(Fl(Se.fullPath,K.delta),Qi()),T(Y,Se).catch(m=>Qt(m,ke.NAVIGATION_ABORTED|ke.NAVIGATION_CANCELLED)?m:Qt(m,ke.NAVIGATION_GUARD_REDIRECT)?(b(ye($(m.to),{force:!0}),Y).then(E=>{Qt(E,ke.NAVIGATION_ABORTED|ke.NAVIGATION_DUPLICATED)&&!K.delta&&K.type===fa.pop&&r.go(-1,!1)}).catch(gr),Promise.reject()):(K.delta&&r.go(-K.delta,!1),ne(m,Y,Se))).then(m=>{m=m||R(Y,Se,!1),m&&(K.delta&&!Qt(m,ke.NAVIGATION_CANCELLED)?r.go(-K.delta,!1):K.type===fa.pop&&Qt(m,ke.NAVIGATION_ABORTED|ke.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),I(Y,Se,m)}).catch(gr)}))}let qe=nr(),ge=nr(),pe;function ne(L,J,K){It(L);const Y=ge.list();return Y.length?Y.forEach(le=>le(L,J,K)):console.error(L),Promise.reject(L)}function Ke(){return pe&&u.value!==wn?Promise.resolve():new Promise((L,J)=>{qe.add([L,J])})}function It(L){return pe||(pe=!L,be(),qe.list().forEach(([J,K])=>L?K(L):J()),qe.reset()),L}function Ne(L,J,K,Y){const{scrollBehavior:le}=t;if(!ys||!le)return Promise.resolve();const Se=!K&&R_(Fl(L.fullPath,0))||(Y||!K)&&history.state&&history.state.scroll||null;return xh().then(()=>le(L,J,Se)).then(m=>m&&S_(m)).catch(m=>ne(m,L,J))}const Ce=L=>r.go(L);let mt;const Xe=new Set,ft={currentRoute:u,listening:!0,addRoute:A,removeRoute:S,clearRoutes:e.clearRoutes,hasRoute:D,getRoutes:k,resolve:j,options:t,push:G,replace:ee,go:Ce,back:()=>Ce(-1),forward:()=>Ce(1),beforeEach:o.add,beforeResolve:a.add,afterEach:c.add,onError:ge.add,isReady:Ke,install(L){L.component("RouterLink",ty),L.component("RouterView",iy),L.config.globalProperties.$router=ft,Object.defineProperty(L.config.globalProperties,"$route",{enumerable:!0,get:()=>bs(u)}),ys&&!mt&&u.value===wn&&(mt=!0,G(r.location).catch(Y=>{}));const J={};for(const Y in wn)Object.defineProperty(J,Y,{get:()=>u.value[Y],enumerable:!0});L.provide(Zi,ft),L.provide(Tf,Oh(J)),L.provide(pa,u);const K=L.unmount;Xe.add(L),L.unmount=function(){Xe.delete(L),Xe.size<1&&(f=wn,w&&w(),w=null,u.value=wn,mt=!1,pe=!1),K()}}};function Ye(L){return L.reduce((J,K)=>J.then(()=>v(K)),Promise.resolve())}return ft}function Cf(){return At(Zi)}const ay={key:0},cy={key:1},ly={__name:"HomeView",setup(t){const e=At("currentUserRef",null),n=Et(()=>{var s;return((s=e==null?void 0:e.value)==null?void 0:s.email)||null});return(s,r)=>(Ue(),He(ut,null,[r[2]||(r[2]=re("h1",null,"Home",-1)),n.value?(Ue(),He("p",ay,[r[0]||(r[0]=at("Welcome back, ",-1)),re("strong",null,ze(n.value),1),r[1]||(r[1]=at(".",-1))])):(Ue(),He("p",cy,"Use the buttons in the header to sign in or register."))],64))}},uy={class:"container py-4"},hy={class:"col-sm-6 col-md-4"},fy={class:"col-auto"},dy=["disabled"],py={key:0,class:"alert alert-danger"},gy={key:1,class:"card"},my={class:"card-body"},_y={class:"card-title"},yy={class:"mb-1"},wy={class:"mb-1"},Ey={class:"text-muted mb-0"},vy={__name:"WeatherView",setup(t){const e=Je(""),n=Je(!1),s=Je(""),r=Je(null);async function o(){var a;s.value="",r.value=null,n.value=!0;try{if(!e.value.trim())throw new Error("Please enter a city name.");const u=await(await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(e.value)}&count=1&language=en&format=json`)).json();if(!((a=u.results)!=null&&a.length))throw new Error("City not found.");const{latitude:f,longitude:d,name:g,country:_}=u.results[0],S=await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${f}&longitude=${d}&current_weather=true`)).json();if(!S.current_weather)throw new Error("No weather data returned.");r.value={place:`${g}${_?", "+_:""}`,...S.current_weather}}catch(c){s.value=(c==null?void 0:c.message)??"Failed to fetch weather."}finally{n.value=!1}}return(a,c)=>(Ue(),He("div",uy,[c[3]||(c[3]=re("h1",{class:"mb-3"},"Weather",-1)),re("form",{class:"row g-2 align-items-center mb-3",onSubmit:Wm(o,["prevent"])},[re("div",hy,[Tr(re("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>e.value=u),type:"text",class:"form-control",placeholder:"Enter city, e.g. Melbourne"},null,512),[[Rr,e.value]])]),re("div",fy,[re("button",{disabled:n.value,class:"btn btn-primary"},ze(n.value?"Checking…":"Check weather"),9,dy)])],32),s.value?(Ue(),He("div",py,ze(s.value),1)):Dn("",!0),r.value?(Ue(),He("div",gy,[re("div",my,[re("h5",_y,ze(r.value.place),1),re("p",yy,[c[1]||(c[1]=re("strong",null,"Temperature:",-1)),at(" "+ze(r.value.temperature)+" °C ",1)]),re("p",wy,[c[2]||(c[2]=re("strong",null,"Wind:",-1)),at(" "+ze(r.value.windspeed)+" km/h (dir "+ze(r.value.winddirection)+"°) ",1)]),re("p",Ey,[re("small",null,"As of: "+ze(r.value.time),1)])])])):Dn("",!0)]))}};function Pf(t,e){return function(){return t.apply(e,arguments)}}const{toString:by}=Object.prototype,{getPrototypeOf:Ya}=Object,{iterator:eo,toStringTag:Of}=Symbol,to=(t=>e=>{const n=by.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Lt=t=>(t=t.toLowerCase(),e=>to(e)===t),no=t=>e=>typeof e===t,{isArray:Ls}=Array,ks=no("undefined");function Lr(t){return t!==null&&!ks(t)&&t.constructor!==null&&!ks(t.constructor)&&pt(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Nf=Lt("ArrayBuffer");function Iy(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Nf(t.buffer),e}const Ty=no("string"),pt=no("function"),kf=no("number"),Mr=t=>t!==null&&typeof t=="object",Sy=t=>t===!0||t===!1,pi=t=>{if(to(t)!=="object")return!1;const e=Ya(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Of in t)&&!(eo in t)},Ay=t=>{if(!Mr(t)||Lr(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},Ry=Lt("Date"),Cy=Lt("File"),Py=Lt("Blob"),Oy=Lt("FileList"),Ny=t=>Mr(t)&&pt(t.pipe),ky=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||pt(t.append)&&((e=to(t))==="formdata"||e==="object"&&pt(t.toString)&&t.toString()==="[object FormData]"))},Dy=Lt("URLSearchParams"),[xy,Ly,My,Uy]=["ReadableStream","Request","Response","Headers"].map(Lt),Fy=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ur(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let s,r;if(typeof t!="object"&&(t=[t]),Ls(t))for(s=0,r=t.length;s<r;s++)e.call(null,t[s],s,t);else{if(Lr(t))return;const o=n?Object.getOwnPropertyNames(t):Object.keys(t),a=o.length;let c;for(s=0;s<a;s++)c=o[s],e.call(null,t[c],c,t)}}function Df(t,e){if(Lr(t))return null;e=e.toLowerCase();const n=Object.keys(t);let s=n.length,r;for(;s-- >0;)if(r=n[s],e===r.toLowerCase())return r;return null}const Jn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,xf=t=>!ks(t)&&t!==Jn;function ga(){const{caseless:t,skipUndefined:e}=xf(this)&&this||{},n={},s=(r,o)=>{const a=t&&Df(n,o)||o;pi(n[a])&&pi(r)?n[a]=ga(n[a],r):pi(r)?n[a]=ga({},r):Ls(r)?n[a]=r.slice():(!e||!ks(r))&&(n[a]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ur(arguments[r],s);return n}const Vy=(t,e,n,{allOwnKeys:s}={})=>(Ur(e,(r,o)=>{n&&pt(r)?t[o]=Pf(r,n):t[o]=r},{allOwnKeys:s}),t),By=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),jy=(t,e,n,s)=>{t.prototype=Object.create(e.prototype,s),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},Hy=(t,e,n,s)=>{let r,o,a;const c={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),o=r.length;o-- >0;)a=r[o],(!s||s(a,t,e))&&!c[a]&&(e[a]=t[a],c[a]=!0);t=n!==!1&&Ya(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},$y=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const s=t.indexOf(e,n);return s!==-1&&s===n},Wy=t=>{if(!t)return null;if(Ls(t))return t;let e=t.length;if(!kf(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},Gy=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Ya(Uint8Array)),qy=(t,e)=>{const s=(t&&t[eo]).call(t);let r;for(;(r=s.next())&&!r.done;){const o=r.value;e.call(t,o[0],o[1])}},Ky=(t,e)=>{let n;const s=[];for(;(n=t.exec(e))!==null;)s.push(n);return s},zy=Lt("HTMLFormElement"),Jy=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,s,r){return s.toUpperCase()+r}),Yl=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),Xy=Lt("RegExp"),Lf=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),s={};Ur(n,(r,o)=>{let a;(a=e(r,o,t))!==!1&&(s[o]=a||r)}),Object.defineProperties(t,s)},Yy=t=>{Lf(t,(e,n)=>{if(pt(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const s=t[n];if(pt(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Qy=(t,e)=>{const n={},s=r=>{r.forEach(o=>{n[o]=!0})};return Ls(t)?s(t):s(String(t).split(e)),n},Zy=()=>{},ew=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function tw(t){return!!(t&&pt(t.append)&&t[Of]==="FormData"&&t[eo])}const nw=t=>{const e=new Array(10),n=(s,r)=>{if(Mr(s)){if(e.indexOf(s)>=0)return;if(Lr(s))return s;if(!("toJSON"in s)){e[r]=s;const o=Ls(s)?[]:{};return Ur(s,(a,c)=>{const u=n(a,r+1);!ks(u)&&(o[c]=u)}),e[r]=void 0,o}}return s};return n(t,0)},sw=Lt("AsyncFunction"),rw=t=>t&&(Mr(t)||pt(t))&&pt(t.then)&&pt(t.catch),Mf=((t,e)=>t?setImmediate:e?((n,s)=>(Jn.addEventListener("message",({source:r,data:o})=>{r===Jn&&o===n&&s.length&&s.shift()()},!1),r=>{s.push(r),Jn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",pt(Jn.postMessage)),iw=typeof queueMicrotask<"u"?queueMicrotask.bind(Jn):typeof process<"u"&&process.nextTick||Mf,ow=t=>t!=null&&pt(t[eo]),O={isArray:Ls,isArrayBuffer:Nf,isBuffer:Lr,isFormData:ky,isArrayBufferView:Iy,isString:Ty,isNumber:kf,isBoolean:Sy,isObject:Mr,isPlainObject:pi,isEmptyObject:Ay,isReadableStream:xy,isRequest:Ly,isResponse:My,isHeaders:Uy,isUndefined:ks,isDate:Ry,isFile:Cy,isBlob:Py,isRegExp:Xy,isFunction:pt,isStream:Ny,isURLSearchParams:Dy,isTypedArray:Gy,isFileList:Oy,forEach:Ur,merge:ga,extend:Vy,trim:Fy,stripBOM:By,inherits:jy,toFlatObject:Hy,kindOf:to,kindOfTest:Lt,endsWith:$y,toArray:Wy,forEachEntry:qy,matchAll:Ky,isHTMLForm:zy,hasOwnProperty:Yl,hasOwnProp:Yl,reduceDescriptors:Lf,freezeMethods:Yy,toObjectSet:Qy,toCamelCase:Jy,noop:Zy,toFiniteNumber:ew,findKey:Df,global:Jn,isContextDefined:xf,isSpecCompliantForm:tw,toJSONObject:nw,isAsyncFn:sw,isThenable:rw,setImmediate:Mf,asap:iw,isIterable:ow};function oe(t,e,n,s,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),s&&(this.request=s),r&&(this.response=r,this.status=r.status?r.status:null)}O.inherits(oe,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:O.toJSONObject(this.config),code:this.code,status:this.status}}});const Uf=oe.prototype,Ff={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Ff[t]={value:t}});Object.defineProperties(oe,Ff);Object.defineProperty(Uf,"isAxiosError",{value:!0});oe.from=(t,e,n,s,r,o)=>{const a=Object.create(Uf);O.toFlatObject(t,a,function(d){return d!==Error.prototype},f=>f!=="isAxiosError");const c=t&&t.message?t.message:"Error",u=e==null&&t?t.code:e;return oe.call(a,c,u,n,s,r),t&&a.cause==null&&Object.defineProperty(a,"cause",{value:t,configurable:!0}),a.name=t&&t.name||"Error",o&&Object.assign(a,o),a};const aw=null;function ma(t){return O.isPlainObject(t)||O.isArray(t)}function Vf(t){return O.endsWith(t,"[]")?t.slice(0,-2):t}function Ql(t,e,n){return t?t.concat(e).map(function(r,o){return r=Vf(r),!n&&o?"["+r+"]":r}).join(n?".":""):e}function cw(t){return O.isArray(t)&&!t.some(ma)}const lw=O.toFlatObject(O,{},null,function(e){return/^is[A-Z]/.test(e)});function so(t,e,n){if(!O.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=O.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(k,D){return!O.isUndefined(D[k])});const s=n.metaTokens,r=n.visitor||d,o=n.dots,a=n.indexes,u=(n.Blob||typeof Blob<"u"&&Blob)&&O.isSpecCompliantForm(e);if(!O.isFunction(r))throw new TypeError("visitor must be a function");function f(S){if(S===null)return"";if(O.isDate(S))return S.toISOString();if(O.isBoolean(S))return S.toString();if(!u&&O.isBlob(S))throw new oe("Blob is not supported. Use a Buffer instead.");return O.isArrayBuffer(S)||O.isTypedArray(S)?u&&typeof Blob=="function"?new Blob([S]):Buffer.from(S):S}function d(S,k,D){let j=S;if(S&&!D&&typeof S=="object"){if(O.endsWith(k,"{}"))k=s?k:k.slice(0,-2),S=JSON.stringify(S);else if(O.isArray(S)&&cw(S)||(O.isFileList(S)||O.endsWith(k,"[]"))&&(j=O.toArray(S)))return k=Vf(k),j.forEach(function(W,G){!(O.isUndefined(W)||W===null)&&e.append(a===!0?Ql([k],G,o):a===null?k:k+"[]",f(W))}),!1}return ma(S)?!0:(e.append(Ql(D,k,o),f(S)),!1)}const g=[],_=Object.assign(lw,{defaultVisitor:d,convertValue:f,isVisitable:ma});function A(S,k){if(!O.isUndefined(S)){if(g.indexOf(S)!==-1)throw Error("Circular reference detected in "+k.join("."));g.push(S),O.forEach(S,function(j,$){(!(O.isUndefined(j)||j===null)&&r.call(e,j,O.isString($)?$.trim():$,k,_))===!0&&A(j,k?k.concat($):[$])}),g.pop()}}if(!O.isObject(t))throw new TypeError("data must be an object");return A(t),e}function Zl(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(s){return e[s]})}function Qa(t,e){this._pairs=[],t&&so(t,this,e)}const Bf=Qa.prototype;Bf.append=function(e,n){this._pairs.push([e,n])};Bf.toString=function(e){const n=e?function(s){return e.call(this,s,Zl)}:Zl;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function uw(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function jf(t,e,n){if(!e)return t;const s=n&&n.encode||uw;O.isFunction(n)&&(n={serialize:n});const r=n&&n.serialize;let o;if(r?o=r(e,n):o=O.isURLSearchParams(e)?e.toString():new Qa(e,n).toString(s),o){const a=t.indexOf("#");a!==-1&&(t=t.slice(0,a)),t+=(t.indexOf("?")===-1?"?":"&")+o}return t}class eu{constructor(){this.handlers=[]}use(e,n,s){return this.handlers.push({fulfilled:e,rejected:n,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){O.forEach(this.handlers,function(s){s!==null&&e(s)})}}const Hf={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},hw=typeof URLSearchParams<"u"?URLSearchParams:Qa,fw=typeof FormData<"u"?FormData:null,dw=typeof Blob<"u"?Blob:null,pw={isBrowser:!0,classes:{URLSearchParams:hw,FormData:fw,Blob:dw},protocols:["http","https","file","blob","url","data"]},Za=typeof window<"u"&&typeof document<"u",_a=typeof navigator=="object"&&navigator||void 0,gw=Za&&(!_a||["ReactNative","NativeScript","NS"].indexOf(_a.product)<0),mw=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",_w=Za&&window.location.href||"http://localhost",yw=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Za,hasStandardBrowserEnv:gw,hasStandardBrowserWebWorkerEnv:mw,navigator:_a,origin:_w},Symbol.toStringTag,{value:"Module"})),tt={...yw,...pw};function ww(t,e){return so(t,new tt.classes.URLSearchParams,{visitor:function(n,s,r,o){return tt.isNode&&O.isBuffer(n)?(this.append(s,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...e})}function Ew(t){return O.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function vw(t){const e={},n=Object.keys(t);let s;const r=n.length;let o;for(s=0;s<r;s++)o=n[s],e[o]=t[o];return e}function $f(t){function e(n,s,r,o){let a=n[o++];if(a==="__proto__")return!0;const c=Number.isFinite(+a),u=o>=n.length;return a=!a&&O.isArray(r)?r.length:a,u?(O.hasOwnProp(r,a)?r[a]=[r[a],s]:r[a]=s,!c):((!r[a]||!O.isObject(r[a]))&&(r[a]=[]),e(n,s,r[a],o)&&O.isArray(r[a])&&(r[a]=vw(r[a])),!c)}if(O.isFormData(t)&&O.isFunction(t.entries)){const n={};return O.forEachEntry(t,(s,r)=>{e(Ew(s),r,n,0)}),n}return null}function bw(t,e,n){if(O.isString(t))try{return(e||JSON.parse)(t),O.trim(t)}catch(s){if(s.name!=="SyntaxError")throw s}return(n||JSON.stringify)(t)}const Fr={transitional:Hf,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const s=n.getContentType()||"",r=s.indexOf("application/json")>-1,o=O.isObject(e);if(o&&O.isHTMLForm(e)&&(e=new FormData(e)),O.isFormData(e))return r?JSON.stringify($f(e)):e;if(O.isArrayBuffer(e)||O.isBuffer(e)||O.isStream(e)||O.isFile(e)||O.isBlob(e)||O.isReadableStream(e))return e;if(O.isArrayBufferView(e))return e.buffer;if(O.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let c;if(o){if(s.indexOf("application/x-www-form-urlencoded")>-1)return ww(e,this.formSerializer).toString();if((c=O.isFileList(e))||s.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return so(c?{"files[]":e}:e,u&&new u,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),bw(e)):e}],transformResponse:[function(e){const n=this.transitional||Fr.transitional,s=n&&n.forcedJSONParsing,r=this.responseType==="json";if(O.isResponse(e)||O.isReadableStream(e))return e;if(e&&O.isString(e)&&(s&&!this.responseType||r)){const a=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(e,this.parseReviver)}catch(c){if(a)throw c.name==="SyntaxError"?oe.from(c,oe.ERR_BAD_RESPONSE,this,null,this.response):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:tt.classes.FormData,Blob:tt.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};O.forEach(["delete","get","head","post","put","patch"],t=>{Fr.headers[t]={}});const Iw=O.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Tw=t=>{const e={};let n,s,r;return t&&t.split(`
`).forEach(function(a){r=a.indexOf(":"),n=a.substring(0,r).trim().toLowerCase(),s=a.substring(r+1).trim(),!(!n||e[n]&&Iw[n])&&(n==="set-cookie"?e[n]?e[n].push(s):e[n]=[s]:e[n]=e[n]?e[n]+", "+s:s)}),e},tu=Symbol("internals");function sr(t){return t&&String(t).trim().toLowerCase()}function gi(t){return t===!1||t==null?t:O.isArray(t)?t.map(gi):String(t)}function Sw(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=n.exec(t);)e[s[1]]=s[2];return e}const Aw=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Bo(t,e,n,s,r){if(O.isFunction(s))return s.call(this,e,n);if(r&&(e=n),!!O.isString(e)){if(O.isString(s))return e.indexOf(s)!==-1;if(O.isRegExp(s))return s.test(e)}}function Rw(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,s)=>n.toUpperCase()+s)}function Cw(t,e){const n=O.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(t,s+n,{value:function(r,o,a){return this[s].call(this,e,r,o,a)},configurable:!0})})}class gt{constructor(e){e&&this.set(e)}set(e,n,s){const r=this;function o(c,u,f){const d=sr(u);if(!d)throw new Error("header name must be a non-empty string");const g=O.findKey(r,d);(!g||r[g]===void 0||f===!0||f===void 0&&r[g]!==!1)&&(r[g||u]=gi(c))}const a=(c,u)=>O.forEach(c,(f,d)=>o(f,d,u));if(O.isPlainObject(e)||e instanceof this.constructor)a(e,n);else if(O.isString(e)&&(e=e.trim())&&!Aw(e))a(Tw(e),n);else if(O.isObject(e)&&O.isIterable(e)){let c={},u,f;for(const d of e){if(!O.isArray(d))throw TypeError("Object iterator must return a key-value pair");c[f=d[0]]=(u=c[f])?O.isArray(u)?[...u,d[1]]:[u,d[1]]:d[1]}a(c,n)}else e!=null&&o(n,e,s);return this}get(e,n){if(e=sr(e),e){const s=O.findKey(this,e);if(s){const r=this[s];if(!n)return r;if(n===!0)return Sw(r);if(O.isFunction(n))return n.call(this,r,s);if(O.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=sr(e),e){const s=O.findKey(this,e);return!!(s&&this[s]!==void 0&&(!n||Bo(this,this[s],s,n)))}return!1}delete(e,n){const s=this;let r=!1;function o(a){if(a=sr(a),a){const c=O.findKey(s,a);c&&(!n||Bo(s,s[c],c,n))&&(delete s[c],r=!0)}}return O.isArray(e)?e.forEach(o):o(e),r}clear(e){const n=Object.keys(this);let s=n.length,r=!1;for(;s--;){const o=n[s];(!e||Bo(this,this[o],o,e,!0))&&(delete this[o],r=!0)}return r}normalize(e){const n=this,s={};return O.forEach(this,(r,o)=>{const a=O.findKey(s,o);if(a){n[a]=gi(r),delete n[o];return}const c=e?Rw(o):String(o).trim();c!==o&&delete n[o],n[c]=gi(r),s[c]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return O.forEach(this,(s,r)=>{s!=null&&s!==!1&&(n[r]=e&&O.isArray(s)?s.join(", "):s)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const s=new this(e);return n.forEach(r=>s.set(r)),s}static accessor(e){const s=(this[tu]=this[tu]={accessors:{}}).accessors,r=this.prototype;function o(a){const c=sr(a);s[c]||(Cw(r,a),s[c]=!0)}return O.isArray(e)?e.forEach(o):o(e),this}}gt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);O.reduceDescriptors(gt.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(s){this[n]=s}}});O.freezeMethods(gt);function jo(t,e){const n=this||Fr,s=e||n,r=gt.from(s.headers);let o=s.data;return O.forEach(t,function(c){o=c.call(n,o,r.normalize(),e?e.status:void 0)}),r.normalize(),o}function Wf(t){return!!(t&&t.__CANCEL__)}function Ms(t,e,n){oe.call(this,t??"canceled",oe.ERR_CANCELED,e,n),this.name="CanceledError"}O.inherits(Ms,oe,{__CANCEL__:!0});function Gf(t,e,n){const s=n.config.validateStatus;!n.status||!s||s(n.status)?t(n):e(new oe("Request failed with status code "+n.status,[oe.ERR_BAD_REQUEST,oe.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Pw(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function Ow(t,e){t=t||10;const n=new Array(t),s=new Array(t);let r=0,o=0,a;return e=e!==void 0?e:1e3,function(u){const f=Date.now(),d=s[o];a||(a=f),n[r]=u,s[r]=f;let g=o,_=0;for(;g!==r;)_+=n[g++],g=g%t;if(r=(r+1)%t,r===o&&(o=(o+1)%t),f-a<e)return;const A=d&&f-d;return A?Math.round(_*1e3/A):void 0}}function Nw(t,e){let n=0,s=1e3/e,r,o;const a=(f,d=Date.now())=>{n=d,r=null,o&&(clearTimeout(o),o=null),t(...f)};return[(...f)=>{const d=Date.now(),g=d-n;g>=s?a(f,d):(r=f,o||(o=setTimeout(()=>{o=null,a(r)},s-g)))},()=>r&&a(r)]}const Ni=(t,e,n=3)=>{let s=0;const r=Ow(50,250);return Nw(o=>{const a=o.loaded,c=o.lengthComputable?o.total:void 0,u=a-s,f=r(u),d=a<=c;s=a;const g={loaded:a,total:c,progress:c?a/c:void 0,bytes:u,rate:f||void 0,estimated:f&&c&&d?(c-a)/f:void 0,event:o,lengthComputable:c!=null,[e?"download":"upload"]:!0};t(g)},n)},nu=(t,e)=>{const n=t!=null;return[s=>e[0]({lengthComputable:n,total:t,loaded:s}),e[1]]},su=t=>(...e)=>O.asap(()=>t(...e)),kw=tt.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,tt.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(tt.origin),tt.navigator&&/(msie|trident)/i.test(tt.navigator.userAgent)):()=>!0,Dw=tt.hasStandardBrowserEnv?{write(t,e,n,s,r,o){const a=[t+"="+encodeURIComponent(e)];O.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),O.isString(s)&&a.push("path="+s),O.isString(r)&&a.push("domain="+r),o===!0&&a.push("secure"),document.cookie=a.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function xw(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Lw(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function qf(t,e,n){let s=!xw(e);return t&&(s||n==!1)?Lw(t,e):e}const ru=t=>t instanceof gt?{...t}:t;function ns(t,e){e=e||{};const n={};function s(f,d,g,_){return O.isPlainObject(f)&&O.isPlainObject(d)?O.merge.call({caseless:_},f,d):O.isPlainObject(d)?O.merge({},d):O.isArray(d)?d.slice():d}function r(f,d,g,_){if(O.isUndefined(d)){if(!O.isUndefined(f))return s(void 0,f,g,_)}else return s(f,d,g,_)}function o(f,d){if(!O.isUndefined(d))return s(void 0,d)}function a(f,d){if(O.isUndefined(d)){if(!O.isUndefined(f))return s(void 0,f)}else return s(void 0,d)}function c(f,d,g){if(g in e)return s(f,d);if(g in t)return s(void 0,f)}const u={url:o,method:o,data:o,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c,headers:(f,d,g)=>r(ru(f),ru(d),g,!0)};return O.forEach(Object.keys({...t,...e}),function(d){const g=u[d]||r,_=g(t[d],e[d],d);O.isUndefined(_)&&g!==c||(n[d]=_)}),n}const Kf=t=>{const e=ns({},t);let{data:n,withXSRFToken:s,xsrfHeaderName:r,xsrfCookieName:o,headers:a,auth:c}=e;if(e.headers=a=gt.from(a),e.url=jf(qf(e.baseURL,e.url,e.allowAbsoluteUrls),t.params,t.paramsSerializer),c&&a.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),O.isFormData(n)){if(tt.hasStandardBrowserEnv||tt.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(O.isFunction(n.getHeaders)){const u=n.getHeaders(),f=["content-type","content-length"];Object.entries(u).forEach(([d,g])=>{f.includes(d.toLowerCase())&&a.set(d,g)})}}if(tt.hasStandardBrowserEnv&&(s&&O.isFunction(s)&&(s=s(e)),s||s!==!1&&kw(e.url))){const u=r&&o&&Dw.read(o);u&&a.set(r,u)}return e},Mw=typeof XMLHttpRequest<"u",Uw=Mw&&function(t){return new Promise(function(n,s){const r=Kf(t);let o=r.data;const a=gt.from(r.headers).normalize();let{responseType:c,onUploadProgress:u,onDownloadProgress:f}=r,d,g,_,A,S;function k(){A&&A(),S&&S(),r.cancelToken&&r.cancelToken.unsubscribe(d),r.signal&&r.signal.removeEventListener("abort",d)}let D=new XMLHttpRequest;D.open(r.method.toUpperCase(),r.url,!0),D.timeout=r.timeout;function j(){if(!D)return;const W=gt.from("getAllResponseHeaders"in D&&D.getAllResponseHeaders()),ee={data:!c||c==="text"||c==="json"?D.responseText:D.response,status:D.status,statusText:D.statusText,headers:W,config:t,request:D};Gf(function(b){n(b),k()},function(b){s(b),k()},ee),D=null}"onloadend"in D?D.onloadend=j:D.onreadystatechange=function(){!D||D.readyState!==4||D.status===0&&!(D.responseURL&&D.responseURL.indexOf("file:")===0)||setTimeout(j)},D.onabort=function(){D&&(s(new oe("Request aborted",oe.ECONNABORTED,t,D)),D=null)},D.onerror=function(G){const ee=G&&G.message?G.message:"Network Error",ce=new oe(ee,oe.ERR_NETWORK,t,D);ce.event=G||null,s(ce),D=null},D.ontimeout=function(){let G=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const ee=r.transitional||Hf;r.timeoutErrorMessage&&(G=r.timeoutErrorMessage),s(new oe(G,ee.clarifyTimeoutError?oe.ETIMEDOUT:oe.ECONNABORTED,t,D)),D=null},o===void 0&&a.setContentType(null),"setRequestHeader"in D&&O.forEach(a.toJSON(),function(G,ee){D.setRequestHeader(ee,G)}),O.isUndefined(r.withCredentials)||(D.withCredentials=!!r.withCredentials),c&&c!=="json"&&(D.responseType=r.responseType),f&&([_,S]=Ni(f,!0),D.addEventListener("progress",_)),u&&D.upload&&([g,A]=Ni(u),D.upload.addEventListener("progress",g),D.upload.addEventListener("loadend",A)),(r.cancelToken||r.signal)&&(d=W=>{D&&(s(!W||W.type?new Ms(null,t,D):W),D.abort(),D=null)},r.cancelToken&&r.cancelToken.subscribe(d),r.signal&&(r.signal.aborted?d():r.signal.addEventListener("abort",d)));const $=Pw(r.url);if($&&tt.protocols.indexOf($)===-1){s(new oe("Unsupported protocol "+$+":",oe.ERR_BAD_REQUEST,t));return}D.send(o||null)})},Fw=(t,e)=>{const{length:n}=t=t?t.filter(Boolean):[];if(e||n){let s=new AbortController,r;const o=function(f){if(!r){r=!0,c();const d=f instanceof Error?f:this.reason;s.abort(d instanceof oe?d:new Ms(d instanceof Error?d.message:d))}};let a=e&&setTimeout(()=>{a=null,o(new oe(`timeout ${e} of ms exceeded`,oe.ETIMEDOUT))},e);const c=()=>{t&&(a&&clearTimeout(a),a=null,t.forEach(f=>{f.unsubscribe?f.unsubscribe(o):f.removeEventListener("abort",o)}),t=null)};t.forEach(f=>f.addEventListener("abort",o));const{signal:u}=s;return u.unsubscribe=()=>O.asap(c),u}},Vw=function*(t,e){let n=t.byteLength;if(n<e){yield t;return}let s=0,r;for(;s<n;)r=s+e,yield t.slice(s,r),s=r},Bw=async function*(t,e){for await(const n of jw(t))yield*Vw(n,e)},jw=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:s}=await e.read();if(n)break;yield s}}finally{await e.cancel()}},iu=(t,e,n,s)=>{const r=Bw(t,e);let o=0,a,c=u=>{a||(a=!0,s&&s(u))};return new ReadableStream({async pull(u){try{const{done:f,value:d}=await r.next();if(f){c(),u.close();return}let g=d.byteLength;if(n){let _=o+=g;n(_)}u.enqueue(new Uint8Array(d))}catch(f){throw c(f),f}},cancel(u){return c(u),r.return()}},{highWaterMark:2})},ou=64*1024,{isFunction:ii}=O,Hw=(({Request:t,Response:e})=>({Request:t,Response:e}))(O.global),{ReadableStream:au,TextEncoder:cu}=O.global,lu=(t,...e)=>{try{return!!t(...e)}catch{return!1}},$w=t=>{t=O.merge.call({skipUndefined:!0},Hw,t);const{fetch:e,Request:n,Response:s}=t,r=e?ii(e):typeof fetch=="function",o=ii(n),a=ii(s);if(!r)return!1;const c=r&&ii(au),u=r&&(typeof cu=="function"?(S=>k=>S.encode(k))(new cu):async S=>new Uint8Array(await new n(S).arrayBuffer())),f=o&&c&&lu(()=>{let S=!1;const k=new n(tt.origin,{body:new au,method:"POST",get duplex(){return S=!0,"half"}}).headers.has("Content-Type");return S&&!k}),d=a&&c&&lu(()=>O.isReadableStream(new s("").body)),g={stream:d&&(S=>S.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(S=>{!g[S]&&(g[S]=(k,D)=>{let j=k&&k[S];if(j)return j.call(k);throw new oe(`Response type '${S}' is not supported`,oe.ERR_NOT_SUPPORT,D)})});const _=async S=>{if(S==null)return 0;if(O.isBlob(S))return S.size;if(O.isSpecCompliantForm(S))return(await new n(tt.origin,{method:"POST",body:S}).arrayBuffer()).byteLength;if(O.isArrayBufferView(S)||O.isArrayBuffer(S))return S.byteLength;if(O.isURLSearchParams(S)&&(S=S+""),O.isString(S))return(await u(S)).byteLength},A=async(S,k)=>{const D=O.toFiniteNumber(S.getContentLength());return D??_(k)};return async S=>{let{url:k,method:D,data:j,signal:$,cancelToken:W,timeout:G,onDownloadProgress:ee,onUploadProgress:ce,responseType:b,headers:y,withCredentials:v="same-origin",fetchOptions:T}=Kf(S),I=e||fetch;b=b?(b+"").toLowerCase():"text";let R=Fw([$,W&&W.toAbortSignal()],G),w=null;const be=R&&R.unsubscribe&&(()=>{R.unsubscribe()});let qe;try{if(ce&&f&&D!=="get"&&D!=="head"&&(qe=await A(y,j))!==0){let Ne=new n(k,{method:"POST",body:j,duplex:"half"}),Ce;if(O.isFormData(j)&&(Ce=Ne.headers.get("content-type"))&&y.setContentType(Ce),Ne.body){const[mt,Xe]=nu(qe,Ni(su(ce)));j=iu(Ne.body,ou,mt,Xe)}}O.isString(v)||(v=v?"include":"omit");const ge=o&&"credentials"in n.prototype,pe={...T,signal:R,method:D.toUpperCase(),headers:y.normalize().toJSON(),body:j,duplex:"half",credentials:ge?v:void 0};w=o&&new n(k,pe);let ne=await(o?I(w,T):I(k,pe));const Ke=d&&(b==="stream"||b==="response");if(d&&(ee||Ke&&be)){const Ne={};["status","statusText","headers"].forEach(ft=>{Ne[ft]=ne[ft]});const Ce=O.toFiniteNumber(ne.headers.get("content-length")),[mt,Xe]=ee&&nu(Ce,Ni(su(ee),!0))||[];ne=new s(iu(ne.body,ou,mt,()=>{Xe&&Xe(),be&&be()}),Ne)}b=b||"text";let It=await g[O.findKey(g,b)||"text"](ne,S);return!Ke&&be&&be(),await new Promise((Ne,Ce)=>{Gf(Ne,Ce,{data:It,headers:gt.from(ne.headers),status:ne.status,statusText:ne.statusText,config:S,request:w})})}catch(ge){throw be&&be(),ge&&ge.name==="TypeError"&&/Load failed|fetch/i.test(ge.message)?Object.assign(new oe("Network Error",oe.ERR_NETWORK,S,w),{cause:ge.cause||ge}):oe.from(ge,ge&&ge.code,S,w)}}},Ww=new Map,zf=t=>{let e=t?t.env:{};const{fetch:n,Request:s,Response:r}=e,o=[s,r,n];let a=o.length,c=a,u,f,d=Ww;for(;c--;)u=o[c],f=d.get(u),f===void 0&&d.set(u,f=c?new Map:$w(e)),d=f;return f};zf();const ya={http:aw,xhr:Uw,fetch:{get:zf}};O.forEach(ya,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const uu=t=>`- ${t}`,Gw=t=>O.isFunction(t)||t===null||t===!1,Jf={getAdapter:(t,e)=>{t=O.isArray(t)?t:[t];const{length:n}=t;let s,r;const o={};for(let a=0;a<n;a++){s=t[a];let c;if(r=s,!Gw(s)&&(r=ya[(c=String(s)).toLowerCase()],r===void 0))throw new oe(`Unknown adapter '${c}'`);if(r&&(O.isFunction(r)||(r=r.get(e))))break;o[c||"#"+a]=r}if(!r){const a=Object.entries(o).map(([u,f])=>`adapter ${u} `+(f===!1?"is not supported by the environment":"is not available in the build"));let c=n?a.length>1?`since :
`+a.map(uu).join(`
`):" "+uu(a[0]):"as no adapter specified";throw new oe("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return r},adapters:ya};function Ho(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Ms(null,t)}function hu(t){return Ho(t),t.headers=gt.from(t.headers),t.data=jo.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Jf.getAdapter(t.adapter||Fr.adapter,t)(t).then(function(s){return Ho(t),s.data=jo.call(t,t.transformResponse,s),s.headers=gt.from(s.headers),s},function(s){return Wf(s)||(Ho(t),s&&s.response&&(s.response.data=jo.call(t,t.transformResponse,s.response),s.response.headers=gt.from(s.response.headers))),Promise.reject(s)})}const Xf="1.12.2",ro={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{ro[t]=function(s){return typeof s===t||"a"+(e<1?"n ":" ")+t}});const fu={};ro.transitional=function(e,n,s){function r(o,a){return"[Axios v"+Xf+"] Transitional option '"+o+"'"+a+(s?". "+s:"")}return(o,a,c)=>{if(e===!1)throw new oe(r(a," has been removed"+(n?" in "+n:"")),oe.ERR_DEPRECATED);return n&&!fu[a]&&(fu[a]=!0,console.warn(r(a," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(o,a,c):!0}};ro.spelling=function(e){return(n,s)=>(console.warn(`${s} is likely a misspelling of ${e}`),!0)};function qw(t,e,n){if(typeof t!="object")throw new oe("options must be an object",oe.ERR_BAD_OPTION_VALUE);const s=Object.keys(t);let r=s.length;for(;r-- >0;){const o=s[r],a=e[o];if(a){const c=t[o],u=c===void 0||a(c,o,t);if(u!==!0)throw new oe("option "+o+" must be "+u,oe.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new oe("Unknown option "+o,oe.ERR_BAD_OPTION)}}const mi={assertOptions:qw,validators:ro},Vt=mi.validators;class Qn{constructor(e){this.defaults=e||{},this.interceptors={request:new eu,response:new eu}}async request(e,n){try{return await this._request(e,n)}catch(s){if(s instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{s.stack?o&&!String(s.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(s.stack+=`
`+o):s.stack=o}catch{}}throw s}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=ns(this.defaults,n);const{transitional:s,paramsSerializer:r,headers:o}=n;s!==void 0&&mi.assertOptions(s,{silentJSONParsing:Vt.transitional(Vt.boolean),forcedJSONParsing:Vt.transitional(Vt.boolean),clarifyTimeoutError:Vt.transitional(Vt.boolean)},!1),r!=null&&(O.isFunction(r)?n.paramsSerializer={serialize:r}:mi.assertOptions(r,{encode:Vt.function,serialize:Vt.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),mi.assertOptions(n,{baseUrl:Vt.spelling("baseURL"),withXsrfToken:Vt.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let a=o&&O.merge(o.common,o[n.method]);o&&O.forEach(["delete","get","head","post","put","patch","common"],S=>{delete o[S]}),n.headers=gt.concat(a,o);const c=[];let u=!0;this.interceptors.request.forEach(function(k){typeof k.runWhen=="function"&&k.runWhen(n)===!1||(u=u&&k.synchronous,c.unshift(k.fulfilled,k.rejected))});const f=[];this.interceptors.response.forEach(function(k){f.push(k.fulfilled,k.rejected)});let d,g=0,_;if(!u){const S=[hu.bind(this),void 0];for(S.unshift(...c),S.push(...f),_=S.length,d=Promise.resolve(n);g<_;)d=d.then(S[g++],S[g++]);return d}_=c.length;let A=n;for(;g<_;){const S=c[g++],k=c[g++];try{A=S(A)}catch(D){k.call(this,D);break}}try{d=hu.call(this,A)}catch(S){return Promise.reject(S)}for(g=0,_=f.length;g<_;)d=d.then(f[g++],f[g++]);return d}getUri(e){e=ns(this.defaults,e);const n=qf(e.baseURL,e.url,e.allowAbsoluteUrls);return jf(n,e.params,e.paramsSerializer)}}O.forEach(["delete","get","head","options"],function(e){Qn.prototype[e]=function(n,s){return this.request(ns(s||{},{method:e,url:n,data:(s||{}).data}))}});O.forEach(["post","put","patch"],function(e){function n(s){return function(o,a,c){return this.request(ns(c||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:o,data:a}))}}Qn.prototype[e]=n(),Qn.prototype[e+"Form"]=n(!0)});class ec{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const s=this;this.promise.then(r=>{if(!s._listeners)return;let o=s._listeners.length;for(;o-- >0;)s._listeners[o](r);s._listeners=null}),this.promise.then=r=>{let o;const a=new Promise(c=>{s.subscribe(c),o=c}).then(r);return a.cancel=function(){s.unsubscribe(o)},a},e(function(o,a,c){s.reason||(s.reason=new Ms(o,a,c),n(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=s=>{e.abort(s)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new ec(function(r){e=r}),cancel:e}}}function Kw(t){return function(n){return t.apply(null,n)}}function zw(t){return O.isObject(t)&&t.isAxiosError===!0}const wa={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(wa).forEach(([t,e])=>{wa[e]=t});function Yf(t){const e=new Qn(t),n=Pf(Qn.prototype.request,e);return O.extend(n,Qn.prototype,e,{allOwnKeys:!0}),O.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return Yf(ns(t,r))},n}const xe=Yf(Fr);xe.Axios=Qn;xe.CanceledError=Ms;xe.CancelToken=ec;xe.isCancel=Wf;xe.VERSION=Xf;xe.toFormData=so;xe.AxiosError=oe;xe.Cancel=xe.CanceledError;xe.all=function(e){return Promise.all(e)};xe.spread=Kw;xe.isAxiosError=zw;xe.mergeConfig=ns;xe.AxiosHeaders=gt;xe.formToJSON=t=>$f(O.isHTMLForm(t)?new FormData(t):t);xe.getAdapter=Jf.getAdapter;xe.HttpStatusCode=wa;xe.default=xe;const Jw={class:"container py-4",style:{"max-width":"860px"}},Xw={key:0,class:"alert alert-danger"},Yw={key:1,class:"bg-light border rounded p-3"},Qw={__name:"CountBookAPIView",setup(t){const n=Je(null),s=Je("");async function r(){try{s.value="";const{data:o}=await xe.get(void 0);n.value=o}catch(o){s.value="Failed to fetch count JSON.",console.error(o)}}return $h(r),(o,a)=>(Ue(),He("section",Jw,[a[0]||(a[0]=re("h1",{class:"mb-3"},"Count Book API (JSON)",-1)),s.value?(Ue(),He("div",Xw,ze(s.value),1)):Dn("",!0),n.value?(Ue(),He("pre",Yw,""+ze(JSON.stringify(n.value,null,2))+`
    `,1)):Dn("",!0)]))}},Zw=()=>{};var du={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},eE=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],a=t[n++],c=t[n++],u=((r&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(u>>10)),e[s++]=String.fromCharCode(56320+(u&1023))}else{const o=t[n++],a=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Zf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],a=r+1<t.length,c=a?t[r+1]:0,u=r+2<t.length,f=u?t[r+2]:0,d=o>>2,g=(o&3)<<4|c>>4;let _=(c&15)<<2|f>>6,A=f&63;u||(A=64,a||(_=64)),s.push(n[d],n[g],n[_],n[A])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Qf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],c=r<t.length?n[t.charAt(r)]:0;++r;const f=r<t.length?n[t.charAt(r)]:64;++r;const g=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||c==null||f==null||g==null)throw new tE;const _=o<<2|c>>4;if(s.push(_),f!==64){const A=c<<4&240|f>>2;if(s.push(A),g!==64){const S=f<<6&192|g;s.push(S)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nE=function(t){const e=Qf(t);return Zf.encodeByteArray(e,!0)},ki=function(t){return nE(t).replace(/\./g,"")},ed=function(t){try{return Zf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE=()=>sE().__FIREBASE_DEFAULTS__,iE=()=>{if(typeof process>"u"||typeof du>"u")return;const t=du.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},oE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ed(t[1]);return e&&JSON.parse(e)},tc=()=>{try{return Zw()||rE()||iE()||oE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},td=t=>{var e,n;return(n=(e=tc())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},aE=t=>{const e=td(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},nd=()=>{var t;return(t=tc())==null?void 0:t.config},sd=t=>{var e;return(e=tc())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function rd(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...t};return[ki(JSON.stringify(n)),ki(JSON.stringify(a)),""].join(".")}const mr={};function uE(){const t={prod:[],emulator:[]};for(const e of Object.keys(mr))mr[e]?t.emulator.push(e):t.prod.push(e);return t}function hE(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let pu=!1;function id(t,e){if(typeof window>"u"||typeof document>"u"||!Vr(window.location.host)||mr[t]===e||mr[t]||pu)return;mr[t]=e;function n(_){return`__firebase__banner__${_}`}const s="__firebase__banner",o=uE().prod.length>0;function a(){const _=document.getElementById(s);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,A){_.setAttribute("width","24"),_.setAttribute("id",A),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function f(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{pu=!0,a()},_}function d(_,A){_.setAttribute("id",A),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function g(){const _=hE(s),A=n("text"),S=document.getElementById(A)||document.createElement("span"),k=n("learnmore"),D=document.getElementById(k)||document.createElement("a"),j=n("preprendIcon"),$=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const W=_.element;c(W),d(D,k);const G=f();u($,j),W.append($,S,D,G),document.body.appendChild(W)}o?(S.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ht())}function dE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pE(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function gE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mE(){const t=ht();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function _E(){try{return typeof indexedDB=="object"}catch{return!1}}function yE(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var o;e(((o=r.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE="FirebaseError";class fn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=wE,Object.setPrototypeOf(this,fn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Br.prototype.create)}}class Br{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?EE(o,s):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new fn(r,c,s)}}function EE(t,e){return t.replace(vE,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const vE=/\{\$([^}]+)}/g;function bE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ss(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const o=t[r],a=e[r];if(gu(o)&&gu(a)){if(!ss(o,a))return!1}else if(o!==a)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function gu(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function ir(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,o]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(o)}}),e}function or(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function IE(t,e){const n=new TE(t,e);return n.subscribe.bind(n)}class TE{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");SE(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=$o),r.error===void 0&&(r.error=$o),r.complete===void 0&&(r.complete=$o);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function SE(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function $o(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(t){return t&&t._delegate?t._delegate:t}class rs{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new cE;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(CE(e))try{this.getOrInitializeService({instanceIdentifier:qn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=qn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=qn){return this.instances.has(e)}getOptions(e=qn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);s===c&&a.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:RE(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=qn){return this.component?this.component.multipleInstances?e:qn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function RE(t){return t===qn?void 0:t}function CE(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new AE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ve||(ve={}));const OE={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},NE=ve.INFO,kE={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},DE=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=kE[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class nc{constructor(e){this.name=e,this._logLevel=NE,this._logHandler=DE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?OE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const xE=(t,e)=>e.some(n=>t instanceof n);let mu,_u;function LE(){return mu||(mu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ME(){return _u||(_u=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const od=new WeakMap,Ea=new WeakMap,ad=new WeakMap,Wo=new WeakMap,sc=new WeakMap;function UE(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{n(Pn(t.result)),r()},a=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&od.set(n,t)}).catch(()=>{}),sc.set(e,t),e}function FE(t){if(Ea.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{n(),r()},a=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)});Ea.set(t,e)}let va={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ea.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ad.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Pn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function VE(t){va=t(va)}function BE(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Go(this),e,...n);return ad.set(s,e.sort?e.sort():[e]),Pn(s)}:ME().includes(t)?function(...e){return t.apply(Go(this),e),Pn(od.get(this))}:function(...e){return Pn(t.apply(Go(this),e))}}function jE(t){return typeof t=="function"?BE(t):(t instanceof IDBTransaction&&FE(t),xE(t,LE())?new Proxy(t,va):t)}function Pn(t){if(t instanceof IDBRequest)return UE(t);if(Wo.has(t))return Wo.get(t);const e=jE(t);return e!==t&&(Wo.set(t,e),sc.set(e,t)),e}const Go=t=>sc.get(t);function HE(t,e,{blocked:n,upgrade:s,blocking:r,terminated:o}={}){const a=indexedDB.open(t,e),c=Pn(a);return s&&a.addEventListener("upgradeneeded",u=>{s(Pn(a.result),u.oldVersion,u.newVersion,Pn(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),c.then(u=>{o&&u.addEventListener("close",()=>o()),r&&u.addEventListener("versionchange",f=>r(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const $E=["get","getKey","getAll","getAllKeys","count"],WE=["put","add","delete","clear"],qo=new Map;function yu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(qo.get(e))return qo.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=WE.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||$E.includes(n)))return;const o=async function(a,...c){const u=this.transaction(a,r?"readwrite":"readonly");let f=u.store;return s&&(f=f.index(c.shift())),(await Promise.all([f[n](...c),r&&u.done]))[0]};return qo.set(e,o),o}VE(t=>({...t,get:(e,n,s)=>yu(e,n)||t.get(e,n,s),has:(e,n)=>!!yu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qE(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function qE(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ba="@firebase/app",wu="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new nc("@firebase/app"),KE="@firebase/app-compat",zE="@firebase/analytics-compat",JE="@firebase/analytics",XE="@firebase/app-check-compat",YE="@firebase/app-check",QE="@firebase/auth",ZE="@firebase/auth-compat",ev="@firebase/database",tv="@firebase/data-connect",nv="@firebase/database-compat",sv="@firebase/functions",rv="@firebase/functions-compat",iv="@firebase/installations",ov="@firebase/installations-compat",av="@firebase/messaging",cv="@firebase/messaging-compat",lv="@firebase/performance",uv="@firebase/performance-compat",hv="@firebase/remote-config",fv="@firebase/remote-config-compat",dv="@firebase/storage",pv="@firebase/storage-compat",gv="@firebase/firestore",mv="@firebase/ai",_v="@firebase/firestore-compat",yv="firebase",wv="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="[DEFAULT]",Ev={[ba]:"fire-core",[KE]:"fire-core-compat",[JE]:"fire-analytics",[zE]:"fire-analytics-compat",[YE]:"fire-app-check",[XE]:"fire-app-check-compat",[QE]:"fire-auth",[ZE]:"fire-auth-compat",[ev]:"fire-rtdb",[tv]:"fire-data-connect",[nv]:"fire-rtdb-compat",[sv]:"fire-fn",[rv]:"fire-fn-compat",[iv]:"fire-iid",[ov]:"fire-iid-compat",[av]:"fire-fcm",[cv]:"fire-fcm-compat",[lv]:"fire-perf",[uv]:"fire-perf-compat",[hv]:"fire-rc",[fv]:"fire-rc-compat",[dv]:"fire-gcs",[pv]:"fire-gcs-compat",[gv]:"fire-fst",[_v]:"fire-fst-compat",[mv]:"fire-vertex","fire-js":"fire-js",[yv]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Di=new Map,vv=new Map,Ta=new Map;function Eu(t,e){try{t.container.addComponent(e)}catch(n){ln.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ds(t){const e=t.name;if(Ta.has(e))return ln.debug(`There were multiple attempts to register component ${e}.`),!1;Ta.set(e,t);for(const n of Di.values())Eu(n,t);for(const n of vv.values())Eu(n,t);return!0}function rc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function St(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},On=new Br("app","Firebase",bv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new rs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw On.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=wv;function ic(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Ia,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw On.create("bad-app-name",{appName:String(r)});if(n||(n=nd()),!n)throw On.create("no-options");const o=Di.get(r);if(o){if(ss(n,o.options)&&ss(s,o.config))return o;throw On.create("duplicate-app",{appName:r})}const a=new PE(r);for(const u of Ta.values())a.addComponent(u);const c=new Iv(n,s,a);return Di.set(r,c),c}function cd(t=Ia){const e=Di.get(t);if(!e&&t===Ia&&nd())return ic();if(!e)throw On.create("no-app",{appName:t});return e}function Nn(t,e,n){let s=Ev[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ln.warn(a.join(" "));return}Ds(new rs(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv="firebase-heartbeat-database",Sv=1,Pr="firebase-heartbeat-store";let Ko=null;function ld(){return Ko||(Ko=HE(Tv,Sv,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Pr)}catch(n){console.warn(n)}}}}).catch(t=>{throw On.create("idb-open",{originalErrorMessage:t.message})})),Ko}async function Av(t){try{const n=(await ld()).transaction(Pr),s=await n.objectStore(Pr).get(ud(t));return await n.done,s}catch(e){if(e instanceof fn)ln.warn(e.message);else{const n=On.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ln.warn(n.message)}}}async function vu(t,e){try{const s=(await ld()).transaction(Pr,"readwrite");await s.objectStore(Pr).put(e,ud(t)),await s.done}catch(n){if(n instanceof fn)ln.warn(n.message);else{const s=On.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ln.warn(s.message)}}}function ud(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv=1024,Cv=30;class Pv{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Nv(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=bu();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats.length>Cv){const a=kv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ln.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=bu(),{heartbeatsToSend:s,unsentEntries:r}=Ov(this._heartbeatsCache.heartbeats),o=ki(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return ln.warn(n),""}}}function bu(){return new Date().toISOString().substring(0,10)}function Ov(t,e=Rv){const n=[];let s=t.slice();for(const r of t){const o=n.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),Iu(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Iu(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Nv{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _E()?yE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Av(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return vu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return vu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Iu(t){return ki(JSON.stringify({version:2,heartbeats:t})).length}function kv(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dv(t){Ds(new rs("platform-logger",e=>new GE(e),"PRIVATE")),Ds(new rs("heartbeat",e=>new Pv(e),"PRIVATE")),Nn(ba,wu,t),Nn(ba,wu,"esm2020"),Nn("fire-js","")}Dv("");function hd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xv=hd,fd=new Br("auth","Firebase",hd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi=new nc("@firebase/auth");function Lv(t,...e){xi.logLevel<=ve.WARN&&xi.warn(`Auth (${Us}): ${t}`,...e)}function _i(t,...e){xi.logLevel<=ve.ERROR&&xi.error(`Auth (${Us}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t,...e){throw oc(t,...e)}function Kt(t,...e){return oc(t,...e)}function dd(t,e,n){const s={...xv(),[e]:n};return new Br("auth","Firebase",s).create(e,{appName:t.name})}function on(t){return dd(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oc(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return fd.create(t,...e)}function Z(t,e,...n){if(!t)throw oc(e,...n)}function sn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw _i(e),new Error(e)}function un(t,e){t||sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Mv(){return Tu()==="http:"||Tu()==="https:"}function Tu(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Mv()||pE()||"connection"in navigator)?navigator.onLine:!0}function Fv(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,n){this.shortDelay=e,this.longDelay=n,un(n>e,"Short delay should be less than long delay!"),this.isMobile=fE()||gE()}get(){return Uv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(t,e){un(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],jv=new Hr(3e4,6e4);function Un(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Fn(t,e,n,s,r={}){return gd(t,r,async()=>{let o={},a={};s&&(e==="GET"?a=s:o={body:JSON.stringify(s)});const c=jr({key:t.config.apiKey,...a}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const f={method:e,headers:u,...o};return dE()||(f.referrerPolicy="no-referrer"),t.emulatorConfig&&Vr(t.emulatorConfig.host)&&(f.credentials="include"),pd.fetch()(await md(t,t.config.apiHost,n,c),f)})}async function gd(t,e,n){t._canInitEmulator=!1;const s={...Vv,...e};try{const r=new $v(t),o=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw oi(t,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[u,f]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw oi(t,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw oi(t,"email-already-in-use",a);if(u==="USER_DISABLED")throw oi(t,"user-disabled",a);const d=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw dd(t,d,f);xt(t,d)}}catch(r){if(r instanceof fn)throw r;xt(t,"network-request-failed",{message:String(r)})}}async function $r(t,e,n,s,r={}){const o=await Fn(t,e,n,s,r);return"mfaPendingCredential"in o&&xt(t,"multi-factor-auth-required",{_serverResponse:o}),o}async function md(t,e,n,s){const r=`${e}${n}?${s}`,o=t,a=o.config.emulator?ac(t.config,r):`${t.config.apiScheme}://${r}`;return Bv.includes(n)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}function Hv(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $v{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Kt(this.auth,"network-request-failed")),jv.get())})}}function oi(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Kt(t,e,s);return r.customData._tokenResponse=n,r}function Su(t){return t!==void 0&&t.enterprise!==void 0}class Wv{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Hv(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Gv(t,e){return Fn(t,"GET","/v2/recaptchaConfig",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qv(t,e){return Fn(t,"POST","/v1/accounts:delete",e)}async function Li(t,e){return Fn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _r(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Kv(t,e=!1){const n=Mn(t),s=await n.getIdToken(e),r=cc(s);Z(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:r,token:s,authTime:_r(zo(r.auth_time)),issuedAtTime:_r(zo(r.iat)),expirationTime:_r(zo(r.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function zo(t){return Number(t)*1e3}function cc(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return _i("JWT malformed, contained fewer than 3 sections"),null;try{const r=ed(n);return r?JSON.parse(r):(_i("Failed to decode base64 JWT payload"),null)}catch(r){return _i("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Au(t){const e=cc(t);return Z(e,"internal-error"),Z(typeof e.exp<"u","internal-error"),Z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Or(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof fn&&zv(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function zv({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=_r(this.lastLoginAt),this.creationTime=_r(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mi(t){var g;const e=t.auth,n=await t.getIdToken(),s=await Or(t,Li(e,{idToken:n}));Z(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=(g=r.providerUserInfo)!=null&&g.length?_d(r.providerUserInfo):[],a=Yv(t.providerData,o),c=t.isAnonymous,u=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),f=c?u:!1,d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Aa(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(t,d)}async function Xv(t){const e=Mn(t);await Mi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yv(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function _d(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qv(t,e){const n=await gd(t,{},async()=>{const s=jr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=t.config,a=await md(t,r,"/v1/token",`key=${o}`),c=await t._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:s};return t.emulatorConfig&&Vr(t.emulatorConfig.host)&&(u.credentials="include"),pd.fetch()(a,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Zv(t,e){return Fn(t,"POST","/v2/accounts:revokeToken",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Z(e.idToken,"internal-error"),Z(typeof e.idToken<"u","internal-error"),Z(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Au(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Z(e.length!==0,"internal-error");const n=Au(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:o}=await Qv(e,n);this.updateTokensAndExpiration(s,r,Number(o))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:o}=n,a=new Ss;return s&&(Z(typeof s=="string","internal-error",{appName:e}),a.refreshToken=s),r&&(Z(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),o&&(Z(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ss,this.toJSON())}_performRefresh(){return sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function En(t,e){Z(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Pt{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Jv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Aa(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Or(this,this.stsTokenManager.getToken(this.auth,e));return Z(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Kv(this,e)}reload(){return Xv(this)}_assign(e){this!==e&&(Z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Pt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Mi(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(St(this.auth.app))return Promise.reject(on(this.auth));const e=await this.getIdToken();return await Or(this,qv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,o=n.phoneNumber??void 0,a=n.photoURL??void 0,c=n.tenantId??void 0,u=n._redirectEventId??void 0,f=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:g,emailVerified:_,isAnonymous:A,providerData:S,stsTokenManager:k}=n;Z(g&&k,e,"internal-error");const D=Ss.fromJSON(this.name,k);Z(typeof g=="string",e,"internal-error"),En(s,e.name),En(r,e.name),Z(typeof _=="boolean",e,"internal-error"),Z(typeof A=="boolean",e,"internal-error"),En(o,e.name),En(a,e.name),En(c,e.name),En(u,e.name),En(f,e.name),En(d,e.name);const j=new Pt({uid:g,auth:e,email:r,emailVerified:_,displayName:s,isAnonymous:A,photoURL:a,phoneNumber:o,tenantId:c,stsTokenManager:D,createdAt:f,lastLoginAt:d});return S&&Array.isArray(S)&&(j.providerData=S.map($=>({...$}))),u&&(j._redirectEventId=u),j}static async _fromIdTokenResponse(e,n,s=!1){const r=new Ss;r.updateFromServerResponse(n);const o=new Pt({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Mi(o),o}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];Z(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?_d(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),c=new Ss;c.updateFromIdToken(s);const u=new Pt({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Aa(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,f),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru=new Map;function rn(t){un(t instanceof Function,"Expected a class definition");let e=Ru.get(t);return e?(un(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ru.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yd.type="NONE";const Cu=yd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(t,e,n){return`firebase:${t}:${e}:${n}`}class As{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:o}=this.auth;this.fullUserKey=yi(this.userKey,r.apiKey,o),this.fullPersistenceKey=yi("persistence",r.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Li(this.auth,{idToken:e}).catch(()=>{});return n?Pt._fromGetAccountInfoResponse(this.auth,n,e):null}return Pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new As(rn(Cu),e,s);const r=(await Promise.all(n.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=r[0]||rn(Cu);const a=yi(s,e.config.apiKey,e.name);let c=null;for(const f of n)try{const d=await f._get(a);if(d){let g;if(typeof d=="string"){const _=await Li(e,{idToken:d}).catch(()=>{});if(!_)break;g=await Pt._fromGetAccountInfoResponse(e,_,d)}else g=Pt._fromJSON(e,d);f!==o&&(c=g),o=f;break}}catch{}const u=r.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new As(o,e,s):(o=u[0],c&&await o._set(a,c.toJSON()),await Promise.all(n.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new As(o,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Td(e))return"Blackberry";if(Sd(e))return"Webos";if(Ed(e))return"Safari";if((e.includes("chrome/")||vd(e))&&!e.includes("edge/"))return"Chrome";if(Id(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function wd(t=ht()){return/firefox\//i.test(t)}function Ed(t=ht()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function vd(t=ht()){return/crios\//i.test(t)}function bd(t=ht()){return/iemobile/i.test(t)}function Id(t=ht()){return/android/i.test(t)}function Td(t=ht()){return/blackberry/i.test(t)}function Sd(t=ht()){return/webos/i.test(t)}function lc(t=ht()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function eb(t=ht()){var e;return lc(t)&&!!((e=window.navigator)!=null&&e.standalone)}function tb(){return mE()&&document.documentMode===10}function Ad(t=ht()){return lc(t)||Id(t)||Sd(t)||Td(t)||/windows phone/i.test(t)||bd(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(t,e=[]){let n;switch(t){case"Browser":n=Pu(ht());break;case"Worker":n=`${Pu(ht())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Us}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=o=>new Promise((a,c)=>{try{const u=e(o);a(u)}catch(u){c(u)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sb(t,e={}){return Fn(t,"GET","/v2/passwordPolicy",Un(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rb=6;class ib{constructor(e){var s;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??rb,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ou(this),this.idTokenSubscription=new Ou(this),this.beforeStateQueue=new nb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=rn(n)),this._initializationPromise=this.queue(async()=>{var s,r,o;if(!this._deleted&&(this.persistenceManager=await As.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Li(this,{idToken:e}),s=await Pt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(St(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Mi(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(St(this.app))return Promise.reject(on(this));const n=e?Mn(e):null;return n&&Z(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return St(this.app)?Promise.reject(on(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return St(this.app)?Promise.reject(on(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await sb(this),n=new ib(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Br("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await Zv(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&rn(e)||this._popupRedirectResolver;Z(n,this,"argument-error"),this.redirectPersistenceManager=await As.create(this,[rn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Z(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,s,r);return()=>{a=!0,u()}}else{const u=e.addObserver(n);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var n;if(St(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Lv(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ls(t){return Mn(t)}class Ou{constructor(e){this.auth=e,this.observer=null,this.addObserver=IE(n=>this.observer=n)}get next(){return Z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let io={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ab(t){io=t}function Cd(t){return io.loadJS(t)}function cb(){return io.recaptchaEnterpriseScript}function lb(){return io.gapiScript}function ub(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class hb{constructor(){this.enterprise=new fb}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class fb{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const db="recaptcha-enterprise",Pd="NO_RECAPTCHA";class pb{constructor(e){this.type=db,this.auth=ls(e)}async verify(e="verify",n=!1){async function s(o){if(!n){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{Gv(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const f=new Wv(u);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,a(f.siteKey)}}).catch(u=>{c(u)})})}function r(o,a,c){const u=window.grecaptcha;Su(u)?u.enterprise.ready(()=>{u.enterprise.execute(o,{action:e}).then(f=>{a(f)}).catch(()=>{a(Pd)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new hb().execute("siteKey",{action:"verify"}):new Promise((o,a)=>{s(this.auth).then(c=>{if(!n&&Su(window.grecaptcha))r(c,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=cb();u.length!==0&&(u+=c),Cd(u).then(()=>{r(c,o,a)}).catch(f=>{a(f)})}}).catch(c=>{a(c)})})}}async function Nu(t,e,n,s=!1,r=!1){const o=new pb(t);let a;if(r)a=Pd;else try{a=await o.verify(n)}catch{a=await o.verify(n,!0)}const c={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,f=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:f,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return s?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ra(t,e,n,s,r){var o;if((o=t._getRecaptchaConfig())!=null&&o.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Nu(t,e,n,n==="getOobCode");return s(t,a)}else return s(t,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Nu(t,e,n,n==="getOobCode");return s(t,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gb(t,e){const n=rc(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),o=n.getOptions();if(ss(o,e??{}))return r;xt(r,"already-initialized")}return n.initialize({options:e})}function mb(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(rn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function _b(t,e,n){const s=ls(t);Z(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!!(n!=null&&n.disableWarnings),o=Od(e),{host:a,port:c}=yb(e),u=c===null?"":`:${c}`,f={url:`${o}//${a}${u}/`},d=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){Z(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),Z(ss(f,s.config.emulator)&&ss(d,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=f,s.emulatorConfig=d,s.settings.appVerificationDisabledForTesting=!0,Vr(a)?(rd(`${o}//${a}${u}`),id("Auth",!0)):wb()}function Od(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function yb(t){const e=Od(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const o=r[1];return{host:o,port:ku(s.substr(o.length+1))}}else{const[o,a]=s.split(":");return{host:o,port:ku(a)}}}function ku(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function wb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return sn("not implemented")}_getIdTokenResponse(e){return sn("not implemented")}_linkToIdToken(e,n){return sn("not implemented")}_getReauthenticationResolver(e){return sn("not implemented")}}async function Eb(t,e){return Fn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vb(t,e){return $r(t,"POST","/v1/accounts:signInWithPassword",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bb(t,e){return $r(t,"POST","/v1/accounts:signInWithEmailLink",Un(t,e))}async function Ib(t,e){return $r(t,"POST","/v1/accounts:signInWithEmailLink",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr extends uc{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new Nr(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Nr(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(e,n,"signInWithPassword",vb);case"emailLink":return bb(e,{email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(e,s,"signUpPassword",Eb);case"emailLink":return Ib(e,{idToken:n,email:this._email,oobCode:this._password});default:xt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rs(t,e){return $r(t,"POST","/v1/accounts:signInWithIdp",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb="http://localhost";class is extends uc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new is(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):xt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...o}=n;if(!s||!r)return null;const a=new is(s,r);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return Rs(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Rs(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Rs(e,n)}buildRequest(){const e={requestUri:Tb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=jr(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sb(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ab(t){const e=ir(or(t)).link,n=e?ir(or(e)).deep_link_id:null,s=ir(or(t)).deep_link_id;return(s?ir(or(s)).link:null)||s||n||e||t}class hc{constructor(e){const n=ir(or(e)),s=n.apiKey??null,r=n.oobCode??null,o=Sb(n.mode??null);Z(s&&r&&o,"argument-error"),this.apiKey=s,this.operation=o,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=Ab(e);try{return new hc(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(){this.providerId=Fs.PROVIDER_ID}static credential(e,n){return Nr._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=hc.parseLink(n);return Z(s,"argument-error"),Nr._fromEmailAndCode(e,s.code,s.tenantId)}}Fs.PROVIDER_ID="password";Fs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Fs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr extends Nd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends Wr{constructor(){super("facebook.com")}static credential(e){return is._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tn.credential(e.oauthAccessToken)}catch{return null}}}Tn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Tn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Wr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return is._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Sn.credential(n,s)}catch{return null}}}Sn.GOOGLE_SIGN_IN_METHOD="google.com";Sn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Wr{constructor(){super("github.com")}static credential(e){return is._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return An.credential(e.oauthAccessToken)}catch{return null}}}An.GITHUB_SIGN_IN_METHOD="github.com";An.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Wr{constructor(){super("twitter.com")}static credential(e,n){return is._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Rn.credential(n,s)}catch{return null}}}Rn.TWITTER_SIGN_IN_METHOD="twitter.com";Rn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rb(t,e){return $r(t,"POST","/v1/accounts:signUp",Un(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const o=await Pt._fromIdTokenResponse(e,s,r),a=Du(s);return new os({user:o,providerId:a,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Du(s);return new os({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Du(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui extends fn{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Ui.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Ui(e,n,s,r)}}function kd(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Ui._fromErrorAndOperation(t,o,e,s):o})}async function Cb(t,e,n=!1){const s=await Or(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return os._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pb(t,e,n=!1){const{auth:s}=t;if(St(s.app))return Promise.reject(on(s));const r="reauthenticate";try{const o=await Or(t,kd(s,r,e,t),n);Z(o.idToken,s,"internal-error");const a=cc(o.idToken);Z(a,s,"internal-error");const{sub:c}=a;return Z(t.uid===c,s,"user-mismatch"),os._forOperation(t,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&xt(s,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dd(t,e,n=!1){if(St(t.app))return Promise.reject(on(t));const s="signIn",r=await kd(t,s,e),o=await os._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(o.user),o}async function Ob(t,e){return Dd(ls(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xd(t){const e=ls(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Nb(t,e,n){if(St(t.app))return Promise.reject(on(t));const s=ls(t),a=await Ra(s,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Rb).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&xd(t),u}),c=await os._fromIdTokenResponse(s,"signIn",a);return await s._updateCurrentUser(c.user),c}function kb(t,e,n){return St(t.app)?Promise.reject(on(t)):Ob(Mn(t),Fs.credential(e,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&xd(t),s})}function Db(t,e,n,s){return Mn(t).onIdTokenChanged(e,n,s)}function xb(t,e,n){return Mn(t).beforeAuthStateChanged(e,n)}function Lb(t,e,n,s){return Mn(t).onAuthStateChanged(e,n,s)}const Fi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Fi,"1"),this.storage.removeItem(Fi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=1e3,Ub=10;class Md extends Ld{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ad(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(s);!n&&this.localCache[s]===a||this.notifyListeners(s,a)},o=this.storage.getItem(s);tb()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Ub):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},Mb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Md.type="LOCAL";const Fb=Md;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud extends Ld{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ud.type="SESSION";const Fd=Ud;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vb(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new oo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:o}=n.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(a).map(async f=>f(n.origin,o)),u=await Vb(c);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}oo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,a;return new Promise((c,u)=>{const f=fc("",20);r.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},s);a={messageChannel:r,onMessage(g){const _=g;if(_.data.eventId===f)switch(_.data.status){case"ack":clearTimeout(d),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(_.data.response);break;default:clearTimeout(d),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:n},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(){return window}function jb(t){zt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vd(){return typeof zt().WorkerGlobalScope<"u"&&typeof zt().importScripts=="function"}async function Hb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $b(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function Wb(){return Vd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="firebaseLocalStorageDb",Gb=1,Vi="firebaseLocalStorage",jd="fbase_key";class Gr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ao(t,e){return t.transaction([Vi],e?"readwrite":"readonly").objectStore(Vi)}function qb(){const t=indexedDB.deleteDatabase(Bd);return new Gr(t).toPromise()}function Ca(){const t=indexedDB.open(Bd,Gb);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Vi,{keyPath:jd})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Vi)?e(s):(s.close(),await qb(),e(await Ca()))})})}async function xu(t,e,n){const s=ao(t,!0).put({[jd]:e,value:n});return new Gr(s).toPromise()}async function Kb(t,e){const n=ao(t,!1).get(e),s=await new Gr(n).toPromise();return s===void 0?null:s.value}function Lu(t,e){const n=ao(t,!0).delete(e);return new Gr(n).toPromise()}const zb=800,Jb=3;class Hd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ca(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>Jb)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=oo._getInstance(Wb()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await Hb(),!this.activeServiceWorker)return;this.sender=new Bb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$b()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ca();return await xu(e,Fi,"1"),await Lu(e,Fi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>xu(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>Kb(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Lu(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=ao(r,!1).getAll();return new Gr(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Hd.type="LOCAL";const Xb=Hd;new Hr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yb(t,e){return e?rn(e):(Z(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc extends uc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Rs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Rs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Qb(t){return Dd(t.auth,new dc(t),t.bypassAuthState)}function Zb(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),Pb(n,new dc(t),t.bypassAuthState)}async function eI(t){const{auth:e,user:n}=t;return Z(n,e,"internal-error"),Cb(n,new dc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,n,s,r,o=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:n,sessionId:s,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Qb;case"linkViaPopup":case"linkViaRedirect":return eI;case"reauthViaPopup":case"reauthViaRedirect":return Zb;default:xt(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI=new Hr(2e3,1e4);class ws extends $d{constructor(e,n,s,r,o){super(e,n,r,o),this.provider=s,this.authWindow=null,this.pollId=null,ws.currentPopupAction&&ws.currentPopupAction.cancel(),ws.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Z(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");const e=fc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Kt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Kt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ws.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Kt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tI.get())};e()}}ws.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI="pendingRedirect",wi=new Map;class sI extends $d{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=wi.get(this.auth._key());if(!e){try{const s=await rI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}wi.set(this.auth._key(),e)}return this.bypassAuthState||wi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rI(t,e){const n=aI(e),s=oI(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function iI(t,e){wi.set(t._key(),e)}function oI(t){return rn(t._redirectPersistence)}function aI(t){return yi(nI,t.config.apiKey,t.name)}async function cI(t,e,n=!1){if(St(t.app))return Promise.reject(on(t));const s=ls(t),r=Yb(s,e),a=await new sI(s,r,n).execute();return a&&!n&&(delete a.user._redirectEventId,await s._persistUserIfCurrent(a.user),await s._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=10*60*1e3;class uI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!Wd(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(Kt(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mu(e))}saveEventToCache(e){this.cachedEventUids.add(Mu(e)),this.lastProcessedEventTime=Date.now()}}function Mu(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Wd({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wd(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fI(t,e={}){return Fn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pI=/^https?/;async function gI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await fI(t);for(const n of e)try{if(mI(n))return}catch{}xt(t,"unauthorized-domain")}function mI(t){const e=Sa(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===s}if(!pI.test(n))return!1;if(dI.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I=new Hr(3e4,6e4);function Uu(){const t=zt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function yI(t){return new Promise((e,n)=>{var r,o,a;function s(){Uu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Uu(),n(Kt(t,"network-request-failed"))},timeout:_I.get()})}if((o=(r=zt().gapi)==null?void 0:r.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=zt().gapi)!=null&&a.load)s();else{const c=ub("iframefcb");return zt()[c]=()=>{gapi.load?s():n(Kt(t,"network-request-failed"))},Cd(`${lb()}?onload=${c}`).catch(u=>n(u))}}).catch(e=>{throw Ei=null,e})}let Ei=null;function wI(t){return Ei=Ei||yI(t),Ei}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EI=new Hr(5e3,15e3),vI="__/auth/iframe",bI="emulator/auth/iframe",II={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},TI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SI(t){const e=t.config;Z(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ac(e,bI):`https://${t.config.authDomain}/${vI}`,s={apiKey:e.apiKey,appName:t.name,v:Us},r=TI.get(t.config.apiHost);r&&(s.eid=r);const o=t._getFrameworks();return o.length&&(s.fw=o.join(",")),`${n}?${jr(s).slice(1)}`}async function AI(t){const e=await wI(t),n=zt().gapi;return Z(n,t,"internal-error"),e.open({where:document.body,url:SI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:II,dontclear:!0},s=>new Promise(async(r,o)=>{await s.restyle({setHideOnLeave:!1});const a=Kt(t,"network-request-failed"),c=zt().setTimeout(()=>{o(a)},EI.get());function u(){zt().clearTimeout(c),r(s)}s.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CI=500,PI=600,OI="_blank",NI="http://localhost";class Fu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kI(t,e,n,s=CI,r=PI){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const u={...RI,width:s.toString(),height:r.toString(),top:o,left:a},f=ht().toLowerCase();n&&(c=vd(f)?OI:n),wd(f)&&(e=e||NI,u.scrollbars="yes");const d=Object.entries(u).reduce((_,[A,S])=>`${_}${A}=${S},`,"");if(eb(f)&&c!=="_self")return DI(e||"",c),new Fu(null);const g=window.open(e||"",c,d);Z(g,t,"popup-blocked");try{g.focus()}catch{}return new Fu(g)}function DI(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI="__/auth/handler",LI="emulator/auth/handler",MI=encodeURIComponent("fac");async function Vu(t,e,n,s,r,o){Z(t.config.authDomain,t,"auth-domain-config-required"),Z(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Us,eventId:r};if(e instanceof Nd){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",bE(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,g]of Object.entries({}))a[d]=g}if(e instanceof Wr){const d=e.getScopes().filter(g=>g!=="");d.length>0&&(a.scopes=d.join(","))}t.tenantId&&(a.tid=t.tenantId);const c=a;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await t._getAppCheckToken(),f=u?`#${MI}=${encodeURIComponent(u)}`:"";return`${UI(t)}?${jr(c).slice(1)}${f}`}function UI({config:t}){return t.emulator?ac(t,LI):`https://${t.authDomain}/${xI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo="webStorageSupport";class FI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fd,this._completeRedirectFn=cI,this._overrideRedirectResult=iI}async _openPopup(e,n,s,r){var a;un((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await Vu(e,n,s,Sa(),r);return kI(e,o,fc())}async _openRedirect(e,n,s,r){await this._originValidation(e);const o=await Vu(e,n,s,Sa(),r);return jb(o),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:o}=this.eventManagers[n];return r?Promise.resolve(r):(un(o,"If manager is not set, promise should be"),o)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await AI(e),s=new uI(e);return n.register("authEvent",r=>(Z(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Jo,{type:Jo},r=>{var a;const o=(a=r==null?void 0:r[0])==null?void 0:a[Jo];o!==void 0&&n(!!o),xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ad()||Ed()||lc()}}const VI=FI;var Bu="@firebase/auth",ju="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HI(t){Ds(new rs("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=s.options;Z(a&&!a.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:a,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rd(t)},f=new ob(s,r,o,u);return mb(f,n),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Ds(new rs("auth-internal",e=>{const n=ls(e.getProvider("auth").getImmediate());return(s=>new BI(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nn(Bu,ju,jI(t)),Nn(Bu,ju,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=5*60,WI=sd("authIdTokenMaxAge")||$I;let Hu=null;const GI=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>WI)return;const r=n==null?void 0:n.token;Hu!==r&&(Hu=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Gd(t=cd()){const e=rc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=gb(t,{popupRedirectResolver:VI,persistence:[Xb,Fb,Fd]}),s=sd("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(s,location.origin);if(location.origin===o.origin){const a=GI(o.toString());xb(n,a,()=>a(n.currentUser)),Db(n,c=>a(c))}}const r=td("auth");return r&&_b(n,`http://${r}`),n}function qI(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}ab({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const o=Kt("internal-error");o.customData=r,n(o)},s.type="text/javascript",s.charset="UTF-8",qI().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HI("Browser");var KI="firebase",zI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nn(KI,zI,"app");const JI={apiKey:"AIzaSyC7RRiI1kJTBfr5b0V94J5PKIUx2cY-Mcc",authDomain:"fit5032-week6-mahdi.firebaseapp.com",projectId:"fit5032-week6-mahdi",storageBucket:"fit5032-week6-mahdi.firebasestorage.app",messagingSenderId:"7966960281",appId:"1:7966960281:web:44422d3a308a93c657a608"},XI=ic(JI),qd=Gd(XI),Kd=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},YI={style:{"max-width":"520px"}},QI={class:"d-flex align-items-center gap-2"},ZI={key:0,class:"text-danger mt-3"},eT={__name:"RegisterView",setup(t){const e=Cf(),n=Je(""),s=Je(""),r=Je(""),o=async()=>{r.value="";try{await Nb(qd,n.value.trim(),s.value),e.push("/")}catch(a){r.value=a.code||a.message}};return(a,c)=>{const u=Ai("RouterLink");return Ue(),He(ut,null,[c[6]||(c[6]=re("h1",null,"Register",-1)),re("div",YI,[c[3]||(c[3]=re("label",{class:"form-label"},"Email",-1)),Tr(re("input",{class:"form-control mb-3",type:"email","onUpdate:modelValue":c[0]||(c[0]=f=>n.value=f)},null,512),[[Rr,n.value]]),c[4]||(c[4]=re("label",{class:"form-label"},"Password",-1)),Tr(re("input",{class:"form-control mb-3",type:"password","onUpdate:modelValue":c[1]||(c[1]=f=>s.value=f)},null,512),[[Rr,s.value]]),c[5]||(c[5]=re("small",{class:"text-muted d-block mb-3"},"Min 6 characters (Firebase rule)",-1)),re("div",QI,[re("button",{class:"btn btn-primary",onClick:o},"Register"),Oe(u,{to:"/signin"},{default:jt(()=>[...c[2]||(c[2]=[at("Already registered? Sign in",-1)])]),_:1})]),r.value?(Ue(),He("p",ZI,"Error: "+ze(r.value),1)):Dn("",!0)])],64)}}},tT=Kd(eT,[["__scopeId","data-v-687d8118"]]),nT={style:{"max-width":"520px"}},sT={class:"d-flex align-items-center gap-2"},rT={key:0,class:"text-danger mt-3"},iT={__name:"SignInView",setup(t){const e=Cf(),n=Je(""),s=Je(""),r=Je(""),o=async()=>{r.value="";try{await kb(qd,n.value.trim(),s.value),e.push("/")}catch(a){r.value=a.code||a.message}};return(a,c)=>{const u=Ai("RouterLink");return Ue(),He(ut,null,[c[5]||(c[5]=re("h1",null,"Sign In",-1)),re("div",nT,[c[3]||(c[3]=re("label",{class:"form-label"},"Email",-1)),Tr(re("input",{class:"form-control mb-3",type:"email","onUpdate:modelValue":c[0]||(c[0]=f=>n.value=f)},null,512),[[Rr,n.value]]),c[4]||(c[4]=re("label",{class:"form-label"},"Password",-1)),Tr(re("input",{class:"form-control mb-3",type:"password","onUpdate:modelValue":c[1]||(c[1]=f=>s.value=f)},null,512),[[Rr,s.value]]),re("div",sT,[re("button",{class:"btn btn-primary",onClick:o},"Sign In"),Oe(u,{to:"/register"},{default:jt(()=>[...c[2]||(c[2]=[at("Create an account",-1)])]),_:1})]),r.value?(Ue(),He("p",rT,"Error: "+ze(r.value),1)):Dn("",!0)])],64)}}},oT=Kd(iT,[["__scopeId","data-v-525c956f"]]),aT={class:"container py-4"},cT=["disabled"],lT={key:1,class:"alert alert-success"},uT={key:2,class:"alert alert-danger"},$u="https://australia-southeast1-fit5032-week6-mahdi.cloudfunctions.net/countBooks",hT={__name:"GetBookCountView",setup(t){const e=Je(!1),n=Je(null),s=Je(null),r=async()=>{var o,a;e.value=!0,n.value=null,s.value=null;try{const{data:c}=await xe.get($u);n.value=typeof c=="object"&&c!==null?c.count:c}catch(c){s.value=((a=(o=c==null?void 0:c.response)==null?void 0:o.data)==null?void 0:a.error)||c.message}finally{e.value=!1}};return(o,a)=>(Ue(),He("div",aT,[a[2]||(a[2]=re("h1",{class:"mb-3"},"Book Counter",-1)),re("button",{class:"btn btn-primary mb-3",onClick:r,disabled:e.value||!$u},ze(e.value?"Loading…":"Get Book Count"),9,cT),Dn("",!0),n.value!==null?(Ue(),He("div",lT,[a[1]||(a[1]=at(" Total number of books: ",-1)),re("strong",null,ze(n.value),1)])):s.value?(Ue(),He("div",uT," Error: "+ze(s.value),1)):Dn("",!0)]))}},fT=[{path:"/",name:"home",component:ly},{path:"/weather",name:"weather",component:vy},{path:"/books/api",name:"countbookapi",component:Qw},{path:"/register",name:"register",component:tT},{path:"/signin",name:"signin",component:oT},{path:"/getbookcount",name:"getbookcount",component:hT}],dT=oy({history:F_("/week1_12/"),routes:fT});var Wu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pc;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,y){function v(){}v.prototype=y.prototype,b.F=y.prototype,b.prototype=new v,b.prototype.constructor=b,b.D=function(T,I,R){for(var w=Array(arguments.length-2),be=2;be<arguments.length;be++)w[be-2]=arguments[be];return y.prototype[I].apply(T,w)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(b,y,v){v||(v=0);const T=Array(16);if(typeof y=="string")for(var I=0;I<16;++I)T[I]=y.charCodeAt(v++)|y.charCodeAt(v++)<<8|y.charCodeAt(v++)<<16|y.charCodeAt(v++)<<24;else for(I=0;I<16;++I)T[I]=y[v++]|y[v++]<<8|y[v++]<<16|y[v++]<<24;y=b.g[0],v=b.g[1],I=b.g[2];let R=b.g[3],w;w=y+(R^v&(I^R))+T[0]+3614090360&4294967295,y=v+(w<<7&4294967295|w>>>25),w=R+(I^y&(v^I))+T[1]+3905402710&4294967295,R=y+(w<<12&4294967295|w>>>20),w=I+(v^R&(y^v))+T[2]+606105819&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(y^I&(R^y))+T[3]+3250441966&4294967295,v=I+(w<<22&4294967295|w>>>10),w=y+(R^v&(I^R))+T[4]+4118548399&4294967295,y=v+(w<<7&4294967295|w>>>25),w=R+(I^y&(v^I))+T[5]+1200080426&4294967295,R=y+(w<<12&4294967295|w>>>20),w=I+(v^R&(y^v))+T[6]+2821735955&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(y^I&(R^y))+T[7]+4249261313&4294967295,v=I+(w<<22&4294967295|w>>>10),w=y+(R^v&(I^R))+T[8]+1770035416&4294967295,y=v+(w<<7&4294967295|w>>>25),w=R+(I^y&(v^I))+T[9]+2336552879&4294967295,R=y+(w<<12&4294967295|w>>>20),w=I+(v^R&(y^v))+T[10]+4294925233&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(y^I&(R^y))+T[11]+2304563134&4294967295,v=I+(w<<22&4294967295|w>>>10),w=y+(R^v&(I^R))+T[12]+1804603682&4294967295,y=v+(w<<7&4294967295|w>>>25),w=R+(I^y&(v^I))+T[13]+4254626195&4294967295,R=y+(w<<12&4294967295|w>>>20),w=I+(v^R&(y^v))+T[14]+2792965006&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(y^I&(R^y))+T[15]+1236535329&4294967295,v=I+(w<<22&4294967295|w>>>10),w=y+(I^R&(v^I))+T[1]+4129170786&4294967295,y=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(y^v))+T[6]+3225465664&4294967295,R=y+(w<<9&4294967295|w>>>23),w=I+(y^v&(R^y))+T[11]+643717713&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^y&(I^R))+T[0]+3921069994&4294967295,v=I+(w<<20&4294967295|w>>>12),w=y+(I^R&(v^I))+T[5]+3593408605&4294967295,y=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(y^v))+T[10]+38016083&4294967295,R=y+(w<<9&4294967295|w>>>23),w=I+(y^v&(R^y))+T[15]+3634488961&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^y&(I^R))+T[4]+3889429448&4294967295,v=I+(w<<20&4294967295|w>>>12),w=y+(I^R&(v^I))+T[9]+568446438&4294967295,y=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(y^v))+T[14]+3275163606&4294967295,R=y+(w<<9&4294967295|w>>>23),w=I+(y^v&(R^y))+T[3]+4107603335&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^y&(I^R))+T[8]+1163531501&4294967295,v=I+(w<<20&4294967295|w>>>12),w=y+(I^R&(v^I))+T[13]+2850285829&4294967295,y=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(y^v))+T[2]+4243563512&4294967295,R=y+(w<<9&4294967295|w>>>23),w=I+(y^v&(R^y))+T[7]+1735328473&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^y&(I^R))+T[12]+2368359562&4294967295,v=I+(w<<20&4294967295|w>>>12),w=y+(v^I^R)+T[5]+4294588738&4294967295,y=v+(w<<4&4294967295|w>>>28),w=R+(y^v^I)+T[8]+2272392833&4294967295,R=y+(w<<11&4294967295|w>>>21),w=I+(R^y^v)+T[11]+1839030562&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^y)+T[14]+4259657740&4294967295,v=I+(w<<23&4294967295|w>>>9),w=y+(v^I^R)+T[1]+2763975236&4294967295,y=v+(w<<4&4294967295|w>>>28),w=R+(y^v^I)+T[4]+1272893353&4294967295,R=y+(w<<11&4294967295|w>>>21),w=I+(R^y^v)+T[7]+4139469664&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^y)+T[10]+3200236656&4294967295,v=I+(w<<23&4294967295|w>>>9),w=y+(v^I^R)+T[13]+681279174&4294967295,y=v+(w<<4&4294967295|w>>>28),w=R+(y^v^I)+T[0]+3936430074&4294967295,R=y+(w<<11&4294967295|w>>>21),w=I+(R^y^v)+T[3]+3572445317&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^y)+T[6]+76029189&4294967295,v=I+(w<<23&4294967295|w>>>9),w=y+(v^I^R)+T[9]+3654602809&4294967295,y=v+(w<<4&4294967295|w>>>28),w=R+(y^v^I)+T[12]+3873151461&4294967295,R=y+(w<<11&4294967295|w>>>21),w=I+(R^y^v)+T[15]+530742520&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^y)+T[2]+3299628645&4294967295,v=I+(w<<23&4294967295|w>>>9),w=y+(I^(v|~R))+T[0]+4096336452&4294967295,y=v+(w<<6&4294967295|w>>>26),w=R+(v^(y|~I))+T[7]+1126891415&4294967295,R=y+(w<<10&4294967295|w>>>22),w=I+(y^(R|~v))+T[14]+2878612391&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~y))+T[5]+4237533241&4294967295,v=I+(w<<21&4294967295|w>>>11),w=y+(I^(v|~R))+T[12]+1700485571&4294967295,y=v+(w<<6&4294967295|w>>>26),w=R+(v^(y|~I))+T[3]+2399980690&4294967295,R=y+(w<<10&4294967295|w>>>22),w=I+(y^(R|~v))+T[10]+4293915773&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~y))+T[1]+2240044497&4294967295,v=I+(w<<21&4294967295|w>>>11),w=y+(I^(v|~R))+T[8]+1873313359&4294967295,y=v+(w<<6&4294967295|w>>>26),w=R+(v^(y|~I))+T[15]+4264355552&4294967295,R=y+(w<<10&4294967295|w>>>22),w=I+(y^(R|~v))+T[6]+2734768916&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~y))+T[13]+1309151649&4294967295,v=I+(w<<21&4294967295|w>>>11),w=y+(I^(v|~R))+T[4]+4149444226&4294967295,y=v+(w<<6&4294967295|w>>>26),w=R+(v^(y|~I))+T[11]+3174756917&4294967295,R=y+(w<<10&4294967295|w>>>22),w=I+(y^(R|~v))+T[2]+718787259&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~y))+T[9]+3951481745&4294967295,b.g[0]=b.g[0]+y&4294967295,b.g[1]=b.g[1]+(I+(w<<21&4294967295|w>>>11))&4294967295,b.g[2]=b.g[2]+I&4294967295,b.g[3]=b.g[3]+R&4294967295}s.prototype.v=function(b,y){y===void 0&&(y=b.length);const v=y-this.blockSize,T=this.C;let I=this.h,R=0;for(;R<y;){if(I==0)for(;R<=v;)r(this,b,R),R+=this.blockSize;if(typeof b=="string"){for(;R<y;)if(T[I++]=b.charCodeAt(R++),I==this.blockSize){r(this,T),I=0;break}}else for(;R<y;)if(T[I++]=b[R++],I==this.blockSize){r(this,T),I=0;break}}this.h=I,this.o+=y},s.prototype.A=function(){var b=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);b[0]=128;for(var y=1;y<b.length-8;++y)b[y]=0;y=this.o*8;for(var v=b.length-8;v<b.length;++v)b[v]=y&255,y/=256;for(this.v(b),b=Array(16),y=0,v=0;v<4;++v)for(let T=0;T<32;T+=8)b[y++]=this.g[v]>>>T&255;return b};function o(b,y){var v=c;return Object.prototype.hasOwnProperty.call(v,b)?v[b]:v[b]=y(b)}function a(b,y){this.h=y;const v=[];let T=!0;for(let I=b.length-1;I>=0;I--){const R=b[I]|0;T&&R==y||(v[I]=R,T=!1)}this.g=v}var c={};function u(b){return-128<=b&&b<128?o(b,function(y){return new a([y|0],y<0?-1:0)}):new a([b|0],b<0?-1:0)}function f(b){if(isNaN(b)||!isFinite(b))return g;if(b<0)return D(f(-b));const y=[];let v=1;for(let T=0;b>=v;T++)y[T]=b/v|0,v*=4294967296;return new a(y,0)}function d(b,y){if(b.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(b.charAt(0)=="-")return D(d(b.substring(1),y));if(b.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=f(Math.pow(y,8));let T=g;for(let R=0;R<b.length;R+=8){var I=Math.min(8,b.length-R);const w=parseInt(b.substring(R,R+I),y);I<8?(I=f(Math.pow(y,I)),T=T.j(I).add(f(w))):(T=T.j(v),T=T.add(f(w)))}return T}var g=u(0),_=u(1),A=u(16777216);t=a.prototype,t.m=function(){if(k(this))return-D(this).m();let b=0,y=1;for(let v=0;v<this.g.length;v++){const T=this.i(v);b+=(T>=0?T:4294967296+T)*y,y*=4294967296}return b},t.toString=function(b){if(b=b||10,b<2||36<b)throw Error("radix out of range: "+b);if(S(this))return"0";if(k(this))return"-"+D(this).toString(b);const y=f(Math.pow(b,6));var v=this;let T="";for(;;){const I=G(v,y).g;v=j(v,I.j(y));let R=((v.g.length>0?v.g[0]:v.h)>>>0).toString(b);if(v=I,S(v))return R+T;for(;R.length<6;)R="0"+R;T=R+T}},t.i=function(b){return b<0?0:b<this.g.length?this.g[b]:this.h};function S(b){if(b.h!=0)return!1;for(let y=0;y<b.g.length;y++)if(b.g[y]!=0)return!1;return!0}function k(b){return b.h==-1}t.l=function(b){return b=j(this,b),k(b)?-1:S(b)?0:1};function D(b){const y=b.g.length,v=[];for(let T=0;T<y;T++)v[T]=~b.g[T];return new a(v,~b.h).add(_)}t.abs=function(){return k(this)?D(this):this},t.add=function(b){const y=Math.max(this.g.length,b.g.length),v=[];let T=0;for(let I=0;I<=y;I++){let R=T+(this.i(I)&65535)+(b.i(I)&65535),w=(R>>>16)+(this.i(I)>>>16)+(b.i(I)>>>16);T=w>>>16,R&=65535,w&=65535,v[I]=w<<16|R}return new a(v,v[v.length-1]&-2147483648?-1:0)};function j(b,y){return b.add(D(y))}t.j=function(b){if(S(this)||S(b))return g;if(k(this))return k(b)?D(this).j(D(b)):D(D(this).j(b));if(k(b))return D(this.j(D(b)));if(this.l(A)<0&&b.l(A)<0)return f(this.m()*b.m());const y=this.g.length+b.g.length,v=[];for(var T=0;T<2*y;T++)v[T]=0;for(T=0;T<this.g.length;T++)for(let I=0;I<b.g.length;I++){const R=this.i(T)>>>16,w=this.i(T)&65535,be=b.i(I)>>>16,qe=b.i(I)&65535;v[2*T+2*I]+=w*qe,$(v,2*T+2*I),v[2*T+2*I+1]+=R*qe,$(v,2*T+2*I+1),v[2*T+2*I+1]+=w*be,$(v,2*T+2*I+1),v[2*T+2*I+2]+=R*be,$(v,2*T+2*I+2)}for(b=0;b<y;b++)v[b]=v[2*b+1]<<16|v[2*b];for(b=y;b<2*y;b++)v[b]=0;return new a(v,0)};function $(b,y){for(;(b[y]&65535)!=b[y];)b[y+1]+=b[y]>>>16,b[y]&=65535,y++}function W(b,y){this.g=b,this.h=y}function G(b,y){if(S(y))throw Error("division by zero");if(S(b))return new W(g,g);if(k(b))return y=G(D(b),y),new W(D(y.g),D(y.h));if(k(y))return y=G(b,D(y)),new W(D(y.g),y.h);if(b.g.length>30){if(k(b)||k(y))throw Error("slowDivide_ only works with positive integers.");for(var v=_,T=y;T.l(b)<=0;)v=ee(v),T=ee(T);var I=ce(v,1),R=ce(T,1);for(T=ce(T,2),v=ce(v,2);!S(T);){var w=R.add(T);w.l(b)<=0&&(I=I.add(v),R=w),T=ce(T,1),v=ce(v,1)}return y=j(b,I.j(y)),new W(I,y)}for(I=g;b.l(y)>=0;){for(v=Math.max(1,Math.floor(b.m()/y.m())),T=Math.ceil(Math.log(v)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),R=f(v),w=R.j(y);k(w)||w.l(b)>0;)v-=T,R=f(v),w=R.j(y);S(R)&&(R=_),I=I.add(R),b=j(b,w)}return new W(I,b)}t.B=function(b){return G(this,b).h},t.and=function(b){const y=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<y;T++)v[T]=this.i(T)&b.i(T);return new a(v,this.h&b.h)},t.or=function(b){const y=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<y;T++)v[T]=this.i(T)|b.i(T);return new a(v,this.h|b.h)},t.xor=function(b){const y=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<y;T++)v[T]=this.i(T)^b.i(T);return new a(v,this.h^b.h)};function ee(b){const y=b.g.length+1,v=[];for(let T=0;T<y;T++)v[T]=b.i(T)<<1|b.i(T-1)>>>31;return new a(v,b.h)}function ce(b,y){const v=y>>5;y%=32;const T=b.g.length-v,I=[];for(let R=0;R<T;R++)I[R]=y>0?b.i(R+v)>>>y|b.i(R+v+1)<<32-y:b.i(R+v);return new a(I,b.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=d,pc=a}).apply(typeof Wu<"u"?Wu:typeof self<"u"?self:typeof window<"u"?window:{});var ai=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=Object.defineProperty;function n(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof ai=="object"&&ai];for(var l=0;l<i.length;++l){var h=i[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var s=n(this);function r(i,l){if(l)e:{var h=s;i=i.split(".");for(var p=0;p<i.length-1;p++){var C=i[p];if(!(C in h))break e;h=h[C]}i=i[i.length-1],p=h[i],l=l(p),l!=p&&l!=null&&e(h,i,{configurable:!0,writable:!0,value:l})}}r("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(i){return i||function(l){var h=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&h.push([p,l[p]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function u(i,l,h){return i.call.apply(i.bind,arguments)}function f(i,l,h){return f=u,f.apply(null,arguments)}function d(i,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),i.apply(this,p)}}function g(i,l){function h(){}h.prototype=l.prototype,i.Z=l.prototype,i.prototype=new h,i.prototype.constructor=i,i.Ob=function(p,C,N){for(var q=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)q[ae-2]=arguments[ae];return l.prototype[C].apply(p,q)}}var _=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function A(i){const l=i.length;if(l>0){const h=Array(l);for(let p=0;p<l;p++)h[p]=i[p];return h}return[]}function S(i,l){for(let p=1;p<arguments.length;p++){const C=arguments[p];var h=typeof C;if(h=h!="object"?h:C?Array.isArray(C)?"array":h:"null",h=="array"||h=="object"&&typeof C.length=="number"){h=i.length||0;const N=C.length||0;i.length=h+N;for(let q=0;q<N;q++)i[h+q]=C[q]}else i.push(C)}}class k{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function D(i){a.setTimeout(()=>{throw i},0)}function j(){var i=b;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class ${constructor(){this.h=this.g=null}add(l,h){const p=W.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var W=new k(()=>new G,i=>i.reset());class G{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ee,ce=!1,b=new $,y=()=>{const i=Promise.resolve(void 0);ee=()=>{i.then(v)}};function v(){for(var i;i=j();){try{i.h.call(i.g)}catch(h){D(h)}var l=W;l.j(i),l.h<100&&(l.h++,i.next=l.g,l.g=i)}ce=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return i}();function w(i){return/^[\s\xa0]*$/.test(i)}function be(i,l){I.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,l)}g(be,I),be.prototype.init=function(i,l){const h=this.type=i.type,p=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget,l||(h=="mouseover"?l=i.fromElement:h=="mouseout"&&(l=i.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&be.Z.h.call(this)},be.prototype.h=function(){be.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var qe="closure_listenable_"+(Math.random()*1e6|0),ge=0;function pe(i,l,h,p,C){this.listener=i,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=C,this.key=++ge,this.da=this.fa=!1}function ne(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Ke(i,l,h){for(const p in i)l.call(h,i[p],p,i)}function It(i,l){for(const h in i)l.call(void 0,i[h],h,i)}function Ne(i){const l={};for(const h in i)l[h]=i[h];return l}const Ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function mt(i,l){let h,p;for(let C=1;C<arguments.length;C++){p=arguments[C];for(h in p)i[h]=p[h];for(let N=0;N<Ce.length;N++)h=Ce[N],Object.prototype.hasOwnProperty.call(p,h)&&(i[h]=p[h])}}function Xe(i){this.src=i,this.g={},this.h=0}Xe.prototype.add=function(i,l,h,p,C){const N=i.toString();i=this.g[N],i||(i=this.g[N]=[],this.h++);const q=Ye(i,l,p,C);return q>-1?(l=i[q],h||(l.fa=!1)):(l=new pe(l,this.src,N,!!p,C),l.fa=h,i.push(l)),l};function ft(i,l){const h=l.type;if(h in i.g){var p=i.g[h],C=Array.prototype.indexOf.call(p,l,void 0),N;(N=C>=0)&&Array.prototype.splice.call(p,C,1),N&&(ne(l),i.g[h].length==0&&(delete i.g[h],i.h--))}}function Ye(i,l,h,p){for(let C=0;C<i.length;++C){const N=i[C];if(!N.da&&N.listener==l&&N.capture==!!h&&N.ha==p)return C}return-1}var L="closure_lm_"+(Math.random()*1e6|0),J={};function K(i,l,h,p,C){if(Array.isArray(l)){for(let N=0;N<l.length;N++)K(i,l[N],h,p,C);return null}return h=U(h),i&&i[qe]?i.J(l,h,c(p)?!!p.capture:!!p,C):Y(i,l,h,!1,p,C)}function Y(i,l,h,p,C,N){if(!l)throw Error("Invalid event type");const q=c(C)?!!C.capture:!!C;let ae=M(i);if(ae||(i[L]=ae=new Xe(i)),h=ae.add(l,h,p,q,N),h.proxy)return h;if(p=le(),h.proxy=p,p.src=i,p.listener=h,i.addEventListener)R||(C=q),C===void 0&&(C=!1),i.addEventListener(l.toString(),p,C);else if(i.attachEvent)i.attachEvent(E(l.toString()),p);else if(i.addListener&&i.removeListener)i.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function le(){function i(h){return l.call(i.src,i.listener,h)}const l=P;return i}function Se(i,l,h,p,C){if(Array.isArray(l))for(var N=0;N<l.length;N++)Se(i,l[N],h,p,C);else p=c(p)?!!p.capture:!!p,h=U(h),i&&i[qe]?(i=i.i,N=String(l).toString(),N in i.g&&(l=i.g[N],h=Ye(l,h,p,C),h>-1&&(ne(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete i.g[N],i.h--)))):i&&(i=M(i))&&(l=i.g[l.toString()],i=-1,l&&(i=Ye(l,h,p,C)),(h=i>-1?l[i]:null)&&m(h))}function m(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[qe])ft(l.i,i);else{var h=i.type,p=i.proxy;l.removeEventListener?l.removeEventListener(h,p,i.capture):l.detachEvent?l.detachEvent(E(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=M(l))?(ft(h,i),h.h==0&&(h.src=null,l[L]=null)):ne(i)}}}function E(i){return i in J?J[i]:J[i]="on"+i}function P(i,l){if(i.da)i=!0;else{l=new be(l,this);const h=i.listener,p=i.ha||i.src;i.fa&&m(i),i=h.call(p,l)}return i}function M(i){return i=i[L],i instanceof Xe?i:null}var x="__closure_events_fn_"+(Math.random()*1e9>>>0);function U(i){return typeof i=="function"?i:(i[x]||(i[x]=function(l){return i.handleEvent(l)}),i[x])}function B(){T.call(this),this.i=new Xe(this),this.M=this,this.G=null}g(B,T),B.prototype[qe]=!0,B.prototype.removeEventListener=function(i,l,h,p){Se(this,i,l,h,p)};function F(i,l){var h,p=i.G;if(p)for(h=[];p;p=p.G)h.push(p);if(i=i.M,p=l.type||l,typeof l=="string")l=new I(l,i);else if(l instanceof I)l.target=l.target||i;else{var C=l;l=new I(p,i),mt(l,C)}C=!0;let N,q;if(h)for(q=h.length-1;q>=0;q--)N=l.g=h[q],C=H(N,p,!0,l)&&C;if(N=l.g=i,C=H(N,p,!0,l)&&C,C=H(N,p,!1,l)&&C,h)for(q=0;q<h.length;q++)N=l.g=h[q],C=H(N,p,!1,l)&&C}B.prototype.N=function(){if(B.Z.N.call(this),this.i){var i=this.i;for(const l in i.g){const h=i.g[l];for(let p=0;p<h.length;p++)ne(h[p]);delete i.g[l],i.h--}}this.G=null},B.prototype.J=function(i,l,h,p){return this.i.add(String(i),l,!1,h,p)},B.prototype.K=function(i,l,h,p){return this.i.add(String(i),l,!0,h,p)};function H(i,l,h,p){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();let C=!0;for(let N=0;N<l.length;++N){const q=l[N];if(q&&!q.da&&q.capture==h){const ae=q.listener,Be=q.ha||q.src;q.fa&&ft(i.i,q),C=ae.call(Be,p)!==!1&&C}}return C&&!p.defaultPrevented}function V(i,l){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(i,l||0)}function Q(i){i.g=V(()=>{i.g=null,i.i&&(i.i=!1,Q(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class z extends T{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Q(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function X(i){T.call(this),this.h=i,this.g={}}g(X,T);var te=[];function ue(i){Ke(i.g,function(l,h){this.g.hasOwnProperty(h)&&m(l)},i),i.g={}}X.prototype.N=function(){X.Z.N.call(this),ue(this)},X.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _e=a.JSON.stringify,me=a.JSON.parse,Qe=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Fe(){}function _t(){}var Ve={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Xt(){I.call(this,"d")}g(Xt,I);function us(){I.call(this,"c")}g(us,I);var Le={},yt=null;function hs(){return yt=yt||new B}Le.Ia="serverreachability";function Vs(i){I.call(this,Le.Ia,i)}g(Vs,I);function Bs(i){const l=hs();F(l,new Vs(l))}Le.STAT_EVENT="statevent";function wc(i,l){I.call(this,Le.STAT_EVENT,i),this.stat=l}g(wc,I);function st(i){const l=hs();F(l,new wc(l,i))}Le.Ja="timingevent";function Ec(i,l){I.call(this,Le.Ja,i),this.size=l}g(Ec,I);function js(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},l)}function Hs(){this.g=!0}Hs.prototype.ua=function(){this.g=!1};function ip(i,l,h,p,C,N){i.info(function(){if(i.g)if(N){var q="",ae=N.split("&");for(let Ie=0;Ie<ae.length;Ie++){var Be=ae[Ie].split("=");if(Be.length>1){const We=Be[0];Be=Be[1];const Ut=We.split("_");q=Ut.length>=2&&Ut[1]=="type"?q+(We+"="+Be+"&"):q+(We+"=redacted&")}}}else q=null;else q=N;return"XMLHTTP REQ ("+p+") [attempt "+C+"]: "+l+`
`+h+`
`+q})}function op(i,l,h,p,C,N,q){i.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+C+"]: "+l+`
`+h+`
`+N+" "+q})}function fs(i,l,h,p){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+cp(i,h)+(p?" "+p:"")})}function ap(i,l){i.info(function(){return"TIMEOUT: "+l})}Hs.prototype.info=function(){};function cp(i,l){if(!i.g)return l;if(!l)return null;try{const N=JSON.parse(l);if(N){for(i=0;i<N.length;i++)if(Array.isArray(N[i])){var h=N[i];if(!(h.length<2)){var p=h[1];if(Array.isArray(p)&&!(p.length<1)){var C=p[0];if(C!="noop"&&C!="stop"&&C!="close")for(let q=1;q<p.length;q++)p[q]=""}}}}return _e(N)}catch{return l}}var co={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},lp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},vc;function lo(){}g(lo,Fe),lo.prototype.g=function(){return new XMLHttpRequest},vc=new lo;function $s(i){return encodeURIComponent(String(i))}function up(i){var l=1;i=i.split(":");const h=[];for(;l>0&&i.length;)h.push(i.shift()),l--;return i.length&&h.push(i.join(":")),h}function dn(i,l,h,p){this.j=i,this.i=l,this.l=h,this.S=p||1,this.V=new X(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new bc}function bc(){this.i=null,this.g="",this.h=!1}var Ic={},uo={};function ho(i,l,h){i.M=1,i.A=Jr(Mt(l)),i.u=h,i.R=!0,Tc(i,null)}function Tc(i,l){i.F=Date.now(),zr(i),i.B=Mt(i.A);var h=i.B,p=i.S;Array.isArray(p)||(p=[String(p)]),Uc(h.i,"t",p),i.C=0,h=i.j.L,i.h=new bc,i.g=tl(i.j,h?l:null,!i.u),i.P>0&&(i.O=new z(f(i.Y,i,i.g),i.P)),l=i.V,h=i.g,p=i.ba;var C="readystatechange";Array.isArray(C)||(C&&(te[0]=C.toString()),C=te);for(let N=0;N<C.length;N++){const q=K(h,C[N],p||l.handleEvent,!1,l.h||l);if(!q)break;l.g[q.key]=q}l=i.J?Ne(i.J):{},i.u?(i.v||(i.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,l)):(i.v="GET",i.g.ea(i.B,i.v,null,l)),Bs(),ip(i.i,i.v,i.B,i.l,i.S,i.u)}dn.prototype.ba=function(i){i=i.target;const l=this.O;l&&mn(i)==3?l.j():this.Y(i)},dn.prototype.Y=function(i){try{if(i==this.g)e:{const ae=mn(this.g),Be=this.g.ya(),Ie=this.g.ca();if(!(ae<3)&&(ae!=3||this.g&&(this.h.h||this.g.la()||Wc(this.g)))){this.K||ae!=4||Be==7||(Be==8||Ie<=0?Bs(3):Bs(2)),fo(this);var l=this.g.ca();this.X=l;var h=hp(this);if(this.o=l==200,op(this.i,this.v,this.B,this.l,this.S,ae,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,C=this.g;if((p=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(p)){var N=p;break t}}N=null}if(i=N)fs(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,po(this,i);else{this.o=!1,this.m=3,st(12),Vn(this),Ws(this);break e}}if(this.R){i=!0;let We;for(;!this.K&&this.C<h.length;)if(We=fp(this,h),We==uo){ae==4&&(this.m=4,st(14),i=!1),fs(this.i,this.l,null,"[Incomplete Response]");break}else if(We==Ic){this.m=4,st(15),fs(this.i,this.l,h,"[Invalid Chunk]"),i=!1;break}else fs(this.i,this.l,We,null),po(this,We);if(Sc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ae!=4||h.length!=0||this.h.h||(this.m=1,st(16),i=!1),this.o=this.o&&i,!i)fs(this.i,this.l,h,"[Invalid Chunked Response]"),Vn(this),Ws(this);else if(h.length>0&&!this.W){this.W=!0;var q=this.j;q.g==this&&q.aa&&!q.P&&(q.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),bo(q),q.P=!0,st(11))}}else fs(this.i,this.l,h,null),po(this,h);ae==4&&Vn(this),this.o&&!this.K&&(ae==4?Yc(this.j,this):(this.o=!1,zr(this)))}else Ap(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,st(12)):(this.m=0,st(13)),Vn(this),Ws(this)}}}catch{}finally{}};function hp(i){if(!Sc(i))return i.g.la();const l=Wc(i.g);if(l==="")return"";let h="";const p=l.length,C=mn(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return Vn(i),Ws(i),"";i.h.i=new a.TextDecoder}for(let N=0;N<p;N++)i.h.h=!0,h+=i.h.i.decode(l[N],{stream:!(C&&N==p-1)});return l.length=0,i.h.g+=h,i.C=0,i.h.g}function Sc(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function fp(i,l){var h=i.C,p=l.indexOf(`
`,h);return p==-1?uo:(h=Number(l.substring(h,p)),isNaN(h)?Ic:(p+=1,p+h>l.length?uo:(l=l.slice(p,p+h),i.C=p+h,l)))}dn.prototype.cancel=function(){this.K=!0,Vn(this)};function zr(i){i.T=Date.now()+i.H,Ac(i,i.H)}function Ac(i,l){if(i.D!=null)throw Error("WatchDog timer not null");i.D=js(f(i.aa,i),l)}function fo(i){i.D&&(a.clearTimeout(i.D),i.D=null)}dn.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(ap(this.i,this.B),this.M!=2&&(Bs(),st(17)),Vn(this),this.m=2,Ws(this)):Ac(this,this.T-i)};function Ws(i){i.j.I==0||i.K||Yc(i.j,i)}function Vn(i){fo(i);var l=i.O;l&&typeof l.dispose=="function"&&l.dispose(),i.O=null,ue(i.V),i.g&&(l=i.g,i.g=null,l.abort(),l.dispose())}function po(i,l){try{var h=i.j;if(h.I!=0&&(h.g==i||go(h.h,i))){if(!i.L&&go(h.h,i)&&h.I==3){try{var p=h.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var C=p;if(C[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<i.F)ei(h),Qr(h);else break e;vo(h),st(18)}}else h.xa=C[1],0<h.xa-h.K&&C[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=js(f(h.Va,h),6e3));Pc(h.h)<=1&&h.ta&&(h.ta=void 0)}else jn(h,11)}else if((i.L||h.g==i)&&ei(h),!w(l))for(C=h.Ba.g.parse(l),l=0;l<C.length;l++){let Ie=C[l];const We=Ie[0];if(!(We<=h.K))if(h.K=We,Ie=Ie[1],h.I==2)if(Ie[0]=="c"){h.M=Ie[1],h.ba=Ie[2];const Ut=Ie[3];Ut!=null&&(h.ka=Ut,h.j.info("VER="+h.ka));const Hn=Ie[4];Hn!=null&&(h.za=Hn,h.j.info("SVER="+h.za));const _n=Ie[5];_n!=null&&typeof _n=="number"&&_n>0&&(p=1.5*_n,h.O=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const yn=i.g;if(yn){const ti=yn.g?yn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ti){var N=p.h;N.g||ti.indexOf("spdy")==-1&&ti.indexOf("quic")==-1&&ti.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(mo(N,N.h),N.h=null))}if(p.G){const Io=yn.g?yn.g.getResponseHeader("X-HTTP-Session-Id"):null;Io&&(p.wa=Io,Re(p.J,p.G,Io))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-i.F,h.j.info("Handshake RTT: "+h.T+"ms")),p=h;var q=i;if(p.na=el(p,p.L?p.ba:null,p.W),q.L){Oc(p.h,q);var ae=q,Be=p.O;Be&&(ae.H=Be),ae.D&&(fo(ae),zr(ae)),p.g=q}else Jc(p);h.i.length>0&&Zr(h)}else Ie[0]!="stop"&&Ie[0]!="close"||jn(h,7);else h.I==3&&(Ie[0]=="stop"||Ie[0]=="close"?Ie[0]=="stop"?jn(h,7):Eo(h):Ie[0]!="noop"&&h.l&&h.l.qa(Ie),h.A=0)}}Bs(4)}catch{}}var dp=class{constructor(i,l){this.g=i,this.map=l}};function Rc(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Cc(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Pc(i){return i.h?1:i.g?i.g.size:0}function go(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function mo(i,l){i.g?i.g.add(l):i.h=l}function Oc(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}Rc.prototype.cancel=function(){if(this.i=Nc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Nc(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const h of i.g.values())l=l.concat(h.G);return l}return A(i.i)}var kc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pp(i,l){if(i){i=i.split("&");for(let h=0;h<i.length;h++){const p=i[h].indexOf("=");let C,N=null;p>=0?(C=i[h].substring(0,p),N=i[h].substring(p+1)):C=i[h],l(C,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function pn(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;i instanceof pn?(this.l=i.l,Gs(this,i.j),this.o=i.o,this.g=i.g,qs(this,i.u),this.h=i.h,_o(this,Fc(i.i)),this.m=i.m):i&&(l=String(i).match(kc))?(this.l=!1,Gs(this,l[1]||"",!0),this.o=Ks(l[2]||""),this.g=Ks(l[3]||"",!0),qs(this,l[4]),this.h=Ks(l[5]||"",!0),_o(this,l[6]||"",!0),this.m=Ks(l[7]||"")):(this.l=!1,this.i=new Js(null,this.l))}pn.prototype.toString=function(){const i=[];var l=this.j;l&&i.push(zs(l,Dc,!0),":");var h=this.g;return(h||l=="file")&&(i.push("//"),(l=this.o)&&i.push(zs(l,Dc,!0),"@"),i.push($s(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&i.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&i.push("/"),i.push(zs(h,h.charAt(0)=="/"?_p:mp,!0))),(h=this.i.toString())&&i.push("?",h),(h=this.m)&&i.push("#",zs(h,wp)),i.join("")},pn.prototype.resolve=function(i){const l=Mt(this);let h=!!i.j;h?Gs(l,i.j):h=!!i.o,h?l.o=i.o:h=!!i.g,h?l.g=i.g:h=i.u!=null;var p=i.h;if(h)qs(l,i.u);else if(h=!!i.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var C=l.h.lastIndexOf("/");C!=-1&&(p=l.h.slice(0,C+1)+p)}if(C=p,C==".."||C==".")p="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){p=C.lastIndexOf("/",0)==0,C=C.split("/");const N=[];for(let q=0;q<C.length;){const ae=C[q++];ae=="."?p&&q==C.length&&N.push(""):ae==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),p&&q==C.length&&N.push("")):(N.push(ae),p=!0)}p=N.join("/")}else p=C}return h?l.h=p:h=i.i.toString()!=="",h?_o(l,Fc(i.i)):h=!!i.m,h&&(l.m=i.m),l};function Mt(i){return new pn(i)}function Gs(i,l,h){i.j=h?Ks(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function qs(i,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);i.u=l}else i.u=null}function _o(i,l,h){l instanceof Js?(i.i=l,Ep(i.i,i.l)):(h||(l=zs(l,yp)),i.i=new Js(l,i.l))}function Re(i,l,h){i.i.set(l,h)}function Jr(i){return Re(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Ks(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function zs(i,l,h){return typeof i=="string"?(i=encodeURI(i).replace(l,gp),h&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function gp(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Dc=/[#\/\?@]/g,mp=/[#\?:]/g,_p=/[#\?]/g,yp=/[#\?@]/g,wp=/#/g;function Js(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function Bn(i){i.g||(i.g=new Map,i.h=0,i.i&&pp(i.i,function(l,h){i.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}t=Js.prototype,t.add=function(i,l){Bn(this),this.i=null,i=ds(this,i);let h=this.g.get(i);return h||this.g.set(i,h=[]),h.push(l),this.h+=1,this};function xc(i,l){Bn(i),l=ds(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function Lc(i,l){return Bn(i),l=ds(i,l),i.g.has(l)}t.forEach=function(i,l){Bn(this),this.g.forEach(function(h,p){h.forEach(function(C){i.call(l,C,p,this)},this)},this)};function Mc(i,l){Bn(i);let h=[];if(typeof l=="string")Lc(i,l)&&(h=h.concat(i.g.get(ds(i,l))));else for(i=Array.from(i.g.values()),l=0;l<i.length;l++)h=h.concat(i[l]);return h}t.set=function(i,l){return Bn(this),this.i=null,i=ds(this,i),Lc(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},t.get=function(i,l){return i?(i=Mc(this,i),i.length>0?String(i[0]):l):l};function Uc(i,l,h){xc(i,l),h.length>0&&(i.i=null,i.g.set(ds(i,l),A(h)),i.h+=h.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var h=l[p];const C=$s(h);h=Mc(this,h);for(let N=0;N<h.length;N++){let q=C;h[N]!==""&&(q+="="+$s(h[N])),i.push(q)}}return this.i=i.join("&")};function Fc(i){const l=new Js;return l.i=i.i,i.g&&(l.g=new Map(i.g),l.h=i.h),l}function ds(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function Ep(i,l){l&&!i.j&&(Bn(i),i.i=null,i.g.forEach(function(h,p){const C=p.toLowerCase();p!=C&&(xc(this,p),Uc(this,C,h))},i)),i.j=l}function vp(i,l){const h=new Hs;if(a.Image){const p=new Image;p.onload=d(gn,h,"TestLoadImage: loaded",!0,l,p),p.onerror=d(gn,h,"TestLoadImage: error",!1,l,p),p.onabort=d(gn,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=d(gn,h,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=i}else l(!1)}function bp(i,l){const h=new Hs,p=new AbortController,C=setTimeout(()=>{p.abort(),gn(h,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:p.signal}).then(N=>{clearTimeout(C),N.ok?gn(h,"TestPingServer: ok",!0,l):gn(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(C),gn(h,"TestPingServer: error",!1,l)})}function gn(i,l,h,p,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),p(h)}catch{}}function Ip(){this.g=new Qe}function yo(i){this.i=i.Sb||null,this.h=i.ab||!1}g(yo,Fe),yo.prototype.g=function(){return new Xr(this.i,this.h)};function Xr(i,l){B.call(this),this.H=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(Xr,B),t=Xr.prototype,t.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=l,this.readyState=1,Ys(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(l.body=i),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Xs(this)),this.readyState=0},t.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Ys(this)),this.g&&(this.readyState=3,Ys(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Vc(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Vc(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}t.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?Xs(this):Ys(this),this.readyState==3&&Vc(this)}},t.Oa=function(i){this.g&&(this.response=this.responseText=i,Xs(this))},t.Na=function(i){this.g&&(this.response=i,Xs(this))},t.ga=function(){this.g&&Xs(this)};function Xs(i){i.readyState=4,i.l=null,i.j=null,i.B=null,Ys(i)}t.setRequestHeader=function(i,l){this.A.append(i,l)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,i.push(h[0]+": "+h[1]),h=l.next();return i.join(`\r
`)};function Ys(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Xr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Bc(i){let l="";return Ke(i,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function wo(i,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=Bc(h),typeof i=="string"?h!=null&&$s(h):Re(i,l,h))}function De(i){B.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(De,B);var Tp=/^https?$/i,Sp=["POST","PUT"];t=De.prototype,t.Fa=function(i){this.H=i},t.ea=function(i,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():vc.g(),this.g.onreadystatechange=_(f(this.Ca,this));try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(N){jc(this,N);return}if(i=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var C in p)h.set(C,p[C]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const N of p.keys())h.set(N,p.get(N));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(N=>N.toLowerCase()=="content-type"),C=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Sp,l,void 0)>=0)||p||C||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,q]of h)this.g.setRequestHeader(N,q);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(N){jc(this,N)}};function jc(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.o=5,Hc(i),Yr(i)}function Hc(i){i.A||(i.A=!0,F(i,"complete"),F(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,F(this,"complete"),F(this,"abort"),Yr(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yr(this,!0)),De.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?$c(this):this.Xa())},t.Xa=function(){$c(this)};function $c(i){if(i.h&&typeof o<"u"){if(i.v&&mn(i)==4)setTimeout(i.Ca.bind(i),0);else if(F(i,"readystatechange"),mn(i)==4){i.h=!1;try{const N=i.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=N===0){let q=String(i.D).match(kc)[1]||null;!q&&a.self&&a.self.location&&(q=a.self.location.protocol.slice(0,-1)),p=!Tp.test(q?q.toLowerCase():"")}h=p}if(h)F(i,"complete"),F(i,"success");else{i.o=6;try{var C=mn(i)>2?i.g.statusText:""}catch{C=""}i.l=C+" ["+i.ca()+"]",Hc(i)}}finally{Yr(i)}}}}function Yr(i,l){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const h=i.g;i.g=null,l||F(i,"ready");try{h.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function mn(i){return i.g?i.g.readyState:0}t.ca=function(){try{return mn(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),me(l)}};function Wc(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Ap(i){const l={};i=(i.g&&mn(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<i.length;p++){if(w(i[p]))continue;var h=up(i[p]);const C=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const N=l[C]||[];l[C]=N,N.push(h)}It(l,function(p){return p.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(i,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[i]||l}function Gc(i){this.za=0,this.i=[],this.j=new Hs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Qs("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Qs("baseRetryDelayMs",5e3,i),this.Za=Qs("retryDelaySeedMs",1e4,i),this.Ta=Qs("forwardChannelMaxRetries",2,i),this.va=Qs("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Rc(i&&i.concurrentRequestLimit),this.Ba=new Ip,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=Gc.prototype,t.ka=8,t.I=1,t.connect=function(i,l,h,p){st(0),this.W=i,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.J=el(this,null,this.W),Zr(this)};function Eo(i){if(qc(i),i.I==3){var l=i.V++,h=Mt(i.J);if(Re(h,"SID",i.M),Re(h,"RID",l),Re(h,"TYPE","terminate"),Zs(i,h),l=new dn(i,i.j,l),l.M=2,l.A=Jr(Mt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=tl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),zr(l)}Zc(i)}function Qr(i){i.g&&(bo(i),i.g.cancel(),i.g=null)}function qc(i){Qr(i),i.v&&(a.clearTimeout(i.v),i.v=null),ei(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Zr(i){if(!Cc(i.h)&&!i.m){i.m=!0;var l=i.Ea;ee||y(),ce||(ee(),ce=!0),b.add(l,i),i.D=0}}function Rp(i,l){return Pc(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=l.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=js(f(i.Ea,i,l),Qc(i,i.D)),i.D++,!0)}t.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const C=new dn(this,this.j,i);let N=this.o;if(this.U&&(N?(N=Ne(N),mt(N,this.U)):N=this.U),this.u!==null||this.R||(C.J=N,N=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=zc(this,C,l),h=Mt(this.J),Re(h,"RID",i),Re(h,"CVER",22),this.G&&Re(h,"X-HTTP-Session-Id",this.G),Zs(this,h),N&&(this.R?l="headers="+$s(Bc(N))+"&"+l:this.u&&wo(h,this.u,N)),mo(this.h,C),this.Ra&&Re(h,"TYPE","init"),this.S?(Re(h,"$req",l),Re(h,"SID","null"),C.U=!0,ho(C,h,null)):ho(C,h,l),this.I=2}}else this.I==3&&(i?Kc(this,i):this.i.length==0||Cc(this.h)||Kc(this))};function Kc(i,l){var h;l?h=l.l:h=i.V++;const p=Mt(i.J);Re(p,"SID",i.M),Re(p,"RID",h),Re(p,"AID",i.K),Zs(i,p),i.u&&i.o&&wo(p,i.u,i.o),h=new dn(i,i.j,h,i.D+1),i.u===null&&(h.J=i.o),l&&(i.i=l.G.concat(i.i)),l=zc(i,h,1e3),h.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),mo(i.h,h),ho(h,p,l)}function Zs(i,l){i.H&&Ke(i.H,function(h,p){Re(l,p,h)}),i.l&&Ke({},function(h,p){Re(l,p,h)})}function zc(i,l,h){h=Math.min(i.i.length,h);const p=i.l?f(i.l.Ka,i.l,i):null;e:{var C=i.i;let ae=-1;for(;;){const Be=["count="+h];ae==-1?h>0?(ae=C[0].g,Be.push("ofs="+ae)):ae=0:Be.push("ofs="+ae);let Ie=!0;for(let We=0;We<h;We++){var N=C[We].g;const Ut=C[We].map;if(N-=ae,N<0)ae=Math.max(0,C[We].g-100),Ie=!1;else try{N="req"+N+"_"||"";try{var q=Ut instanceof Map?Ut:Object.entries(Ut);for(const[Hn,_n]of q){let yn=_n;c(_n)&&(yn=_e(_n)),Be.push(N+Hn+"="+encodeURIComponent(yn))}}catch(Hn){throw Be.push(N+"type="+encodeURIComponent("_badmap")),Hn}}catch{p&&p(Ut)}}if(Ie){q=Be.join("&");break e}}q=void 0}return i=i.i.splice(0,h),l.G=i,q}function Jc(i){if(!i.g&&!i.v){i.Y=1;var l=i.Da;ee||y(),ce||(ee(),ce=!0),b.add(l,i),i.A=0}}function vo(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=js(f(i.Da,i),Qc(i,i.A)),i.A++,!0)}t.Da=function(){if(this.v=null,Xc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=js(f(this.Wa,this),i)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,st(10),Qr(this),Xc(this))};function bo(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Xc(i){i.g=new dn(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var l=Mt(i.na);Re(l,"RID","rpc"),Re(l,"SID",i.M),Re(l,"AID",i.K),Re(l,"CI",i.F?"0":"1"),!i.F&&i.ia&&Re(l,"TO",i.ia),Re(l,"TYPE","xmlhttp"),Zs(i,l),i.u&&i.o&&wo(l,i.u,i.o),i.O&&(i.g.H=i.O);var h=i.g;i=i.ba,h.M=1,h.A=Jr(Mt(l)),h.u=null,h.R=!0,Tc(h,i)}t.Va=function(){this.C!=null&&(this.C=null,Qr(this),vo(this),st(19))};function ei(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Yc(i,l){var h=null;if(i.g==l){ei(i),bo(i),i.g=null;var p=2}else if(go(i.h,l))h=l.G,Oc(i.h,l),p=1;else return;if(i.I!=0){if(l.o)if(p==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var C=i.D;p=hs(),F(p,new Ec(p,h)),Zr(i)}else Jc(i);else if(C=l.m,C==3||C==0&&l.X>0||!(p==1&&Rp(i,l)||p==2&&vo(i)))switch(h&&h.length>0&&(l=i.h,l.i=l.i.concat(h)),C){case 1:jn(i,5);break;case 4:jn(i,10);break;case 3:jn(i,6);break;default:jn(i,2)}}}function Qc(i,l){let h=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(h*=2),h*l}function jn(i,l){if(i.j.info("Error code "+l),l==2){var h=f(i.bb,i),p=i.Ua;const C=!p;p=new pn(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Gs(p,"https"),Jr(p),C?vp(p.toString(),h):bp(p.toString(),h)}else st(2);i.I=0,i.l&&i.l.pa(l),Zc(i),qc(i)}t.bb=function(i){i?(this.j.info("Successfully pinged google.com"),st(2)):(this.j.info("Failed to ping google.com"),st(1))};function Zc(i){if(i.I=0,i.ja=[],i.l){const l=Nc(i.h);(l.length!=0||i.i.length!=0)&&(S(i.ja,l),S(i.ja,i.i),i.h.i.length=0,A(i.i),i.i.length=0),i.l.oa()}}function el(i,l,h){var p=h instanceof pn?Mt(h):new pn(h);if(p.g!="")l&&(p.g=l+"."+p.g),qs(p,p.u);else{var C=a.location;p=C.protocol,l=l?l+"."+C.hostname:C.hostname,C=+C.port;const N=new pn(null);p&&Gs(N,p),l&&(N.g=l),C&&qs(N,C),h&&(N.h=h),p=N}return h=i.G,l=i.wa,h&&l&&Re(p,h,l),Re(p,"VER",i.ka),Zs(i,p),p}function tl(i,l,h){if(l&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Aa&&!i.ma?new De(new yo({ab:h})):new De(i.ma),l.Fa(i.L),l}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function nl(){}t=nl.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Tt(i,l){B.call(this),this.g=new Gc(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(i?i["X-WebChannel-Client-Profile"]=l.sa:i={"X-WebChannel-Client-Profile":l.sa}),this.g.U=i,(i=l&&l.Qb)&&!w(i)&&(this.g.u=i),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!w(l)&&(this.g.G=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new ps(this)}g(Tt,B),Tt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Tt.prototype.close=function(){Eo(this.g)},Tt.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var h={};h.__data__=i,i=h}else this.v&&(h={},h.__data__=_e(i),i=h);l.i.push(new dp(l.Ya++,i)),l.I==3&&Zr(l)},Tt.prototype.N=function(){this.g.l=null,delete this.j,Eo(this.g),delete this.g,Tt.Z.N.call(this)};function sl(i){Xt.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){e:{for(const h in l){i=h;break e}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}g(sl,Xt);function rl(){us.call(this),this.status=1}g(rl,us);function ps(i){this.g=i}g(ps,nl),ps.prototype.ra=function(){F(this.g,"a")},ps.prototype.qa=function(i){F(this.g,new sl(i))},ps.prototype.pa=function(i){F(this.g,new rl)},ps.prototype.oa=function(){F(this.g,"b")},Tt.prototype.send=Tt.prototype.o,Tt.prototype.open=Tt.prototype.m,Tt.prototype.close=Tt.prototype.close,co.NO_ERROR=0,co.TIMEOUT=8,co.HTTP_ERROR=6,lp.COMPLETE="complete",_t.EventType=Ve,Ve.OPEN="a",Ve.CLOSE="b",Ve.ERROR="c",Ve.MESSAGE="d",B.prototype.listen=B.prototype.J,De.prototype.listenOnce=De.prototype.K,De.prototype.getLastError=De.prototype.Ha,De.prototype.getLastErrorCode=De.prototype.ya,De.prototype.getStatus=De.prototype.ca,De.prototype.getResponseJson=De.prototype.La,De.prototype.getResponseText=De.prototype.la,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Fa}).apply(typeof ai<"u"?ai:typeof self<"u"?self:typeof window<"u"?window:{});const Gu="@firebase/firestore",qu="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ot.UNAUTHENTICATED=new ot(null),ot.GOOGLE_CREDENTIALS=new ot("google-credentials-uid"),ot.FIRST_PARTY=new ot("first-party-uid"),ot.MOCK_USER=new ot("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qr="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=new nc("@firebase/firestore");function Ot(t,...e){if(xs.logLevel<=ve.DEBUG){const n=e.map(gc);xs.debug(`Firestore (${qr}): ${t}`,...n)}}function zd(t,...e){if(xs.logLevel<=ve.ERROR){const n=e.map(gc);xs.error(`Firestore (${qr}): ${t}`,...n)}}function pT(t,...e){if(xs.logLevel<=ve.WARN){const n=e.map(gc);xs.warn(`Firestore (${qr}): ${t}`,...n)}}function gc(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,Jd(t,s,n)}function Jd(t,e,n){let s=`FIRESTORE (${qr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{s+=" CONTEXT: "+JSON.stringify(n)}catch{s+=" CONTEXT: "+n}throw zd(s),new Error(s)}function yr(t,e,n,s){let r="Unexpected state";typeof n=="string"?r=n:s=n,t||Jd(e,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class de extends fn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class gT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ot.UNAUTHENTICATED))}shutdown(){}}class mT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class _T{constructor(e){this.t=e,this.currentUser=ot.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){yr(this.o===void 0,42304);let s=this.i;const r=u=>this.i!==s?(s=this.i,n(u)):Promise.resolve();let o=new wr;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new wr,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const u=o;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},c=u=>{Ot("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(Ot("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new wr)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(Ot("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(yr(typeof s.accessToken=="string",31837,{l:s}),new Xd(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return yr(e===null||typeof e=="string",2055,{h:e}),new ot(e)}}class yT{constructor(e,n,s){this.P=e,this.T=n,this.I=s,this.type="FirstParty",this.user=ot.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class wT{constructor(e,n,s){this.P=e,this.T=n,this.I=s}getToken(){return Promise.resolve(new yT(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(ot.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ku{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ET{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,St(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){yr(this.o===void 0,3512);const s=o=>{o.error!=null&&Ot("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,Ot("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>s(o))};const r=o=>{Ot("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?r(o):Ot("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ku(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(yr(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Ku(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vT(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=vT(40);for(let o=0;o<r.length;++o)s.length<20&&r[o]<n&&(s+=e.charAt(r[o]%62))}return s}}function xn(t,e){return t<e?-1:t>e?1:0}function IT(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const r=t.charAt(s),o=e.charAt(s);if(r!==o)return Xo(r)===Xo(o)?xn(r,o):Xo(r)?1:-1}return xn(t.length,e.length)}const TT=55296,ST=57343;function Xo(t){const e=t.charCodeAt(0);return e>=TT&&e<=ST}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="__name__";class Ht{constructor(e,n,s){n===void 0?n=0:n>e.length&&kr(637,{offset:n,range:e.length}),s===void 0?s=e.length-n:s>e.length-n&&kr(1746,{length:s,range:e.length-n}),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Ht.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ht?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const o=Ht.compareSegments(e.get(r),n.get(r));if(o!==0)return o}return xn(e.length,n.length)}static compareSegments(e,n){const s=Ht.isNumericId(e),r=Ht.isNumericId(n);return s&&!r?-1:!s&&r?1:s&&r?Ht.extractNumericId(e).compare(Ht.extractNumericId(n)):IT(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return pc.fromString(e.substring(4,e.length-2))}}class Ct extends Ht{construct(e,n,s){return new Ct(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new de(fe.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new Ct(n)}static emptyPath(){return new Ct([])}}const AT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Kn extends Ht{construct(e,n,s){return new Kn(e,n,s)}static isValidIdentifier(e){return AT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Kn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===zu}static keyField(){return new Kn([zu])}static fromServerFormat(e){const n=[];let s="",r=0;const o=()=>{if(s.length===0)throw new de(fe.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new de(fe.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new de(fe.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=u,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(s+=c,r++):(o(),r++)}if(o(),a)throw new de(fe.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Kn(n)}static emptyPath(){return new Kn([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.path=e}static fromPath(e){return new Xn(Ct.fromString(e))}static fromName(e){return new Xn(Ct.fromString(e).popFirst(5))}static empty(){return new Xn(Ct.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ct.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ct.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Xn(new Ct(e.slice()))}}function RT(t,e,n,s){if(e===!0&&s===!0)throw new de(fe.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function CT(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function PT(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":kr(12329,{type:typeof t})}function OT(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new de(fe.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=PT(t);throw new de(fe.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(t,e){const n={typeString:t};return e&&(n.value=e),n}function Kr(t,e){if(!CT(t))throw new de(fe.INVALID_ARGUMENT,"JSON must be an object");let n;for(const s in e)if(e[s]){const r=e[s].typeString,o="value"in e[s]?{value:e[s].value}:void 0;if(!(s in t)){n=`JSON missing required field: '${s}'`;break}const a=t[s];if(r&&typeof a!==r){n=`JSON field '${s}' must be a ${r}.`;break}if(o!==void 0&&a!==o.value){n=`Expected '${s}' field to equal '${o.value}'`;break}}if(n)throw new de(fe.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju=-62135596800,Xu=1e6;class Wt{static now(){return Wt.fromMillis(Date.now())}static fromDate(e){return Wt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor((e-1e3*n)*Xu);return new Wt(n,s)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new de(fe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new de(fe.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Ju)throw new de(fe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new de(fe.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Xu}_compareTo(e){return this.seconds===e.seconds?xn(this.nanoseconds,e.nanoseconds):xn(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Wt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Kr(e,Wt._jsonSchema))return new Wt(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ju;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Wt._jsonSchemaVersion="firestore/timestamp/1.0",Wt._jsonSchema={type:Me("string",Wt._jsonSchemaVersion),seconds:Me("number"),nanoseconds:Me("number")};function NT(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new kT("Invalid base64 string: "+o):o}}(e);return new as(n)}static fromUint8Array(e){const n=function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o}(e);return new as(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return xn(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}as.EMPTY_BYTE_STRING=new as("");const Pa="(default)";class Bi{constructor(e,n){this.projectId=e,this.database=n||Pa}static empty(){return new Bi("","")}get isDefaultDatabase(){return this.database===Pa}isEqual(e){return e instanceof Bi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e,n=null,s=[],r=[],o=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function xT(t){return new DT(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yu,he;(he=Yu||(Yu={}))[he.OK=0]="OK",he[he.CANCELLED=1]="CANCELLED",he[he.UNKNOWN=2]="UNKNOWN",he[he.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",he[he.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",he[he.NOT_FOUND=5]="NOT_FOUND",he[he.ALREADY_EXISTS=6]="ALREADY_EXISTS",he[he.PERMISSION_DENIED=7]="PERMISSION_DENIED",he[he.UNAUTHENTICATED=16]="UNAUTHENTICATED",he[he.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",he[he.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",he[he.ABORTED=10]="ABORTED",he[he.OUT_OF_RANGE=11]="OUT_OF_RANGE",he[he.UNIMPLEMENTED=12]="UNIMPLEMENTED",he[he.INTERNAL=13]="INTERNAL",he[he.UNAVAILABLE=14]="UNAVAILABLE",he[he.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new pc([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=1048576;function Yo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{constructor(e,n,s=1e3,r=1.5,o=6e4){this.Mi=e,this.timerId=n,this.d_=s,this.A_=r,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,n-s);r>0&&Ot("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,n,s,r,o){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=o,this.deferred=new wr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,s,r,o){const a=Date.now()+s,c=new mc(e,n,a,r,o);return c.start(s),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new de(fe.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Qu,Zu;(Zu=Qu||(Qu={})).Ma="default",Zu.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="firestore.googleapis.com",th=!0;class nh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new de(fe.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Yd,this.ssl=th}else this.host=e.host,this.ssl=e.ssl??th;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=LT;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<MT)throw new de(fe.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}RT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=FT(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new de(fe.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new de(fe.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new de(fe.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qd{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new de(fe.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new de(fe.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new gT;switch(s.type){case"firstParty":return new wT(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new de(fe.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const s=eh.get(n);s&&(Ot("ComponentProvider","Removing Datastore"),eh.delete(n),s.terminate())}(this),Promise.resolve()}}function VT(t,e,n,s={}){var f;t=OT(t,Qd);const r=Vr(e),o=t._getSettings(),a={...o,emulatorOptions:t._getEmulatorOptions()},c=`${e}:${n}`;r&&(rd(`https://${c}`),id("Firestore",!0)),o.host!==Yd&&o.host!==c&&pT("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:c,ssl:r,emulatorOptions:s};if(!ss(u,a)&&(t._setSettings(u),s.mockUserToken)){let d,g;if(typeof s.mockUserToken=="string")d=s.mockUserToken,g=ot.MOCK_USER;else{d=lE(s.mockUserToken,(f=t._app)==null?void 0:f.options.projectId);const _=s.mockUserToken.sub||s.mockUserToken.user_id;if(!_)throw new de(fe.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new ot(_)}t._authCredentials=new mT(new Xd(d,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new _c(this.firestore,e,this._query)}}class Gt{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yc(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Gt(this.firestore,e,this._key)}toJSON(){return{type:Gt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,s){if(Kr(n,Gt._jsonSchema))return new Gt(e,s||null,new Xn(Ct.fromString(n.referencePath)))}}Gt._jsonSchemaVersion="firestore/documentReference/1.0",Gt._jsonSchema={type:Me("string",Gt._jsonSchemaVersion),referencePath:Me("string")};class yc extends _c{constructor(e,n,s){super(e,n,xT(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Gt(this.firestore,null,new Xn(e))}withConverter(e){return new yc(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh="AsyncQueue";class rh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new UT(this,"async_queue_retry"),this._c=()=>{const s=Yo();s&&Ot(sh,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const n=Yo();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Yo();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new wr;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!NT(e))throw e;Ot(sh,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,zd("INTERNAL UNHANDLED ERROR: ",ih(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=n,n}enqueueAfterDelay(e,n,s){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const r=mc.createAndSchedule(this,e,n,s,o=>this.hc(o));return this.tc.push(r),r}uc(){this.nc&&kr(47125,{Pc:ih(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function ih(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class BT extends Qd{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new rh,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rh(e),this._firestoreClient=void 0,await e}}}function jT(t,e){const n=typeof t=="object"?t:cd(),s=typeof t=="string"?t:Pa,r=rc(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const o=aE("firestore");o&&VT(r,...o)}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nn(as.fromBase64String(e))}catch(n){throw new de(fe.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new nn(as.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Kr(e,nn._jsonSchema))return nn.fromBase64String(e.bytes)}}nn._jsonSchemaVersion="firestore/bytes/1.0",nn._jsonSchema={type:Me("string",nn._jsonSchemaVersion),bytes:Me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new de(fe.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Kn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new de(fe.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new de(fe.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return xn(this._lat,e._lat)||xn(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Zn._jsonSchemaVersion}}static fromJSON(e){if(Kr(e,Zn._jsonSchema))return new Zn(e.latitude,e.longitude)}}Zn._jsonSchemaVersion="firestore/geoPoint/1.0",Zn._jsonSchema={type:Me("string",Zn._jsonSchemaVersion),latitude:Me("number"),longitude:Me("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let o=0;o<s.length;++o)if(s[o]!==r[o])return!1;return!0}(this._values,e._values)}toJSON(){return{type:es._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Kr(e,es._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new es(e.vectorValues);throw new de(fe.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}es._jsonSchemaVersion="firestore/vectorValue/1.0",es._jsonSchema={type:Me("string",es._jsonSchemaVersion),vectorValues:Me("object")};const HT=new RegExp("[~\\*/\\[\\]]");function $T(t,e,n){if(e.search(HT)>=0)throw oh(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t);try{return new Zd(...e.split("."))._internalPath}catch{throw oh(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t)}}function oh(t,e,n,s,r){let o=`Function ${e}() called with invalid data`;o+=". ";let a="";return new de(fe.INVALID_ARGUMENT,o+t+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,n,s,r,o){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(tp("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class WT extends ep{data(){return super.data()}}function tp(t,e){return typeof e=="string"?$T(t,e):e instanceof Zd?e._internalPath:e._delegate._internalPath}class ci{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Cs extends ep{constructor(e,n,s,r,o,a){super(e,n,s,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new vi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(tp("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new de(fe.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Cs._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Cs._jsonSchemaVersion="firestore/documentSnapshot/1.0",Cs._jsonSchema={type:Me("string",Cs._jsonSchemaVersion),bundleSource:Me("string","DocumentSnapshot"),bundleName:Me("string"),bundle:Me("string")};class vi extends Cs{data(e={}){return super.data(e)}}class Er{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new ci(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new vi(this._firestore,this._userDataWriter,s.key,s,new ci(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new de(fe.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,o){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const u=new vi(r._firestore,r._userDataWriter,c.doc.key,c.doc,new ci(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const u=new vi(r._firestore,r._userDataWriter,c.doc.key,c.doc,new ci(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let f=-1,d=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),d=a.indexOf(c.doc.key)),{type:GT(c.type),doc:u,oldIndex:f,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new de(fe.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Er._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=bT.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],s=[],r=[];return this.docs.forEach(o=>{o._document!==null&&(n.push(o._document),s.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),r.push(o.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function GT(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return kr(61501,{type:t})}}Er._jsonSchemaVersion="firestore/querySnapshot/1.0",Er._jsonSchema={type:Me("string",Er._jsonSchemaVersion),bundleSource:Me("string","QuerySnapshot"),bundleName:Me("string"),bundle:Me("string")};(function(e,n=!0){(function(r){qr=r})(Us),Ds(new rs("firestore",(s,{instanceIdentifier:r,options:o})=>{const a=s.getProvider("app").getImmediate(),c=new BT(new _T(s.getProvider("auth-internal")),new ET(a,s.getProvider("app-check-internal")),function(f,d){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new de(fe.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Bi(f.options.projectId,d)}(a,r),a);return o={useFetchStreams:n,...o},c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),Nn(Gu,qu,e),Nn(Gu,qu,"esm2020")})();const qT={apiKey:"AIzaSyC7RRiI1kJTBfr5b0V94J5PKIUx2cY-Mcc",authDomain:"fit5032-week6-mahdi.firebaseapp.com",projectId:"fit5032-week6-mahdi",storageBucket:"fit5032-week6-mahdi.firebasestorage.app",messagingSenderId:"7966960281",appId:"1:7966960281:web:44422d3a308a93c657a608"},np=ic(qT),KT=Gd(np);jT(np);const sp=Km(e_),rp=Je(null);Lb(KT,t=>{rp.value=t});sp.provide("currentUserRef",rp);sp.use(dT).mount("#app");
