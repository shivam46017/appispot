import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";


/*
 * states
 * 1. Email verified
 * 2. Link Expired
 * 3. something went wrong
 */

function EmailConfirmationPage() {
  const [state, setState] = useState("error");
  const [userName, setUserName] = useState(undefined)

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const role = searchParams.get('role')

  const verifyUserEmail = async () => {
    const res = await axios.get(`/api/verify-email?token=${token}&role=${role}`)
    const { data } = res
    if(res.status === 200) {
      setState('success')
      if(role === 'user') {
        setUserName(data.user.firstName + " " + data.user.lastName)
      } else {
        setUserName(data.seller.firstName + " " + data.seller.lastName)
      }
    } else {

      setState('error')
    }
  }

  useEffect(() => {
    verifyUserEmail()
  }, [])
            

  return (
    <div className="h-[80vh] text-center flex items-center justify-center">
      {state === "success" && (
        <div>
          <h1 className="text-3xl font-bold">🥳 Email Verified !!</h1>
          <h2 className="text-4xl font-bold">{userName}</h2>
          <p className="text-xl font-semibold">
            You're email has been successfully verified
          </p>
          <Link className="text-blue-700" to={`/${role === 'user' ? 'user' : 'lister'}/auth`}>You can login now. click here</Link>
        </div>
      )}
      {state === "error" && (
        <div>
          <h1 className="text-3xl font-bold">Link expired !!</h1>
          <p className="text-xl font-semibold">Can't verify Link is expired</p>
          <Link className="text-blue-900 font-semibold" to={"/home"}>
            Return to home
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmailConfirmationPage;
