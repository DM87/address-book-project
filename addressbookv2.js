var inquirer = require('inquirer');
var prompt = require('prompt');
var Table = require('cli-table');

var dataBase = []
//start:
menu()

function menu(){
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
    inquirer.prompt(mainMenu, function( promptObj ) {
    if (promptObj.main === 'createanentry') {
        addPerson();
    } else if (promptObj.main === 'exit') {
        process.exit();
    } else if (promptObj.main === 'searchppl') {
        searchPerson();
    }
});
}

function addPerson(locationIndex) {
    
    var questions = {
        firstName : 'What is the first name?',
        lastName : 'What is the last name?',
        birthDay : 'Associated birth date?',
        emailAddress: 'What is your email address',
        phoneNumber: 'What is your phone number?'
    }

    
        
    questionPrompter(0)
    var person = {}
    function questionPrompter(y) {
    
    if (y === Object.keys(questions).length) {
        if (locationIndex === undefined){
            dataBase.push(person);
            displayPerson(person);
            menu();
        }else {
            dataBase[locationIndex] = person
            console.log('Person has been edited!')
            displayPerson(person);
            menu();
        }
        
    } else {
    inquirer.prompt({name:Object.keys(questions)[y], type:'input', message:questions[Object.keys(questions)[y]]}, function (response){
    person[Object.keys(questions)[y]] = response[Object.keys(questions)[y]];
    questionPrompter(y+1);
    });
    }
}
}


function searchPerson(){
    inquirer.prompt({name:'searchTerm', message: 'What is the first Name?'}, function(answer){
    var searchResults = [];
    dataBase.forEach(byName);
        function byName (element, index) {
        if (answer.searchTerm === dataBase[index].firstName) {
                    //displayPerson(dataBase[index]);
            var names = dataBase[index].lastName + ', ' + dataBase[index].firstName
              var choicesList = {
                  name : names,
                  value : index
              };
              searchResults.push(choicesList)
        }
        }
    if (searchResults.length === 1 ) {    
    inquirer.prompt({name:'multipleResults', type:'list', message: 'Please select the appropriate contact.', choices:searchResults}, function(arrayTosend){
    displayPerson(dataBase[arrayTosend.multipleResults]);
    //next menu:
    
    inquirer.prompt({name:'editMenu', type: 'list', message: 'What would you like to do?',  choices: [{name:'Edit the current entry', value:'edit'},{name:'Delete the current entry', value:'delete'},{name:'Go back to the main menu', value:'main'}]},
    function(response){
        if (response.editMenu === 'edit'){
            addPerson(arrayTosend.multipleResults)
        } else if (response.editMenu === 'delete'){
            delete dataBase[arrayTosend.multipleResults]
            console.log('Contact has been deleted');
            menu()
    } else if (response.editMenu === 'main'){
            menu()
    }
    }
)
}
);}else {
    console.log('nothing found');
    menu();
    
}

})}


function displayPerson(personToDisplay){
    var table = new Table();
    var headers = {
        firstName: 'First Name',
        lastName: 'Last Name',
        birthDay: 'Birth Day',
        emailAddress: 'Email',
        phoneNumber: 'Phone number',
        address: 'Address'
    };
    
    
    
    var lines = Object.keys(personToDisplay).map(function(key){
        var line = {};
        line[headers[key]] = personToDisplay[key];
        return line;
    });
    table.push.apply(table, lines);
    console.log(table.toString());
}


function editEntry(){
    

    
}
