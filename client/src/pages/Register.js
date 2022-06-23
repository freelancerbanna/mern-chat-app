import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState("");
  const { name, email, password } = input;
  //
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  //
  const handlePicture = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setFile((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  //
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_SERVER}auth/google/callback`, "_self");
  };
  //
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[40px] font-semibold text-[#2c444e] relative flex items-center justify-center after:content-[''] after:w-[400px] after:h-1 after:rounded-[1px] after:-bottom-5 after:bg-[#2c444e] after:absolute">
        Sign up Form
      </h1>
      <div className="flex p-16 mt-[45px] w-[800px] h-[450px] bg-white shadow-formContainer rounded-[30px]">
        <div className="flex-[1.5] overflow-hidden relative rounded-tl-[50px] rounded-bl-[50px]">
          <img
            className="w-[160%] absolute -left-[150px] -top-[50px]"
            src="./images/signup.jpg"
            alt="signup"
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-2">
          <h2 className="text-[25px] font-normal text-[#2c444e] mb-[30px]">
            Create Account
          </h2>
          <input
            type="text"
            className="w-[320px] h-[35px] p-[5px] my-[5px] mx-0 outline-none border border-[#dbdbdb] rounded-[5px] text-[13px]"
            placeholder="Username"
            value={name}
            name="name"
            onChange={handleInput}
          />
          <input
            type="email"
            className="w-[320px] h-[35px] p-[5px] my-[5px] mx-0 outline-none border border-[#dbdbdb] rounded-[5px] text-[13px]"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            className="w-[320px] h-[35px] p-[5px] my-[5px] mx-0 outline-none border border-[#dbdbdb] rounded-[5px] text-[13px]"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleInput}
          />
          <div className="w-[320px] h-[30px] p-[5px] my-[5px] mx-0 flex items-center border-[#dbdbdb] rounded-[5px] text-[13px] relative">
            <label
              htmlFor="file"
              className="w-[135px] text-[#ffc801] font-semibold cursor-pointer"
            >
              Profile picture
            </label>
            <input
              type="file"
              id="file"
              name="file"
              multiple={false}
              accept="image/*"
              className="cursor-pointer"
              onChange={handlePicture}
            />
            {file && (
              <div className="relative group">
                <div className="w-[55px] h-[55px] absolute -right-[35px] -top-[10px] overflow-hidden rounded-full border border-[lavender]">
                  <img
                    src={file}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[240px] hidden group-hover:flex h-[240px] absolute -right-[35px] -top-[100px] overflow-hidden rounded-full border border-[lavender]">
                  <img
                    src={file}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <button className="text-lg font-medium py-3 px-[25px] text-white bg-[#ffc801] rounded-[12px] mt-[10px] mr-0 mb-0 ml-0 outline-none border-none cursor-pointer">
            Sign Up
          </button>
          <p className="text-sm text-[#2c444e] m-[5px] mx-0 p-0">or</p>
          <button
            className="w-[230px] h-10 rounded-[5px] border-none outline-none bg-white shadow-googleBtn text-base font-medium mt-0 mr-0 mb-5 ml-0 text-[#2c444e] pointer flex items-center justify-center relative p-1"
            onClick={googleAuth}
          >
            <img
              src="./images/google.png"
              className="w-[30px] h-[30px] object-cover"
              alt="google icon"
            />
            <span className="ml-[10px]">Sing up with Google</span>
          </button>
          <p className="text-sm text-[#2c444e] m-[5px] mx-0 p-0">
            Already Have Account ?{" "}
            <Link to="/login" className="text-base font-medium text-[#ffc801]">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
