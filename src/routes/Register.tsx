import { useState, ChangeEvent, FormEvent } from 'react';
import '../Style/Login.css';
import signupImage from '../Assets/signup.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
const Register = () => {
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    dob: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setAlert({ show: true, message: response.msg });
        throw new Error('Network response was not ok');
      }
      else {
        setAlert({ show: true, message: response.msg });
        console.log('Registration successful');
        navigate("/Login");
      }
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  };

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
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
              <input type="tel" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required />
              <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
              <input type="submit" value="Sign Up" />
              <p className="signup">
                Already have an account? <Link to="/Login">Sign in.</Link>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img src={signupImage} alt="Signup" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
