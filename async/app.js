const paths={calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/>',book:'<path d="M12 7v14M12 7C9 4 5 4 2 5v14c4-1 7-1 10 2 3-3 6-3 10-2V5c-3-1-7-1-10 2Z"/>',play:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 8 6 4-6 4Z"/>',progress:'<path d="M4 20V10m8 10V4m8 16v-7M2 21h20"/>',chat:'<path d="M21 11a8 8 0 0 1-8 8H7l-5 3V7a5 5 0 0 1 5-5h6M17 2v6m-3-3h6M6 10h7M6 14h10"/>',check:'<path d="m5 12 4 4L19 6"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/>'};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`}
const areas=[{title:'היומן שלי',icon:'calendar',text:'כאן תוכלו לראות את מועדי המפגשים, לפתוח את פרטי האירוע ולהיכנס לקישור ה־<bdi>Zoom</bdi>.',shot:'היומן שלי',image:'assets/calendar.jpg'}, {title:'חומרי הקורס',icon:'book',text:'כאן תמצאו את חומרי הלמידה, המשימות, התרגולים, הסרטונים והמבחנים.',shot:'אזור התכנים בקורס',image:'assets/zfiya.jpg'}, {title:'הקלטות',icon:'play',text:'כאן תוכלו לחזור להקלטות ולחומרים ממפגשים קודמים, ככל שיהיו זמינים בקורס.',shot:'הקלטות',image:'assets/haklata.jpg'}, {title:'ההתקדמות שלי',icon:'progress',text:'תוכלו לראות אילו שיעורים השלמתם ובדרך כלל להמשיך מהנקודה שבה עצרתם.',shot:'ההתקדמות שלי',image:'assets/prog.jpg'}, {title:'סוכן ה־AI',icon:'chat',text:'סוכן הקורס יכול לענות על שאלות על בסיס חומרי הקורס ולעזור לכם למצוא את המקור הרלוונטי.',shot:'כפתור סוכן ה־AI',image:'assets/ai.jpg'}];
const stages=[{title:'ללמוד בזמן ובמקום שמתאימים לכם',label:'זמן ומקום',text:'פתחו את יחידות הלמידה העצמית בזמן ובמקום שמתאימים לכם והתקדמו בקצב שנוח לכם.',icon:'book',shot:'חומרי הלמידה העצמית בקורס',image:'assets/async/zman.jpg'},{title:'לעצור, לחזור ולהתקדם בקצב שלכם',label:'עוצרים וחוזרים',text:'עצרו כשצריך, חזרו על הסברים שלא היו ברורים והמשיכו רק כשאתם מרגישים מוכנים.',icon:'book',shot:'חזרה על הסברים בחומרי הקורס',image:'assets/async/stop.jpg'},{title:'לבדוק את ההבנה',label:'בדיקת הבנה',text:'ענו על שאלות ובצעו תרגולים ובדיקות הבנה כדי לוודא שהידע ברור ומוכן ליישום.',icon:'play',shot:'שאלות ותרגולים לבדיקת ההבנה',image:'assets/async/check.jpg'},{title:'להגיע מוכנים למפגשים החיים',label:'מפגש חי',text:'השלימו את היחידות והתרגולים מראש, והגיעו למפגש החי מוכנים לשאול, לתרגל ולקבל משוב.',icon:'calendar',shot:'הצטרפות למפגש החי',image:'assets/async/zoom.jpg'}];
document.querySelectorAll('bdi').forEach(label=>{if(label.textContent.trim()==='Elevation Hub'&&!label.classList.contains('elevation-hub'))label.outerHTML='<bdi class="elevation-hub"><span class="elevation-word">Elevation</span> <span class="hub-word">Hub</span></bdi>'});
const $=id=>document.getElementById(id);let mode='welcome',selected=null,step=0;
function visual(item,zoomable=false){if(item.image)return `<div class="visual screenshot${zoomable?' zoomable':''}"${zoomable?` data-lightbox-src="${item.image}" data-lightbox-alt="צילום מסך של ${item.shot}"`:''}><img class="screenshot-original" src="${item.image}" alt="צילום מסך של ${item.shot}" decoding="async">${zoomable?`<button class="image-zoom" type="button" aria-label="הגדלת התמונה" title="הגדלת התמונה"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/></svg></button>`:''}</div>`;return item.shot?`<div class="visual">${icon('image')}<span>מקום לצילום מסך · ${item.shot}</span><small>צילום המערכת יתווסף בהמשך</small></div>`:`<div class="visual icon-visual">${icon(item.icon)}</div>`}
const emptyDetails = $('details').innerHTML;
function selectArea(i){selected=i;document.querySelectorAll('.card').forEach((b,n)=>{b.classList.toggle('active',n===selected);b.setAttribute('aria-expanded',n===selected)});$('details').hidden=false;$('details').classList.toggle('details-empty',selected===null);$('details').setAttribute('aria-label',selected===null?'בחירת אזור להיכרות':'הסבר על האזור שנבחר');if(selected===null)$('details').innerHTML=emptyDetails;if(selected!==null){const a=areas[selected];$('details').innerHTML=`<div><h2>${a.title}</h2><p>${a.text}</p></div>${visual(a,true)}`}}
$('cards').innerHTML=areas.map((a,i)=>`<button class="card" aria-expanded="false" aria-controls="details" data-i="${i}"><span class="open-mark" aria-hidden="true">+</span>${icon(a.icon)}<h2>${a.title}</h2></button>`).join('');$('cards').addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)selectArea(Number(b.dataset.i))});
function renderStage(){const s=stages[step];const lastStep=stages.length-1;$('steps').innerHTML=stages.map((x,i)=>`<button class="step ${i===step?'active':i<step?'done':''}" data-step="${i}" aria-label="${x.title}${i<step?' — הושלם':''}" ${i===step?'aria-current="step"':''}><span class="num" aria-hidden="true">${i<step?icon('check'):i+1}</span><span class="step-label">${x.label}</span></button>`).join('');$('stage-panel').innerHTML=`<div><div class="stage-intro-label"><span aria-hidden="true"></span>ביחידות הלמידה העצמית תוכלו:</div><h2>${s.title}</h2><p>${s.text}</p></div>${visual(s)}`;$('next').innerHTML=(step===lastStep?'לסיכום':'הבא')+' <span aria-hidden="true">←</span>'}
$('steps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b){step=Number(b.dataset.step);renderStage();$('steps').children[step].focus()}});
let cardsGuidePlayed=false;
function show(view){mode=view;['welcome','home','flow','finish','ready'].forEach(id=>$(id).hidden=id!==view);document.querySelector('footer').hidden=view==='welcome';$('back').hidden=view==='home';$('footer-note').hidden=view!=='home';$('next').hidden=view==='ready';$('back').textContent='→ חזרה';if(view==='home'){$('next').innerHTML='איך הקורס מתנהל? <span aria-hidden="true">←</span>';if(!cardsGuidePlayed){cardsGuidePlayed=true;$('cards').classList.add('guide-once');window.setTimeout(()=>$('cards').classList.remove('guide-once'),3600)}}if(view==='flow')renderStage();if(view==='finish')$('next').innerHTML='מוכנים להתחיל <span aria-hidden="true">←</span>';if(view==='ready')$('back').textContent='→ חזרה להיכרות';const h=$(view).querySelector('h1');h.tabIndex=-1;h.focus({preventScroll:true})}
$('start-tour').onclick=()=>show('home');
$('next').onclick=()=>{if(mode==='home'){step=0;show('flow')}else if(mode==='flow'){if(step<stages.length-1){step++;renderStage()}else show('finish')}else if(mode==='finish')show('ready')};$('back').onclick=()=>{if(mode==='flow'&&step>0){step--;renderStage()}else if(mode==='flow')show('home');else if(mode==='ready')show('welcome');else if(mode==='finish'){step=stages.length-1;show('flow')}};
$('ready-icon').innerHTML=icon('check');

// Mobile-only full-screen explanations. Desktop handlers and layout stay intact.
const mobileViewport = window.matchMedia('(max-width: 700px)');
document.querySelector('.short-line').outerHTML = '<svg class="journey-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><path d="M16 5H7a4 4 0 0 0 0 8h10a3 3 0 0 1 0 6H8"/></svg>';
const cardsStyle = document.createElement('link');
cardsStyle.rel = 'stylesheet';
cardsStyle.href = 'cards.css?v=38';
document.head.append(cardsStyle);
// Compact outline icons used only on the home cards.
const cardSymbols = [
  '<rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6m10-6v6M3 10h18"/><circle cx="12" cy="15" r="1"/>',
  paths.book,
  '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
  '<path d="M4 21v-8m7 8V9m7 12V7M3 7l6-4 6 4 7-6"/>',
  '<rect x="3" y="4" width="18" height="12" rx="4"/><path d="m8 16-2 5m10-5 2 5"/><circle cx="8" cy="10" r=".5"/><circle cx="16" cy="10" r=".5"/>'
];
document.querySelectorAll('.card').forEach((card, index) => {
  card.querySelector('svg').innerHTML = cardSymbols[index];
  card.querySelector('.open-mark').remove();
});
const progressStyle = document.createElement('link');
progressStyle.rel = 'stylesheet';
progressStyle.href = 'progress.css?v=38';
document.head.append(progressStyle);
const mobileStyle = document.createElement('link');
mobileStyle.rel = 'stylesheet';
mobileStyle.href = 'mobile-details.css?v=38';
document.head.append(mobileStyle);
const balanceStyle = document.createElement('link');
balanceStyle.rel = 'stylesheet';
balanceStyle.href = 'balance.css?v=46';
document.head.append(balanceStyle);
const mobileDialog = document.createElement('dialog');
mobileDialog.className = 'mobile-explanation';
mobileDialog.setAttribute('aria-labelledby', 'mobile-explanation-title');
document.body.append(mobileDialog);
let mobileTrigger = null;
let mobileScroll = 0;
let priorBodyStyle = null;
function openMobileExplanation(index, trigger) {
  const area = areas[index];
  mobileTrigger = trigger;
  mobileScroll = window.scrollY;
  priorBodyStyle = document.body.getAttribute('style');
  mobileDialog.innerHTML = `<div class="mobile-explanation-bar"><bdi class="elevation-hub"><span class="elevation-word">Elevation</span> <span class="hub-word">Hub</span></bdi><button class="mobile-dismiss" autofocus aria-label="סגירת ההסבר וחזרה לכרטיסים">סגירה <span aria-hidden="true">×</span></button></div><div class="mobile-explanation-content"><span class="mobile-area-icon">${icon(area.icon)}</span><h2 id="mobile-explanation-title">${area.title}</h2><p>${area.text}</p>${visual(area,true)}<button class="mobile-return">→ חזרה לכל האזורים</button></div>`;
  mobileDialog.querySelectorAll('.mobile-dismiss,.mobile-return').forEach(button => button.onclick = () => mobileDialog.close());
  trigger.setAttribute('aria-expanded', 'true');
  trigger.setAttribute('aria-controls', 'mobile-area-dialog');
  mobileDialog.id = 'mobile-area-dialog';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${mobileScroll}px`;
  document.body.style.width = '100%';
  mobileDialog.showModal();
  mobileDialog.scrollTop = 0;
}
mobileDialog.addEventListener('close', () => {
  if (priorBodyStyle === null) document.body.removeAttribute('style');
  else document.body.setAttribute('style', priorBodyStyle);
  window.scrollTo(0, mobileScroll);
  if (mobileTrigger) {
    mobileTrigger.setAttribute('aria-expanded', String(Number(mobileTrigger.dataset.i) === selected));
    mobileTrigger.setAttribute('aria-controls', 'details');
    mobileTrigger.focus({preventScroll: true});
  }
});
$('cards').addEventListener('click', event => {
  const trigger = event.target.closest('[data-i]');
  if (!mobileViewport.matches || !trigger) return;
  event.stopImmediatePropagation();
  openMobileExplanation(Number(trigger.dataset.i), trigger);
}, true);
mobileViewport.addEventListener('change', () => {
  if (!mobileViewport.matches && mobileDialog.open) mobileDialog.close();
});

