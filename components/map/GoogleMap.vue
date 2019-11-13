<template>
      <div ref="map" id="map"/>
</template>

<script>
    export default {
        name: "google-map",
       async mounted(){
           console.log('mounted bug');
           console.log(this.$refs);
           await this.initMap();
        },
      props: ['checkpoint'],

      data: ()=>({
        labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        labelIndex: 0,
        haha : {}
      }),
      methods: {
        async initMap() {
          const mapDomElement = this.$refs.map;
          const kaycee = {lat: 20.962193, lng: 105.831582};
          // The map, centered at Uluru
          const map = new this.$google.maps.Map(mapDomElement, {zoom: 15, center: kaycee});
          // This event listener calls addMarker() when the map is clicked.
          this.$google.maps.event.addListener(map, 'click',  (event) => {
            this.addMarker(event.latLng, map);
          });

          this.map = map;
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
          const checkpoint = {
              map : map,
              marker : marker
          };

          this.$store.commit('setCurrent', checkpoint)
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
