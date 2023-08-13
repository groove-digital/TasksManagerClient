<template>
  <div>
    <h1>Welcome to My Task Manager App</h1>
    <TaskManager />
  </div>
</template>

<script>
import TaskManager from '@/components/TaskManager.vue';

export default {
  components: {
    TaskManager,
  },
};
</script>

<style>
/* Styles spécifiques à cette vue */
</style>