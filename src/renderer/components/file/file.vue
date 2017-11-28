<template>
  <div>
    <input type="file" @change="file = $event">
  </div>
</template>

<script>
  export default {
    name: 'file',
    data: () => ({
      file: null,
    }),
  };

</script>

