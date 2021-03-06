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
        let slugs = ["thiefCases", "contact", "lawAndTradition", "medicalNeed", "overnightStay", 
                     "about", "languageBarrier", "safetyTips"];
        let languages = ["en-CA", "fr"];

        languages.forEach((lang) => {
            slugs.forEach((slug) => {
                fetch(`${DOMAIN}/api/textContent/${lang}/${slug}`)
                .then(response => response.json())
                .then(item => syncItem(item, "textContent", item.links[0].href))
                .catch((err) => {
                    console.log("[Service Worker] Error: " + err)
                });
            });
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

workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "d62891a104e54d9f535d4854b23ff818"
  },
  {
    "url": "favicon.png",
    "revision": "01ff11e2293ad5a91a781ef3d32db3c3"
  },
  {
    "url": "image/banner.jpg",
    "revision": "104681a0ea8c669dd500bf315ea81c1b"
  },
  {
    "url": "image/country/denmark.png",
    "revision": "d92793614923f4612a651e62f56bae93"
  },
  {
    "url": "image/country/morocco.png",
    "revision": "b378f96e611296787bdb167f993652e3"
  },
  {
    "url": "image/menuIcon/about.png",
    "revision": "3112f61afec1fad0dbf73f5ec2a97bbe"
  },
  {
    "url": "image/menuIcon/charity.png",
    "revision": "a5f30e6195a05b36366ecf9cd0443bc1"
  },
  {
    "url": "image/menuIcon/email.png",
    "revision": "0d1534c84d660e4216a4c571e98468eb"
  },
  {
    "url": "image/menuIcon/help.png",
    "revision": "9dc8818d652dba3055bcd64f58154878"
  },
  {
    "url": "image/menuIcon/libra.png",
    "revision": "a83480e690421491cbbf988ba83528e2"
  },
  {
    "url": "image/menuIcon/location.png",
    "revision": "0a6bde5f1b4e465f13e86bdbad4e4695"
  },
  {
    "url": "image/menuIcon/medicalNeed.png",
    "revision": "e624b9754fefb0ca2e1d35c3ed51b631"
  },
  {
    "url": "image/menuIcon/sleeping.png",
    "revision": "3c3f43ab92aa60bbf5199f61d1382e9f"
  },
  {
    "url": "image/menuIcon/speaking.png",
    "revision": "b5fd53c6b7204681b60ad1fd13a70204"
  },
  {
    "url": "image/menuIcon/thief.png",
    "revision": "e7252e82887acc465bcdb0a56ddeede6"
  },
  {
    "url": "index.html",
    "revision": "4cbe25b9a69bc172530eea58604e6e23"
  },
  {
    "url": "languageUI/en-CA.json",
    "revision": "0ce75f4d131e3050c1fa986c6de1732e"
  },
  {
    "url": "languageUI/fr.json",
    "revision": "41a7ce2dbe91b763c5415a11524f359b"
  },
  {
    "url": "manifest.json",
    "revision": "c9109c478ca95e49d44c1d33c3ebc1d4"
  },
  {
    "url": "precache-manifest.4183fa0ec22e51822c27d2690ebc7c82.js",
    "revision": "4183fa0ec22e51822c27d2690ebc7c82"
  },
  {
    "url": "static/css/2.a65d5813.chunk.css",
    "revision": "0f02bb75eea16478879545e864eab4da"
  },
  {
    "url": "static/css/main.263a3157.chunk.css",
    "revision": "29d01a0e537d599102f2249893f30ce2"
  },
  {
    "url": "static/js/2.1e5b29f7.chunk.js",
    "revision": "fb9a5fd4f3d07d966717c590cc58c4b6"
  },
  {
    "url": "static/js/main.1ae17cbc.chunk.js",
    "revision": "ec4b116c09a43c753dfbe0ab44464f93"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  },
  {
    "url": "static/media/ca.ce143108.svg",
    "revision": "ce1431089b9cba8ed19a763287a27bac"
  },
  {
    "url": "static/media/dk.eb1416e0.svg",
    "revision": "eb1416e02baeee91a39f721e871caf23"
  },
  {
    "url": "static/media/eu.ee7f4712.svg",
    "revision": "ee7f4712ac4553621d85503cb9a130e5"
  },
  {
    "url": "static/media/fr.b1156355.svg",
    "revision": "b1156355de9691d768df19a8a2b44da4"
  },
  {
    "url": "static/media/gb.4f1b7af5.svg",
    "revision": "4f1b7af5c0bae6aae85c3e7ba9401a85"
  },
  {
    "url": "static/media/ma.60fbc221.svg",
    "revision": "60fbc221d84de9fb44f0d70882a393fc"
  },
  {
    "url": "static/media/un.3835716f.svg",
    "revision": "3835716fbdb5281c231d2f31a29738bf"
  },
  {
    "url": "static/media/us.ae656592.svg",
    "revision": "ae65659236a7e348402799477237e6fa"
  },
  {
    "url": "sw-custom.js",
    "revision": "1e129995295b3877d2f3a73d0c8e5fc1"
  }
]);

