<template>
      <div ref="map" id="map"/>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "google-map",
       async mounted(){
           console.log('mounted googleMap');
           console.log(this.$refs);
           await this.initMap();
        },
      data: ()=>({
        labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        labelIndex: 0,
        checkpoint : {}
      }),
      methods: {
          ...mapActions({
            setCurrentCheckpoint: 'checkpoint/setCurrentCheckpoint'
          }),
        async initMap() {
          const mapDomElement = this.$refs.map;
          const kaycee = {lat: 20.962193, lng: 105.831582};
          // The map, centered at Uluru
          const map = new this.$google.maps.Map(mapDomElement, {zoom: 15, center: kaycee});
          // This event listener calls addMarker() when the map is clicked.
          this.$google.maps.event.addListener(map, 'click',  (event) => {
            const marker = this.addMarker(event.latLng, map);

            this.setCurrentCheckpoint({
              map : map,
              location: marker
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
