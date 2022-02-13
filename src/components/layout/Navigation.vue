<template>
    <div class="grid grid-cols-2 p-7 pb-5">
      <div class="text-left text-black text-2xl font-medium">
        <ul class="lg:ml-10">
          <li>
            <router-link v-if="isAuthenticated === false" to="/"><div class="pl-4 pr-4 pt-1 mr-3 rounded-full inline logo-col bg-orange-supl"></div> Supl.io</router-link>
            <router-link v-if="isAuthenticated === true" to="/dashboard"><div class="pl-4 pr-4 pt-1 mr-3 rounded-full inline logo-col bg-orange-supl"></div> Supl.io</router-link>
          </li>
        </ul>
      </div>

      <!-- Main menu, becomes visible at breakpoint for large screens -->
      <div class="hidden lg:block lg:text-right lg:text-white lg:mr-10 lg:space-x-10 lg:text-xl font-medium">
        <router-link v-if="isAuthenticated === false" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/">Home</router-link>
        <router-link v-if="isAuthenticated === false" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/cases">Use Cases</router-link>
        <router-link v-if="isAuthenticated === true" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/dashboard">Dashboard</router-link>
        <router-link v-if="isAuthenticated === true" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/contract">Contracts</router-link>
        <router-link v-if="isAuthenticated === true" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/invoices">Invoices</router-link>
        <router-link v-if="isAuthenticated === true" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/bookkeeping">Bookkeeping</router-link>
        <router-link v-if="isAuthenticated === true" class="text-shad  lg:rounded-sm lg:p-2 lg:pr-4 lg:pl-4" to="/settings">Account</router-link>
        <router-link to="/login">
          <div v-if="isAuthenticated === false" class="lg:bg-dark-blue lg:text-white lg:inline lg:p-2 lg:pr-4 lg:pl-4 lg:rounded-sm">Login/Sign-Up </div>
          <div @click="logout" v-if="isAuthenticated === true" class="lg:bg-dark-blue lg:text-white lg:inline lg:p-2 lg:pr-4 lg:pl-4 lg:rounded-sm">Logout </div>
        </router-link>
      </div>

      <!-- SVG hamburger icon-->
      <div @click="openNav" class="lg:hidden flex justify-end cursor-pointer">
        <svg v-if="menuVisibility === false" xmlns="http://www.w3.org/2000/svg" class="h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg v-if="menuVisibility === true" xmlns="http://www.w3.org/2000/svg" class="h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>
      </div>
    </div>

    <!-- Mobile menu, visible initially and becomes hidden at breakpoint for large screens-->
    <div id="mySidenav" class="overflow-x-hidden nav-transition bg-white absolute w-0 flex z-10 justify-start text-center text-xl font-medium rounded-b-md h-full lg:hidden">
      <ul class="space-y-2 pl-5">
        <li>
          <router-link v-if="isAuthenticated === false" @click="openNav"  class="nav-text-transition" to="/">Home</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === false" @click="openNav"  class="nav-text-transition" to="/cases">Use Cases</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" @click="openNav"  class="nav-text-transition" to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" @click="openNav"  class="nav-text-transition" to="/contract">Contracts</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" @click="openNav"  class="nav-text-transition" to="/invoices">Invoices</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" @click="openNav"  class="nav-text-transition" to="/bookkeeping">Bookkeeping</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" @click="openNav"  class="nav-text-transition" to="/settings">Account</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === false" to="/login">
            <div @click="openNav" class="nav-text-transition">Login/Sign-Up </div>
          </router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated === true" to="/login">
          <div @click="openNav(); logout()" class="nav-text-transition">Sign Out</div>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import {inject, ref, computed, onMounted} from 'vue'
import { useStore } from 'vuex'

export default {
    setup(){
      const $moralis = inject('$moralis')
      const store = useStore();
        var menuVisibility = ref(false);
        const setUser = (payload) => store.commit('setUser', payload)

        const menuVisibilityHandler = () => {
            menuVisibility.value = !menuVisibility.value;
        }

           const handleCurrentUser = async () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
      }
           }

        const openNav = () => {

            if(menuVisibility.value === true){
                document.getElementById("mySidenav").style.width = "0";
                menuVisibility.value = false;
            }else{
            document.getElementById("mySidenav").style.width = "180px";
            menuVisibility.value = true;
            }
        }

            const logout = async () => {
      await $moralis.User.logOut()
      setUser({})
    }
        onMounted(() => {
      handleCurrentUser()
        })

        return {
        menuVisibility,
        isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
        user: computed(() => store.state.user.username),
        menuVisibilityHandler,
        openNav,
        logout
        }
    }
}
</script>

<style>
.text-shad{
 text-shadow: 0px 0px 2px #3f1417;
}

.nav-transition{
    transition: 0.5s;
}

.nav-text-transition{
    transition: 0.3s;
}
    
</style>