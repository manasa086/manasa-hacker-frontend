import React, { Fragment} from 'react';

import routes from "../routes";
const TableContent = (props) => {
   
  
  
    

        return(
            <div className="table">
                    <table className="table table-striped table-bordered">
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
                    {props.getData.map((data,index)=>{
                        return (<Fragment>
                            <tr>
                            <td key={index+1}>{index+1}</td>
                            <td key={index+2}>{data.team_name}</td>
                        <td key={index+3}>{data.wins}</td>
                        <td key={index+4}>{data.losses}</td>
                        <td key={index+5}>{data.ties}</td>
                        <td key={index+6}>{data.score}</td>
                        </tr>
                            </Fragment>
                        )
                    
                    })}
                    </tbody>
                    </table>
                    </div> 
            
                
                   
                 
         
      
            
        )
   
}

export default TableContent;
