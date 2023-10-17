<template>
    <v-container class="mt-5">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="bg-grey-darken-4">
            <v-card-title class="text-h5"><strong>Reset Password</strong></v-card-title>
            <v-card-text>
              <div v-if="resetStatus === 'loading'">
                <p class="text-center">Verifying...</p>
              </div>
              <div v-else-if="resetStatus === 'success'">
                <p class="text-center">Now that we know it's you <span style="font-size: 2em;">🧐</span>,<br> please enter your new password.</p>
                <v-form @submit.prevent="resetPassword">
                  <v-text-field
                    v-model="newPassword"
                    :rules="passwordRules"
                    label="New Password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="passwordRules"
                    label="Confirm Password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                  <small>make sure the passwords match</small><br><br>
                  <v-btn type="submit" block color="primary" :disabled="!validForm">Reset Password</v-btn>
                </v-form>
              </div>
              <div v-else>
                <p class="text-center">Password reset failed.</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- success snackbar -->
      <v-snackbar v-model="successAlert" color="success" timeout="4500">
        {{ successMessage }}
      </v-snackbar>

      <!-- error snackbar -->
      <v-snackbar v-model="errorAlert" color="error" timeout="4500">
        {{ errorMessage }}
      </v-snackbar>

    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        resetStatus: 'loading', // Initial status
        newPassword: '',
        confirmPassword: '',
        email: '', // Initialize email as an empty string
        passwordRules: [
          value => !!value || 'Password is required.',
          value =>
            (value && value.length >= 8) || 'Password must be at least 8 characters.',
          value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].+$/.test(value) ||
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ $ ! % * ? &).',
        ],
        successAlert: false,
        successMessage: '',
        errorAlert: false,
        errorMessage: '',
        showPassword: false,
      };
    },
    created() {
      // Extract the token from the route parameter
      const token = this.$route.params.token;

      // Send a request to your backend for token verification
      axios.get(`http://127.0.0.1:3003/api/v1/verify-password-reset-token/${token}`)
        .then(response => {
          // Handle the response from the backend
          const { status, data } = response;
          if (status === 200 && data.message === 'Token verified successfully') {
            // Token verification successful
            this.resetStatus = 'success';

            // Access the email from the response and store it in the data property
            this.email = data.email;
          } else {
            // Token verification failed
            this.resetStatus = 'error';
          }
        })
        .catch(error => {
          // Handle any errors
          console.error('Token verification error:', error);
          this.resetStatus = 'error';
        });
    },
    computed: {
      validForm() {
        // Add your password validation logic here
        // For example, you can check if newPassword and confirmPassword match
        return this.newPassword === this.confirmPassword && this.newPassword.length >= 8;
      },
    },
    methods: {
      async resetPassword() {
        try {
          // Send a POST request to your backend to reset the password
           await axios.patch('http://127.0.0.1:3003/api/v1/reset-password', {
            newPassword: this.newPassword,
            email: this.email,
          });

         
            // Password reset successful

            // Redirect to the login page with a success message in the query parameters
            this.$router.push({ path: '/login', query: { successMessage: 'Password reset successful. Please login with your new password.' } });
         
        } catch (error) {
          // Handle network errors or other issues
          console.error('Password reset error:', error);
          this.resetStatus = 'error';
          this.errorAlert = true;
          this.errorMessage = 'Password reset failed.';
        }
      },

    },
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 400px;
    min-height: 350px;
    margin: 0 auto;
  }
  
  .v-card-text {
    padding: 0 50px;
    font: 1em sans-serif;
  }
  </style>
  