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
      props: ['checkpoint'],
      data: ()=>({
          labels: '123456789'
      }),
      computed:{
          ...mapGetters({
            labelIndex: 'map/getMarkerLabelIndex'
          })
      },
      methods: {
          ...mapActions({
            setMarkerCoordinate: 'map/setMarkerCoordinate',
            increaseMarkerLabelIndex: 'map/increaseMarkerLabelIndex'
          }),
        async initMap() {
          const kaycee = {lat: 20.962193, lng: 105.831582};
          const mapCenter = this.checkpoint.geo_coordinate ? this.checkpoint.geo_coordinate : kaycee
          const map = new this.$google.maps.Map(this.$refs.map, {zoom: 15, center: mapCenter});

          if(this.checkpoint.geo_coordinate){
             this.addMarker(this.checkpoint.geo_coordinate, map); //add existing location
          }

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
            label: this.labels[this.checkpoint.seq % this.labels.length],
            map
          });
          this.increaseMarkerLabelIndex();
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
