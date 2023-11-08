sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";
        return Controller.extend("com.applexus.technest.controller.registration", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
            },
            onBackButtonPress: function () {
                this.router.navTo("Routelogin");
            },
            onRegisterEmployee: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Registering",
                    text: "Please Wait..."
                });
                var name = this.getView().byId("nameEmployee").getValue();
                var personal_email_id = this.getView().byId("pEmail").getValue();
                var phone_number = this.getView().byId("phoneNumber").getValue();
                var status = 'A';
                var role = 'E';
                var address_name = this.getView().byId("houseName").getValue();
                var street = this.getView().byId("street").getValue();
                var place = this.getView().byId("place").getValue();
                var district = this.getView().byId("district").getValue();
                var pincode = this.getView().byId("pincode").getValue();
                if(this.byId("company").getSelectedItem() === ""){
                    MessageBox.error("Fill all fields");
                }
                else{
                var company = this.byId("company").getSelectedItem().mProperties.key;
                }
                var company_Id = company.split(',')[0];
                var company_domain = company.split(',')[1];
                var employee_id = this.getView().byId("employeeId").getValue();
                var company_email_id = this.getView().byId("companyEmailId").getValue();
                var email_domain = company_email_id.split('@')[1];
                var password = this.getView().byId("password").getValue();
                var cPassword = this.getView().byId("cPassword").getValue();
                var employeeData = {};
                employeeData.name = name;
                employeeData.personal_email_id = personal_email_id;
                employeeData.phone_number = phone_number;
                employeeData.status = status;
                employeeData.role = role;
                employeeData.address_name = address_name;
                employeeData.street = street;
                employeeData.place = place;
                employeeData.district = district;
                employeeData.pincode = pincode;
                employeeData.company_id = company_Id;
                employeeData.employee_id = employee_id;
                employeeData.company_email_id = company_email_id;
                var phNoPattern = /^\d{10}$/;
                var emailPattern = /^[^\s@]+@gmail\.com$/;
                var pincodePattern = /^\d{6}$/;
                if (!emailPattern.test(personal_email_id)) {

                    this.getView().byId("pEmail").setValueState("Error");

                    sap.m.MessageToast.show("Invalid email id");

                    return;

                }

                else if (!phNoPattern.test(phone_number)) {

                    this.getView().byId("phoneNumber").setValueState("Error");

                    sap.m.MessageToast.show("Phone number must be 10 digits long.");

                    return;

                }
                else if (!pincodePattern.test(pincode)) {

                    this.getView().byId("pincode").setValueState("Error");

                    sap.m.MessageToast.show("Pincode must be 6 digits long");

                    return;

                }

                if (name.length == 0 || personal_email_id.length == 0 || phone_number.length == 0 ||
                    pincode.length == 0 || employee_id.length == 0 || company_email_id.length == 0 || password.length == 0 || cPassword.length == 0) {
                    sap.m.MessageToast.show("Fill all fields")
                }
                else if (password != cPassword) {
                    sap.m.MessageToast.show("Password Mismatch");
                }
                else if (phone_number.length < 10 || isNaN(phone_number)) {
                    sap.m.MessageToast.show("Invalid phone number");
                }
                else if (email_domain != company_domain) {
                    sap.m.MessageToast.show('Domain does not match with company domain')
                }
                else {
                    employeeData.password = password;
                    oBusyDialog.open();
                    oModel.create("/loginTableSet", employeeData, {
                        success: function (response) {
                            oBusyDialog.close();
                            sap.m.MessageToast.show("Successfully Saved");
                            this.router.navTo("Routelogin");
                            this.getView().byId("nameEmployee").setValue("");
                            this.getView().byId("pEmail").setValue("");
                            this.getView().byId("phoneNumber").setValue("");
                            this.getView().byId("houseName").setValue("");
                            this.getView().byId("street").setValue("");
                            this.getView().byId("place").setValue("");
                            this.getView().byId("district").setValue("");
                            this.getView().byId("pincode").setValue("");
                            this.byId("company").setSelectedItem("");
                            this.getView().byId("employeeId").setValue("");
                            this.getView().byId("companyEmailId").setValue("");
                            this.getView().byId("password").setValue("");
                            this.getView().byId("cPassword").setValue("");
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            var obj = JSON.parse(error.responseText).error.message.value;
                            MessageBox.error(obj);
                        }
                    })
                }
            },

            onRegisterOwner: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Registering",
                    text: "Please Wait..."
                });
                var letters = "/ ^[a-zA-Z]+$/";
                var name = this.getView().byId("nameOwner").getValue();
                var personal_email_id = this.getView().byId("pEmailOwner").getValue();
                var phone_number = this.getView().byId("phoneNumberOwner").getValue();
                var status = 'P';
                var role = 'R';
                var address_name = this.getView().byId("addressName").getValue();
                var street = this.getView().byId("streetOwner").getValue();
                var place = this.getView().byId("placeOwner").getValue();
                var district = this.getView().byId("districtOwner").getValue();
                var pincode = this.getView().byId("pincodeOwner").getValue();
                var password = this.getView().byId("passwordOwner").getValue();
                var cPassword = this.getView().byId("cPasswordOwner").getValue();
                var ownerData = {};
                ownerData.name = name;
                ownerData.personal_email_id = personal_email_id;
                ownerData.phone_number = phone_number;
                ownerData.status = status;
                ownerData.role = role;
                ownerData.address_name = address_name;
                ownerData.street = street;
                ownerData.place = place;
                ownerData.district = district;
                ownerData.pincode = pincode;
                var phNoPattern = /^\d{10}$/;
                var emailPattern = /^[^\s@]+@gmail\.com$/;
                var pincodePattern = /^\d{6}$/;
                if (!emailPattern.test(personal_email_id)) {

                    this.getView().byId("pEmailOwner").setValueState("Error");

                    sap.m.MessageToast.show("Invalid email id");

                    return;

                }

                else if (!phNoPattern.test(phone_number)) {

                    this.getView().byId("phoneNumberOwner").setValueState("Error");

                    sap.m.MessageToast.show("Phone number must be 10 digits long.");

                    return;

                }
                else if (!pincodePattern.test(pincode)) {

                    this.getView().byId("pincodeOwner").setValueState("Error");

                    sap.m.MessageToast.show("Pincode must be 6 digits long");

                    return;

                }

                else if (name.length == 0 || personal_email_id.length == 0 || phone_number.length == 0 ||
                    address_name.length == 0 || street.length == 0 || place.length == 0 || district.length == 0 ||
                    pincode.length == 0 || password.length == 0 || cPassword.length == 0) {
                    sap.m.MessageToast.show("Fill all fields")
                }
                else if (password != cPassword) {
                    sap.m.MessageToast.show("Password Mismatch");
                }
                else if (phone_number.length < 10 || isNaN(phone_number)) {
                    sap.m.MessageToast.show("Invalid phone number");
                }
                else {
                    ownerData.password = password;
                    oBusyDialog.open();
                    oModel.create("/loginTableSet", ownerData, {
                        success: function (response) {
                            oBusyDialog.close();
                            sap.m.MessageToast.show("Successfully Saved");
                            this.router.navTo("Routelogin");
                            this.getView().byId("nameOwner").setValue("");
                            this.getView().byId("pEmailOwner").setValue("");
                            this.getView().byId("phoneNumberOwner").setValue("");
                            this.getView().byId("addressName").setValue("");
                            this.getView().byId("streetOwner").setValue("");
                            this.getView().byId("placeOwner").setValue("");
                            this.getView().byId("districtOwner").setValue("");
                            this.getView().byId("pincodeOwner").setValue("");
                            this.getView().byId("passwordOwner").setValue("");
                            this.getView().byId("cPasswordOwner").setValue("");
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            var obj = JSON.parse(error.responseText).error.message.value;
                            MessageBox.error(obj);
                        }
                    })
                }
            },
            onNameChange: function (oEvent) {
                var oInput = oEvent.getSource();
                var sName = oInput.getValue();
                var regex = /^[^ ].*$/;

                if (!regex.test(sName)) {
                    oInput.setValueState("Error");
                    oInput.setValueStateText("Please enter a valid input");
                    oInput.setValue("")
                } else {
                    oInput.setValueState("None");
                }
            },

            onPhoneInputchange: function (oEvent) {
                var phoneInput = oEvent.getSource();
                var phoneno = phoneInput.getValue();
                if (this.validatePhoneNumber(phoneno)) {
                    phoneInput.setValueState("None");
                } else if (phoneno.length < 10 || phoneno.length > 13) {
                    phoneInput.setValueState("Error");
                    phoneInput.setValueStateText("Invalid phone number format");
                }
                else {
                    phoneInput.setValueState("Error");
                    phoneInput.setValueStateText("Invalid phone number format");
                }
            },

            validatePhoneNumber: function (phoneno) {
                phoneno = phoneno.replace(/\D/g, ''); // Remove non-digit characters
                return /^\d{10}$/.test(phoneno);
            },
            onNumberChange: function (oEvent) {
                var oInput = oEvent.getSource();
                var sValue = oInput.getValue();
                var regex = /^[0-9]+$/;
                if (!regex.test(sValue)) {
                    oInput.setValueState("Error");
                    oInput.setValueStateText("Please enter a valid input");
                    oInput.setValue("");
                } else {
                    oInput.setValueState("None");
                }
            }

        });
    });