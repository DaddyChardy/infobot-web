if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/WKttWSGRV-BVHSYS2h2cr/_buildManifest.js",revision:"c8f2c2f9075ef06ffe18a20470d22aa3"},{url:"/_next/static/WKttWSGRV-BVHSYS2h2cr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/4bd1b696-aaf09b882924c802.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/565-e0c156166ef27da2.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/615-7f6005bc1af19d43.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/727-ba53257b7c1630a7.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/769-b79d4515a2f5e93e.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/822-8e29f4aaed7286c0.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/8e1d74a4-85d6017b3de5c51b.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/_not-found/page-82e4a9a907f86ecd.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-b849e557ff88fdff.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/chat/page-4c6775840ed00026.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/layout-b827b1b146401997.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/loading/page-5cfec3c48fa25c42.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/login/page-2ce8bf079bce3ff8.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/app/page-0713eaee7cc5d75e.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/bc9e92e6-3c776e94c695bc79.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/main-070c7d1080ef3681.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/main-app-d07b06e4b1d5b83d.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-946d03b9db350329.js",revision:"WKttWSGRV-BVHSYS2h2cr"},{url:"/_next/static/css/c0f853189f54c88e.css",revision:"c0f853189f54c88e"},{url:"/animation.gif",revision:"6369675f3cf227c0c64093180119f920"},{url:"/feedback/bad.png",revision:"736c94a89f0ae0e59f9074cc74f2f0ca"},{url:"/feedback/good.png",revision:"a3eb355400e4dc1a5d51194865d4bbb2"},{url:"/feedback/great.png",revision:"9836014470511250f7e9f15f78eff18b"},{url:"/feedback/neutral.png",revision:"83b6b6cc85669ba09d1bfeb01ae5ef37"},{url:"/feedback/terrible.png",revision:"fad0d21863486e9fef44e02f642d2954"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/google.png",revision:"ca5b86699d5f8425a65b19a8098e6ee5"},{url:"/icon-128x128.png",revision:"6853c7a4ebf3b6c01d5196a7830ab12a"},{url:"/icon-144x144.png",revision:"54127cbb4782feb1e0fe4f60e2d20cda"},{url:"/icon-152x152.png",revision:"6d58ba943458a13b18f2710424a1ab25"},{url:"/icon-192x192.png",revision:"961d0bc4c508777cf04d60f1198e8aee"},{url:"/icon-384x384.png",revision:"569cc193f7663e1023000f4c5cc84a3e"},{url:"/icon-512x512.png",revision:"b83974d7ef7da3535f05b92bd5d46c5d"},{url:"/icon-72x72.png",revision:"427480fb154c3887be278fd15cd77dae"},{url:"/icon-96x96.png",revision:"04a6a857bc1e65250921c80767613eb8"},{url:"/infobot.png",revision:"329701153a1d41ffc2d22f3aabdc26b4"},{url:"/manifest.json",revision:"f100973a8586b9c6bed6dc417e1306b2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
