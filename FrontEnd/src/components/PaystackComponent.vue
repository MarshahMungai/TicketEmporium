<template>
    <div>
      <input v-model="mobileNumber" type="text" placeholder="Mobile Number" />
      <paystack
        buttonClass="button-class btn btn-primary"
        buttonText="Pay Online"
        :publicKey="publicKey"
        :email="email"
        :amount="amount"
        :reference="reference"
        :onSuccess="onSuccessfulPayment"
        :onCancel="onCancelledPayment"
        :metadata="paymentMetadata"
      ></paystack>
    </div>
  </template>
  
  <script>
  import paystack from "vue3-paystack";
  import { nanoid } from "nanoid";
  
  export default {
    components: {
      paystack,
    },
    data() {
      return {
        publicKey: 'pk_test_90da442066a6209b8d8ef95555048c19087f63f3',
        amount: 10,
        email: 'mungaipeter640@gmail.com',
        firstname: 'User',
        lastname: 'User',
        mobileNumber: '0720888904', 
      };
    },
    computed: {
      reference: function() {
        return nanoid(15);
      },
      paymentMetadata() {
        // Include the mobile number in the metadata
        return {
          mobile_number: this.mobileNumber,
        };
      },
    },
    methods: {
      onSuccessfulPayment: function(response) {
        console.log(response);
      },
      onCancelledPayment: function() {
        console.log("Payment cancelled by user");
      },
    },
  };
  </script>
  