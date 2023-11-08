sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("com.applexus.technest.controller.bookingpage", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("Routebookingpage").attachPatternMatched(this.login, this);
                var oModel = new JSONModel({
                    selectedDate: new Date(),
                    minDate: new Date(),
                    secondDate: new Date(),
                    minnewDate: new Date()
                });
                this.getView().setModel(oModel);
            },
            login: function (oEvent) {
                this.loginId = oEvent.mParameters.arguments.loginId;
                this.houseCode = oEvent.mParameters.arguments.houseCode;
            },
            onDateFromChange: function (oEvent) {
                this.oDateFromPicker = oEvent.getSource();
                // var oSelecteddate = this.oDateFromPicker.getDateValue();
                // var oToday = new Date();
                // if (oSelecteddate < oToday) {
                //     sap.m.MessageToast.show("Invalid Selection")
                //     this.oDateFromPicker.setValue("");
                // } else {
                // this.oDateFromPicker.setValue(oSelecteddate);
                // }
            },
            onDateToChange: function (oEvent) {
                this.oDateToPicker = oEvent.getSource();
                // var oSelecteddate = this.oDateToPicker.getDateValue();
                // var oToday = new Date();
                // if (oSelecteddate < oToday) {
                //     sap.m.MessageToast.show("Invalid Selection")
                //     this.oDateToPicker.setValue("");
                // } else {
                // this.oDateToPicker.setValue(oSelecteddate);
                // }
            },
            onBackButtonPress: function () {
                var loginId = this.loginId;
                var houseCode = this.houseCode;
                this.router.navTo("Routehomedetails", { loginId, houseCode });
            },
            onSubmitPress: function () {
                var oModel = this.getOwnerComponent().getModel();
                var amount = this.getView().byId("Amount").getValue().toString();
                var bookfrom = this.oDateFromPicker.getDateValue();
                var bookto = this.oDateToPicker.getDateValue();
                if(!bookfrom){
                    MessageBox.error("Please select a book from date.");
                }
                else if(!bookto){
                    MessageBox.error("Please select a book to date.");
                }
                else if (bookfrom > bookto) {
                    MessageBox.error("From Date Must Be Lower Than To Date")
                }
            // if(!bookfrom){
            //     sap.m.MessageToast.show("Please select a book from date.");

            // }
            // else if(!bookto){
            //     sap.m.MessageToast.show("Please select a book to date.");
            // }
                else {
                    var bookData = {};
                    bookData.Amount = amount;
                    bookData.CurrencyKey = 'INR';
                    bookData.BookedFrom = bookfrom;
                    bookData.BookedTo = bookto;
                    bookData.LoginId = this.loginId;
                    bookData.HouseCode = this.houseCode;
                    bookData.BookingStatus = 'B';
                    oModel.create("/bookingTableSet", bookData, {
                        success: function (response) {
                            sap.m.MessageToast.show("Successfully Saved");
                            this.oDateFromPicker.setValue("");
                            this.oDateToPicker.setValue("");
                            this.router.navTo("Routeemployeehome", {
                                loginId: this.loginId
                            });
                        }.bind(this),
                        error: function (error) {
                            var obj = JSON.parse(error.responseText).error.message.value;
                            MessageBox.error(obj);
                        }
                    });
                }
            },
            onHomePress: function () {
                this.router.navTo("Routeemployeehome", { loginId: this.loginId });
            },
            onLogoutPress: function () {
                this.router.navTo("Routelogin", {}, true);
            }
        });
    });