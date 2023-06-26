<template>
  <Form v-if="user !== null" @submit="onSubmit($event)">
        <form-row>
            <div class="col-6">
                <text-input label="Name" v-model="user.name" type="text" :isValid="validateStringWithLettersOnly(user.name)"
                :showErrorMessage="showErrorMessage" errorMessage="Name can only contain letters."/>
            </div>
            <div class="col-6">
                <text-input label="Surname" v-model="user.surname" type="text" :isValid="validateStringWithLettersOnly(user.surname)"
                :showErrorMessage="showErrorMessage" errorMessage="Surname can only contain letters."/>
            </div>
        </form-row>

        <form-row>
            <div class="col-6">
                <text-input label="Username" v-model="user.username" type="text"  :isValid="validateStringWithLettersAndNumbersOnly(user.username)"
                :showErrorMessage="showErrorMessage" errorMessage="Username can only contain letters and numbers." />
            </div>
            <div class="col-6">
                <text-input  label="Email address" v-model="user.email" type="text" :isValid="validateEmail(user.email)"
                :showErrorMessage="showErrorMessage" errorMessage="Valid email address."/>
            </div>
        </form-row>

        <form-row>
            <div class="col-6">
                <text-input label="Address" v-model="user.address" type="text"/>
            </div>
        </form-row>

    <form-row>
         <div class="col-6">
            <Button @click="showErrorMessage = true" type="submit">Change</Button>
         </div>
         <div class="col-6">
             <Button @click="handleDeleteAccount">Delete account</Button>
         </div>
    </form-row>
   
   
  </Form>
</template>

<script>
import Button from "../../generic-components/Form/Button.vue";
import Form from "../../generic-components/Form/Form.vue";
import FormRow from "../../generic-components/Form/FormRow.vue";
import TextInput from "../../generic-components/Form/TextInput.vue";
import SelectOptionInput from "../../generic-components/Form/SelectOptionInput.vue";
import { validateEmail, validatePassword, validateStringWithLettersOnly, 
validateStringWithNumbersOnly, validateStringWithLettersAndNumbersOnly } from '../../utils/validation'
import toastr from 'toastr'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        user: null,
    },
  components: {
    Form,
    FormRow,
    TextInput,
    Button,
    SelectOptionInput,
  },

data: function () {
    return {
      showErrorMessage: false
    };
},

computed: {
    ...mapGetters({
      result: "user/getResult",
    }),
},

watch: {
    result({ message, ok, label }) {
      if (label === "update") {
        if (ok) {
          toastr.success(message);
        } else {
          toastr.error(message);
        }
      }
      if(label === "delete"){
        if(ok){
          toastr.success(message);
          this.$router.push('/login');
        }else {
          toastr.error(message);
        }
      }
    },

    user(newUser){
      this.user = newUser;
    }
},

methods: {
    ...mapActions({
      updateUser: "user/updateUser",
      deleteUser: "user/deleteUser"
    }),

    onSubmit(e) {
      e.preventDefault();
      this.updateUser(this.user);
    },

    validateEmail(email) {
      return validateEmail(email);
    },
    
    validateStringWithLettersAndNumbersOnly(username) {
      return validateStringWithLettersAndNumbersOnly(username);
    },

    validateStringWithLettersOnly(name) {
      return validateStringWithLettersOnly(name);
    },

    validateStringWithNumbersOnly(phone) {
      return validateStringWithNumbersOnly(phone);
    },

    handleDeleteAccount(){
      this.deleteUser(this.user.id);
    }

  },

  mounted() {},
};
</script>