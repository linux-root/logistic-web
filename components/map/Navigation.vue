<template>
  <div ref="map" id="map"/>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "navigation",
        props: ['route'],
        computed: {
            ...mapGetters({
                labelIndex: 'map/getMarkerLabelIndex',
                currentRoute: 'route/getCurrentRoute',
                checkpoints: 'route/getCurrentCheckpoints'
            })
        }
        ,
        async mounted() {
            console.log('mounting Navigation')
            await this.initMap()
        },
        methods: {
            ...mapActions({
                sendLocation: 'shipper/sendLocation'
            }),
            initMap() {
                const mapCenter = this.checkpoints[0];
                var directionsService = new this.$google.maps.DirectionsService();
                var directionsRenderer = new this.$google.maps.DirectionsRenderer();

                const map = new this.$google.maps.Map(this.$refs.map, {zoom: 15, center: mapCenter.geo_coordinate});

                directionsRenderer.setMap(map);


                this.$google.maps.event.addListener(map, 'dbclick',  (event) => {
                     console.log(event)
                     const location = {
                         shipper_id: this.$store.state.auth.user.id,
                         lat: event.latLng.lat(),
                         lng: event.latLng.lng()
                     }
                     console.log({location})
                     this.sendLocation(location)
                });
                const checkpoints = this.checkpoints;

                const startCheckpoint = checkpoints.filter(cp => cp.seq == 1)[0]

                const waypoint = checkpoints.filter(cp => cp.seq != 1).map(cp => ({
                    location: cp.geo_coordinate
                }))

                directionsService.route(
                    {
                        origin: startCheckpoint.geo_coordinate,
                        destination: checkpoints[checkpoints.length - 1].geo_coordinate,
                        waypoints: waypoint,
                        travelMode: 'DRIVING',
                        optimizeWaypoints: true
                    },
                    function (response, status) {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(response);
                        } else {
                            alert('Directions request failed due to ' + status);
                        }
                    });
            }
        }
    }
</script>

<style scoped>
  #map {
    height: 500px; /* The height is 400 pixels */
    width: 100%; /* The width is the width of the web page */
  }
</style>
