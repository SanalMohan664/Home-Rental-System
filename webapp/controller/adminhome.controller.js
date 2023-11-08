sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("com.applexus.technest.controller.adminhome", {
            customFormatter: formatter,
            onInit: function () {
                this.viewRequests();
                this.router = this.getOwnerComponent().getRouter();
            },
            onLogoutPress: function () {
                this.router.navTo("Routelogin",{},true);
            },
            onSelect: function(oEvent){
                var selected = oEvent.mParameters.key
                if(selected = "requests"){
                    this.viewRequests();
                }
            },
            viewRequests: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/loginTableSet",{
                    success: function(response){
                        oBusyDialog.close();
                        oJSONModel.setProperty("/Requests",response.results);
                        this.getView().setModel(oJSONModel,"adminRequests")
                    }.bind(this),
                    error: function(error){
                        oBusyDialog.close();
                    }
                })
            },
            onApprovePress:function(oEvent){
                var loginId = oEvent.getSource().getBindingContext("adminRequests").getObject().login_id;
                var oModel = this.getOwnerComponent().getModel();
                debugger;
                var updateStatus = {}; 
                var status = 'A';
                updateStatus.status = status;
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.update("/loginTableSet(login_id='" + loginId + "')",updateStatus,{
                    success: function (response) {
                        sap.m.MessageToast.show("Successfully Updated");
                        this.viewRequests();
                    }.bind(this),
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    }
                })
            },
            onRejectPress:function(oEvent){
                var loginId = oEvent.getSource().getBindingContext("adminRequests").getObject().login_id;
                var oModel = this.getOwnerComponent().getModel();
                var updateStatus = {}; 
                var status = 'R';
                updateStatus.status = status;
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.update("/loginTableSet(login_id='" + loginId + "')",updateStatus,{
                    success: function (response) {
                        sap.m.MessageToast.show("Successfully Updated");
                        this.viewRequests();
                    }.bind(this),
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    }
                })
            },
            onAddcompanyPress: function () {
                var oModel = this.getOwnerComponent().getModel();
                var CompanyName = this.getView().byId("companyname").getValue();
                var CompanyPhase = this.getView().byId("phase").getValue();
                var CompanyBuilding = this.getView().byId("building").getValue();
                var CompanyDomain = this.getView().byId("domain").getValue();
                var companyData = {};
                if (CompanyName.length == 0 || CompanyPhase.length == 0 || CompanyBuilding.length == 0 || CompanyDomain.length == 0) {
                    sap.m.MessageToast.show("Fill all fields");
                }
                else {
                    companyData.CompanyName = CompanyName;
                    companyData.CompanyDomain = CompanyDomain;
                    companyData.Phase = CompanyPhase;
                    companyData.BuildingName = CompanyBuilding;
                    oModel.create("/companyTableSet", companyData, {
                        success: function (response) {
                            sap.m.MessageToast.show("Successfully Saved");
                        }.bind(this),
                        error: function (error) {
                            sap.m.MessageToast.show("Error");
                        }
                    })
                }
            }
        });
    });