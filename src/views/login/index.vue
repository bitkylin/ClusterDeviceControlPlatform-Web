<template>
  <div class="homepage-hero-module">
    <loginWidget></loginWidget>
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
        <source src="static/cover/MP4/Yellow-Cars.mp4" type="video/mp4"/>
        Your browser does not support the video tag. I suggest you upgrade your browser.
        <source src="static/cover/WEBM/Yellow-Cars.webm" type="video/webm"/>
        Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="static/cover/Snapshots/Yellow-Cars.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import loginWidget from './loginWidget'

  export default {
    name: 'login',
    data() {
      return {
        vedioCanPlay: false,
        fixStyle: ''
      }
    },
    components: { loginWidget },
    methods: {
      canplay() {
        this.vedioCanPlay = true
      }
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
  }
</script>


<style scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
</style>
