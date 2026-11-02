(function(){
var root=document.getElementById('work-gallery');if(!root)return;
function S(f,w,h,c){return{f:f,w:w,h:h,c:c}}
var P=[
{n:'01',t:'Kramaniti',u:'case-kramaniti.html',l:'Make a complex practice understandable',r:'UX, content structure, frontend',d:'kramaniti',s:[S('home',1707,960,'Homepage showing its dark and gold narrative system'),S('problem',1707,960,'Problem framing screen'),S('method',1707,960,'Method screen')]},
{n:'02',t:'Kosh',u:'case-kosh.html',l:'Make structured knowledge findable and adaptable',r:'Product UX, IA, frontend',d:'kosh',s:[S('library',1707,960,'Resource library interface'),S('resource',1707,960,'Resource detail interface'),S('create',1568,1023,'Create interface')]},
{n:'03',t:'Maitri',u:'case-maitri.html',l:'Build a world people can enter',r:'Website UX, interaction, frontend',d:'maitri',s:[S('home',1280,720,'Story-led homepage'),S('manu',1280,720,'Manu character introduction'),S('library',1280,720,'Story library interface')]},
{n:'04',t:'Saha',u:'case-saha.html',concept:1,l:'Make a small stay feel looked after',r:'Concept, strategy, UX and UI · Concept with fictional demo data',d:'saha',s:[S('01-overview',2000,1250,'Main screen'),S('02-guests',2000,1250,'Who is home'),S('03-requests',2000,1250,'Requests in one place'),S('04-experiences',2000,1250,'Local experiences'),S('05-insights',2000,1250,'A clearer picture'),S('06-house-switcher',2000,1250,'More than one house'),S('08-mobile',780,1688,'On a phone')]},
{n:'05',t:'Artha',u:'case-artha.html',l:'Make an investment idea testable',r:'Concept, strategy, UX and UI · Built for one investor, prepared research',d:'artha',s:[S('01-discover-short',2000,1250,'Main screen'),S('02-discover-long',2000,1250,'Ten-year lens'),S('03-watchlist-empty',2000,1250,'A watchlist that waits'),S('04-research-lens',2000,1250,'What to verify'),S('05-assistant',2000,1250,'Ask the research'),S('06-assistant-compare-horizons',2000,1250,'Compare horizons'),S('07-mobile',780,1688,'On a phone')]},
{n:'06',t:'Hatch',u:'case-hatch.html',concept:1,l:'Make launching a product less scattered',r:'Concept demo, product UX and UI · Fictional makers and sample data',d:'hatch',s:[S('01-home',1800,1125,'Main screen'),S('02-aria',1800,1125,'Guided onboarding'),S('03-makers',1800,1125,'Find a maker'),S('04-requests',1800,1125,'Sample requests'),S('05-loop-mentor',1800,1125,'Conversations and a mentor'),S('06-session',1800,1125,'A practice session'),S('07-mobile',780,1688,'On a phone')]}];
function src(p,s){return 'assets/work/'+p.d+'/'+s.f+'.jpg'}
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var pi=0,si=0,first=true;
root.innerHTML='<div class="wg-stage"><div class="wg-glow" aria-hidden="true"></div><div class="wg-frame"><div class="wg-bar" aria-hidden="true"><i></i><i></i><i></i><span class="wg-url"></span></div><div class="wg-view" role="region" aria-roledescription="carousel" tabindex="0" aria-label="Project screenshots. Use arrow keys to browse."><div class="wg-track"></div>'+
'<button class="wg-btn prev" type="button" aria-label="Previous screenshot">←</button><button class="wg-btn next" type="button" aria-label="Next screenshot">→</button></div>'+
'<div class="wg-capbar"><p class="wg-cap" aria-live="polite"></p><span class="wg-count" aria-hidden="true"></span></div><div class="wg-prog" aria-hidden="true"><span></span></div></div>'+
'<div class="wg-thumbs" role="group" aria-label="Screenshots in this project"></div></div>'+
'<div class="wg-info"><div class="wg-meta" aria-live="polite"><span class="wg-num"></span><h3 class="wg-title"></h3><p class="wg-line"></p><p class="wg-role"></p><a class="wg-link" href="#">Read the case study <span aria-hidden="true">↗</span></a></div><ul class="wg-list" aria-label="Choose a project"></ul></div>';
var $=function(q){return root.querySelector(q)},track=$('.wg-track'),view=$('.wg-view'),frame=$('.wg-frame'),dots=$('.wg-thumbs'),prog=$('.wg-prog span'),meta=$('.wg-meta');
var list=$('.wg-list');
P.forEach(function(p,i){var li=document.createElement('li');li.innerHTML='<button type="button" class="wg-pick" aria-pressed="false"><img src="'+src(p,p.s[0])+'" alt="" width="96" height="60" loading="lazy"><span><strong>'+p.t+'</strong>'+(p.concept?' <span class="wg-badge" style="margin-left:.3rem">Concept</span>':'')+'</span></button>';li.firstChild.addEventListener('click',function(){pick(i)});list.appendChild(li)});
function pick(i){pi=i;si=0;var p=P[i];
 list.querySelectorAll('.wg-pick').forEach(function(b,j){b.setAttribute('aria-pressed',j===i)});
 meta.classList.add('fade');setTimeout(function(){
  $('.wg-num').textContent='';
  $('.wg-title').innerHTML=p.t+(p.concept?'<span class="wg-badge">Concept</span>':'');
  $('.wg-line').textContent=p.l;$('.wg-role').textContent=p.r;var a=$('.wg-link');a.href=p.u;a.setAttribute('aria-label','Read the '+p.t+' case study');
  meta.classList.remove('fade')},first||rm?0:200);
 track.style.transition='none';track.innerHTML='';dots.innerHTML='';
 p.s.forEach(function(s,k){var b=document.createElement('button');b.type='button';b.className='wg-slide';b.setAttribute('aria-label','Open larger: '+p.t+', '+s.c);
  var im=new Image();im.src=src(p,s);im.alt=p.t+': '+s.c;im.width=s.w;im.height=s.h;im.decoding='async';if(!(first&&k===0))im.loading='lazy';if(s.h>s.w)im.className='tall';
  b.appendChild(im);b.addEventListener('click',function(){if(!moved)openLb(k)});track.appendChild(b);
  var d=document.createElement('button');d.type='button';d.className='wg-dot';d.setAttribute('aria-label','Screenshot '+(k+1)+' of '+p.s.length+': '+s.c);d.innerHTML='<img src="'+src(p,s)+'" alt="" width="120" height="75" loading="lazy">';d.addEventListener('click',function(){go(k)});dots.appendChild(d)});
 first=false;go(0);track.offsetWidth;track.style.transition='';}
function go(k){var p=P[pi],n=p.s.length;si=(k+n)%n;track.style.transform='translateX('+(-100*si)+'%)';
 dots.querySelectorAll('.wg-dot').forEach(function(d,j){d.setAttribute('aria-current',j===si)});
 $('.wg-count').textContent='';
 $('.wg-cap').textContent=p.s[si].c;prog.style.width=((si+1)/n*100)+'%';$('.wg-url').textContent=p.t.toLowerCase()+' / '+p.s[si].c.toLowerCase();
 [].forEach.call(track.querySelectorAll('.wg-slide'),function(b,j){b.tabIndex=j===si?0:-1;b.setAttribute('aria-hidden',j!==si)});
 var nx=p.s[(si+1)%n];var pre=new Image();pre.src=src(p,nx);}
$('.prev').addEventListener('click',function(){go(si-1)});$('.next').addEventListener('click',function(){go(si+1)});
view.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){go(si-1);e.preventDefault()}else if(e.key==='ArrowRight'){go(si+1);e.preventDefault()}});
var sx=null,moved=false,dx=0;
view.addEventListener('pointerdown',function(e){sx=e.clientX;dx=0;moved=false;view.classList.add('drag');track.style.transition='none'});
window.addEventListener('pointermove',function(e){if(sx===null)return;dx=e.clientX-sx;if(Math.abs(dx)>6)moved=true;track.style.transform='translateX(calc('+(-100*si)+'% + '+dx+'px))'});
window.addEventListener('pointerup',function(){if(sx===null)return;sx=null;view.classList.remove('drag');track.style.transition='';if(dx<-50)go(si+1);else if(dx>50)go(si-1);else go(si);setTimeout(function(){moved=false},0)});
if(fine&&!rm){root.querySelector('.wg-stage').addEventListener('pointermove',function(e){if(sx!==null)return;var r=frame.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;frame.style.transform='rotateY('+(x*5)+'deg) rotateX('+(-y*4)+'deg)'});
 root.querySelector('.wg-stage').addEventListener('pointerleave',function(){frame.style.transform=''})}
