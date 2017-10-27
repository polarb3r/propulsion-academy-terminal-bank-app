#!/usr/bin/env node

const program = require('commander');
const { addCustomer, getCustomer, updateCustomer, deleteCustomer, getCustomerList, addAccount } = require('./logic');
const { prompt } = require('inquirer');

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];

const accQuestions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter first name ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter last name ...'
  },
  {
    type : 'input',
    name : 'accountName',
    message : 'Enter account name ...'
  },
  {
    type : 'input',
    name : 'balance',
    message : 'Please enter starting balance ...'
  },
];

program
  .version('0.0.1')
  .description('Bank Application');

program
  .command('addCustomer')
  .alias('add')
  .description('Add a customer')
  .action(() => {
    prompt(questions).then(answers => addCustomer(answers));
  });

program
  .command('getCustomer <name>')
  .alias('getOne')
  .description('Get customer')
  .action(name => getCustomer(name));

program
  .command('updateCustomer <_id>')
  .alias('update')
  .description('Update customer')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateCustomer(_id, answers));
  });

program
  .command('deleteCustomer <_id>')
  .alias('delOne')
  .description('Delete customer')
  .action(_id => deleteCustomer(_id));

program
  .command('getCustomerList')
  .alias('fullList')
  .description('List customers')
  .action(() => getCustomerList());

program
  .command('addAccount <_id>')
  .alias('accAdd')
  .description('Add an account to given id')
  .action(() => {
    prompt(accQuestions).then(answers => addAccount(answers));
  });


if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
