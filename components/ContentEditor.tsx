import React, { forwardRef } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

interface ContentEditorProps
  extends Omit<ReactQuillProps, "theme" | "modules" | "formates"> {}

const ContentEditor = forwardRef<ReactQuill, ContentEditorProps>(
  (props, ref) => (
    <ReactQuill
      ref={ref}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ]}
      {...props}
    />
  )
);

export default ContentEditor;
