import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom'

export default function VehicalDetails(props) {
const [vehicalUrl, setvehicalUrl] = useState(null);
const [vehicalData, setvehicalData] = useState([]);
const [spinner, setSpinner] = useState(true)
const { data } = props.location.state;
console.log(data);
   
const getvehicaldata = ()=> {
    let promiseArr = data.map(l => fetch(l).then(res => res.json()));
    //Api call 
    Promise.all(promiseArr).then(res => {
        setvehicalData(...vehicalData ,res) //vehical Data
    })}

    
 const override = css`
 display: block;
 margin: 0 auto;
 border-color: red;
`;
useEffect(() => {
  setvehicalUrl(data)
 {data && getvehicaldata(data)}
}, [])



    return (
        <div>
            {vehicalData ? 
                <Table striped bordered hover size='lg' >
                   <thead>
                    <tr>
                        <th className="danger">Name</th>
                        <th>manufacturer</th>
                    </tr>
                   </thead>
                 <tbody>
                    {vehicalData  ? 
                      vehicalData.map(data => {
                          return(
                              <tr>
                              <td>{data.name}</td>
                              <td>{data.manufacturer}</td>
                              </tr> 
                          )})
                    : null
                    }
                 </tbody>
                </Table>
            :  <ClipLoader
             css={override}
             size={150}
             color={"#123abc"}
             loading={spinner}
           />}
       <Link to={{ pathname: '/'}}>Go Back</Link>   

        </div>
    )
}
