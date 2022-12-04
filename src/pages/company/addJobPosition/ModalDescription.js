const ModalDescription = ({ description, inputHandler, show, setShowModalDescription }) => {
  return (
    <div className="descriptionModal" style={{ transform: show ? 'none' : 'translate(100%)'}}>
      <div>
        <h3>Descripción</h3>
        <button onClick={() => setShowModalDescription(false)}>X</button>
      </div>
      <textarea name="jobDescription" id="jobDescription" value={description} onChange={inputHandler}></textarea>
    </div>
  );
};

export default ModalDescription;
