import Vue from "vue";
import VueRouter from "vue-router";
import {getRoleFromToken} from '../utils/token.js'

Vue.use(VueRouter);

const $ = window.$;

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/HomePage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      layout: "AuthLayout",
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("@/pages/RegistrationPage.vue"),
    meta: {
      layout: "AuthLayout",
    },
  },
  {
    path: "/create-accomodation",
    name: "AddAccomodation",
    component: () => import("@/pages/AddAccomodationPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/accomodation-availability/:id",
    name: "AddAvailability",
    component: () => import("@/pages/AddAvailabilityPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/accomodation-price/:id",
    name: "AddPrice",
    component: () => import("@/pages/AddPricePage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/search",
    name: "AccomodationsPage",
    component: () => import("@/pages/AccomodationsPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/accomodation/:id",
    name: "AccomodationPage",
    props: true,
    component: () => import("@/pages/AccomodationPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/accomodations",
    name: "HostAccomodationsPage",
    props: true,
    component: () => import("@/pages/HostAccomodationsPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/available-terms/:id",
    name: "AvailableTermsPage",
    props: true,
    component: () => import("@/pages/AvailableTermsPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/prices/:id",
    name: "PricesPage",
    props: true,
    component: () => import("@/pages/PricesPage.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { role} = to.meta;
	if(role){
		const userRole = getRoleFromToken();
		if(role.length && !role.includes(userRole)){
			return next({path: 'auth'});
		}

	}
	next();
});

router.afterEach(() => {
  setTimeout(() => {
    $('.selectpicker').selectpicker('refresh');
  }, 100);
});

export default router;
