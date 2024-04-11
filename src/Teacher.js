import React, { useEffect, useState } from 'react'

export default function Teacher() {
    //2.1 hook area
    const [teachers, setTeachers] = useState([]);
    const [teacherName,setTeacherName] = useState('');
    const [payload, setPayload] = useState({});

    
    //useEffect() -used for page load,i want to call the api after the page rendered
    //useEffect(cbfn,arr); cbfn is a callback function , ()=>{}
    useEffect(() => {
        //whatever we write here will be executed after the loading of page completed /i.e. component rendered

        fetch(`http://localhost:1337/api/teachers`, {
            //here the 2nd arguments are optional
            method: "GET",
            headers: {
                "accept": "application/json"
            }
        }).then(
            //this make res JSON readable
            (res) => {
                return res.json();
            }
        )
            .then(
                (data) => {
                    let newDataObj = data.data.map((ele) => {
                        return {
                            id: ele.id,
                            name: ele.attributes.name,
                            createdAt: ele.attributes.createdAt
                        }
                    })
                    setTeachers(newDataObj);
                })
            .catch()
    }, [])
    //2.2 function definition area

    let sendData = () => {
        fetch(`http://localhost:1337/api/teachers`, {
            method: "POST",
            headers: {
                //P:V
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload)
        })
            .then((res) => {
                //I want to convert the respone into json readable
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data) {
                    alert("Teacher Created Successfuly");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //need to write a function which will take the name and store that to payload object
    let changeValue=(e)=>{
        console.log(e.target.value)
        setTeacherName(e.target.value)

        setPayload({
            ...payload,
            data : {
                name: document.querySelector('input#teacherNameLabel').value
            }   
        })
    }


    //2.3 return area
    return (
        <>
            <div className='loader'>

        </div>
            <div className='container'>
                <h1>Create Teacher</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="teacherNameLabel" className="form-label">Teacher Name</label>
                        <input type="text" className="form-control" id="teacherNameLabel" name='name' onChange={(e)=>{changeValue(e)}} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => sendData()}>Submit</button>
                </form>
                <br />
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">CreateAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map(
                                (cv, idx) => {
                                    return <tr key={idx}>
                                        <td>{cv.id}</td>
                                        <td>{cv.name}</td>
                                        <td>{cv.createdAt}</td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
