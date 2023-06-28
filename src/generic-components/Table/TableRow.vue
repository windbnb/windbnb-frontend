<template>
  <tr>
        <td v-for="(value, index) in values" :key="index" v-html="value">{{ value }}</td>
        <td>
            <slot />
        </td> 
  </tr>
</template>

<script>

export default {
    components: {

    },
    props: {
    values: Array
}
}
</script>

<style>

</style>