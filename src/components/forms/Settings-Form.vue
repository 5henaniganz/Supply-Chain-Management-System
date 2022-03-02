<template>
<div class="flex flex-col items-center">
    <h1 class=" text-green-600">{{updatedFields}}</h1>
  <label class="block mb-1 mt-4" for="org-name">Organisation Name</label>
  <input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" v-model="companyName" type="text" placeholder="edit" id="org-name"/>

  <label class="block mb-1 mt-4" for="org-wallet">Wallet Address</label>
  <input class="disabled:opacity-50 bg-gray-300 w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" :value="user.ethAddress" type="text" placeholder="edit" id="org-wallet" disabled/>

<label class="block mb-1 mt-4" for="org-email">Email</label>
<input class=" w-4/5  h-8 px-3 text-base placeholder-gray-600 placeholder-opacity-40 border rounded-lg focus:shadow-outline" v-model="companyEmail" type="text" id="org-email"/>

<button v-if="visibilityLoading === false" @click="editSubmit()" class="self-start ml-8 hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3">Update</button>
<button v-if="visibilityLoading" class="self-start ml-8 hover:opacity-50 bg-dark-blue rounded-sm text-white p-1 pl-3 pr-3 mt-3"><div class="lds-ring "></div></button>
</div>
</template>

<script>
import {inject, ref, reactive, toRefs} from 'vue'
export default {
    setup(){
const $moralis = inject('$moralis')
let companyName = ref($moralis.User.current().attributes.username);
let companyEmail = ref($moralis.User.current().attributes.email);
let companyReact = reactive({company: ''})
let emailReact = reactive({email: ''})
let updatedFields = ref()
let visibilityLoading = ref(false);

function addName (userObject, theCompany, email){
visibilityLoading.value = !visibilityLoading.value
const User = $moralis.Object.extend("User");
const user = new User();
user.set("objectId", userObject);
user.set("ACL", userObject);

user.save().then((user) => {
  user.set("username", theCompany.value);
  if(theCompany !== $moralis.User.current().attributes.username){
      updatedFields.value = "Details Updated."
  }
  user.set("email", email.value)
        visibilityLoading.value = !visibilityLoading.value
  return user.save();
});
}
    

 async function findUser () {
      var usersCurrent;
      const users = new $moralis.Object.extend({className: "User"})
      const query = new $moralis.Query(users);
      await query.get($moralis.User.current().id).then((users) => {
        usersCurrent = users.attributes
      }), (error) => {
        console.log("Error" + error)
      }
      return usersCurrent
}

function editSubmit () {
  findUser().then(function(data){
  let parsedData = data.ACL.permissionsById
  let [arrayData] = Object.keys(parsedData)
  addName(arrayData, companyName, companyEmail)
})
}


return {
    user: $moralis.User.current().attributes,
    editSubmit,
    companyName, ...toRefs(companyReact),
    companyEmail, ...toRefs(emailReact),
    updatedFields,
    visibilityLoading
}
  },
}
</script>

<style>
.lds-ring {
  width: 25px;
  height: 25px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>