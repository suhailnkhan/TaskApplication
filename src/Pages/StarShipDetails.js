import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

export default function StarShipDetails(props) {
const [StarShipUrl, setStarShipUrl] = useState(null);
const [StarShipData, setStarShipData] = useState([]);
const { data } = props.location.state;
    console.log(data);
   

const getStarShipdata = ()=> {
    let promiseArr = data.map(l => fetch(l).then(res => res.json()));
    Promise.all(promiseArr).then(res => {
        setStarShipData(...StarShipData ,res )
         console.log(res);
    })
   }

useEffect(() => {
  setStarShipUrl(data)
 {data && getStarShipdata(data)}
}, [])




    return (
        <div>
            {StarShipData ? 
                <Table striped bordered hover size='lg' >
                 <thead>
                    <tr>
                      <th className="danger">Name</th>
                      <th>manufacturer</th>
                    </tr>
                  </thead>
               <tbody>
                  {StarShipData  ? 
                    StarShipData.map(data => {
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
            : null}
       <Link to={{ pathname: '/'}}>Go Back</Link>   

        </div>
    )
}
