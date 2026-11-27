(function(w,d,s,l,i){
// Skip tracking on local development hosts; add ?gtm_debug to the URL to load GTM anyway (GTM preview).
var isLocal=/^(localhost|127(\.\d+){3}|\[?::1\]?|.+\.(localhost|local))$/.test(w.location.hostname);
if(isLocal&&!/[?&]gtm_debug(=|&|$)/.test(w.location.search))return;
w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4RVNG3')
