import { useEffect, useState } from "react"
import "./Form.css"
import { Link } from "react-router-dom"

export default function Form()
{
    const [address1 , setAddress1] = useState("")
    const [address2 , setAddress2] = useState("")
    const [city , setCity] = useState("")
    const [state , setState] = useState("")
    const [pincode , setPincode] = useState("")

    const [stateAddress , setStateAddress] = useState("")

    useEffect(()=>{
        setStateAddress(address1+ " " + address2 + " " + city+ " " +  pincode+" "+ state)
        
        
    },[address1,address2,city,state,pincode])

   
    return (
        <div className="main-form">
        <div className="form">
            <div className="addressLine1">
                <p>
                    Address line 1
                </p>
                <input type="text" value={address1}   onChange={(e)=>{
                    setAddress1(e.target.value)
                }}/>
            </div>
            <div className="addressLine2">
                <p>
                    Address Line 2
                </p>
                <input type="text" value={address2}  onChange={(e)=>{
                    setAddress2(e.target.value)
                }}/>
            </div>
            <div className="city">
                <div>
                    <p>
                        City
                    </p>
                    <input type="text" value={city}  onChange={(e)=>{
                        setCity(e.target.value)
                    }}/>
                </div>
                <div>
                    <p>
                        State
                    </p>
                    <input type="text" value={state} onChange={(e)=>{
                        setState(e.target.value)
                    }}/>
                </div>
            </div>
            <div>
                <p>
                    Pincode
                </p>
                <input type="text" value={pincode} onChange={(e)=>{
                    setPincode(e.target.value)
                }}/>
            </div>

            <Link to="/map"  state={{stateAddress}} className="submit">Fetch Location</Link>
        </div>
        </div>
    )
}