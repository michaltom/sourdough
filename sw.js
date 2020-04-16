const assets = [ '/', '/index.html', '/style.css', '/main.js' ];
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('sourdough-app-shell').then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
