<template>
  <Form @submit="onSubmit($event)">
        <form-row>
            <div class="col-6">
               <text-input label="Old password" v-model="oldPassword" type="password"/>
            </div>

        </form-row>

      <form-row>
      <div class="col-6">
        <text-input label="New password" v-model="password" type="password"
        :isValid="validatePassword(password)" :showErrorMessage="showErrorMessage" errorMessage="Password can contain letters, numbers, 
        special characters and should be at least 8 characters long."/>
      </div>
      <div class="col-6">
        <text-input label="Repeat password" v-model="password2" type="password" :isValid="validatePassword(password)" :showErrorMessage="showErrorMessage" errorMessage="Password can contain letters, numbers, 
        special characters and should be at least 8 characters long."/>
      </div>
    </form-row>

    <Button @click="showErrorMessage = true" type="submit">Change</Button>
  </Form>
</template>

<script>
import Button from "../../generic-components/Form/Button.vue";
import Form from "../../generic-components/Form/Form.vue";
import FormRow from "../../generic-components/Form/FormRow.vue";
import TextInput from "../../generic-components/Form/TextInput.vue";
import { validatePassword} from '../../utils/validation'
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
    Button
  },

data: function () {
    return {
      showErrorMessage: false,
      password: "",
      oldPassword: "",
      password2:"",
      changePasswordDto: {
        id: 0,
        oldPassword: "",
        newPassword: ""
      }
    };
},

computed: {
    ...mapGetters({
      result: "user/getResult",
    }),
},

watch: {
    result({ message, ok, label }) {
      if (label === "change") {
        if (ok) {
            toastr.success(message);
        } else {
            toastr.error(message);
        }
      }
    },
},

methods: {
    ...mapActions({
      changePassword: "user/changePassword"
    }),

    onSubmit(e) {
      e.preventDefault();
      if(this.password === this.password2) {
        this.changePasswordDto.id = this.user.id;
        this.changePasswordDto.oldPassword = this.oldPassword;
        this.changePasswordDto.newPassword = this.password;
        this.changePassword(this.changePasswordDto);
      }
      else {
        toastr.error("Wrong password or repeated password.");
      }
    },

    validatePassword(password) {
      return validatePassword(password);
    },
  },

  mounted() {},
};
</script>