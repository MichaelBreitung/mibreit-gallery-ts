var c=Object.defineProperty;var S=(u,t,s)=>t in u?c(u,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):u[t]=s;var i=(u,t,s)=>S(u,typeof t!="symbol"?t+"":t,s);import{addCssClass as n,getChildNodes as _,createElement as m,wrapElements as d,getRootFontSize as z,getElementDimension as g,setInnerHtml as p,prependChildElement as T,appendChildElement as w,addCssStyle as a}from"../node_modules/mibreit-dom-tools/lib/index.js";import h from"./ThumbsWrapper.module.css.js";import b from"../images/nextThumbs.svg.js";class x{constructor(t,s,r){i(this,"_wrapper");i(this,"_previousButton");i(this,"_nextButton");i(this,"_thumbSizeRem");i(this,"_thumbStages");i(this,"_numberOfVisibleThumbs");n(t,h.thumbs_wrapper__parent),this._numberOfVisibleThumbs=r,this._thumbStages=s;const e=r>=s.length;this._wrapper=this._wrapThumbs(t,e);const[o,l]=this._createScrollerButtons(t,e);this._previousButton=o,this._nextButton=l,this._thumbSizeRem=this._calculateThumbsize(this._wrapper,r),this._resizeThumbStages(this._thumbSizeRem)}reinitSize(){this._thumbSizeRem=this._calculateThumbsize(this._wrapper,this._numberOfVisibleThumbs),this._resizeThumbStages(this._thumbSizeRem)}getThumbSizeRem(){return this._thumbSizeRem}getNumberOfVisibleThumbs(){return this._numberOfVisibleThumbs}getNumberOfThumbs(){return this._thumbStages.length}getThumbScrollerButtons(){return{previousButton:this._previousButton,nextButton:this._nextButton}}getElements(){return _(this._wrapper)}_wrapThumbs(t,s){const r=_(t),e=m("div");return s?n(e,h.thumbs_wrapper__centered):n(e,h.thumbs_wrapper),d(r,e),e}_calculateThumbsize(t,s){const r=z();return g(t).width/r/s}_createScrollerButtons(t,s){const r=m("div");p(r,b),n(r,h.thumbs_wrapper__previous_btn),T(r,t);const e=m("div");return p(e,b),n(e,h.thumbs_wrapper__next_btn),w(e,t),s&&(a(r,"opacity","0"),a(e,"opacity","0")),[r,e]}_resizeThumbStages(t){const s=t*.9,r=t*.05;this._thumbStages.forEach(e=>{e.setSize(`${s}rem`,`${s}rem`),e.setMargin(`${r}rem`)})}}export{x as default};