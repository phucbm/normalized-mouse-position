/*!
 * normalized-mouse-position 1.0.0
 * https://github.com/phucbm/normalized-mouse-position
 *
 * @license MIT
 * @author: phucbm, https://github.com/phucbm
 */
function z({x:d,y:c,origin:h="50% 50%",target:n=window,clamp:M=!0,invertX:g=!1,invertY:w=!1}){let[f,u]=h.split(" "),r=parseFloat(f.replace("%",""))/100,m=parseFloat(u.replace("%",""))/100,l=n===window,t=l?window.innerWidth:n.offsetWidth,e=l?window.innerHeight:n.offsetHeight,s=t*r,a=e*m,p=Math.max(s,t-s),x=Math.max(a,e-a),i=(d-s)/p,o=(c-a)/x;return g&&(i=-i),w&&(o=-o),M&&(i=Math.max(-1,Math.min(1,i)),o=Math.max(-1,Math.min(1,o))),{x:i,y:o,origin:{x:r,y:m},size:{width:t,height:e}}}export{z as getNormalizedMousePosition};
//# sourceMappingURL=index.js.map