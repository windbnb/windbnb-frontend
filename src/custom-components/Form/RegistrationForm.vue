<template>
  <Form @submit="onSubmit($event)">
        <form-row>
            <SelectOptionInput class="col-6" :showLabel="false" :options="roles" v-model="role"/>
        </form-row>
        <form-row>
            <div class="col-6">
                <text-input label="Name" v-model="newUser.name" type="text" :isValid="validateStringWithLettersOnly(newUser.name)"
                :showErrorMessage="showErrorMessage" errorMessage="Name can only contain letters."/>
            </div>
            <div class="col-6">
                <text-input label="Surname" v-model="newUser.surname" type="text" :isValid="validateStringWithLettersOnly(newUser.surname)"
                :showErrorMessage="showErrorMessage" errorMessage="Surname can only contain letters."/>
            </div>
        </form-row>

        <form-row>
            <div class="col-6">
                <text-input label="Username" v-model="newUser.username" type="text"  :isValid="validateStringWithLettersAndNumbersOnly(newUser.username)"
                :showErrorMessage="showErrorMessage" errorMessage="Username can only contain letters and numbers." />
            </div>
            <div class="col-6">
                <text-input label="Email address" v-model="newUser.email" type="text" :isValid="validateEmail(newUser.email)"
                :showErrorMessage="showErrorMessage" errorMessage="Valid email address."/>
            </div>
        </form-row>

        <form-row>
            <div class="col-6">
                <text-input label="Address" v-model="newUser.address" type="text"/>
            </div>
        </form-row>

    <form-row>
      <div class="col-6">
        <text-input label="Password" v-model="newUser.password" type="password" :isValid="validatePassword(newUser.password)" :showErrorMessage="showErrorMessage" errorMessage="Password can contain letters, numbers, 
        special characters and should be at least 8 characters long."/>
      </div>
      <div class="col-6">
        <text-input label="Repeat password" v-model="password2" type="password" :isValid="validatePassword(password2)" :showErrorMessage="showErrorMessage" errorMessage="Password can contain letters, numbers, 
        special characters and should be at least 8 characters long."/>
      </div>
    </form-row>

    <Button @click="showErrorMessage = true" type="submit">Register</Button>
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
  components: {
    Form,
    FormRow,
    TextInput,
    Button,
    SelectOptionInput,
  },

data: function () {
    return {
      roles: [
        {
          label: "GUEST",
          value: "GUEST",
        },
        {
          label: "HOST",
          value: "HOST",
        },
      ],
      newUser: {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        address: "",
        role: ""
      },
      password2: "",
      role : {},
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
      if (label === "create") {
        if (ok) {
            toastr.success(message);
            this.$router.push('/login');
        } else {
            toastr.error(message);
        }
      }
    },
},

methods: {
    ...mapActions({
      createUser: "user/createUser"
    }),

    onSubmit(e) {
      e.preventDefault();
      if(this.newUser.password === this.password2) {
        this.newUser.role = this.role
        this.createUser(this.newUser);
      }
      else {
        toastr.error("Wrong password or repeated password.");
      }
    },

    validateEmail(email) {
      return validateEmail(email);
    },

    validatePassword(password) {
      return validatePassword(password);
    },
    
    validateStringWithLettersAndNumbersOnly(username) {
      return validateStringWithLettersAndNumbersOnly(username);
    },

    validateStringWithLettersOnly(name) {
      return validateStringWithLettersOnly(name);
    },

    validateStringWithNumbersOnly(phone) {
      return validateStringWithNumbersOnly(phone);
    }

  },

  mounted() {},
};
</script>