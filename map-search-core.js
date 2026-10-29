/* Nature Value Map search integration — single-request, on-demand map navigation.
 * Provider: public ArcGIS World Geocoder (findAddressCandidates, non-stored).
 * The caller must only use this for map display, not for persistent storage. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.NVMPlaceSearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var SERVICE='https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
  function normalizeQuery(value){
    var q=String(value==null?'':value).trim().replace(/\s+/g,' ');
    if(q.length<3||q.length>180)throw new Error('Enter an address, park, or place name (3–180 characters).');
    return q;
  }
  function buildUrl(value){
    var q=normalizeQuery(value);
    var qs=new URLSearchParams({
      SingleLine:q,
      f:'json',
      maxLocations:'5',
      forStorage:'false',
      outFields:'Addr_type',
      sourceCountry:'USA',
      location:'-97.8772,29.9891'
    });
    return SERVICE+'?'+qs.toString();
  }
  function matches(data){
    if(!data || typeof data!=='object')throw new Error('Invalid search response.');
    if(data.error)throw new Error('The map search service is unavailable right now.');
    if(!Array.isArray(data.candidates))throw new Error('No valid search results were returned.');
    return data.candidates.map(function(c){
      var lon=c&&c.location?Number(c.location.x):NaN;
      var lat=c&&c.location?Number(c.location.y):NaN;
      var score=c?Number(c.score):NaN;
      var label=String(c&&c.address||'').trim();
      if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat<-90||lat>90||lon<-180||lon>180||!label||!Number.isFinite(score)||score<60)return null;
      return {label:label,lat:lat,lon:lon,score:score,type:String(c.attributes&&c.attributes.Addr_type||'')};
    }).filter(Boolean).slice(0,5);
  }
  return {SERVICE:SERVICE,normalizeQuery:normalizeQuery,buildUrl:buildUrl,matches:matches};
});
