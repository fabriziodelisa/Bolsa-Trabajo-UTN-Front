import { useState, useContext, useEffect } from "react";
import PersonalData from "../../components/forms/studetnRegisterForms/PersonalData";
import UniversityData from "../../components/forms/studetnRegisterForms/UniversityData";
import UserContext from "../../context/UserContext";

const StudentData = () => {
  const { jwt } = useContext(UserContext);
  const [data, setData] = useState({});
  const [boolUniversityData, setboolUniversityData] = useState(false);
  const [successfulCharge, setSuccessfulCharge] = useState(false);

  const UpdateData = (datos) => {
    const dataStudent = { ...data, ...datos };
    setData(dataStudent);
  };

  console.log(successfulCharge);

  useEffect(() => {
    fetch('https://localhost:7172/api/UsersInfo/CreateDataStudent', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });
  }, [data, jwt]);

  return !boolUniversityData ? (
    <div>
      <PersonalData
        UpdateData={UpdateData}
        setboolUniversityData={setboolUniversityData}
      />
    </div>
  ) : (
    <div>
      <UniversityData
        UpdateData={UpdateData}
        setSuccessfulCharge={setSuccessfulCharge}
      />
    </div>
  );
};

export default StudentData;
