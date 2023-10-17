<template>
    <div style="margin-top: 120px;"></div>
    <v-sheet width="500" :elevation="22" class="mx-auto">
      <v-card outlined class="bg-grey-darken-4">
        <!-- <h3 class="text-center">Hey you 😊, we missed you</h3> -->
        <v-alert 
          v-if="showSuccessMessage" 
          type="success" 
          closable
          >
          {{ successMessage }}
        </v-alert>

        <v-alert
          v-if="showMessage"
          :type="messageType"
          closable
          close-label="Close Alert"
        >
          {{ message }}
        </v-alert>

        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn type="submit" block color="secondary" class="mt-2" :disabled="!isFormValid">Submit</v-btn>
          </v-form>
          <v-divider></v-divider>
          <div class="text-center mt-3">
            Don't have an account?
            <v-btn variant="text" color="secondary" @click="redirectToRegister">Register</v-btn>
            <v-divider></v-divider> 

            <!-- forgot password -->
            <v-btn variant="text" color="pink" @click="openForgotPasswordDialog">Forgot Password?</v-btn>

            <v-dialog v-model="forgotPasswordDialog" max-width="400">
              <v-card class="bg-grey-darken-4" outlined>
                <v-card-title>Forgot your Password?</v-card-title>
                <v-card-text>
                  <p class="mb-2">Provide your email so that we can help you recover your account.</p>
                  <v-form @submit.prevent="sendForgotPasswordEmail">
                    <v-text-field v-model="forgotPasswordEmail" label="Email" required :rules="emailRules"></v-text-field>
                    <v-btn type="submit" color="primary">Recover Password</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-card-text>
      </v-card>

      <!-- success snackbar -->
      <v-snackbar v-model="successAlert" color="success" timeout="4500">
        {{ successAlertMessage }}
      </v-snackbar>

      <!-- error snackbar -->
      <v-snackbar v-model="errorAlert" color="error" timeout="6000">
        {{ errorMessage }}
      </v-snackbar>

    </v-sheet>
  </template>
  
  <script>
  import axios from 'axios';
  // import { useStore } from 'vuex';

  // const store = useStore();
  // store.commit('setIsLoggedIn')
      
  export default {
    data() {
      return {
        email: '',
        password: '',
        emailRules: [
          value => !!value || 'Email is required.',
          value => /.+@.+\..+/.test(value) || 'Please enter a valid email.',
        ],
        passwordRules: [
          value => !!value || 'Password is required.',
          value =>
            (value && value.length >= 8) || 'Password must be at least 8 characters.',
          value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].+$/.test(value) ||
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ $ ! % * ? &).',
        ], 
        showPassword: false,
        forgotPasswordDialog: false,
        forgotPasswordEmail: '',
        showMessage: false, // Control whether the alert is visible
        messageType: '', // 'success' or 'error'
        message: '', // The message to display in the alert
        successAlert: false,
        successAlertMessage: '',
        errorAlert: false,
        errorMessage: '',
      };
    },
    computed: {
      showSuccessMessage() {
        return this.$route.query.successMessage !== undefined;
      },
      successMessage() {
        return this.$route.query.successMessage || '';
      },
      isFormValid() {
        return this.emailRules.every(rule => rule(this.email) === true) &&
          this.passwordRules.every(rule => rule(this.password) === true);
      },
    },
    mounted() {
      // Automatically close the success message after 10 seconds
      if (this.showSuccessMessage) {
        setTimeout(() => {
          this.$router.push({ path: '/login' }); // Redirect to login page
        }, 10000); // 10 seconds
      }
    },
    methods: {
      async submitForm() {
        try {
          // Send a POST request to your backend for login
          const response = await axios.post('http://127.0.0.1:3003/api/v1/login', {
            email: this.email,
            password: this.password,
          });

          // Login was successful
          const token = response.data.token;
          const user = response.data.user; // Fetch the user data from the response
          const roleIds = response.data.roleIds; // Fetch the roleIds from the response

          // Save the token, user data, and roleIds in local storage or Vuex store as needed
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user)); // Store user data as a string
          localStorage.setItem('roleIds', JSON.stringify(roleIds)); // Store roleIds as a string

          // Set the isLoggedIn state to true
          this.$store.commit('setIsLoggedIn', true);

          // Redirect the user to a protected route or dashboard
          this.$router.push('/events');
          //window.location.href = '/events';
        } catch (error) {
          // Handle network errors or other issues
          console.error('Error during login:', error);
          this.showMessage = true;
          this.messageType = 'error';
          this.message = error.response.data.message;
        }
      },

      redirectToRegister() {
        // Navigate to the registration page
        this.$router.push('/signup');
      },
      openForgotPasswordDialog() {
        this.forgotPasswordDialog = true;
      },
      async sendForgotPasswordEmail() {
        try {
          // Create a request payload with the email
          const requestPayload = { email: this.forgotPasswordEmail };

          // Make a POST request to the API endpoint to send the email
          const response = await axios.patch('http://127.0.0.1:3003/api/v1/forgot-password', requestPayload);

          // Extract token, email, and firstName from the API response
          const { token, email, firstName } = response.data;

          // Create a user object with the extracted data
          const user = {
            firstName,
            email,
            token,
          };

          // Make a POST request to the /sendforgotPasswordEmail API endpoint
          await axios.post('http://127.0.0.1:3003/api/v1/sendforgotPasswordEmail', user);

          // Password reset email sent successfully
          this.forgotPasswordDialog = false; // Close the dialog after sending the email
          this.successAlert = true;
          this.successAlertMessage = 'Password reset email sent successfully. Please check your email for further instructions.';
        } catch (error) {
          // Handle network errors or other issues
          console.error('Error sending password reset email:', error);
          // Display an error message to the user if needed
          this.errorAlert = true;
          this.errorMessage = 'You have either entered an unregistered email or there was an error on our end sending the password reset email. Please try again later with a valid email.';
        }
      },


    },
  };
  </script>
  
  <style>
  /* Global styles */
  body {
    margin: 0;
    padding: 0;
  }
  
  /* Vuetify styles */
  .v-main {
    padding: 16px; /* Add some padding to your main content */
  }
  .v-messages__message {
    color: rgb(255, 77, 77);
  }
  .v-sheet {
    border-radius: 20px;
  }
  .v-overlay--active {
  background-color: rgba(0, 0, 0, 0.705); /* Adjust the opacity as needed */
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
}
  </style>
  