const V='fl-shell-v60',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url); if(r.method!=='GET')return;
  const own=u.origin===location.origin&&!u.pathname.includes('/data/');
  const lib=/cdnjs\.cloudflare\.com|unpkg\.com/.test(u.host);
  if(!own&&!lib)return; // GitHub API / templates: always live
  if(r.mode==='navigate'||u.pathname.endsWith('index.html')){ // app page: newest first, cached when offline
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x;}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c));}return x;})));
});
