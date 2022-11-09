import PhoneBookEntry from './PhoneBookEntry'

const Persons = ( { persons } ) => persons().map((person) => <PhoneBookEntry key={person.id} person={person} />)

export default Persons