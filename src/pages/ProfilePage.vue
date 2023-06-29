<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card :title="'Profile'">
            <ProfileForm :user="fetchedUser"></ProfileForm>
        </card>
        <h2>Notifications</h2>
        <Table>
            <TableHead
                :columnNames="['Received', 'Content', 'Type']"></TableHead>
            <TableBody>
                <TableRow
                    v-for="notification in notifications"
                    :key="notification.id"
                    :values="[
                        notification.Timestamp.split('T')[0] +
                            ' at ' +
                            notification.Timestamp.split('T')[1].split(':')[0] +
                            ':' +
                            notification.Timestamp.split('T')[1].split(':')[1],
                        notification.NotifTitle,
                        notification.NotifType,
                    ]">
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script>
    import Table from "../generic-components/Table/Table.vue";
    import TableHead from "../generic-components/Table/TableHead.vue";
    import TableBody from "../generic-components/Table/TableBody.vue";
    import TableRow from "../generic-components/Table/TableRow.vue";
    import Card from "../generic-components/Card/Card.vue";
    import ProfileForm from "../custom-components/Form/ProfileForm.vue";

    import { mapGetters, mapActions } from "vuex";
    import { getIdFromToken } from "../utils/token";

    import axios from "axios";

    export default {
        components: {
            Card,
            ProfileForm,
            Table,
            TableHead,
            TableBody,
            TableRow,
        },
        data: function () {
            return {
                fetchedUser: null,
                notifications: [],
            };
        },
        computed: {
            ...mapGetters({
                user: "user/getUser",
            }),
        },

        watch: {
            user(newUser) {
                this.fetchedUser = newUser;
            },
        },

        methods: {
            ...mapActions({ fetchUser: "user/fetchUser" }),

            fetchNotifications: function (userId) {
                axios.get(`/notifications/user/${userId}`).then((response) => {
                    this.notifications = response.data;
                });
            },
        },

        mounted() {
            this.fetchUser(getIdFromToken());
            this.fetchNotifications(getIdFromToken());
        },
    };
</script>
