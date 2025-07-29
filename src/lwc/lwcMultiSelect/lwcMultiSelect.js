import {api, track} from 'lwc';
import BaseElement from 'c/lwcBase';

export default class LwcMultiSelect extends BaseElement {
    @api placeholder = 'Select an Option';
    @api required = false;
    @api disabled = false;
    @api pillsHidden = false;
    @api options;
    @api label;
    @api labelHidden = false;
    @api value;
    unselectedOptions;

    connectedCallback() {
        this.alignOptions();
    }

    @api
    validate() {
        this.clearErrors();
        let hasNoError = this.required === true && this.value || this.required !== true || this.required === undefined;
        this.template.querySelector('c-lwc-select').clearErrors();
        if (!hasNoError) {
            this.template.querySelector('c-lwc-select').showErrors(['Complete this field.']);
        }
        return hasNoError;
    }

    get getPlaceholder() {
        return this.selectedValuesList.length > 0 ? (this.selectedValuesList.length + ' value(s) selected') : this.placeholder;
    }

    handleFieldChange(event) {
        let selectedValuesList = this.value ? this.value.split(';') : [];
        let newValue = event.target.value;
        if (selectedValuesList.indexOf(newValue) >= 0) {
            this.resetInput(event);
            return;
        }
        selectedValuesList.push(newValue);
        this.value = selectedValuesList.join(';');
        this.resetInput(event);
        this.alignOptions();
        this.validate();
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: false,
            composed: false,
            detail: {
                value: this.value
            }
        }));
    }

    handleRemove(event) {
        if (this.disabled) {
            return;
        }
        let selectedValuesList = this.selectedValuesList.filter(data => data !== event.target.dataset.value);
        this.value = selectedValuesList.join(';');
        this.resetInput();
        this.alignOptions();
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: false,
            composed: false,
            detail: {
                value: this.value
            }
        }));
    }

    resetInput(event) {
        let select = this.template.querySelector('c-lwc-select');
        select.setValue(undefined);
    }

    @api
    alignOptions() {
        this.unselectedOptions = (this.options || []).filter(option => this.selectedValuesList.indexOf(option.value) < 0);
    }

    get selectedOptions() {
        return (this.options || []).filter(option => this.selectedValuesList.indexOf(option.value) >= 0);
    }

    @api
    get selectedValuesList() {
        return this.value ? this.value.split(';') : [];
    }
}