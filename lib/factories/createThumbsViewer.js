import{getElements as s,getElement as m}from"../node_modules/mibreit-dom-tools/lib/index.js";import a from"../containers/ThumbScrollerContainer.js";import w from"../tools/checkThumbScrollerConfig.js";function u(t,o,r,n){if(typeof t!="string")throw new Error("createThumbsViewer - first parameter must be containerSelector string");if(typeof o!="string")throw new Error("createThumbsViewer - second parameter must be imageSelector string");r&&w(r);const e=s(o),i=m(t);if(i&&(e==null?void 0:e.length)>0)return new a(i,e,r,n).getThumbsViewer();throw new Error("createThumbsViewer - no images selected")}export{u as default};