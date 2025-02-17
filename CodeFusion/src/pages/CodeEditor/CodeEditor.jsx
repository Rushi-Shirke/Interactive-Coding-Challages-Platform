import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import LanguageSelector from "./LanguageSelector";
import { Box, Grid, HStack, Button, useToast } from "@chakra-ui/react";
import Output from "./Output";
import { executeCode } from "../../utils/api";
import { getQuestionById } from "../../utils/CFapi";
import { getSessionUser } from "../../utils/authApi";
import { submitCode } from "../../utils/leaderboardApi";
import { CODE_SNIPPETS } from "../../constants"; // Import predefined code snippets
import { getSubmission } from "../../utils/leaderboardApi"; // Import the new API function

function CodeEditor() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS.javascript); // Default to JavaScript snippet
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [question, setQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const toast = useToast();

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSessionUser(); // Fetch user session data
        setUser(userData.userId);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch question details
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoadingQuestion(true);
      try {
        const questionData = await getQuestionById(id);
        setQuestion(questionData);
        console.log(questionData);
      } catch (error) {
        console.error("Failed to fetch question:", error);
        setQuestion(null);
      } finally {
        setLoadingQuestion(false);
      }
    };

    fetchQuestion();
  }, [id]);

  // Fetch the user's saved code if user and question are available
  useEffect(() => {
    const fetchSavedCode = async () => {
      if (user && id) {
        try {
          const submission = await getSubmission(user, id);
          console.log(submission); // Log the submission data for debugging
          if (submission && submission.code) {
            setValue(submission.code); // Set saved code in editor
            setLanguage(submission.language || "javascript"); // Set saved language
          }
        } catch (error) {
          console.error("Failed to fetch saved code:", error);
        }
      }
    };

    fetchSavedCode();
  }, [user, id]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage] || "");
  };

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) {
      toast({
        title: "No code to run",
        description: "Please enter some code before running",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      setShowSaveButton(false);
      setOutput(["Running..."]);

      const { run: result } = await executeCode(language, sourceCode);

      if (result.stderr) {
        setIsError(true);
        setOutput(["Error:", result.stderr]);
        setShowSaveButton(false);
      } else {
        setIsError(false);

        const userOutput = result.output.trim();
        const expectedOutput = question?.requiredOutput?.trim() || "";

        setOutput(result.output.split("\n"));

        if (userOutput === expectedOutput) {
          setShowSaveButton(true);
          toast({
            title: "Correct Output",
            description: "Your output matches the expected output!",
            status: "success",
            duration: 3000,
          });
        } else {
          setShowSaveButton(false);
          toast({
            title: "Incorrect Output",
            description: "Your output does not match the expected output.",
            status: "error",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      setIsError(true);
      setOutput(["Error:", error.message || "Unable to run code"]);
      setShowSaveButton(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCode = async () => {
    const sourceCode = editorRef.current?.getValue();

    if (!user) {
      toast({
        title: "User not found",
        description: "Please log in to save your code.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await submitCode(user, id, sourceCode);
      toast({
        title: "Code Saved",
        description: "Your solution has been successfully saved!",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error Saving Code",
        description: "There was an issue saving your code.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "50% 50%" }} gap={2}>
      <Box p={4} borderRight="1px solid gray" overflowY="auto">
        {loadingQuestion ? (
          <p>Loading question...</p>
        ) : question ? (
          <>
            <div className="container my-3">
              <p>
                <strong>ID:</strong> {question.id}
              </p>
              <p>
                <strong>Difficulty Level:</strong> {question.difficultyLevel}
              </p>
              <p>
                <strong>Type:</strong> {question.questionType}
              </p>
              <p>
                <strong>Category:</strong> {question.categories}
              </p>
              <hr />
            </div>

            <div className="container mt-4">
              <div
                className="question-description text-16"
                style={{ whiteSpace: "pre-line" }}
              >
                <h2 className="body-text-bold">Title: {question.title}</h2>
                <p>
                  <strong>Description:</strong> {question.description}
                </p>
                <p>
                  <strong>Example:</strong> {question.example}
                </p>
                <p>
                  <strong>Required Output:</strong> {question.requiredOutput}
                </p>
                <p>
                  <strong>Solution:</strong> {question.solution}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Error loading question. Please try again later.</p>
        )}
      </Box>

      <Box p={2} borderLeft="1px solid gray" overflowY="auto">
        <HStack mb={2} spacing={4}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button
            className="button-margin"
            variant="solid"
            colorScheme="green"
            isLoading={isLoading}
            onClick={runCode}
          >
            Run Code
          </Button>
          {showSaveButton && (
            <Button
              colorScheme="blue"
              className="button-margin"
              onClick={saveCode}
            >
              Save Code
            </Button>
          )}
        </HStack>

        {value && ( // Only render the editor when value is available
          <Editor
            height="80vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        )}

        <Output output={output} isError={isError} />

        {showSaveButton && (
          <Button mt={5} colorScheme="blue" onClick={saveCode}>
            Save Code
          </Button>
        )}
      </Box>
    </Grid>
  );
}

export default CodeEditor;
