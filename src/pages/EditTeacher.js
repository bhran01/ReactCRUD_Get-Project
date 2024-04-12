import React, { useEffect, useState } from 'react'
import { Link,useSearchParams } from 'react-router-dom';

export default function EditTeacher() {
    //2.1 hook area
    const [payload, setPayload] = useState({});
    const [teacherName, setTeacherName] = useState('');
    const [searchParam, setSearchParam] = useSearchParams();
    //after component rendered
    //i want to receive the data after the component load
    useEffect(() => {
        //how to access the queryString params in react
        // Get the value of a specific parameter with the help of searchParams hook
        const id = searchParam.get('id');
        const name = searchParam.get('name');

        // Now you can use id and name as needed
        console.log('ID:', id);
        console.log('Name:', name);

    }, []);





    //2.2 function definition area
    let changeValue = (e) => {
        setTeacherName(e.target.value)
        setPayload({
            ...payload,
            data: {
                name: e.target.value
            }
        })
    }

    let updateData = () => {
        let idToBeUpdated = searchParam.get('id')
        fetch(`http://localhost:1337/api/teachers/${idToBeUpdated}`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload)

        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data)
            if (data) {
                alert('teacher updated successfully')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    //2.3 return area

    return (
        <>
            <div className='container'>
                <h1>Edit Teacher</h1>
                <form>
                    <input type='hidden' name='id' value={searchParam.get('id')}/>
                    <div className="mb-3">
                        <label htmlFor="teacherName" className="form-label">Teacher Name</label>
                        <input type="text" className="form-control" id="teacherName" name='name' onChange={(e) => { changeValue(e) }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={()=>{updateData()}}>Submit</button>
                </form>
                <hr/>
                <Link to='/' className="btn btn-success">Home</Link>
            </div>
        </>
    )
}
