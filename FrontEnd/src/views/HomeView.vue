<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 63vh;">
    <h1 class="text-h2 font-weight-thin mb-4" style="margin-top: 110px; color: #15f0dee5;">
      Welcome to Ticket Emporium
    </h1>
    <h4 class="subheading" style="color: #ffffff; font-size: medium; font-weight: 400;">
      Get tickets to your favourite events fast, easy and secure.
    </h4><br><br>
    <!-- flickering effect class -->
    <v-btn class="mt-4 flicker" color="secondary" style="width: 70%; border-radius: 25px; height: 1.3cm; " @click="redirectToEvents">
      Browse Events
      <v-icon right>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToEvents() {
      this.$router.push('/events');
    },
  },
};
</script>

<style scoped>
/* Flickering animation keyframes */
@keyframes flickerAnimation {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

/* Application the flickering effect to the button */
.flicker {
  animation: flickerAnimation 1.5s infinite;
}
</style>
