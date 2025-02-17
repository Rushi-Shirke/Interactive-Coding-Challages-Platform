import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addQuestion,
  getQuestionById,
  updateQuestion,
  getQuestionType,
  getCategoryType,
} from "../../utils/CFapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QuestionForm.css";

const difficultyLevels = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

function AddQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    difficulty_id: 1,
    question_type_id: "Others",
    custom_question_type: "",
    description: "",
    example: "",
    required_output: "",
    solution: "",
    categories: "Others",
    custom_category: "",
  });

  const [questionTypes, setQuestionTypes] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const types = await getQuestionType();
        setQuestionTypes(types);
      } catch (err) {
        setError("Failed to load question types.");
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await getCategoryType();
        setCategoryTypes(categories);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    fetchQuestionTypes();
    fetchCategories();

    if (id) {
      const fetchQuestion = async () => {
        try {
          const data = await getQuestionById(id);
          setFormData({
            title: data.title || "",
            difficulty_id: parseInt(
              Object.keys(difficultyLevels).find(
                (key) => difficultyLevels[key] === data.difficulty?.level
              ) || "1",
              10
            ),
            question_type_id: questionTypes.find(
              (type) => type.name === data.questionType?.name
            )
              ? data.questionType?.name
              : "Others",
            description: data.description || "",
            example: data.example || "",
            required_output: data.requiredOutput || "",
            solution: data.solution || "",
            categories: categoryTypes.find(
              (cat) => cat.categoryName === data.categories?.categoryName
            )
              ? data.categories?.categoryName
              : "Others",
            custom_question_type: questionTypes.find(
              (type) => type.name === data.questionType?.name
            )
              ? ""
              : data.questionType?.name || "",
            custom_category: categoryTypes.find(
              (cat) => cat.categoryName === data.categories?.categoryName
            )
              ? ""
              : data.categories?.categoryName || "",
          });
        } catch (err) {
          setError("Failed to load question details.");
        }
      };
      fetchQuestion();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formattedData = {
        status: false,
        title: formData.title,
        description: formData.description,
        example: formData.example,
        solution: formData.solution,
        requiredOutput: formData.required_output,
        difficulty: { level: difficultyLevels[formData.difficulty_id] },
        questionType: {
          name:
            formData.question_type_id === "Others"
              ? formData.custom_question_type
              : formData.question_type_id,
        },
        categories: {
          categoryName:
            formData.categories === "Others"
              ? formData.custom_category
              : formData.categories,
        },
      };

      if (id) {
        await updateQuestion(id, formattedData);
        toast.success("Question updated successfully!");
      } else {
        await addQuestion(formattedData);
        toast.success("Question added successfully!");
      }

      setTimeout(() => navigate("/admindashboard/questions"), 2000);
    } catch (error) {
      toast.error("Failed to save question. Please try again.");
      setError("Failed to save question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5 question-form">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          {id ? "Edit Question" : "Add New Question"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter question title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty Level</label>
            <select
              name="difficulty_id"
              value={formData.difficulty_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Question Type</label>
            <select
              name="question_type_id"
              value={formData.question_type_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Others">Others</option>
              {questionTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            {formData.question_type_id === "Others" && (
              <input
                type="text"
                name="custom_question_type"
                value={formData.custom_question_type}
                onChange={handleChange}
                className="form-control mt-2"
                placeholder="Enter custom question type"
                required
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Others">Others</option>
              {categoryTypes.map((category) => (
                <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {formData.categories === "Others" && (
              <input
                type="text"
                name="custom_category"
                value={formData.custom_category}
                onChange={handleChange}
                className="form-control mt-2"
                placeholder="Enter custom category"
                required
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Example</label>
            <textarea
              name="example"
              value={formData.example}
              onChange={handleChange}
              className="form-control"
              rows="2"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Required Output</label>
            <textarea
              name="required_output"
              value={formData.required_output}
              onChange={handleChange}
              className="form-control"
              rows="2"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Solution</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              className="form-control"
              rows="3"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
