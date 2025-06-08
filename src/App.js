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
  const [loanPersons, setLoanPersons] = useState(origLoanPerson);
  const [loanOpenForm, setLoanOpenForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  // Future: Logic to handle adding a new person
  function handleAddPerson(){
  setOpenForm(!openForm);
  // Future: Logic to add a new person
  }

  function handleAddNewPerson(person){
    // Future: Logic to add a new person
    // Check if form is open before adding
    // If form is not open, do not add the person
    // This is to prevent adding a person when the form is closed
    // If form is open, add the person to the list
    setLoanPersons(prev=> [...prev, person]);
    console.log("New person added:", person);
  }
  function addNewLoan(){
    // Future: Logic to add a new loan
    console.log("Add new loan clicked");
    // This function will be used to open the loan form for the selected person
    // Currently, it just logs a message
    setLoanOpenForm(!loanOpenForm);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Loan Tracker</h2>
        {/* Future: Add Form for new person */}
        <NewPersonForm openForm={openForm} handleAddNewPerson={handleAddNewPerson} setOpenForm={setOpenForm}/>
        <Button onClick={handleAddPerson}>Add Person</Button>
        {/* Future: List of people and balances */}
        <LoanPersons loanPersons={loanPersons} setSelectedPerson={setSelectedPerson} setLoanPersons={setLoanPersons}/>
       
      </div>

      <div className="main">
        {/* Future: Show selected person and loan form */}
        <h2>Select a person to record loan</h2>
       {selectedPerson ? (
  <>
    <PersonDetails person={selectedPerson} />
    <Button onClick={addNewLoan}>
      {loanOpenForm ? "Close Form" : "Add New Loan"}
    </Button>
    {loanOpenForm && (
      <LoanForm
        selectedPerson={selectedPerson}
        onAddLoan={(loan) => console.log("New loan added:", loan)}
        setLoanPersons={setLoanPersons}
        setLoanOpenForm={setLoanOpenForm}
      />
    )}
  </>
) : (
  <p>Please select a person to view details.</p>
)}

        
      </div>
    </div>
  );
}

function NewPersonForm({ openForm, setOpenForm, handleAddNewPerson}) {
// Future: Form to add new person
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  // Future: Logic to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if(!name||!balance)return;
    const verdict= Number(balance) >= 0 ? "Owes you" : "You owe";
    const newPerson = {
      name: name,
      verdict,
      balance: parseFloat(balance)||0
    }
    setName('');
    setBalance('');
    handleAddNewPerson(newPerson);
    setOpenForm(false);
  }
  return (
    openForm && (
      <form className="new-person-form" onSubmit={handleSubmit}>
        {/* Future: Form to add new person */}
        <h3>Add New Person</h3>
        <label>
          Name:
          <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
          Initial Balance:
          <input type="number" placeholder="Enter balance" value={balance} onChange={(e)=>setBalance(e.target.value)} />
        </label>
        <Button type="submit">Add</Button>
      </form>
    )
  );
}

function LoanPersons({loanPersons,setSelectedPerson}) {
  // Future: Logic to display list of people and their balances
  if (loanPersons.length === 0) {
    return <p>No persons added yet. Please add a person.</p>;
  }
  return(
    <ul>
{loanPersons.map((person, index) => (
      <li key={index} className="person">
        <div className="info">
          <h3>{person.name}</h3>
          <p className={person.verdict === "Owes you" ? "green" : "red"}>
            {person.verdict} ${person.balance}
          </p>
        </div>
        <Button onClick={()=>setSelectedPerson(person)}>View</Button>
      </li>
    ))}
    </ul>
  )
}
function PersonDetails({ person }) {
  return (
    <div className="person-details">
      <h2>{person.name}</h2>
      <p className={person.verdict === "Owes you" ? "green" : "red"}>
        {person.verdict} ${person.balance}
      </p>
      <p>Here you can add loan records for {person.name} (coming soon!)</p>
    </div>
  );
}

function LoanForm({ selectedPerson, onAddLoan, setLoanPersons, setLoanOpenForm }) {
  const [amountTaken, setAmountTaken] = useState('');
  const [dateTaken, setDateTaken] = useState('');
  const [amountPaid, setAmountPaid] = useState('');

  const remaining = Number(amountTaken || 0) - Number(amountPaid || 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!amountTaken || !dateTaken) return;

    const newLoan = {
      person: selectedPerson.name,
      amountTaken: parseFloat(amountTaken),
      dateTaken,
      amountPaid: parseFloat(amountPaid) || 0,
      balance: remaining,
    };

    onAddLoan(newLoan);
    setLoanPersons(prev=>
      prev.map(person =>
        person.name === selectedPerson.name
          ? {...person, balance: person.balance+remaining, verdict: remaining >= 0 ? "Owes you" : "You owe"}
          : person
      )
    );

    // Clear form
    setAmountTaken('');
    setDateTaken('');
    setAmountPaid('');
    setLoanOpenForm(false);
  }

  return (
    <form className="loan-form" onSubmit={handleSubmit}>
      <h3>Record New Loan for {selectedPerson.name}</h3>

      <label>
        Amount Taken:
        <input
          type="number"
          value={amountTaken}
          onChange={(e) => setAmountTaken(e.target.value)}
          placeholder="e.g., 100"
          required
        />
      </label>

      <label>
        Date Taken:
        <input
          type="date"
          value={dateTaken}
          onChange={(e) => setDateTaken(e.target.value)}
          required
        />
      </label>

      <label>
        Amount Paid So Far:
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="e.g., 20"
        />
      </label>

      <p className="balance">Remaining Owed: <strong>${remaining}</strong></p>

      <Button type="submit">Save Loan Record</Button>
    </form>
  );
}


export default App;
