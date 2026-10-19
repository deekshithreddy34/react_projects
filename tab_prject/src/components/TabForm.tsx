
import { Profile } from "./Profile";
import {Settings} from "./Settings"
import { Interests } from "./Interests";
import { useState } from "react";

type dataType = {
    name: string;
    age: string;
    email: string;
};
type ProfileProps = {
    data: dataType;
    setData: React.Dispatch<React.SetStateAction<dataType>>;
};

type tabType={
  name:string;
  component:React.ComponentType<ProfileProps>;
}

export const TabForm=()=>{
const [data, setData] = useState<dataType>({
    name: "",
    age: "",
    email: ""
});
const tabs:tabType[]=[{
    name:"Profile",
    component:Profile
},{
    name:"Settings",
    component:Settings
},{
    name:"Interest",
    component:Interests
}
]

const [activeTab,setActiveTab]=useState<number>(0);


const ActiveTabComponent=tabs[activeTab].component

return(
    <div>
       <div className="heading-container">{ tabs.map((t,index)=>(
            <span className="heading" key={t.name} onClick={()=> setActiveTab(index)}>{t.name}</span>
        ))}
        </div>

        <div className="tab-body">
            <ActiveTabComponent data={data} setData={setData}/>
        </div>
    </div>
)

}