// lightbox
var lb=document.createElement('div');lb.className='wg-lb';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Screenshot viewer');
lb.innerHTML='<button class="wg-btn close" type="button" aria-label="Close viewer">✕</button><button class="wg-btn prev" type="button" aria-label="Previous screenshot">←</button><img alt=""><p aria-live="polite"></p><button class="wg-btn next" type="button" aria-label="Next screenshot">→</button>';
document.body.appendChild(lb);var lbi=lb.querySelector('img'),lbc=lb.querySelector('p'),ret=null;
function lbShow(){var p=P[pi],s=p.s[si];lbi.src=src(p,s);lbi.alt=p.t+': '+s.c;lbi.width=s.w;lbi.height=s.h;lbc.textContent=p.t+' · '+s.c}
function openLb(k){ret=document.activeElement;go(k);lbShow();lb.hidden=false;document.documentElement.style.overflow='hidden';lb.querySelector('.close').focus()}
function closeLb(){lb.hidden=true;document.documentElement.style.overflow='';if(ret)ret.focus()}
lb.querySelector('.close').addEventListener('click',closeLb);
lb.querySelector('.prev').addEventListener('click',function(){go(si-1);lbShow()});lb.querySelector('.next').addEventListener('click',function(){go(si+1);lbShow()});
lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
lb.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();else if(e.key==='ArrowLeft'){go(si-1);lbShow()}else if(e.key==='ArrowRight'){go(si+1);lbShow()}else if(e.key==='Tab'){var f=lb.querySelectorAll('button'),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){z.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===z){a.focus();e.preventDefault()}}});
var lx=null;lb.addEventListener('pointerdown',function(e){lx=e.clientX});lb.addEventListener('pointerup',function(e){if(lx===null)return;var d=e.clientX-lx;lx=null;if(Math.abs(d)>50){go(si+(d<0?1:-1));lbShow()}});
root.hidden=false;document.documentElement.classList.add('js-gallery');pick(0);
})();
(function(){var s=document.querySelector('.wg-stage');if(!s||!window.ResizeObserver)return;new ResizeObserver(function(){s.style.setProperty('--wgw',s.clientWidth+'px')}).observe(s)})();
