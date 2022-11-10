
const DeleteButton = ({ handleClick }) => <button onClick={handleClick}>delete</button>

const PhoneBookEntry = ( { person, deleteHandler } ) => {
	//i put this here instead of App.js so that i dont have to search through the whole array of people just to get the name, could probably modify the deleteHandler to take id and name instead to simplify this?
	//if this is accessed from multiple browsers and someone deletes a user but kees the alert thing open this might completely break and delete users that have been recreated while someone had the dialogue open
	const deleteClickHandler = () => {
		if (window.confirm(`Delete ${person.name}?`)) {
			console.log(`deleting ${person.name} with id ${person.id}`);
		    deleteHandler(person.id, person)
		} else {
			console.log('user decided not to delete after all')
		}
	}
  return (
	<div>
	<p>{person.name} {person.number} <DeleteButton handleClick={deleteClickHandler} /></p>
	</div>
  )
}

export default PhoneBookEntry