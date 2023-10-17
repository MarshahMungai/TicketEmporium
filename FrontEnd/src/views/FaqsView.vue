<template>
  <div class="bg-white" style="margin-top: 100px;">
    <h2 class="faq-heading">Frequently Asked Questions</h2>

    <v-expansion-panels variant="accordion">

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">How do I receive my tickets?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            All tickets will be delivered to you via email. After you complete your purchase, you'll receive an
            email with instructions on how to access your tickets electronically. Simply follow the instructions
            in the email to download and print your tickets, or present them on your mobile device at the event.
            If you have any issues accessing your tickets, please contact our customer support team for assistance.
          </div>
        </template>
      </v-expansion-panel>
    
      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">How do I purchase tickets on your website?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            To purchase tickets, simply browse our website under events, find and select the event you wish 
            to attend. Click on the "Buy Tickets" button and follow the prompts to complete the purchase securely.
          </div>
        </template>
      </v-expansion-panel>

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">What happens if an event is cancelled or rescheduled?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            If an event is cancelled, you'll receive a full refund for your ticket purchase. If an event is rescheduled,
            your ticket will still be valid for the new date. If you're unable to attend the rescheduled event,
            please contact our customer support team for assistance with a refund or exchange.
          </div>
        </template>
      </v-expansion-panel>

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">Can I exchange my tickets for a different event?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            If you wish to exchange your tickets, it is possible only for events that are scheduled for the same date
            and have matching information to the initial event on our platform. For assistance with this process,
            please contact our customer support team.
          </div>
        </template>
      </v-expansion-panel>

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">Can I get a refund if I can no longer attend an event?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            Refunds are generally not available for ticket purchases, except in cases where the event 
            is cancelled or where the event organiser decides to offer refunds.
          </div>
        </template>
      </v-expansion-panel>

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">What should I do if I lose my tickets?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            If you lose your tickets or accidentally delete the email containing them, please contact our 
            customer support team for assistance. We'll do our best to help you access your tickets so you 
            can attend the event.
          </div>
        </template>
      </v-expansion-panel>

      <!-- <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">What payment methods do you accept for ticket purchases?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            We accept various payment methods, including credit cards, debit cards, paypal and mobile 
            money services such as M-Pesa and Airtel Money. You can choose the payment option that is most 
            convenient for you.
          </div>
        </template>
      </v-expansion-panel> -->

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">Are there any additional fees or charges on top of the ticket price?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            The ticket price displayed on our website includes all applicable taxes and fees for you as the 
            ticket buyer. There are no hidden charges, and the final price you see is the total amount you will pay.
          </div>
        </template>
      </v-expansion-panel>

      <!-- <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">How do i rate and review an event?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
           Only users who have purchased tickets to an event can rate and review it. To rate and review an event,
            simply log in to your account, go to my tickets under the profile menu, select the event you wish to rate and review,
            and click on the "Rate and Review" button. You can then give the event a rating out of 5 stars, and write a review
          </div>
        </template>
      </v-expansion-panel> -->

      <v-expansion-panel class="bg-grey-darken-4">
        <template v-slot:title>
          <div class="faq-title">How can I become a seller on your website?</div>
        </template>
        <template v-slot:text>
          <div class="faq-text">
            You can become a seller on our website by registering as one. Simply visit our website and click on 
            the "Become a Seller?" link under the quick links at the bottom of the page. Fill in your details, and once you're approved, you can start selling tickets for your own events 
            on our platform. If you have any questions or concerns about the registration process or becoming a 
            seller, please don't hesitate to contact our customer support team.          </div>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

  <div>
   <!-- "Have Other Questions? button -->
   <v-row justify="center" class="bg-grey-darken-4" style="width: 85%; margin: 0 auto; height: 3cm;">
      <v-dialog v-model="dialog" persistent width="500">
        <template v-slot:activator="{ props }">
          <v-btn style="margin-top: 1.3cm;" color="secondary" v-bind="props">Have Other Questions?</v-btn>
        </template>
        <v-form @submit.prevent="submitForm">
          <v-card class="bg-grey-darken-4">
            <v-card-title>
              <span class="text-h5">Have a question for us?😊</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
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
                  </v-col>
                </v-row>
              </v-container>
              <small>* indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" variant="text" @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn type="submit" color="secondary" variant="text" :disabled="!isFormValid">
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <!-- success snackbar -->
    <v-snackbar v-model="successAlert" color="success" timeout="4500">
        {{ successMessage }}
      </v-snackbar>

      <!-- error snackbar -->
      <v-snackbar v-model="errorAlert" color="error" timeout="4500">
        {{ errorMessage }}
      </v-snackbar>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    email: '',
    message: '',
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
  }),
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
        this.message = '';
        this.email = '';
      } catch (error) {
        // Handle any network or other errors
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while sending your message. Please try again later.';
        this.errorAlert = true;
      }

      // Close the dialog
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.bg-white {
  width: 85%;
  margin: 0 auto;
}

.faq-heading {
  font-size: 17px;
  color: #ffffff;
  height: 50px;
  text-align: center;
  padding-top: 15px;
  background-color: #212121; 
}

.faq-title {
  font-size: 16px;
  color: #15f0dee7;
}

.faq-text {
  font-size: 14px;
  color: #ffffff;
}

.v-row {
  margin-top: 20px;
  
}
</style>
