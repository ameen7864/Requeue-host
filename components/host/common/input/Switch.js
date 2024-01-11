import { useState, useEffect } from 'react';
const Switch = (props) => { 
    return (
        <>
             <label className={props.check?"O-off off switch":"switch on O-on"}><input type="checkbox"  defaultChecked={props.check} onChange={props.onChange}/> <div></div> </label>
        </>
    )
}

export default Switch
