  const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Part = ({part}) => {
    console.log(part)
    return (
      <li>
        {part.name} {part.exercises}
      </li>
    )
  }
  
  const Content = ({course}) => {
    console.log(course)
    return (
      <div>
        <ul>
          { course.parts.map(part =>
            <Part key={part.id} part={part} />
            )
          }
        </ul>
      </div>
    )
  }
  
  const Total = ({course}) => { 
    const total = course.parts.map(part => part.exercises).reduce((tot, exer) => {
      console.log('what is happening', tot, exer)
      return tot + exer;
    });
  
    console.log("total=", total)
  
    return (
      <div>
        <ul>
          <li><b>total of exercises {total}</b></li>
        </ul>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
          <Header course={course} />
          <Content course={course}/>
          <Total course={course} />
      </div>
    )
  }

  export default Course