import React, { FormEvent, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Participant, postParicipantAPI } from "../../api";

type UserError = {
  name?: string;
};

type OutletContextType = {
  participant: Participant;
  setParticipant: React.Dispatch<React.SetStateAction<Participant>>;
  start: boolean;
  handleStartButton: () => void;
};

const Login: React.FC = () => {
  const { participant, setParticipant, start, handleStartButton } = useOutletContext<OutletContextType>();

  const [error, setError] = useState<UserError>({});

  const validate = (participant: Participant): UserError => {
    const errors: UserError = {};
    if (!participant.name.trim()) {
      errors.name = "Name is required";
    }
    return errors;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(participant);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const newUser = await postParicipantAPI({ ...participant, score: 0 });
        if (newUser) {
          setParticipant(newUser);
          alert(`Successfully logged in as ${newUser.name}. Good luck!!!`);
        } else {
          console.warn("No data returned from API.");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-black"
        noValidate
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome to the cloud developer tool knowledge test
        </h1>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2" >
          Name
        </label>
        <input
          id="name"
          name="name"
          value={participant.name}
          onChange={handleChange}
          title="The name isn’t required to play. It's only required if you want your score to appear on the leaderboard."
          className={`w-full px-4 py-3 border rounded-md focus:outline-none transition
            ${error.name ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"}
          `}
          placeholder="Enter your name"
          autoComplete="off"
        />
        {error.name && (
          <p className="text-red-600 text-sm mt-1 select-none">{error.name}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Login
        </button>

        {!start && (
          <button
            type="button"
            onClick={handleStartButton}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Start
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
