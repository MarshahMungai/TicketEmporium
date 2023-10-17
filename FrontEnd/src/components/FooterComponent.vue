<template>
  <div class="wrapper">
    <footer class="footer bg-grey-darken-4">
      <div class="footer-section">
        <!-- Logo and slogan -->
        <div @click="redirectToHome" class="logo-container">
          <img
           :src="logo"
            alt="Logo"
            class="logo-image"
          />
          <img
            :src ="slogan"
            alt="Slogan"
            class="slogan-image"
          />
        </div>
      </div>
      <div class="footer-section">
        <h3 style="color: #15f0dee5; font-size: 18px; font-weight: 390;">Quick Links</h3>
        <ul class="quick-links">
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/about">Terms and Conditions</router-link></li>
          <li><router-link to="/faqs">FAQs</router-link></li>
          <li><a @click="openSellerDialog">Become a Seller?</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3 style="color: #15f0dee5; font-size: 18px; font-weight: 390;">Contact Us</h3>
        <div class="contact-info">
          <div class="contact-item">
            <v-icon size="24px" color="#14f0deaf" style="margin-right: 10px;">mdi-phone</v-icon>
            <p>0720-888-904</p>
          </div>
          <div class="contact-item">
            <v-icon size="24px" color="#14f0deaf" style="margin-right: 10px;">mdi-email</v-icon>
            <p>ticketemporium01@gmail.com</p>
          </div>
          <div class="contact-item">
            <v-icon size="24px" color="#14f0deaf" style="margin-right: 10px;">mdi-map-marker</v-icon>
            <p>123 Sample St, City, Country</p>
          </div>
        </div>
        <div class="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <v-icon size="24px" color="#14f0deaf" style="margin: 0 20px;">mdi-whatsapp</v-icon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <v-icon size="24px" color="#14f0deaf" style="margin: 0 20px;">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="twitter-icon"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
            </v-icon>
          </a>
          <a href="https://www.instagram.com/marshah.mungai/" target="_blank" rel="noopener noreferrer">
            <v-icon size="24px" color="#14f0deaf" style="margin: 0 20px;">mdi-instagram</v-icon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <v-icon size="24px" color="#14f0deaf" style="margin: 0 20px;">mdi-facebook</v-icon>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <v-icon size="24px" color="#14f0deaf" style="margin: 0 20px;">mdi-telegram</v-icon>
          </a>
        </div>
      </div>
      
      <div class="footer-row">&copy; Ticket Emporium, {{ currentYear }}</div>

      <!-- // Dialog for becoming a seller -->
      <v-dialog v-model="sellerDialog" max-width="500">
        <v-card class="bg-grey-darken-4">
          <v-card-title>Apply to be a Seller</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="sellerName"
                label="Your Full Name"
                :rules="sellerNameRules"
              ></v-text-field>
              
              <v-text-field
                v-model="sellerEmail"
                label="Your Email"
                :rules="sellerEmailRules"
              ></v-text-field>

              <v-text-field
                v-model="sellerPhone"
                label="Your Phone Number"
                :rules="sellerPhoneRules"
              ></v-text-field>

              <v-text-field
                v-model="sellerIdNumber"
                label="Your ID Number"
                :rules="sellerIdNumberRules"
              ></v-text-field>

              <v-text-field
                v-model="companyName"
                label="Company you're representing"
                :rules="companyNameRules"
              ></v-text-field>

              <v-text-field
                v-model="companyAddress"
                label="Company Address"
                :rules="companyAddressRules"
              ></v-text-field>

              <v-text-field
                v-model="companyPhone"
                label="Company Phone Number"
                :rules="companyPhoneRules"
              ></v-text-field>

              <v-text-field
                v-model="companyEmail"
                label="Company Email"
                :rules="companyEmailRules"
              ></v-text-field>

              <!-- <v-file-input
                label="Your ID Image"
                v-model="sellerIdPhoto"
                accept="image/*"
                :rules="sellerIdPhotoRules"
              ></v-file-input>

              <v-file-input
                label="A photo of you"
                v-model="sellerPhoto"
                accept="image/*"
                :rules="sellerPhotoRules"
              ></v-file-input> -->
            </v-form>
          </v-card-text>
          <div>
            <v-btn variant="text" color="white" @click="showTermsDialog = true">Seller Terms & Agreement</v-btn>
            <v-checkbox v-model="sellerAgreement" label="I agree to the Seller Terms & Agreement"></v-checkbox>
          </div><br>
          <v-card-actions>
            <v-spacer></v-spacer>           
            <v-btn color="pink" @click="closeSellerDialog">Cancel</v-btn>
            <v-btn color="blue" @click="submitSellerRequest" :disabled="isSubmitDisabled">Submit</v-btn>
            
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for seller terms and agreement -->
      <v-dialog v-model="showTermsDialog" max-width="600">
        <v-card class="bg-grey-darken-4">
          <v-card-title>Seller Agreement Terms</v-card-title>
            <v-card-text>
              <p>
                <strong style="color: #15f0dee7;">Ticket Emporium Seller Agreement</strong><br>
                This agreement is made between Ticket Emporium (company) and you, (seller)  who desires to use the Ticket Emporium platform to sell tickets for events.
              </p><br>

              <p><strong style="color: #15f0dee7;">Scope of Agreement</strong></p>
              <p>
                This Agreement sets forth the terms and conditions under which the Seller may offer tickets for sale on the Ticket Emporium platform. By registering as a Seller on the Ticket Emporium platform, the Seller agrees to be bound by the terms and conditions of this Agreement.
              </p><br>

              <p><strong style="color: #15f0dee7;">Seller Obligations</strong></p>
              <p>
                The Seller shall be solely responsible for some aspects of the sale of tickets, including but not limited to pricing and fulfillment of the event. The Seller shall be responsible for accurately describing the tickets quantity and venue of the event in a timely and professional manner.
              </p>
              <p>
                Additionally, once the Seller's account is verified, they shall also be obligated to create awareness of their events before creating the event on TicketEmporium through social media platforms, with a particular emphasis on Twitter.
              </p><br>

              <p><strong style="color: #15f0dee7;">Fraud Prevention</strong></p>
              <p>
                The Company takes fraud prevention very seriously and has implemented various measures to prevent fraud. The Seller agrees to comply with all fraud prevention measures put in place by the Company, including but not limited to verifying the authenticity of all tickets before listing them for sale.
              </p><br>

              <p><strong style="color: #15f0dee7;">Fraudulent Activity</strong></p>
              <p>
                If the Company suspects that the Seller has engaged in any fraudulent activity, including but not limited to selling counterfeit tickets, the Company reserves the right to immediately terminate the Seller's account and take legal action against the Seller.
              </p><br>

              <p><strong style="color: #15f0dee7;">Repercussions</strong></p>
              <p>
                If the Seller engages in any fraudulent activity, the Seller shall be responsible for all damages incurred by the Company as a result of such activity, including but not limited to chargeback fees and legal fees.
              </p><br>

              <p><strong style="color: #15f0dee7;">Indemnification</strong></p>
              <p>
                The Seller agrees to indemnify and hold the Company harmless from any and all claims, damages, or expenses arising out of or in connection with the Seller's use of the Ticket Emporium platform, including but not limited to any claims arising from fraudulent activity.
              </p><br>

              <p><strong style="color: #15f0dee7;">Termination</strong></p>
              <p>
                This Agreement may be terminated by either party at any time, with or without cause. The Company reserves the right to terminate the Seller's account immediately if the Seller breaches any of the terms of this Agreement, including engaging in fraudulent activity.
              </p><br>

              <p><strong style="color: #15f0dee7;">Governing Law</strong></p>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising out of or in connection with this Agreement shall be resolved in the courts of the Republic of Kenya.
              </p><br>

              <p>
                By registering as a Seller on the Ticket Emporium platform, the Seller acknowledges that they have read and agree to be bound by the terms and conditions of this Agreement.
              </p>

            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="showTermsDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

         <!-- success snackbar -->
         <v-snackbar v-model="successAlert" color="success" timeout="5500">
            {{ successMessage }}
          </v-snackbar>

          <!-- error snackbar -->
          <v-snackbar v-model="errorAlert" color="error" timeout="5500">
            {{ errorMessage }}
          </v-snackbar>

    </footer>
  </div>
