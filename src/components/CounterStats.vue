<template>
  <div class="p-col-12 p-lg-4">
    <div class="card summary" style="background-color: #edf0f5">
      <span class="title">{{ title }}</span>
      <span class="detail">{{ detail }}</span>
      <span class="count visitors">{{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style></style>
