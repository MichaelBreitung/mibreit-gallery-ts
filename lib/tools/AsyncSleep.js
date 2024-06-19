const r=async function(){return new Promise((e,n)=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{e()})})})};export{r as sleepTillNextRenderFinished};
