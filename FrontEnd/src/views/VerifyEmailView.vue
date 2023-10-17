<template>
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="bg-grey-darken-4">
            <v-card-title class="text-h5"><strong>Email Verification</strong></v-card-title><br>
            <v-card-text>
              <div v-if="verificationStatus === 'loading'">
                <p class="text-center">Verifying...</p><br>
              </div>
              <div v-else-if="verificationStatus === 'success'">
                <p class="text-center">You have successfully verified your email address.</p><br><br>
                <v-btn @click="redirectToLogin" block color="primary">Go to Login</v-btn>
              </div>
              <div v-else>
                <p class="text-center">Verification failed. The token is invalid or has expired.</p><br><br>
                <v-btn @click="redirectToLogin" block color="error">Go to Login</v-btn> 
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        verificationStatus: 'loading', // Initial status
      };
    },
    created() {
      // Extract the token from the route parameter
      const token = this.$route.params.token;
  
      // Send a request to your backend for token verification
      axios.get(`http://127.0.0.1:3003/api/v1/verify-email/${token}`)
        .then(response => {
          // Handle the response from the backend
          const { status, data } = response;
          if (status === 200 && data === 'Email verified successfully') {
            // Verification successful
            this.verificationStatus = 'success';
          } else if (status === 400 && data === 'Email already verified') {
            // Email already verified
            this.verificationStatus = 'already-verified';
          } else {
            // Verification failed
            this.verificationStatus = 'error';
          }
        })
        .catch(error => {
          // Handle any errors
          console.error('Verification error:', error);
          this.verificationStatus = 'error';
        });
    },
    methods: {
      redirectToLogin() {
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 400px;
    min-height: 250px;
    margin: 0 auto;
  }

  .v-card-text {
    padding: 0 50px;
    font: 1em sans-serif;
  }
  </style>
  