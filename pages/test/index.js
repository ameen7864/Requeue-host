import{ useEffect, useState } from 'react'

function index() {

const [first, setFirst] = useState(["a","b","c","d"])

// useEffect(() => {
// }, []);


const handleClick = (e) =>{
  setFirst([...first ,"Loaded"]);
console.log("ss");
}

console.log(first);


const _first = first.map((i)=><p key={i}>{i}</p>);

  return (
    <div>{_first}
      <button onClick={(e)=>handleClick(e)}>
        click
      </button>



</div>
  )
}

export default index