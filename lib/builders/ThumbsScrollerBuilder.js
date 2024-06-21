var p=Object.defineProperty;var d=(n,e,r)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var i=(n,e,r)=>d(n,typeof e!="symbol"?e+"":e,r);import"../node_modules/mibreit-lazy-loader/lib/tools/createLazyLoader.js";import T from"../node_modules/mibreit-lazy-loader/lib/components/LazyLoader.js";import{createElement as h,setInnerHtml as o,addCssClass as l,prependChildElement as c,appendChildElement as x,addClickEventListener as a}from"../node_modules/mibreit-dom-tools/lib/index.js";import"../node_modules/mibreit-lazy-loader/lib/components/Element.js";import B from"../factories/createThumbsWrapper.js";import E from"../components/Image.js";import v from"../components/ThumbsViewer.js";import b from"./ThumbsScrollerBuilder.module.css.js";import _ from"../images/nextThumbs.svg.js";const I=7;class S{constructor(e,r,t,s){i(this,"_thumbContainerElement");i(this,"_previousButtonElement");i(this,"_nextButtonElement");i(this,"_thumbsWrapper");i(this,"_lazyLoader");i(this,"_initialIndex");this._thumbContainerElement=e;const u=t!=null&&t.numberOfVisibleThumbs?t.numberOfVisibleThumbs:I;this._initialIndex=t==null?void 0:t.initialIndex;const m=this._createThumbsArray(r);this._lazyLoader=new T(m,u,u),this._thumbsWrapper=B(e,m,u,s)}addPreviousNextButtons(){return this._thumbsWrapper.getNumberOfVisibleThumbs()<this._thumbsWrapper.getNumberOfThumbs()&&([this._previousButtonElement,this._nextButtonElement]=this._createPreviousNextButtons(this._thumbContainerElement)),this}build(){if(this._thumbsWrapper.reinitSize(),this._thumbsWrapper.getNumberOfVisibleThumbs()<this._thumbsWrapper.getNumberOfThumbs()){const e=this._createThumbsViewer(this._thumbsWrapper,this._lazyLoader,this._initialIndex);return this._previousButtonElement&&this._nextButtonElement&&this._addThumbsViewerInteraction(e,this._previousButtonElement,this._nextButtonElement),e}else return setTimeout(()=>{this._lazyLoader.loadElement(0),this._lazyLoader.setCurrentIndex(0)},0),null}_createThumbsArray(e){const r=new Array;for(let t=0;t<e.length;t++){const s=new E(e[t]);r.push(s)}return r}_createThumbsViewer(e,r,t=0){const s=new v(e);return s.addScrollIndexChangedCallback(u=>{r.setCurrentIndex(u)}),s.setCenterThumb(t),s}_createPreviousNextButtons(e){const r=h("div");o(r,_),l(r,b.thumbs_scroller__previous_btn),c(r,e);const t=h("div");return o(t,_),l(t,b.thumbs_scroller__next_btn),x(t,e),[r,t]}_addThumbsViewerInteraction(e,r,t){a(t,()=>{e.scrollNext()}),a(r,()=>{e.scrollPrevious()})}}export{S as default};