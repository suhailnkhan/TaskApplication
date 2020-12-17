import React,{useEffect,useState,useContext } from 'react'
import Context from '../Context/Context'
import Api from '../Api/Data'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {

const DataContext = useContext(Context)
const [dataRec, setdataRec] = useState(null);
const [editable, setEditable] = useState(false)
const [genderSelected, setgenderSelected] = useState(null);
const [AppLoaded, setAppLoaded] = useState(false)
const [spinner, setSpinner] = useState(true)
const getDataFetched = async ()=>{
const result  = await Api.getData()
{ result && setdataRec(result.results)}
{result && DataContext.setApidata(result.results)}
{result && setSpinner(false)}
}

useEffect(() => {
    getDataFetched()
}, [])


   const handleNameChange = (index,text)=>{
        const prevData = DataContext.Apidata
        prevData[index].name = text.target.value;
        DataContext.setApidata(prevData)
   }


   const handleheightChange = (index,text) => {
    const prevData = DataContext.Apidata
    prevData[index].height = text.target.value;
    DataContext.setApidata(prevData)

   }
   const handleMassChange = (index,text) => {
    const prevData = DataContext.Apidata
    prevData[index].mass = text.target.value;
    DataContext.setApidata(prevData)
    
  }
  const handleGenderChange = (e,index   ) => {
    setgenderSelected(e)
    const prevData = DataContext.Apidata
    prevData[index].gender = e;
    DataContext.setApidata(prevData)
    setgenderSelected(null)
  }
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
    return (
        <div> 
        {DataContext.Apidata ?  
        <>
          { editable ? 
              <>
                  <Button   onClick={()=>setEditable(false)}>Save</Button> 
                  <Button  onClick={()=>setEditable(false)}>Cancel</Button> 
              </>
           :null
          }
          {  !editable && DataContext.Apidata ? 
                  <Button onClick={()=>setEditable(true)}>Edit</Button>
           :null
          }
  <Table striped bordered hover size='lg' >
        <thead>
          <tr>
            <th className="danger">Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Bmi</th>
            <th>Gender</th>
            <th>Flims</th>
            <th>Vehicals</th>
            <th>Starships</th>
          </tr>
        </thead>       
       
        <tbody>
          {dataRec && !editable  && DataContext.Apidata? 
             DataContext.Apidata.map(data => {
                return(
                  
                      <tr>
                          <td>{data.name}</td>
                          <td>{data.height}</td>
                          <td>{data.mass}</td>
                          <td>{Math.floor(data.mass / (Math.pow((data.height/100)),2))}</td>
                          <td>{data.gender}</td>
                          <td><Link to={{ pathname: '/flims',  state: { data: data.films}}}>{data.films.length}</Link> </td>
                          <td><Link to={{ pathname: '/vehicals',state: { data: data.vehicles}}}> {data.vehicles.length}</Link> </td>
                          <td><Link to={{ pathname: '/starships', state: { data: data.starships }}}> {data.starships.length}</Link> </td>
                      </tr> 
                )})
             : 
               dataRec && editable ?   
                       DataContext.Apidata.map((data,index) => {
                      return(
                        <>
                          <tr>
                              <td> <input defaultValue={data.name} onChange={(text)=>handleNameChange(index,text)}/></td>
                              <td><input defaultValue={data.height}  onChange={(text)=>handleheightChange(index,text)} /></td>
                              <td><input defaultValue={data.mass } onChange={(text)=>handleMassChange(index,text)}  /></td>
                              <td>{Math.floor(data.mass / (Math.pow((data.height/100)),2))}</td>
                              <td>
                              <select value={genderSelected} onChange={(e)=>handleGenderChange(e.target.value,index)}  placeholder={data.gender} defaultValue={data.gender} >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="n/a">n/a</option>
                              </select>
                              </td>
                              <td>{data.films.length}</td>
                              <td>{data.vehicles.length}</td>
                              <td>{data.starships.length}</td>
                          </tr> 
                          
                        </>
            
                )}) 
              : 
              null}
         </tbody>
      </Table>
      </>
      :
      <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={spinner}
        />
      
       }
       
   </div>
    )}

export default Profile