"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import $ from "jquery"; // Import jQuery

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
  const [formData, setFormData] = useState<FormInputs>({
    id: "",
    id_type: "",
    id_user: "",
    name: "",
    email: "",
    password: "",
    detail_type: ""
  });

  const update = async () => {
    console.log(formData);

    const res = await fetch(Backend_URL + "/user/update", {
      method: "POST",
      body: JSON.stringify({
        id: formData.id,
        id_type: formData.id_type,
        id_user: formData.id_user,
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
    console.log({ response });
  };

  async function fetchData() {
    try {
      const response = await fetch(Backend_URL + `/user/all/${props.params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData: UserData[] = await response.json();
      console.log({ userData });
      setUserList(userData);
      if (userData.length > 0) {
        setFormData({
          ...formData,
          ...userData[0] // Assume you want to pre-fill the form with the first user data
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function fetchTypeUser() {
    try {
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

  useEffect(() => {
    // Example of using jQuery to handle a specific DOM manipulation
    $("#type").change(function () {
      console.log("Selected value:", $(this).val());
    });
  }, [userList, typeUserList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

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
              id="id"
              name="id"
              value={user.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <input
              hidden
              name="id_type"
              value={user.id_type}
              onChange={(e) => setFormData({ ...formData, id_type: e.target.value })}
            />
            <div>
              <InputBox
                id="isname"
                autoComplete="off"
                name="name"
                labelText="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputBox
                id="isEmail"
                autoComplete="off"
                name="email"
                labelText="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
        <div>
          <label>Type</label>
          <select id="type" name="id_type" value={formData.id_type} onChange={handleChange}>
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
