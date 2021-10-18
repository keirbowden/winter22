import { LightningElement } from 'lwc';

export default class ConfirmAgeAndTerms extends LightningElement {
    buttonDisabled=true;
    termsAccepted=false;

    checkboxChanged(event) {
        try {
            this.buttonDisabled=!event.target.checked;
        }
        catch (exc) {
            console.log('Exception ' + exc.message);
        }
    }

    acceptClicked(event) {
        this.dispatchEvent(
            new CustomEvent('accepted', {detail: {accepted: true}})
        );
        this.termsAccepted=true;
    }

}