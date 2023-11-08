sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.applexus.technest.controller.otp", {
        onInit() {
          this.router = this.getOwnerComponent().getRouter();
        },
        onEnterPress: function () {
          this.router.navTo("Routelogin");
      }
      });
    }
  );
  