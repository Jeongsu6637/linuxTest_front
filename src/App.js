import {useEffect, useState} from "react";
import axios from "axios";
axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:8080' : 'http://10.128.0.5:8080';

function App() {

  const [user, setUser] = useState([]);
  const [observer, setObserver] = useState(false);
  const [load, setLoad] = useState(false);
  const [form, setForm] = useState({
    name:"",
    description:""
  });
  useEffect(() => {
    axios.get('http://localhost:8080/api')
        .then((response) => {
          setUser(response.data);
          console.log(user)
        })
  }, [observer]);
  const onClick = () => {
    setLoad(true);

    axios.post('http://localhost:8080/api', form)
        .then((response) => {
          setObserver(!observer);
          setLoad(false);
        })
  }
  const onChangeHandler = (e) =>{
    const {value, name} = e.target
    setForm({...form, [name]:value})

  }
  return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{display:"flex", flexDirection:"column" }}>
          <div style={{display:"flex", flexDirection:"column"}}>
            <input style={{width:"150px", height:"50px"}} name="name" onChange={onChangeHandler} type="text" placeholder="name"/>
            <input style={{width:"150px", height:"50px"}} name="description" onChange={onChangeHandler} type="text" placeholder="desc"/>
            <input style={{width:"150px", height:"50px"}} onClick={onClick} type="submit" value="Submit"/>
          </div>
          {load && <p>로딩중 ...</p>}
          <div>
            {user.map((el,index)=>(
                <div key={index}>
                  <div>
                    이름 : {el.name}
                  </div>
                  <div>
                    설명 : {el.description}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default App;