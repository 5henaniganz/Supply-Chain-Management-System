<template>
  <div class="bg-white filter drop-shadow-2xl rounded-lg w-96 h-auto pb-10 overflow-y-auto">
    <section>
      
      <!-- Main widget headings -->
      <div class="grid grid-cols-2">
        <div class="text-center pb-6 bg-baby-blue bg-opacity-50 pt-5 rounded-tl-lg">
          <button class="text-l font-medium">Active</button>
        </div>
        <div class="text-center border-b border-l border-baby-blue border-opacity-50 pt-5">
          <button class="text-l font-medium">Recent</button>
        </div>
      </div>
      <div>
        <div class="flex flex-col w-25 justify-center pl-3 pr-3">
            <table class="table-auto mt-6 border-separate">
            <thead class="">
                <tr class="bg-baby-blue">
                    <th>Client</th>
                    <th>Contract</th>
                    <th>Liquidity</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr>
                    <td class="">Client One</td>
                    <td>#e3d08935e</td>
                    <td class="bg-green-200 rounded-md">Payable</td>
                </tr>

                <tr>
                    <td class="">Client Two</td>
                    <td>#08b01f444</td>
                    <td class= " bg-dark-blue rounded-md text-white">Problem</td>
                </tr>

                <tr>
                    <td class="">Client Three</td>
                    <td>#3604bad9a</td>
                    <td class="bg-green-200 rounded-md">Payable</td>
                </tr>

                <tr>
                    <td class="">Client Four</td>
                    <td>#f1d41a426</td>
                    <td class="bg-green-200 rounded-md">Payable</td>
                </tr>

                <tr>
                    <td class="">Client Five</td>
                    <td>#54a55e05d</td>
                    <td class="bg-green-200 rounded-md">Payable</td>
                </tr>
            </tbody>
            </table>
        </div>

 <div class="flex flex-row justify-center mt-5">

          <!-- SVG and layout functions for details -->
          <div class="text-center back-test rounded-md p-5 bg-baby-blue bg-opacity-50">
<svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
            <h1>Details</h1>
          </div>

          <!-- SVG and layout functions for edit -->
          <div class="text-center rounded-md p-5">
<svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
            <h1>Stats</h1>
          </div>

          <!-- SVG and layout functions for remove -->
          <div class="flex flex-col text-center  rounded-md p-5 justify-center">
<svg xmlns="http://www.w3.org/2000/svg" class="h-12" fill="#ffd2c0" viewBox="0 0 24 24" stroke="#e84855">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            <h1>Action Issue</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>