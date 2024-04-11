import React, { useEffect, useState } from 'react'

export default function Teacher() {
    //2.1 hook area
    const [teachers, setTeachers] = useState([]);

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

    //2.3 return area
    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
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
                            (cv) => {
                                return <tr>
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
    )
}
