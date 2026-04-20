import React, { useState } from "react";

function TeacherQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", ""], correctAnswer: "" }
  ]);

  // ✅ ADD QUESTION
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", ""], correctAnswer: "" }
    ]);
  };

  // ✅ HANDLE QUESTION CHANGE
  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // ✅ HANDLE OPTION CHANGE
  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  // ✅ ADD OPTION
  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  // ✅ SUBMIT QUIZ (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT

    // ✅ Basic validation
    if (!title) {
      alert("Enter quiz title");
      return;
    }

    if (!questions.length) {
      alert("Add at least one question");
      return;
    }

    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          questions
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("✅ Quiz Created Successfully");

        // 🔄 RESET FORM
        setTitle("");
        setQuestions([
          { questionText: "", options: ["", ""], correctAnswer: "" }
        ]);
      } else {
        alert(data.message || "❌ Failed to create quiz");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server Error");
    }
  };

  return (
    <div className="ml-60 mt-10 text-white">
      <h1 className="text-2xl font-bold mb-5">Create Quiz</h1>

      {/* ✅ FORM START */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Quiz Title"
          className="p-2 text-black mb-5 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {questions.map((q, index) => (
          <div key={index} className="mb-5 bg-[#042439] p-4 rounded">

            <input
              type="text"
              placeholder="Question"
              className="p-2 text-black w-full mb-2"
              value={q.questionText}
              onChange={(e) => handleChange(index, "questionText", e.target.value)}
            />

            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                className="p-2 text-black w-full mb-2"
                value={opt}
                onChange={(e) => handleOptionChange(index, i, e.target.value)}
              />
            ))}

            <button
              type="button"
              onClick={() => addOption(index)}
              className="bg-gray-500 px-2 py-1 mt-1"
            >
              + Add Option
            </button>

            <input
              type="text"
              placeholder="Correct Answer"
              className="p-2 text-black w-full mt-2"
              value={q.correctAnswer}
              onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
            />

          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 p-2 mr-3"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="bg-green-500 p-2"
        >
          Submit Quiz
        </button>

      </form>
      {/* ✅ FORM END */}

    </div>
  );
}

export default TeacherQuiz;