</template>

<script>
import logo from '@/assets/logowhite.png'; //import logo
import slogan from '@/assets/sloganwhite.png'; //import slogan
import axios from 'axios';

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      logo: logo,
      slogan: slogan,
      sellerDialog: false,
      sellerName: '',
      sellerEmail: '',
      sellerPhone: '',
      sellerIdNumber: '',
      // sellerIdPhoto: null,
      // sellerPhoto: null,
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      showTermsDialog: false,
      sellerAgreement: false,
      successAlert: false,
      successMessage: '',
      errorAlert: false,
      errorMessage: '',
      sellerNameRules: [
        v => !!v || 'Full Name is required',
      ],
      sellerEmailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      sellerPhoneRules: [
        v => !!v || 'Phone Number is required',
        v => (v && /^[0-9]+$/.test(v)) || 'Enter a valid phone number',
        v => (v && v.length === 10 && v.charAt(0) === '0') || 'Phone Number must start with 0 and have 10 digits'
      ],
      sellerIdNumberRules: [
        v => !!v || 'ID Number is required',
      ],
      companyNameRules: [
        v => !!v || 'Company Name is required',
      ],
      companyAddressRules: [
        v => !!v || 'Company Address is required',
      ],
      companyPhoneRules: [
        v => !!v || 'Company Phone Number is required',
        v => (v && /^[0-9]+$/.test(v)) || 'Enter a valid phone number',
        v => (v && v.length === 10 && v.charAt(0) === '0') || 'Phone Number must start with 0 and have 10 digits'
      ],
      companyEmailRules: [
        v => !!v || 'Company Email is required',
        v => /.+@.+\..+/.test(v) || 'Company Email must be valid',
      ],
      // sellerIdPhotoRules: [
      //   v => !!v || 'ID Image is required',
      // ],
      // sellerPhotoRules: [
      //   v => !!v || 'Photo of you is required',
      // ],
    };
  },
  computed: {
    isSubmitDisabled() {
      // Check all form field validation rules and the seller agreement
      const isNameValid = this.sellerNameRules.every(rule => rule(this.sellerName) === true);
      const isEmailValid = this.sellerEmailRules.every(rule => rule(this.sellerEmail) === true);
      const isPhoneValid = this.sellerPhoneRules.every(rule => rule(this.sellerPhone) === true);
      const isIdNumberValid = this.sellerIdNumberRules.every(rule => rule(this.sellerIdNumber) === true);
      const isCompanyNameValid = this.companyNameRules.every(rule => rule(this.companyName) === true);
      const isCompanyAddressValid = this.companyAddressRules.every(rule => rule(this.companyAddress) === true);
      const isCompanyPhoneValid = this.companyPhoneRules.every(rule => rule(this.companyPhone) === true);
      const isCompanyEmailValid = this.companyEmailRules.every(rule => rule(this.companyEmail) === true);
      // const isSellerIdPhotoValid = this.sellerIdPhotoRules.every(rule => rule(this.sellerIdPhoto) === true);
      // const isSellerPhotoValid = this.sellerPhotoRules.every(rule => rule(this.sellerPhoto) === true);


      // Check the seller agreement checkbox
      const isAgreementAccepted = this.sellerAgreement;

      // Disable the submit button if any validation rule is not met or the agreement is not accepted 
      return !(isNameValid && isEmailValid && isPhoneValid && isIdNumberValid && isCompanyNameValid && isCompanyAddressValid && isCompanyPhoneValid && isCompanyEmailValid && isAgreementAccepted); 
      // && isSellerIdPhotoValid && isSellerPhotoValid
    },
  },
  methods: {
    redirectToHome() {
      this.$router.push('/');
    },
    openSellerDialog() {
      this.sellerDialog = true;
    },
    closeSellerDialog() {
      this.sellerDialog = false;
    },
    // handleSellerIdPhotoUpload(event) {
    //   this.sellerIdPhoto = event.target.files[0];
    // },
    // handleSellerPhotoUpload(event) {
    //   this.sellerPhoto = event.target.files[0];
    // },
    async submitSellerRequest() {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Assuming 'user' is the key in local storage

        if (user && user.id) {
          // If the user is logged in, include the user ID in the request
          const response = await axios.post('http://127.0.0.1:3003/api/v1/seller-requests', {
            sellerEmail: this.sellerEmail,
            sellerName: this.sellerName,
            sellerPhone: this.sellerPhone,
            companyName: this.companyName,
            companyAddress: this.companyAddress,
            companyPhone: this.companyPhone,
            companyEmail: this.companyEmail,
            sellerIdNumber: this.sellerIdNumber,
            userId: user.id, // Include the user's ID in the request
          });

          console.log(response)

          this.closeSellerDialog();
          this.successAlert = true;
          this.successMessage = 'Your request has been sent successfully. We will get back to you soon.';
        } else {
          // Handle the case when the user is not logged in or user.id is not available
          this.errorAlert = true;
          this.errorMessage = 'You need to be logged in to submit a seller request.';
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error('Error:', error);
        this.errorAlert = true;
        this.errorMessage = 'An error occurred while sending your request. Please try again later.';
      }
    },

  },
};
</script>

<style scoped>
.twitter-icon {
  fill: #1abcb2;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #202020;
  padding: 20px;
  width: 100%;
}

.footer-section {
  flex: 1 1 300px;
  margin: 5px;
  padding: 10px;
  max-width: 400px;
  text-align: center;
}

.footer-row {
  flex-basis: 100%;
  text-align: center;
  margin-top: 15px;
  padding: 10px;
}

.wrapper {
  margin-top: 100px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-image {
  width: 140px;
  height: 140px;
  cursor: pointer;
  margin-top: 1cm;
}

.slogan-image {
  height: 1.5cm;
  margin-top: 0.7cm;
}

.quick-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  margin-top: 20px;
}

.quick-links li {
  margin-bottom: 10px;
  
} 

.quick-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.quick-links a:hover {
  color: #14f0deaf;
}

.contact-info {
  text-align: center;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 55px;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  
}

/* Responsive styles for screens up to 600px */
@media screen and (max-width: 600px) {
  .footer {
    flex-direction: column;
    align-items: center;
  }
}
</style>
