import { registerAPI } from "../API";

export default function Register({ setToken, navigate }) {
  function formSubmitted(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("address[0][city]", formData.get("city"));
    formData.append("address[street]", formData.get("street"));
    formData.append("address[number]", formData.get("number"));
    formData.append("address[zipcode]", formData.get("zipcode"));
    formData.delete("city");
    formData.delete("street");
    formData.delete("number");
    formData.delete("zipcode");

    const formObject = Object.fromEntries(formData.entries());

    registerAPI(formObject, setToken);
    navigate("/");
  }

  return (
    <div>
      <h2>Register an Account</h2>
      <form onSubmit={formSubmitted}>
        <label>
          Email:
          <input name="email" type="email" required />
        </label>
        <label>
          Username:
          <input name="username" required />
        </label>
        <label>
          Password:
          <input name="password" type="password" required />
        </label>
        <label>
          First Name:
          <input name="firstname" required />
        </label>
        <label>
          Last Name:
          <input name="lastname" required />
        </label>
        <label>
          Address: City:
          <input name="city" required />
        </label>
        <label>
          Street:
          <input name="street" required />
        </label>
        <label>
          Number:
          <input name="number" required />
        </label>
        <label>
          Zipcode:
          <input name="zipcode" required />
        </label>
        <label>
          Phone Number:
          <input name="phone" required />
        </label>
        <input type="submit" value="Register Account"></input>
      </form>
    </div>
  );
}
