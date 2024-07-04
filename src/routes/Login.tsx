import { ChangeEvent, useState, FormEvent } from 'react';
import LoginImg from '../Assets/login.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/actions';
import Alert from 'react-bootstrap/Alert';
import '../Style/Login.css';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '' });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
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
        dispatch(login(response.user.roleId));

        // if (response.user.roleId === 1) {
        //   props.isAdmin(response.user.roleId);
        //   console.log("abcedjhckjbcjeycge ===> ", props.isAdmin(response.user.roleId));
        //   navigate('/dashboard');
        // }
        // else {
        //   dispatch(login(response.user.roleId))
        // }
      } else {
        setAlert({ show: true, message: response.msg });
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      setAlert({
        show: true, message: 'An error occurred while logging in. Please try again later.',
      });
    }
  };
  // const toggleForm = () => {
  // };

  return (
    <section className='LoginSection'>
      {alert.show && (
        <div className='alert-msg'>
          <Alert variant="danger" onClose={() => setAlert({ show: false, message: '' })} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>{alert.message}</p>
          </Alert>
        </div>
      )}
      <div className="Boxcontainer">
        <div className="user signinBx">
          <div className="imgBx">
            <img src={LoginImg} alt="" />
          </div>
          <div className="formBx">


            <form onSubmit={handleSubmit}>

              <h2>Sign In</h2>

              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input type="submit" name="" value="Login" />

              <p className="signup">Don't have an account ?<Link to="/Register">Sign Up.</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
