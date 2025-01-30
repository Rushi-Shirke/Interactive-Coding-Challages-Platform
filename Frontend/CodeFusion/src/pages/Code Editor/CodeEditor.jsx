import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import { Box, Grid, HStack, Button, useToast } from "@chakra-ui/react";
import Output from "./Output";
import { executeCode } from "../../utils/api";

function CodeEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false); // Tracks if Save button should be visible
  const toast = useToast();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
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
      setShowSaveButton(false); // Hide Save button while running
      setOutput(["Running..."]);

      const { run: result } = await executeCode(language, sourceCode);

      if (result.stderr) {
        setIsError(true);
        setOutput(["Error:", result.stderr]);
        setShowSaveButton(false); // Hide Save button on error
      } else {
        setIsError(false);
        setOutput(result.output.split("\n"));
        setShowSaveButton(true); // Show Save button only if successful
      }
    } catch (error) {
      setIsError(true);
      setOutput(["Error:", error.message || "Unable to run code"]);
      setShowSaveButton(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCode = () => {
    const sourceCode = editorRef.current?.getValue();
    toast({
      title: "Code Saved",
      description: "Your code has been saved successfully!",
      status: "success",
      duration: 3000,
    });
    console.log("Saved Code:", sourceCode); // You can replace this with actual saving logic
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "50% 50%" }} gap={2}>
      {/* Left Side - Scrollable Question Panel */}
      <Box
        p={4}
        borderRight="1px solid gray"
        overflowY="auto"
        overflowX="hidden" // Prevent horizontal scrolling
      >
        <div className="container my-3">
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="question mb-3 mb-md-0">
              <span className="body-text-bold">Question: </span>
              <span className="body-text-bold">203</span>
            </div>

            <div className="next-prev">
              <button className="custom-button text-16">Prev</button>
              <button className="custom-button text-16">Next</button>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div
            className="question-description text-16"
            style={{ whiteSpace: "pre-line" }}
          >
            <p>
              The string "PAYPALISHIRING" is written in a zigzag pattern on a
              given number of rows like this: P A H N A P L S I I G Y I R And
              then read line by line: "PAHNAPLSIIGYIR" Write the code that will
              take a string and make this conversion given a number of rows:
              string convert(string s, int numRows);
            </p>
          </div>
        </div>
      </Box>

      {/* Right Side - Code Editor & Output */}
      <Box
        p={2}
        borderLeft="1px solid gray"
        overflowY="auto"
        overflowX="hidden" // Prevent horizontal scrolling
        className="editor-right"
      >
        {/* Language Selector and Buttons */}
        <HStack mb={2} spacing={4} flexWrap="wrap">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button
            variant="solid"
            colorScheme="green"
            isLoading={isLoading}
            onClick={runCode}
            className="run-button"
            w={{ base: "full", md: "auto" }} // Full width on mobile
          >
            Run Code
          </Button>
          {/* Save Button - Only appears if there is no error */}
          {showSaveButton && (
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={saveCode}
              className="save-button"
              w={{ base: "full", md: "auto" }} // Full width on mobile
            >
              Save
            </Button>
          )}
        </HStack>

        {/* Code Editor */}
        <Editor
          height="80vh" // Adjust editor height on mobile
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />

        {/* Output Section */}
        <Output output={output} isError={isError} />
      </Box>
    </Grid>
  );
}

export default CodeEditor;
