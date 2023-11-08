sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("com.applexus.technest.controller.login", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
            },

            onNewRegisterPress: function (oEvent) {
                this.router.navTo("Routeregistration");
            },
            onLoginPress: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Logging in",
                    text: "Please Wait..."
                });
                var loginId = '';
                var emailId = this.getView().byId("emailInput").getValue();
                // var emailPattern = /^[a-z]+@gmail\.com$/;
                // if (!emailPattern.test(emailId)) {

                //     this.getView().byId("emailInput").setValueState("Error");

                //     sap.m.MessageToast.show("Invalid email id");

                //     return;

                // }
                var password = this.getView().byId("passwordInput").getValue();
                oBusyDialog.open();
                oModel.read("/userLoginSet(personal_email_id='" + emailId + "',password='" + password + "')", {
                    success: function (response) {
                        oBusyDialog.close();
                        var loginId = response.loginId;
                        if (response.role === 'R') {
                            if (response.status === 'A') {
                                this.router.navTo("Routerentalproviderhome", {
                                    loginId
                                });
                                this.getView().byId("emailInput").setValue("");
                                this.getView().byId("passwordInput").setValue("");
                            }
                            else {
                                sap.m.MessageToast.show("Approval Pending");
                            }
                        }
                        else if (response.role === 'E') {
                            this.router.navTo("Routeemployeehome", {
                                loginId
                            });
                            this.getView().byId("emailInput").setValue("");
                            this.getView().byId("passwordInput").setValue("");
                        }
                        else if (response.role === 'A') {
                            this.router.navTo("Routeadminhome");
                            this.getView().byId("emailInput").setValue("");
                            this.getView().byId("passwordInput").setValue("");
                        }
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        var obj = JSON.parse(error.responseText).error.message.value;
                        MessageBox.error(obj);
                    }
                })
            }
        });
    });
