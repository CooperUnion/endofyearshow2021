<template>
  <h1>
    DebugPath
  </h1>
  <ul>
    <li>
      test: {{test === 'test' ? 'test is the url param, sent with props:true' : test}} 
    </li>
    <li>
     props.test: {{test}} 
    </li>
  </ul>
  <ul>
    <li>
      <router-link to="/DebugPath">static string test</router-link>
    </li>
    <li>
     <router-link to="/DebugPath/test">path param test</router-link>
    </li>
    <li>
     <router-link to="/DebugPath/function/test">function test</router-link>
    </li>
  </ul>
</template>
<script>

  import { ref, computed, inject, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  
  export default {
    name: 'DebugPath',
    props:{
      test: String
    }
  }
</script>