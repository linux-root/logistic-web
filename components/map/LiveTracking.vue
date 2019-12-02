<template>
  <div ref="map" id="map"/>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "live-tracking",
        props: ['route'],
        computed: {
            ...mapGetters({
                labelIndex: 'map/getMarkerLabelIndex',
                currentRoute: 'route/getCurrentRoute',
                checkpoints: 'route/getCurrentCheckpoints'
            })
        },
        data: () => ({
            markerf: null

        })
        ,
        async mounted() {
            console.log('mounting Live Tracking')
            await this.initMap()
            const channel = await this.$pusher.subscribe('shipper', () => {
                console.log('subscribe successfully ')
            });
            channel.bind('update-position', data => {
                console.log({data})
                this.markerf.setPosition(data.position)
            });
        },
        methods: {
            ...mapActions({
                setMarkerCoordinate: 'map/setMarkerCoordinate',
                increaseMarkerLabelIndex: 'map/increaseMarkerLabelIndex',
            }),
            updatePosition(geo_location) {
                console.log(geo_location)
                this.markerf.setPosition(geo_location)
            },
            initMap() {
                const mapCenter = this.checkpoints[0];
                console.log('center', mapCenter.geo_coordinate)
                var directionsService = new this.$google.maps.DirectionsService();
                var directionsRenderer = new this.$google.maps.DirectionsRenderer();

                const map = new this.$google.maps.Map(this.$refs.map, {zoom: 15, center: mapCenter.geo_coordinate});

                directionsRenderer.setMap(map);

                const checkpoints = this.checkpoints;

                const startCheckpoint = checkpoints.filter(cp => cp.seq == 1)[0]
                const img ='/position.png'

                this.markerf = new this.$google.maps.Marker({
                    position: {
                        lat: startCheckpoint.geo_coordinate.lat + 0.0000005,
                        lng: startCheckpoint.geo_coordinate.lng + 0.0000006
                    },
                    map: map,
                    icon: img
                })

                // infoWindow.setPosition(shipperP);
                // infoWindow.setContent('Hà Hữu Vinh');
                // infoWindow.open(map)
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
