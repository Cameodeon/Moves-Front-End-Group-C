importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

let DOMAIN = 'https://movesws-teamc-baa.herokuapp.com';

function createDB() {
    let openRequest = indexedDB.open("movesDB", 1);
    openRequest.onupgradeneeded = function (event) {
        let db = event.target.result;
        db.createObjectStore("textContent");
        db.createObjectStore("phoneNumber");
    }
}

addEventListener('install', function (event) {
    console.log("[Service Woker] Installing...");
    event.waitUntil(createDB());
    preCacheDB();
});

function preCacheDB() {
        let languages = ["en-CA", "fr"];

        languages.forEach((lang) => {

            fetch(`${DOMAIN}/api/textContent/${lang}/thiefCases`)
                .then((item) => { 
                    console.log(item);
                    return syncItem(item, "textContent", item.links[0].href) 
                })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/contact`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/lawAndTradition`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/medicalNeed`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/overnightStay`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/about`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/languageBarrier`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .then(() => {
                    return fetch(`${DOMAIN}/api/textContent/${lang}/safetyTips`)
                })
                .then(item => { return syncItem(item, "textContent", item.links[0].href) })
                .catch((err) => {
                    reject("[Service Worker] Could not precache database: " + err);
                })
        });
}




function syncItem(item, table, key) {
    let open = indexedDB.open("movesDB", 1);

    return new Promise(resolve => {
        open.onsuccess = evt => {
            let db = open.result;
            let tran = db.transaction(table, "readwrite");
            let objStore = tran.objectStore(table);
            objStore.add(item, key).onsuccess = resolve;
        };
    });
}

function readTable(table, key) {
    let open = indexedDB.open("movesDB", 1);

    return new Promise(resolve => {
        open.onsuccess = event => {
            let db = open.result;
            let tran = db.transaction(table);
            let objStore = tran.objectStore(table);
            let request = objStore.get(key);
            request.onsuccess = function (event) {
                let data = JSON.stringify(event.target.result);
                return resolve(new Response(data, { headers: { 'content-type': 'text/plain' } }));
            };
        };
    });
}

workbox.routing.registerRoute(
    new RegExp(`${DOMAIN}/api/textContent/.*$`),
    ({ url, event }) => {
        console.log(url.pathname);
        return fetch(event.request)
            .then((res) => {
                let clonedRes = res.clone();
                return clonedRes.json()
                    .then((data) => {
                        syncItem(data, "textContent", url.pathname);
                    })
                    .then(() => {
                        return res;
                    });

            })
            .catch(err => {
                return readTable("textContent", url.pathname);
            });
    },
    "GET"
);

workbox.routing.registerRoute(
    new RegExp(`${DOMAIN}/api/phoneNumber/.*$`),
    ({ url, event }) => {
        console.log(url.pathname);
        return fetch(event.request)
            .then((res) => {
                let clonedRes = res.clone();
                return clonedRes.json()
                    .then((data) => {
                        syncItem(data, "phoneNumber", url.pathname);
                    })
                    .then(() => {
                        return res;
                    });

            })
            .catch(err => {
                return readTable("phoneNumber", url.pathname);
            });
    },
    "GET"
);

workbox.precaching.precacheAndRoute([]);

