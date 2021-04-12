<template>
  <div class="layout-footer">
    <span class="footer-text" style="margin-right: 5px">Powered by</span>
    <img src="/images/logo-tecno.png" alt="sigma" width="80" />
    <span class="footer-text" style="margin-left: 5px">{{
      new Date().getFullYear()
    }}</span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped></style>
