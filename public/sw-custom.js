importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

function createDB() {
    let openRequest = indexedDB.open("movesDB", 1);
    openRequest.onupgradeneeded = function(event){
        let db = event.target.result;
        let store = db.createObjectStore("textContent");
    }
}

addEventListener('install', function(event) {
    console.log("[Service Woker] Installing...");
    event.waitUntil(createDB());
});
   

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
            request.onsuccess = function(event) {
                let data = JSON.stringify(event.target.result);
                return resolve(new Response(data, { headers: { 'content-type':'text/plain' } })); 
            };
        };
    });
}

workbox.routing.registerRoute(
    new RegExp('http://localhost:8080/api/textContent/.*$'),
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
    new RegExp('https://moves-teamc-baa.herokuapp.com/api/phoneNumber/.*$'),
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
