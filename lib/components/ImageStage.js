var f=Object.defineProperty;var y=(m,e,t)=>e in m?f(m,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):m[e]=t;var g=(m,e,t)=>y(m,typeof e!="symbol"?e+"":e,t);import{getElementDimension as S,addCssStyle as i,addCssClass as s,removeCssStyle as l,removeCssClass as h,createElement as c,wrapElements as T,getComputedCssStyle as A}from"../node_modules/mibreit-dom-tools/lib/index.js";import H from"./ImageStage.module.css.js";import a from"../tools/animations.module.css.js";import{ESwipeDirection as o}from"./SwipeHandler.js";import{sleepTillNextRenderFinished as _}from"../tools/AsyncSleep.js";const I=1e3;class M{constructor(e,t,n){g(this,"_zoomAnimation",!1);g(this,"_imageStage");g(this,"_imageHandle");g(this,"_imageWidth");g(this,"_imageHeight");this._imageHandle=e,this._imageWidth=t,this._imageHeight=n,this._imageStage=this._createStage()}setZoomAnimation(e){this._zoomAnimation=e}applyScaleMode(){const e=S(this._imageStage);this._applyScaleModeImpl(e.width,e.height),this._centerImage(e.width,e.height)}setSize(e,t){i(this._imageStage,"width",e),i(this._imageStage,"height",t),this.applyScaleMode()}setMargin(e){i(this._imageStage,"margin",e)}async hideImage(e=o.NONE){this._zoomAnimation&&setTimeout(()=>{this._resetZoom()},I),this._stopSlideAnimation(),await _(),e==o.RIGHT?(s(this._imageStage,a.mibreit_GalleryTransition),i(this._imageStage,"left","-100%")):e==o.LEFT&&(s(this._imageStage,a.mibreit_GalleryTransition),i(this._imageStage,"left","100%")),l(this._imageStage,"opacity")}async showImage(e=o.NONE){this.applyScaleMode(),this._zoomAnimation&&this._startZoomAnimation(),this._stopSlideAnimation(),await _(),e==o.RIGHT?(h(this._imageStage,a.mibreit_GalleryTransition),i(this._imageStage,"left","100%"),await _(),s(this._imageStage,a.mibreit_GalleryTransition),l(this._imageStage,"left")):e==o.LEFT?(h(this._imageStage,a.mibreit_GalleryTransition),i(this._imageStage,"left","-100%"),await _(),s(this._imageStage,a.mibreit_GalleryTransition),l(this._imageStage,"left")):(h(this._imageStage,a.mibreit_GalleryTransition),l(this._imageStage,"left")),i(this._imageStage,"opacity","1")}_createStage(){const e=c("div");return s(e,H.mibreit_ImageStage),s(e,a.mibreit_GalleryFade),T([this._imageHandle],e),e}_centerImage(e,t){const{width:n,height:r}=S(this._imageHandle),d=(n+e)/2-n,p=(r+t)/2-r;i(this._imageHandle,"margin-left",`${d}px`),i(this._imageHandle,"margin-top",`${p}px`)}_startZoomAnimation(){s(this._imageHandle,"zoom")}_resetZoom(){h(this._imageHandle,"zoom")}_stopSlideAnimation(){i(this._imageStage,"margin-left",A(this._imageStage,"margin-left"))}}export{M as default};
//# sourceMappingURL=ImageStage.js.map