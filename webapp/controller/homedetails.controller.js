sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.applexus.technest.controller.homedetails", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("Routehomedetails").attachPatternMatched(this.login, this);
            },
            login: function (oEvent) {
                this.loginId = oEvent.mParameters.arguments.loginId;
                this.houseCode = oEvent.mParameters.arguments.houseCode;
                this.readHomeDetails();
            },
            readHomeDetails: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/houseMasterTableSet(HouseCode='" + this.houseCode + "')", {
                    success: function (response) {
                        oBusyDialog.close();
                        oJSONModel.setProperty("/Home",response);
                        this.getView().setModel(oJSONModel,"viewHomeDetails")
                        if(response.HouseOrFlat == 'F'){
                            var houseOrFlat = 'Flat';
                        }
                        else{
                            var houseOrFlat = 'House'
                        }
                        this.getView().byId("AddressName").setText("Address Name: "+ response.AddressName);
                        this.getView().byId("Street").setText("Street      : "+ response.Street);
                        this.getView().byId("Place").setText("Place       : "+ response.Place);
                        this.getView().byId("Pincode").setText("Pincode     : "+ response.Pincode);
                        this.getView().byId("Bedrooms").setText("Bedrooms    : "+ response.Bedrooms);
                        this.getView().byId("Furnishing").setText("Furnishing  : "+ response.Furnishing);
                        this.getView().byId("RentAmount").setText("Rent Amount : "+ response.RentAmount + " INR");
                        this.getView().byId("PhoneNumber").setText("Phone Number: "+ response.PhoneNumber);
                        this.getView().byId("PersonalEmailId").setText("Email Id    : "+ response.PersonalEmailId);
                        this.readImage();
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                    }
                })
            },
            readImage: function(){
                var houseCode = this.houseCode;
                var FileName = '';
                var that = this;
                var serviceurl = "/sap/opu/odata/sap/ZB14_GROUP2_MAIN_PROJECT_SRV/";
                var oController = this;
                var oModel = new sap.ui.model.odata.ODataModel(serviceurl);
                oModel.read("/houseItemTableSet(FileName='" + FileName + "',HouseCode='" + houseCode + "')/$value", {
                    method: "GET",
                    success: function (data, response) {
                        oController.getView().getModel("viewHomeDetails").setProperty("/imgHome",data.ImageData);
                        oController.getView().getModel("viewHomeDetails").updateBindings();
                    },
                    error: function (e) {
                        console.log(e)
                        alert("error");
                    }
                })
            },
            onBooknowPress: function () {
                var loginId = this.loginId;
                var houseCode = this.houseCode;
                this.router.navTo("Routebookingpage", { loginId, houseCode });
            },
            onHomePress: function () {
                this.router.navTo("Routeemployeehome", { loginId: this.loginId });
            },
            onBackButtonPress: function () {
                this.router.navTo("Routeemployeehome", { loginId: this.loginId });
            }
        });
    });
