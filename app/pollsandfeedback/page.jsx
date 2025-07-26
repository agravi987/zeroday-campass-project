"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import "./pollsandfeedback.css";

export default function PollsAndFeedbackPage() {
  const { data: session, status } = useSession();
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const userId = session?.user?.id;

  // Fetch all polls
  const fetchPolls = async () => {
    try {
      const res = await axios.get("/api/pollsandfeedback");
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls", err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = async () => {
    if (question.trim() === "" || options.some((opt) => opt.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/pollsandfeedback", {
        question,
        options,
      });
      setQuestion("");
      setOptions(["", ""]);
      fetchPolls();
    } catch (err) {
      console.error("Error creating poll", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.post(`/api/pollsandfeedback/${pollId}/vote`, {
        optionIndex,
      });
      fetchPolls();
    } catch (err) {
      console.error("Error voting", err);
      alert(err.response?.data?.error || "Failed to vote");
    }
  };

  const hasVoted = (poll) => {
    return poll.voters?.includes(userId);
  };

  return (
    <div className="polls-container">
      <h1 className="heading">📊 Polls & Feedback</h1>

      {/* Show form only if admin */}
      {isAdmin && (
        <div className="poll-form">
          <input
            type="text"
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
          />
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input"
            />
          ))}
          <button onClick={handleAddOption} className="button secondary">
            ➕ Add Option
          </button>
          <button
            onClick={handleCreatePoll}
            className="button primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Poll"}
          </button>
        </div>
      )}

      <div className="polls-list">
        {polls.length === 0 && <p className="text-light">No polls found.</p>}
        {polls.map((poll) => (
          <div className="poll-card" key={poll._id}>
            <h3 className="poll-question">{poll.question}</h3>
            <div className="poll-options">
              {poll.options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-button"
                  onClick={() => handleVote(poll._id, idx)}
                  disabled={hasVoted(poll)}
                  title={hasVoted(poll) ? "You already voted" : "Vote"}
                >
                  {option.text} ({option.votes})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
