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
        methods: {
         async initMap() {
               const mapDomElement = this.$refs.map;
                console.log({mapDomElement});
                const kaycee = {lat: 20.962193, lng: 105.831582};
                // The map, centered at Uluru
                const map = new this.$google.maps.Map(mapDomElement, {zoom: 15, center: kaycee});
                console.log(map)
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