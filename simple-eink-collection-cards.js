function e(e,t,i,n){var a,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(s=(o<3?a(s):o>3?a(t,i,s):a(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new o(i,e,n)},r=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,p=globalThis,g=p.trustedTypes,f=g?g.emptyScript:"",_=p.reactiveElementPolyfillSupport,y=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&l(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const o=n?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),a=t.litNonce;void 0!==a&&n.setAttribute("nonce",a),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=n;const o=a.fromAttribute(t,e.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(e,t,i,n=!1,a){if(void 0!==e){const o=this.constructor;if(!1===n&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,_?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,z=x.trustedTypes,E=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+S,T=`<${M}>`,C=document,D=()=>C.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,j=Array.isArray,O="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,L=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),R=B(1),J=B(2),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,K=C.createTreeWalker(C,129);function Z(e,t){if(!j(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,n=[];let a,o=2===t?"<svg>":3===t?"<math>":"",s=F;for(let t=0;t<i;t++){const i=e[t];let r,c,l=-1,d=0;for(;d<i.length&&(s.lastIndex=d,c=s.exec(i),null!==c);)d=s.lastIndex,s===F?"!--"===c[1]?s=P:void 0!==c[1]?s=L:void 0!==c[2]?(W.test(c[2])&&(a=RegExp("</"+c[2],"g")),s=I):void 0!==c[3]&&(s=I):s===I?">"===c[0]?(s=a??F,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,r=c[1],s=void 0===c[3]?I:'"'===c[3]?H:U):s===H||s===U?s=I:s===P||s===L?s=F:(s=I,a=void 0);const h=s===I&&e[t+1].startsWith("/>")?" ":"";o+=s===F?i+T:l>=0?(n.push(r),i.slice(0,l)+A+i.slice(l)+S+h):i+S+(-2===l?t:h)}return[Z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let a=0,o=0;const s=e.length-1,r=this.parts,[c,l]=Y(e,t);if(this.el=Q.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=K.nextNode())&&r.length<s;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(A)){const t=l[o++],i=n.getAttribute(e).split(S),s=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?ne:"?"===s[1]?ae:"@"===s[1]?oe:ie}),n.removeAttribute(e)}else e.startsWith(S)&&(r.push({type:6,index:a}),n.removeAttribute(e));if(W.test(n.tagName)){const e=n.textContent.split(S),t=e.length-1;if(t>0){n.textContent=z?z.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],D()),K.nextNode(),r.push({type:2,index:++a});n.append(e[t],D())}}}else if(8===n.nodeType)if(n.data===M)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=n.data.indexOf(S,e+1));)r.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===q)return t;let a=void 0!==n?i._$Co?.[n]:i._$Cl;const o=N(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=a:i._$Cl=a),void 0!==a&&(t=X(e,a._$AS(e,t.values),a,n)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??C).importNode(t,!0);K.currentNode=n;let a=K.nextNode(),o=0,s=0,r=i[0];for(;void 0!==r;){if(o===r.index){let t;2===r.type?t=new te(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new se(a,this,e)),this._$AV.push(t),r=i[++s]}o!==r?.index&&(a=K.nextNode(),o++)}return K.currentNode=C,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),N(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>j(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new ee(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Q(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const a of e)n===t.length?t.push(i=new te(this.O(D()),this.O(D()),this,this.options)):i=t[n],i._$AI(a),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,n){const a=this.strings;let o=!1;if(void 0===a)e=X(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==q,o&&(this._$AH=e);else{const n=e;let s,r;for(e=a[0],s=0;s<a.length-1;s++)r=X(this,n[i+s],t,s),r===q&&(r=this._$AH[s]),o||=!N(r)||r!==this._$AH[s],r===V?e=V:e!==V&&(e+=(r??"")+a[s+1]),this._$AH[s]=r}o&&!n&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ne extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class oe extends ie{constructor(e,t,i,n,a){super(e,t,i,n,a),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??V)===q)return;const i=this._$AH,n=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=x.litHtmlPolyfillSupport;re?.(Q,te),(x.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class le extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let a=n._$litPart$;if(void 0===a){const e=i?.renderBefore??null;n._$litPart$=a=new te(t.insertBefore(D(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,ce.litElementHydrateSupport?.({LitElement:le});const de=ce.litElementPolyfillSupport;de?.({LitElement:le}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},me=(e=ue,t,i)=>{const{kind:n,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,a,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const a=this[n];t.call(this,i),this.requestUpdate(n,a,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pe(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return pe({...e,state:!0,attribute:!1})}const fe=s`
  :host {
    display: block;
    box-sizing: border-box;
    --eink-bg: #ffffff;
    --eink-fg: #000000;
    --eink-border-color: #000000;
    --eink-border-width: 1px;
    --eink-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  :host([inverted]) {
    --eink-bg: #000000;
    --eink-fg: #ffffff;
    --eink-border-color: #ffffff;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    transition: none !important;
    animation: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .eink-card {
    background-color: var(--eink-bg);
    color: var(--eink-fg);
    border: var(--eink-border-width) solid var(--eink-border-color);
    padding: 16px;
    font-family: var(--eink-font-family);
    line-height: 1.2;
    text-rendering: geometricPrecision;
  }

  .eink-card.inverted {
    background-color: #000000;
    color: #ffffff;
    border-color: #ffffff;
  }

  .tabular {
    font-variant-numeric: tabular-nums;
  }

  ha-icon {
    color: currentColor;
    opacity: 1 !important;
    --mdc-icon-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .eink-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--eink-border-color);
    padding-bottom: 4px;
  }

  .eink-badge-inverted {
    background-color: var(--eink-fg);
    color: var(--eink-bg);
    padding: 2px 6px;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    display: inline-block;
  }

  .eink-solid-divider {
    border: none;
    border-top: 1px solid var(--eink-border-color);
    margin: 8px 0;
  }
`;var _e={title:"Title",inverted:"Inverted (Black background, white text)",entity:"Entity",attribute:"Attribute (optional)",name:"Custom Name (optional)",unit:"Custom Unit (optional)",icon:"Custom Icon (optional)",value:"Value",condition:"Condition",optional:"Optional",none:"None",active:"Active",inactive:"Inactive",open:"Open",closed:"Closed",on:"ON",off:"OFF",loading:"Loading...",no_events:"No upcoming events",no_data:"No data available",not_configured:"Card not configured. Please select an entity.",tap_action:"Tap Action",double_tap_action:"Double Tap Action",hold_action:"Hold Action"},ye={equals:"Equals",not_equals:"Not equals",above:"Above (>)",below:"Below (<)",on:"State is ON / True",off:"State is OFF / False"},ve={name:"E-ink Hero Metric",description:"Large single metric display with high contrast and optional delta trend.",show_trend:"Show Trend / Delta",trend_value:"Trend Text (e.g. +1.2° or ▲ 5%)"},be={name:"E-ink Grid Metrics",description:"2 to 4 related metrics in a strict solid grid.",columns:"Columns (2, 3 or 4)"},we={name:"E-ink Status List",description:"Binary or discrete states with high-contrast monochrome badges.",invert_when_active:"Invert badge when active (Black background, white text)"},ke={name:"E-ink Alert Banner",description:"High-contrast conditional alert block. Hidden when inactive.",message:"Alert message",message_placeholder:"Warning: critical condition detected!"},xe={name:"E-ink Sparkline Bar",description:"Crisp 12/24h historical trend bars or solid line with zero antialiasing blur.",hours_to_show:"Hours to display (e.g. 12, 24)",chart_type:"Chart Style",chart_bars:"Discrete Vertical Bars",chart_line:"Solid Line"},$e={name:"E-ink Schedule Agenda",description:"Compact chronological calendar events separated by solid 1px dividers.",max_items:"Maximum events to show",all_day:"All day"},ze={name:"E-ink Month Calendar",description:"Full monthly grid with week numbers, inverted current week, and today's events.",entities:"Calendars",first_day_of_week:"First day of week",monday:"Monday",sunday:"Sunday",show_week_numbers:"Show week numbers",max_events:"Today events to show",week_short:"Wk",more_events:"events",more_event:"event"},Ee={name:"E-ink Clock & Date",description:"Minute-synchronized e-ink clock with zero-second ghosting and date formats.",time_format:"Time Format",show_date:"Show Date",date_format:"Date Style",date_short:"Short Date (DD/MM/YYYY)",date_long:"Long Date (Weekday + Day + Month)",date_combined:"Combined (Weekday, Short Date)",timezone:"Custom Timezone (e.g. America/New_York)",secondary_entity_1:"Secondary Entity 1",secondary_entity_2:"Secondary Entity 2"},Ae={name:"E-ink Weather Forecast",description:"Weather status, temperature, extended forecast and extra metric slot.",layout:"Layout Orientation",layout_horizontal:"Horizontal",layout_vertical:"Vertical",location:"Location (optional)",weather_header:"Weather",today:"Today",days_to_show:"Days to show in forecast",extra_attribute:"Extra Metric",extra_none:"None",extra_humidity:"Humidity (%)",extra_pressure:"Atmospheric Pressure (hPa)",extra_wind_speed:"Wind Speed",extra_precipitation:"Precipitation Probability (%)"},Se={clear_night:"Clear",cloudy:"Cloudy",fog:"Foggy",hail:"Hail",lightning:"Thunderstorm",lightning_rainy:"Thunderstorms with rain",partlycloudy:"Partly cloudy",pouring:"Heavy rain",rainy:"Rain",snowy:"Snow",snowy_rainy:"Sleet",sunny:"Sunny",windy:"Windy",windy_variant:"Windy",exceptional:"Severe weather"},Me={sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",sunday:"Sunday",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday"},Te={jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec",january:"January",february:"February",march:"March",april:"April",may_long:"May",june:"June",july:"July",august:"August",september:"September",october:"October",november:"November",december:"December"},Ce={common:_e,conditions:ye,hero_metric:ve,grid_metrics:be,status_list:we,alert_banner:ke,sparkline_bar:xe,schedule_agenda:$e,month_calendar:ze,time:Ee,forecast:Ae,weather:Se,days:Me,months:Te},De=Object.freeze({__proto__:null,alert_banner:ke,common:_e,conditions:ye,days:Me,default:Ce,forecast:Ae,grid_metrics:be,hero_metric:ve,month_calendar:ze,months:Te,schedule_agenda:$e,sparkline_bar:xe,status_list:we,time:Ee,weather:Se}),Ne={title:"Título",inverted:"Invertido (Fondo negro, texto blanco)",entity:"Entidad",attribute:"Atributo (opcional)",name:"Nombre personalizado (opcional)",unit:"Unidad personalizada (opcional)",icon:"Ícono personalizado (opcional)",value:"Valor",condition:"Condición",optional:"Opcional",none:"Ninguno",active:"Activo",inactive:"Inactivo",open:"Abierto",closed:"Cerrado",on:"ON",off:"OFF",loading:"Cargando...",no_events:"Sin eventos próximos",no_data:"Sin datos disponibles",not_configured:"Tarjeta no configurada. Por favor selecciona una entidad.",tap_action:"Acción al tocar",double_tap_action:"Acción al tocar dos veces",hold_action:"Acción al mantener pulsado"},je={equals:"Es igual a",not_equals:"No es igual a",above:"Mayor que (>)",below:"Menor que (<)",on:"Estado es ON / Activo",off:"Estado es OFF / Inactivo"},Oe={name:"E-ink Métrica Protagonista",description:"Muestra un valor individual de gran escala con alto contraste y delta de tendencia opcional.",show_trend:"Mostrar tendencia / Delta",trend_value:"Texto de tendencia (ej. +1.2° o ▲ 5%)"},Fe={name:"E-ink Grilla de Métricas",description:"De 2 a 4 métricas relacionadas en una grilla estricta con divisores sólidos.",columns:"Columnas (2, 3 o 4)"},Pe={name:"E-ink Lista de Estados",description:"Estados binarios o discretos con badges monocromáticos de alto contraste.",invert_when_active:"Invertir badge al estar activo (Fondo negro, letra blanca)"},Le={name:"E-ink Banner de Alerta",description:"Bloque de aviso crítico condicional. Oculto si la condición no se cumple.",message:"Mensaje de alerta",message_placeholder:"¡Advertencia: condición crítica detectada!"},Ie={name:"E-ink Barra de Tendencia",description:"Historial de 12/24h en barras discretas o línea sólida sin difuminados grises.",hours_to_show:"Horas a mostrar (ej. 12, 24)",chart_type:"Estilo de gráfico",chart_bars:"Barras verticales discretas",chart_line:"Línea continua sólida"},Ue={name:"E-ink Agenda / Calendario",description:"Eventos cronológicos compactos separados por líneas sólidas de 1px.",max_items:"Máximo de eventos a mostrar",all_day:"Todo el día"},He={name:"E-ink Calendario Mensual",description:"Vista mensual completa con números de semana, semana actual invertida y eventos de hoy.",entities:"Calendarios",first_day_of_week:"Primer día de la semana",monday:"Lunes",sunday:"Domingo",show_week_numbers:"Mostrar números de semana",max_events:"Eventos de hoy a mostrar",week_short:"Sem",more_events:"eventos",more_event:"evento"},We={name:"E-ink Reloj y Fecha",description:"Reloj sincronizado al minuto, sin parpadeo de segundos y formato de fecha.",time_format:"Formato de hora",show_date:"Mostrar fecha",date_format:"Estilo de fecha",date_short:"Fecha corta (DD/MM/AAAA)",date_long:"Fecha larga (Día de semana + Día + Mes)",date_combined:"Combinada (Día de semana, Fecha corta)",timezone:"Zona horaria personalizada (ej. America/Argentina/Buenos_Aires)",secondary_entity_1:"Entidad secundaria 1",secondary_entity_2:"Entidad secundaria 2"},Be={name:"E-ink Clima y Pronóstico",description:"Estado del clima, temperatura, pronóstico extendido y slot de métrica extra.",layout:"Orientación del diseño",layout_horizontal:"Horizontal",layout_vertical:"Vertical",location:"Ubicación (opcional)",weather_header:"Clima",today:"Hoy",days_to_show:"Días a mostrar en pronóstico",extra_attribute:"Métrica adicional",extra_none:"Ninguna",extra_humidity:"Humedad (%)",extra_pressure:"Presión atmosférica (hPa)",extra_wind_speed:"Velocidad del viento",extra_precipitation:"Probabilidad de precipitación (%)"},Re={clear_night:"Despejado",cloudy:"Nublado",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica",lightning_rainy:"Tormenta con lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia torrencial",rainy:"Lluvia",snowy:"Nieve",snowy_rainy:"Aguanieve",sunny:"Soleado",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Clima severo"},Je={sun:"Dom",mon:"Lun",tue:"Mar",wed:"Mié",thu:"Jue",fri:"Vie",sat:"Sáb",sunday:"Domingo",monday:"Lunes",tuesday:"Martes",wednesday:"Miércoles",thursday:"Jueves",friday:"Viernes",saturday:"Sábado"},qe={jan:"Ene",feb:"Feb",mar:"Mar",apr:"Abr",may:"May",jun:"Jun",jul:"Jul",aug:"Ago",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dic",january:"Enero",february:"Febrero",march:"Marzo",april:"Abril",may_long:"Mayo",june:"Junio",july:"Julio",august:"Agosto",september:"Septiembre",october:"Octubre",november:"Noviembre",december:"Diciembre"},Ve={common:Ne,conditions:je,hero_metric:Oe,grid_metrics:Fe,status_list:Pe,alert_banner:Le,sparkline_bar:Ie,schedule_agenda:Ue,month_calendar:He,time:We,forecast:Be,weather:Re,days:Je,months:qe},Ge=Object.freeze({__proto__:null,alert_banner:Le,common:Ne,conditions:je,days:Je,default:Ve,forecast:Be,grid_metrics:Fe,hero_metric:Oe,month_calendar:He,months:qe,schedule_agenda:Ue,sparkline_bar:Ie,status_list:Pe,time:We,weather:Re}),Ke={title:"标题",inverted:"反色显示（黑底白字）",entity:"实体",attribute:"属性（可选）",name:"自定义名称（可选）",unit:"自定义单位（可选）",icon:"自定义图标（可选）",value:"数值",condition:"条件",optional:"可选",none:"无",active:"激活",inactive:"未激活",open:"开启",closed:"关闭",on:"开",off:"关",loading:"加载中...",no_events:"近期无日程",no_data:"暂无数据",not_configured:"卡片未配置，请选择实体。",tap_action:"点按操作",double_tap_action:"双击操作",hold_action:"长按操作"},Ze={equals:"等于",not_equals:"不等于",above:"大于 (>)",below:"小于 (<)",on:"状态为 开 / 开启",off:"状态为 关 / 关闭"},Ye={name:"E-ink 核心指标卡片",description:"超大字体高对比度显示单项核心指标，可选趋势增量显示。",show_trend:"显示趋势 / 增量",trend_value:"趋势文本（例如 +1.2° 或 ▲ 5%）"},Qe={name:"E-ink 网格指标卡片",description:"以严谨的实体网格对比 2 到 4 项相关指标。",columns:"列数 (2, 3 或 4)"},Xe={name:"E-ink 状态列表卡片",description:"以高对比度单色徽章显示二元或离散设备状态。",invert_when_active:"激活时反色徽章（黑底白字）"},et={name:"E-ink 告警横幅卡片",description:"高对比度条件报警块，无报警时自动隐藏。",message:"告警内容",message_placeholder:"警告：检测到异常或紧急状态！"},tt={name:"E-ink 迷你走势卡片",description:"清晰的 12/24 小时历史趋势柱状图或实线，无模糊抗锯齿。",hours_to_show:"显示小时数（如 12, 24）",chart_type:"图表样式",chart_bars:"离散垂直柱状图",chart_line:"实线走势图"},it={name:"E-ink 日程安排卡片",description:"紧凑的时间顺序日程列表，以 1px 实线分割。",max_items:"最多显示事件数",all_day:"全天"},nt={name:"E-ink 月历卡片",description:"完整月历网格，支持周数显示、反色高亮当前周与今日日程摘要。",entities:"日历实体",first_day_of_week:"每周起始日",monday:"周一",sunday:"周日",show_week_numbers:"显示周数",max_events:"今日显示事件数",week_short:"周",more_events:"个事件",more_event:"个事件"},at={name:"E-ink 时钟与日期卡片",description:"分钟级精准同步电子墨水时钟，无秒针刷新残影。",time_format:"时间格式",show_date:"显示日期",date_format:"日期样式",date_short:"简短日期 (年/月/日)",date_long:"完整日期 (星期 + 月 + 日)",date_combined:"组合模式 (星期 + 简短日期)",timezone:"自定义时区 (如 Asia/Shanghai)",secondary_entity_1:"次要实体 1",secondary_entity_2:"次要实体 2"},ot={name:"E-ink 天气预报卡片",description:"天气状态、气温、未来多日预报及额外指标槽位。",layout:"布局方向",layout_horizontal:"横向",layout_vertical:"纵向",location:"位置名称（可选）",weather_header:"天气",today:"今天",days_to_show:"预报天数",extra_attribute:"额外指标",extra_none:"无",extra_humidity:"湿度 (%)",extra_pressure:"气压 (hPa)",extra_wind_speed:"风速",extra_precipitation:"降水概率 (%)"},st={clear_night:"晴朗夜晚",cloudy:"阴天",fog:"雾",hail:"冰雹",lightning:"雷阵雨",lightning_rainy:"雷阵雨伴降水",partlycloudy:"多云",pouring:"大雨",rainy:"小雨",snowy:"下雪",snowy_rainy:"雨夹雪",sunny:"晴天",windy:"有风",windy_variant:"大风",exceptional:"恶劣天气"},rt={sun:"周日",mon:"周一",tue:"周二",wed:"周三",thu:"周四",fri:"周五",sat:"周六",sunday:"星期日",monday:"星期一",tuesday:"星期二",wednesday:"星期三",thursday:"星期四",friday:"星期五",saturday:"星期六"},ct={jan:"1月",feb:"2月",mar:"3月",apr:"4月",may:"5月",jun:"6月",jul:"7月",aug:"8月",sep:"9月",oct:"10月",nov:"11月",dec:"12月",january:"一月",february:"二月",march:"三月",april:"四月",may_long:"五月",june:"六月",july:"七月",august:"八月",september:"九月",october:"十月",november:"十一月",december:"十二月"},lt={common:Ke,conditions:Ze,hero_metric:Ye,grid_metrics:Qe,status_list:Xe,alert_banner:et,sparkline_bar:tt,schedule_agenda:it,month_calendar:nt,time:at,forecast:ot,weather:st,days:rt,months:ct},dt=Object.freeze({__proto__:null,alert_banner:et,common:Ke,conditions:Ze,days:rt,default:lt,forecast:ot,grid_metrics:Qe,hero_metric:Ye,month_calendar:nt,months:ct,schedule_agenda:it,sparkline_bar:tt,status_list:Xe,time:at,weather:st}),ht={title:"Titel",inverted:"Invertiert (Schwarzer Hintergrund, weiße Schrift)",entity:"Entität",attribute:"Attribut (optional)",name:"Benutzerdefinierter Name (optional)",unit:"Benutzerdefinierte Einheit (optional)",icon:"Benutzerdefiniertes Symbol (optional)",value:"Wert",condition:"Bedingung",optional:"Optional",none:"Keine",active:"Aktiv",inactive:"Inaktiv",open:"Offen",closed:"Geschlossen",on:"AN",off:"AUS",loading:"Wird geladen...",no_events:"Keine anstehenden Ereignisse",no_data:"Keine Daten verfügbar",not_configured:"Karte nicht konfiguriert. Bitte eine Entität auswählen.",tap_action:"Tipp-Aktion",double_tap_action:"Doppeltipp-Aktion",hold_action:"Halte-Aktion"},ut={equals:"Ist gleich",not_equals:"Ist nicht gleich",above:"Größer als (>)",below:"Kleiner als (<)",on:"Status ist AN / Aktiv",off:"Status ist AUS / Inaktiv"},mt={name:"E-ink Hauptmetrik",description:"Große Einzelwertanzeige mit starkem Kontrast und optionaler Trendanzeige.",show_trend:"Trend / Delta anzeigen",trend_value:"Trendtext (z. B. +1.2° oder ▲ 5%)"},pt={name:"E-ink Metriken-Raster",description:"2 bis 4 zusammenhängende Metriken in einem festen Raster mit durchgezogenen Linien.",columns:"Spalten (2, 3 oder 4)"},gt={name:"E-ink Statusliste",description:"Diskrete oder binäre Zustände mit kontrastreichen Monochrom-Badges.",invert_when_active:"Badge bei Aktivität invertieren (Schwarzer Hintergrund, weiße Schrift)"},ft={name:"E-ink Alarm-Banner",description:"Kontrastreicher konditionaler Alarmblock. Ausgeblendet, wenn inaktiv.",message:"Alarmmeldung",message_placeholder:"Warnung: Kritischer Zustand erkannt!"},_t={name:"E-ink Trendbalken",description:"Präzise 12/24-Stunden-Historie als Balken oder durchgezogene Linie ohne Kantenglättung.",hours_to_show:"Anzuzeigende Stunden (z. B. 12, 24)",chart_type:"Diagrammstil",chart_bars:"Diskrete vertikale Balken",chart_line:"Durchgezogene Linie"},yt={name:"E-ink Terminübersicht",description:"Kompakte chronologische Terminliste, getrennt durch 1px-Linien.",max_items:"Maximale Anzahl an Terminen",all_day:"Ganztägig"},vt={name:"E-ink Monatskalender",description:"Vollständige Monatsansicht mit Kalenderwochen, invertierter aktueller Woche und heutigen Terminen.",entities:"Kalender",first_day_of_week:"Erster Tag der Woche",monday:"Montag",sunday:"Sonntag",show_week_numbers:"Kalenderwochen anzeigen",max_events:"Heutige Termine anzeigen",week_short:"KW",more_events:"Termine",more_event:"Termin"},bt={name:"E-ink Uhrzeit & Datum",description:"Minutengenau synchronisierte E-Ink-Uhr ohne Sekundenflackern.",time_format:"Zeitformat",show_date:"Datum anzeigen",date_format:"Datumsstil",date_short:"Kurzes Datum (TT.MM.JJJJ)",date_long:"Langes Datum (Wochentag + Tag + Monat)",date_combined:"Kombiniert (Wochentag, kurzes Datum)",timezone:"Benutzerdefinierte Zeitzone (z. B. Europe/Berlin)",secondary_entity_1:"Sekundäre Entität 1",secondary_entity_2:"Sekundäre Entität 2"},wt={name:"E-ink Wetterbericht",description:"Wetterlage, Temperatur, Mehrtages-Vorhersage und konfigurierbares Zusatzfeld.",layout:"Layout-Ausrichtung",layout_horizontal:"Horizontal",layout_vertical:"Vertikal",location:"Standort (optional)",weather_header:"Wetter",today:"Heute",days_to_show:"Vorhersagetage",extra_attribute:"Zusatzmetrik",extra_none:"Keine",extra_humidity:"Luftfeuchtigkeit (%)",extra_pressure:"Luftdruck (hPa)",extra_wind_speed:"Windgeschwindigkeit",extra_precipitation:"Niederschlagswahrscheinlichkeit (%)"},kt={clear_night:"Klar",cloudy:"Bewölkt",fog:"Nebel",hail:"Hagel",lightning:"Gewitter",lightning_rainy:"Gewitter mit Regen",partlycloudy:"Teilweise bewölkt",pouring:"Starker Regen",rainy:"Regen",snowy:"Schnee",snowy_rainy:"Schneeregen",sunny:"Sonnig",windy:"Windig",windy_variant:"Windig",exceptional:"Unwetter"},xt={sun:"So",mon:"Mo",tue:"Di",wed:"Mi",thu:"Do",fri:"Fr",sat:"Sa",sunday:"Sonntag",monday:"Montag",tuesday:"Dienstag",wednesday:"Mittwoch",thursday:"Donnerstag",friday:"Freitag",saturday:"Samstag"},$t={jan:"Jan",feb:"Feb",mar:"Mär",apr:"Apr",may:"Mai",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Okt",nov:"Nov",dec:"Dez",january:"Januar",february:"Februar",march:"März",april:"April",may_long:"Mai",june:"Juni",july:"Juli",august:"August",september:"September",october:"Oktober",november:"November",december:"Dezember"},zt={common:ht,conditions:ut,hero_metric:mt,grid_metrics:pt,status_list:gt,alert_banner:ft,sparkline_bar:_t,schedule_agenda:yt,month_calendar:vt,time:bt,forecast:wt,weather:kt,days:xt,months:$t},Et=Object.freeze({__proto__:null,alert_banner:ft,common:ht,conditions:ut,days:xt,default:zt,forecast:wt,grid_metrics:pt,hero_metric:mt,month_calendar:vt,months:$t,schedule_agenda:yt,sparkline_bar:_t,status_list:gt,time:bt,weather:kt}),At={title:"Titolo",inverted:"Invertito (Sfondo nero, testo bianco)",entity:"Entità",attribute:"Attributo (opzionale)",name:"Nome personalizzato (opzionale)",unit:"Unità personalizzata (opzionale)",icon:"Icona personalizzata (opzionale)",value:"Valore",condition:"Condizione",optional:"Opzionale",none:"Nessuno",active:"Attivo",inactive:"Inattivo",open:"Aperto",closed:"Chiuso",on:"ON",off:"OFF",loading:"Caricamento in corso...",no_events:"Nessun evento in programma",no_data:"Nessun dato disponibile",not_configured:"Scheda non configurata. Seleziona un'entità.",tap_action:"Azione al tocco",double_tap_action:"Azione doppio tocco",hold_action:"Azione pressione prolungata"},St={equals:"È uguale a",not_equals:"Non è uguale a",above:"Maggiore di (>)",below:"Minore di (<)",on:"Stato è ON / Attivo",off:"Stato è OFF / Inattivo"},Mt={name:"E-ink Metrica Principale",description:"Visualizzazione ad alto contrasto di un valore singolo con indicatore di tendenza opzionale.",show_trend:"Mostra tendenza / Variazione",trend_value:"Testo tendenza (es. +1.2° o ▲ 5%)"},Tt={name:"E-ink Griglia di Metriche",description:"Da 2 a 4 metriche correlate in una griglia rigida con divisori continui.",columns:"Colonne (2, 3 o 4)"},Ct={name:"E-ink Lista di Stati",description:"Stati binari o discreti con badge monocromatici ad alto contrasto.",invert_when_active:"Inverti badge se attivo (Sfondo nero, testo bianco)"},Dt={name:"E-ink Banner di Allerta",description:"Blocco di notifica condizionale. Nascosto se la condizione non è attiva.",message:"Messaggio di allerta",message_placeholder:"Attenzione: rilevata condizione critica!"},Nt={name:"E-ink Grafico di Tendenza",description:"Cronologia a barre o a linea continua di 12/24 ore senza antialiasing sfocato.",hours_to_show:"Ore da visualizzare (es. 12, 24)",chart_type:"Stile grafico",chart_bars:"Barre verticali discrete",chart_line:"Linea continua solida"},jt={name:"E-ink Agenda / Eventi",description:"Eventi cronologici compatti separati da linee continue di 1px.",max_items:"Numero massimo di eventi",all_day:"Tutto il giorno"},Ot={name:"E-ink Calendario Mensile",description:"Vista mensile completa con numeri settimana, settimana corrente invertita ed eventi di oggi.",entities:"Calendari",first_day_of_week:"Primo giorno della settimana",monday:"Lunedì",sunday:"Domenica",show_week_numbers:"Mostra numeri settimana",max_events:"Eventi di oggi da mostrare",week_short:"Sett",more_events:"eventi",more_event:"evento"},Ft={name:"E-ink Orologio e Data",description:"Orologio e-ink sincronizzato al minuto, senza sfarfallio dei secondi.",time_format:"Formato orario",show_date:"Mostra data",date_format:"Stile data",date_short:"Data breve (GG/MM/AAAA)",date_long:"Data estesa (Giorno della settimana + Giorno + Mese)",date_combined:"Combinata (Giorno settimana, Data breve)",timezone:"Fuso orario personalizzato (es. Europe/Rome)",secondary_entity_1:"Entità secondaria 1",secondary_entity_2:"Entità secondaria 2"},Pt={name:"E-ink Previsioni Meteo",description:"Meteo attuale, temperatura, previsioni estese e slot per metrica extra.",layout:"Orientamento layout",layout_horizontal:"Orizzontale",layout_vertical:"Verticale",location:"Località (opzionale)",weather_header:"Meteo",today:"Oggi",days_to_show:"Giorni di previsione",extra_attribute:"Metrica aggiuntiva",extra_none:"Nessuna",extra_humidity:"Umidità (%)",extra_pressure:"Pressione atmosferica (hPa)",extra_wind_speed:"Velocità del vento",extra_precipitation:"Probabilità di precipitazioni (%)"},Lt={clear_night:"Sereno",cloudy:"Nuvoloso",fog:"Nebbia",hail:"Grandine",lightning:"Temporale",lightning_rainy:"Temporale con pioggia",partlycloudy:"Parzialmente nuvoloso",pouring:"Pioggia battente",rainy:"Pioggia",snowy:"Neve",snowy_rainy:"Nevischio",sunny:"Soleggiato",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Condizioni estreme"},It={sun:"Dom",mon:"Lun",tue:"Mar",wed:"Mer",thu:"Gio",fri:"Ven",sat:"Sab",sunday:"Domenica",monday:"Lunedì",tuesday:"Martedì",wednesday:"Mercoledì",thursday:"Giovedì",friday:"Venerdì",saturday:"Sabato"},Ut={jan:"Gen",feb:"Feb",mar:"Mar",apr:"Apr",may:"Mag",jun:"Giu",jul:"Lug",aug:"Ago",sep:"Set",oct:"Ott",nov:"Nov",dec:"Dic",january:"Gennaio",february:"Febbraio",march:"Marzo",april:"Aprile",may_long:"Maggio",june:"Giugno",july:"Luglio",august:"Agosto",september:"Settembre",october:"Ottobre",november:"Novembre",december:"Dicembre"},Ht={common:At,conditions:St,hero_metric:Mt,grid_metrics:Tt,status_list:Ct,alert_banner:Dt,sparkline_bar:Nt,schedule_agenda:jt,month_calendar:Ot,time:Ft,forecast:Pt,weather:Lt,days:It,months:Ut},Wt=Object.freeze({__proto__:null,alert_banner:Dt,common:At,conditions:St,days:It,default:Ht,forecast:Pt,grid_metrics:Tt,hero_metric:Mt,month_calendar:Ot,months:Ut,schedule_agenda:jt,sparkline_bar:Nt,status_list:Ct,time:Ft,weather:Lt}),Bt={title:"Titre",inverted:"Inversé (Fond noir, texte blanc)",entity:"Entité",attribute:"Attribut (optionnel)",name:"Nom personnalisé (optionnel)",unit:"Unité personnalisée (optionnel)",icon:"Icône personnalisée (optionnel)",value:"Valeur",condition:"Condition",optional:"Optionnel",none:"Aucun",active:"Actif",inactive:"Inactif",open:"Ouvert",closed:"Fermé",on:"ON",off:"OFF",loading:"Chargement...",no_events:"Aucun événement à venir",no_data:"Aucune donnée disponible",not_configured:"Carte non configurée. Veuillez sélectionner une entité.",tap_action:"Action au toucher",double_tap_action:"Action au double toucher",hold_action:"Action au maintien"},Rt={equals:"Est égal à",not_equals:"N'est pas égal à",above:"Supérieur à (>)",below:"Inférieur à (<)",on:"L'état est ON / Actif",off:"L'état est OFF / Inactif"},Jt={name:"E-ink Métrique Principale",description:"Affichage individuel grand format à fort contraste avec tendance optionnelle.",show_trend:"Afficher la tendance / Delta",trend_value:"Texte de tendance (ex. +1.2° ou ▲ 5%)"},qt={name:"E-ink Grille de Métriques",description:"2 à 4 métriques reliées dans une grille stricte avec séparateurs nets.",columns:"Colonnes (2, 3 ou 4)"},Vt={name:"E-ink Liste d'États",description:"États binaires ou discrets avec badges monochromes à fort contraste.",invert_when_active:"Inverser le badge lorsqu'il est actif (Fond noir, texte blanc)"},Gt={name:"E-ink Bannière d'Alerte",description:"Bloc d'alerte conditionnel à fort contraste. Masqué si inactif.",message:"Message d'alerte",message_placeholder:"Avertissement : condition critique détectée !"},Kt={name:"E-ink Barre de Tendance",description:"Historique 12/24h net sous forme de barres ou de ligne continue sans flou.",hours_to_show:"Heures à afficher (ex. 12, 24)",chart_type:"Style de graphique",chart_bars:"Barres verticales discrètes",chart_line:"Ligne continue solide"},Zt={name:"E-ink Agenda / Événements",description:"Liste chronologique compacte séparée par des lignes solides de 1px.",max_items:"Nombre maximum d'événements",all_day:"Journée"},Yt={name:"E-ink Calendrier Mensuel",description:"Vue mensuelle complète avec numéros de semaine, semaine actuelle inversée et événements du jour.",entities:"Calendriers",first_day_of_week:"Premier jour de la semaine",monday:"Lundi",sunday:"Dimanche",show_week_numbers:"Afficher les numéros de semaine",max_events:"Événements du jour à afficher",week_short:"Sem",more_events:"événements",more_event:"événement"},Qt={name:"E-ink Horloge et Date",description:"Horloge e-ink synchronisée à la minute sans clignotement des secondes.",time_format:"Format de l'heure",show_date:"Afficher la date",date_format:"Style de date",date_short:"Date courte (JJ/MM/AAAA)",date_long:"Date complète (Jour + Quantième + Mois)",date_combined:"Combinée (Jour, Date courte)",timezone:"Fuseau horaire personnalisé (ex. Europe/Paris)",secondary_entity_1:"Entité secondaire 1",secondary_entity_2:"Entité secondaire 2"},Xt={name:"E-ink Météo et Prévisions",description:"État météo, température, prévisions étendues et attribut supplémentaire.",layout:"Orientation de l'affichage",layout_horizontal:"Horizontal",layout_vertical:"Vertical",location:"Lieu (optionnel)",weather_header:"Météo",today:"Aujourd'hui",days_to_show:"Jours de prévision",extra_attribute:"Métrique supplémentaire",extra_none:"Aucune",extra_humidity:"Humidité (%)",extra_pressure:"Pression atmosphérique (hPa)",extra_wind_speed:"Vitesse du vent",extra_precipitation:"Probabilité de précipitations (%)"},ei={clear_night:"Dégagé",cloudy:"Nuageux",fog:"Brouillard",hail:"Grêle",lightning:"Orage",lightning_rainy:"Orage avec pluie",partlycloudy:"Éclaircies",pouring:"Pluie battante",rainy:"Pluvieux",snowy:"Neige",snowy_rainy:"Neige fondue",sunny:"Ensoleillé",windy:"Venteux",windy_variant:"Venteux",exceptional:"Intempéries sévères"},ti={sun:"Dim",mon:"Lun",tue:"Mar",wed:"Mer",thu:"Jeu",fri:"Ven",sat:"Sam",sunday:"Dimanche",monday:"Lundi",tuesday:"Mardi",wednesday:"Mercredi",thursday:"Jeudi",friday:"Vendredi",saturday:"Samedi"},ii={jan:"Janv",feb:"Févr",mar:"Mars",apr:"Avr",may:"Mai",jun:"Juin",jul:"Juil",aug:"Août",sep:"Sept",oct:"Oct",nov:"Nov",dec:"Déc",january:"Janvier",february:"Février",march:"Mars",april:"Avril",may_long:"Mai",june:"Juin",july:"Juillet",august:"Août",september:"Septembre",october:"Octobre",november:"Novembre",december:"Décembre"},ni={common:Bt,conditions:Rt,hero_metric:Jt,grid_metrics:qt,status_list:Vt,alert_banner:Gt,sparkline_bar:Kt,schedule_agenda:Zt,month_calendar:Yt,time:Qt,forecast:Xt,weather:ei,days:ti,months:ii},ai=Object.freeze({__proto__:null,alert_banner:Gt,common:Bt,conditions:Rt,days:ti,default:ni,forecast:Xt,grid_metrics:qt,hero_metric:Jt,month_calendar:Yt,months:ii,schedule_agenda:Zt,sparkline_bar:Kt,status_list:Vt,time:Qt,weather:ei}),oi={title:"Título",inverted:"Invertido (Fundo preto, texto branco)",entity:"Entidade",attribute:"Atributo (opcional)",name:"Nome personalizado (opcional)",unit:"Unidade personalizada (opcional)",icon:"Ícone personalizado (opcional)",value:"Valor",condition:"Condição",optional:"Opcional",none:"Nenhum",active:"Ativo",inactive:"Inativo",open:"Aberto",closed:"Fechado",on:"ON",off:"OFF",loading:"A carregar...",no_events:"Sem eventos próximos",no_data:"Sem dados disponíveis",not_configured:"Cartão não configurado. Por favor selecione uma entidade.",tap_action:"Ação ao tocar",double_tap_action:"Ação ao toque duplo",hold_action:"Ação ao manter pressionado"},si={equals:"É igual a",not_equals:"Não é igual a",above:"Maior que (>)",below:"Menor que (<)",on:"Estado é ON / Ativo",off:"Estado é OFF / Inativo"},ri={name:"E-ink Métrica Principal",description:"Exibição de alto contraste de um valor individual com delta de tendência opcional.",show_trend:"Mostrar tendência / Delta",trend_value:"Texto de tendência (ex: +1.2° ou ▲ 5%)"},ci={name:"E-ink Grelha de Métricas",description:"2 a 4 métricas relacionadas numa grelha rígida com divisores sólidos.",columns:"Colunas (2, 3 ou 4)"},li={name:"E-ink Lista de Estados",description:"Estados binários ou discretos com badges monocromáticos de alto contraste.",invert_when_active:"Inverter badge quando ativo (Fundo preto, texto branco)"},di={name:"E-ink Banner de Alerta",description:"Bloco de aviso crítico condicional. Oculto quando inativo.",message:"Mensagem de alerta",message_placeholder:"Aviso: condição crítica detetada!"},hi={name:"E-ink Barra de Tendência",description:"Histórico de 12/24h em barras discretas ou linha sólida sem antialiasing suave.",hours_to_show:"Horas a apresentar (ex: 12, 24)",chart_type:"Estilo de gráfico",chart_bars:"Barras verticais discretas",chart_line:"Linha contínua sólida"},ui={name:"E-ink Agenda / Calendário",description:"Eventos cronológicos compactos separados por linhas sólidas de 1px.",max_items:"Máximo de eventos a apresentar",all_day:"Dia todo"},mi={name:"E-ink Calendário Mensal",description:"Vista mensal completa com números de semana, semana atual invertida e eventos de hoje.",entities:"Calendários",first_day_of_week:"Primeiro dia da semana",monday:"Segunda-feira",sunday:"Domingo",show_week_numbers:"Mostrar números de semana",max_events:"Eventos de hoje a mostrar",week_short:"Sem",more_events:"eventos",more_event:"evento"},pi={name:"E-ink Relógio e Data",description:"Relógio e-ink sincronizado ao minuto sem cintilação de segundos.",time_format:"Formato de hora",show_date:"Mostrar data",date_format:"Estilo de data",date_short:"Data curta (DD/MM/AAAA)",date_long:"Data longa (Dia da semana + Dia + Mês)",date_combined:"Combinada (Dia da semana, Data curta)",timezone:"Fuso horário personalizado (ex: Europe/Lisbon)",secondary_entity_1:"Entidade secundária 1",secondary_entity_2:"Entidade secundária 2"},gi={name:"E-ink Meteorologia e Previsão",description:"Estado do tempo, temperatura, previsão alargada e atributo adicional.",layout:"Orientação do layout",layout_horizontal:"Horizontal",layout_vertical:"Vertical",location:"Localização (opcional)",weather_header:"Meteorologia",today:"Hoje",days_to_show:"Dias de previsão",extra_attribute:"Métrica adicional",extra_none:"Nenhuma",extra_humidity:"Humidade (%)",extra_pressure:"Pressão atmosférica (hPa)",extra_wind_speed:"Velocidade do vento",extra_precipitation:"Probabilidade de precipitação (%)"},fi={clear_night:"Limpo",cloudy:"Nublado",fog:"Nevoeiro",hail:"Granizo",lightning:"Trovoada",lightning_rainy:"Trovoada com chuva",partlycloudy:"Parcialmente nublado",pouring:"Chuva torrencial",rainy:"Chuva",snowy:"Neve",snowy_rainy:"Água-neve",sunny:"Ensolarado",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Tempo severo"},_i={sun:"Dom",mon:"Seg",tue:"Ter",wed:"Qua",thu:"Qui",fri:"Sex",sat:"Sáb",sunday:"Domingo",monday:"Segunda-feira",tuesday:"Terça-feira",wednesday:"Quarta-feira",thursday:"Quinta-feira",friday:"Sexta-feira",saturday:"Sábado"},yi={jan:"Jan",feb:"Fev",mar:"Mar",apr:"Abr",may:"Mai",jun:"Jun",jul:"Jul",aug:"Ago",sep:"Set",oct:"Out",nov:"Nov",dec:"Dez",january:"Janeiro",february:"Fevereiro",march:"Março",april:"Abril",may_long:"Maio",june:"Junho",july:"Julho",august:"Agosto",september:"Setembro",october:"Outubro",november:"Novembro",december:"Dezembro"},vi={common:oi,conditions:si,hero_metric:ri,grid_metrics:ci,status_list:li,alert_banner:di,sparkline_bar:hi,schedule_agenda:ui,month_calendar:mi,time:pi,forecast:gi,weather:fi,days:_i,months:yi},bi=Object.freeze({__proto__:null,alert_banner:di,common:oi,conditions:si,days:_i,default:vi,forecast:gi,grid_metrics:ci,hero_metric:ri,month_calendar:mi,months:yi,schedule_agenda:ui,sparkline_bar:hi,status_list:li,time:pi,weather:fi}),wi={title:"Заголовок",inverted:"Инвертировать (Черный фон, белый текст)",entity:"Объект",attribute:"Атрибут (необязательно)",name:"Свое имя (необязательно)",unit:"Своя единица (необязательно)",icon:"Своя иконка (необязательно)",value:"Значение",condition:"Условие",optional:"Необязательно",none:"Нет",active:"Активен",inactive:"Неактивен",open:"Открыто",closed:"Закрыто",on:"ВКЛ",off:"ВЫКЛ",loading:"Загрузка...",no_events:"Нет предстоящих событий",no_data:"Нет данных",not_configured:"Карточка не настроена. Пожалуйста, выберите объект.",tap_action:"Действие при нажатии",double_tap_action:"Действие при двойном нажатии",hold_action:"Действие при удержании"},ki={equals:"Равно",not_equals:"Не равно",above:"Больше (>)",below:"Меньше (<)",on:"Состояние ВКЛ / Активно",off:"Состояние ВЫКЛ / Неактивно"},xi={name:"E-ink Главная метрика",description:"Крупный высококонтрастный показатель с опциональной индикацией тренда.",show_trend:"Показывать тренд / Дельту",trend_value:"Текст тренда (напр. +1.2° или ▲ 5%)"},$i={name:"E-ink Сетка метрик",description:"От 2 до 4 связанных показателей в строгой сетке со сплошными линиями.",columns:"Колонки (2, 3 или 4)"},zi={name:"E-ink Список состояний",description:"Бинарные или дискретные состояния с четкими монохромными значками.",invert_when_active:"Инвертировать при активности (Черный фон, белый текст)"},Ei={name:"E-ink Баннер оповещения",description:"Контрастный блок критического предупреждения. Скрыт, если неактивен.",message:"Текст предупреждения",message_placeholder:"Внимание: обнаружено критическое состояние!"},Ai={name:"E-ink График тренда",description:"Четкий 12/24-часовой график столбцами или сплошной линией без размытия.",hours_to_show:"Период в часах (напр. 12, 24)",chart_type:"Тип графика",chart_bars:"Дискретные вертикальные столбцы",chart_line:"Сплошная линия"},Si={name:"E-ink Календарь и события",description:"Компактный список событий, разделенный сплошными линиями 1px.",max_items:"Максимум событий",all_day:"Весь день"},Mi={name:"E-ink Календарь на месяц",description:"Полная сетка месяца с номерами недель, выделением текущей недели и событиями на сегодня.",entities:"Календари",first_day_of_week:"Первый день недели",monday:"Понедельник",sunday:"Воскресенье",show_week_numbers:"Показывать номера недель",max_events:"Событий на сегодня",week_short:"Нед",more_events:"событий",more_event:"событие"},Ti={name:"E-ink Часы и дата",description:"Электронные часы с минутной синхронизацией без мерцания секунд.",time_format:"Формат времени",show_date:"Показывать дату",date_format:"Стиль даты",date_short:"Короткая дата (ДД/ММ/ГГГГ)",date_long:"Полная дата (День недели + Число + Месяц)",date_combined:"Комбинированная (День недели, короткая дата)",timezone:"Пользовательский часовой пояс (напр. Europe/Moscow)",secondary_entity_1:"Дополнительный объект 1",secondary_entity_2:"Дополнительный объект 2"},Ci={name:"E-ink Прогноз погоды",description:"Погода, температура, расширенный прогноз и настраиваемый слот метрики.",layout:"Ориентация макета",layout_horizontal:"Горизонтальная",layout_vertical:"Вертикальная",location:"Местоположение (необязательно)",weather_header:"Погода",today:"Сегодня",days_to_show:"Дней прогноза",extra_attribute:"Дополнительная метрика",extra_none:"Нет",extra_humidity:"Влажность (%)",extra_pressure:"Давление (гПа)",extra_wind_speed:"Скорость ветра",extra_precipitation:"Вероятность осадков (%)"},Di={clear_night:"Ясно",cloudy:"Пасмурно",fog:"Туман",hail:"Град",lightning:"Гроза",lightning_rainy:"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег",snowy_rainy:"Мокрый снег",sunny:"Солнечно",windy:"Ветрено",windy_variant:"Ветрено",exceptional:"Опасные явления"},Ni={sun:"Вс",mon:"Пн",tue:"Вт",wed:"Ср",thu:"Чт",fri:"Пт",sat:"Сб",sunday:"Воскресенье",monday:"Понедельник",tuesday:"Вторник",wednesday:"Среда",thursday:"Четверг",friday:"Пятница",saturday:"Суббота"},ji={jan:"Янв",feb:"Фев",mar:"Мар",apr:"Апр",may:"Май",jun:"Июн",jul:"Июл",aug:"Авг",sep:"Сен",oct:"Окт",nov:"Ноя",dec:"Дек",january:"Январь",february:"Февраль",march:"Март",april:"Апрель",may_long:"Май",june:"Июнь",july:"Июль",august:"Август",september:"Сентябрь",october:"Октябрь",november:"Ноябрь",december:"Декабрь"},Oi={common:wi,conditions:ki,hero_metric:xi,grid_metrics:$i,status_list:zi,alert_banner:Ei,sparkline_bar:Ai,schedule_agenda:Si,month_calendar:Mi,time:Ti,forecast:Ci,weather:Di,days:Ni,months:ji},Fi={title:"Tytuł",inverted:"Odwrócony (Czarne tło, biały tekst)",entity:"Encja",attribute:"Atrybut (opcjonalnie)",name:"Własna nazwa (opcjonalnie)",unit:"Własna jednostka (opcjonalnie)",icon:"Własna ikona (opcjonalnie)",value:"Wartość",condition:"Warunek",optional:"Opcjonalnie",none:"Brak",active:"Aktywny",inactive:"Nieaktywny",open:"Otwarte",closed:"Zamknięte",on:"WŁ",off:"WYŁ",loading:"Ładowanie...",no_events:"Brak nadchodzących wydarzeń",no_data:"Brak dostępnych danych",not_configured:"Karta nieskonfigurowana. Wybierz encję.",tap_action:"Akcja dotknięcia",double_tap_action:"Akcja podwójnego dotknięcia",hold_action:"Akcja przytrzymania"},Pi={equals:"Równe",not_equals:"Różne od",above:"Powyżej (>)",below:"Poniżej (<)",on:"Stan to WŁ / Prawda",off:"Stan to WYŁ / Fałsz"},Li={name:"E-ink Główny wskaźnik",description:"Pojedynczy duży wskaźnik o wysokim kontraście z opcjonalnym trendem.",show_trend:"Pokaż trend / zmianę",trend_value:"Tekst trendu (np. +1.2° lub ▲ 5%)"},Ii={name:"E-ink Siatka wskaźników",description:"Od 2 do 4 powiązanych wskaźników w zwartej siatce z ciągłymi liniami.",columns:"Kolumny (2, 3 lub 4)"},Ui={name:"E-ink Lista stanów",description:"Stany binarne lub dyskretne z kontrastowymi monochromatycznymi plakietkami.",invert_when_active:"Odwróć plakietkę gdy aktywna (Czarne tło, biały tekst)"},Hi={name:"E-ink Baner alertu",description:"Wysokokontrastowy warunkowy blok ostrzegawczy. Ukryty gdy nieaktywny.",message:"Treść ostrzeżenia",message_placeholder:"Ostrzeżenie: wykryto stan krytyczny!"},Wi={name:"E-ink Wykres słupkowy Sparkline",description:"Wyraźne słupki trendu 12/24h lub ciągła linia bez rozmycia antyaliasingu.",hours_to_show:"Liczba godzin do wyświetlenia (np. 12, 24)",chart_type:"Styl wykresu",chart_bars:"Dyskretne słupki pionowe",chart_line:"Ciągła linia"},Bi={name:"E-ink Kalendarz / Terminarz",description:"Kompaktowe wydarzenia w porządku chronologicznym oddzielone liniami 1px.",max_items:"Maksymalna liczba wydarzeń",all_day:"Cały dzień"},Ri={name:"E-ink Kalendarz miesięczny",description:"Pełny widok miesiąca z numerami tygodni, odwróconym bieżącym tygodniem i dzisiejszymi wydarzeniami.",entities:"Kalendarze",first_day_of_week:"Pierwszy dzień tygodnia",monday:"Poniedziałek",sunday:"Niedziela",show_week_numbers:"Pokaż numery tygodni",max_events:"Liczba dzisiejszych wydarzeń",week_short:"Tydz",more_events:"wydarzeń",more_event:"wydarzenie"},Ji={name:"E-ink Zegar i data",description:"Zegar e-ink zsynchronizowany z minutą, bez smużenia sekund i z formatami daty.",time_format:"Format czasu",show_date:"Pokaż datę",date_format:"Styl daty",date_short:"Krótka data (DD/MM/RRRR)",date_long:"Długa data (Dzień tygodnia + Dzień + Miesiąc)",date_combined:"Łączona (Dzień tygodnia, Krótka data)",timezone:"Własna strefa czasowa (np. Europe/Warsaw)",secondary_entity_1:"Encja pomocnicza 1",secondary_entity_2:"Encja pomocnicza 2"},qi={name:"E-ink Prognoza pogody",description:"Stan pogody, temperatura, rozszerzona prognoza i dodatkowy wskaźnik.",layout:"Orientacja układu",layout_horizontal:"Pozioma",layout_vertical:"Pionowa",location:"Lokalizacja (opcjonalnie)",weather_header:"Pogoda",today:"Dzisiaj",days_to_show:"Liczba dni w prognozie",extra_attribute:"Dodatkowy wskaźnik",extra_none:"Brak",extra_humidity:"Wilgotność (%)",extra_pressure:"Ciśnienie atmosferyczne (hPa)",extra_wind_speed:"Prędkość wiatru",extra_precipitation:"Prawdopodobieństwo opadów (%)"},Vi={clear_night:"Bezchmurnie",cloudy:"Pochmurno",fog:"Mgła",hail:"Grad",lightning:"Burza",lightning_rainy:"Burza z deszczem",partlycloudy:"Częściowe zachmurzenie",pouring:"Ulewa",rainy:"Deszcz",snowy:"Śnieg",snowy_rainy:"Deszcz ze śniegiem",sunny:"Słonecznie",windy:"Wietrznie",windy_variant:"Wietrznie",exceptional:"Zjawiska ekstremalne"},Gi={sun:"Nie",mon:"Pon",tue:"Wt",wed:"Śr",thu:"Czw",fri:"Pt",sat:"Sob",sunday:"Niedziela",monday:"Poniedziałek",tuesday:"Wtorek",wednesday:"Środa",thursday:"Czwartek",friday:"Piątek",saturday:"Sobota"},Ki={jan:"Sty",feb:"Lut",mar:"Mar",apr:"Kwi",may:"Maj",jun:"Cze",jul:"Lip",aug:"Sie",sep:"Wrz",oct:"Paź",nov:"Lis",dec:"Gru",january:"Styczeń",february:"Luty",march:"Marzec",april:"Kwiecień",may_long:"Maj",june:"Czerwiec",july:"Lipiec",august:"Sierpień",september:"Wrzesień",october:"Październik",november:"Listopad",december:"Grudzień"},Zi={common:Fi,conditions:Pi,hero_metric:Li,grid_metrics:Ii,status_list:Ui,alert_banner:Hi,sparkline_bar:Wi,schedule_agenda:Bi,month_calendar:Ri,time:Ji,forecast:qi,weather:Vi,days:Gi,months:Ki},Yi={title:"Titel",inverted:"Geïnverteerd (Zwarte achtergrond, witte tekst)",entity:"Entiteit",attribute:"Attribuut (optioneel)",name:"Aangepaste naam (optioneel)",unit:"Aangepaste eenheid (optioneel)",icon:"Aangepast pictogram (optioneel)",value:"Waarde",condition:"Voorwaarde",optional:"Optioneel",none:"Geen",active:"Actief",inactive:"Inactief",open:"Open",closed:"Gesloten",on:"AAN",off:"UIT",loading:"Laden...",no_events:"Geen aankomende evenementen",no_data:"Geen gegevens beschikbaar",not_configured:"Kaart niet geconfigureerd. Selecteer een entiteit.",tap_action:"Tikactie",double_tap_action:"Dubbeltikactie",hold_action:"Actie bij vasthouden"},Qi={equals:"Is gelijk aan",not_equals:"Is niet gelijk aan",above:"Boven (>)",below:"Onder (<)",on:"Status is AAN / Waar",off:"Status is UIT / Onwaar"},Xi={name:"E-ink Hoofdmetriek",description:"Grote weergave van één meetwaarde met hoog contrast en optionele trend.",show_trend:"Trend / Delta weergeven",trend_value:"Trendtekst (bijv. +1.2° of ▲ 5%)"},en={name:"E-ink Metriekenrooster",description:"2 tot 4 gerelateerde meetwaarden in een strak raster met doorlopende lijnen.",columns:"Kolommen (2, 3 of 4)"},tn={name:"E-ink Statuslijst",description:"Binaire of discrete statussen met contrastrijke monochrome badges.",invert_when_active:"Badge inverteren indien actief (Zwarte achtergrond, witte tekst)"},nn={name:"E-ink Waarschuwingsbanner",description:"Contrastrijk voorwaardelijk waarschuwingsblok. Verborgen wanneer inactief.",message:"Waarschuwingsbericht",message_placeholder:"Waarschuwing: kritieke toestand gedetecteerd!"},an={name:"E-ink Sparkline-balk",description:"Scherpe historische trendbalken (12/24u) of doorlopende lijn zonder wazige antialiasing.",hours_to_show:"Aantal uren om weer te geven (bijv. 12, 24)",chart_type:"Grafiekstijl",chart_bars:"Discrete verticale balken",chart_line:"Doorlopende lijn"},on={name:"E-ink Agenda / Kalender",description:"Compacte chronologische kalenderevenementen gescheiden door solide 1px lijnen.",max_items:"Maximaal aantal evenementen om te tonen",all_day:"Hele dag"},sn={name:"E-ink Maandkalender",description:"Volledig maandoverzicht met weeknummers, geïnverteerde huidige week en evenementen van vandaag.",entities:"Kalenders",first_day_of_week:"Eerste dag van de week",monday:"Maandag",sunday:"Zondag",show_week_numbers:"Weeknummers weergeven",max_events:"Aantal evenementen van vandaag",week_short:"Wk",more_events:"evenementen",more_event:"evenement"},rn={name:"E-ink Klok & Datum",description:"Op de minuut gesynchroniseerde e-ink klok zonder ghosting per seconde en met datumweergave.",time_format:"Tijdnotatie",show_date:"Datum weergeven",date_format:"Datumstijl",date_short:"Korte datum (DD/MM/JJJJ)",date_long:"Lange datum (Weekdag + Dag + Maand)",date_combined:"Gecombineerd (Weekdag, Korte datum)",timezone:"Aangepaste tijdzone (bijv. Europe/Amsterdam)",secondary_entity_1:"Secundaire entiteit 1",secondary_entity_2:"Secundaire entiteit 2"},cn={name:"E-ink Weersverwachting",description:"Weersstatus, temperatuur, uitgebreide verwachting en extra meting.",layout:"Lay-outoriëntatie",layout_horizontal:"Horizontaal",layout_vertical:"Verticaal",location:"Locatie (optioneel)",weather_header:"Weer",today:"Vandaag",days_to_show:"Aantal dagen in weersverwachting",extra_attribute:"Extra meetwaarde",extra_none:"Geen",extra_humidity:"Luchtvochtigheid (%)",extra_pressure:"Luchtdruk (hPa)",extra_wind_speed:"Windsnelheid",extra_precipitation:"Neerslagkans (%)"},ln={clear_night:"Helder",cloudy:"Bewolkt",fog:"Mistig",hail:"Hagel",lightning:"Onweer",lightning_rainy:"Onweersbuien met regen",partlycloudy:"Gedeeltelijk bewolkt",pouring:"Stortregen",rainy:"Regen",snowy:"Sneeuw",snowy_rainy:"Natte sneeuw",sunny:"Zonnig",windy:"Winderig",windy_variant:"Winderig",exceptional:"Uitzonderlijk weer"},dn={sun:"Zon",mon:"Maa",tue:"Din",wed:"Woe",thu:"Don",fri:"Vri",sat:"Zat",sunday:"Zondag",monday:"Maandag",tuesday:"Dinsdag",wednesday:"Woensdag",thursday:"Donderdag",friday:"Vrijdag",saturday:"Zaterdag"},hn={jan:"Jan",feb:"Feb",mar:"Mrt",apr:"Apr",may:"Mei",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Okt",nov:"Nov",dec:"Dec",january:"Januari",february:"Februari",march:"Maart",april:"April",may_long:"Mei",june:"Juni",july:"Juli",august:"Augustus",september:"September",october:"Oktober",november:"November",december:"December"},un={common:Yi,conditions:Qi,hero_metric:Xi,grid_metrics:en,status_list:tn,alert_banner:nn,sparkline_bar:an,schedule_agenda:on,month_calendar:sn,time:rn,forecast:cn,weather:ln,days:dn,months:hn};const mn={en:De,es:Ge,"zh-Hans":dt,zh:dt,"zh-CN":dt,de:Et,it:Wt,fr:ai,pt:bi,"pt-BR":bi,ru:Object.freeze({__proto__:null,alert_banner:Ei,common:wi,conditions:ki,days:Ni,default:Oi,forecast:Ci,grid_metrics:$i,hero_metric:xi,month_calendar:Mi,months:ji,schedule_agenda:Si,sparkline_bar:Ai,status_list:zi,time:Ti,weather:Di}),pl:Object.freeze({__proto__:null,alert_banner:Hi,common:Fi,conditions:Pi,days:Gi,default:Zi,forecast:qi,grid_metrics:Ii,hero_metric:Li,month_calendar:Ri,months:Ki,schedule_agenda:Bi,sparkline_bar:Wi,status_list:Ui,time:Ji,weather:Vi}),nl:Object.freeze({__proto__:null,alert_banner:nn,common:Yi,conditions:Qi,days:dn,default:un,forecast:cn,grid_metrics:en,hero_metric:Xi,month_calendar:sn,months:hn,schedule_agenda:on,sparkline_bar:an,status_list:tn,time:rn,weather:ln})};function pn(e,t){const i=(t||"en").replace("_","-"),n=mn[i]?i:mn[i.split("-")[0]]?i.split("-")[0]:"en",a=e.split(".");let o=mn[n];for(const e of a){if(!o||"object"!=typeof o||!(e in o)){o=void 0;break}o=o[e]}if(void 0===o&&"en"!==n){o=mn.en;for(const t of a){if(!o||"object"!=typeof o||!(t in o))return e;o=o[t]}}return void 0!==o?o:e}class gn extends le{constructor(){super(...arguments),this._holdFired=!1}disconnectedCallback(){super.disconnectedCallback(),this.clearActionTimers()}clearActionTimers(){void 0!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),void 0!==this._dblTapTimer&&(clearTimeout(this._dblTapTimer),this._dblTapTimer=void 0),this._holdFired=!1}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config=e,e.inverted?this.setAttribute("inverted",""):this.removeAttribute("inverted")}getCardSize(){return 1}getLanguage(){return this.hass?.locale?.language||this.hass?.language||"en"}t(e){return pn(e,this.getLanguage())}getEntity(e){if(e&&this.hass?.states)return this.hass.states[e]}getEntityState(e,t){const i=this.getEntity(e);if(!i)return this.t("common.no_data");if(t&&i.attributes&&t in i.attributes){const e=i.attributes[t];return null!=e?String(e):""}return i.state??""}handleMoreInfo(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}buildActionConfig(e){const t=e??this.config?.entity,i=t?{action:"more-info"}:{action:"none"};return{...this.config,...t?{entity:t}:{},tap_action:this.config?.tap_action??i,...this.config?.double_tap_action?{double_tap_action:this.config.double_tap_action}:{},...this.config?.hold_action?{hold_action:this.config.hold_action}:{}}}hasActiveActions(e){const t=this.buildActionConfig(e);return"none"!==t.tap_action?.action||t.double_tap_action&&"none"!==t.double_tap_action.action||t.hold_action&&"none"!==t.hold_action.action}triggerHassAction(e,t){const i=this.buildActionConfig(t),n="tap"===e?i.tap_action:"double_tap"===e?i.double_tap_action:i.hold_action;if(!n||"none"===n.action)return;const a=new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:i,action:e}});this.dispatchEvent(a)}handleActionPointerDown(e,t){if(e&&"number"==typeof e.button&&0!==e.button)return;void 0!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0),this._holdFired=!1;const i=this.config?.hold_action;i&&"none"!==i.action&&(this._holdTimer=setTimeout(()=>{this._holdTimer=void 0,this._holdFired=!0,this.triggerHassAction("hold",t)},500))}handleActionPointerEnd(){void 0!==this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=void 0)}handleActionClick(e,t){if(e?.defaultPrevented)return;if(this._holdFired)return void(this._holdFired=!1);const i=this.config?.double_tap_action;i&&"none"!==i.action?void 0!==this._dblTapTimer?(clearTimeout(this._dblTapTimer),this._dblTapTimer=void 0,this.triggerHassAction("double_tap",t)):this._dblTapTimer=setTimeout(()=>{this._dblTapTimer=void 0,this.triggerHassAction("tap",t)},250):this.triggerHassAction("tap",t)}}gn.styles=[fe],e([pe({attribute:!1})],gn.prototype,"hass",void 0),e([ge()],gn.prototype,"config",void 0);let fn=class extends gn{static async getConfigElement(){return await Promise.resolve().then(function(){return In}),document.createElement("eink-hero-metric-editor")}static getStubConfig(){return{type:"custom:eink-hero-metric",entity:"",show_trend:!1}}getCardSize(){return 2}render(){if(!this.config||!this.config.entity)return R`
        <div class="eink-card">
          <div class="hero-label">${this.t("hero_metric.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=this.config.name||this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.getEntityState(this.config.entity,this.config.attribute),n=this.config.unit||(this.config.attribute?"":e?.attributes?.unit_of_measurement)||"";return R`
      <div class="eink-card hero-container" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <div class="hero-label">${t}</div>
        <div class="hero-value-row">
          <span class="hero-value tabular">${i}</span>
          ${n?R`<span class="hero-unit">${n}</span>`:""}
        </div>
        ${this.config.show_trend&&this.config.trend_value?R`
              <div class="hero-trend ${this.config.trend_inverted?"inverted":""}">
                <span class="tabular">${this.config.trend_value}</span>
              </div>
            `:""}
      </div>
    `}};fn.styles=[...gn.styles,s`
      .hero-container {
        cursor: pointer;
        user-select: none;
      }
      .hero-label {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 6px;
      }
      .hero-value-row {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 6px;
      }
      .hero-value {
        font-size: 54px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -1px;
      }
      .hero-unit {
        font-size: 22px;
        font-weight: 600;
      }
      .hero-trend {
        margin-top: 8px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 700;
        border: 1px solid var(--eink-border-color);
        padding: 2px 8px;
      }
      .hero-trend.inverted {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
      }
    `],fn=e([he("eink-hero-metric")],fn);let _n=class extends gn{static async getConfigElement(){return await Promise.resolve().then(function(){return Hn}),document.createElement("eink-grid-metrics-editor")}static getStubConfig(){return{type:"custom:eink-grid-metrics",columns:3,metrics:[]}}getCardSize(){return 2}render(){const e=this.config?.metrics||[],t=Math.min(4,Math.max(1,this.config?.columns||(e.length>0?e.length:3)));if(!e||0===e.length)return R`
        <div class="eink-card">
          ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}
          <div class="cell-label">${this.t("grid_metrics.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const i=Math.ceil(e.length/t);return R`
      <div class="eink-card">
        ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}
        <div
          class="grid-container"
          style="grid-template-columns: repeat(${t}, minmax(0, 1fr));"
        >
          ${e.map((e,n)=>{const a=this.getEntity(e.entity),o=e.name||a?.attributes?.friendly_name||e.entity,s=this.getEntityState(e.entity,e.attribute),r=e.unit||(e.attribute?"":a?.attributes?.unit_of_measurement)||"",c=e.icon||a?.attributes?.icon,l=[(n+1)%t===0?"border-right: none;":"",Math.floor(n/t)===i-1?"border-bottom: none;":""].filter(Boolean).join(" ");return R`
              <div
                class="grid-cell"
                style="${l}"
                @click=${()=>this.handleMoreInfo(e.entity)}
              >
                <div class="cell-header">
                  ${c?R`<ha-icon class="cell-icon" .icon=${c}></ha-icon>`:""}
                  <span class="cell-label">${o}</span>
                </div>
                <div class="cell-value-row">
                  <span class="cell-value tabular">${s}</span>
                  ${r?R`<span class="cell-unit">${r}</span>`:""}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};_n.styles=[...gn.styles,s`
      .grid-container {
        display: grid;
        gap: 0;
        border: 1px solid var(--eink-border-color);
        width: 100%;
      }
      .grid-cell {
        padding: 12px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid var(--eink-border-color);
        border-bottom: 1px solid var(--eink-border-color);
        cursor: pointer;
        user-select: none;
      }
      .cell-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
      }
      .cell-icon {
        --mdc-icon-size: 18px;
      }
      .cell-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cell-value-row {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }
      .cell-value {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.1;
      }
      .cell-unit {
        font-size: 12px;
        font-weight: 600;
      }
    `],_n=e([he("eink-grid-metrics")],_n);let yn=class extends gn{static async getConfigElement(){return await Promise.resolve().then(function(){return Bn}),document.createElement("eink-status-list-editor")}static getStubConfig(){return{type:"custom:eink-status-list",entities:[]}}getCardSize(){return Math.max(1,this.config?.entities?.length||1)}render(){const e=this.config?.entities||[];return 0===e.length?R`
        <div class="eink-card">
          ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}
          <div>${this.t("common.not_configured")}</div>
        </div>
      `:R`
      <div class="eink-card">
        ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}
        <div class="status-list">
          ${e.map(e=>{const t=this.getEntity(e.entity),i=e.name||t?.attributes?.friendly_name||e.entity,n=t?.state||this.t("common.no_data"),a=e.icon||t?.attributes?.icon||"mdi:radiobox-blank",o=(e.active_state?[e.active_state.toLowerCase()]:["on","open","active","true","home","unlocked"]).includes(n.toLowerCase()),s=!1!==e.invert_when_active&&o;return R`
              <div class="status-item" @click=${()=>this.handleMoreInfo(e.entity)}>
                <div class="status-left">
                  <ha-icon .icon=${a}></ha-icon>
                  <span class="status-name">${i}</span>
                </div>
                <div class="status-badge ${s?"active-inverted":""}">
                  ${n}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};yn.styles=[...gn.styles,s`
      .status-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .status-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--eink-border-color);
        cursor: pointer;
        user-select: none;
      }
      .status-item:last-child {
        border-bottom: none;
      }
      .status-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        overflow: hidden;
      }
      .status-name {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-badge {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 3px 8px;
        border: 1px solid var(--eink-border-color);
        white-space: nowrap;
      }
      .status-badge.active-inverted {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
      }
    `],yn=e([he("eink-status-list")],yn);let vn=class extends gn{static async getConfigElement(){return await Promise.resolve().then(function(){return Jn}),document.createElement("eink-alert-banner-editor")}static getStubConfig(){return{type:"custom:eink-alert-banner",entity:"",condition:"on",message:"Critical condition detected!"}}getCardSize(){return this.isConditionMet()?1:0}isConditionMet(){if(!this.config||!this.config.entity)return!1;if(!this.getEntity(this.config.entity))return!1;const e=this.getEntityState(this.config.entity,this.config.attribute),t=this.config.condition||"on",i=this.config.value;switch(t){case"on":return["on","true","active","open","problem","detected"].includes(e.toLowerCase());case"off":return["off","false","inactive","closed","clear"].includes(e.toLowerCase());case"equals":return String(e).toLowerCase()===String(i).toLowerCase();case"not_equals":return String(e).toLowerCase()!==String(i).toLowerCase();case"above":{const t=parseFloat(e),n=parseFloat(String(i));return!isNaN(t)&&!isNaN(n)&&t>n}case"below":{const t=parseFloat(e),n=parseFloat(String(i));return!isNaN(t)&&!isNaN(n)&&t<n}default:return!1}}render(){if(!this.config||!this.config.entity)return R`
        <div class="eink-card">
          <div class="alert-title">${this.t("alert_banner.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;if(!this.isConditionMet())return R``;const e=this.getEntity(this.config.entity),t=this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.config.message||this.t("alert_banner.message_placeholder"),n=this.config.icon||"mdi:alert";return R`
      <div class="alert-banner" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <ha-icon class="alert-icon" .icon=${n}></ha-icon>
        <div class="alert-content">
          <span class="alert-title">${t}</span>
          <span class="alert-message">${i}</span>
        </div>
      </div>
    `}};vn.styles=[...gn.styles,s`
      :host {
        margin: 0;
      }
      .alert-banner {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
        border: 2px solid var(--eink-fg);
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
      }
      .alert-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
      }
      .alert-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
      }
      .alert-title {
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .alert-message {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.25;
      }
    `],vn=e([he("eink-alert-banner")],vn);let bn=class extends gn{constructor(){super(...arguments),this.historyPoints=[],this.lastFetchTime=0,this.isFetching=!1,this.fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Vn}),document.createElement("eink-sparkline-bar-editor")}static getStubConfig(){return{type:"custom:eink-sparkline-bar",entity:"",hours_to_show:24,chart_type:"bars"}}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this.fetchHistoryIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.isFetching&&(this.lastFetchTime=0),this.fetchToken++,this.isFetching=!1}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.fetchHistoryIfNeeded()}async fetchHistoryIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass?.callWS||!e)return void(!e&&(this.historyPoints.length>0||this.lastFetchKey)&&(this.historyPoints=[],this.lastFetchKey=void 0,this.lastFetchTime=0,this.fetchToken++,this.isFetching=!1));const t=this.config.hours_to_show||24,i=this.config.attribute,n=`${e}|${i||""}|${t}`,a=this.lastFetchKey!==n;a&&(this.fetchToken++,this.historyPoints=[],this.lastFetchTime=0,this.isFetching=!1);const o=Date.now();if(!a&&(this.isFetching||this.lastFetchTime>0&&o-this.lastFetchTime<3e5))return;this.lastFetchKey=n,this.lastFetchTime=o,this.isFetching=!0;const s=++this.fetchToken,r=new Date(o-3600*t*1e3).toISOString(),c=Boolean(i);try{const n=await this.hass.callWS({type:"history/history_during_period",start_time:r,entity_ids:[e],minimal_response:!c,no_attributes:!c});if(s!==this.fetchToken)return;const a=n?.[e];if(Array.isArray(a)){const e=a.map(e=>{const t=i?(e.a??e.attributes)?.[i]:e.s??e.state;return parseFloat(String(t))}).filter(e=>!isNaN(e));if(e.length>0){const i=Math.min(24,Math.max(8,Math.round(t)));let n;if(e.length<=i)n=e;else{n=[];for(let t=0;t<i;t++){const a=Math.round(t*(e.length-1)/(i-1));n.push(e[a])}}JSON.stringify(n)!==JSON.stringify(this.historyPoints)&&(this.historyPoints=n)}}}catch{if(s===this.fetchToken&&0===this.historyPoints.length){const t=parseFloat(this.getEntityState(e,i));isNaN(t)||(this.historyPoints=[t])}}finally{s===this.fetchToken&&(this.isFetching=!1)}}render(){if(!this.config||!this.config.entity)return R`
        <div class="eink-card">
          <div class="sparkline-label">${this.t("sparkline_bar.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=this.config.name||this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.getEntityState(this.config.entity,this.config.attribute),n=this.config.unit||(this.config.attribute?"":e?.attributes?.unit_of_measurement)||"",a=this.config.chart_type||"bars",o=this.config.hours_to_show||24,s=this.historyPoints.length>0?this.historyPoints:isNaN(parseFloat(i))?[]:[parseFloat(i)],r=s.length>0?Math.min(...s):0,c=s.length>0?Math.max(...s):0;return R`
      <div class="eink-card" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <div class="sparkline-header">
          <span class="sparkline-label">${t}</span>
          <div>
            <span class="sparkline-current tabular">${i}</span>
            ${n?R`<span class="sparkline-unit">${n}</span>`:""}
          </div>
        </div>

        <div class="sparkline-chart">
          ${function(e,t="bars",i=300,n=60,a="currentColor",o=2.5){if(!e||0===e.length)return R`<svg width="100%" height="${n}" viewBox="0 0 ${i} ${n}" style="display: block;"></svg>`;const s=Math.min(...e),r=Math.max(...e),c=r===s,l=c?1:r-s,d=n-8,h=e=>c?.5:(e-s)/l;if("bars"===t){const t=e.length,o=2,s=o*(t-1),r=Math.max(2,Math.floor((i-s)/t));return R`
      <svg
        width="100%"
        height="${n}"
        viewBox="0 0 ${i} ${n}"
        preserveAspectRatio="none"
        shape-rendering="crispEdges"
        style="display: block; overflow: visible;"
      >
        ${e.map((e,t)=>{const i=h(e),s=Math.max(2,Math.round(i*d));return J`<rect x="${t*(r+o)}" y="${n-4-s}" width="${r}" height="${s}" fill="${a}" />`})}
      </svg>
    `}let u;if(1===e.length){const t=Math.round(n-4-h(e[0])*d);u=[`0,${t}`,`${i},${t}`]}else{const t=i/(e.length-1);u=e.map((e,i)=>{const a=h(e);return`${Math.round(i*t)},${Math.round(n-4-a*d)}`})}return R`
    <svg
      width="100%"
      height="${n}"
      viewBox="0 0 ${i} ${n}"
      preserveAspectRatio="none"
      shape-rendering="geometricPrecision"
      style="display: block; overflow: visible;"
    >
      ${J`
        <polyline
          fill="none"
          stroke="${a}"
          stroke-width="${o}"
          stroke-linecap="square"
          stroke-linejoin="miter"
          points="${u.join(" ")}"
        />
      `}
    </svg>
  `}(s,a,300,this.config.height||50,"var(--eink-fg)",this.config.stroke_width||2.5)}
        </div>

        <div class="sparkline-footer tabular">
          <span>MIN: ${r}${n}</span>
          <span>${o}H</span>
          <span>MAX: ${c}${n}</span>
        </div>
      </div>
    `}};bn.styles=[...gn.styles,s`
      .sparkline-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 8px;
      }
      .sparkline-label {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .sparkline-current {
        font-size: 24px;
        font-weight: 800;
      }
      .sparkline-unit {
        font-size: 14px;
        font-weight: 600;
        margin-left: 2px;
      }
      .sparkline-chart {
        width: 100%;
        margin-top: 6px;
        border-top: 1px solid var(--eink-border-color);
        padding-top: 8px;
      }
      .sparkline-footer {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 6px;
      }
    `],e([ge()],bn.prototype,"historyPoints",void 0),bn=e([he("eink-sparkline-bar")],bn);let wn=class extends gn{constructor(){super(...arguments),this.events=[],this.lastFetchTime=0,this.isFetching=!1,this.fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Kn}),document.createElement("eink-schedule-agenda-editor")}static getStubConfig(){return{type:"custom:eink-schedule-agenda",entity:"",max_items:5}}getCardSize(){return Math.max(1,Math.min(this.events.length,this.config?.max_items||5))}connectedCallback(){super.connectedCallback(),this.fetchEventsIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.isFetching&&(this.lastFetchTime=0),this.fetchToken++,this.isFetching=!1}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.fetchEventsIfNeeded()}async fetchEventsIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass?.callApi||!e)return void(!e&&(this.events.length>0||this.lastFetchedEntity)&&(this.events=[],this.lastFetchedEntity=void 0,this.lastFetchTime=0,this.fetchToken++,this.isFetching=!1));const t=this.lastFetchedEntity!==e;t&&(this.fetchToken++,this.events=[],this.lastFetchTime=0,this.isFetching=!1);const i=Date.now();if(!t&&(this.isFetching||this.lastFetchTime>0&&i-this.lastFetchTime<3e5))return;this.lastFetchedEntity=e,this.lastFetchTime=i,this.isFetching=!0;const n=++this.fetchToken,a=new Date(i).toISOString(),o=new Date(i+6048e5).toISOString();try{const t=await this.hass.callApi("GET",`calendars/${encodeURIComponent(e)}?start=${encodeURIComponent(a)}&end=${encodeURIComponent(o)}`);n===this.fetchToken&&Array.isArray(t)&&JSON.stringify(t)!==JSON.stringify(this.events)&&(this.events=t)}catch{}finally{n===this.fetchToken&&(this.isFetching=!1)}}extractStartInfo(e){return e?"string"==typeof e?{rawStr:e,isDateOnly:/^\d{4}-\d{2}-\d{2}$/.test(e)}:e.dateTime?{rawStr:e.dateTime,isDateOnly:!1}:e.date?{rawStr:e.date,isDateOnly:!0}:{isDateOnly:!1}:{isDateOnly:!1}}isSameLocalDay(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}formatEventTime(e){const{rawStr:t,isDateOnly:i}=this.extractStartInfo(e);if(!t)return"--:--";const n=new Date,a=e=>e.toString().padStart(2,"0");if(i){const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),i=e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):new Date(t);return isNaN(i.getTime())?t:this.isSameLocalDay(i,n)?this.t("schedule_agenda.all_day"):`${a(i.getDate())}/${a(i.getMonth()+1)}`}const o=new Date(t);if(isNaN(o.getTime()))return t;const s=a(o.getHours()),r=a(o.getMinutes());return this.isSameLocalDay(o,n)?`${s}:${r}`:`${a(o.getDate())}/${a(o.getMonth()+1)} ${s}:${r}`}render(){if(!this.config||!this.config.entity)return R`
        <div class="eink-card">
          <div class="eink-title">${this.t("schedule_agenda.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.config.title||this.t("schedule_agenda.name"),t=this.config.max_items||5,i=this.events.slice(0,t);return R`
      <div class="eink-card">
        <div class="eink-title">${e}</div>
        <div class="agenda-list">
          ${0===i.length?R`<div class="empty-state">${this.t("common.no_events")}</div>`:i.map(e=>R`
                  <div class="agenda-row">
                    <span class="agenda-time tabular">${this.formatEventTime(e.start)}</span>
                    <div class="agenda-details">
                      <span class="agenda-summary">${e.summary}</span>
                      ${e.location?R`<span class="agenda-location">${e.location}</span>`:""}
                    </div>
                  </div>
                `)}
        </div>
      </div>
    `}};wn.styles=[...gn.styles,s`
      .agenda-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .agenda-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .agenda-row:last-child {
        border-bottom: none;
      }
      .agenda-time {
        font-size: 13px;
        font-weight: 800;
        min-width: 65px;
        flex-shrink: 0;
        text-align: left;
      }
      .agenda-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        overflow: hidden;
      }
      .agenda-summary {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .agenda-location {
        font-size: 11px;
        opacity: 0.9;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .empty-state {
        padding: 12px 0;
        font-size: 13px;
        font-style: italic;
      }
    `],e([ge()],wn.prototype,"events",void 0),wn=e([he("eink-schedule-agenda")],wn);const kn=["sun","mon","tue","wed","thu","fri","sat"],xn=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],$n=["january","february","march","april","may_long","june","july","august","september","october","november","december"],zn={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};function En(e,t){if(t)try{const i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(e),n={};for(const e of i)n[e.type]=e.value;const a=Number(n.year),o=Number(n.month),s=Number(n.day),r=Number(n.hour),c=Number(n.minute),l=zn[n.weekday];if(!(isNaN(a)||isNaN(o)||isNaN(s)||isNaN(r)||isNaN(c)||void 0===l))return{year:a,monthIndex:o-1,dayOfMonth:s,dayOfWeek:l,hours:r%24,minutes:c}}catch{}return{year:e.getFullYear(),monthIndex:e.getMonth(),dayOfMonth:e.getDate(),dayOfWeek:e.getDay(),hours:e.getHours(),minutes:e.getMinutes()}}function An(e,t="24h",i){const{hours:n,minutes:a}=En(e,i);let o=n;const s=e=>e<10?`0${e}`:`${e}`;if("12h"===t){const e=o>=12?"PM":"AM";return o=o%12||12,{time:`${o}:${s(a)}`,ampm:e}}return{time:`${s(o)}:${s(a)}`}}function Sn(e,t,i,n=0,a=0,o=0,s=0,r){if(!r)return new Date(e,t,i,n,a,o,s);try{new Intl.DateTimeFormat("en-US",{timeZone:r}).format(new Date);const c=Date.UTC(e,t,i,n,a,0,0);let l=new Date(c);for(let e=0;e<2;e++){const e=En(l,r),t=c-Date.UTC(e.year,e.monthIndex,e.dayOfMonth,e.hours,e.minutes,0,0);if(0===t)break;l=new Date(l.getTime()+t)}return new Date(l.getTime()+1e3*o+s)}catch{return new Date(e,t,i,n,a,o,s)}}let Mn=class extends gn{constructor(){super(...arguments),this.events=[],this.lastFetchTime=0,this.isFetching=!1,this.fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Yn}),document.createElement("eink-month-calendar-editor")}static getStubConfig(){return{type:"custom:eink-month-calendar",entities:[],first_day_of_week:"monday",time_format:"auto",show_week_numbers:!0,max_events:2}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this.scheduleMidnightRefresh(),this.fetchEventsIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.clearMidnightTimer(),this.isFetching&&(this.lastFetchTime=0),this.fetchToken++,this.isFetching=!1}updated(e){super.updated(e),e.has("config")&&this.scheduleMidnightRefresh(),(e.has("hass")||e.has("config"))&&this.fetchEventsIfNeeded()}clearMidnightTimer(){void 0!==this.midnightTimer&&(clearTimeout(this.midnightTimer),this.midnightTimer=void 0)}scheduleMidnightRefresh(){if(this.clearMidnightTimer(),!this.isConnected)return;const e=new Date,t=this.config?.timezone,i=En(e,t),n=Sn(i.year,i.monthIndex,i.dayOfMonth+1,0,0,0,50,t),a=Math.max(1e3,n.getTime()-e.getTime());this.midnightTimer=setTimeout(()=>{this.midnightTimer=void 0,this.lastFetchTime=0,this.requestUpdate(),this.fetchEventsIfNeeded(),this.scheduleMidnightRefresh()},a),this.midnightTimer?.unref?.()}getConfiguredEntities(){const e=(Array.isArray(this.config?.entities)&&this.config.entities.length>0?this.config.entities:this.config?.entity?[this.config.entity]:[]).filter(e=>"string"==typeof e).map(e=>e.trim()).filter(e=>e.length>0);return Array.from(new Set(e))}getTodayYmd(e=new Date){const{year:t,monthIndex:i,dayOfMonth:n}=En(e,this.config?.timezone),a=e=>String(e).padStart(2,"0");return`${t}-${a(i+1)}-${a(n)}`}async fetchEventsIfNeeded(){const e=this.getConfiguredEntities();if(!this.isConnected||!this.hass?.callApi||0===e.length)return void(0===e.length&&(this.events.length>0||this.lastFetchKey)&&(this.events=[],this.lastFetchKey=void 0,this.lastFetchTime=0,this.fetchToken++,this.isFetching=!1));const t=new Date,i=this.config?.timezone,n=this.getTodayYmd(t),a=`${e.join(",")}|${i||""}|${n}`,o=this.lastFetchKey!==a;o&&(this.fetchToken++,this.events=[],this.lastFetchTime=0,this.isFetching=!1);const s=t.getTime();if(!o&&(this.isFetching||this.lastFetchTime>0&&s-this.lastFetchTime<3e5))return;this.lastFetchKey=a,this.lastFetchTime=s,this.isFetching=!0;const r=++this.fetchToken,c=En(t,i),l=Sn(c.year,c.monthIndex,c.dayOfMonth,0,0,0,0,i),d=Sn(c.year,c.monthIndex,c.dayOfMonth,23,59,59,999,i),h=encodeURIComponent(l.toISOString()),u=encodeURIComponent(d.toISOString());try{const t=await Promise.allSettled(e.map(e=>this.hass.callApi("GET",`calendars/${encodeURIComponent(e)}?start=${h}&end=${u}`)));if(r!==this.fetchToken)return;const i=[];for(const e of t)"fulfilled"===e.status&&Array.isArray(e.value)&&i.push(...e.value);JSON.stringify(i)!==JSON.stringify(this.events)&&(this.events=i)}catch{}finally{r===this.fetchToken&&(this.isFetching=!1)}}extractEventBoundary(e){return e?"string"==typeof e?{rawStr:e,isDateOnly:/^\d{4}-\d{2}-\d{2}$/.test(e)}:e.dateTime?{rawStr:e.dateTime,isDateOnly:!1}:e.date?{rawStr:e.date,isDateOnly:!0}:{isDateOnly:!1}:{isDateOnly:!1}}resolveTimeFormat(){const e=this.config?.time_format||"auto";if("24h"===e||"12h"===e)return e;const t=this.hass?.locale?.time_format;if("12"===t||"am_pm"===t)return"12h";if("24"===t)return"24h";try{if(new Intl.DateTimeFormat(this.getLanguage(),{hour:"numeric"}).resolvedOptions().hour12)return"12h"}catch{}return"24h"}getTodayNormalizedEvents(e){const t=this.config?.timezone,i=En(e,t),n=this.getTodayYmd(e),a=Sn(i.year,i.monthIndex,i.dayOfMonth,0,0,0,0,t).getTime(),o=Sn(i.year,i.monthIndex,i.dayOfMonth,23,59,59,999,t).getTime(),s=this.resolveTimeFormat(),r=this.t("schedule_agenda.all_day"),c=[];for(const e of this.events){const i=this.extractEventBoundary(e.start),l=this.extractEventBoundary(e.end);if(!i.rawStr)continue;if(i.isDateOnly){const t=i.rawStr.slice(0,10),o=l.rawStr?l.rawStr.slice(0,10):void 0;if(!(o?t<=n&&o>n:t===n))continue;c.push({summary:e.summary||"",isAllDay:!0,startMs:a,timeLabel:r});continue}const d=new Date(i.rawStr);if(isNaN(d.getTime()))continue;const h=d.getTime();let u;if(l.rawStr){const e=l.isDateOnly?new Date(`${l.rawStr}T00:00:00`):new Date(l.rawStr);isNaN(e.getTime())||(u=e.getTime())}if(!(void 0!==u?h<=o&&u>a:h>=a&&h<=o))continue;const m=h<a;let p;if(m)p=r;else{const e=An(d,s,t);p=e.ampm?`${e.time} ${e.ampm}`:e.time}c.push({summary:e.summary||"",isAllDay:m,startMs:h,timeLabel:p})}return c.sort((e,t)=>e.isAllDay!==t.isAllDay?e.isAllDay?-1:1:e.startMs!==t.startMs?e.startMs-t.startMs:e.summary.localeCompare(t.summary)),c}getIsoWeekNumber(e,t,i){const n=new Date(Date.UTC(e,t,i)),a=n.getUTCDay()||7;n.setUTCDate(n.getUTCDate()+4-a);const o=new Date(Date.UTC(n.getUTCFullYear(),0,1));return Math.ceil(((n.getTime()-o.getTime())/864e5+1)/7)}getSundayWeekNumber(e,t,i){const n=new Date(Date.UTC(e,t,i)),a=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()+6)).getUTCFullYear(),o=new Date(Date.UTC(a,0,1)),s=new Date(Date.UTC(a,0,1-o.getUTCDay()));return Math.floor((n.getTime()-s.getTime())/6048e5)+1}buildMonthGrid(e,t,i,n){const a=new Date(Date.UTC(e,t,1)).getUTCDay(),o=new Date(Date.UTC(e,t+1,0)).getUTCDate(),s="sunday"===n?a:(a+6)%7,r="sunday"===n?kn:[...kn.slice(1),kn[0]],c=7*Math.ceil((s+o)/7),l=[];for(let a=0;a<c;a+=7){const r=[];for(let e=0;e<7;e++){const t=a+e-s+1;r.push(t>=1&&t<=o?t:null)}const c=a-s+1,d="sunday"===n?this.getSundayWeekNumber(e,t,c):this.getIsoWeekNumber(e,t,c);l.push({weekNumber:d,days:r,isCurrentWeek:r.includes(i)})}return{weekdayKeys:r,weeks:l}}render(){const e=new Date,t=this.config?.timezone,i=En(e,t),n=this.getLanguage().replace("_","-").split("-")[0].toLowerCase(),a=this.t(`months.${$n[i.monthIndex]}`),o="zh"===n?`${i.year}年 ${a}`:`${a} ${i.year}`,s=this.t(`days.${xn[i.dayOfWeek]}`),r="sunday"===this.config?.first_day_of_week?"sunday":"monday",c=!1!==this.config?.show_week_numbers,l=Math.max(1,Math.min(5,this.config?.max_events||2)),{weekdayKeys:d,weeks:h}=this.buildMonthGrid(i.year,i.monthIndex,i.dayOfMonth,r),u=this.getConfiguredEntities(),m=u[0],p=u.length>0?this.getTodayNormalizedEvents(e):[],g=p.slice(0,l),f=Math.max(0,p.length-l),_=this.hasActiveActions(m),y=c?"with-weeks":"no-weeks";return R`
      <div
        class="eink-card ${_?"interactive":""}"
        @pointerdown=${e=>this.handleActionPointerDown(e,m)}
        @pointerup=${()=>this.handleActionPointerEnd()}
        @pointercancel=${()=>this.handleActionPointerEnd()}
        @pointerleave=${()=>this.handleActionPointerEnd()}
        @click=${e=>this.handleActionClick(e,m)}
      >
        ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}

        <div class="month-header">${o}</div>

        <div class="today-summary">
          <div class="today-left">
            <span class="today-weekday">${s}</span>
            <span class="today-number tabular">${i.dayOfMonth}</span>
          </div>

          ${u.length>0?R`
                <div class="today-events">
                  ${0===g.length?R`<div class="today-no-events">${this.t("common.no_events")}</div>`:R`
                        ${g.map(e=>R`
                            <div class="today-event-slot">
                              <span class="today-event-time tabular">${e.timeLabel}</span>
                              <span class="today-event-summary">${e.summary}</span>
                            </div>
                          `)}
                        ${f>0?R`
                              <div class="today-events-more">
                                <span class="tabular">+${f}</span>
                                <span
                                  >${this.t(1===f?"month_calendar.more_event":"month_calendar.more_events")}</span
                                >
                              </div>
                            `:""}
                      `}
                </div>
              `:""}
        </div>

        <div class="month-grid">
          <div class="month-row header-row ${y}">
            ${c?R`<span class="wk-header">${this.t("month_calendar.week_short")}</span>`:""}
            ${d.map(e=>R`<span class="weekday-header">${this.t(`days.${e}`)}</span>`)}
          </div>

          ${h.map(e=>R`
              <div class="month-row ${y} ${e.isCurrentWeek?"current-week":""}">
                ${c?R`<span class="wk-cell tabular">${e.weekNumber}</span>`:""}
                ${e.days.map(e=>null===e?R`<span class="day-cell empty"></span>`:e===i.dayOfMonth?R`<span class="day-cell current-day tabular"
                          ><span class="current-day-badge">${e}</span></span
                        >`:R`<span class="day-cell tabular">${e}</span>`)}
              </div>
            `)}
        </div>
      </div>
    `}};Mn.styles=[...gn.styles,s`
      .eink-card.interactive {
        cursor: pointer;
      }
      .month-header {
        font-size: 24px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        line-height: 1.1;
        margin-bottom: 10px;
      }
      .today-summary {
        display: flex;
        align-items: stretch;
        gap: 12px;
        margin-bottom: 14px;
      }
      .today-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        min-width: 56px;
      }
      .today-weekday {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.1;
      }
      .today-number {
        font-size: 40px;
        font-weight: 800;
        line-height: 1;
        margin-top: 2px;
      }
      .today-events {
        display: flex;
        align-items: stretch;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .today-event-slot {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        min-width: 0;
        flex: 1;
      }
      .today-event-time {
        font-size: 11px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
      }
      .today-event-summary {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 2px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
      }
      .today-events-more {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
      }
      .today-no-events {
        display: flex;
        align-items: center;
        border-left: 2px solid var(--eink-border-color);
        padding: 2px 10px;
        font-size: 12px;
        font-style: italic;
        opacity: 0.85;
      }
      .month-grid {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .month-row {
        display: grid;
        align-items: center;
        min-height: 28px;
      }
      .month-row.with-weeks {
        grid-template-columns: 32px repeat(7, minmax(0, 1fr));
      }
      .month-row.no-weeks {
        grid-template-columns: repeat(7, minmax(0, 1fr));
      }
      .month-row.header-row {
        min-height: 24px;
        margin-bottom: 2px;
      }
      .wk-header {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        opacity: 0.75;
      }
      .weekday-header {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 0.3px;
      }
      .wk-cell {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        opacity: 0.75;
      }
      .day-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-weight: 600;
        height: 26px;
      }
      .month-row.current-week {
        background-color: var(--eink-fg);
        color: var(--eink-bg);
        padding: 2px 0;
      }
      .month-row.current-week .wk-cell {
        opacity: 1;
        font-weight: 700;
      }
      .current-day-badge {
        background-color: var(--eink-bg);
        color: var(--eink-fg);
        font-weight: 800;
        padding: 1px 6px;
        min-width: 24px;
        text-align: center;
        line-height: 1.25;
      }
    `],e([ge()],Mn.prototype,"events",void 0),Mn=e([he("eink-month-calendar")],Mn);let Tn=class extends gn{constructor(){super(...arguments),this.currentDate=new Date}static async getConfigElement(){return await Promise.resolve().then(function(){return Xn}),document.createElement("eink-time-editor")}static getStubConfig(){return{type:"custom:eink-time",time_format:"24h",show_date:!0,date_format:"long"}}connectedCallback(){super.connectedCallback(),this.cleanupTimer&&(this.cleanupTimer(),this.cleanupTimer=void 0),this.currentDate=new Date,this.cleanupTimer=function(e){let t=null,i=null;return function(){const n=new Date,a=1e3*(60-n.getSeconds())-n.getMilliseconds()+20;t=setTimeout(()=>{e(),i=setInterval(e,6e4)},a)}(),()=>{null!==t&&clearTimeout(t),null!==i&&clearInterval(i)}}(()=>{this.currentDate=new Date,this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this.cleanupTimer&&(this.cleanupTimer(),this.cleanupTimer=void 0)}getCardSize(){return 2}render(){const e=this.config?.time_format||"24h",t=!1!==this.config?.show_date,i=this.config?.date_format||"long",n=this.config?.timezone,a=this.getLanguage(),o=An(this.currentDate,e,n),s=t?function(e,t,i="en",n){const{year:a,monthIndex:o,dayOfMonth:s,dayOfWeek:r}=En(e,n),c=(i||"en").replace("_","-").split("-")[0].toLowerCase(),l=pn(`days.${kn[r]}`,i),d=pn(`days.${xn[r]}`,i),h=pn(`months.${$n[o]}`,i),u=e=>e<10?`0${e}`:`${e}`;return"short"===t?"zh"===c?`${a}/${u(o+1)}/${u(s)}`:`${u(s)}/${u(o+1)}/${a}`:"long"===t?"zh"===c?`${a}年${o+1}月${s}日 ${d}`:"de"===c?`${d}, ${s}. ${h}`:"es"===c||"it"===c||"pt"===c?`${d}, ${s} de ${h}`:"fr"===c||"nl"===c?`${d} ${s} ${h}`:"ru"===c||"pl"===c?`${d}, ${s} ${h}`:`${d}, ${h} ${s}`:`${l}, ${u(s)}/${u(o+1)}`}(this.currentDate,i,a,n):"",r=this.getEntity(this.config?.entity_1),c=this.getEntity(this.config?.entity_2);return R`
      <div class="eink-card">
        ${this.config?.title?R`<div class="eink-title">${this.config.title}</div>`:""}
        <div class="time-card-content">
          <div class="time-row">
            <span class="time-digits tabular">${o.time}</span>
            ${o.ampm?R`<span class="time-ampm">${o.ampm}</span>`:""}
          </div>

          ${t?R`<div class="date-text">${s}</div>`:""}

          ${r||c?R`
                <div class="entities-row">
                  ${r?R`
                        <div class="entity-chip" @click=${()=>this.handleMoreInfo(this.config.entity_1)}>
                          <ha-icon
                            class="chip-icon"
                            .icon=${r.attributes.icon||"mdi:information-outline"}
                          ></ha-icon>
                          <span class="tabular"
                            >${r.state} ${r.attributes.unit_of_measurement||""}</span
                          >
                        </div>
                      `:""}
                  ${c?R`
                        <div class="entity-chip" @click=${()=>this.handleMoreInfo(this.config.entity_2)}>
                          <ha-icon
                            class="chip-icon"
                            .icon=${c.attributes.icon||"mdi:information-outline"}
                          ></ha-icon>
                          <span class="tabular"
                            >${c.state} ${c.attributes.unit_of_measurement||""}</span
                          >
                        </div>
                      `:""}
                </div>
              `:""}
        </div>
      </div>
    `}};Tn.styles=[...gn.styles,s`
      .time-card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4px 0;
      }
      .time-row {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 6px;
      }
      .time-digits {
        font-size: 64px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -2px;
      }
      .time-ampm {
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .date-text {
        font-size: 15px;
        font-weight: 700;
        margin-top: 8px;
        letter-spacing: 0.5px;
      }
      .entities-row {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid var(--eink-border-color);
        width: 100%;
        flex-wrap: wrap;
      }
      .entity-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .chip-icon {
        --mdc-icon-size: 16px;
      }
    `],e([ge()],Tn.prototype,"currentDate",void 0),Tn=e([he("eink-time")],Tn);const Cn={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:weather-alert"};function Dn(e){if(!e)return"mdi:weather-cloudy";const t=e.toLowerCase().trim();return Cn[t]||"mdi:weather-cloudy"}function Nn(e,t="en"){if(!e)return"";const i=`weather.${e.toLowerCase().trim().replace(/-/g,"_")}`,n=pn(i,t);return n!==i?n:e}let jn=class extends gn{constructor(){super(...arguments),this.forecastList=[],this._subscribeToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return ta}),document.createElement("eink-forecast-editor")}static getStubConfig(){return{type:"custom:eink-forecast",entity:"",layout:"horizontal",days_to_show:4,extra_attribute:"humidity"}}getCardSize(){return"vertical"===this.config?.layout?5:3}connectedCallback(){super.connectedCallback(),this.subscribeForecastIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeForecast()}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.subscribeForecastIfNeeded()}invokeUnsub(e){if(e)try{Promise.resolve(e()).catch(()=>{})}catch{}}unsubscribeForecast(){this._subscribeToken++,this._subscribedEntity=void 0,this._subscribedConnection=void 0;const e=this._unsubForecast;this._unsubForecast=void 0,this.invokeUnsub(e)}applyLegacyForecastFallback(e){const t=this.getEntity(e);t?.attributes?.forecast&&Array.isArray(t.attributes.forecast)&&(this.forecastList=t.attributes.forecast)}async subscribeForecastIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass||!e)return(this._subscribedEntity||this._unsubForecast)&&this.unsubscribeForecast(),void(!e&&this.forecastList.length>0&&(this.forecastList=[]));const t=this.hass.connection;if(this._subscribedEntity===e&&this._subscribedConnection===t)return;const i=this._subscribedEntity!==e;if(this.unsubscribeForecast(),i&&(this.forecastList=[]),!this.getEntity(e))return;this._subscribedEntity=e,this._subscribedConnection=t;const n=this._subscribeToken;if(t?.subscribeMessage)try{const i=await t.subscribeMessage(e=>{if(n!==this._subscribeToken)return;const t=Array.isArray(e?.forecast)?e.forecast:[];JSON.stringify(t)!==JSON.stringify(this.forecastList)&&(this.forecastList=t)},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(n!==this._subscribeToken||!this.isConnected)return void this.invokeUnsub(i);this._unsubForecast=i}catch{n===this._subscribeToken&&this.applyLegacyForecastFallback(e)}else this.applyLegacyForecastFallback(e)}formatDayName(e){if(!e)return"";const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),i=t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])):new Date(e);if(isNaN(i.getTime()))return e;return pn(`days.${["sun","mon","tue","wed","thu","fri","sat"][i.getDay()]}`,this.getLanguage())}render(){if(!this.config||!this.config.entity)return R`
        <div class="eink-card">
          <div class="eink-title">${this.t("forecast.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=e?.state,i=e?.attributes?.temperature,n=e?.attributes?.temperature_unit||"°C",a=this.getLanguage(),o=Nn(t,a),s=Dn(t),r=this.config.extra_attribute||"humidity",c="none"!==r,l=c?e?.attributes?.[r]:void 0;let d=this.config.extra_attribute_label;if(!d&&c){const e=`forecast.extra_${r}`,t=this.t(e);d=t!==e?t:r}let h="";"humidity"===r?h="%":"pressure"===r?h=" "+(e?.attributes?.pressure_unit||"hPa"):"wind_speed"===r?h=" "+(e?.attributes?.wind_speed_unit||"km/h"):"precipitation"===r&&(h="%");const u=this.config.days_to_show||4,m=this.forecastList.slice(0,u),p=this.hasActiveActions(this.config.entity);if("vertical"===this.config.layout){const t=this.config.title||this.t("forecast.weather_header"),r=this.config.location||e?.attributes?.friendly_name||"",c=this.forecastList[0]?.templow;return R`
        <div
          class="eink-card ${p?"interactive":""}"
          @pointerdown=${e=>this.handleActionPointerDown(e,this.config.entity)}
          @pointerup=${()=>this.handleActionPointerEnd()}
          @pointercancel=${()=>this.handleActionPointerEnd()}
          @pointerleave=${()=>this.handleActionPointerEnd()}
          @click=${e=>this.handleActionClick(e,this.config.entity)}
        >
          <div class="forecast-v-header">
            <span class="v-title">${t}</span>
            ${r?R`<span class="v-location">${r}</span>`:""}
          </div>

          <div class="forecast-v-current">
            <ha-icon class="v-current-icon" .icon=${s}></ha-icon>
            <div class="v-current-temp tabular">${void 0!==c?`${void 0!==i?i:"--"}${n} / ${c}${n}`:`${void 0!==i?i:"--"}${n}`}</div>
            <div class="v-current-condition">${this.t("forecast.today")}: ${o}</div>
            ${void 0!==l?R`<div class="v-current-extra tabular">${d}: ${l}${h}</div>`:""}
          </div>

          ${m.length>0?R`
                <div class="forecast-v-list">
                  ${m.map(e=>R`
                      <div class="forecast-v-row">
                        <ha-icon class="v-day-icon" .icon=${Dn(e.condition)}></ha-icon>
                        <div class="v-day-details">
                          <span class="v-day-name">${this.formatDayName(e.datetime)}:</span>
                          <span class="v-day-cond">${Nn(e.condition,a)}</span>
                        </div>
                        <span class="v-day-temp tabular"
                          >${void 0!==e.temperature?`${e.temperature}${n}`:"--"}</span
                        >
                      </div>
                    `)}
                </div>
              `:""}
        </div>
      `}return R`
      <div
        class="eink-card ${p?"interactive":""}"
        @pointerdown=${e=>this.handleActionPointerDown(e,this.config.entity)}
        @pointerup=${()=>this.handleActionPointerEnd()}
        @pointercancel=${()=>this.handleActionPointerEnd()}
        @pointerleave=${()=>this.handleActionPointerEnd()}
        @click=${e=>this.handleActionClick(e,this.config.entity)}
      >
        ${this.config.title?R`<div class="eink-title">${this.config.title}</div>`:""}

        <div class="forecast-main">
          <div class="forecast-current-left">
            <ha-icon class="current-icon" .icon=${s}></ha-icon>
            <div class="current-details">
              <div class="current-temp-row">
                <span class="current-temp tabular">${void 0!==i?i:"--"}</span>
                <span class="current-unit">${n}</span>
              </div>
              <span class="current-condition">${o}</span>
            </div>
          </div>

          ${void 0!==l?R`
                <div class="current-extra">
                  <span class="extra-label">${d}</span>
                  <span class="extra-value tabular">${l}${h}</span>
                </div>
              `:""}
        </div>

        ${m.length>0?R`
              <div class="forecast-grid">
                ${m.map(e=>R`
                    <div class="forecast-day">
                      <span class="day-name">${this.formatDayName(e.datetime)}</span>
                      <ha-icon class="day-icon" .icon=${Dn(e.condition)}></ha-icon>
                      <div class="day-temps tabular">
                        <span class="day-high"
                          >${void 0!==e.temperature?`${e.temperature}°`:"--"}</span
                        >
                        ${void 0!==e.templow?R`<span class="day-low">${e.templow}°</span>`:""}
                      </div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}};jn.styles=[...gn.styles,s`
      .forecast-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .forecast-current-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .current-icon {
        --mdc-icon-size: 44px;
      }
      .current-details {
        display: flex;
        flex-direction: column;
      }
      .current-temp-row {
        display: flex;
        align-items: baseline;
        gap: 2px;
      }
      .current-temp {
        font-size: 38px;
        font-weight: 800;
        line-height: 1;
      }
      .current-unit {
        font-size: 18px;
        font-weight: 600;
      }
      .current-condition {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .current-extra {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        font-size: 12px;
      }
      .extra-label {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.5px;
      }
      .extra-value {
        font-size: 18px;
        font-weight: 800;
      }
      .forecast-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 0;
        margin-top: 10px;
        border: 1px solid var(--eink-border-color);
      }
      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 4px;
        border-right: 1px solid var(--eink-border-color);
        text-align: center;
      }
      .forecast-day:last-child {
        border-right: none;
      }
      .day-name {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      .day-icon {
        --mdc-icon-size: 24px;
        margin-bottom: 4px;
      }
      .day-temps {
        font-size: 12px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .day-high {
        font-weight: 800;
      }
      .day-low {
        font-size: 10px;
        opacity: 0.85;
      }
      .eink-card.interactive {
        cursor: pointer;
      }
      .forecast-v-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 10px;
      }
      .v-title {
        font-size: 13px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }
      .v-location {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .forecast-v-current {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .v-current-icon {
        --mdc-icon-size: 64px;
        margin: 4px 0 8px 0;
      }
      .v-current-temp {
        font-size: 28px;
        font-weight: 800;
        line-height: 1.1;
      }
      .v-current-condition {
        font-size: 14px;
        font-weight: 600;
        margin-top: 8px;
        align-self: flex-start;
        text-align: left;
      }
      .v-current-extra {
        font-size: 11px;
        font-weight: 700;
        margin-top: 4px;
        align-self: flex-start;
        text-align: left;
        opacity: 0.9;
      }
      .forecast-v-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .forecast-v-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--eink-border-color);
      }
      .forecast-v-row:last-child {
        border-bottom: none;
        padding-bottom: 2px;
      }
      .v-day-icon {
        --mdc-icon-size: 28px;
        flex-shrink: 0;
      }
      .v-day-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
      }
      .v-day-name {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
      }
      .v-day-cond {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .v-day-temp {
        font-size: 18px;
        font-weight: 800;
        flex-shrink: 0;
      }
    `],e([ge()],jn.prototype,"forecastList",void 0),jn=e([he("eink-forecast")],jn);const On=window.customCards=window.customCards||[],Fn=[{type:"eink-hero-metric",name:"E-ink Hero Metric",description:"High-contrast large single metric with optional trend indicator for E-ink screens."},{type:"eink-grid-metrics",name:"E-ink Grid Metrics",description:"Strict solid-divider grid displaying 2 to 4 related sensor metrics."},{type:"eink-status-list",name:"E-ink Status List",description:"Clean list of discrete or binary states with inverted solid badges for active items."},{type:"eink-alert-banner",name:"E-ink Alert Banner",description:"Conditional high-contrast alert block that remains 0px when condition is clear."},{type:"eink-sparkline-bar",name:"E-ink Sparkline Bar",description:"Discrete 12/24h trend bars or solid line with crisp edges and zero antialiasing blur."},{type:"eink-schedule-agenda",name:"E-ink Schedule Agenda",description:"Chronological calendar agenda with bold times and 1px dividers."},{type:"eink-month-calendar",name:"E-ink Month Calendar",description:"Full monthly calendar with week numbers, current week highlight, and today events."},{type:"eink-time",name:"E-ink Clock & Date",description:"Minute-synchronized digital clock with date formats and zero second ghosting."},{type:"eink-forecast",name:"E-ink Weather Forecast",description:"Weather status, temperature, extended multi-day forecast and extra metric slot."}];for(const e of Fn)On.some(t=>t.type===e.type)||On.push(e);console.info("%c SIMPLE-EINK-COLLECTION-CARDS %c v1.1.0-beta.1 ","color: #ffffff; background: #000000; font-weight: 700; border: 1px solid #ffffff;","color: #000000; background: #ffffff; font-weight: 700; border: 1px solid #000000;");class Pn extends le{constructor(){super(...arguments),this._computeLabel=e=>e.label||this.t(e.name)||e.name}setConfig(e){this._config={...e}}getLanguage(){return this.hass?.locale?.language||this.hass?.language||"en"}t(e){return pn(e,this.getLanguage())}getFormData(){return this._config}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.target;t&&"HA-FORM"===t.tagName&&e.detail?.value&&(this._config={type:this._config.type,...e.detail.value},this.fireConfigChanged())}fireConfigChanged(){const e=new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}});this.dispatchEvent(e)}render(){return this.hass&&this._config?R`
      <ha-form
        .hass=${this.hass}
        .data=${this.getFormData()}
        .schema=${this.getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:R``}}Pn.styles=s`
    ha-form {
      display: block;
      margin-bottom: 16px;
    }
  `,e([pe({attribute:!1})],Pn.prototype,"hass",void 0),e([ge()],Pn.prototype,"_config",void 0);let Ln=class extends Pn{getSchema(){const e=[{name:"entity",label:this.t("common.entity"),selector:{entity:{}}}];return this._config?.entity&&e.push({name:"attribute",label:this.t("common.attribute"),selector:{attribute:{entity_id:this._config.entity}}}),e.push({name:"name",label:this.t("common.name"),selector:{text:{}}},{name:"unit",label:this.t("common.unit"),selector:{text:{}}},{name:"show_trend",label:this.t("hero_metric.show_trend"),selector:{boolean:{}}},{name:"trend_value",label:this.t("hero_metric.trend_value"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}),e}};Ln=e([he("eink-hero-metric-editor")],Ln);var In=Object.freeze({__proto__:null,get EinkHeroMetricEditor(){return Ln}});let Un=class extends Pn{getFormData(){const e=this._config?.metrics||[],t={columns:String(this._config?.columns||3),inverted:Boolean(this._config?.inverted)};this._config?.title&&(t.title=this._config.title);for(let i=0;i<4;i++){const n=i+1;e[i]?.entity&&(t[`metric_${n}`]=e[i].entity),e[i]?.name&&(t[`metric_${n}_name`]=e[i].name)}return t}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass||!e.detail?.value)return;const t=e.detail.value,i=this._config.metrics||[],n=[];for(let e=0;e<4;e++){const a=e+1,o=t[`metric_${a}`];if(!o)continue;const s={...i[e]||{},entity:o},r=t[`metric_${a}_name`];r?s.name=r:delete s.name,n.push(s)}const a={...this._config,columns:Number(t.columns)||3,inverted:Boolean(t.inverted),metrics:[...n,...i.slice(4)]};t.title?a.title=t.title:delete a.title,this._config=a,this.fireConfigChanged()}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"columns",label:this.t("grid_metrics.columns"),selector:{select:{options:[{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"}]}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},...[1,2,3,4].flatMap(e=>[{name:`metric_${e}`,label:`${this.t("common.entity")} ${e}`,selector:{entity:{}}},{name:`metric_${e}_name`,label:`${this.t("common.name")} ${e}`,selector:{text:{}}}])]}};Un=e([he("eink-grid-metrics-editor")],Un);var Hn=Object.freeze({__proto__:null,get EinkGridMetricsEditor(){return Un}});let Wn=class extends Pn{getFormData(){const e=this._config?.entities||[],t={inverted:Boolean(this._config?.inverted)};this._config?.title&&(t.title=this._config.title);for(let i=0;i<5;i++){const n=i+1;e[i]?.entity&&(t[`entity_${n}`]=e[i].entity),e[i]?.name&&(t[`name_${n}`]=e[i].name)}return t}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass||!e.detail?.value)return;const t=e.detail.value,i=this._config.entities||[],n=[];for(let e=0;e<5;e++){const a=e+1,o=t[`entity_${a}`];if(!o)continue;const s={...i[e]||{},entity:o},r=t[`name_${a}`];r?s.name=r:delete s.name,n.push(s)}const a={...this._config,inverted:Boolean(t.inverted),entities:[...n,...i.slice(5)]};t.title?a.title=t.title:delete a.title,this._config=a,this.fireConfigChanged()}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},...[1,2,3,4,5].flatMap(e=>[{name:`entity_${e}`,label:`${this.t("common.entity")} ${e}`,selector:{entity:{}}},{name:`name_${e}`,label:`${this.t("common.name")} ${e}`,selector:{text:{}}}])]}};Wn=e([he("eink-status-list-editor")],Wn);var Bn=Object.freeze({__proto__:null,get EinkStatusListEditor(){return Wn}});let Rn=class extends Pn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{}}},{name:"condition",label:this.t("common.condition"),selector:{select:{options:[{value:"on",label:this.t("conditions.on")},{value:"off",label:this.t("conditions.off")},{value:"equals",label:this.t("conditions.equals")},{value:"not_equals",label:this.t("conditions.not_equals")},{value:"above",label:this.t("conditions.above")},{value:"below",label:this.t("conditions.below")}]}}},{name:"value",label:this.t("common.value"),selector:{text:{}}},{name:"message",label:this.t("alert_banner.message"),selector:{text:{}}},{name:"icon",label:this.t("common.icon"),selector:{icon:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Rn=e([he("eink-alert-banner-editor")],Rn);var Jn=Object.freeze({__proto__:null,get EinkAlertBannerEditor(){return Rn}});let qn=class extends Pn{getSchema(){const e=[{name:"entity",label:this.t("common.entity"),selector:{entity:{}}}];return this._config?.entity&&e.push({name:"attribute",label:this.t("common.attribute"),selector:{attribute:{entity_id:this._config.entity}}}),e.push({name:"name",label:this.t("common.name"),selector:{text:{}}},{name:"unit",label:this.t("common.unit"),selector:{text:{}}},{name:"hours_to_show",label:this.t("sparkline_bar.hours_to_show"),selector:{number:{min:1,max:168,mode:"box"}}},{name:"chart_type",label:this.t("sparkline_bar.chart_type"),selector:{select:{options:[{value:"bars",label:this.t("sparkline_bar.chart_bars")},{value:"line",label:this.t("sparkline_bar.chart_line")}]}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}),e}};qn=e([he("eink-sparkline-bar-editor")],qn);var Vn=Object.freeze({__proto__:null,get EinkSparklineBarEditor(){return qn}});let Gn=class extends Pn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{domain:"calendar"}}},{name:"max_items",label:this.t("schedule_agenda.max_items"),selector:{number:{min:1,max:20,mode:"box"}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Gn=e([he("eink-schedule-agenda-editor")],Gn);var Kn=Object.freeze({__proto__:null,get EinkScheduleAgendaEditor(){return Gn}});let Zn=class extends Pn{getFormData(){if(!this._config)return{};const{entity:e,...t}=this._config;return{...t,entities:Array.isArray(this._config.entities)&&this._config.entities.length>0?this._config.entities:e?[e]:[],first_day_of_week:this._config.first_day_of_week||"monday",time_format:this._config.time_format||"auto",show_week_numbers:!1!==this._config.show_week_numbers,max_events:this._config.max_events||2}}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entities",label:this.t("month_calendar.entities"),selector:{entity:{domain:"calendar",multiple:!0}}},{name:"first_day_of_week",label:this.t("month_calendar.first_day_of_week"),selector:{select:{mode:"dropdown",options:[{value:"monday",label:this.t("month_calendar.monday")},{value:"sunday",label:this.t("month_calendar.sunday")}]}}},{name:"time_format",label:this.t("time.time_format"),selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Home Assistant)"},{value:"24h",label:"24h (14:30)"},{value:"12h",label:"12h (2:30 PM)"}]}}},{name:"show_week_numbers",label:this.t("month_calendar.show_week_numbers"),selector:{boolean:{}}},{name:"max_events",label:this.t("month_calendar.max_events"),selector:{number:{min:1,max:5,mode:"box"}}},{name:"timezone",label:this.t("time.timezone"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},{name:"tap_action",label:this.t("common.tap_action"),selector:{ui_action:{}}},{name:"double_tap_action",label:this.t("common.double_tap_action"),selector:{ui_action:{}}},{name:"hold_action",label:this.t("common.hold_action"),selector:{ui_action:{}}}]}};Zn=e([he("eink-month-calendar-editor")],Zn);var Yn=Object.freeze({__proto__:null,get EinkMonthCalendarEditor(){return Zn}});let Qn=class extends Pn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"time_format",label:this.t("time.time_format"),selector:{select:{options:[{value:"24h",label:"24h (14:30)"},{value:"12h",label:"12h (2:30 PM)"}]}}},{name:"show_date",label:this.t("time.show_date"),selector:{boolean:{}}},{name:"date_format",label:this.t("time.date_format"),selector:{select:{options:[{value:"long",label:this.t("time.date_long")},{value:"short",label:this.t("time.date_short")},{value:"combined",label:this.t("time.date_combined")}]}}},{name:"timezone",label:this.t("time.timezone"),selector:{text:{}}},{name:"entity_1",label:this.t("time.secondary_entity_1"),selector:{entity:{}}},{name:"entity_2",label:this.t("time.secondary_entity_2"),selector:{entity:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Qn=e([he("eink-time-editor")],Qn);var Xn=Object.freeze({__proto__:null,get EinkTimeEditor(){return Qn}});let ea=class extends Pn{getFormData(){return this._config?{...this._config,layout:this._config.layout||"horizontal",extra_attribute:this._config.extra_attribute||"humidity"}:{}}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{domain:"weather"}}},{name:"layout",label:this.t("forecast.layout"),selector:{select:{mode:"dropdown",options:[{value:"horizontal",label:this.t("forecast.layout_horizontal")},{value:"vertical",label:this.t("forecast.layout_vertical")}]}}},{name:"location",label:this.t("forecast.location"),selector:{text:{}}},{name:"days_to_show",label:this.t("forecast.days_to_show"),selector:{number:{min:2,max:7,mode:"box"}}},{name:"extra_attribute",label:this.t("forecast.extra_attribute"),selector:{select:{options:[{value:"none",label:this.t("forecast.extra_none")},{value:"humidity",label:this.t("forecast.extra_humidity")},{value:"pressure",label:this.t("forecast.extra_pressure")},{value:"wind_speed",label:this.t("forecast.extra_wind_speed")},{value:"precipitation",label:this.t("forecast.extra_precipitation")}]}}},{name:"extra_attribute_label",label:this.t("common.name"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},{name:"tap_action",label:this.t("common.tap_action"),selector:{ui_action:{}}},{name:"double_tap_action",label:this.t("common.double_tap_action"),selector:{ui_action:{}}},{name:"hold_action",label:this.t("common.hold_action"),selector:{ui_action:{}}}]}};ea=e([he("eink-forecast-editor")],ea);var ta=Object.freeze({__proto__:null,get EinkForecastEditor(){return ea}});
