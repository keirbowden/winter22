import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
import GetOpportunitiesForAccount from '@salesforce/apex/AccountInteractionController.GetOpportunitiesForAccount';

export default class AccountInfo extends LightningElement {
    _recordId;
    _recordName;
    @track opportunities;
    noOpportunitiesFound=false;
    hasAccount=false;
    
    @api get recordId() {
        return this._recordId;    
    }

    set recordId(value) {
        if (value) {
            this._recordId=value;
            this.hasAccount=true;
        }
    }

    @api get recordName() {
        return this._recordName;    
    }

    set recordName(value) {
        this._recordName=value;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Account Selected',
                message: 'You selected account ' + this._recordName,
                variant: 'success'
            })
        );
    }

    @wire(GetOpportunitiesForAccount, {accountId: '$_recordId'})
    gotOpportunities(result){
        console.log('Result = ' + JSON.stringify(result));
        if (result.data) {
            this.opportunities=result.data;
            this.noOpportunitiesFound=(0==this.opportunities.length);
        }
        else if (result.error) {
            let errors=reduceErrors(result.error).reduce((accumulator, currentValue) => accumulator.concat(', ', currentValue), '');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error retrieving opportunities',
                    message: errors.substring(2),
                    variant: 'error'
                })
            );
        }
    }
}