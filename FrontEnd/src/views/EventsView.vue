<template>

  <!-- carousel -->
  <v-carousel cycle height="300" hide-delimiter-background show-arrows="hover" class="bg-grey-darken-4"  v-model="activeSlide">
    <h2 class="text-center font-weight-thin">Highlights</h2>
    <v-carousel-item v-for="(slide, i) in displayedSlides" :key="i">
      <v-row>
        <v-col cols="5">
          <v-img :src="slide.eventPoster" :height="250" contain />
        </v-col>
        <v-col cols="7">
          <v-card class="mx-auto" max-width="350">
            <v-card-item :title="slide.eventName" :subtitle="slide.venue" class="bg-grey-darken-4">
              <div>
                <div class="text-h6">{{ formatDate(slide.eventDate) }} <br> {{ formatTime(slide.eventTime) }}</div>
                <div class="text-caption">{{ slide.description }}</div>
              </div>
              <v-card-actions class="bg-grey-darken-4">
                <v-btn color="white" append-icon="mdi-cart" class="bg-primary" @click="addToCart(slide)" v-if="isLoggedIn">
                  Add to Cart
                </v-btn>
                <v-btn color="white" append-icon="mdi-heart" class="bg-pink" @click="saveEvent(slide)" v-if="isLoggedIn">
                  Save event
                </v-btn>
                <v-btn color="white" class="bg-pink" @click="showLoginAlert" v-else>
                  Add to Cart / Save Event
                </v-btn>
              </v-card-actions>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
  
    <!-- search bar -->
    <v-container fluid>
      <v-row justify="center" class="mt-3">
        <v-col cols="8" sm="6" md="4" lg="3">
          <v-btn block color="primary" @click="showFilterDialog = true"
            >Filter</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6" md="8" lg="6">
          <v-text-field
            v-model="search"
            placeholder="Search..."
            outlined
            clearable
            v-on:keyup.enter="searchEvents"
          >
            <template v-slot:append>
              <v-btn icon @click="searchEvents" class="bg-grey-darken-4">
                <v-icon color="#15f0dee7">mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  
    <!-- filter events dialog -->
    <v-dialog v-model="showFilterDialog" max-width="500">
      <v-card class="bg-grey-darken-4">
        <v-card-title>Filter Events</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="eventCategory"
                  :items="eventCategories"
                  label="Event Category"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <label for="fromdate">From</label>
                <input
                  type="date"
                  name="fromdate"
                  id="fromdate"
                  v-model="fromDate"
                  style="width: 100%; margin-bottom: 16px"
                />
              </v-col>
              <v-col cols="6">
                <label for="todate">To</label>
                <input
                  type="date"
                  name="todate"
                  id="todate"
                  v-model="toDate"
                  style="width: 100%; margin-bottom: 16px"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showFilterDialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="applyFilter">Filter</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  
      <!-- event card -->
      <v-row>
        <!-- <v-col cols="12" sm="6" md="4" v-for="(slide, i)  in paginatedSlides" :key="i">
          <v-card class="mx-auto custom-card" max-width="311" :elevation="22">
            <v-img :src="slide.eventPoster" :height="311" contain></v-img>
            <v-card-item :title="slide.eventName" :subtitle="slide.venue" class="bg-grey-darken-4">
              <div>
                <div class="text-h6" style="color: #1abcb2;">{{ formatDate(slide.eventDate) }}</div>
                <div class="text-caption">{{ formatTime(slide.eventTime) }}</div>
              </div>
            </v-card-item>
            <v-card-actions class="bg-grey-darken-4">
              <v-btn color="white" append-icon="mdi-cart" class="bg-primary" @click="addToCart(slide)" v-if="isLoggedIn">
                Add to Cart
              </v-btn>
              <v-btn color="white" append-icon="mdi-heart" class="bg-pink" @click="saveEvent(slide)" v-if="isLoggedIn">
                Save event
              </v-btn>
              <v-btn color="white" class="bg-pink" @click="showLoginAlert" v-else>
                Add to Cart / Save Event
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col> -->
        <v-col cols="12" sm="6" md="4" v-for="(slide, i)  in displaySlides" :key="i">
          <v-card class="mx-auto custom-card" max-width="311" :elevation="22">
            <v-img :src="slide.eventPoster" :height="311" contain></v-img>
            <v-card-item :title="slide.eventName" :subtitle="slide.venue" class="bg-grey-darken-4">
              <div>
                <div class="text-h6" style="color: #1abcb2;">{{ formatDate(slide.eventDate) }}</div>
                <div class="text-caption">{{ formatTime(slide.eventTime) }}</div>
                <div class="text-caption">Ksh. {{ slide.ticketPrice }}</div>
              </div>
            </v-card-item>
            <v-card-actions class="bg-grey-darken-4">
              <v-btn color="white" append-icon="mdi-cart" class="bg-primary" @click="addToCart(slide)" v-if="isLoggedIn">
                Add to Cart
              </v-btn>
              <v-btn color="white" append-icon="mdi-heart" class="bg-pink" @click="saveEvent(slide)" v-if="isLoggedIn">
                Save event
              </v-btn>
              <v-btn color="white" class="bg-pink" @click="showLoginAlert" v-else>
                Add to Cart / Save Event
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

        <!-- Cart dialog -->
        <v-dialog v-model="showCart" max-width="400">
          <v-card class="bg-grey-darken-4">
            <v-card-title>Your Cart</v-card-title>
            <v-card-text>
              <ul>
                <!-- Loop through items in the cart and display them -->
                <li v-for="(item, index) in cart" :key="index">
                  {{ item.eventName }} - Ksh. {{ item.ticketPrice }}
                  <v-btn @click="removeFromCart(item)" color="red" text>
                    Remove
                  </v-btn>
                </li>
              </ul>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showCart = false">Close</v-btn> 

              <v-btn>
               <paystack
                  buttonClass="button-class btn btn-primary"
                  buttonText="CHECKOUT"
                  :publicKey="publicKey"
                  :email="email"
                  :amount="totalAmount"
                  :reference="reference"
                  :onSuccess="onSuccessfulPayment"
                  :onCancel="onCancelledPayment"
                  :currency="'KES'"
                ></paystack>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>

         <!-- Help Form -->
         <v-dialog v-model="helpForm" max-width="400">
          <v-form @submit.prevent="submitForm">
          <v-card class="bg-grey-darken-4">
            <v-card-title>
              <span class="text-h5">How can we help you today?😊</span>
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
                      v-model="enteredEmail"
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
              <v-btn color="secondary" variant="text" @click="helpForm = false">
                Cancel
              </v-btn>
              <v-btn type="submit" color="secondary" variant="text" :disabled="!isFormValid">
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>


        <!--Fixed Cart button -->
        <v-btn
          color="primary"
          @click="handleCartButtonClick"
          class="cart-button"
          icon="mdi-cart"
        ><v-icon left>mdi-cart</v-icon>({{ cartItemCount }})</v-btn>

        <!-- Fixed Help button -->
        <v-btn
          color="secondary"
          @click="helpForm = true"
          class="help-button"
          icon="mdi-help"
        ><v-icon left>mdi-help</v-icon></v-btn> 


        <!-- Pagination buttons -->
        <div class="pagination-container">
          <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button previous-button">Prev</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button next-button">Next</button>
        </div>

       <!-- Snackbar for alert messages -->
       <v-snackbar v-model="showAlertSnackbar" :color="alertSnackbarColor" timeout="3500">
          {{ alertMessage }}
       </v-snackbar>

