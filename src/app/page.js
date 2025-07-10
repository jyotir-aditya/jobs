"use client";
import { useState, useEffect } from "react";
import AuthSection from "./components/AuthSection";
import UserSection from "./components/UserSection";
import AdminSection from "./components/AdminSection";
import JobList from "./components/JobList";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [isSignUp, setIsSignUp] = useState(false);

  const adminEmails = ["pratyusha.das.stats@gmail.com"];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  const signUp = async () => {
    try {
      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          qualification,
          age: age ? parseInt(age) : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful");
        setIsSignUp(false);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setQualification("");
        setAge("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        fetch("/logSession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
            lastLogin: new Date().toISOString(),
            device: navigator.userAgent,
          }),
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setEmail("");
    setPassword("");
  };

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      loadUsers();
    }
  }, [currentUser]);

  return (
    <div>
     
        <h1 className="w-full flex justify-center text-xl py-4 bg-amber-50">Government Job Portal</h1>

        {!currentUser && (
          <AuthSection
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
            signUp={signUp}
            loginUser={loginUser}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            qualification={qualification}
            setQualification={setQualification}
            age={age}
            setAge={setAge}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        )}

        {currentUser && !currentUser.isAdmin && (
          <UserSection currentUser={currentUser} logOut={logOut} />
        )}

        {currentUser && currentUser.isAdmin && (
          <AdminSection
            currentUser={currentUser}
            logOut={logOut}
            users={users}
          />
        )}
     
    </div>
  );
};

export default Home;
