import React from 'react'
import { FaAngleLeft, FaX } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Forum = ({ title, children }) => {
    return (
        <div className='w-full min-h-screen pb-4 '>
            {/* <Link to={'/'}>
                <div className='absolute flex items-center justify-center p-4 bg-gray-300 rounded-full top-5 left-5'> <FaAngleLeft /></div>
            </Link> */}
            <div className='flex flex-col items-center text-center px-4  justify-center w-full pt-[40px] '>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='mt-2 font-medium text-gray-600'>Harap Isi Semua Field Yang Tersedia dengan tepat dan sesuai</p>
            </div>
            {children}
            

        </div>
    )
}


export default Forum


{/* <div class="w-[90vw] lg:w-[50vw] mx-auto mt-10">
<!-- <h1 class="w-full text-xl font-semibold text-center">Forum Data Penambahan Karyawan</h1> -->
<form
  v-if="!showPreview"
  @submit.prevent="handleSubmit"
  class="flex flex-col gap-y-3"
>
  <div class="flex items-center justify-center mb-8 gap-x-2">
    <div
      v-for="(item, index) in props.stepForm"
      :key="index"
      class="flex items-center gap-x-2"
    >
      <div
        v-if="index === 0"
        class="w-16 md:w-28 h-[2px] bg-cyan-600"
      ></div>
      <div
        :class="{
          'rounded-full w-16 h-16 text-xl font-bold text-center pt-4 cursor-pointer': true,
          'bg-cyan-600 text-white': currentStep >= item.step,
          'bg-gray-200': currentStep < item.step,
        }"
      >
        <span>{{ item.step }}</span>
      </div>
      <div
        v-if="index !== props.stepForm.length - 1"
        :class="{
          'w-24 md:w-36 h-[2px]': true,
          'bg-cyan-700': currentStep >= item.step,
          'bg-gray-300': currentStep < item.step,
        }"
      ></div>
      <div
        v-if="index === props.stepForm.length - 1"
        :class="{
          'w-16 md:w-28 h-[2px]': true,
          'bg-blue-700': currentStep >= item.step,
          'bg-gray-300': currentStep < item.step,
        }"
      ></div>
    </div>
  </div>

  <div class="pb-5 border-b-2 border-gray-300">

  <h1 class="text-2xl font-bold text-gray-800">
    {{ props.stepForm[currentStep - 1].title }}
  </h1>
  <p class="">{{ props.stepForm[currentStep - 1].description }}</p>
  </div>
  <FormStep
    :key="currentStep"
    :fields="props.stepForm[currentStep - 1].fields"
    :modelValue="formData.value"
    @update:modelValue="(newData) => (formData.value = newData)"
    @validation="handleValidation"
  />

  <div class="flex w-full justify-betweeen">
    
  </div>

  <div class="flex justify-between mt-4">
    <button
      type="button"
   
      class="px-4 py-2 font-semibold bg-white border-2 rounded-lg cursor-pointer fon hover:bg-gray-100 border-cyan-600 text-cyan-600 text"
    >
      Previous
    </button>
    <button
      v-if="currentStep !== props.stepForm.length"
      type="button"
   
      class="px-5 py-2 font-semibold text-white border-2 rounded-lg cursor-pointer hover:bg-cyan-800 bg-cyan-600"
      :class="{
        'opaci0 cursor-not-allowed': !isCurrentStepValid,
      }"
    >
      Next
    </button>
    <button
      v-if="currentStep === stepForm.length"
      type="submit"
      :disabled="!isCurrentStepValid"
      class="px-4 py-2 text-red-900 bg-white border-2 rounded"
      :class="{
        'opacity-50 cursor-not-allowed': !isCurrentStepValid,
      }"
    >
      Submit
    </button>
  </div>
</form>

<PreviewCard
  v-if="showPreview"
  :formData="formData"
  @close="handleClosePreview"
/>
</div> */}