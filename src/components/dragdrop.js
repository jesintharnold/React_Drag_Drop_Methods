import './dragdrop.css'
import {useEffect, useRef, useState} from "react";

const DragDrop=()=>{



    const A=[
        {title:"Node-1",ID:["G-11","G-12"]},
        {title:"Node-2",ID:["G-21","G-22","G-23"] },
        {title:"Node-3",ID:["G-31","G-32","G-33","G-34"]},
        {title:"Node-4",ID:["G-41","G-42","G-43"]}
    ]

    const[list,Setlist]=useState(A);
    const begin_node=useRef();
    const Over_node=useRef();


    const DragStart=(e,params)=>{
        // console.log(`${params.grpID} - ${params.itemID}`);
        begin_node.current=params;
    }

    const DragOver=(e,params)=>{
        e.preventDefault();
        console.log(`${params.grpID} - ${params.itemID}`);
        Over_node.current=params;
    }
  // By getting the starting and Ending point , we can add
    const DragEnd=(e)=>{
           // console.log(`BEGIN ${begin_node.current.grpID} - ${begin_node.current.itemID}`);
           // console.log(`END ${Over_node.current.grpID} - ${Over_node.current.itemID}`);
           var new_list=[...list];
           // console.log(`Before - ${new_list[0].ID}`)
           new_list[Over_node.current.grpID].ID.splice(Over_node.current.itemID+1,0,new_list[begin_node.current.grpID].ID.splice(begin_node.current.itemID,1)[0]);
           // console.log(`After - ${new_list[1].ID}`);
           Setlist(new_list);
    }


    return(
        <div className="whole">
            {list.map((grp,grpID)=>(
                <div key={grp.title} className="group"   onDragEnter={(e)=>DragOver(e,{grpID,itemID:0})}>
                    {grp.title}
                    {grp.ID.map((item,itemID)=>(
                            <div key={item} className="item" draggable={"true"}
                                 onDragStart={(e)=>DragStart(e,{grpID,itemID})}
                                 onDragOver={(e)=>DragOver(e,{grpID,itemID})}
                                 onDragEnd={(e)=>DragEnd(e)}>
                                {item}
                            </div>
                        ))}

                </div>
            ))}
        </div>
    )
}

export default DragDrop;