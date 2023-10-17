<template>
    <v-card outlined class="bg-grey-darken-4">
      <v-layout>

          <!-- alert on successful edit -->
          <v-snackbar v-model="successAlert" color="success" timeout="3000">
            {{ successMessage }}
          </v-snackbar> 

        <v-navigation-drawer
          v-model="drawer"
          :rail="isSmallScreen ? true : rail"
          permanent
          @click="rail = false" 
          class="bg-grey-darken-4"
          :elevation="10"
        > <!-- true disables expansion of the drawer -->
       
          <!-- v-list-item for the profile picture -->
          <v-list-item
            prepend-avatar="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            :title="fullName"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="dashboard"
              @click="handleMenuItemClick('dashboard')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-bell"
              title="Notifications"
              value="notifications"
              @click="handleMenuItemClick('notifications')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-calendar-range"
              title="Events"
              value="events"
              @click="handleMenuItemClick('events')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-clipboard-list"
              title="Orders"
              value="orders"
              @click="handleMenuItemClick('orders')"
            ></v-list-item>
            <!-- <v-list-item
              prepend-icon="mdi-comment"
              title="Reviews"
              value="reviews"
              @click="handleMenuItemClick('reviews')"
            ></v-list-item> -->
            <v-list-item
              prepend-icon="mdi-cash-multiple"
              title="Funds"
              value="funds"
              @click="handleMenuItemClick('funds')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="Account Details"
              value="account"
              @click="handleMenuItemClick('account')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-face-agent"
              title="Suppport"
              value="support"
              @click="handleMenuItemClick('support')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-cog"
              title="Settings"
              value="settings"
              @click="handleMenuItemClick('settings')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-logout-variant"
              title="Logout"
              value="logout"
              @click="showLogoutConfirmationDialog"
            ></v-list-item>
          </v-list>
  
                  <!-- confirmation dialog for logout -->
                  <v-dialog v-model="logoutDialogVisible" max-width="500px">
                    <v-card class="bg-grey-darken-4">
                      <v-card-title>Confirmation</v-card-title>
                      <v-card-text>
                        Are you sure you want to Logout?
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="pink" text @click="logout">Logout</v-btn>
                        <v-btn text @click="cancelLogout">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
  
        </v-navigation-drawer>
  
        <!-- v-main area -->
        <v-main style="min-height: 550px;">
  
          <!-- Content based on selected menu item -->
          <div v-if="selectedMenuItem === 'notifications'">
            <div class="dashcontent">
              <v-container style="max-height: 500px; overflow-y: auto;" >
            <v-row justify="space-around">
              <v-card width="800" class="bg-grey-darken-4" :elevation="22">

                <v-card-text>
                  <div class="font-weight-bold ms-1 mb-2">
                    My Notifications
                  </div>

                  <v-timeline density="compact">
                    <v-timeline-item
                      v-for="notification in notifications"
                      :key="notification.id"
                      :dot-color="'#15f0dee5'"
                      size="x-small"
                    >
                      <div class="mb-4">
                        <div class="font-weight-bold">
                         from  <strong style="color: #15f0dee5; font-size: large; ">Ticket Emporium</strong>
                        </div>
                        <div class="font-weight-light">{{ notification.response }}</div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>


            </div>

          </div>

          <div v-else-if="selectedMenuItem === 'events'">
            <div class="dashcontent">
              <h3>My Events</h3><br>
              
              <v-btn color="primary" class="mr-2" @click="openAddEventForm">Add Event +</v-btn><br><br>

              <v-table fixed-header height="500px" class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th class="text-left bg-grey-darken-4">
                      Event Name
                    </th>
                    <th class="text-left bg-grey-darken-4">
                      Ticket Quantity
                    </th>
                    <!-- <th class="text-left bg-grey-darken-4">
                      Actions
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" :key="event.id"> 
                    <td>{{ event.eventName }}</td>
                    <td>{{ event.ticketQuantity }}</td>
                    <!-- <td>
                      <v-btn color="success" class="mr-2" @click="openSalesDialog" append-icon="mdi-cash-multiple">Sales</v-btn>
                      <v-btn color="primary" class="mr-2" @click="openEditFormDialog" append-icon="mdi-pencil">Edit</v-btn>
                      <v-btn color="red" @click="openDeleteConfirmationDialog" append-icon="mdi-trash-can-outline">Delete</v-btn>
                    </td> -->
                                      
                  </tr>
                </tbody>
              </v-table>

                <!-- Dialogs/Modals -->
                <v-dialog v-model="salesDialogVisible" max-width="800px">
                  <v-card class="bg-grey-darken-4">
                    <v-card-title>Sales Data</v-card-title>
                    <v-table fixed-header height="500px" class="bg-grey-darken-3">
                              <thead>
                                <tr>
                                  <th class="text-left bg-grey-darken-4">
                                    Event Name
                                  </th>
                                  <th class="text-left bg-grey-darken-4">
                                    Tickets Sold
                                  </th>
                                  <th class="text-left bg-grey-darken-4">
                                    Tickets Remaining
                                  </th>
                                  <th class="text-left bg-grey-darken-4">
                                    Revenue
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <!-- <tr v-for="item in tickets" :key="item.ticketcode"> -->
                                <tr>
                                  <td>Event One</td>
                                  <td>2</td>
                                  <td>98</td>
                                  <td>200</td>
                  
                                  <!-- <td>{{ item.eventname }}</td>
                                  <td>{{ item.ticketQuantity }}</td>
                                  <td>{{ item.purchasedate }}</td>
                                  <td>{{ item.purchasetime }}</td>
                                  <td>{{ item.ticketcode }}</td>
                                  <td>{{ item.status }}</td> -->
                                </tr>
                                <tr>
                                  <td>Event Two</td>
                                  <td>0</td>
                                  <td>100</td>
                                  <td>0</td>
                                </tr>
                              </tbody>
                            </v-table>
                    <v-card-actions>
                      <v-btn color="primary" @click="closeSalesDialog">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- Edit Event Form -->
                <v-dialog v-model="editFormDialogVisible" max-width="800px">
                  <v-card class="bg-grey-darken-4">
                    <v-card-title>Edit Form</v-card-title>
                    <!-- Add editable form component here -->
                    <!-- Example: <v-form> or custom form component -->
                    <v-card-actions>
                      <v-btn color="primary" @click="closeEditFormDialog">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- Delete Event Confirmation Dialog -->
                <v-dialog v-model="deleteConfirmationDialogVisible" max-width="500px">
                  <v-card class="bg-grey-darken-4">
                    <v-card-title>Confirmation</v-card-title>
                    <v-card-text>
                      Are you sure you want to delete this event?
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="red" text @click="deleteEvent">Delete</v-btn>
                      <v-btn text @click="closeDeleteConfirmationDialog">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- Add Event Form -->
                <v-dialog v-model="addEventFormVisible" max-width="800px">
                  <v-card class="bg-grey-darken-4">
                    <v-card-title>Add Event</v-card-title>
                    <v-card-text>
                        
                        <!-- Event details form -->
                        <v-form ref="eventForm" @submit.prevent="saveEvent">
                          <v-text-field label="Event Name" v-model="eventName"></v-text-field>

                      <!-- <v-file-input
                            label="Event Image"
                            v-model="eventImage"
                            accept="image/*"
                          ></v-file-input> -->
                          
                          <v-text-field label="Event Poster Link" v-model="eventPoster"></v-text-field>

                          <v-text-field
                            type="date"
                            label="Event Date"
                            v-model="eventDate"
                          ></v-text-field>

                          <v-text-field
                            type="time"
                            label="Event Time"
                            v-model="eventTime"
                          ></v-text-field>
            
                          <v-text-field label="Venue" v-model="venue"></v-text-field>

                          <v-select
                            label="Event Category"
                            v-model="eventCategory"
                            :items="eventCategories"
                          ></v-select>

                          <v-textarea label="Description" v-model="description"></v-textarea>
                          
                          <!-- Render ticket entries
                          <div v-for="(ticketEntry, index) in newTicketEntries" :key="index">
                            <h3>Ticket Entry {{ index + 1 }}</h3>
                            
                            <v-select
                              v-model="ticketEntry.type"
                              :items="ticketTypes"
                              label="Ticket Type"
                            ></v-select>
                            
                            <v-text-field label="Ticket Quantity" v-model="ticketEntry.quantity"></v-text-field>
                            <v-text-field label="Ticket Price" v-model="ticketEntry.price"></v-text-field>
                          </div> -->

                          <!-- Ticket Entry Form -->
                          <div>
                            <h3>Ticket Entry Form</h3>
                            <!-- Regular Ticket -->
                            <!-- <div>
                              <h4>Regular</h4>
                              <v-text-field label="Quantity" v-model="ticketEntries.regular.quantity"></v-text-field>
                              <v-text-field label="Price" v-model="ticketEntries.regular.price"></v-text-field>
                            </div> -->

                            <!-- VIP Ticket -->
                            <!-- <div>
                              <h4>VIP</h4>
                              <v-text-field label="Quantity" v-model="ticketEntries.vip.quantity"></v-text-field>
                              <v-text-field label="Price" v-model="ticketEntries.vip.price"></v-text-field>
                            </div> -->

                            <!-- VVIP Ticket -->
                            <!-- <div>
                              <h4>VVIP</h4>
                              <v-text-field label="Quantity" v-model="ticketEntries.vvip.quantity"></v-text-field>
                              <v-text-field label="Price" v-model="ticketEntries.vvip.price"></v-text-field>
                            </div> -->

                            <!-- General Admission Ticket -->
                            <div>
                              <h4>General Admission</h4>
                              <v-text-field label="Quantity" v-model="ticketQuantity"></v-text-field>
                              <v-text-field label="Price" v-model="ticketPrice"></v-text-field>
                            </div>
                          </div>


                          <!-- Button to add a new ticket entry -->
                          <!-- <v-btn color="primary" @click="addTicketEntry" class="mr-3">New Ticket Entry</v-btn> -->
                          <v-btn color="success" type="submit">Save Event</v-btn>
                        </v-form>
                        
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="closeAddEventForm">Close</v-btn>
                    </v-card-actions>

                  </v-card>
                </v-dialog>

            </div>    
  
          </div>

          <div v-else-if="selectedMenuItem === 'orders'">
            <div class="dashcontent">
            <h3>All Orders</h3>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Amount</th>
                    <th>Cust. First Name</th>
                    <th>Cust. Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.eventName }}</td>
                    <td>{{ order.amount }}</td>
                    <td>{{ order.buyer_firstName }}</td>
                    <td>{{ order.buyer_lastName }}</td>
                  </tr>
                </tbody>
              </v-table>
            
            </div>
  
          </div>
  
          <div v-else-if="selectedMenuItem === 'reviews'">
            <div class="dashcontent">
              <h3>Reviews</h3>
            </div>
           
          </div>
  
          <div v-else-if="selectedMenuItem === 'funds'">
            <div class="dashcontent">
              <h3>My Funds</h3>
            </div>
          </div>

          <div v-else-if="selectedMenuItem === 'account'">
            <div class="dashcontent">
              <v-card outlined class="bg-grey-darken-4">
            <v-card-text>
              <v-row>
                <!-- Profile Picture Outline -->
                <!-- <v-col cols="12" sm="4">
                  Add your profile picture outline here -->
                  <!-- <div class="profile-picture-outline"> -->

                    <!-- <h2> Hi, {{ capitalizeFirstName(user.firstName) }} 👋🏽</h2><br> -->
                    <!-- You can use an image or an icon for the outline -->
                    <!-- <img 
                    src="https://avatars.githubusercontent.com/u/105963182?v=4" 
                    alt="Profile Outline"
                    style="width: 190px; height: 190px; border-radius: 50%;"
                     /> -->
                     <!-- <v-icon color="primary" @click="$refs.imageInput.click()">mdi-pencil</v-icon> -->
                <!-- Hidden file input
                <input ref="imageInput" type="file" accept="image/*" style="display: none;" @change="handleImageUpload" />
             </div>
                </v-col> -->

                <!-- Editable Form Fields -->
                <v-col cols="12" sm="8">
                  <h2> Hi, {{ capitalizeFirstName(user.firstName) }} 👋🏽</h2><br>
                  <!-- Editable form fields for firstname, lastname, email and phone no -->
                  <v-form @submit.prevent="editDetails">
                    <v-text-field v-model="user.firstName" label="First Name" 
                    :rules="[
                      v => !!v || 'First Name is required',
                      v => (v && v.length <= 12) || 'Maximum 12 characters'
                    ]"
                    ></v-text-field>
                    <v-text-field v-model="user.lastName" label="Last Name"
                    :rules="[
                      v => !!v || 'Last Name is required',
                      v => (v && v.length >= 3) || 'Minimum 3 characters',
                      v => (v && v.length <= 12) || 'Maximum 12 characters'
                    ]"
                    ></v-text-field>
                    
                    <v-text-field v-model="user.phoneNumber" label="Phone Number"
                    :rules="[
                      v => !!v || 'Phone Number is required',
                      v => (v && /^[0-9]+$/.test(v)) || 'Enter a valid phone number',
                      v => (v && v.length === 10 && v.charAt(0) === '0') || 'Phone Number must start with 0 and have 10 digits'
                    ]"
                    ></v-text-field>

                    <v-text-field v-model="user.email" label="Email"
                    readonly 
                    :rules="[
                      v => !!v || 'Email is required', 
                      v => /.+@.+\..+/.test(v) || 'Enter a valid email address'
                    ]"
                    ></v-text-field>
                     <v-subheader class="subheader">If you need to change your email, please write us through support.</v-subheader><br><br>
                              
                    <v-btn  type="submit" color="primary">Save</v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

            </div>  
            
          </div>

          <div v-else-if="selectedMenuItem === 'support'">
            <div class="dashcontent">
               <h3>Support</h3>
               <v-form @submit.prevent="submitForm">
                <v-textarea
                  label="Message *"
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="How may we help you today?"
                  v-model="message"
                  :rules="messageRules"
                ></v-textarea>
                <small>* indicates required field</small><br><br>
                <v-btn color="primary" @click="submitForm" :disabled="!isFormValid">Send</v-btn>
              </v-form><br><br>

              <div>You can also call us on <strong style="color: #15f0dee5;">+254 720 888 904</strong></div>
            </div>
            
          </div>

          <div v-else-if="selectedMenuItem === 'settings'">
            <div class="dashcontent">
            <h3>Settings</h3>
              <v-card outlined class="bg-grey-darken-4">
                <v-card-title>Change Password</v-card-title>
                <!-- Current Password Field -->
                <div class="card-content">
                  <v-text-field
                  v-model="currentPassword"
                  label="Current Password"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  required
                  :rules="passwordRules"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-text-field
                  v-model="confirmNewPassword"
                  label="Confirm New Password"
                  required
                  :rules="passwordRules"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-btn color="primary" @click="changePassword" :disabled="isChangePasswordDisabled">Change Password</v-btn>


                <!-- Toggle Switch for Email Promos and Newsletters -->
                <v-switch
                  v-model="user.receivePromos"
                  label="Receive Email Promos and Newsletters"
                  color="primary"
                  @change="updateReceivePromos"
                ></v-switch>

                <!-- Button for Adding/Editing Payment Methods -->
                <!-- <div>
                  <v-btn color="primary" @click="editPaymentMethods">Payment Methods</v-btn>
                </div><br> -->

                <!-- Button for Account Deactivation -->
                <div>
                  <v-btn color="error" @click="showConfirmationDialog">Deactivate Account</v-btn>

                  <!-- Confirmation Dialog -->
                  <v-dialog v-model="dialogVisible" max-width="500px">
                    <v-card class="bg-grey-darken-4">
                      <v-card-title>Confirmation</v-card-title>
                      <v-card-text>
                        Are you sure you want to deactivate your account?
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="pink" text @click="deactivateAccount">YES</v-btn>
                        <v-btn text @click="cancelDeactivation">NO</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div><br>
              </div>
              </v-card>
    
          </div>
      
          </div>
  
          <!-- Default content when no menu item is selected -->
          <div v-else>
          
              <div class="dashcontent">
              <h3>Merchant Dashboard</h3><br>

              <v-row>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'info'" class="text-center">
                    <v-icon>mdi-cash-multiple</v-icon>
                    <v-card-title>Total Earnings</v-card-title>
                    <v-card-text>KES {{ moneyCount }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'pink'" class="text-center">
                    <v-icon>mdi-ticket</v-icon>
                    <v-card-title>Tickets Sold</v-card-title>
                    <v-card-text>{{ ticketCount }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'primary'" class="text-center">
                    <v-icon>mdi-cash-minus</v-icon>
                    <v-card-title>Amount Withdrawn</v-card-title>
                    <v-card-text>KES 0.00</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'success'" class="text-center">
                    <v-icon>mdi-wallet</v-icon>
                    <v-card-title>Current Balance</v-card-title>
                    <v-card-text>{{ moneyCount }}</v-card-text>
                  </v-card>
                </v-col>
                
              </v-row><br><br>

              <h3>My Events</h3>

              <v-table fixed-header height="500px" class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th class="text-left bg-grey-darken-4">
                      Event Name
                    </th>
                    <!-- <th class="text-left bg-grey-darken-4">
                      Actions
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" :key="event.id"> 
                    <td>{{ event.eventName }}</td>
                    <!-- <td>
                      <v-btn color="success" class="mr-2" @click="openSalesDialog" append-icon="mdi-cash-multiple">Sales</v-btn>
                      <v-btn color="primary" class="mr-2" @click="openEditFormDialog" append-icon="mdi-pencil">Edit</v-btn>
                      <v-btn color="red" @click="openDeleteConfirmationDialog" append-icon="mdi-trash-can-outline">Delete</v-btn>
                    </td> -->
                                      
                  </tr>
                </tbody>
              </v-table>



              <!-- <v-table fixed-header height="500px" class="bg-grey-darken-3">
                  <thead>
                    <tr>
                      <th class="text-left bg-grey-darken-4">
                        Event Name
                      </th>
                      <th class="text-left bg-grey-darken-4">
                        Tickets Sold
                      </th>
                      <th class="text-left bg-grey-darken-4">
                        Tickets Remaining
                      </th>
                      <th class="text-left bg-grey-darken-4">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tickets" :key="item.ticketcode"> 
                    <tr>
                     
                      >
                    </tr>
                  </tbody>
                </v-table> -->
            </div>

          </div>

            <!-- Footer -->
            <v-footer app class="bg-grey-darken-4">
              <v-btn color="#15f0dee5" @click="showTermsDialog" variant="text">Seller Terms and Agreement</v-btn>
              <v-spacer></v-spacer>
              <span>&copy; Ticket Emporium, {{ currentYear }}</span>
            </v-footer>

            <!-- Dialog for displaying seller agreement terms -->
            <v-dialog v-model="termsDialog" max-width="60%" overlay-opacity="0.8">
              <v-card class="bg-grey-darken-4">
                <v-card-title>Seller Agreement and Terms</v-card-title>
                <v-card-text>
                  <p>
                    <strong style="color: #15f0dee7;">Ticket Emporium Seller Agreement</strong><br>
                    This agreement was made between Ticket Emporium (company) and {{fullName}}, (seller)  who desires to use the Ticket Emporium platform to sell tickets for events.
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
                    Additionally, once the Seller's account is verified, they shall also be obligated to create awareness of their events through social media platforms, with a particular emphasis on Twitter.
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
                  <v-btn color="pink" @click="closeTermsDialog">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
        drawer: true,
        rail: true,
        selectedMenuItem: '', // Store the selected menu item value
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        emailPromos: false,
        dialogVisible: false,
        termsDialog: false,
        logoutDialogVisible: false,
        salesDialogVisible: false,
        editFormDialogVisible: false,
        deleteConfirmationDialogVisible: false,
        addEventFormVisible: false,        
        // eventImage: null,
        eventPoster: '',
        eventName: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        eventCategory: null,
        description: '',
        ticketQuantity: '',
        ticketPrice: '',
  
        // ticketEntries: {
        //   regular: {
        //     quantity: '',
        //     price: '',
        //   },
        //   vip: {
        //     quantity: '',
        //     price: '',
        //   },
        //   vvip: {
        //     quantity: '',
        //     price: '',
        //   },
        //   generalAdmission: {
        //     quantity: '',
        //     price: '',
        //   },
        // },
 
        // ticketEntries: [],
        // ticketTypes: ['Regular', 'VIP', 'VVIP', 'General Admission'],
        // newTicketEntries: [{ type: '', quantity: '', price: '' }],
        eventCategories: ['Music Concert', 'Sports', 'Theatre & Performing Arts', 'Clubbing Experience', 'Conference/Seminar', 'Festival', 'Other'],
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        },
        successAlert: false,
        successMessage: '',
        errorAlert: false,
        errorMessage: '',
        notifications: [],
        events: [],
        orders: [],
        ticketCount: null, // Store the number of tickets
        moneyCount: null, 
        message: '',
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
      if (user) {
        this.user.id = user.id || '';
        this.user.firstName = user.firstName || '';
        this.user.lastName = user.lastName || '';
        this.user.email = user.email || '';
        this.user.phoneNumber = user.phoneNumber || '';
        this.user.receivePromos = user.receivePromos || false;

        // Initialize originalReceivePromos
      this.originalReceivePromos = this.user.receivePromos;
      }
    },
    mounted () { 
      this.fetchNotifications();
      this.fetchEvents();
      this.fetchOrders();
      this.fetchTicketData();
      this.fetchMoneyData();
    },
    computed: {
      fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
      },
      isChangePasswordDisabled() {
        return (
          !this.currentPassword ||
          !this.newPassword ||
          !this.confirmNewPassword ||
          !this.passwordRules.every(rule => rule(this.newPassword) === true)
        );
      },
      isFormValid() {
        return this.messageRules.every(rule => rule(this.message) === true);
      },
      isSmallScreen() {
        return window.innerWidth <= 700; // Check the screen width here
      },
    
    },
    methods: {
    // Handle menu item clicks by updating the selectedMenuItem
    handleMenuItemClick(itemValue) {
      this.selectedMenuItem = itemValue;
    },

    async editDetails() {
        try {
          // Retrieve the existing user data from local storage
          const storedUserData = JSON.parse(localStorage.getItem('user'));

          // Create an object to store the updated properties
          const updatedData = {
            id: this.user.id, // Include the user's ID
          };

          // Check if firstName is different and update if necessary
          if (this.user.firstName !== storedUserData.firstName) {
            updatedData.firstName = this.user.firstName;
          }

          // Check if lastName is different and update if necessary
          if (this.user.lastName !== storedUserData.lastName) {
            updatedData.lastName = this.user.lastName;
          }

          // Check if email is different and update if necessary
          if (this.user.email !== storedUserData.email) {
            updatedData.email = this.user.email;
          }

          // Check if phoneNumber is different and update if necessary
          if (this.user.phoneNumber !== storedUserData.phoneNumber) {
            updatedData.phoneNumber = this.user.phoneNumber;
          }

          // Send a PATCH request to your backend with only the updated properties
          const response = await axios.patch(
            `http://127.0.0.1:3003/api/v1/users/${this.user.id}`,
            updatedData
          );

          // Check the response status code
          if (response.status === 201) {
            // User details were successfully updated
            // Optionally, you can show a success message to the user
            console.log('User details updated successfully');

            // Merge the updated data with the existing user data
            const updatedUser = { ...storedUserData, ...updatedData };

            // Save the updated user object to localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Redirect the user to the account details page or any other page
            // this.$router.push('/account-details');
            // Set the success message and show the success alert
            this.successMessage = 'Your details have been updated successfully';
            this.successAlert = true;
          } else {
            // Handle other status codes (e.g., 400 for validation errors)
            console.error('Error updating user details:', response.data);
          }
        } catch (error) {
          // Handle network errors or other issues
          console.error('Error during user details update:', error);
          this.errorMessage = 'An error occurred while updating your details. Please try again later.';
          this.errorAlert = true;
        }
    },

    async changePassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        // Passwords do not match
        this.errorAlert = true;
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        // Make a request to the backend to change the password
        const response = await axios.post('http://127.0.0.1:3003/api/v1/change-password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          user_id: this.user.id, // Include the user_id in the request data
        });

          // Password changed successfully
          this.successAlert = true;
          this.successMessage = response.data.message;

          // Clear the form fields
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
        
      } catch (error) {
        // Handle other types of errors
          console.error('Error during login:', error);
          this.errorAlert = true;
          this.errorMessage = error.response.data.message; 
      }
    },

    async updateReceivePromos() {
      // Check if the receivePromos value has changed
      if (this.user.receivePromos !== this.originalReceivePromos) {
        try {
          const response = await axios.patch(`http://127.0.0.1:3003/api/v1/users-promo/${this.user.id}`, {
            receivePromos: this.user.receivePromos
          });

            // User updated successfully
            console.log('User updated', response.data.message);
            this.successAlert = true;
            this.successMessage = 'Your promotions preference has been updated successfully';
            
            // Update originalReceivePromos
            this.originalReceivePromos = this.user.receivePromos;

            // Save the updated user object to localStorage
            const storedUserData = JSON.parse(localStorage.getItem('user'));

            // Update only the 'receivePromos' property
            storedUserData.receivePromos = this.user.receivePromos;

            // Save the updated user object back to local storage
            localStorage.setItem('user', JSON.stringify(storedUserData));

        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error updating user', error);
          this.errorAlert = true;
          this.errorMessage = 'An error occurred while updating your promo preference';
        }
      }
    },    
  
    // Handle image upload logic (commented out for now)
    // handleImageUpload(event) {
    //   // Implement image upload logic here
    //   // const selectedFile = event.target.files[0];
    //   // You can now upload the selected file to your server or process it as needed
    // },
  
    // Implement the logic for editing payment methods
    editPaymentMethods() {
      // Add your payment methods editing logic here
    },
    showConfirmationDialog() {
      // Set dialogVisible to true to open the confirmation dialog
      this.dialogVisible = true;
    },
    showTermsDialog() {
      this.termsDialog = true;
    },
    closeTermsDialog() {
      this.termsDialog = false;
    }, 
    async deactivateAccount() {
      try {
        // Make a request to the backend to deactivate the account
        const response = await axios.patch('http://127.0.0.1:3003/api/v1/deactivate-account', {
          user_id: this.user.id, // Include the user_id in the request data
        });

        // Close the dialog
        this.dialogVisible = false;

        // Account deactivated successfully
        console.log('Account deactivated', response.data.message);

        this.successAlert = true;
        this.successMessage = 'Your account has been deactivated. We are sorry to see you go. You will be logged out of your account in 10 seconds.';
        
        // Remove the user, token, and roleIds from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("roleIds");

        // Redirect the user to the login page and force a page reload
        setTimeout(() => {
          // Redirect the user to the login page and force a page reload
          window.location.href = '/login';
        }, 10000); // 10000 milliseconds (10 seconds)

      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error deactivating account', error);
        this.errorAlert = true;
        this.errorMessage = 'We could not deactivate your account at this time. Please try again later.';
      }

      this.dialogVisible = false;
    }, 
    cancelDeactivation() {
      // Perform any necessary actions to cancel deactivation
      // ...
      // Close the dialog
      this.dialogVisible = false;
    },
    showLogoutConfirmationDialog() {
      // Set dialogVisible to true to open the confirmation dialog
      this.logoutDialogVisible = true;
    },
    logout() {
      // Remove the user, token, and roleIds from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("roleIds");

      // Close the logout dialog
      this.logoutDialogVisible = false;

      // Redirect the user to the login page
      //this.$router.push('/login');

      // Redirect the user to the login page and force a page reload
      window.location.href = '/login';
    },
    cancelLogout() {
      // Close the dialog
      this.logoutDialogVisible = false;
    },
    openSalesDialog() {
      this.salesDialogVisible = true;
    },
    closeSalesDialog() {
      this.salesDialogVisible = false;
    },
    openEditFormDialog() {
      this.editFormDialogVisible = true;
    },
    closeEditFormDialog() {
      this.editFormDialogVisible = false;
    },
    openDeleteConfirmationDialog() {
      this.deleteConfirmationDialogVisible = true;
    },
    closeDeleteConfirmationDialog() {
      this.deleteConfirmationDialogVisible = false;
    },
    deleteEvent() {
      // Implement your delete event logic here
      // Close the confirmation dialog after deletion
      this.closeConfirmationDialog();
    },
    openAddEventForm() {
      this.addEventFormVisible = true;
    },   
    closeAddEventForm() {
      // Reset form data and close the dialog
      this.$refs.eventForm.reset();
      this.eventImage = null;
      this.ticketEntries = [{ type: '', quantity: '', price: '' }];
      this.addEventFormVisible = false;
    },
    addTicketEntry() {
      // Add a new empty ticket entry form
      this.ticketEntries.push({ type: '', quantity: '', price: '' });
    },   
    async saveEvent() {
      try {

        // Prepare the event data object to send to the backend
        const eventData = {
          eventName: this.eventName,
          eventPoster: this.eventPoster,
          eventDate: this.eventDate,
          eventTime: this.eventTime,
          venue: this.venue,
          category: this.eventCategory,
          description: this.description,
          user_id: this.user.id,
          ticketQuantity: 100,
          ticketPrice: 1000,
        };

        const eventResponse = await axios.post('http://127.0.0.1:3003/api/v1/events', eventData);

        const Id = eventResponse.data.eventId;

        console.log(Id)

        // Prepare and send the ticket entries data to the backend
        const ticketData = {
          event_id: Id,
          eventName: this.eventName,
          ticketType: 'General Admission',
          quantity: this.ticketQuantity,
          price: this.ticketPrice,
        };


        const ticketResponse = await axios.post('http://127.0.0.1:3003/api/v1/tickets', ticketData);

        // You can use the ticketResponse for further processing or error handling if needed
        console.log('Ticket Response:', ticketResponse);

        this.successAlert = true;
        this.successMessage = 'Event Created successfully';

        //close form and reset
        this.$refs.eventForm.reset();
        this.eventImage = null;
        this.ticketEntries = [{ type: '', quantity: '', price: '' }];
        this.addEventFormVisible = false;

        
      } catch (error) {
        // Handle errors (e.g., validation errors, network errors)
        console.error(error);

        this.errorAlert = true;
        this.successMessage = 'Something went wrong. Please try again';



      }
    },   
    capitalizeFirstName(firstName) {
      // Capitalize the first letter of the first name
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }, 
    async fetchEvents() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/events/user/${this.user.id}`);
        
        this.events = response.data.reverse();
        console.log(this.events); 
              
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchNotifications() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/message-responses/user/${this.user.id}`);
        
        this.notifications = response.data.reverse();
        console.log(this.notifications); 
              
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/orders/seller/${this.user.id}`);
        
        this.orders = response.data;
        console.log(this.notifications); 
                

      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchTicketData() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/ticket-count/${this.user.id}`);
        const count = response.data; // Assuming the response is directly the number

        this.ticketCount = count;
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchMoneyData() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/orders-revenue/user/${this.user.id}`);
        const count = response.data; // Assuming the response is directly the number

        this.moneyCount = count;
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
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
  };
  </script>


  <style scoped>
  .dashcontent {
    margin: 0 50px; 
  }
  
  th {
    background-color: #333;
    color: #fff;
    font-weight: bold;
  
  }
  
  .v-table {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1em;
    width: 99%;
    height: 400px;
  }
  
  .v-table thead tr {
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }
  
  .v-table tbody tr:nth-child(even) {
    background-color: #f2f2f21e;
  }
  
  .v-table tbody tr:hover {
    background-color: #f2f2f277;
  }
  
  .subheader {
    font-size: 12px;
    color: #999;
    margin-top: 0;
  }
  </style>