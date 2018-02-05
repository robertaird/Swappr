<template>
  <div class="hello">
    <b-navbar toggleable="md" type="dark" class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <b-navbar-brand href="#page-top" v-smooth-scroll>
        <img src="../assets/logos/logo-white.png" style="width: 130px; height: auto;">
      </b-navbar-brand>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse" class="collapse navbar-collapse">
        <b-navbar-nav class="navbar-nav ml-auto">
          <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#about">
                <b-nav-item class="nav-link">About</b-nav-item>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#download">
                <b-nav-item class="nav-link">Github</b-nav-item>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#contact">
                <b-nav-item class="nav-link">Contact</b-nav-item>
              </a>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" v-smooth-scroll href="#page-top"><img src="../assets/logos/logo-white.png" style="width: 130px; height: auto;"></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#download">Github</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-smooth-scroll href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->

    <!-- Intro Header -->
    <header class="masthead">
      <div class="intro-body">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <img id="main-logo" src="../assets/logos/logofull.png">
              <p class="intro-text">An App For Offloading Your Junk.
                <br><small>Created by Honey Badger Hackers.</small></p>
              <a @click="auth.login" class="btn btn-login btn-lg">Login</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <modal name="failed">
      <h4>Authentication Failed</h4>
    </modal>

    <!-- About Section -->
    <section id="about" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>What is Swappr?</h2>
            <p>Swappr is an application for getting rid of your old items in exchange for something new. With our easy-to-use interface, trading is fast and fun.</p>
            <p> Start with adding items you would like to offer. You'll be greeted with a random item owned by someone else, and you can
            offer as many or as few of your own items for exchange. If there is a mutual desire for trade, you will be notified and given
            the other users contact information to work out the details.</p>
            <p>Swappr is currently in Beta, but feel free to check it out!</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <img class="py-1 screenshot" src="../assets/screenshots/trade-view.png" style="width: 350px; height: auto;">
          </div>
          <div class="col">
            <img class="py-1 screenshot" src="../assets/screenshots/profile-view.png" style="width: 350px; height: auto;">
          </div>
          <div class="col">
            <img class="py-1 screenshot" src="../assets/screenshots/offer-view.png" style="width: 350px; height: auto;">
          </div>
        </div>
      </div>
    </section>
    <!-- The Modal -->
    <div id="imageModal" class="modal">
      <img class="modal-content" id="img01">
    </div>

    <!-- Download Section -->
    <section id="download" class="download-section content-section text-center">
      <div class="container">
        <div class="col-lg-8 mx-auto">
          <h2>Swappr is Open Source</h2>
          <p>Check out our repository on Github!</p>
          <a href="https://github.com/honeybadgerhackers/Swappr" class="btn btn-github btn-lg">
            <Icon name="github"/>
            Swappr on Github</a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>Contact Us</h2>
            <p>Get in touch with the developers</p>
            <ul class="list-inline banner-social-buttons">
              <li class="list-inline-item">
                <a href="mailto:gagnierzachary@gmail.com" class="btn btn-default btn-lg">
                  <span class="network-name">Zach Gagnier</span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="mailto:contact@patrickbrownjr.me" class="btn btn-default btn-lg">
                  <span class="network-name">Patrick Brown Jr</span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="mailto:robkaird@gmail.com" class="btn btn-default btn-lg">
                  <span class="network-name">Robert Aird</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container text-center">
        <p>Copyright &copy; HoneyBadgerHackers 2017</p>
      </div>
    </footer>
  </div>
</template>

<script>
import 'vue-awesome/icons/github';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'loginScreen',
  props: ['auth', 'route'],
  components: {
    Icon,
  },
  data() {
    return {
      msg: '',
    };
  },
  beforeCreate() {
    document.body.className = 'login';
  },
};
</script>

<!--
(function($) {
  "use strict"; // Start of use strict

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-family: 'Lora', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  background-color: black; }

html {
  width: 100%;
  height: 100%; }

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Cabin', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  margin: 0 0 35px;
  letter-spacing: 1px;
  text-transform: uppercase; }

p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 25px; }
  @media (min-width: 768px) {
    p {
      font-size: 18px;
      line-height: 1.6;
      margin: 0 0 35px; } }

