import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Business CRM</h1>
          <p className="text-gray-600">Create a new account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