// Accessible image lightbox for the screenshots inside the area explanations.
const imageLightbox = document.createElement('dialog');
imageLightbox.className = 'image-lightbox';
imageLightbox.setAttribute('aria-label', 'תצוגה מוגדלת של התמונה');
imageLightbox.innerHTML = `<div class="lightbox-frame"><button class="lightbox-close" type="button" aria-label="סגירת התמונה">סגירה <span aria-hidden="true">×</span></button><img alt=""></div>`;
document.body.append(imageLightbox);
let lightboxTrigger = null;
function openImageLightbox(visual,trigger){
  lightboxTrigger=trigger;
  const image=imageLightbox.querySelector('img');
  image.src=visual.dataset.lightboxSrc;
  image.alt=visual.dataset.lightboxAlt;
  imageLightbox.showModal();
  imageLightbox.querySelector('.lightbox-close').focus();
}
document.addEventListener('click',event=>{
  const visual=event.target.closest('.visual.zoomable');
  if(!visual||imageLightbox.contains(event.target))return;
  if(event.target.closest('.image-zoom')||event.target.matches('.screenshot-original'))openImageLightbox(visual,event.target.closest('.image-zoom')||visual);
});
imageLightbox.querySelector('.lightbox-close').onclick=()=>imageLightbox.close();
imageLightbox.addEventListener('click',event=>{if(event.target===imageLightbox)imageLightbox.close()});
imageLightbox.addEventListener('close',()=>{imageLightbox.querySelector('img').removeAttribute('src');if(lightboxTrigger?.focus)lightboxTrigger.focus({preventScroll:true})});

// Open the orientation screen with My Calendar selected by default.
selectArea(0);
