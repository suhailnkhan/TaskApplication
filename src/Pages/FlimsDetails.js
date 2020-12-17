import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

export default function FlimsDetails(props) {
const [FilmsUrl, setFlimsUrl] = useState(null);
const [FilmsData, setFilmsData] = useState([]);
const { data } = props.location.state;
const [spinner, setSpinner] = useState(true)

console.log(data);
   
const getFilmsData= ()=> {
    let promiseArr = data.map(l => fetch(l).then(res => res.json()));
    Promise.all(promiseArr).then(res => {
       setFilmsData(...FilmsData ,res )
      console.log(res);
    })}

 const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

useEffect(() => {
  setFlimsUrl(data)
  {data && getFilmsData(data)}
  {data && setSpinner(false)}
}, [])
    return (
        <div>
            {FilmsData ? 
            <>
                <Table striped bordered hover size='lg' >
                  <thead>
                    <tr>
                      <th className="danger">Title</th>
                      <th>Producer</th>
                      <th>Director</th>
                      <th>Release_date</th>
                    </tr>
                  </thead>
                  <tbody>
                      {FilmsData  ? 
                       FilmsData.map(data => {
                      return(
                        <tr>
                          <td>{data.title}</td>
                          <td>{data.producer}</td>
                          <td>{data.director}</td>
                          <td>{data.release_date}</td>
                        </tr> 
                        )})
                      : null
                   }
                </tbody>
              </Table>
              <br />
              <Link to={{ pathname: '/'}}>Go Back</Link>   
                </>
             :
           <ClipLoader
             css={override}
             size={150}
             color={"#123abc"}
             loading={spinner}
           />}
        </div>
    )
}
