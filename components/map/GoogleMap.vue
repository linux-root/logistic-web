<template>
      <div ref="map" id="map"/>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "google-map",
       async mounted(){
           console.log('mounted googleMap');
           await this.initMap();
        },
      data: ()=>({
          labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          labelIndex: 0,
          checkpoint : {},
          marker : null
      }),
      methods: {
          ...mapActions({
            setMarkerCoordinate: 'map/setMarkerCoordinate'
          }),
        async initMap() {
          const kaycee = {lat: 20.962193, lng: 105.831582};
          const map = new this.$google.maps.Map(this.$refs.map, {zoom: 15, center: kaycee});

          this.$google.maps.event.addListener(map, 'click',  (event) => {
              if(this.marker){
                  this.marker.setMap(null)
              }
             this.marker = this.addMarker(event.latLng, map);
             this.setMarkerCoordinate({
                  lat: event.latLng.lat(), lng: event.latLng.lng()
            })

          });
        },

        // Adds a marker to the map.
        addMarker(location, map) {
          // Add the marker at the clicked location, and add the next-available label
          // from the array of alphabetical characters.
          const marker = new this.$google.maps.Marker({
            position: location,
            label: this.labels[this.labelIndex++ % this.labels.length],
            map
          });

          return marker;
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
