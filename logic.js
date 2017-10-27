//start up db = mongodb
//run in Terminal through Bank [command] [required input]
//overview with: Bank

const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://127.0.0.1/bankCustomers');

function toLower(v) {
  return v.toLowerCase();
}

const customerSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower },
  accountRef: { type: Array }
});
//if already exists throw error then allow you to add to existing customer

const accountSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  accountname: { type: String, set: toLower},
  balance: { type: Number },
});

const Customer = mongoose.model('customers', customerSchema);

const addCustomer = (customer) => {
  Customer.create(customer, (err) => {
    assert.equal(null, err);
    console.info('New customer added');
    db.disconnect();
  });
};

const getCustomer = (name) => {
  const search = new RegExp(name, 'i');
  Customer.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, customer) => {
    assert.equal(null, err);
    console.info(customer);
    console.info(`${customer.length} matches`);
    db.disconnect();
  });
};

const updateCustomer = (_id, customer) => {
  Customer.update({ _id }, customer)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Updated successfully');
    db.disconnect();
  });
};

const deleteCustomer = (_id) => {
  Customer.remove({ _id })
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Deleted successfully');
    db.disconnect();
  })
}

const getCustomerList = () => {
  Customer.find()
  .exec((err, customer) => {
    assert.equal(null, err);
    console.info(customer);
    console.info(`${customer.length} matches`);
    db.disconnect();
  })
}

const Account = mongoose.model('account', accountSchema);

const addAccount = (account, _id) => {
  Account.create(account, (err) => {
    assert.equal(null, err);
    //push account to the accountRef array in customer _id*****************
    //define a way to set limits, maybe in the schema?
    console.info('New account added');
    db.disconnect();
  });
};

//const creditAccount
//warning if close to limit
//error if try to go over

//const debitAccount

//const deleteAccount
//only possible if account balance = 0

module.exports = { addCustomer, getCustomer, updateCustomer, deleteCustomer, getCustomerList, addAccount };
