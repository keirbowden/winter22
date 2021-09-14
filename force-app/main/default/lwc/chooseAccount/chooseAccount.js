import { LightningElement, track, wire } from 'lwc';
import GetAccounts from '@salesforce/apex/AccountInteractionController.GetAccounts';
import { reduceErrors } from 'c/ldsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ChooseAccount extends LightningElement {
    @track accountOptions;
    selectedAccountId;
    selectedAccountName;

    @wire(GetAccounts)
    gotAccounts(result){
        console.log('Result = ' + JSON.stringify(result));
        if (result.data) {
            this.accountOptions=[];
            result.data.map((account) => {
                this.accountOptions.push({label: account.Name, value: account.Id});
            });
        }
        else if (result.error) {
            let errors=reduceErrors(result.error).reduce((accumulator, currentValue) => accumulator.concat(', ', currentValue), '');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error retrieving accounts',
                    message: errors.substring(2),
                    variant: 'error'
                })
            );
        }
    }

    accountSelected(event) {
        this.selectedAccountId=event.target.value;
        this.accountOptions.forEach((option) => {
            if (option.value==this.selectedAccountId) {
                this.selectedAccountName=option.label;
            }
        });
        this.dispatchEvent(
                new CustomEvent(
                    'accountselected', 
                    {detail: {
                        recordId: this.selectedAccountId,
                        recordName: this.selectedAccountName
                    }
                })
        );
    }
}