public with sharing class AccountInteractionController 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> GetAccounts()
    {
        return [select Id, Name from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> GetOpportunitiesForAccount(String accountId)
    {
        return [select Id, Name, Amount, CloseDate, StageName from Opportunity where AccountId=:accountId];
    }
}
