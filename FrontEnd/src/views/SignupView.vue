<template>
    <div style="margin-top: 120px;"></div>
    <v-sheet class="mx-auto" width="500" :elevation="22">
      <!-- Display success or error message -->
    <v-alert
      v-if="showMessage"
      :type="messageType"
      closable
      close-label="Close Alert"
    >
      {{ message }}
    </v-alert>
      <v-card outlined class="bg-grey-darken-4">
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="firstName"
              :rules="nameRules"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              :rules="nameRules"
              label="Last Name"
            ></v-text-field>
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
            Already have an account?
            <v-btn variant="text" color="secondary" @click="redirectToLogin">Login</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      nameRules: [
        value => !!value || 'Name is required.',
        value => value && value.length >= 3 || 'Name must be at least 3 characters.',
      ],
        emailRules: [
          value => !!value || 'Email is required.',
          value => /.+@.+\..+/.test(value) || 'Please enter a valid email.',
        ],
        passwordRules: [
          value => !!value || 'Password is required.',
          value =>
            (value && value.length >= 6) || 'Password must be at least 6 characters.',
          value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].+$/.test(value) ||
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ $ ! % * ? &).',
        ],
        showPassword: false,
        showMessage: false, // Control whether the alert is visible
        messageType: '', // 'success' or 'error'
        message: '', // The message to display in the alert
      }
    },
    computed: {
      isFormValid() {
        return this.nameRules.every(rule => rule(this.firstName) === true) &&
          this.nameRules.every(rule => rule(this.lastName) === true) &&
          this.emailRules.every(rule => rule(this.email) === true) &&
          this.passwordRules.every(rule => rule(this.password) === true);
      },
    },
    methods: {
      async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:3003/api/v1/signup', {
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          password: this.password,
        });

        // Handle the response from the backend
        const token = response.data.token;

        // Send the firstName and email for email verification
        await axios.post('http://127.0.0.1:3003/api/v1/sendVerificationEmail', {
          firstName: this.firstName,
          email: this.email,
          token: token,
        });

        // Redirect to the login page with a success message
        this.$router.push({
          path: '/login',
          query: {
            successMessage: 'Signup successful! Please check your email in order to verify it before logging in.',
          },
        });
      } catch (error) {
        // Handle errors here
        console.error('Signup error:', error);
        this.showMessage = true;
        this.messageType = 'error';
        this.message = error.response.data.message;
      }
    },

    redirectToLogin() {
      this.$router.push('/login');
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
  </style>
  