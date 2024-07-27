'use client';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import '../../../../css/pages.css' ;
import InputBox from "@/components/InputBox";
import React, { useRef } from "react";

type Props = {
  params: {
    id: string;
  };
};
 
type FormInputs = {
  name: string;
  email: string;
  id_type: string;
  id_user: string;
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/user/all/${props.params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  console.log({ user });
  
  const r_type = await fetch(Backend_URL + `/user/type/all/0`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const res_type = await r_type.json();
  console.log({ res_type });

  const saveUpdate = async () => {
    const res = await fetch(Backend_URL + "/user/update", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        id_type: data.current.id_type,
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
    alert("User Updated!");
    console.log({ response });

  }

  const data = useRef<FormInputs>({
    name: "",
    email: "",
    id_type: "",
    id_user: "",
  });
  return (
    <div className="border rounded shadow overflow-hidden" >
      <div className="bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        Edit Profile {user.name}
      </div>
      <div className="grid ">
        <form onSubmit={saveUpdate}>
            <InputBox
              hidden
              autoComplete="off"
              name="name"
              labelText="Name"
              required
              value={user[0].id} type="text"
              onChange={(e) => (data.current.id_user = e.target.value)}
            />
          <div>
            <label>Name &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <InputBox
              autoComplete="off"
              name="name"
              labelText="Name"
              required
              value={user[0].name} type="text"
              onChange={(e) => (data.current.name = e.target.value)}
            />
          </div>
          <div>
            <label>Email &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <InputBox
              autoComplete="off"
              name="email"
              labelText="email"
              required
              value={user[0].email} type="email"
              onChange={(e) => (data.current.email = e.target.value)}
            />
          </div>
          <div>
            <label>Type</label>
            <select name="id_type">
              <option>{user[0].detail_type}</option>
              {res_type.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.desc}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
