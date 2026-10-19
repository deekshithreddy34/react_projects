
type dataType={
    name:string;
    age:string;
    email:string
}

type ProfileProps={
    data:dataType;
    setData:React.Dispatch<React.SetStateAction<dataType>>;
}
export const Profile=({data,setData}:ProfileProps)=>{

    const {name,age,email}=data;

    const handleDataChange=(e:React.ChangeEvent<HTMLInputElement>,item:keyof dataType)=>{
        setData(prevState => (
            {  ...prevState,
                [item]:e.target.value
            }
        ))
    }

 return (<div>
    <div>
        <label>Name</label>
        <input type="text" value={name}  onChange={(e)=> handleDataChange(e,"name")}/>

    </div>

    <div>
        <label>age</label>
        <input type="text" value={age}  onChange={(e)=> handleDataChange(e,"age")}/>
        
    </div>

    <div>
        <label>Email</label>
        <input type="text" value={email}  onChange={(e)=> handleDataChange(e,"email")}/>
        
    </div>
 </div>);
}