</template>
    
  
    
<script>
  import axios from 'axios';
  import paystack from "vue3-paystack";
  import { nanoid } from "nanoid";

  export default {
    components: {
      paystack,
    },
    data: () => ({
      cart: [], // Cart items
      slides: [], // Populate this array with the fetched events
      displayedSlides: [], // Displayed slides on the carousel
      upcomingEvents: [], // Upcoming events
      searchedEvents: [], // Searched events 
      search: '', // Search query
      showFilterDialog: false,
      eventCategory: [],
      fromDate: null,
      toDate: null,
      eventCategories: [
        'Music Concert',
        'Theatre & Performing Arts',
        'Clubbing Experience',
        'Conference/Seminar',
        'Other',
      ],     
      showAlertSnackbar: false, 
      alertMessage: '', // Message to display in the snackbar
      alertSnackbarColor: '', // Color of the snackbar
      activeSlide: 1,
      currentPage: 1,       // Current page number
      itemsPerPage: 6,      // Maximum number of items per page
      showCart: false,
      publicKey: 'pk_test_90da442066a6209b8d8ef95555048c19087f63f3',
      totalAmount: 0,
      //amount: 1000,
      email: 'mungaipeter640@gmail.com',
      firstname: 'User',
      lastname: 'User',
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      }, 
      helpForm: false,
      message: '',
      enteredEmail: '',
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
    mounted() {
      
      this.checkUserLoggedIn();
      this.fetchEvents();
    },
    computed: {
      paginatedSlides() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.upcomingEvents.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.slides.length / this.itemsPerPage);
      },
      cartItemCount() {
        return this.cart.length; // Compute the cart item count
      },
      displaySlides() {
        return this.search ? this.searchedEvents : this.paginatedSlides;
      },
      reference: function() {
        return nanoid(15);
      },
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
    created() {
      // Retrieve user details from local storage and set them to the component's data
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user.id = user.id || '';
        this.user.firstName = user.firstName || '';
        this.user.lastName = user.lastName || '';
        this.user.email = user.email || '';
        this.user.phoneNumber = user.phoneNumber || '';
      }
    },
    methods: {
      async saveEvent(slide) {
        this.selectedSlide = slide;

        console.log('Selected Slide:', this.selectedSlide.eventName);

        try {
          const response = await axios.post('http://127.0.0.1:3003/api/v1/saved-events', {
            event_id: this.selectedSlide.id,
            user_id: this.user.id,
          });

          
            this.showAlertSnackbar = true;
            this.alertMessage = 'Event saved.';
            this.alertSnackbarColor = 'success';
            console.log('Event saved:', response.data);
        
        } catch (error) {
          // Handle errors from the POST request
          console.error('Error saving event:', error);

          // Show an error message or take appropriate actions
          this.showAlertSnackbar = true;
          this.alertMessage = error.response.data.message;
          this.alertSnackbarColor = 'error';
        }
      },    
      addToCart(slide) {
        // Add the event to the cart
        this.cart.push(slide);

        this.selectedSlide = slide;

        // Recalculate the total amount
        this.calculateTotalAmount();

        // Show a success message
        this.showAlertSnackbar = true;
        this.alertMessage = 'Event added to cart.';
        this.alertSnackbarColor = 'success';
      },  
      removeFromCart(slide) {
        // Find the index of the selected event in the cart
        const index = this.cart.indexOf(slide);
        // console.log('Removing event at index:', index);

        // Remove the selected event from the cart by index
        if (index !== -1) {
          this.cart.splice(index, 1);

          // Recalculate the total amount
          this.calculateTotalAmount();
        }
      },
      calculateTotalAmount() {
        // Calculate the total amount
        this.totalAmount = this.cart.reduce((total, item) => {
          return total + item.ticketPrice;
        }, 0);
      },
      handleCartButtonClick() {
          if (this.cart.length > 0) {
            // Open the cart dialog if there are items in the cart
            this.showCart = true;
          } else {
            // Display a message if the cart is empty
            this.showAlertSnackbar = true;
            this.alertMessage = 'You have no events in your cart.';
            this.alertSnackbarColor = 'pink';
          }
      },
      applyFilter() {
        // Implement your filtering logic here
        console.log('Event Category:', this.eventCategory)
        console.log('From Date:', this.fromDate)
        console.log('To Date:', this.toDate)

        this.showFilterDialog = false // Close the dialog after applying the filter
      },
      searchEvents() {
        axios.get('http://127.0.0.1:3003/api/v1/events')
          .then(response => {
            // Handle the response from the backend
            this.events = response.data;

           // Filter events by name
            const query = this.search.toLowerCase(); // Convert the search query to lowercase
            this.searchedEvents = this.events.filter(event => {
              return event.eventName.toLowerCase().includes(query); // Check if the event name includes the query
            });

            if (this.searchedEvents.length === 0) {
            this.showSnackbar('No events found.', 'pink');
            } else {
              console.log('Events found:', this.searchedEvents);
            }

          })
          .catch(error => {
            // Handle any errors
            console.error('Error fetching events', error);
          });
      },
      showSnackbar(message, color = 'error') {
        this.alertMessage = message;
        this.alertSnackbarColor = color;
        this.showAlertSnackbar = true;
      },
      closeAlertSnackbar() {
        this.showAlertSnackbar = false;
      },
      showLoginAlert() {
        this.showSnackbar('You need to be logged in to buy tickets and save events.');
      },
      checkUserLoggedIn() {
        // Check if the user is logged in and update the 'isLoggedIn' property
        const token = localStorage.getItem('token');
        if (token) {
          this.isLoggedIn = true;
        }
      },
      fetchEvents() {
        // request to backend for fetching events
        axios.get('http://127.0.0.1:3003/api/v1/events')
          .then(response => {
            // Handle the response from the backend
            this.slides = response.data;


            // Slice the first 7 events to be displayed in the carousel
            this.displayedSlides = this.slides.slice(0, 7);

            // Get the current date
            const currentDate = new Date();
            
            // Filter events happening today or in the future
            this.upcomingEvents = this.slides.filter(slide => {
              const eventDate = new Date(slide.eventDate);
              return eventDate >= currentDate; // Compare event date with current date
            });

           // Filter events by name
            const query = this.search.toLowerCase(); // Convert the search query to lowercase
            this.searchedEvents = this.slides.filter(slide => {
              return slide.eventName.toLowerCase().includes(query); // Check if the event name includes the query
            });

            

          })
          .catch(error => {
            // Handle any errors
            console.error('Error fetching events', error);
          });
      },
      formatDate(dateString) {
        const options = { weekday: 'long' , month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      },
      formatTime(timeString) {
        // Split the time string to get the hours
        const [hours] = timeString.split(':');
        
        // Convert the hours to an integer
        const hoursInt = parseInt(hours, 10);

        // Determine whether it's AM or PM
        const period = hoursInt >= 12 ? 'PM' : 'AM';

        // Format the time as 'h A' (e.g., '8 PM')
        return `${hoursInt % 12 || 12} ${period}`;
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        const totalPages = Math.ceil(this.slides.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
        }
      },
      onSuccessfulPayment: function() {
         // Make a request to the backend to save the order
         axios.post('http://127.0.0.1:3003/api/v1/orders', {
            eventName: this.selectedSlide.eventName,
            seller_id: this.selectedSlide.user_id,
            user_id: this.user.id,
            buyer_firstName: this.user.firstName,
            buyer_lastName: this.user.lastName,
            venue: this.selectedSlide.venue,
            amount: this.selectedSlide.ticketPrice,
          })
          .then(() => {
            // Make a request to send the ticket
            axios.post('http://127.0.0.1:3003/api/v1/sendTicket', {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              eventName: this.selectedSlide.eventName,
              venue: this.selectedSlide.venue,
              price: this.selectedSlide.price,
            })
            .then(() => {
              // Update the ticket in your event
              axios.patch(`http://127.0.0.1:3003/api/v1/events/ticket/${this.selectedSlide.id}`)
              .then(() => {
                console.log('Ticket updated successfully.');
              })
              .catch(error => {
                console.error('Error updating ticket:', error);
              });
            })
            .catch(error => {
              console.error('Error sending ticket:', error);
            });
          })
          .catch(error => {
            console.error('Error saving order:', error);
          });


          //close the cart dialog
          this.showCart = false;

          // Show a success message
          this.showSnackbar('Payment successful. Check your email for your ticket.', 'success');

      },
      onCancelledPayment: function() {
        console.log("Payment cancelled by user");

        this.showSnackbar('Payment cancelled.', 'error');
      },
      async initializePayment() {
      //   try {

      //     //console.log('Selected Slide:', this.selectedSlide.user_id); 

      //     const orderResponse = await axios.post('http://127.0.0.1:3003/api/v1/orders', {
      //       eventName: this.selectedSlide.eventName,
      //       seller_id: this.selectedSlide.user_id,
      //       buyer_id: this.user.id,
      //       buyer_firstName: this.user.firstName,
      //       buyer_lastName: this.user.lastName,
      //       venue: this.selectedSlide.venue,
      //       amount: 10,
      //     });

      //     console.log('Order Response:', orderResponse);


      //     const ticketResponse = await axios.post('http://127.0.0.1:3003/api/v1/sendTicket', {
      //       firstName: this.user.firstName,
      //       lastName: this.user.lastName,
      //       email: this.user.email,
      //       eventName: this.selectedSlide.eventName,
      //       venue: this.selectedSlide.venue,
      //       price: this.selectedSlide.price,
      //     });

      //     console.log('Ticket Response:', ticketResponse);

      //     //close the cart dialog
      //     this.showCart = false;

      //     // Show a success message
      //     this.showSnackbar('Payment successful. Check your email for your ticket.', 'success');


      //     } catch (error) {
      //     // Handle errors (e.g., validation errors, network errors)
      //     console.error(error);

      //     this.showSnackbar('Payment failed.', 'error');

      //     }
  
      },  
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
            this.helpForm = false;

            //clear the form
            this.message = '';
            this.email = '';

            // Show a success message
            this.showAlertSnackbar = true;
            this.alertMessage = 'Your message has been sent successfully.';
            this.alertSnackbarColor = 'success';
          } else {
            // If the request fails, show an error message
            this.showAlertSnackbar = true;
            this.alertMessage = 'Failed to send your message. Please try again later';
            this.alertSnackbarColor = 'error';
            
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
  .cart-button {
    position: fixed;
    bottom: 20%; 
    right: 20px; 
    z-index: 9999; /* Ensure it's on top of other content */
  }
  .help-button {
    position: fixed;
    bottom: 10%; 
    right: 20px; 
    z-index: 9999; /* Ensure it's on top of other content */
  }
  .custom-card {
    margin-bottom: 20px; 
  }
  .v-card__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  }

  .v-card__subtitle {
    font-size: 160px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0.0075em;
  }

  .v-btn {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    margin-right: auto;
    margin-left: auto;
  }

  .pagination-container {
    text-align: center;
    margin-top: 40px;
  }

  .pagination-button {
    background-color: #1abcb2;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination-button:hover {
    background-color: #0d7a73;
  }

  .previous-button {
    border-radius: 5px 0 0 5px;
  }

  .next-button {
    border-radius: 0 5px 5px 0;
  }

  .cart-container {
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 20px;
  }

  .cart-container h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .cart-container ul {
    list-style-type: none;
    padding: 0;
  }

  .cart-container li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .cart-container button {
    background-color: #ff5733;
    color: white;
    border: none;
    cursor: pointer;
  }


  [type='date'] {
    background: #525252
      url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)
      97% 50% no-repeat;
    color: #fff;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 3px 5px;
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-bottom: 16px;
  }

  /* media query to hide the carousel on screens less than 700px */
@media screen and (max-width: 700px) {
  .v-carousel {
    display: none;
  }
}
    
</style>
    