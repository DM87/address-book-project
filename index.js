var inquirer = require('inquirer');
var prompt = require('prompt');
var Table = require('cli-table');


prompt.start();

var person = {};
var dataBase =[];

var mainMenu = [{
    type: 'list', 
    name: 'main', 
    message:'What do you want to do?', 
    choices: [
        {name:'Create a new address book entry.', value:'createanentry'},
        {name:'Search for existing address book entries.', value:'searchppl'},
        {name:'Exit the program.', value:'exit'}
        ]
}];

var questions = [
    {name:'firstName', message: 'What is your first Name?'},
    {name:'lastName', message: 'What is your last Name?'},
    {name:'birthDay', message: 'When is your birthday?'},
    {name:'emailtype', type: 'checkbox', message: 'What are your email types?',  choices: [{name:'Home', value:'home'},{name:'Work', value:'work'},{name:'Other', value:'other'}]},
    {name:'homeEmail', message: 'What is your home email?', when: function(promptObj){if(promptObj.emailtype.indexOf('home') >= 0){return true}else{return false}}},
    {name:'workEmail', message: 'What is your work email?', when: function(promptObj){if(promptObj.emailtype.indexOf('work') >= 0){return true}else{return false}}},
    {name:'otherEmail', message: 'What is your other email?', when: function(promptObj){if(promptObj.emailtype.indexOf('other') >= 0){return true}else{return false}}},
    {name:'phoneTypes', type: 'checkbox', message: 'What are your phone number types?',  choices: [{name:'Home', value:'home'},{name:'Work', value:'work'},{name:'Other', value:'other'}]},
    {name:'homePhone', message: 'What is your home phone number?', when: function(promptObj){if(promptObj.phoneTypes.indexOf('home') >= 0){return true}else{return false}}},
    {name:'workPhone', message: 'What is your work phone number?', when: function(promptObj){if(promptObj.phoneTypes.indexOf('work') >= 0){return true}else{return false}}},
    {name:'otherPhone', message: 'What is your other phone number?', when: function(promptObj){if(promptObj.phoneTypes.indexOf('other') >= 0){return true}else{return false}}},
    {name:'addressType', type: 'checkbox', message: 'Which are the address types you would like to enter?',  choices: [{name:'Home', value:'homeAddress'},{name:'Work', value:'workAddress'},{name:'Other', value:'otherAddress'}]}
    ];
    
var addressQuestions = [
    {name:'firstLine', message: 'What is your address line 1?'},
    {name:'secondLine', message: 'What is your address line 2? (optional)'},
    {name:'city', message: 'City?'},
    {name:'province', message: 'Province?'},
    {name:'country', message: 'Country?'}
    ];
    

function mainM(){
inquirer.prompt(mainMenu, function( promptObj ) {
    if (promptObj.main === 'createanentry') {
        addPerson();
    } else if (promptObj.main === 'exit') {
        process.exit();
    } else if (promptObj.main === 'searchppl') {
        findMe();
    }
});
}

mainM();

function findMe(){
    var table2 = new Table();
    inquirer.prompt({name:'searchTerm', message: 'What is the first Name?'}, function(answer){
    
    var keyWord = answer.searchTerm;

    dataBase.forEach(byName);
    
    function byName (element, index) {
    if (keyWord === dataBase[index].firstName) {
                                table2.push(
                                    ['First name', element.firstName],
                                    ['Last name', element.lastName],
                                    ['Birth Day', element.birthDay],
                                    ['Phones', element.phoneNumbers],
                                    ['Address', element.addresses],
                                    ['Emails', element.emailAddresses]
                                    );
                                console.log(table2.toString() + '\n' );
                                
        mainM();
    } else {
        console.log('person not found');
        mainM();
    }
}


});

}


        
function addPerson(){
    var table = new Table();
    inquirer.prompt(questions, function( promptObj ) {
        var person = {};
        person.firstName = promptObj.firstName;
        person.lastName = promptObj.lastName;
        person.emailtype = promptObj.emailtype;
        person.homeEmail = promptObj.homeEmail;
        person.workEmail = promptObj.workEmail;
        person.otherEmail = promptObj.otherEmail;
        person.phoneTypes = promptObj.phoneTypes;
        person.homePhone = promptObj.homePhone;
        person.workPhone = promptObj.workPhone;
        person.otherPhone = promptObj.otherPhone;
        person.birthDay = promptObj.birthDay;
        person.addressType = promptObj.addressType;
        var recursionAmounts = person.addressType.length;
        
        recursiveQuestioning(recursionAmounts, 0);
        
                function recursiveQuestioning(addressTypes, x) {
                    
                    if (addressTypes === 0){
                        
                        
                        // Object.keys(person).map(function(obj){
                        // var x = {}
                        // x[obj] = person[obj]
                        // })
                        
                        //ADDRESSES
                        var addresses =[];
                        person.addressType.forEach(function (element){
                            addresses.push(person[element]);
                        });
                        
                        person.addresses = addresses.join(['\n']);
                        
                        //PHONES
                        var phoneNumbers =[];
                        person.phoneTypes.forEach(function (element){
                            phoneNumbers.push(element + ': ' + promptObj[element + 'Phone']);
                        });
                        person.phoneNumbers = phoneNumbers.join(['\n']);
                        //EMAILS
                       
                        var emailAddresses =[];
                        person.emailtype.forEach(function (element){
                            emailAddresses.push(element + ': ' + promptObj[element + 'Email']);
                        });
                        
                        
                        person.emailAddresses = emailAddresses.join(['\n']);
                        
                      dataBase.push(person);
                      
                            table.push(
                                ['First name', person.firstName],
                                ['Last name', person.lastName],
                                ['Birth Day', person.birthDay],
                                ['Phones', person.phoneNumbers],
                                ['Address', person.addresses],
                                ['Emails', person.emailAddresses]
                                );
                            console.log(table.toString() + '\n');
                            mainM();

                    } else {
                //person.addressType = ['homeAddress', 'workAddress', 'otherAddress']
                        inquirer.prompt(addressQuestions, function( promptObj ){
                        person[person.addressType[x]] = [person.addressType[x] + ':','\n' + promptObj.firstLine,'\n' + promptObj.secondLine,'\n' + promptObj.city,'\n' + promptObj.province,'\n' + promptObj.country + '\n'];
                        x++;
                        recursiveQuestioning(addressTypes - 1, x);
                    });
                    
                    }
                }

    
        

        

    });
}



