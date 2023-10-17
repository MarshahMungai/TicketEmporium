 <template>
  <v-card class="bg-grey-darken-4" value="rounded-lg">
    <v-tabs v-model="tab" align-tabs="center">
      <v-tab value="one" color="#15f0dee7">About Ticket Emporium</v-tab>
      <v-tab value="two" color="#15f0dee7">Terms and Conditions</v-tab>
      <v-tab value="three" color="#15f0dee7">Privacy and Data Storage Policy</v-tab>
      <!-- <v-tab value="three" color="#15f0dee7">Privacy and Cookie Policy</v-tab> -->
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <p>
            At Ticket Emporium, we are passionate about connecting people to their favorite events,
            whether it's a sports game, music concert, or cultural festival. We believe that everyone
            should have access to the best events in Kenya, and we strive to make it easy and
            convenient for you to purchase tickets online.
          </p><br>
          <p>
            Our mission is to revolutionize the ticket-selling industry in Kenya by providing an easy
            and reliable platform for buying and selling tickets. We are committed to providing the
            best possible customer service, and we are always looking for ways to improve our
            user experience.
          </p><br>
          <p>
            As a Kenyan-based company, we understand the unique needs and challenges of our local
            market. We work closely with event organizers to ensure that our customers have access to
            the most popular events in Kenya, and we provide competitive pricing to ensure that our
            tickets are affordable for everyone.
          </p><br>
          <p>
            Our team of experienced professionals is dedicated to providing you with the best possible
            service. We are always available to answer any questions or concerns you may have, and we
            are committed to ensuring that your ticket-buying experience is as seamless and
            hassle-free as possible.
          </p><br>
          <p>
            Thank you for choosing Ticket Emporium for all your ticket needs. We are proud to serve the
            Kenyan community and look forward to continuing to provide you with the best possible
            service.
          </p>
        </v-window-item>


        <v-window-item value="two">
          <p>
            These Terms and Conditions govern your use of our website, products, and services. By using our website, 
            products, or services, you agree to be bound by these Terms and Conditions. If you do not agree with 
            any part of these Terms and Conditions, please do not use our website, products, or services.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Modification of Terms and Conditions</strong><br>
          Ticket Emporium reserves the right to modify these Terms and Conditions at any time.
          We will notify you of any changes by posting the revised Terms and Conditions on our website.
          Your continued use of our website, products, or services after we make changes to these Terms and 
          Conditions constitutes your acceptance of the revised Terms and Conditions.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Intellectual Property</strong><br>
          All content on the Ticket Emporium website, including text, graphics, logos, images, and software, is 
          the property of Ticket Emporium or its licensors and is protected by copyright, trademark, and other 
          intellectual property laws.
          You may not use or reproduce any content on our website without our prior written consent.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Ticket Sales</strong><br>
          Ticket Emporium acts as an intermediary between you and the event organizer.
          We do not own or control the events, and we do not guarantee the availability or quality of any tickets.
          All sales are final and refundable only at the discretion of the event organizer and if the event is canceled or rescheduled.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">User Content</strong><br>
          Ticket Emporium may allow users to post comments or other content on our website.
          You agree not to post any content that is illegal, defamatory, obscene, or otherwise offensive.
          You retain ownership of any content you post on our website, but you grant Ticket Emporium a non-exclusive, 
          royalty-free license to use, reproduce, and distribute your content in any form and for any purpose.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Disclaimer of Warranties</strong><br>
          Ticket Emporium makes no representations or warranties of any kind, express or implied, regarding the 
          accuracy, reliability, or completeness of any information on our website.
          We do not guarantee that our website will be error-free, uninterrupted, or free from viruses or other 
          harmful components.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Limitation of Liability</strong><br>
          In no event shall Ticket Emporium be liable for any direct, indirect, incidental, special, or 
          consequential damages arising out of or in connection with your use of our website, products, or 
          services, including but not limited to loss of profits, data, or other intangible losses.
          Some jurisdictions do not allow the exclusion or limitation of liability for incidental or 
          consequential damages, so the above limitations may not apply to you.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Indemnification</strong><br>
          You agree to indemnify and hold Ticket Emporium, its officers, directors, employees, agents, and 
          affiliates, harmless from any claim, demand, or damages, including attorneys' fees, arising out of 
          or in connection with your use of our website, products, or services, your breach of these Terms and 
          Conditions, or your violation of any law or the rights of any third party.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Governing Law</strong><br>
          These Terms and Conditions shall be governed by and construed in accordance with the laws of Kenya.
          Any disputes arising out of or in connection with these Terms and Conditions shall be resolved in court.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Severability</strong><br>
          If any provision of these Terms and Conditions is found to be invalid or unenforceable, that provision 
          shall be enforced to the maximum extent possible, and the remaining provisions of these Terms and 
          Conditions shall remain in full force and effect.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Entire Agreement</strong><br>
          These Terms and Conditions constitute the entire agreement between you and Ticket Emporium with respect 
          to your use of our website, products, and services, and supersede all prior or contemporaneous 
          communications and proposals, whether oral or written, between you and Ticket Emporium with respect thereto.
          </p>
          <br>

          <p>
          <strong style="color: #15f0dee7;">Waiver</strong><br>
          The failure of Ticket Emporium to exercise or enforce any right or provision of these Terms and 
          Conditions shall not constitute a waiver of such right or provision.
          </p>
          <br>

          <p>
          If you have any questions or concerns regarding these Terms and Conditions, please contact us at support.
          </p>
        </v-window-item>

        <v-window-item value="three">
          <div> 
            <p>
              At Ticket Emporium, we are committed to protecting the privacy of our customers. This Privacy and Data Storage Policy outlines how we collect, use, and protect the personal information of our customers.
            </p>
            <br>

            <p>
              <strong style="color: #15f0dee7;">Collection of Personal Information</strong><br>
              When you use our services, we may collect personal information such as your name, email address, phone number, and billing information. We use this information solely to provide our services, process your requests, and communicate with you regarding important updates.
            </p>
            <br>

            <p>
              <strong style="color: #15f0dee7;">Use of Personal Information</strong><br>
              We use the personal information we collect solely for the purpose of providing our services and communicating with you regarding important updates. We do not share your personal information with third parties, except as required by law or as necessary to provide our services.
            </p>
            <br>

            <p>
              <strong style="color: #15f0dee7;">Protection of Personal Information</strong><br>
              We take all necessary measures to protect your personal information from unauthorized access or disclosure. We employ industry-standard security technologies and procedures to safeguard your personal information. However, we cannot guarantee the security of your personal information stored in our system, and you do so at your own risk.
            </p>
            <br>

            <p>
              <strong style="color: #15f0dee7;">Data Storage Preferences</strong><br>
              We save your preferences and settings within your user account to improve your experience on our website. 
            </p>
            <br>


            <p>
              <strong style="color: #15f0dee7;">Changes to this Privacy and Data Storage Policy</strong><br>
              We may update this Privacy and Data Storage Policy periodically. Any changes will be posted on our website. Your continued use of our services after such changes indicates your acceptance of the revised policy.
            </p>
            <br>

            <p>
              If you have any questions or concerns regarding this Privacy and Data Storage Policy, please contact our support team.
            </p>
          </div>
        </v-window-item>


        <!-- <v-window-item value="three">
          <p>
            At Ticket Emporium, we are committed to protecting the privacy of our customers. This Privacy and Cookie Policy outlines how we collect, use, and protect the personal information of our customers.
          </p>
          <br>

          <p>
            <strong style="color: #15f0dee7;">Collection of Personal Information</strong><br>
            When you purchase a ticket from Ticket Emporium, we may collect personal information such as your name, email address, phone number, and billing information. We use this information solely to process your order and to communicate with you regarding your order or other important updates.
          </p>
          <br>

          <p>
            <strong style="color: #15f0dee7;">Use of Personal Information</strong><br>
            We use the personal information we collect solely for the purpose of processing your order and communicating with you regarding your order or other important updates. We do not share your personal information with third parties, except as required by law or as necessary to complete your order (such as sharing your information with the event organizer).
          </p>
          <br>

          <p>
            <strong style="color: #15f0dee7;">Protection of Personal Information</strong><br>
            We take all necessary measures to protect your personal information from unauthorized access or disclosure. We use industry-standard security technologies and procedures to safeguard your personal information. However, we cannot guarantee the security of your personal information transmitted to our site, and you do so at your own risk.
          </p>
          <br>

          <p>
            <strong style="color: #15f0dee7;">Use of Cookies</strong><br>
            Ticket Emporium uses cookies to enhance your experience while using our website. Cookies are small files that are stored on your device and help us to remember your preferences and settings. We use cookies to provide you with a better browsing experience and to analyze website traffic.
          </p>
          <br>

          <p>
            <strong style="color: #15f0dee7;">Changes to this Privacy and Cookie Policy</strong><br>
            Ticket Emporium may update this Privacy and Cookie Policy from time to time. We will post any changes to this policy on our website. Your continued use of our website after we make changes to this policy constitutes your acceptance of the revised policy.
          </p>
          <br>

          <p>
            If you have any questions or concerns regarding this Privacy and Cookie Policy, please contact our support team.
          </p>
        </v-window-item> -->
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>


<style scoped>
  .v-window-item {
    min-height: 300px;
  }

  .v-card {
    margin: 0 auto;
    width: 85%;
  }

</style>