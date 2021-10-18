import { LightningElement } from 'lwc';

export default class ConfirmAge extends LightningElement {
    showConfirm=true;

    acceptClicked(event) {
        this.showConfirm=false;
        try {
        this.dispatchEvent(
            new CustomEvent('age13', {detail: {confirmed: true}})
        );
        }
        catch (exc) { 
            console.log('Exception ' + exc.message);
        }
    }
}