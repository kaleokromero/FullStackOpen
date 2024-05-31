
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
    let totalExercises = 0
    course.parts.forEach(part => {
      totalExercises += part.exercises
    })
    console.log(course.parts)
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part, index) => (
        <p key={index}>{part.name}: {part.exercises}</p>
      ))}
      <p>Total of exercises is: {totalExercises} </p>
    </div>
  )
}

export default App;
