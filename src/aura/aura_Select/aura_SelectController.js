({
    handleInit: function (cmp, event, helper) {
        helper.processDependent(cmp, event, helper);
    },

    handleDependentChange: function (cmp, event, helper) {
        helper.processDependent(cmp, event, helper);
    },

    handleValueChange: function (cmp, event, helper) {
        let options = cmp.get('v.options') || [];
        let value = cmp.get('v.value');
        let selectedOption = options.find(option => option.value === value) || {value: '', label: ''};
        cmp.set('v.valueLabel', selectedOption.label);
        var completeEvent = cmp.getEvent("onChange");
        completeEvent.setParams({
            payload: {
                name: event.getSource().get('v.name'),
                value: event.getSource().get('v.value')
            }
        });
        completeEvent.fire();
    }
})