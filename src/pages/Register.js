import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="div-wrapper">
      <RegisterForm
        h1Text="Registrarse"
        btnText="Registrarse"
        linkToText="Ya tengo una cuenta"
        linkTo="/ingreso"
        left={true}
      />
    </div>
  );
};

export default Register;
