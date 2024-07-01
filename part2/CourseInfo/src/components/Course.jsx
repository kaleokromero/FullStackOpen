    const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p>Total of {totalExercises} exercises</p>
  }
  const Course = (props) => {
    const { course } = props
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  export default Course