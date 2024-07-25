import { ChangeEvent, useState, FormEvent } from 'react';
import LoginImg from '../Assets/login.jpeg';
import { useDispatch } from 'react-redux';
import { login } from '~/actions';
import Alert from 'react-bootstrap/Alert';
import Style from '../Style/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

export let token: string; // Declare the type of token variable
export let userID: string;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formState, setFormState] = useState({
    message: '',
    variant: '',
    show: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      response = await response.json();
      console.log(response);
      console.log("login", login(response.user.roleId));
      if (response.success) {
        token = response.token;
        userID = response.user.id;
        setFormState({ ...formState, variant: 'success', message: "Login Successful", show: true });
        setTimeout(() => {
          dispatch(login(response.user.roleId));
          if (response.user.roleId === 1) {
            navigate('/dashboard');
          }
          else {
            navigate('/');
          }
        }, 1000);
      } else {
        throw new Error(response.msg);
      }
    } catch (err) {
      setFormState({ ...formState, variant: 'danger', message: err.message, show: true });
    }
  };

  return (
    <section className={Style['LoginSection']}>
      <div className={Style["Boxcontainer"]}>
        <div className={`${Style['user']} ${Style['signinBx']}`}>
          <div className={Style["imgBx"]}>
            <img src={LoginImg} alt="" />
          </div>
          <div className={Style["formBx"]}>


            <form onSubmit={handleSubmit}>

              <h2>Sign In</h2>
              {formState.show && <Alert variant={formState.variant}>{formState.message}</Alert>}
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input type="submit" name="" value="Login" />

              <p className={Style["signup"]}>Don't have an account ?<Link to="/Register">Sign Up.</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;