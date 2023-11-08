sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, formatter) {
        "use strict";
        return Controller.extend("com.applexus.technest.controller.employee-viewbookings", {
            customFormatter: formatter,
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("Routeemployeeviewbooking").attachPatternMatched(this.login, this);
            },
            
            login: function(oEvent){
                this.loginId = oEvent.mParameters.arguments.loginId;
                this.viewBookings();
            },
            viewBookings: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oFilter = new sap.ui.model.Filter({

                    path    : "LoginId",

                    operator: "EQ",

                    value1  : this.loginId
                    

                });
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/employeeViewBookingsSet",{    filters: [oFilter],
                    success: function (response){
                        oBusyDialog.close();
                        oJSONModel.setProperty("/Bookings",response.results);
                        this.getView().setModel(oJSONModel,"employeeBookings")
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        var obj = JSON.parse(error.responseText).error.message.value;
                        MessageBox.warning(obj);
                    },
                    
                });
            },
            cancelBooking : function(oEvent){
                var BookingId = oEvent.getSource().getBindingContext("employeeBookings").getObject().BookingId;
                console.log(BookingId);
                var oModel = this.getOwnerComponent().getModel();
                var updateStatus = {}; 
                var status = 'C';
                updateStatus.BookingStatus = status;
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.update("/bookingTableSet(BookingId='" + BookingId + "')",updateStatus,{
                    success: function (response) {
                        this.viewBookings();
                        sap.m.MessageToast.show("Successfully Updated");
                    }.bind(this),
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    }
                })
            },
            onBackButtonPress : function(){
                this.router.navTo("Routeemployeehome",{loginId: this.loginId});
            },
        });
    });
