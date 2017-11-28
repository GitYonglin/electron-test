<template>
  <div>
    <p>
      名字： <input type="text" v-model="user.name">
    </p>
    <p>
      邮箱： <input type="text" v-model="user.email">
    </p>
    <p>
      年龄： <input type="text" v-model="user.age">
    </p>
    <button @click="add()">添加</button>
    <ul>
      <li v-for="(item, index) in users" :key="index">
      <h3>{{item}}</h3>
        名字：{{item.name}}
        邮箱：{{item.email}}
        年龄：{{item.age}}
      </li>
    </ul>
    <!-- <h3>{{usersdb}}</h3> -->
  </div>
</template>

<script>
  export default {
    computed: {
      users() {
        if (this.usersdb !== '') {
          return this.usersdb.data;
        }
        return [];
      },
    },
    data() {
      return {
        user: {
          name: '',
          age: '',
          email: '',
        },
        usersdb: '',
      };
    },
    beforeMount() { // addCollection
      this.usersdb = this.$db.getCollection('users');
      if (!this.usersdb) {
        this.usersdb = this.$db.addCollection('users', {
          indices: ['email'],
        });
      }
    },
    methods: {
      add() {
        this.usersdb.insert({
          name: this.user.name,
          email: this.user.email,
          age: this.user.age,
        });
        this.$db.save();
      },
    },
  };

</script>

<style lang="scss" scoped>


</style>

