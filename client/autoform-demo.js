FieldSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ['String', 'Number', 'Boolean', 'Dictionary', 'Collection']
    },
    options: {
        type: Object,
        blackbox: true,
        autoform: {
            type: 'field_options',
            label: false
        }
    }
});

TypeSchema = new SimpleSchema({
    fields: {
        type: [FieldSchema]
    }
});

AutoForm.addInputType('field_options', {
    template: 'fieldOptions'
});

var getPath = function (name, key) {
    var nameParts = name.split('.');
    nameParts.pop();
    return nameParts.join('.') + '.' + key;
};

Template.fieldOptions.helpers({
    getSelectedType: function() {
        var formId = AutoForm.getFormId();
        var fieldName = Template.instance().data.name;
        return AutoForm.getFieldValue(getPath(fieldName, 'type'), formId);
    }
});
