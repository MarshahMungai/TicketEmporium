<template>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <!-- Custom 404 content -->
          <div class="text-center">
            <h1 class="error-code">404</h1>
            <h2 class="error-message">Page Not Found🤔</h2>
            <p class="error-description">
              The page you are looking for might have been removed,<br> had its name changed, 
              or just doesn't exist.    
            </p><br>
            
            <p><router-link to="/" class="error-link">Go to the Homepage ?</router-link>
                 or <router-link to="/events" class="error-link">Buy some Tickets ?</router-link>
            </p>

          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFoundView',
  };
  </script>
  
  <style scoped>
  /* Custom styles for 404 page */
  .error-code {
    font-size: 6rem;
    color: #15f0dee5; 
  }
  
  .error-message {
    font-size: 2rem;
  }
  
  .error-description {
    margin-top: 20px;
  }
  
  .error-link {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    color: #15f0dee5; /* Blue color for the link */
   
  }
  </style>
  