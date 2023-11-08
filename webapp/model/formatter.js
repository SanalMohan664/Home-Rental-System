sap.ui.define(
    [
        "sap/ui/core/format/DateFormat"
    ],
    function (DateFormat) {
        "use strict";
        return {
            formatDate: function (dateValue) {
                if (dateValue) {
                    var oDateFormat = DateFormat.getDateInstance({
                        pattern: "dd/MM/YYY"
                    })
                    var oDate = new Date(dateValue);
                    return oDateFormat.format(oDate);
                }
            }
        }
    }
);