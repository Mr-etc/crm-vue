<template>
    <div class="app-main-layout">
      <navbar @click-burger="burger_open = !burger_open" />
      <sidebar :opened="burger_open" />
      <main class="app-content" :class="{full: !burger_open}">
        <div class="app-page">
            <!-- content -->
            <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
</template>
<script>
import navbar from '@/components/app/navbar';
import sidebar from '@/components/app/sidebar';
export default {
  name: 'main-layout',
  data: () => ({
    burger_open: true
  }),
  components: {
    navbar, sidebar
  }
}
</script>
