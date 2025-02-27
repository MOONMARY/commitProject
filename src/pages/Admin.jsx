import Footer from "../components/Footer";
import AdminDashboard from "../Admin_components/AdminDashboard";
import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState();
  const [degrees, setDegrees] = useState();
  const [careers, setCareers] = useState();
  const [profiles, setProfiles] = useState();
  const [family, setFamily] = useState();

  const apiUrl = "http://localhost:8927";

  const getUsers = async () => {
    try {
      const response = await fetch(apiUrl + "/api/user/all");

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setUsers(data);
      }
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  const getDegrees = async () => {
    try {
      const response = await fetch(apiUrl + "/api/degree/all");

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setDegrees(data);
      }
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  const getCareers = async () => {
    try {
      const response = await fetch(apiUrl + "/api/career/all");

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setCareers(data);
      }
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  // const getProfiles = async () => {
  //   try {
  //     const response = await fetch(apiUrl + "/api/profile/all");

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setProfiles(data);
  //     }
  //     if (!response.ok) {
  //       throw new Error("데이터를 받아오지 못했습니다.");
  //     }
  //   } catch (Error) {
  //     console.log(Error);
  //   }
  // };
  const getFamilyList = async () => {
    try {
      const response = await fetch(apiUrl + "/api/family/all");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFamily(data);
      }
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    getUsers();
    getDegrees();
    getCareers();
    // getProfiles();
    // getFamilyList();
  }, []);

  return (
    <>
      <AdminDashboard
        users={users}
        degrees={degrees}
        careers={careers}
        // profiles={profiles}
        family={family}
      />
      <button onClick={() => getUsers()} />
      <Footer />
    </>
  );
}

export default Admin;
