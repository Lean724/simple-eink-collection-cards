function e(e,t,i,n){var a,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new o(i,e,n)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,p=globalThis,g=p.trustedTypes,f=g?g.emptyScript:"",y=p.reactiveElementPolyfillSupport,_=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&l(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const o=n?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),a=t.litNonce;void 0!==a&&n.setAttribute("nonce",a),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=n;const o=a.fromAttribute(t,e.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(e,t,i,n=!1,a){if(void 0!==e){const o=this.constructor;if(!1===n&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[_("elementProperties")]=new Map,k[_("finalized")]=new Map,y?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,E=x.trustedTypes,z=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+A,C=`<${M}>`,D=document,N=()=>D.createComment(""),j=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,O="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,L=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,U=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),J=U(1),R=U(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),V=new WeakMap,K=D.createTreeWalker(D,129);function Z(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,n=[];let a,o=2===t?"<svg>":3===t?"<math>":"",r=P;for(let t=0;t<i;t++){const i=e[t];let s,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===P?"!--"===c[1]?r=F:void 0!==c[1]?r=L:void 0!==c[2]?(W.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=I):void 0!==c[3]&&(r=I):r===I?">"===c[0]?(r=a??P,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,s=c[1],r=void 0===c[3]?I:'"'===c[3]?H:B):r===H||r===B?r=I:r===F||r===L?r=P:(r=I,a=void 0);const h=r===I&&e[t+1].startsWith("/>")?" ":"";o+=r===P?i+C:l>=0?(n.push(s),i.slice(0,l)+S+i.slice(l)+A+h):i+A+(-2===l?t:h)}return[Z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let a=0,o=0;const r=e.length-1,s=this.parts,[c,l]=Y(e,t);if(this.el=Q.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=K.nextNode())&&s.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(S)){const t=l[o++],i=n.getAttribute(e).split(A),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ne:"?"===r[1]?ae:"@"===r[1]?oe:ie}),n.removeAttribute(e)}else e.startsWith(A)&&(s.push({type:6,index:a}),n.removeAttribute(e));if(W.test(n.tagName)){const e=n.textContent.split(A),t=e.length-1;if(t>0){n.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],N()),K.nextNode(),s.push({type:2,index:++a});n.append(e[t],N())}}}else if(8===n.nodeType)if(n.data===M)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=n.data.indexOf(A,e+1));)s.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===q)return t;let a=void 0!==n?i._$Co?.[n]:i._$Cl;const o=j(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=a:i._$Cl=a),void 0!==a&&(t=X(e,a._$AS(e,t.values),a,n)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??D).importNode(t,!0);K.currentNode=n;let a=K.nextNode(),o=0,r=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new re(a,this,e)),this._$AV.push(t),s=i[++r]}o!==s?.index&&(a=K.nextNode(),o++)}return K.currentNode=D,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),j(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new ee(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Q(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const a of e)n===t.length?t.push(i=new te(this.O(N()),this.O(N()),this,this.options)):i=t[n],i._$AI(a),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,n){const a=this.strings;let o=!1;if(void 0===a)e=X(this,e,t,0),o=!j(e)||e!==this._$AH&&e!==q,o&&(this._$AH=e);else{const n=e;let r,s;for(e=a[0],r=0;r<a.length-1;r++)s=X(this,n[i+r],t,r),s===q&&(s=this._$AH[r]),o||=!j(s)||s!==this._$AH[r],s===G?e=G:e!==G&&(e+=(s??"")+a[r+1]),this._$AH[r]=s}o&&!n&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ne extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class oe extends ie{constructor(e,t,i,n,a){super(e,t,i,n,a),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??G)===q)return;const i=this._$AH,n=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=x.litHtmlPolyfillSupport;se?.(Q,te),(x.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class le extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let a=n._$litPart$;if(void 0===a){const e=i?.renderBefore??null;n._$litPart$=a=new te(t.insertBefore(N(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,ce.litElementHydrateSupport?.({LitElement:le});const de=ce.litElementPolyfillSupport;de?.({LitElement:le}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},me=(e=ue,t,i)=>{const{kind:n,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,a,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const a=this[n];t.call(this,i),this.requestUpdate(n,a,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pe(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return pe({...e,state:!0,attribute:!1})}const fe=r`
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
`;var ye={title:"Title",inverted:"Inverted (Black background, white text)",entity:"Entity",attribute:"Attribute (optional)",name:"Custom Name (optional)",unit:"Custom Unit (optional)",icon:"Custom Icon (optional)",value:"Value",condition:"Condition",optional:"Optional",none:"None",active:"Active",inactive:"Inactive",open:"Open",closed:"Closed",on:"ON",off:"OFF",loading:"Loading...",no_events:"No upcoming events",no_data:"No data available",not_configured:"Card not configured. Please select an entity."},_e={equals:"Equals",not_equals:"Not equals",above:"Above (>)",below:"Below (<)",on:"State is ON / True",off:"State is OFF / False"},be={name:"E-ink Hero Metric",description:"Large single metric display with high contrast and optional delta trend.",show_trend:"Show Trend / Delta",trend_value:"Trend Text (e.g. +1.2° or ▲ 5%)"},ve={name:"E-ink Grid Metrics",description:"2 to 4 related metrics in a strict solid grid.",columns:"Columns (2, 3 or 4)"},we={name:"E-ink Status List",description:"Binary or discrete states with high-contrast monochrome badges.",invert_when_active:"Invert badge when active (Black background, white text)"},ke={name:"E-ink Alert Banner",description:"High-contrast conditional alert block. Hidden when inactive.",message:"Alert message",message_placeholder:"Warning: critical condition detected!"},xe={name:"E-ink Sparkline Bar",description:"Crisp 12/24h historical trend bars or solid line with zero antialiasing blur.",hours_to_show:"Hours to display (e.g. 12, 24)",chart_type:"Chart Style",chart_bars:"Discrete Vertical Bars",chart_line:"Solid Line"},$e={name:"E-ink Schedule Agenda",description:"Compact chronological calendar events separated by solid 1px dividers.",max_items:"Maximum events to show",all_day:"All day"},Ee={name:"E-ink Clock & Date",description:"Minute-synchronized e-ink clock with zero-second ghosting and date formats.",time_format:"Time Format",show_date:"Show Date",date_format:"Date Style",date_short:"Short Date (DD/MM/YYYY)",date_long:"Long Date (Weekday + Day + Month)",date_combined:"Combined (Weekday, Short Date)",timezone:"Custom Timezone (e.g. America/New_York)",secondary_entity_1:"Secondary Entity 1",secondary_entity_2:"Secondary Entity 2"},ze={name:"E-ink Weather Forecast",description:"Weather status, temperature, extended forecast and extra metric slot.",days_to_show:"Days to show in forecast",extra_attribute:"Extra Metric",extra_humidity:"Humidity (%)",extra_pressure:"Atmospheric Pressure (hPa)",extra_wind_speed:"Wind Speed",extra_precipitation:"Precipitation Probability (%)"},Se={clear_night:"Clear",cloudy:"Cloudy",fog:"Foggy",hail:"Hail",lightning:"Thunderstorm",lightning_rainy:"Thunderstorms with rain",partlycloudy:"Partly cloudy",pouring:"Heavy rain",rainy:"Rain",snowy:"Snow",snowy_rainy:"Sleet",sunny:"Sunny",windy:"Windy",windy_variant:"Windy",exceptional:"Severe weather"},Ae={sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",sunday:"Sunday",monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday"},Me={jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec",january:"January",february:"February",march:"March",april:"April",may_long:"May",june:"June",july:"July",august:"August",september:"September",october:"October",november:"November",december:"December"},Ce={common:ye,conditions:_e,hero_metric:be,grid_metrics:ve,status_list:we,alert_banner:ke,sparkline_bar:xe,schedule_agenda:$e,time:Ee,forecast:ze,weather:Se,days:Ae,months:Me},De=Object.freeze({__proto__:null,alert_banner:ke,common:ye,conditions:_e,days:Ae,default:Ce,forecast:ze,grid_metrics:ve,hero_metric:be,months:Me,schedule_agenda:$e,sparkline_bar:xe,status_list:we,time:Ee,weather:Se}),Ne={title:"Título",inverted:"Invertido (Fondo negro, texto blanco)",entity:"Entidad",attribute:"Atributo (opcional)",name:"Nombre personalizado (opcional)",unit:"Unidad personalizada (opcional)",icon:"Ícono personalizado (opcional)",value:"Valor",condition:"Condición",optional:"Opcional",none:"Ninguno",active:"Activo",inactive:"Inactivo",open:"Abierto",closed:"Cerrado",on:"ON",off:"OFF",loading:"Cargando...",no_events:"Sin eventos próximos",no_data:"Sin datos disponibles",not_configured:"Tarjeta no configurada. Por favor selecciona una entidad."},je={equals:"Es igual a",not_equals:"No es igual a",above:"Mayor que (>)",below:"Menor que (<)",on:"Estado es ON / Activo",off:"Estado es OFF / Inactivo"},Te={name:"E-ink Métrica Protagonista",description:"Muestra un valor individual de gran escala con alto contraste y delta de tendencia opcional.",show_trend:"Mostrar tendencia / Delta",trend_value:"Texto de tendencia (ej. +1.2° o ▲ 5%)"},Oe={name:"E-ink Grilla de Métricas",description:"De 2 a 4 métricas relacionadas en una grilla estricta con divisores sólidos.",columns:"Columnas (2, 3 o 4)"},Pe={name:"E-ink Lista de Estados",description:"Estados binarios o discretos con badges monocromáticos de alto contraste.",invert_when_active:"Invertir badge al estar activo (Fondo negro, letra blanca)"},Fe={name:"E-ink Banner de Alerta",description:"Bloque de aviso crítico condicional. Oculto si la condición no se cumple.",message:"Mensaje de alerta",message_placeholder:"¡Advertencia: condición crítica detectada!"},Le={name:"E-ink Barra de Tendencia",description:"Historial de 12/24h en barras discretas o línea sólida sin difuminados grises.",hours_to_show:"Horas a mostrar (ej. 12, 24)",chart_type:"Estilo de gráfico",chart_bars:"Barras verticales discretas",chart_line:"Línea continua sólida"},Ie={name:"E-ink Agenda / Calendario",description:"Eventos cronológicos compactos separados por líneas sólidas de 1px.",max_items:"Máximo de eventos a mostrar",all_day:"Todo el día"},Be={name:"E-ink Reloj y Fecha",description:"Reloj sincronizado al minuto, sin parpadeo de segundos y formato de fecha.",time_format:"Formato de hora",show_date:"Mostrar fecha",date_format:"Estilo de fecha",date_short:"Fecha corta (DD/MM/AAAA)",date_long:"Fecha larga (Día de semana + Día + Mes)",date_combined:"Combinada (Día de semana, Fecha corta)",timezone:"Zona horaria personalizada (ej. America/Argentina/Buenos_Aires)",secondary_entity_1:"Entidad secundaria 1",secondary_entity_2:"Entidad secundaria 2"},He={name:"E-ink Clima y Pronóstico",description:"Estado del clima, temperatura, pronóstico extendido y slot de métrica extra.",days_to_show:"Días a mostrar en pronóstico",extra_attribute:"Métrica adicional",extra_humidity:"Humedad (%)",extra_pressure:"Presión atmosférica (hPa)",extra_wind_speed:"Velocidad del viento",extra_precipitation:"Probabilidad de precipitación (%)"},We={clear_night:"Despejado",cloudy:"Nublado",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica",lightning_rainy:"Tormenta con lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia torrencial",rainy:"Lluvia",snowy:"Nieve",snowy_rainy:"Aguanieve",sunny:"Soleado",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Clima severo"},Ue={sun:"Dom",mon:"Lun",tue:"Mar",wed:"Mié",thu:"Jue",fri:"Vie",sat:"Sáb",sunday:"Domingo",monday:"Lunes",tuesday:"Martes",wednesday:"Miércoles",thursday:"Jueves",friday:"Viernes",saturday:"Sábado"},Je={jan:"Ene",feb:"Feb",mar:"Mar",apr:"Abr",may:"May",jun:"Jun",jul:"Jul",aug:"Ago",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dic",january:"Enero",february:"Febrero",march:"Marzo",april:"Abril",may_long:"Mayo",june:"Junio",july:"Julio",august:"Agosto",september:"Septiembre",october:"Octubre",november:"Noviembre",december:"Diciembre"},Re={common:Ne,conditions:je,hero_metric:Te,grid_metrics:Oe,status_list:Pe,alert_banner:Fe,sparkline_bar:Le,schedule_agenda:Ie,time:Be,forecast:He,weather:We,days:Ue,months:Je},qe=Object.freeze({__proto__:null,alert_banner:Fe,common:Ne,conditions:je,days:Ue,default:Re,forecast:He,grid_metrics:Oe,hero_metric:Te,months:Je,schedule_agenda:Ie,sparkline_bar:Le,status_list:Pe,time:Be,weather:We}),Ge={title:"标题",inverted:"反色显示（黑底白字）",entity:"实体",attribute:"属性（可选）",name:"自定义名称（可选）",unit:"自定义单位（可选）",icon:"自定义图标（可选）",value:"数值",condition:"条件",optional:"可选",none:"无",active:"激活",inactive:"未激活",open:"开启",closed:"关闭",on:"开",off:"关",loading:"加载中...",no_events:"近期无日程",no_data:"暂无数据",not_configured:"卡片未配置，请选择实体。"},Ve={equals:"等于",not_equals:"不等于",above:"大于 (>)",below:"小于 (<)",on:"状态为 开 / 开启",off:"状态为 关 / 关闭"},Ke={name:"E-ink 核心指标卡片",description:"超大字体高对比度显示单项核心指标，可选趋势增量显示。",show_trend:"显示趋势 / 增量",trend_value:"趋势文本（例如 +1.2° 或 ▲ 5%）"},Ze={name:"E-ink 网格指标卡片",description:"以严谨的实体网格对比 2 到 4 项相关指标。",columns:"列数 (2, 3 或 4)"},Ye={name:"E-ink 状态列表卡片",description:"以高对比度单色徽章显示二元或离散设备状态。",invert_when_active:"激活时反色徽章（黑底白字）"},Qe={name:"E-ink 告警横幅卡片",description:"高对比度条件报警块，无报警时自动隐藏。",message:"告警内容",message_placeholder:"警告：检测到异常或紧急状态！"},Xe={name:"E-ink 迷你走势卡片",description:"清晰的 12/24 小时历史趋势柱状图或实线，无模糊抗锯齿。",hours_to_show:"显示小时数（如 12, 24）",chart_type:"图表样式",chart_bars:"离散垂直柱状图",chart_line:"实线走势图"},et={name:"E-ink 日程安排卡片",description:"紧凑的时间顺序日程列表，以 1px 实线分割。",max_items:"最多显示事件数",all_day:"全天"},tt={name:"E-ink 时钟与日期卡片",description:"分钟级精准同步电子墨水时钟，无秒针刷新残影。",time_format:"时间格式",show_date:"显示日期",date_format:"日期样式",date_short:"简短日期 (年/月/日)",date_long:"完整日期 (星期 + 月 + 日)",date_combined:"组合模式 (星期 + 简短日期)",timezone:"自定义时区 (如 Asia/Shanghai)",secondary_entity_1:"次要实体 1",secondary_entity_2:"次要实体 2"},it={name:"E-ink 天气预报卡片",description:"天气状态、气温、未来多日预报及额外指标槽位。",days_to_show:"预报天数",extra_attribute:"额外指标",extra_humidity:"湿度 (%)",extra_pressure:"气压 (hPa)",extra_wind_speed:"风速",extra_precipitation:"降水概率 (%)"},nt={clear_night:"晴朗夜晚",cloudy:"阴天",fog:"雾",hail:"冰雹",lightning:"雷阵雨",lightning_rainy:"雷阵雨伴降水",partlycloudy:"多云",pouring:"大雨",rainy:"小雨",snowy:"下雪",snowy_rainy:"雨夹雪",sunny:"晴天",windy:"有风",windy_variant:"大风",exceptional:"恶劣天气"},at={sun:"周日",mon:"周一",tue:"周二",wed:"周三",thu:"周四",fri:"周五",sat:"周六",sunday:"星期日",monday:"星期一",tuesday:"星期二",wednesday:"星期三",thursday:"星期四",friday:"星期五",saturday:"星期六"},ot={jan:"1月",feb:"2月",mar:"3月",apr:"4月",may:"5月",jun:"6月",jul:"7月",aug:"8月",sep:"9月",oct:"10月",nov:"11月",dec:"12月",january:"一月",february:"二月",march:"三月",april:"四月",may_long:"五月",june:"六月",july:"七月",august:"八月",september:"九月",october:"十月",november:"十一月",december:"十二月"},rt={common:Ge,conditions:Ve,hero_metric:Ke,grid_metrics:Ze,status_list:Ye,alert_banner:Qe,sparkline_bar:Xe,schedule_agenda:et,time:tt,forecast:it,weather:nt,days:at,months:ot},st=Object.freeze({__proto__:null,alert_banner:Qe,common:Ge,conditions:Ve,days:at,default:rt,forecast:it,grid_metrics:Ze,hero_metric:Ke,months:ot,schedule_agenda:et,sparkline_bar:Xe,status_list:Ye,time:tt,weather:nt}),ct={title:"Titel",inverted:"Invertiert (Schwarzer Hintergrund, weiße Schrift)",entity:"Entität",attribute:"Attribut (optional)",name:"Benutzerdefinierter Name (optional)",unit:"Benutzerdefinierte Einheit (optional)",icon:"Benutzerdefiniertes Symbol (optional)",value:"Wert",condition:"Bedingung",optional:"Optional",none:"Keine",active:"Aktiv",inactive:"Inaktiv",open:"Offen",closed:"Geschlossen",on:"AN",off:"AUS",loading:"Wird geladen...",no_events:"Keine anstehenden Ereignisse",no_data:"Keine Daten verfügbar",not_configured:"Karte nicht konfiguriert. Bitte eine Entität auswählen."},lt={equals:"Ist gleich",not_equals:"Ist nicht gleich",above:"Größer als (>)",below:"Kleiner als (<)",on:"Status ist AN / Aktiv",off:"Status ist AUS / Inaktiv"},dt={name:"E-ink Hauptmetrik",description:"Große Einzelwertanzeige mit starkem Kontrast und optionaler Trendanzeige.",show_trend:"Trend / Delta anzeigen",trend_value:"Trendtext (z. B. +1.2° oder ▲ 5%)"},ht={name:"E-ink Metriken-Raster",description:"2 bis 4 zusammenhängende Metriken in einem festen Raster mit durchgezogenen Linien.",columns:"Spalten (2, 3 oder 4)"},ut={name:"E-ink Statusliste",description:"Diskrete oder binäre Zustände mit kontrastreichen Monochrom-Badges.",invert_when_active:"Badge bei Aktivität invertieren (Schwarzer Hintergrund, weiße Schrift)"},mt={name:"E-ink Alarm-Banner",description:"Kontrastreicher konditionaler Alarmblock. Ausgeblendet, wenn inaktiv.",message:"Alarmmeldung",message_placeholder:"Warnung: Kritischer Zustand erkannt!"},pt={name:"E-ink Trendbalken",description:"Präzise 12/24-Stunden-Historie als Balken oder durchgezogene Linie ohne Kantenglättung.",hours_to_show:"Anzuzeigende Stunden (z. B. 12, 24)",chart_type:"Diagrammstil",chart_bars:"Diskrete vertikale Balken",chart_line:"Durchgezogene Linie"},gt={name:"E-ink Terminübersicht",description:"Kompakte chronologische Terminliste, getrennt durch 1px-Linien.",max_items:"Maximale Anzahl an Terminen",all_day:"Ganztägig"},ft={name:"E-ink Uhrzeit & Datum",description:"Minutengenau synchronisierte E-Ink-Uhr ohne Sekundenflackern.",time_format:"Zeitformat",show_date:"Datum anzeigen",date_format:"Datumsstil",date_short:"Kurzes Datum (TT.MM.JJJJ)",date_long:"Langes Datum (Wochentag + Tag + Monat)",date_combined:"Kombiniert (Wochentag, kurzes Datum)",timezone:"Benutzerdefinierte Zeitzone (z. B. Europe/Berlin)",secondary_entity_1:"Sekundäre Entität 1",secondary_entity_2:"Sekundäre Entität 2"},yt={name:"E-ink Wetterbericht",description:"Wetterlage, Temperatur, Mehrtages-Vorhersage und konfigurierbares Zusatzfeld.",days_to_show:"Vorhersagetage",extra_attribute:"Zusatzmetrik",extra_humidity:"Luftfeuchtigkeit (%)",extra_pressure:"Luftdruck (hPa)",extra_wind_speed:"Windgeschwindigkeit",extra_precipitation:"Niederschlagswahrscheinlichkeit (%)"},_t={clear_night:"Klar",cloudy:"Bewölkt",fog:"Nebel",hail:"Hagel",lightning:"Gewitter",lightning_rainy:"Gewitter mit Regen",partlycloudy:"Teilweise bewölkt",pouring:"Starker Regen",rainy:"Regen",snowy:"Schnee",snowy_rainy:"Schneeregen",sunny:"Sonnig",windy:"Windig",windy_variant:"Windig",exceptional:"Unwetter"},bt={sun:"So",mon:"Mo",tue:"Di",wed:"Mi",thu:"Do",fri:"Fr",sat:"Sa",sunday:"Sonntag",monday:"Montag",tuesday:"Dienstag",wednesday:"Mittwoch",thursday:"Donnerstag",friday:"Freitag",saturday:"Samstag"},vt={jan:"Jan",feb:"Feb",mar:"Mär",apr:"Apr",may:"Mai",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Okt",nov:"Nov",dec:"Dez",january:"Januar",february:"Februar",march:"März",april:"April",may_long:"Mai",june:"Juni",july:"Juli",august:"August",september:"September",october:"Oktober",november:"November",december:"Dezember"},wt={common:ct,conditions:lt,hero_metric:dt,grid_metrics:ht,status_list:ut,alert_banner:mt,sparkline_bar:pt,schedule_agenda:gt,time:ft,forecast:yt,weather:_t,days:bt,months:vt},kt=Object.freeze({__proto__:null,alert_banner:mt,common:ct,conditions:lt,days:bt,default:wt,forecast:yt,grid_metrics:ht,hero_metric:dt,months:vt,schedule_agenda:gt,sparkline_bar:pt,status_list:ut,time:ft,weather:_t}),xt={title:"Titolo",inverted:"Invertito (Sfondo nero, testo bianco)",entity:"Entità",attribute:"Attributo (opzionale)",name:"Nome personalizzato (opzionale)",unit:"Unità personalizzata (opzionale)",icon:"Icona personalizzata (opzionale)",value:"Valore",condition:"Condizione",optional:"Opzionale",none:"Nessuno",active:"Attivo",inactive:"Inattivo",open:"Aperto",closed:"Chiuso",on:"ON",off:"OFF",loading:"Caricamento in corso...",no_events:"Nessun evento in programma",no_data:"Nessun dato disponibile",not_configured:"Scheda non configurata. Seleziona un'entità."},$t={equals:"È uguale a",not_equals:"Non è uguale a",above:"Maggiore di (>)",below:"Minore di (<)",on:"Stato è ON / Attivo",off:"Stato è OFF / Inattivo"},Et={name:"E-ink Metrica Principale",description:"Visualizzazione ad alto contrasto di un valore singolo con indicatore di tendenza opzionale.",show_trend:"Mostra tendenza / Variazione",trend_value:"Testo tendenza (es. +1.2° o ▲ 5%)"},zt={name:"E-ink Griglia di Metriche",description:"Da 2 a 4 metriche correlate in una griglia rigida con divisori continui.",columns:"Colonne (2, 3 o 4)"},St={name:"E-ink Lista di Stati",description:"Stati binari o discreti con badge monocromatici ad alto contrasto.",invert_when_active:"Inverti badge se attivo (Sfondo nero, testo bianco)"},At={name:"E-ink Banner di Allerta",description:"Blocco di notifica condizionale. Nascosto se la condizione non è attiva.",message:"Messaggio di allerta",message_placeholder:"Attenzione: rilevata condizione critica!"},Mt={name:"E-ink Grafico di Tendenza",description:"Cronologia a barre o a linea continua di 12/24 ore senza antialiasing sfocato.",hours_to_show:"Ore da visualizzare (es. 12, 24)",chart_type:"Stile grafico",chart_bars:"Barre verticali discrete",chart_line:"Linea continua solida"},Ct={name:"E-ink Agenda / Eventi",description:"Eventi cronologici compatti separati da linee continue di 1px.",max_items:"Numero massimo di eventi",all_day:"Tutto il giorno"},Dt={name:"E-ink Orologio e Data",description:"Orologio e-ink sincronizzato al minuto, senza sfarfallio dei secondi.",time_format:"Formato orario",show_date:"Mostra data",date_format:"Stile data",date_short:"Data breve (GG/MM/AAAA)",date_long:"Data estesa (Giorno della settimana + Giorno + Mese)",date_combined:"Combinata (Giorno settimana, Data breve)",timezone:"Fuso orario personalizzato (es. Europe/Rome)",secondary_entity_1:"Entità secondaria 1",secondary_entity_2:"Entità secondaria 2"},Nt={name:"E-ink Previsioni Meteo",description:"Meteo attuale, temperatura, previsioni estese e slot per metrica extra.",days_to_show:"Giorni di previsione",extra_attribute:"Metrica aggiuntiva",extra_humidity:"Umidità (%)",extra_pressure:"Pressione atmosferica (hPa)",extra_wind_speed:"Velocità del vento",extra_precipitation:"Probabilità di precipitazioni (%)"},jt={clear_night:"Sereno",cloudy:"Nuvoloso",fog:"Nebbia",hail:"Grandine",lightning:"Temporale",lightning_rainy:"Temporale con pioggia",partlycloudy:"Parzialmente nuvoloso",pouring:"Pioggia battente",rainy:"Pioggia",snowy:"Neve",snowy_rainy:"Nevischio",sunny:"Soleggiato",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Condizioni estreme"},Tt={sun:"Dom",mon:"Lun",tue:"Mar",wed:"Mer",thu:"Gio",fri:"Ven",sat:"Sab",sunday:"Domenica",monday:"Lunedì",tuesday:"Martedì",wednesday:"Mercoledì",thursday:"Giovedì",friday:"Venerdì",saturday:"Sabato"},Ot={jan:"Gen",feb:"Feb",mar:"Mar",apr:"Apr",may:"Mag",jun:"Giu",jul:"Lug",aug:"Ago",sep:"Set",oct:"Ott",nov:"Nov",dec:"Dic",january:"Gennaio",february:"Febbraio",march:"Marzo",april:"Aprile",may_long:"Maggio",june:"Giugno",july:"Luglio",august:"Agosto",september:"Settembre",october:"Ottobre",november:"Novembre",december:"Dicembre"},Pt={common:xt,conditions:$t,hero_metric:Et,grid_metrics:zt,status_list:St,alert_banner:At,sparkline_bar:Mt,schedule_agenda:Ct,time:Dt,forecast:Nt,weather:jt,days:Tt,months:Ot},Ft=Object.freeze({__proto__:null,alert_banner:At,common:xt,conditions:$t,days:Tt,default:Pt,forecast:Nt,grid_metrics:zt,hero_metric:Et,months:Ot,schedule_agenda:Ct,sparkline_bar:Mt,status_list:St,time:Dt,weather:jt}),Lt={title:"Titre",inverted:"Inversé (Fond noir, texte blanc)",entity:"Entité",attribute:"Attribut (optionnel)",name:"Nom personnalisé (optionnel)",unit:"Unité personnalisée (optionnel)",icon:"Icône personnalisée (optionnel)",value:"Valeur",condition:"Condition",optional:"Optionnel",none:"Aucun",active:"Actif",inactive:"Inactif",open:"Ouvert",closed:"Fermé",on:"ON",off:"OFF",loading:"Chargement...",no_events:"Aucun événement à venir",no_data:"Aucune donnée disponible",not_configured:"Carte non configurée. Veuillez sélectionner une entité."},It={equals:"Est égal à",not_equals:"N'est pas égal à",above:"Supérieur à (>)",below:"Inférieur à (<)",on:"L'état est ON / Actif",off:"L'état est OFF / Inactif"},Bt={name:"E-ink Métrique Principale",description:"Affichage individuel grand format à fort contraste avec tendance optionnelle.",show_trend:"Afficher la tendance / Delta",trend_value:"Texte de tendance (ex. +1.2° ou ▲ 5%)"},Ht={name:"E-ink Grille de Métriques",description:"2 à 4 métriques reliées dans une grille stricte avec séparateurs nets.",columns:"Colonnes (2, 3 ou 4)"},Wt={name:"E-ink Liste d'États",description:"États binaires ou discrets avec badges monochromes à fort contraste.",invert_when_active:"Inverser le badge lorsqu'il est actif (Fond noir, texte blanc)"},Ut={name:"E-ink Bannière d'Alerte",description:"Bloc d'alerte conditionnel à fort contraste. Masqué si inactif.",message:"Message d'alerte",message_placeholder:"Avertissement : condition critique détectée !"},Jt={name:"E-ink Barre de Tendance",description:"Historique 12/24h net sous forme de barres ou de ligne continue sans flou.",hours_to_show:"Heures à afficher (ex. 12, 24)",chart_type:"Style de graphique",chart_bars:"Barres verticales discrètes",chart_line:"Ligne continue solide"},Rt={name:"E-ink Agenda / Événements",description:"Liste chronologique compacte séparée par des lignes solides de 1px.",max_items:"Nombre maximum d'événements",all_day:"Journée"},qt={name:"E-ink Horloge et Date",description:"Horloge e-ink synchronisée à la minute sans clignotement des secondes.",time_format:"Format de l'heure",show_date:"Afficher la date",date_format:"Style de date",date_short:"Date courte (JJ/MM/AAAA)",date_long:"Date complète (Jour + Quantième + Mois)",date_combined:"Combinée (Jour, Date courte)",timezone:"Fuseau horaire personnalisé (ex. Europe/Paris)",secondary_entity_1:"Entité secondaire 1",secondary_entity_2:"Entité secondaire 2"},Gt={name:"E-ink Météo et Prévisions",description:"État météo, température, prévisions étendues et attribut supplémentaire.",days_to_show:"Jours de prévision",extra_attribute:"Métrique supplémentaire",extra_humidity:"Humidité (%)",extra_pressure:"Pression atmosphérique (hPa)",extra_wind_speed:"Vitesse du vent",extra_precipitation:"Probabilité de précipitations (%)"},Vt={clear_night:"Dégagé",cloudy:"Nuageux",fog:"Brouillard",hail:"Grêle",lightning:"Orage",lightning_rainy:"Orage avec pluie",partlycloudy:"Éclaircies",pouring:"Pluie battante",rainy:"Pluvieux",snowy:"Neige",snowy_rainy:"Neige fondue",sunny:"Ensoleillé",windy:"Venteux",windy_variant:"Venteux",exceptional:"Intempéries sévères"},Kt={sun:"Dim",mon:"Lun",tue:"Mar",wed:"Mer",thu:"Jeu",fri:"Ven",sat:"Sam",sunday:"Dimanche",monday:"Lundi",tuesday:"Mardi",wednesday:"Mercredi",thursday:"Jeudi",friday:"Vendredi",saturday:"Samedi"},Zt={jan:"Janv",feb:"Févr",mar:"Mars",apr:"Avr",may:"Mai",jun:"Juin",jul:"Juil",aug:"Août",sep:"Sept",oct:"Oct",nov:"Nov",dec:"Déc",january:"Janvier",february:"Février",march:"Mars",april:"Avril",may_long:"Mai",june:"Juin",july:"Juillet",august:"Août",september:"Septembre",october:"Octobre",november:"Novembre",december:"Décembre"},Yt={common:Lt,conditions:It,hero_metric:Bt,grid_metrics:Ht,status_list:Wt,alert_banner:Ut,sparkline_bar:Jt,schedule_agenda:Rt,time:qt,forecast:Gt,weather:Vt,days:Kt,months:Zt},Qt=Object.freeze({__proto__:null,alert_banner:Ut,common:Lt,conditions:It,days:Kt,default:Yt,forecast:Gt,grid_metrics:Ht,hero_metric:Bt,months:Zt,schedule_agenda:Rt,sparkline_bar:Jt,status_list:Wt,time:qt,weather:Vt}),Xt={title:"Título",inverted:"Invertido (Fundo preto, texto branco)",entity:"Entidade",attribute:"Atributo (opcional)",name:"Nome personalizado (opcional)",unit:"Unidade personalizada (opcional)",icon:"Ícone personalizado (opcional)",value:"Valor",condition:"Condição",optional:"Opcional",none:"Nenhum",active:"Ativo",inactive:"Inativo",open:"Aberto",closed:"Fechado",on:"ON",off:"OFF",loading:"A carregar...",no_events:"Sem eventos próximos",no_data:"Sem dados disponíveis",not_configured:"Cartão não configurado. Por favor selecione uma entidade."},ei={equals:"É igual a",not_equals:"Não é igual a",above:"Maior que (>)",below:"Menor que (<)",on:"Estado é ON / Ativo",off:"Estado é OFF / Inativo"},ti={name:"E-ink Métrica Principal",description:"Exibição de alto contraste de um valor individual com delta de tendência opcional.",show_trend:"Mostrar tendência / Delta",trend_value:"Texto de tendência (ex: +1.2° ou ▲ 5%)"},ii={name:"E-ink Grelha de Métricas",description:"2 a 4 métricas relacionadas numa grelha rígida com divisores sólidos.",columns:"Colunas (2, 3 ou 4)"},ni={name:"E-ink Lista de Estados",description:"Estados binários ou discretos com badges monocromáticos de alto contraste.",invert_when_active:"Inverter badge quando ativo (Fundo preto, texto branco)"},ai={name:"E-ink Banner de Alerta",description:"Bloco de aviso crítico condicional. Oculto quando inativo.",message:"Mensagem de alerta",message_placeholder:"Aviso: condição crítica detetada!"},oi={name:"E-ink Barra de Tendência",description:"Histórico de 12/24h em barras discretas ou linha sólida sem antialiasing suave.",hours_to_show:"Horas a apresentar (ex: 12, 24)",chart_type:"Estilo de gráfico",chart_bars:"Barras verticais discretas",chart_line:"Linha contínua sólida"},ri={name:"E-ink Agenda / Calendário",description:"Eventos cronológicos compactos separados por linhas sólidas de 1px.",max_items:"Máximo de eventos a apresentar",all_day:"Dia todo"},si={name:"E-ink Relógio e Data",description:"Relógio e-ink sincronizado ao minuto sem cintilação de segundos.",time_format:"Formato de hora",show_date:"Mostrar data",date_format:"Estilo de data",date_short:"Data curta (DD/MM/AAAA)",date_long:"Data longa (Dia da semana + Dia + Mês)",date_combined:"Combinada (Dia da semana, Data curta)",timezone:"Fuso horário personalizado (ex: Europe/Lisbon)",secondary_entity_1:"Entidade secundária 1",secondary_entity_2:"Entidade secundária 2"},ci={name:"E-ink Meteorologia e Previsão",description:"Estado do tempo, temperatura, previsão alargada e atributo adicional.",days_to_show:"Dias de previsão",extra_attribute:"Métrica adicional",extra_humidity:"Humidade (%)",extra_pressure:"Pressão atmosférica (hPa)",extra_wind_speed:"Velocidade do vento",extra_precipitation:"Probabilidade de precipitação (%)"},li={clear_night:"Limpo",cloudy:"Nublado",fog:"Nevoeiro",hail:"Granizo",lightning:"Trovoada",lightning_rainy:"Trovoada com chuva",partlycloudy:"Parcialmente nublado",pouring:"Chuva torrencial",rainy:"Chuva",snowy:"Neve",snowy_rainy:"Água-neve",sunny:"Ensolarado",windy:"Ventoso",windy_variant:"Ventoso",exceptional:"Tempo severo"},di={sun:"Dom",mon:"Seg",tue:"Ter",wed:"Qua",thu:"Qui",fri:"Sex",sat:"Sáb",sunday:"Domingo",monday:"Segunda-feira",tuesday:"Terça-feira",wednesday:"Quarta-feira",thursday:"Quinta-feira",friday:"Sexta-feira",saturday:"Sábado"},hi={jan:"Jan",feb:"Fev",mar:"Mar",apr:"Abr",may:"Mai",jun:"Jun",jul:"Jul",aug:"Ago",sep:"Set",oct:"Out",nov:"Nov",dec:"Dez",january:"Janeiro",february:"Fevereiro",march:"Março",april:"Abril",may_long:"Maio",june:"Junho",july:"Julho",august:"Agosto",september:"Setembro",october:"Outubro",november:"Novembro",december:"Dezembro"},ui={common:Xt,conditions:ei,hero_metric:ti,grid_metrics:ii,status_list:ni,alert_banner:ai,sparkline_bar:oi,schedule_agenda:ri,time:si,forecast:ci,weather:li,days:di,months:hi},mi=Object.freeze({__proto__:null,alert_banner:ai,common:Xt,conditions:ei,days:di,default:ui,forecast:ci,grid_metrics:ii,hero_metric:ti,months:hi,schedule_agenda:ri,sparkline_bar:oi,status_list:ni,time:si,weather:li}),pi={title:"Заголовок",inverted:"Инвертировать (Черный фон, белый текст)",entity:"Объект",attribute:"Атрибут (необязательно)",name:"Свое имя (необязательно)",unit:"Своя единица (необязательно)",icon:"Своя иконка (необязательно)",value:"Значение",condition:"Условие",optional:"Необязательно",none:"Нет",active:"Активен",inactive:"Неактивен",open:"Открыто",closed:"Закрыто",on:"ВКЛ",off:"ВЫКЛ",loading:"Загрузка...",no_events:"Нет предстоящих событий",no_data:"Нет данных",not_configured:"Карточка не настроена. Пожалуйста, выберите объект."},gi={equals:"Равно",not_equals:"Не равно",above:"Больше (>)",below:"Меньше (<)",on:"Состояние ВКЛ / Активно",off:"Состояние ВЫКЛ / Неактивно"},fi={name:"E-ink Главная метрика",description:"Крупный высококонтрастный показатель с опциональной индикацией тренда.",show_trend:"Показывать тренд / Дельту",trend_value:"Текст тренда (напр. +1.2° или ▲ 5%)"},yi={name:"E-ink Сетка метрик",description:"От 2 до 4 связанных показателей в строгой сетке со сплошными линиями.",columns:"Колонки (2, 3 или 4)"},_i={name:"E-ink Список состояний",description:"Бинарные или дискретные состояния с четкими монохромными значками.",invert_when_active:"Инвертировать при активности (Черный фон, белый текст)"},bi={name:"E-ink Баннер оповещения",description:"Контрастный блок критического предупреждения. Скрыт, если неактивен.",message:"Текст предупреждения",message_placeholder:"Внимание: обнаружено критическое состояние!"},vi={name:"E-ink График тренда",description:"Четкий 12/24-часовой график столбцами или сплошной линией без размытия.",hours_to_show:"Период в часах (напр. 12, 24)",chart_type:"Тип графика",chart_bars:"Дискретные вертикальные столбцы",chart_line:"Сплошная линия"},wi={name:"E-ink Календарь и события",description:"Компактный список событий, разделенный сплошными линиями 1px.",max_items:"Максимум событий",all_day:"Весь день"},ki={name:"E-ink Часы и дата",description:"Электронные часы с минутной синхронизацией без мерцания секунд.",time_format:"Формат времени",show_date:"Показывать дату",date_format:"Стиль даты",date_short:"Короткая дата (ДД/ММ/ГГГГ)",date_long:"Полная дата (День недели + Число + Месяц)",date_combined:"Комбинированная (День недели, короткая дата)",timezone:"Пользовательский часовой пояс (напр. Europe/Moscow)",secondary_entity_1:"Дополнительный объект 1",secondary_entity_2:"Дополнительный объект 2"},xi={name:"E-ink Прогноз погоды",description:"Погода, температура, расширенный прогноз и настраиваемый слот метрики.",days_to_show:"Дней прогноза",extra_attribute:"Дополнительная метрика",extra_humidity:"Влажность (%)",extra_pressure:"Давление (гПа)",extra_wind_speed:"Скорость ветра",extra_precipitation:"Вероятность осадков (%)"},$i={clear_night:"Ясно",cloudy:"Пасмурно",fog:"Туман",hail:"Град",lightning:"Гроза",lightning_rainy:"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег",snowy_rainy:"Мокрый снег",sunny:"Солнечно",windy:"Ветрено",windy_variant:"Ветрено",exceptional:"Опасные явления"},Ei={sun:"Вс",mon:"Пн",tue:"Вт",wed:"Ср",thu:"Чт",fri:"Пт",sat:"Сб",sunday:"Воскресенье",monday:"Понедельник",tuesday:"Вторник",wednesday:"Среда",thursday:"Четверг",friday:"Пятница",saturday:"Суббота"},zi={jan:"Янв",feb:"Фев",mar:"Мар",apr:"Апр",may:"Май",jun:"Июн",jul:"Июл",aug:"Авг",sep:"Сен",oct:"Окт",nov:"Ноя",dec:"Дек",january:"Январь",february:"Февраль",march:"Март",april:"Апрель",may_long:"Май",june:"Июнь",july:"Июль",august:"Август",september:"Сентябрь",october:"Октябрь",november:"Ноябрь",december:"Декабрь"},Si={common:pi,conditions:gi,hero_metric:fi,grid_metrics:yi,status_list:_i,alert_banner:bi,sparkline_bar:vi,schedule_agenda:wi,time:ki,forecast:xi,weather:$i,days:Ei,months:zi},Ai={title:"Tytuł",inverted:"Odwrócony (Czarne tło, biały tekst)",entity:"Encja",attribute:"Atrybut (opcjonalnie)",name:"Własna nazwa (opcjonalnie)",unit:"Własna jednostka (opcjonalnie)",icon:"Własna ikona (opcjonalnie)",value:"Wartość",condition:"Warunek",optional:"Opcjonalnie",none:"Brak",active:"Aktywny",inactive:"Nieaktywny",open:"Otwarte",closed:"Zamknięte",on:"WŁ",off:"WYŁ",loading:"Ładowanie...",no_events:"Brak nadchodzących wydarzeń",no_data:"Brak dostępnych danych",not_configured:"Karta nieskonfigurowana. Wybierz encję."},Mi={equals:"Równe",not_equals:"Różne od",above:"Powyżej (>)",below:"Poniżej (<)",on:"Stan to WŁ / Prawda",off:"Stan to WYŁ / Fałsz"},Ci={name:"E-ink Główny wskaźnik",description:"Pojedynczy duży wskaźnik o wysokim kontraście z opcjonalnym trendem.",show_trend:"Pokaż trend / zmianę",trend_value:"Tekst trendu (np. +1.2° lub ▲ 5%)"},Di={name:"E-ink Siatka wskaźników",description:"Od 2 do 4 powiązanych wskaźników w zwartej siatce z ciągłymi liniami.",columns:"Kolumny (2, 3 lub 4)"},Ni={name:"E-ink Lista stanów",description:"Stany binarne lub dyskretne z kontrastowymi monochromatycznymi plakietkami.",invert_when_active:"Odwróć plakietkę gdy aktywna (Czarne tło, biały tekst)"},ji={name:"E-ink Baner alertu",description:"Wysokokontrastowy warunkowy blok ostrzegawczy. Ukryty gdy nieaktywny.",message:"Treść ostrzeżenia",message_placeholder:"Ostrzeżenie: wykryto stan krytyczny!"},Ti={name:"E-ink Wykres słupkowy Sparkline",description:"Wyraźne słupki trendu 12/24h lub ciągła linia bez rozmycia antyaliasingu.",hours_to_show:"Liczba godzin do wyświetlenia (np. 12, 24)",chart_type:"Styl wykresu",chart_bars:"Dyskretne słupki pionowe",chart_line:"Ciągła linia"},Oi={name:"E-ink Kalendarz / Terminarz",description:"Kompaktowe wydarzenia w porządku chronologicznym oddzielone liniami 1px.",max_items:"Maksymalna liczba wydarzeń",all_day:"Cały dzień"},Pi={name:"E-ink Zegar i data",description:"Zegar e-ink zsynchronizowany z minutą, bez smużenia sekund i z formatami daty.",time_format:"Format czasu",show_date:"Pokaż datę",date_format:"Styl daty",date_short:"Krótka data (DD/MM/RRRR)",date_long:"Długa data (Dzień tygodnia + Dzień + Miesiąc)",date_combined:"Łączona (Dzień tygodnia, Krótka data)",timezone:"Własna strefa czasowa (np. Europe/Warsaw)",secondary_entity_1:"Encja pomocnicza 1",secondary_entity_2:"Encja pomocnicza 2"},Fi={name:"E-ink Prognoza pogody",description:"Stan pogody, temperatura, rozszerzona prognoza i dodatkowy wskaźnik.",days_to_show:"Liczba dni w prognozie",extra_attribute:"Dodatkowy wskaźnik",extra_humidity:"Wilgotność (%)",extra_pressure:"Ciśnienie atmosferyczne (hPa)",extra_wind_speed:"Prędkość wiatru",extra_precipitation:"Prawdopodobieństwo opadów (%)"},Li={clear_night:"Bezchmurnie",cloudy:"Pochmurno",fog:"Mgła",hail:"Grad",lightning:"Burza",lightning_rainy:"Burza z deszczem",partlycloudy:"Częściowe zachmurzenie",pouring:"Ulewa",rainy:"Deszcz",snowy:"Śnieg",snowy_rainy:"Deszcz ze śniegiem",sunny:"Słonecznie",windy:"Wietrznie",windy_variant:"Wietrznie",exceptional:"Zjawiska ekstremalne"},Ii={sun:"Nie",mon:"Pon",tue:"Wt",wed:"Śr",thu:"Czw",fri:"Pt",sat:"Sob",sunday:"Niedziela",monday:"Poniedziałek",tuesday:"Wtorek",wednesday:"Środa",thursday:"Czwartek",friday:"Piątek",saturday:"Sobota"},Bi={jan:"Sty",feb:"Lut",mar:"Mar",apr:"Kwi",may:"Maj",jun:"Cze",jul:"Lip",aug:"Sie",sep:"Wrz",oct:"Paź",nov:"Lis",dec:"Gru",january:"Styczeń",february:"Luty",march:"Marzec",april:"Kwiecień",may_long:"Maj",june:"Czerwiec",july:"Lipiec",august:"Sierpień",september:"Wrzesień",october:"Październik",november:"Listopad",december:"Grudzień"},Hi={common:Ai,conditions:Mi,hero_metric:Ci,grid_metrics:Di,status_list:Ni,alert_banner:ji,sparkline_bar:Ti,schedule_agenda:Oi,time:Pi,forecast:Fi,weather:Li,days:Ii,months:Bi},Wi={title:"Titel",inverted:"Geïnverteerd (Zwarte achtergrond, witte tekst)",entity:"Entiteit",attribute:"Attribuut (optioneel)",name:"Aangepaste naam (optioneel)",unit:"Aangepaste eenheid (optioneel)",icon:"Aangepast pictogram (optioneel)",value:"Waarde",condition:"Voorwaarde",optional:"Optioneel",none:"Geen",active:"Actief",inactive:"Inactief",open:"Open",closed:"Gesloten",on:"AAN",off:"UIT",loading:"Laden...",no_events:"Geen aankomende evenementen",no_data:"Geen gegevens beschikbaar",not_configured:"Kaart niet geconfigureerd. Selecteer een entiteit."},Ui={equals:"Is gelijk aan",not_equals:"Is niet gelijk aan",above:"Boven (>)",below:"Onder (<)",on:"Status is AAN / Waar",off:"Status is UIT / Onwaar"},Ji={name:"E-ink Hoofdmetriek",description:"Grote weergave van één meetwaarde met hoog contrast en optionele trend.",show_trend:"Trend / Delta weergeven",trend_value:"Trendtekst (bijv. +1.2° of ▲ 5%)"},Ri={name:"E-ink Metriekenrooster",description:"2 tot 4 gerelateerde meetwaarden in een strak raster met doorlopende lijnen.",columns:"Kolommen (2, 3 of 4)"},qi={name:"E-ink Statuslijst",description:"Binaire of discrete statussen met contrastrijke monochrome badges.",invert_when_active:"Badge inverteren indien actief (Zwarte achtergrond, witte tekst)"},Gi={name:"E-ink Waarschuwingsbanner",description:"Contrastrijk voorwaardelijk waarschuwingsblok. Verborgen wanneer inactief.",message:"Waarschuwingsbericht",message_placeholder:"Waarschuwing: kritieke toestand gedetecteerd!"},Vi={name:"E-ink Sparkline-balk",description:"Scherpe historische trendbalken (12/24u) of doorlopende lijn zonder wazige antialiasing.",hours_to_show:"Aantal uren om weer te geven (bijv. 12, 24)",chart_type:"Grafiekstijl",chart_bars:"Discrete verticale balken",chart_line:"Doorlopende lijn"},Ki={name:"E-ink Agenda / Kalender",description:"Compacte chronologische kalenderevenementen gescheiden door solide 1px lijnen.",max_items:"Maximaal aantal evenementen om te tonen",all_day:"Hele dag"},Zi={name:"E-ink Klok & Datum",description:"Op de minuut gesynchroniseerde e-ink klok zonder ghosting per seconde en met datumweergave.",time_format:"Tijdnotatie",show_date:"Datum weergeven",date_format:"Datumstijl",date_short:"Korte datum (DD/MM/JJJJ)",date_long:"Lange datum (Weekdag + Dag + Maand)",date_combined:"Gecombineerd (Weekdag, Korte datum)",timezone:"Aangepaste tijdzone (bijv. Europe/Amsterdam)",secondary_entity_1:"Secundaire entiteit 1",secondary_entity_2:"Secundaire entiteit 2"},Yi={name:"E-ink Weersverwachting",description:"Weersstatus, temperatuur, uitgebreide verwachting en extra meting.",days_to_show:"Aantal dagen in weersverwachting",extra_attribute:"Extra meetwaarde",extra_humidity:"Luchtvochtigheid (%)",extra_pressure:"Luchtdruk (hPa)",extra_wind_speed:"Windsnelheid",extra_precipitation:"Neerslagkans (%)"},Qi={clear_night:"Helder",cloudy:"Bewolkt",fog:"Mistig",hail:"Hagel",lightning:"Onweer",lightning_rainy:"Onweersbuien met regen",partlycloudy:"Gedeeltelijk bewolkt",pouring:"Stortregen",rainy:"Regen",snowy:"Sneeuw",snowy_rainy:"Natte sneeuw",sunny:"Zonnig",windy:"Winderig",windy_variant:"Winderig",exceptional:"Uitzonderlijk weer"},Xi={sun:"Zon",mon:"Maa",tue:"Din",wed:"Woe",thu:"Don",fri:"Vri",sat:"Zat",sunday:"Zondag",monday:"Maandag",tuesday:"Dinsdag",wednesday:"Woensdag",thursday:"Donderdag",friday:"Vrijdag",saturday:"Zaterdag"},en={jan:"Jan",feb:"Feb",mar:"Mrt",apr:"Apr",may:"Mei",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Okt",nov:"Nov",dec:"Dec",january:"Januari",february:"Februari",march:"Maart",april:"April",may_long:"Mei",june:"Juni",july:"Juli",august:"Augustus",september:"September",october:"Oktober",november:"November",december:"December"},tn={common:Wi,conditions:Ui,hero_metric:Ji,grid_metrics:Ri,status_list:qi,alert_banner:Gi,sparkline_bar:Vi,schedule_agenda:Ki,time:Zi,forecast:Yi,weather:Qi,days:Xi,months:en};const nn={en:De,es:qe,"zh-Hans":st,zh:st,"zh-CN":st,de:kt,it:Ft,fr:Qt,pt:mi,"pt-BR":mi,ru:Object.freeze({__proto__:null,alert_banner:bi,common:pi,conditions:gi,days:Ei,default:Si,forecast:xi,grid_metrics:yi,hero_metric:fi,months:zi,schedule_agenda:wi,sparkline_bar:vi,status_list:_i,time:ki,weather:$i}),pl:Object.freeze({__proto__:null,alert_banner:ji,common:Ai,conditions:Mi,days:Ii,default:Hi,forecast:Fi,grid_metrics:Di,hero_metric:Ci,months:Bi,schedule_agenda:Oi,sparkline_bar:Ti,status_list:Ni,time:Pi,weather:Li}),nl:Object.freeze({__proto__:null,alert_banner:Gi,common:Wi,conditions:Ui,days:Xi,default:tn,forecast:Yi,grid_metrics:Ri,hero_metric:Ji,months:en,schedule_agenda:Ki,sparkline_bar:Vi,status_list:qi,time:Zi,weather:Qi})};function an(e,t){const i=(t||"en").replace("_","-"),n=nn[i]?i:nn[i.split("-")[0]]?i.split("-")[0]:"en",a=e.split(".");let o=nn[n];for(const e of a){if(!o||"object"!=typeof o||!(e in o)){o=void 0;break}o=o[e]}if(void 0===o&&"en"!==n){o=nn.en;for(const t of a){if(!o||"object"!=typeof o||!(t in o))return e;o=o[t]}}return void 0!==o?o:e}class on extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this.config=e,e.inverted?this.setAttribute("inverted",""):this.removeAttribute("inverted")}getCardSize(){return 1}getLanguage(){return this.hass?.locale?.language||this.hass?.language||"en"}t(e){return an(e,this.getLanguage())}getEntity(e){if(e&&this.hass?.states)return this.hass.states[e]}getEntityState(e,t){const i=this.getEntity(e);if(!i)return this.t("common.no_data");if(t&&i.attributes&&t in i.attributes){const e=i.attributes[t];return null!=e?String(e):""}return i.state??""}handleMoreInfo(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}}on.styles=[fe],e([pe({attribute:!1})],on.prototype,"hass",void 0),e([ge()],on.prototype,"config",void 0);let rn=class extends on{static async getConfigElement(){return await Promise.resolve().then(function(){return En}),document.createElement("eink-hero-metric-editor")}static getStubConfig(){return{type:"custom:eink-hero-metric",entity:"",show_trend:!1}}getCardSize(){return 2}render(){if(!this.config||!this.config.entity)return J`
        <div class="eink-card">
          <div class="hero-label">${this.t("hero_metric.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=this.config.name||this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.getEntityState(this.config.entity,this.config.attribute),n=this.config.unit||(this.config.attribute?"":e?.attributes?.unit_of_measurement)||"";return J`
      <div class="eink-card hero-container" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <div class="hero-label">${t}</div>
        <div class="hero-value-row">
          <span class="hero-value tabular">${i}</span>
          ${n?J`<span class="hero-unit">${n}</span>`:""}
        </div>
        ${this.config.show_trend&&this.config.trend_value?J`
              <div class="hero-trend ${this.config.trend_inverted?"inverted":""}">
                <span class="tabular">${this.config.trend_value}</span>
              </div>
            `:""}
      </div>
    `}};rn.styles=[...on.styles,r`
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
    `],rn=e([he("eink-hero-metric")],rn);let sn=class extends on{static async getConfigElement(){return await Promise.resolve().then(function(){return Sn}),document.createElement("eink-grid-metrics-editor")}static getStubConfig(){return{type:"custom:eink-grid-metrics",columns:3,metrics:[]}}getCardSize(){return 2}render(){const e=this.config?.metrics||[],t=Math.min(4,Math.max(1,this.config?.columns||(e.length>0?e.length:3)));if(!e||0===e.length)return J`
        <div class="eink-card">
          ${this.config?.title?J`<div class="eink-title">${this.config.title}</div>`:""}
          <div class="cell-label">${this.t("grid_metrics.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const i=Math.ceil(e.length/t);return J`
      <div class="eink-card">
        ${this.config?.title?J`<div class="eink-title">${this.config.title}</div>`:""}
        <div
          class="grid-container"
          style="grid-template-columns: repeat(${t}, minmax(0, 1fr));"
        >
          ${e.map((e,n)=>{const a=this.getEntity(e.entity),o=e.name||a?.attributes?.friendly_name||e.entity,r=this.getEntityState(e.entity,e.attribute),s=e.unit||(e.attribute?"":a?.attributes?.unit_of_measurement)||"",c=e.icon||a?.attributes?.icon,l=[(n+1)%t===0?"border-right: none;":"",Math.floor(n/t)===i-1?"border-bottom: none;":""].filter(Boolean).join(" ");return J`
              <div
                class="grid-cell"
                style="${l}"
                @click=${()=>this.handleMoreInfo(e.entity)}
              >
                <div class="cell-header">
                  ${c?J`<ha-icon class="cell-icon" .icon=${c}></ha-icon>`:""}
                  <span class="cell-label">${o}</span>
                </div>
                <div class="cell-value-row">
                  <span class="cell-value tabular">${r}</span>
                  ${s?J`<span class="cell-unit">${s}</span>`:""}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};sn.styles=[...on.styles,r`
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
    `],sn=e([he("eink-grid-metrics")],sn);let cn=class extends on{static async getConfigElement(){return await Promise.resolve().then(function(){return Mn}),document.createElement("eink-status-list-editor")}static getStubConfig(){return{type:"custom:eink-status-list",entities:[]}}getCardSize(){return Math.max(1,this.config?.entities?.length||1)}render(){const e=this.config?.entities||[];return 0===e.length?J`
        <div class="eink-card">
          ${this.config?.title?J`<div class="eink-title">${this.config.title}</div>`:""}
          <div>${this.t("common.not_configured")}</div>
        </div>
      `:J`
      <div class="eink-card">
        ${this.config?.title?J`<div class="eink-title">${this.config.title}</div>`:""}
        <div class="status-list">
          ${e.map(e=>{const t=this.getEntity(e.entity),i=e.name||t?.attributes?.friendly_name||e.entity,n=t?.state||this.t("common.no_data"),a=e.icon||t?.attributes?.icon||"mdi:radiobox-blank",o=(e.active_state?[e.active_state.toLowerCase()]:["on","open","active","true","home","unlocked"]).includes(n.toLowerCase()),r=!1!==e.invert_when_active&&o;return J`
              <div class="status-item" @click=${()=>this.handleMoreInfo(e.entity)}>
                <div class="status-left">
                  <ha-icon .icon=${a}></ha-icon>
                  <span class="status-name">${i}</span>
                </div>
                <div class="status-badge ${r?"active-inverted":""}">
                  ${n}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}};cn.styles=[...on.styles,r`
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
    `],cn=e([he("eink-status-list")],cn);let ln=class extends on{static async getConfigElement(){return await Promise.resolve().then(function(){return Dn}),document.createElement("eink-alert-banner-editor")}static getStubConfig(){return{type:"custom:eink-alert-banner",entity:"",condition:"on",message:"Critical condition detected!"}}getCardSize(){return this.isConditionMet()?1:0}isConditionMet(){if(!this.config||!this.config.entity)return!1;if(!this.getEntity(this.config.entity))return!1;const e=this.getEntityState(this.config.entity,this.config.attribute),t=this.config.condition||"on",i=this.config.value;switch(t){case"on":return["on","true","active","open","problem","detected"].includes(e.toLowerCase());case"off":return["off","false","inactive","closed","clear"].includes(e.toLowerCase());case"equals":return String(e).toLowerCase()===String(i).toLowerCase();case"not_equals":return String(e).toLowerCase()!==String(i).toLowerCase();case"above":{const t=parseFloat(e),n=parseFloat(String(i));return!isNaN(t)&&!isNaN(n)&&t>n}case"below":{const t=parseFloat(e),n=parseFloat(String(i));return!isNaN(t)&&!isNaN(n)&&t<n}default:return!1}}render(){if(!this.config||!this.config.entity)return J`
        <div class="eink-card">
          <div class="alert-title">${this.t("alert_banner.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;if(!this.isConditionMet())return J``;const e=this.getEntity(this.config.entity),t=this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.config.message||this.t("alert_banner.message_placeholder"),n=this.config.icon||"mdi:alert";return J`
      <div class="alert-banner" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <ha-icon class="alert-icon" .icon=${n}></ha-icon>
        <div class="alert-content">
          <span class="alert-title">${t}</span>
          <span class="alert-message">${i}</span>
        </div>
      </div>
    `}};ln.styles=[...on.styles,r`
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
    `],ln=e([he("eink-alert-banner")],ln);let dn=class extends on{constructor(){super(...arguments),this.historyPoints=[],this.lastFetchTime=0,this.isFetching=!1,this.fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return jn}),document.createElement("eink-sparkline-bar-editor")}static getStubConfig(){return{type:"custom:eink-sparkline-bar",entity:"",hours_to_show:24,chart_type:"bars"}}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this.fetchHistoryIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.isFetching&&(this.lastFetchTime=0),this.fetchToken++,this.isFetching=!1}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.fetchHistoryIfNeeded()}async fetchHistoryIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass?.callWS||!e)return void(!e&&(this.historyPoints.length>0||this.lastFetchKey)&&(this.historyPoints=[],this.lastFetchKey=void 0,this.lastFetchTime=0,this.fetchToken++,this.isFetching=!1));const t=this.config.hours_to_show||24,i=this.config.attribute,n=`${e}|${i||""}|${t}`,a=this.lastFetchKey!==n;a&&(this.fetchToken++,this.historyPoints=[],this.lastFetchTime=0,this.isFetching=!1);const o=Date.now();if(!a&&(this.isFetching||this.lastFetchTime>0&&o-this.lastFetchTime<3e5))return;this.lastFetchKey=n,this.lastFetchTime=o,this.isFetching=!0;const r=++this.fetchToken,s=new Date(o-3600*t*1e3).toISOString(),c=Boolean(i);try{const n=await this.hass.callWS({type:"history/history_during_period",start_time:s,entity_ids:[e],minimal_response:!c,no_attributes:!c});if(r!==this.fetchToken)return;const a=n?.[e];if(Array.isArray(a)){const e=a.map(e=>{const t=i?(e.a??e.attributes)?.[i]:e.s??e.state;return parseFloat(String(t))}).filter(e=>!isNaN(e));if(e.length>0){const i=Math.min(24,Math.max(8,Math.round(t)));let n;if(e.length<=i)n=e;else{n=[];for(let t=0;t<i;t++){const a=Math.round(t*(e.length-1)/(i-1));n.push(e[a])}}JSON.stringify(n)!==JSON.stringify(this.historyPoints)&&(this.historyPoints=n)}}}catch{if(r===this.fetchToken&&0===this.historyPoints.length){const t=parseFloat(this.getEntityState(e,i));isNaN(t)||(this.historyPoints=[t])}}finally{r===this.fetchToken&&(this.isFetching=!1)}}render(){if(!this.config||!this.config.entity)return J`
        <div class="eink-card">
          <div class="sparkline-label">${this.t("sparkline_bar.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=this.config.name||this.config.title||e?.attributes?.friendly_name||this.config.entity,i=this.getEntityState(this.config.entity,this.config.attribute),n=this.config.unit||(this.config.attribute?"":e?.attributes?.unit_of_measurement)||"",a=this.config.chart_type||"bars",o=this.config.hours_to_show||24,r=this.historyPoints.length>0?this.historyPoints:isNaN(parseFloat(i))?[]:[parseFloat(i)],s=r.length>0?Math.min(...r):0,c=r.length>0?Math.max(...r):0;return J`
      <div class="eink-card" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        <div class="sparkline-header">
          <span class="sparkline-label">${t}</span>
          <div>
            <span class="sparkline-current tabular">${i}</span>
            ${n?J`<span class="sparkline-unit">${n}</span>`:""}
          </div>
        </div>

        <div class="sparkline-chart">
          ${function(e,t="bars",i=300,n=60,a="currentColor",o=2.5){if(!e||0===e.length)return J`<svg width="100%" height="${n}" viewBox="0 0 ${i} ${n}" style="display: block;"></svg>`;const r=Math.min(...e),s=Math.max(...e),c=s===r,l=c?1:s-r,d=n-8,h=e=>c?.5:(e-r)/l;if("bars"===t){const t=e.length,o=2,r=o*(t-1),s=Math.max(2,Math.floor((i-r)/t));return J`
      <svg
        width="100%"
        height="${n}"
        viewBox="0 0 ${i} ${n}"
        preserveAspectRatio="none"
        shape-rendering="crispEdges"
        style="display: block; overflow: visible;"
      >
        ${e.map((e,t)=>{const i=h(e),r=Math.max(2,Math.round(i*d));return R`<rect x="${t*(s+o)}" y="${n-4-r}" width="${s}" height="${r}" fill="${a}" />`})}
      </svg>
    `}let u;if(1===e.length){const t=Math.round(n-4-h(e[0])*d);u=[`0,${t}`,`${i},${t}`]}else{const t=i/(e.length-1);u=e.map((e,i)=>{const a=h(e);return`${Math.round(i*t)},${Math.round(n-4-a*d)}`})}return J`
    <svg
      width="100%"
      height="${n}"
      viewBox="0 0 ${i} ${n}"
      preserveAspectRatio="none"
      shape-rendering="geometricPrecision"
      style="display: block; overflow: visible;"
    >
      ${R`
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
  `}(r,a,300,this.config.height||50,"var(--eink-fg)",this.config.stroke_width||2.5)}
        </div>

        <div class="sparkline-footer tabular">
          <span>MIN: ${s}${n}</span>
          <span>${o}H</span>
          <span>MAX: ${c}${n}</span>
        </div>
      </div>
    `}};dn.styles=[...on.styles,r`
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
    `],e([ge()],dn.prototype,"historyPoints",void 0),dn=e([he("eink-sparkline-bar")],dn);let hn=class extends on{constructor(){super(...arguments),this.events=[],this.lastFetchTime=0,this.isFetching=!1,this.fetchToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return On}),document.createElement("eink-schedule-agenda-editor")}static getStubConfig(){return{type:"custom:eink-schedule-agenda",entity:"",max_items:5}}getCardSize(){return Math.max(1,Math.min(this.events.length,this.config?.max_items||5))}connectedCallback(){super.connectedCallback(),this.fetchEventsIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.isFetching&&(this.lastFetchTime=0),this.fetchToken++,this.isFetching=!1}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.fetchEventsIfNeeded()}async fetchEventsIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass?.callApi||!e)return void(!e&&(this.events.length>0||this.lastFetchedEntity)&&(this.events=[],this.lastFetchedEntity=void 0,this.lastFetchTime=0,this.fetchToken++,this.isFetching=!1));const t=this.lastFetchedEntity!==e;t&&(this.fetchToken++,this.events=[],this.lastFetchTime=0,this.isFetching=!1);const i=Date.now();if(!t&&(this.isFetching||this.lastFetchTime>0&&i-this.lastFetchTime<3e5))return;this.lastFetchedEntity=e,this.lastFetchTime=i,this.isFetching=!0;const n=++this.fetchToken,a=new Date(i).toISOString(),o=new Date(i+6048e5).toISOString();try{const t=await this.hass.callApi("GET",`calendars/${encodeURIComponent(e)}?start=${encodeURIComponent(a)}&end=${encodeURIComponent(o)}`);n===this.fetchToken&&Array.isArray(t)&&JSON.stringify(t)!==JSON.stringify(this.events)&&(this.events=t)}catch{}finally{n===this.fetchToken&&(this.isFetching=!1)}}extractStartInfo(e){return e?"string"==typeof e?{rawStr:e,isDateOnly:/^\d{4}-\d{2}-\d{2}$/.test(e)}:e.dateTime?{rawStr:e.dateTime,isDateOnly:!1}:e.date?{rawStr:e.date,isDateOnly:!0}:{isDateOnly:!1}:{isDateOnly:!1}}isSameLocalDay(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}formatEventTime(e){const{rawStr:t,isDateOnly:i}=this.extractStartInfo(e);if(!t)return"--:--";const n=new Date,a=e=>e.toString().padStart(2,"0");if(i){const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),i=e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):new Date(t);return isNaN(i.getTime())?t:this.isSameLocalDay(i,n)?this.t("schedule_agenda.all_day"):`${a(i.getDate())}/${a(i.getMonth()+1)}`}const o=new Date(t);if(isNaN(o.getTime()))return t;const r=a(o.getHours()),s=a(o.getMinutes());return this.isSameLocalDay(o,n)?`${r}:${s}`:`${a(o.getDate())}/${a(o.getMonth()+1)} ${r}:${s}`}render(){if(!this.config||!this.config.entity)return J`
        <div class="eink-card">
          <div class="eink-title">${this.t("schedule_agenda.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.config.title||this.t("schedule_agenda.name"),t=this.config.max_items||5,i=this.events.slice(0,t);return J`
      <div class="eink-card">
        <div class="eink-title">${e}</div>
        <div class="agenda-list">
          ${0===i.length?J`<div class="empty-state">${this.t("common.no_events")}</div>`:i.map(e=>J`
                  <div class="agenda-row">
                    <span class="agenda-time tabular">${this.formatEventTime(e.start)}</span>
                    <div class="agenda-details">
                      <span class="agenda-summary">${e.summary}</span>
                      ${e.location?J`<span class="agenda-location">${e.location}</span>`:""}
                    </div>
                  </div>
                `)}
        </div>
      </div>
    `}};hn.styles=[...on.styles,r`
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
    `],e([ge()],hn.prototype,"events",void 0),hn=e([he("eink-schedule-agenda")],hn);const un=["sun","mon","tue","wed","thu","fri","sat"],mn=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],pn=["january","february","march","april","may_long","june","july","august","september","october","november","december"],gn={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};function fn(e,t){if(t)try{const i=new Intl.DateTimeFormat("en-US",{timeZone:t,weekday:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(e),n={};for(const e of i)n[e.type]=e.value;const a=Number(n.year),o=Number(n.month),r=Number(n.day),s=Number(n.hour),c=Number(n.minute),l=gn[n.weekday];if(!(isNaN(a)||isNaN(o)||isNaN(r)||isNaN(s)||isNaN(c)||void 0===l))return{year:a,monthIndex:o-1,dayOfMonth:r,dayOfWeek:l,hours:s%24,minutes:c}}catch{}return{year:e.getFullYear(),monthIndex:e.getMonth(),dayOfMonth:e.getDate(),dayOfWeek:e.getDay(),hours:e.getHours(),minutes:e.getMinutes()}}let yn=class extends on{constructor(){super(...arguments),this.currentDate=new Date}static async getConfigElement(){return await Promise.resolve().then(function(){return Fn}),document.createElement("eink-time-editor")}static getStubConfig(){return{type:"custom:eink-time",time_format:"24h",show_date:!0,date_format:"long"}}connectedCallback(){super.connectedCallback(),this.cleanupTimer&&(this.cleanupTimer(),this.cleanupTimer=void 0),this.currentDate=new Date,this.cleanupTimer=function(e){let t=null,i=null;return function(){const n=new Date,a=1e3*(60-n.getSeconds())-n.getMilliseconds()+20;t=setTimeout(()=>{e(),i=setInterval(e,6e4)},a)}(),()=>{null!==t&&clearTimeout(t),null!==i&&clearInterval(i)}}(()=>{this.currentDate=new Date,this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this.cleanupTimer&&(this.cleanupTimer(),this.cleanupTimer=void 0)}getCardSize(){return 2}render(){const e=this.config?.time_format||"24h",t=!1!==this.config?.show_date,i=this.config?.date_format||"long",n=this.config?.timezone,a=this.getLanguage(),o=function(e,t="24h",i){const{hours:n,minutes:a}=fn(e,i);let o=n;const r=e=>e<10?`0${e}`:`${e}`;if("12h"===t){const e=o>=12?"PM":"AM";return o=o%12||12,{time:`${o}:${r(a)}`,ampm:e}}return{time:`${r(o)}:${r(a)}`}}(this.currentDate,e,n),r=t?function(e,t,i="en",n){const{year:a,monthIndex:o,dayOfMonth:r,dayOfWeek:s}=fn(e,n),c=(i||"en").replace("_","-").split("-")[0].toLowerCase(),l=an(`days.${un[s]}`,i),d=an(`days.${mn[s]}`,i),h=an(`months.${pn[o]}`,i),u=e=>e<10?`0${e}`:`${e}`;return"short"===t?"zh"===c?`${a}/${u(o+1)}/${u(r)}`:`${u(r)}/${u(o+1)}/${a}`:"long"===t?"zh"===c?`${a}年${o+1}月${r}日 ${d}`:"de"===c?`${d}, ${r}. ${h}`:"es"===c||"it"===c||"pt"===c?`${d}, ${r} de ${h}`:"fr"===c||"nl"===c?`${d} ${r} ${h}`:"ru"===c||"pl"===c?`${d}, ${r} ${h}`:`${d}, ${h} ${r}`:`${l}, ${u(r)}/${u(o+1)}`}(this.currentDate,i,a,n):"",s=this.getEntity(this.config?.entity_1),c=this.getEntity(this.config?.entity_2);return J`
      <div class="eink-card">
        ${this.config?.title?J`<div class="eink-title">${this.config.title}</div>`:""}
        <div class="time-card-content">
          <div class="time-row">
            <span class="time-digits tabular">${o.time}</span>
            ${o.ampm?J`<span class="time-ampm">${o.ampm}</span>`:""}
          </div>

          ${t?J`<div class="date-text">${r}</div>`:""}

          ${s||c?J`
                <div class="entities-row">
                  ${s?J`
                        <div class="entity-chip" @click=${()=>this.handleMoreInfo(this.config.entity_1)}>
                          <ha-icon
                            class="chip-icon"
                            .icon=${s.attributes.icon||"mdi:information-outline"}
                          ></ha-icon>
                          <span class="tabular"
                            >${s.state} ${s.attributes.unit_of_measurement||""}</span
                          >
                        </div>
                      `:""}
                  ${c?J`
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
    `}};yn.styles=[...on.styles,r`
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
    `],e([ge()],yn.prototype,"currentDate",void 0),yn=e([he("eink-time")],yn);const _n={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:weather-alert"};function bn(e){if(!e)return"mdi:weather-cloudy";const t=e.toLowerCase().trim();return _n[t]||"mdi:weather-cloudy"}let vn=class extends on{constructor(){super(...arguments),this.forecastList=[],this._subscribeToken=0}static async getConfigElement(){return await Promise.resolve().then(function(){return In}),document.createElement("eink-forecast-editor")}static getStubConfig(){return{type:"custom:eink-forecast",entity:"",days_to_show:4,extra_attribute:"humidity"}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this.subscribeForecastIfNeeded()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeForecast()}updated(e){super.updated(e),(e.has("hass")||e.has("config"))&&this.subscribeForecastIfNeeded()}invokeUnsub(e){if(e)try{Promise.resolve(e()).catch(()=>{})}catch{}}unsubscribeForecast(){this._subscribeToken++,this._subscribedEntity=void 0,this._subscribedConnection=void 0;const e=this._unsubForecast;this._unsubForecast=void 0,this.invokeUnsub(e)}applyLegacyForecastFallback(e){const t=this.getEntity(e);t?.attributes?.forecast&&Array.isArray(t.attributes.forecast)&&(this.forecastList=t.attributes.forecast)}async subscribeForecastIfNeeded(){const e=this.config?.entity;if(!this.isConnected||!this.hass||!e)return(this._subscribedEntity||this._unsubForecast)&&this.unsubscribeForecast(),void(!e&&this.forecastList.length>0&&(this.forecastList=[]));const t=this.hass.connection;if(this._subscribedEntity===e&&this._subscribedConnection===t)return;const i=this._subscribedEntity!==e;if(this.unsubscribeForecast(),i&&(this.forecastList=[]),!this.getEntity(e))return;this._subscribedEntity=e,this._subscribedConnection=t;const n=this._subscribeToken;if(t?.subscribeMessage)try{const i=await t.subscribeMessage(e=>{if(n!==this._subscribeToken)return;const t=Array.isArray(e?.forecast)?e.forecast:[];JSON.stringify(t)!==JSON.stringify(this.forecastList)&&(this.forecastList=t)},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e});if(n!==this._subscribeToken||!this.isConnected)return void this.invokeUnsub(i);this._unsubForecast=i}catch{n===this._subscribeToken&&this.applyLegacyForecastFallback(e)}else this.applyLegacyForecastFallback(e)}formatDayName(e){if(!e)return"";const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e),i=t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])):new Date(e);if(isNaN(i.getTime()))return e;return an(`days.${["sun","mon","tue","wed","thu","fri","sat"][i.getDay()]}`,this.getLanguage())}render(){if(!this.config||!this.config.entity)return J`
        <div class="eink-card">
          <div class="eink-title">${this.t("forecast.name")}</div>
          <div>${this.t("common.not_configured")}</div>
        </div>
      `;const e=this.getEntity(this.config.entity),t=e?.state,i=e?.attributes?.temperature,n=e?.attributes?.temperature_unit||"°C",a=function(e,t="en"){if(!e)return"";const i=`weather.${e.toLowerCase().trim().replace(/-/g,"_")}`,n=an(i,t);return n!==i?n:e}(t,this.getLanguage()),o=bn(t),r=this.config.extra_attribute||"humidity",s=e?.attributes?.[r];let c=this.config.extra_attribute_label;if(!c){const e=`forecast.extra_${r}`,t=this.t(e);c=t!==e?t:r}let l="";"humidity"===r?l="%":"pressure"===r?l=" "+(e?.attributes?.pressure_unit||"hPa"):"wind_speed"===r?l=" "+(e?.attributes?.wind_speed_unit||"km/h"):"precipitation"===r&&(l="%");const d=this.config.days_to_show||4,h=this.forecastList.slice(0,d);return J`
      <div class="eink-card" @click=${()=>this.handleMoreInfo(this.config.entity)}>
        ${this.config.title?J`<div class="eink-title">${this.config.title}</div>`:""}

        <div class="forecast-main">
          <div class="forecast-current-left">
            <ha-icon class="current-icon" .icon=${o}></ha-icon>
            <div class="current-details">
              <div class="current-temp-row">
                <span class="current-temp tabular">${void 0!==i?i:"--"}</span>
                <span class="current-unit">${n}</span>
              </div>
              <span class="current-condition">${a}</span>
            </div>
          </div>

          ${void 0!==s?J`
                <div class="current-extra">
                  <span class="extra-label">${c}</span>
                  <span class="extra-value tabular">${s}${l}</span>
                </div>
              `:""}
        </div>

        ${h.length>0?J`
              <div class="forecast-grid">
                ${h.map(e=>J`
                    <div class="forecast-day">
                      <span class="day-name">${this.formatDayName(e.datetime)}</span>
                      <ha-icon class="day-icon" .icon=${bn(e.condition)}></ha-icon>
                      <div class="day-temps tabular">
                        <span class="day-high"
                          >${void 0!==e.temperature?`${e.temperature}°`:"--"}</span
                        >
                        ${void 0!==e.templow?J`<span class="day-low">${e.templow}°</span>`:""}
                      </div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}};vn.styles=[...on.styles,r`
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
    `],e([ge()],vn.prototype,"forecastList",void 0),vn=e([he("eink-forecast")],vn);const wn=window.customCards=window.customCards||[],kn=[{type:"eink-hero-metric",name:"E-ink Hero Metric",description:"High-contrast large single metric with optional trend indicator for E-ink screens."},{type:"eink-grid-metrics",name:"E-ink Grid Metrics",description:"Strict solid-divider grid displaying 2 to 4 related sensor metrics."},{type:"eink-status-list",name:"E-ink Status List",description:"Clean list of discrete or binary states with inverted solid badges for active items."},{type:"eink-alert-banner",name:"E-ink Alert Banner",description:"Conditional high-contrast alert block that remains 0px when condition is clear."},{type:"eink-sparkline-bar",name:"E-ink Sparkline Bar",description:"Discrete 12/24h trend bars or solid line with crisp edges and zero antialiasing blur."},{type:"eink-schedule-agenda",name:"E-ink Schedule Agenda",description:"Chronological calendar agenda with bold times and 1px dividers."},{type:"eink-time",name:"E-ink Clock & Date",description:"Minute-synchronized digital clock with date formats and zero second ghosting."},{type:"eink-forecast",name:"E-ink Weather Forecast",description:"Weather status, temperature, extended multi-day forecast and extra metric slot."}];for(const e of kn)wn.some(t=>t.type===e.type)||wn.push(e);console.info("%c SIMPLE-EINK-COLLECTION-CARDS %c v1.0.2 ","color: #ffffff; background: #000000; font-weight: 700; border: 1px solid #ffffff;","color: #000000; background: #ffffff; font-weight: 700; border: 1px solid #000000;");class xn extends le{constructor(){super(...arguments),this._computeLabel=e=>e.label||this.t(e.name)||e.name}setConfig(e){this._config={...e}}getLanguage(){return this.hass?.locale?.language||this.hass?.language||"en"}t(e){return an(e,this.getLanguage())}getFormData(){return this._config}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=e.target;t&&"HA-FORM"===t.tagName&&e.detail?.value&&(this._config={type:this._config.type,...e.detail.value},this.fireConfigChanged())}fireConfigChanged(){const e=new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}});this.dispatchEvent(e)}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this.getFormData()}
        .schema=${this.getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J``}}xn.styles=r`
    ha-form {
      display: block;
      margin-bottom: 16px;
    }
  `,e([pe({attribute:!1})],xn.prototype,"hass",void 0),e([ge()],xn.prototype,"_config",void 0);let $n=class extends xn{getSchema(){const e=[{name:"entity",label:this.t("common.entity"),selector:{entity:{}}}];return this._config?.entity&&e.push({name:"attribute",label:this.t("common.attribute"),selector:{attribute:{entity_id:this._config.entity}}}),e.push({name:"name",label:this.t("common.name"),selector:{text:{}}},{name:"unit",label:this.t("common.unit"),selector:{text:{}}},{name:"show_trend",label:this.t("hero_metric.show_trend"),selector:{boolean:{}}},{name:"trend_value",label:this.t("hero_metric.trend_value"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}),e}};$n=e([he("eink-hero-metric-editor")],$n);var En=Object.freeze({__proto__:null,get EinkHeroMetricEditor(){return $n}});let zn=class extends xn{getFormData(){const e=this._config?.metrics||[],t={columns:String(this._config?.columns||3),inverted:Boolean(this._config?.inverted)};this._config?.title&&(t.title=this._config.title);for(let i=0;i<4;i++){const n=i+1;e[i]?.entity&&(t[`metric_${n}`]=e[i].entity),e[i]?.name&&(t[`metric_${n}_name`]=e[i].name)}return t}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass||!e.detail?.value)return;const t=e.detail.value,i=this._config.metrics||[],n=[];for(let e=0;e<4;e++){const a=e+1,o=t[`metric_${a}`];if(!o)continue;const r={...i[e]||{},entity:o},s=t[`metric_${a}_name`];s?r.name=s:delete r.name,n.push(r)}const a={...this._config,columns:Number(t.columns)||3,inverted:Boolean(t.inverted),metrics:[...n,...i.slice(4)]};t.title?a.title=t.title:delete a.title,this._config=a,this.fireConfigChanged()}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"columns",label:this.t("grid_metrics.columns"),selector:{select:{options:[{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"}]}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},...[1,2,3,4].flatMap(e=>[{name:`metric_${e}`,label:`${this.t("common.entity")} ${e}`,selector:{entity:{}}},{name:`metric_${e}_name`,label:`${this.t("common.name")} ${e}`,selector:{text:{}}}])]}};zn=e([he("eink-grid-metrics-editor")],zn);var Sn=Object.freeze({__proto__:null,get EinkGridMetricsEditor(){return zn}});let An=class extends xn{getFormData(){const e=this._config?.entities||[],t={inverted:Boolean(this._config?.inverted)};this._config?.title&&(t.title=this._config.title);for(let i=0;i<5;i++){const n=i+1;e[i]?.entity&&(t[`entity_${n}`]=e[i].entity),e[i]?.name&&(t[`name_${n}`]=e[i].name)}return t}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass||!e.detail?.value)return;const t=e.detail.value,i=this._config.entities||[],n=[];for(let e=0;e<5;e++){const a=e+1,o=t[`entity_${a}`];if(!o)continue;const r={...i[e]||{},entity:o},s=t[`name_${a}`];s?r.name=s:delete r.name,n.push(r)}const a={...this._config,inverted:Boolean(t.inverted),entities:[...n,...i.slice(5)]};t.title?a.title=t.title:delete a.title,this._config=a,this.fireConfigChanged()}getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}},...[1,2,3,4,5].flatMap(e=>[{name:`entity_${e}`,label:`${this.t("common.entity")} ${e}`,selector:{entity:{}}},{name:`name_${e}`,label:`${this.t("common.name")} ${e}`,selector:{text:{}}}])]}};An=e([he("eink-status-list-editor")],An);var Mn=Object.freeze({__proto__:null,get EinkStatusListEditor(){return An}});let Cn=class extends xn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{}}},{name:"condition",label:this.t("common.condition"),selector:{select:{options:[{value:"on",label:this.t("conditions.on")},{value:"off",label:this.t("conditions.off")},{value:"equals",label:this.t("conditions.equals")},{value:"not_equals",label:this.t("conditions.not_equals")},{value:"above",label:this.t("conditions.above")},{value:"below",label:this.t("conditions.below")}]}}},{name:"value",label:this.t("common.value"),selector:{text:{}}},{name:"message",label:this.t("alert_banner.message"),selector:{text:{}}},{name:"icon",label:this.t("common.icon"),selector:{icon:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Cn=e([he("eink-alert-banner-editor")],Cn);var Dn=Object.freeze({__proto__:null,get EinkAlertBannerEditor(){return Cn}});let Nn=class extends xn{getSchema(){const e=[{name:"entity",label:this.t("common.entity"),selector:{entity:{}}}];return this._config?.entity&&e.push({name:"attribute",label:this.t("common.attribute"),selector:{attribute:{entity_id:this._config.entity}}}),e.push({name:"name",label:this.t("common.name"),selector:{text:{}}},{name:"unit",label:this.t("common.unit"),selector:{text:{}}},{name:"hours_to_show",label:this.t("sparkline_bar.hours_to_show"),selector:{number:{min:1,max:168,mode:"box"}}},{name:"chart_type",label:this.t("sparkline_bar.chart_type"),selector:{select:{options:[{value:"bars",label:this.t("sparkline_bar.chart_bars")},{value:"line",label:this.t("sparkline_bar.chart_line")}]}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}),e}};Nn=e([he("eink-sparkline-bar-editor")],Nn);var jn=Object.freeze({__proto__:null,get EinkSparklineBarEditor(){return Nn}});let Tn=class extends xn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{domain:"calendar"}}},{name:"max_items",label:this.t("schedule_agenda.max_items"),selector:{number:{min:1,max:20,mode:"box"}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Tn=e([he("eink-schedule-agenda-editor")],Tn);var On=Object.freeze({__proto__:null,get EinkScheduleAgendaEditor(){return Tn}});let Pn=class extends xn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"time_format",label:this.t("time.time_format"),selector:{select:{options:[{value:"24h",label:"24h (14:30)"},{value:"12h",label:"12h (2:30 PM)"}]}}},{name:"show_date",label:this.t("time.show_date"),selector:{boolean:{}}},{name:"date_format",label:this.t("time.date_format"),selector:{select:{options:[{value:"long",label:this.t("time.date_long")},{value:"short",label:this.t("time.date_short")},{value:"combined",label:this.t("time.date_combined")}]}}},{name:"timezone",label:this.t("time.timezone"),selector:{text:{}}},{name:"entity_1",label:this.t("time.secondary_entity_1"),selector:{entity:{}}},{name:"entity_2",label:this.t("time.secondary_entity_2"),selector:{entity:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Pn=e([he("eink-time-editor")],Pn);var Fn=Object.freeze({__proto__:null,get EinkTimeEditor(){return Pn}});let Ln=class extends xn{getSchema(){return[{name:"title",label:this.t("common.title"),selector:{text:{}}},{name:"entity",label:this.t("common.entity"),selector:{entity:{domain:"weather"}}},{name:"days_to_show",label:this.t("forecast.days_to_show"),selector:{number:{min:2,max:7,mode:"box"}}},{name:"extra_attribute",label:this.t("forecast.extra_attribute"),selector:{select:{options:[{value:"humidity",label:this.t("forecast.extra_humidity")},{value:"pressure",label:this.t("forecast.extra_pressure")},{value:"wind_speed",label:this.t("forecast.extra_wind_speed")},{value:"precipitation",label:this.t("forecast.extra_precipitation")}]}}},{name:"extra_attribute_label",label:this.t("common.name"),selector:{text:{}}},{name:"inverted",label:this.t("common.inverted"),selector:{boolean:{}}}]}};Ln=e([he("eink-forecast-editor")],Ln);var In=Object.freeze({__proto__:null,get EinkForecastEditor(){return Ln}});
