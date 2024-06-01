import { useState } from "react";
import { Input } from "@material-tailwind/react";

export default function EmailChanger() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    newEmail: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form validation and submission logic here
    console.log(formData);
  };

  return (
    <>
      <button
        className="bg-gray-800 text-yellow-300 active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        CHANGE EMAIL
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full matchColor outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t gap-3">
                  <h3 className="text-2xl font-semibold text-yellow-300">
                    Change Account Email
                  </h3>
                  <button
                    className="ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <div className="text-red-600 h-6 w-6 text-2xl block focus:outline-none opacity-100">
                      X
                    </div>
                  </button>
                </div>
                <div className="flex flex-row gap-3 p-4 align-middle justify-center text-yellow-300">
                  <form
                    className="flex flex-col gap-3 align-middle justify-center text-yellow-300"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      label="Enter New Email"
                      color="yellow"
                      labelProps={{
                        className: "text-yellow-300"
                      }}
                      className="text-yellow-300"
                      containerProps={{ className: "text-yellow-300" }}
                      name="newEmail"
                      type="email"
                      value={formData.newEmail}
                      onChange={handleChange}
                    />
                    <Input
                      label="Enter Password"
                      color="yellow"
                      className="text-yellow-300"
                      labelProps={{
                        className: "text-yellow-300"
                      }}
                      containerProps={{ className: "text-yellow-300" }}
                      name="password"
                      type = 'password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="flex justify-center align-middle">
                      <button
                        className="w-fit bg-gray-800 text-yellow-300 active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Enter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
