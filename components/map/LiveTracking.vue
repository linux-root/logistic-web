<template>
<div ref="map" id="map"/>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
      name: "live-tracking",
      props: ['route'],
      computed:{
          ...mapGetters({
            labelIndex: 'map/getMarkerLabelIndex',
              currentRoute: 'route/getCurrentRoute',
              checkpoints: 'route/getCurrentCheckpoints'
          })
      },
        mounted(){
          this.initMap()
        },
      methods: {
          ...mapActions({
            setMarkerCoordinate: 'map/setMarkerCoordinate',
            increaseMarkerLabelIndex: 'map/increaseMarkerLabelIndex',
          }),
          initMap() {
            const mapCenter = this.checkpoints[0];
            console.log('center', mapCenter.geo_coordinate)
            var directionsService = new this.$google.maps.DirectionsService();
            var directionsRenderer = new this.$google.maps.DirectionsRenderer();
            let infoWindow = new this.$google.maps.InfoWindow;

            const map = new this.$google.maps.Map(this.$refs.map, {zoom: 15, center: mapCenter.geo_coordinate});

            directionsRenderer.setMap(map);

            const checkpoints = this.checkpoints;

            const startCheckpoint = checkpoints.filter(cp => cp.seq == 1)[0]
              console.log(startCheckpoint)
            const shipperP = {lat: 21.003696,lng: 105.818860};

            infoWindow.setPosition(shipperP);
            infoWindow.setContent('Hà Hữu Vinh');
            infoWindow.open(map)
           const waypoint = checkpoints.filter(cp => cp.seq != 1).map(cp => ({
               location: cp.geo_coordinate
           }))

            directionsService.route(
                {
                    origin: startCheckpoint.geo_coordinate,
                    destination: checkpoints[checkpoints.length -1].geo_coordinate,
                    waypoints: waypoint,
                    travelMode: 'DRIVING',
                    optimizeWaypoints: true
                },
                function (response, status) {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
        }
        }
    }
</script>

<style scoped>
    #map {
        height: 500px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
    }
</style>
