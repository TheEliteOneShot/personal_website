import LoadScript from "vue-plugin-load-script";
import VueToast from "vue-toast-notification";
import * as mdb from "mdb-vue-ui-kit";
import { createApp } from "vue";

import App from "@/App.vue";
import Router from "@/router";
import Config from "@/config";
import store from "@/stores/store";
import baseApi from "@/axios";

const app = createApp(App);

// Add configuration
Object.assign(app.config.globalProperties, Config);

// Add Global Plugins
app.use(Router);
app.use(VueToast);
app.use(LoadScript);
app.use(store);

// Base API
app.provide("api", baseApi);

// Add MDB components
app.component("mdbButton", mdb.MDBBtn);
app.component("mdbAccordion", mdb.MDBAccordion);
app.component("mdbAccordionItem", mdb.MDBAccordionItem);
app.component("mdbBadge", mdb.MDBBadge);
app.component("mdbBreadcrumb", mdb.MDBBreadcrumb);
app.component("mdbBreadcrumbItem", mdb.MDBBreadcrumbItem);
app.component("mdbBtn", mdb.MDBBtn);
app.component("mdbBtnClose", mdb.MDBBtnClose);
app.component("mdbBtnGroup", mdb.MDBBtnGroup);
app.component("mdbCard", mdb.MDBCard);
app.component("mdbCardBody", mdb.MDBCardBody);
app.component("mdbCardFooter", mdb.MDBCardFooter);
app.component("mdbCardGroup", mdb.MDBCardGroup);
app.component("mdbCardHeader", mdb.MDBCardHeader);
app.component("mdbCardImg", mdb.MDBCardImg);
app.component("mdbCardLink", mdb.MDBCardLink);
app.component("mdbCardText", mdb.MDBCardText);
app.component("mdbCardTitle", mdb.MDBCardTitle);
app.component("mdbCarousel", mdb.MDBCarousel);
app.component("mdbCheckbox", mdb.MDBCheckbox);
app.component("mdbCol", mdb.MDBCol);
app.component("mdbCollapse", mdb.MDBCollapse);
app.component("mdbContainer", mdb.MDBContainer);
app.component("mdbDropdown", mdb.MDBDropdown);
app.component("mdbDropdownItem", mdb.MDBDropdownItem);
app.component("mdbDropdownMenu", mdb.MDBDropdownMenu);
app.component("mdbDropdownToggle", mdb.MDBDropdownToggle);
app.component("mdbFile", mdb.MDBFile);
app.component("mdbFooter", mdb.MDBFooter);
app.component("mdbIcon", mdb.MDBIcon);
app.component("mdbInput", mdb.MDBInput);
app.component("mdbListGroup", mdb.MDBListGroup);
app.component("mdbListGroupItem", mdb.MDBListGroupItem);
app.component("mdbModal", mdb.MDBModal);
app.component("mdbModalBody", mdb.MDBModalBody);
app.component("mdbModalFooter", mdb.MDBModalFooter);
app.component("mdbModalHeader", mdb.MDBModalHeader);
app.component("mdbModalTitle", mdb.MDBModalTitle);
app.component("mdbNavbar", mdb.MDBNavbar);
app.component("mdbNavbarBrand", mdb.MDBNavbarBrand);
app.component("mdbNavbarItem", mdb.MDBNavbarItem);
app.component("mdbNavbarNav", mdb.MDBNavbarNav);
app.component("mdbNavbarToggler", mdb.MDBNavbarToggler);
app.component("mdbPageItem", mdb.MDBPageItem);
app.component("mdbPageNav", mdb.MDBPageNav);
app.component("mdbPagination", mdb.MDBPagination);
app.component("mdbPopover", mdb.MDBPopover);
app.component("mdbProgress", mdb.MDBProgress);
app.component("mdbProgressBar", mdb.MDBProgressBar);
app.component("mdbRadio", mdb.MDBRadio);
app.component("mdbRange", mdb.MDBRange);
app.component("mdbRow", mdb.MDBRow);
app.component("mdbSpinner", mdb.MDBSpinner);
app.component("mdbSwitch", mdb.MDBSwitch);
app.component("mdbTabContent", mdb.MDBTabContent);
app.component("mdbTabItem", mdb.MDBTabItem);
app.component("mdbTabNav", mdb.MDBTabNav);
app.component("mdbTabPane", mdb.MDBTabPane);
app.component("mdbTable", mdb.MDBTable);
app.component("mdbTabs", mdb.MDBTabs);
app.component("mdbTextarea", mdb.MDBTextarea);
app.component("mdbTooltip", mdb.MDBTooltip);
app.component("mdbRipple", mdb.mdbRipple);
app.component("mdbScrollspy", mdb.mdbScrollspy);

app.mount("#app");