a {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  color: #42DCA3; }
  a:focus, a:hover {
    text-decoration: none;
    color: #1d9b6c; }

#main-logo {
  width: 600px;
  height: auto;
}

#mainNav {
  font-family: 'Cabin', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background-color: black; }
  #mainNav .navbar-toggler {
    font-size: 14px;
    padding: 11px;
    color: white;
    border: 1px solid white; }
  #mainNav .navbar-brand {
    font-weight: 700; }
  #mainNav a {
    color: white; }
  #mainNav .navbar-nav .nav-item {
    -webkit-transition: background 0.3s ease-in-out;
    -moz-transition: background 0.3s ease-in-out;
    transition: background 0.3s ease-in-out; }
    #mainNav .navbar-nav .nav-item:hover {
      color: fade(white, 80%);
      outline: none;
      background-color: transparent; }
    #mainNav .navbar-nav .nav-item:active, #mainNav .navbar-nav .nav-item:focus {
      outline: none;
      background-color: transparent; }
  @media (min-width: 992px) {
    #mainNav {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      background: black;
      letter-spacing: 1px; }
      #mainNav .nav-link.active {
        /* outline: none; */
        background-color: rgba(255, 255, 255, 0.3); }
      #mainNav .nav-link.active:hover {
        color: white; } }

    /* #mainNav {
      padding-top: 20px;
      padding-bottom: 20px;
      -webkit-transition: background 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s;
      -moz-transition: background 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s;
      transition: background 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s;
      letter-spacing: 1px;
      border-bottom: none;
      background: transparent; }
      #mainNav.navbar-shrink {
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        background: black; }
      #mainNav .nav-link.active {
        outline: none;
        background-color: rgba(255, 255, 255, 0.3); }
        #mainNav .nav-link.active:hover {
          color: white; } } */
.masthead {
  display: table;
  width: 100%;
  height: auto;
  padding: 200px 0;
  text-align: center;
  color: white;
  background: url("../assets/background/bike-bg.jpg") no-repeat bottom center scroll;
  background-color: black;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; }
  .masthead .intro-body {
    display: table-cell;
    vertical-align: middle; }
    .masthead .intro-body .brand-heading {
      font-size: 50px; }
    .masthead .intro-body .intro-text {
      font-size: 18px; }
  @media (min-width: 768px) {
    .masthead {
      height: 100%;
      padding: 0; }
      .masthead .intro-body .brand-heading {
        font-size: 100px; }
      .masthead .intro-body .intro-text {
        font-size: 22px; } }

.btn-circle {
  font-size: 26px;
  width: 55px;
  height: 55px;
  margin-top: 15px;
  line-height: 45px;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background 0.3s ease-in-out;
  color: white;
  border: 2px solid white;
  border-radius: 100% !important;
  background: transparent; }
  .btn-circle:focus, .btn-circle:hover {
    color: white;
    outline: none;
    background: rgba(255, 255, 255, 0.1); }

.content-section {
  padding-top: 150px;
  padding-bottom: 150px; }

.download-section {
  color: white;
  background: url("../assets/background/downloads-bg.jpg") no-repeat center center scroll;
  background-color: black;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; }

#map {
  width: 100%;
  height: 300px; }

@media (min-width: 992px) {
  .content-section {
    padding-top: 200px;
    padding-bottom: 200px; }
  #map {
    height: 350px; } }

.btn {
  font-family: 'Cabin', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  border-radius: 0; }

.btn-default {
  color: #42DCA3;
  border: 1px solid #42DCA3;
  background-color: transparent; }
  .btn-default:focus, .btn-default:hover {
    color: black;
    border: 1px solid #42DCA3;
    outline: none;
    background-color: #42DCA3; }

.btn-login {
  color: #42DCA3;
  border: 1px solid #42DCA3;
  background-color: #42DCA3; }
  .btn-login:focus, .btn-login:hover {
    color: black;
    border: 1px solid #42DCA3;
    outline: none;
    background-color: rgba(0,0,0,0.5); }

.btn-github {
  color: #42DCA3;
  border: 1px solid #42DCA3;
  background-color: rgba(0,0,0,0.5); }
  .btn-github:focus, .btn-github:hover {
    color: black;
    border: 1px solid #42DCA3;
    outline: none;
    background-color: #42DCA3; }

ul.banner-social-buttons {
  margin-top: 0; }
  @media (max-width: 1199px) {
    ul.banner-social-buttons {
      margin-top: 15px; } }
  @media (max-width: 767px) {
    ul.banner-social-buttons li {
      display: block;
      margin-bottom: 20px;
      padding: 0; }
      ul.banner-social-buttons li:last-child {
        margin-bottom: 0; } }

footer {
  padding: 50px 0; }
  footer p {
    font-size: 14px;
    margin: 0; }

::-moz-selection {
  background: #fcfcfc;
  background: rgba(255, 255, 255, 0.2);
  text-shadow: none; }

::selection {
  background: #fcfcfc;
  background: rgba(255, 255, 255, 0.2);
  text-shadow: none; }

img::selection {
  background: transparent; }

img::-moz-selection {
  background: transparent; }

.hello {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2); }

</style>
