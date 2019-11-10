<template>
  <div>
    <div class="mapouter">
      <div class="gmap_canvas">
        ahihi do ngok
      </div>
    </div>
  </div>
</template>

<script>
  const API_KEY = 'AIzaSyAhAV2NWcLitLKgc_3_uo7BmPOuMT5JhKE';
  import gmapsInit from '~/utils/gmap.js';

  export default {
    name: 'map',
      async mounted() {
          try {
              const google = await gmapsInit();
              const geocoder = new google.maps.Geocoder();
              const map = new google.maps.Map(this.$el);

              geocoder.geocode({ address: 'Austria' }, (results, status) => {
                  if (status !== 'OK' || !results[0]) {
                      throw new Error(status);
                  }

                  map.setCenter(results[0].geometry.location);
                  map.fitBounds(results[0].geometry.viewport);
              });
          } catch (error) {
              console.error(error);
          }
      },
  }
</script>

<style>
.mapouter {
  text-align:right;
  height:100%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
</style>
