sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, MessageBox, formatter) {
        "use strict";
        return Controller.extend("com.applexus.technest.controller.rentalproviderhome", {
            customFormatter: formatter,
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("Routerentalproviderhome").attachPatternMatched(this.login, this);
            },
            login: function (oEvent) {
                this.loginId = oEvent.mParameters.arguments.loginId;
                this.viewHouse();
                this.viewBookings();
            },
            onLogoutPress: function () {
                this.router.navTo("Routelogin", {}, true);
            },
           
            // onSelect: function (oEvent) {
            //     var selected = oEvent.mParameters.key
            //     if (selected = "updateHouse") {
            //         this.viewHouse();
            //     }
                // if (selected = "viewBooking") {
                //     this.viewBookings();
                // }      
            // },
            //Fetching data View Bookings
            viewBookings: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oFilter = new sap.ui.model.Filter({
                    path: "LoginId",
                    operator: "EQ",
                    value1: this.loginId
                });
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/rentalProviderViewBookingSet", {
                    filters: [oFilter],
                    success: function (response) {
                        oBusyDialog.close();
                        oJSONModel.setProperty("/Bookings", response.results);
                        this.getView().setModel(oJSONModel, "viewBookings")
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                        
                    }
                })
            },
            viewHouse: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oFilter = new sap.ui.model.Filter({
                    path: "LoginId",
                    operator: "EQ",
                    value1: this.loginId
                });
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.read("/houseMasterTableSet", {
                    filters: [oFilter],
                    success: function (response) {
                        oBusyDialog.close();
                        oJSONModel.setProperty("/Houses", response.results);
                        this.getView().setModel(oJSONModel, "viewHouses")
                        
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                    }
                })
            },
            onPostPress: function () {
                var oModel = this.getOwnerComponent().getModel();
                this.createdHouse = "";
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Posting",
                    text: "Please Wait..."
                });
                var houseorflat = this.getView().byId("houseorflat").getValue();
                var hno = this.getView().byId("_IDGenInput2").getValue();
                var hname = this.getView().byId("_IDGenInput3").getValue();
                var street = this.getView().byId("_IDGenInput4").getValue();
                var place = this.getView().byId("_IDGenInput5").getValue();
                var district = this.getView().byId("_IDGenInput6").getValue();
                var pincode = this.getView().byId("_IDGenInput7").getValue();
                var noofbedrooms = this.getView().byId("_IDGenInput8").getValue();
                var noofpersons = this.getView().byId("_IDGenInput9").getValue();
                var furnishing = this.getView().byId("furnishing").getValue();
                var rentamount = this.getView().byId("_IDGenInput15").getValue();
                var description = this.getView().byId("_IDGenTextArea1").getValue();
                var loginId = this.loginId;
                var housedata = {};
                if (hno.length == 0 || hname.length == 0 || street.length == 0 || place.length == 0 ||
                    district.length == 0 || pincode.length == 0 || noofbedrooms.length == 0 ||
                    noofpersons.length == 0 || furnishing.length == 0 || rentamount.length == 0 ||
                    description.length == 0) {
                    sap.m.MessageToast.show("Fill All Fields");
                }
                else {
                    if (houseorflat == "House") {
                        housedata.HouseOrFlat = 'H';
                    }
                    else {
                        housedata.HouseOrFlat = 'F';
                    }
                    housedata.HouseNumber = hno;
                    housedata.AddressName = hname;
                    housedata.Street = street;
                    housedata.Place = place;
                    housedata.District = district;
                    housedata.Pincode = pincode;
                    housedata.Bedrooms = noofbedrooms;
                    housedata.NumberOfPersons = noofpersons;
                    housedata.LoginId = loginId;
                    if (furnishing == 'Full Furnished') {
                        housedata.Furnishing = 'F';
                    }
                    else if (furnishing == 'Semi Furnished') {
                        housedata.Furnishing = 'S';
                    }
                    else {
                        housedata.Furnishing = 'N';
                    }
                    housedata.RentAmount = rentamount;
                    housedata.Description = description;
                    oBusyDialog.open();
                    oModel.create("/houseMasterTableSet", housedata, {
                        success: function (oData, response) {
                            oBusyDialog.close();
                            this.createdHouse = response.data.HouseCode;
                            sap.m.MessageToast.show("Successfully Posted");
                            this.getView().byId("houseorflat").setValue("");
                            this.getView().byId("_IDGenInput2").setValue("");
                            this.getView().byId("_IDGenInput3").setValue("");
                            this.getView().byId("_IDGenInput4").setValue("");
                            this.getView().byId("_IDGenInput5").setValue("");
                            this.getView().byId("_IDGenInput6").setValue("");
                            this.getView().byId("_IDGenInput7").setValue("");
                            this.getView().byId("_IDGenInput8").setValue("");
                            this.getView().byId("_IDGenInput9").setValue("");
                            this.getView().byId("furnishing").setValue("");
                            this.getView().byId("_IDGenInput15").setValue("");
                            this.getView().byId("_IDGenTextArea1").setValue("");
                            if (!this.oDialog) {
                                Fragment.load({
                                    name: "com.applexus.technest.fragments.uploadImage", controller: this
                                }).then(function (oDialog) {
                                    this.oDialog = oDialog;
                                    this.oDialog.open();
                                }.bind(this));
                            }
                            else {
                                this.oDialog.open();
                            }
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            sap.m.MessageToast.show("Error");
                        }
                    })
                }



            },
            uploadImage: function () {
                debugger;
                var imageUploader = sap.ui.getCore().byId("_IDGenFileUploader2");
                var fileName = imageUploader.getValue();
                if (!imageUploader.getValue()) {
                    sap.m.MessageToast.show("Choose an image");
                }
                var domRef = imageUploader.getFocusDomRef();
                var file = domRef.files[0];
                console.log(file);
                var that = this;
                this.fileName =
                    sap.ui.getCore().byId("_IDGenFileUploader2").getValue();
                this.fileType = file.type;
                console.log(this.fileType);

                var reader = new FileReader();
                reader.onload = function (e) {
                    var vContent = e.currentTarget.result

                    that.updateFile(that.fileName, that.fileType, vContent);
                }
                reader.readAsDataURL(file);

            },
            updateFile: function (fileName, fileType, vContent) {
                var payLoad = {
                    FileName: fileName,
                    HouseCode: this.createdHouse,
                    ImageType: fileType,
                    ImageData: vContent
                }
                debugger
                // var that = this;
                var serviceurl = "/sap/opu/odata/sap/ZB14_GROUP2_MAIN_PROJECT_SRV/";

                var oModel =
                    new sap.ui.model.odata.ODataModel(serviceurl); 
                    oModel.update("/houseItemTableSet(FileName='" + payLoad.FileName + "',HouseCode='" + payLoad.HouseCode + "')/$value",
                        payLoad, {
                        method: "PUT",
                        success: function (data) {

                            sap.m.MessageToast.show("FILE UPDATED SUCCESSFULLY");

                        },
                        error: function (e) {
                            alert("error");
                        }
                    })
            },
            onFinishUpload: function () {
                this.oDialog.close();
            },
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            onchangePress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext("viewBookings").getObject();
                MessageBox.confirm("Are you sure...?", {
                    title: "Confirm",
                    onClose: function (sAction) {
                        if (sAction === 'YES') {
                            this.onUpdateStatus(oContext);
                        }
                    }.bind(this),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: sap.m.MessageBox.Action.YES,
                });
            },
            onUpdateStatus: function (oRecord) {
                var oModel = this.getOwnerComponent().getModel();
                oRecord.BookingStatus = 'C'
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Changing Status",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.update("/rentalProviderViewBookingSet(BookingId='" + oRecord.BookingId + "')", oRecord, {
                    success: function (response) {
                        oBusyDialog.close();
                        this.viewBookings();
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                    }
                });


            },

            //Update House Details
            onUpdatePress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext("viewHouses").getObject();
                this.housecode = oContext.HouseCode;
                if (!this.oDialog) {
                    Fragment.load({
                        name: "com.applexus.technest.fragments.updatehome", controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                            "oPayload": oContext
                        }), "oPayloadModel");
                        this.oDialog.open();
                    }.bind(this));
                }
                else {
                    this.oDialog.setModel(new sap.ui.model.json.JSONModel({
                        "oPayload": oContext
                    }), "oPayloadModel");
                    this.oDialog.open();
                }
            },
            onCancelPress: function () {
                this.oDialog.close();
            },
            onNewupdatePress: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oRecord = this.oDialog.getModel('oPayloadModel').getProperty("/oPayload");
                var furnishing = sap.ui.getCore().byId("furnishing").getValue();
                if (furnishing == 'Full Furnished') {
                    oRecord.Furnishing = 'F';
                }
                else if (furnishing == 'Semi Furnished') {
                    oRecord.Furnishing = 'S';
                }
                else {
                    oRecord.Furnishing = 'N';
                }
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Record",
                    text: "Please Wait..."
                });
                oBusyDialog.open();
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.update("/houseMasterTableSet(HouseCode='" + this.housecode + "')", oRecord, {
                    success: function (response) {
                        oBusyDialog.close();
                        this.oDialog.close();
                        this.viewHouse();
                    }.bind(this),
                    error: function (error) {
                        oBusyDialog.close();
                    }
                });
            }
        });
    });