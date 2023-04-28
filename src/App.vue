
<template>
    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            My App
          </a>
  
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            @click="isNavOpen = !isNavOpen"
            :class="{ 'is-active': isNavOpen }"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
  
        <div class="navbar-menu" :class="{ 'is-active': isNavOpen }">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/">Operations</router-link>
          </div>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': isNavOpen }">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/nft">NFTs</router-link>
          </div>
        </div>
      </nav>
  
      
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5276/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

  export default {
    data() {
      return {
        isNavOpen: false,
      };
    },
    mounted() {
      let fa = document.createElement('script')
      fa.setAttribute('src', 'https://kit.fontawesome.com/20e36d25a4.js')
      fa.setAttribute('crossorigin', "anonymous")
      document.head.appendChild(fa)
    }
  };
  </script>
  
  <style>
  /* put your global styles here */
  </style>