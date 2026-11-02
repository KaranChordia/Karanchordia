/* Work page: Kramaniti screens, Films and HowDramaTech galleries. No iframe loads until a play click. */
(function(){
var NOMAX='8ZNefYXLBic 9MJBSlmpxhk EBQh6jl8xBs IJ18KWAQOnM LTiwYFvMq9Y NK5Qv5GO1Q8 P-288osiXGs QpUs2IMGLdU SY-uzu2wO_A Yr8yoo9c4Yo ZP6kL5MrEOU cB9qFKEuX68 d3zQ_0ZSwOI iHbB2w0ZIj4 iJ5doZcuVfs j3FRxod3W1M jr5UGK40O3A kUSnBZOgZ4A n6n8ujp_wcc oadIJYlIWwg p-R208dvoHk qnXSmFkxngM uAENz7kpCxc v73lbF-nhrk zgtJzGoZh5Q'.split(' ');
function poster(id){return 'https://i.ytimg.com/vi/'+id+'/'+(NOMAX.indexOf(id)<0?'maxresdefault':'hqdefault')+'.jpg'}
function small(id){return 'https://i.ytimg.com/vi/'+id+'/mqdefault.jpg'}
function txt(n){return n?n.textContent.replace(/\s+/g,' ').trim():''}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pad(n){return String(n).padStart(2,'0')}
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Kramaniti feature: swap screens */
var kc=document.querySelector('.kc-stage');
if(kc){var main=kc.querySelector('.kc-main');kc.querySelectorAll('.kc-thumbs button').forEach(function(b,_,all){b.addEventListener('click',function(){main.src=b.dataset.src;main.alt=b.dataset.alt;all.forEach(function(x){x.setAttribute('aria-current',x===b)})})})}

/* Player dialog, shared */
var pl=document.createElement('div');pl.className='vg-player';pl.hidden=true;pl.setAttribute('role','dialog');pl.setAttribute('aria-modal','true');pl.setAttribute('aria-labelledby','vg-player-title');
pl.innerHTML='<div class="vg-player-box"><div class="vg-player-head"><p id="vg-player-title"></p><button type="button" class="wg-btn vg-close" aria-label="Close player">✕</button></div><div class="vg-player-frame"></div><a class="wg-link vg-player-yt" target="_blank" rel="noopener">Watch on YouTube <span aria-hidden="true">↗</span></a></div>';
document.body.appendChild(pl);var plRet=null,plFrame=pl.querySelector('.vg-player-frame');
function openPlayer(it){plRet=document.activeElement;pl.querySelector('#vg-player-title').textContent=it.t;var a=pl.querySelector('.vg-player-yt');a.href=it.url;
 var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+it.id+'?autoplay=1&rel=0';f.title=it.t;f.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';f.allowFullscreen=true;f.width=1280;f.height=720;
 plFrame.innerHTML='';plFrame.appendChild(f);pl.hidden=false;document.documentElement.style.overflow='hidden';pl.querySelector('.vg-close').focus()}
function closePlayer(){pl.hidden=true;plFrame.innerHTML='';document.documentElement.style.overflow='';if(plRet)plRet.focus()}
pl.querySelector('.vg-close').addEventListener('click',closePlayer);
pl.addEventListener('click',function(e){if(e.target===pl)closePlayer()});
pl.addEventListener('keydown',function(e){if(e.key==='Escape'){closePlayer();return}
 if(e.key==='Tab'){var f=[pl.querySelector('.vg-close'),plFrame.querySelector('iframe'),pl.querySelector('.vg-player-yt')].filter(Boolean),a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){z.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===z){a.focus();e.preventDefault()}}});

/* Generic video gallery */
function build(root,items,cats,o){
 var STRIP=6,STEP=8,cat=cats[0].k,list=items,i=0,shown=STEP;
 root.innerHTML='<div class="wg-stage"><div class="wg-glow" aria-hidden="true"></div><div class="wg-frame"><div class="wg-bar" aria-hidden="true"><i></i><i></i><i></i><span class="wg-url"></span></div>'+
 '<div class="vg-view" role="region" aria-roledescription="carousel" tabindex="0" aria-label="'+esc(o.label)+'. Use arrow keys to browse."><div class="vg-poster"></div>'+
 '<button type="button" class="vg-play"><span class="vg-play-i" aria-hidden="true"></span><span class="vg-play-t"></span></button>'+
 '<button class="wg-btn prev" type="button" aria-label="Previous film">←</button><button class="wg-btn next" type="button" aria-label="Next film">→</button></div>'+
 '<div class="wg-capbar"><p class="wg-cap"></p><span class="wg-count" aria-hidden="true"></span></div><div class="wg-prog" aria-hidden="true"><span></span></div></div>'+
 '<div class="vg-strip"><button type="button" class="vg-page pp" aria-label="Earlier films">‹</button><div class="wg-thumbs" role="group" aria-label="Films in this category"></div><button type="button" class="vg-page pn" aria-label="Later films">›</button></div></div>'+
 '<div class="wg-info"><div class="vg-chips" role="group" aria-label="'+esc(o.chipsLabel)+'"></div><div class="wg-meta" aria-live="polite"><span class="wg-num"></span><h3 class="wg-title"></h3><p class="wg-line"></p><p class="wg-role"></p><a class="wg-link" target="_blank" rel="noopener"></a></div>'+
 '<ol class="vg-list" aria-label="'+esc(o.listLabel)+'"></ol><button type="button" class="vg-more"></button></div>';
 var $=function(q){return root.querySelector(q)},view=$('.vg-view'),post=$('.vg-poster'),play=$('.vg-play'),thumbs=$('.wg-thumbs'),ol=$('.vg-list'),more=$('.vg-more'),chips=$('.vg-chips'),meta=$('.wg-meta');
 var stage=$('.wg-stage');
 cats.forEach(function(c){var n=c.k==='all'?items.length:items.filter(function(x){return x.cat===c.k}).length;var b=document.createElement('button');b.type='button';b.className='vg-chip';b.setAttribute('aria-pressed',c.k===cat);b.innerHTML=esc(c.l);b.addEventListener('click',function(){setCat(c.k)});chips.appendChild(b)});
 function setCat(k){cat=k;list=k==='all'?items:items.filter(function(x){return x.cat===k});shown=STEP;chips.querySelectorAll('.vg-chip').forEach(function(b,j){b.setAttribute('aria-pressed',cats[j].k===k)});renderList();go(0,true)}
 function renderList(){ol.innerHTML='';list.slice(0,shown).forEach(function(it,j){var li=document.createElement('li');li.innerHTML='<button type="button" class="vg-item" aria-pressed="false"><span class="t">'+esc(it.t)+'</span><span class="c">'+esc(it.client)+'</span></button>';li.firstChild.addEventListener('click',function(){go(j);if(innerWidth<901)stage.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'})});ol.appendChild(li)});
  var left=list.length-shown;more.hidden=left<=0;more.textContent='Show more';mark()}
 more.addEventListener('click',function(){var first=shown;shown+=STEP;renderList();var b=ol.querySelectorAll('.vg-item')[first];if(b)b.focus()});
 function mark(){ol.querySelectorAll('.vg-item').forEach(function(b,j){b.setAttribute('aria-pressed',j===i)})}
 function strip(){thumbs.innerHTML='';var start=Math.floor(i/STRIP)*STRIP;list.slice(start,start+STRIP).forEach(function(it,k){var j=start+k,d=document.createElement('button');d.type='button';d.className='wg-dot vg-dot';d.setAttribute('aria-current',j===i);d.setAttribute('aria-label',(j+1)+' of '+list.length+': '+it.t);
   d.innerHTML=it.id?'<img src="'+small(it.id)+'" alt="" width="160" height="90" loading="lazy" decoding="async">':'<span class="vg-mini">'+esc(it.short||it.t)+'</span>';d.addEventListener('click',function(){go(j)});thumbs.appendChild(d)});
  $('.pp').disabled=start===0;$('.pn').disabled=start+STRIP>=list.length;$('.vg-strip').classList.toggle('single',list.length<=STRIP)}
 $('.pp').addEventListener('click',function(){go(Math.max(0,Math.floor(i/STRIP)*STRIP-STRIP))});
 $('.pn').addEventListener('click',function(){go(Math.min(list.length-1,Math.floor(i/STRIP)*STRIP+STRIP))});
 function go(k,quiet){var n=list.length;i=(k+n)%n;var it=list[i];if(i>=shown){shown=Math.ceil((i+1)/STEP)*STEP;renderList()}
  post.classList.add('out');var img;
  if(it.id){img=new Image();img.alt='';img.width=1280;img.height=720;img.decoding='async';img.src=poster(it.id)}
  var swap=function(){post.innerHTML='';if(img)post.appendChild(img);else post.innerHTML='<div class="vg-type"><span class="mono">'+esc(it.client)+'</span><strong>'+esc(it.t)+'</strong></div>';post.classList.remove('out')};
  if(rm||quiet===true)swap();else setTimeout(swap,180);
  play.setAttribute('aria-label',(it.id?'Play ':'Watch on '+it.ext+': ')+it.t);$('.vg-play-t').textContent=it.id?'Play film':'Watch on '+it.ext;play.classList.toggle('ext',!it.id);
  $('.wg-cap').textContent=it.t;$('.wg-count').textContent='';$('.wg-prog span').style.width=((i+1)/n*100)+'%';$('.wg-url').textContent=(it.id?'youtube.com':it.ext.toLowerCase()+'.com')+' / '+it.client.toLowerCase();
  $('.wg-num').textContent='';$('.wg-title').textContent=it.t;$('.wg-line').textContent=it.line;$('.wg-role').textContent=it.client+(it.year?' · '+it.year:'');
  var a=$('.wg-link');a.href=it.url;a.innerHTML=(it.id?'Watch on YouTube':'Watch on '+it.ext)+' <span aria-hidden="true">↗</span>';a.setAttribute('aria-label',(it.id?'Watch on YouTube: ':'Watch on '+it.ext+': ')+it.t+' (opens in a new tab)');
  strip();mark()}
 play.addEventListener('click',function(){var it=list[i];if(it.id)openPlayer(it);else window.open(it.url,'_blank','noopener')});
 $('.prev').addEventListener('click',function(){go(i-1)});$('.next').addEventListener('click',function(){go(i+1)});
 view.addEventListener('keydown',function(e){if(e.target!==view)return;if(e.key==='ArrowLeft'){go(i-1);e.preventDefault()}else if(e.key==='ArrowRight'){go(i+1);e.preventDefault()}});
 var sx=null;view.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')sx=e.clientX});
 view.addEventListener('pointerup',function(e){if(sx===null)return;var d=e.clientX-sx;sx=null;if(Math.abs(d)>50)go(i+(d<0?1:-1))});
 view.addEventListener('pointercancel',function(){sx=null});
 setCat(cat);root.hidden=false;root.closest('section').classList.add('vg-ready');
}

/* Films data, read from the fallback markup */
var fs=document.querySelector('#films [data-vg="films"]');
if(fs){var sec=fs.closest('section'),items=[];
 sec.querySelectorAll('.vg-fallback a.video-piece').forEach(function(a){var id=(a.href.match(/[?&]v=([^&]+)/)||[])[1];var client=txt(a.querySelector('.video-meta')).replace(/^\d+\s*\/\s*/,'');var t=txt(a.querySelector('h3'));
  var alt=(a.querySelector('img')||{}).alt||'';var aerial=/drone/i.test(alt);
  items.push({id:id,url:a.href,t:t,client:client,cat:aerial?'aerial':(/^Wolves/.test(client)?'wolves':/^Nexocean/.test(client)?'nexocean':'other'),
   line:aerial?'A drone film, published on '+client+'.':'Made for '+client+', kept as it was published.'})});
 var ae=sec.querySelector('[data-aerial]');if(ae){var link=ae.querySelector('a[href]');
  items.push({id:null,ext:'AirVuz',url:link.href,t:txt(ae.querySelector('h3')).replace(/,\s*/,', '),short:'Bangalore, from above',client:'Visual storytelling',year:'2019',cat:'aerial',
   line:txt(ae.querySelector('.thread-lede'))+' '+txt(ae.querySelector('.thread-details p'))})}
 build(fs,items,[{k:'all',l:'All'},{k:'wolves',l:'Wolves'},{k:'nexocean',l:'Nexocean'},{k:'aerial',l:'Aerial'}],{label:'Films',chipsLabel:'Filter films by client',listLabel:'Films'})}

/* HowDramaTech data */
var hs=document.querySelector('#howdramatech [data-vg="hdt"]');
if(hs){var hsec=hs.closest('section'),fb=hsec.querySelector('.vg-fallback'),grids=fb.querySelectorAll(':scope > .lite-grid'),rest=fb.querySelector('details .lite-grid'),hi=[];
 var note=txt(fb.querySelector('.archive-gateway-note'));
 function grab(g,k,line){if(!g)return;g.querySelectorAll('.lite-yt-btn').forEach(function(b){var p=b.closest('.video-piece');var c=txt(p.querySelector('.video-meta')).replace(/^\d+\s*\/\s*/,'');
  hi.push({id:b.dataset.id,url:'https://www.youtube.com/watch?v='+b.dataset.id,t:txt(p.querySelector('h3')),client:c,cat:k,line:line})})}
 grab(grids[0],'fav','One of a few favourites from HowDramaTech.');grab(grids[1],'wework',note);grab(rest,'rest','From the rest of the channel.');
 build(hs,hi,[{k:'fav',l:'Favourites'},{k:'wework',l:'WeWork India'},{k:'rest',l:'Rest of the channel'}],{label:'HowDramaTech videos',chipsLabel:'Choose a group of videos',listLabel:'Videos in this group'})}
})();
(function(){if(!window.ResizeObserver)return;document.querySelectorAll('.vg .wg-stage, .kc-stage').forEach(function(s){new ResizeObserver(function(){s.style.setProperty('--wgw',s.clientWidth+'px')}).observe(s)})})();
