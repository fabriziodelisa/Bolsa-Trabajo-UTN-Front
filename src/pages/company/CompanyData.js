import React, { useContext, useState, useEffect } from "react";
import CompanyDataPag1 from "../../components/forms/CompanyRegisterForms/CompanyDataPag1";
import CompanyDataPag2 from "../../components/forms/CompanyRegisterForms/CompanyDataPag2";
import UserContext from "../../context/UserContext";

const CompanyData = () => {
  const [data, setData] = useState({});
  const [boolPage2, setBoolPage2] = useState(false);
  const {jwt} = useContext(UserContext);

  const UpdateData = (datos) => {
    const _datos = { ...data, ...datos };
    setData(_datos);
  };

  useEffect(() => {
    fetch("https://localhost:7172/api/UsersInfo/CreateDataCompany", {
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

  return !boolPage2 ? (
    <div>
      <CompanyDataPag1 UpdateData={UpdateData} setBoolPage2={setBoolPage2} />
    </div>
  ) : (
    <div>
      <CompanyDataPag2 UpdateData={UpdateData} />
    </div>
  );
};

export default CompanyData;
