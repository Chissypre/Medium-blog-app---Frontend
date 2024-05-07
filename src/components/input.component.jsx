import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const InputBox = ({name, type, id, value, placeholder, IconType}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <div className="relative w-[100%] mb-4">
<input
name={name}
type={type == "password" ? passwordVisible ? "text" : "password": type}
placeholder={placeholder}
defaultValue={value}
id={id}
className="input-box"
/>
{IconType && <IconType className="input-icon" />}

{type === "password" ? (
        !passwordVisible ? (
          <FaRegEyeSlash
            className="input-icon left-[auto] right-4 cursor-pointer"
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          />
        ) : (
          <FaRegEye
            className="input-icon left-[auto] right-4 cursor-pointer"
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          />
        )
      ) : null}
    </div>
  );
};

export default InputBox