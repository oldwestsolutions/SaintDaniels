'use client'
import { useState } from "react";
import Link from "next/link";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--light-tan);
`;

const LoginCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    color: var(--primary-green);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-green);
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--gold);
  }
`;

const SubmitButton = styled.button`
  background: var(--gold);
  color: var(--primary-green);
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 0.5rem 0;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  a {
    color: var(--primary-green);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginSection>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Welcome Back</h2>
        <p>Enter your credentials to access your royal healthcare rewards</p>
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </SubmitButton>
        </Form>

        <Links>
          <Link href="/forgot-password">Forgot Password?</Link>
          <Link href="/signup">Need an account? Sign up</Link>
        </Links>
      </LoginCard>
    </LoginSection>
  );
} 