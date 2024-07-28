"use client";
import { Button } from "@/components/Button"; 
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants"; 
import Link from "next/link";
import React, { useRef, useEffect, useCallback, useState } from "react";
import $ from 'jquery';

type FormInputs = {
  id: string;
  id_type: string;
  id_user: string;
  name: string;
  email: string;
  password: string;
  detail_type: string;
};

type UserData = {
  id: string;
  id_type: string;
  id_user: string;
  name: string;
  email: string;
  password: string; 
  detail_type: string;
};

type TypeUser = {
  id: string; 
  desc: string; 
};

type Props = {
  params: {
    id: string;
  };
};


const Editpage = (props: Props) => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [typeUserList, setTypeUserList] = useState<TypeUser[]>([]);
  const data = useRef<FormInputs>({
    id: "",
    id_type: "",
    id_user: "",
    name: "",
    email: "",
    password: "",
    detail_type: ""
  });

  const update = async () => {
    const _id_detail = $("#id_detail").val()?.toString();
    const _id_type = $("#id_user").val()?.toString();
    const _id_user = $("#id_type option:selected").val()?.toString();
    var id_detail = _id_detail;
    var id_type = parseInt(_id_type==undefined?'':_id_type);
    var id_user = parseInt(_id_user==undefined?'':_id_user);
    var name = $("#name").val();
    var email = $("#email").val();
    
    const res = await fetch(Backend_URL + "/user/update", {
      method: "POST",
      body: JSON.stringify({
        id_detail: id_detail,
        id_type: id_type,
        id_user: id_user,
        name: name,
        email: email, 
        password: ""
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    location.href = "/dashboard";
    console.log({ response });
  }; 
  async function fetchData() { 
    try{
    const response = await fetch(Backend_URL + `/user/all/${props.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData: UserData[] = await response.json();
    console.log({ userData });
    setUserList(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } 
  async function fetchTypeUser() { 
    try{
      const response = await fetch(Backend_URL + `/user/type/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const typeUser: TypeUser[] = await response.json();
    console.log({ typeUser });
    setTypeUserList(typeUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } 
  useEffect(() => {
    fetchData();
    fetchTypeUser(); 
    
  }, []);

  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Edit  
      </div>
      <div className="p-2 flex flex-col gap-6">
        {userList.map((user) => (
          <div key={user.id}> 
            <input 
              hidden
              id="id_detail" 
              name="id_detail" 
              value={user.id}
              onChange={(e) => (data.current.id = e.target.value)} 
            /> 
            <input 
              hidden
              id="id_user" 
              name="id_user" 
              value={user.id}
              onChange={(e) => (data.current.id_user = e.target.value)} 
            /> 
            <div> 
              <InputBox
                id="name"
                autoComplete="off"
                name="name"
                labelText="Name"
                required
                value={user.name}
                onChange={(e) => (data.current.name = e.target.value)} 
              />
           </div>
            <div> 
              <InputBox
                id="email"
                autoComplete="off"
                name="email"
                labelText="Email"
                required
                value={user.email}
                onChange={(e) => (data.current.email = e.target.value)} 
                />
           </div>
          </div>
        ))}
        <div> 
          <label>Type</label>
        <select id="id_type"> 
            {userList.map((user) => (
              <option key={user.id} value={user.id_type}>{user.detail_type}</option>
            ))} 
            <option value="">-- Pilih --</option>
            {typeUserList.map((type) => (
              <option key={type.id} value={type.id}>{type.desc}</option>
            ))}
        </select>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button onClick={update}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Editpage;
