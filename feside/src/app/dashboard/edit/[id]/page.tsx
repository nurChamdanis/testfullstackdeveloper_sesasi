import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import '../../../../css/pages.css' ;

type Props = {
  params: {
    id: string;
  };
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


  return (
    <div className="border rounded shadow overflow-hidden" >
      <div className="bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        Edit Profile {user.name}
      </div>
      <div className="grid ">
        <form>
          <div>
            <label>Name &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <br></br>
            <input name="username" placeholder="" value={user[0].name} type="text" />
          </div>
          <div>
            <label>Email &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <input name="email" placeholder="" value={user[0].email} type="email" />
          </div>
          <div>
            <label>Type</label>
            <select>
              <option></option>
            </select>
          </div> 
          
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
