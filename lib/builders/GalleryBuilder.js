var I=Object.defineProperty;var x=(l,e,t)=>e in l?I(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var o=(l,e,t)=>x(l,typeof e!="symbol"?e+"":e,t);import{createElement as h,addCssStyle as n,appendChildElement as d,cloneElement as k,getElement as H,removeCssStyle as f,setInnerHtml as c,addCssClass as r,prependChildElement as S,getElementDimension as F,getElementPosition as P,addResizeEventListener as B,addEventListener as u,addKeyEventListener as v,getKeyFromEvent as g}from"../node_modules/mibreit-dom-tools/lib/index.js";import E from"./SlideshowBuilder.js";import T from"./ThumbsScrollerBuilder.js";import V from"../containers/Gallery.js";import A from"../containers/Fullscreen.js";import L,{ESwipeDirection as y}from"../components/SwipeHandler.js";import C from"../images/nextImage.svg.js";import N from"../images/fullscreen.svg.js";import _ from"./GalleryBuilder.module.css.js";import w from"../tools/animations.module.css.js";import{GALLERY_BUTTONS_SHOW_OPACITY as K}from"../constants.js";class p{constructor(e,t,s=!1){o(this,"_slideshowContainerElement");o(this,"_fullScreenOnly");o(this,"_slideshow");o(this,"_thumbsViewer",null);o(this,"_fullscreen",null);this._slideshowContainerElement=e,this._slideshow=t,this._fullScreenOnly=s}static fromContainerAndImages(e,t,s){const i=new E(t,s).build();return new p(e,i)}static fromImages(e,t){const s=h("div");n(s,"display","none"),e.forEach(b=>{d(k(b),s)});const i=H("body");d(s,i);const a=s.children,m=new E(a,t).build();return new p(s,m,!0)}addPreviousNextButtons(){const{previousButton:e,nextButton:t}=this._createPreviousNextButtons(this._slideshowContainerElement);return this._setupHoverEvents(this._slideshowContainerElement,[e,t]),this}addFullscreen(){this._fullscreen=new A(this._slideshowContainerElement);const e=this._createFullscreenButton(this._slideshowContainerElement);return this._setupHoverEvents(this._slideshowContainerElement,[e]),this._setupFullscreenKeyEvents(this._fullscreen),this._setupFullscreenClickEvent(e,this._fullscreen),this._setupFullscreenChangedHandler(this._fullscreen,e),this._fullScreenOnly&&this._fullscreen.addChangedCallback(t=>{t?f(this._slideshowContainerElement,"display"):n(this._slideshowContainerElement,"display","none")}),this}addThumbScroller(e,t,s){return this._thumbsViewer=new T(e,t,s,i=>{this._slideshow.getLoader().setCurrentIndex(i),this._slideshow.getImageViewer().showImage(i)}).addPreviousNextButtons().build(),this._thumbsViewer&&(this._setupThumbsViewerResizeHandler(this._thumbsViewer),this._slideshow.getImageViewer().addImageChangedCallback((i,a)=>{this._thumbsViewer.setCenterThumb(i,!0)})),this}build(){return this._setupSwipeHandler(this._slideshowContainerElement,this._slideshow.getImageViewer()),this._setupKeyEvents(this._slideshow.getImageViewer()),new V(this._slideshow.getImageViewer(),this._slideshow.getLoader(),this._thumbsViewer,this._fullscreen)}_createPreviousNextButtons(e){const t=h("div");c(t,C),r(t,_.gallery__previous_btn),r(t,w.fade),S(t,e);const s=h("div");return c(s,C),r(s,_.gallery__next_btn),r(s,w.fade),d(s,e),{previousButton:t,nextButton:s}}_setupSwipeHandler(e,t){n(e,"touch-action","pinch-zoom pan-y"),new L(e,(s,i)=>{const a=F(e).width,m=P(e).x;s===y.LEFT?t.showPreviousImage(s):s===y.RIGHT?t.showNextImage(s):i.x-m>a/2?t.showNextImage():t.showPreviousImage()})}_setupThumbsViewerResizeHandler(e){B(()=>{})}_setupHoverEvents(e,t){u(e,"mouseenter",()=>{t.forEach(s=>{n(s,"opacity",`${K}`)})}),u(e,"mouseleave",()=>{t.forEach(s=>{n(s,"opacity","0")})})}_setupKeyEvents(e){v(t=>{switch(g(t)){case"ArrowRight":e.showNextImage();break;case"ArrowLeft":e.showPreviousImage();break}})}_setupFullscreenKeyEvents(e){v(t=>{switch(g(t)){case"Escape":e.deActivate();break;case"f":e.isActive()?e.deActivate():e.activate();break}})}_createFullscreenButton(e){const t=h("div");return c(t,N),r(t,_.gallery__fullscreen_btn),r(t,w.fade),d(t,e),t}_setupFullscreenClickEvent(e,t){u(e,"pointerdown",s=>{s.stopPropagation()}),u(e,"pointerup",s=>{s.stopPropagation(),t.isActive()||(t.activate(),n(e,"display","none"))})}_setupFullscreenChangedHandler(e,t){e.addChangedCallback(s=>{s?n(t,"display","none"):f(t,"display")})}}export{p as default};