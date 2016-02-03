var inquirer = require('inquirer');
var prompt = require('prompt');
var Table = require('cli-table');
var table = new Table();

prompt.start()

var person = {}
var dataBase =[]

var mainMenu = [{
    type: 'list', 
    name: 'main', 
    message:'What do you want to do?', 
    choices: [
        {name:'Create a new address book entry.', value:'createanentry'},
        {name:'Search for existing address book entries.', value:'TBA'},
        {name:'Exit the program.', value:'exit'}
        ]
}];

var questions = [
    {name:'firstName', message: 'What is your first Name?'},
    {name:'lastName', message: 'What is your last Name?'},
    {name:'birthDay', message: 'When is your birthday?'},
    {name:'emailtype', type: 'checkbox', message: 'What is your email type?',  choices: [{name:'Home', value:'home'},{name:'Work', value:'work'},{name:'Other', value:'other'}]},
    {name:'homeEmail', message: 'What is your home email?', when: function(promptObj){if(promptObj.emailtype.indexOf('home') >= 0){return true}else{return false}}},
    {name:'workEmail', message: 'What is your work email?', when: function(promptObj){if(promptObj.emailtype.indexOf('work') >= 0){return true}else{return false}}},
    {name:'otherEmail', message: 'What is your other email?', when: function(promptObj){if(promptObj.emailtype.indexOf('other') >= 0){return true}else{return false}}},
    {name:'addressType', type: 'checkbox', message: 'Which are the address types you would like to enter?',  choices: [{name:'Home', value:'homeAddress'},{name:'Work', value:'workAddress'},{name:'Other', value:'otherAddress'}]}
    ];
    
var addressQuestions = [
    {name:'firstLine', message: 'What is your address line 1?'},
    {name:'secondLine', message: 'What is your address line 2? (optional)'},
    {name:'city', message: 'City?'},
    {name:'province', message: 'Province?'},
    {name:'country', message: 'Country?'}
    ];
    


inquirer.prompt(mainMenu, function( promptObj ) {
    if (promptObj.main === 'createanentry') {
        addPerson();
    } else if (promptObj.main === 'exit') {
        process.exit();
    }
});
        
function addPerson(){
    inquirer.prompt(questions, function( promptObj ) {
        person.firstName = promptObj.firstName;
        person.lastName = promptObj.lastName;
        person.homeEmail = promptObj.homeEmail;
        person.workEmail = promptObj.workEmail;
        person.otherEmail = promptObj.otherEmail;
        person.birthDay = promptObj.birthDay;
        person.addressType = promptObj.addressType;
        var recursionAmounts = person.addressType.length;
        recursiveQuestioning(recursionAmounts, 0);
        
                function recursiveQuestioning(addressTypes, x) {
                    if (addressTypes === 0){
                        dataBase.push(person);
                        
                        Object.keys(person).map(function(obj){
                        var x = {}
                        x[obj] = person[obj]
                        dataBase.push(person);
                        })
                        
                        table.push(dataBase[0]);
                        console.log(table.toString());
                    } else {
                //person.addressType = ['homeAddress', 'workAddress', 'otherAddress']
                        inquirer.prompt(addressQuestions, function( promptObj ){
                        person[person.addressType[x]] = [promptObj.firstLine, promptObj.secondLine, promptObj.city, promptObj.province, promptObj.country];
                        x++
                        recursiveQuestioning(addressTypes - 1, x);
                    });
                    
                    }
                }

    
        

        

    });
}



