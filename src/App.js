import {useState} from 'react';
import React from 'react';

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}
const origLoanPerson=[
  {
    name:"Jane",
    verdict:"Owes you",
    balance:50
  }
]

function App() {
  const [openForm, setOpenForm] = useState(false);
  // Future: Logic to handle adding a new person
  function handleAddPerson(){
  setOpenForm(!openForm);
  // Future: Logic to add a new person
  }

  function handleAddNewPerson(person){
    
  }
  return (
    <div className="app">
      <div className="sidebar">
        <h2>Loan Tracker</h2>
        {/* Future: Add Form for new person */}
        <NewPersonForm openForm={openForm}/>
        <Button onClick={handleAddPerson}>Add Person</Button>
        {/* Future: List of people and balances */}
        <LoanPersons/>
      </div>

      <div className="main">
        {/* Future: Show selected person and loan form */}
        <h2>Select a person to record loan</h2>
      </div>
    </div>
  );
}

function NewPersonForm({ openForm }) {
  // Future: Logic to handle form submission
  function handleSubmit(e){
    e.preventDefault();
    if (!openForm) return null;
  }
  return (
    openForm && (
      <form className="new-person-form" onSubmit={handleSubmit}>
        {/* Future: Form to add new person */}
        <h3>Add New Person</h3>
        <label>
          Name:
          <input type="text" placeholder="Enter name" />
        </label>
        <label>
          Initial Balance:
          <input type="number" placeholder="Enter balance" />
        </label>
        <Button type="submit">Add</Button>
      </form>
    )
  );
}

function LoanPersons(){
  return(
    <ul>
{origLoanPerson.map((person, index) => (
      <li key={index} className="person">
        <div className="info">
          <h3>{person.name}</h3>
          <p className={person.verdict === "Owes you" ? "green" : "red"}>
            {person.verdict} ${person.balance}
          </p>
        </div>
        <Button>View</Button>
      </li>
    ))}
    </ul>
  )
}
export default App;
