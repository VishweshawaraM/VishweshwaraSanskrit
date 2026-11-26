// Runtime for the new-design pages: island menu, reveals, scroll scenes and the 3D hero.
// @ts-nocheck
import * as THREE from 'three';
export function initSite(host: HTMLElement): () => void {

const $=(s:string,r:any=host)=>r.querySelector(s) as any,$$=(s:string,r:any=host)=>[...r.querySelectorAll(s)] as any[];
const offs:(()=>void)[]=[];const on=(t:any,ev:string,fn:any,o?:any)=>{t.addEventListener(ev,fn,o);offs.push(()=>t.removeEventListener(ev,fn,o))};let raf=0,dead=false;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
requestAnimationFrame(()=>document.body.classList.add('ready'));
function cleanup(){dead=true;cancelAnimationFrame(raf);offs.forEach(f=>f());document.body.classList.remove('ready');}

/* island */
const island=$('#island'),cb=$('#coursesBtn'),mb=$('#menuBtn'),mq=matchMedia('(max-width:900px)');
function setOpen(v){island.classList.toggle('open',v);cb&&cb.setAttribute('aria-expanded',v);mb&&mb.setAttribute('aria-expanded',v);}
function syncM(){$$('.m-only').forEach(a=>a.hidden=!mq.matches)}
syncM();on(mq,'change',syncM);
cb&&cb.addEventListener('click',()=>setOpen(!island.classList.contains('open')));
mb&&mb.addEventListener('click',()=>setOpen(!island.classList.contains('open')));
island.addEventListener('mouseleave',()=>{if(!mq.matches)setOpen(false)});
cb&&cb.addEventListener('mouseenter',()=>{if(!mq.matches)setOpen(true)});
on(document,'keydown',e=>{if(e.key==='Escape')setOpen(false)});
const page=host.dataset.page;
$$('.links a').forEach(a=>{if(a.dataset.p===page)a.setAttribute('aria-current','page')});

/* marquee */
const mt=$('#marq');if(mt)mt.innerHTML+=mt.innerHTML;

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -50px 0px'});
$$('.rv').forEach(el=>io.observe(el));

/* words */
const wEl=$('#words');let words=[];
if(wEl){wEl.innerHTML=wEl.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span>').join(' ');words=$$('.w',wEl);}

/* tilt */
$$('.tilt').forEach(c=>{
  c.addEventListener('pointermove',e=>{if(reduce||e.pointerType!=='mouse')return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`});
  c.addEventListener('pointerleave',()=>c.style.transform='');
});

/* copy */
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.copy,lab=b.textContent;const done=()=>{b.textContent='Copied';setTimeout(()=>b.textContent=lab,1600)};
  try{navigator.clipboard.writeText(t).then(done,()=>{})}catch(e){}}));


/* review deck: cards come to the front from the right and leave to the left while scrolling */
const decks=[];
if(!reduce){$$('.rv-grid').forEach(g=>{const cards=[...g.children];if(cards.length<3)return;
  const deck=document.createElement('div');deck.className='deck';deck.style.height=`calc(${cards.length*62+100}svh)`;
  const pin=document.createElement('div');pin.className='deck-pin';const stage=document.createElement('div');stage.className='deck-stage';
  const count=document.createElement('div');count.className='deck-count';
  cards.forEach(c=>{c.classList.add('in');stage.appendChild(c)});pin.appendChild(stage);pin.appendChild(count);deck.appendChild(pin);g.replaceWith(deck);
  decks.push({deck,cards,count});});}
function deckFrame(vh){decks.forEach(({deck,cards,count})=>{const r=deck.getBoundingClientRect();const n=cards.length;
  const t=Math.min(1,Math.max(0,-r.top/(r.height-vh)));const f=t*(n-1);
  cards.forEach((c,i)=>{const d=i-f;let x,sc,op,rot,z;
    if(d>=0){x=d*14;sc=1-d*.06;op=d<2?1:Math.max(0,3-d);rot=d*2.5;z=50-Math.round(d*10);}
    else{x=d*115;sc=1+d*.04;op=Math.min(1,Math.max(0,1+(d+.25)*1.5));rot=d*9;z=60;}
    c.style.transform=`translate3d(${x}%,${Math.abs(d)<1?0:0}px,0) scale(${sc}) rotate(${rot}deg)`;c.style.opacity=op;c.style.zIndex=z;});
  const a=Math.min(n,Math.round(f)+1);count.innerHTML=`<b>${String(a).padStart(2,'0')}</b> / ${String(n).padStart(2,'0')}`;});}


/* stats count up when they come into view */
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;sio.unobserve(e.target);const b=e.target.querySelector('b');const m=b&&b.textContent.trim().match(/^([\d,]+)(\+?)$/);if(!m||reduce)return;const end=+m[1].replace(/,/g,''),suf=m[2],t0=performance.now(),dur=1100;
  const tick=(t:number)=>{const k=Math.min(1,(t-t0)/dur);const v=Math.round(end*(1-Math.pow(1-k,3)));b.textContent=v.toLocaleString('en-IN')+suf;if(k<1&&!dead)requestAnimationFrame(tick)};b.textContent='0'+suf;requestAnimationFrame(tick);}),{threshold:.4});
$$('.stat').forEach(el=>sio.observe(el));

/* scroll */
const method=$('#method'),steps=method?$$('.step',method):[],bars=$$('#bar i'),pimg=$('#pimg');
let heroVis=true,scrollP=0,ticking=false;
const mbar=$('#mbar'),finalSec=$('.final');
$$('img').forEach(img=>{const done=()=>img.classList.add('ld');if(img.complete&&img.naturalWidth)done();else{img.addEventListener('load',done);img.addEventListener('error',done);}});
function onScroll(){
  ticking=false;const vh=innerHeight,y=scrollY;
  island.classList.toggle('small',y>40);
  if(wEl){const r=wEl.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const n=Math.round(p*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<n));}
  if(method){let idx=-1;if(innerWidth>900){const m=method.getBoundingClientRect();const p=(vh*.6-m.top)/(vh*.9);idx=Math.min(steps.length-1,Math.floor(p*steps.length));}else{steps.forEach((s,i)=>{if(s.getBoundingClientRect().top<vh*.62)idx=i});}steps.forEach((s,i)=>s.classList.toggle('on',i<=idx));bars.forEach((b,i)=>b.style.setProperty('--p',i<=idx?1:0));}
  if(pimg&&!reduce){const pr=pimg.parentElement.getBoundingClientRect();if(pr.top<vh&&pr.bottom>0)pimg.style.transform=`translateY(${((pr.top+pr.height/2-vh/2)/vh)*-8}%)`;}
  if(decks.length)deckFrame(vh);
  heroVis=y<vh*1.1;scrollP=Math.min(1,y/vh);
  if(mbar){const fr=finalSec?finalSec.getBoundingClientRect().top:1e9;mbar.classList.toggle('show',y>vh*.7&&fr>vh*.85);}
}
on(window,'scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
on(window,'resize',onScroll);onScroll();

/* 3D */
const canvas=$('#gl');
if(!canvas)return cleanup;
const lite=canvas.dataset.lite==='1';let renderer:any;try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){return cleanup;}

renderer.setClearColor(0x0E0C0A,1);
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0E0C0A,.055);
const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(0,0,11);
const root=new THREE.Group();scene.add(root);
function glowTex(c1,size){const cv=document.createElement('canvas');cv.width=cv.height=size;const g=cv.getContext('2d');const gr=g.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);gr.addColorStop(0,c1);gr.addColorStop(.25,c1.replace(/[\d.]+\)$/,'0.35)'));gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,size,size);return new THREE.CanvasTexture(cv);}
const dot=glowTex('rgba(255,236,214,1)',64);
const N=(innerWidth<700?1800:3600)*(lite?.6:1),pos=new Float32Array(N*3),col=new Float32Array(N*3);
const cIv=new THREE.Color(0xF5F0E6),cK=new THREE.Color(0xE08A4A),cG=new THREE.Color(0xA8833A);
for(let i=0;i<N;i++){const u=Math.random(),v=Math.random(),th=2*Math.PI*u,ph=Math.acos(2*v-1),shell=Math.random()<.72,r=shell?3.1+Math.random()*.25:1.2+Math.random()*7;
  pos[i*3]=r*Math.sin(ph)*Math.cos(th);pos[i*3+1]=r*Math.sin(ph)*Math.sin(th);pos[i*3+2]=r*Math.cos(ph);
  const c=Math.random()<.18?cK:(Math.random()<.12?cG:cIv);col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b;}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));pg.setAttribute('color',new THREE.BufferAttribute(col,3));
const pm=new THREE.PointsMaterial({size:.07,map:dot,vertexColors:true,transparent:true,opacity:.85,depthWrite:false,blending:THREE.AdditiveBlending});
const pts=new THREE.Points(pg,pm);root.add(pts);
const rings=[];
[[4.2,0xC9621C,.55,[1.2,.2,0]],[5.0,0xA8833A,.35,[1.45,-.5,.3]],[3.6,0xF5F0E6,.18,[.3,.9,0]]].forEach(([R,c,o,rot])=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R,.006,8,360),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o}));t.rotation.set(...rot);root.add(t);rings.push(t);});
const beads=[];
rings.forEach((r,i)=>{for(let k=0;k<3;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:dot,color:i===0?0xE08A4A:0xF5F0E6,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));s.scale.setScalar(.35);r.add(s);beads.push({s,R:r.geometry.parameters.radius,a:Math.random()*6.28,sp:.12+Math.random()*.15});}});
const core=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex('rgba(201,98,28,0.9)',256),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));core.scale.setScalar(9);root.add(core);
const glyphs=(canvas.dataset.glyphs||'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ग च ज ट ड त द न प म य र ल व श स ह ॐ').split(' ');
const gl=[];
function makeGlyph(ch){const s=256,cv=document.createElement('canvas');cv.width=cv.height=s;const g=cv.getContext('2d');g.fillStyle='#F5F0E6';g.font=`${s*.62}px "Tiro Devanagari Sanskrit", serif`;g.textAlign='center';g.textBaseline='middle';g.shadowColor='rgba(224,138,74,.9)';g.shadowBlur=24;g.fillText(ch,s/2,s/2+s*.04);return new THREE.CanvasTexture(cv);}
function build(){const count=(innerWidth<700?14:22)*(lite?.7:1)|0;for(let i=0;i<count;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:makeGlyph(glyphs[i%glyphs.length]),transparent:true,opacity:0,depthWrite:false}));const o={s,R:3.6+Math.random()*3.2,a:Math.random()*6.28,y:(Math.random()-.5)*4.2,sp:(.04+Math.random()*.06)*(Math.random()<.5?-1:1),ph:Math.random()*6.28,target:.35+Math.random()*.55};s.scale.setScalar(.55+Math.random()*.6);root.add(s);gl.push(o);}}
(document.fonts&&document.fonts.load?document.fonts.load('64px "Tiro Devanagari Sanskrit"','अ'):Promise.resolve()).then(build,build);
function size(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();camera.position.z=w<700?14:11;root.position.set(lite&&w>=900?3.2:0,w<700?1.4:.6,0);}
size();on(window,'resize',size);
let mx=0,my=0,tx=0,ty=0;on(window,'pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
const clock=new THREE.Clock();let intro=0;
(function frame(){if(dead)return;raf=requestAnimationFrame(frame);if(!heroVis)return;
  const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;intro=Math.min(1,intro+dt*.45);const e=1-Math.pow(1-intro,3),sp=reduce?0:1;
  tx+=(mx-tx)*.04;ty+=(my-ty)*.04;root.rotation.y=t*.05*sp+tx*.5;root.rotation.x=ty*.3;pts.rotation.y=t*.03*sp;root.scale.setScalar(.6+.4*e);
  pm.opacity=.85*e*(1-scrollP*.7);rings.forEach((r,i)=>r.rotation.z+=dt*(.06+i*.03)*sp);
  beads.forEach(b=>{b.a+=dt*b.sp*sp;b.s.position.set(Math.cos(b.a)*b.R,Math.sin(b.a)*b.R,0)});
  core.material.opacity=(.55+Math.sin(t*1.2)*.08)*e;
  gl.forEach(o=>{o.a+=dt*o.sp*sp;o.s.position.set(Math.cos(o.a)*o.R,o.y+Math.sin(t*.5+o.ph)*.25,Math.sin(o.a)*o.R);o.s.material.opacity+=((o.target*e*(1-scrollP))-o.s.material.opacity)*.03});
  camera.position.y=-scrollP*2;camera.lookAt(0,-scrollP*1.2,0);renderer.render(scene,camera);})();

return ()=>{cleanup();try{renderer.dispose();}catch(e){}};
}
