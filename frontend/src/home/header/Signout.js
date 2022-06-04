import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.handelToken(null);
    navigate("/", { replace: true });
  }, []);
  return <div>Test</div>;
}
export default SignOut;
