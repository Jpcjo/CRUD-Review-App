import { FormInput, SubmitBtn } from "../components";
import { Form, redirect, Link } from "react-router-dom";
import { customFetch } from "../utilis";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  //console.log(formData);  creates a FormData object of form data from HTML
  //FormData(3) { username → "james1 smith", email → "james1@gmail.com", password → "secret" }
  const data = Object.fromEntries(formData);
  //console.log(data); Convert FormData to a JavaScript object
  //Object { username: "james1 smith", email: "james1@gmail.com", password: "secret" }

  try {
    const response = await customFetch.post("/auth/local/register", data);
    // console.log(response);
    toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";

    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className=" h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-[80%] sm:w-96 p-8 shadow-md gap-y-4  bg-slate-100"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize  text-gray-400 hover:scale-105 duration-300 hover:text-gray-600"
          >
            login
          </Link>
        </p>
        <p className="text-center link link-hover link-primary capitalize  text-gray-400 hover:scale-105 duration-300 hover:text-gray-600">
          <Link to="/">maybe later</Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
