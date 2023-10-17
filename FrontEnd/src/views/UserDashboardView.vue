<template>
  <v-card outlined class="bg-grey-darken-4">
    <v-layout>

      <!-- success snackbar -->
      <v-snackbar v-model="successAlert" color="success" timeout="4500">
        {{ successMessage }}
      </v-snackbar>

      <!-- error snackbar -->
      <v-snackbar v-model="errorAlert" color="error" timeout="4500">
        {{ errorMessage }}
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
            prepend-icon="mdi-account"
            title="Account Details"
            value="account"
            @click="handleMenuItemClick('account')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-bell"
            title="Notifications"
            value="notification"
            @click="handleMenuItemClick('notification')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-clipboard-list"
            title="Purchase History"
            value="purchases"
            @click="handleMenuItemClick('purchases')"
          ></v-list-item>
          <!-- <v-list-item
            prepend-icon="mdi-heart"
            title="Wishlist"
            value="wishlist"
            @click="handleMenuItemClick('wishlist')"
          ></v-list-item> -->
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
      <v-main style="min-height: 500px;">

        <!-- Content based on selected menu item -->
        <div v-if="selectedMenuItem === 'notification'">
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

        <div v-else-if="selectedMenuItem === 'purchases'">
          <h3>My Purchases</h3>
  
                <!-- <th class="text-left bg-grey-darken-4"> -->

              <div class="dashcontent">
              <v-table fixed-header class="bg-grey-darken-3">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="purchase in purchases" :key="purchase.id">
                    <td>{{ purchase.eventName }}</td>
                    <td>{{ purchase.amount }}</td>
                  </tr>
                </tbody>
              </v-table>
              </div>

        </div>

        <div v-else-if="selectedMenuItem === 'wishlist'">
          <h3>Wishlist</h3>
          <v-table fixed-header height="500px" class="bg-grey-darken-3">
            <thead>
              <tr>
                <th class="text-left bg-grey-darken-4">
                  Event Name
                </th>
                <th class="text-left bg-grey-darken-4">
                  Venue
                </th>
                <th class="text-left bg-grey-darken-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event One</td>
                <td>12/12/2021</td>
                <td>10 p.m</td>
                <td>Uhuru Park</td>
                <td>
                  <v-btn color="primary" class="mr-2">Buy Ticket</v-btn>
                  <v-btn color="red">Remove</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
    
        </div>

        <div v-else-if="selectedMenuItem === 'settings'">
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

            <v-btn color="primary" @click="changePassword" :disabled="isChangePasswordDisabled">Change Password</v-btn><br><br>


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

        <!-- Default content when no menu item is selected -->
        <div v-else>   
          <div class="card-content">
            <h3>Account Details</h3>
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
                     <v-subheader class="subheader">If you need to change your email, please write us through the contacts page.</v-subheader><br><br>
                              
                    <v-btn  type="submit" color="primary">Save</v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          </div>
        </div>

        
      </v-main>
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
      passwordRules: [
          value => !!value || 'Password is required.',
          value =>
            (value && value.length >= 8) || 'Password must be at least 8 characters.',
          value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].+$/.test(value) ||
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ $ ! % * ? &).',
        ],
      showPassword: false,
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
        receivePromos: false,
      },
      successAlert: false,
      successMessage: '',
      errorAlert: false,
      errorMessage: '',
      notifications: [],
      orders: [],
    };
  },
  mounted () { 
    this.fetchNotifications();
    this.fetchPurchases();

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

    editPaymentMethods() {
      // Add your payment methods editing logic here
    },
    // Show the confirmation dialog for account deactivation
    showConfirmationDialog() {
      // Set dialogVisible to true to open the confirmation dialog
      this.dialogVisible = true;
    },
    // logic for account deactivation
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
    // Cancel the account deactivation and close the dialog
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
    capitalizeFirstName(firstName) {
      // Capitalize the first letter of the first name
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
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
    async fetchPurchases() {
      try {
        const response = await axios.get(`http://127.0.0.1:3003/api/v1/orders/user/${this.user.id}`);
        
        this.purchases = response.data;
        console.log(this.notifications); 
                

      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    },
},
};
</script>


<style scoped>
.card-content {
  margin: 0 40px; 
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