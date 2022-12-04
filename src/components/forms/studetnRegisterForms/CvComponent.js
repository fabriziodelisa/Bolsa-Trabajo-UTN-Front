import { useContext } from "react";
import UserContext from "../../../context/UserContext";

const CvComponent = () =>
{
    const {jwt} = useContext(UserContext);

    const inputHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("File", e.target.files[0])

        fetch("https://localhost:7172/api/UsersInfo/UploadCV", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((res) => {console.log("Success: ", res)})
          .catch((err) => {
            console.log("Error: ",err.message);
          });
    }    

    return (
        <div className="col mt-4">
            <label>Archivo CV</label>
            <div>
            <input
                type="file"
                name="fileCv"
                id="fileCv"
                className="form-control here"
                onChange={inputHandler}
            />
            </div>
        </div>
    );
};

export default CvComponent;