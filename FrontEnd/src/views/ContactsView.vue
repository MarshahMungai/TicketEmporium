<template>
  <v-container>
    <v-row class="bg-grey-darken-4" style="border-radius: 20px; margin-top: 50px; margin-bottom: 50px; padding: 50px;">
      <v-col cols="12" md="6">
        <h2 class="font-weight-regular" style="color: #15f0dee5;">Get in Touch</h2>

        <div class="d-flex flex-row align-center contact-item">
          <v-icon size="24" color="#14f0deaf" style="margin-right: 10px;">mdi-phone</v-icon>
          <p>0720-888-904</p>
        </div>

        <div class="d-flex flex-row align-center contact-item">
          <v-icon size="24" color="#14f0deaf" style="margin-right: 10px;">mdi-email</v-icon>
          <p>ticketemporium01@gmail.com</p>
        </div>

        <div class="d-flex flex-row align-center contact-item">
          <v-icon size="24" color="#14f0deaf" style="margin-right: 10px;">mdi-map-marker</v-icon>
          <p>123 Sample St, City, Country</p>
        </div>

        <div class="mt-6">
          <h2 class="font-weight-regular" style="color: #15f0dee5; margin-bottom: 10px;">Find Us</h2>
          <v-responsive max-width="1200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.4874851409776!2d-122.0838!3d37.42199999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580c5555f4a15%3A0x8cb410b18d4f50d6!2sSample%20Location!5e0!3m2!1sen!2sus!4v1562761187150!5m2!1sen!2sus"
              width="90%"
              height="350"
              frameborder="0"
              style="border: solid 3px; border-radius: 20px; filter: invert(90%);"
            ></iframe>
          </v-responsive>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex flex-column">
          <h2 class="font-weight-regular" style="color: #15f0dee5; margin-bottom: 10px;">Our Socials</h2>
          <div class="d-flex flex-row">
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
              <v-icon size="24" color="white" style="margin: 0 20px;">mdi-whatsapp</v-icon>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
              <v-icon size="24" color="white" style="margin: 0 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="twitter-icon"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
              </v-icon>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon">
              <v-icon size="24" color="white" style="margin: 0 20px;">mdi-instagram</v-icon>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
              <v-icon size="24" color="white" style="margin: 0 20px;">mdi-facebook</v-icon>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon">
              <v-icon size="24" color="white" style="margin: 0 20px;">mdi-telegram</v-icon>
            </a>
          </div>
        </div>

        <div class="contacts-form mt-8">
          <h2 class="font-weight-regular" style="color: #15f0deb4; margin-bottom: 10px; margin-top: 50px;">Have a question/message for us?</h2>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-if="!isLoggedIn"
              label="Email *"
              id="email"
              name="email"
              placeholder="Enter your email"
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-textarea
              label="Message *"
              id="message"
              name="message"
              rows="4"
              placeholder="Type your message here"
              v-model="message"
              :rules="messageRules"
            ></v-textarea>
            <small>* indicates required field</small><br><br>
            <v-btn color="primary" @click="submitForm" :disabled="!isFormValid">Send</v-btn>
          </v-form>
        </div>
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
  name: 'ContactsView',
  data() {
    return {
      message: '',
      email: '',  
      successAlert: false,
      errorAlert: false,
      successMessage: '',
      errorMessage: '',
      user: {
        id: '',
      },
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+/.test(v) || 'Email must be valid',
      ],
      messageRules: [
        (v) => !!v || 'Message is required',
        (v) => v.length <= 300 || 'Message must be less than 300 characters',
        (v) => v.length >= 10 || 'Message must be more than 10 characters',
    ],

    };
  },
  created() {
    // Retrieve user details from local storage and set them to the component's data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      this.user.id = user.id;
    }
  },
  computed: {
    // Computed property to check if the user is logged in based on the presence of a token in local storage
    isLoggedIn() {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if a token is present, false otherwise
    },
    isFormValid() {
      if (this.isLoggedIn) {
        // When the user is logged in, check only the message field's validity
        return !this.messageRules.some(rule => rule(this.message) !== true);
      } else {
        // When the user is not logged in, check both email and message fields' validity
        const isEmailValid = this.emailRules.every(rule => rule(this.email) === true);
        const isMessageValid = !this.messageRules.some(rule => rule(this.message) !== true);
        return isEmailValid && isMessageValid;
      }
    },
  },
 
  methods: {
    async submitForm() {
      try {
        // Define the data to send to the API based on user login status
        const formData = {
          message: this.message,
        };

        if (this.isLoggedIn) {
          // If the user is logged in, add user_id to the request
          formData.user_id = this.user.id;
        } else {
          // If the user is not logged in, add user_email to the request
          formData.user_email = this.email;
        }

       // console.log(formData);

        // Make a POST request to the API
        const response = await axios.post('http://127.0.0.1:3003/api/v1/messages', formData);

        if (response.status === 201) {
          // If the request is successful, show a success message
          this.successMessage = 'Your message has been sent successfully.';
          this.successAlert = true;
        } else {
          // If the request fails, show an error message
          this.errorMessage = 'Failed to send your message. Please try again later.';
          this.errorAlert = true;
        }

        // Clear the form
        // this.message = '';
        // this.email = '';
      } catch (error) {
        // Handle any network or other errors
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while sending your message. Please try again later.';
        this.errorAlert = true;
      }
    },

},
}

</script>

<style scoped>
.twitter-icon {
  fill: white;
}
.social-icon {
  margin: 0 3px;
}

/* Media query for screens smaller than 600px */
@media screen and (max-width: 600px) {
  .contacts {
    flex-direction: column; /* Stack sections vertically */
    align-items: center; /* Center content horizontally */
  }

  .contacts-section {
    order: 2; /* Place the second section below the first section */
  }
}
</style>
