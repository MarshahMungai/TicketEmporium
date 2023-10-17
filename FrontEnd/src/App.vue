<template>
  <v-app class="bg-black">  <!-- background color for all pages -->
    <v-main>
      <v-container fluid>
        <v-app-bar app color="#212121" height="125" fixed absolute> <!-- fixed = header does not scroll | absolute = header scrolls -->
          <!-- Logo -->
          <img :src="logo" alt="Logo" @click="redirectToHome">

          <!-- spacer to push the links to the right -->
          <v-spacer></v-spacer>

          <v-toolbar-items color="#FFFFFF" style="margin-top: 50px;">
            <!-- Add a button to toggle the navigation drawer -->
            <v-btn icon @click="drawer = !drawer" class="d-lg-none" style="height: 20;"> <!-- Hide button on large screens -->
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <!-- Links to be displayed on bigger screens -->
            <v-toolbar-items class="d-none d-lg-flex">
              <!-- {{ $store.state.isLoggedIn }} -->
                <router-link class="router-link" to="/" active-class="active-link">Home</router-link>
                <router-link class="router-link" to="/events" active-class="active-link">Events</router-link>
                <router-link class="router-link" to="/about" active-class="active-link">About Us</router-link>
                <router-link class="router-link" to="/faqs" active-class="active-link">FAQS</router-link>
                <router-link class="router-link" to="/contacts" active-class="active-link">Contact Us</router-link>
                <router-link class="router-link" to="/signup" active-class="active-link" v-if="!store.state.isLoggedIn">Signup</router-link>
                <router-link class="router-link" to="/login" active-class="active-link" v-if="!store.state.isLoggedIn">Login</router-link>
                <router-link class="router-link" to="/user-dashboard" active-class="active-link" v-if="store.state.isLoggedIn && userRoleIds.includes(2)">
                  <v-icon color="#FFFFFF" active-class="active-link">mdi-account</v-icon> 
                </router-link>
                <router-link class="router-link" to="/seller-dashboard" active-class="active-link" v-if="store.state.isLoggedIn && userRoleIds.includes(3)">
                  <v-icon color="#FFFFFF" active-class="active-link">mdi-store</v-icon> 
                </router-link>
                <router-link class="router-link" to="/admin-dashboard" active-class="active-link" v-if="store.state.isLoggedIn && userRoleIds.includes(1)">
                  <v-icon color="#FFFFFF" active-class="active-link">mdi-account-key</v-icon> 
                </router-link>
                        
            </v-toolbar-items>
          </v-toolbar-items>
        </v-app-bar>

        
        <!-- Navigation drawer for smaller screens -->
        <v-navigation-drawer v-model="drawer" temporary class="bg-black">
          <v-list-item-group>
            <v-list-item>
              <router-link class="router-link" to="/" active-class="active-link">
                Home
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/events" active-class="active-link">
                Events
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/about" active-class="active-link">
                About Us
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/faqs" active-class="active-link">
                FAQS
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/contacts" active-class="active-link">
                Contact Us
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/signup" active-class="active-link" v-if="!store.state.isLoggedIn">
                Signup
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/login" active-class="active-link" v-if="!store.state.isLoggedIn">
                Login
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link class="router-link" to="/user-dashboard" active-class="active-link" v-if="store.state.isLoggedIn">
                My Profile
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link class="router-link" to="/seller-dashboard" active-class="active-link" v-if="store.state.isLoggedIn && userRoleIds.includes(3)">
                Seller Dashboard
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link class="router-link" to="/admin-dashboard" active-class="active-link" v-if="store.state.isLoggedIn && userRoleIds.includes(1)">
                Admin Dashboard
              </router-link>
            </v-list-item>
          </v-list-item-group>
        </v-navigation-drawer>

        <!-- Page content -->
        <div style="margin-top: 99px;">
          <router-view></router-view>
        </div>

        <!-- Footer -->
        <FooterComponent></FooterComponent>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import FooterComponent from './components/FooterComponent';
import logo from '@/assets/logowhite.png';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const drawer = ref(false); // Initially hide the navigation drawer

// Call the setIsLoggedInFromLocalStorage action when the component is mounted
onMounted(async () => {
  // Check if a token exists in localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // If a token exists, set the login status to true
    store.commit('setIsLoggedIn', true);
  }
});

const userRoleIds = computed(() => {
  // Fetch the roleIds from localStorage and parse them as an array
  const roleIds = JSON.parse(localStorage.getItem('roleIds'));
  return Array.isArray(roleIds) ? roleIds : [];
});

function redirectToHome() {
  router.push('/');
}
</script>


<style scoped>
/* Global styles */
body {
  margin: 0;
  padding: 0;
}

img {
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  height: 130px;
  width: 130px;
}

.router-link {
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: 390;
  letter-spacing: 0.02857em;
  list-style: none;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  margin-right: 22px;
}

.router-link:hover {
  color: #15f0dee5;
}

.active-link {
  color: #15f0dee5;
}

/* Vuetify styles */
.v-main {
  padding: 16px;
}

/* Media query for screens smaller than 700px */
@media screen and (max-width: 700px) {
  .d-lg-none {
    display: block !important;
  }

  .d-lg-flex {
    display: none !important;
  }
}
</style>
