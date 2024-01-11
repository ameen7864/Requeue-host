import { useState } from "react"
import { UldaysStyle } from "../styled/common.styled"

function DaysModal({days,value,handleSelect}) {  
  
  const _value = value?.name?.map(v=>v); 
  const _days = days?.map(l=> <li className={_value?.includes(l.name) ? "selected" : ""}  key={l.name} onClick={()=>handleSelect(l)}>{l.name}</li>);

  return (
    <>
      <UldaysStyle className="list-inline list-unstyled">
        {_days}
      </UldaysStyle> 
    </>
  )
}

export default DaysModal