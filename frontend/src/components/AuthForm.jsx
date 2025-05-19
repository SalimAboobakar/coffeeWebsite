// src/components/AuthForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../slices/authSlice";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setForm({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("▶️ authUser dispatch, mode=", mode, "data=", form);
      const result = await dispatch(authUser({ mode, data: form })).unwrap();
      console.log("✔️ authUser succeeded:", result);
      localStorage.setItem("token", result.token);
      navigate(result.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.error("❌ authUser failed:", err);
      // error message is stored in state.error
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center my-5">
        <Spinner color="dark" />
      </div>
    );
  }

  return (
    <div
      className="auth-form mx-auto p-4 bg-white rounded shadow-sm"
      style={{ maxWidth: 400 }}
    >
      <h2 className="text-center mb-4">
        {mode === "login" ? "Log In" : "Sign Up"}
      </h2>

      {status === "failed" && (
        <Alert color="danger">
          {error || "Authentication failed. Please try again."}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {mode === "register" && (
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button color="primary" block type="submit">
          {mode === "login" ? "Log In" : "Sign Up"}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <Button color="link" onClick={toggleMode}>
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Log In"}
        </Button>
      </div>
    </div>
  );
}
