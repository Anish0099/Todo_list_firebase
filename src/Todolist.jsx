import React, { useEffect, useState } from "react";
import Animation from "./animation.json"
import updateIcon from "./update.json"
import Animation3 from "./animation3.json"
import Animation4 from "./animation4.json"
import Deleteicon from "./delete.json"
import Lottie from "lottie-react"

import { logout } from "./Login";
import { signOut } from "firebase/auth";
import { auth, db } from "./config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const Todolist = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);
    const [toggle,setToggle]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null)

    const userInfo = auth.currentUser
    console.log(userInfo);

    const tasksCollectionRef = collection(db, "tasks")


    const getTasksList = async () => {

        try {
            const data = await getDocs(tasksCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id

            }));

            setItems(filteredData)

        } catch (err) {
            console.error(err);
        };




    }

    useEffect(() => {
        getTasksList();
    }, [])

    const addItem = async () => {
        try {
            if(!inputData){
                alert("plzz fill the data")
            }else if(inputData && !toggle){
                // updateDoc(doc(db,'tasks',id),{
                //     tasks:
                // })
                setItems(
                    items.map((elem)=>{
                        if(elem.id === isEditItem){
                           updateDoc(doc(db,'tasks',isEditItem),{
                            tasks:inputData
                           })
                            return {...elem,tasks:inputData}
                        }return elem

                    })
                    

                )
                setInputData('');
                setToggle(!toggle)
                setIsEditItem(null);
            }
            else{
                await addDoc(tasksCollectionRef, { tasks: inputData, did: userInfo.uid })
                getTasksList()
            }
        } catch (err) {
            console.error(err);
        }
    }


    const history = useNavigate();

   

    const deleteItem = async (id) => {
        // const updatedItem = items.filter((elem, index) => {
        //     return elem.id != id;
        // })
        const userDoc = doc(db, "tasks", id);
        await deleteDoc(userDoc)
        const updatedItem = items.filter((elem, index) => {
            return elem.id != id;
        })
        setItems(updatedItem);

    }

    const logout = async () => {
        try {

            await signOut(auth);
            history("/");
        }
        catch (err) {
            console.error(err);
        }
    }

    const updateTodo = async (id) => {
        try {
           let newEditItem = items.find((elem)=>{
            return elem.id === id

           });
           setToggle(false)
           setInputData(newEditItem.tasks)
           setIsEditItem(id);
        }
        catch (err) {

        }
    }



    return (
        <div className="bg-[#1E1E1E] w-screen h-screen relative" >
            <nav className="flex justify-between bg-[#D9D9D9] h-[50px] p-6 text-center justify-center items-center text-[20px]">
                <div>Welcome! &nbsp; {userInfo?.displayName}</div>
                <div className="gap-2 flex ">
                    <button className="mr-3" onClick={() => {
                        history('/contact')
                    }}>Contact</button>
                    <button onClick={logout}>Logout!</button>

                </div>
            </nav>


            <div className="bg-[#2C2C2C] w-[900px] h-[650px]  mx-auto absolute top-8 left-[25%] mt-8">
                <div className="flex p-2 justify-center items-center relative">
                    {<Lottie animationData={Animation3} className="w-[150px] absolute left-2 top-2"></Lottie>}
                    <div className="text-[54px] text-white text-center ml-4 flex flex-col">&#x2014; TO-DO-NOW &#x2014;
                        <div className="flex justify-center items-center">
                            <div><img src="../divider.png" className="w-[180px]" /></div>
                            <div><img src="../NotePencil.svg" /></div>
                            <div><img src="../divider.png" className="w-[180px]" /></div>

                        </div>

                    </div>
                    <Lottie animationData={Animation4} className="w-[150px] absolute right-2 top-2"></Lottie>

                </div>
                <div className="mx-auto items-center flex justify-center mt-4 relative">
                    <input placeholder="Add Items.." type="text" className="w-[400px] h-[35px] bg-[#D9D9D9] rounded-l-lg focus:outline-0 font-thin p-2" value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    ></input>
                    <button className="bg-[#4F4F4F] h-[35px] w-[100px] rounded-lg p-2 text-center absolute right-60 text-white" onClick={addItem} >{toggle?'Add Task':'Edit Task'}</button>
                </div>
                <div className="flex justify-center items-center text-center mt-8"><img src="../divider.png" className="w-[500px] h-[3px]" /></div>
                <div className="mx-auto justify-center items-center flex flex-col mt-9">
                    {items.map((elem, index) => {
                        if (userInfo.uid === elem.did)
                            return (
                                <div className="flex justify-between items-center">
                                    <div key={index}
                                        

                                        className="text-white w-[400px] bg-[#4F4F4F] p-2 rounded-lg flex justify-between items-center text-center mb-3 g">
                                        {elem.tasks}

                                        <div className="  flex justify-end items-center">
                                        <Lottie
                                            animationData={Deleteicon}
                                            className="bg-[#1E1E1E]  mb-3 ml-3 rounded-lg cursor-pointer w-[40px] " onClick={() => deleteItem(elem.id)} src="../delet.png" />
                                        <div className="w-[40px] bg-[#1E1E1E]  mb-3 ml-3 rounded-lg" onClick={()=>updateTodo(elem.id)}>
                                        <Lottie
                                            className="cursor-pointer
                                            
                                    w-[35px]
                                    mt-1
                                    ml-1
                                    "animationData={updateIcon} /></div>

                                    </div>
                                       



                                    </div>
                                    
                                </div>
                            )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Todolist