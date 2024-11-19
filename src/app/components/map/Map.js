import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, Dimensions, Platform, Linking, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import RNGeolocation from 'react-native-geolocation-service';
import { checkLocationAccept, requestLocationAccept } from '../../utils/permissionsDevice';
import useDidMount from '../../utils/useDidMount';

function Map(props) {
  const didMount = useDidMount();
  const myWebViewRef = useRef(null);
  const [location, setLocation] = useState({
    location: '',
    latitude: '',
    longitude: '',
  });

  const init = async () => {
    let checkPermissions = await checkLocationAccept();
    if (checkPermissions != true) {
      await requestLocationAccept();
    }else{
      getLocation();
    }
  }

  useEffect(() => {
    if (didMount) {
      init();
    }
    const backAction = () => { return true };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction);
    return () => backHandler.remove();
  }, []);

  const getLocation = async () => {
    await RNGeolocation.getCurrentPosition(
      (position) => {
        const latitude = toFixed(position.coords.latitude, 6);
        const longitude = toFixed(position.coords.longitude, 6);

        setLocation(_state => ({
          ..._state,
          location: position,
          latitude: latitude,
          longitude: longitude,
        }));
      },
      error => {
        console.log(error);
      },
      //{ enableHighAccuracy: false },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const onWebViewMessage = event => {
    let objMsg = JSON.parse(event.nativeEvent.data);
    if (
      objMsg.lat == '' ||
      (objMsg.lat == null && objMsg.long == '') ||
      objMsg.long == null
    ) {
      Alert.alert(
        'Warning message!',
        'Unable to check route Due to not finding a job position.',
      );
    } else {
      Linking.openURL(
        'https://www.google.com/maps?q=' + objMsg.lat + ',' + objMsg.long,
      );
    }
  };

  const toFixed = (num, pre) => {
    num *= Math.pow(10, pre);
    num =
      (Math.round(num, pre) + (num - Math.round(num, pre) >= 0.5 ? 1 : 0)) /
      Math.pow(10, pre);
    return num.toFixed(pre);
  };

  return (
    <WebView
      originWhitelist={['*']}
      ref={myWebViewRef}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      scalesPageToFit
      scrollEnabled={false}
      mixedContentMode={'always'}
      useWebKit={Platform.OS == 'ios'}
      allowUniversalAccessFromFileURLs={true}
      source={{
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Simple Leaflet Map</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
            <link rel="stylesheet" href="https://smart1662.pwa.co.th/smapilab/Scripts/L.Icon.Pulse.2.css"/>
            <link rel="stylesheet" href="https://smart1662.pwa.co.th/smapilab/Scripts/bootstrap.min.css">
            <link rel="stylesheet" href="https://smart1662.pwa.co.th/smapilab/Scripts/leaflet.awesome-markers.css">
            <link rel="stylesheet" href="https://smart1662.pwa.co.th/smapilab/Scripts/font-awesome.min.css">
        
            <style>
            body {
                padding: 0;
                margin: 0;
            }
            html, body, #map {
                height: 100%;
                width: 100vw;
            }
        
            /* css to customize Leaflet default styles  */
            .custom .leaflet-popup-tip,
            .custom .leaflet-popup-content-wrapper {
                background: #FFF;
                color: #000;
            }
            h5 {
                margin-top: 0;
                color: #666;
                font-family: "Trebuchet MS", Tahoma, Arial, sans-serif;
            }
            textarea {
                font-size: 14px;
                border: 0px;
                font-family: "Trebuchet MS", Tahoma, Arial, sans-serif;
            }
            </style>
        
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq8n0n-Jt5P7ZbMqPJHJp9D5CjyuSmoVU"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/jquery-3.4.1.min.js"></script>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/leaflet.groupedlayercontrol.js"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/L.TileLayer.BetterWMS.js"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/L.Icon.Pulse.2.js"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/ab2c705167.js" crossorigin="anonymous"></script>
            <script src="https://smart1662.pwa.co.th/smapilab/Scripts/leaflet.awesome-markers.js"></script>
        
            <script>
        
            $(document).ready(function() {
                onLoad();
            });
        
            var mymap;
            var markerJob;
            var polygonJob;
            function onLoad(){
        
                var url_ows = "http://senseinfotech.dyndns.org:3000/geoserver/IIMS/ows";
                // var url_wms = "http://senseinfotech.dyndns.org:3000/geoserver/IIMS/wms?";
                var url_wms = "https://gisweb1.pwa.co.th/geoserver/PG_WEBGIS/wms?&CQL_FILTER=pwa_code=${props.ww_code}";
        
                var popup = L.popup();
                var marker;
        
                //Open streetmap
                var openstreetmapURL = 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}';


                //Google Hybrid:
                var googleRoad =  L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                    maxZoom: 30,
                    maxNativeZoom:30,
                    subdomains:['mt0','mt1','mt2','mt3']
                
                });

                var googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                    maxZoom: 30,
                    maxNativeZoom:30,
                    subdomains:['mt0','mt1','mt2','mt3']
                });
        
                //World imagery
                var worldimageryURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

                var worldimageryAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        
                var wmsLayer_gis_area= L.tileLayer.betterWms(url_wms, {
                    layers: "PG_WEBGIS:pipeall",
                    format: "image/png",
                    transparent: true,
                    singleTile: false,
                    matrixSet: 'EPSG:4326',
                    maxZoom: 30,
                    maxNativeZoom:30
                });
        
                var wmsLayer_gis_pipe= L.tileLayer.betterWms(url_wms, {
                    layers: "PG_WEBGIS:pipeall",
                    format: "image/png",
                    transparent: true,
                    singleTile: false,
                    matrixSet: 'EPSG:4326',
                    maxZoom: 30,
                    maxNativeZoom:30
                });

                var wmsLayer_gis_house= L.tileLayer.betterWms(url_wms, {
                    layers: "PG_WEBGIS:bldgall",
                    format: "image/png",
                    transparent: true,
                    singleTile: false,
                    matrixSet: 'EPSG:4326',
                    maxZoom: 30,
                    maxNativeZoom:22
                });
        
                var opsMap = L.tileLayer(openstreetmapURL,{
                    attribution: 'GISTNU MAP',
                    id: 'mapbox.streets',
                    maxZoom: 30,
                    maxNativeZoom:30
                });
        
                var worldimagery = L.tileLayer(worldimageryURL, {
                    attribution: worldimageryAttrib,
                    maxZoom: 30,
                    maxNativeZoom:30
                });
        
                ////Codeding MAP
                mymap = L.map('map',{
                  layers: [wmsLayer_gis_pipe, wmsLayer_gis_house, googleHybrid]
                }).setView([${location.latitude},${location.longitude}], 16);
        
                //Overlay layers are grouped
                var groupedOverlays = {
                    "ข้อมูลอ้างอิง": {
                       // "Area(DMA)" : wmsLayer_gis_area,
                        "ท่อประปา" : wmsLayer_gis_pipe,
                        "อาคารบ้านเรือน" :wmsLayer_gis_house,
                    }
                };
        
                //Base layers definition and addition
                var baseLayers = {
                    "แผนที่ดาวเทียม": googleHybrid,
                    "แผนที่ Google" : googleRoad,
                };
        
                L.control
                .groupedLayers(baseLayers, groupedOverlays, {
                    position: "topright",
                    collapsed: true
                })
                .addTo(mymap);
        
                // create custom icon
                var pulsingIcon = L.icon.pulse({iconSize:[16,16],color:'blue'});
                marker  = L.marker(
                    [${location.latitude},${location.longitude}],
                { icon: pulsingIcon }).addTo(mymap);
        
        
                if(false){
                    DrawPolygonPoints();
                }else{
                    DrawMarker();
                }
            }
        
            function DrawPolygonPoints(){
                var locations = [[
        "J2020-LD00016",
        [[91.77383907192534, 22.341759394758544],[91.77613449741426, 22.34171969444372],[91.77613449741426, 22.33903989705611],[91.77383907192534, 22.339099448668758],],
        'LEAK DETECTION',
        'LD A',
        '123',
        '',
        ''
        ]];
                polygonJob = {
                    id: 'restrict_area',
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Polygon',
                        coordinates: [locations[0][1]],
                    },
                };
        
                var pop;
                var layerGroup = L.geoJSON(polygonJob, {
                style: polystyle,
                onEachFeature: function (feature, layer) {
                    var bounds = layer.getBounds();
                    var latLng = bounds.getCenter();
                    pop = layer.bindPopup(
                        customPopupPolygon(
                        locations[0][0],
                        locations[0][2],
                        locations[0][3],
                        locations[0][4],
                        latLng.lat,
                        latLng.lng
                    ));
                }}).addTo(mymap);
                pop.openPopup();
                mymap.fitBounds(layerGroup.getBounds());
            }
        
            function polystyle(feature) {
                return {
                    fillColor: 'red',
                    weight: 1,
                    fillOpacity: 0.3
                };
            }
        
            function DrawMarker(){
                var locations = [[
        "J2020-LD00016",
        [],
        'LEAK DETECTION',
        'LD A',
        '',
        '${props.data.longtitude == undefined
            ? props.data.caseLongtitude
            : props.data.longtitude
          }',
        '${props.data.latitude == undefined
            ? props.data.caseLatitude
            : props.data.latitude
          }',
        ]];
                for (var i = 0; i < locations.length; i++) {
                    if(locations[i][6] != '' && locations[i][5] != ''){
                        
                        markerJob = L.marker([locations[i][6],locations[i][5]],{
                            draggable: false,
                            autoPan: false,
                            icon: ColorMarker(1)
                        }).addTo(mymap);
                        mymap.panTo(markerJob.getLatLng());
                        markerJob.bindPopup(customPopupPolygon(
                        locations[i][0],
                        locations[i][2],
                        locations[i][3],
                        locations[i][4],
                        locations[i][6],
                        locations[i][5]
                        )).openPopup();
                    }
                }
            }
        
            // create popup polygon
            function customPopupPolygon(jobcode, jobtype, team, jobdetail, latitude, longitude ){
                var html = '';
                // html += '<center><b>' + jobcode + '</b></center><br>';
                html += '<center><b>จุดเเจ้งซ่อม</b></center><br>';
                // html += '<b>Job Type:</b> ' + jobtype + '<br>';
                // html += '<b>Team:</b> ' + team + '<br>';
                // html += '<b>Job Detail:</b> ' + jobdetail + '<br>';
                // html += '<br>';
                html += '<td><button type="button" class="btn btn-primary btn-block" onclick="onClickLocationJob( ' + latitude + ',' + longitude + ')">เส้นทาง</button></td>';
                return html;
            }
        
            function onClickLocationJob(latitude, longitude){
                var msgObj = { lat : latitude, long: longitude};
                var msg = JSON.stringify(msgObj);
                window.ReactNativeWebView.postMessage(msg)
            };
        
            function ColorMarker(type){
                var markerIcon;
                switch(type) {
                case 2:
                    return markerIcon = new L.Icon({
                    iconUrl: 'https://smart1662.pwa.co.th/smapilab/Scripts/imgmarker/marker-icon-2x-green.png',
                    shadowUrl: 'https://smart1662.pwa.co.th/smapilab/Scripts/imgmarker/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                    });
                case 1:
                    return markerIcon = new L.Icon({
                    iconUrl: 'https://smart1662.pwa.co.th/smapilab/Scripts/imgmarker/marker-icon-2x-blue.png',
                    shadowUrl: 'https://smart1662.pwa.co.th/smapilab/Scripts/imgmarker/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                    });
                default :
                    return null;
                }
            }
        
        </script>
        <body>
            <div id="map"></div>
        </body>
        </html>
    `,
        baseUrl: '',
      }}
      onMessage={onWebViewMessage}
    />
  );
}

// Map.propTypes = {
//   mapdata: PropTypes.array,
//   Jobtype: PropTypes.state,
// };

// Map.defaultProps = {mapdata: [], jobtype: 'LEAK DETECTION'};

export default Map;
