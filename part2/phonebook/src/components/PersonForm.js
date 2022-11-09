const PersonForm = ( {handleSubmit, nameValue, nameChangeHandler, numberValue, numberChangeHandler } ) =>
 <form onSubmit={handleSubmit}>
   <div>name: <input value={nameValue} onChange={nameChangeHandler}/></div>
   <div>number: <input value={numberValue} onChange={numberChangeHandler}/></div>
   <div><button type="submit">add</button></div>
 </form>
 
 export default PersonForm