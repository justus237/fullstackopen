import PhoneBookEntry from './PhoneBookEntry'

//persons is a function that returns the persons to show
const Persons = ( { persons, deleteHandler } ) => persons().map((person) => <PhoneBookEntry key={person.id} person={person} deleteHandler={deleteHandler}/>)

export default Persons