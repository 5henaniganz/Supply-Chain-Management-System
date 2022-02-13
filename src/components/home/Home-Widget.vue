<template>
  <div class="bg-white filter drop-shadow-2xl rounded-lg w-96 h-auto pb-10 overflow-y-auto overflow-x-auto">
    <div>
      
      <!-- Main widget headings -->
      <div class="grid grid-cols-2">
        <div class="text-center pb-6 bg-baby-blue bg-opacity-50 pt-5 rounded-tl-lg">
          <button class="text-l font-medium">Contracts</button>
        </div>
        <div class="text-center border-b border-l border-baby-blue border-opacity-50 pt-5">
          <button class="text-l font-medium">Payments</button>
        </div>
      </div>
      <div>
        <div class="flex flex-row gap-2 justify-center mt-5 flex-shrink-0">

          <!-- SVG and layout functions for add -->
          <div class="text-center back-test rounded-md p-5 bg-baby-blue bg-opacity-50 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1>Add</h1>
          </div>

          <!-- SVG and layout functions for edit -->
          <div class="text-center rounded-md p-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h1>Edit</h1>
          </div>

          <!-- SVG and layout functions for remove -->
          <div class="text-center  rounded-md p-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <h1>Remove</h1>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center flex-shrink-0">

          <!-- Client text input field -->
          <div>
            <h1 class="text-l font-medium mt-5">Client</h1>
            <input class="border-2 border-orange-supl rounded" type="text">
          </div>
          
          <!-- Wallet address text input field -->
          <div>
            <h1 class="text-l font-medium mt-3">Payee Address</h1>
            <input class="border-2 border-orange-supl rounded" type="text">
          </div>

          <!-- Cost number input field -->
          <div>
            <h1 class="text-l font-medium mt-3">Cost</h1>
            <input class="border-2 border-orange-supl rounded" type="number">
          </div>

          <!-- Payment description text input field -->
          <div>
            <h1 class="text-l font-medium mt-3">Description</h1>
            <input class="border-2 border-orange-supl rounded" type="text">
          </div>

          <!-- Reocurring order radio buttons -->
          <div>
            <h1 class="text-l font-medium mt-3">Recurring Order</h1>
            <label class="mr-1" for="no">No</label>
            <input class="border-2 border-baby-blue rounded mr-3" type="radio" name="no">
            <label class="mr-1" for="weekly">Weekly</label>
            <input class="border-2 border-baby-blue rounded mr-3" type="radio" name="weekly">
            <label class="mr-1" for="monthly">Monthly</label>
            <input class="border-2 border-baby-blue rounded" type="radio" name="monthly">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>