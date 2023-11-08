sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("com.applexus.technest.controller.homepage", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("Routeemployeehome").attachPatternMatched(this.login, this);
            },
            login: function (oEvent) {
                this.loginId = oEvent.mParameters.arguments.loginId;

            },
            onSearch: function () {
                var oGrid = this.getView().byId("gridList");
                var oBinding = oGrid.getBinding("items");
                var oFilter = [];
                var sQuery = this.getView().byId("_IDGenSearchField1").getValue();
                if (sQuery) {
                    var placeFilter = new sap.ui.model.Filter("Place", sap.ui.model.FilterOperator.Contains, sQuery);

                    oFilter.push(placeFilter);

                }

                if (oFilter.length > 0) {

                    oBinding.filter(new sap.ui.model.Filter(oFilter, false));

                }

                else {
                    oBinding.filter([]);
                }

            },
            onLogoutPress: function () {
                this.router.navTo("Routelogin", {}, true);
            },
            onBookingviewPress: function () {
                var loginId = this.loginId;
                this.router.navTo("Routeemployeeviewbooking", { loginId });
            },
            onReadHouses: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var date = this.getView().byId("DP").getDateValue();
                if (!date) {
                    MessageBox.error("Please select date to continue");
                }
                else {
                    var oFilter = new sap.ui.model.Filter({
                        path: "Date",
                        operator: "EQ",
                        value1: date
                    });
                    var oBusyDialog = new sap.m.BusyDialog({
                        title: "Loading Data",
                        text: "Please Wait..."
                    });
                    oBusyDialog.open();
                    oModel.read("/houseDescriptionSet", {
                        filters: [oFilter],
                        success: function (response) {
                            oBusyDialog.close();
                            oJSONModel.setProperty("/Homes", response.results);
                            this.getView().setModel(oJSONModel, "viewHomes")
                            debugger;
                            var imgmodel = this.getView().getModel("requests")
                            var imagedata = imgmodel.getProperty("/images");
                            var final = oJSONModel.getProperty("/Homes");
                            var final2 = [];
                            for (let i = 0; i < final.length; i++) {
                                var image = {
                                    "DESCRIPTION": final[i].DESCRIPTION,
                                    "Date": final[i].Date,
                                    "HOUSE_CODE": final[i].HOUSE_CODE,
                                    "Place": final[i].Place,
                                    "images": imagedata[i].url
                                }
                                final2.push(image);
                                debugger;
                                // 
                            }
                            oJSONModel.setProperty("/Homes", final2);
                            debugger
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                        }
                    })
                }
            },
            onViewdetailPress: function (oEvent) {
                var houseCode = oEvent.getSource().getBindingContext("viewHomes").getObject().HOUSE_CODE;
                var loginId = this.loginId;
                this.router.navTo("Routehomedetails", { loginId, houseCode })
            }
        });
    });