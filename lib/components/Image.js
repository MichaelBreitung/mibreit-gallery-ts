var _=Object.defineProperty;var l=(r,e,t)=>e in r?_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var s=(r,e,t)=>l(r,typeof e!="symbol"?e+"":e,t);import{disableContextMenu as u,disableDragging as A,overwriteCssStyles as p}from"../node_modules/mibreit-dom-tools/lib/index.js";import"../node_modules/mibreit-lazy-loader/lib/tools/createLazyLoader.js";import m from"../node_modules/mibreit-lazy-loader/lib/components/Element.js";import{IMAGE_TITLE_ATTRIBUTE as T,IMAGE_DATA_TITLE_ATTRIBUTE as h}from"../constants.js";class c extends m{constructor(t){super(t);s(this,"_title","");this._prepareTitle(t),this._limitMaxSizeTo(t,this.getWidth(),this.getHeight()),u(t),A(t)}getTitle(){return this._title}getUrl(){return this._element.hasAttribute("data-src")?this._element.getAttribute("data-src"):this._element.getAttribute("src")}_limitMaxSizeTo(t,i,o){p(t,`max-width: ${i}px; max-height: ${o}px`)}_prepareTitle(t){let i=t.getAttribute(T);i?(t.setAttribute(h,i),t.removeAttribute(T)):i=t.getAttribute(h),this._title=i||""}}export{c as default};
//# sourceMappingURL=Image.js.map