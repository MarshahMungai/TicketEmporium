<template>
    <v-card outlined class="bg-grey-darken-4">
      <v-layout>
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
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
              @click="handleMenuItemClick('users')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-card-account-details"
              title="Roles"
              value="roles"
              @click="handleMenuItemClick('roles')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-calendar-range"
              title="Events"
              value="events"
              @click="handleMenuItemClick('events')"
            ></v-list-item>
            <!-- <v-list-item
              prepend-icon="mdi-clipboard-list"
              title="Orders"
              value="orders"
              @click="handleMenuItemClick('orders')"
            ></v-list-item> -->
            <v-list-item
              prepend-icon="mdi-account-star"
              title="Seller Account Requests"
              value="sellerrequests"
              @click="handleMenuItemClick('sellerrequests')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-message"
              title="Messages"
              value="messages"
              @click="handleMenuItemClick('messages')"
            ></v-list-item>
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
        <v-main style="min-height: 600px;">
  
          <!-- Content based on selected menu item -->
          <div v-if="selectedMenuItem === 'users'">
            <h3>All Users</h3>
            <v-btn color="primary" class="mr-2" @click="openUpdateUserForm">Update User</v-btn>
            <v-btn color="primary" class="mr-2" @click="openReactivateUserForm">Reactivate User</v-btn><br><br>

            <v-table fixed-header class="bg-grey-darken-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.status }}</td>
                </tr>
              </tbody>
            </v-table>

             <!-- dialog for updating a user -->
              <v-dialog v-model="updateUserDialog" max-width="500px">
                <v-card class="bg-grey-darken-4">
                  <v-card-title>Update User</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="userId" label="User ID"></v-text-field>
                    <v-text-field v-model="newEmail" label="New Email"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="updateUser" color="primary">Update</v-btn>
                    <v-btn @click="closeUpdateUserForm">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- dialog for reactivating a user -->
              <v-dialog v-model="reactivateUserDialog" max-width="500px">
                <v-card class="bg-grey-darken-4">
                  <v-card-title>Reactivate User</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="userId" label="User ID"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="reactivateUser" color="primary">Update</v-btn>
                    <v-btn @click="closeReactivateUserForm">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

          </div>
  
          <div v-else-if="selectedMenuItem === 'roles'">
            <h3>Roles</h3>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.role }}</td>
                  </tr>
                </tbody>
              </v-table>
            
          </div>

          <div v-else-if="selectedMenuItem === 'account'">
            <div class="dashcontent">
              <v-card outlined class="bg-grey-darken-4">
                <v-card-text>
                  <v-row>
                     <!-- Profile Picture Outline -->
                    <!-- <v-col cols="12" sm="4"> -->
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
                      <!-- Editable form fields for firstname, lastname, email and phone no -->                      <!-- Editable form fields for firstname, lastname, email and phone no -->
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
                        :rules="[
                          v => !!v || 'Email is required', 
                          v => /.+@.+\..+/.test(v) || 'Enter a valid email address'
                        ]"
                        ></v-text-field>
                    
                        <v-btn  type="submit" color="primary">Save</v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
           
              </div>
              </v-card>
    
          </div>
      
          </div>

          <div v-else-if="selectedMenuItem === 'orders'">
            <h3>Orders</h3>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ticket Quantity</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.ticketQuantity }}</td>
                    <td>{{ order.user_id }}</td>
                  </tr>
                </tbody>
              </v-table>
            
          </div>

          <div v-else-if="selectedMenuItem === 'sellerrequests'">
            <h3>Seller Requests</h3>
            <v-btn color="primary" class="mr-2" @click="openApproveSellerForm">Approve Seller</v-btn><br><br>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Seller Name</th>
                    <th>Seller Phone</th>
                    <th>Seller Email</th>
                    <th>Seller ID Number</th>
                    <th>Company Name</th>
                    <th>Company Phone</th>
                    <th>Company Email</th>
                    <th>Company Address</th>
                    <th>Seller Verification Status</th>
                    <th>User Id</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="request in requests" :key="request.id">
                    <td>{{ request.id }}</td>
                    <td>{{ request.sellerName }}</td>
                    <td>{{ request.sellerPhone }}</td>
                    <td>{{ request.sellerEmail }}</td>
                    <td>{{ request.sellerIdNumber }}</td>
                    <td>{{ request.companyName }}</td>
                    <td>{{ request.companyPhone }}</td>
                    <td>{{ request.companyEmail }}</td> 
                    <td>{{ request.companyAdress }}</td>
                    <td>{{ request.sellerVerificationStatus }}</td>
                    <td>{{ request.user_id }}</td>
                  </tr>
                </tbody>
              </v-table>

              <!-- dialog for approving a seller -->
              <v-dialog v-model="approveSellerForm" max-width="500px">
                <v-card class="bg-grey-darken-4">
                  <v-card-title>Approve Seller</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="enteredRequestId" label="Request ID"></v-text-field>
                    <v-text-field v-model="enteredUserId" label="User ID"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="approveSeller">Submit</v-btn>
                    <v-btn @click="closeUserIdForm">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

          </div>

          <div v-else-if="selectedMenuItem === 'funds'">
            <h3>Funds</h3>

          </div>

          <div v-else-if="selectedMenuItem === 'messages'">
            <h3>Messages</h3>
            <v-btn color="primary" class="mr-2" @click="openResponseForm">Respond</v-btn>
            <v-btn color="primary" class="mr-2" @click="openEmailResponseForm">Respond via Email</v-btn><br><br>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>User Email</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="message in messages" :key="message.id">
                    <td>{{ message.id }}</td>
                    <td>{{ message.message }}</td>
                    <td>{{ message.user_email }}</td>
                    <td>{{ message.user_id }}</td>
                  </tr>
                </tbody>
              </v-table>

              <!-- dialog for responding to a message -->
              <v-dialog v-model="responseForm" max-width="500px">
                <v-card class="bg-grey-darken-4">
                  <v-card-title>Respond</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="enteredMessageId" label="Message ID"></v-text-field>
                    <v-text-field v-model="responseUserId" label="User ID"></v-text-field>
                    <v-textarea v-model="response" label="Response"></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="respond">Submit</v-btn>
                    <v-btn @click="closeResponseForm">Cancel</v-btn>
                  </v-card-actions>
                </v-card> 
              </v-dialog>

              <!-- dialog for responding to a message through email -->
              <v-dialog v-model="emailResponseForm" max-width="500px">
                <v-card class="bg-grey-darken-4">
                  <v-card-title>Respond</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="emailEmail" label="User Email Address"></v-text-field>
                    <v-textarea v-model="emailResponse" label="Response"></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="emailRespond">Submit</v-btn>
                    <v-btn @click="closeEmailResponseForm">Cancel</v-btn>
                  </v-card-actions>
                </v-card> 
              </v-dialog>

          </div>
  
          <div v-else-if="selectedMenuItem === 'events'">
            <h3>Events</h3>
            <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Event Name</th>
                    <th>Event Venue</th>
                    <th>Event Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in events" :key="event.id">
                    <td>{{ event.id }}</td>
                    <td>{{ event.eventName }}</td>
                    <td>{{ event.venue }}</td>
                    <td>{{ event.category }}</td>
                  </tr>
                </tbody>
              </v-table>
      
          </div>

          <!-- Default content when no menu item is selected -->
          <div v-else>  
            <div class="dashcontent">
              <h3>Admin Dashboard</h3><br>
              <v-row>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'info'" class="text-center">
                    <v-icon>mdi-account-group-outline</v-icon>
                    <v-card-title>Users</v-card-title>
                    <v-card-text>{{ userCount }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'pink'" class="text-center">
                    <v-icon>mdi-card-account-details</v-icon>
                    <v-card-title>Roles</v-card-title>
                    <v-card-text>{{ roleCount }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'primary'" class="text-center">
                    <v-icon>mdi-ticket</v-icon>
                    <v-card-title>Tickets Sold</v-card-title>
                    <v-card-text>{{ ticketCount }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-card :color="'success'" class="text-center">
                    <v-icon>mdi-calendar-range</v-icon>
                    <v-card-title>Events</v-card-title>
                    <v-card-text>{{ eventCount }}</v-card-text>
                  </v-card>
                </v-col>
                
              </v-row><br><br>

              <h4>All users</h4>
              <v-table fixed-header height="500px" class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.status }}</td>
                  </tr>
                </tbody>
              </v-table>

            </div>

          </div>

        </v-main>

            <!-- alert on successful edit -->
            <v-snackbar v-model="successAlert" color="success" timeout="3000">
                {{ successMessage }}
              </v-snackbar> 
            
            <!-- alert on error -->
            <v-snackbar v-model="errorAlert" color="error" timeout="3000">
                {{ errorMessage }}
              </v-snackbar>


      </v-layout>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        drawer: true,
        rail: true,
        selectedMenuItem: '', // Store the selected menu item value
        userCount: null, // Store the number of users
        roleCount: null, // Store the number of roles
        ticketCount: null, // Store the number of tickets
        eventCount: null, // Store the number of events
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        emailPromos: false,
        dialogVisible: false, // Controls the visibility of the dialog
        logoutDialogVisible: false,
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
        users: [],
        roles: [],
        events: [],
        orders: [],
        requests: [],
        messages: [],
        updateUserDialog: false,
        reactivateUserDialog: false,
        userId: '',
        newEmail: '',
        approveSellerForm: false,
        enteredRequestId: '',
        enteredUserId: '',
        responseForm: false,
        enteredMessageId: '',
        response: '',
        responseUserId: '',
        emailEmail: '',
        emailResponse: '',
        emailResponseForm: false,
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
    mounted() {
      
      this.fetchUserData();
      this.fetchRoleData();
      this.fetchTicketData();
      this.fetchEventData();
      this.fetchUsers();
      this.fetchRoles();
      this.fetchEvents();
      this.fetchOrders();
      this.fetchSellerRequests();
      this.fetchMessages();
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
      isSmallScreen() {
        return window.innerWidth <= 700; // Check the screen width here
      },
    },
    methods: {
    // Handle menu item clicks by updating the selectedMenuItem
    handleMenuItemClick(itemValue) {
      this.selectedMenuItem = itemValue;
    },
    // Capitalize the first letter of the first name
    capitalizeFirstName(firstName) {
      // Capitalize the first letter of the first name
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
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

          // Send a PATCH request to backend with only the updated properties
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
            this.errorMessage = 'An error occurred while updating your details. Please try again later.';
            this.errorAlert = true;
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
  
    // Show the confirmation dialog for account deactivation
    showConfirmationDialog() {
      // Set dialogVisible to true to open the confirmation dialog
      this.dialogVisible = true;
    },
  
    // Perform the logic for account deactivation
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
    async fetchUserData() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/users-count'); // Update the URL
        const count = response.data; // Assuming the response is directly the number

    
        this.userCount = count;
          // Handle the number as needed
          console.log(`User count: ${count}`);
          
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchTicketData() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/orders-count'); // Update the URL
        const count = response.data; // Assuming the response is directly the number

        this.ticketCount = count;
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchEventData() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/events-count'); // Update the URL
        const count = response.data; // Assuming the response is directly the number

        this.eventCount = count;
        
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchRoleData() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/roles-count'); // Update the URL
        const count = response.data; // Assuming the response is directly the number
    
        this.roleCount = count;      
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/users');
        
        this.users = response.data;
        console.log(this.users);
          
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    openUpdateUserForm() {
      this.updateUserDialog = true;
    },
    closeUpdateUserForm() {
      this.updateUserDialog = false;
      this.userId = '';
      this.newEmail = '';
    },
    async updateUser() {
      try {
        // Make a request to the backend to change the email
        const response = await axios.patch(`http://127.0.0.1:3003/api/v1/users/${this.userId}`, { email: this.newEmail });

        // User updated successfully
        this.successAlert = true;
        this.successMessage = response.data.message;
      } catch (error) {
        // Handle errors
        console.error('Error:', error);

        // Display an error message to the user
        this.errorAlert = true;
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred.';
      }
    },
    openReactivateUserForm() {
      this.reactivateUserDialog = true;
    },
    closeReactivateUserForm() {
      this.reactivateUserDialog = false;
      this.userId = '';
    },
    async reactivateUser() {
      try {
        // Make a request to the backend to change the email
        const response = await axios.patch('http://127.0.0.1:3003/api/v1/reactivate-account', {
          user_id: this.userId, // Include the user_id in the request data
        });

        console.log(this.userId) 

        // User updated successfully
        this.successAlert = true;
        this.successMessage = response.data.message;
      } catch (error) {
        // Handle errors
        console.error('Error:', error);

        // Display an error message to the user
        this.errorAlert = true;
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred.';
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/roles');
        
        this.roles = response.data;
        console.log(this.roles);       
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/orders');
        
        this.orders = response.data;
        console.log(this.orders);       
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchSellerRequests() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/seller-requests');
        
        this.requests = response.data;
        console.log(this.requests);       
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchEvents() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/events');
        
        this.events = response.data;
        console.log(this.events);       
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    async fetchMessages() {
      try {
        const response = await axios.get('http://127.0.0.1:3003/api/v1/messages');
        
        this.messages = response.data;
        console.log(this.messages);       
      
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
    openApproveSellerForm() {
      this.approveSellerForm = true;
    },
    closeUserIdForm() {
      this.approveSellerForm = false;
      this.enteredRequestId = '';
      this.enteredUserId = '';
    },
    async approveSeller() {
      try {
        // Send a patch request to update the seller request
        const response = await axios.patch(`http://127.0.0.1:3003/api/v1/seller-requests/${this.enteredRequestId}`);
        console.log(response);

        // Send the user's role data for email verification
        await axios.post('http://127.0.0.1:3003/api/v1/user-role', {
          role_id: 3,
          user_id: this.enteredUserId,
        });

        this.successAlert = true;
        this.successMessage = 'Seller approved successfully';
      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
        this.errorAlert = true;
        this.errorMessage = 'An error occurred.';
      }
    },
    openResponseForm() {
      this.responseForm = true;
    },
    closeResponseForm() {
      this.responseForm = false;
      this.enteredMessageId = '';
      this.response = '';
      this.responseUserId = '';
    },
    openEmailResponseForm() {
      this.emailResponseForm = true;
    },
    closeEmailResponseForm() {
      this.emailResponseForm = false;
      this.enteredMessageId = '';
      this.response = '';
      this.responseUserId = '';
    },
    async respond() {
      try {

        const messageResponse = {
          response: this.response,
          user_id: this.responseUserId,
          message_id: this.enteredMessageId,
        };

        // Make an HTTP POST request to the createMessageResponse API
        const response = await axios.post('http://127.0.0.1:3003/api/v1/message-responses', messageResponse);

        
          // Message response created successfully
          console.log(response.data.message);
          this.successAlert = true;
          this.successMessage = 'Message response sent successfully';
          this.responseForm = false;
      } catch (error) {
        // Handle any other errors
        console.error('Error:', error);
        this.errorAlert = true;
        this.errorMessage = 'An error occurred.';
      }
    },
    async emailRespond() {

     try {
        axios.post('http://127.0.0.1:3003/api/v1/sendResponse', {
          email: this.emailEmail,
          response: this.emailResponse
        });



        // Message response created successfully
        this.successAlert = true;
        this.successMessage = 'Message response sent successfully';
        this.responseForm = false;
      } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
      this.errorAlert = true;
      this.errorMessage = 'An error occurred.';
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
    height: 550px;
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
  </style>