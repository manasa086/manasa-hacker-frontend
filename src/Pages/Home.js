import React, { Fragment,useEffect,useState,useRef } from 'react';
import {Input,Label,Button,Row,Col,FormGroup,Form,FormText} from 'reactstrap';
import TableContent from '../Components/TableContent';
import Sample from '../Components/Sample';
import { Table } from 'reactstrap';


const Home = () => {

    const [teamnames,setTeamNames]=useState([]);
    const [teamValue,setteamValue]=useState("");
    const [searchValue,setSearchValue]=useState("");
    const [winnervalue,setWinnerValue]=useState("");
    const [updateTable,setUpdateTable]=useState(false);
    const [insertValue,setInsertValue]=useState("");
    const [showSearchData,setshowSearchData]=useState("");
    const [searchData,setSearchData]=useState(false);
    var [postsPerPage,setPostsPerPage]=useState(20);
    var [currentPage,setCurrentPage]=useState(1);
    const handleChange=(event)=>{
        if(event.target.id==="addteamname")
        {
            setteamValue(event.target.value);
        }
        if(event.target.id==="searchteamname")
        {
            setSearchValue(event.target.value);
        }
        
        
    }
    const addTeamName=()=>{
        
        let data={"team_name":teamValue,
            "wins":0,"losses":0,"ties":0,"score":0};
        fetch("https://manasa-hacker-data.herokuapp.com/addteamname",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((data)=>{
            setInsertValue(data.message);
            if(data.message==="Data inserted SuccessFully")
            {
                setUpdateTable(!updateTable)
            }
        })
    }
    const searchTeamName=()=>{
        let data={"team_name":searchValue};
        if(searchValue==="")
        {
            alert("Please Provide value for search");
            setshowSearchData("");
            setSearchData(false);
        }
        else{
        fetch("https://manasa-hacker-data.herokuapp.com/getteamnamedata",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((data)=>{
            setshowSearchData(data.message[0]);
            if(data.message[0]==undefined)
            {
                setSearchData(true)
            }
            else
            {
                setSearchData(false)
            }
        })
    }

    }
    var paginate=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    const setWinner=()=>{
        let score1="";
        let score2="";
        console.log(document.getElementById("opt1").value,document.getElementById("opt2").value);
        if(document.getElementById("opt1").value===document.getElementById("opt2").value)
        {
            setWinnerValue("Both team names should be differ")
        }
        else
        {
        if(document.getElementById("opt1").value==="default" || document.getElementById("opt2").value=="default" || document.getElementById("winner").value=="default")
        {
            setWinnerValue("Selecting Team 1, Team 2 and winner values are required before adding a winner")
        }
        else
        {
        if(document.getElementById("winner").value==='team1')
        {
            score1="winner";
            score2="looser";
        }
        if(document.getElementById("winner").value==='team2')
        {
            score2="winner";
            score1="looser";
        }
        if(document.getElementById("winner").value==="tie")
        {
            score1='tie';
            score2='tie';
        }
        let data={
            team_name1:document.getElementById("opt1").value,
            team_name2:document.getElementById("opt2").value,
            score1,
            score2
        }
        fetch("https://manasa-hacker-data.herokuapp.com/assignwinner",{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message=="Data Updated SuccessFully")
            {
            setWinnerValue(data.message)
            setUpdateTable(!updateTable);
            }
            else
            {
                setWinnerValue(data.message)
            }
        })
        }
        }
    }

    useEffect(()=>{
        fetch("https://manasa-hacker-data.herokuapp.com/getteamnames")
        .then((res)=>res.json())
        .then((data)=>{
            let getsortdata=data.message;
            let sortdata=getsortdata.sort((a,b)=>b["score"]-a["score"]);
            setTeamNames(sortdata)})
    
    },[updateTable])
    if(teamnames.length>0)
    {
        const indexOfLastPost=currentPage*postsPerPage;
        const indexOfFirstPost=indexOfLastPost-postsPerPage;
        const currentTeamNames=teamnames.slice(indexOfFirstPost,indexOfLastPost);
    return (
        <Fragment>
            <h1>Hacker Premier League</h1>
            <p></p>
            <div className="container">
           <Form>
      <FormGroup row>
        <Label for="addteamname" md={3}>Add Team Name to the table:</Label>
        <Col md={4}>
          <Input type="addteamname" name="addteamname" id="addteamname" placeholder="Add team name" value={teamValue} onChange={handleChange} />
        </Col>
        <Col md={5}>
          <Button className="btn btn-secondary" onClick={addTeamName}>Add team Name</Button>
        </Col>
      </FormGroup>
      <FormGroup row>
          <Col md={4}></Col>
      <Col md={5}>{insertValue?<p>{insertValue}</p>:null}</Col>
      </FormGroup>
      <FormGroup row>
        <Label for="opt1" sm={2}>Select One Team</Label>
        <Col sm={2}>
          <Input type="select" name="opt1" id="opt1">
          <option value="default" key={1}>--Select--</option>
            {teamnames.map((each,index)=>{
                return <option value={each.team_name} key={index}>{each.team_name}</option>
            })}
          </Input>
        </Col>
        <Label for="opt2" sm={2}>Select Second Team</Label>
        <Col sm={2}>
          <Input type="select" name="opt2" id="opt2">
              <option value="default" key={1}>--Select--</option>
            {teamnames.map((each,index)=>{
                return <option value={each.team_name} key={index}>{each.team_name}</option>
            })}
          </Input>
        </Col>
        <Label for="winner" sm={2}>Assign Winner Team1 (or) Team2</Label>
        <Col sm={2}>
          <Input type="select" name="winner" id="winner">
          <option value="default" key={1}>--Select--</option>
            <option value="team1" key={2}>Winner is Team 1</option>
            <option value="team2" key={3}>Winner is Team 2</option>
            <option value="tie" key={4}>Its a tie</option>
          </Input>
        </Col>
      </FormGroup>
      
      <FormGroup row>
        <Col md={5}>
        </Col>
        <Col md={4}>
        <Button onClick={setWinner}>Add a Winner</Button>
        </Col>
        
      </FormGroup>
      <FormGroup row>
          <Col md={4}></Col>
      <Col md={5}>{winnervalue?<p>{winnervalue}</p>:null}</Col>
      </FormGroup>
      <FormGroup row>
        <Label for="searchteamname" md={3}>Search Team Name from the table:</Label>
        <Col md={4}>
          <Input type="searchteamname" name="searchteamname" id="searchteamname" placeholder="Search team name" onChange={handleChange} value={searchValue} />
        </Col>
        <Col md={5}>
          <Button className="btn btn-secondary" onClick={searchTeamName}>Search team Name</Button>
        </Col>
      </FormGroup>
      <FormGroup row>
          <Col md={4}></Col>
          <Col md={5}>{searchData?<h4>No Data Available</h4>:null}</Col>
      </FormGroup>
      <FormGroup row>
          <Col md={4}></Col>
          <Col md={5}>{showSearchData?<Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Team Name</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Ties</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row">
          <th>1</th>
          <td>{showSearchData.team_name}</td>
          <td>{showSearchData.wins}</td>
          <td>{showSearchData.losses}</td>
          <td>{showSearchData.ties}</td>
          <td>{showSearchData.score}</td>
        </tr>
      
      </tbody>
    </Table>
  :null}</Col>
      </FormGroup>
    </Form>
    </div>
    <div className="container">
        <h4>Hacker Premier League Leader Board</h4>
    <TableContent getData={currentTeamNames}></TableContent></div>
    <Sample postsPerPage={postsPerPage} totalPosts={teamnames.length} paginate={paginate}></Sample>
        </Fragment>
    );
    }
    else
    {
        return null;
    }
}

export default Home;
