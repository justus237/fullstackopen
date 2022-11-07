const Header = ( {course: {name} } ) => <h1>{name}</h1>

const Part = ( {part, exercise} ) => <p> {part} {exercise} </p>

const Content = ({course: {parts} }) => (
    <div>
    <Part part={parts[0].name} exercise={parts[0].exercises} />
    <Part part={parts[1].name} exercise={parts[1].exercises} />
    <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  )

const Total = ( {course} ) => <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App