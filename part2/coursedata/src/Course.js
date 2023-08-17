const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => (
  <>
    {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
  </>
)

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({sum}) => <p><b>Total of {sum} exercises</b></p>

const Course = ({course}) => {
  const sumOfExercises = course.parts.reduce((total, part) => total + part.exercises, 0)

  return <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total sum={sumOfExercises} />
  </>
}

export default Course
